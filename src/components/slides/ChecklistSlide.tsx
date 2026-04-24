import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface CheckItem {
  text: string;
  checked: boolean;
}

interface ChecklistSlideProps {
  title: string;
  items: CheckItem[];
}

export const ChecklistSlide: React.FC<ChecklistSlideProps> = ({
  title,
  items,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const titleX = interpolate(titleSpring, [0, 1], [-80, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  const exitOpacity = interpolate(frame, [80, 88], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((item, i) => {
          const itemDelay = 8 + i * 5;
          const s = spring({
            frame: Math.max(0, frame - itemDelay),
            fps,
            config: { damping: 14, stiffness: 80 },
          });
          const opacity = interpolate(s, [0, 1], [0, 1]);
          const x = interpolate(s, [0, 1], [40, 0]);

          // Checkmark animation (slightly after item appears)
          const checkDelay = itemDelay + 4;
          const checkS = spring({
            frame: Math.max(0, frame - checkDelay),
            fps,
            config: { damping: 10, stiffness: 120 },
          });
          const checkScale = interpolate(checkS, [0, 1], [0, 1]);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "16px 24px",
                background: COLORS.surfaceLight,
                border: `1px solid ${COLORS.surfaceLighter}`,
                opacity,
                transform: `translateX(${x}px)`,
              }}
            >
              {/* Checkbox */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  border: `2px solid ${item.checked ? COLORS.success : COLORS.textDim}`,
                  background: item.checked ? COLORS.success : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transform: `scale(${item.checked ? checkScale : 1})`,
                }}
              >
                {item.checked && (
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path
                      d="M3 8l3.5 3.5L13 5"
                      fill="none"
                      stroke={COLORS.black}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <div
                style={{
                  fontSize: SIZES.body,
                  fontFamily: FONTS.heading,
                  color: item.checked ? COLORS.white : COLORS.textSecondary,
                  fontWeight: 500,
                  textDecoration: item.checked ? "none" : "none",
                }}
              >
                {item.text}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
