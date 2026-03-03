import { useEffect, useMemo } from "react";
import { Circle, MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

import type { LatLng } from "../../utils/geo";

function FitBounds({ points }: { points: LatLng[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    const b = L.latLngBounds(points.map((p) => [p.lat, p.lng] as [number, number]));
    map.fitBounds(b.pad(0.25), { animate: true });
  }, [map, points]);
  return null;
}

function RoutingControl({
  source,
  destination,
}: {
  source: LatLng | null;
  destination: LatLng | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!source || !destination) return;

    // @ts-ignore
    const control = L.Routing.control({
      waypoints: [L.latLng(source.lat, source.lng), L.latLng(destination.lat, destination.lng)],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      show: false,
      fitSelectedRoutes: false,
      lineOptions: {
        styles: [{ color: "#4df2ff", opacity: 0.9, weight: 6 }],
        extendToWaypoints: true,
        missingRouteTolerance: 10,
      },
    }).addTo(map);

    return () => {
      map.removeControl(control);
    };
  }, [map, source, destination]);

  return null;
}

function FollowUser({
  enabled,
  user,
}: {
  enabled: boolean;
  user: LatLng | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (!enabled || !user) return;
    map.setView([user.lat, user.lng], Math.max(map.getZoom(), 16), { animate: true });
  }, [enabled, map, user]);
  return null;
}

export function RouteMap({
  source,
  destination,
  user,
  userAccuracyM,
  followUser,
}: {
  source: LatLng | null;
  destination: LatLng | null;
  user: LatLng | null;
  userAccuracyM: number | null;
  followUser: boolean;
}) {
  const points = useMemo(() => {
    const arr: LatLng[] = [];
    if (source) arr.push(source);
    if (destination) arr.push(destination);
    if (!source && !destination && user) arr.push(user);
    return arr;
  }, [destination, source, user]);

  return (
    <MapContainer
      center={[12.9716, 77.5946]}
      zoom={12}
      scrollWheelZoom
      style={{ width: "100%", height: 420 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {source && <Marker position={[source.lat, source.lng]} />}
      {destination && <Marker position={[destination.lat, destination.lng]} />}

      {source && destination && <RoutingControl source={source} destination={destination} />}

      {user && (
        <>
          <Marker position={[user.lat, user.lng]} />
          {typeof userAccuracyM === "number" && userAccuracyM > 0 && (
            <Circle
              center={[user.lat, user.lng]}
              radius={Math.min(userAccuracyM, 150)}
              pathOptions={{ color: "#39ff88", fillColor: "#39ff88", fillOpacity: 0.12 }}
            />
          )}
        </>
      )}

      <FitBounds points={points} />
      <FollowUser enabled={followUser} user={user} />
    </MapContainer>
  );
}

