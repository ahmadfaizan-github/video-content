import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface ProcessStep {
  label: string;
  description: string;
}

interface ProcessSlideProps {
  title: string;
  steps: ProcessStep[];
}

export const ProcessSlide: React.FC<ProcessSlideProps> = ({ title, steps }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
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
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 0,
          marginTop: 40,
        }}
      >
        {steps.map((step, i) => {
          const stepDelay = 6 + i * 8;
          const s = spring({
            frame: Math.max(0, frame - stepDelay),
            fps,
            config: { damping: 14, stiffness: 80 },
          });
          const scale = interpolate(s, [0, 1], [0.8, 1]);
          const opacity = interpolate(s, [0, 1], [0, 1]);

          const lineDelay = stepDelay + 4;
          const lineProgress = interpolate(
            frame,
            [lineDelay, lineDelay + 8],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              {/* Step */}
              <div
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 240,
                  textAlign: "center",
                }}
              >
                {/* Number circle */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: COLORS.yellow,
                    borderRadius: "50%",
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      fontSize: 28,
                      fontWeight: 900,
                      fontFamily: FONTS.heading,
                      color: COLORS.black,
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: SIZES.bodySmall,
                    fontWeight: 800,
                    fontFamily: FONTS.heading,
                    color: COLORS.white,
                    marginBottom: 8,
                  }}
                >
                  {step.label}
                </div>
                <div
                  style={{
                    fontSize: SIZES.label,
                    fontFamily: FONTS.mono,
                    color: COLORS.textDim,
                    lineHeight: 1.4,
                  }}
                >
                  {step.description}
                </div>
              </div>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: 56,
                    width: 60,
                  }}
                >
                  <div
                    style={{
                      width: 40 * lineProgress,
                      height: 2,
                      background: COLORS.yellow,
                      opacity: lineProgress,
                    }}
                  />
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "5px solid transparent",
                      borderBottom: "5px solid transparent",
                      borderLeft: `8px solid ${COLORS.yellow}`,
                      opacity: lineProgress,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
