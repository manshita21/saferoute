import { readStorage, writeStorage } from "./storage";
import type { LatLng } from "./geo";

export type TripFeedback = {
  rating: "Safe" | "Unsafe";
  comment?: string;
};

export type TripRecord = {
  id: string;
  createdAt: string;
  plannedTimeISO: string;
  sourceLabel: string;
  destinationLabel: string;
  source: LatLng;
  destination: LatLng;
  safetyScore: number;
  safetyLevel: "Safe" | "Moderate" | "Unsafe";
  status: "planned" | "tracking" | "completed" | "ended-early";
  feedback?: TripFeedback;
};

export const TRIPS_KEY = "saferoute.trips.v1";

export function readTrips(): TripRecord[] {
  return readStorage<TripRecord[]>(TRIPS_KEY, []);
}

export function writeTrips(trips: TripRecord[]) {
  writeStorage(TRIPS_KEY, trips);
}

