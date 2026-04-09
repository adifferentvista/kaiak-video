# Graph Report - .  (2026-04-09)

## Corpus Check
- Large corpus: 124 files · ~2,331,861 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 55 nodes · 38 edges · 23 communities detected
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `compositeImage()` - 3 edges
2. `createTextSVG()` - 2 edges
3. `main()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Remotion Compositions & Root"
Cohesion: 0.11
Nodes (0): 

### Community 1 - "Hero Video Scenes"
Cohesion: 0.4
Nodes (0): 

### Community 2 - "Featured Image Compositing"
Cohesion: 0.83
Nodes (3): compositeImage(), createTextSVG(), main()

### Community 3 - "Code Diff Component"
Cohesion: 0.67
Nodes (0): 

### Community 4 - "Kinetic Marketing Effects"
Cohesion: 0.67
Nodes (0): 

### Community 5 - "Image Generation API"
Cohesion: 1.0
Nodes (0): 

### Community 6 - "Cinematic Intro Component"
Cohesion: 1.0
Nodes (0): 

### Community 7 - "Browser Window Chrome"
Cohesion: 1.0
Nodes (0): 

### Community 8 - "Claude Terminal"
Cohesion: 1.0
Nodes (0): 

### Community 9 - "Blog Header Template"
Cohesion: 1.0
Nodes (0): 

### Community 10 - "Featured Image Template"
Cohesion: 1.0
Nodes (0): 

### Community 11 - "Blog Hero Template"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "Stat Highlight Template"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Comparison Split Template"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Framework Diagram Template"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Call To Action Template"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "YouTube Player"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Social Proof Component"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Logo Test"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Frontmatter Update Script"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "CSS Styles"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Remotion Config"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "ESLint Config"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `Image Generation API`** (2 nodes): `generate-image.js`, `generateImage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Cinematic Intro Component`** (2 nodes): `CinematicIntro.tsx`, `Particle()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Browser Window Chrome`** (2 nodes): `FeaturedImage-20260407.tsx`, `safeStaticFile()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Claude Terminal`** (1 nodes): `remotion.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Blog Header Template`** (1 nodes): `update-frontmatter.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Featured Image Template`** (1 nodes): `BrowserWindow.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Blog Hero Template`** (1 nodes): `ClaudeTerminal.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Stat Highlight Template`** (1 nodes): `LogoTest.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Comparison Split Template`** (1 nodes): `PerspectiveLaunchWindows.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Framework Diagram Template`** (1 nodes): `SocialProof.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Call To Action Template`** (1 nodes): `YouTubePlayer.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `YouTube Player`** (1 nodes): `BlogHeader.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Social Proof Component`** (1 nodes): `BlogHero.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Logo Test`** (1 nodes): `BlogHeroVisual.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontmatter Update Script`** (1 nodes): `CallToAction.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `CSS Styles`** (1 nodes): `ComparisonSplit.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Remotion Config`** (1 nodes): `FrameworkDiagram.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ESLint Config`** (1 nodes): `StatHighlight.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 2 inferred relationships involving `compositeImage()` (e.g. with `createTextSVG()` and `main()`) actually correct?**
  _`compositeImage()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `Remotion Compositions & Root` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._