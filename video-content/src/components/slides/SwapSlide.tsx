import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface SwapSlideProps { title: string; fromToken: string; toToken: string; fromAmount: string; toAmount: string; rate: string; fee?: string; route?: string[] }

export const SwapSlide: React.FC<SwapSlideProps> = ({ title, fromToken, toToken, fromAmount, toAmount, rate, fee, route }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ts = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const cardSpring = spring({ frame: Math.max(0, frame - 6), fps, config: { damping: 14, stiffness: 80 } });
  const swapSpring = spring({ frame: Math.max(0, frame - 16), fps, config: { damping: 10, stiffness: 100 } });
  const exitOpacity = interpolate(frame, [80, 88], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const tokenCircle = (symbol: string, amount: string, label: string) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ width: 100, height: 100, background: COLORS.surfaceLight, border: `3px solid ${COLORS.yellow}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 40, fontWeight: 900, fontFamily: FONTS.heading, color: COLORS.yellow }}>{symbol.charAt(0)}</span>
      </div>
      <div style={{ fontSize: SIZES.body, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.white }}>{symbol}</div>
      <div style={{ fontSize: SIZES.subheading, fontWeight: 700, fontFamily: FONTS.mono, color: COLORS.yellow }}>{amount}</div>
      <div style={{ fontSize: SIZES.tiny, fontFamily: FONTS.mono, color: COLORS.textDim, textTransform: "uppercase" }}>{label}</div>
    </div>
  );

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: 1 }}>
      <div style={{ position: "absolute", top: 100, left: 140, display: "flex", alignItems: "center", gap: 16, opacity: interpolate(ts, [0, 1], [0, 1]), transform: `translateX(${interpolate(ts, [0, 1], [-80, 0])}px)` }}>
        <div style={{ width: 4, height: 40, background: COLORS.yellow }} />
        <div style={{ fontSize: SIZES.sectionTitle, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.white }}>{title}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 60, opacity: interpolate(cardSpring, [0, 1], [0, 1]), marginTop: 20 }}>
        {tokenCircle(fromToken, fromAmount, "You Pay")}
        <div style={{ display: "flex", alignItems: "center", transform: `scale(${interpolate(swapSpring, [0, 1], [0, 1])})` }}>
          <div style={{ width: 60, height: 3, background: COLORS.yellow }} />
          <div style={{ width: 0, height: 0, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: `14px solid ${COLORS.yellow}` }} />
        </div>
        {tokenCircle(toToken, toAmount, "You Receive")}
      </div>

      <div style={{ display: "flex", gap: 40, marginTop: 40, opacity: interpolate(frame, [25, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 12, fontFamily: FONTS.mono, color: COLORS.textDim, textTransform: "uppercase", marginBottom: 4 }}>Rate</div>
          <div style={{ fontSize: SIZES.bodySmall, fontFamily: FONTS.mono, color: COLORS.white }}>{rate}</div>
        </div>
        {fee && <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 12, fontFamily: FONTS.mono, color: COLORS.textDim, textTransform: "uppercase", marginBottom: 4 }}>Fee</div>
          <div style={{ fontSize: SIZES.bodySmall, fontFamily: FONTS.mono, color: COLORS.yellow }}>{fee}</div>
        </div>}
      </div>

      {route && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 24, opacity: interpolate(frame, [30, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <span style={{ fontSize: 12, fontFamily: FONTS.mono, color: COLORS.textDim }}>ROUTE:</span>
          {route.map((r, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, fontFamily: FONTS.mono, color: COLORS.textSecondary }}>{r}</span>
              {i < route.length - 1 && <span style={{ color: COLORS.yellow }}>→</span>}
            </span>
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};
