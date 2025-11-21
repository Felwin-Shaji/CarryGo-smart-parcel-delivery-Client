import { OpenStreetMapProvider } from "leaflet-geosearch";

const provider = new OpenStreetMapProvider();

export const addressSearch = async (query: string) => {
  try {
    // 1. SEARCH (NO CORS ISSUE)
    const results = await provider.search({ query });

    if (!results.length) return null;

    const place = results[0];

    const lat = place.y;
    const lng = place.x;

    // 2. REVERSE GEOCODE (ALLOWED IN BROWSER)
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );

    const details = await res.json();

    return {
      lat,
      lng,
      label: place.label,
      address: details.address,
    };

  } catch (err) {
    console.log("Search error", err);
    return null;
  }
};
