import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";
import { AnimatedCounter } from "../primitives/AnimatedCounter";

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  color?: string;
}

interface StatsSlideProps {
  title: string;
  stats: Stat[];
}

export const StatsSlide: React.FC<StatsSlideProps> = ({ title, stats }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleX = interpolate(titleSpring, [0, 1], [-80, 0]);

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
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 140,
          transform: `translateX(${titleX}px)`,
          opacity: titleOpacity,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div style={{ width: 4, height: 40, background: COLORS.yellow }} />
        <div
          style={{
            fontSize: SIZES.sectionTitle,
            fontWeight: 800,
            fontFamily: FONTS.heading,
            color: COLORS.white,
          }}
        >
          {title}
        </div>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: 40,
        }}
      >
        {stats.map((stat, i) => {
          const cardDelay = 6 + i * 6;
          const s = spring({
            frame: Math.max(0, frame - cardDelay),
            fps,
            config: { damping: 14, stiffness: 80 },
          });
          const scale = interpolate(s, [0, 1], [0.8, 1]);
          const opacity = interpolate(s, [0, 1], [0, 1]);

          return (
            <div
              key={i}
              style={{
                transform: `scale(${scale})`,
                opacity,
                background: COLORS.surfaceLight,
                border: `1px solid ${COLORS.surfaceLighter}`,
                padding: "48px 56px",
                minWidth: 280,
                textAlign: "center",
              }}
            >
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals || 0}
                delay={cardDelay + 4}
                size={72}
                color={stat.color || COLORS.yellow}
                label={stat.label}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
