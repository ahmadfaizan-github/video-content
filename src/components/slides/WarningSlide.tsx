import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface WarningSlideProps {
  title?: string;
  warnings: string[];
  severity?: "danger" | "caution";
}

export const WarningSlide: React.FC<WarningSlideProps> = ({
  title = "Warning",
  warnings,
  severity = "danger",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isDanger = severity === "danger";
  const accentColor = isDanger ? COLORS.danger : COLORS.yellow;
  const bgColor = isDanger ? COLORS.dangerDim : COLORS.yellowSubtle;
  const borderColor = isDanger ? COLORS.dangerBorder : COLORS.yellowDim;

  // Flash effect on entry
  const flashOpacity = interpolate(frame, [0, 3, 6], [0, 0.3, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 120 },
  });
  const titleScale = interpolate(titleSpring, [0, 1], [1.5, 1]);
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
      {/* Flash overlay */}
      <AbsoluteFill
        style={{
          background: accentColor,
          opacity: flashOpacity,
        }}
      />

      {/* Warning icon + title */}
      <div
        style={{
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 50,
        }}
      >
        {/* Warning triangle */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "30px solid transparent",
            borderRight: "30px solid transparent",
            borderBottom: `52px solid ${accentColor}`,
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 18,
              left: -7,
              fontSize: 28,
              fontWeight: 900,
              fontFamily: FONTS.heading,
              color: COLORS.black,
            }}
          >
            !
          </span>
        </div>
        <div
          style={{
            fontSize: SIZES.slideTitle,
            fontWeight: 900,
            fontFamily: FONTS.heading,
            color: accentColor,
            letterSpacing: -1,
          }}
        >
          {title}
        </div>
      </div>

      {/* Warning items */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: 1200,
        }}
      >
        {warnings.map((warning, i) => {
          const itemDelay = 10 + i * 6;
          const s = spring({
            frame: Math.max(0, frame - itemDelay),
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
                gap: 20,
                padding: "20px 28px",
                background: bgColor,
                border: `1px solid ${borderColor}`,
                opacity,
                transform: `translateX(${x}px)`,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  background: accentColor,
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  fontSize: SIZES.body,
                  fontFamily: FONTS.heading,
                  color: COLORS.white,
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                {warning}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
