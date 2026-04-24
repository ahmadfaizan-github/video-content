import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface Order { price: string; size: string; total: string }
interface OrderBookSlideProps { title: string; bids: Order[]; asks: Order[]; spread?: string }

export const OrderBookSlide: React.FC<OrderBookSlideProps> = ({ title, bids, asks, spread }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ts = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const exitOpacity = interpolate(frame, [80, 88], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const renderOrders = (orders: Order[], side: "bid" | "ask", baseDelay: number) => {
    const maxTotal = Math.max(...orders.map(o => parseFloat(o.total.replace(/[^0-9.]/g, "")) || 0), 1);
    return orders.map((order, i) => {
      const d = baseDelay + i * 3;
      const s = spring({ frame: Math.max(0, frame - d), fps, config: { damping: 14, stiffness: 80 } });
      const opacity = interpolate(s, [0, 1], [0, 1]);
      const totalNum = parseFloat(order.total.replace(/[^0-9.]/g, "")) || 0;
      const barWidth = (totalNum / maxTotal) * 100;
      const color = side === "bid" ? COLORS.success : COLORS.danger;
      return (
        <div key={i} style={{ display: "flex", padding: "8px 20px", position: "relative", opacity }}>
          <div style={{ position: "absolute", [side === "bid" ? "right" : "left"]: 0, top: 0, bottom: 0, width: `${barWidth * interpolate(s, [0, 1], [0, 1])}%`, background: `${color}10` }} />
          <div style={{ flex: 1, fontSize: SIZES.label, fontFamily: FONTS.mono, color, textAlign: side === "bid" ? "left" : "right", fontWeight: 600, position: "relative" }}>{order.price}</div>
          <div style={{ flex: 1, fontSize: SIZES.label, fontFamily: FONTS.mono, color: COLORS.textSecondary, textAlign: "center", position: "relative" }}>{order.size}</div>
          <div style={{ flex: 1, fontSize: SIZES.label, fontFamily: FONTS.mono, color: COLORS.textDim, textAlign: side === "bid" ? "right" : "left", position: "relative" }}>{order.total}</div>
        </div>
      );
    });
  };

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: 1 }}>
      <div style={{ position: "absolute", top: 100, left: 140, display: "flex", alignItems: "center", gap: 16, opacity: interpolate(ts, [0, 1], [0, 1]), transform: `translateX(${interpolate(ts, [0, 1], [-80, 0])}px)` }}>
        <div style={{ width: 4, height: 40, background: COLORS.yellow }} />
        <div style={{ fontSize: SIZES.sectionTitle, fontWeight: 800, fontFamily: FONTS.heading, color: COLORS.white }}>{title}</div>
      </div>

      <div style={{ display: "flex", gap: 4, width: 1200, marginTop: 40 }}>
        <div style={{ flex: 1, background: COLORS.surfaceLight, border: `1px solid ${COLORS.surfaceLighter}`, padding: "12px 0" }}>
          <div style={{ display: "flex", padding: "0 20px 8px", borderBottom: `1px solid ${COLORS.surfaceLighter}` }}>
            <div style={{ flex: 1, fontSize: 12, fontFamily: FONTS.mono, color: COLORS.textDim, textTransform: "uppercase" }}>Price</div>
            <div style={{ flex: 1, fontSize: 12, fontFamily: FONTS.mono, color: COLORS.textDim, textAlign: "center", textTransform: "uppercase" }}>Size</div>
            <div style={{ flex: 1, fontSize: 12, fontFamily: FONTS.mono, color: COLORS.textDim, textAlign: "right", textTransform: "uppercase" }}>Total</div>
          </div>
          {renderOrders(bids, "bid", 8)}
        </div>

        {spread && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 120, background: COLORS.surface, border: `1px solid ${COLORS.surfaceLighter}` }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontFamily: FONTS.mono, color: COLORS.textDim, textTransform: "uppercase", marginBottom: 4 }}>Spread</div>
              <div style={{ fontSize: SIZES.bodySmall, fontFamily: FONTS.mono, color: COLORS.yellow, fontWeight: 700 }}>{spread}</div>
            </div>
          </div>
        )}

        <div style={{ flex: 1, background: COLORS.surfaceLight, border: `1px solid ${COLORS.surfaceLighter}`, padding: "12px 0" }}>
          <div style={{ display: "flex", padding: "0 20px 8px", borderBottom: `1px solid ${COLORS.surfaceLighter}` }}>
            <div style={{ flex: 1, fontSize: 12, fontFamily: FONTS.mono, color: COLORS.textDim, textTransform: "uppercase", textAlign: "right" }}>Price</div>
            <div style={{ flex: 1, fontSize: 12, fontFamily: FONTS.mono, color: COLORS.textDim, textAlign: "center", textTransform: "uppercase" }}>Size</div>
            <div style={{ flex: 1, fontSize: 12, fontFamily: FONTS.mono, color: COLORS.textDim, textTransform: "uppercase" }}>Total</div>
          </div>
          {renderOrders(asks, "ask", 12)}
        </div>
      </div>
    </AbsoluteFill>
  );
};
