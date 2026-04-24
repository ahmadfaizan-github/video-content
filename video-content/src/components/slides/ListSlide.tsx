import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";
import { NumberCircle } from "../primitives/NumberCircle";

interface ListItem {
  text: string;
  sub?: string;
}

interface ListSlideProps {
  title: string;
  items: ListItem[];
  ordered?: boolean;
}

export const ListSlide: React.FC<ListSlideProps> = ({
  title,
  items,
  ordered = true,
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
            letterSpacing: -1,
          }}
        >
          {title}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {items.map((item, i) => {
          const itemDelay = 8 + i * 6;
          const s = spring({
            frame: Math.max(0, frame - itemDelay),
            fps,
            config: { damping: 14, stiffness: 80 },
          });
          const x = interpolate(s, [0, 1], [50, 0]);
          const opacity = interpolate(s, [0, 1], [0, 1]);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 20,
                transform: `translateX(${x}px)`,
                opacity,
              }}
            >
              {ordered ? (
                <NumberCircle number={i + 1} delay={itemDelay} size={42} />
              ) : (
                <div
                  style={{
                    width: 10,
                    height: 10,
                    background: COLORS.yellow,
                    marginTop: 12,
                    flexShrink: 0,
                  }}
                />
              )}
              <div>
                <div
                  style={{
                    fontSize: SIZES.body,
                    fontFamily: FONTS.heading,
                    color: COLORS.white,
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  {item.text}
                </div>
                {item.sub && (
                  <div
                    style={{
                      fontSize: SIZES.bodySmall,
                      fontFamily: FONTS.mono,
                      color: COLORS.textDim,
                      marginTop: 4,
                    }}
                  >
                    {item.sub}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
