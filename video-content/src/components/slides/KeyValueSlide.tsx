import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface KeyValue {
  key: string;
  value: string;
  highlight?: boolean;
}

interface KeyValueSlideProps {
  title: string;
  pairs: KeyValue[];
}

export const KeyValueSlide: React.FC<KeyValueSlideProps> = ({
  title,
  pairs,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleX = interpolate(titleSpring, [0, 1], [-80, 0]);
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
          position: "absolute",
          top: 120,
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
            letterSpacing: -1,
          }}
        >
          {title}
        </div>
      </div>

      {/* Key-Value pairs */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          width: 1200,
          marginTop: 60,
        }}
      >
        {pairs.map((pair, i) => {
          const rowDelay = 8 + i * 4;
          const s = spring({
            frame: Math.max(0, frame - rowDelay),
            fps,
            config: { damping: 14, stiffness: 80 },
          });
          const opacity = interpolate(s, [0, 1], [0, 1]);
          const x = interpolate(s, [0, 1], [40, 0]);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "16px 24px",
                background: i % 2 === 0 ? COLORS.surfaceLight : "transparent",
                opacity,
                transform: `translateX(${x}px)`,
              }}
            >
              <div
                style={{
                  width: 450,
                  fontSize: SIZES.bodySmall,
                  fontFamily: FONTS.mono,
                  color: COLORS.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {pair.key}
              </div>
              <div
                style={{
                  flex: 1,
                  fontSize: SIZES.body,
                  fontFamily: FONTS.mono,
                  color: pair.highlight ? COLORS.yellow : COLORS.white,
                  fontWeight: pair.highlight ? 700 : 500,
                }}
              >
                {pair.value}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
