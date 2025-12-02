import { GEOAPIFY_KEY } from "$env/static/private";
import { log } from "console";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  // const osmUrl = "https://nominatim.openstreetmap.org/search?q="
  // const center = params.center;
  // const center = [-0.15718281, 50.829578]
  // const bbox = [-0.165460, 50.822828, -0.147264, 50.832342]

  const geoapify = "https://api.geoapify.com/v2/places?categories=catering.cafe&filter=circle:-0.15845,50.82715,1000&bias=proximity:-0.15845,50.82715&limit=20&apiKey=";
  const cafesData = await fetch(geoapify + GEOAPIFY_KEY);

  return cafesData.json()
}
