import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface ProsConsSlideProps {
  title: string;
  pros: string[];
  cons: string[];
}

export const ProsConsSlide: React.FC<ProsConsSlideProps> = ({
  title,
  pros,
  cons,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleX = interpolate(titleSpring, [0, 1], [-80, 0]);

  const exitOpacity = interpolate(frame, [80, 88], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const renderList = (
    items: string[],
    icon: "check" | "cross",
    color: string,
    baseDelay: number
  ) =>
    items.map((item, i) => {
      const d = baseDelay + i * 5;
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
            alignItems: "flex-start",
            gap: 14,
            opacity,
            transform: `translateX(${x}px)`,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `${color}20`,
              flexShrink: 0,
              marginTop: 4,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14">
              {icon === "check" ? (
                <path d="M2 7l3.5 3.5L12 4" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <>
                  <path d="M3 3l8 8" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
                  <path d="M11 3l-8 8" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </div>
          <span
            style={{
              fontSize: SIZES.bodySmall,
              fontFamily: FONTS.heading,
              color: COLORS.white,
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            {item}
          </span>
        </div>
      );
    });

  return (
    <AbsoluteFill
      style={{
        padding: `120px ${SIZES.pagePadding * 2}px`,
        opacity: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          transform: `translateX(${titleX}px)`,
          opacity: titleOpacity,
          marginBottom: 48,
        }}
      >
        <div style={{ width: 4, height: 44, background: COLORS.yellow }} />
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

      <div style={{ display: "flex", gap: 60 }}>
        {/* Pros */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: SIZES.bodySmall,
              fontWeight: 800,
              fontFamily: FONTS.heading,
              color: COLORS.success,
              marginBottom: 24,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Pros
          </div>
          {renderList(pros, "check", COLORS.success, 8)}
        </div>

        <div style={{ width: 2, background: COLORS.surfaceLighter }} />

        {/* Cons */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: SIZES.bodySmall,
              fontWeight: 800,
              fontFamily: FONTS.heading,
              color: COLORS.danger,
              marginBottom: 24,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Cons
          </div>
          {renderList(cons, "cross", COLORS.danger, 12)}
        </div>
      </div>
    </AbsoluteFill>
  );
};
