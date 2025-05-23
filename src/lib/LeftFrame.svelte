<script lang="ts">
	import type { Snippet } from 'svelte';

	let { width, onStartResize, content } = $props<{
		width: number;
		onStartResize: () => void;
		content: () => Snippet;
	}>();
</script>

<div class="flex h-full" style:min-width="{width}px">
	<div class="h-full grow pt-2.5">
		{@render content()}
	</div>
	<button
		class="m-0 h-full w-[3px] cursor-col-resize rounded-none border-r-[0.5px] border-l-[0.5px] border-r-black border-l-[rgb(170,170,170)] bg-[rgb(208,208,208)] p-0 outline-none hover:cursor-col-resize"
		onmousedown={onStartResize}
		aria-label="フレームの幅を調整"
		title="ドラッグして幅を調整"
	></button>
</div>

<style>
	div {
		--s: 100px;
		--c1: #f5e284;
		--c2: #ffedbd;

		--_l: #0000 34%, var(--c1) 0 41%, #0000 0 59%, var(--c1) 0 66%, #0000 0;
		background:
			linear-gradient(-45deg, var(--_l)),
			linear-gradient(45deg, var(--_l)) var(--c2);
		background-size: var(--s) var(--s);
	}
</style>
