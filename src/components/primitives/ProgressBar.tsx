import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../brand/theme";

interface ProgressBarProps {
  progress: number; // 0-100
  delay?: number;
  color?: string;
  height?: number;
  width?: number;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  delay = 0,
  color = COLORS.yellow,
  height = 8,
  width = 400,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 20, stiffness: 60 },
  });
  const currentWidth = interpolate(s, [0, 1], [0, progress]);

  return (
    <div style={{ width }}>
      {label && (
        <div
          style={{
            fontSize: 16,
            fontFamily: "'JetBrains Mono', monospace",
            color: COLORS.textSecondary,
            marginBottom: 8,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{label}</span>
          <span style={{ color }}>{Math.round(currentWidth)}%</span>
        </div>
      )}
      <div
        style={{
          width: "100%",
          height,
          background: COLORS.surfaceLighter,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${currentWidth}%`,
            height: "100%",
            background: color,
          }}
        />
      </div>
    </div>
  );
};
