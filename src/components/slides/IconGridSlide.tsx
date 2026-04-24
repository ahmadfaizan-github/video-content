import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface IconGridItem { icon: string; label: string; description?: string }
interface IconGridSlideProps { title: string; items: IconGridItem[]; columns?: number }

export const IconGridSlide: React.FC<IconGridSlideProps> = ({ title, items, columns = 3 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ts = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const exitOpacity = interpolate(frame, [80, 88], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: 1 }}>
      <div style={{ position: "absolute", top: 100, left: 140, display: "flex", alignItems: "center", gap: 16, opacity: interpolate(ts, [0, 1], [0, 1]), transform: `translateX(${interpolate(ts, [0, 1], [-80, 0])}px)` }}>
        <div style={{ width: 4, height: 40, background: COLORS.yellow }} />
        <div style={{ fontSize: SIZES.sectionTitle, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.white }}>{title}</div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, width: columns * 320, justifyContent: "center", marginTop: 40 }}>
        {items.map((item, i) => {
          const d = 8 + i * 3;
          const s = spring({ frame: Math.max(0, frame - d), fps, config: { damping: 14, stiffness: 80 } });
          return (
            <div key={i} style={{ width: 300, padding: "28px 24px", background: COLORS.surfaceLight, border: `1px solid ${COLORS.surfaceLighter}`, textAlign: "center", opacity: interpolate(s, [0, 1], [0, 1]), transform: `translateY(${interpolate(s, [0, 1], [20, 0])}px)` }}>
              <div style={{ width: 52, height: 52, background: COLORS.yellowSubtle, border: `2px solid ${COLORS.yellow}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <span style={{ fontSize: 24, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.yellow }}>{item.icon}</span>
              </div>
              <div style={{ fontSize: SIZES.bodySmall, fontWeight: 700, fontFamily: FONTS.heading, color: COLORS.white, marginBottom: 6 }}>{item.label}</div>
              {item.description && <div style={{ fontSize: SIZES.label, fontFamily: FONTS.mono, color: COLORS.textDim, lineHeight: 1.4 }}>{item.description}</div>}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
