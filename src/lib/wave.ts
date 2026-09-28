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

  // Registered colour bands following the curl, lightest at the crest: [outer inset, inner inset] as fractions of the band.
  const bandRegion = (q1: number, q2: number) => {
    const a = sample(spec, N, (t) => bandAt(spec, t) * q1);
    const b = sample(spec, N, (t) => bandAt(spec, t) * q2);
    return `${smoothPath(a)} ${smoothPath([...b].reverse(), false)} Z`;
  };
  const bands = { light: bandRegion(0, 0.16), mid: bandRegion(0.16, 0.5) };

  // Stripes: foam lines carved inside the bands.
  const stripes = [0.3, 0.42, 0.62, 0.78].map((q) => smoothPath(sample(spec, N, (t) => bandAt(spec, t) * q)));

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

  // Talons: forked fingers of foam in two ranks, irregular in spacing, length and fork count.
  const rand = rng(spec.seed);
  const claws: string[] = [];
  const rearClaws: string[] = [];
  for (let i = 0; i < spec.claws; i++) {
    const jitter = (rand() - 0.5) * (0.6 / spec.claws);
    const u = Math.min(0.96, Math.max(0.2, 0.2 + (i / (spec.claws - 1)) * 0.74 + jitter));
    const frame = frameAt(spec, u);
    const swell = 0.45 + 0.55 * Math.sin(Math.PI * Math.min(1, u * 1.12));
    const len = spec.clawLen * swell * (0.55 + rand() * 0.85);
    claws.push(talon(frame.p, frame.n, frame.t, len, rand));
    // A shorter rank behind, offset half a step, reads as foam piling up.
    if (rand() < 0.7) {
      const f2 = frameAt(spec, Math.min(0.97, u + 0.35 / spec.claws));
      rearClaws.push(talon(f2.p, f2.n, f2.t, len * (0.45 + rand() * 0.25), rand));
    }
  }

  // Spray: loose drops thrown ahead of the lip.
  const spray: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < 22; i++) {
    const { p, n } = frameAt(spec, 0.35 + rand() * 0.6);
    const d = spec.clawLen * (1.2 + rand() * 1.4);
    spray.push({ x: p[0] + n[0] * d + (rand() - 0.5) * 30, y: p[1] + n[1] * d + (rand() - 0.5) * 30, r: 1.4 + rand() * 3.2 });
  }

  return { body, bands, stripes, foamEdge, claws, rearClaws, spray };
}

/** Point on the outer curl at fraction u, with its outward normal and forward tangent. */
function frameAt(spec: WaveSpec, u: number) {
  const theta = spec.theta0 + (spec.theta1 - spec.theta0) * u;
  const p = spiral(spec, theta);
  const q = spiral(spec, theta - 0.01);
  let tx = q[0] - p[0];
  let ty = q[1] - p[1];
  const tl = Math.hypot(tx, ty) || 1;
  tx /= tl;
  ty /= tl;
  const nx = p[0] - spec.cx;
  const ny = p[1] - spec.cy;
  const nl = Math.hypot(nx, ny) || 1;
  return { p, n: [nx / nl, ny / nl] as Pt, t: [tx, ty] as Pt };
}

/**
 * A talon of foam: a stem leaves the lip along the normal and bends forward with the wave;
 * near its end it forks into two or three hooked tines that grab back toward the water.
 */
