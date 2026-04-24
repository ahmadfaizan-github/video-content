import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface TransitionSlideProps {
  text: string;
  variant?: "wipe" | "pulse" | "flash";
}

export const TransitionSlide: React.FC<TransitionSlideProps> = ({
  text,
  variant = "wipe",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // All variants: simple fade in, hold, fade out
  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [30, 42], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div
        style={{
          fontSize: SIZES.heroTitle,
          fontWeight: 900,
          fontFamily: FONTS.heading,
          color: COLORS.yellow,
          letterSpacing: -4,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
