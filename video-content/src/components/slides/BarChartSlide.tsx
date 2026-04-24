import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";
import { BarChart } from "../primitives/BarChart";

interface Bar { label: string; value: number; color?: string }
interface BarChartSlideProps { title: string; bars: Bar[]; horizontal?: boolean }

export const BarChartSlide: React.FC<BarChartSlideProps> = ({ title, bars, horizontal = false }) => {
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
        <BarChart bars={bars} delay={8} width={horizontal ? 1000 : 1200} height={horizontal ? bars.length * 48 : 400} horizontal={horizontal} />
      </div>
    </AbsoluteFill>
  );
};
