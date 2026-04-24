import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface ColumnItem {
  icon?: string;
  text: string;
}

interface TwoColumnSlideProps {
  title: string;
  leftTitle: string;
  rightTitle: string;
  leftItems: ColumnItem[];
  rightItems: ColumnItem[];
}

export const TwoColumnSlide: React.FC<TwoColumnSlideProps> = ({
  title,
  leftTitle,
  rightTitle,
  leftItems,
  rightItems,
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

  const renderColumn = (items: ColumnItem[], colTitle: string, baseDelay: number) => (
    <div style={{ flex: 1 }}>
      <div
        style={{
          fontSize: SIZES.body,
          fontWeight: 800,
          fontFamily: FONTS.heading,
          color: COLORS.yellow,
          marginBottom: 24,
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        {colTitle}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((item, i) => {
          const d = baseDelay + i * 4;
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
                gap: 14,
                opacity,
                transform: `translateX(${x}px)`,
              }}
            >
              {item.icon && (
                <span style={{ fontSize: 24 }}>{item.icon}</span>
              )}
              {!item.icon && (
                <div
                  style={{
                    width: 8,
                    height: 8,
                    background: COLORS.yellow,
                    flexShrink: 0,
                  }}
                />
              )}
              <span
                style={{
                  fontSize: SIZES.bodySmall,
                  fontFamily: FONTS.heading,
                  color: COLORS.white,
                  fontWeight: 500,
                }}
              >
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

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
        {renderColumn(leftItems, leftTitle, 8)}
        <div style={{ width: 2, background: COLORS.surfaceLighter, alignSelf: "stretch" }} />
        {renderColumn(rightItems, rightTitle, 12)}
      </div>
    </AbsoluteFill>
  );
};
