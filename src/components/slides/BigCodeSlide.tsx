import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface BigCodeSlideProps {
  code: string[];
  filename?: string;
  highlightLines?: number[]; // 0-indexed lines to highlight
}

const highlightToken = (line: string): React.ReactNode[] => {
  const tokens: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;

  const rules: [RegExp, string][] = [
    [/^(\/\/.*)/, COLORS.codeComment],
    [/^("[^"]*")/, COLORS.codeString],
    [/^('[^']*')/, COLORS.codeString],
    [/^(`[^`]*`)/, COLORS.codeString],
    [/^(\b\d+\.?\d*\b)/, COLORS.codeNumber],
    [/^(\b(?:import|from|export|const|let|var|async|await|new|return|function|class|if|else|for|while|try|catch|throw|switch|case|break|default|typeof|instanceof)\b)/, COLORS.codeKeyword],
    [/^(\b[A-Z][a-zA-Z0-9]+\b)/, COLORS.codeType],
    [/^(\b[a-z][a-zA-Z0-9]*(?=\s*\())/, COLORS.codeFunction],
    [/^([{}()\[\]])/, COLORS.codePunctuation],
    [/^([=<>!+\-*/&|,.;:?]+)/, COLORS.codePunctuation],
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
          color ? <span key={key++} style={{ color }}>{text}</span> : <span key={key++}>{text}</span>
        );
        remaining = remaining.slice(text.length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      tokens.push(<span key={key++} style={{ color: COLORS.codeIdentifier }}>{remaining[0]}</span>);
      remaining = remaining.slice(1);
    }
  }
  return tokens;
};

export const BigCodeSlide: React.FC<BigCodeSlideProps> = ({
  code,
  filename = "index.ts",
  highlightLines = [],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const windowSpring = spring({ frame, fps, config: { damping: 16, stiffness: 80 } });
  const windowOpacity = interpolate(windowSpring, [0, 1], [0, 1]);
  const windowScale = interpolate(windowSpring, [0, 1], [0.98, 1]);

  const linesRevealed = interpolate(
    frame,
    [5, 5 + code.length * 2.5],
    [0, code.length],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
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
        transform: `scale(${windowScale})`,
      }}
    >
      <div style={{ width: 1760, opacity: windowOpacity }}>
        {/* Minimal chrome */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 20px",
            background: COLORS.surfaceLight,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottom: `1px solid ${COLORS.surfaceLighter}`,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#333" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#333" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#333" }} />
          <span
            style={{
              marginLeft: 12,
              fontSize: 13,
              fontFamily: FONTS.mono,
              color: COLORS.textMuted,
            }}
          >
            {filename}
          </span>
        </div>

        {/* Code body — full screen */}
        <div
          style={{
            background: COLORS.surface,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            padding: "20px 28px",
            border: `1px solid ${COLORS.surfaceLighter}`,
            borderTop: "none",
          }}
        >
          {code.map((line, i) => {
            const lineProgress = linesRevealed - i;
            const lineOpacity = interpolate(lineProgress, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const isHighlighted = highlightLines.includes(i);

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 30,
                  opacity: lineOpacity,
                  background: isHighlighted ? "rgba(251, 222, 0, 0.06)" : "transparent",
                  borderLeft: isHighlighted ? `3px solid ${COLORS.yellow}` : "3px solid transparent",
                  paddingLeft: 4,
                  marginLeft: -7,
                }}
              >
                <span
                  style={{
                    width: 44,
                    textAlign: "right",
                    paddingRight: 16,
                    fontSize: 15,
                    fontFamily: FONTS.mono,
                    color: COLORS.textMuted,
                    userSelect: "none",
                  }}
                >
                  {i + 1}
                </span>
                <span
                  style={{
                    fontSize: 18,
                    fontFamily: FONTS.mono,
                    whiteSpace: "pre",
                    lineHeight: 1.6,
                  }}
                >
                  {highlightToken(line)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
