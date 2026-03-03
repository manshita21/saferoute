export type LatLng = { lat: number; lng: number };

const R = 6371e3;

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export function haversineMeters(a: LatLng, b: LatLng) {
  const φ1 = toRad(a.lat);
  const φ2 = toRad(b.lat);
  const Δφ = toRad(b.lat - a.lat);
  const Δλ = toRad(b.lng - a.lng);
  const s =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
  return R * c;
}

export function isLateNight(date: Date) {
  const h = date.getHours();
  return h >= 22 || h < 5;
}

