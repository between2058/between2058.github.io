import { ribbon } from "@/lib/wave";

type Pt = [number, number];

/**
 * A Water-Breathing stroke painted into the page: a surging band of water with a pale core
 * and foam stripes that rolls into a curl at its tail. Static, so it exists without a pointer.
 */
export function BreathRibbon({
  path,
  width = 640,
  height = 200,
  maxW = 38,
  className = "",
}: {
  path: Pt[];
  width?: number;
  height?: number;
  maxW?: number;
  className?: string;
}) {
  const r = ribbon(path, maxW);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden="true">
      <g strokeLinejoin="round" strokeLinecap="round">
        <path d={r.body} fill="#2c5f8a" stroke="#06101b" strokeWidth="2.5" />
        <path d={r.core} fill="#6f9fc4" />
        {r.stripes.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#efe8da" strokeWidth={i ? 1.6 : 2.2} />
        ))}
      </g>
    </svg>
  );
}
