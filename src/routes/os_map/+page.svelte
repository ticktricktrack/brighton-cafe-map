<script lang="ts">
	import OsMap from "$lib/components/os_map.svelte";
	import type { PageProps } from "../$types";

  let { data }: PageProps = $props();
</script>

<div class="container mx-auto flex-auto">
  <OsMap geojson={data}></OsMap>
</div>
