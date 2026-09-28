import type { Locale } from "@/content/site";

type Span = {
  key: string;
  from: number;
  to: number | null; // null = still open
  row: number;
  label: string;
  tone: "foam" | "wave";
};

const START = 2018;

/**
 * Trace as a graduated ruler: one division per year, months as fine ticks,
 * spans drawn to scale. Open spans trail off dotted; points mark single moments.
 */
export function TraceScale({ lang, label }: { lang: Locale; label: string }) {
  const now = new Date();
  const end = now.getFullYear() + now.getMonth() / 12;
  const years: number[] = [];
  for (let y = START; y <= Math.floor(end); y++) years.push(y);
  const pct = (v: number) => `${(((v - START) / (end - START)) * 100).toFixed(3)}%`;

  const zh = lang === "zh";
  const spans: Span[] = [
    { key: "yzu", from: 2018, to: 2022, row: 0, label: zh ? "元智大學 電機" : "Yuan Ze EE", tone: "foam" },
    { key: "ntu", from: 2022, to: 2023, row: 1, label: zh ? "臺大 電信所" : "NTU GICE", tone: "wave" },
    { key: "pegatron", from: 2025, to: null, row: 0, label: zh ? "和碩" : "Pegatron", tone: "wave" },
  ];
  const points = [
    { key: "posts", at: 2020 + 1.5 / 12, row: 1, label: zh ? "兩篇文章" : "Two posts" },
  ];

  return (
    <figure className="relative" aria-label={label}>
      <div className="relative h-[9.5rem]">
        {/* Spans */}
        {spans.map((s) => {
          const left = pct(s.from);
          const width = `calc(${pct(s.to ?? end)} - ${left})`;
          const color = s.tone === "wave" ? "bg-wave-3" : "bg-foam-2";
          return (
            <div key={s.key} className="absolute" style={{ left, width, top: `${s.row * 2.6}rem` }}>
              <p className="whitespace-nowrap pb-1.5 text-[0.8rem] text-foam-2">{s.label}</p>
              {s.to === null ? (
                <div
                  className="h-px"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--color-wave-3) 55%, transparent 55%)",
                    backgroundSize: "6px 1px",
                    maskImage: "linear-gradient(to right, #000 30%, transparent)",
                  }}
                />
              ) : (
                <div className={`h-px ${color}`} />
              )}
              <span className={`absolute bottom-[-3px] left-0 h-[7px] w-px ${s.to === null ? "bg-wave-3" : color}`} />
              {s.to !== null && <span className={`absolute bottom-[-3px] right-0 h-[7px] w-px ${color}`} />}
            </div>
          );
        })}
        {points.map((p) => (
          <div key={p.key} className="absolute" style={{ left: pct(p.at), top: `${p.row * 2.6 + 5.2}rem` }}>
            <span className="absolute -left-[3px] top-0 h-[6px] w-[6px] rounded-full border border-foam-3" />
            <p className="whitespace-nowrap pl-3 text-[0.75rem] leading-[6px] text-foam-3">{p.label}</p>
          </div>
        ))}
        {/* Now */}
        <div className="absolute bottom-0 right-0 top-0 flex flex-col items-end">
          <p className="pb-1.5 text-[0.8rem] text-foam">{zh ? "現在" : "Now"}</p>
          <span className="w-px flex-1 bg-foam-2" />
        </div>
      </div>

      {/* The ruler */}
      <div className="relative h-8 border-t border-line-2">
        <div
          className="absolute inset-x-0 top-0 h-[5px]"
          style={{
            backgroundImage: "linear-gradient(to right, rgb(239 232 218 / 0.22) 1px, transparent 1px)",
            backgroundSize: `calc(100% / ${((end - START) * 12).toFixed(3)}) 100%`,
          }}
        />
        {years.map((y) => (
          <div key={y} className="absolute top-0" style={{ left: pct(y) }}>
            <span className="absolute left-0 top-0 h-3 w-px bg-foam-3" />
            <span
              className={`absolute left-0 top-4 font-mono ${y === START ? "" : "-translate-x-1/2"} text-[0.68rem] tabular-nums text-foam-3 ${
                (y - START) % 2 ? "hidden sm:block" : ""
              }`}
            >
              {y}
            </span>
          </div>
        ))}
      </div>
    </figure>
  );
}