function talon(p: Pt, n: Pt, t: Pt, len: number, rand: () => number) {
  const at = (s: number, fwd: number): Pt => [p[0] + n[0] * s + t[0] * fwd, p[1] + n[1] * s + t[1] * fwd];
  const w = len * 0.15;
  const bend = 0.55 + rand() * 0.35;
  const fork = at(len * 0.62, len * bend * 0.55);
  let d = `M${f(p[0] - t[0] * w)} ${f(p[1] - t[1] * w)}`;
  const c1 = at(len * 0.4, -w * 0.4);
  d += ` Q${f(c1[0])} ${f(c1[1])} ${f(fork[0] - t[0] * w * 0.5)} ${f(fork[1] - t[1] * w * 0.5)}`;
  const tines = 2 + (rand() < 0.45 ? 1 : 0);
  for (let k = 0; k < tines; k++) {
    // Each tine: out and forward, then a hook curling back toward the lip.
    const spread = (k - (tines - 1) / 2) * 0.55;
    const tl = len * (0.42 + rand() * 0.22) * (k === tines - 1 ? 0.8 : 1);
    const dir: Pt = [n[0] * (0.55 - spread * 0.4) + t[0] * (0.85 + spread), n[1] * (0.55 - spread * 0.4) + t[1] * (0.85 + spread)];
    const tip: Pt = [fork[0] + dir[0] * tl, fork[1] + dir[1] * tl];
    const hook: Pt = [tip[0] - n[0] * tl * 0.62 + t[0] * tl * 0.02, tip[1] - n[1] * tl * 0.62 + t[1] * tl * 0.02];
    const inner: Pt = [fork[0] + dir[0] * tl * 0.55 - n[0] * tl * 0.08, fork[1] + dir[1] * tl * 0.55 - n[1] * tl * 0.08];
    d += ` Q${f(fork[0] + dir[0] * tl * 0.6 + n[0] * tl * 0.12)} ${f(fork[1] + dir[1] * tl * 0.6 + n[1] * tl * 0.12)} ${f(tip[0])} ${f(tip[1])}`;
    d += ` C${f(tip[0] + t[0] * tl * 0.32)} ${f(tip[1] + t[1] * tl * 0.32)} ${f(hook[0] + t[0] * tl * 0.34)} ${f(hook[1] + t[1] * tl * 0.34)} ${f(hook[0])} ${f(hook[1])}`;
    d += ` Q${f(inner[0])} ${f(inner[1])} ${f(fork[0] + t[0] * w * 0.3 * k)} ${f(fork[1] + t[1] * w * 0.3 * k)}`;
  }
  const c2 = at(len * 0.35, w * 1.4);
  d += ` Q${f(c2[0])} ${f(c2[1])} ${f(p[0] + t[0] * w)} ${f(p[1] + t[1] * w)} Z`;
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

/**
 * A 寫意 mountain range: a filled silhouette plus the brush strokes that give it form,
 * short texture strokes (皴) dropping down each slope.
 */
export function mountains(seed: number, x0: number, width: number, y: number, amp: number) {
  const rand = rng(seed);
  const peaks = 3 + Math.floor(rand() * 3);
  const pts: Pt[] = [[x0, y]];
  for (let i = 0; i < peaks; i++) {
    const px = x0 + ((i + 0.5 + (rand() - 0.5) * 0.5) / peaks) * width;
    const h = amp * (0.45 + rand() * 0.55);
    pts.push([px - width / peaks / 2.6, y - h * 0.45], [px, y - h], [px + width / peaks / 3, y - h * 0.5]);
  }
  pts.push([x0 + width, y]);
  const outline = smoothPath(pts);
  const fill = `${outline} L${f(x0 + width)} ${f(y + 40)} L${f(x0)} ${f(y + 40)} Z`;
  const strokes: string[] = [];
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i];
    const n = 2 + Math.floor(rand() * 3);
    for (let k = 0; k < n; k++) {
      const sx = px + (rand() - 0.3) * 24;
      const sy = py + 10 + k * (8 + rand() * 10);
      const len = 14 + rand() * 26;
      const lean = (rand() < 0.5 ? -1 : 1) * (0.4 + rand() * 0.5);
      strokes.push(`M${f(sx)} ${f(sy)} q${f(lean * len * 0.3)} ${f(len * 0.5)} ${f(lean * len * 0.5)} ${f(len)}`);
    }
  }
  return { fill, outline, strokes };
}

/** すやり霞: a horizontal mist band made of capsules, the way woodblock prints draw cloud. */
export function mistBand(seed: number, x: number, y: number, width: number, h: number) {
  const rand = rng(seed);
  let d = "";
  let cx = x;
  let row = 0;
  while (cx < x + width) {
    const w = width * (0.18 + rand() * 0.22);
    const yy = y + (row % 2) * h * 0.55;
    const r = h / 2;
    d += `M${f(cx + r)} ${f(yy)} H${f(cx + w - r)} A${f(r)} ${f(r)} 0 0 1 ${f(cx + w - r)} ${f(yy + h)} H${f(cx + r)} A${f(r)} ${f(r)} 0 0 1 ${f(cx + r)} ${f(yy)} Z `;
    cx += w * (0.7 + rand() * 0.25);
    row++;
  }
  return d;
}

/**
 * The Water-Breathing ribbon: a tapering band of water along a curve, with a pale core,
 * a foam line, and a curl at the tail. Returns filled outlines, all authored geometry.
 */
export function ribbon(pts: Pt[], maxW: number) {
  const dense: Pt[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    for (let s = 0; s < 12; s++) {
      const u = s / 12;
      dense.push([pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u]);
    }
  }
  dense.push(pts[pts.length - 1]);
  const edge = (wFn: (u: number) => number) => {
    const L: Pt[] = [];
    const R: Pt[] = [];
    dense.forEach((p, i) => {
      const a = dense[Math.max(0, i - 1)];
      const b = dense[Math.min(dense.length - 1, i + 1)];
      let nx = -(b[1] - a[1]);
      let ny = b[0] - a[0];
      const l = Math.hypot(nx, ny) || 1;
      nx /= l;
      ny /= l;
      const w = wFn(i / (dense.length - 1));
      L.push([p[0] + nx * w, p[1] + ny * w]);
      R.push([p[0] - nx * w * 0.6, p[1] - ny * w * 0.6]);
    });
    return `${smoothPath(L)} ${smoothPath([...R].reverse(), false)} Z`;
  };
  const taper = (u: number) => Math.pow(Math.sin(Math.PI * Math.min(1, u * 1.04)), 0.7);
  const body = edge((u) => maxW * taper(u));
  const core = edge((u) => maxW * 0.38 * taper(u));
  const line = smoothPath(dense);
  const end = dense[dense.length - 1];
  const prev = dense[dense.length - 4];
  const dir = end[0] >= prev[0] ? 1 : -1;
  let curl = "";
  for (let a = 0; a <= Math.PI * 3; a += 0.15) {
    const r = maxW * 1.1 * (1 - a / (Math.PI * 3.4));
    const px = end[0] + Math.cos(dir * a - Math.PI / 2) * r * dir;
    const py = end[1] - maxW * 1.1 + Math.sin(dir * a - Math.PI / 2) * r + maxW * 1.1;
    curl += `${a === 0 ? "M" : "L"}${f(px)} ${f(py)} `;
  }
  return { body, core, line, curl };
}
