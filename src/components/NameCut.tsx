"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 破軍: the name arrives split along one diagonal and recomposes into register.
 * While the pointer moves across the hero, the halves drift apart slightly and settle back.
 */
export function NameCut({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<"split" | "joined">("split");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => setState("joined"), reduce ? 0 : 350);

    const el = ref.current;
    if (!el) return () => window.clearTimeout(id);
    // Angle the copper line so it runs exactly along the clip diagonal.
    const fit = () => {
      const cs = getComputedStyle(el);
      const drop = (parseFloat(cs.getPropertyValue("--cut-l")) - parseFloat(cs.getPropertyValue("--cut-r"))) / 100;
      const deg = (-Math.atan2(drop * el.offsetHeight, el.offsetWidth) * 180) / Math.PI;
      el.style.setProperty("--cut-angle", `${deg.toFixed(2)}deg`);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    const hero = el.closest("[data-hero]");
    if (!hero) return () => {
      window.clearTimeout(id);
      ro.disconnect();
    };

    let settle = 0;
    const onMove = (e: Event) => {
      const pe = e as PointerEvent;
      const rect = el.getBoundingClientRect();
      const dy = (pe.clientY - (rect.top + rect.height / 2)) / window.innerHeight;
      const dx = (pe.clientX - (rect.left + rect.width / 2)) / window.innerWidth;
      const shift = Math.max(-6, Math.min(6, dx * 10 + dy * 6));
      el.style.setProperty("--cut-x", shift.toFixed(2));
      window.clearTimeout(settle);
      settle = window.setTimeout(() => el.style.setProperty("--cut-x", "0"), 700);
    };
    if (!reduce) hero.addEventListener("pointermove", onMove);
    return () => {
      ro.disconnect();
      window.clearTimeout(id);
      window.clearTimeout(settle);
      hero.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <span ref={ref} className={`cut ${className}`} data-state={state}>
      <span className="cut__a">{text}</span>
      <span className="cut__b" aria-hidden="true">
        {text}
      </span>
      <span className="cut__line" aria-hidden="true" />
    </span>
  );
}
