import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../../brand/theme";

interface WaveformBarProps {
  bars?: number;
  width?: number;
  height?: number;
  color?: string;
}

export const WaveformBar: React.FC<WaveformBarProps> = ({ bars = 20, width = 200, height = 40, color = COLORS.yellow }) => {
  const frame = useCurrentFrame();
  const barW = (width - (bars - 1) * 2) / bars;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, height }}>
      {Array.from({ length: bars }, (_, i) => {
        const h = interpolate(Math.sin(frame * 0.12 + i * 0.7), [-1, 1], [height * 0.15, height]);
        return <div key={i} style={{ width: barW, height: h, background: color, opacity: 0.6 + 0.4 * Math.sin(frame * 0.1 + i) }} />;
      })}
    </div>
  );
};
