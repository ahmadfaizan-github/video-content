import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
}

interface TimelineSlideProps {
  title: string;
  events: TimelineEvent[];
}

export const TimelineSlide: React.FC<TimelineSlideProps> = ({
  title,
  events,
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

      {/* Timeline */}
      <div style={{ position: "relative", marginLeft: 140 }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 2,
            background: COLORS.surfaceLighter,
          }}
        />

        {events.map((event, i) => {
          const eventDelay = 8 + i * 8;
          const s = spring({
            frame: Math.max(0, frame - eventDelay),
            fps,
            config: { damping: 14, stiffness: 80 },
          });
          const opacity = interpolate(s, [0, 1], [0, 1]);
          const x = interpolate(s, [0, 1], [40, 0]);

          // Dot scales in
          const dotScale = interpolate(s, [0, 1], [0, 1]);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: 36,
                opacity,
                transform: `translateX(${x}px)`,
              }}
            >
              {/* Dot on timeline */}
              <div
                style={{
                  width: 16,
                  height: 16,
                  background: COLORS.yellow,
                  borderRadius: "50%",
                  marginLeft: -7,
                  marginTop: 6,
                  flexShrink: 0,
                  transform: `scale(${dotScale})`,
                  boxShadow: `0 0 12px ${COLORS.yellowGlow}`,
                }}
              />

              {/* Content */}
              <div style={{ marginLeft: 28 }}>
                <div
                  style={{
                    fontSize: SIZES.label,
                    fontFamily: FONTS.mono,
                    color: COLORS.yellow,
                    fontWeight: 600,
                    marginBottom: 4,
                    letterSpacing: 1,
                  }}
                >
                  {event.date}
                </div>
                <div
                  style={{
                    fontSize: SIZES.body,
                    fontFamily: FONTS.heading,
                    color: COLORS.white,
                    fontWeight: 700,
                  }}
                >
                  {event.title}
                </div>
                {event.description && (
                  <div
                    style={{
                      fontSize: SIZES.bodySmall,
                      fontFamily: FONTS.heading,
                      color: COLORS.textDim,
                      marginTop: 4,
                    }}
                  >
                    {event.description}
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
