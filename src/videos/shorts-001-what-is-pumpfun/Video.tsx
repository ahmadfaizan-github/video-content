import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

const { fontFamily: inter } = loadInter("normal", {
  weights: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});
const { fontFamily: jetbrains } = loadJetBrainsMono("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const S = 90; // 3s per slide
const P = 50; // horizontal padding

// ════════════════════════════════════════
// Shared helpers
// ════════════════════════════════════════

const VerticalBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const gridOpacity = interpolate(Math.sin(frame * 0.03), [-1, 1], [0.025, 0.06]);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: "#000" }} />
      <AbsoluteFill style={{ opacity: gridOpacity, backgroundImage: `radial-gradient(circle, rgba(251,222,0,0.3) 1px, transparent 1px)`, backgroundSize: "36px 36px", backgroundPosition: "18px 18px" }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, transparent 0%, rgba(0,0,0,0.8) 100%)" }} />
    </AbsoluteFill>
  );
};

const SlideTitle: React.FC<{ children: string }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  return (
    <div style={{ position: "absolute", top: 140, left: P, right: P, display: "flex", alignItems: "center", gap: 12, opacity: interpolate(s, [0, 1], [0, 1]), transform: `translateX(${interpolate(s, [0, 1], [-40, 0])}px)` }}>
      <div style={{ width: 4, height: 34, background: COLORS.yellow, flexShrink: 0 }} />
      <div style={{ fontSize: 36, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.white }}>{children}</div>
    </div>
  );
};

const useExit = (start = 75, end = 88) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [start, end], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
};

