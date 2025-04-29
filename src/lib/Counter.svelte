<script lang="ts">
  import { zeroPad } from './utils/number';

  const { count } = $props();
  const formattedCount = $derived(zeroPad(count, 6));
</script>

<div class="visitor-counter">
  あなたは
  <span class="visitor-counter__display">{formattedCount}</span>
  人目の来訪者です。
</div>

<style>
  .visitor-counter {
    font-size: 16px;
  }

  .visitor-counter__display {
    background-color: #000000;
    color: #00ff00;
    font-family: "DigitTech", monospace;
    font-size: 22px;
    padding: 3px;
    border: ridge 4px #b3c6eb;
  }
</style>
