import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionaries, isLocale, links, type Locale } from "@/content/site";
import { posts } from "@/content/posts";
import { GreatWave } from "@/components/GreatWave";
import { WaterBreath } from "@/components/WaterBreath";
import { Seal } from "@/components/Seal";
import { FluxDiagram } from "@/components/FluxDiagram";
import { CopyEmail } from "@/components/CopyEmail";
import { TraceScale } from "@/components/TraceScale";
import { Passage } from "@/components/Passage";
import { BreathRibbon } from "@/components/BreathRibbon";
import { SeigaihaField } from "@/components/Seigaiha";
import { ArrowRight, ArrowUpRight } from "@/components/Icons";

function isExternal(href: string) {
  return /^https?:/.test(href);
}

function Heading({ id, children, lang }: { id: string; children: React.ReactNode; lang: Locale }) {
  return (
    <h2
      id={`${id}-title`}
      data-reveal
      className={`text-balance text-foam ${
        lang === "zh"
          ? "phrase font-kai text-[clamp(1.8rem,3.3vw,2.6rem)] leading-[1.35] tracking-[0.06em]"
          : "font-mincho text-[clamp(1.8rem,3.4vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.01em]"
      }`}
    >
      {children}
    </h2>
  );
}

function TextLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  const external = isExternal(href);
  const inner = (
    <>
      <span>{children}</span>
      {external ? (
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      ) : (
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
      )}
    </>
  );
  const cls = `group inline-flex items-center gap-1.5 text-foam-2 underline decoration-wave-3/60 decoration-1 underline-offset-[0.35em] transition-colors duration-300 hover:text-foam hover:decoration-foam ${className}`;
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dictionaries[lang];
  const zh = lang === "zh";
  const [fateflux, ...otherProjects] = t.projects.items;

  return (
    <>
      {/* ——— First viewport: the night sea ——— */}
      <section data-hero aria-labelledby="hero-title" className="relative min-h-[100svh] touch-pan-y overflow-hidden">
        <GreatWave className="absolute inset-x-0 top-0 h-[64svh] w-full lg:inset-0 lg:h-full" />
        {/* Keep the words legible over water: ink rises from the left on desktop, from below on phones. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_38svh,var(--color-ink)_62svh)] lg:bg-[linear-gradient(to_right,var(--color-ink)_8%,rgb(11_22_36/0.82)_34%,rgb(11_22_36/0.2)_58%,transparent_72%)]"
        />
        <WaterBreath />

        <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] items-end px-[var(--gutter)] pb-16 pt-[46svh] lg:items-center lg:pb-16 lg:pt-24">
          <div className="flex gap-6 sm:gap-9">
            <div className="flex shrink-0 flex-col items-center gap-3 pt-1">
              <p
                className="cartouche px-2.5 py-4 font-kai text-[1.35rem] leading-[1.25] tracking-[0.35em] [writing-mode:vertical-rl] sm:px-3 sm:py-5 sm:text-[1.7rem]"
                lang="zh-Hant-TW"
              >
                張舜程
              </p>
              <Seal className="h-8 w-8 sm:h-9 sm:w-9" />
            </div>

            <div className="max-w-[40rem]">
              <h1 id="hero-title" className="text-foam">
                <span
                  data-stroke-anchor
                  className="block font-mincho text-[clamp(2.8rem,7vw,5.6rem)] font-extrabold leading-[1] tracking-[-0.015em]"
                >
                  Johnny Chang
                </span>
                <BreathRibbon
                  path={[[6, 120], [150, 154], [320, 146], [460, 110], [540, 124]]}
                  className="-mt-1 block h-auto w-[min(92%,30rem)]"
                />
              </h1>

              <p
                className={`mt-5 max-w-[30ch] text-balance text-foam ${
                  zh
                    ? "phrase font-kai text-[clamp(1.25rem,2.1vw,1.6rem)] leading-[1.7] tracking-[0.04em]"
                    : "font-mincho text-[clamp(1.2rem,2vw,1.5rem)] font-medium leading-[1.45]"
                }`}
              >
                {zh
                  ? t.hero.thesis.split("，").map((part, i, arr) => (
                      <span key={part} className="block">
                        {part}
                        {i < arr.length - 1 ? "，" : ""}
                      </span>
                    ))
                  : t.hero.thesis}
              </p>

              <ul className="mt-7 space-y-1.5 text-[0.95rem] text-foam-2">
                {t.hero.roles.map((r) => (
                  <li key={r} className="flex items-baseline gap-3">
                    <span className="relative top-[-0.2em] inline-block h-px w-4 bg-wave-3" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href="#contact"
                  className="group relative inline-flex items-center gap-3 rounded-[2px] bg-foam px-6 py-3 text-[0.92rem] font-medium text-ink transition-colors duration-500 hover:bg-shu hover:text-foam"
                >
                  {t.hero.contact}
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
                </a>
                <TextLink href={links.fateflux}>{t.hero.fateflux}</TextLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Work ——— */}
      <section id="work" aria-labelledby="work-title" className="relative overflow-x-clip mx-auto max-w-[1440px] px-[var(--gutter)] py-28 sm:py-36">
        <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Heading id="work" lang={lang}>
              {t.work.title}
            </Heading>
            <p data-reveal style={{ "--i": 1 } as React.CSSProperties} className="mt-6 max-w-[38ch] text-foam-2">
              {t.work.lead}
            </p>
            <p data-reveal style={{ "--i": 2 } as React.CSSProperties} className="mt-5 max-w-[38ch] text-foam">
              {t.work.why}
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <dl className="border-t border-line-2">
              {t.work.fields.map((f, i) => (
                <div
                  key={f.name}
                  data-reveal
                  style={{ "--i": i + 1 } as React.CSSProperties}
                  className="group relative grid gap-2 border-b border-line py-7 sm:grid-cols-[11rem_1fr] sm:gap-8"
                >
                  <span aria-hidden="true" className="absolute -left-[5px] -top-[5px] h-[9px] w-[9px] text-foam-3">
                    <svg viewBox="0 0 9 9" className="h-full w-full">
                      <path d="M4.5 0v9M0 4.5h9" stroke="currentColor" strokeWidth="0.8" />
                    </svg>
                  </span>
                  <dt className="font-mincho text-[1.4rem] font-bold text-foam transition-colors duration-500 group-hover:text-wave-3">
                    {f.name}
                  </dt>
                  <dd className="self-center text-foam-2">{f.note}</dd>
                </div>
              ))}
            </dl>
            <p data-reveal className="mt-6 text-[0.9rem] text-foam-2">
              {t.work.employer}
            </p>
            <p data-reveal className="mt-1 text-[0.85rem] text-foam-3">
              {t.work.discretion}
            </p>
          </div>
        </div>
      </section>

      <Passage kind="waves" seed={2} into="seigaiha" />
      {/* ——— Method: observe, deconstruct, recompose ——— */}
      <section
        id="method"
        aria-labelledby="method-title"
        className="relative bg-ink-2"
      >
        <SeigaihaField id="seigaiha-method" ground="#0f1d2f" className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-[var(--gutter)] py-28 sm:py-36">
          <div className="max-w-[46ch]">
            <Heading id="method" lang={lang}>
              {t.method.title}
            </Heading>
            <p data-reveal style={{ "--i": 1 } as React.CSSProperties} className="mt-6 text-foam-2">
              {t.method.lead}
            </p>
          </div>

          <ol className="mt-20 grid gap-y-16 md:grid-cols-3 md:gap-y-0">
            {t.method.steps.map((s, i) => (
              <li
                key={s.term}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
                className={`relative md:px-10 ${i === 0 ? "md:pl-0" : "md:border-l md:border-line"} ${i === 2 ? "md:pr-0" : ""}`}
              >
                <div className="relative h-[8.5rem]" aria-hidden="true">
                  <span className="font-kai text-[7rem] font-bold leading-none text-foam">{s.han}</span>
                </div>
                <h3 className={`mt-6 text-foam ${zh ? "font-kai text-[1.45rem] tracking-[0.12em]" : "font-mincho text-[1.4rem] font-bold"}`}>
                  {s.term}
                </h3>
                <p className="mt-3 max-w-[32ch] text-foam-2">{s.body}</p>
                <p className="mt-6 flex max-w-[34ch] gap-3 text-[0.86rem] leading-[1.75] text-foam-3">
                  <span className="mt-[0.72em] h-px w-5 shrink-0 bg-wave-3" aria-hidden="true" />
                  {s.proof}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Passage kind="mountains" seed={12} flip />
      {/* ——— Projects ——— */}
      <section id="projects" aria-labelledby="projects-title" className="relative mx-auto max-w-[1440px] px-[var(--gutter)] py-28 sm:py-36">
        <Heading id="projects" lang={lang}>
          {t.projects.title}
        </Heading>

        <article
          data-reveal
          aria-labelledby="p-fateflux"
          className="relative mt-16 grid gap-14 border-t border-line-2 pt-12 lg:grid-cols-12 lg:gap-8"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-4 select-none font-kai text-[clamp(10rem,22vw,18rem)] font-bold leading-none text-wave-2 opacity-[0.35]"
          >
            {fateflux.han}
          </span>
          <div className="relative lg:col-span-6">
            <h3 id="p-fateflux" className="font-mincho text-[clamp(2.4rem,4.8vw,3.8rem)] font-extrabold leading-none text-foam">
              {fateflux.title}
            </h3>
            <p className="mt-4 text-[0.85rem] text-foam-3">
              {fateflux.period} · {zh ? "創辦人" : "Founder"}
            </p>
            <p className="mt-8 max-w-[40ch] font-kai text-[1.2rem] leading-[1.85] text-foam">
              {fateflux.summary}
            </p>
            <p className="mt-6 max-w-[56ch] text-foam-2">{fateflux.detail}</p>
            <p className="mt-6 text-[0.82rem] text-foam-3">{fateflux.tags.join(" · ")}</p>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
              {fateflux.links.map((l) => (
                <TextLink key={l.href} href={l.href}>
                  {l.label}
                </TextLink>
              ))}
            </div>
          </div>
          <div className="relative self-center lg:col-span-5 lg:col-start-8">
            <div className="glass rounded-[3px] p-6 sm:p-8">
              <FluxDiagram lang={lang} />
            </div>
          </div>
        </article>

        <div className="mt-24 border-t border-line-2">
          {otherProjects.map((p, i) => (
            <article
              key={p.id}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              aria-labelledby={`p-${p.id}`}
              className="group relative grid gap-6 border-b border-line py-12 lg:grid-cols-12 lg:gap-8"
            >
              <div className="lg:col-span-1">
                <span aria-hidden="true" className="font-kai text-[2.5rem] font-bold leading-none text-wave-3 transition-colors duration-700 group-hover:text-wave-3">
                  {p.han}
                </span>
              </div>
              <div className="lg:col-span-4">
                <h3 id={`p-${p.id}`} className={`text-foam ${zh ? "phrase font-kai text-[1.45rem] leading-[1.5]" : "font-mincho text-[1.45rem] font-bold leading-[1.25]"}`}>
                  {p.title}
                </h3>
                <p className="mt-2 text-[0.85rem] text-foam-3">{p.period}</p>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className="text-foam">{p.summary}</p>
                <p className="mt-3 text-[0.92rem] text-foam-2">{p.detail}</p>
                <p className="mt-4 text-[0.82rem] text-foam-3">{p.tags.join(" · ")}</p>
                <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-[0.92rem]">
                  {p.links.map((l) => (
                    <TextLink key={l.href} href={l.href}>
                      {l.label}
                    </TextLink>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ——— Trace: a ruler measured in years ——— */}
      <Passage kind="mist" seed={3} />
      <section id="trace" aria-labelledby="trace-title" className="relative overflow-x-clip">
        <div className="relative mx-auto max-w-[1440px] px-[var(--gutter)] py-28 sm:py-36">
          <div className="max-w-[46ch]">
            <Heading id="trace" lang={lang}>
              {t.trace.title}
            </Heading>
            <p data-reveal style={{ "--i": 1 } as React.CSSProperties} className="mt-6 text-foam-2">
              {t.trace.lead}
            </p>
          </div>

          <div data-reveal className="mt-16">
            <TraceScale lang={lang} label={t.trace.scaleLabel} />
          </div>

          <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
            {t.trace.marks.map((m, i) => (
              <li
                key={m.place}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
                className={`border-t pt-5 ${i === 0 ? "border-foam-2" : "border-line-2"}`}
              >
                <h3 className="text-[1.1rem] text-foam">
                  {m.title}
                  <span className="text-foam-3"> · </span>
                  <span className="text-foam-2">{m.place}</span>
                </h3>
                <p className={`mt-1 font-mono text-[0.72rem] tabular-nums tracking-[0.04em] ${i === 0 ? "text-foam" : "text-foam-3"}`}>{m.period}</p>
                {m.note && <p className="mt-3 max-w-[48ch] text-[0.9rem] text-foam-3">{m.note}</p>}
              </li>
            ))}
          </ol>

          <div className="mt-24">
            <h3 data-reveal className={`text-foam ${zh ? "font-kai text-[1.35rem] tracking-[0.12em]" : "font-mincho text-[1.3rem] font-bold"}`}>
              {t.trace.honorsTitle}
            </h3>
            <ul className="mt-6 grid border-t border-line md:grid-cols-2 md:gap-x-12">
              {t.trace.honors.map((h, i) => (
                <li
                  key={h.title}
                  data-reveal
                  style={{ "--i": i } as React.CSSProperties}
                  className="grid gap-1 border-b border-line py-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
                >
                  {h.href ? (
                    <a href={h.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-foam transition-colors hover:text-foam">
                      {h.title}
                      <ArrowUpRight className="h-3 w-3 text-foam-3 transition-colors group-hover:text-wave-3" />
                    </a>
                  ) : (
                    <span className="text-foam">{h.title}</span>
                  )}
                  <span className="text-[0.86rem] text-foam-3">{h.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ——— Writing ——— */}
      <Passage kind="waves" seed={4} flip />
      <section id="writing" aria-labelledby="writing-title" className="relative overflow-x-clip">
        <div className="relative mx-auto max-w-[1440px] px-[var(--gutter)] py-28 sm:py-36">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[46ch]">
              <Heading id="writing" lang={lang}>
                {t.writing.title}
              </Heading>
              <p data-reveal className="mt-6 text-foam-2">
                {t.writing.lead}
              </p>
            </div>
            <TextLink href={`/${lang}/writing`}>{t.writing.all}</TextLink>
          </div>

          <ul className="mt-14 border-t border-line-2">
            {posts.map((p, i) => (
              <li key={p.slug} data-reveal style={{ "--i": i } as React.CSSProperties}>
                <Link
                  href={`/${lang}/writing/${p.slug}`}
                  className="group grid gap-2 border-b border-line py-8 transition-colors duration-500 hover:bg-ink-2/60 sm:grid-cols-[8rem_1fr_auto] sm:items-baseline sm:gap-8 sm:px-4"
                >
                  <time dateTime={p.date} className="font-mono text-[0.72rem] tracking-[0.08em] text-foam-3">
                    {p.date.replaceAll("-", ".")}
                  </time>
                  <span>
                    <span className="phrase block font-kai text-[1.25rem] leading-[1.6] text-foam transition-colors duration-500 group-hover:text-wave-3">
                      {zh ? p.title : p.titleEn}
                    </span>
                    <span className="mt-2 block max-w-[64ch] text-[0.92rem] text-foam-3">{zh ? p.summary : p.summaryEn}</span>
                  </span>
                  <ArrowRight className="hidden h-4 w-4 text-foam-3 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-wave-3 sm:block" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ——— Contact: the statement and its reflection on water ——— */}
      <Passage kind="mountains" seed={6} />
      <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-[var(--gutter)] pb-24 pt-32 sm:pt-44">
          <div
            className={`relative ${
              zh
                ? "font-kai text-[clamp(1.75rem,5vw,3.75rem)] leading-[1.4] tracking-[0.04em]"
                : "font-mincho text-[clamp(1.55rem,5.2vw,4rem)] font-bold leading-[1.1]"
            }`}
          >
            <h2 id="contact-title" className="text-foam">
              {t.contact.titleLines.map((line) => (
                <span key={line} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}
            </h2>
            <BreathRibbon
              path={[[6, 116], [160, 150], [330, 142], [470, 106], [540, 120]]}
              className="mt-2 block h-auto w-[min(88%,26rem)]"
            />
          </div>

          <div className="relative mt-10 grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <p className="max-w-[44ch] text-foam-2">{t.contact.body}</p>
              <a
                href={`mailto:${links.email}`}
                className="group mt-8 inline-flex items-center gap-3 border-b border-wave-3/60 pb-2 font-mincho text-[clamp(1.2rem,2.5vw,1.8rem)] font-medium text-foam transition-colors duration-500 hover:border-foam hover:text-foam"
              >
                {links.email}
                <ArrowRight className="h-5 w-5 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
              </a>
              <div className="mt-3">
                <CopyEmail email={links.email} label={t.contact.copy} done={t.contact.copied} />
              </div>
            </div>
            <ul className="flex flex-wrap gap-x-8 gap-y-4 self-end text-[0.95rem] lg:col-span-5 lg:col-start-8 lg:justify-end">
              <li>
                <TextLink href={links.linkedin}>LinkedIn</TextLink>
              </li>
              <li>
                <TextLink href={links.github}>GitHub</TextLink>
              </li>
              <li>
                <TextLink href={links.instagram}>Instagram</TextLink>
              </li>
              <li>
                <TextLink href={links.fateflux}>FateFlux</TextLink>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
