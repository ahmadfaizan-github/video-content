import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface NumberedCard { title: string; description: string }
interface NumberedCardsSlideProps { title: string; cards: NumberedCard[]; columns?: number }

export const NumberedCardsSlide: React.FC<NumberedCardsSlideProps> = ({ title, cards, columns = 3 }) => {
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

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, width: columns * 420, marginTop: 40 }}>
        {cards.map((card, i) => {
          const d = 6 + i * 4;
          const s = spring({ frame: Math.max(0, frame - d), fps, config: { damping: 14, stiffness: 80 } });
          return (
            <div key={i} style={{ width: 400, padding: "28px 24px", background: COLORS.surfaceLight, border: `1px solid ${COLORS.surfaceLighter}`, borderTop: `3px solid ${COLORS.yellow}`, opacity: interpolate(s, [0, 1], [0, 1]), transform: `translateY(${interpolate(s, [0, 1], [20, 0])}px)` }}>
              <div style={{ fontSize: 48, fontWeight: 900, fontFamily: FONTS.heading, color: COLORS.yellow, opacity: 0.3, lineHeight: 1, marginBottom: 8 }}>{String(i + 1).padStart(2, "0")}</div>
              <div style={{ fontSize: SIZES.bodySmall, fontWeight: 700, fontFamily: FONTS.heading, color: COLORS.white, marginBottom: 8 }}>{card.title}</div>
              <div style={{ fontSize: SIZES.label, fontFamily: FONTS.mono, color: COLORS.textDim, lineHeight: 1.5 }}>{card.description}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
