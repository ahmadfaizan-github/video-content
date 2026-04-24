import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface TokenInfoSlideProps {
  name: string;
  symbol: string;
  mint: string;
  stats: { label: string; value: string; highlight?: boolean }[];
  status?: "live" | "migrated" | "rugged";
}

const STATUS_CONFIG = {
  live: { color: COLORS.success, label: "LIVE" },
  migrated: { color: COLORS.info, label: "MIGRATED" },
  rugged: { color: COLORS.danger, label: "RUGGED" },
};

export const TokenInfoSlide: React.FC<TokenInfoSlideProps> = ({
  name,
  symbol,
  mint,
  stats,
  status = "live",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const headerOpacity = interpolate(headerSpring, [0, 1], [0, 1]);
  const headerScale = interpolate(headerSpring, [0, 1], [0.9, 1]);

  const statusConfig = STATUS_CONFIG[status];

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
      {/* Token header */}
      <div
        style={{
          transform: `scale(${headerScale})`,
          opacity: headerOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 48,
        }}
      >
        {/* Token icon placeholder */}
        <div
          style={{
            width: 80,
            height: 80,
            background: COLORS.yellow,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontSize: 36,
              fontWeight: 900,
              fontFamily: FONTS.heading,
              color: COLORS.black,
            }}
          >
            {symbol.charAt(0)}
          </span>
        </div>

        <div
          style={{
            fontSize: SIZES.slideTitle,
            fontWeight: 900,
            fontFamily: FONTS.heading,
            color: COLORS.white,
            letterSpacing: -1,
          }}
        >
          {name}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 8,
          }}
        >
          <span
            style={{
              fontSize: SIZES.body,
              fontFamily: FONTS.mono,
              color: COLORS.yellow,
              fontWeight: 700,
            }}
          >
            ${symbol}
          </span>
          <div
            style={{
              padding: "3px 10px",
              background: `${statusConfig.color}20`,
              border: `1px solid ${statusConfig.color}40`,
              fontSize: SIZES.tiny,
              fontFamily: FONTS.mono,
              color: statusConfig.color,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            {statusConfig.label}
          </div>
        </div>

        <div
          style={{
            fontSize: SIZES.label,
            fontFamily: FONTS.mono,
            color: COLORS.textDim,
            marginTop: 8,
          }}
        >
          {mint}
        </div>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          width: 1000,
          justifyContent: "center",
        }}
      >
        {stats.map((stat, i) => {
          const d = 10 + i * 4;
          const s = spring({
            frame: Math.max(0, frame - d),
            fps,
            config: { damping: 14, stiffness: 80 },
          });
          const opacity = interpolate(s, [0, 1], [0, 1]);
          const y = interpolate(s, [0, 1], [20, 0]);

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                background: COLORS.surfaceLight,
                border: `1px solid ${COLORS.surfaceLighter}`,
                padding: "20px 32px",
                minWidth: 220,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: SIZES.label,
                  fontFamily: FONTS.mono,
                  color: COLORS.textDim,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 6,
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: SIZES.body,
                  fontWeight: 700,
                  fontFamily: FONTS.mono,
                  color: stat.highlight ? COLORS.yellow : COLORS.white,
                }}
              >
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
