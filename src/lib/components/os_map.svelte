<script lang="ts">
  import { MapLibre, NavigationControl, ScaleControl, GeoJSONSource, CircleLayer, Marker, FeatureState, Popup } from 'svelte-maplibre-gl';
  import maplibregl from 'maplibre-gl';

  let apiKey = "Hb91b0XytB0yTTKs6US3ge99l5JykewO";
  let osUrl = "https://api.os.uk/maps/vector/v1/vts/resources/styles?srs=3857&key=" + apiKey;
  let center = $state({ lng: -0.15718281, lat: 50.829578 });
  let { geojson } = $props();
  // $inspect(geojson)

  let hoveredFeature: maplibregl.MapGeoJSONFeature | undefined = $state.raw();
  // $inspect(hoveredFeature);
  let lnglat = $state.raw(new maplibregl.LngLat(0, 0))
</script>

<MapLibre
  class="h-[60vh] min-h-[300px]"
  zoom={13}
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
    onmousemove={(ev) => {
      hoveredFeature = ev.features?.[0];
      lnglat = ev.lngLat;
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
