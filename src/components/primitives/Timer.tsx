import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../../brand/theme";

interface TimerProps {
  seconds: number;
  size?: number;
  color?: string;
}

export const Timer: React.FC<TimerProps> = ({ seconds, size = 120, color = COLORS.yellow }) => {
  const frame = useCurrentFrame();
  const fps = 30;
  const remaining = Math.max(0, seconds - frame / fps);
  const mins = Math.floor(remaining / 60);
  const secs = Math.floor(remaining % 60);
  const display = `${mins}:${secs.toString().padStart(2, "0")}`;
  const progress = 1 - remaining / seconds;

  const r = size / 2 - 8;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - progress);

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={COLORS.surfaceLighter} strokeWidth={4} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: size * 0.3, fontWeight: 700, fontFamily: FONTS.mono, color: remaining < 10 ? COLORS.danger : color }}>{display}</span>
      </div>
    </div>
  );
};
