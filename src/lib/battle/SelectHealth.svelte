<script>
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()
	const randomId = function (length = 6) {
		return Math.random()
			.toString(36)
			.substring(2, length + 2)
	}
	const handle = (e) => {
		dispatch('change', parseInt(e.currentTarget.value))
	}
	export let max = 1,
		value = 0,
		label = '',
		id = randomId()
</script>

<div class="flex flex-col gap-1">
	<label for={id} class="form-label capitalize" class:sr-only={label === ''}
		>{label}</label>
	<input
		on:change={handle}
		{id}
		{max}
		{value}
		class="form-range transition-all duration-200 ease-in-out"
		min={0}
		step={1}
		type="range" />
</div>

<style>
</style>
