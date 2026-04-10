import { useEffect, useMemo, useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";

import { PlaceSearchInput } from "../../components/ui/PlaceSearchInput";
import { RouteMap } from "../../components/map/RouteMap";
import { CircularScore } from "../../components/ui/CircularScore";
import { SafetyBadge } from "../../components/ui/SafetyBadge";
import { Modal } from "../../components/ui/Modal";
import { type SafetyResult } from "../../utils/safetyScore";
import { checkSafety, createTrip, updateTrip, submitFeedback } from "../../utils/api";
import { toLatLng, type NominatimResult } from "../../utils/nominatim";
import type { LatLng } from "../../utils/geo";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useStationaryDetection } from "../../hooks/useStationaryDetection";
import { notify } from "../../utils/toast";
import { type TripFeedback, type TripRecord } from "../../utils/trips";

export function SafetyTrackerPage() {
  const [sourceText, setSourceText] = useState("");
  const [destinationText, setDestinationText] = useState("");
  const [sourcePick, setSourcePick] = useState<NominatimResult | null>(null);
  const [destinationPick, setDestinationPick] = useState<NominatimResult | null>(null);
  const [time, setTime] = useState(() => new Date().toISOString().slice(11, 16));
  const [result, setResult] = useState<SafetyResult | null>(null);
  const [checking, setChecking] = useState(false);
  const [movementStatus, setMovementStatus] = useState<"MOVING" | "IDLE" | "STATIONARY" | "none">("none");

  const [followUser, setFollowUser] = useState(true);
  const geo = useGeolocation();
  const livePosition: LatLng | null =
    geo.state.status === "tracking" ? { lat: geo.state.lat, lng: geo.state.lng } : null;

  const { stage, countdown, actions } = useStationaryDetection({
    enabled: geo.state.status === "tracking",
    movementStatus,
  });

  const source = useMemo<LatLng | null>(() => (sourcePick ? toLatLng(sourcePick) : null), [sourcePick]);
  const destination = useMemo<LatLng | null>(() => (destinationPick ? toLatLng(destinationPick) : null), [
    destinationPick,
  ]);

  const [activeTripId, setActiveTripId] = useState<string | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState<TripFeedback["rating"]>("Safe");
  const [feedbackComment, setFeedbackComment] = useState("");

  const currentLat = geo.state.status === "tracking" ? geo.state.lat : undefined;
  const currentLng = geo.state.status === "tracking" ? geo.state.lng : undefined;

  const liveCoords = useRef({ lat: currentLat, lng: currentLng });
  useEffect(() => {
    liveCoords.current = { lat: currentLat, lng: currentLng };
  }, [currentLat, currentLng]);

  useEffect(() => {
    if (geo.state.status !== "tracking") return;

    if (activeTripId) {
      updateTrip(activeTripId, { status: "tracking" }).catch(console.error);
    }

    const interval = window.setInterval(async () => {
      const { lat, lng: lon } = liveCoords.current;
      if (lat === undefined || lon === undefined) return;

      try {
        const safety = await checkSafety({
          source: sourcePick?.display_name || "",
          destination: destinationPick?.display_name || "",
          time,
          lat,
          lon
        });
        if (safety.movementStatus) {
          setMovementStatus(safety.movementStatus);
        }
      } catch (e) {
        console.error("Polling error", e);
      }
    }, 10000);
    return () => window.clearInterval(interval);
  }, [activeTripId, geo.state.status, sourcePick?.display_name, destinationPick?.display_name, time]);

  useEffect(() => {
    // If user edits text after picking, clear the pick to avoid stale coords.
    if (sourcePick && sourceText !== sourcePick.display_name) setSourcePick(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceText]);
  useEffect(() => {
    if (destinationPick && destinationText !== destinationPick.display_name) setDestinationPick(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationText]);

  const tripSeed = useMemo(() => {
    const s = sourcePick?.place_id ?? "s";
    const d = destinationPick?.place_id ?? "d";
    return `${s}-${d}-${time}`;
  }, [destinationPick?.place_id, sourcePick?.place_id, time]);

  function plannedTimeAsDate() {
    const now = new Date();
    const [hh, mm] = time.split(":").map((x) => Number(x));
    const dt = new Date(now);
    dt.setHours(hh || 0, mm || 0, 0, 0);
    return dt;
  }

  const accuracy = geo.state.status === "tracking" ? geo.state.accuracyM : null;
  const speed = geo.state.status === "tracking" ? geo.state.speedMps : null;

  return (
    <div className="container py-4 py-md-5">
      <div className="sr-glass p-4 p-md-5 sr-neon-border">
        <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
          <div>
            <div className="fs-5 fw-semibold">Safety Tracker</div>
            <div className="sr-text-muted mt-1">
              Search real places, draw a real route, and get an animated safety assessment.
            </div>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <button
              className="btn sr-btn btn-sm"
              onClick={() => setFollowUser((v) => !v)}
              disabled={geo.state.status !== "tracking"}
              title="Toggle follow"
            >
              <i className="bi bi-crosshair" /> {followUser ? "Following" : "Free pan"}
            </button>
          </div>
        </div>

        <div className="sr-divider my-4" />

        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <div className="d-grid gap-3">
              <div className="sr-glass-sm p-3 p-md-4">
                <div className="row g-3">
                  <div className="col-12">
                    <PlaceSearchInput
                      label="Source"
                      placeholder="Search starting point"
                      value={sourceText}
                      onChange={setSourceText}
                      onPick={(r) => {
                        setSourcePick(r);
                        setSourceText(r.display_name);
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <PlaceSearchInput
                      label="Destination"
                      placeholder="Search destination"
                      value={destinationText}
                      onChange={setDestinationText}
                      onPick={(r) => {
                        setDestinationPick(r);
                        setDestinationText(r.display_name);
                      }}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label sr-text-muted small">Planned time</label>
                    <input
                      className="form-control sr-input"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-end">
                    <button
                      className="btn sr-btn sr-btn-primary w-100"
                      disabled={checking || !source || !destination}
                      onClick={async () => {
                        if (!source || !destination || !sourcePick || !destinationPick) {
                          notify.error("Pick both source and destination from search.");
                          return;
                        }
                        setChecking(true);
                        try {
                          const safetyResp = await checkSafety({
                            source: sourcePick.display_name,
                            destination: destinationPick.display_name,
                            time
                          });

                          setResult({
                            score: safetyResp.score,
                            level: safetyResp.level,
                            breakdown: { timeRisk: 80, community: 80, environment: 80 },
                            notes: [`Community feedback count: ${safetyResp.CommunityFeedbackCount}`]
                          });

                          const newTrip = await createTrip({
                            createdAt: new Date().toISOString(),
                            plannedTimeISO: plannedTimeAsDate().toISOString(),
                            sourceLabel: sourcePick.display_name,
                            destinationLabel: destinationPick.display_name,
                            source,
                            destination,
                            safetyScore: safetyResp.score,
                            safetyLevel: safetyResp.level,
                            status: "planned",
                          });
                          setActiveTripId(newTrip.id);
                          notify.success("Safety score generated.");
                        } catch (e: any) {
                          notify.error(e.message || "Failed to check safety.");
                        } finally {
                          setChecking(false);
                        }
                      }}
                    >
                      {checking ? "Checking…" : "Check Safety"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="sr-glass-sm p-3 p-md-4">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div className="fw-semibold">
                    <i className="bi bi-broadcast me-2" />
                    Live tracking
                  </div>
                  <div className="d-flex gap-2">
                    {geo.state.status !== "tracking" ? (
                      <button className="btn sr-btn btn-sm" onClick={geo.start}>
                        Start Live Tracking
                      </button>
                    ) : (
                      <button
                        className="btn sr-btn btn-sm"
                        onClick={async () => {
                          geo.stop();
                          setMovementStatus("none");
                          if (activeTripId) {
                            await updateTrip(activeTripId, { status: "completed" });
                            setFeedbackOpen(true);
                          }
                          notify.info("Live tracking stopped.");
                        }}
                      >
                        Stop
                      </button>
                    )}
                  </div>
                </div>

                {geo.state.status === "permission-denied" && (
                  <div className="sr-text-muted mt-2 small">
                    Location permission denied. Enable location access in your browser settings to use live tracking.
                  </div>
                )}
                {geo.state.status === "unsupported" && (
                  <div className="sr-text-muted mt-2 small">Geolocation is not supported in this browser.</div>
                )}
                {geo.state.status === "tracking" && (
                  <div className="row g-2 mt-2">
                    <div className="col-6">
                      <div className="sr-glass-sm p-2">
                        <div className="sr-text-muted small">Accuracy</div>
                        <div className="fw-semibold">{Math.round(geo.state.accuracyM)} m</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="sr-glass-sm p-2">
                        <div className="sr-text-muted small">Speed</div>
                        <div className="fw-semibold">
                          {speed == null ? "—" : `${Math.round(speed * 3.6)} km/h`}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {checking && (
                <div className="sr-glass-sm p-3">
                  <Skeleton height={140} />
                </div>
              )}

              {!checking && result && (
                <motion.div
                  className="sr-glass-sm p-3 p-md-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div>
                      <div className="fw-semibold">Safety assessment</div>
                      <div className="sr-text-muted small">Score is simulated client-side for now.</div>
                    </div>
                    <SafetyBadge level={result.level} />
                  </div>

                  <div className="d-flex align-items-center gap-3 mt-3 flex-wrap">
                    <CircularScore score={result.score} />
                    <div className="flex-grow-1" style={{ minWidth: 220 }}>
                      <div className="sr-text-muted small mb-2">Breakdown</div>
                      <div className="d-grid gap-2">
                        <div>
                          <div className="d-flex justify-content-between small">
                            <span className="sr-text-muted">Time risk</span>
                            <span className="fw-semibold">{Math.round(result.breakdown.timeRisk)}</span>
                          </div>
                          <div className="progress" style={{ height: 8, background: "rgba(255,255,255,0.08)" }}>
                            <div
                              className="progress-bar"
                              style={{
                                width: `${result.breakdown.timeRisk}%`,
                                background: "linear-gradient(90deg, rgba(77,242,255,0.9), rgba(57,255,136,0.9))",
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="d-flex justify-content-between small">
                            <span className="sr-text-muted">Community</span>
                            <span className="fw-semibold">{Math.round(result.breakdown.community)}</span>
                          </div>
                          <div className="progress" style={{ height: 8, background: "rgba(255,255,255,0.08)" }}>
                            <div
                              className="progress-bar"
                              style={{
                                width: `${result.breakdown.community}%`,
                                background: "linear-gradient(90deg, rgba(139,92,255,0.9), rgba(77,242,255,0.9))",
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="d-flex justify-content-between small">
                            <span className="sr-text-muted">Environment</span>
                            <span className="fw-semibold">{Math.round(result.breakdown.environment)}</span>
                          </div>
                          <div className="progress" style={{ height: 8, background: "rgba(255,255,255,0.08)" }}>
                            <div
                              className="progress-bar"
                              style={{
                                width: `${result.breakdown.environment}%`,
                                background: "linear-gradient(90deg, rgba(255,191,60,0.95), rgba(57,255,136,0.9))",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="sr-text-muted small mt-3">{result.notes[0]}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <div className="sr-glass-sm p-2 p-md-3">
              <RouteMap
                source={source}
                destination={destination}
                user={livePosition}
                userAccuracyM={accuracy}
                followUser={followUser}
              />
              <div className="d-flex justify-content-between flex-wrap gap-2 mt-2 px-1">
                <div className="sr-text-muted small">
                  Map tiles: OpenStreetMap. Routing: Leaflet Routing Machine.
                </div>
                <div className="sr-text-muted small">
                  {geo.state.status === "tracking"
                    ? `GPS active • ${new Date(geo.state.timestamp).toLocaleTimeString()}`
                    : "GPS idle"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={stage === "stage1"}
        title="We noticed you haven't moved"
        onClose={actions.imFine}
        footer={
          <div className="d-flex gap-2 justify-content-end">
            <button className="btn sr-btn" onClick={actions.imFine}>
              I'm Fine
            </button>
            <button className="btn sr-btn sr-btn-primary" onClick={actions.needHelp}>
              Need Help
            </button>
          </div>
        }
      >
        <div className="sr-text-muted">
          If you’re stopped for a while, we’ll check in. If you don’t respond, Emergency Mode will
          activate and show quick call options.
        </div>
      </Modal>

      {(stage === "stage2" || stage === "stage3" || stage === "stage4") && (
        <div className="sr-emergency-overlay">
          <div className="container py-4">
            <div className="sr-glass p-4 p-md-5 sr-neon-border">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                <div className="d-flex align-items-center gap-2">
                  <span className="badge rounded-pill sr-badge-unsafe px-3 py-2">
                    <i className="bi bi-exclamation-octagon me-2" />
                    Emergency Mode
                  </span>
                  <span className="sr-text-muted small">No auto-calls. You stay in control.</span>
                </div>
                <button className="btn sr-btn btn-sm" onClick={actions.imFine}>
                  I'm Fine
                </button>
              </div>

              {stage === "stage3" && (
                <div className="mt-4">
                  <div className="fw-semibold">Starting emergency options in</div>
                  <div className="display-5 fw-bold mt-1">{countdown}s</div>
                  <div className="sr-text-muted mt-2">
                    If you need help immediately, use the SOS button or choose a contact below once available.
                  </div>
                </div>
              )}

              {stage === "stage4" && (
                <div className="mt-4">
                  <div className="fw-semibold">Quick call</div>
                  <div className="sr-text-muted mt-1">Tap to call an emergency contact.</div>
                  <div className="d-grid gap-2 mt-3">
                    <button className="btn sr-btn w-100 d-flex justify-content-between" onClick={() => window.location.href = "tel:108"}>
                      <span className="fw-semibold">Ambulance</span>
                      <span className="sr-text-muted">108</span>
                    </button>
                    <button className="btn sr-btn w-100 d-flex justify-content-between" onClick={() => window.location.href = "tel:100"}>
                      <span className="fw-semibold">Police</span>
                      <span className="sr-text-muted">100</span>
                    </button>
                  </div>
                  <button className="btn sr-btn w-100 mt-3" onClick={actions.dismiss}>
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Modal
        open={feedbackOpen}
        title="Community feedback"
        onClose={() => setFeedbackOpen(false)}
        footer={
          <div className="d-flex gap-2 justify-content-end flex-wrap">
            <button className="btn sr-btn" onClick={() => setFeedbackOpen(false)}>
              Skip
            </button>
            <button
              className="btn sr-btn sr-btn-primary"
              onClick={async () => {
                if (!activeTripId) return;
                try {
                  await updateTrip(activeTripId, { status: "completed" });

                  const ratingInt = feedbackRating === "Safe" ? 5 : 1;
                  let endT = new Date();
                  let endMins = endT.getMinutes().toString().padStart(2, '0');
                  let travelTime = `${endT.getHours()}:${endMins}`;

                  await submitFeedback({
                    source: sourcePick?.display_name || "",
                    destination: destinationPick?.display_name || "",
                    rating: ratingInt,
                    comment: feedbackComment.trim() || undefined,
                    travelTime
                  });

                  notify.success("Thanks for your feedback.");
                  setFeedbackOpen(false);
                  setFeedbackComment("");
                  setFeedbackRating("Safe");
                } catch (e: any) {
                  notify.error("Failed to save feedback.");
                }
              }}
            >
              Save feedback
            </button>
          </div>
        }
      >
        <div className="sr-text-muted">
          Help improve route safety insights for others. Your feedback is stored locally for now.
        </div>
        <div className="d-flex gap-2 mt-3">
          <button
            className={`btn sr-btn ${feedbackRating === "Safe" ? "sr-btn-primary" : ""}`}
            onClick={() => setFeedbackRating("Safe")}
          >
            <i className="bi bi-emoji-smile me-2" />
            Safe
          </button>
          <button
            className={`btn sr-btn ${feedbackRating === "Unsafe" ? "sr-btn-primary" : ""}`}
            onClick={() => setFeedbackRating("Unsafe")}
          >
            <i className="bi bi-emoji-frown me-2" />
            Unsafe
          </button>
        </div>
        <div className="mt-3">
          <label className="form-label sr-text-muted small">Optional comment</label>
          <textarea
            className="form-control sr-input"
            rows={3}
            value={feedbackComment}
            onChange={(e) => setFeedbackComment(e.target.value)}
            placeholder="Anything notable on this route?"
          />
        </div>
      </Modal>
    </div>
  );
}

