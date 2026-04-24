import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../../brand/theme";

interface DividerProps {
  delay?: number;
  width?: number;
  color?: string;
  thickness?: number;
}

export const Divider: React.FC<DividerProps> = ({
  delay = 0,
  width = 200,
  color = COLORS.yellow,
  thickness = 3,
}) => {
  const frame = useCurrentFrame();
  const currentWidth = interpolate(frame, [delay, delay + 15], [0, width], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: currentWidth,
        height: thickness,
        background: color,
      }}
    />
  );
};
