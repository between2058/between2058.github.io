import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionaries, isLocale, locales } from "@/content/site";
import { getPost, getPostHtml, posts } from "@/content/posts";
import { ArrowLeft, ArrowUpRight } from "@/components/Icons";

export function generateStaticParams() {
  return locales.flatMap((lang) => posts.map((p) => ({ lang, slug: p.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/writing/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(lang) || !post) return {};
  const zh = lang === "zh";
  return {
    title: zh ? post.title.replaceAll("\u200b", "") : post.titleEn,
    description: zh ? post.summary : post.summaryEn,
    alternates: {
      canonical: `/zh/writing/${slug}`,
      languages: { "zh-TW": `/zh/writing/${slug}`, en: `/en/writing/${slug}` },
    },
    openGraph: { type: "article", publishedTime: post.date },
  };
}

export default async function PostPage({ params }: PageProps<"/[lang]/writing/[slug]">) {
  const { lang, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(lang) || !post) notFound();
  const t = dictionaries[lang];
  const zh = lang === "zh";
  // Post bodies are first-party HTML migrated from the old site, stored in the repo.
  const html = await getPostHtml(slug);

  return (
    <article className="mx-auto max-w-[760px] px-[var(--gutter)] pb-32 pt-32 sm:pt-40" lang="zh-Hant-TW">
      <Link
        href={`/${lang}/writing`}
        className="group inline-flex items-center gap-2 text-[0.85rem] text-fog-3 transition-colors hover:text-fog"
        lang={zh ? "zh-Hant-TW" : "en"}
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" />
        {t.writing.back}
      </Link>

      <header className="mt-12 border-b border-line-2 pb-10">
        <h1 className="phrase text-balance font-serif text-[clamp(1.7rem,3.6vw,2.4rem)] font-light leading-[1.5] tracking-[0.02em] text-fog">
          {post.title}
        </h1>
        {!zh && (
          <p className="mt-3 text-[1.05rem] font-light text-fog-2" lang="en">
            {post.titleEn}
          </p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.85rem] text-fog-3" lang={zh ? "zh-Hant-TW" : "en"}>
          <time dateTime={post.date} className="font-mono text-[0.75rem] tabular-nums">
            {post.date.replaceAll("-", ".")}
          </time>
          {t.writing.langNote && <span>{t.writing.langNote}</span>}
          {post.medium && (
            <a
              href={post.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-copper-2"
            >
              {t.writing.medium}
              <ArrowUpRight className="h-3 w-3" />
            </a>
          )}
        </div>
      </header>

      <div className="article mt-12" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
