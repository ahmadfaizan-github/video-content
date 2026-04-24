import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../../brand/theme";

interface CandleData {
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickProps {
  candles: CandleData[];
  width?: number;
  height?: number;
  delay?: number;
}

export const Candlestick: React.FC<CandlestickProps> = ({
  candles,
  width = 800,
  height = 400,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const pad = { top: 20, right: 20, bottom: 20, left: 20 };
  const cw = width - pad.left - pad.right;
  const ch = height - pad.top - pad.bottom;

  const allValues = candles.flatMap((c) => [c.high, c.low]);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;

  const toY = (v: number) => pad.top + ch - ((v - min) / range) * ch;
  const candleWidth = Math.min(24, (cw - candles.length * 4) / candles.length);

  const revealProgress = interpolate(frame, [delay, delay + 30], [0, candles.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg width={width} height={height}>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line key={t} x1={pad.left} y1={toY(min + range * t)} x2={pad.left + cw} y2={toY(min + range * t)} stroke={COLORS.surfaceLighter} strokeWidth={1} />
      ))}

      {candles.map((candle, i) => {
        const progress = interpolate(revealProgress - i, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const x = pad.left + (i / candles.length) * cw + candleWidth / 2;
        const isGreen = candle.close >= candle.open;
        const color = isGreen ? COLORS.success : COLORS.danger;
        const bodyTop = toY(Math.max(candle.open, candle.close));
        const bodyBot = toY(Math.min(candle.open, candle.close));
        const bodyH = Math.max(1, (bodyBot - bodyTop) * progress);

        return (
          <g key={i} opacity={progress}>
            {/* Wick */}
            <line x1={x} y1={toY(candle.high)} x2={x} y2={toY(candle.low)} stroke={color} strokeWidth={1.5} />
            {/* Body */}
            <rect x={x - candleWidth / 2} y={bodyTop} width={candleWidth} height={bodyH} fill={isGreen ? color : color} rx={1} />
          </g>
        );
      })}
    </svg>
  );
};
