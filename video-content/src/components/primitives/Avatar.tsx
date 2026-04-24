import { COLORS, FONTS } from "../../brand/theme";

interface AvatarProps {
  name: string;
  size?: number;
  color?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = 40, color = COLORS.yellow }) => {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `${color}20`,
        border: `2px solid ${color}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: size * 0.4, fontWeight: 800, fontFamily: FONTS.heading, color }}>{initials}</span>
    </div>
  );
};
