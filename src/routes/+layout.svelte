<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { BottomNav, BottomNavItem } from "flowbite-svelte";
  import { HomeSolid, WalletSolid, AdjustmentsVerticalOutline, UserCircleSolid } from "flowbite-svelte-icons";
  import { page } from "$app/state";
	import Navbar from '$lib/components/navbar.svelte';
  let activeUrl = $derived(page.url.pathname);

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar></Navbar>

{@render children()}

<BottomNav {activeUrl} position="absolute" classes={{ inner: "grid-cols-4" }}>
  <BottomNavItem btnName="Basic Map" href="/">
    <HomeSolid />
  </BottomNavItem>
  <BottomNavItem btnName="OS Map" href="/os_map">
    <WalletSolid />
  </BottomNavItem>
</BottomNav>
