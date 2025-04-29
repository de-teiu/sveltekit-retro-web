<script lang="ts">
  import { onMount } from "svelte"; // 画面初期化時イベント
  export let text: string; // 表示する文字列（親コンポーネントから渡される）
  let containerWidth: number | undefined;
  let textWidth: number | undefined;
  let duration = 10; // デフォルトのアニメーション時間（秒）

  // コンテナの幅を取得するための関数
  function getContainerWidth(node: HTMLElement): void {
    containerWidth = node.offsetWidth;
    calculateDuration();
  }

  // テキストの幅を取得するための関数
  function getTextWidth(node: HTMLElement): void {
    textWidth = node.offsetWidth;
    calculateDuration();
  }

  // アニメーション時間を計算する関数
  function calculateDuration(): void {
    if (containerWidth && textWidth) {
      // 画面幅とテキスト幅から適切なアニメーション時間を計算
      duration = (textWidth + containerWidth) / 100;
    }
  }

  // リサイズイベントのハンドラ
  function handleResize(): void {
    // 次のフレームでDOM要素のサイズを再計算
    requestAnimationFrame(() => {
      const container = document.querySelector(".marquee") as HTMLElement;
      const textElement = document.querySelector(
        ".marquee_text"
      ) as HTMLElement;

      if (container && textElement) {
        containerWidth = container.offsetWidth;
        textWidth = textElement.offsetWidth;
        calculateDuration();
      }
    });
  }

  onMount(() => {
    // 初期化時にリサイズハンドラを呼び出す
    handleResize();
  });
</script>

<svelte:window on:resize={handleResize} />

<div class="marquee" use:getContainerWidth>
  <div
    class="marquee_text"
    use:getTextWidth
    style="animation-duration: {duration}s;"
  >
    {text}
  </div>
</div>

<style>
  .marquee {
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  .marquee_text {
    display: inline-block;
    white-space: nowrap;
    padding-left: 100%;
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
