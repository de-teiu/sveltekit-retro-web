<script lang="ts">
	import type { Snippet } from 'svelte';

	let { content } = $props<{
		content: () => Snippet;
	}>();
</script>

<div class="box-border h-full grow overflow-y-auto p-2.5">
	{@render content()}
</div>
