import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../../brand/theme";

interface NumberCircleProps {
  number: number;
  delay?: number;
  size?: number;
  filled?: boolean;
}

export const NumberCircle: React.FC<NumberCircleProps> = ({
  number,
  delay = 0,
  size = 48,
  filled = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 12, stiffness: 120 },
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
        background: filled ? COLORS.yellow : "transparent",
        border: filled ? "none" : `2px solid ${COLORS.yellow}`,
        borderRadius: "50%",
        transform: `scale(${scale})`,
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontSize: size * 0.45,
          fontWeight: 800,
          fontFamily: FONTS.heading,
          color: filled ? COLORS.black : COLORS.yellow,
          lineHeight: 1,
        }}
      >
        {number}
      </span>
    </div>
  );
};
