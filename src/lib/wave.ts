/**
 * Geometry for a woodblock-style breaking wave.
 *
 * The curl is a logarithmic spiral. The wave body is the band between an outer spiral
 * and an inner one, closed by a back slope and a front face down to the base line.
 * Foam claws grow outward from the lip and hook forward, the way woodblock carvers cut them.
 */

type Pt = [number, number];

export type WaveSpec = {
  cx: number; // curl centre
  cy: number;
  r0: number; // outer radius where the curl begins
  k: number; // spiral tightness
  theta0: number; // start angle (radians, screen space: +y is down)
  theta1: number; // end angle (the lip tip), < theta0
  band: number; // body thickness at the start of the curl
  base: number; // y of the base line
  backX: number; // x where the back slope meets the base
  faceX: number; // x where the front face meets the base
  claws: number; // number of foam claws along the lip
  clawLen: number;
  seed: number;
};

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const f = (n: number) => n.toFixed(1);

function spiral(spec: WaveSpec, theta: number, inset = 0): Pt {
  const r = spec.r0 * Math.exp(spec.k * (theta - spec.theta0)) - inset;
  return [spec.cx + r * Math.cos(theta), spec.cy + r * Math.sin(theta)];
}

/** Band thickness along the curl: full at the start, thinning to nothing at the lip. */
function bandAt(spec: WaveSpec, theta: number) {
  const u = (spec.theta0 - theta) / (spec.theta0 - spec.theta1); // 0 → 1
  return spec.band * Math.pow(1 - u, 1.25);
}

function sample(spec: WaveSpec, n: number, inset: (theta: number) => number) {
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const theta = spec.theta0 + (spec.theta1 - spec.theta0) * (i / n);
    pts.push(spiral(spec, theta, inset(theta)));
  }
  return pts;
}

