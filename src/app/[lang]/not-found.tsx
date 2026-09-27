import Link from "next/link";
import { dictionaries } from "@/content/site";

export default function NotFound() {
  const t = dictionaries.zh;
  const en = dictionaries.en;
  return (
    <div className="mx-auto flex min-h-[80svh] max-w-[1100px] flex-col justify-center px-[var(--gutter)] pt-24">
      <p className="font-mono text-[0.72rem] tracking-[0.08em] text-fog-3">404</p>
      <h1 className="mt-4 font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-extralight tracking-[0.04em] text-fog">{t.notFound.title}</h1>
      <p className="mt-2 text-[1.2rem] font-light text-fog-2" lang="en">
        {en.notFound.title}
      </p>
      <p className="mt-6 text-fog-3">
        {t.notFound.body} <span lang="en">{en.notFound.body}</span>
      </p>
      <div className="mt-10 flex gap-8 text-[0.95rem]">
        <Link href="/zh" className="prose-link">
          {t.notFound.home}
        </Link>
        <Link href="/en" className="prose-link" lang="en">
          {en.notFound.home}
        </Link>
      </div>
    </div>
  );
}
