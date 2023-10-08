<script>
	import { _daten, _settings } from '../lib/db'
	import { path } from 'elegua'
	import { sleep, clickOutside } from '../lib/util'
	import { textLog, clearLogs } from '../lib/battle/TextLogger.svelte'
	import Heroes from '../lib/battle/Heroes'
	import Layer from '../lib/Layer.svelte'
	import ArenaCard from '../lib/battle/ArenaCard.svelte'
	import Message from '../lib/battle/Message.svelte'
	import ModalV2, { openModalV2 } from '../lib/components/ModalV2.svelte'
	import SelectFigther from '../lib/battle/SelectFigther.svelte'
	import SelectHealth from '../lib/battle/SelectHealth.svelte'
	import TextLogger from '../lib/battle/TextLogger.svelte'
	export let pages = []
	export let title = 'Battle'
	let player, enemy
	let devmode = $_settings.op.op1
	let battle = 'ready'
	let open = false
	let ended = true
	let locked = false
	let turn = 0
	let box = {
		enemy: '',
		player: ''
	}
	const test = (msg) => {
		openModalV2(Message, { text: msg })
	}
	const checkHealth = () => {
		return new Promise((resolve, reject) => {
			let d = []
			if (player.health < 1) d.push('player')
			if (enemy.health < 1) d.push('enemy')
			if (d.length) reject(d)
			resolve()
		})
	}
	const checkBattle = async () => {
		try {
			await checkHealth()
			return true
		} catch (error) {
			ended = true
			battle = 'ended'
			open = false
			let msg = ''
			if (error.length > 1) {
				msg = 'Double KO!'
			} else {
				msg = error[0] === 'player' ? '☠️ You are death!' : '☠️ Enemy is death!'
			}
			clearLogs()
			logText(msg, error[0] === 'player' ? 'error' : 'success')
			return false
		}
	}
	const logText = (text, type = 'info', timeout = 0, dismissible = true) => {
		// console.log('XXX - logText(text)', text, type)
		textLog({
			text,
			type,
			dismissible,
			timeout
		})
	}
	const damageTaken = async (animationClass, targetId) => {
		await sleep(100)
		if (animationClass === 'swing') {
			animationClass += ' animate-jackInTheBox'
		} else if (animationClass === 'damages') {
			animationClass += ' animate-bounce'
		} else if (animationClass === 'attacke') {
			animationClass += ' animate-flash'
		} else if (animationClass === 'playermiss') {
			animationClass += ' animate-wobble'
		} else if (animationClass === 'enemymiss') {
			animationClass += ' animate-tada'
		}
		box[targetId] = animationClass
	}
	const lockActionButtons = (condition) => (locked = condition)
	const removeAnimation = async () => {
		await sleep(1500)
		box.enemy = ''
		box.player = ''
	}
	const throwDice = (min, max) => {
		min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min)) + min
	}
	async function conterAttack() {
		function updatePlayerHealth(number) {
			let nh = player.health - number
			player.health = nh < 0 ? 0 : nh
		}
		await sleep(200)
		logText(`Enemy attacks ...`, 'warning')
		await sleep(200)
		logText(`${enemy.figther.name} waves his spear at you`, 'warning')
		let x = throwDice(1, 10)
		let _del = throwDice(300, 900)
		await sleep(800 + _del)
		_del = throwDice(300, 500)
		if (x >= enemy.figther.hardAttackDice) {
			damageTaken('attacke', 'enemy')
			await sleep(1000 + _del)
			damageTaken('damages', 'player')
			logText(
				`⚔️ You take ${enemy.figther.hardAttackDamage} points of critical damage!`,
				'error'
			)
			updatePlayerHealth(enemy.figther.hardAttackDamage)
		} else if (
			x > enemy.figther.weakAttackDice &&
			x < enemy.figther.hardAttackDice
		) {
			damageTaken('attacke', 'enemy')
			await sleep(1000 + _del)
			damageTaken('damages', 'player')
			logText(
				`⚔️ You take ${enemy.figther.weakAttackDamage} points of damage!`,
				'error'
			)
			updatePlayerHealth(enemy.figther.weakAttackDamage)
		} else {
			damageTaken('attacke', 'enemy')
			await sleep(1000 + _del)
			damageTaken('playermiss', 'player')
			logText('💫 The Enemy stumbles over his own feet!', 'blank')
		}

		console.log(
			`Enemy: ${x} | hardAtt: ${enemy.figther.hardAttackDice} | weakAtt: ${enemy.figther.weakAttackDice}`
		)
	}

	async function weaponAttack(
		attackName,
		successDice,
		damage,
		attackDescription,
		missDescription
	) {
		function updateEnemyHealth(number) {
			let nh = enemy.health - number
			enemy.health = nh < 0 ? 0 : nh
		}
		console.clear()
		let check = await checkBattle()
		if (!check) return
		clearLogs()
		lockActionButtons(true)
		open = false
		ended = false
		battle = 'run'
		turn++
		logText(`⌛ Turn ${turn}!`, 'terminal')
		let x = throwDice(1, 10)
		let _del = throwDice(400, 900)
		await sleep(600 + _del)
		logText(attackName, 'info')
		await sleep(400)
		logText(attackDescription, 'info')
		await sleep(600 + _del)
		// Angriff
		damageTaken('swing', 'player')
		if (x > successDice) {
			// Angriff erfolgreich
			damageTaken('damages', 'enemy')
			logText(
				`⚔️ You successfully deal ${damage} points of damage to the opponent`,
				'success'
			)
			updateEnemyHealth(damage)
		} else {
			// Angriff gescheitert
			damageTaken('enemymiss', 'enemy')
			logText(missDescription, 'error')
		}
		console.log(`Player: ${x} | sucDice: ${successDice} | damage: ${damage}`)

		if (enemy.health > 0) {
			let _dely = throwDice(500, 1500)
			await sleep(500 + _dely)
			await conterAttack()
		}

		await sleep(500)
		logText(`⌛ Turn end!`, 'terminal')
		await sleep(500)
		await checkBattle()
		removeAnimation()
		await sleep(1000)
		lockActionButtons(false)
	}

	const initBattleData = async () => {
		console.log('... initBattleData!')
		let err = []
		const res = $_daten
		if (res && res.player.length) {
			player = new Heroes('player', res.player)
		} else {
			err.push('player')
		}
		if (res && res.player.length) {
			enemy = new Heroes('enemy', res.enemy)
		} else {
			err.push('enemy')
		}
		if (err.length) throw new Error('fetch error')
		return res
	}
	const battleInit = async () => {
		await initBattleData()
		console.log(`Player: ${player.list().length}`)
		console.log(`Enemys: ${enemy.list().length}`)
	}

	let promise = battleInit()
