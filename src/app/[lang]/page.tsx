import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionaries, isLocale, links, type Locale } from "@/content/site";
import { posts } from "@/content/posts";
import { NameCut } from "@/components/NameCut";
import { Instrument } from "@/components/Instrument";
import { FluxDiagram } from "@/components/FluxDiagram";
import { CopyEmail } from "@/components/CopyEmail";
import { TraceScale } from "@/components/TraceScale";
import { WaterLine } from "@/components/WaterLine";
import { ArrowRight, ArrowUpRight } from "@/components/Icons";

function isExternal(href: string) {
  return /^https?:/.test(href);
}

function Heading({ id, children, lang }: { id: string; children: React.ReactNode; lang: Locale }) {
  return (
    <h2
      id={`${id}-title`}
      data-reveal
      className={`text-balance text-fog ${
        lang === "zh"
          ? "phrase font-serif text-[clamp(1.7rem,3.2vw,2.5rem)] font-light leading-[1.35] tracking-[0.04em]"
          : "text-[clamp(1.8rem,3.4vw,2.75rem)] font-light leading-[1.15] tracking-[-0.025em]"
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
  const cls = `group inline-flex items-center gap-1.5 text-fog-2 underline decoration-copper/50 decoration-1 underline-offset-[0.35em] transition-colors duration-300 hover:text-copper-2 hover:decoration-copper-2 ${className}`;
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
      {/* ——— First viewport: the observation instrument ——— */}
      <section
        data-hero
        aria-labelledby="hero-title"
        className="relative mx-auto grid min-h-[100svh] max-w-[1440px] grid-cols-1 overflow-x-clip items-center gap-y-16 px-[var(--gutter)] pb-20 pt-28 lg:grid-cols-12 lg:gap-x-8 lg:pb-16 lg:pt-24"
      >
        <span
          aria-hidden="true"
          className="ink-bleed pointer-events-none absolute left-[-4vw] top-[8vh] select-none font-serif text-[clamp(18rem,52vh,34rem)] font-extralight leading-none text-fog opacity-[0.045]"
        >
          癸
        </span>

        <div className="relative lg:col-span-7">
          <h1 id="hero-title" className="text-fog">
            <NameCut
              text="Johnny Chang"
              className="text-[clamp(3.1rem,8.4vw,6rem)] font-light leading-[1.02] tracking-[-0.04em] [--cut-l:74%] [--cut-r:30%]"
            />
            <span className="mt-4 block font-serif text-[clamp(1.25rem,2.2vw,1.6rem)] font-extralight tracking-[0.5em] text-fog-2">
              張舜程
            </span>
          </h1>

          <p
            className={`mt-10 max-w-[34ch] text-balance text-fog ${
              zh
                ? "font-serif text-[clamp(1.2rem,2vw,1.5rem)] font-light leading-[1.7] tracking-[0.03em]"
                : "text-[clamp(1.2rem,2vw,1.5rem)] font-light leading-[1.45] tracking-[-0.01em]"
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

          <ul className="mt-8 space-y-1.5 text-[0.95rem] text-fog-2">
            {t.hero.roles.map((r) => (
              <li key={r} className="flex items-baseline gap-3">
                <span className="relative top-[-0.2em] inline-block h-px w-4 bg-teal-3" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-[2px] border border-fog/70 bg-fog px-6 py-3 text-[0.92rem] font-medium text-ink transition-colors duration-500 hover:bg-transparent hover:text-fog"
            >
              {t.hero.contact}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
            </a>
            <TextLink href={links.fateflux}>{t.hero.fateflux}</TextLink>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <Instrument readouts={t.hero.readouts} label={t.hero.instrumentLabel} clockLabel={t.hero.clockLabel} />
        </div>
      </section>

      {/* ——— Work ——— */}
      <section id="work" aria-labelledby="work-title" className="relative overflow-x-clip mx-auto max-w-[1440px] px-[var(--gutter)] py-28 sm:py-36">
        <div aria-hidden="true" className="pool left-[40%] top-[10%]" style={{ "--a": 0.13 } as React.CSSProperties} />
        <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Heading id="work" lang={lang}>
              {t.work.title}
            </Heading>
            <p data-reveal style={{ "--i": 1 } as React.CSSProperties} className="mt-6 max-w-[38ch] text-fog-2">
              {t.work.lead}
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <dl className="border-t border-line-2">
              {t.work.fields.map((f, i) => (
                <div
                  key={f.name}
                  data-reveal
                  style={{ "--i": i + 1 } as React.CSSProperties}
                  className="group relative grid gap-2 border-b border-line py-7 sm:grid-cols-[14rem_1fr] sm:gap-8"
                >
                  <span aria-hidden="true" className="absolute -left-[5px] -top-[5px] h-[9px] w-[9px] text-fog-3">
                    <svg viewBox="0 0 9 9" className="h-full w-full">
                      <path d="M4.5 0v9M0 4.5h9" stroke="currentColor" strokeWidth="0.8" />
                    </svg>
                  </span>
                  <dt className="text-[1.35rem] font-light tracking-[-0.01em] text-fog transition-colors duration-500 group-hover:text-copper-2">
                    {f.name}
                  </dt>
                  <dd className="self-center text-fog-2">{f.note}</dd>
                </div>
              ))}
            </dl>
            <p data-reveal className="mt-6 text-[0.9rem] text-fog-2">
              {t.work.employer}
            </p>
            <p data-reveal className="mt-1 text-[0.85rem] text-fog-3">
              {t.work.discretion}
            </p>
          </div>
        </div>
      </section>

      {/* ——— Method: observe, deconstruct, recompose ——— */}
      <section
        id="method"
        aria-labelledby="method-title"
        className="relative border-y border-line bg-ink-2/60"
      >
        <div className="mx-auto max-w-[1440px] px-[var(--gutter)] py-28 sm:py-36">
          <div className="max-w-[46ch]">
            <Heading id="method" lang={lang}>
              {t.method.title}
            </Heading>
            <p data-reveal style={{ "--i": 1 } as React.CSSProperties} className="mt-6 text-fog-2">
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
                  {i === 1 ? (
                    <span className="cut font-serif text-[7.5rem] font-extralight leading-none text-fog/80 [--cut-x:9] [--cut-angle:-13.5deg]">
                      <span className="cut__a">{s.han}</span>
                      <span className="cut__b">{s.han}</span>
                      <span className="cut__line" />
                    </span>
                  ) : (
                    <span
                      className={`font-serif text-[7.5rem] font-extralight leading-none ${
                        i === 0 ? "ink-soak text-fog/75" : "text-fog/80"
                      }`}
                    >
                      {s.han}
                    </span>
                  )}
                </div>
                <h3 className={`mt-6 text-fog ${zh ? "font-serif text-[1.35rem] tracking-[0.12em]" : "text-[1.35rem] font-light"}`}>
                  {s.term}
                </h3>
                <p className="mt-3 max-w-[32ch] text-fog-2">{s.body}</p>
                <p className="mt-6 flex max-w-[34ch] gap-3 text-[0.86rem] leading-[1.75] text-fog-3">
                  <span className="mt-[0.72em] h-px w-5 shrink-0 bg-copper" aria-hidden="true" />
                  {s.proof}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

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
            className="ink-soak pointer-events-none absolute right-0 top-4 select-none font-serif text-[clamp(10rem,22vw,18rem)] font-extralight leading-none text-teal-2 opacity-[0.22]"
          >
            {fateflux.han}
          </span>
          <div className="relative lg:col-span-6">
            <h3 id="p-fateflux" className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-light leading-none tracking-[-0.035em] text-fog">
              {fateflux.title}
            </h3>
            <p className="mt-4 text-[0.85rem] text-fog-3">
              {fateflux.period} · {zh ? "創辦人" : "Founder"}
            </p>
            <p className="mt-8 max-w-[40ch] font-serif text-[1.15rem] font-light leading-[1.85] text-fog">
              {fateflux.summary}
            </p>
            <p className="mt-6 max-w-[56ch] text-fog-2">{fateflux.detail}</p>
            <p className="mt-6 text-[0.82rem] text-fog-3">{fateflux.tags.join(" · ")}</p>
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
                <span aria-hidden="true" className="font-serif text-[2.5rem] font-extralight leading-none text-fog-3 transition-colors duration-700 group-hover:text-copper-2">
                  {p.han}
                </span>
              </div>
              <div className="lg:col-span-4">
                <h3 id={`p-${p.id}`} className={`text-fog ${zh ? "phrase font-serif text-[1.4rem] font-light leading-[1.5]" : "text-[1.5rem] font-light leading-[1.25] tracking-[-0.015em]"}`}>
                  {p.title}
                </h3>
                <p className="mt-2 text-[0.85rem] text-fog-3">{p.period}</p>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className="text-fog">{p.summary}</p>
                <p className="mt-3 text-[0.92rem] text-fog-2">{p.detail}</p>
                <p className="mt-4 text-[0.82rem] text-fog-3">{p.tags.join(" · ")}</p>
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
      <WaterLine />
      <section id="trace" aria-labelledby="trace-title" className="relative overflow-x-clip">
        <div aria-hidden="true" className="pool -right-[10%] top-[30%]" style={{ "--w": "38rem", "--a": 0.12 } as React.CSSProperties} />
        <div className="relative mx-auto max-w-[1440px] px-[var(--gutter)] py-28 sm:py-36">
          <div className="max-w-[46ch]">
            <Heading id="trace" lang={lang}>
              {t.trace.title}
            </Heading>
            <p data-reveal style={{ "--i": 1 } as React.CSSProperties} className="mt-6 text-fog-2">
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
                className={`border-t pt-5 ${i === 0 ? "border-copper" : "border-line-2"}`}
              >
                <h3 className="text-[1.1rem] text-fog">
                  {m.title}
                  <span className="text-fog-3"> · </span>
                  <span className="text-fog-2">{m.place}</span>
                </h3>
                <p className={`mt-1 font-mono text-[0.72rem] tabular-nums tracking-[0.04em] ${i === 0 ? "text-copper-2" : "text-fog-3"}`}>{m.period}</p>
                {m.note && <p className="mt-3 max-w-[48ch] text-[0.9rem] text-fog-3">{m.note}</p>}
              </li>
            ))}
          </ol>

          <div className="mt-24">
            <h3 data-reveal className={`text-fog ${zh ? "font-serif text-[1.25rem] tracking-[0.12em]" : "text-[1.25rem] font-light"}`}>
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
                    <a href={h.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-fog transition-colors hover:text-copper-2">
                      {h.title}
                      <ArrowUpRight className="h-3 w-3 text-fog-3 transition-colors group-hover:text-copper-2" />
                    </a>
                  ) : (
                    <span className="text-fog">{h.title}</span>
                  )}
                  <span className="text-[0.86rem] text-fog-3">{h.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ——— Writing ——— */}
      <WaterLine />
      <section id="writing" aria-labelledby="writing-title" className="relative overflow-x-clip">
        <div aria-hidden="true" className="pool left-[-8%] top-[20%]" style={{ "--w": "34rem", "--a": 0.12 } as React.CSSProperties} />
        <div className="relative mx-auto max-w-[1440px] px-[var(--gutter)] py-28 sm:py-36">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[46ch]">
              <Heading id="writing" lang={lang}>
                {t.writing.title}
              </Heading>
              <p data-reveal className="mt-6 text-fog-2">
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
                  <time dateTime={p.date} className="font-mono text-[0.72rem] tracking-[0.08em] text-fog-3">
                    {p.date.replaceAll("-", ".")}
                  </time>
                  <span>
                    <span className="phrase block font-serif text-[1.2rem] font-light leading-[1.6] text-fog transition-colors duration-500 group-hover:text-copper-2">
                      {zh ? p.title : p.titleEn}
                    </span>
                    <span className="mt-2 block max-w-[64ch] text-[0.92rem] text-fog-3">{zh ? p.summary : p.summaryEn}</span>
                  </span>
                  <ArrowRight className="hidden h-4 w-4 text-fog-3 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-copper-2 sm:block" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ——— Contact: the statement and its reflection on water ——— */}
      <WaterLine />
      <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-[var(--gutter)] pb-24 pt-32 sm:pt-44">
          <div
            className={`relative ${
              zh
                ? "font-serif text-[clamp(1.75rem,5vw,3.75rem)] font-extralight leading-[1.4] tracking-[0.04em]"
                : "text-[clamp(1.55rem,5.4vw,4.25rem)] font-extralight leading-[1.08] tracking-[-0.035em]"
            }`}
          >
            <h2 id="contact-title" className="text-fog">
              {t.contact.titleLines.map((line) => (
                <span key={line} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}
            </h2>
            {/* Reflection: the line nearest the water, mirrored, strongest at the waterline. */}
            <div aria-hidden="true" className="pointer-events-none mt-[0.08em] h-[0.9em] select-none overflow-hidden">
              <span
                className="ink-bleed block -scale-y-100 whitespace-nowrap text-teal-3 opacity-40 [mask-image:linear-gradient(to_bottom,transparent_20%,#000)]"
              >
                {t.contact.titleLines[t.contact.titleLines.length - 1]}
              </span>
            </div>
          </div>

          <div className="relative mt-10 grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <p className="max-w-[44ch] text-fog-2">{t.contact.body}</p>
              <a
                href={`mailto:${links.email}`}
                className="group mt-8 inline-flex items-center gap-3 border-b border-copper/60 pb-2 text-[clamp(1.25rem,2.6vw,1.9rem)] font-light tracking-[-0.01em] text-fog transition-colors duration-500 hover:border-copper-2 hover:text-copper-2"
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
