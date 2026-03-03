import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames";

import { useAuth } from "../../context/AuthContext";
import { dashboardNav } from "../../utils/nav";
import { AppBrand } from "../ui/AppBrand";
import { notify } from "../../utils/toast";

export function Sidebar({
  open,
  permanent,
  onClose,
}: {
  open: boolean;
  permanent: boolean;
  onClose: () => void;
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const shouldShow = permanent || open;

  return (
    <>
      {!permanent && (
        <motion.div
          initial={false}
          animate={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
          className="sr-sidebar-backdrop"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial={false}
        animate={{
          x: shouldShow ? 0 : -320,
          opacity: shouldShow ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 340, damping: 32 }}
        className={classNames("sr-sidebar sr-glass", { "sr-sidebar--permanent": permanent })}
        aria-hidden={!shouldShow}
      >
        <div className="p-3 p-lg-4">
          <div className="d-flex align-items-center justify-content-between gap-2">
            <AppBrand compact />
            {!permanent && (
              <button className="btn sr-btn btn-sm" onClick={onClose} aria-label="Close sidebar">
                <i className="bi bi-x-lg" />
              </button>
            )}
          </div>

          <div className="mt-3 sr-glass-sm p-3">
            <div className="sr-text-muted small">Hi,</div>
            <div className="fw-semibold">{user?.name ?? "Traveler"}</div>
            <div className="sr-text-muted small mt-1">{user?.email ?? ""}</div>
          </div>

          <div className="sr-divider my-3" />

          <nav className="d-grid gap-1">
            {dashboardNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  classNames("sr-nav-item", { "sr-nav-item--active": isActive })
                }
                onClick={() => {
                  if (!permanent) onClose();
                }}
              >
                <i className={classNames("bi me-2", item.icon)} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="sr-divider my-3" />

          <button
            className="btn sr-btn w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={() => {
              logout();
              notify.info("Logged out.");
              navigate("/login", { replace: true });
            }}
          >
            <i className="bi bi-box-arrow-right" />
            Logout
          </button>
        </div>
      </motion.aside>
    </>
  );
}

