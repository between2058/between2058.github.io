---
name: between2058
description: A night sea in ukiyo-e woodblock grammar for Johnny Chang (張舜程); indigo water, foam-white crests, one vermilion seal.
colors:
  ink: "#0b1624"
  ink-2: "#0f1d2f"
  ink-3: "#16283f"
  key-line: "#06101b"
  foam: "#efe8da"
  foam-2: "#c3c7c6"
  foam-3: "#8d9aa8"
  paper: "#ece2cc"
  wave: "#16355c"
  wave-2: "#2c5f8a"
  wave-pale: "#6f9fc4"
  wave-3: "#7eaad0"
  open-water: "#0f2743"
  mist: "#1f3b5e"
  range: "#1c3a5c"
  shu: "#c8553d"
  shu-2: "#e2775c"
  seal: "#b8412e"
  line: "rgb(239 232 218 / 0.1)"
  line-2: "rgb(239 232 218 / 0.18)"
typography:
  display:
    fontFamily: "Shippori Mincho B1, Hiragino Mincho ProN, serif"
    fontSize: "clamp(2.8rem, 7vw, 5.6rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Shippori Mincho B1, Hiragino Mincho ProN, serif"
    fontSize: "clamp(1.8rem, 3.4vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  headline-zh:
    fontFamily: "LXGW WenKai TC, Kaiti TC, DFKai-SB, serif"
    fontSize: "clamp(1.8rem, 3.3vw, 2.6rem)"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "0.06em"
  title:
    fontFamily: "Shippori Mincho B1, Hiragino Mincho ProN, serif"
    fontSize: "1.4rem"
    fontWeight: 700
    lineHeight: 1.25
  title-zh:
    fontFamily: "LXGW WenKai TC, Kaiti TC, serif"
    fontSize: "1.45rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.12em"
  cartouche:
    fontFamily: "LXGW WenKai TC, Kaiti TC, serif"
    fontSize: "1.7rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "0.35em"
  body:
    fontFamily: "Geist, Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  body-article:
    fontFamily: "Geist, Noto Sans TC, PingFang TC, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.95
  label:
    fontFamily: "Geist, Noto Sans TC, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.6
  date:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    letterSpacing: "0.08em"
    fontFeature: "tnum"
rounded:
  hairline: "2px"
  slip: "3px"
spacing:
  gutter: "clamp(1rem, 4vw, 3.5rem)"
  section: "7rem"
  section-wide: "9rem"
  container: "1440px"
  reading: "760px"
components:
  button-primary:
    backgroundColor: "{colors.foam}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.shu}"
    textColor: "{colors.foam}"
  text-link:
    textColor: "{colors.foam-2}"
  text-link-hover:
    textColor: "{colors.foam}"
  cartouche:
    backgroundColor: "{colors.paper}"
    textColor: "#1b2533"
    typography: "{typography.cartouche}"
    padding: "20px 12px"
  glass-panel:
    backgroundColor: "rgb(15 29 47 / 0.62)"
    rounded: "{rounded.slip}"
    padding: "32px"
  nav-link:
    textColor: "{colors.foam-3}"
  nav-link-hover:
    textColor: "{colors.foam}"
  seal:
    backgroundColor: "{colors.seal}"
    textColor: "{colors.foam}"
    size: "36px"
---

# Design System: between2058

## Overview

**Creative North Star: "The Night-Sea Scroll"**

The site is one woodblock print unrolled vertically. A generated great wave fills the first viewport over a flat moon, brushed mountains and mist bands; below it, every section is joined to the next by a painted landscape passage (breaking-wave band, mountain range, or mist) so the page reads as a single continuous scroll rather than a stack of panels. The ground is deep night indigo; foam white carries crests, claws and all text; vermilion appears as a seal and as the one live accent.

The artwork speaks in woodblock grammar: flat registered colour bands, a near-black key line at print weight around every form, foam stripes on the water, and foam claws cut like a carver's talons. All geometry is generated in code from seeded parameters; nothing is traced from a source image. The UI around it is quiet and editorial: hairline rules, generous section rhythm, large brush-script or mincho headings, and near-square corners. Motion is slow and oceanic (a swelling wave, shimmering claws, drifting spray, a pointer stroke that leaves a water ribbon) and stops entirely under reduced motion.

