import { Link } from "react-router-dom";
import { AppBrand } from "../components/ui/AppBrand";

export function NotFoundPage() {
  return (
    <div className="sr-page">
      <div className="sr-particles" />
      <div className="container py-5 sr-content">
        <div className="sr-glass p-4 p-md-5 sr-neon-border">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <AppBrand />
            <span className="badge rounded-pill text-bg-dark border" style={{ borderColor: "var(--sr-border)" }}>
              404
            </span>
          </div>
          <div className="display-6 fw-semibold mt-4">Page not found</div>
          <div className="sr-text-muted mt-2">
            The page you’re looking for doesn’t exist. Let’s get you back to safety.
          </div>
          <div className="d-flex gap-2 mt-4">
            <Link to="/app" className="btn sr-btn sr-btn-primary px-4">
              Go to Dashboard
            </Link>
            <Link to="/login" className="btn sr-btn px-4">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

