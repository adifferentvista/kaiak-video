# KAIAK Blog Post Outlines — April 2026

Based on recent builds across the kaiak-video Remotion project, featured image pipeline, and KAIAK v4 site.

---

## Post 1: I Built a Featured Image Pipeline With AI and Node.js — Here's the Whole System

**Hook text:** "10 minutes per image."
**Highlight:** "From AI prompt to production."
**Target pillar:** practical-ai
**Estimated word count:** 2,200-2,800

### Section Headings

1. **Why I Stopped Using Canva for Blog Headers**
   The manual process: generate an image, open Canva, fiddle with text placement, export, rename, upload. Multiply by 43 posts. What broke, and when I decided to automate.

2. **The Three-Script Pipeline: Generate, Composite, Deploy**
   High-level architecture. Google Imagen 4 API generates illustrations from text prompts. A Node.js Sharp script composites text + image into a branded 1280x720 WebP. A copy command deploys to the live site. Total: three terminal commands.

3. **Writing Prompts That Produce Consistent Brand Images**
   The standard prompt prefix (warm cream background, thick outlines, right-side composition, warm palette only). The rules that prevent AI from generating cliches — no gears, no lightbulbs, no funnels. How constraining the palette to oranges and terracottas created instant visual coherence across 40+ posts.

4. **The Compositing Script: SVG Text, Color Matching, and Auto-Trim**
   How composite-featured.js works under the hood. Creating text overlays as SVG with Playfair Display. The pixel-level color replacement that matches near-cream backgrounds to exact #F5F0E8. Auto-trimming whitespace from AI-generated images so they fill the frame naturally.

5. **The CSV-Driven Hook Text System**
   Why hook text is separate from blog titles. The two-line format: navy statement + orange italic punch. Examples of hooks that work versus ones that fall flat. How a simple CSV file became the editorial voice of the entire blog.

6. **What I Would Do Differently**
   Lessons from iterating on 43 images. Prompt patterns that consistently fail. Why WebP at 85% was the right export choice. The workflow as a template for any recurring visual task.

### Key Takeaways
- You do not need design skills to produce consistent, branded blog images at scale
- Constraining AI with strict color palettes and composition rules produces better results than open-ended prompts
- A CSV file + a Node.js script can replace a Canva workflow entirely
- The real time savings come from eliminating decisions, not from speed — the system makes every image look like it belongs to the same brand
- This approach works for any visual content that follows a repeating pattern (social cards, newsletter headers, course thumbnails)

---

## Post 2: Building Branded Video Content With Remotion (Without Being a Developer)

**Hook text:** "React renders video now."
**Highlight:** "I didn't write the code."
**Target pillar:** practical-ai
**Estimated word count:** 2,400-3,000

### Section Headings

1. **What Remotion Actually Is (and Why It Matters for Non-Developers)**
   Remotion turns React components into MP4 video files. Why that matters: every frame is deterministic, brand-consistent, and version-controlled. You can render a video the same way you deploy a website. No After Effects, no timeline editors.

2. **How Claude Code Wrote My Entire Video Project**
   The workflow: describe what you want in natural language, Claude Code generates the component, you preview in Remotion Studio, iterate with feedback. The BRANDING.md file as the "brand rules" that Claude follows. Real examples of prompts that produced usable compositions.

