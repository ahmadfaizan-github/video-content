import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface QuoteSlideProps {
  quote: string;
  author?: string;
  source?: string;
}

export const QuoteSlide: React.FC<QuoteSlideProps> = ({
  quote,
  author,
  source,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Quote mark
  const quoteSpring = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const quoteScale = interpolate(quoteSpring, [0, 1], [2, 1]);
  const quoteOpacity = interpolate(quoteSpring, [0, 1], [0, 1]);

  // Text
  const textOpacity = interpolate(frame, [8, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(frame, [8, 18], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Author
  const authorOpacity = interpolate(frame, [20, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(frame, [75, 88], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: `0 ${SIZES.pagePadding * 3}px`,
        opacity: 1,
      }}
    >
      {/* Big quotation mark */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: SIZES.pagePadding * 2,
          fontSize: 200,
          fontFamily: FONTS.heading,
          fontWeight: 900,
          color: COLORS.yellow,
          lineHeight: 1,
          transform: `scale(${quoteScale})`,
          opacity: quoteOpacity * 0.3,
        }}
      >
        "
      </div>

      {/* Quote text */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          borderLeft: `4px solid ${COLORS.yellow}`,
          paddingLeft: 40,
          maxWidth: 1200,
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 600,
            fontFamily: FONTS.heading,
            color: COLORS.white,
            lineHeight: 1.4,
            fontStyle: "italic",
          }}
        >
          {quote}
        </div>
      </div>

      {/* Author */}
      {author && (
        <div
          style={{
            opacity: authorOpacity,
            marginTop: 32,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ width: 40, height: 2, background: COLORS.yellow }} />
          <span
            style={{
              fontSize: SIZES.bodySmall,
              fontFamily: FONTS.mono,
              color: COLORS.yellow,
              fontWeight: 600,
            }}
          >
            {author}
          </span>
          {source && (
            <span
              style={{
                fontSize: SIZES.caption,
                fontFamily: FONTS.mono,
                color: COLORS.textDim,
              }}
            >
              — {source}
            </span>
          )}
        </div>
      )}
    </AbsoluteFill>
  );
};
