<script>
	import { slide } from 'svelte/transition'
	export let type = 1
</script>

{#if type == 1}
	<section class="fixed inset-0 z-50 bg-black bg-opacity-25 flex flex-col">
		<div class="m-auto">
			<span class="loader" />
		</div>
	</section>
{:else}
	<div
		class="fullScreen transition-all ease-in-out"
		transition:slide={{ duration: 450 }}>
		<div>
			<div class="spinner" />
		</div>
	</div>
{/if}

<style>
	.spinner {
		position: relative;
		width: 56px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.spinner::before,
	.spinner::after {
		border: 6.7px solid #8c8c8c;
		border-radius: 50%;
		position: absolute;
		content: '';
		display: block;
	}

	.spinner::before {
		width: 33.6px;
		height: 33.6px;
		border-bottom-color: transparent;
		border-left-color: transparent;
		animation: spinner-1o3y8q 0.75s infinite linear reverse;
	}

	.spinner::after {
		animation: spinner-1o3y8q 0.5s infinite linear;
		height: 56px;
		width: 56px;
		border-right-color: transparent;
		border-top-color: transparent;
	}

	@keyframes spinner-1o3y8q {
		to {
			transform: rotate(360deg);
		}
	}

	.fullScreen {
		position: fixed;
		z-index: 3333;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(105, 23, 23, 0.7);
		color: rgb(30, 29, 46, 0.9);
	}

	.loader {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		display: inline-block;
		border-top: 4px solid #fff;
		border-right: 4px solid transparent;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}
	.loader::after {
		content: '';
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 0;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		border-bottom: 4px solid #ff3d00;
		border-left: 4px solid transparent;
	}
	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