The owner-pinned direction (PRODUCT.md, Brand Commitments) binds this world: ukiyo-e breaking-wave energy and the Water-Breathing stroke look, Prussian-blue bodies with foam-white crests, a full expressive first viewport, and original generated artwork only. The superseded observation-system look (instrument ring, teal, copper cut, visible 癸 marks) is rejected.

**Key Characteristics:**
- Flat, registered indigo-to-pale water bands outlined by a key line (#06101b), never soft-shaded.
- Foam white is simultaneously the crest colour and the text colour; the art and the words share one ink.
- One vermilion family, rationed to the seal, the primary-button hover, and the focus ring.
- Painted landscape passages join sections instead of rules, cards or background shifts alone.
- Bilingual type pairs by script: LXGW WenKai TC for Chinese display, Shippori Mincho B1 for Latin display, Geist for UI and body.
- Slow, long exponential ease-out motion; nothing bounces.

## Colors

A night palette of indigo grounds, Prussian-blue water, washi foam and one vermilion.

### Primary
- **Prussian Wave** (`wave`): the body of every wave and ribbon, and the scrollbar thumb. The dominant colour of the art.
- **Registered Mid-Blue** (`wave-2`): the second water band in the art, the text-selection ground, the blockquote rule, and the ghosted watermark character behind the FateFlux project.
- **Pale Water Band** (`wave-pale`): the lightest water band and ribbon core in the artwork, and the seigaiha ring colour. Art only.
- **Washed Wave Light** (`wave-3`): the UI's pale blue: link underlines (at 60%), dash bullets, list markers, hover colour for titles and arrows, the open-span line on the trace ruler.

### Secondary
- **Shu Vermilion** (`shu`): the primary button's hover fill. The live accent.
- **Shu Glow** (`shu-2`): focus-visible outline and text caret.
- **Seal Red** (`seal`): the square seal carrying 張, beside the cartouche and in the footer.

### Neutral
- **Night Ink** (`ink`): page ground and the header's scrolled backing (at 70%).
- **Deep Ink** (`ink-2`): the Method section's ground, code blocks, list-row hover wash (at 60%).
- **Raised Ink** (`ink-3`): inline code chips only.
- **Key Line** (`key-line`): the carver's outline around waves, claws, moon, mountains and the sea horizon; mountain brush strokes. Art only.
- **Foam** (`foam`): crests, claws, spray, stripes; primary text and headings; primary button fill.
- **Sea Fog** (`foam-2`): secondary text, body copy of leads and summaries, article body.
- **Distant Grey-Blue** (`foam-3`): tertiary text: dates, tags, notes, nav links at rest, footer.
- **Washi Paper** (`paper`): the title cartouche and the moon disc.
- **Open Water / Mist / Range** (`open-water`, `mist`, `range`): the landscape registers behind the wave: the foreground sea (under the seigaiha pattern), mist bands, and the far mountain fill. Passages add adjacent steps (#1a3150, #15304d, #12253d, #1c3656, #16294a) in the same hue.
- **Foam Hairlines** (`line`, `line-2`): foam at 10% and 18% for every rule, border and divider; `line-2` for the leading rule of a list, `line` for rows within it.

### Named Rules
**The One Seal Rule.** Vermilion is the seal, the primary button's hover, and the focus ring. It never colours body text, links, rules or illustration.

**The Shared Ink Rule.** Text uses the same foam as the crests. Hierarchy comes from the foam / foam-2 / foam-3 steps, not from new hues.

**The Registered Colour Rule.** Inside the artwork every region is one flat fill bounded by the key line. The only printed gradation is the bokashi band at the top of the sky (#050c16 to #0b1624, 150 of 1000 units). Other gradients in the build are scrims and masks that dissolve art into ground (hero legibility scrim, passage mountain feet, seigaiha fade); they never shade a form.

## Typography

**Display Font:** Shippori Mincho B1 (with Hiragino Mincho ProN, serif) for Latin; LXGW WenKai TC (with Kaiti TC, DFKai-SB, serif) for Chinese
**Body Font:** Geist (with Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif)
**Label/Mono Font:** Geist Mono, for dates and years only

**Character:** A carved mincho with heavy weights for Latin and a warm brush kai for Chinese, set against a neutral grotesque. The display faces carry the woodblock voice; Geist keeps the reading and UI plain.

### Hierarchy
- **Display** (Shippori Mincho 800, clamp(2.8rem, 7vw, 5.6rem), 1): the name in the first viewport only, with the painted breath ribbon directly beneath it.
- **Cartouche** (WenKai, 1.35rem to 1.7rem, vertical-rl, 0.35em tracking): 張舜程 on the paper title slip.
- **Headline** (Mincho 700, clamp(1.8rem, 3.4vw, 2.75rem), 1.15, -0.01em; Chinese: WenKai, clamp(1.8rem, 3.3vw, 2.6rem), 1.35, 0.06em): section headings. The contact statement scales up to clamp(1.55rem, 5.2vw, 4rem) / clamp(1.75rem, 5vw, 3.75rem).
- **Title** (Mincho 700, 1.4rem to 1.45rem; Chinese: WenKai 1.45rem, 0.12em): step names, project titles, field names. The FateFlux project title runs larger (Mincho 800, clamp(2.4rem, 4.8vw, 3.8rem)).
- **Body** (Geist 400, 1rem, 1.7; Chinese 1.85 with 0.02em tracking): all running copy; measures held at 30 to 56ch.
- **Article** (Geist 1.0625rem, 1.95, `foam-2`): long-form writing, 760px column; article headings in WenKai 500.
- **Label** (Geist, 0.78rem to 0.92rem, `foam-3`): tags joined by " · ", notes, periods, nav links (0.84rem).
- **Date** (Geist Mono, 0.68rem to 0.75rem, tabular, 0.04em to 0.08em): post dates, ruler years, trace periods.

### Named Rules
**The Two Scripts Rule.** Every heading switches face by locale: WenKai with open positive tracking and `word-break: keep-all` phrase breaking for Chinese; Shippori Mincho bold with tight tracking for English.

**The Mono-Is-Time Rule.** Geist Mono sets dates and years. It is not a label, kicker or ornament face.

**The Han Mark Rule.** Large single han characters are the device for marking steps and projects: 7rem WenKai bold in foam for method steps, 2.5rem in `wave-3` for project rows, and a clamp(10rem, 22vw, 18rem) watermark in `wave-2` at 35% behind the lead project.

## Layout

A 1440px container with a fluid gutter (clamp(1rem, 4vw, 3.5rem)); sections pad 7rem vertically, 9rem from the `sm` breakpoint. Content sections use a 12-column grid at `lg`, typically a 4-column lead beside a 7-column body starting at column 6, collapsing to a single column below. Writing index sits in 1100px, articles in 760px.

The first viewport is full-bleed (100svh). On desktop the wave art fills the frame, anchored bottom-right (`xMaxYMax slice`), and an ink scrim rises from the left so the cartouche, name and thesis sit on the left 40%. On phones the art occupies the top 64svh and the ink rises from below, the text block anchored to the bottom.

Lists are ruled, not carded: a `line-2` top rule, `line` rows with 1.75rem to 3rem vertical padding, and a fixed first column (8rem to 11rem) for dates or names at `sm`.

### Named Rules
**The Unrolled Scroll Rule.** Sections are joined by a painted Passage (breaking-wave band 130 to 200px, mountain range 130 to 230px, or mist 90 to 150px) that alternates kind and mirrors direction down the page. A wave passage's sea surface becomes the next section's ground colour, so there is no seam.

## Elevation & Depth

Flat by default. Depth in the artwork comes from atmospheric registers (far mist and range in lighter indigos, near water darker, key lines thicker on nearer waves), not from shadows. In the UI, depth is expressed by tonal ground (`ink` to `ink-2`) and by translucent ink glass for floating readouts.

### Shadow Vocabulary
- **Slip lift** (`box-shadow: inset 0 0 0 3px #ece2cc, inset 0 0 0 4px rgb(27 37 51 / 0.55), 0 18px 40px -18px rgb(0 0 0 / 0.6)`): the cartouche only; the inset pair draws the frame-inside-a-frame of a title slip.
- **Glass** (`background: rgb(15 29 47 / 0.62); backdrop-filter: blur(14px) saturate(1.2); border: 1px solid line-2`): the FateFlux diagram panel and the mobile nav sheet.
- **Scrolled header** (`background: ink / 70%; backdrop-filter: blur(12px); border-bottom: line`): appears after 24px of scroll.

### Named Rules
**The Paper-Only Shadow Rule.** The only drop shadow belongs to paper (the cartouche). Ink surfaces never cast shadows.

## Shapes

Near-square everywhere: 2px on the primary button, focus ring and article images; 3px on glass panels, code blocks and inline code; 2.5 of 32 units on the seal. Circles appear only as 4 to 6px dots (diagram nodes, trace points) and as the moon. Rules are 1px hairlines. The signature silhouettes are generated: the curling wave with hooked foam claws, the tapering breath ribbon that rolls into a curl, the brushed mountain ridge, the stacked mist band, and 青海波 half-ring scales (48 by 24 tile, three rings at 21/15/9, ring stroke 1.2 in `wave-pale`).

## Components

### Buttons
Carved, direct, and rare: one filled button per view.
- **Shape:** near-square (2px).
- **Primary:** foam fill, ink text, Geist 500 at 0.92rem, 12px by 24px, trailing arrow icon.
- **Hover / Focus:** fill turns Shu Vermilion with foam text over 500ms; the arrow slides 4px right on the expo ease. Focus is the global 1px `shu-2` outline at 4px offset.
- **Secondary:** a text link (below), never a second filled or outlined button.
- **Quiet action:** Copy email is a bare icon-and-label button in `foam-3`, turning foam on hover; the copied state swaps in a check icon in `wave-3`.

### Text Links
- **Style:** `foam-2` text, 1px underline in `wave-3` at 60%, offset 0.35em; trailing 14px line-art arrow (up-right for external, right for internal).
- **Hover:** text and underline turn foam over 300ms; the arrow nudges on the expo ease.
- **Contact email:** a larger variant in Shippori Mincho 500, clamp(1.2rem, 2.5vw, 1.8rem), with a bottom border in `wave-3` at 60%.

### Cards / Containers
There are no cards. Content sits on the ground in ruled rows; the only bounded surfaces are the glass readout panel (3px, `line-2` border, 24px to 32px padding) and code blocks (`ink-2`, `line` border, 3px).

### Navigation
- **Desktop:** fixed 64px bar, transparent at rest, ink glass after scroll. Wordmark `between2058` in Shippori Mincho 700 at 1rem, `foam-2`. Section links in Geist 0.84rem `foam-3`, 28px apart, turning foam on hover; a 12px hairline divider precedes the language switch.
- **Mobile:** language switch plus a two-line menu glyph (1.2 stroke) that becomes an X; the sheet is a 224px glass panel anchored top-right, closing on Escape or outside click.

### Title Cartouche and Seal (signature)
A vertical washi slip reading 張舜程 in WenKai with a double inset frame and paper shadow, with the square Seal Red seal (張 in WenKai 700) centred below it. The seal alone also signs the footer at 24px.

### Great Wave and Breath Ribbon (signature)
The hero art is an SVG composed from `lib/wave.ts`: a great wave with 24 claws, a near and a far wave, rear claws, stripes and spray, over a flat moon, two brushed ranges, two mist bands and a seigaiha sea. The wave groups swell over 9s and 11s, claws shimmer over 4.5s, spray drifts over 7s, all alternating ease-in-out. The Breath Ribbon is its static counterpart: a `wave-2` body with a key-line edge, a `wave-pale` core and foam stripes, rolling into a curl; it sits under the name and under the contact statement. On the hero, pointer and touch sweeps paint a live version on canvas (22px max width) that curls and dissolves over 1.1s.

### Reveal
Elements fade up 14px from a 6px blur over 1.2s on the expo ease, staggered 90ms per index; content is visible without JavaScript and static under reduced motion.

## Do's and Don'ts

### Do:
- **Do** outline every art form with the key line (#06101b) and fill it with one flat band colour.
- **Do** join sections with a Passage, alternating wave, mountain and mist and mirroring direction.
- **Do** keep vermilion to the seal, the primary-button hover and the focus ring.
- **Do** switch heading faces by locale: WenKai for Chinese, Shippori Mincho for English, with `phrase` line breaking on Chinese headings.
- **Do** generate any new artwork from seeded geometry in `lib/wave.ts` or the same grammar.
- **Do** ease motion with cubic-bezier(0.16, 1, 0.3, 1) over 300ms to 1.2s, and stop all of it under reduced motion.

### Don't:
- **Don't** use vermilion for text, links, rules or water.
- **Don't** shade art forms with gradients; the bokashi sky band is the only printed gradation.
- **Don't** round corners beyond 3px or wrap content in cards.
- **Don't** use Geist Mono for labels, kickers or headings.
- **Don't** trace or copy Hokusai or Demon Slayer imagery, characters or logos.
- **Don't** bring back the superseded observation-system palette and marks (teal, copper cut, instrument ring, visible 癸).
