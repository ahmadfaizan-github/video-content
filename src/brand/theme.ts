// ═══════════════════════════════════════════════════════════════
// NLN Brand Theme — NoLimitNodes
// Yellow + Black, flat design, no gradients
// ═══════════════════════════════════════════════════════════════

export const COLORS = {
  // Primary
  yellow: "#FBDE00",
  black: "#000000",
  white: "#FFFFFF",

  // Surfaces
  surface: "#0a0a0a",
  surfaceLight: "#111111",
  surfaceLighter: "#1a1a1a",

  // Text
  textPrimary: "#FFFFFF",
  textSecondary: "#999999",
  textDim: "rgba(255,255,255,0.35)",
  textMuted: "rgba(255,255,255,0.15)",

  // Yellow variants
  yellowDim: "rgba(251, 222, 0, 0.25)",
  yellowSubtle: "rgba(251, 222, 0, 0.08)",
  yellowGlow: "rgba(251, 222, 0, 0.3)",

  // Semantic
  danger: "#FF3B3B",
  dangerDim: "rgba(255, 59, 59, 0.15)",
  dangerBorder: "rgba(255, 59, 59, 0.3)",
  success: "#00E676",
  successDim: "rgba(0, 230, 118, 0.15)",
  info: "#4FC3F7",
  infoDim: "rgba(79, 195, 247, 0.15)",

  // Code
  codeKeyword: "#FBDE00",
  codeString: "#FBDE00",
  codeNumber: "#FBDE00",
  codeType: "#FFFFFF",
  codeFunction: "#cccccc",
  codePunctuation: "#888888",
  codeComment: "#555555",
  codeIdentifier: "#cccccc",
} as const;

// Font families — actual loading happens in NLNVideo.tsx via @remotion/google-fonts.
// These strings must match what loadFont() returns (the CSS font-family name).
export const FONTS = {
  heading: "Inter, 'SF Pro Display', 'Helvetica Neue', sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
} as const;

export const SIZES = {
  // Font sizes
  heroTitle: 140,
  slideTitle: 64,
  sectionTitle: 48,
  heading: 40,
  subheading: 32,
  body: 28,
  bodySmall: 24,
  caption: 20,
  label: 18,
  tiny: 14,

  // Code
  codeLarge: 22,
  codeSmall: 18,

  // Spacing
  pagePadding: 80,
  cardPadding: 40,
  gap: 24,
  gapSmall: 12,
} as const;
