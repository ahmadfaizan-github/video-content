import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface DiffLine { text: string; type: "added" | "removed" | "context" }
interface DiffSlideProps { title: string; filename: string; lines: DiffLine[] }

export const DiffSlide: React.FC<DiffSlideProps> = ({ title, filename, lines }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ts = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const ws = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 16, stiffness: 80 } });
  const linesRevealed = interpolate(frame, [10, 10 + lines.length * 3], [0, lines.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [80, 88], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const LINE_COLORS = { added: { bg: "rgba(0, 230, 118, 0.08)", border: COLORS.success, prefix: "+", color: COLORS.success }, removed: { bg: "rgba(255, 59, 59, 0.08)", border: COLORS.danger, prefix: "-", color: COLORS.danger }, context: { bg: "transparent", border: "transparent", prefix: " ", color: COLORS.textSecondary } };

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: 1 }}>
      <div style={{ position: "absolute", top: 100, left: 140, display: "flex", alignItems: "center", gap: 16, opacity: interpolate(ts, [0, 1], [0, 1]), transform: `translateX(${interpolate(ts, [0, 1], [-80, 0])}px)` }}>
        <div style={{ width: 4, height: 40, background: COLORS.yellow }} />
        <div style={{ fontSize: SIZES.sectionTitle, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.white }}>{title}</div>
      </div>

      <div style={{ width: 1500, marginTop: 80, opacity: interpolate(ws, [0, 1], [0, 1]), transform: `translateY(${interpolate(ws, [0, 1], [40, 0])}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: COLORS.surfaceLight, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottom: `1px solid ${COLORS.surfaceLighter}` }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#333" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#333" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#333" }} />
          <span style={{ marginLeft: 12, fontSize: 13, fontFamily: FONTS.mono, color: COLORS.textMuted }}>{filename}</span>
        </div>
        <div style={{ background: COLORS.surface, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: "16px 0", border: `1px solid ${COLORS.surfaceLighter}`, borderTop: "none" }}>
          {lines.map((line, i) => {
            const lc = LINE_COLORS[line.type];
            const lineOpacity = interpolate(linesRevealed - i, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ display: "flex", height: 32, alignItems: "center", background: lc.bg, borderLeft: `3px solid ${lc.border}`, opacity: lineOpacity }}>
                <span style={{ width: 30, textAlign: "center", fontSize: 16, fontFamily: FONTS.mono, color: lc.color, fontWeight: 700 }}>{lc.prefix}</span>
                <span style={{ fontSize: 18, fontFamily: FONTS.mono, color: lc.color, whiteSpace: "pre" }}>{line.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
