<script>
	import Layer from '../lib/Layer.svelte'
	export let pages = []
	export let title = 'Settings'
</script>

<svelte:head><title>{title}</title></svelte:head>
<Layer center>
	<header>
		<div>{title}</div>
		<p class="space-x-4">
			{#each pages as { name, href, hidden }}
				{#if href !== '/settings'}
					<a {href}>{name}</a>
				{/if}
			{/each}
		</p>
	</header>
</Layer>
