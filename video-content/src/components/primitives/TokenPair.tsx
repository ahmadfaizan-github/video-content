import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface TokenPairProps {
  from: string;
  to: string;
  amount?: string;
  delay?: number;
}

export const TokenPair: React.FC<TokenPairProps> = ({ from, to, amount, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 14, stiffness: 80 } });
  const arrowWidth = interpolate(s, [0, 1], [0, 40]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: interpolate(s, [0, 1], [0, 1]) }}>
      {/* From token */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 44, height: 44, background: COLORS.surfaceLight, border: `2px solid ${COLORS.yellow}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 18, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.yellow }}>{from.charAt(0)}</span>
        </div>
        <span style={{ fontSize: SIZES.bodySmall, fontWeight: 700, fontFamily: FONTS.heading, color: COLORS.white }}>{from}</span>
      </div>

      {/* Arrow */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: arrowWidth, height: 2, background: COLORS.yellow }} />
        <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: `8px solid ${COLORS.yellow}` }} />
      </div>

      {/* To token */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 44, height: 44, background: COLORS.surfaceLight, border: `2px solid ${COLORS.yellow}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 18, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.yellow }}>{to.charAt(0)}</span>
        </div>
        <span style={{ fontSize: SIZES.bodySmall, fontWeight: 700, fontFamily: FONTS.heading, color: COLORS.white }}>{to}</span>
      </div>

      {amount && <span style={{ fontSize: SIZES.label, fontFamily: FONTS.mono, color: COLORS.textDim, marginLeft: 12 }}>{amount}</span>}
    </div>
  );
};
