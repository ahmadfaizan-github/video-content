import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface PriceTagProps {
  price: string;
  change?: string;
  positive?: boolean;
  label?: string;
  delay?: number;
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = { sm: 28, md: 44, lg: 72 };

export const PriceTag: React.FC<PriceTagProps> = ({ price, change, positive, label, delay = 0, size = "md" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 14, stiffness: 80 } });

  return (
    <div style={{ opacity: interpolate(s, [0, 1], [0, 1]), transform: `scale(${interpolate(s, [0, 1], [0.9, 1])})` }}>
      {label && <div style={{ fontSize: SIZES.tiny, fontFamily: FONTS.mono, color: COLORS.textDim, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>}
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span style={{ fontSize: SIZE_MAP[size], fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.white }}>{price}</span>
        {change && (
          <span style={{ fontSize: SIZE_MAP[size] * 0.45, fontWeight: 600, fontFamily: FONTS.mono, color: positive ? COLORS.success : COLORS.danger }}>
            {positive ? "+" : ""}{change}
          </span>
        )}
      </div>
    </div>
  );
};
