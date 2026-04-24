import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface LiquidityPoolSlideProps { title: string; tokenA: string; tokenB: string; reserveA: string; reserveB: string; tvl: string; apy?: string; fee?: string; volume24h?: string }

export const LiquidityPoolSlide: React.FC<LiquidityPoolSlideProps> = ({ title, tokenA, tokenB, reserveA, reserveB, tvl, apy, fee, volume24h }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ts = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const poolSpring = spring({ frame: Math.max(0, frame - 6), fps, config: { damping: 12, stiffness: 80 } });
  const exitOpacity = interpolate(frame, [80, 88], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: 1 }}>
      <div style={{ position: "absolute", top: 100, left: 140, display: "flex", alignItems: "center", gap: 16, opacity: interpolate(ts, [0, 1], [0, 1]), transform: `translateX(${interpolate(ts, [0, 1], [-80, 0])}px)` }}>
        <div style={{ width: 4, height: 40, background: COLORS.yellow }} />
        <div style={{ fontSize: SIZES.sectionTitle, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.white }}>{title}</div>
      </div>

      {/* Pool visualization */}
      <div style={{ opacity: interpolate(poolSpring, [0, 1], [0, 1]), transform: `scale(${interpolate(poolSpring, [0, 1], [0.9, 1])})`, marginTop: 20 }}>
        {/* Pool container */}
        <div style={{ width: 700, background: COLORS.surfaceLight, border: `2px solid ${COLORS.yellowDim}`, padding: 40, position: "relative" }}>
          <div style={{ fontSize: 12, fontFamily: FONTS.mono, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: 2, marginBottom: 24, textAlign: "center" }}>Liquidity Pool</div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            {/* Token A */}
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 72, height: 72, background: COLORS.yellow, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                <span style={{ fontSize: 30, fontWeight: 900, fontFamily: FONTS.heading, color: COLORS.black }}>{tokenA.charAt(0)}</span>
              </div>
              <div style={{ fontSize: SIZES.bodySmall, fontWeight: 700, fontFamily: FONTS.heading, color: COLORS.white }}>{tokenA}</div>
              <div style={{ fontSize: SIZES.body, fontWeight: 700, fontFamily: FONTS.mono, color: COLORS.yellow, marginTop: 4 }}>{reserveA}</div>
            </div>

            {/* Plus sign */}
            <div style={{ fontSize: 40, color: COLORS.textDim, fontWeight: 300 }}>+</div>

            {/* Token B */}
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 72, height: 72, background: COLORS.surfaceLighter, border: `2px solid ${COLORS.yellow}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                <span style={{ fontSize: 30, fontWeight: 900, fontFamily: FONTS.heading, color: COLORS.yellow }}>{tokenB.charAt(0)}</span>
              </div>
              <div style={{ fontSize: SIZES.bodySmall, fontWeight: 700, fontFamily: FONTS.heading, color: COLORS.white }}>{tokenB}</div>
              <div style={{ fontSize: SIZES.body, fontWeight: 700, fontFamily: FONTS.mono, color: COLORS.yellow, marginTop: 4 }}>{reserveB}</div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 4, marginTop: 4, width: 700 }}>
          {[
            { label: "TVL", value: tvl },
            ...(apy ? [{ label: "APY", value: apy }] : []),
            ...(fee ? [{ label: "Fee", value: fee }] : []),
            ...(volume24h ? [{ label: "24h Vol", value: volume24h }] : []),
          ].map((stat, i) => {
            const d = 16 + i * 4;
            const s2 = spring({ frame: Math.max(0, frame - d), fps, config: { damping: 14, stiffness: 80 } });
            return (
              <div key={i} style={{ flex: 1, background: COLORS.surfaceLight, border: `1px solid ${COLORS.surfaceLighter}`, padding: "14px 16px", textAlign: "center", opacity: interpolate(s2, [0, 1], [0, 1]) }}>
                <div style={{ fontSize: 11, fontFamily: FONTS.mono, color: COLORS.textDim, textTransform: "uppercase", marginBottom: 4 }}>{stat.label}</div>
                <div style={{ fontSize: SIZES.bodySmall, fontFamily: FONTS.mono, color: COLORS.yellow, fontWeight: 700 }}>{stat.value}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
