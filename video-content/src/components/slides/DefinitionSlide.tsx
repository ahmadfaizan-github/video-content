import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface Definition {
  term: string;
  definition: string;
}

interface DefinitionSlideProps {
  title?: string;
  definitions: Definition[];
}

export const DefinitionSlide: React.FC<DefinitionSlideProps> = ({
  title = "Glossary",
  definitions,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleX = interpolate(titleSpring, [0, 1], [-80, 0]);

  const exitOpacity = interpolate(frame, [80, 88], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        padding: `120px ${SIZES.pagePadding * 2}px`,
        opacity: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          transform: `translateX(${titleX}px)`,
          opacity: titleOpacity,
          marginBottom: 48,
        }}
      >
        <div style={{ width: 4, height: 44, background: COLORS.yellow }} />
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

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {definitions.map((def, i) => {
          const itemDelay = 6 + i * 7;
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
                gap: 32,
                opacity,
                transform: `translateX(${x}px)`,
                borderLeft: `3px solid ${COLORS.yellow}`,
                padding: "16px 28px",
                background: COLORS.surfaceLight,
              }}
            >
              <div
                style={{
                  fontSize: SIZES.body,
                  fontWeight: 800,
                  fontFamily: FONTS.heading,
                  color: COLORS.yellow,
                  minWidth: 250,
                }}
              >
                {def.term}
              </div>
              <div
                style={{
                  fontSize: SIZES.body,
                  fontFamily: FONTS.heading,
                  color: COLORS.textSecondary,
                  fontWeight: 400,
                  lineHeight: 1.5,
                }}
              >
                {def.definition}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
