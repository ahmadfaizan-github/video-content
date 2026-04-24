import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface TerminalLine {
  text: string;
  type?: "command" | "output" | "success" | "error" | "info";
}

interface TerminalSlideProps {
  title: string;
  lines: TerminalLine[];
  prompt?: string;
}

const TYPE_COLORS: Record<string, string> = {
  command: COLORS.white,
  output: COLORS.textSecondary,
  success: COLORS.success,
  error: COLORS.danger,
  info: COLORS.yellow,
};

export const TerminalSlide: React.FC<TerminalSlideProps> = ({
  title,
  lines,
  prompt = "$",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleX = interpolate(titleSpring, [0, 1], [-100, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  const windowSpring = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 16, stiffness: 80 },
  });
  const windowY = interpolate(windowSpring, [0, 1], [60, 0]);
  const windowOpacity = interpolate(windowSpring, [0, 1], [0, 1]);

  const linesRevealed = interpolate(
    frame,
    [10, 10 + lines.length * 5],
    [0, lines.length],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const cursorVisible = Math.floor(frame / 8) % 2 === 0;

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
            letterSpacing: -1,
          }}
        >
          {title}
        </div>
      </div>

      {/* Terminal window */}
      <div
        style={{
          transform: `translateY(${windowY}px)`,
          opacity: windowOpacity,
          width: 1500,
          marginTop: 80,
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 20px",
            background: COLORS.surfaceLight,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            borderBottom: `1px solid ${COLORS.surfaceLighter}`,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#333" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#333" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#333" }} />
          <div
            style={{
              marginLeft: 16,
              fontSize: SIZES.tiny,
              fontFamily: FONTS.mono,
              color: COLORS.textMuted,
            }}
          >
            terminal
          </div>
        </div>

        {/* Terminal body */}
        <div
          style={{
            background: COLORS.surface,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            padding: "24px 32px",
            border: `1px solid ${COLORS.surfaceLighter}`,
            borderTop: "none",
            boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
          }}
        >
          {lines.map((line, i) => {
            const lineProgress = linesRevealed - i;
            const lineOpacity = interpolate(lineProgress, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const isCommand = line.type === "command" || !line.type;
            const isCurrentLine =
              Math.floor(linesRevealed) === i && linesRevealed < lines.length;

            return (
              <div
                key={i}
                style={{
                  height: 38,
                  display: "flex",
                  alignItems: "center",
                  opacity: lineOpacity,
                }}
              >
                {isCommand && (
                  <span
                    style={{
                      fontSize: SIZES.codeLarge,
                      fontFamily: FONTS.mono,
                      color: COLORS.yellow,
                      marginRight: 12,
                    }}
                  >
                    {prompt}
                  </span>
                )}
                <span
                  style={{
                    fontSize: SIZES.codeLarge,
                    fontFamily: FONTS.mono,
                    color: TYPE_COLORS[line.type || "command"],
                    whiteSpace: "pre",
                  }}
                >
                  {line.text}
                </span>
                {isCurrentLine && isCommand && cursorVisible && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 12,
                      height: 24,
                      background: COLORS.yellow,
                      marginLeft: 4,
                      opacity: 0.8,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
