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
    const len = spec.clawLen * swell * (0.7 + rand() * 0.6);
    claws.push(talon(frame.p, frame.n, frame.t, len, rand));
    // A shorter rank behind, offset half a step, reads as foam piling up.
    if (rand() < 0.55) {
      const f2 = frameAt(spec, Math.min(0.97, u + 0.5 / spec.claws));
      rearClaws.push(talon(f2.p, f2.n, f2.t, len * (0.5 + rand() * 0.2), rand));
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

/** Offset a centreline into a closed outline (left edge out, right edge back). Never self-intersects
 *  as long as the width stays under the local radius of curvature, which the callers ensure. */
function outline(center: Pt[], widthAt: (u: number) => number) {
  const L: Pt[] = [];
  const R: Pt[] = [];
  center.forEach((p, i) => {
    const a = center[Math.max(0, i - 1)];
    const b = center[Math.min(center.length - 1, i + 1)];
    let nx = -(b[1] - a[1]);
    let ny = b[0] - a[0];
    const l = Math.hypot(nx, ny) || 1;
    nx /= l;
    ny /= l;
    const w = widthAt(i / (center.length - 1));
    L.push([p[0] + nx * w, p[1] + ny * w]);
    R.push([p[0] - nx * w, p[1] - ny * w]);
  });
  return `${smoothPath(L)} ${smoothPath([...R].reverse(), false)} Z`;
}

/**
 * A talon of foam: one claw whose heading turns steadily from outward, to forward with the wave,
 * to back toward the water, so it hooks like a finger. Built from a centreline, so it never knots.
 */
function talon(p: Pt, n: Pt, t: Pt, len: number, rand: () => number) {
  const steps = 22;
  const turn = (150 + rand() * 40) * (Math.PI / 180);
  const pts: Pt[] = [p];
  let x = p[0];
  let y = p[1];
  for (let i = 1; i <= steps; i++) {
    const s = i / steps;
    const beta = turn * Math.pow(s, 1.5);
    const dx = n[0] * Math.cos(beta) + t[0] * Math.sin(beta);
    const dy = n[1] * Math.cos(beta) + t[1] * Math.sin(beta);
    const ds = (len / steps) * (1.15 - s * 0.45);
    x += dx * ds;
    y += dy * ds;
    pts.push([x, y]);
  }
  const w0 = len * 0.16;
  return outline(pts, (u) => w0 * Math.pow(1 - u, 0.85) + 0.4);
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
 * A 寫意 mountain range as a height field across [x0, x0 + width]: peaks are soft bumps
 * that taper to the baseline at both ends, so the contour never loops or steps.
 * Texture strokes (皴) are filled, tapered brush marks dropping down the slopes.
 */
export function mountains(seed: number, x0: number, width: number, y: number, amp: number) {
  const rand = rng(seed);
  const peaks = Array.from({ length: 3 + Math.floor(rand() * 3) }, () => ({
    at: 0.12 + rand() * 0.76,
    h: amp * (0.45 + rand() * 0.55),
    w: 0.07 + rand() * 0.09,
  }));
  const height = (u: number) => {
    const env = Math.sin(Math.PI * u) ** 0.6;
    let h = 0;
    for (const p of peaks) {
      const d = (u - p.at) / p.w;
      h = Math.max(h, p.h * Math.exp(-d * d) * (1 - 0.12 * Math.abs(Math.sin(d * 2.3))));
    }
    return h * env;
  };
  const N = 80;
  const pts: Pt[] = [];
  for (let i = 0; i <= N; i++) {
    const u = i / N;
    pts.push([x0 + u * width, y - height(u)]);
  }
  const fill = `${smoothPath(pts)} L${f(x0 + width)} ${f(y + 2)} L${f(x0)} ${f(y + 2)} Z`;
  // The key line follows only the risen contour; where the range meets the ground it simply stops.
  const risen = pts.filter(([, py]) => y - py > amp * 0.06);
  const line = risen.length > 1 ? smoothPath(risen) : "";
  const strokes: string[] = [];
  for (const p of peaks) {
    const px = x0 + p.at * width;
    const n = 3 + Math.floor(rand() * 3);
    for (let k = 0; k < n; k++) {
      const side = k % 2 ? 1 : -1;
      const u = p.at + side * (0.01 + rand() * p.w * 0.9);
      const sx = x0 + u * width;
      const sy = y - height(u) + 6 + rand() * 10;
      const len = 16 + rand() * 30;
      const wgt = 1.2 + rand() * 2.2;
      const lean = side * (0.25 + rand() * 0.35);
      const ex = sx + lean * len;
      const ey = sy + len;
      const cx = sx + lean * len * 0.2 + wgt * 2;
      const cy = sy + len * 0.5;
      // A tapered mark: thick near the ridge, pointed at the bottom.
      strokes.push(
        `M${f(sx - wgt)} ${f(sy)} Q${f(cx - wgt)} ${f(cy)} ${f(ex)} ${f(ey)} Q${f(cx + wgt * 0.4)} ${f(cy)} ${f(sx + wgt)} ${f(sy)} Z`,
      );
    }
    void px;
  }
  return { fill, outline: line, strokes };
}

/**
 * すやり霞: horizontal mist bands in steps, each band ending in doubled lobes,
 * the way woodblock prints draw cloud.
 */
export function mistBand(seed: number, x: number, y: number, width: number, h: number) {
  const rand = rng(seed);
  let d = "";
  const circle = (cx: number, cy: number, r: number) =>
    `M${f(cx - r)} ${f(cy)} A${f(r)} ${f(r)} 0 1 1 ${f(cx + r)} ${f(cy)} A${f(r)} ${f(r)} 0 1 1 ${f(cx - r)} ${f(cy)} Z `;
  let cx = x;
  let row = 0;
  while (cx < x + width) {
    const hh = h * (0.75 + rand() * 0.5);
    const w = Math.max(hh * 4, width * (0.14 + rand() * 0.2));
    const yy = y + ((row % 3) - 1) * h * 0.46;
    const x1 = cx + hh * 0.5;
    const x2 = cx + w - hh * 0.5;
    d += `M${f(x1)} ${f(yy + hh * 0.18)} H${f(x2)} V${f(yy + hh)} H${f(x1)} Z `;
    // Cloud-lobed ends: two or three overlapping round lobes, staggered.
    const lobes = 2 + (rand() < 0.5 ? 1 : 0);
    for (let k = 0; k < lobes; k++) {
      const r = hh * (0.42 + rand() * 0.14);
      const ly = yy + hh * (0.34 + (k / Math.max(1, lobes - 1)) * 0.36);
      d += circle(x1 - k * hh * 0.34 + (k % 2) * hh * 0.18, ly, r);
      d += circle(x2 + k * hh * 0.3 - (k % 2) * hh * 0.16, ly + (k % 2 ? -hh * 0.06 : hh * 0.06), r * (0.9 + rand() * 0.2));
    }
    // A few soft bumps along the top edge.
    const bumps = Math.floor(w / (hh * 3));
    for (let k = 1; k < bumps; k++) {
      if (rand() < 0.45) d += circle(x1 + ((x2 - x1) * k) / bumps + (rand() - 0.5) * hh, yy + hh * 0.36, hh * (0.34 + rand() * 0.12));
    }
    cx += w * (0.6 + rand() * 0.35);
    row++;
  }
  return d;
}

/** Dense points along a Catmull-Rom curve through pts. */
function catmull(pts: Pt[], per = 16): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    for (let s = 0; s < per; s++) {
      const u = s / per;
      const u2 = u * u;
      const u3 = u2 * u;
      out.push([
        0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * u + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * u2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * u3),
        0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * u + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * u2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * u3),
      ]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

/**
 * The Water-Breathing ribbon: a surging band of water along a curve that rolls into a curl
 * at its tail. Body, pale core and foam stripes share one centreline; all filled geometry.
 */
export function ribbon(pts: Pt[], maxW: number) {
  const path = catmull(pts);
  // Continue into a curl: keep the heading, turning ~300° with a shrinking radius.
  const a = path[path.length - 2];
  const b = path[path.length - 1];
  let heading = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const dir = -1; // curl upward (counter-clockwise on screen)
  let [x, y] = b;
  const curlSteps = 40;
  const radius0 = maxW * 1.2;
  for (let i = 1; i <= curlSteps; i++) {
    const s = i / curlSteps;
    const r = radius0 * (1 - s * 0.7);
    const dTheta = (Math.PI * 1.75) / curlSteps;
    heading += dir * dTheta;
    x += Math.cos(heading) * r * dTheta;
    y += Math.sin(heading) * r * dTheta;
    path.push([x, y]);
  }
  const main = path.length - curlSteps;
  const widthAt = (u: number) => {
    const i = u * (path.length - 1);
    if (i <= main) {
      const v = i / main;
      return maxW * Math.min(1, Math.pow(v / 0.35, 0.7)) * (1 - 0.35 * Math.max(0, v - 0.6) / 0.4);
    }
    const c = (i - main) / curlSteps;
    return maxW * 0.65 * (1 - c) + 0.6;
  };
  const body = outline(path, widthAt);
  const core = outline(path, (u) => widthAt(u) * 0.42);
  const stripe = (k: number) => {
    const pts2: Pt[] = path.map((p, i) => {
      const q = path[Math.min(path.length - 1, i + 1)];
      const o = path[Math.max(0, i - 1)];
      let nx = -(q[1] - o[1]);
      let ny = q[0] - o[0];
      const l = Math.hypot(nx, ny) || 1;
      nx /= l;
      ny /= l;
      const w = widthAt(i / (path.length - 1)) * k;
      return [p[0] + nx * w, p[1] + ny * w];
    });
    return smoothPath(pts2.slice(Math.round(path.length * 0.08)));
  };
  return { body, core, stripes: [stripe(0.62), stripe(-0.55)] };
}
