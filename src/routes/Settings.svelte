<script>
	import { _daten, _settings } from '../lib/db'
	import Layer from '../lib/Layer.svelte'
	export let pages = []
	export let title = 'Settings'
	let devmode = $_settings.op.op1

	$: $_settings.op.op1 = devmode
</script>

<svelte:head><title>{title}</title></svelte:head>
<Layer center>
	<header class="w-full max-w-xs prose-lg">
		<h1 class="text-center">{title}</h1>
		<p class="space-x-4 text-center">
			{#each pages as { name, href, hidden }}
				{#if href !== '/settings'}
					<a {href}>{name}</a>
				{/if}
			{/each}
		</p>
		<div class="py-2 px-4 flex flex-col gap-4 bg-gray-50 rounded shadow">
			<label for="devmode_op" class="flex items-center gap-4">
				<input
					class="form-check-input"
					type="checkbox"
					bind:checked={devmode}
					id="devmode_op" />
				<span class="form-check-label"> Developing Mode</span>
				<span class="flex-1" />
				<strong>{devmode ? 'ON' : 'Off'}</strong>
			</label>
		</div>
	</header>
</Layer>
