<script context="module">
	// import { slide } from 'svelte/transition'
	import { writable } from 'svelte/store'
	function typewriter(node, { speed = 2 }) {
		const valid =
			node.childNodes.length === 1 &&
			node.childNodes[0].nodeType === Node.TEXT_NODE

		if (!valid) {
			throw new Error(
				`This transition only works on elements with a single text node child`
			)
		}

		const text = node.textContent
		const duration = text.length / (speed * 0.01)

		return {
			duration,
			tick: (t) => {
				const i = ~~(text.length * t)
				node.textContent = text.slice(0, i)
			}
		}
	}
	export const tlogs = writable([])
	export const textLog = (tlog) => {
		// Create a unique ID so we can easily find/remove it
		// if it is dismissible/has a timeout.
		// const id = Math.floor(Math.random() * 10000)
		const id = 'id' + new Date().getTime()
		// Setup some sensible defaults for a tlog.
		const defaults = {
			id,
			type: 'info',
			dismissible: true,
			timeout: 3000,
			animate: false
		}

		// Push the tlog to the top of the list of tlogs
		tlogs.update((all) => [{ ...defaults, ...tlog }, ...all])

		// If tlog is dismissible, dismiss it after "timeout" amount of time.
		if (tlog.timeout) setTimeout(() => dismissLog(id), tlog.timeout)
	}

	const dismissLog = (id) => {
		tlogs.update((all) => all.filter((t) => t.id !== id))
	}
	export const clearLogs = (id) => {
		tlogs.set([])
	}
</script>

<script>
	const icons = {
		info: '💡',
		error: '⛔',
		success: '✅',
		warning: '⚠️',
		blank: '📃',
		terminal: 'nwp@battle> ',
		pack: '📦'
	}
	const getClass = (type = 'default') => {
		let str = ''
		switch (type.toLowerCase().trim()) {
			case '':
				break
			case 'info':
				str = 'text-blue-400'
				break
			case 'error':
				str = 'text-red-500'
				break
			case 'success':
				str = 'text-emerald-500'
				break
			case 'warning':
				str = 'text-amber-500'
				break
			case 'blank':
				str = 'text-gray-300'
				break
			case 'terminal':
				str = 'text-terminal'
				break
			default:
				str = 'text-gray-300'
				break
		}

		return str
	}
</script>

{#if $tlogs.length}
	<section class="font-mono leading-tight flex flex-col gap-2">
		{#each $tlogs as log (log.id)}
			<div
				class="text-log {getClass(log.type)}"
				on:pointerdown={() => dismissLog(log.id)}>
				<span class="glow">{icons[log.type]}</span>
				<span in:typewriter>{log.text}</span>
			</div>
		{/each}
	</section>
{/if}

<style>
	.text-log {
		font-family: var(--mono-font-stack);
		line-height: 1.2;
		font-size: 0.9rem;
		cursor: no-drop;
	}
	.text-terminal {
		color: #a3be8c;
	}
</style>
