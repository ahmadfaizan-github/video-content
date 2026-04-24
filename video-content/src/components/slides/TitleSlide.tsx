import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface TitleSlideProps {
  topic: string;
  title: string;
  subtitle: string;
  pill: string;
}

export const TitleSlide: React.FC<TitleSlideProps> = ({
  topic,
  title,
  subtitle,
  pill,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pillSpring = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const pillY = interpolate(pillSpring, [0, 1], [-60, 0]);
  const pillOpacity = interpolate(pillSpring, [0, 1], [0, 1]);

  const topicSpring = spring({
    frame: Math.max(0, frame - 6),
    fps,
    config: { damping: 10, stiffness: 100, overshootClamping: false },
  });
  const topicScale = interpolate(topicSpring, [0, 1], [0.3, 1]);
  const topicOpacity = interpolate(topicSpring, [0, 1], [0, 1]);

  const titleSpring = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 14, stiffness: 80 },
  });
  const titleX = interpolate(titleSpring, [0, 1], [200, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  const subtitleOpacity = interpolate(frame, [20, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [20, 32], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineWidth = interpolate(frame, [25, 45], [0, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitProgress = interpolate(frame, [70, 88], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitX = interpolate(exitProgress, [0, 1], [0, -120]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        transform: 'translateX(0px)',
        opacity: 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 280,
          transform: `translateY(${pillY}px)`,
          opacity: pillOpacity,
        }}
      >
        <div
          style={{
            padding: "8px 24px",
            borderRadius: 50,
            border: `1.5px solid ${COLORS.yellowDim}`,
            background: COLORS.yellowSubtle,
            color: COLORS.yellow,
            fontSize: SIZES.caption,
            fontFamily: FONTS.mono,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          {pill}
        </div>
      </div>

      <div
        style={{
          transform: `scale(${topicScale})`,
          opacity: topicOpacity,
          marginTop: -20,
        }}
      >
        <div
          style={{
            fontSize: SIZES.heroTitle,
            fontWeight: 900,
            fontFamily: FONTS.heading,
            lineHeight: 1,
            color: COLORS.yellow,
            letterSpacing: -3,
            textShadow: `0 0 40px ${COLORS.yellowGlow}`,
          }}
        >
          {topic}
        </div>
      </div>

      <div
        style={{
          transform: `translateX(${titleX}px)`,
          opacity: titleOpacity,
          marginTop: 10,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            fontFamily: FONTS.heading,
            color: COLORS.white,
            letterSpacing: -1,
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          marginTop: 8,
        }}
      >
        <div
          style={{
            fontSize: SIZES.subheading,
            fontWeight: 400,
            fontFamily: FONTS.mono,
            color: COLORS.textDim,
            letterSpacing: 1,
          }}
        >
          {subtitle}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 300,
          width: lineWidth,
          height: 3,
          background: COLORS.yellow,
          opacity: 0.6,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          width: 40,
          height: 40,
          borderTop: `2px solid ${COLORS.yellowDim}`,
          borderLeft: `2px solid ${COLORS.yellowDim}`,
          opacity: pillOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 60,
          width: 40,
          height: 40,
          borderBottom: `2px solid ${COLORS.yellowDim}`,
          borderRight: `2px solid ${COLORS.yellowDim}`,
          opacity: pillOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
