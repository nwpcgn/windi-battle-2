<script>
	import Layer from '../lib/Layer.svelte'
	export let title = 'Page Not Found'
</script>

<svelte:head><title>{title}</title></svelte:head>
<Layer center>
	<header class="prose-lg prose-red text-center">
		<h1 class="text-red-600">{title}</h1>
		<p>
			<a href="/">Restart</a>
		</p>
	</header>
</Layer>
