<script>
	import Main from './Main.svelte'
	import Loader from './lib/Loader.svelte'
	import { path } from 'elegua'

	const init = () =>
		new Promise((resolve) => {
			$path = '/'
			setTimeout(resolve, 1200)
		})
	let promise = init()
</script>

{#await promise}
	<Loader />
{:then value}
	<Main />
{/await}
