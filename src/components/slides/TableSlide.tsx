import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface TableSlideProps {
  title: string;
  headers: string[];
  rows: string[][];
  highlightColumn?: number;
}

export const TableSlide: React.FC<TableSlideProps> = ({
  title,
  headers,
  rows,
  highlightColumn,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleX = interpolate(titleSpring, [0, 1], [-80, 0]);

  const headerOpacity = interpolate(
    spring({ frame: Math.max(0, frame - 4), fps, config: { damping: 14, stiffness: 80 } }),
    [0, 1], [0, 1]
  );

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
      <div
        style={{
          position: "absolute",
          top: 100,
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

      <div style={{ width: 1400, marginTop: 40 }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            opacity: headerOpacity,
            marginBottom: 4,
          }}
        >
          {headers.map((header, col) => (
            <div
              key={col}
              style={{
                flex: 1,
                padding: "14px 20px",
                background: col === highlightColumn ? COLORS.yellow : COLORS.surfaceLight,
                fontSize: SIZES.label,
                fontFamily: FONTS.mono,
                fontWeight: 700,
                color: col === highlightColumn ? COLORS.black : COLORS.textSecondary,
                textTransform: "uppercase",
                letterSpacing: 1,
                textAlign: "center",
                marginRight: col < headers.length - 1 ? 2 : 0,
              }}
            >
              {header}
            </div>
          ))}
        </div>

        {/* Rows */}
        {rows.map((row, i) => {
          const rowDelay = 8 + i * 4;
          const s = spring({
            frame: Math.max(0, frame - rowDelay),
            fps,
            config: { damping: 14, stiffness: 80 },
          });
          const opacity = interpolate(s, [0, 1], [0, 1]);
          const y = interpolate(s, [0, 1], [15, 0]);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                opacity,
                transform: `translateY(${y}px)`,
                marginBottom: 2,
              }}
            >
              {row.map((cell, col) => (
                <div
                  key={col}
                  style={{
                    flex: 1,
                    padding: "14px 20px",
                    background: col === highlightColumn
                      ? "rgba(251, 222, 0, 0.06)"
                      : (i % 2 === 0 ? COLORS.surfaceLight : "rgba(17,17,17,0.5)"),
                    fontSize: SIZES.bodySmall,
                    fontFamily: FONTS.mono,
                    color: col === highlightColumn ? COLORS.yellow : COLORS.white,
                    fontWeight: col === highlightColumn ? 700 : 400,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: col < row.length - 1 ? 2 : 0,
                    borderLeft: col === highlightColumn ? `2px solid ${COLORS.yellow}` : "none",
                  }}
                >
                  {cell}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
