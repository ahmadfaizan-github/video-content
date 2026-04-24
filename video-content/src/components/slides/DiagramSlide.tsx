import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface DiagramNode {
  label: string;
  sublabel?: string;
  accent?: boolean;
}

interface DiagramSlideProps {
  title: string;
  nodes: DiagramNode[];
  direction?: "horizontal" | "vertical";
}

export const DiagramSlide: React.FC<DiagramSlideProps> = ({
  title,
  nodes,
  direction = "horizontal",
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

  const isHorizontal = direction === "horizontal";

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

      {/* Diagram flow */}
      <div
        style={{
          display: "flex",
          flexDirection: isHorizontal ? "row" : "column",
          alignItems: "center",
          gap: 0,
          marginTop: 40,
        }}
      >
        {nodes.map((node, i) => {
          const nodeDelay = 8 + i * 8;
          const s = spring({
            frame: Math.max(0, frame - nodeDelay),
            fps,
            config: { damping: 12, stiffness: 100 },
          });
          const scale = interpolate(s, [0, 1], [0.5, 1]);
          const opacity = interpolate(s, [0, 1], [0, 1]);

          // Arrow between nodes
          const arrowDelay = nodeDelay + 4;
          const arrowProgress = interpolate(
            frame,
            [arrowDelay, arrowDelay + 8],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: isHorizontal ? "row" : "column",
                alignItems: "center",
              }}
            >
              {/* Node */}
              <div
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 200,
                    padding: "24px 20px",
                    background: node.accent ? COLORS.yellow : COLORS.surfaceLight,
                    border: `2px solid ${node.accent ? COLORS.yellow : COLORS.surfaceLighter}`,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: SIZES.bodySmall,
                      fontWeight: 800,
                      fontFamily: FONTS.heading,
                      color: node.accent ? COLORS.black : COLORS.white,
                    }}
                  >
                    {node.label}
                  </div>
                </div>
                {node.sublabel && (
                  <div
                    style={{
                      fontSize: SIZES.label,
                      fontFamily: FONTS.mono,
                      color: COLORS.textDim,
                    }}
                  >
                    {node.sublabel}
                  </div>
                )}
              </div>

              {/* Arrow */}
              {i < nodes.length - 1 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: arrowProgress,
                    ...(isHorizontal
                      ? { width: 60, flexDirection: "row" as const }
                      : { height: 40, flexDirection: "column" as const }),
                  }}
                >
                  <div
                    style={{
                      width: isHorizontal ? 30 * arrowProgress : 3,
                      height: isHorizontal ? 3 : 20 * arrowProgress,
                      background: COLORS.yellow,
                    }}
                  />
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      ...(isHorizontal
                        ? {
                            borderTop: "7px solid transparent",
                            borderBottom: "7px solid transparent",
                            borderLeft: `10px solid ${COLORS.yellow}`,
                          }
                        : {
                            borderLeft: "7px solid transparent",
                            borderRight: "7px solid transparent",
                            borderTop: `10px solid ${COLORS.yellow}`,
                          }),
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
