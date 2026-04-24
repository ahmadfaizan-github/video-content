import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface MatrixCell { label: string; description?: string; accent?: boolean }
interface MatrixSlideProps { title: string; cells: MatrixCell[]; columns?: number; rowLabels?: string[]; colLabels?: string[] }

export const MatrixSlide: React.FC<MatrixSlideProps> = ({ title, cells, columns = 2, rowLabels, colLabels }) => {
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

      <div style={{ marginTop: 40 }}>
        {colLabels && (
          <div style={{ display: "flex", marginLeft: rowLabels ? 140 : 0, marginBottom: 8 }}>
            {colLabels.map((l, i) => (
              <div key={i} style={{ flex: 1, minWidth: 280, textAlign: "center", fontSize: SIZES.label, fontFamily: FONTS.mono, color: COLORS.yellow, textTransform: "uppercase", letterSpacing: 1 }}>{l}</div>
            ))}
          </div>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, width: columns * 284 + (rowLabels ? 140 : 0) }}>
          {cells.map((cell, i) => {
            const row = Math.floor(i / columns);
            const col = i % columns;
            const d = 8 + i * 3;
            const s = spring({ frame: Math.max(0, frame - d), fps, config: { damping: 14, stiffness: 80 } });
            const showRowLabel = col === 0 && rowLabels && rowLabels[row];
            return (
              <div key={i} style={{ display: "flex", alignItems: "stretch" }}>
                {showRowLabel && (
                  <div style={{ width: 136, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 16, fontSize: SIZES.label, fontFamily: FONTS.mono, color: COLORS.yellow, textTransform: "uppercase" }}>{rowLabels![row]}</div>
                )}
                <div style={{
                  width: 280, padding: "24px 20px", background: cell.accent ? COLORS.yellow : COLORS.surfaceLight,
                  border: `1px solid ${cell.accent ? COLORS.yellow : COLORS.surfaceLighter}`,
                  opacity: interpolate(s, [0, 1], [0, 1]), transform: `scale(${interpolate(s, [0, 1], [0.9, 1])})`,
                }}>
                  <div style={{ fontSize: SIZES.bodySmall, fontWeight: 800, fontFamily: FONTS.heading, color: cell.accent ? COLORS.black : COLORS.white, marginBottom: cell.description ? 6 : 0 }}>{cell.label}</div>
                  {cell.description && <div style={{ fontSize: SIZES.label, fontFamily: FONTS.mono, color: cell.accent ? "rgba(0,0,0,0.5)" : COLORS.textDim, lineHeight: 1.4 }}>{cell.description}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
