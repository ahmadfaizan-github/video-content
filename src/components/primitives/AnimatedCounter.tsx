import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delay?: number;
  size?: number;
  color?: string;
  label?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  delay = 0,
  size = SIZES.heroTitle,
  color = COLORS.yellow,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 30, stiffness: 40 },
  });

  const currentValue = interpolate(progress, [0, 1], [0, value]);
  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  const formatted = currentValue.toFixed(decimals);
  // Add commas
  const parts = formatted.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const display = parts.join(".");

  return (
    <div style={{ textAlign: "center", opacity }}>
      <div
        style={{
          fontSize: size,
          fontWeight: 900,
          fontFamily: FONTS.heading,
          color,
          letterSpacing: -3,
          lineHeight: 1,
        }}
      >
        {prefix}
        {display}
        {suffix}
      </div>
      {label && (
        <div
          style={{
            fontSize: SIZES.bodySmall,
            fontFamily: FONTS.mono,
            color: COLORS.textDim,
            marginTop: 12,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
