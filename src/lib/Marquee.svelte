<script lang="ts">
	import { onMount } from 'svelte';

	// 表示する文字列（親コンポーネントから渡される）
	export let text: string;

	let headComponent: HTMLDivElement;
	let textComponent: HTMLDivElement;
	let containerWidth: number | undefined;
	let textWidth: number | undefined;
	let duration = 0;

	/**
	 * アニメーションの時間を計算する関数
	 * 画面幅とテキスト幅から適切なアニメーション時間を計算
	 */
	function calculateDuration(): void {
		if (containerWidth && textWidth) {
			// 画面幅とテキスト幅から適切なアニメーション時間を計算
			duration = (textWidth + containerWidth) / 100;
		}
	}

	/**
	 * リサイズイベントハンドラ
	 * 画面サイズが変更されたときに呼び出される
	 */
	function handleResize(): void {
		// 次のフレームでDOM要素のサイズを再取得
		requestAnimationFrame(() => {
			containerWidth = headComponent.offsetWidth;
			textWidth = textComponent.offsetWidth;
			calculateDuration();
		});
	}

	onMount(() => {
		// 初期化時にリサイズハンドラを呼び出す
		handleResize();
	});
</script>

<svelte:window on:resize={handleResize} />

<div class="marquee relative w-full overflow-hidden" bind:this={headComponent}>
	<div
		class="pl-full marquee_text inline-block whitespace-nowrap"
		bind:this={textComponent}
		style="animation-duration: {duration}s;"
	>
		{text}
	</div>
</div>

<style>
	.pl-full {
		padding-left: 100%;
	}

	.marquee_text {
		animation-name: marquee;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}

	@keyframes marquee {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-100%);
		}
	}
</style>
