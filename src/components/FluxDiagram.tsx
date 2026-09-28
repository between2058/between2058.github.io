import type { Locale } from "@/content/site";

const systems = {
  zh: ["紫微斗數", "八字", "人類圖", "易經", "文王卦", "塔羅", "西洋占星"],
  en: ["Zi Wei Dou Shu", "BaZi", "Human Design", "I Ching", "Wen Wang Gua", "Tarot", "Astrology"],
};

const stages = {
  zh: [
    { k: "計算", v: "每套系統各自的推演引擎" },
    { k: "解讀", v: "AI 綜合讀盤" },
    { k: "抵達", v: "MCP → ChatGPT · Claude" },
  ],
  en: [
    { k: "Compute", v: "One engine per system" },
    { k: "Interpret", v: "AI reads them together" },
    { k: "Arrive", v: "MCP → ChatGPT · Claude" },
  ],
};

/** How FateFlux works: seven separate systems, computed separately, converging into one reading. */
export function FluxDiagram({ lang }: { lang: Locale }) {
  const list = systems[lang];
  const n = list.length;
  const caption =
    lang === "zh"
      ? "FateFlux 的運作方式：七套系統各自計算，再匯流成一次解讀。"
      : "How FateFlux works: seven systems computed separately, converging into one reading.";

  return (
    <figure className="grid grid-cols-1 gap-6 sm:grid-cols-[auto_minmax(4rem,1fr)_auto] sm:items-center sm:gap-0">
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[0.86rem] text-foam-2 sm:block sm:space-y-[0.55rem]">
        {list.map((s) => (
          <li key={s} className="flex items-center gap-2.5 sm:justify-end">
            <span className="sm:order-2 h-1 w-1 rounded-full bg-wave-3" aria-hidden="true" />
            <span>{s}</span>
          </li>
        ))}
      </ul>

      <svg
        viewBox={`0 0 100 ${n * 10}`}
        preserveAspectRatio="none"
        className="hidden h-full w-full sm:block"
        aria-hidden="true"
      >
        {list.map((_, i) => {
          const y = i * 10 + 5;
          const mid = (n * 10) / 2;
          return (
            <path
              key={i}
              d={`M 4 ${y} C 50 ${y}, 50 ${mid}, 96 ${mid}`}
              fill="none"
              stroke="rgb(111 163 156 / 0.45)"
              strokeWidth="0.6"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
        <line
          x1="96"
          y1={(n * 10) / 2}
          x2="100"
          y2={(n * 10) / 2}
          stroke="var(--color-shu)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <ol className="relative border-l border-line-2 pl-5 sm:ml-0">
        {stages[lang].map((s, i) => (
          <li key={s.k} className={`relative ${i ? "mt-4" : ""}`}>
            <span
              className={`absolute -left-[1.42rem] top-[0.55rem] h-1.5 w-1.5 rounded-full ${
                i === stages[lang].length - 1 ? "bg-shu-2" : "bg-foam-3"
              }`}
              aria-hidden="true"
            />
            <p className="text-[0.78rem] text-wave-3">{s.k}</p>
            <p className="text-[0.92rem] text-foam">{s.v}</p>
          </li>
        ))}
      </ol>
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}
