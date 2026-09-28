import { ribbon } from "@/lib/wave";

type Pt = [number, number];

/**
 * A Water-Breathing stroke painted into the page: a tapering water ribbon with a pale core,
 * a foam line and a curl at its tail. Static, so it exists without a pointer.
 */
export function BreathRibbon({
  path,
  width = 600,
  height = 80,
  maxW = 14,
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
    <svg viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden="true" preserveAspectRatio="none">
      <g strokeLinejoin="round" strokeLinecap="round">
        <path d={r.body} fill="#2c5f8a" stroke="#06101b" strokeWidth="1.5" />
        <path d={r.core} fill="#6f9fc4" />
        <path d={r.line} fill="none" stroke="#efe8da" strokeWidth="1.3" />
        <path d={r.curl} fill="none" stroke="#efe8da" strokeWidth="1.6" />
      </g>
    </svg>
  );
}
