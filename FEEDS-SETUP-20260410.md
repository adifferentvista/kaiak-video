# Beehiiv & Flipboard Feed Setup for kaiak.io

**Date:** 2026-04-10
**Site:** kaiak.io (Next.js 14, App Router)
**RSS feed:** https://kaiak.io/feed.xml

---

## Part 1: RSS Feed Audit

### Current feed status (app/feed.xml/route.js)

The existing RSS feed already includes:

| Field               | Present? | Notes                                          |
|---------------------|----------|-------------------------------------------------|
| `<title>`           | Yes      | Post title, XML-escaped                        |
| `<link>`            | Yes      | Full URL: `https://kaiak.io/blog/{slug}`       |
| `<guid>`            | Yes      | Same as link (permanent)                       |
| `<description>`     | Yes      | Post description, XML-escaped                  |
| `<content:encoded>` | Yes      | Full post body (MDX stripped), CDATA-wrapped   |
| `<pubDate>`         | Yes      | RFC 822 date via `toUTCString()`               |
| `<enclosure>`       | Partial  | Uses pillar fallback images, NOT per-post images |
| `<atom:link>`       | Yes      | Self-referencing link                          |
| Channel `<title>`   | Yes      | "KAIAK -- AI for School Leaders"               |
| Channel `<link>`    | Yes      | https://kaiak.io                               |
| Channel `<description>` | Yes  | Present                                        |
| `<language>`        | Yes      | "en"                                           |
| `<lastBuildDate>`   | Yes      | Dynamic                                        |

### Issues to fix

**1. Images use pillar fallback instead of per-post featured image**

The feed maps `post.pillar` to a generic pillar image (`/images/pillars/practical-ai.png`), but each post has a unique `post.image` field (e.g., `/blog/headers/kaiak-ai-critical-thinking.webp`). Both Beehiiv and Flipboard display images, so the per-post image should be used.

**Fix in `app/feed.xml/route.js`:** Replace the `getPillarImage` approach with the post's own image:

```js
// Replace the enclosure logic inside the .map() with:
const imageUrl = post.image
  ? `${baseUrl}${post.image}`
  : getPillarImage(post.pillar, baseUrl);  // fallback to pillar image

const imageTag = imageUrl
  ? `\n      <enclosure url="${imageUrl}" type="image/${post.image?.endsWith('.webp') ? 'webp' : 'png'}" length="0"/>`
  : '';
```

**2. Add `<author>` tag (recommended for Flipboard)**

Flipboard surfaces author info. Add to each `<item>`:

```xml
<author>benedict@kaiak.io (Benedict Rinne)</author>
```

**3. Add `<category>` tag (recommended for both platforms)**

Map the pillar to a category for better classification:

```xml
<category>${escapeXml(pillarLabels[post.pillar] || 'AI')}</category>
```

You'll need to import `pillarLabels` from `@/lib/posts`.

**4. Add `<image>` to channel (recommended)**

Add a channel-level image for feed readers:

```xml
<image>
  <url>https://kaiak.io/apple-touch-icon.png</url>
  <title>KAIAK</title>
  <link>https://kaiak.io</link>
</image>
```

---

## Part 2: Beehiiv Setup

### Overview

Beehiiv is a newsletter platform. It does NOT automatically pull from your RSS feed and republish. Instead, it offers:

- **One-time RSS import:** Bulk-import existing posts as archived newsletter issues
- **Manual publishing:** You write/paste each new newsletter edition in their editor
- **Automation via API/Zapier:** You can set up a Zapier/Make workflow that watches your RSS feed and creates a draft in Beehiiv when a new post appears

### Step-by-step setup

#### Step 1: Create a Beehiiv account

1. Go to https://beehiiv.com and sign up
2. The free "Launch" plan allows up to 2,500 subscribers (sufficient to start)
3. Choose a publication name: e.g., "KAIAK Newsletter" or "AI for School Leaders"
4. Set your subdomain: e.g., `kaiak.beehiiv.com` (or later connect a custom domain like `newsletter.kaiak.io`)

#### Step 2: Import existing posts via RSS

1. Go to **Settings > Import** in the Beehiiv dashboard
2. Select **"Import from RSS"**
3. Paste your feed URL: `https://kaiak.io/feed.xml`
4. Beehiiv will parse the feed and show a preview of posts it found
5. Select which posts to import (or all)
6. Imported posts appear as **archived/past issues** -- they will NOT be sent as emails
7. This is a one-time bulk import, not an ongoing sync

#### Step 3: Set up ongoing syndication (Zapier/Make automation)

Since Beehiiv doesn't auto-sync from RSS, set up an automation:

**Option A: Zapier (easiest)**
1. Create a Zapier account (free tier works)
2. Create a new Zap:
   - **Trigger:** "RSS by Zapier" > "New Item in Feed"
   - Feed URL: `https://kaiak.io/feed.xml`
   - **Action:** "Beehiiv" > "Create Post"
   - Map fields: title, content (from `content:encoded`), thumbnail
