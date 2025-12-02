import { GEOAPIFY_KEY } from "$env/static/private";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const geoapify = "https://api.geoapify.com/v2/places?categories=catering.cafe&filter=circle:-0.1576562820019872,50.82739655,1000&bias=proximity:-0.1576562820019872,50.82739655&limit=200&apiKey=";
  const cafesData = await fetch(geoapify + GEOAPIFY_KEY);

  return cafesData.json()
}
