import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface RecapSlideProps {
  title?: string;
  points: string[];
}

export const RecapSlide: React.FC<RecapSlideProps> = ({
  title = "Recap",
  points,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const titleScale = interpolate(titleSpring, [0, 1], [0.5, 1]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  const exitOpacity = interpolate(frame, [80, 88], [1, 0], {
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
      {/* Title */}
      <div
        style={{
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
          fontSize: SIZES.slideTitle,
          fontWeight: 900,
          fontFamily: FONTS.heading,
          color: COLORS.yellow,
          marginBottom: 48,
          letterSpacing: -1,
        }}
      >
        {title}
      </div>

      {/* Recap points */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: 1100,
        }}
      >
        {points.map((point, i) => {
          const itemDelay = 8 + i * 5;
          const s = spring({
            frame: Math.max(0, frame - itemDelay),
            fps,
            config: { damping: 14, stiffness: 80 },
          });
          const opacity = interpolate(s, [0, 1], [0, 1]);
          const x = interpolate(s, [0, 1], [30, 0]);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity,
                transform: `translateX(${x}px)`,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: COLORS.yellow,
                  borderRadius: "50%",
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path
                    d="M4 9l3.5 3.5L14 6"
                    fill="none"
                    stroke={COLORS.black}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                style={{
                  fontSize: SIZES.body,
                  fontFamily: FONTS.heading,
                  color: COLORS.white,
                  fontWeight: 500,
                }}
              >
                {point}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
