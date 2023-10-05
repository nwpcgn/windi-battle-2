<script>
	export let close
	export let text
</script>

<section
	class="absolute z-50 inset-0 flex justify-center items-center bg-black bg-opacity-90">
	<div class="w-full max-w-sm p-4">
		<div
			class="border-stroke rounded-md border border-l-[8px] border-l-[#007BC3] bg-white p-4 pl-8">
			<div class="flex w-full items-center justify-between">
				<div>
					{#if text}
						{@html text}
					{:else}
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry.
					{/if}
				</div>
				<button on:click={close} class="hover:text-danger text-[#ACACB0]">
					<svg width="20" height="20" viewBox="0 0 24 24" class="fill-current">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M18.8839 5.11612C19.372 5.60427 19.372 6.39573 18.8839 6.88388L6.88388 18.8839C6.39573 19.372 5.60427 19.372 5.11612 18.8839C4.62796 18.3957 4.62796 17.6043 5.11612 17.1161L17.1161 5.11612C17.6043 4.62796 18.3957 4.62796 18.8839 5.11612Z" />
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M5.11612 5.11612C5.60427 4.62796 6.39573 4.62796 6.88388 5.11612L18.8839 17.1161C19.372 17.6043 19.372 18.3957 18.8839 18.8839C18.3957 19.372 17.6043 19.372 17.1161 18.8839L5.11612 6.88388C4.62796 6.39573 4.62796 5.60427 5.11612 5.11612Z" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</section>

<style>
</style>