function smoothPath(pts: Pt[], move = true) {
  // Catmull-Rom → cubic Bézier.
  let d = move ? `M${f(pts[0][0])} ${f(pts[0][1])}` : `L${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

export function wavePaths(spec: WaveSpec) {
  const N = 90;
  const outer = sample(spec, N, () => 0);
  const inner = sample(spec, N, (t) => bandAt(spec, t));
  const start = outer[0];
  const innerStart = inner[0];

  // Body: base → back slope → outer curl → lip → inner curl (reversed) → front face → base.
  const back = `M${f(spec.backX)} ${f(spec.base)} C${f(spec.backX - 60)} ${f(spec.base - 220)} ${f(start[0] + 40)} ${f(
    start[1] + 170,
  )} ${f(start[0])} ${f(start[1])}`;
  const curl = smoothPath(outer, false).replace(/^L[^C]*/, "");
  const innerRev = smoothPath([...inner].reverse(), false);
  const face = ` C${f(innerStart[0] - 10)} ${f(innerStart[1] + 160)} ${f(spec.faceX + 120)} ${f(spec.base - 150)} ${f(
    spec.faceX,
  )} ${f(spec.base)} Z`;
  const body = `${back}${curl} ${innerRev}${face}`;

  // Woodblock stripes: spirals at fractions of the band, plus echoes down the back.
  const stripes = [0.22, 0.42, 0.62, 0.8].map((q) =>
    smoothPath(sample(spec, N, (t) => bandAt(spec, t) * q)),
  );

  // Foam edge along the upper curl (from where the wave starts to break to the lip).
  const breakAt = Math.round(N * 0.18);
  const edge = outer.slice(breakAt);
  const edgeIn = sample(spec, N, (t) => {
    const u = (spec.theta0 - t) / (spec.theta0 - spec.theta1);
    const ramp = Math.min(1, Math.max(0, (u - 0.18) / 0.22)); // foam thickens as the wave starts to break
    const eased = ramp * ramp * (3 - 2 * ramp);
    return Math.min(bandAt(spec, t), (6 + bandAt(spec, t) * 0.14) * eased + 0.5);
  }).slice(breakAt);
  const foamEdge = `${smoothPath(edge)} ${smoothPath([...edgeIn].reverse(), false)} Z`;

  // Claws: fingers of foam hooking forward off the lip, each with smaller fingers at its tip.
  const rand = rng(spec.seed);
  const claws: string[] = [];
  for (let i = 0; i < spec.claws; i++) {
    const u = 0.2 + (i / (spec.claws - 1)) * 0.72;
    const theta = spec.theta0 + (spec.theta1 - spec.theta0) * u;
    const p = spiral(spec, theta);
    const dt = -0.01;
    const q = spiral(spec, theta + dt);
    // Tangent follows the direction of travel (towards the lip); normal points outward.
    let tx = q[0] - p[0];
    let ty = q[1] - p[1];
    const tl = Math.hypot(tx, ty) || 1;
    tx /= tl;
    ty /= tl;
    const nx = p[0] - spec.cx;
    const ny = p[1] - spec.cy;
    const nl = Math.hypot(nx, ny) || 1;
    const ox = nx / nl;
    const oy = ny / nl;
    const scale = (0.5 + 0.5 * Math.sin(Math.PI * Math.min(1, u * 1.15))) * (0.65 + rand() * 0.6) * (i % 3 === 1 ? 0.7 : 1);
    claws.push(claw(p, [ox, oy], [tx, ty], spec.clawLen * scale, rand));
  }

  // Spray: loose drops thrown ahead of the lip.
  const spray: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < 26; i++) {
    const u = 0.35 + rand() * 0.6;
    const theta = spec.theta0 + (spec.theta1 - spec.theta0) * u;
    const p = spiral(spec, theta);
    const nx = p[0] - spec.cx;
    const ny = p[1] - spec.cy;
    const nl = Math.hypot(nx, ny) || 1;
    const d = spec.clawLen * (1.1 + rand() * 1.4);
    spray.push({ x: p[0] + (nx / nl) * d + (rand() - 0.5) * 30, y: p[1] + (ny / nl) * d + (rand() - 0.5) * 30, r: 1.4 + rand() * 3.4 });
  }

  return { body, stripes, foamEdge, claws, spray };
}

function claw(p: Pt, n: Pt, t: Pt, len: number, rand: () => number) {
  // A curling finger: it leaves the lip along the normal, bends forward with the wave,
  // then hooks back in toward the water, the way carved foam grabs at the air.
  const w = len * 0.16;
  const bend = 0.9 + rand() * 0.35;
  const tip: Pt = [p[0] + n[0] * len * 0.85 + t[0] * len * bend, p[1] + n[1] * len * 0.85 + t[1] * len * bend];
  const hook: Pt = [tip[0] + t[0] * len * 0.18 - n[0] * len * 0.42, tip[1] + t[1] * len * 0.18 - n[1] * len * 0.42];
  const a: Pt = [p[0] - t[0] * w, p[1] - t[1] * w];
  const b: Pt = [p[0] + t[0] * w, p[1] + t[1] * w];
  let d = `M${f(a[0])} ${f(a[1])}`;
  d += ` C${f(a[0] + n[0] * len * 0.75)} ${f(a[1] + n[1] * len * 0.75)} ${f(tip[0] - t[0] * len * 0.55)} ${f(tip[1] - t[1] * len * 0.55)} ${f(tip[0])} ${f(tip[1])}`;
  d += ` Q${f(tip[0] + t[0] * len * 0.22)} ${f(tip[1] + t[1] * len * 0.22)} ${f(hook[0])} ${f(hook[1])}`;
  d += ` Q${f(tip[0] - t[0] * len * 0.05 - n[0] * len * 0.12)} ${f(tip[1] - t[1] * len * 0.05 - n[1] * len * 0.12)} ${f(
    tip[0] - t[0] * len * 0.2 - n[0] * len * 0.06,
  )} ${f(tip[1] - t[1] * len * 0.2 - n[1] * len * 0.06)}`;
  d += ` C${f(tip[0] - t[0] * len * 0.6)} ${f(tip[1] - t[1] * len * 0.6)} ${f(b[0] + n[0] * len * 0.55)} ${f(b[1] + n[1] * len * 0.55)} ${f(b[0])} ${f(b[1])} Z`;
  // One or two small fingers splitting off near the tip.
  const fingers = rand() < 0.55 ? 1 : 0;
  for (let i = 0; i < fingers; i++) {
    const s = len * (0.28 + rand() * 0.14);
    const at = 0.55 + i * 0.2;
    const base: Pt = [p[0] + n[0] * len * 0.85 * at + t[0] * len * bend * at * 0.7, p[1] + n[1] * len * 0.85 * at + t[1] * len * bend * at * 0.7];
    const ft: Pt = [base[0] + n[0] * s * 0.7 + t[0] * s * 0.5, base[1] + n[1] * s * 0.7 + t[1] * s * 0.5];
    const fh: Pt = [ft[0] + t[0] * s * 0.25 - n[0] * s * 0.3, ft[1] + t[1] * s * 0.25 - n[1] * s * 0.3];
    const fw = s * 0.12;
    d += ` M${f(base[0] - t[0] * fw)} ${f(base[1] - t[1] * fw)} Q${f(base[0] + n[0] * s * 0.5)} ${f(base[1] + n[1] * s * 0.5)} ${f(ft[0])} ${f(ft[1])} Q${f(
      ft[0] + t[0] * s * 0.15,
    )} ${f(ft[1] + t[1] * s * 0.15)} ${f(fh[0])} ${f(fh[1])} Q${f(ft[0] - t[0] * s * 0.1)} ${f(ft[1] - t[1] * s * 0.1)} ${f(
      base[0] + t[0] * fw,
    )} ${f(base[1] + t[1] * fw)} Z`;
  }
  return d;
}

/** Ink-wash mountain ridge: a jagged but soft skyline across the width. */
export function ridge(seed: number, y: number, amp: number, width: number, bottom: number) {
  const rand = rng(seed);
  const pts: Pt[] = [];
  const steps = 18;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const peak = Math.sin((i / steps) * Math.PI * (1.2 + rand() * 0.4)) * 0.6 + rand() * 0.55;
    pts.push([x, y - peak * amp]);
  }
  return `${smoothPath(pts)} L${width} ${bottom} L0 ${bottom} Z`;
}
