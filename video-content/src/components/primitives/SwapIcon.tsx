import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../../brand/theme";

interface SwapIconProps {
  size?: number;
  color?: string;
  delay?: number;
}

export const SwapIcon: React.FC<SwapIconProps> = ({ size = 40, color = COLORS.yellow, delay = 0 }) => {
  const frame = useCurrentFrame();
  const rotation = interpolate(frame, [delay, delay + 15], [0, 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(${rotation}deg)` }}>
      <svg width={size} height={size} viewBox="0 0 24 24">
        <path d="M7 16l-4-4 4-4" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 12h18" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <path d="M17 8l4 4-4 4" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};
