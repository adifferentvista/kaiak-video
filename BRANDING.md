# KAIAK Video Branding Guide

## Brand Identity
- **Name:** KAIAK
- **Tagline:** AI & Systems for Leaders
- **Founder:** Benedict Rinne, M.Ed.
- **Audience:** International school leaders (Heads of School, Principals, Directors)

## Colors

### Primary
| Name | Hex | Usage |
|------|-----|-------|
| Navy | `#1a2037` | Primary text, headings |
| Orange | `#e2711d` | Accents, highlights, CTAs, logo dot |
| Cream | `#faf7f2` | Light background start |
| Cream Dark | `#f0ebe3` | Light background end |

### Supporting
| Name | Hex | Usage |
|------|-----|-------|
| White | `#ffffff` | Cards, dashboard backgrounds |
| Muted Text | `#64748b` | Secondary text, labels |
| Subtle Text | `#7a8599` | Tertiary text |
| Green | `#22c55e` | Success states, active indicators |
| Green Dark | `#16a34a` | Success text on light backgrounds |

### Backgrounds
- **Light theme:** `linear-gradient(170deg, #faf7f2 0%, #f0ebe3 100%)`
- **Dark theme:** `#0f172a` (used for terminal/code demos only)
- **Grid overlay:** `rgba(26,32,55,0.03)` lines at 60px intervals

### Avoid
- Pure black (`#000`) for text — use Navy (`#1a2037`)
- Bright orange (`#f97316`) — use the warmer `#e2711d`
- Dark backgrounds for brand videos — cream is on-brand

## Blog Inline Visuals (Remotion → static PNG → WebP)

When creating visuals for blog posts (rendered as still frames):

- **Background:** `linear-gradient(170deg, #FFF7ED 0%, #FEF0E0 100%)` — warm orange-cream, NOT dark navy
- **Cards:** White, `border: 1px solid rgba(15,23,42,0.08)`, `border-radius: 14-16px`, `box-shadow: 0 2px 8px rgba(0,0,0,0.03)`
- **Step indicators:** Numbered badges (`01`, `02`, etc.) in coloured pills — NEVER use emojis or Google icons
- **Table rows:** Small coloured dots (8px circles) as row indicators
- **Pipeline/flow visuals:** Horizontal cards with step badges, monospace command box, detail text in accent colour, orange arrows between steps. Summary pill at bottom.
- **Fonts:** Inter (body/UI), InstrumentSerif (headings) via `@remotion/google-fonts`
- **Reference:** `src/components/ImagePipeline.tsx` is the canonical pipeline style

## Typography
- **Headings:** Georgia, serif (400 for body, 700 for emphasis)
- **Body/UI:** system-ui, sans-serif (or Inter via @remotion/google-fonts)
- **Code/Terminal:** 'SF Mono', 'Cascadia Code', 'Fira Code', Consolas, monospace
- **Heading sizes:** 48-52px for main, 22-28px for sub
- **Letter spacing:** -0.5 to -1 for large headings, 1-3 for taglines/uppercase

## Logo
- **File:** `public/kaiak-logo-png.png`
- **Style:** Navy text with orange accent on the "i"
- **Sizing:** 350-420px width for hero/outro, 180px for footer/subtle
- **Background:** Reads best on cream/light backgrounds — no white card needed
- **Component:** Use Remotion `<Img>` with `staticFile()` (not `<img>`)

