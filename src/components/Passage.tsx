import { mistBand, mountains, wavePaths, type WaveSpec } from "@/lib/wave";

const KEY = "#06101b";
const FOAM = "#efe8da";

type Kind = "mist" | "mountains" | "waves";

/**
 * A landscape passage between sections, so the page reads as one unrolled scroll:
 * mist bands, a brushed range, or a band of breaking waves across the width.
 */
export function Passage({ kind, seed = 1, flip = false }: { kind: Kind; seed?: number; flip?: boolean }) {
  const W = 1600;
  if (kind === "mist") {
    return (
      <svg viewBox={`0 0 ${W} 90`} preserveAspectRatio="none" className="block h-[56px] w-full sm:h-[90px]" aria-hidden="true">
        <path d={mistBand(seed, -80, 16, 1800, 22)} fill="#1a3150" />
        <path d={mistBand(seed + 7, 200, 50, 1500, 18)} fill="#16294a" />
      </svg>
    );
  }
  if (kind === "mountains") {
    const a = mountains(seed, -60, 900, 150, 110);
    const b = mountains(seed + 3, 700, 1000, 160, 80);
    return (
      <svg
        viewBox={`0 0 ${W} 200`}
        preserveAspectRatio="xMidYMax slice"
        className={`block h-[120px] w-full sm:h-[200px] ${flip ? "-scale-x-100" : ""}`}
        aria-hidden="true"
      >
        <path d={mistBand(seed + 11, 300, 40, 1400, 20)} fill="#1a3150" />
        {[
          { m: a, fill: "#1c3a5c" },
          { m: b, fill: "#15304d" },
        ].map(({ m, fill }, i) => (
          <g key={i} strokeLinecap="round" strokeLinejoin="round">
            <path d={m.fill} fill={fill} />
            <path d={m.outline} fill="none" stroke={KEY} strokeWidth="2.2" />
            <g fill="none" stroke={KEY} strokeWidth="1.4" opacity="0.8">
              {m.strokes.map((d, k) => (
                <path key={k} d={d} />
              ))}
            </g>
          </g>
        ))}
        <path d={mistBand(seed + 5, -40, 168, 1700, 18)} fill="#1f3b5e" />
      </svg>
    );
  }
  // A band of small breaking waves.
  const crests: WaveSpec[] = [];
  const n = 7;
  for (let i = 0; i < n; i++) {
    const cx = 120 + i * (W / n) + (i % 2) * 40;
    crests.push({
      cx,
      cy: 118 + (i % 2) * 14,
      r0: 58 + (i % 3) * 8,
      k: 0.3,
      theta0: 0.5,
      theta1: -3.7,
      band: 34,
      base: 200,
      backX: cx + 150,
      faceX: cx - 110,
      claws: 8,
      clawLen: 14,
      seed: seed * 10 + i,
    });
  }
  return (
    <svg
      viewBox={`0 0 ${W} 200`}
      preserveAspectRatio="xMidYMax slice"
      className={`block h-[110px] w-full sm:h-[170px] ${flip ? "-scale-x-100" : ""}`}
      aria-hidden="true"
    >
      <rect y="150" width={W} height="50" fill="#0f2743" />
      {crests.map((c, i) => {
        const p = wavePaths(c);
        return (
          <g key={i} strokeLinejoin="round" strokeLinecap="round">
            <path d={p.body} fill="#16355c" />
            <path d={p.bands.mid} fill="#2c5f8a" />
            <path d={p.bands.light} fill="#6f9fc4" />
            <path d={p.foamEdge} fill={FOAM} stroke={KEY} strokeWidth="1" />
            <path d={p.body} fill="none" stroke={KEY} strokeWidth="2" />
            <g fill={FOAM} stroke={KEY} strokeWidth="0.9">
              {p.claws.map((d, k) => (
                <path key={k} d={d} />
              ))}
            </g>
          </g>
        );
      })}
    </svg>
  );
}
