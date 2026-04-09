# HeyGen Production Workflows — Complete Reference
**Date:** April 9, 2026
**Author:** Benedict Rinne / KAIAK
**Purpose:** Deep-dive on HeyGen video types, prompt engineering, advanced features, API automation, and blog outline

> **Note:** WebSearch/WebFetch were unavailable for this session. Content is based on HeyGen platform knowledge through early 2025. Verify any feature names or pricing at heygen.com before publishing. Features like Interactive Avatar, Streaming API, and Personalized Video may have received updates.

---

## 1. The 5 Best HeyGen Video Types (with Paste-Ready Scripts)

### Type 1: UGC Product Review Style

**What it is:** A casual, direct-to-camera review that mimics the UGC (user-generated content) style popular on TikTok and Instagram. Feels authentic, not corporate.

**HeyGen setup:**
- Avatar: Use your personal Instant Avatar (or a stock avatar that looks like a real person, not a corporate headshot)
- Background: Home office, coffee shop, or plain wall — NOT a branded background
- Aspect ratio: 9:16 (vertical) for TikTok/Reels, or 1:1 for LinkedIn
- Voice: Your cloned voice (via HeyGen voice clone or ElevenLabs). Stock voices sound generic.
- Clothing: Casual — the avatar should look like someone talking to a friend

**Script — "HeyGen Tool Review" (52 seconds, ~130 words)**

```
Okay so I've been using this AI avatar tool called HeyGen for the past
three weeks and I need to talk about it.

I'm not a video person. I don't have a studio. I don't have a ring light.
And I definitely don't have time to do fifteen takes of a sixty second video.

So I started using HeyGen and honestly the quality surprised me. You
type in a script, pick an avatar — or clone yourself — and it generates
a video in like five minutes.

The lip sync is solid. The gestures look natural. And I can produce five
videos in the time it used to take me to set up my camera.

Is it perfect? No. Sometimes the pauses feel a little off. But for
LinkedIn content and course promos? It's more than good enough.

Link's in my bio if you want to try it.
```

**Why this script works for HeyGen:**
- Short sentences (avatar handles these better than complex clauses)
- Conversational tone (contractions, informal language)
- No technical jargon that could trip up pronunciation
- Natural pause points between thoughts
- Under 140 words (fits comfortably in 60s at natural speaking pace)

---

### Type 2: Educational / Course Content

**What it is:** A structured lesson segment for an online course or tutorial series. The avatar acts as the instructor.

