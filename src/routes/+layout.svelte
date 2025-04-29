<script lang="ts">
	import Frame from '../lib/Frame.svelte';
	import '../app.css';

	let { children } = $props();
</script>

{#snippet left()}
	フレームの左側
{/snippet}

{#snippet right()}
	{@render children()}
{/snippet}

<Frame {left} {right} />
