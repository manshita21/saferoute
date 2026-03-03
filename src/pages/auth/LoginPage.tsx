import { useMemo, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { notify } from "../../utils/toast";
import { AuthShell } from "./AuthShell";

export function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = useMemo(() => {
    const state = location.state as { from?: string } | null;
    return state?.from ?? "/app";
  }, [location.state]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/app" replace />;

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Login to assess route safety, track trips live, and keep emergency contacts ready."
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          try {
            await login({ email, password });
            notify.success("Logged in successfully.");
            navigate(from, { replace: true });
          } catch (err) {
            notify.error(err instanceof Error ? err.message : "Login failed.");
          } finally {
            setBusy(false);
          }
        }}
      >
        <div className="mb-3">
          <label className="form-label sr-text-muted">Email</label>
          <input
            className="form-control sr-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            inputMode="email"
            autoComplete="email"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label sr-text-muted">Password</label>
          <input
            className="form-control sr-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
            minLength={6}
          />
        </div>

        <button className="btn sr-btn sr-btn-primary w-100 py-2" disabled={busy}>
          {busy ? "Signing in..." : "Login"}
        </button>

        <div className="d-flex justify-content-between align-items-center mt-3 small">
          <span className="sr-text-muted">New to SafeRoute?</span>
          <Link to="/register" className="sr-link">
            Create account
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}

