import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface FadeInWordsProps {
  text: string;
  delay?: number;
  stagger?: number; // frames between each word
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  highlightWords?: string[]; // words to highlight in yellow
}

export const FadeInWords: React.FC<FadeInWordsProps> = ({
  text,
  delay = 0,
  stagger = 3,
  fontSize = SIZES.body,
  color = COLORS.white,
  fontWeight = 500,
  highlightWords = [],
}) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");

  return (
    <span style={{ fontSize, fontFamily: FONTS.heading, fontWeight }}>
      {words.map((word, i) => {
        const wordDelay = delay + i * stagger;
        const opacity = interpolate(frame, [wordDelay, wordDelay + 6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = interpolate(frame, [wordDelay, wordDelay + 6], [8, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const isHighlighted = highlightWords.includes(word.replace(/[.,!?;:]/g, ""));

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity,
              transform: `translateY(${y}px)`,
              color: isHighlighted ? COLORS.yellow : color,
              fontWeight: isHighlighted ? 800 : fontWeight,
              marginRight: fontSize * 0.3,
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};
