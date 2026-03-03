import { CityGlow } from "../../assets/illustrations/CityGlow";
import { AppBrand } from "../../components/ui/AppBrand";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="sr-page">
      <div className="sr-particles" />
      <div className="container py-4 py-md-5 sr-content">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-12 col-lg-6">
            <div className="sr-glass p-4 p-md-5 sr-neon-border">
              <AppBrand />
              <div className="mt-4">
                <div className="display-6 fw-semibold">{title}</div>
                <div className="sr-text-muted mt-2">{subtitle}</div>
              </div>
              <div className="mt-4">{children}</div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="sr-glass p-3 p-md-4 sr-neon-border">
              <div style={{ aspectRatio: "16 / 10" }}>
                <CityGlow />
              </div>
              <div className="sr-divider my-3" />
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <div className="sr-glass-sm p-3">
                    <div className="fw-semibold mb-1">
                      <i className="bi bi-geo-alt me-2" />
                      Real maps
                    </div>
                    <div className="sr-text-muted small">OpenStreetMap + routing.</div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="sr-glass-sm p-3">
                    <div className="fw-semibold mb-1">
                      <i className="bi bi-radar me-2" />
                      Live tracking
                    </div>
                    <div className="sr-text-muted small">Browser GPS, accuracy & speed.</div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="sr-glass-sm p-3">
                    <div className="fw-semibold mb-1">
                      <i className="bi bi-shield-check me-2" />
                      Safety score
                    </div>
                    <div className="sr-text-muted small">Time + community + context.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

