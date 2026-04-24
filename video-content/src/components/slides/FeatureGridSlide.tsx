import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface Feature { title: string; description: string; highlight?: boolean }
interface FeatureGridSlideProps { title: string; features: Feature[]; columns?: number }

export const FeatureGridSlide: React.FC<FeatureGridSlideProps> = ({ title, features, columns = 2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ts = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const exitOpacity = interpolate(frame, [80, 88], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const colWidth = Math.floor(1400 / columns) - 12;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: 1 }}>
      <div style={{ position: "absolute", top: 100, left: 140, display: "flex", alignItems: "center", gap: 16, opacity: interpolate(ts, [0, 1], [0, 1]), transform: `translateX(${interpolate(ts, [0, 1], [-80, 0])}px)` }}>
        <div style={{ width: 4, height: 40, background: COLORS.yellow }} />
        <div style={{ fontSize: SIZES.sectionTitle, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.white }}>{title}</div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, width: colWidth * columns + 12 * (columns - 1), marginTop: 40 }}>
        {features.map((f, i) => {
          const d = 6 + i * 3;
          const s = spring({ frame: Math.max(0, frame - d), fps, config: { damping: 14, stiffness: 80 } });
          return (
            <div key={i} style={{
              width: colWidth, padding: "24px 24px",
              background: f.highlight ? COLORS.yellow : COLORS.surfaceLight,
              border: `1px solid ${f.highlight ? COLORS.yellow : COLORS.surfaceLighter}`,
              borderLeft: `3px solid ${f.highlight ? COLORS.black : COLORS.yellow}`,
              opacity: interpolate(s, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(s, [0, 1], [15, 0])}px)`,
            }}>
              <div style={{ fontSize: SIZES.bodySmall, fontWeight: 800, fontFamily: FONTS.heading, color: f.highlight ? COLORS.black : COLORS.white, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: SIZES.label, fontFamily: FONTS.mono, color: f.highlight ? "rgba(0,0,0,0.6)" : COLORS.textDim, lineHeight: 1.5 }}>{f.description}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
