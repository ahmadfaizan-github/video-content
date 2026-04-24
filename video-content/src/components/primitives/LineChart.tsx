import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../../brand/theme";

interface LineChartProps {
  data: number[];
  labels?: string[];
  width?: number;
  height?: number;
  color?: string;
  delay?: number;
  showArea?: boolean;
  showDots?: boolean;
  showGrid?: boolean;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  labels,
  width = 800,
  height = 400,
  color = COLORS.yellow,
  delay = 0,
  showArea = true,
  showDots = true,
  showGrid = true,
}) => {
  const frame = useCurrentFrame();
  const pad = { top: 20, right: 20, bottom: 40, left: 50 };
  const cw = width - pad.left - pad.right;
  const ch = height - pad.top - pad.bottom;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const drawProgress = interpolate(frame, [delay, delay + 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const points = data.map((val, i) => ({
    x: pad.left + (i / (data.length - 1)) * cw,
    y: pad.top + ch - ((val - min) / range) * ch,
  }));

  const pathData = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`).join(" ");
  const areaData = `${pathData} L ${points[points.length - 1].x},${pad.top + ch} L ${pad.left},${pad.top + ch} Z`;

  return (
    <svg width={width} height={height}>
      {/* Grid */}
      {showGrid && [0.25, 0.5, 0.75, 1].map((t) => (
        <g key={t}>
          <line x1={pad.left} y1={pad.top + ch * (1 - t)} x2={pad.left + cw} y2={pad.top + ch * (1 - t)} stroke={COLORS.surfaceLighter} strokeWidth={1} />
          <text x={pad.left - 8} y={pad.top + ch * (1 - t) + 4} fill={COLORS.textDim} fontSize={11} fontFamily="'JetBrains Mono'" textAnchor="end">
            {(min + range * t).toFixed(0)}
          </text>
        </g>
      ))}

      {/* Area fill */}
      {showArea && <path d={areaData} fill={color} opacity={0.06 * drawProgress} />}

      {/* Line */}
      <path d={pathData} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={cw * 4} strokeDashoffset={cw * 4 * (1 - drawProgress)} />

      {/* Dots */}
      {showDots && points.map((p, i) => {
        const dotProgress = interpolate(drawProgress, [i / data.length, (i + 0.5) / data.length], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return <circle key={i} cx={p.x} cy={p.y} r={4 * dotProgress} fill={color} />;
      })}

      {/* X-axis labels */}
      {labels && labels.map((label, i) => (
        <text key={i} x={pad.left + (i / (labels.length - 1)) * cw} y={height - 8} fill={COLORS.textDim} fontSize={11} fontFamily="'JetBrains Mono'" textAnchor="middle">
          {label}
        </text>
      ))}
    </svg>
  );
};
