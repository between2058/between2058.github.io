import type { Dictionary } from "@/content/site";
import { ArrowUpRight } from "./Icons";
import { Seal } from "./Seal";

export function Footer({ t }: { t: Dictionary }) {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-[var(--gutter)] py-8 text-[0.8rem] text-foam-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-3">
          <Seal className="h-6 w-6" />
          <span>
            © {new Date().getFullYear()} {t.footer.line}
          </span>
        </p>
        <a
          href="https://github.com/between2058/between2058.github.io"
          className="flex w-fit items-center gap-1.5 transition-colors hover:text-foam"
        >
          {t.footer.source}
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </footer>
  );
}
