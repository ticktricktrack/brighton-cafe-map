<script lang="ts">
	import { Navbar, NavBrand } from 'flowbite-svelte';
	import { GlobeOutline } from 'flowbite-svelte-icons';
</script>

<Navbar>
	<NavBrand href="/">
		<GlobeOutline class="h-6 w-6 text-green-400 dark:text-green-400 shrink-0" />
		<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
			>Map Playground</span
		>
	</NavBrand>
</Navbar>
