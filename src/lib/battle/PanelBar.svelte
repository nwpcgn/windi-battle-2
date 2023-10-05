<script>
	import { TabControl, TabControlItem } from '../components'
	let tabcontrol
	const setPanel = (str) => {
		switch (str) {
			case 'panel3':
				tabcontrol.setTab('panel3')
				break
			case 'panel2':
				tabcontrol.setTab('panel2')
				break
			default:
				tabcontrol.setTab('panel1')
				break
		}
	}
</script>

<TabControl bind:this={tabcontrol}>
	<nav class="flex gap-1 flex-wrap mb-4" slot="tabs" let:tabs>
		{#each tabs as { active, disabled, payload, select }}
			<button class="btn" class:active on:click={select} {disabled}
				>{payload}</button>
		{/each}
	</nav>
	<div class="tab">
		<TabControlItem id="panel1" payload="Actions" active>
			<slot {setPanel}>Panel 1</slot>
		</TabControlItem>
		{#if $$slots.panel2}
			<TabControlItem id="panel2" payload="Settings">
				<slot {setPanel} name="panel2" />
			</TabControlItem>
		{/if}
		{#if $$slots.panel3}
			<TabControlItem id="panel3" payload="Options">
				<slot {setPanel} name="panel3" />
			</TabControlItem>
		{/if}
	</div>
</TabControl>

<style>
</style>
