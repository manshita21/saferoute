import { motion } from "framer-motion";

function colorFor(score: number) {
  if (score >= 75) return "#39ff88";
  if (score >= 50) return "#ffbf3c";
  return "#ff3b5c";
}

export function CircularScore({ score, size = 120 }: { score: number; size?: number }) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score)) / 100;
  const offset = c * (1 - pct);
  const color = colorFor(score);

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={stroke}
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{
            filter: `drop-shadow(0 0 10px ${color}55)`,
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ position: "absolute", inset: 0 }}
      >
        <div className="fw-bold" style={{ fontSize: 28, lineHeight: 1 }}>
          {Math.round(score)}
        </div>
        <div className="sr-text-muted small">/ 100</div>
      </div>
    </div>
  );
}

