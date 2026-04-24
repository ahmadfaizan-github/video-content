import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface CountdownSlideProps { text: string; seconds?: number; subtext?: string }

export const CountdownSlide: React.FC<CountdownSlideProps> = ({ text, seconds = 3, subtext }) => {
  const frame = useCurrentFrame();
  const fps = 30;
  const remaining = Math.max(0, seconds - frame / fps);
  const current = Math.ceil(remaining);
  const pulse = interpolate(remaining % 1, [0, 0.3, 1], [1.3, 1, 1]);

  const exitOpacity = interpolate(frame, [seconds * fps - 5, seconds * fps], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: 1 }}>
      <div style={{ fontSize: SIZES.caption, fontFamily: FONTS.mono, color: COLORS.textDim, marginBottom: 20, letterSpacing: 3, textTransform: "uppercase" }}>{text}</div>
      <div style={{ fontSize: 200, fontWeight: 900, fontFamily: FONTS.heading, color: COLORS.yellow, transform: `scale(${pulse})`, lineHeight: 1, textShadow: `0 0 60px ${COLORS.yellowGlow}` }}>
        {current > 0 ? current : "GO"}
      </div>
      {subtext && <div style={{ fontSize: SIZES.bodySmall, fontFamily: FONTS.mono, color: COLORS.textDim, marginTop: 24 }}>{subtext}</div>}
    </AbsoluteFill>
  );
};
