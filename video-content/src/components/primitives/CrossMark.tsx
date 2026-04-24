import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../brand/theme";

interface CrossMarkProps {
  delay?: number;
  size?: number;
  color?: string;
}

export const CrossMark: React.FC<CrossMarkProps> = ({
  delay = 0,
  size = 32,
  color = COLORS.danger,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 10, stiffness: 120 },
  });
  const scale = interpolate(s, [0, 1], [0, 1]);
  const strokeDash = interpolate(s, [0, 1], [0, 20]);

  return (
    <div style={{ width: size, height: size, transform: `scale(${scale})`, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="15" fill={color} opacity={0.15} />
        <path
          d="M10 10l12 12"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="20"
          strokeDashoffset={20 - strokeDash}
        />
        <path
          d="M22 10l-12 12"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="20"
          strokeDashoffset={20 - strokeDash}
        />
      </svg>
    </div>
  );
};
