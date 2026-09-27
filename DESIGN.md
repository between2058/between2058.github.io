---
name: between2058
description: 癸水 × 破軍. An Eastern future observation system for Johnny Chang (張舜程); ink, fog, deep teal, one thread of copper, one seal of dark red.
colors:
  ink: "#0a0e0e"
  ink-2: "#0f1515"
  ink-3: "#152020"
  fog: "#dfe5e3"
  fog-2: "#aebab7"
  fog-3: "#7e8f8b"
  teal: "#1c4a47"
  teal-2: "#2f6f69"
  teal-3: "#6fa39c"
  copper: "#c07c47"
  copper-2: "#e0a472"
  seal: "#8a2f28"
  line: "rgb(223 229 227 / 0.09)"
  line-2: "rgb(223 229 227 / 0.16)"
typography:
  display:
    fontFamily: "Geist, Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"
    fontSize: "clamp(3.1rem, 8.4vw, 6rem)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  display-han:
    fontFamily: "Noto Serif TC, Songti TC, PMingLiU, serif"
    fontSize: "7.5rem"
    fontWeight: 200
    lineHeight: 1
  headline:
    fontFamily: "Geist, Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"
    fontSize: "clamp(1.8rem, 3.4vw, 2.75rem)"
    fontWeight: 300
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  headline-zh:
    fontFamily: "Noto Serif TC, Songti TC, PMingLiU, serif"
    fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)"
    fontWeight: 300
    lineHeight: 1.35
    letterSpacing: "0.04em"
  title:
    fontFamily: "Geist, Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 300
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  title-zh:
    fontFamily: "Noto Serif TC, Songti TC, PMingLiU, serif"
    fontSize: "1.2rem"
    fontWeight: 300
    lineHeight: 1.6
  body:
    fontFamily: "Geist, Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
    fontFeature: "\"ss01\", \"cv11\""
  body-article:
    fontFamily: "Geist, Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.95
  label:
    fontFamily: "Geist, Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.9
    letterSpacing: "0.04em"
    fontFeature: "\"tnum\""
rounded:
  hair: "2px"
  glass: "3px"
spacing:
  gutter: "clamp(1rem, 4vw, 3.5rem)"
  grid: "72px"
  section: "7rem"
  section-lg: "9rem"
  container: "1440px"
  container-writing: "1100px"
  container-article: "760px"
components:
  button-primary:
    backgroundColor: "{colors.fog}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.hair}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "transparent"
    textColor: "{colors.fog}"
    rounded: "{rounded.hair}"
    padding: "12px 24px"
  text-link:
    textColor: "{colors.fog-2}"
    typography: "{typography.body}"
  text-link-hover:
    textColor: "{colors.copper-2}"
  glass-readout:
    backgroundColor: "rgb(15 21 21 / 0.55)"
    textColor: "{colors.fog-2}"
    typography: "{typography.mono}"
    rounded: "{rounded.glass}"
    padding: "12px 16px"
  nav-link:
    textColor: "{colors.fog-3}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.fog}"
  post-row:
    textColor: "{colors.fog}"
    typography: "{typography.title-zh}"
    padding: "32px 16px"
  post-row-hover:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.copper-2}"
  seal:
    backgroundColor: "{colors.seal}"
    rounded: "{rounded.hair}"
    size: "28px"
---

# Design System: between2058

## Overview

**Creative North Star: "The Observation Instrument"**

The site is an instrument that observes a person, not a résumé that lists one. It sits on wet, cold ink (癸水: fog, still water, reflection) and is cut through by a single decisive gesture (破軍: the diagonal that splits the name, the 破 mark, the cut through the seal). Everything is measured: a hairline observation grid fades toward the edges, a graduated ring carries the 24 mountains of an Eastern compass with only 癸 named, a trace is drawn as a ruler in years. The mood is calm, precise, a little distant; restrained cyberpunk carried by Eastern materials rather than neon.

