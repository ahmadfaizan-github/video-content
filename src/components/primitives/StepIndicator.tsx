import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface StepIndicatorProps {
  current: number;
  total: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ current, total }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            width: i + 1 === current ? 32 : 12,
            height: 4,
            background: i + 1 === current ? COLORS.yellow : COLORS.surfaceLighter,
            transition: "width 0.2s",
          }}
        />
      ))}
      <span
        style={{
          fontFamily: FONTS.mono,
          fontSize: SIZES.tiny,
          color: COLORS.textDim,
          marginLeft: 8,
        }}
      >
        {current}/{total}
      </span>
    </div>
  );
};