3. Set the Beehiiv post status to "Draft" so you can review before sending
4. Zapier checks the RSS feed every 5-15 minutes on free tier

**Option B: Beehiiv API (more control)**
1. Get your API key from Beehiiv Settings > Integrations > API
2. Write a small script or use a cron job that:
   - Fetches `https://kaiak.io/feed.xml`
   - Parses new items
   - POSTs to `https://api.beehiiv.com/v2/publications/{pub_id}/posts`
3. This gives full control over formatting and scheduling

**Option C: Manual cross-post**
- After publishing a blog post on kaiak.io, manually create a newsletter edition in Beehiiv
- Copy the intro paragraph + a "Read the full post" link back to kaiak.io
- This drives traffic to your site rather than duplicating content

#### Step 4: Configure Beehiiv newsletter settings

1. **Branding:** Upload KAIAK logo, set brand colors
2. **Custom domain** (optional, paid plan): Point `newsletter.kaiak.io` via CNAME
3. **Subscribe widget:** Beehiiv provides an embeddable form -- add it to kaiak.io
4. **SEO settings:** If using Beehiiv's web hosting for newsletters, ensure canonical URLs point to kaiak.io to avoid duplicate content issues

#### Step 5: Add subscription form to kaiak.io (no code changes to RSS)

Beehiiv provides an embed code for a subscription form. Add it to your Next.js site:

```jsx
// Example: components/NewsletterSignup.jsx
export default function NewsletterSignup() {
  return (
    <iframe
      src="https://embeds.beehiiv.com/your-form-id"
      data-test-id="beehiiv-embed"
      width="100%"
      height="320"
      frameBorder="0"
      scrolling="no"
      style={{ borderRadius: '4px', margin: 0 }}
    />
  );
}
```

### Code changes needed on Next.js side

- **RSS feed fixes** (see Part 1 above): per-post images, author, category tags
- **Newsletter embed** (optional): add Beehiiv subscribe form component
- **No other changes required** -- Beehiiv reads your existing feed

---

## Part 3: Flipboard Setup

### Overview

Flipboard is a content curation platform. It reads RSS feeds natively and can display your blog posts in topic-based "magazines." Flipboard is one of the largest RSS-based content aggregators.

### Step-by-step setup

#### Step 1: Claim your website on Flipboard

1. Go to https://flipboard.com and create an account (or sign in)
2. Go to your profile > **Settings**
3. Under **"Publisher Tools"** or visit https://share.flipboard.com
4. Enter your website URL: `https://kaiak.io`
5. Verify ownership via one of these methods:
   - Add a `<meta>` tag to your site's `<head>`
   - Upload a verification file to your site's root
   - DNS TXT record

**For the meta tag method**, add to `app/layout.jsx` metadata:

```js
// In your metadata export, add:
other: {
  'flipboard:verification': 'YOUR_VERIFICATION_CODE',
},
```

#### Step 2: Submit your RSS feed

1. After verification, go to your Flipboard publisher dashboard
2. Add your RSS feed URL: `https://kaiak.io/feed.xml`
3. Flipboard will begin crawling your feed automatically
4. New posts appear in Flipboard's ecosystem within hours of publishing

#### Step 3: Create a Flipboard Magazine

1. In the Flipboard app or website, tap **"+ Create Magazine"**
2. Name it: e.g., "AI for School Leaders" or "KAIAK Blog"
3. Set a description using your target keywords
4. Choose relevant topics (Education, Artificial Intelligence, Leadership, EdTech)
5. Flip your existing blog posts into this magazine
6. New posts from your RSS feed can be auto-added to the magazine

#### Step 4: Optimize for Flipboard

Flipboard reads Open Graph meta tags heavily. Your site already has these set up correctly in `app/blog/[slug]/page.jsx`:

| OG Tag              | Status | Current value                               |
|----------------------|--------|---------------------------------------------|
| `og:title`          | Yes    | Post title                                  |
| `og:description`    | Yes    | Post description                            |
| `og:image`          | Yes    | Per-post featured image or dynamic OG image |
| `og:type`           | Yes    | "article"                                   |
| `og:url`            | Yes    | Canonical URL                               |
| `article:published_time` | Yes | Post date                                |
| `article:author`    | Yes    | "Benedict"                                  |
| `twitter:card`      | Yes    | summary_large_image                         |

**Your OG setup is already complete.** No additional meta tags needed beyond the Flipboard verification tag.

#### Step 5: Add Flipboard share button (optional)

Add a share button to blog post pages:

```jsx
<a
  href={`https://share.flipboard.com/bookmarklet/popout?v=2&title=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://kaiak.io/blog/${slug}`)}`}
  target="_blank"
  rel="noopener noreferrer"
>
  Share on Flipboard
