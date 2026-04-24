import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../brand/theme";

interface CheckmarkProps {
  delay?: number;
  size?: number;
  color?: string;
}

export const Checkmark: React.FC<CheckmarkProps> = ({
  delay = 0,
  size = 32,
  color = COLORS.success,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 10, stiffness: 120 },
  });
  const scale = interpolate(s, [0, 1], [0, 1]);
  const strokeDash = interpolate(s, [0, 1], [0, 30]);

  return (
    <div style={{ width: size, height: size, transform: `scale(${scale})`, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="15" fill={color} opacity={0.15} />
        <path
          d="M9 16l5 5 9-10"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="30"
          strokeDashoffset={30 - strokeDash}
        />
      </svg>
    </div>
  );
};
