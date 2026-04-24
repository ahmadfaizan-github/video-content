import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface StackLayer {
  label: string;
  sublabel?: string;
  accent?: boolean;
}

interface StackSlideProps {
  title: string;
  layers: StackLayer[];
}

export const StackSlide: React.FC<StackSlideProps> = ({ title, layers }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleX = interpolate(titleSpring, [0, 1], [-80, 0]);

  const exitOpacity = interpolate(frame, [80, 88], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Build from bottom up
  const reversedLayers = [...layers].reverse();

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
          flexDirection: "column",
          gap: 4,
          width: 900,
          marginTop: 40,
        }}
      >
        {reversedLayers.map((layer, i) => {
          const realIndex = layers.length - 1 - i;
          const layerDelay = 6 + realIndex * 6; // bottom layers appear first
          const s = spring({
            frame: Math.max(0, frame - layerDelay),
            fps,
            config: { damping: 14, stiffness: 80 },
          });
          const y = interpolate(s, [0, 1], [40, 0]);
          const opacity = interpolate(s, [0, 1], [0, 1]);

          return (
            <div
              key={i}
              style={{
                transform: `translateY(${y}px)`,
                opacity,
                padding: "24px 36px",
                background: layer.accent ? COLORS.yellow : COLORS.surfaceLight,
                border: `1px solid ${layer.accent ? COLORS.yellow : COLORS.surfaceLighter}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: SIZES.body,
                  fontWeight: 800,
                  fontFamily: FONTS.heading,
                  color: layer.accent ? COLORS.black : COLORS.white,
                }}
              >
                {layer.label}
              </div>
              {layer.sublabel && (
                <div
                  style={{
                    fontSize: SIZES.label,
                    fontFamily: FONTS.mono,
                    color: layer.accent ? "rgba(0,0,0,0.5)" : COLORS.textDim,
                  }}
                >
                  {layer.sublabel}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
