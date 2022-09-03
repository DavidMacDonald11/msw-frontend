<script>
	import { onMount } from "svelte";


	export let name;
	$: value = "..."

	onMount(async () => {
		try {
			const res = await fetch("/api/test")
			const data = await res.json()
			value = data.message
		} catch(error) {
			console.log(error)
		}
	})
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<h3>Value: {value}</h3>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
