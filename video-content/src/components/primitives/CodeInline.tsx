import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface CodeInlineProps {
  children: React.ReactNode;
  fontSize?: number;
}

export const CodeInline: React.FC<CodeInlineProps> = ({
  children,
  fontSize = SIZES.bodySmall,
}) => {
  return (
    <span
      style={{
        fontFamily: FONTS.mono,
        fontSize,
        background: COLORS.surfaceLight,
        border: `1px solid ${COLORS.surfaceLighter}`,
        padding: "2px 10px",
        color: COLORS.yellow,
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
};
