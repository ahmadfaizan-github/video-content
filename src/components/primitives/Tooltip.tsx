import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface TooltipProps {
  text: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  color?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  text,
  delay = 0,
  direction = "up",
  color = COLORS.yellow,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const scale = interpolate(s, [0, 1], [0.8, 1]);
  const opacity = interpolate(s, [0, 1], [0, 1]);

  const arrowSize = 8;
  const arrowStyle: React.CSSProperties = {
    position: "absolute",
    width: 0,
    height: 0,
  };

  if (direction === "up") {
    Object.assign(arrowStyle, {
      bottom: -arrowSize,
      left: "50%",
      marginLeft: -arrowSize,
      borderLeft: `${arrowSize}px solid transparent`,
      borderRight: `${arrowSize}px solid transparent`,
      borderTop: `${arrowSize}px solid ${COLORS.surfaceLight}`,
    });
  } else if (direction === "down") {
    Object.assign(arrowStyle, {
      top: -arrowSize,
      left: "50%",
      marginLeft: -arrowSize,
      borderLeft: `${arrowSize}px solid transparent`,
      borderRight: `${arrowSize}px solid transparent`,
      borderBottom: `${arrowSize}px solid ${COLORS.surfaceLight}`,
    });
  }

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <div
        style={{
          background: COLORS.surfaceLight,
          border: `1px solid ${color}`,
          padding: "8px 16px",
          fontFamily: FONTS.mono,
          fontSize: SIZES.label,
          color,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
      <div style={arrowStyle} />
    </div>
  );
};
