<script lang="ts">
  import type { Snippet } from "svelte";

  let { width, onStartResize, content } = $props<{
    width: number;
    onStartResize: () => void;
    content: () => Snippet;
  }>();
</script>

<div class="left-frame" style:min-width="{width}px">
  <div class="left-frame-content">
    {@render content()}
  </div>
  <button
    class="frame-border"
    onmousedown={onStartResize}
    aria-label="フレームの幅を調整"
    title="ドラッグして幅を調整"
  ></button>
</div>

<style>
  .left-frame {
    height: 100%;
    display: flex;
  }

  .left-frame-content {
    height: 100%;
    flex-grow: 1;
    padding-left: 10px;
  }

  .frame-border {
    width: 3px;
    height: 100%;
    background-color: rgb(208, 208, 208);
    border-left: solid 0.5px rgb(170, 170, 170);
    border-right: solid 0.5px black;
    padding: 0;
    margin: 0;
    border-radius: 0;
    outline: none;
    cursor: col-resize;
  }

  .frame-border:hover {
    cursor: col-resize;
  }
</style>
