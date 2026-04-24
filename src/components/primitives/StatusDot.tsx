import { COLORS, FONTS } from "../../brand/theme";

interface StatusDotProps {
  status: "online" | "offline" | "warning" | "error";
  label?: string;
  size?: number;
}

const STATUS_MAP = {
  online: COLORS.success,
  offline: COLORS.textDim,
  warning: COLORS.yellow,
  error: COLORS.danger,
};

export const StatusDot: React.FC<StatusDotProps> = ({ status, label, size = 10 }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: size, height: size, borderRadius: "50%", background: STATUS_MAP[status] }} />
      {label && <span style={{ fontSize: 14, fontFamily: FONTS.mono, color: COLORS.textSecondary }}>{label}</span>}
    </div>
  );
};
