<script>
	import { _daten } from '../lib/db'
	import { sleep } from '../lib/util'
	import { textLog, clearLogs } from '../lib/battle/TextLogger.svelte'
	import Heroes from '../lib/battle/Heroes'
	import Layer from '../lib/Layer.svelte'
	import ArenaCard from '../lib/battle/ArenaCard.svelte'
	import Message from '../lib/battle/Message.svelte'
	import ModalV2, { openModalV2 } from '../lib/components/ModalV2.svelte'
	import PanelBar from '../lib/battle/PanelBar.svelte'
	import SelectFigther from '../lib/battle/SelectFigther.svelte'
	import SelectHealth from '../lib/battle/SelectHealth.svelte'
	import TextLogger from '../lib/battle/TextLogger.svelte'
	export let pages = []
	export let title = 'Battle'
	let player, enemy
	let devmode = false
	let battle = 'ready'
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
	const logText = (text, type = 'info', timeout = 0, dismissible = true) => {
		console.log('XXX - logText(text)', text, type)
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
		let x = throwDice(1, 10)
		let attackMessage = `${enemy.figther.name} attempt to attack...`
		logText(attackMessage)
		let _del = throwDice(300, 900)
		await sleep(800 + _del)
		if (x >= enemy.figther.hardAttackDice) {
			let attac_msg = `${enemy.figther.name} waves his spear at you`
			logText(attac_msg, 'warning')
			damageTaken('attacke', 'enemy')
			let _del = throwDice(300, 500)
			await sleep(400 + _del)
			let damageText = `⚔️ You take ${enemy.figther.hardAttackDamage} points of critical damage`
			logText(damageText, 'error')
			updatePlayerHealth(enemy.figther.hardAttackDamage)
			damageTaken('damages', 'player')
		} else if (
			x > enemy.figther.weakAttackDice &&
			x < enemy.figther.hardAttackDice
		) {
			let _del = throwDice(300, 500)
			let attac_msg = `${enemy.figther.name} charges at you with a spear`
			logText(attac_msg, 'warning')
			damageTaken('attacke', 'enemy')
			await sleep(200 + _del)
			updatePlayerHealth(enemy.figther.weakAttackDamage)
			let damageText = `⚔️ You take ${enemy.figther.weakAttackDamage} points of damage`
			logText(damageText, 'error')
			damageTaken('damages', 'player')
		} else {
			damageTaken('attacke', 'enemy')
			let _del = throwDice(300, 500)
			let attac_msg = `${enemy.figther.name} charges at you with a spear`
			logText(attac_msg, 'warning')
			await sleep(100 + _del)
			logText('💫 The Enemy stumbles over his own feet', 'blank')
			damageTaken('playermiss', 'player')
		}
		await sleep(400)
		logText(`Turn ${turn} End`, 'terminal')
	}

	async function weaponAttack(
		attackName,
		successDice,
		damage,
		attackDescription,
		missDescription
	) {
		function enemyDeath() {
			logText('☠️ Creatura is dead', 'success')
			ended = true
		}
		function playerDeath() {
			logText('☠️ You are dead', 'error')
			ended = true
		}
		console.clear()
		clearLogs()
		lockActionButtons(true)
		ended = false
		turn++
		logText(`⌛ Turn ${turn}`, 'terminal')
		let x = throwDice(1, 10)
		let _del = throwDice(400, 900)
		await sleep(800 + _del)
		if (enemy.health > 0) {
			await sleep(200)
			logText(attackName, 'info')
			await sleep(200)
			logText(attackDescription, 'info')
			await sleep(800)
			// Angriff
			damageTaken('swing', 'player')
			if (x > successDice) {
				// Angriff erfolgreich
				let damagedeal = `⚔️ You successfully deal ${damage} points of damage to the opponent`
				let nh = enemy.health - damage
				enemy.health = nh < 0 ? 0 : nh
				damageTaken('damages', 'enemy')
				logText(damagedeal, 'success')
			} else {
				// Angriff gescheitert
				damageTaken('enemymiss', 'enemy')
				logText(missDescription, 'error')
			}
			// Conter Attacke
			let _dely = throwDice(500, 1500)
			await sleep(1000 + _dely)

			if (enemy.health > 0) {
				conterAttack()
			} else {
				enemyDeath()
			}

			await sleep(800)
		} else {
			enemyDeath()
		}
		await sleep(500)
		removeAnimation()
		if (player.health < 1) {
			playerDeath()
		}
		// Turn End!
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

			<nav class="flex gap-1 justify-center">
				{#each pages as { name, href, hidden }}
					{#if href !== '/battle' && !hidden}
						<a {href} class="btn">{name}</a>
					{/if}
				{/each}
			</nav>
		</header>

		<article class="flex-grow relative bg-gray-50">
			<div class="grid-container p-4 gap-4">
				<div class="sector sec1 space-y-4">
					{#if player.figther}
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
					{/if}
				</div>
				<div class="sector sec2 space-y-4">
					{#if enemy.figther}
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
					{/if}
				</div>
				<div class="sector sec3 font-serif">
					{#if player.figther}
						<PanelBar let:setPanel>
							<div
								class="grid grid-cols-3 p-1 gap-1 bg-gray-100 rounded shadow">
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
							</div>

							<svelte:fragment slot="panel2" let:setPanel>
								<div class="p-4 flex flex-col gap-2 bg-gray-100 rounded shadow">
									<label for="devmode_op" class="flex items-center gap-4">
										<input
											class="form-check-input"
											type="checkbox"
											bind:checked={devmode}
											id="devmode_op" />
										<span class="form-check-label">
											DevMode {devmode ? 'ON' : 'Off'}</span>
									</label>
								</div>
							</svelte:fragment>
						</PanelBar>
					{/if}
				</div>
				<aside class="sector sec4 terminalhtml rounded">
					<div class="p-2">
						<TextLogger />
					</div>
				</aside>
			</div>
		</article>
	</Layer>
{/await}
<ModalV2 />
