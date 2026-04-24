import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface MiniTableProps {
  rows: [string, string][];
  highlightRows?: number[];
}

export const MiniTable: React.FC<MiniTableProps> = ({ rows, highlightRows = [] }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {rows.map(([key, value], i) => (
        <div key={i} style={{ display: "flex", padding: "6px 12px", background: i % 2 === 0 ? COLORS.surfaceLight : "transparent" }}>
          <div style={{ flex: 1, fontSize: SIZES.tiny, fontFamily: FONTS.mono, color: COLORS.textDim }}>{key}</div>
          <div style={{ fontSize: SIZES.tiny, fontFamily: FONTS.mono, color: highlightRows.includes(i) ? COLORS.yellow : COLORS.white, fontWeight: highlightRows.includes(i) ? 700 : 400 }}>{value}</div>
        </div>
      ))}
    </div>
  );
};
