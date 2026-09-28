import { mistBand, mountains, wavePaths, type WaveSpec } from "@/lib/wave";

const W = 1600;
const H = 1000;

// Woodblock palette: flat, registered colours. The only gradation is the bokashi band at the top of the sky.
const KEY = "#06101b";
const DEEP = "#16355c";
const MID = "#2c5f8a";
const LIGHT = "#6f9fc4";
const FOAM = "#efe8da";

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
  claws: 24,
  clawLen: 62,
  seed: 11,
};

const near: WaveSpec = {
  cx: 820,
  cy: 880,
  r0: 128,
  k: 0.3,
  theta0: 0.5,
  theta1: -3.9,
  band: 74,
  base: H + 10,
  backX: 1060,
  faceX: 650,
  claws: 12,
  clawLen: 26,
  seed: 5,
};

const far: WaveSpec = {
  cx: 1480,
  cy: 905,
  r0: 92,
  k: 0.3,
  theta0: 0.5,
  theta1: -3.8,
  band: 54,
  base: H + 10,
  backX: 1700,
  faceX: 1350,
  claws: 10,
  clawLen: 20,
  seed: 23,
};

function Wave({ spec, stripes = true, keyWidth = 3 }: { spec: WaveSpec; stripes?: boolean; keyWidth?: number }) {
  const p = wavePaths(spec);
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <g className="wave-claws" fill={FOAM} stroke={KEY} strokeWidth={keyWidth * 0.5}>
        {p.rearClaws.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <path d={p.body} fill={DEEP} />
      <path d={p.bands.mid} fill={MID} />
      <path d={p.bands.light} fill={LIGHT} />
      {stripes && (
        <g fill="none" stroke={FOAM} strokeWidth="1.5" opacity="0.85">
          {p.stripes.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      )}
      <path d={p.foamEdge} fill={FOAM} stroke={KEY} strokeWidth={keyWidth * 0.5} />
      <path d={p.body} fill="none" stroke={KEY} strokeWidth={keyWidth} />
      <g className="wave-claws" fill={FOAM} stroke={KEY} strokeWidth={keyWidth * 0.5}>
        {p.claws.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g className="wave-spray" fill={FOAM}>
        {p.spray.map((s, i) => (
          <circle key={i} cx={s.x.toFixed(1)} cy={s.y.toFixed(1)} r={s.r.toFixed(1)} />
        ))}
      </g>
    </g>
  );
}

function Range({ seed, x, width, y, amp, fill }: { seed: number; x: number; width: number; y: number; amp: number; fill: string }) {
  const m = mountains(seed, x, width, y, amp);
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d={m.fill} fill={fill} />
      <path d={m.outline} fill="none" stroke={KEY} strokeWidth="2.4" />
      <g fill="none" stroke={KEY} strokeWidth="1.6" opacity="0.8">
        {m.strokes.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </g>
  );
}

/** The seigaiha tile: three sets of concentric half-rings, overlapping like fish scales. */
function SeigaihaTile() {
  const rings = [21, 15, 9];
  const arcs: { cx: number; cy: number }[] = [
    { cx: 0, cy: 24 },
    { cx: 48, cy: 24 },
    { cx: 24, cy: 12 },
  ];
  return (
    <pattern id="seigaiha" width="48" height="24" patternUnits="userSpaceOnUse">
      {arcs.flatMap(({ cx, cy }) =>
        rings.map((r) => (
          <path
            key={`${cx}-${cy}-${r}`}
            d={`M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke={LIGHT}
            strokeOpacity="0.32"
            strokeWidth="1.2"
          />
        )),
      )}
    </pattern>
  );
}

/**
 * The first-viewport artwork: a night sea in woodblock grammar.
 * All geometry is generated (see lib/wave.ts); no source imagery.
 */
export function GreatWave({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMaxYMax slice" className={className} aria-hidden="true">
      <defs>
        {/* Bokashi: one hard-edged graded band at the top of the sky, as printed. */}
        <linearGradient id="bokashi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#050c16" />
          <stop offset="1" stopColor="#0b1624" />
        </linearGradient>
        <SeigaihaTile />
      </defs>

      <rect width={W} height={H} fill="#0b1624" />
      <rect width={W} height="150" fill="url(#bokashi)" />

      {/* Moon: a flat disc with a key line. */}
      <circle cx="1380" cy="230" r="104" fill="#ece2cc" stroke={KEY} strokeWidth="2.5" />

      {/* Mist bands and brushed mountains, far to near. */}
      <path d={mistBand(4, -40, 470, 900, 26)} fill="#1a3150" />
      <Range seed={3} x={-40} width={1000} y={640} amp={170} fill="#1c3a5c" />
      <Range seed={9} x={-60} width={1300} y={700} amp={95} fill="#15304d" />
      <path d={mistBand(8, -60, 650, 1700, 22)} fill="#1f3b5e" />

      {/* Open water */}
      <rect y="740" width={W} height={H - 740} fill="#0f2743" />
      <rect y="740" width={W} height={H - 740} fill="url(#seigaiha)" />
      <line x1="0" y1="740" x2={W} y2="740" stroke={KEY} strokeWidth="2" />

      <g className="wave-swell" style={{ transformOrigin: "1100px 1000px" }}>
        <Wave spec={great} />
      </g>
      <g className="wave-swell-late" style={{ transformOrigin: "1500px 1000px" }}>
        <Wave spec={far} stripes={false} keyWidth={2} />
      </g>
      <g className="wave-swell-late" style={{ transformOrigin: "820px 1000px" }}>
        <Wave spec={near} keyWidth={2} />
      </g>
    </svg>
  );
}
