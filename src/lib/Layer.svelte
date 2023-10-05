<script>
	import { quintIn, quintOut } from 'svelte/easing'
	import { scale } from 'svelte/transition'
	export let out = false
	export let center = false
	export let noscroll = false
</script>

<main
	out:scale={{ duration: 400, opacity: 0.1, start: 0.2, easing: quintOut }}
	in:scale={{
		duration: 400,
		opacity: 0.1,
		start: 0.2,
		delay: 200,
		easing: quintIn
	}}
	class:out
	class:center
	class:noscroll>
	<slot />
</main>

<style>
	main {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transition: opacity 600ms cubic-bezier(0.42, -0, 0.58, 1) 110ms,
			transform 500ms cubic-bezier(0.42, -0, 0.58, 1) 10ms;
		overflow-x: hidden;
		overflow-y: auto;
		flex-direction: column;
		display: flex;
		z-index: var(--z, auto);
	}

	main.noscroll {
		overflow-y: hidden;
		overflow-x: hidden;
	}

	main.center {
		align-items: center;
		justify-content: center;
	}

	main.out {
		transform: translateY(100%);
		transition: transform 400ms ease;
	}
</style>
