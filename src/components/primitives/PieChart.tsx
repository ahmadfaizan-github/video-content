import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../../brand/theme";

interface Slice {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  slices: Slice[];
  size?: number;
  delay?: number;
  donut?: boolean;
  showLabels?: boolean;
}

export const PieChart: React.FC<PieChartProps> = ({
  slices,
  size = 300,
  delay = 0,
  donut = true,
  showLabels = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 20, stiffness: 40 } });
  const total = slices.reduce((sum, sl) => sum + sl.value, 0);
  const r = size / 2 - 10;
  const innerR = donut ? r * 0.6 : 0;
  const cx = size / 2;
  const cy = size / 2;

  let currentAngle = -Math.PI / 2;

  const arcs = slices.map((slice) => {
    const angle = (slice.value / total) * Math.PI * 2 * s;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const ix1 = cx + innerR * Math.cos(startAngle);
    const iy1 = cy + innerR * Math.sin(startAngle);
    const ix2 = cx + innerR * Math.cos(endAngle);
    const iy2 = cy + innerR * Math.sin(endAngle);
    const large = angle > Math.PI ? 1 : 0;

    const d = donut
      ? `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${large} 0 ${ix1} ${iy1} Z`
      : `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;

    const midAngle = startAngle + angle / 2;
    const labelR = r + 24;
    const lx = cx + labelR * Math.cos(midAngle);
    const ly = cy + labelR * Math.sin(midAngle);

    return { ...slice, d, lx, ly, midAngle };
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
      <svg width={size} height={size}>
        {arcs.map((arc, i) => (
          <path key={i} d={arc.d} fill={arc.color} stroke={COLORS.black} strokeWidth={2} />
        ))}
      </svg>
      {showLabels && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {slices.map((slice, i) => {
            const pct = ((slice.value / total) * 100).toFixed(0);
            const opacity = interpolate(s, [0.3 + i * 0.1, 0.5 + i * 0.1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, opacity }}>
                <div style={{ width: 14, height: 14, background: slice.color, flexShrink: 0 }} />
                <span style={{ fontSize: 16, fontFamily: FONTS.mono, color: COLORS.white }}>{slice.label}</span>
                <span style={{ fontSize: 14, fontFamily: FONTS.mono, color: COLORS.textDim }}>{pct}%</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
