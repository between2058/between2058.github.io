import { ridge, wavePaths, type WaveSpec } from "@/lib/wave";

const W = 1600;
const H = 1000;

const great: WaveSpec = {
  cx: 1150,
  cy: 470,
  r0: 320,
  k: 0.3,
  theta0: 0.45,
  theta1: -4.55,
  band: 175,
  base: H,
  backX: 1700,
  faceX: 1010,
  claws: 22,
  clawLen: 60,
  seed: 11,
};

const near: WaveSpec = {
  cx: 820,
  cy: 880,
  r0: 128,
  k: 0.3,
  theta0: 0.5,
  theta1: -3.7,
  band: 74,
  base: H + 10,
  backX: 1060,
  faceX: 650,
  claws: 10,
  clawLen: 26,
  seed: 5,
};

const far: WaveSpec = {
  cx: 1480,
  cy: 905,
  r0: 92,
  k: 0.3,
  theta0: 0.5,
  theta1: -3.6,
  band: 54,
  base: H + 10,
  backX: 1700,
  faceX: 1350,
  claws: 8,
  clawLen: 20,
  seed: 23,
};

function Wave({ spec, id, stripes = true }: { spec: WaveSpec; id: string; stripes?: boolean }) {
  const p = wavePaths(spec);
  return (
    <g>
      <path d={p.body} fill={`url(#${id}-body)`} />
      {stripes && (
        <g fill="none" stroke="var(--color-foam)" strokeOpacity="0.28" strokeWidth="1.6" strokeLinecap="round">
          {p.stripes.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      )}
      <path d={p.body} fill="none" stroke="#08111c" strokeOpacity="0.55" strokeWidth="2" />
      <path d={p.foamEdge} fill="var(--color-foam)" />
      <g className="wave-claws" fill="var(--color-foam)">
        {p.claws.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g className="wave-spray" fill="var(--color-foam)">
        {p.spray.map((s, i) => (
          <circle key={i} cx={s.x.toFixed(1)} cy={s.y.toFixed(1)} r={s.r.toFixed(1)} />
        ))}
      </g>
    </g>
  );
}

/**
 * The first-viewport artwork: a night sea in woodblock grammar.
 * Generated geometry (see lib/wave.ts); no source imagery.
 */
export function GreatWave({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMaxYMax slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1624" />
          <stop offset="0.62" stopColor="#12243a" />
          <stop offset="1" stopColor="#0b1624" />
        </linearGradient>
        {["great", "near", "far"].map((id) => (
          <linearGradient key={id} id={`${id}-body`} x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0" stopColor="#3a74a3" />
            <stop offset="0.45" stopColor="#1f4a78" />
            <stop offset="1" stopColor="#0f2743" />
          </linearGradient>
        ))}
        <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12243a" stopOpacity="0" />
          <stop offset="0.5" stopColor="#1b3350" stopOpacity="0.75" />
          <stop offset="1" stopColor="#12243a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="moon-halo">
          <stop offset="0.55" stopColor="#ece2cc" stopOpacity="0.16" />
          <stop offset="1" stopColor="#ece2cc" stopOpacity="0" />
        </radialGradient>
        <pattern id="seigaiha" width="48" height="24" patternUnits="userSpaceOnUse">
          {[0, 24, 48].map((x) =>
            [22, 16, 10].map((r) => (
              <path
                key={`${x}-${r}`}
                d={`M${x - r} ${x === 24 ? 12 : 24} A${r} ${r} 0 0 1 ${x + r} ${x === 24 ? 12 : 24}`}
                fill="none"
                stroke="#7eaad0"
                strokeOpacity="0.22"
                strokeWidth="1.2"
              />
            )),
          )}
        </pattern>
      </defs>

      <rect width={W} height={H} fill="url(#sky)" />

      {/* Moon */}
      <circle cx="1380" cy="230" r="210" fill="url(#moon-halo)" />
      <circle cx="1380" cy="230" r="104" fill="var(--color-paper)" opacity="0.92" />

      {/* Distant mountains in ink wash */}
      <g className="ink-bleed">
        <path d={ridge(3, 640, 170, W, H)} fill="#24466e" opacity="0.6" />
        <path d={ridge(9, 700, 100, W, H)} fill="#1a3656" opacity="0.9" />
      </g>
      <rect y="560" width={W} height="220" fill="url(#mist)" />

      {/* Open water */}
      <rect y="760" width={W} height={H - 760} fill="#0f2743" />
      <rect y="760" width={W} height={H - 760} fill="url(#seigaiha)" />

      <g className="wave-swell" style={{ transformOrigin: "1100px 1000px" }}>
        <Wave spec={great} id="great" />
      </g>
      <g className="wave-swell-late" style={{ transformOrigin: "1500px 1000px" }}>
        <Wave spec={far} id="far" stripes={false} />
      </g>
      <g className="wave-swell-late" style={{ transformOrigin: "820px 1000px" }}>
        <Wave spec={near} id="near" />
      </g>
    </svg>
  );
}
