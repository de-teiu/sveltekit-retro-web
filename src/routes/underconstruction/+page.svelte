<script lang="ts">
	// CSSアニメーションを使用するため、JavaScriptでの制御は不要になりました
</script>

<div class="container">
	<div class="construction-content">
		<img src="/underconstruction.jpg" alt="工事中" class="image-left" />
		<h1>工事中です！！！！</h1>
		<img src="/underconstruction.jpg" alt="工事中" class="image-right" />
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
	}

	.construction-content {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	h1 {
		font-size: 2.5rem;
		color: #ff3e00;
		text-align: center;
		margin: 0;
	}

	img {
		max-width: 300px;
		height: auto;
	}

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
