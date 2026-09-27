/** A section boundary drawn as a slow tide: one hairline, gently uneven, drifting sideways. */
export function WaterLine() {
  // Two identical periods side by side so the drift loops seamlessly.
  let d = "M0 7";
  for (let x = 0; x <= 2400; x += 40) {
    const y = 7 + Math.sin((x / 1200) * Math.PI * 2 * 3) * 2.2 + Math.sin((x / 1200) * Math.PI * 2 * 11) * 0.9;
    d += ` L${x} ${y.toFixed(2)}`;
  }
  return (
    <div className="waterline" aria-hidden="true">
      <svg viewBox="0 0 2400 14" preserveAspectRatio="none">
        <path d={d} fill="none" stroke="rgb(111 163 156 / 0.35)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
