import { useEffect, useMemo, useRef, useState } from "react";
import { haversineMeters, isLateNight, type LatLng } from "../utils/geo";

export type StationaryStage = "none" | "stage1" | "stage2" | "stage3" | "stage4";

export function useStationaryDetection({
  enabled,
  position,
}: {
  enabled: boolean;
  position: LatLng | null;
}) {
  const [stage, setStage] = useState<StationaryStage>("none");
  const [countdown, setCountdown] = useState<number>(0);

  const lastMovedPos = useRef<LatLng | null>(null);
  const lastMovedAt = useRef<number>(Date.now());
  const stageTimer = useRef<number | null>(null);
  const countdownTimer = useRef<number | null>(null);
  const lateNight = isLateNight(new Date());

  useEffect(() => {
    if (!enabled || !position) return;
    if (!lateNight) return;

    if (!lastMovedPos.current) {
      lastMovedPos.current = position;
      lastMovedAt.current = Date.now();
      return;
    }

    const d = haversineMeters(lastMovedPos.current, position);
    if (d >= 20) {
      lastMovedPos.current = position;
      lastMovedAt.current = Date.now();
      if (stage !== "none") setStage("none");
      return;
    }

    const stillForMs = Date.now() - lastMovedAt.current;
    if (stillForMs >= 30_000 && stage === "none") {
      setStage("stage1");

      if (stageTimer.current) window.clearTimeout(stageTimer.current);
      stageTimer.current = window.setTimeout(() => {
        setStage((s) => (s === "stage1" ? "stage2" : s));
      }, 10_000);
    }
  }, [enabled, lateNight, position, stage]);

  useEffect(() => {
    if (stage !== "stage3") return;
    setCountdown(10);
    if (countdownTimer.current) window.clearInterval(countdownTimer.current);
    countdownTimer.current = window.setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          window.clearInterval(countdownTimer.current!);
          countdownTimer.current = null;
          setStage("stage4");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }, [stage]);

  useEffect(() => {
    if (stage !== "stage2") return;
    // Immediately enter countdown view after 300ms to animate overlay
    const t = window.setTimeout(() => setStage("stage3"), 300);
    return () => window.clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    return () => {
      if (stageTimer.current) window.clearTimeout(stageTimer.current);
      if (countdownTimer.current) window.clearInterval(countdownTimer.current);
    };
  }, []);

  const actions = useMemo(
    () => ({
      imFine: () => {
        if (stageTimer.current) window.clearTimeout(stageTimer.current);
        stageTimer.current = null;
        if (countdownTimer.current) window.clearInterval(countdownTimer.current);
        countdownTimer.current = null;
        lastMovedAt.current = Date.now();
        setCountdown(0);
        setStage("none");
      },
      needHelp: () => {
        if (stageTimer.current) window.clearTimeout(stageTimer.current);
        stageTimer.current = null;
        setStage("stage2");
      },
      dismiss: () => {
        // allow closing stage4 UI, but keep detection running
        setStage("none");
      },
    }),
    [],
  );

  return { stage, countdown, lateNight, actions };
}