// ════════════════════════════════════════
// SLIDE 1: Title Card
// ════════════════════════════════════════
const VTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pillS = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const topicS = spring({ frame: Math.max(0, frame - 6), fps, config: { damping: 10, stiffness: 100, overshootClamping: false } });
  const titleS = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 14, stiffness: 80 } });
  const subOp = interpolate(frame, [20, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineW = interpolate(frame, [25, 45], [0, 300], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exit = useExit(72, 88);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: exit }}>
      <div style={{ transform: `translateY(${interpolate(pillS, [0, 1], [-40, 0])}px)`, opacity: interpolate(pillS, [0, 1], [0, 1]), marginBottom: 28 }}>
        <div style={{ padding: "8px 22px", border: `1.5px solid ${COLORS.yellowDim}`, background: COLORS.yellowSubtle, color: COLORS.yellow, fontSize: 18, fontFamily: FONTS.mono, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>SOLANA DEFI</div>
      </div>
      <div style={{ transform: `scale(${interpolate(topicS, [0, 1], [0.3, 1])})`, opacity: interpolate(topicS, [0, 1], [0, 1]) }}>
        <div style={{ fontSize: 100, fontWeight: 900, fontFamily: FONTS.heading, color: COLORS.yellow, letterSpacing: -3, textAlign: "center", textShadow: `0 0 40px ${COLORS.yellowGlow}` }}>PumpFun</div>
      </div>
      <div style={{ transform: `translateY(${interpolate(titleS, [0, 1], [30, 0])}px)`, opacity: interpolate(titleS, [0, 1], [0, 1]), marginTop: 8 }}>
        <div style={{ fontSize: 48, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.white, textAlign: "center" }}>Complete Guide</div>
      </div>
      <div style={{ opacity: subOp, marginTop: 14 }}>
        <div style={{ fontSize: 24, fontFamily: FONTS.mono, color: COLORS.textDim, textAlign: "center" }}>everything you need to know</div>
      </div>
      <div style={{ marginTop: 40, width: lineW, height: 3, background: COLORS.yellow, opacity: 0.6 }} />
      <div style={{ position: "absolute", top: 100, left: 44, width: 28, height: 28, borderTop: `2px solid ${COLORS.yellowDim}`, borderLeft: `2px solid ${COLORS.yellowDim}`, opacity: interpolate(pillS, [0, 1], [0, 1]) }} />
      <div style={{ position: "absolute", bottom: 100, right: 44, width: 28, height: 28, borderBottom: `2px solid ${COLORS.yellowDim}`, borderRight: `2px solid ${COLORS.yellowDim}`, opacity: interpolate(pillS, [0, 1], [0, 1]) }} />
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════
// SLIDE 2: Chapter
// ════════════════════════════════════════
const VChapter: React.FC<{ number: string; title: string; subtitle?: string }> = ({ number, title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const numS = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });
  const lineW = interpolate(frame, [8, 25], [0, 500], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleS = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 80 } });
  const exit = useExit(70, 85);
  return (
    <AbsoluteFill style={{ justifyContent: "center", padding: `0 ${P + 20}px`, opacity: exit }}>
      <div style={{ transform: `scale(${interpolate(numS, [0, 1], [3, 1])})`, opacity: interpolate(numS, [0, 1], [0, 1]), fontSize: 100, fontWeight: 900, fontFamily: FONTS.heading, color: COLORS.yellow, lineHeight: 1, marginBottom: 14 }}>{number}</div>
      <div style={{ width: lineW, height: 4, background: COLORS.yellow, marginBottom: 20 }} />
      <div style={{ transform: `translateX(${interpolate(titleS, [0, 1], [60, 0])}px)`, opacity: interpolate(titleS, [0, 1], [0, 1]), fontSize: 48, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.white, letterSpacing: -1 }}>{title}</div>
      {subtitle && <div style={{ opacity: interpolate(frame, [18, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), fontSize: 24, fontFamily: FONTS.mono, color: COLORS.textDim, marginTop: 10 }}>{subtitle}</div>}
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════
// SLIDE 3: Concept bullets
// ════════════════════════════════════════
const VConcept: React.FC<{ title: string; bullets: { text: string; highlight?: string }[] }> = ({ title, bullets }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const exit = useExit();
  return (
    <AbsoluteFill style={{ padding: `200px ${P}px 0`, opacity: exit }}>
      <SlideTitle>{title}</SlideTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 60 }}>
        {bullets.map((b, i) => {
          const d = 8 + i * 6;
          const s = spring({ frame: Math.max(0, frame - d), fps, config: { damping: 14, stiffness: 80 } });
          return (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", opacity: interpolate(s, [0, 1], [0, 1]), transform: `translateX(${interpolate(s, [0, 1], [40, 0])}px)` }}>
              <div style={{ width: 8, height: 8, background: COLORS.yellow, marginTop: 10, flexShrink: 0 }} />
              <div style={{ fontSize: 26, fontFamily: FONTS.heading, color: COLORS.white, fontWeight: 500, lineHeight: 1.4 }}>
                {b.highlight ? <>{b.text.split(b.highlight)[0]}<span style={{ background: COLORS.yellow, color: COLORS.black, padding: "1px 6px", fontWeight: 700 }}>{b.highlight}</span>{b.text.split(b.highlight)[1]}</> : b.text}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════
// SLIDE 4: Stats
// ════════════════════════════════════════
const VStats: React.FC<{ title: string; stats: { value: string; label: string }[] }> = ({ title, stats }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const exit = useExit();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: exit }}>
      <SlideTitle>{title}</SlideTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20, width: 900 }}>
        {stats.map((s, i) => {
          const d = 6 + i * 6;
          const sp = spring({ frame: Math.max(0, frame - d), fps, config: { damping: 14, stiffness: 80 } });
          return (
            <div key={i} style={{ background: COLORS.surfaceLight, border: `1px solid ${COLORS.surfaceLighter}`, padding: "28px 32px", textAlign: "center", opacity: interpolate(sp, [0, 1], [0, 1]), transform: `scale(${interpolate(sp, [0, 1], [0.9, 1])})` }}>
              <div style={{ fontSize: 56, fontWeight: 900, fontFamily: FONTS.heading, color: COLORS.yellow, letterSpacing: -2 }}>{s.value}</div>
              <div style={{ fontSize: 20, fontFamily: FONTS.mono, color: COLORS.textDim, marginTop: 6, textTransform: "uppercase", letterSpacing: 2 }}>{s.label}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════
// SLIDE 5: Code
// ════════════════════════════════════════
const VCode: React.FC<{ title: string; filename: string; lines: string[] }> = ({ title, filename, lines }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const wS = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 16, stiffness: 80 } });
  const linesRevealed = interpolate(frame, [10, 10 + lines.length * 4], [0, lines.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exit = useExit();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: exit, padding: `0 ${P - 10}px` }}>
      <SlideTitle>{title}</SlideTitle>
      <div style={{ width: "100%", marginTop: 60, opacity: interpolate(wS, [0, 1], [0, 1]), transform: `translateY(${interpolate(wS, [0, 1], [40, 0])}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", background: COLORS.surfaceLight, borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottom: `1px solid ${COLORS.surfaceLighter}` }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#333" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#333" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#333" }} />
          <span style={{ marginLeft: 10, fontSize: 12, fontFamily: FONTS.mono, color: COLORS.textMuted }}>{filename}</span>
        </div>
        <div style={{ background: COLORS.surface, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, padding: "16px 20px", border: `1px solid ${COLORS.surfaceLighter}`, borderTop: "none" }}>
          {lines.map((line, i) => {
            const p = linesRevealed - i;
            const op = interpolate(p, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ display: "flex", height: 28, alignItems: "center", opacity: op }}>
                <span style={{ width: 36, textAlign: "right", paddingRight: 14, fontSize: 14, fontFamily: FONTS.mono, color: COLORS.textMuted }}>{i + 1}</span>
                <span style={{ fontSize: 17, fontFamily: FONTS.mono, color: /^(import|const|await|new)/.test(line.trim()) ? COLORS.yellow : /^\/\//.test(line.trim()) ? COLORS.codeComment : /".*"|'.*'/.test(line) ? COLORS.yellow : COLORS.codeIdentifier, whiteSpace: "pre" }}>{line}</span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════
// SLIDE 6: Diagram (vertical flow)
// ════════════════════════════════════════
const VDiagram: React.FC<{ title: string; nodes: { label: string; sub: string; accent?: boolean }[] }> = ({ title, nodes }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const exit = useExit();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: exit }}>
      <SlideTitle>{title}</SlideTitle>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, marginTop: 20 }}>
        {nodes.map((n, i) => {
          const d = 8 + i * 8;
          const s = spring({ frame: Math.max(0, frame - d), fps, config: { damping: 12, stiffness: 100 } });
          const arrowOp = interpolate(frame, [d + 4, d + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ transform: `scale(${interpolate(s, [0, 1], [0.5, 1])})`, opacity: interpolate(s, [0, 1], [0, 1]), width: 500, padding: "20px", background: n.accent ? COLORS.yellow : COLORS.surfaceLight, border: `2px solid ${n.accent ? COLORS.yellow : COLORS.surfaceLighter}`, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, fontFamily: FONTS.heading, color: n.accent ? COLORS.black : COLORS.white }}>{n.label}</div>
                <div style={{ fontSize: 16, fontFamily: FONTS.mono, color: n.accent ? "rgba(0,0,0,0.5)" : COLORS.textDim, marginTop: 4 }}>{n.sub}</div>
              </div>
              {i < nodes.length - 1 && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: 32, opacity: arrowOp }}>
                  <div style={{ width: 2, height: 18, background: COLORS.yellow }} />
                  <div style={{ width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: `8px solid ${COLORS.yellow}` }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════
// SLIDE 7: Comparison
// ════════════════════════════════════════
const VComparison: React.FC<{ title: string; left: string; right: string; rows: { label: string; l: string; r: string }[] }> = ({ title, left, right, rows }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const exit = useExit();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: exit, padding: `0 ${P - 10}px` }}>
      <SlideTitle>{title}</SlideTitle>
      <div style={{ width: "100%", marginTop: 60 }}>
        <div style={{ display: "flex", marginBottom: 3 }}>
          <div style={{ width: 200 }} />
          <div style={{ flex: 1, padding: "12px", background: COLORS.yellow, textAlign: "center", fontSize: 18, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.black, textTransform: "uppercase", letterSpacing: 1, marginRight: 3 }}>{left}</div>
          <div style={{ flex: 1, padding: "12px", background: COLORS.surfaceLight, textAlign: "center", fontSize: 18, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.white, textTransform: "uppercase", letterSpacing: 1 }}>{right}</div>
        </div>
        {rows.map((row, i) => {
          const d = 8 + i * 4;
          const s = spring({ frame: Math.max(0, frame - d), fps, config: { damping: 14, stiffness: 80 } });
          return (
            <div key={i} style={{ display: "flex", marginBottom: 2, opacity: interpolate(s, [0, 1], [0, 1]), transform: `translateY(${interpolate(s, [0, 1], [12, 0])}px)` }}>
              <div style={{ width: 200, padding: "10px 12px", fontSize: 16, fontFamily: FONTS.mono, color: COLORS.textDim, display: "flex", alignItems: "center", textTransform: "uppercase", letterSpacing: 1 }}>{row.label}</div>
              <div style={{ flex: 1, padding: "10px", background: COLORS.surfaceLight, textAlign: "center", fontSize: 20, fontFamily: FONTS.mono, color: COLORS.white, marginRight: 2 }}>{row.l}</div>
              <div style={{ flex: 1, padding: "10px", background: COLORS.surfaceLight, textAlign: "center", fontSize: 20, fontFamily: FONTS.mono, color: COLORS.white }}>{row.r}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════
// SLIDE 8: Warning
// ════════════════════════════════════════
const VWarning: React.FC<{ warnings: string[] }> = ({ warnings }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleS = spring({ frame, fps, config: { damping: 10, stiffness: 120 } });
  const flash = interpolate(frame, [0, 3, 6], [0, 0.3, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exit = useExit();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: `0 ${P}px`, opacity: exit }}>
      <AbsoluteFill style={{ background: COLORS.danger, opacity: flash }} />
      <div style={{ transform: `scale(${interpolate(titleS, [0, 1], [1.5, 1])})`, opacity: interpolate(titleS, [0, 1], [0, 1]), display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
        <div style={{ width: 0, height: 0, borderLeft: "22px solid transparent", borderRight: "22px solid transparent", borderBottom: `38px solid ${COLORS.danger}`, position: "relative" }}>
          <span style={{ position: "absolute", top: 12, left: -5, fontSize: 20, fontWeight: 900, fontFamily: FONTS.heading, color: COLORS.black }}>!</span>
        </div>
        <div style={{ fontSize: 48, fontWeight: 900, fontFamily: FONTS.heading, color: COLORS.danger }}>Warning</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
        {warnings.map((w, i) => {
          const d = 10 + i * 6;
          const s = spring({ frame: Math.max(0, frame - d), fps, config: { damping: 14, stiffness: 80 } });
          return (
            <div key={i} style={{ display: "flex", gap: 14, padding: "16px 20px", background: COLORS.dangerDim, border: `1px solid ${COLORS.dangerBorder}`, opacity: interpolate(s, [0, 1], [0, 1]), transform: `translateX(${interpolate(s, [0, 1], [30, 0])}px)` }}>
              <div style={{ width: 6, height: 6, background: COLORS.danger, marginTop: 10, flexShrink: 0 }} />
              <div style={{ fontSize: 22, fontFamily: FONTS.heading, color: COLORS.white, fontWeight: 500, lineHeight: 1.4 }}>{w}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════
// SLIDE 9: Candlestick
// ════════════════════════════════════════
const VCandlestick: React.FC<{ title: string; candles: { o: number; h: number; l: number; c: number }[] }> = ({ title, candles }) => {
  const frame = useCurrentFrame();
  const cw = 900; const ch = 600; const pad = 20;
  const allV = candles.flatMap(c => [c.h, c.l]);
  const min = Math.min(...allV); const max = Math.max(...allV); const range = max - min || 1;
  const toY = (v: number) => pad + (ch - pad * 2) - ((v - min) / range) * (ch - pad * 2);
  const barW = Math.min(28, (cw - candles.length * 4) / candles.length);
  const reveal = interpolate(frame, [8, 35], [0, candles.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exit = useExit();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: exit }}>
      <SlideTitle>{title}</SlideTitle>
      <svg width={cw} height={ch} style={{ marginTop: 40 }}>
        {[0, 0.25, 0.5, 0.75, 1].map(t => <line key={t} x1={pad} y1={toY(min + range * t)} x2={cw - pad} y2={toY(min + range * t)} stroke={COLORS.surfaceLighter} strokeWidth={1} />)}
        {candles.map((c, i) => {
          const p = interpolate(reveal - i, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const x = pad + (i / candles.length) * (cw - pad * 2) + barW / 2;
          const green = c.c >= c.o;
          const col = green ? COLORS.success : COLORS.danger;
          const bTop = toY(Math.max(c.o, c.c));
          const bBot = toY(Math.min(c.o, c.c));
          return (
            <g key={i} opacity={p}>
              <line x1={x} y1={toY(c.h)} x2={x} y2={toY(c.l)} stroke={col} strokeWidth={1.5} />
              <rect x={x - barW / 2} y={bTop} width={barW} height={Math.max(1, (bBot - bTop) * p)} fill={col} rx={1} />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════
// SLIDE 10: Swap
// ════════════════════════════════════════
const VSwap: React.FC<{ from: string; to: string; amount: string; receive: string; rate: string }> = ({ from, to, amount, receive, rate }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardS = spring({ frame: Math.max(0, frame - 4), fps, config: { damping: 14, stiffness: 80 } });
  const arrowS = spring({ frame: Math.max(0, frame - 16), fps, config: { damping: 10, stiffness: 100 } });
  const exit = useExit();
  const tokenCircle = (sym: string, amt: string, label: string) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ width: 80, height: 80, background: COLORS.surfaceLight, border: `3px solid ${COLORS.yellow}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 32, fontWeight: 900, fontFamily: FONTS.heading, color: COLORS.yellow }}>{sym[0]}</span>
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.white }}>{sym}</div>
      <div style={{ fontSize: 28, fontWeight: 700, fontFamily: FONTS.mono, color: COLORS.yellow }}>{amt}</div>
      <div style={{ fontSize: 14, fontFamily: FONTS.mono, color: COLORS.textDim, textTransform: "uppercase" }}>{label}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: exit }}>
      <SlideTitle>Token Swap</SlideTitle>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, opacity: interpolate(cardS, [0, 1], [0, 1]), marginTop: 20 }}>
        {tokenCircle(from, amount, "You Pay")}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: `scale(${interpolate(arrowS, [0, 1], [0, 1])})` }}>
          <div style={{ width: 2, height: 24, background: COLORS.yellow }} />
          <div style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `10px solid ${COLORS.yellow}` }} />
        </div>
        {tokenCircle(to, receive, "You Receive")}
      </div>
      <div style={{ fontSize: 18, fontFamily: FONTS.mono, color: COLORS.textDim, marginTop: 28, opacity: interpolate(frame, [25, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>{rate}</div>
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════
// SLIDE 11: Callout
// ════════════════════════════════════════
const VCallout: React.FC<{ text: string; sub?: string }> = ({ text, sub }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 10, stiffness: 80, overshootClamping: false } });
  const lineW = interpolate(frame, [5, 25], [0, 160], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exit = useExit(70, 85);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: `0 ${P + 10}px`, opacity: exit }}>
      <div style={{ width: lineW, height: 3, background: COLORS.yellow, opacity: 0.3, marginBottom: 40 }} />
      <div style={{ transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`, opacity: interpolate(s, [0, 1], [0, 1]), fontSize: 56, fontWeight: 900, fontFamily: FONTS.heading, color: COLORS.yellow, textAlign: "center", lineHeight: 1.15, letterSpacing: -1 }}>{text}</div>
      {sub && <div style={{ opacity: interpolate(frame, [15, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), fontSize: 22, fontFamily: FONTS.mono, color: COLORS.textDim, textAlign: "center", marginTop: 20, lineHeight: 1.5 }}>{sub}</div>}
      <div style={{ width: lineW, height: 3, background: COLORS.yellow, opacity: 0.3, marginTop: 40 }} />
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════
// SLIDE 12: Outro
// ════════════════════════════════════════
const VOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoS = spring({ frame, fps, config: { damping: 10, stiffness: 100, overshootClamping: false } });
  const btnS = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 8, stiffness: 100, overshootClamping: false } });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 80, height: 80, background: COLORS.yellow, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, transform: `scale(${interpolate(logoS, [0, 1], [0, 1])})` }}>
        <span style={{ fontSize: 38, fontWeight: 900, fontFamily: FONTS.heading, color: COLORS.black }}>NLN</span>
      </div>
      <div style={{ transform: `scale(${interpolate(logoS, [0, 1], [0, 1])})`, fontSize: 48, fontWeight: 900, fontFamily: FONTS.heading, color: COLORS.white, marginBottom: 10 }}>NoLimitNodes</div>
      <div style={{ opacity: interpolate(frame, [15, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), fontSize: 22, fontFamily: FONTS.mono, color: COLORS.textDim, marginBottom: 36, textAlign: "center" }}>Follow for more Solana alpha</div>
      <div style={{ transform: `scale(${interpolate(btnS, [0, 1], [0.5, 1])})`, opacity: interpolate(btnS, [0, 1], [0, 1]), padding: "14px 40px", background: COLORS.yellow, fontSize: 22, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.black, letterSpacing: 3 }}>SUBSCRIBE</div>
      <div style={{ display: "flex", gap: 32, marginTop: 32, opacity: interpolate(frame, [30, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        {["nolimitnodes.com", "@NoLimitNodes"].map((l, i) => <span key={i} style={{ fontSize: 18, fontFamily: FONTS.mono, color: COLORS.textSecondary }}>{l}</span>)}
      </div>
    </AbsoluteFill>
  );
};

// ════════════════════════════════════════
// MAIN COMPOSITION
// ════════════════════════════════════════
export const Shorts001: React.FC = () => {
  let i = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <div style={{ width: 1080, height: 1920, transform: "scale(2)", transformOrigin: "top left", fontFamily: inter, WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" as any, textRendering: "optimizeLegibility", position: "relative", overflow: "hidden" }}>
        <VerticalBackground />

        {/* 1. Title */}
        <Sequence from={S * i++} durationInFrames={S}><VTitle /></Sequence>

        {/* 2. Chapter */}
        <Sequence from={S * i++} durationInFrames={S}><VChapter number="01" title="What is PumpFun?" subtitle="The bonding curve token launcher" /></Sequence>

        {/* 3. Concept */}
        <Sequence from={S * i++} durationInFrames={S}>
          <VConcept title="How It Works" bullets={[
            { text: "Anyone can launch a token with zero code", highlight: "zero code" },
            { text: "Price follows a bonding curve" },
            { text: "At $69K cap, migrates to Raydium" },
            { text: "Sniping = buying first seconds", highlight: "Sniping" },
          ]} />
        </Sequence>

        {/* 4. Stats */}
        <Sequence from={S * i++} durationInFrames={S}>
          <VStats title="By the Numbers" stats={[
            { value: "8M+", label: "Tokens Launched" },
            { value: "$500M", label: "Total Revenue" },
            { value: "2%", label: "Graduation Rate" },
          ]} />
        </Sequence>

        {/* 5. Diagram */}
        <Sequence from={S * i++} durationInFrames={S}>
          <VDiagram title="Token Lifecycle" nodes={[
            { label: "CREATE", sub: "dev deploys" },
            { label: "BOND", sub: "bonding curve", accent: true },
            { label: "MIGRATE", sub: "$69K cap" },
            { label: "RAYDIUM", sub: "full DEX" },
          ]} />
        </Sequence>

        {/* 6. Code */}
        <Sequence from={S * i++} durationInFrames={S}>
          <VCode title="Buy on PumpFun" filename="snipe.ts" lines={[
            'import { Connection } from "@solana/web3.js";',
            'import { PumpFunSDK } from "pumpdotfun-sdk";',
            '',
            'const conn = new Connection(RPC_URL);',
            'const sdk = new PumpFunSDK({ conn });',
            '',
            'const tx = await sdk.buy(',
            '  wallet, mint,',
            '  BigInt(0.1 * 1e9),',
            '  { slippage: 500 }',
            ');',
          ]} />
        </Sequence>

        {/* 7. Candlestick */}
        <Sequence from={S * i++} durationInFrames={S}>
          <VCandlestick title="Price Action — $DOGE2" candles={[
            { o: 10, h: 15, l: 8, c: 14 }, { o: 14, h: 22, l: 12, c: 20 },
            { o: 20, h: 28, l: 18, c: 25 }, { o: 25, h: 35, l: 22, c: 32 },
            { o: 32, h: 45, l: 30, c: 42 }, { o: 42, h: 48, l: 28, c: 30 },
            { o: 30, h: 34, l: 20, c: 22 }, { o: 22, h: 26, l: 15, c: 18 },
            { o: 18, h: 24, l: 16, c: 23 }, { o: 23, h: 30, l: 21, c: 28 },
          ]} />
        </Sequence>

        {/* 8. Swap */}
        <Sequence from={S * i++} durationInFrames={S}>
          <VSwap from="SOL" to="DOGE2" amount="0.5 SOL" receive="1,200,000" rate="1 SOL = 2,400,000 DOGE2" />
        </Sequence>

        {/* 9. Comparison */}
        <Sequence from={S * i++} durationInFrames={S}>
          <VComparison title="PumpFun vs PumpSwap" left="PumpFun" right="PumpSwap" rows={[
            { label: "Type", l: "Bonding Curve", r: "AMM DEX" },
            { label: "Fee", l: "1%", r: "0.25%" },
            { label: "Best For", l: "Sniping", r: "Post-migration" },
            { label: "MEV Risk", l: "Very High", r: "Moderate" },
          ]} />
        </Sequence>

        {/* 10. Callout */}
        <Sequence from={S * i++} durationInFrames={S}>
          <VCallout text="Speed is everything." sub={"10ms vs 100ms is the\ndifference between profit and loss."} />
        </Sequence>

        {/* 11. Warning */}
        <Sequence from={S * i++} durationInFrames={S}>
          <VWarning warnings={[
            "98% of tokens go to zero",
            "MEV bots will sandwich you",
            "Devs can dump at any time",
            "This is not financial advice",
          ]} />
        </Sequence>

        {/* 12. Outro */}
        <Sequence from={S * i++} durationInFrames={S}><VOutro /></Sequence>
      </div>
    </AbsoluteFill>
  );
};
