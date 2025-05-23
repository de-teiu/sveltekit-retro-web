<script lang="ts">
	// CSSアニメーションを使用するため、JavaScriptでの制御は不要になりました
</script>

<div class="flex h-full w-full items-center justify-center">
	<div class="flex items-center gap-8">
		<img src="/underconstruction.jpg" alt="工事中" class="image-left h-auto max-w-[300px]" />
		<h1 class="m-0 text-center text-4xl text-[#ff3e00]">工事中です！！！！</h1>
		<img src="/underconstruction.jpg" alt="工事中" class="image-right h-auto max-w-[300px]" />
	</div>
</div>

<style>
	/* 左側の画像のアニメーション */
	.image-left {
		animation: flip 1s infinite ease-in-out;
	}

	/* 右側の画像のアニメーション（逆位相） */
	.image-right {
		animation: flip 1s infinite ease-in-out reverse;
	}

	/* 反転アニメーションの定義 */
	@keyframes flip {
		0%,
		100% {
			transform: scaleX(1);
		}
		50% {
			transform: scaleX(-1);
		}
	}
</style>
