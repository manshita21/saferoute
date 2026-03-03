import { motion } from "framer-motion";
import classNames from "classnames";

export function SafetyBadge({ level }: { level: "Safe" | "Moderate" | "Unsafe" }) {
  const cls =
    level === "Safe"
      ? "sr-badge-safe"
      : level === "Moderate"
        ? "sr-badge-moderate"
        : "sr-badge-unsafe";

  const icon = level === "Safe" ? "bi-shield-check" : level === "Moderate" ? "bi-shield" : "bi-shield-x";

  return (
    <motion.span
      initial={{ scale: 0.98, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={classNames("badge rounded-pill px-3 py-2", cls)}
    >
      <i className={classNames("bi me-2", icon)} />
      {level}
    </motion.span>
  );
}

