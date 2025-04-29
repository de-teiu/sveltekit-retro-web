<script lang="ts">
  import type { Snippet } from "svelte";

  let {content } = $props<{
    content: () => Snippet;
  }>();
</script>

<div class="right-frame">
  {@render content()}
</div>

<style>
  .right-frame {
    flex-grow: 1;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    overflow-y: auto;
  }
</style>
