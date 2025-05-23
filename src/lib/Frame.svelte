<script lang="ts">
	import type { Snippet } from 'svelte';
	import LeftFrame from './LeftFrame.svelte';
	import RightFrame from './RightFrame.svelte';

	const { left, right } = $props<{ left: Snippet; right: Snippet }>();

	const LEFT_FRAME_MIN_WIDTH = 240;
	const FRAME_ADJUSTED_SETTING = 2;

	let isDragged = $state(false);
	let leftWidth = $state(LEFT_FRAME_MIN_WIDTH); // 初期幅

	/**
	 * フレームのリサイズ開始
	 */
	function startResize() {
		isDragged = true;
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', () => {
			isDragged = false;
			window.removeEventListener('mousemove', handleMouseMove);
		});
	}

	/**
	 * マウス移動時の処理
	 * @param event MouseEvent
	 */
	function handleMouseMove(event: MouseEvent) {
		if (!isDragged) return;

		leftWidth = Math.max(LEFT_FRAME_MIN_WIDTH, event.clientX + FRAME_ADJUSTED_SETTING);
		if (leftWidth > window.innerWidth - LEFT_FRAME_MIN_WIDTH) {
			leftWidth = window.innerWidth - LEFT_FRAME_MIN_WIDTH;
		}
	}
</script>

<section
	class="flex h-screen flex-row"
	class:dragged={isDragged}
	role="application"
	aria-label="リサイズ可能なフレーム"
>
	<LeftFrame width={leftWidth} onStartResize={startResize} content={left} />
	<RightFrame content={right} />
</section>

<style>
	.dragged {
		cursor: col-resize;
		user-select: none;
	}
</style>
