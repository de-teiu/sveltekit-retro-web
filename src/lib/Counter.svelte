<script lang="ts">
	import { zeroPad } from './utils/number';

	const { count } = $props();
	const formattedCount = $derived(zeroPad(count, 6));
</script>

<div class="text-base">
	あなたは
	<span
		class="counter-display bg-black p-[3px] font-['DigitTech',monospace] text-[22px] text-[#00ff00]"
		>{formattedCount}
	</span>
	人目の来訪者です。
</div>

<style>
	.counter-display {
		border: ridge 4px #b3c6eb;
	}
</style>
