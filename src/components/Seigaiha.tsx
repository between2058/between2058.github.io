/** 青海波 as an SVG pattern: three sets of concentric half-rings overlapping like fish scales. */
export function SeigaihaPattern({
  id,
  ground,
  color = "#6f9fc4",
  opacity = 0.32,
}: {
  id: string;
  ground: string;
  color?: string;
  opacity?: number;
}) {
  const rings = [21, 15, 9];
  const arcs = [
    { cx: 0, cy: 24 },
    { cx: 48, cy: 24 },
    { cx: 24, cy: 12 },
  ];
  return (
    <pattern id={id} width="48" height="24" patternUnits="userSpaceOnUse">
      {/* Each scale is filled with the ground first so the ones in front hide the ones behind. */}
      {arcs.map(({ cx, cy }) => (
        <g key={`${cx}-${cy}`}>
          <path d={`M${cx - 23} ${cy} A23 23 0 0 1 ${cx + 23} ${cy} Z`} fill={ground} />
          {rings.map((r) => (
            <path
              key={r}
              d={`M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy}`}
              fill="none"
              stroke={color}
              strokeOpacity={opacity}
              strokeWidth="1.2"
            />
          ))}
        </g>
      ))}
    </pattern>
  );
}

/** A field of seigaiha filling its parent. */
export function SeigaihaField({ id, ground, opacity = 0.2, className = "" }: { id: string; ground: string; opacity?: number; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <defs>
        <SeigaihaPattern id={id} ground={ground} opacity={opacity} />
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