3. **The Compositions That Worked (and the Ones That Didn't)**
   PerspectiveLaunch: a 3D floating dashboard that became the hero visual. MapJourney: animated path between cities. What made them compelling. SocialProof: flat counter animations that fell flat. BlogHeader: static text on cream that looked generic. The pattern: dimensional, layered compositions win; flat layouts lose.

4. **The Brand System That Makes Every Video Look Like KAIAK**
   BRANDING.md as the single source of truth. Color palette enforcement (navy + orange + cream, never pure black). Typography rules (Georgia for headings, system-ui for body). Animation patterns (spring physics, staggered reveals). How documenting these decisions once meant Claude could apply them consistently across 25+ compositions.

5. **Spring Physics, Not CSS Transitions: The Animation Rules That Matter**
   Why Remotion forbids CSS animations and what to use instead. useCurrentFrame() as the foundation for everything. Spring presets for different moods. The timing guidelines that make animations feel professional: 12-20 frame fades, 4-12 frame staggers, 30-frame holds.

6. **From Composition to Production: Rendering and Deploying**
   CLI rendering versus Studio rendering. Concurrency settings. Exporting transparent ProRes for overlays. How a single `npx remotion render` command produces a finished video file.

7. **Your Move: What Video Content Could You Automate?**
   Where this approach makes sense for school leaders: course intro videos, event promos, data visualization clips for board presentations. The minimum viable setup.

### Key Takeaways
- Remotion lets you create broadcast-quality video from code, but you do not need to write the code yourself
- Claude Code can generate Remotion compositions from natural language descriptions if you provide clear brand guidelines
- A BRANDING.md file is worth more than a hundred Canva templates — it lets AI apply your brand consistently
- Spring-based animations feel more professional than linear easing with almost no extra effort
- The real value is repeatability: once a composition exists, you can change the data and render a new video in seconds

---

## Post 3: Claude Code Changed How I Build Things (And I'm Not a Developer)

**Hook text:** "I describe. It builds."
**Highlight:** "No Stack Overflow required."
**Target pillar:** practical-ai
**Estimated word count:** 2,000-2,500

### Section Headings

1. **What Claude Code Actually Does (Plain English)**
   Not a chatbot. Not an autocomplete. Claude Code is an AI agent that runs in your terminal, reads your files, writes code, runs commands, and iterates based on your feedback. Why that distinction matters for non-developers who want to build real tools.

2. **My First Real Project: An Image Generation Script in 20 Minutes**
   The generate-image.js script. I described what I needed: "Call the Google Imagen 4 API, pass a prompt, save the result as a PNG." Claude Code wrote the script, I ran it, it worked. What I learned about giving clear specifications versus vague requests.

3. **The Feedback Loop That Makes It Work**
   How iterating with Claude Code actually feels. You describe, it builds, you test, you say "the animation is too slow" or "the colors are wrong," it fixes. The PerspectiveLaunch composition went through this loop — from initial concept to "absolutely amazing" in one session. Why specificity in feedback matters more than technical knowledge.

4. **Project Memory: Teaching Claude Your Preferences**
   CLAUDE.md files, memory files, and how Claude learns your brand over time. After rejecting three blog header approaches ("super bad," "AI slop," "just a reskin"), Claude understood what premium meant for KAIAK. How accumulated feedback creates a better collaborator.

5. **What You Still Need to Know (It's Less Than You Think)**
   You need to understand file structure basics, how to run terminal commands, and how to describe what you want clearly. You do not need to understand React, Node.js, or APIs. The mental model shift: think of yourself as a creative director, not a coder.

6. **Five Projects a School Leader Could Build This Week**
   Practical starting points: a script that formats report card comments, a CSV-to-email-draft tool, an image resizer for social media, a meeting agenda template generator, a data visualization script for board reports. Each takes under an hour with Claude Code.

### Key Takeaways
- Claude Code is not a chatbot — it is an agent that reads, writes, and runs code in your actual project
- Non-developers can build real, functional tools by describing what they need in plain language
- The quality of your output depends on the quality of your feedback, not your coding knowledge
- Project memory files (CLAUDE.md, BRANDING.md) compound over time and make the AI increasingly effective
- Start with small, self-contained scripts that solve one specific problem

---

## Post 4: How I Designed a Visual Brand System for 43 Blog Posts in One Weekend

**Hook text:** "43 posts. One visual system."
**Highlight:** "Every image matches."
**Target pillar:** systems-thinking
**Estimated word count:** 1,800-2,200

### Section Headings

1. **The Problem: 43 Posts, Zero Visual Consistency**
   What the KAIAK blog looked like before: some posts had no images, some had stock photos, some had screenshots. Each one looked like a different blog. Why visual consistency matters more than individual image quality for building trust with school leaders.

2. **Choosing the Constraints: Why Fewer Options Produce Better Results**
   The five-color palette (orange, terracotta, peach, cream, black). The banned elements list (no gears, funnels, lightbulbs, rockets, brains). The composition rule (illustration right, text left). Why I spent a full day writing rules about what NOT to do, and why that was the highest-leverage design decision.

3. **The Hook Text Formula: Magazine Covers, Not Blog Titles**
   Two lines. Line one is navy, bold — the setup. Line two is orange, italic — the punch. Never the same as the blog title. "94% of AI work goes undetected. The tools catch the innocent." How to write hooks that stop the scroll without clickbait.

4. **Scaling the System: CSV + Script = Instant Consistency**
   Once the rules exist, execution becomes mechanical. Add a row to a CSV, run a script, deploy. No design decisions per image. How removing per-image creativity paradoxically made the overall brand more creative and distinctive.

5. **The Results: What Consistent Branding Actually Looks Like**
   Before and after. How the blog feed transformed from a collection of random posts into a recognizable brand. The secondary benefit: writing hook text forced me to distill each post down to its most compelling two-line pitch, which improved the posts themselves.

### Key Takeaways
- Visual consistency across a blog matters more than any single image being beautiful
- Constraining your palette, composition, and imagery to a strict set of rules makes scaling effortless
- Hook text is an editorial exercise, not a design task — it forces you to articulate what makes each post worth reading
- Systems thinking applies to branding just as much as it applies to operations
- You can retrofit a consistent visual identity onto an existing blog library in a single weekend

---

## Post 5: The Workflow Document Nobody Writes (And Why It's the Most Important File in Your Project)

**Hook text:** "I forgot my own process."
**Highlight:** "Then I wrote it down."
**Target pillar:** systems-thinking
**Estimated word count:** 1,600-2,000

### Section Headings

1. **I Built a Tool, Used It Twice, Then Forgot How**
   The featured image pipeline worked perfectly — when I remembered all the steps. The third time I sat down to use it, I couldn't remember which script to run first, what the CSV format was, or where the output files went. A capable tool without documentation is a tool that dies.

2. **What a Good Workflow Document Looks Like**
   Not a README. Not a tutorial. A workflow document is a step-by-step playbook for your future self. Step 1: run this command. Step 2: edit this file. Step 3: run this command. The KAIAK WORKFLOW.md as a case study: five steps, each with the exact terminal command, the exact file to edit, and the exact format to follow.

3. **The Design Specs Section: Locking Your Decisions**
   Canvas size, background color, font, padding, export format. Every decision written down once so you never re-decide it. The "Lock vs. Swap" table: what stays the same (canvas, fonts, colors) versus what changes per use (headline text, illustration). Why this separation is the key to sustainable systems.

4. **BRANDING.md, WORKFLOW.md, and the Brief: A Three-Document System**
   Brand guidelines define HOW things should look. Workflow documents define WHAT to do. Briefs define WHY and provide templates for collaborators (or AI). How these three documents let anyone (including an AI agent) produce on-brand work without supervision.

5. **Making This Work for Your School**
   Every recurring process in your school should have a workflow document. Annual report production. Board meeting prep. Staff onboarding. Event planning. The format is the same: numbered steps, exact tools, exact formats, what's locked and what's swapped. Your future self (and your team) will thank you.

### Key Takeaways
- A tool without a workflow document is a tool that only works when you remember how
- The best workflow documents are step-by-step playbooks, not explanatory essays
- Separating "lock" decisions from "swap" decisions is the key to making any process repeatable
- Three documents (brand guide, workflow, brief) form a complete system that enables delegation to people or AI
- Every recurring process in a school deserves the same treatment — write the steps once, follow them forever

---

## Post 6: From ChatGPT Prompts to a Production API: How I Automated AI Image Generation

**Hook text:** "Copy-pasting prompts into ChatGPT."
**Highlight:** "I built an API call instead."
**Target pillar:** practical-ai
**Estimated word count:** 2,000-2,600

### Section Headings

1. **The ChatGPT Image Workflow That Didn't Scale**
   The original process: open ChatGPT, paste a long prompt, wait, download the image, rename it, move it to the right folder. It worked for five images. It didn't work for forty. What broke: inconsistent results, lost prompts, no reproducibility, manual file management.

2. **What "Using an API" Actually Means (No Jargon)**
   An API is a way to send a request to an AI service and get a result back, all from a script. Instead of typing into a chat window, you write a command that says "generate this image with these settings" and the image appears in your project folder. One script, 50 lines, no interface needed.

3. **The Generate-Image Script: 50 Lines That Changed My Workflow**
   Walking through generate-image.js line by line (in plain English). What the Google Imagen 4 API expects. How the script sends a prompt and saves the result. Why 16:9 aspect ratio is locked in the code so you never have to specify it again.

4. **Prompt Engineering for Consistent Visual Output**
   The standard prompt prefix that ensures every image matches the brand. The "never use" list that prevents AI from generating cliches. How I learned that constraining AI produces better results than giving it freedom. The follow-up correction prompt for when colors drift.

5. **The Pixel-Level Problem: Background Color Matching**
   AI-generated images almost match #F5F0E8 but not exactly. The compositing script that scans every pixel and replaces near-cream colors with the exact brand cream. Why this invisible detail is the difference between "looks professional" and "looks like someone pasted clipart onto a background."

6. **When to Graduate From Chat to Code**
   The decision framework: if you do something more than five times, if consistency matters, or if you need to reproduce results exactly, it is time to move from a chat interface to a script. How this principle applies beyond images: email templates, data processing, report generation.

### Key Takeaways
- Moving from a chat interface to an API call is the single biggest productivity leap most AI users never make
- A 50-line script can replace a manual process that takes 5-10 minutes per execution
- Constraining AI with strict prompt prefixes produces more consistent results than creative freedom
- Pixel-level details (exact color matching, auto-trimming) are what separate amateur from professional output
- The "more than five times" rule: any AI task you repeat regularly should become a script
