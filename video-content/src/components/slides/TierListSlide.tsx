import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface TierListSlideProps { title: string; tiers: { tier: string; color: string; items: string[] }[] }

export const TierListSlide: React.FC<TierListSlideProps> = ({ title, tiers }) => {
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

      <div style={{ display: "flex", flexDirection: "column", gap: 4, width: 1300, marginTop: 40 }}>
        {tiers.map((tier, i) => {
          const d = 6 + i * 5;
          const s = spring({ frame: Math.max(0, frame - d), fps, config: { damping: 14, stiffness: 80 } });
          const opacity = interpolate(s, [0, 1], [0, 1]);
          const x = interpolate(s, [0, 1], [40, 0]);

          return (
            <div key={i} style={{ display: "flex", opacity, transform: `translateX(${x}px)` }}>
              <div style={{ width: 80, background: tier.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: SIZES.subheading, fontWeight: 900, fontFamily: FONTS.heading, color: COLORS.black }}>
                {tier.tier}
              </div>
              <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 8, padding: "12px 16px", background: COLORS.surfaceLight, border: `1px solid ${COLORS.surfaceLighter}`, alignItems: "center" }}>
                {tier.items.map((item, j) => (
                  <div key={j} style={{ padding: "6px 14px", background: COLORS.surface, border: `1px solid ${COLORS.surfaceLighter}`, fontSize: SIZES.label, fontFamily: FONTS.mono, color: COLORS.white }}>{item}</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
