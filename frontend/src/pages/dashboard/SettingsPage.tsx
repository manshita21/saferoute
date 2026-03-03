import { useTheme } from "../../context/ThemeContext";
import { notify } from "../../utils/toast";

export function SettingsPage() {
  const { theme, toggle } = useTheme();
  return (
    <div className="container py-4 py-md-5">
      <div className="sr-glass p-4 p-md-5 sr-neon-border">
        <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
          <div>
            <div className="fs-5 fw-semibold">Settings</div>
            <div className="sr-text-muted mt-1">Personalize your SafeRoute experience.</div>
          </div>
        </div>

        <div className="sr-divider my-4" />

        <div className="row g-3">
          <div className="col-12 col-lg-6">
            <div className="sr-glass-sm p-3 p-md-4 h-100">
              <div className="fw-semibold mb-2">
                <i className="bi bi-moon-stars me-2" />
                Theme
              </div>
              <div className="sr-text-muted small">
                Toggle between dark neon mode and a brighter light mode.
              </div>
              <button
                className="btn sr-btn sr-btn-primary mt-3"
                onClick={() => {
                  toggle();
                  notify.info(`Switched to ${theme === "dark" ? "light" : "dark"} mode.`);
                }}
              >
                {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
              </button>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="sr-glass-sm p-3 p-md-4 h-100">
              <div className="fw-semibold mb-2">
                <i className="bi bi-shield-lock me-2" />
                Privacy note
              </div>
              <div className="sr-text-muted small">
                This is a frontend-only build. Auth, contacts, and history are stored in your browser{" "}
                <code>localStorage</code>.
              </div>
              <div className="sr-text-muted small mt-2">
                When backend integration is added, we’ll migrate this data safely.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

