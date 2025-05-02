<script>
	export let href = '/';
	export let text = 'トップ';
</script>

<a
	{href}
	class="menu-button inline-block w-[200px] cursor-pointer border border-[#000066] px-4 py-2 text-center font-bold tracking-wider text-white no-underline transition-all duration-200 ease-in-out"
>
	{text}
</a>

<style>
	.menu-button {
		background: linear-gradient(to bottom, #0066cc, #003399);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
	}

	.menu-button:hover {
		background: linear-gradient(to bottom, #0077dd, #0044aa);
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
	}

	.menu-button:active {
		background: linear-gradient(to bottom, #003399, #0066cc);
		box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.7);
		transform: translateY(1px);
	}
</style>
