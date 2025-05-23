<script lang="ts">
	import Marquee from '$lib/Marquee.svelte';
	import Counter from '$lib/Counter.svelte';
	import GreetingMessage from '$lib/GreetingMessage.svelte';
</script>

<div class="flex flex-col p-4">
	<p>Sorry, this site is Japanese only!</p>
	<h1 class="mb-0 text-center text-4xl font-bold text-[#ff6600] md:text-6xl">サンプルのほめぱげ</h1>
	<p class="mt-0 text-center">since 2025.05.30</p>

	<div class="my-4 text-center">
		<Counter count={12345} />
		<Marquee text="キリ番を踏んだら掲示板で報告しましょう！！！" />
	</div>

	<div class="my-4 border border-[#cccccc] bg-[#f5f5f5] p-4 text-center text-xl">
		<GreetingMessage />
	</div>

	<div class="my-8 p-4 text-center text-base">
		<p>
			当サイトはリンクフリーです。リンクを貼る際は、必要に応じて以下のバナーをご自由にお使いください。（画像への直リンクは禁止です）
		</p>
		<div class="mt-4 text-center">
			<img src="/banner.png" alt="サイトバナー" class="mx-auto h-auto max-w-full" />
		</div>
	</div>
</div>
