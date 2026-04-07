import { z } from "zod";

export const frameworkDiagramSchema = z.object({
  title: z.string().default("Framework Title"),
  subtitle: z.string().optional(),
  layers: z
    .array(
      z.object({
        label: z.string(),
        description: z.string(),
        color: z.string(),
      })
    )
    .default([
      { label: "Step 1", description: "Description", color: "#8b5cf6" },
      { label: "Step 2", description: "Description", color: "#e2711d" },
      { label: "Step 3", description: "Description", color: "#22c55e" },
    ]),
  direction: z.enum(["top-down", "bottom-up"]).default("top-down"),
});

export const blogHeroVisualSchema = z.object({
  hookText: z.string().default("Stop doing this."),
  hookHighlight: z.string().optional(),
  category: z
    .enum([
      "Leadership",
      "AI in Education",
      "Systems Thinking",
      "Practical AI",
      "No-Admin Life",
    ])
    .default("Systems Thinking"),
  visualType: z
    .enum([
      "calendar",
      "inbox",
      "dashboard",
      "documents",
      "terminal",
      "workflow",
      "chat",
      "metrics",
    ])
    .default("dashboard"),
});

export const featuredImageSchema = z.object({
  hookText: z.string().default("Stop doing this."),
  hookHighlight: z.string().optional(),
  pillar: z
    .enum([
      "leadership",
      "systems-thinking",
      "practical-ai",
      "no-admin-life",
      "education",
    ])
    .default("practical-ai"),
  imagePath: z.string().default("blog/images/placeholder.png"),
});

export const blogHeaderSchema = z.object({
  hookText: z.string().default("Stop doing this."),
  hookHighlight: z.string().optional(),
  pillar: z
    .enum([
      "leadership",
      "systems-thinking",
      "practical-ai",
      "no-admin-life",
      "education",
    ])
    .default("practical-ai"),
});

export const callToActionSchema = z.object({
  headline: z.string().default("Ready to get started?"),
  subtext: z.string().optional(),
  buttonText: z.string().default("Book a Call"),
  buttonUrl: z.string().optional(),
  style: z.enum(["default", "minimal", "bold"]).default("default"),
});

export const blogHeroSchema = z.object({
  title: z.string().default("Blog Post Title"),
  subtitle: z.string().optional(),
  category: z
    .enum([
      "Leadership",
      "AI in Education",
      "Systems Thinking",
      "Practical AI",
      "No-Admin Life",
    ])
    .default("Leadership"),
  readTime: z.string().default("5 min read"),
});

export const statHighlightSchema = z.object({
  value: z.number().default(68),
  suffix: z.string().default("%"),
  label: z.string().default("Key Statistic"),
  description: z.string().optional(),
  source: z.string().optional(),
  accentColor: z.string().default("#e2711d"),
});

export const comparisonSplitSchema = z.object({
  leftTitle: z.string().default("Before"),
  rightTitle: z.string().default("After"),
  leftLabel: z.string().default("Before"),
  rightLabel: z.string().default("After"),
  leftItems: z
    .array(z.object({ text: z.string() }))
    .default([
      { text: "Item 1" },
      { text: "Item 2" },
      { text: "Item 3" },
    ]),
  rightItems: z
    .array(z.object({ text: z.string() }))
    .default([
      { text: "Item 1" },
      { text: "Item 2" },
      { text: "Item 3" },
    ]),
});
