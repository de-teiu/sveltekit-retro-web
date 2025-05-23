<script lang="ts">
	import Frame from '../lib/Frame.svelte';
	import '../app.css';
	import MenuButton from '$lib/MenuButton.svelte';
	import Midi from '$lib/Midi.svelte';
	import MouseStalker from '$lib/MouseStalker.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	// ページのパスに基づいてタイトルを動的に設定
	const baseTitle = 'サンプルのほめぱげ';

	const pageTitle = $derived(
		(() => {
			switch (page.route.id) {
				case '/profile':
					return `${baseTitle} - プロフィール`;
				case '/underconstruction':
					return `${baseTitle} - 工事中`;
				case '/link':
					return `${baseTitle} - リンク`;
				default:
					return baseTitle;
			}
		})()
	);
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

{#snippet left()}
	<div class="flex h-full flex-col">
		<div class="flex grow flex-col items-center gap-4 p-3">
			<MenuButton href="/" text="ホーム" />
			<MenuButton href="/profile" text="プロフィール" />
			<MenuButton href="/underconstruction" text="掲示板" />
			<MenuButton href="/underconstruction" text="チャット" />
			<MenuButton href="/link" text="リンク" />
		</div>
		<div class="p-3">
			<Midi fileUrl="/nocturne.mid" loop={true} hiddenPlayer={false} autoPlay={false} />
		</div>
		<MouseStalker />
	</div>
{/snippet}

{#snippet right()}
	{@render children()}
{/snippet}

<Frame {left} {right} />
