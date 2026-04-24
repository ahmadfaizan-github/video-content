import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle grid pulse
  const gridOpacity = interpolate(
    Math.sin(frame * 0.03),
    [-1, 1],
    [0.025, 0.06]
  );

  return (
    <AbsoluteFill>
      {/* Pure black base */}
      <AbsoluteFill style={{ backgroundColor: "#000000" }} />

      {/* Dot grid — yellow tinted */}
      <AbsoluteFill
        style={{
          opacity: gridOpacity,
          backgroundImage: `radial-gradient(circle, rgba(251, 222, 0, 0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "20px 20px",
        }}
      />

      {/* Scanline overlay */}
      <AbsoluteFill
        style={{
          opacity: 0.02,
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(251, 222, 0, 0.04) 2px, rgba(251, 222, 0, 0.04) 4px)`,
        }}
      />

      {/* Vignette — pure black edges */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
