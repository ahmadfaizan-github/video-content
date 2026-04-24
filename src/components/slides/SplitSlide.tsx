import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface SplitSlideProps {
  title: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftLabel?: string;
  rightLabel?: string;
}

export const SplitSlide: React.FC<SplitSlideProps> = ({
  title,
  leftContent,
  rightContent,
  leftLabel,
  rightLabel,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleX = interpolate(titleSpring, [0, 1], [-80, 0]);

  // Left panel slides in from left
  const leftSpring = spring({
    frame: Math.max(0, frame - 6),
    fps,
    config: { damping: 16, stiffness: 80 },
  });
  const leftX = interpolate(leftSpring, [0, 1], [-60, 0]);
  const leftOpacity = interpolate(leftSpring, [0, 1], [0, 1]);

  // Right panel slides in from right
  const rightSpring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 16, stiffness: 80 },
  });
  const rightX = interpolate(rightSpring, [0, 1], [60, 0]);
  const rightOpacity = interpolate(rightSpring, [0, 1], [0, 1]);

  const exitOpacity = interpolate(frame, [80, 88], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: 1 }}>
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 140,
          transform: `translateX(${titleX}px)`,
          opacity: titleOpacity,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div style={{ width: 4, height: 40, background: COLORS.yellow }} />
        <div
          style={{
            fontSize: SIZES.sectionTitle,
            fontWeight: 800,
            fontFamily: FONTS.heading,
            color: COLORS.white,
          }}
        >
          {title}
        </div>
      </div>

      {/* Split panels */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: SIZES.pagePadding,
          right: SIZES.pagePadding,
          bottom: SIZES.pagePadding,
          display: "flex",
          gap: 24,
        }}
      >
        {/* Left */}
        <div
          style={{
            flex: 1,
            transform: `translateX(${leftX}px)`,
            opacity: leftOpacity,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {leftLabel && (
            <div
              style={{
                fontSize: SIZES.label,
                fontFamily: FONTS.mono,
                color: COLORS.yellow,
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {leftLabel}
            </div>
          )}
          <div
            style={{
              flex: 1,
              background: COLORS.surfaceLight,
              border: `1px solid ${COLORS.surfaceLighter}`,
              padding: SIZES.cardPadding,
              overflow: "hidden",
            }}
          >
            {leftContent}
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 2, background: COLORS.surfaceLighter, alignSelf: "stretch" }} />

        {/* Right */}
        <div
          style={{
            flex: 1,
            transform: `translateX(${rightX}px)`,
            opacity: rightOpacity,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {rightLabel && (
            <div
              style={{
                fontSize: SIZES.label,
                fontFamily: FONTS.mono,
                color: COLORS.yellow,
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {rightLabel}
            </div>
          )}
          <div
            style={{
              flex: 1,
              background: COLORS.surfaceLight,
              border: `1px solid ${COLORS.surfaceLighter}`,
              padding: SIZES.cardPadding,
              overflow: "hidden",
            }}
          >
            {rightContent}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
