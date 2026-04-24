import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../../brand/theme";

interface FlowArrowProps {
  direction?: "right" | "down";
  delay?: number;
  length?: number;
  color?: string;
}

export const FlowArrow: React.FC<FlowArrowProps> = ({
  direction = "right",
  delay = 0,
  length = 80,
  color = COLORS.yellow,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isHorizontal = direction === "right";
  const lineLength = length * progress;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: isHorizontal ? "row" : "column",
        opacity: progress,
      }}
    >
      {/* Line */}
      <div
        style={{
          width: isHorizontal ? lineLength : 3,
          height: isHorizontal ? 3 : lineLength,
          background: color,
        }}
      />
      {/* Arrowhead */}
      <div
        style={{
          width: 0,
          height: 0,
          ...(isHorizontal
            ? {
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
                borderLeft: `12px solid ${color}`,
              }
            : {
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: `12px solid ${color}`,
              }),
        }}
      />
    </div>
  );
};