**HeyGen setup:**
- Avatar: Your personal Instant Avatar in professional-casual attire
- Background: Clean, solid color (#1a1a2e dark navy, or #faf7f2 warm cream) or a subtle office/library
- Aspect ratio: 16:9 (landscape) for course platforms (Teachable, Kajabi, embedded in LMS)
- Voice: Your cloned voice at normal pace — do NOT speed up for courses
- Overlay: Use HeyGen's multi-scene feature to alternate between talking head and screen recording

**Script — "Module 1: What AI Automation Actually Means" (90 seconds, ~220 words)**

```
Welcome to Module 1. Before we build anything, let's get clear on what
AI automation actually means — because most people get this wrong.

Automation is not about replacing humans. It's about removing the
repetitive steps between your thinking and your output.

Here's an example. Let's say you write a blog post every week. The
writing is the creative work — that's you. But after you write it, you
also need to format it, create social posts from it, design a header
image, schedule it, and send a newsletter. That's five manual steps
that follow the same pattern every single time.

AI automation handles those five steps. You write the post, and a
workflow takes over: it extracts key quotes for LinkedIn, generates an
image prompt, creates a newsletter draft, and schedules everything.

The thinking is yours. The execution is automated.

In this course, we'll build three of these workflows from scratch. You
don't need to code. You don't need to be technical. You need a free
n8n account and about two hours.

By the end, you'll have a content repurposing pipeline, a document
processing workflow, and an AI-powered knowledge base — all running
automatically.

Let's get started with the tools you'll need. That's in the next lesson.
```

**Why this script works for HeyGen:**
- Clear sentence boundaries (avatar can breathe between sentences)
- No bullet points or lists read aloud (sounds robotic when an avatar reads "number one, number two")
- Transitions are conversational ("Here's an example", "Let's get started")
- Ends with a bridge to the next video (keeps course flow natural)
- ~220 words for 90 seconds = ~145 wpm (ideal avatar speaking pace)

---

### Type 3: LinkedIn Thought Leadership

**What it is:** A punchy, opinionated take designed to stop the scroll and drive comments. This is your primary format for building authority.

**HeyGen setup:**
- Avatar: Your personal Instant Avatar, professional but approachable
- Background: Solid warm tone or subtle gradient
- Aspect ratio: 1:1 (square) for maximum LinkedIn feed real estate
- Voice: Your cloned voice with slight emphasis (HeyGen respects SSML-style markers in some plans)
- Captions: ON, always. Bold key phrases.

**Script — "Stop Building AI Tools Nobody Asked For" (48 seconds, ~120 words)**

```
I see it every week. Someone builds an incredible AI automation.
Custom API calls. Fifteen-step workflow. Beautiful dashboard.

And nobody uses it.

Here's the problem. They built the tool before they found the pain.

The best AI automations I've built all started the same way: someone
said "I spend three hours a week doing this one repetitive thing" and
I said "let me see if I can cut that to ten minutes."

That's it. No grand vision. No platform play. Just one specific pain
point and a focused solution.

If you're thinking about building AI workflows for your team or your
clients, start with the complaints. The boring ones. That's where the
money is.

What's the most tedious task on your plate right now? Tell me below.
```

**Why this script works for HeyGen:**
- Opens with a pattern interrupt (no greeting, no "hey everyone")
- Short paragraphs create natural pauses in delivery
- The one-line paragraph ("And nobody uses it.") lands as a beat — HeyGen handles these well
- Ends with a direct question CTA (drives comments, which boosts LinkedIn reach)
- 120 words = well under 60 seconds with natural pacing

---

### Type 4: Customer Testimonial Style

**What it is:** A video that sounds like a client or user sharing their experience. Use your own avatar sharing a case study, or (with permission) create an avatar for a real client.

**HeyGen setup:**
- Avatar: Your Instant Avatar or a stock avatar that matches the "client" persona
- Background: Casual/home office (testimonials should feel informal)
- Aspect ratio: 1:1 or 16:9 depending on destination (website embed = 16:9, social = 1:1)
- Voice: Match the persona — your voice for case studies, or the client's cloned voice (with consent)

**Script — Case Study: "How We Saved 12 Hours a Week" (65 seconds, ~160 words)**

```
Six months ago, our team was spending about fifteen hours a week on
document processing. Intake forms, contracts, policy updates — all
manually sorted, filed, and summarized.

We worked with Benedict to build an automation using n8n and Claude's
API. Here's what it does: a document comes in by email, the system
reads it, classifies the type, extracts the key information, and
routes it to the right person with a summary.

The whole thing runs in the background. Nobody has to touch it unless
there's a flag.

The result? We went from fifteen hours a week down to about three.
And those three hours are the edge cases that genuinely need human
judgment.

The setup took about two weeks. The ROI hit within the first month.

If your team is drowning in documents, this kind of automation isn't
a luxury anymore. It's table stakes.

Reach out to KAIAK if you want to see how it works.
```

**Why this script works for HeyGen:**
- Tells a specific story with real numbers (15 hours down to 3)
- Doesn't sound like ad copy — sounds like someone describing their experience
- Technical enough to be credible, simple enough for any audience
- Subtle CTA at the end (not salesy)

---

### Type 5: Explainer / Walkthrough

**What it is:** A screen-recording-plus-avatar video that walks through a tool, process, or concept. The avatar appears as a floating overlay in the corner while the main view shows the screen.

**HeyGen setup:**
- Use HeyGen's "Screen Recording + Avatar" feature (or record screen separately and composite in post)
- Avatar: Small circle overlay in bottom-right corner
- Screen recording: Show the actual tool/dashboard/workflow
- Aspect ratio: 16:9 (landscape) — this is tutorial content
- Voice: Your cloned voice narrating the screen

**Script — "Building Your First n8n Automation" (80 seconds, ~195 words)**

```
Let me show you how to build your first n8n automation in under ten
minutes. We're going to create a workflow that takes a Google Form
submission and automatically sends a personalized email response.

First, open n8n and create a new workflow. You'll see this blank
canvas — this is where we'll build everything.

Click "Add first step" and search for Google Forms. Select the trigger
"On form submission." Connect your Google account and pick your form.

Now add a second node. Search for "Gmail" and select "Send email."
In the "To" field, map the email address from the form submission —
just drag it from the left panel.

For the body, this is where it gets interesting. Add a third node
between these two — search for "OpenAI" or "Claude" — and use the
form responses to generate a personalized reply. Your prompt would
be something like: "Write a friendly two-sentence confirmation
based on this form data."

Connect the AI output to the Gmail body field. Turn on the workflow.

That's it. Every form submission now gets an AI-personalized email
automatically. Total setup time: about eight minutes.

Try it yourself and let me know what you build.
```

**Why this script works for HeyGen:**
- Narrates visual steps (designed to pair with screen recording)
- Uses "you'll see" and "click" — guides the viewer spatially
- Short, imperative sentences (easy for avatar to deliver clearly)
- Specific tool names and field names (builds credibility)

---

## 2. Step-by-Step Workflows (Script to Final Export)

### Workflow A: Single Talking-Head Video (LinkedIn/UGC)

**Time: 25-35 minutes total**

```
Step 1: Write Script (10 min)
├── Open Claude / ChatGPT
├── Prompt: "Write a 60-second HeyGen script about [TOPIC].
│   Rules: under 140 words, conversational tone, open with a hook,
│   end with a question CTA. Short sentences only. No jargon."
├── Edit for your voice — remove anything that doesn't sound like you
└── Read aloud once to check timing (aim for 55-65 seconds)

Step 2: Create Video in HeyGen (10 min)
├── Log in → Create Video → Avatar mode
├── Select your Instant Avatar (or stock avatar)
├── Set background: solid color or office scene
├── Set aspect ratio: 1:1 (LinkedIn) or 9:16 (Reels)
├── Paste script into the text field
├── Select voice: your cloned voice
├── Preview first 10 seconds — check lip sync and pacing
├── Adjust script if any words sound unnatural
└── Click Generate → wait ~3-5 min for rendering

Step 3: Post-Production (5 min)
├── Download the rendered video
├── Add captions if not using HeyGen's built-in (CapCut, Descript)
├── Optional: trim first/last 0.5s of dead air
└── Export final file

Step 4: Prepare Distribution Assets (5 min)
├── Write LinkedIn post text (hook + context + CTA + hashtags)
├── Pull one quote for a text graphic
├── Note the transcript for repurposing later
└── Schedule post (Buffer, Hootsuite, or native LinkedIn scheduler)
```

### Workflow B: Multi-Scene Course Video

**Time: 45-60 minutes total**

```
Step 1: Write Script (15 min)
├── Define learning objective: "By the end, the viewer can ___"
├── Structure: Intro (15s) → Concept (30s) → Demo (45s) → Recap (15s)
├── Write narration for each segment
├── Mark where screen recordings will appear: [SCREEN: show n8n dashboard]
└── Target: 200-250 words for a 2-minute lesson

Step 2: Record Screen Segments (10 min)
├── Use OBS, Loom, or native screen recording
├── Record each demo segment separately (easier to edit)
├── Resolution: 1920x1080
└── No narration on screen recordings (avatar provides that)

Step 3: Build in HeyGen (15 min)
├── Create Video → select "Multiple scenes"
├── Scene 1: Avatar on solid background (intro)
├── Scene 2: Screen recording with avatar overlay (demo)
├── Scene 3: Avatar on solid background (recap)
├── Paste corresponding script text into each scene
├── Upload screen recordings for the demo scenes
└── Generate video

Step 4: Polish (10 min)
├── Download rendered video
├── Add chapter markers if uploading to YouTube
├── Add captions/subtitles
├── Optional: add title cards between scenes in CapCut/Premiere
└── Export and upload to course platform
```

### Workflow C: Batch Production (5 Videos in One Session)

**Time: 2-3 hours for 5 videos**

```
Step 1: Batch Write Scripts (30 min)
├── Write all 5 scripts in one document
├── Use a consistent template for each
├── Read each aloud for timing
└── Final word counts: 110-160 words per script

Step 2: Assembly Line in HeyGen (45 min)
├── Create Video #1 → set avatar, background, voice, ratio
├── DO NOT CHANGE SETTINGS between videos (consistency matters)
├── Paste Script #1 → Generate
├── While #1 renders, set up #2 in a new tab
├── Paste Script #2 → Generate
├── Continue until all 5 are submitted
└── All 5 render in parallel — total render time ~5-8 min

Step 3: Batch Download & Caption (20 min)
├── Download all 5 rendered videos
├── Run all through caption tool (CapCut batch, or Descript)
├── Spot-check each video: lip sync, audio quality, pacing
└── Flag any that need re-rendering (usually 0-1 out of 5)

Step 4: Batch Prepare Distribution (30 min)
├── Write LinkedIn post text for each video
├── Assign posting dates (Mon, Wed, Fri over two weeks)
├── Generate repurposed content (text posts, carousels)
└── Schedule everything
```

---

## 3. HeyGen Prompt Engineering — Writing Scripts for AI Avatars

### The Core Rules

**1. Words per minute: 140-155 WPM**
- HeyGen avatars speak at approximately 145-155 words per minute at default speed
- For a 60-second video: write 135-150 words
- For a 90-second video: write 200-225 words
- For a 2-minute video: write 275-300 words
- ALWAYS read your script aloud with a timer before pasting it in

**2. Sentence length: 8-18 words per sentence**
- Long compound sentences create unnatural delivery
- Bad: "When you're thinking about how to set up your first AI automation, the most important thing to consider is whether you have a clear use case that will actually save time for your team."
- Good: "Setting up your first AI automation? Start with one question. Will this actually save time?"

**3. Paragraph breaks = pauses**
- HeyGen inserts a natural breath/pause between paragraphs
- Use a new paragraph every 2-3 sentences to control pacing
- One-sentence paragraphs create dramatic beats

**4. Avoid these — they trip up AI avatars:**

| Problem | Example | Fix |
|---|---|---|
| Acronyms | "Use the API with your LLM" | "Use the A.P.I. with your L.L.M." (add periods) |
| Numbers as digits | "Save 10 hours" | "Save ten hours" (spell out numbers under 100) |
| URLs | "Go to heygen.com" | "Search for HeyGen" (don't read URLs aloud) |
| Technical terms | "Kubernetes orchestration" | Test pronunciation first; rephrase if garbled |
| Parentheticals | "This tool (which I use daily) is great" | "This tool is great. I use it daily." |
| Em-dashes mid-sentence | "AI tools — when used right — are powerful" | Break into two sentences |
| ALL CAPS for emphasis | "This is REALLY important" | HeyGen doesn't reliably stress caps words |

**5. Emphasis and stress**
- HeyGen (as of early 2025) does not support SSML tags in the standard editor
- To emphasize a word, restructure the sentence so the important word falls at the beginning or end
- Add a paragraph break before an important statement to create a natural pause before it
- Example: Instead of "The KEY thing is consistency" write:

```
Here's what most people miss.

Consistency. That's the whole game.
```

**6. Contractions sound more natural**
- "I'm" over "I am"
- "Don't" over "do not"
- "Here's" over "here is"
- The only exception: when you want emphasis. "Do not skip this step" sounds more forceful than "Don't skip this step."

**7. Script formatting in HeyGen's editor**

```
[Scene 1]
Line breaks between paragraphs signal pauses.

Keep each paragraph to 2-3 sentences maximum.

If using multiple scenes, paste only that scene's text in each scene panel.

Do not include stage directions in the script field — the avatar will read them aloud.
```

### The Quick Script QA Checklist

Before pasting any script into HeyGen, verify:

- [ ] Total word count matches target duration (145 WPM)
- [ ] No sentence longer than 20 words
- [ ] No acronyms without periods between letters
- [ ] Numbers spelled out (except years: "twenty twenty-six" is awkward — use "2026")
- [ ] No URLs or email addresses
- [ ] No parenthetical asides
- [ ] Contractions used throughout
- [ ] Paragraph breaks every 2-3 sentences
- [ ] Read aloud test: does it sound like a human talking?
- [ ] First sentence is a hook (no "Hey everyone" or "Welcome to my channel")

---

## 4. Advanced Features to Showcase

### 4.1 Interactive Avatars (Streaming Avatar)

**What it is:** A real-time AI avatar that can respond to user input via text or voice. Used for live customer support, interactive demos, and conversational experiences.

**Key capabilities:**
- Real-time avatar rendering (sub-second latency in production)
- Connects to your own LLM backend (GPT-4, Claude, etc.) for response generation
- User speaks or types → your LLM generates response → avatar speaks it back
- Embeddable in websites via JavaScript SDK

**Use cases for KAIAK:**
- Live demo on your website: "Ask my AI avatar about my services"
- Course Q&A bot: Students interact with your avatar between lessons
- Sales page: Interactive avatar that explains your consulting packages
- Conference booth: Tablet running an interactive avatar greeting visitors

**Showcase script idea:**
```
"What you're seeing right now is an interactive AI avatar. It's powered
by my voice, my likeness, and a custom AI model trained on my content.

Go ahead — ask it a question. Type anything about AI automation and
it'll respond in real time. This isn't pre-recorded. The AI is
generating the answer and the avatar is speaking it live.

I built this in about three hours using HeyGen's Streaming Avatar API
and Claude as the brain. The avatar handles the presentation layer.
The AI handles the intelligence.

This is what customer support, sales demos, and training look like in
twenty twenty-six."
```

### 4.2 Multi-Scene Videos

**What it is:** A single HeyGen video with multiple scenes, each with different backgrounds, layouts, or content types.

**Scene types you can mix:**
1. **Talking head** — Avatar on solid/custom background
2. **Avatar + screen recording** — Avatar overlay on screen capture
3. **Avatar + image/slide** — Avatar alongside a presentation slide
4. **Text card** — Title or transition screen (no avatar)

**Best multi-scene structure for a 2-minute explainer:**

```
Scene 1 (0:00-0:15) — Hook + intro
  Layout: Avatar on branded background
  Script: "Here's the workflow that saves me ten hours a week."

Scene 2 (0:15-0:30) — Set the problem
  Layout: Avatar on solid background
  Script: Describe the pain point

Scene 3 (0:30-1:15) — Show the solution
  Layout: Screen recording + avatar overlay (bottom right)
  Script: Narrate the walkthrough

Scene 4 (1:15-1:45) — Results
  Layout: Avatar on solid background
  Script: Share outcomes and numbers

Scene 5 (1:45-2:00) — CTA
  Layout: Avatar on branded background
  Script: Tell them what to do next
```

### 4.3 Screen Recording + Avatar Overlay

**How to set up:**
1. Record your screen separately (OBS, Loom, or native recorder)
2. In HeyGen, create a new scene and select the screen recording layout
3. Upload your screen recording as the background
4. The avatar appears as a circle/rectangle overlay in one corner
5. Paste your narration script — the avatar speaks over the screen recording

**Tips:**
- Pause your screen recording at key moments (hold still for 2-3 seconds) to let the narration catch up
- Avoid rapid mouse movements — they distract from the avatar's narration
- Highlight or zoom into relevant UI elements before recording
- Keep screen recordings at 1920x1080 even if final output is smaller

### 4.4 Custom Voice + Avatar Combination

**Voice cloning options in HeyGen:**
- **Instant Voice Clone:** Upload 1-2 minutes of clear audio. Produces a usable clone in minutes.
- **Professional Voice Clone:** Upload 5+ minutes of varied speech. Higher quality, more natural intonation.
- **ElevenLabs integration:** Clone your voice in ElevenLabs (often higher quality), then use HeyGen's API to pair it with your avatar.

**Best practices for voice cloning source audio:**
- Record in a quiet room with no echo
- Speak at your natural pace — don't perform or project
- Read varied content (not a single monotone passage)
- Include questions, statements, and exclamations for intonation range
- 3-5 minutes of audio is the sweet spot for quality vs. effort

**Combining custom voice + custom avatar:**
1. Create your Instant Avatar (requires a 2-5 minute video recording of yourself)
2. Create your voice clone (upload audio separately)
3. When creating a video, select your custom avatar AND your custom voice
4. This is the highest-fidelity option — looks like you, sounds like you

### 4.5 API Automation for Batch Creation

**HeyGen API v2 — Key Endpoints:**

```
POST /v2/video/generate
  → Create a video from a script + avatar + voice configuration
  → Returns a video_id for status polling

GET /v2/video/{video_id}
  → Check generation status (processing, completed, failed)
  → Returns download URL when complete

GET /v2/avatars
  → List available avatars (stock + your custom avatars)

GET /v2/voices
  → List available voices (stock + your cloned voices)
```

**Batch creation workflow (pseudocode):**

```python
import requests
import time

API_KEY = "your-heygen-api-key"
BASE = "https://api.heygen.com"

headers = {
    "X-Api-Key": API_KEY,
    "Content-Type": "application/json"
}

scripts = [
    {"title": "Content Repurposing", "text": "I turned one blog post..."},
    {"title": "Knowledge Base", "text": "Your team has a knowledge base..."},
    {"title": "Not an Expert", "text": "Stop waiting until you're an expert..."},
    {"title": "3 Automations", "text": "If you run a small team..."},
    {"title": "AI Avatars", "text": "Yes this video was made with an AI avatar..."},
]

video_ids = []

# Submit all videos
for script in scripts:
    payload = {
        "video_inputs": [{
            "character": {
                "type": "avatar",
                "avatar_id": "your_avatar_id",
                "avatar_style": "normal"
            },
            "voice": {
                "type": "text",
                "input_text": script["text"],
                "voice_id": "your_voice_id"
            },
            "background": {
                "type": "color",
                "value": "#faf7f2"
            }
        }],
        "dimension": {"width": 1080, "height": 1080}
    }

    resp = requests.post(f"{BASE}/v2/video/generate",
                         json=payload, headers=headers)
    video_id = resp.json()["data"]["video_id"]
    video_ids.append({"title": script["title"], "id": video_id})
    print(f"Submitted: {script['title']} → {video_id}")

# Poll for completion
for video in video_ids:
    while True:
        resp = requests.get(f"{BASE}/v2/video/{video['id']}",
                           headers=headers)
        status = resp.json()["data"]["status"]
        if status == "completed":
            url = resp.json()["data"]["video_url"]
            print(f"Done: {video['title']} → {url}")
            break
        elif status == "failed":
            print(f"Failed: {video['title']}")
            break
        time.sleep(10)
```

**n8n automation approach:**
1. **Trigger:** New row in Google Sheet (each row = one script)
2. **HTTP Request node:** POST to HeyGen API with script from the sheet
3. **Wait node:** Poll for completion every 15 seconds
4. **HTTP Request node:** Download completed video
5. **Google Drive node:** Upload to a designated folder
6. **Slack/Email node:** Notify you when all videos are ready

**Cost considerations:**
- HeyGen API credits are consumed per video minute generated
- A 60-second video = 1 credit (pricing varies by plan)
- Batch of 5 x 60-second videos = 5 credits
- Enterprise plans offer volume discounts
- Check current pricing at heygen.com/pricing

---

## 5. Blog Post Outline

### Title Options (pick one):
1. "The Complete HeyGen Production Guide: From Script to Published Video"
2. "How I Produce 5 AI Avatar Videos in One Afternoon (Complete HeyGen Workflow)"
3. "AI Avatar Videos for Business: A Practitioner's Guide to HeyGen"

### Target: 2,500-3,500 words | Reading time: 12-15 minutes

```
## Introduction (300 words)
- Open with: "I produce 5 professional-looking videos every week. I don't
  have a studio, a camera operator, or a video editing background."
- Explain what HeyGen is (one paragraph, not a product pitch)
- Who this guide is for: consultants, educators, small business owners
  who know they should be creating video content but keep putting it off
- What you'll learn: the exact workflow from blank page to published video
- Credibility line: "I've produced [X] videos this way over the past
  [Y] months and use them for LinkedIn, courses, and client presentations"

## Section 1: Why AI Avatar Video (400 words)
- The video content gap: everyone knows video works, few people do it
- Traditional barriers: equipment, editing skills, time, camera anxiety
- What AI avatars change: you write, the avatar performs
- Honest limitations: it's not perfect, and here's where it falls short
- When to use avatar video vs. real camera (decision framework)

## Section 2: Setting Up HeyGen (500 words)
- Account setup and plan selection (which plan for which use case)
- Creating your Instant Avatar (step-by-step with screenshots)
- Voice cloning: how to record source audio for best results
- Choosing backgrounds: what works, what doesn't
- The settings I use for every video (aspect ratio, resolution, captions)

## Section 3: Writing Scripts That Sound Human (600 words)
- The #1 mistake: writing blog posts and pasting them as scripts
- Word count targets by video length (the 145 WPM rule)
- Sentence structure for avatar delivery
- The hook-context-value-CTA framework
- Things that trip up AI avatars (acronyms, URLs, parentheticals)
- Three example scripts (short, medium, long) with annotations

## Section 4: The Production Workflow (500 words)
- My exact process: script → HeyGen → caption → post
- Batch production: how to make 5 videos in 2 hours
- Multi-scene videos: when and how to use them
- Screen recording + avatar overlay for tutorials
- Quality checklist before publishing

## Section 5: Distribution and Repurposing (400 words)
- One video → 10 content pieces (the cascade)
- Platform-specific formatting (LinkedIn 1:1, Reels 9:16, YouTube 16:9)
- Caption strategies for each platform
- Scheduling and posting cadence
- Engagement tactics that work with AI avatar content

## Section 6: Advanced Moves (400 words)
- API automation for batch creation
- Interactive avatars for websites
- Personalized video at scale (sales outreach)
- Multilingual content with HeyGen's translation
- Integrating with n8n for fully automated pipelines

## Section 7: Common Mistakes (300 words)
- List of 7-8 specific mistakes (see Section 6 of this document)
- For each: what people do wrong, and what to do instead

## Conclusion (200 words)
- Recap the core workflow
- Honest assessment: what AI avatar video is great for, what it isn't
- CTA: "DM me on LinkedIn if you want the script templates"
- Link to KAIAK services / AI consultation

## Bonus: Resources
- Link to HeyGen (affiliate if applicable)
- Link to CapCut for captioning
- Link to n8n for automation
- Link to ElevenLabs for voice cloning
- Your LinkedIn for examples
```

### SEO Strategy for the Post:
- **Primary keyword:** "HeyGen tutorial" or "HeyGen workflow"
- **Secondary:** "AI avatar video for business", "HeyGen script writing", "AI video production"
- **Include:** Screenshots of your HeyGen dashboard, before/after comparisons, embedded video examples
- **Internal links:** Link to your other AI workflow posts
- **Featured image:** Show your avatar in HeyGen's editor (screenshot + branded overlay)

---

## 6. Common Mistakes — What to Avoid

### Mistake 1: Writing Blog Posts as Scripts
**What happens:** The avatar reads a dense, complex paragraph and it sounds like a robot reading an essay.
**Fix:** Write conversationally. Read it aloud first. If you wouldn't say it in a conversation, rewrite it.

### Mistake 2: Making Videos Too Long
**What happens:** You write a 3-minute script for LinkedIn. Nobody watches past 45 seconds.
**Fix:** LinkedIn/social: 45-75 seconds max. Course content: 2-3 minutes per segment. If you need longer, split into multiple videos.

### Mistake 3: Ignoring Captions
**What happens:** 80%+ of LinkedIn video is watched on mute. No captions = no viewers.
**Fix:** Always add captions. Use HeyGen's built-in option, CapCut, or Descript. Bold key phrases for scannability.

### Mistake 4: Using Stock Avatars When You Should Use Your Own
**What happens:** Your content looks generic and impersonal. No brand building.
**Fix:** Create an Instant Avatar of yourself. It takes 5 minutes to record the source video. Your face + your voice = your brand.

### Mistake 5: Not Testing Pronunciation
**What happens:** The avatar butchers "n8n" (it might say "nate-n" or "en-eight-en"), technical terms, or proper nouns.
**Fix:** Preview every video before generating. For problem words, phonetically spell them out or find simpler alternatives. Write "n-8-n" or "n eight n" if the avatar struggles with "n8n."

### Mistake 6: Overproducing the Video
**What happens:** You add background music, text animations, transitions, lower thirds, and a flashy intro. The video feels corporate and inauthentic.
**Fix:** For LinkedIn/social, less is more. Clean background, clear avatar, captions. That's it. Save production value for course content and client presentations.

### Mistake 7: No Hook in the First 3 Seconds
**What happens:** You open with "Hey everyone, welcome to another video where I'm going to talk about..." and everyone scrolls past.
**Fix:** First sentence = bold statement, question, or contrarian take. No greetings. No intros. Hook immediately.

### Mistake 8: Same Background, Same Angle, Every Video
**What happens:** Your feed looks monotonous. People stop watching because every video looks identical.
**Fix:** Rotate between 3-4 backgrounds. Use different aspect ratios for different platforms. Occasionally switch between talking-head and screen-recording overlay formats.

### Mistake 9: Not Matching Avatar Gestures to Content
**What happens:** The avatar is gesturing enthusiastically while delivering serious content, or standing still during an exciting reveal.
**Fix:** HeyGen offers gesture/emotion settings on some avatar types. Use "normal" for most content, "happy" for positive reveals, "serious" for problem-framing sections. Test before committing.

### Mistake 10: Forgetting the CTA
**What happens:** Great content, no ask. Viewers enjoy the video and scroll on.
**Fix:** Every video ends with one clear CTA: follow, comment, DM a keyword, or click a link. Only one — don't give three options.

---

## 7. HeyGen vs. Alternatives — Quick Comparison

| Feature | HeyGen | Synthesia | D-ID | Colossyan |
|---|---|---|---|---|
| Custom avatar (your face) | Yes (Instant Avatar) | Yes (requires studio recording) | Yes (photo-based) | Yes |
| Voice cloning | Yes (built-in) | Yes | Limited | Yes |
| Interactive/streaming avatar | Yes (Streaming Avatar API) | No | Yes (Live Portrait) | No |
| Multi-scene editor | Yes | Yes | No | Yes |
| Screen recording overlay | Yes | No | No | No |
| API for batch creation | Yes (v2 API) | Yes | Yes | Yes |
| Starting price (approx.) | $29/mo Creator | $29/mo Starter | $5.99/mo | $28/mo |
| Best for | All-around, UGC, API | Enterprise training | Quick clips | L&D/training |

**Why HeyGen for KAIAK's use case:**
- Instant Avatar creation is fast and doesn't require a studio
- Screen recording overlay is essential for tutorial content
- Interactive Avatar is a powerful demo piece for showcasing AI capabilities
- API is well-documented for automation workflows (fits the n8n pipeline story)
- UGC-style output looks more authentic than Synthesia's corporate feel

---

## 8. Content Ideas — 20 HeyGen Videos Benedict Can Make

### LinkedIn Thought Leadership (1:1, 45-60s each)
1. "The 3 AI tools I use every single day"
2. "Why most AI automation projects fail (and the one thing that fixes it)"
3. "I automated my entire content pipeline — here's the stack"
4. "The difference between AI tools and AI systems"
5. "Why I stopped trying to be an AI expert"
6. "The boring automation that saves me the most time"
7. "What I wish I knew before building my first AI workflow"
8. "AI won't replace you. A person using AI will."
9. "The one question to ask before automating anything"
10. "How I use AI avatars for business (and why it's not cheating)"

### Course Content (16:9, 90-120s each)
11. "Module Intro: What You'll Build in This Course"
12. "Setting Up Your First n8n Workflow"
13. "Connecting Claude's API to Your Automation"
14. "Building a Content Repurposing Pipeline"
15. "Creating an AI-Powered Knowledge Base"

### Explainer/Walkthrough (16:9 with screen overlay, 90-120s each)
16. "How I Use Claude for Content Strategy"
17. "My n8n Dashboard Tour: 5 Active Workflows"
18. "Setting Up HeyGen: From Zero to First Video in 10 Minutes"
19. "How to Clone Your Voice for AI Videos"
20. "The Full Pipeline: Blog Post to 12 Content Pieces in 40 Minutes"

---

## 9. Quick-Reference: Script Templates

### Template A: The Hot Take (45 seconds)

```
[CONTROVERSIAL OR SURPRISING STATEMENT — 1 sentence]

[Pause — new paragraph]

Here's what I mean.

[EXPLANATION — 2-3 sentences explaining why this is true]

[EXAMPLE — 1-2 sentences with a specific, concrete example]

[REFRAME — 1 sentence that gives the viewer a new way to think about it]

[CTA — 1 question to drive comments]
```

### Template B: The How-To (75 seconds)

```
[RESULT STATEMENT — what the viewer will be able to do]

[CONTEXT — why this matters, 1-2 sentences]

Step one. [Short description of first action]

Step two. [Short description of second action]

Step three. [Short description of third action]

[RESULT — what happens when you do these three things]

[CTA — "Try this and tell me how it goes" or "Follow for more workflows"]
```

### Template C: The Story (60 seconds)

```
[SITUATION — set the scene in 1-2 sentences]

[PROBLEM — what was going wrong, 1-2 sentences]

[TURNING POINT — what changed, 1 sentence]

[SOLUTION — what you did, 2-3 sentences]

[RESULT — the outcome with a specific number]

[LESSON — the one takeaway, 1 sentence]

[CTA — question or follow prompt]
```

### Template D: The Myth Buster (50 seconds)

```
[STATE THE MYTH — "Everyone says..." or "The common advice is..."]

[DISAGREE — "That's wrong." or "Here's the problem with that."]

[EVIDENCE — why it's wrong, 2-3 sentences with specifics]

[TRUTH — what actually works, 2-3 sentences]

[CTA — "What do you think? Am I wrong? Tell me in the comments."]
```

---

*Reference document prepared April 9, 2026. Verify HeyGen feature availability and API endpoints at docs.heygen.com before implementation.*
