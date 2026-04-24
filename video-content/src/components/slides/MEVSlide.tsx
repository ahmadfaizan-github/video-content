import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface MEVSlideProps { title?: string; victimTx?: string; attackerProfit?: string }

export const MEVSlide: React.FC<MEVSlideProps> = ({ title = "Sandwich Attack", victimTx = "Buy 0.5 SOL", attackerProfit = "0.02 SOL" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ts = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const exitOpacity = interpolate(frame, [80, 88], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const steps = [
    { label: "1. FRONT-RUN", desc: "Bot buys before you", color: COLORS.danger, delay: 8 },
    { label: "2. YOUR TX", desc: victimTx, color: COLORS.yellow, delay: 18 },
    { label: "3. BACK-RUN", desc: "Bot sells after you", color: COLORS.danger, delay: 28 },
    { label: "PROFIT", desc: attackerProfit, color: COLORS.danger, delay: 38 },
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: 1 }}>
      <div style={{ position: "absolute", top: 100, left: 140, display: "flex", alignItems: "center", gap: 16, opacity: interpolate(ts, [0, 1], [0, 1]), transform: `translateX(${interpolate(ts, [0, 1], [-80, 0])}px)` }}>
        <div style={{ width: 4, height: 40, background: COLORS.danger }} />
        <div style={{ fontSize: SIZES.sectionTitle, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.white }}>{title}</div>
      </div>

      {/* Sandwich visualization */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 20, width: 900 }}>
        {steps.map((step, i) => {
          const s = spring({ frame: Math.max(0, frame - step.delay), fps, config: { damping: 12, stiffness: 100 } });
          const opacity = interpolate(s, [0, 1], [0, 1]);
          const x = interpolate(s, [0, 1], [i % 2 === 0 ? -60 : 60, 0]);
          const isVictim = i === 1;

          return (
            <div key={i} style={{ opacity, transform: `translateX(${x}px)` }}>
              {/* Arrow between steps */}
              {i > 0 && i < 3 && (
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
                  <div style={{ width: 2, height: 16, background: COLORS.textDim }} />
                </div>
              )}
              <div style={{
                display: "flex", alignItems: "center", gap: 20, padding: "20px 28px",
                background: isVictim ? COLORS.yellowSubtle : COLORS.dangerDim,
                border: `2px solid ${isVictim ? COLORS.yellowDim : COLORS.dangerBorder}`,
                ...(i === 3 ? { marginTop: 20, borderStyle: "dashed" } : {}),
              }}>
                <div style={{ fontSize: SIZES.bodySmall, fontWeight: 800, fontFamily: FONTS.heading, color: step.color, minWidth: 180 }}>{step.label}</div>
                <div style={{ fontSize: SIZES.body, fontFamily: FONTS.heading, color: COLORS.white, fontWeight: 500 }}>{step.desc}</div>
                {isVictim && <div style={{ marginLeft: "auto", fontSize: SIZES.label, fontFamily: FONTS.mono, color: COLORS.textDim }}>← YOUR TRANSACTION</div>}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
