---
target: new board design, all routes
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 6
target_identity: "file:/home/nitishdurga/Desktop/portfolio/src/app/page.tsx"
target_fingerprint: "sha256:d954d354cad06511605b752c46f07b9369d17303307aeb0f38809624dc26473a"
target_path: /home/nitishdurga/Desktop/portfolio/src/app/page.tsx
timestamp: 2026-11-08T16-38-51Z
slug: src-app-page-tsx
---
Method: dual-agent (A: design-review agent, B: detector and audit agent)

# Evaluation: new board design

Design critique 23/32 (72%, Good). Technical audit 12/20 (Acceptable). No P0.

## Heuristics
1 Status 3; 2 Real world 3; 3 Control 3; 4 Consistency 2; 5 Error prevention 3; 6 Recognition 3; 7 n/a; 8 Aesthetic 3; 9 Recovery 3; 10 n/a.

## Audit
Accessibility 3, Performance 2, Theming 3, Responsive 2, Integrity 2.

## Design specificity
Specific in form, generic in words. Home is recognizably the owner's reference at 1366-1440. Inner-page copy uses generic portfolio voice. Near-black screenshots create a dark patch where the reference has color.

## Typography
Archivo true 125% wide cut; wordmark superb at 1366-1920. Headings at 24px and below too heavy at 800 (use 650-700). About 15 sizes and 6 weights; collapse to 12-14/16/18/20-24/36 and 400/600/800. Desktop line length 84-87 chars on experience:136 and ProjectLayout:115 (use max-w-[56ch]); mobile 25-33 chars (text-base lg:text-lg). No text-wrap; add pretty/balance and non-breaking hyphens. Home bio 15px tight; use 16/1.5. Wide face inconsistent: analytics count labels, prev/next names, mobile bar name. Wordmark bracket 5.6px on mobile; add 12px minimum.

## Text colors (WCAG)
Black on frame 19.43, white 21, page 16.06, mint 13.44, amber 12.95, pink 12.13. White on black 21, graphite 7. Graphite on frame 6.48. Black on periwinkle 5.98, violet 5.14 (weakest reading pair). White on violet 4.08 and periwinkle 3.51 (large only). White "2" with black label on violet tile looks accidental; thin "I'm," should be weight 300.
Non-text under 3:1: violet timeline bars on mint 2.61 (owner asked to change from black), periwinkle donut on gray 2.69, calendar level 0 at 1.00.

## Priority issues
[P1] Home breaks 1024 to about 1199px: wordmark overflows up to 61px. Fix page.tsx:22-23 with column-relative size and minmax(0,1fr). /impeccable adapt
[P1] Identity and availability least visible on Home: add role line 18-20px on About card and resume button by email. /impeccable clarify
[P1] Contribution calendar loses grid: level 0 equals tile, ramp not ordinal, mobile opens blank. /impeccable colorize
[P1] Gallery: no visible selected state (ProjectLayout:156-158), no captions, /insta/8.png 404 (ProjectData:297). /impeccable polish
[P1] Focus invisible on 4 Home split tiles (page.tsx:102-109,123-139); same title on all routes (layout.tsx:14). /impeccable harden
[P1] Images: 574KB favicon every route (layout.tsx:19), Home thumbnails prefetched elsewhere, plain img at full size; /projects 1.96MB. /impeccable optimize

## P2
200% text clips; amber tile on short heights; blanket reduced-motion rule; spin badge no pause; TechIcon alt duplicates chip; unused swiper, tailwindcss-animate, tw-animate-css, clsx, tailwind-merge; dead code; stale ignores.

## P3
dd before dt analytics:237-239; same viewer alt; mobile brand link 28px tall; window.open demo; menu no outside-tap close.

## Personas
Jordan: "Portfolio" largest, availability 8px spinning. Riley: 1024 clip, one GitHub failure loses all, identical tabs. Casey: calendar blank, long thumbnail run, 2MB project pages.

## Questions
Replace "Portfolio" with what the owner does? Doraemon test account as first proof? 13th screenshot versus three annotated? What should visitors do at the end of a page?
