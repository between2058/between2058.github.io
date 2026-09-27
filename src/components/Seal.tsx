/**
 * A small square seal (印) carrying 張, carved from a split block:
 * one diagonal cut runs through it, the 破 in the identity.
 */
export function Seal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="2.5" fill="var(--color-seal)" />
      <text
        x="16"
        y="22.5"
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontWeight="500"
        fontSize="19"
        fill="#efe6dc"
      >
        張
      </text>
      <path d="M1 21 L31 11" stroke="var(--color-ink)" strokeWidth="1.1" />
    </svg>
  );
}
