import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface CodeSlideProps {
  title: string;
  code: string[];
  filename?: string;
}

const highlightLine = (line: string): React.ReactNode[] => {
  const tokens: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;

  const rules: [RegExp, string][] = [
    [/^(\/\/.*)/, COLORS.codeComment],
    [/^("[^"]*")/, COLORS.codeString],
    [/^('[^']*')/, COLORS.codeString],
    [/^(`[^`]*`)/, COLORS.codeString],
    [/^(\b\d+\.?\d*\b)/, COLORS.codeNumber],
    [
      /^(\b(?:import|from|export|const|let|var|async|await|new|return|function|class|if|else|for|while|try|catch|throw)\b)/,
      COLORS.codeKeyword,
    ],
    [/^(\b[A-Z][a-zA-Z0-9]+\b)/, COLORS.codeType],
    [/^(\b[a-z][a-zA-Z0-9]*(?=\s*\())/, COLORS.codeFunction],
    [/^([{}()\[\]])/, COLORS.codePunctuation],
    [/^([=<>!+\-*/&|,.;:]+)/, COLORS.codePunctuation],
    [/^(\s+)/, ""],
    [/^(\w+)/, COLORS.codeIdentifier],
    [/^(.)/, COLORS.codeIdentifier],
  ];

  while (remaining.length > 0) {
    let matched = false;
    for (const [regex, color] of rules) {
      const match = remaining.match(regex);
      if (match) {
        const text = match[1];
        tokens.push(
          color ? (
            <span key={key++} style={{ color }}>
              {text}
            </span>
          ) : (
            <span key={key++}>{text}</span>
          )
        );
        remaining = remaining.slice(text.length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      tokens.push(
        <span key={key++} style={{ color: COLORS.codeIdentifier }}>
          {remaining[0]}
        </span>
      );
      remaining = remaining.slice(1);
    }
  }
  return tokens;
};

export const CodeSlide: React.FC<CodeSlideProps> = ({
  title,
  code,
  filename = "index.ts",
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
  const windowY = interpolate(windowSpring, [0, 1], [80, 0]);
  const windowOpacity = interpolate(windowSpring, [0, 1], [0, 1]);

  const cursorVisible = Math.floor(frame / 8) % 2 === 0;

  const linesRevealed = interpolate(
    frame,
    [10, 10 + code.length * 4],
    [0, code.length],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const exitOpacity = interpolate(frame, [75, 88], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [75, 88], [1, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: 1,
        transform: `scale(${exitScale})`,
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
        <div
          style={{
            width: 4,
            height: 40,
            background: COLORS.yellow,
          }}
        />
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

      <div
        style={{
          transform: `translateY(${windowY}px)`,
          opacity: windowOpacity,
          width: 1500,
          marginTop: 80,
        }}
      >
        {/* Window chrome */}
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
            {filename}
          </div>
        </div>

        {/* Code body */}
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
          {code.map((line, i) => {
            const lineProgress = linesRevealed - i;
            const lineOpacity = interpolate(lineProgress, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const lineX = interpolate(lineProgress, [0, 1], [20, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const isCurrentLine =
              Math.floor(linesRevealed) === i && linesRevealed < code.length;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 36,
                  opacity: lineOpacity,
                  transform: `translateX(${lineX}px)`,
                }}
              >
                <span
                  style={{
                    width: 50,
                    textAlign: "right",
                    paddingRight: 20,
                    fontSize: SIZES.codeSmall,
                    fontFamily: FONTS.mono,
                    color: COLORS.textMuted,
                    userSelect: "none",
                  }}
                >
                  {i + 1}
                </span>
                <span
                  style={{
                    fontSize: SIZES.codeLarge,
                    fontFamily: FONTS.mono,
                    whiteSpace: "pre",
                    lineHeight: 1.6,
                  }}
                >
                  {highlightLine(line)}
                  {isCurrentLine && cursorVisible && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 2,
                        height: 22,
                        background: COLORS.yellow,
                        marginLeft: 2,
                        verticalAlign: "middle",
                        boxShadow: `0 0 8px rgba(251, 222, 0, 0.5)`,
                      }}
                    />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
