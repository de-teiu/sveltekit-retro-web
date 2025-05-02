<script>
	export let href = '/';
	export let text = 'トップ';
</script>

<a {href} class="menu-button">
	{text}
</a>

<style>
	.menu-button {
		display: inline-block;
		width: 200px;
		padding: 8px 16px;
		text-align: center;
		color: white;
		font-weight: bold;
		text-decoration: none;
		background: linear-gradient(to bottom, #0066cc, #003399);
		border: 1px solid #000066;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
		cursor: pointer;
		transition: all 0.2s ease;
		letter-spacing: 1px;
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
