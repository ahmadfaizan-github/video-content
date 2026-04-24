import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface Bar {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  bars: Bar[];
  delay?: number;
  height?: number;
  width?: number;
  horizontal?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
  bars,
  delay = 0,
  height = 300,
  width = 600,
  horizontal = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const max = Math.max(...bars.map((b) => b.value));

  if (horizontal) {
    return (
      <div style={{ width, display: "flex", flexDirection: "column", gap: 12 }}>
        {bars.map((bar, i) => {
          const d = delay + i * 4;
          const s = spring({ frame: Math.max(0, frame - d), fps, config: { damping: 20, stiffness: 60 } });
          const barWidth = interpolate(s, [0, 1], [0, (bar.value / max) * 100]);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 80, fontSize: SIZES.tiny, fontFamily: FONTS.mono, color: COLORS.textDim, textAlign: "right" }}>
                {bar.label}
              </div>
              <div style={{ flex: 1, height: 24, background: COLORS.surfaceLighter }}>
                <div style={{ width: `${barWidth}%`, height: "100%", background: bar.color || COLORS.yellow }} />
              </div>
              <div style={{ width: 50, fontSize: SIZES.tiny, fontFamily: FONTS.mono, color: COLORS.textSecondary }}>
                {Math.round(bar.value * s)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const barWidth = Math.min(60, (width - bars.length * 8) / bars.length);
  return (
    <div style={{ width, height, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 8 }}>
      {bars.map((bar, i) => {
        const d = delay + i * 3;
        const s = spring({ frame: Math.max(0, frame - d), fps, config: { damping: 20, stiffness: 60 } });
        const barH = interpolate(s, [0, 1], [0, (bar.value / max) * (height - 40)]);
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: SIZES.tiny, fontFamily: FONTS.mono, color: COLORS.textSecondary, opacity: s }}>
              {Math.round(bar.value * s)}
            </div>
            <div style={{ width: barWidth, height: barH, background: bar.color || COLORS.yellow }} />
            <div style={{ fontSize: 12, fontFamily: FONTS.mono, color: COLORS.textDim, textAlign: "center", width: barWidth + 20 }}>
              {bar.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
