"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; t: number };
type Stroke = { pts: P[]; born: number; done: boolean };

const LIFE = 1100; // ms a stroke takes to dissolve
const MAX_W = 22;

/**
 * Water-Breathing stroke: a fast pointer sweep across the hero leaves a tapering ribbon
 * of water (indigo body, pale core, a foam line) that curls at its tail and dissolves.
 * Works for mouse and touch drags; the painted BreathRibbon is its static counterpart.
 */
export function WaterBreath({ className = "" }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current;
    const host = cv?.closest("[data-hero]") as HTMLElement | null;
    if (!cv || !host) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const strokes: Stroke[] = [];
    let raf = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(host.clientWidth * dpr);
      cv.height = Math.round(host.clientHeight * dpr);
      cv.style.width = `${host.clientWidth}px`;
      cv.style.height = `${host.clientHeight}px`;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const ribbon = (pts: P[], widthAt: (u: number) => number) => {
      // Build left and right edges along the polyline, then fill between them.
      const left: [number, number][] = [];
      const right: [number, number][] = [];
      for (let i = 0; i < pts.length; i++) {
        const a = pts[Math.max(0, i - 1)];
        const b = pts[Math.min(pts.length - 1, i + 1)];
        let nx = -(b.y - a.y);
        let ny = b.x - a.x;
        const l = Math.hypot(nx, ny) || 1;
        nx /= l;
        ny /= l;
        const w = widthAt(i / (pts.length - 1));
        left.push([pts[i].x + nx * w, pts[i].y + ny * w]);
        right.push([pts[i].x - nx * w, pts[i].y - ny * w]);
      }
      ctx.beginPath();
      ctx.moveTo(left[0][0], left[0][1]);
      for (let i = 1; i < left.length; i++) {
        const [x0, y0] = left[i - 1];
        const [x1, y1] = left[i];
        ctx.quadraticCurveTo(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      }
      for (let i = right.length - 1; i >= 0; i--) ctx.lineTo(right[i][0], right[i][1]);
      ctx.closePath();
    };

    const curl = (x: number, y: number, dir: number, size: number, alpha: number) => {
      ctx.beginPath();
      for (let a = 0; a <= Math.PI * 3.2; a += 0.12) {
        const r = size * (1 - a / (Math.PI * 3.6));
        const px = x + Math.cos(a * dir + Math.PI / 2) * r;
        const py = y + Math.sin(a * dir + Math.PI / 2) * r - size;
        if (a === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = `rgba(239,232,218,${0.85 * alpha})`;
      ctx.lineWidth = 1.6;
      ctx.stroke();
    };

    const draw = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const s of strokes) {
        if (s.pts.length < 3) continue;
        const age = s.done ? now - s.born : 0;
        const alpha = Math.max(0, 1 - age / LIFE);
        const taper = (u: number) => Math.sin(Math.PI * Math.min(1, u * 1.05)) ** 0.8;
        // Body
        ribbon(s.pts, (u) => MAX_W * taper(u) * (0.6 + 0.4 * alpha));
        ctx.fillStyle = `rgba(44,95,138,${0.78 * alpha})`;
        ctx.fill();
        // Pale core, offset toward the leading edge
        ribbon(s.pts, (u) => MAX_W * 0.42 * taper(u));
        ctx.fillStyle = `rgba(126,170,208,${0.8 * alpha})`;
        ctx.fill();
        // Foam line
        ctx.beginPath();
        s.pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
        ctx.strokeStyle = `rgba(239,232,218,${0.9 * alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        // Curl at the tail
        const a = s.pts[s.pts.length - 2];
        const b = s.pts[s.pts.length - 1];
        curl(b.x, b.y, b.x >= a.x ? 1 : -1, 16, alpha);
      }
      for (let i = strokes.length - 1; i >= 0; i--) {
        if (strokes[i].done && now - strokes[i].born > LIFE) strokes.splice(i, 1);
      }
      raf = strokes.length ? requestAnimationFrame(draw) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    let current: Stroke | null = null;
    let idle = 0;
    const local = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() };
    };
    const end = () => {
      if (current) {
        current.done = true;
        current.born = performance.now();
        current = null;
      }
    };
    const onMove = (e: PointerEvent) => {
      const p = local(e);
      const last = current?.pts[current.pts.length - 1];
      if (current && last) {
        const v = Math.hypot(p.x - last.x, p.y - last.y) / Math.max(1, p.t - last.t);
        if (v < 0.35) {
          end();
        } else {
          current.pts.push(p);
          if (current.pts.length > 28) current.pts.shift();
        }
      } else {
        current = { pts: [p], born: p.t, done: false };
        strokes.push(current);
        if (strokes.length > 6) strokes.shift();
      }
      window.clearTimeout(idle);
      idle = window.setTimeout(end, 90);
      kick();
    };
    const onLeave = () => end();
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(idle);
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvas} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true" />;
}