</script>

<svelte:head><title>{title}</title></svelte:head>

{#await promise then _}
	<Layer noscroll>
		<header class="bg-blue-600 px-4 py-8 space-y-4 text-blue-100 text-center">
			<div>
				<h1 class="text-4xl font-medium">{title}</h1>
			</div>
		</header>

		{#if enemy.figther && player.figther}
			<article class="flex-grow relative bg-gray-50">
				<div class="grid-container p-2 gap-2">
					<div class="sector sec1 space-y-4">
						<SelectFigther
							label="player"
							arr={player.list()}
							on:select={(e) => (player.figther = e.detail)} />

						{#each [player.figther] as values}
							{#if devmode}
								<SelectHealth
									on:change={(e) => (player.health = e.detail)}
									max={values.maxHealth}
									value={values.health} />
							{/if}

							<ArenaCard
								animation={box.player}
								on:death={(e) => console.log(`${e.detail} is Death!`)}
								{values}
								short />
						{/each}
					</div>
					<div class="sector sec2 space-y-4">
						<SelectFigther
							label="enemy"
							arr={enemy.list()}
							on:select={(e) => (enemy.figther = e.detail)} />
						{#each [enemy.figther] as values}
							{#if devmode}
								<SelectHealth
									on:change={(e) => (enemy.health = e.detail)}
									max={values.maxHealth}
									value={values.health} />
							{/if}

							<ArenaCard
								animation={box.enemy}
								on:death={(e) => console.log(`${e.detail} is Death!`)}
								{values}
								short />
						{/each}
					</div>
					<footer class="relative overflow-hidden sec3">
						<nav
							class="absolute inset-0 flex gap-1 transform transition-all duration-500"
							class:translate-y-full={open || locked}
							class:opacity-5={open || locked}>
							<button on:click={() => (open = true)} class="btn flex-1"
								>Fight</button>
							<button on:click={() => ($path = '/settings')} class="btn flex-1"
								>Settings</button>
							<button on:click={() => ($path = '/')} class="btn flex-1"
								>Exit</button>
						</nav>
						<nav
							class="bg-gray-100 shadow absolute inset-0 flex fex-col items-center justify-center transform transition-opacity duration-500"
							class:opacity-0={!locked}
							class:translate-y-full={!locked}>
							<span class="text-shadow-md font-mono">... battle</span>
						</nav>

						<nav
							class="bg-white absolute inset-0 grid grid-cols-3 gap-1 transform transition-all duration-500"
							class:translate-y-full={!open}
							class:opacity-5={locked}>
							{#each player.figther.attacks as [attackName, successDice, damage, attackDescription, missDescription], i}
								<button
									class="btn"
									disabled={locked}
									on:click={() =>
										weaponAttack(
											attackName,
											successDice,
											damage,
											attackDescription,
											missDescription
										)}>{attackName}</button>
							{/each}
						</nav>
					</footer>
					<aside class="sector sec4 terminalhtml rounded">
						<div class="p-2">
							<TextLogger />
						</div>
					</aside>
				</div>
			</article>
		{:else}
			<article class="prose-lg text-center">
				<h1 class="text-red-600">Error!</h1>
			</article>
		{/if}
	</Layer>
{/await}
<ModalV2 />
