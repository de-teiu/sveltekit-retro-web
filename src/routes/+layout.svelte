<script lang="ts">
	import Frame from '../lib/Frame.svelte';
	import '../app.css';
	import MenuButton from '$lib/MenuButton.svelte';
	import Midi from '$lib/Midi.svelte';

	let { children } = $props();
</script>

{#snippet left()}
	<div class="flex h-full flex-col">
		<div class="flex grow flex-col gap-4 p-3">
			<MenuButton href="/" text="ホーム" />
			<MenuButton href="/profile" text="プロフィール" />
			<MenuButton href="/bbs" text="掲示板" />
			<MenuButton href="/chat" text="チャット" />
			<MenuButton href="/link" text="リンク" />
		</div>
		<div class="p-3">
			<Midi fileUrl="/nocturne.mid" loop={true} hiddenPlayer={false} autoPlay={false} />
		</div>
	</div>
{/snippet}

{#snippet right()}
	{@render children()}
{/snippet}

<Frame {left} {right} />
