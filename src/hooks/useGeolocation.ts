import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type GeoState =
  | { status: "idle" }
  | { status: "unsupported" }
  | { status: "permission-denied"; message: string }
  | { status: "error"; message: string }
  | {
      status: "tracking";
      lat: number;
      lng: number;
      accuracyM: number;
      speedMps: number | null;
      headingDeg: number | null;
      timestamp: number;
    };

export function useGeolocation(options?: PositionOptions) {
  const [state, setState] = useState<GeoState>({ status: "idle" });
  const watchId = useRef<number | null>(null);

  const supported = useMemo(() => typeof navigator !== "undefined" && "geolocation" in navigator, []);

  const stop = useCallback(() => {
    if (watchId.current != null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
    setState({ status: "idle" });
  }, []);

  const start = useCallback(() => {
    if (!supported) {
      setState({ status: "unsupported" });
      return;
    }
    if (watchId.current != null) return;

    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        setState({
          status: "tracking",
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracyM: pos.coords.accuracy,
          speedMps: pos.coords.speed ?? null,
          headingDeg: pos.coords.heading ?? null,
          timestamp: pos.timestamp,
        });
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setState({ status: "permission-denied", message: "Location permission was denied." });
          return;
        }
        setState({ status: "error", message: err.message || "Location error." });
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1500,
        timeout: 10000,
        ...options,
      },
    );
  }, [options, supported]);

  useEffect(() => {
    return () => {
      if (watchId.current != null) navigator.geolocation.clearWatch(watchId.current);
    };
  }, []);

  return { state, start, stop, supported };
}

