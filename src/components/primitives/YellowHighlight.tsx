import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface YellowHighlightProps {
  children: React.ReactNode;
  delay?: number;
}

export const YellowHighlight: React.FC<YellowHighlightProps> = ({
  children,
  delay = 0,
}) => {
  const frame = useCurrentFrame();

  const bgWidth = interpolate(frame, [delay, delay + 10], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textOpacity = interpolate(frame, [delay + 5, delay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {/* Yellow background that wipes in */}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: `${bgWidth}%`,
          background: COLORS.yellow,
        }}
      />
      {/* Text */}
      <span
        style={{
          position: "relative",
          padding: "4px 12px",
          fontFamily: FONTS.mono,
          fontSize: SIZES.body,
          fontWeight: 700,
          color: COLORS.black,
          opacity: textOpacity,
        }}
      >
        {children}
      </span>
    </span>
  );
};
