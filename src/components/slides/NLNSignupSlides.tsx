import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

/* ────────────────────────────────────────────────────────────
   Animated cursor component
   ──────────────────────────────────────────────────────────── */
const Cursor: React.FC<{ x: number; y: number; clicking?: boolean }> = ({ x, y, clicking }) => (
  <div style={{
    position: "absolute", left: x, top: y, zIndex: 100,
    width: 0, height: 0,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderTop: clicking ? "18px solid #FBDE00" : "18px solid white",
    transform: "rotate(-30deg)",
    filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))",
    transition: "border-top-color 0.05s",
  }} />
);

/* ────────────────────────────────────────────────────────────
   Slide 1: NLN Homepage — recreated UI with animated cursor
   ──────────────────────────────────────────────────────────── */
export const NLNHomepageSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Cursor moves from center to Sign Up button (top-right nav area)
  const cursorX = interpolate(frame, [15, 50], [700, 1720], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cursorY = interpolate(frame, [15, 50], [400, 42], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const clicking = frame >= 55 && frame <= 65;

  // Button glow after cursor arrives
  const btnGlow = interpolate(frame, [48, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = Math.sin(frame * 0.2) * 0.3 + 0.7;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: "#0a0a0a", overflow: "hidden", opacity: fadeIn }}>

      {/* ── Nav Bar ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 70,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 60px", borderBottom: "1px solid #1a1a1a",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            background: COLORS.yellow, borderRadius: 6, padding: "4px 10px",
            fontSize: 16, fontWeight: 800, color: "#000",
          }}>NoLimit</div>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>Nodes</span>
        </div>
        <div style={{ display: "flex", gap: 36, fontSize: 16, color: "#999" }}>
          <span>Products</span><span>Pricing</span><span>Docs</span><span>Blog</span><span>Support</span>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span style={{ fontSize: 16, color: "#999" }}>Log in</span>
          <div style={{
            background: COLORS.yellow, borderRadius: 8, padding: "8px 22px",
            fontSize: 15, fontWeight: 700, color: "#000",
            boxShadow: btnGlow > 0 ? `0 0 ${25 * pulse}px ${COLORS.yellow}, 0 0 ${50 * pulse}px rgba(251,222,0,0.3)` : "none",
          }}>Sign up</div>
        </div>
      </div>

      {/* ── Hero Section ── */}
      <div style={{ position: "absolute", top: 120, left: 60, right: 60, bottom: 60, display: "flex" }}>
        {/* Left content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingRight: 60 }}>
          <div style={{ fontSize: 52, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
            Unlimited Solana RPC{"\n"}Node Power for{"\n"}
            <span style={{ color: COLORS.yellow }}>High-Performance{"\n"}Blockchain Development</span>
          </div>
          <div style={{ fontSize: 18, color: "#888", marginBottom: 32, lineHeight: 1.5 }}>
            Fast, secure, and scalable Solana nodes to power your decentralized applications.
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{
              background: COLORS.yellow, borderRadius: 10, padding: "14px 28px",
              fontSize: 16, fontWeight: 700, color: "#000",
            }}>Start Building Free →</div>
            <div style={{
              border: "1px solid #333", borderRadius: 10, padding: "14px 28px",
              fontSize: 16, fontWeight: 500, color: "#fff",
            }}>View Docs</div>
          </div>
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 8 }}>
            {["Unlimited requests forever", "Sub-50ms latency globally", "WebSocket + gRPC streaming", "Jito bundle support"].map((t, i) => (
              <div key={i} style={{ fontSize: 14, color: "#aaa", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: COLORS.yellow }}>✓</span> {t}
              </div>
            ))}
          </div>
        </div>

        {/* Right card */}
        <div style={{
          width: 420, background: "#111", borderRadius: 16, border: "1px solid #222",
          padding: 36, display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div style={{ fontSize: 12, color: COLORS.yellow, marginBottom: 12 }}>● Free forever</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Get Your API Key</div>
          <div style={{ fontSize: 14, color: "#888", marginBottom: 24 }}>Start building on Solana in seconds</div>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>Email address</div>
          <div style={{
            background: "#1a1a1a", border: "1px solid #333", borderRadius: 8,
            padding: "12px 14px", fontSize: 14, color: "#555", marginBottom: 16,
          }}>you@company.com</div>
          <div style={{
            background: COLORS.yellow, borderRadius: 8, padding: "12px 0",
            fontSize: 15, fontWeight: 700, color: "#000", textAlign: "center",
          }}>Start Building Free →</div>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
            {["No credit card required", "Unlimited requests on free plan", "Private Solana RPC endpoint"].map((t, i) => (
              <div key={i} style={{ fontSize: 12, color: "#777", display: "flex", gap: 6 }}>
                <span style={{ color: COLORS.yellow }}>✓</span> {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Title overlay ── */}
      <div style={{
        position: "absolute", bottom: 20, left: 0, right: 0, textAlign: "center",
        fontSize: 22, fontWeight: 700, color: COLORS.yellow, zIndex: 10,
      }}>
        Step 1: Go to nolimitnodes.com
      </div>

      <Cursor x={cursorX} y={cursorY} clicking={clicking} />
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   Slide 2: Signup Modal — animated email typing + click
   ──────────────────────────────────────────────────────────── */
export const NLNSignupSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Typewriter
  const email = "solanarpc@gmail.com";
  const charsVisible = Math.max(0, Math.min(email.length, Math.floor((frame - 12) / 2)));
  const typedEmail = email.slice(0, charsVisible);
  const blink = frame >= 12 && frame % 10 < 7;
  const typingDone = charsVisible >= email.length;

  // Cursor: to email field first, then down to Continue button
  const cursorX = typingDone
    ? interpolate(frame, [52, 62], [980, 960], { extrapolateRight: "clamp" })
    : interpolate(frame, [0, 12], [960, 980], { extrapolateRight: "clamp" });
  const cursorY = typingDone
    ? interpolate(frame, [52, 62], [520, 600], { extrapolateRight: "clamp" })
    : interpolate(frame, [0, 12], [400, 520], { extrapolateRight: "clamp" });

  const clicking = frame >= 66 && frame <= 74;
  const btnGlow = interpolate(frame, [60, 68], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = Math.sin(frame * 0.2) * 0.3 + 0.7;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: "#0a0a0a", overflow: "hidden", opacity: fadeIn }}>

      {/* Dimmed background */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)" }} />

      {/* ── Modal ── */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: 440, background: "#111", borderRadius: 20, border: "1px solid #222",
        padding: "40px 36px", zIndex: 10,
      }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Create your account</div>
        <div style={{ fontSize: 14, color: "#888", marginBottom: 28 }}>Free forever, no credit card required.</div>

        {/* Email label */}
        <div style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>Email</div>

        {/* Email input */}
        <div style={{
          background: "#1a1a1a", border: "1px solid #333", borderRadius: 10,
          padding: "14px 16px", fontSize: 16, color: "#fff",
          fontFamily: FONTS.mono, marginBottom: 20,
          display: "flex", alignItems: "center",
        }}>
          {typedEmail || <span style={{ color: "#555" }}>you@company.com</span>}
          {blink && typedEmail && <span style={{ color: COLORS.yellow, marginLeft: 1, fontWeight: 300 }}>|</span>}
        </div>

        {/* Continue button */}
        <div style={{
          background: COLORS.yellow, borderRadius: 10, padding: "14px 0",
          fontSize: 16, fontWeight: 700, color: "#000", textAlign: "center",
          boxShadow: btnGlow > 0 ? `0 0 ${20 * pulse}px ${COLORS.yellow}, 0 0 ${40 * pulse}px rgba(251,222,0,0.3)` : "none",
        }}>Continue</div>

        {/* Footer links */}
        <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 20 }}>
          <span style={{ fontSize: 13, color: "#555" }}>Google</span>
          <span style={{ fontSize: 13, color: "#555" }}>GitHub</span>
          <span style={{ fontSize: 13, color: "#555", textDecoration: "underline" }}>Instant access</span>
        </div>
      </div>

      {/* ── Title ── */}
      <div style={{
        position: "absolute", bottom: 20, left: 0, right: 0, textAlign: "center",
        fontSize: 22, fontWeight: 700, color: COLORS.yellow, zIndex: 20,
      }}>
        Step 2: Sign up — free, no credit card
      </div>

      <Cursor x={cursorX} y={cursorY} clicking={clicking} />
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   Slide 3: Dashboard / Quick Start — shows endpoint & API key
   ──────────────────────────────────────────────────────────── */
export const NLNApiKeySlide: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Lines reveal one by one
  const line1 = interpolate(frame, [10, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line2 = interpolate(frame, [20, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line3 = interpolate(frame, [30, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line4 = interpolate(frame, [38, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line5 = interpolate(frame, [46, 54], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line6 = interpolate(frame, [54, 62], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Endpoint highlight
  const endpointGlow = interpolate(frame, [22, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const keyGlow = interpolate(frame, [32, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = Math.sin(frame * 0.15) * 0.3 + 0.7;

  const codeStyle: React.CSSProperties = {
    fontFamily: FONTS.mono, fontSize: 18, lineHeight: 2.0,
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: "#0a0a0a", overflow: "hidden", opacity: fadeIn }}>

      {/* ── Quick Start Card ── */}
      <div style={{
        position: "absolute", top: 100, left: 120, right: 120, bottom: 80,
        background: "#111", borderRadius: 16, border: "1px solid #222",
        padding: "0", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          padding: "18px 28px", borderBottom: "1px solid #222",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20, color: COLORS.yellow }}>{"<>"}</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>Quick Start</span>
          </div>
          <div style={{
            border: "1px solid #333", borderRadius: 6, padding: "6px 16px",
            fontSize: 13, color: "#888",
          }}>📋 Copy</div>
        </div>

        {/* Tabs */}
        <div style={{ padding: "14px 28px 0", display: "flex", gap: 24 }}>
          <span style={{
            fontSize: 15, fontWeight: 700, color: COLORS.yellow,
            borderBottom: `2px solid ${COLORS.yellow}`, paddingBottom: 10,
          }}>HTTPS RPC</span>
          <span style={{ fontSize: 15, color: "#666", paddingBottom: 10 }}>WebSocket</span>
          <span style={{ fontSize: 15, color: "#666", paddingBottom: 10 }}>gRPC</span>
        </div>
        <div style={{ height: 1, background: "#222" }} />

        {/* Sub tabs */}
        <div style={{ padding: "12px 28px 0", display: "flex", gap: 20 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#fff", paddingBottom: 8 }}>cURL</span>
          <span style={{ fontSize: 14, color: "#666", paddingBottom: 8 }}>JavaScript</span>
          <span style={{ fontSize: 14, color: "#666", paddingBottom: 8 }}>Python</span>
        </div>

        {/* Code block */}
        <div style={{ padding: "20px 28px", ...codeStyle }}>
          <div style={{ opacity: line1, color: "#888" }}>
            curl{" "}
            <span style={{
              color: COLORS.yellow,
              textShadow: endpointGlow > 0 ? `0 0 ${10 * pulse}px ${COLORS.yellow}` : "none",
            }}>https://rpc.nln.clr3.org</span>
            {" \\"}
          </div>
          <div style={{ opacity: line2, color: "#888", paddingLeft: 30 }}>
            -H "Content-Type: application/json" \
          </div>
          <div style={{ opacity: line3, color: "#888", paddingLeft: 30 }}>
            -H "x-api-key:{" "}
            <span style={{
              color: COLORS.success,
              textShadow: keyGlow > 0 ? `0 0 ${10 * pulse}px ${COLORS.success}` : "none",
            }}>{process.env.NEXT_PUBLIC_STRIPE_KEY}</span>
            " \
          </div>
          <div style={{ opacity: line4, color: "#888", paddingLeft: 30 }}>
            {"-d '{"}<br />
          </div>
          <div style={{ opacity: line5, color: "#ccc", paddingLeft: 60 }}>
            "jsonrpc": "2.0",<br />
            <span style={{ paddingLeft: 0 }}>"id": 1,</span><br />
            <span style={{ paddingLeft: 0 }}>"method": "getSlot"</span>
          </div>
          <div style={{ opacity: line6, color: "#888", paddingLeft: 30 }}>
            {"}'"}
          </div>
        </div>

        {/* Footer note */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          borderTop: "1px solid #222", padding: "14px 28px",
          fontSize: 14, color: "#666",
        }}>
          <span style={{ color: COLORS.yellow }}>{">"}_</span>{" "}
          Authenticate with <span style={{ color: COLORS.yellow, fontWeight: 600 }}>x-api-key</span> (RPC/WSS) or{" "}
          <span style={{ color: COLORS.yellow, fontWeight: 600 }}>x-token</span> (gRPC). Do not expose your API key in client-side code.
        </div>
      </div>

      {/* Labels */}
      <div style={{
        position: "absolute", top: 275, right: 60,
        fontSize: 18, fontWeight: 700, color: COLORS.yellow,
        opacity: endpointGlow, zIndex: 20,
      }}>
        ← Your RPC Endpoint
      </div>
      <div style={{
        position: "absolute", top: 345, right: 60,
        fontSize: 18, fontWeight: 700, color: COLORS.success,
        opacity: keyGlow, zIndex: 20,
      }}>
        ← Your API Key
      </div>

      {/* ── Title ── */}
      <div style={{
        position: "absolute", top: 30, left: 0, right: 0, textAlign: "center",
        fontSize: SIZES.sectionTitle, fontWeight: 800, color: COLORS.textPrimary, zIndex: 10,
      }}>
        Step 3: Copy your <span style={{ color: COLORS.yellow }}>endpoint & API key</span>
      </div>
    </div>
  );
};
