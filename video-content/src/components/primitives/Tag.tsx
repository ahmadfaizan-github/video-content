import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface TagProps {
  children: React.ReactNode;
  color?: string;
  bg?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  color = COLORS.yellow,
  bg = COLORS.yellowSubtle,
}) => {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        background: bg,
        color,
        fontFamily: FONTS.mono,
        fontSize: SIZES.tiny,
        fontWeight: 600,
        letterSpacing: 1,
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
};
