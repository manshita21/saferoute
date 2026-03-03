export function AppBrand({ compact }: { compact?: boolean }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <div
        className="d-inline-flex align-items-center justify-content-center"
        style={{
          width: compact ? 34 : 42,
          height: compact ? 34 : 42,
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.14)",
          background:
            "radial-gradient(circle at 30% 30%, rgba(77,242,255,0.22), transparent 55%), radial-gradient(circle at 70% 60%, rgba(57,255,136,0.22), transparent 55%), rgba(255,255,255,0.06)",
          boxShadow: "0 0 28px rgba(77,242,255,0.12)",
        }}
      >
        <i className="bi bi-shield-check" />
      </div>
      <div className="lh-sm">
        <div className="fw-semibold" style={{ letterSpacing: 0.2 }}>
          SafeRoute
        </div>
        {!compact && <div className="sr-text-muted small">Route safety, in real time.</div>}
      </div>
    </div>
  );
}

