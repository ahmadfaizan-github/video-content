import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../../brand/theme";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  delay?: number;
  strokeWidth?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 200,
  height = 60,
  color = COLORS.yellow,
  delay = 0,
  strokeWidth = 2,
}) => {
  const frame = useCurrentFrame();

  const drawProgress = interpolate(frame, [delay, delay + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  });

  const pathData = `M ${points.join(" L ")}`;
  const totalLength = data.length * 50; // approximate

  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLength}
        strokeDashoffset={totalLength * (1 - drawProgress)}
      />
      {/* End dot */}
      {drawProgress > 0.95 && (
        <circle
          cx={(data.length - 1) / (data.length - 1) * width}
          cy={height - ((data[data.length - 1] - min) / range) * height}
          r={4}
          fill={color}
        />
      )}
    </svg>
  );
};
