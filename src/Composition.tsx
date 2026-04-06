import { AbsoluteFill, Sequence } from "remotion";
import { PainPoints } from "./components/PainPoints";
import { SolutionReveal } from "./components/SolutionReveal";
import { Dashboard } from "./components/Dashboard";
import { BrandOutro } from "./components/BrandOutro";

export const HeroVideo = () => {
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(170deg, #faf7f2 0%, #f0ebe3 100%)",
      }}
    >
      {/* Subtle grid overlay */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,32,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,32,55,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Phase 1: Pain points (0-5s) */}
      <Sequence from={0} durationInFrames={160}>
        <PainPoints />
      </Sequence>

      {/* Phase 2: Solution reveal (5s-8.5s) */}
      <Sequence from={155} durationInFrames={110}>
        <SolutionReveal />
      </Sequence>

      {/* Phase 3: Dashboard (8s-14s) */}
      <Sequence from={250} durationInFrames={180}>
        <Dashboard />
      </Sequence>

      {/* Phase 4: Brand outro (13.5s-16s) */}
      <Sequence from={405} durationInFrames={75}>
        <BrandOutro />
      </Sequence>
    </AbsoluteFill>
  );
};

