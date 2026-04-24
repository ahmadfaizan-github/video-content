import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface GlitchTextProps {
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  intensity?: number; // 0-1
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  delay = 0,
  fontSize = SIZES.slideTitle,
  color = COLORS.yellow,
  intensity = 0.5,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);

  // Glitch happens in bursts
  const isGlitching =
    (adjustedFrame > 2 && adjustedFrame < 5) ||
    (adjustedFrame > 12 && adjustedFrame < 14) ||
    (adjustedFrame > 25 && adjustedFrame < 27);

  const offset1 = isGlitching ? Math.sin(frame * 47) * 4 * intensity : 0;
  const offset2 = isGlitching ? Math.cos(frame * 31) * 4 * intensity : 0;
  const skew = isGlitching ? Math.sin(frame * 19) * 2 * intensity : 0;

  const opacity = interpolate(adjustedFrame, [0, 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const clipTop = isGlitching ? `${30 + Math.sin(frame * 53) * 20}%` : "0%";
  const clipBottom = isGlitching ? `${70 + Math.cos(frame * 37) * 20}%` : "100%";

  return (
    <div style={{ position: "relative", display: "inline-block", opacity }}>
      {/* Base text */}
      <span
        style={{
          fontSize,
          fontWeight: 900,
          fontFamily: FONTS.heading,
          color,
          letterSpacing: -2,
          transform: `skewX(${skew}deg)`,
          display: "inline-block",
        }}
      >
        {text}
      </span>

      {/* Red offset layer */}
      {isGlitching && (
        <span
          style={{
            position: "absolute",
            top: 0,
            left: offset1,
            fontSize,
            fontWeight: 900,
            fontFamily: FONTS.heading,
            color: COLORS.danger,
            letterSpacing: -2,
            clipPath: `inset(${clipTop} 0 ${100 - parseInt(clipBottom)}% 0)`,
            opacity: 0.7,
          }}
        >
          {text}
        </span>
      )}

      {/* Cyan offset layer */}
      {isGlitching && (
        <span
          style={{
            position: "absolute",
            top: 0,
            left: offset2,
            fontSize,
            fontWeight: 900,
            fontFamily: FONTS.heading,
            color: COLORS.info,
            letterSpacing: -2,
            clipPath: `inset(${100 - parseInt(clipBottom)}% 0 ${clipTop} 0)`,
            opacity: 0.5,
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
};
