import React from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<Props, State & { error?: Error }> {
  state: State & { error?: Error } = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="sr-page">
        <div className="sr-particles" />
        <div className="sr-content container py-5">
          <div className="sr-glass p-4 p-md-5 sr-neon-border">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="d-inline-flex align-items-center justify-content-center"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  border: "1px solid var(--sr-border)",
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <i className="bi bi-exclamation-triangle" />
              </div>
              <div>
                <div className="fs-5 fw-semibold">Something went wrong</div>
                <div className="sr-text-muted">
                  {this.state.error?.message || "SafeRoute hit an unexpected error. Please refresh to continue."}
                </div>
              </div>
            </div>
            <button
              className="btn sr-btn sr-btn-primary px-4"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    );
  }
}

