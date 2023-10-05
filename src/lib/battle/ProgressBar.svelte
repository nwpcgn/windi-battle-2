<script>
	export let max = 1,
		value = 1
	const percentage = (partialValue, totalValue) =>
		(100 * partialValue) / totalValue

	$: percent = percentage(value, max)
</script>

<div class="w-full rounded-full bg-gray-200 overflow-hidden h-2 flex">
	<section
		style="width: {percent}%;"
		class="rounded-full {percent > 40
			? 'bg-blue-600'
			: percent < 20
			? 'bg-red-600'
			: 'bg-amber-600'}  transition-all duration-500 ease" />
</div>
