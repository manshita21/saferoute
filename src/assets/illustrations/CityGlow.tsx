export function CityGlow() {
  return (
    <svg viewBox="0 0 640 420" width="100%" height="100%" role="img" aria-label="City illustration">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(77,242,255,0.85)" />
          <stop offset="0.45" stopColor="rgba(139,92,255,0.85)" />
          <stop offset="1" stopColor="rgba(57,255,136,0.75)" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="25%" r="75%">
          <stop offset="0" stopColor="rgba(77,242,255,0.20)" />
          <stop offset="1" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="640" height="420" fill="rgba(255,255,255,0)" />
      <ellipse cx="320" cy="110" rx="240" ry="160" fill="url(#glow)" />
      <path
        d="M70 340 L70 220 L130 220 L130 340 Z M155 340 L155 190 L220 190 L220 340 Z M245 340 L245 150 L315 150 L315 340 Z M340 340 L340 180 L410 180 L410 340 Z M435 340 L435 210 L505 210 L505 340 Z M530 340 L530 240 L585 240 L585 340 Z"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="2"
      />
      <path
        d="M60 342 H595"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M92 270 H108 M92 292 H108 M92 314 H108 M177 235 H197 M177 260 H197 M177 285 H197 M262 205 H298 M262 230 H298 M262 255 H298 M262 280 H298 M357 225 H392 M357 248 H392 M357 271 H392 M452 255 H488 M452 277 H488"
        stroke="url(#g1)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M110 360 C180 312, 250 308, 320 258 C395 206, 468 210, 540 160"
        fill="none"
        stroke="url(#g1)"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.95"
      />
      <circle cx="110" cy="360" r="7" fill="rgba(57,255,136,0.9)" />
      <circle cx="540" cy="160" r="7" fill="rgba(255,191,60,0.9)" />
    </svg>
  );
}

