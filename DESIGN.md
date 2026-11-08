---
name: Nitish Durga Bytaru Portfolio
description: One framed board of saturated color tiles, where each tile opens real work.
colors:
  periwinkle: "#7D82D0"
  pink: "#F0ADFF"
  mint: "#A7D8D6"
  violet: "#8D6FBD"
  amber: "#FEC067"
  page: "#E1E1E1"
  frame: "#F6F6F6"
  graphite: "#595959"
  ink: "#000000"
  white: "#FFFFFF"
typography:
  wordmark:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2.5rem, 9.4vw, 7.75rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "0em"
    fontVariation: "'wdth' 125"
  wordmark-detail:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2.25rem, 6.6vw, 5.75rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "0em"
    fontVariation: "'wdth' 125"
  numeral:
    fontFamily: "Archivo, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.11
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.33
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.4
    fontVariation: "'wdth' 125"
  body-lg:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.43
rounded:
  swatch: "2px"
  control: "12px"
  tile: "20px"
  sheet: "28px"
  pill: "9999px"
spacing:
  tile-gap-sm: "16px"
  tile-gap: "20px"
  home-column-gap: "32px"
  tile-pad-sm: "20px"
  tile-pad: "24px"
  tile-pad-lg: "32px"
  sheet-inset: "24px"
  rail: "80px"
components:
  tile-periwinkle:
    backgroundColor: "{colors.periwinkle}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "24px"
  tile-pink:
    backgroundColor: "{colors.pink}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "24px"
  tile-mint:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "24px"
  tile-violet:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "24px"
  tile-amber:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "24px"
  tile-graphite:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.white}"
    rounded: "{rounded.tile}"
    padding: "24px"
  tile-black:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.tile}"
    padding: "24px"
  tile-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "24px"
  tile-plain:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "24px"
  chip:
    backgroundColor: "{colors.frame}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  image-label:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.frame}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "44px"
  arrow-disc:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "44px"
  arrow-disc-hero:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "64px"
  mobile-menu:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "12px"
---

# Design System: Nitish Durga Bytaru Portfolio

## Overview

**Creative North Star: "The Framed Color Board"**

Every page is one near-white sheet lifted off a pale gray page, and on that sheet sits a packed arrangement of flat, saturated tiles. A tile is the unit of everything: an introduction, a count, a screenshot, a skill, a route. Real screenshots share the board with color fields at the same radius, so proof and decoration read as one surface.

The voice is loud at the top and plain underneath. A giant expanded Archivo wordmark names each page and carries a small corner bracket; below it, tiles do the talking in heavy expanded headings and ordinary-width body copy. The board stays dense. Tiles sit a narrow gutter apart, and color alone separates them.

The world is pinned by the owner's reference, `ref/image.png`, and runs on one fixed light theme.

**Key Characteristics:**
- A single rounded sheet framed by a gray page on desktop, full-bleed on small screens.
- Flat color tiles with one shared radius and no tile shadows.
- One typeface in two widths: expanded for display, normal for reading.
- Small corner brackets and rotated side labels as the recurring marks.
- Real screenshots and real counts inside the tile grid.

## Colors

Five saturated tile fields over a strict gray, black and white structure.

