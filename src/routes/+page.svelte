<script lang="ts">
	import Marquee from '$lib/Marquee.svelte';
	import Counter from '$lib/Counter.svelte';
	import GreetingMessage from '$lib/GreetingMessage.svelte';
</script>

<div class="container">
	<p>Sorry, this site is Japanese only!</p>
	<h1 class="title mb-0">DE-TEIUのほめぱげ</h1>
	<p class="mt-0 text-center">since 2025.05.30</p>

	<div class="counter-container">
		<Counter count={12345} />
		<Marquee text="キリ番を踏んだら掲示板で報告しましょう！！！" />
	</div>

	<div class="greeting-container">
		<GreetingMessage />
	</div>

	<div class="link-free-container">
		<p>
			当サイトはリンクフリーです。リンクを貼る際は、必要に応じて以下のバナーをご自由にお使いください。（画像への直リンクは禁止です）
		</p>
		<div class="banner-container">
			<img src="/banner.png" alt="サイトバナー" />
		</div>
	</div>
</div>

<style>
	.container {
		padding: 1rem;
		display: flex;
		flex-direction: column;
	}

	.title {
		font-size: 4rem;
		font-weight: bold;
		text-align: center;
		color: #ff6600;
	}

	.counter-container {
		margin: 1rem 0;
		text-align: center;
	}

	.greeting-container {
		margin: 1rem 0;
		padding: 1rem;
		border: solid 1px #cccccc;
		background-color: #f5f5f5;
		font-size: 1.2rem;
		text-align: center;
	}

	.link-free-container {
		margin: 2rem 0;
		padding: 1rem;
		font-size: 1rem;
		text-align: center;
	}

	.banner-container {
		margin-top: 1rem;
		text-align: center;
	}

	.banner-container img {
		max-width: 100%;
		height: auto;
		margin: 0 auto;
	}
</style>
