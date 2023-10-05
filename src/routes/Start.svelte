<script>
	import svelteLogo from '../assets/map.svg'
	import archerLogo from '../assets/archer.svg'
	import Layer from '../lib/Layer.svelte'
	export let pages = []
	export let title = 'NWP + BATTLE'
</script>

<svelte:head><title>{title}</title></svelte:head>

<Layer center>
	<header class="flex justify-center p-8 gap-8">
		<a>
			<img src={archerLogo} class="logo" alt="Vite Logo" />
		</a>
		<a>
			<img src={svelteLogo} class="logo" alt="Svelte Logo" />
		</a>
	</header>
	<article class="text-center prose-lg page">
		<h1>{title}</h1>
		<p class="space-x-4">
			{#each pages as { name, href, hidden }}
				{#if !hidden && href !== '/'}
					<a {href}>{name}</a>
				{/if}
			{/each}
		</p>
		<p>
			<strong>Cyberpunk RPG Battle</strong> gibt den Ton für ein adrenalingeladenes
			und fesselndes Erlebnis wie kein anderes an.
		</p>
		<details>
			<summary>more</summary>
			<p>
				Aus der Dunkelheit taucht eine dystopische Stadtlandschaft auf, die nur
				von flackernden Neonreklamen und verschwommenen Hologrammen beleuchtet
				wird und die düstere Realität widerspiegelt, die die Spieler erwartet.
			</p>
			<p>
				Der pulsierende Synthwave-Soundtrack wird intensiver, wenn nervöse,
				stark erweiterte Charaktere die Bühne betreten und ihre kybernetischen
				Verbesserungen im gedämpften Licht glitzern. Während sie mit
				maschineller Präzision ihre tödlichen Waffen zücken, steigt die
				Vorfreude und die Spannung liegt in der Luft. Die Hintergrundgeschichte
				jedes Charakters ist mit komplizierten politischen Verschwörungen,
				Wirtschaftsspionage und Schwarzmarktgeschäften verknüpft und schafft so
				einen komplexen Erzählteppich, der die Spieler in eine dunkle urbane
				Unterwelt eintauchen lässt.
			</p>
			<p>
				„Cyberpunk-RPG-Battle“ verkörpert Macht und Rebellion gegen
				unterdrückerische Regime und nährt gleichzeitig unsere Obsession für
				futuristische Ästhetik und fesselndes Geschichtenerzählen. Bereiten Sie
				sich darauf vor, sich kopfüber in einen unerbittlichen Kampf zu stürzen,
				in dem das Überleben ungewiss, der Sieg jedoch überaus erfreulich ist.
			</p>
		</details>
	</article>
</Layer>

<style>
	.logo {
		height: 8em;
		padding: 1.5em;
		will-change: filter;
		transition: filter 300ms;
	}
	.logo:hover {
		filter: drop-shadow(0 0 2em #ff3e00aa);
	}
</style>
