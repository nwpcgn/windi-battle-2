<script>
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()
	const handleChange = (e) =>
		dispatch('select', parseInt(e.currentTarget.value))
	export let label = 'player'
	export let arr = []
	let seleted = 0
</script>

<div class="flex flex-col gap-1">
	<label class="form-label capitalize">{label}</label>
	<select class="form-control" bind:value={seleted} on:change={handleChange}>
		{#each arr as { name }, i}
			<option value={i}>{name}</option>
		{/each}
	</select>
</div>

<style>
</style>
