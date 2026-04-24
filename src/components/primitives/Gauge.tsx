import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface GaugeProps {
  value: number; // 0-100
  label?: string;
  size?: number;
  delay?: number;
  color?: string;
  thresholds?: { warn: number; danger: number };
}

export const Gauge: React.FC<GaugeProps> = ({
  value,
  label,
  size = 200,
  delay = 0,
  color,
  thresholds = { warn: 60, danger: 80 },
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 20, stiffness: 40 } });
  const current = value * s;

  const autoColor = current > thresholds.danger ? COLORS.danger : current > thresholds.warn ? COLORS.yellow : COLORS.success;
  const fillColor = color || autoColor;

  const r = size / 2 - 16;
  const cx = size / 2;
  const cy = size / 2;
  const startAngle = Math.PI * 0.75;
  const endAngle = Math.PI * 2.25;
  const totalAngle = endAngle - startAngle;
  const currentAngle = startAngle + (current / 100) * totalAngle;

  const bgPath = describeArc(cx, cy, r, startAngle, endAngle);
  const fillPath = describeArc(cx, cy, r, startAngle, currentAngle);

  return (
    <div style={{ textAlign: "center" }}>
      <svg width={size} height={size * 0.75}>
        <path d={bgPath} fill="none" stroke={COLORS.surfaceLighter} strokeWidth={12} strokeLinecap="round" />
        <path d={fillPath} fill="none" stroke={fillColor} strokeWidth={12} strokeLinecap="round" />
        <text x={cx} y={cy - 5} textAnchor="middle" fill={fillColor} fontSize={size * 0.22} fontWeight={900} fontFamily="Inter">
          {Math.round(current)}
        </text>
        <text x={cx} y={cy + size * 0.12} textAnchor="middle" fill={COLORS.textDim} fontSize={12} fontFamily="'JetBrains Mono'">
          / 100
        </text>
      </svg>
      {label && (
        <div style={{ fontSize: SIZES.label, fontFamily: FONTS.mono, color: COLORS.textDim, marginTop: -10, textTransform: "uppercase", letterSpacing: 1 }}>
          {label}
        </div>
      )}
    </div>
  );
};

function describeArc(cx: number, cy: number, r: number, start: number, end: number): string {
  const x1 = cx + r * Math.cos(start);
  const y1 = cy + r * Math.sin(start);
  const x2 = cx + r * Math.cos(end);
  const y2 = cy + r * Math.sin(end);
  const large = end - start > Math.PI ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}
