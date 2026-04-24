import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";
import { Sparkline } from "../primitives/Sparkline";

interface Metric { label: string; value: string; change?: string; positive?: boolean; sparkData?: number[] }
interface MetricDashboardSlideProps { title: string; metrics: Metric[] }

export const MetricDashboardSlide: React.FC<MetricDashboardSlideProps> = ({ title, metrics }) => {
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

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, width: 1400, marginTop: 40, justifyContent: "center" }}>
        {metrics.map((m, i) => {
          const d = 6 + i * 4;
          const s = spring({ frame: Math.max(0, frame - d), fps, config: { damping: 14, stiffness: 80 } });
          return (
            <div key={i} style={{ opacity: interpolate(s, [0, 1], [0, 1]), transform: `translateY(${interpolate(s, [0, 1], [20, 0])}px)`, background: COLORS.surfaceLight, border: `1px solid ${COLORS.surfaceLighter}`, padding: "24px 28px", width: 320 }}>
              <div style={{ fontSize: SIZES.tiny, fontFamily: FONTS.mono, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{m.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: m.sparkData ? 12 : 0 }}>
                <span style={{ fontSize: 36, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.white }}>{m.value}</span>
                {m.change && <span style={{ fontSize: 16, fontFamily: FONTS.mono, fontWeight: 600, color: m.positive ? COLORS.success : COLORS.danger }}>{m.positive ? "+" : ""}{m.change}</span>}
              </div>
              {m.sparkData && <Sparkline data={m.sparkData} width={260} height={40} delay={d + 6} color={m.positive !== false ? COLORS.success : COLORS.danger} />}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
