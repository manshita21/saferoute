import { useMemo, useState } from "react";

import { SafetyBadge } from "../../components/ui/SafetyBadge";
import { readTrips, writeTrips, type TripRecord } from "../../utils/trips";
import { notify } from "../../utils/toast";

export function TripHistoryPage() {
  const [q, setQ] = useState("");
  const [version, setVersion] = useState(0);
  const trips = useMemo(() => {
    void version;
    return readTrips();
  }, [version]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return trips;
    return trips.filter((t) => {
      const hay = `${t.sourceLabel} ${t.destinationLabel} ${t.safetyLevel} ${t.status}`.toLowerCase();
      return hay.includes(query);
    });
  }, [q, trips]);

  return (
    <div className="container py-4 py-md-5">
      <div className="sr-glass p-4 p-md-5 sr-neon-border">
        <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
          <div>
            <div className="fs-5 fw-semibold">Trip History</div>
            <div className="sr-text-muted mt-1">Your safety checks and tracking sessions (stored locally).</div>
          </div>
          <div className="d-flex gap-2">
            <input
              className="form-control sr-input"
              placeholder="Search trips"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{ minWidth: 220 }}
            />
            <button
              className="btn sr-btn"
              onClick={() => {
                writeTrips([]);
                setVersion((v) => v + 1);
                notify.info("Trip history cleared.");
              }}
              title="Clear history"
            >
              <i className="bi bi-trash3" />
            </button>
          </div>
        </div>

        <div className="sr-divider my-4" />

        {filtered.length === 0 ? (
          <div className="sr-glass-sm p-4 text-center">
            <div
              className="mx-auto mb-2 d-inline-flex align-items-center justify-content-center"
              style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                border: "1px solid var(--sr-border)",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <i className="bi bi-clock-history fs-4" />
            </div>
            <div className="fw-semibold">No trips yet</div>
            <div className="sr-text-muted small mt-1">Run a safety check from Safety Tracker to see history here.</div>
          </div>
        ) : (
          <div className="row g-3">
            {filtered.map((t) => (
              <div key={t.id} className="col-12 col-lg-6">
                <TripCard trip={t} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function statusBadge(status: TripRecord["status"]) {
  if (status === "completed") return { label: "Completed", cls: "sr-badge-safe" };
  if (status === "tracking") return { label: "Tracking", cls: "sr-badge-moderate" };
  if (status === "ended-early") return { label: "Ended early", cls: "sr-badge-unsafe" };
  return { label: "Planned", cls: "sr-badge-moderate" };
}

function TripCard({ trip }: { trip: TripRecord }) {
  const s = statusBadge(trip.status);
  const planned = new Date(trip.plannedTimeISO);
  return (
    <div className="sr-glass-sm p-3 p-md-4 h-100">
      <div className="d-flex align-items-start justify-content-between gap-2">
        <div>
          <div className="fw-semibold text-truncate" title={trip.sourceLabel}>
            {trip.sourceLabel.split(",")[0]}
          </div>
          <div className="sr-text-muted small text-truncate" title={trip.destinationLabel}>
            to {trip.destinationLabel.split(",")[0]}
          </div>
        </div>
        <span className={`badge rounded-pill px-3 py-2 ${s.cls}`}>{s.label}</span>
      </div>

      <div className="sr-divider my-3" />

      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div className="sr-text-muted small">
          <i className="bi bi-calendar3 me-2" />
          {planned.toLocaleString()}
        </div>
        <SafetyBadge level={trip.safetyLevel} />
      </div>

      <div className="mt-3 d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
          <div className="sr-text-muted small">Safety score</div>
          <div className="fw-bold fs-4">{trip.safetyScore}</div>
        </div>
        <div className="text-end">
          <div className="sr-text-muted small">Community</div>
          <div className="fw-semibold">
            {trip.feedback ? (
              <>
                {trip.feedback.rating === "Safe" ? (
                  <span className="text-success">Safe</span>
                ) : (
                  <span style={{ color: "var(--sr-red)" }}>Unsafe</span>
                )}
              </>
            ) : (
              <span className="sr-text-muted">—</span>
            )}
          </div>
        </div>
      </div>

      {trip.feedback?.comment && (
        <div className="sr-text-muted small mt-3">
          <i className="bi bi-chat-left-text me-2" />
          {trip.feedback.comment}
        </div>
      )}
    </div>
  );
}

