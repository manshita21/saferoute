import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function OverviewPage() {
  return (
    <div className="container py-4 py-md-5">
      <div className="row g-3">
        <div className="col-12">
          <div className="sr-glass p-4 p-md-5 sr-neon-border">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div>
                <div className="display-6 fw-semibold">Stay safer, route smarter.</div>
                <div className="sr-text-muted mt-2" style={{ maxWidth: 720 }}>
                  SafeRoute combines real maps, live GPS tracking, and a safety score to help you make better decisions—especially at night.
                </div>
                <div className="d-flex gap-2 mt-4 flex-wrap">
                  <Link to="/app/tracker" className="btn sr-btn sr-btn-primary px-4">
                    <i className="bi bi-map me-2" />
                    Open Safety Tracker
                  </Link>
                  <Link to="/app/contacts" className="btn sr-btn px-4">
                    <i className="bi bi-telephone me-2" />
                    Manage Contacts
                  </Link>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="sr-glass-sm p-3"
                style={{
                  minWidth: 260,
                  background:
                    "radial-gradient(120px 120px at 20% 20%, rgba(77,242,255,0.16), transparent 60%), radial-gradient(140px 140px at 90% 70%, rgba(57,255,136,0.14), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
                }}
              >
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-radar" />
                  <div className="fw-semibold">Live signals</div>
                </div>
                <div className="sr-text-muted small mt-2">
                  GPS accuracy circle, speed (if available), follow mode, and stationary detection for late-night safety.
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="sr-glass-sm p-3 p-md-4 h-100">
            <div className="fw-semibold mb-1">
              <i className="bi bi-geo-alt me-2" />
              Real maps
            </div>
            <div className="sr-text-muted small">
              OpenStreetMap tiles + real routing polyline. No fake simulations.
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="sr-glass-sm p-3 p-md-4 h-100">
            <div className="fw-semibold mb-1">
              <i className="bi bi-shield-check me-2" />
              Safety scoring
            </div>
            <div className="sr-text-muted small">
              Factors: time risk, community confidence, and environmental context—presented with premium animations.
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="sr-glass-sm p-3 p-md-4 h-100">
            <div className="fw-semibold mb-1">
              <i className="bi bi-exclamation-octagon me-2" />
              Emergency ready
            </div>
            <div className="sr-text-muted small">
              Floating SOS button + contact dialing. Stationary detection prompts you before showing emergency options.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

