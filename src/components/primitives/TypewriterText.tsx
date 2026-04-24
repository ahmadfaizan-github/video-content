import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number; // chars per frame
  fontSize?: number;
  color?: string;
  font?: "heading" | "mono";
  showCursor?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 0,
  speed = 0.8,
  fontSize = SIZES.body,
  color = COLORS.white,
  font = "mono",
  showCursor = true,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  const charsVisible = Math.floor(adjustedFrame * speed);
  const displayText = text.slice(0, Math.min(charsVisible, text.length));
  const isDone = charsVisible >= text.length;
  const cursorVisible = Math.floor(frame / 8) % 2 === 0;

  return (
    <span
      style={{
        fontSize,
        fontFamily: font === "mono" ? FONTS.mono : FONTS.heading,
        color,
        whiteSpace: "pre",
      }}
    >
      {displayText}
      {showCursor && (!isDone || cursorVisible) && (
        <span
          style={{
            display: "inline-block",
            width: fontSize * 0.6,
            height: fontSize * 0.08,
            background: COLORS.yellow,
            verticalAlign: "baseline",
            marginLeft: 2,
            opacity: isDone ? (cursorVisible ? 1 : 0) : 1,
          }}
        />
      )}
    </span>
  );
};
