<script lang="ts">
  import { Card, List, Li } from "flowbite-svelte";
  import { MapLibre, NavigationControl, ScaleControl, GeoJSONSource, CircleLayer, Marker, FeatureState, Popup } from 'svelte-maplibre-gl';
  import maplibregl from 'maplibre-gl';
  import { PUBLIC_OS_APIKEY } from "$env/static/public";

  let osUrl = "https://api.os.uk/maps/vector/v1/vts/resources/styles?srs=3857&key=" + PUBLIC_OS_APIKEY;
  let center = $state({ lng: -0.15718281, lat: 50.829578 });
  let { geojson } = $props();
  // $inspect(geojson)

  let hoveredFeature: maplibregl.MapGeoJSONFeature | undefined = $state.raw();
  // $inspect(hoveredFeature);
  let lnglat = $state.raw(new maplibregl.LngLat(0, 0))
</script>

<div class="container">
  <Card class="p-6 max-w-full mt-5 mb-10">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Hove Cafe Map</h5>
    <List tag="ul" class="space-y-1 text-gray-500 dark:text-gray-400">
      <Li>OS Vector Map</Li>
      <Li>not proxied, but I don't fully trust the OS docs here</Li>
      <Li>MapLibre GL</Li>
      <Li>local cafes via the free tier on GeoApify </Li>
      <Li>via server request with api key safe in .env</Li>
      <Li>just a single request searching in radius of my house for now</Li>
    </List>
  </Card>
</div>

<MapLibre
  class="h-[60vh] min-h-[300px]"
  zoom={14}
  minZoom={6}
  maxZoom={18}
  style={osUrl}
  maxBounds={[[ -10.76418, 49.528423 ],[ 1.9134116, 61.331151 ]]}
  center={center}
  attributionControl=false
>
  <NavigationControl />
  <ScaleControl />

  <GeoJSONSource data={geojson} id="cafes">
    <CircleLayer
    paint={{
      'circle-radius': 8,
      'circle-color': '#075985'
    }}
    filter={[
      'case',
      ['==', ['to-string', ['global-state', 'type']], ''],
      true,
      ['==', ['get', 'type'], ['global-state', 'type']]
    ]}
    onmousemove={(event) => {
      hoveredFeature = event.features?.[0];
      lnglat = event.lngLat;
    }}
    onmouseleave={() => (hoveredFeature = undefined)}
  />

  {#if hoveredFeature}
    <FeatureState id={hoveredFeature.id} state={{ hover: true }} />
    <Popup {lnglat} closeButton={false}>
      <p>
        {hoveredFeature.properties.formatted}
      </p>
    </Popup>
    {/if}
  </GeoJSONSource>
</MapLibre>
