import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface BracketGroupProps {
  children: React.ReactNode;
  label: string;
  delay?: number;
  side?: "left" | "right";
  color?: string;
}

export const BracketGroup: React.FC<BracketGroupProps> = ({ children, label, delay = 0, side = "right", color = COLORS.yellow }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bracketH = interpolate(frame, [delay, delay + 12], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const bracket = (
    <div style={{ display: "flex", alignItems: "center", gap: 8, opacity }}>
      <svg width={20} height={60} style={{ overflow: "visible" }}>
        <path d={side === "right" ? `M 0 0 Q 16 0, 16 ${30} Q 16 60, 0 60` : `M 20 0 Q 4 0, 4 ${30} Q 4 60, 20 60`} fill="none" stroke={color} strokeWidth={2} strokeDasharray={200} strokeDashoffset={200 * (1 - bracketH / 100)} />
      </svg>
      <span style={{ fontSize: SIZES.label, fontFamily: FONTS.mono, color, whiteSpace: "nowrap" }}>{label}</span>
    </div>
  );

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {side === "left" && bracket}
      <div>{children}</div>
      {side === "right" && bracket}
    </div>
  );
};
