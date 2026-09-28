import Link from "next/link";
import { dictionaries } from "@/content/site";

export default function NotFound() {
  const t = dictionaries.zh;
  const en = dictionaries.en;
  return (
    <div className="mx-auto flex min-h-[80svh] max-w-[1100px] flex-col justify-center px-[var(--gutter)] pt-24">
      <h1 className="font-kai text-[clamp(1.8rem,4vw,2.8rem)] tracking-[0.04em] text-foam">{t.notFound.title}</h1>
      <p className="mt-2 font-mincho text-[1.2rem] font-medium text-foam-2" lang="en">
        {en.notFound.title}
      </p>
      <p className="mt-6 text-foam-3">
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