Density is low and the page breathes. Type is light and thin (Geist 300 for Latin, Noto Serif TC 200–300 for Chinese display) set in fog on ink, and structure comes from 1px hairlines rather than filled containers. Atmosphere is layered, never loud: drifting fog, local mist pools, film grain, an ink-bleed turbulence filter behind large Han marks, a tide-line between sections. Colour is almost entirely neutral; copper is the one live signal and dark red exists only as the seal.

Confirmed rejections (owner-pinned in PRODUCT.md): gaudy neon, anime feel, full-bleed fortune-telling symbols, overly complex 3D, a templated-résumé look, a cold corporate look. The dev-portfolio default (gradient hero, skill chips, card grid, timeline) is refused by construction: tags are dot-joined text, work is a hairline definition list, the timeline is a scale.

**Key Characteristics:**
- Ink ground (#0a0e0e) with fog type; dark scheme only.
- Hairline structure: 1px rules at 9% and 16% fog, a 72px observation grid.
- Copper as the single live signal; dark red only as the seal.
- Extremely faint, very large Han marks, always processed (ink-bleed, ink-soak, or the cut).
- Slow exponential ease-out motion, long ambient drifts, nothing bouncy; all of it stops under reduced motion.
- Mono type reserved for measurements: clock, angles, years, dates.

## Colors

A near-monochrome of cold ink and fog, tinted toward teal, with one warm thread.

### Primary
- **Copper Thread** (copper): the single live signal. The 破 cut line through the name, the instrument's 癸 arc and probe, the "now" mark on the trace, the current role's rule, link underlines (at 55%), list markers in articles, `::selection`.
- **Lit Copper** (copper-2): the hover and active state of that signal. Link and row hover text, the instrument centre point and θ/r readout, the focus ring (1px, 4px offset), the caret.

### Secondary
- **Deep Tide Teal** (teal): the colour of fog fields and still water; scrollbar thumb, the deepest mist.
- **Moving Water Teal** (teal-2): fog pools, the ink-soak halo, blockquote rules, the FateFlux 流 mark at 22%.
- **Surface Teal** (teal-3): small structural marks in water's colour: role hairlines, the 24-mountain divisions, the waterline, diagram nodes and stage labels, the open-ended trace span.

### Tertiary
- **Seal Red** (seal): only the square 張 seal in the header. It is a signature, not a palette colour.

### Neutral
- **Ink** (ink): the page ground everywhere, including `theme-color`.
- **Ink Deep** (ink-2): the method band (at 60%), row hover wash, code blocks, glass tint.
- **Ink Wet** (ink-3): inline code chips.
- **Fog** (fog): primary text and headings; the primary button fill.
- **Fog Mid** (fog-2): body copy in sections, secondary lines, the ghost half of the cut name.
- **Fog Far** (fog-3): metadata, dates, captions, nav at rest, footnotes (5.7:1 on ink; the floor for text).
- **Hairline** (line) and **Hairline Strong** (line-2): every rule, divider, border and the grid itself.

### Named Rules
**The Single Signal Rule.** Copper marks what is live, current or under the pointer, and nothing else. It is a line, a dot, an underline or a hover state; it is never a fill, a background or a large area.

**The Seal Rule.** Dark red appears once per page, as the seal. It never tints text, borders or states.

**The Fog Floor Rule.** No text below fog-3 on ink. Fainter fog values are for atmosphere (Han marks, grid, tick marks) only, and those are `aria-hidden`.

## Typography

**Display Font:** Geist (with Noto Sans TC, PingFang TC, Microsoft JhengHei)
**Chinese Display Font:** Noto Serif TC, weights 200/300/500 (with Songti TC, PMingLiU)
**Label/Mono Font:** Geist Mono (with ui-monospace)

**Character:** A precise, light grotesque for Latin against a thin Ming serif for Chinese: the engineer's instrument label beside the scholar's brush. Latin tracks tight and negative; Chinese tracks open and positive.

### Hierarchy
- **Display** (300, clamp(3.1rem, 8.4vw, 6rem), 1.02, -0.04em): the name in the hero only, carried by the Name Cut.
- **Display Han** (200, 7.5rem up to clamp(18rem, 52vh, 34rem), 1): the method glyphs 觀/破/合 and the atmospheric 癸 and project marks. Always `aria-hidden`, always at reduced opacity.
- **Headline** (300, clamp(1.8rem, 3.4vw, 2.75rem), 1.15, -0.025em) and **Headline zh** (serif 300, clamp(1.7rem, 3.2vw, 2.5rem), 1.35, 0.04em): section headings, switched by locale. The contact statement scales both up to extralight at up to 4.25rem.
- **Title** (300, 1.35rem) and **Title zh** (serif 300, 1.2–1.4rem, 1.5–1.6): work fields, method terms, project and post titles.
- **Body** (400, 1rem, 1.7; zh 1.85 with 0.02em tracking): section copy at 32–56ch; `text-wrap: pretty`.
- **Body Article** (400, 1.0625rem, 1.95, fog-2): long-form writing at a 760px column; article headings in serif 500.
- **Label** (400, 0.8–0.9rem, fog-3): metadata, periods, tag lines joined with " · ", nav.
- **Mono** (400, 0.68–0.75rem, tabular, 0.04–0.08em): instrument degrees and readouts, the Taipei clock, year labels, post dates.

### Named Rules
**The Mono Is Measurement Rule.** Geist Mono sets numbers that measure something (angles, time, years, dates). Words never go in mono.

**The Phrase Break Rule.** Chinese headings and titles use keep-all phrase breaking and break between phrases, never inside a word; long lines are split at commas by hand where it matters (the hero thesis).

**The Two Voices Rule.** Every heading has a Latin and a Chinese setting; Chinese headings switch to the serif, Latin stays in Geist. Neither is a translation of the other's typography.

## Layout

A 12-column grid inside a 1440px container with a fluid gutter (clamp(1rem, 4vw, 3.5rem)); the fixed observation grid is registered to that gutter at a 72px pitch and masked to fade toward the edges. Sections alternate asymmetric splits: hero 7/5, work 4 then 7 offset from column 6, FateFlux 6 then 5 offset from column 8, other projects 1/4/6. The method band is three equal columns divided by hairlines. Writing uses narrower containers (1100px index, 760px article).

Vertical rhythm is generous and fixed: sections pad 7rem, 9rem from 640px up; the hero fills the small viewport height. Section boundaries are either hairline borders or the animated waterline. Below 1024px every split collapses to one column; below 768px the nav collapses to a glass menu; the trace hides every other year label below 640px.

## Elevation & Depth

There are no box-shadows. Depth is atmospheric and tonal: layers of fixed grid, drifting fog, film grain (6% overlay, above content), local mist pools, and translucent glass for readouts. Content sits at z 10 above the atmosphere; the header at 50; grain at 60 across everything.

### Named Rules
**The Weather, Not Shadow Rule.** Depth comes from fog, blur and tone (ink to ink-2), never from drop shadows or lifted cards.

**The Glass Is for Readouts Rule.** Translucent glass (55% ink-2, 14px blur, saturate 1.2, 1px line-2 border) holds instrument readouts, the FateFlux diagram and the mobile menu. Content blocks are never glass cards.

## Shapes

Square-cut and hairline. Corners are 2px on the primary button, focus ring and seal, 3px on glass and code blocks; nothing is pill-shaped except 4–6px nodes and dots. Borders are 1px and almost always horizontal: rules above and below lists, not boxes around them. The recurring geometry is circular and graduated (the instrument's degree ring, 24 divisions, the dotted inner orbit), the single diagonal cut (name, method 破, seal), small crosshair registration marks at row corners, and elliptical water rings flattened by perspective.

## Components

### Buttons
Tactile but quiet: one filled button per page, everything else is a link.
- **Shape:** nearly square (2px radius), 1px fog border at 70%.
- **Primary:** fog fill, ink text, label size at 500 weight, 12px 24px padding, trailing arrow.
- **Hover / Focus:** fill drains to transparent and text turns fog over 500ms; the arrow slides 4px on the expo curve. Focus is the global copper-2 1px ring.
- **Text link (secondary):** fog-2 text with a 1px copper underline at 50% and 0.35em offset; hover turns text and underline copper-2. External links carry an up-right arrow that lifts diagonally; internal ones carry a right arrow that slides.
- **Quiet action:** the copy-email button is plain fog-3 label text with a 14px stroke icon, turning fog on hover and showing a copper check when done.

### Cards / Containers
There are no cards. Lists of things are hairline-ruled rows (work fields, other projects, honours, posts) and the only enclosed box is glass (see Elevation). Rows may take an ink-2 wash at 60% on hover.

### Navigation
- Fixed 64px header: transparent until 24px of scroll, then ink at 70% with a medium backdrop blur and a hairline base.
- Left: the seal (28px) and "between2058" in fog-2 label; the seal tilts -6° on hover.
- Right: section links in fog-3 label at 0.84rem, hover fog; a 12px hairline divider; the language switch in fog-2, hover copper-2.
- Mobile: language switch plus a two-stroke menu glyph that becomes a cross; the menu opens as a 14rem glass panel, closed by Escape or outside click.

### The Instrument (signature)
A 520px square: canvas water inside a 168-unit pool, SVG scales above it. Degree ring with ticks every 2°, longer every 10°, mono labels every 30°; an inner ring of 24 unlabeled teal divisions with only 癸 marked in copper at 15°. Pointer movement draws a copper probe radius and a dashed orbit and drops teal water rings; a press drops a copper ring; ambient drops fall every 1.8–4.4s. Beneath, a glass readout lists observer, Taipei time (mono) and θ/r (mono, copper-2). Reduced motion keeps the scales and the probe but no rings.

### The Name Cut (signature)
The name is two stacked clones clipped along one diagonal; the lower half is fog-2. It arrives split (halves offset 18px, copper line undrawn) and recomposes over 1.6s on the expo curve; while the pointer moves over the hero the halves drift up to 6px apart and settle back after 700ms. The copper cut line is recomputed to lie exactly along the clip diagonal. The same `cut` treatment marks 破 in the method band.

### Waterline
A 14px section boundary: one teal-3 hairline at 35%, gently uneven, drifting sideways on a 34s linear loop and masked out at both ends.

### Trace Scale
A ruler measured in years since 2018: month ticks, year ticks with mono labels, closed spans drawn as solid hairlines with end ticks, the open span dotted in teal-3 and fading, and "now" as a copper vertical at the right edge.

## Do's and Don'ts

### Do:
- **Do** keep the ground ink and the type fog; tint neutrals toward teal, never toward grey-blue or warm.
- **Do** build structure from 1px hairlines (line at 9%, line-2 at 16%) and horizontal rules around lists.
- **Do** reserve copper for what is live: the current item, the pointer, the hover, the cut.
- **Do** process every large Han mark (ink-bleed, ink-soak or the cut) and keep it faint and `aria-hidden`.
- **Do** move slowly on cubic-bezier(0.16, 1, 0.3, 1): 300–500ms for state, 1.2–1.6s for arrivals, 26–38s for ambient drift, and stop all of it under reduced motion.
- **Do** keep content visible without JavaScript; reveal motion is a refinement added only after the `js` class is set.
- **Do** set dates, times, angles and years in Geist Mono with tabular numerals.

### Don't:
- **Don't** use gaudy neon, anime styling, full-bleed fortune-telling symbols or complex 3D (owner-pinned).
- **Don't** use drop shadows, filled cards, gradient heroes, skill chips or a vertical timeline.
- **Don't** use seal red for anything but the seal, or copper as a fill or background.
- **Don't** set body text below fog-3 or use mono for words.
- **Don't** use bouncy, elastic or spring easing.
- **Don't** put glass on ordinary content blocks; glass is for readouts, diagrams and the mobile menu.
