<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { DeviceChecker } from './utils/DeviceChecker';
	import MouseStalkerItem from './utils/MouseStalkerItem';

	// 定数
	const STAR_SYMBOL = '★';
	const MAX_TIMER = 100;
	const ANIMATION_INTERVAL = 10;
	const FALL_SPEED = 0.5;

	// 状態管理
	let isEnabled = false;
	let items: MouseStalkerItem[] = [];
	let animationInterval: ReturnType<typeof setInterval>;

	/**
	 * ランダムな色を生成する
	 * 明るい色にするため、RGBのいずれかを255に固定し、他の2色をある程度ランダムに生成
	 */
	const generateRandomColor = (): string => {
		const accentColor = 255;
		const subColor1 = Math.floor(Math.random() * 256);
		const subColor2 = Math.floor(Math.random() * (256 - subColor1 / 2));

		const colorComponents: number[] = [accentColor, subColor1, subColor2];
		colorComponents.sort(() => 0.5 - Math.random());

		return `rgb(${colorComponents.join(', ')})`;
	};

	/**
	 * マウスストーカーアイテムを生成する
	 */
	const createMouseStalkerItem = (x: number, y: number): MouseStalkerItem => {
		return new MouseStalkerItem(STAR_SYMBOL, generateRandomColor(), 0, x, y);
	};

	/**
	 * マウス移動時のハンドラー
	 */
	const handleMouseMove = (event: MouseEvent) => {
		if (!isEnabled) return;
		const item = createMouseStalkerItem(event.pageX, event.pageY);
		items = [...items, item];
	};

	/**
	 * アニメーションの更新処理
	 */
	const updateAnimation = () => {
		items = items
			.map((item) => ({
				...item,
				timer: item.timer + 1,
				y: item.y + FALL_SPEED
			}))
			.filter((item) => item.timer < MAX_TIMER);
	};

	onMount(() => {
		// PCでない場合は機能を無効化
		if (!DeviceChecker.isPC()) return;

		isEnabled = true;
		document.body.addEventListener('mousemove', handleMouseMove);
		animationInterval = setInterval(updateAnimation, ANIMATION_INTERVAL);
	});

	onDestroy(() => {
		if (isEnabled) {
			document.body.removeEventListener('mousemove', handleMouseMove);
			clearInterval(animationInterval);
		}
	});
</script>

<div>
	{#each items as item}
		<span
			class="pointer-events-none absolute text-sm"
			style="color:{item.color};top:{item.y}px;left:{item.x}px"
		>
			{item.sign}
		</span>
	{/each}
</div>