</a>
```

### Code changes needed on Next.js side

- **RSS feed fixes** (see Part 1 above): critical for Flipboard to show correct images
- **Flipboard verification meta tag**: one-time addition to layout.jsx
- **Share button** (optional): add to blog post template
- **No other changes required** -- your OG tags are already correct

---

## Part 4: Recommended RSS Feed Updates (Complete Diff)

Here is the full updated `app/feed.xml/route.js`:

```js
import { getAllPosts, pillarLabels } from '@/lib/posts';
import fs from 'fs';
import path from 'path';

const pillarImages = {
  'practical-ai': 'practical-ai.png',
  'systems-thinking': 'systems-thinking.png',
  'leadership': 'leadership.png',
  'education': 'education.png',
  'no-admin-life': 'no-admin-life.png',
};

function stripMdx(content) {
  return content
    .replace(/^import\s+.*$/gm, '')
    .replace(/<\w+\s+[^>]*\/>/g, '')
    .replace(/<\/?\w+[^>]*>/g, '')
    .replace(/^export\s+.*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function getPillarImage(pillar, baseUrl) {
  const filename = pillarImages[pillar];
  if (!filename) return null;
  const imagePath = path.join(process.cwd(), 'public', 'images', 'pillars', filename);
  if (!fs.existsSync(imagePath)) return null;
  return `${baseUrl}/images/pillars/${filename}`;
}

function getImageType(imagePath) {
  if (imagePath.endsWith('.webp')) return 'image/webp';
  if (imagePath.endsWith('.jpg') || imagePath.endsWith('.jpeg')) return 'image/jpeg';
  return 'image/png';
}

export async function GET() {
  const baseUrl = 'https://kaiak.io';
  const posts = getAllPosts();

  const escapeXml = (str) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

  const items = posts
    .map((post) => {
      // Prefer per-post featured image, fall back to pillar image
      const imageUrl = post.image
        ? `${baseUrl}${post.image}`
        : getPillarImage(post.pillar, baseUrl);

      const imageType = post.image ? getImageType(post.image) : 'image/png';

      const imageTag = imageUrl
        ? `\n      <enclosure url="${imageUrl}" type="${imageType}" length="0"/>`
        : '';

      const categoryTag = post.pillar
        ? `\n      <category>${escapeXml(pillarLabels[post.pillar] || 'AI')}</category>`
        : '';

      const fullContent = stripMdx(post.content);

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <content:encoded><![CDATA[${fullContent}]]></content:encoded>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>benedict@kaiak.io (Benedict Rinne)</author>${categoryTag}${imageTag}
    </item>`;
    })
    .join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>KAIAK — AI for School Leaders</title>
    <link>${baseUrl}</link>
    <description>Practical AI, systems thinking, and leadership for school leaders.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/apple-touch-icon.png</url>
      <title>KAIAK</title>
      <link>${baseUrl}</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
```

---

## Part 5: Action Checklist

### Immediate (before signing up for platforms)

- [ ] Update `app/feed.xml/route.js` with per-post images, author, and category tags (see Part 4)
- [ ] Deploy the updated feed to kaiak.io
- [ ] Verify feed is valid at https://validator.w3.org/feed/check.cgi?url=https://kaiak.io/feed.xml

### Beehiiv setup

- [ ] Create Beehiiv account at https://beehiiv.com (free plan)
- [ ] Set publication name and branding
- [ ] Import existing posts via RSS (one-time)
- [ ] Decide syndication strategy: Zapier automation (easiest) or manual cross-post (best for traffic)
- [ ] Set up Zapier automation if chosen (RSS trigger > Beehiiv draft)
- [ ] Add Beehiiv subscribe embed to kaiak.io (optional)
- [ ] Set canonical URLs in Beehiiv to point to kaiak.io (if using Beehiiv web hosting)

### Flipboard setup

- [ ] Create Flipboard account at https://flipboard.com
- [ ] Claim kaiak.io via publisher tools
- [ ] Add Flipboard verification meta tag to `app/layout.jsx`
- [ ] Deploy and complete verification
- [ ] Submit RSS feed URL in publisher dashboard
- [ ] Create a magazine: "AI for School Leaders"
- [ ] Flip existing posts into the magazine
- [ ] Add Flipboard share button to blog template (optional)

### Ongoing

- [ ] Each new blog post auto-appears in Flipboard via RSS (no action needed)
- [ ] Each new blog post triggers Zapier > Beehiiv draft (if automation set up)
- [ ] Review Beehiiv drafts before sending to subscribers

---

## Notes

- **SEO / duplicate content:** Beehiiv hosted pages can compete with kaiak.io in search. Either (a) use canonical tags pointing to kaiak.io, (b) noindex Beehiiv pages, or (c) only send excerpt + link in newsletters.
- **Flipboard is passive:** Once your RSS feed is connected, new posts appear automatically. No ongoing work required.
- **Beehiiv free plan limits:** 2,500 subscribers, 1 publication, basic analytics. The "Grow" plan ($42/mo as of 2025) unlocks custom domains, automations, and advanced analytics.
- **Image format:** Your posts use `.webp` images. Both Beehiiv and Flipboard support WebP. The updated feed correctly sets `type="image/webp"`.
