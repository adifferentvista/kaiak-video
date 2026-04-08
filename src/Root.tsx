import "./index.css";
import { Composition } from "remotion";
import { HeroVideo } from "./Composition";
import { ToolShowcase } from "./components/ToolShowcase";
import { BeforeAfter } from "./components/BeforeAfter";
import { BeforeAfterPhosphor } from "./components/BeforeAfterPhosphor";
import { BeforeAfterHeroicons } from "./components/BeforeAfterHeroicons";
import { BeforeAfterFluent } from "./components/BeforeAfterFluent";
import { TestimonialSpotlight } from "./components/TestimonialSpotlight";
import { CourseOverview } from "./components/CourseOverview";
import { CourseOverviewHeroicons } from "./components/CourseOverviewHeroicons";
import { CourseOverviewFluent } from "./components/CourseOverviewFluent";
import { TerminalIntro } from "./components/TerminalIntro";
import { BarChart } from "./components/BarChart";
import { PerspectiveLaunch } from "./components/PerspectiveLaunch";
import {
  BlogHeader,
  FeaturedImage,
  BlogHero,
  BlogHeroVisual,
  StatHighlight,
  ComparisonSplit,
  FrameworkDiagram,
  CallToAction,
} from "./templates";
import {
  blogHeaderSchema,
  blogHeroSchema,
  blogHeroVisualSchema,
  statHighlightSchema,
  comparisonSplitSchema,
  frameworkDiagramSchema,
  callToActionSchema,
} from "./templates/schemas";
import { PerspectiveLaunchWindows } from "./components/PerspectiveLaunchWindows-20260407";
import { KineticTypography } from "./components/KineticTypography";
import { CodeDiff } from "./components/CodeDiff";
import { MapJourney } from "./components/MapJourney";
import { KineticMarketing } from "./components/KineticMarketing";
import { TransparentCTA } from "./components/TransparentCTA";
import { CinematicIntro } from "./components/CinematicIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ============================================
          1. ACTIVE — Currently being refined
          ============================================ */}
      {/* Featured Image composite template */}
      <Composition
        id="Active-FeaturedImage-MeetingAudit"
        component={FeaturedImage}

        defaultProps={{
          hookText: "27 recurring meetings.",
          hookHighlight: "I only needed 12.",
          pillar: "systems-thinking" as const,
          imagePath: "blog/images/meeting-audit.png",
        }}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />

      <Composition
        id="Active-FeaturedImage-NotebookLM"
        component={FeaturedImage}
        defaultProps={{
          hookText: "200 pages.",
          hookHighlight: "Zero hallucinations.",
          pillar: "practical-ai",
          imagePath: "blog/images/notebooklm-master-any-document.png",
        }}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />

      <Composition
        id="Active-FeaturedImage-InboxZero"
        component={FeaturedImage}

        defaultProps={{
          hookText: "3 hours a day on email.",
          hookHighlight: "Not anymore.",
          pillar: "practical-ai" as const,
          imagePath: "blog/images/no-admin-inbox-zero.png",
        }}
        durationInFrames={1}
        fps={30}
        width={1280}
        height={720}
      />

      {/* Blog Headers (static stills) */}
      <Composition
        id="Rejected-Header-Leadership"
        component={BlogHeader}
        schema={blogHeaderSchema}
        defaultProps={{
          hookText: "Your AI strategy can't be delegated.",
          hookHighlight: "Here's why.",
          pillar: "leadership" as const,
        }}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Rejected-Header-Education"
        component={BlogHeader}
        schema={blogHeaderSchema}
        defaultProps={{
          hookText: "68% of teachers.",
          hookHighlight: "Zero AI training.",
          pillar: "education" as const,
        }}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Rejected-Header-Systems"
        component={BlogHeader}
        schema={blogHeaderSchema}
        defaultProps={{
          hookText: "23 hours in meetings.",
          hookHighlight: "You only need 18.",
          pillar: "systems-thinking" as const,
        }}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Rejected-Header-PracticalAI"
        component={BlogHeader}
        schema={blogHeaderSchema}
        defaultProps={{
          hookText: "Weekend board reports?",
          hookHighlight: "10 minutes. Done.",
          pillar: "practical-ai" as const,
        }}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Rejected-Header-NoAdmin"
        component={BlogHeader}
        schema={blogHeaderSchema}
        defaultProps={{
          hookText: "I left early on Tuesday.",
          hookHighlight: "Nobody noticed.",
          pillar: "no-admin-life" as const,
        }}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* BlogHeroVisual (animated headers with floating panels) */}
      <Composition
        id="Rejected-VisualHero-Inbox"
        component={BlogHeroVisual}
        schema={blogHeroVisualSchema}
        defaultProps={{
          hookText: "47 emails sorted.",
          hookHighlight: "Zero willpower required.",
          category: "Practical AI" as const,
          visualType: "inbox" as const,
        }}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Rejected-VisualHero-Dashboard"
        component={BlogHeroVisual}
        schema={blogHeroVisualSchema}
        defaultProps={{
          hookText: "Your first 100 days.",
          hookHighlight: "5 systems that change everything.",
          category: "Leadership" as const,
          visualType: "dashboard" as const,
        }}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Rejected-VisualHero-Documents"
        component={BlogHeroVisual}
        schema={blogHeroVisualSchema}
        defaultProps={{
          hookText: "Weekend board reports?",
          hookHighlight: "10 minutes. Done.",
          category: "Practical AI" as const,
          visualType: "chat" as const,
        }}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* Meeting Audit — full blog image set */}
      <Composition
        id="Rejected-MeetingAudit-1-Hero"
        component={BlogHeroVisual}
        schema={blogHeroVisualSchema}
        defaultProps={{
          hookText: "23 hours in meetings.",
          hookHighlight: "You only need 18.",
          category: "Leadership" as const,
          visualType: "chat" as const,
        }}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Rejected-MeetingAudit-2-Framework"
        component={FrameworkDiagram}
        schema={frameworkDiagramSchema}
        defaultProps={{
          title: "The 3-Step Meeting Audit",
          subtitle: "A systematic approach to reclaiming your calendar",
          layers: [
            {
              label: "Catalog",
              description:
                "List every recurring meeting and its stated purpose",
              color: "#8b5cf6",
            },
            {
              label: "Classify",
              description:
                "Score each meeting: Decision, Information, or Ritual?",
              color: "#e2711d",
            },
            {
              label: "Cut or Convert",
              description: "Eliminate, shorten, or convert to async updates",
              color: "#22c55e",
            },
          ],
          direction: "top-down",
        }}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Rejected-MeetingAudit-3-Stat"
        component={StatHighlight}
        schema={statHighlightSchema}
        defaultProps={{
          value: 5,
          suffix: "hrs",
          label: "Reclaimed Every Week",
          description:
            "The average school leader spends 23 hours per week in meetings. Most can safely cut 5.",
          accentColor: "#e2711d",
        }}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Rejected-MeetingAudit-4-Compare"
        component={ComparisonSplit}
        schema={comparisonSplitSchema}
        defaultProps={{
          leftTitle: "Meetings to Cut",
          rightTitle: "Meetings to Keep",
          leftLabel: "Eliminate or Async",
          rightLabel: "Worth Your Time",
          leftItems: [
            { text: "Status updates (use a shared doc)" },
            { text: "FYI announcements (send an email)" },
            { text: "'Check-in' meetings with no agenda" },
            { text: "Meetings that could be a Loom video" },
          ],
          rightItems: [
            { text: "Strategic planning sessions" },
            { text: "Difficult conversations" },
            { text: "Cross-team decision-making" },
            { text: "Collaborative problem-solving" },
          ],
        }}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Rejected-MeetingAudit-5-CTA"
        component={CallToAction}
        schema={callToActionSchema}
        defaultProps={{
          headline: "Want help auditing your calendar?",
          subtext:
            "Book a free 90-minute strategy session and we'll identify your top 5 time-saving opportunities.",
          buttonText: "Book Your Free Strategy Call",
          style: "default",
        }}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* ============================================
          2. FAVORITES — Best compositions so far
          ============================================ */}
      <Composition
        id="Fav-PerspectiveLaunch"
        component={PerspectiveLaunch}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Fav-PerspectiveLaunch-Windows"
        component={PerspectiveLaunchWindows}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Fav-MapJourney"
        component={MapJourney}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Fav-CinematicIntro"
        component={CinematicIntro}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Fav-KineticTypography"
        component={KineticTypography}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Fav-CodeDiff"
        component={CodeDiff}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* ============================================
          3. BRAND VIDEOS — KAIAK marketing
          ============================================ */}
      <Composition
        id="Brand-HeroVideo"
        component={HeroVideo}
        durationInFrames={480}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Brand-ToolShowcase"
        component={ToolShowcase}
        durationInFrames={280}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Brand-BeforeAfter"
        component={BeforeAfter}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Brand-BeforeAfter-Heroicons"
        component={BeforeAfterHeroicons}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Brand-BeforeAfter-Fluent"
        component={BeforeAfterFluent}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Brand-TestimonialSpotlight"
        component={TestimonialSpotlight}
        durationInFrames={280}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Brand-CourseOverview"
        component={CourseOverview}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Brand-CourseOverview-Heroicons"
        component={CourseOverviewHeroicons}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Brand-CourseOverview-Fluent"
        component={CourseOverviewFluent}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* ============================================
          4. REFERENCE — Remotion prompt examples
          ============================================ */}
      <Composition
        id="Ref-Ref-KineticMarketing"
        component={KineticMarketing}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Ref-Ref-TransparentCTA"
        component={TransparentCTA}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* ============================================
          5. ARCHIVE — Old demos & tests
          ============================================ */}
      <Composition
        id="Old-BeforeAfter-Phosphor"
        component={BeforeAfterPhosphor}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Old-Blog-MeetingAudit"
        component={BlogHero}
        schema={blogHeroSchema}
        defaultProps={{
          title: "The Meeting Audit",
          subtitle: "How to Reclaim 5 Hours a Week",
          category: "Systems Thinking",
          readTime: "6 min read",
        }}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Old-Blog-AITrainingGap"
        component={BlogHero}
        schema={blogHeroSchema}
        defaultProps={{
          title: "68% of Teachers Have Zero AI Training",
          subtitle: "What that means for your school.",
          category: "AI in Education",
          readTime: "8 min read",
        }}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Old-Blog-NotebookLM"
        component={BlogHero}
        schema={blogHeroSchema}
        defaultProps={{
          title: "NotebookLM Ate My Board Report",
          subtitle: "And made it better.",
          category: "Practical AI",
          readTime: "5 min read",
        }}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Old-Stat-TeacherTraining"
        component={StatHighlight}
        schema={statHighlightSchema}
        defaultProps={{
          value: 68,
          suffix: "%",
          label: "of Teachers Have Zero AI Training",
          description:
            "Without structured training, schools risk falling behind.",
          source: "2025 EdTech Survey",
          accentColor: "#3b82f6",
        }}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Old-Stat-HoursSaved"
        component={StatHighlight}
        schema={statHighlightSchema}
        defaultProps={{
          value: 10,
          suffix: "+",
          label: "Hours Saved Every Week",
          description: "School leaders using KAIAK systems reclaim their time.",
          accentColor: "#e2711d",
        }}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Old-Compare-AutomateProtect"
        component={ComparisonSplit}
        schema={comparisonSplitSchema}
        defaultProps={{
          leftTitle: "Automate These",
          rightTitle: "Protect These",
          leftLabel: "Delegate to AI",
          rightLabel: "Keep Human",
          leftItems: [
            { text: "Email triage" },
            { text: "Report drafts" },
            { text: "Meeting prep" },
          ],
          rightItems: [
            { text: "Parent calls" },
            { text: "Staff reviews" },
            { text: "Crisis decisions" },
          ],
        }}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Old-TerminalIntro"
        component={TerminalIntro}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Old-BarChart"
        component={BarChart}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
