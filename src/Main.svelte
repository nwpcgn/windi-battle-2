<script>
	import { path } from 'elegua'
	import { _daten } from './lib/db/stores'
	import fetchDb from './lib/battle/fetchDb'
	import Battle from './routes/Battle.svelte'
	import Editor from './routes/Editor.svelte'
	import NotFound from './routes/NotFound.svelte'
	import Settings from './routes/Settings.svelte'
	import Start from './routes/Start.svelte'
	const pages = [
		{ name: 'Start', href: '/' },
		{ name: 'Battle', href: '/battle' },
		{ name: 'Editor', href: '/editor' },
		{ name: 'Settings', href: '/settings' },
		{ name: 'Error', href: '/drghfc', hidden: true }
	]

	const initData = async () => {
		try {
			const data = await fetchDb()
			if (data) _daten.set(data)
		} catch (error) {
			throw new Error('Fetch Error', error)
		}
	}

	let promise = initData()
</script>

{#await promise then _}
	{#if $path === '/'}
		<Start {pages} />
	{:else if $path === '/battle'}
		<Battle {pages} />
	{:else if $path === '/editor'}
		<Editor {pages} />
	{:else if $path === '/settings'}
		<Settings {pages} />
	{:else}
		<NotFound />
	{/if}
{/await}
