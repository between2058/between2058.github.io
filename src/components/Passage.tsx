import { mistBand, mountains, wavePaths, type WaveSpec } from "@/lib/wave";

const KEY = "#06101b";
const FOAM = "#efe8da";
const INK = "#0b1624";
const INK_2 = "#0f1d2f";

type Kind = "mist" | "mountains" | "waves";

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * A landscape passage between sections, so the page reads as one unrolled scroll:
 * mist bands, a brushed range, or a sea of breaking waves running into the next section.
 * `into` names the ground of the section below, so the sea becomes that ground without a seam
 * (the seigaiha section fades its own pattern in from the top).
 */
export function Passage({
  kind,
  seed = 1,
  flip = false,
  into = "ink",
}: {
  kind: Kind;
  seed?: number;
  flip?: boolean;
  into?: "ink" | "seigaiha";
}) {
  const W = 1600;
  const uid = `p${kind}${seed}`;

  if (kind === "mist") {
    return (
      <svg viewBox={`0 0 ${W} 110`} preserveAspectRatio="xMidYMid slice" className="block h-[70px] w-full sm:h-[110px]" aria-hidden="true">
        <path d={mistBand(seed, -80, 26, 1800, 26)} fill="#1a3150" />
        <path d={mistBand(seed + 7, 260, 62, 1400, 20)} fill="#16294a" />
      </svg>
    );
  }

  if (kind === "mountains") {
    const a = mountains(seed, -80, 980, 170, 120);
    const b = mountains(seed + 3, 560, 1120, 182, 86);
    return (
      <svg
        viewBox={`0 0 ${W} 230`}
        preserveAspectRatio="xMidYMax slice"
        className={`block h-[130px] w-full sm:h-[230px] ${flip ? "-scale-x-100" : ""}`}
        aria-hidden="true"
      >
        <defs>
          {/* The foot of each range dissolves into the ground instead of ending on a ruled edge. */}
          <linearGradient id={`${uid}-fade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.55" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <mask id={`${uid}-mask`}>
            <rect width={W} height="230" fill={`url(#${uid}-fade)`} />
          </mask>
        </defs>
        <path d={mistBand(seed + 11, 360, 44, 1300, 22)} fill="#1a3150" />
        <g mask={`url(#${uid}-mask)`}>
          {[
            { m: a, fill: "#1c3a5c" },
            { m: b, fill: "#15304d" },
          ].map(({ m, fill }, i) => (
            <g key={i} strokeLinecap="round" strokeLinejoin="round">
              <path d={m.fill} fill={fill} />
              <path d={m.outline} fill="none" stroke={KEY} strokeWidth="2.2" />
              <g fill={KEY} opacity="0.85">
                {m.strokes.map((d, k) => (
                  <path key={k} d={d} />
                ))}
              </g>
            </g>
          ))}
        </g>
        <path d={mistBand(seed + 5, -60, 176, 1760, 20)} fill="#1f3b5e" />
      </svg>
    );
  }

  // Waves: irregular crests over a sea whose surface undulates and runs into the next section.
  const rand = rng(seed * 97 + 13);
  const crests: WaveSpec[] = [];
  let x = 60 + rand() * 80;
  let i = 0;
  while (x < W + 40) {
    const s = 0.65 + rand() * 0.7;
    const cy = 150 + (rand() - 0.5) * 30;
    crests.push({
      cx: x,
      cy,
      r0: 58 * s,
      k: 0.3,
      theta0: 0.5,
      theta1: -3.5 - rand() * 0.4,
      band: 34 * s,
      base: 240,
      backX: x + 130 * s,
      faceX: x - 90 * s,
      claws: 6 + Math.round(4 * s),
      clawLen: 15 * s,
      seed: seed * 10 + i,
    });
    x += 170 + rand() * 170;
    i++;
  }
  const ground = into === "seigaiha" ? INK_2 : INK;
  let sea = `M0 ${196}`;
  for (let sx = 0; sx <= W; sx += 20) {
    sea += ` L${sx} ${(190 + Math.sin(sx / 70 + seed) * 6 + Math.sin(sx / 23) * 2).toFixed(1)}`;
  }
  const seaTop = sea;
  sea += ` L${W} 240 L0 240 Z`;

  return (
    <svg
      viewBox={`0 0 ${W} 240`}
      preserveAspectRatio="xMidYMax slice"
      className={`-mb-px block h-[130px] w-full sm:h-[200px] ${flip ? "-scale-x-100" : ""}`}
      aria-hidden="true"
    >
      {crests.map((c, k) => {
        const p = wavePaths(c);
        return (
          <g key={k} strokeLinejoin="round" strokeLinecap="round">
            <path d={p.body} fill="#16355c" />
            <path d={p.bands.mid} fill="#2c5f8a" />
            <path d={p.bands.light} fill="#6f9fc4" />
            <path d={p.foamEdge} fill={FOAM} stroke={KEY} strokeWidth="1" />
            <path d={p.body} fill="none" stroke={KEY} strokeWidth="2" />
            <g fill={FOAM} stroke={KEY} strokeWidth="0.9">
              {p.claws.map((d, n) => (
                <path key={n} d={d} />
              ))}
            </g>
          </g>
        );
      })}
      {/* The sea surface covers the feet of the crests and becomes the next section's ground. */}
      <path d={sea} fill={ground} />
      <path d={seaTop} fill="none" stroke={KEY} strokeWidth="2" />
    </svg>
  );
}
