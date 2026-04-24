import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";
import { Gauge } from "../primitives/Gauge";

interface GaugeItem { value: number; label: string; color?: string }
interface GaugeSlideProps { title: string; gauges: GaugeItem[] }

export const GaugeSlide: React.FC<GaugeSlideProps> = ({ title, gauges }) => {
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
      <div style={{ display: "flex", gap: 60, marginTop: 20 }}>
        {gauges.map((g, i) => (
          <Gauge key={i} value={g.value} label={g.label} size={240} delay={6 + i * 6} color={g.color} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
