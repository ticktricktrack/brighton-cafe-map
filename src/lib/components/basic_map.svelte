<script lang="ts">
  import { Card, List, Li, Radio } from "flowbite-svelte";
	import { HomeSolid } from "flowbite-svelte-icons";
  import maplibregl from 'maplibre-gl';
  import { MapLibre, Marker, Popup } from 'svelte-maplibre-gl';

  let lnglat = $state({ lng: -0.15718281, lat: 50.829578 });
  let lngLatText = $derived(`(${lnglat.lat.toFixed(3)}, ${lnglat.lng.toFixed(3)})`);
  let popupOpen = $state(true);
  let offset = $state(24);

  let offsets: maplibregl.Offset = $derived({
    top: [0, offset],
    bottom: [0, -offset],
    left: [offset + 12, 0],
    right: [-offset - 12, 0],
    center: [0, 0],
    'top-left': [offset, offset],
    'top-right': [-offset, offset],
    'bottom-left': [offset, -offset],
    'bottom-right': [-offset, -offset]
  });


  // Base styles
  const STYLES = new Map<string, string | maplibregl.StyleSpecification>([
    ['Voyager', 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'],
    ['Positron', 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'],
    ['Dark Matter', 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'],
    ['Demo Tiles', 'https://demotiles.maplibre.org/style.json']
  ]);
  let chosenStyle = $state('Dark Matter');
  let style = $derived(STYLES.get(chosenStyle)!);
</script>

<div class="container">
  <Card class="p-6 max-w-full mt-5 mb-10">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Basic Map</h5>
    <List tag="ul" class="space-y-1 text-gray-500 dark:text-gray-400">
      <Li>Maplibre</Li>
      <Li>default OpenStreetMap</Li>
      <Li>switchable Styles</Li>
      <Li>direct to cartocdn, no backend</Li>
    </List>
  </Card>
</div>

<div class="mb-3 flex items-center justify-between">
  <ul class="w-full items-center divide-x divide-gray-200 rounded-lg border border-gray-200 sm:flex rtl:divide-x-reverse dark:divide-gray-600 dark:border-gray-600 dark:bg-gray-800">
    {#each STYLES as [name] (name)}
      <li class="w-full"><Radio name="base-style" value={name} bind:group={chosenStyle} classes={{ label: "p-3" }}>{name}</Radio></li>
    {/each}
  </ul>
</div>

<MapLibre
  style={style}
  class="h-[60vh] min-h-[300px]"
  zoom={14}
  center={[-0.15718281, 50.829578]}
  maxPitch={85}
  attributionControl={false}
>
  <Marker bind:lnglat draggable>
    {#snippet content()}
      <div class="text-center leading-none">
        <HomeSolid class="shrink-0 text-white h-6 w-6" />
        <div class="font-bold text-white drop-shadow-xs">{lngLatText}</div>
      </div>
    {/snippet}
    <Popup class="text-black" bind:open={popupOpen} offset={offsets}>
      <span class="text-lg">{lngLatText}</span>
    </Popup>
  </Marker>
</MapLibre>