### Primary
- **Periwinkle Board** (#7D82D0): The identity tile. It holds the About card on Home, and the lead content tile on Experience and project detail.

### Secondary
- **Orchid Pink** (#F0ADFF): The portrait disc on Home and a content tile elsewhere.
- **Pale Mint** (#A7D8D6): Count and stack tiles.
- **Dusty Violet** (#8D6FBD): Count and infrastructure tiles.
- **Warm Amber** (#FEC067): Experience, action and recovery tiles, the mobile menu, and text selection.

### Neutral
- **Page Gray** (#E1E1E1): The page behind the sheet, the scrollbar track, and the quiet `plain` tile.
- **Sheet White** (#F6F6F6): The sheet, the notch cut from the About card, and chips seated on color.
- **Graphite** (#595959): A dark tile field, secondary text on the sheet, and the scrollbar thumb.
- **Ink** (#000000): All default text, primary pills, image-tile backing, and chart bars.
- **Pure White** (#FFFFFF): Text on dark tiles, the portrait ring, arrow discs, image labels, and the focus halo.

The contribution calendar steps through Page Gray, Pale Mint, Periwinkle Board, Dusty Violet and Ink, so data stays inside the palette. Language donut colors are assigned from the site palette by rank.

### Named Rules
**The Ink On Color Rule.** Text on periwinkle, pink, mint, violet and amber defaults to Ink. Text on graphite and black is white.

**The Large White Rule.** White on periwinkle (3.51:1) or violet (4.08:1) is reserved for display sizes, 30px and up. Reading copy on those fields stays Ink.

**The Rotating Tones Rule.** Repeated tiles cycle through the tone set, so neighbors differ. No single hue owns a page's content grid.

## Typography

**Display Font:** Archivo variable at 125% width (with sans-serif)
**Body Font:** Archivo variable at 100% width (with sans-serif)

**Character:** A single family pulled wide and heavy for anything that names, and left at normal width for anything that explains. The width change does the work a second typeface would do.

### Hierarchy
- **Wordmark** (700, clamp(2.5rem, 9.4vw, 7.75rem), 0.95): One per page, naming it. Home enlarges it from `lg` up to min(11.5vw, 11rem).
- **Wordmark Detail** (700, clamp(2.25rem, 6.6vw, 5.75rem), 0.95): Project titles, which run longer.
- **Numeral** (800, 2.25rem): Counts inside stat tiles. The Experience role title shares this scale, at 1.875rem to 2.25rem.
- **Headline** (800, 1.5rem): Section and tile headings.
- **Title** (800, 1.25rem): Smaller tile headings and route tiles.
- **Body Large** (400, 1.125rem, 1.625): Long-form copy in content tiles, capped between 65ch and 70ch.
- **Body** (400, 1rem, 1.625): Default descriptions, capped near 60ch.
- **Label** (600, 0.875rem): Image labels, chips (at 500), and tile metadata, in sentence case.

The Home introduction pairs an extralight "I'm," (200, 1.875rem) with a semibold name (600, 2rem, 1.04), both expanded and white on periwinkle.

### Named Rules
**The Width Means Display Rule.** Expanded width belongs to wordmarks, headings, numerals and route names. Paragraphs, lists, chips and metadata stay at normal width, apart from the short label under a Home count.

**The Sentence Case Rule.** Text is set in sentence case with default tracking. The Spin Badge's circular text is the one uppercase setting.

## Layout

The sheet is capped at 1560px, centered, and inset 24px from the viewport from `lg` up. Below `lg` it fills the screen with no radius. On desktop, an 80px sticky rail holds the rotated navigation at the sheet's left edge, and content takes the remaining width with a 32px right inset.

Tile grids use a 16px gutter on small screens and 20px from `lg` up. Tile padding steps through 20px, 24px and 32px.

Home is composed to fit one desktop viewport: a 31% column (340px minimum) for the About card, and a right column with the wordmark above a 12-column work grid, with a minimum height of 620px. Below `lg` it becomes a single stack, with paired tiles kept side by side. Inner pages lead with the wordmark, then a 2-column to 6- or 12-column tile grid with varied spans, so no page settles into equal cards.

## Elevation & Depth

Depth has exactly two levels. The sheet floats above the page, and tiles lie flat on the sheet. Tile separation comes from color and gutter alone.

### Shadow Vocabulary
- **Sheet Lift** (`box-shadow: 0 24px 60px -24px rgb(0 0 0 / 0.3)`): The sheet only.
- **Popover** (`box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`): The mobile menu only, which floats over tiles.

### Named Rules
**The Flat Tile Rule.** Tiles carry no shadow at rest or on hover. Hover response is a lift in position or a change in brightness.

## Shapes

Three radii carry the system: 28px for the sheet, 20px for every tile, and full pills for labels, chips, buttons and discs. Small controls use 12px; calendar swatches use 2px.

Circles are the counter-form to the rounded rectangle: the portrait disc with its 5px white ring, arrow discs, and the Spin Badge. Lines are few and purposeful, limited to corner brackets, the portrait ring, and hairline dividers in Ink at 20% to 30% inside tiles.

### Named Rules
**The Seamless Split Rule.** Two fields that belong together share one 20px clipped container with square inner edges and no gutter between them.

## Components

### Tile
The board's only container: flat, clipped, and color-coded.
- **Corner Style:** Gently large corners (20px), squared only inside a split.
- **Background:** One of the tone tokens; black backs screenshot tiles, and white serves repository cards and previous and next project links.
- **Shadow Strategy:** None, per The Flat Tile Rule.
- **Internal Padding:** 20px for compact tiles, 24px by default, 32px for long content.
- **Hover:** Standalone door tiles rise 4px over 300ms. Segments inside a split dim to 95% brightness over 300ms, since a clipped container cannot lift one half.

### Corner Bracket
A 12px top-right angle, 2px stroke in the tile's text color, inset 16px. It appears on count, route and action tiles and on the Home image tile. The wordmark carries a matching bracket scaled in em.

### Buttons
- **Shape:** Full pill with a 44px minimum height.
- **Primary:** Ink pill with white semibold text and 24px side padding, for recovery and page-level actions.
- **Secondary:** Sheet White pill with Ink text, seated on a color tile.
- **Tile as button:** Primary project actions are themselves bracketed tiles, in amber and graphite, with an icon above an expanded heading.
- **Focus:** A global 2px Ink outline at 2px offset, with a 4px white halo so it holds on any tile color.

### Chips
- **Style:** Sheet White pill, 6px by 12px, medium label with a 16px technology icon. A larger 10px by 16px semibold version appears in the Skills landscape.
- **State:** Static; chips list facts and are not filters.

### Image Labels and Arrow Discs
White pills sit at the lower left of a screenshot and name the destination. White arrow discs (44px, or 64px centered on the Home lead tile) mark the door; the disc scales to 110% or nudges 4px right on hover.

### Navigation
- **Desktop:** Rotated labels running bottom to top, Label size at 500, stacked in the left rail. The current page goes to 800 with a 6px Ink dot.
- **Mobile:** Name at left and a 44px Ink menu control (12px radius) at right, opening an amber popover tile. The current link sits on a white 12px-radius row at 800.
- **Footer:** Copyright in Graphite, an underlined resume link, and 44px icon links that fill Page Gray on hover.

### About Card
The Home signature: a periwinkle tile whose top-left is cut by a curved notch filled with Sheet White, holding the "About Me" tab. A cutout portrait breaks upward out of a pink disc with a white ring, and the Spin Badge overlaps its lower right. The email link uses a dashed underline.

### Spin Badge
An 84px Ink disc with white circular text turning once per 18 seconds, disabled under reduced motion. It states availability.

### Charts
Charts sit directly on tiles, in Ink or palette colors, with an expanded title above. Bars have 8px top corners. Loading states are pulsing color blocks at tile radius.

## Do's and Don'ts

### Do:
- **Do** open every page with one Wordmark and its bracket, then go straight into the tile grid.
- **Do** build new content from Tile tones, at the 20px radius with 16px to 20px gutters.
- **Do** use real screenshots and real counts inside tiles.
- **Do** vary tile spans and rotate tones so a page reads as a composed board.
- **Do** keep tap targets at 44px minimum and retain the global focus ring.
- **Do** respect reduced motion; motion is removed effect by effect: the badge stops, the loader goes static with its text, and hover lifts are dropped while color feedback stays.

### Don't:
- **Don't** add a dark theme or theme switch; the world is one fixed light theme.
- **Don't** put shadows on tiles; shadows belong to the sheet and the mobile popover.
- **Don't** introduce a second typeface; width and weight within Archivo carry the hierarchy.
- **Don't** set reading copy in white on periwinkle or violet.
- **Don't** add a page-level dark hero, stats row or uniform card grid; the board replaced them.
- **Don't** invent counts, clients or awards to fill a tile.