## Tool Logos
- **Location:** `public/logos/`
- **Available:** gmail.svg, google-docs.svg, google-sheets.svg, google-drive.svg, notebooklm.svg, openai.svg, claude.svg
- **Source:** Copied from `E:\App Projects\Kaiak\Kaiak-v4\kaiak-v4\public\logos\`
- **Usage:** `<Img src={staticFile("logos/name.svg")} />` — always use `<Img>` not `<img>`

## Animation Patterns

### Preferred
- **Spring physics** for entrances: `spring({ damping: 12, stiffness: 100 })` — physical, bouncy feel
- **Staggered reveals:** `delay: index * 8` frames between items
- **Fade + slide up:** opacity 0→1 with translateY 20-30px → 0
- **Count-up numbers:** use eased `interpolate()` with cubic ease-out: `1 - Math.pow(1 - progress, 3)`
- **Accent lines:** width animating from 0 to target

### Avoid
- `@remotion/transitions` wipe/slide — shows checkered transparency, looks unpolished
- Abrupt cuts — always fade or spring between scenes
- Linear easing for entrances — feels robotic

### Timing Guidelines
- **Fade in:** 12-20 frames (0.4-0.7s)
- **Spring entrance:** damping 10-14, stiffness 80-120
- **Typing speed:** 0.4-0.6 chars per frame
- **Stagger between items:** 4-12 frames
- **Hold before exit:** at least 30 frames (1s)

## Composition Structure
- Each video is a separate `<Composition>` in `Root.tsx`
- Use `<Sequence>` with `from` and `durationInFrames` for phases
- Standard resolution: 1920x1080, 30fps
- Brand outro pattern: logo + tagline + CTA button

## CTA Buttons
- **Style:** `backgroundColor: "#e2711d"`, white text, `borderRadius: 30`, `padding: "14px 36px"`
- **Glow:** `boxShadow: "0 0 25px rgba(226,113,29,0.25)"`
- **Common CTAs:** "Book Your Free Strategy Call", "See How It Works", "Get the Free Toolkit"

## Card Style
- **Background:** `#ffffff`
- **Border:** `1px solid rgba(26, 32, 55, 0.06-0.1)`
- **Shadow:** `0 4px 30px rgba(26,32,55,0.06), 0 1px 3px rgba(0,0,0,0.04)`
- **Border radius:** 14-20px

## Remotion Best Practices (from official docs)

### Critical Rules
- **All animations MUST use `useCurrentFrame()`** — CSS transitions/animations are FORBIDDEN
- **Tailwind animation classes are FORBIDDEN** — they won't render correctly
- **Always premount Sequences:** `<Sequence premountFor={1 * fps}>` for smooth loading
- **Use `<Img>` not `<img>`** — Remotion's component handles load timing for rendering
- **Disable third-party library animations** — they cause flickering

### Spring Presets (from official docs)
```
smooth = { damping: 200 }              // No bounce, subtle reveals
snappy = { damping: 20, stiffness: 200 } // Minimal bounce, UI elements
bouncy = { damping: 8 }                // Playful entrances
heavy  = { damping: 15, stiffness: 80, mass: 2 } // Slow, weighty
```

### Easing Options
- `Easing.inOut(Easing.quad)` — smooth start and end
- `Easing.out(Easing.quad)` — fast start, smooth end (good for count-ups)
- `Easing.bezier(0.8, 0.22, 0.96, 0.65)` — custom cubic bezier

### Sequencing Tips
- `<Series>` for back-to-back scenes with no overlap
- `<Series.Sequence offset={-15}>` for overlapping scenes
- `useCurrentFrame()` inside a Sequence returns LOCAL frame (starts at 0)
- Nest Sequences with `layout="none"` for complex timing

### Chart Patterns
- Drive all chart animations from `useCurrentFrame()` + `spring()`
- Stagger bars with delay: `delay: i * STAGGER_DELAY`
- Use `@remotion/paths` + `evolvePath()` for animated line charts

### Transitions (if using)
- Transitions SHORTEN total duration (both scenes play simultaneously)
- Use `springTiming()` for organic feel, `linearTiming()` for precise control
- Overlays (`TransitionSeries.Overlay`) don't affect duration

## Official Remotion Templates (GitHub)
- `remotion-dev/template-audiogram` — podcast video clips
- `remotion-dev/template-tiktok` — TikTok-style captions with Whisper

## Rendering
- CLI render is more reliable than Studio render: `npx remotion render <id> out/<name>.mp4 --concurrency=1`
- Studio checkered background = transparency — won't appear in rendered output
- Always use `<Img>` from Remotion for images (handles loading/timeout correctly)

## Key Stats (for social proof)
- 1,000+ educators trained
- 50+ schools served
- 90% time savings
- 10+ hours saved per week
