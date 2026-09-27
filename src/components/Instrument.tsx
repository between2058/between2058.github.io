"use client";

import { useEffect, useRef, useState } from "react";

type Ring = { x: number; y: number; r: number; max: number; life: number; copper: boolean };
type Readout = { k: string; v: string };

const SIZE = 520;
const C = SIZE / 2;
const OUTER = 238;
const INNER = 176;
const WATER = 168;

/** Degree scale: fine ticks every 2°, longer every 10°, labels every 30°. */
function DegreeScale() {
  const ticks = [];
  for (let d = 0; d < 360; d += 2) {
    const major = d % 10 === 0;
    const len = d % 30 === 0 ? 12 : major ? 7 : 3.5;
    ticks.push(
      <line
        key={d}
        x1={C}
        y1={C - OUTER}
        x2={C}
        y2={C - OUTER + len}
        transform={`rotate(${d} ${C} ${C})`}
        stroke={major ? "rgb(223 229 227 / 0.42)" : "rgb(223 229 227 / 0.2)"}
        strokeWidth={major ? 0.9 : 0.6}
      />,
    );
  }
  const labels = [];
  for (let d = 0; d < 360; d += 30) {
    const a = ((d - 90) * Math.PI) / 180;
    const r = OUTER + 16;
    labels.push(
      <text
        key={d}
        x={C + r * Math.cos(a)}
        y={C + r * Math.sin(a) + 3}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="8.5"
        letterSpacing="0.06em"
        fill="rgb(223 229 227 / 0.38)"
      >
        {String(d).padStart(3, "0")}
      </text>,
    );
  }
  return (
    <g>
      <circle cx={C} cy={C} r={OUTER} fill="none" stroke="rgb(223 229 227 / 0.22)" strokeWidth="0.8" />
      {ticks}
      {labels}
    </g>
  );
}

/**
 * Twenty-four divisions (the 24 mountains of an Eastern compass) left unlabeled,
 * except for 癸, which sits at 15° north-by-east. One faint mark, not a chart.
 */
function MountainScale() {
  const divisions = [];
  for (let i = 0; i < 24; i++) {
    const d = i * 15 + 7.5;
    divisions.push(
      <line
        key={i}
        x1={C}
        y1={C - INNER}
        x2={C}
        y2={C - INNER + 9}
        transform={`rotate(${d} ${C} ${C})`}
        stroke="rgb(111 163 156 / 0.5)"
        strokeWidth="0.8"
      />,
    );
  }
  const a = ((15 - 90) * Math.PI) / 180;
  const r = INNER + 20;
  return (
    <g>
      <circle cx={C} cy={C} r={INNER} fill="none" stroke="rgb(111 163 156 / 0.35)" strokeWidth="0.8" />
      <circle cx={C} cy={C} r={INNER + 34} fill="none" stroke="rgb(223 229 227 / 0.07)" strokeWidth="0.8" strokeDasharray="1 5" />
      {divisions}
      <path
        d={`M ${C} ${C - INNER - 3} A ${INNER + 3} ${INNER + 3} 0 0 1 ${C + (INNER + 3) * Math.sin((22.5 * Math.PI) / 180)} ${
          C - (INNER + 3) * Math.cos((22.5 * Math.PI) / 180)
        }`}
        transform={`rotate(-7.5 ${C} ${C})`}
        fill="none"
        stroke="var(--color-copper)"
        strokeWidth="1.4"
      />
      <text
        x={C + r * Math.cos(a)}
        y={C + r * Math.sin(a) + 5}
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontWeight="300"
        fontSize="15"
        fill="var(--color-copper-2)"
      >
        癸
      </text>
    </g>
  );
}

