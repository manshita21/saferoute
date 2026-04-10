/*import { readStorage, writeStorage } from "./storage";
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

import { fetchTrips, createTrip, updateTrip, deleteTrips as clearTripsApi } from "./api";

export async function readTrips(): Promise<TripRecord[]> {
  return await fetchTrips();
}

export async function clearTrips() {
  await clearTripsApi();
}

export async function writeTrips(trips: TripRecord[]) {
  // Legacy function signature to reduce diffs, but typically you'd call createTrip or updateTrip directly
  // We'll update SafetyTrackerPage to call createTrip and updateTrip.
}
*/

import type { LatLng } from "./geo";
import { fetchTrips, deleteTrips as clearTripsApi } from "./api";

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

export async function readTrips(): Promise<TripRecord[]> {
  return await fetchTrips();
}

export async function clearTrips() {
  await clearTripsApi();
}