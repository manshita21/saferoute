export type NominatimResult = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type?: string;
  importance?: number;
};

export async function nominatimSearch(
  query: string,
  opts?: { signal?: AbortSignal; limit?: number },
): Promise<NominatimResult[]> {
  const q = query.trim();
  if (q.length < 3) return [];

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("q", q);
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("limit", String(opts?.limit ?? 6));

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    signal: opts?.signal,
  });

  if (!res.ok) throw new Error("Geocoding failed. Please try again.");
  return (await res.json()) as NominatimResult[];
}

export function toLatLng(r: NominatimResult) {
  return { lat: Number(r.lat), lng: Number(r.lon) };
}

