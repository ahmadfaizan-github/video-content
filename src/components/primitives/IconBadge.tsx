import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../../brand/theme";

interface IconBadgeProps {
  icon: string; // emoji or single char
  delay?: number;
  size?: number;
  bg?: string;
  color?: string;
}

export const IconBadge: React.FC<IconBadgeProps> = ({
  icon,
  delay = 0,
  size = 64,
  bg = COLORS.surfaceLight,
  color = COLORS.yellow,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 10, stiffness: 100, overshootClamping: false },
  });
  const scale = interpolate(s, [0, 1], [0, 1]);

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: bg,
        border: `2px solid ${color}`,
        borderRadius: size * 0.2,
        transform: `scale(${scale})`,
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontSize: size * 0.5,
          fontFamily: FONTS.heading,
          color,
          lineHeight: 1,
        }}
      >
        {icon}
      </span>
    </div>
  );
};
