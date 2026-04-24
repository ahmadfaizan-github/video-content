import { COLORS, FONTS } from "../../brand/theme";

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  bg?: string;
  variant?: "filled" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({ children, color = COLORS.yellow, bg, variant = "filled" }) => {
  const isFilled = variant === "filled";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        background: isFilled ? (bg || color) : "transparent",
        border: isFilled ? "none" : `1.5px solid ${color}`,
        color: isFilled ? COLORS.black : color,
        fontFamily: FONTS.mono,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 0.5,
      }}
    >
      {children}
    </span>
  );
};
