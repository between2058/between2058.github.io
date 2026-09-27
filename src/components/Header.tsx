"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/content/site";
import { Seal } from "./Seal";

const sections = ["work", "method", "projects", "trace", "writing", "contact"] as const;

export function Header({ lang, t }: { lang: Locale; t: Dictionary }) {
  const pathname = usePathname() ?? `/${lang}`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  const other = t.langSwitch.target;
  const switchHref = pathname.replace(/^\/(zh|en)(?=\/|$)/, `/${other}`);
  const hrefFor = (id: (typeof sections)[number]) => `/${lang}#${id}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-700 ${
        scrolled ? "border-b border-line bg-ink/70 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-[var(--gutter)]">
        <Link href={`/${lang}`} className="group flex items-center gap-3" aria-label={t.meta.title}>
          <Seal className="h-7 w-7 transition-transform duration-700 ease-out-expo group-hover:rotate-[-6deg]" />
          <span className="text-[0.85rem] tracking-[0.02em] text-fog-2 transition-colors group-hover:text-fog">
            between2058
          </span>
        </Link>

        <nav aria-label={lang === "zh" ? "主要導覽" : "Primary"} className="hidden md:block">
          <ul className="flex items-center gap-7 text-[0.84rem] text-fog-3">
            {sections.map((id) => (
              <li key={id}>
                <Link href={hrefFor(id)} className="transition-colors duration-300 hover:text-fog">
                  {t.nav[id]}
                </Link>
              </li>
            ))}
            <li aria-hidden="true" className="h-3 w-px bg-line-2" />
            <li>
              <Link
                href={switchHref}
                hrefLang={other === "zh" ? "zh-Hant-TW" : "en"}
                aria-label={t.langSwitch.label}
                className="text-[0.82rem] text-fog-2 transition-colors hover:text-copper-2"
              >
                {t.langSwitch.short}
              </Link>
            </li>
          </ul>
        </nav>

        <div ref={menuRef} className="relative flex items-center gap-4 md:hidden">
          <Link
            href={switchHref}
            hrefLang={other === "zh" ? "zh-Hant-TW" : "en"}
            aria-label={t.langSwitch.label}
            className="px-1 py-2 text-[0.85rem] text-fog-2"
          >
            {t.langSwitch.short}
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center text-fog-2"
          >
            <span className="sr-only">{lang === "zh" ? "目錄" : "Menu"}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d={open ? "M4 4l12 12M16 4L4 16" : "M3 7h14M3 13h9"}
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {open && (
            <nav
              id="mobile-nav"
              aria-label={lang === "zh" ? "主要導覽" : "Primary"}
              className="glass absolute right-0 top-12 w-56 rounded-[3px] p-2"
            >
              <ul>
                {sections.map((id) => (
                  <li key={id}>
                    <Link
                      href={hrefFor(id)}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between px-3 py-2.5 text-[0.95rem] text-fog-2 hover:text-fog"
                    >
                      {t.nav[id]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
