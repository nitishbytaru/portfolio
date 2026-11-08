---
target: portfolio site (home and main routes)
total_score: 17
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 3
target_identity: "file:/home/nitishdurga/Desktop/portfolio/src/app/page.tsx"
target_fingerprint: "sha256:0ee01c31e24f365c1ee56f95fa7dee1552824cc93d3be80567145a5da9682716"
target_path: /home/nitishdurga/Desktop/portfolio/src/app/page.tsx
timestamp: 2026-11-08T14-29-13Z
slug: src-app-page-tsx
---
Method: dual-agent (A: design-review agent, B: detector agent)

# Critique: portfolio site (home, plus /projects, project detail, /experience, /skills, /analytics)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Active nav and analytics skeletons good; whole site blank until hydration |
| 2 | Match System / Real World | 2 | "GitHub" nav opens "Developer Analytics"; "Download Resume" opens a Drive viewer |
| 3 | User Control and Freedom | 2 | Detail carousel autoplays with no pause; marquee ignores reduced motion |
| 4 | Consistency and Standards | 2 | Five forms of the name; "4+ Major Projects" vs "5 Projects"; two text colors on same cyan |
| 5 | Error Prevention | 2 | LeetCode link generic; "Back to all projects" targets missing /#projects anchor |
| 6 | Recognition Rather Than Recall | 3 | Plain persistent nav; cards show stack and purpose |
| 7 | Flexibility and Efficiency | n/a | Static portfolio with no repeat-task workflow |
| 8 | Aesthetic and Minimalist Design | 2 | Polished surface; hero stacks six kinds of content |
| 9 | Error Recovery | 2 | Retry exists, raw "Failed to fetch"; default 404; bad slug silently lands on home |
| 10 | Help and Documentation | n/a | Nothing needs documentation |
| **Total** | | **17/32 (53%)** | **Acceptable** |

## Design Specificity Verdict

LLM assessment: mostly generic. Stock genre kit (dark teal grid, orbs, gradient name, availability pill, orbiting badges, count-up stats, bento glass cards, tech marquee). Specific material (project screenshots, Infosys / Evaluate Health history) is absent from home. Five-accent switcher is the one distinctive idea but shows off the site, not the person.

Deterministic scan: 6 source findings; 1-21 per rendered page (/experience and /analytics 21 each). Agrees: gradient-text (globals.css:341), overused-font Inter 95-100%, purple/cyan badge gradients (analytics/page.tsx:352). Contrast: 2.2:1 primary CTA and active nav, 2.4:1 white on cyan, 1.6:1 #34d399 on #d1eeec (verify text vs tinted badge). Detector-only: 17 labels at 10px, 11 nested cards, h1 to h3 skip on home, pulsing dot (Pill.tsx:51), left-border callout (ProjectLayout.tsx:159). False positive: side-tab at globals.css:368 (typewriter caret). Low value: stragglers, deliberate marquee.

Visual overlays: headless only; no user-visible overlay. Console reported 1-20 anti-patterns per page.

## Overall Impression

Competent surface, tidy engineering, but the site sells a template and hides the work. Biggest opportunity: real projects on home with one sentence only this person could say. Cognitive load high (6 of 8 fail): 13 controls at desktop fold; mobile menu gives 5 themes equal weight with nav. Peak: project detail pages, a click late. Valleys: "3 Databases" stats, "1 stars earned". Pages end on a plain footer with no closing ask.

## What's Working

- Project detail structure: Live Demo and Source Code beside main image; scannable stack and architecture.
- Theme engineering: dark body 14.79:1, light 6.46:1, no horizontal overflow at 390 or 1440.
- Analytics states: skeletons, Retry card, caching; most personal page.

## Priority Issues

[P0] Whole site renders nothing until JS hydrates. Blank with JS off; served HTML has no hero text; throttled 50KB/s detail page empty at 10s (dev bundles). Fix: remove gate at src/context/ThemeContext.tsx:71, always render children, set data-theme/data-mode from inline head script. Command: /impeccable harden

[P1] Home shows no work. page.tsx:172-294 is hero, tech strip, stats; mobile "View My Projects" at y=1518. Fix: replace page.tsx:265-292 with 2-3 featured projects with large screenshots and one-line outcomes; add one sentence on what is built; CTA under it; name before portrait on mobile. Command: /impeccable layout, then /impeccable bolder

[P1] Key text fails contrast; tech pills disappear in light mode. White on #06B6D4 2.43:1 (View Live Demo, next-project, Retry); active nav light 2.16:1; white on Neon Lime 1.98:1; chips unreadable (Pill.tsx:9, opacity modifier on var() color suspected, unconfirmed). Fix: tested on-primary token per accent, replace 7 text-white uses, darker accent text in light mode, opaque chips. Command: /impeccable colorize

[P1] Accessibility gaps in motion and controls. No prefers-reduced-motion in globals.css; closed theme dropdown takes Tab focus (Navbar.tsx:161-166); mobile menu button lacks name and aria-expanded (Navbar.tsx:219-235). Fix: global reduced-motion rule, invisible/inert closed menus, labels, skip link, no carousel autoplay. Command: /impeccable audit, then /impeccable harden

[P2] Dead ends and credibility leaks. Bad slug redirects to home (projects/[slug]/page.tsx:20); default 404; LeetCode link generic (SocialLinks.tsx:27); meta says Django, Python (layout.tsx:10); five name forms; three projects only have LinkedIn post demos. Fix: branded not-found.tsx, notFound() for bad slugs, grid link to /projects, human analytics error, correct links/meta/name. Command: /impeccable clarify

## Persona Red Flags

Jordan: name and title clear, but nothing on what is built or why it stands out; "Focus: Scalable Apps" empty; "GitHub" nav reads external.

Riley: bad slug silent redirect; unbranded 404; "Failed to fetch" recovers only by reload; one failing API takes down the page via Promise.all at analytics/page.tsx:580 (code only).

Casey: blank on slow load; CTAs far down; menu, mode, footer controls 38-40px; NitishPIC.jpg 574KB lazy-loaded on first screen (page.tsx:118); 13 gallery images not lazy (ProjectLayout.tsx:132,360).

## Minor Observations

- Blocking Google Fonts @import loads unused Playfair Display (globals.css:2).
- Cards repeat stack up to three times; "Explore" duplicates arrow.
- Screenshots include browser chrome and Windows taskbar.
- "Featured Projects" labels the complete list of five.
- Light-mode "Node.js" badge hard to read on portrait.
- truncate cuts tech-stack values (ProjectLayout.tsx:270,322).
- Two Google-hosted /experience images blocked at 1440 (ERR_BLOCKED_BY_ORB).
- github-contributions-api.deno.dev did not resolve here; cause undetermined; live calendar not reviewed.

## Questions to Consider

- If a project took the portrait's place, would anything be lost?
- What one sentence can no other new full-stack graduate say?
- Five accent colors, or one case study?
- Do "1 stars earned" and "3 Databases" help or advertise inexperience?
- Which project would be defended in an interview, and why does it get the same treatment as an Instagram UI clone?
