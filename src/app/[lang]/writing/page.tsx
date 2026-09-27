import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionaries, isLocale } from "@/content/site";
import { posts } from "@/content/posts";
import { ArrowRight } from "@/components/Icons";

export async function generateMetadata({ params }: PageProps<"/[lang]/writing">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = dictionaries[lang];
  return {
    title: t.writing.title,
    description: t.writing.lead,
    alternates: { canonical: `/${lang}/writing`, languages: { "zh-TW": "/zh/writing", en: "/en/writing" } },
  };
}

export default async function WritingIndex({ params }: PageProps<"/[lang]/writing">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dictionaries[lang];
  const zh = lang === "zh";

  return (
    <div className="mx-auto max-w-[1100px] px-[var(--gutter)] pb-32 pt-36 sm:pt-44">
      <h1
        className={`text-fog ${
          zh
            ? "font-serif text-[clamp(2.2rem,5vw,3.5rem)] font-extralight tracking-[0.06em]"
            : "text-[clamp(2.4rem,5.4vw,4rem)] font-extralight tracking-[-0.035em]"
        }`}
      >
        {t.writing.title}
      </h1>
      <p className="mt-6 max-w-[52ch] text-fog-2">{t.writing.lead}</p>

      {posts.length === 0 ? (
        <p className="mt-16 text-fog-3">{t.writing.empty}</p>
      ) : (
        <ul className="mt-16 border-t border-line-2">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/${lang}/writing/${p.slug}`}
                className="group grid gap-2 border-b border-line py-9 transition-colors duration-500 hover:bg-ink-2/60 sm:grid-cols-[8rem_1fr_auto] sm:items-baseline sm:gap-8 sm:px-4"
              >
                <time dateTime={p.date} className="font-mono text-[0.72rem] tracking-[0.08em] text-fog-3">
                  {p.date.replaceAll("-", ".")}
                </time>
                <span>
                  <span className="phrase block font-serif text-[1.25rem] font-light leading-[1.6] text-fog transition-colors duration-500 group-hover:text-copper-2">
                    {zh ? p.title : p.titleEn}
                  </span>
                  <span className="mt-2 block max-w-[64ch] text-[0.92rem] text-fog-3">{zh ? p.summary : p.summaryEn}</span>
                </span>
                <ArrowRight className="hidden h-4 w-4 text-fog-3 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-copper-2 sm:block" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
