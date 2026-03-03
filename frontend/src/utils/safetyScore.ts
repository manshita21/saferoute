import { isLateNight } from "./geo";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export type SafetyBreakdown = {
  timeRisk: number; // 0..100 (higher is safer)
  community: number;
  environment: number;
};

export type SafetyResult = {
  score: number;
  level: "Safe" | "Moderate" | "Unsafe";
  breakdown: SafetyBreakdown;
  notes: string[];
};

export function computeSafetyScore(input: { plannedTime: Date; seed: string }): SafetyResult {
  const rnd = mulberry32(hashString(input.seed));

  const late = isLateNight(input.plannedTime);
  const baseTime = late ? 56 : 82;
  const timeJitter = (rnd() - 0.5) * (late ? 12 : 8);
  const timeRisk = clamp(baseTime + timeJitter, 25, 95);

  const community = clamp(65 + (rnd() - 0.5) * 28, 30, 95);
  const environment = clamp(68 + (rnd() - 0.5) * 26, 30, 95);

  const score = clamp(Math.round(timeRisk * 0.45 + community * 0.3 + environment * 0.25), 0, 100);
  const level = score >= 75 ? "Safe" : score >= 50 ? "Moderate" : "Unsafe";

  const notes: string[] = [];
  if (late) notes.push("Late-night travel detected (higher risk).");
  if (community < 55) notes.push("Community confidence is lower on parts of this route.");
  if (environment < 55) notes.push("Environmental context indicates moderate risk zones.");
  if (notes.length === 0) notes.push("Overall conditions look favorable for this trip.");

  return { score, level, breakdown: { timeRisk, community, environment }, notes };
}

