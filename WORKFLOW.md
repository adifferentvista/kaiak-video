# KAIAK Featured Image Workflow

## Complete Pipeline for New Blog Posts

### Step 1: Generate the Illustration

Run from `e:/kaiak-video`:

```bash
node generate-image.js "PROMPT" "public/blog/images/SLUG.png"
```

**Standard prompt prefix (copy this every time):**
```
Wide landscape editorial illustration. Plain flat warm cream background. 
Illustration on RIGHT 55 percent. LEFT 40 percent empty cream. 
NO TEXT. NO LETTERS. NO SYMBOLS. 
Thick black outlines. Bold flat fills. 
ONLY orange, terracotta, peach, cream, black. ZERO cool colors.
```

**Then add post-specific visual description.** Keep it simple — one strong concept.

**Rules for the prompt:**
- If people are involved: "abstract faceless silhouettes — circles and rectangles, no faces, no features"
- Never mention: brains, graduation caps, question marks, speech bubbles, cameras, gears, funnels, lightbulbs, rockets
- Always specify: NO TEXT, warm colors only, illustration on RIGHT side
- Uses Google Imagen 4 API at 16:9 aspect ratio

### Step 2: Add Hook Text to CSV

Edit `featured-image-data.csv` and add a new row:
```
slug,"Hook line 1.","Hook line 2 (italic orange).","slug.png"
```

**Hook text rules:**
- Line 1: Navy (#0F172A), Playfair Display 72px, bold — the statement
- Line 2: Orange (#EA580C), Playfair Display 72px, bold italic — the punch
- Both should be SHORT and scroll-stopping — think magazine covers, not blog titles
- Never use the blog post title as the hook

### Step 3: Composite Text + Image

```bash
node composite-featured.js
```

This reads the CSV, composites all images, and outputs to `out/featured/` as WebP 85%.

**What the script does:**
- Auto-trims whitespace from source images
- Replaces near-cream pixels with exact #F5F0E8 for seamless backgrounds
- Renders text using Playfair Display (via SVG)
- Outputs 1280×720 WebP at 85% quality

### Step 4: Deploy to Blog

```bash
# Copy featured image to KAIAK site
cp out/featured/kaiak-SLUG.webp "E:/App Projects/Kaiak/Kaiak-v4/kaiak-v4/public/blog/headers/"
```

Then add to MDX frontmatter:
```yaml
image: "/blog/headers/kaiak-SLUG.webp"
imageAlt: "Description of the illustration"
```

### Step 5: Push to Production

```bash
cd "E:/App Projects/Kaiak/Kaiak-v4/kaiak-v4"
git add -A && git commit -m "Add featured image for SLUG" && git push
```

Vercel auto-deploys on push.

---

## Design Specifications

**Canvas:** 1280 × 720px (16:9)
**Background:** #F5F0E8 (uniform warm cream)
**Text zone:** Left 55% (704px)
**Image zone:** Right 45% (576px)
**Font:** Playfair Display, 72px, weight 900
**Text color:** #0F172A (navy) for line 1, #EA580C (orange italic) for line 2
**Left padding:** 64px
**Image padding:** 12px
**Export:** WebP, 85% quality
**Naming:** kaiak-[slug].webp

## Color Palette (strict)

**Allowed in illustrations:**
- Orange: #EA580C
- Terracotta / burnt sienna shades
- Peach / light orange
- Cream: #F5F0E8
- Black (outlines only)

**Never use:**
- Green, teal, blue, purple, pink
- Dark backgrounds
- Gradients or vignettes

## SEO (automatic)

When `image` field is set in MDX frontmatter:
- Open Graph image (Facebook, LinkedIn, Slack)
- Twitter card (summary_large_image)
- JSON-LD structured data
- Displayed as hero in post and thumbnail in blog listing

## API Keys

- **Google Imagen 4:** ***REDACTED***
- **Model:** imagen-4.0-generate-001

## File Locations

| What | Where |
|------|-------|
| Image generation script | `e:/kaiak-video/generate-image.js` |
| Composite script | `e:/kaiak-video/composite-featured.js` |
| Hook text CSV | `e:/kaiak-video/featured-image-data.csv` |
| Source illustrations | `e:/kaiak-video/public/blog/images/` |
| Final composited images | `e:/kaiak-video/out/featured/` |
| Blog headers (deployed) | `E:/App Projects/Kaiak/Kaiak-v4/kaiak-v4/public/blog/headers/` |
| Blog posts (MDX) | `E:/App Projects/Kaiak/Kaiak-v4/kaiak-v4/content/posts/` |
| Image prompts reference | `e:/kaiak-video/IMAGE-PROMPTS-20260408.md` |
| Master brief | `e:/kaiak-video/FEATURED-IMAGE-BRIEF-20260408.md` |
