import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface BulletPoint {
  text: string;
  highlight?: string; // portion to highlight in yellow
}

interface ConceptSlideProps {
  title: string;
  bullets: BulletPoint[];
  footnote?: string;
}

export const ConceptSlide: React.FC<ConceptSlideProps> = ({
  title,
  bullets,
  footnote,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleX = interpolate(titleSpring, [0, 1], [-80, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // Exit
  const exitOpacity = interpolate(frame, [80, 88], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        padding: `140px ${SIZES.pagePadding * 2}px`,
        opacity: 1,
      }}
    >
      {/* Title with accent bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          transform: `translateX(${titleX}px)`,
          opacity: titleOpacity,
          marginBottom: 50,
        }}
      >
        <div
          style={{
            width: 4,
            height: 44,
            background: COLORS.yellow,
          }}
        />
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

      {/* Bullet points */}
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {bullets.map((bullet, i) => {
          const bulletDelay = 8 + i * 6;
          const s = spring({
            frame: Math.max(0, frame - bulletDelay),
            fps,
            config: { damping: 14, stiffness: 80 },
          });
          const x = interpolate(s, [0, 1], [60, 0]);
          const opacity = interpolate(s, [0, 1], [0, 1]);

          // Render text with optional highlight
          const renderText = () => {
            if (!bullet.highlight) {
              return bullet.text;
            }
            const parts = bullet.text.split(bullet.highlight);
            return (
              <>
                {parts[0]}
                <span
                  style={{
                    color: COLORS.black,
                    background: COLORS.yellow,
                    padding: "2px 8px",
                    fontWeight: 700,
                  }}
                >
                  {bullet.highlight}
                </span>
                {parts[1]}
              </>
            );
          };

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 20,
                transform: `translateX(${x}px)`,
                opacity,
              }}
            >
              {/* Bullet marker */}
              <div
                style={{
                  width: 10,
                  height: 10,
                  background: COLORS.yellow,
                  marginTop: 12,
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  fontSize: SIZES.body,
                  fontFamily: FONTS.heading,
                  color: COLORS.textPrimary,
                  lineHeight: 1.4,
                  fontWeight: 500,
                }}
              >
                {renderText()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footnote */}
      {footnote && (
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: SIZES.pagePadding * 2,
            fontSize: SIZES.caption,
            fontFamily: FONTS.mono,
            color: COLORS.textDim,
            opacity: interpolate(frame, [40, 50], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {footnote}
        </div>
      )}
    </AbsoluteFill>
  );
};
