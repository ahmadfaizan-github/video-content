import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface ComparisonItem {
  label: string;
  left: string;
  right: string;
}

interface ComparisonSlideProps {
  title: string;
  leftTitle: string;
  rightTitle: string;
  rows: ComparisonItem[];
  winner?: "left" | "right";
}

export const ComparisonSlide: React.FC<ComparisonSlideProps> = ({
  title,
  leftTitle,
  rightTitle,
  rows,
  winner,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleX = interpolate(titleSpring, [0, 1], [-80, 0]);

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

      {/* Comparison table */}
      <div style={{ width: 1400, marginTop: 60 }}>
        {/* Column headers */}
        <div
          style={{
            display: "flex",
            marginBottom: 4,
            opacity: titleOpacity,
          }}
        >
          <div style={{ width: 350 }} />
          <div
            style={{
              flex: 1,
              padding: "16px 24px",
              background: winner === "left" ? COLORS.yellow : COLORS.surfaceLight,
              fontSize: SIZES.bodySmall,
              fontWeight: 800,
              fontFamily: FONTS.heading,
              color: winner === "left" ? COLORS.black : COLORS.white,
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {leftTitle}
          </div>
          <div style={{ width: 4 }} />
          <div
            style={{
              flex: 1,
              padding: "16px 24px",
              background: winner === "right" ? COLORS.yellow : COLORS.surfaceLight,
              fontSize: SIZES.bodySmall,
              fontWeight: 800,
              fontFamily: FONTS.heading,
              color: winner === "right" ? COLORS.black : COLORS.white,
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {rightTitle}
          </div>
        </div>

        {/* Rows */}
        {rows.map((row, i) => {
          const rowDelay = 8 + i * 5;
          const s = spring({
            frame: Math.max(0, frame - rowDelay),
            fps,
            config: { damping: 14, stiffness: 80 },
          });
          const opacity = interpolate(s, [0, 1], [0, 1]);
          const y = interpolate(s, [0, 1], [20, 0]);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                marginBottom: 2,
                opacity,
                transform: `translateY(${y}px)`,
              }}
            >
              <div
                style={{
                  width: 350,
                  padding: "14px 24px",
                  fontSize: SIZES.caption,
                  fontFamily: FONTS.mono,
                  color: COLORS.textSecondary,
                  display: "flex",
                  alignItems: "center",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {row.label}
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "14px 24px",
                  background: COLORS.surfaceLight,
                  fontSize: SIZES.bodySmall,
                  fontFamily: FONTS.mono,
                  color: COLORS.white,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {row.left}
              </div>
              <div style={{ width: 4 }} />
              <div
                style={{
                  flex: 1,
                  padding: "14px 24px",
                  background: COLORS.surfaceLight,
                  fontSize: SIZES.bodySmall,
                  fontFamily: FONTS.mono,
                  color: COLORS.white,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {row.right}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
