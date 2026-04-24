import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface CalloutSlideProps {
  text: string;
  subtext?: string;
  variant?: "yellow" | "white" | "danger";
}

export const CalloutSlide: React.FC<CalloutSlideProps> = ({
  text,
  subtext,
  variant = "yellow",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textColor =
    variant === "yellow" ? COLORS.yellow :
    variant === "danger" ? COLORS.danger : COLORS.white;

  const textSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80, overshootClamping: false },
  });
  const textScale = interpolate(textSpring, [0, 1], [0.7, 1]);
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);

  const subOpacity = interpolate(frame, [15, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accent lines
  const lineWidth = interpolate(frame, [5, 25], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(frame, [75, 88], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: 1,
      }}
    >
      {/* Top line */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          width: lineWidth,
          height: 3,
          background: textColor,
          opacity: 0.3,
        }}
      />

      {/* Main text */}
      <div
        style={{
          transform: `scale(${textScale})`,
          opacity: textOpacity,
          textAlign: "center",
          maxWidth: 1400,
          padding: "0 100px",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            fontFamily: FONTS.heading,
            color: textColor,
            letterSpacing: -2,
            lineHeight: 1.1,
          }}
        >
          {text}
        </div>
      </div>

      {/* Subtext */}
      {subtext && (
        <div
          style={{
            opacity: subOpacity,
            marginTop: 24,
            fontSize: SIZES.body,
            fontFamily: FONTS.mono,
            color: COLORS.textDim,
            textAlign: "center",
          }}
        >
          {subtext}
        </div>
      )}

      {/* Bottom line */}
      <div
        style={{
          position: "absolute",
          bottom: "35%",
          width: lineWidth,
          height: 3,
          background: textColor,
          opacity: 0.3,
        }}
      />
    </AbsoluteFill>
  );
};