export function Instrument({ readouts, label }: { readouts: Readout[]; label: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [probe, setProbe] = useState<{ theta: number; r: number } | null>(null);

  useEffect(() => {
    const cv = canvas.current;
    const box = wrap.current;
    if (!cv || !box) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rings: Ring[] = [];
    let raf = 0;
    let visible = true;
    let last = 0;
    let scale = 1;
    let dpr = 1;

    const resize = () => {
      const w = box.clientWidth;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      scale = w / SIZE;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(w * dpr);
      cv.style.width = `${w}px`;
      cv.style.height = `${w}px`;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(box);

    const drop = (x: number, y: number, copper = false) => {
      rings.push({ x, y, r: 0, max: 60 + Math.random() * 80, life: 1, copper });
      if (rings.length > 36) rings.shift();
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };

    const draw = () => {
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.save();
      ctx.beginPath();
      ctx.arc(C, C, WATER, 0, Math.PI * 2);
      ctx.clip();

      // Still water: a faint reflective sheen, lower half darker like a pool seen at an angle.
      const sheen = ctx.createLinearGradient(0, C - WATER, 0, C + WATER);
      sheen.addColorStop(0, "rgba(47,111,105,0.10)");
      sheen.addColorStop(0.5, "rgba(15,21,21,0.0)");
      sheen.addColorStop(1, "rgba(28,74,71,0.16)");
      ctx.fillStyle = sheen;
      ctx.fillRect(0, 0, SIZE, SIZE);

      for (const ring of rings) {
        const alpha = ring.life * ring.life;
        for (let k = 0; k < 3; k++) {
          const rr = ring.r - k * 9;
          if (rr <= 0) continue;
          ctx.beginPath();
          // Ellipse: rings seen on a water surface, flattened by perspective.
          ctx.ellipse(ring.x, ring.y, rr, rr * 0.42, 0, 0, Math.PI * 2);
          ctx.strokeStyle = ring.copper
            ? `rgba(224,164,114,${0.5 * alpha * (1 - k * 0.3)})`
            : `rgba(150,196,189,${0.42 * alpha * (1 - k * 0.3)})`;
          ctx.lineWidth = 0.9 - k * 0.2;
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    function tick(t: number) {
      const dt = last ? Math.min((t - last) / 1000, 0.05) : 0.016;
      last = t;
      for (const ring of rings) {
        ring.r += (ring.max - ring.r) * (1 - Math.exp(-dt * 1.6)) + dt * 6;
        ring.life -= dt * 0.42;
      }
      for (let i = rings.length - 1; i >= 0; i--) if (rings[i].life <= 0) rings.splice(i, 1);
      draw();
      if (rings.length && visible) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
        last = 0;
      }
    }

    const toLocal = (e: PointerEvent) => {
      const rect = box.getBoundingClientRect();
      return { x: ((e.clientX - rect.left) / rect.width) * SIZE, y: ((e.clientY - rect.top) / rect.height) * SIZE };
    };

    let lastDrop = 0;
    const onMove = (e: PointerEvent) => {
      const { x, y } = toLocal(e);
      const dx = x - C;
      const dy = y - C;
      const dist = Math.hypot(dx, dy);
      if (dist > OUTER) {
        setProbe(null);
        return;
      }
      const theta = (Math.atan2(dx, -dy) * 180) / Math.PI;
      setProbe({ theta: (theta + 360) % 360, r: dist / OUTER });
      if (reduce || dist > WATER) return;
      const now = performance.now();
      if (now - lastDrop > 140) {
        lastDrop = now;
        drop(x, y);
      }
    };
    const onLeave = () => setProbe(null);
    const onDown = (e: PointerEvent) => {
      if (reduce) return;
      const { x, y } = toLocal(e);
      if (Math.hypot(x - C, y - C) <= WATER) drop(x, y, true);
    };

    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerleave", onLeave);
    box.addEventListener("pointerdown", onDown);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && rings.length && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(box);

    // Ambient rain: a drop now and then, so the water is never quite still.
    let ambient = 0;
    const scheduleAmbient = () => {
      ambient = window.setTimeout(() => {
        if (visible && !document.hidden) {
          const a = Math.random() * Math.PI * 2;
          const rr = Math.sqrt(Math.random()) * (WATER - 30);
          drop(C + rr * Math.cos(a), C + rr * Math.sin(a) * 0.9, Math.random() < 0.12);
        }
        scheduleAmbient();
      }, 1800 + Math.random() * 2600);
    };
    draw();
    if (!reduce) {
      drop(C, C + 20);
      scheduleAmbient();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(ambient);
      ro.disconnect();
      io.disconnect();
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerleave", onLeave);
      box.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <figure className="relative mx-auto w-full max-w-[520px]" aria-label={label}>
      <div ref={wrap} className="relative aspect-square w-full touch-pan-y select-none">
        <canvas ref={canvas} className="absolute inset-0" aria-hidden="true" />
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          {/* Crosshair */}
          <line x1={C} y1={C - OUTER - 30} x2={C} y2={C + OUTER + 30} stroke="rgb(223 229 227 / 0.07)" strokeWidth="0.8" />
          <line x1={C - OUTER - 30} y1={C} x2={C + OUTER + 30} y2={C} stroke="rgb(223 229 227 / 0.07)" strokeWidth="0.8" />
          <DegreeScale />
          <MountainScale />
          <circle cx={C} cy={C} r={WATER} fill="none" stroke="rgb(223 229 227 / 0.1)" strokeWidth="0.8" />
          <circle cx={C} cy={C} r="2" fill="var(--color-copper-2)" />
          {probe && (
            <g>
              <line
                x1={C}
                y1={C}
                x2={C + OUTER * Math.sin((probe.theta * Math.PI) / 180)}
                y2={C - OUTER * Math.cos((probe.theta * Math.PI) / 180)}
                stroke="var(--color-copper)"
                strokeWidth="0.8"
                strokeOpacity="0.7"
              />
              <circle cx={C} cy={C} r={probe.r * OUTER} fill="none" stroke="var(--color-copper)" strokeOpacity="0.35" strokeWidth="0.6" strokeDasharray="2 4" />
            </g>
          )}
        </svg>
      </div>

      <figcaption className="glass absolute -bottom-4 left-0 w-[13.5rem] rounded-[3px] px-4 py-3 font-mono text-[0.68rem] leading-[1.9] tracking-[0.04em] sm:-left-6">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4">
          {readouts.map((r) => (
            <div key={r.k} className="contents">
              <dt className="text-fog-3">{r.k}</dt>
              <dd className="text-fog-2">{r.v}</dd>
            </div>
          ))}
          <dt className="text-fog-3">θ / r</dt>
          <dd className="tabular-nums text-copper-2" aria-live="off">
            {probe ? `${probe.theta.toFixed(1).padStart(5, "0")}° / ${probe.r.toFixed(2)}` : "—"}
          </dd>
        </dl>
      </figcaption>
    </figure>
  );
}
