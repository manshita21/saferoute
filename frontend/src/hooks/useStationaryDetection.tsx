import { useEffect, useMemo, useRef, useState } from "react";

export type StationaryStage = "none" | "stage1" | "stage2" | "stage3" | "stage4";

export function useStationaryDetection({
  enabled,
  movementStatus,
}: {
  enabled: boolean;
  movementStatus: "MOVING" | "IDLE" | "STATIONARY" | "none";
}) {
  const [stage, setStage] = useState<StationaryStage>("none");
  const [countdown, setCountdown] = useState<number>(0);

  const stageTimer = useRef<number | null>(null);
  const countdownTimer = useRef<number | null>(null);

  const ignoredUntilMove = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    if (movementStatus === "MOVING") {
      ignoredUntilMove.current = false;
      if (stage === "stage1") setStage("none");
      return;
    }

    if (movementStatus === "STATIONARY" && stage === "none" && !ignoredUntilMove.current) {
      setStage("stage1");

      if (stageTimer.current) window.clearTimeout(stageTimer.current);
      stageTimer.current = window.setTimeout(() => {
        setStage((s) => (s === "stage1" ? "stage2" : s));
      }, 10_000);
    }
  }, [enabled, movementStatus, stage]);

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
        
        ignoredUntilMove.current = true;
        setCountdown(0);
        setStage("none");
      },
      needHelp: () => {
        if (stageTimer.current) window.clearTimeout(stageTimer.current);
        stageTimer.current = null;
        setStage("stage2");
      },
      dismiss: () => {
        ignoredUntilMove.current = true;
        setStage("none");
      },
    }),
    [],
  );

  return { stage, countdown, actions };
}
