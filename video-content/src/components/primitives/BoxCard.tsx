import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SIZES } from "../../brand/theme";

interface BoxCardProps {
  children: React.ReactNode;
  delay?: number;
  width?: number | string;
  accent?: "yellow" | "danger" | "info" | "success" | "none";
}

const ACCENT_COLORS = {
  yellow: COLORS.yellow,
  danger: COLORS.danger,
  info: COLORS.info,
  success: COLORS.success,
  none: "transparent",
};

export const BoxCard: React.FC<BoxCardProps> = ({
  children,
  delay = 0,
  width = "auto",
  accent = "none",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 16, stiffness: 80 },
  });
  const y = interpolate(s, [0, 1], [40, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translateY(${y}px)`,
        opacity,
        width,
        background: COLORS.surfaceLight,
        border: `1px solid ${COLORS.surfaceLighter}`,
        borderLeft: accent !== "none" ? `3px solid ${ACCENT_COLORS[accent]}` : undefined,
        padding: SIZES.cardPadding,
        position: "relative",
      }}
    >
      {children}
    </div>
  );
};
