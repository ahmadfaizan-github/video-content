import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface QuizSlideProps { question: string; options: string[]; correctIndex: number; revealAt?: number }

export const QuizSlide: React.FC<QuizSlideProps> = ({ question, options, correctIndex, revealAt = 50 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ts = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const exitOpacity = interpolate(frame, [80, 88], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const revealed = frame >= revealAt;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: 1 }}>
      <div style={{ opacity: interpolate(ts, [0, 1], [0, 1]), transform: `translateY(${interpolate(ts, [0, 1], [-20, 0])}px)`, fontSize: SIZES.heading, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.yellow, textAlign: "center", marginBottom: 48, maxWidth: 1200 }}>
        {question}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 900 }}>
        {options.map((opt, i) => {
          const d = 8 + i * 5;
          const s = spring({ frame: Math.max(0, frame - d), fps, config: { damping: 14, stiffness: 80 } });
          const opacity = interpolate(s, [0, 1], [0, 1]);
          const x = interpolate(s, [0, 1], [40, 0]);
          const isCorrect = i === correctIndex;
          const revealSpring = revealed ? spring({ frame: Math.max(0, frame - revealAt), fps, config: { damping: 14, stiffness: 100 } }) : 0;

          const bg = revealed && isCorrect ? `rgba(0, 230, 118, ${0.15 * revealSpring})` : COLORS.surfaceLight;
          const border = revealed && isCorrect ? `2px solid ${COLORS.success}` : `1px solid ${COLORS.surfaceLighter}`;
          const textColor = revealed && isCorrect ? COLORS.success : revealed && !isCorrect ? COLORS.textDim : COLORS.white;

          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 24px", background: bg, border, opacity, transform: `translateX(${x}px)` }}>
              <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", background: revealed && isCorrect ? COLORS.success : COLORS.surfaceLighter, borderRadius: "50%", flexShrink: 0 }}>
                <span style={{ fontSize: 18, fontWeight: 800, fontFamily: FONTS.heading, color: revealed && isCorrect ? COLORS.black : COLORS.textSecondary }}>
                  {String.fromCharCode(65 + i)}
                </span>
              </div>
              <span style={{ fontSize: SIZES.body, fontFamily: FONTS.heading, color: textColor, fontWeight: 500 }}>{opt}</span>
              {revealed && isCorrect && (
                <svg width="24" height="24" viewBox="0 0 24 24" style={{ marginLeft: "auto" }}>
                  <path d="M5 12l5 5L19 7" fill="none" stroke={COLORS.success} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
