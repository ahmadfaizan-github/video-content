import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface WalletToken {
  symbol: string;
  amount: string;
  value: string;
  change?: string;
  changePositive?: boolean;
}

interface WalletSlideProps {
  title?: string;
  address: string;
  totalValue: string;
  tokens: WalletToken[];
}

export const WalletSlide: React.FC<WalletSlideProps> = ({
  title = "Wallet",
  address,
  totalValue,
  tokens,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const headerOpacity = interpolate(headerSpring, [0, 1], [0, 1]);

  const exitOpacity = interpolate(frame, [80, 88], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: 1,
      }}
    >
      {/* Wallet header */}
      <div
        style={{
          opacity: headerOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            fontSize: SIZES.caption,
            fontFamily: FONTS.mono,
            color: COLORS.textDim,
            marginBottom: 4,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: SIZES.label,
            fontFamily: FONTS.mono,
            color: COLORS.textSecondary,
            marginBottom: 16,
          }}
        >
          {address}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            fontFamily: FONTS.heading,
            color: COLORS.yellow,
            letterSpacing: -2,
          }}
        >
          {totalValue}
        </div>
      </div>

      {/* Token list */}
      <div style={{ width: 1000, display: "flex", flexDirection: "column", gap: 4 }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            padding: "10px 24px",
            opacity: headerOpacity,
          }}
        >
          <div style={{ flex: 2, fontSize: SIZES.tiny, fontFamily: FONTS.mono, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: 1 }}>Token</div>
          <div style={{ flex: 1, fontSize: SIZES.tiny, fontFamily: FONTS.mono, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: 1, textAlign: "right" }}>Amount</div>
          <div style={{ flex: 1, fontSize: SIZES.tiny, fontFamily: FONTS.mono, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: 1, textAlign: "right" }}>Value</div>
          <div style={{ flex: 1, fontSize: SIZES.tiny, fontFamily: FONTS.mono, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: 1, textAlign: "right" }}>Change</div>
        </div>

        {tokens.map((token, i) => {
          const d = 8 + i * 4;
          const s = spring({
            frame: Math.max(0, frame - d),
            fps,
            config: { damping: 14, stiffness: 80 },
          });
          const opacity = interpolate(s, [0, 1], [0, 1]);
          const x = interpolate(s, [0, 1], [30, 0]);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "16px 24px",
                background: i % 2 === 0 ? COLORS.surfaceLight : "transparent",
                opacity,
                transform: `translateX(${x}px)`,
              }}
            >
              {/* Symbol with icon */}
              <div style={{ flex: 2, display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: COLORS.yellow,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.black }}>
                    {token.symbol.charAt(0)}
                  </span>
                </div>
                <span style={{ fontSize: SIZES.bodySmall, fontWeight: 700, fontFamily: FONTS.heading, color: COLORS.white }}>
                  {token.symbol}
                </span>
              </div>
              <div style={{ flex: 1, fontSize: SIZES.bodySmall, fontFamily: FONTS.mono, color: COLORS.textSecondary, textAlign: "right" }}>
                {token.amount}
              </div>
              <div style={{ flex: 1, fontSize: SIZES.bodySmall, fontFamily: FONTS.mono, color: COLORS.white, textAlign: "right", fontWeight: 600 }}>
                {token.value}
              </div>
              <div
                style={{
                  flex: 1,
                  fontSize: SIZES.bodySmall,
                  fontFamily: FONTS.mono,
                  color: token.changePositive ? COLORS.success : COLORS.danger,
                  textAlign: "right",
                  fontWeight: 600,
                }}
              >
                {token.change || "—"}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
