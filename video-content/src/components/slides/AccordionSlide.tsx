import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface AccordionItem { title: string; content: string; expandAt: number }
interface AccordionSlideProps { title: string; items: AccordionItem[] }

export const AccordionSlide: React.FC<AccordionSlideProps> = ({ title, items }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ts = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const exitOpacity = interpolate(frame, [80, 88], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ padding: `120px ${SIZES.pagePadding * 2}px`, opacity: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: interpolate(ts, [0, 1], [0, 1]), transform: `translateX(${interpolate(ts, [0, 1], [-80, 0])}px)`, marginBottom: 36 }}>
        <div style={{ width: 4, height: 44, background: COLORS.yellow }} />
        <div style={{ fontSize: SIZES.sectionTitle, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.white }}>{title}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {items.map((item, i) => {
          const itemS = spring({ frame: Math.max(0, frame - 6 - i * 4), fps, config: { damping: 14, stiffness: 80 } });
          const isExpanded = frame >= item.expandAt;
          const expandProgress = isExpanded ? interpolate(frame, [item.expandAt, item.expandAt + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;

          return (
            <div key={i} style={{ opacity: interpolate(itemS, [0, 1], [0, 1]), transform: `translateX(${interpolate(itemS, [0, 1], [30, 0])}px)` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", background: isExpanded ? COLORS.surfaceLight : COLORS.surface, border: `1px solid ${isExpanded ? COLORS.yellowDim : COLORS.surfaceLighter}`, borderLeft: isExpanded ? `3px solid ${COLORS.yellow}` : `3px solid transparent`, cursor: "pointer" }}>
                <span style={{ fontSize: SIZES.body, fontWeight: 700, fontFamily: FONTS.heading, color: isExpanded ? COLORS.yellow : COLORS.white }}>{item.title}</span>
                <span style={{ fontSize: 24, color: COLORS.textDim, transform: `rotate(${expandProgress * 180}deg)`, display: "inline-block" }}>v</span>
              </div>
              {expandProgress > 0 && (
                <div style={{ padding: "16px 24px", background: COLORS.surfaceLight, borderLeft: `3px solid ${COLORS.yellow}`, borderBottom: `1px solid ${COLORS.surfaceLighter}`, opacity: expandProgress, maxHeight: 200 * expandProgress, overflow: "hidden" }}>
                  <div style={{ fontSize: SIZES.bodySmall, fontFamily: FONTS.heading, color: COLORS.textSecondary, lineHeight: 1.5, fontWeight: 400 }}>{item.content}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
