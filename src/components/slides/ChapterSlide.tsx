import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface ChapterSlideProps {
  number: string;
  title: string;
  subtitle?: string;
}

export const ChapterSlide: React.FC<ChapterSlideProps> = ({
  number,
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Number fades in gently
  const numOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const numScale = 1;

  // Horizontal line extends
  const lineWidth = interpolate(frame, [8, 25], [0, 600], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title slides in
  const titleSpring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 14, stiffness: 80 },
  });
  const titleX = interpolate(titleSpring, [0, 1], [80, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // Subtitle fades in
  const subOpacity = interpolate(frame, [18, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit
  const exitOpacity = interpolate(frame, [70, 85], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "flex-start",
        padding: `0 ${SIZES.pagePadding * 2}px`,
        opacity: 1,
      }}
    >
      {/* Chapter number */}
      <div
        style={{
          transform: `scale(${numScale})`,
          opacity: numOpacity,
          fontSize: 120,
          fontWeight: 900,
          fontFamily: FONTS.heading,
          color: COLORS.yellow,
          lineHeight: 1,
          marginBottom: 16,
        }}
      >
        {number}
      </div>

      {/* Yellow line */}
      <div
        style={{
          width: lineWidth,
          height: 4,
          background: COLORS.yellow,
          marginBottom: 24,
        }}
      />

      {/* Title */}
      <div
        style={{
          transform: `translateX(${titleX}px)`,
          opacity: titleOpacity,
          fontSize: SIZES.slideTitle,
          fontWeight: 800,
          fontFamily: FONTS.heading,
          color: COLORS.white,
          letterSpacing: -1,
        }}
      >
        {title}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            opacity: subOpacity,
            fontSize: SIZES.body,
            fontFamily: FONTS.mono,
            color: COLORS.textDim,
            marginTop: 12,
          }}
        >
          {subtitle}
        </div>
      )}
    </AbsoluteFill>
  );
};
