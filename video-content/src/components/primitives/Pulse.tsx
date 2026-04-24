import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../../brand/theme";

interface PulseProps {
  color?: string;
  size?: number;
}

export const Pulse: React.FC<PulseProps> = ({ color = COLORS.success, size = 12 }) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.4, 1]);
  const ringScale = interpolate(Math.sin(frame * 0.15), [-1, 1], [1, 1.8]);
  const ringOpacity = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.4, 0]);

  return (
    <div style={{ position: "relative", width: size * 2, height: size * 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", width: size, height: size, borderRadius: "50%", border: `2px solid ${color}`, transform: `scale(${ringScale})`, opacity: ringOpacity }} />
      <div style={{ width: size, height: size, borderRadius: "50%", background: color, opacity: pulse }} />
    </div>
  );
};
