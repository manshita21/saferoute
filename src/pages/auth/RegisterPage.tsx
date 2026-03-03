import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { notify } from "../../utils/toast";
import { AuthShell } from "./AuthShell";

export function RegisterPage() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/app" replace />;

  return (
    <AuthShell
      title="Create your account"
      subtitle="Your data is stored locally for now. You can start using the dashboard immediately."
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (password !== confirm) {
            notify.error("Passwords do not match.");
            return;
          }
          setBusy(true);
          try {
            await register({ name, email, password });
            notify.success("Account created. Welcome to SafeRoute.");
            navigate("/app", { replace: true });
          } catch (err) {
            notify.error(err instanceof Error ? err.message : "Registration failed.");
          } finally {
            setBusy(false);
          }
        }}
      >
        <div className="mb-3">
          <label className="form-label sr-text-muted">Name</label>
          <input
            className="form-control sr-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            required
            minLength={2}
          />
        </div>
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
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label sr-text-muted">Password</label>
            <input
              className="form-control sr-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              autoComplete="new-password"
              required
              minLength={6}
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label sr-text-muted">Confirm</label>
            <input
              className="form-control sr-input"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat password"
              autoComplete="new-password"
              required
              minLength={6}
            />
          </div>
        </div>

        <button className="btn sr-btn sr-btn-primary w-100 py-2 mt-3" disabled={busy}>
          {busy ? "Creating..." : "Register"}
        </button>

        <div className="d-flex justify-content-between align-items-center mt-3 small">
          <span className="sr-text-muted">Already have an account?</span>
          <Link to="/login" className="sr-link">
            Login
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}

