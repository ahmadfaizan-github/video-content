import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  distance?: number;
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, direction = "up", distance = 30 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 14, stiffness: 80 } });
  const opacity = interpolate(s, [0, 1], [0, 1]);

  let transform = "";
  if (direction === "up") transform = `translateY(${interpolate(s, [0, 1], [distance, 0])}px)`;
  else if (direction === "down") transform = `translateY(${interpolate(s, [0, 1], [-distance, 0])}px)`;
  else if (direction === "left") transform = `translateX(${interpolate(s, [0, 1], [distance, 0])}px)`;
  else if (direction === "right") transform = `translateX(${interpolate(s, [0, 1], [-distance, 0])}px)`;
  else transform = `scale(${interpolate(s, [0, 1], [0.8, 1])})`;

  return <div style={{ opacity, transform }}>{children}</div>;
};
