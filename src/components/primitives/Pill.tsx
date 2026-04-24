import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface PillProps {
  children: React.ReactNode;
  variant?: "yellow" | "danger" | "info" | "success";
}

const VARIANTS = {
  yellow: {
    border: COLORS.yellowDim,
    bg: COLORS.yellowSubtle,
    color: COLORS.yellow,
  },
  danger: {
    border: COLORS.dangerBorder,
    bg: COLORS.dangerDim,
    color: COLORS.danger,
  },
  info: {
    border: "rgba(79, 195, 247, 0.3)",
    bg: COLORS.infoDim,
    color: COLORS.info,
  },
  success: {
    border: "rgba(0, 230, 118, 0.3)",
    bg: COLORS.successDim,
    color: COLORS.success,
  },
};

export const Pill: React.FC<PillProps> = ({ children, variant = "yellow" }) => {
  const v = VARIANTS[variant];
  return (
    <div
      style={{
        display: "inline-block",
        padding: "6px 20px",
        border: `1.5px solid ${v.border}`,
        background: v.bg,
        color: v.color,
        fontFamily: FONTS.mono,
        fontSize: SIZES.label,
        fontWeight: 600,
        letterSpacing: 3,
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
};
