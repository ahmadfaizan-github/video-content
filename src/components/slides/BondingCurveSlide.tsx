import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface BondingCurveSlideProps {
  title?: string;
  buyPoint?: number; // 0-1 position on curve
  labels?: { x: string; y: string };
}

export const BondingCurveSlide: React.FC<BondingCurveSlideProps> = ({
  title = "Bonding Curve",
  buyPoint = 0.3,
  labels = { x: "Supply", y: "Price" },
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleX = interpolate(titleSpring, [0, 1], [-80, 0]);

  // Curve draws in
  const curveProgress = interpolate(frame, [8, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Buy point appears
  const buyOpacity = interpolate(frame, [30, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const buyScale = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  const exitOpacity = interpolate(frame, [80, 88], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Curve dimensions
  const cw = 1000;
  const ch = 500;
  const padding = 60;

  // Generate exponential curve points
  const curvePoints: string[] = [];
  const numPoints = 100;
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const x = padding + t * (cw - padding * 2);
    const y = ch - padding - Math.pow(t, 2.2) * (ch - padding * 2);
    curvePoints.push(`${x},${y}`);
  }
  const pathData = `M ${curvePoints.join(" L ")}`;

  // Buy point position
  const bx = padding + buyPoint * (cw - padding * 2);
  const by = ch - padding - Math.pow(buyPoint, 2.2) * (ch - padding * 2);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 140,
          transform: `translateX(${titleX}px)`,
          opacity: titleOpacity,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div style={{ width: 4, height: 40, background: COLORS.yellow }} />
        <div
          style={{
            fontSize: SIZES.sectionTitle,
            fontWeight: 800,
            fontFamily: FONTS.heading,
            color: COLORS.white,
          }}
        >
          {title}
        </div>
      </div>

      <svg width={cw} height={ch} style={{ marginTop: 40 }}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={`h${t}`}
            x1={padding}
            y1={ch - padding - t * (ch - padding * 2)}
            x2={cw - padding}
            y2={ch - padding - t * (ch - padding * 2)}
            stroke={COLORS.surfaceLighter}
            strokeWidth={1}
          />
        ))}

        {/* Axes */}
        <line x1={padding} y1={padding} x2={padding} y2={ch - padding} stroke={COLORS.textDim} strokeWidth={2} />
        <line x1={padding} y1={ch - padding} x2={cw - padding} y2={ch - padding} stroke={COLORS.textDim} strokeWidth={2} />

        {/* Axis labels */}
        <text x={cw / 2} y={ch - 10} fill={COLORS.textDim} fontSize={16} fontFamily="Inter" textAnchor="middle">
          {labels.x}
        </text>
        <text x={15} y={ch / 2} fill={COLORS.textDim} fontSize={16} fontFamily="Inter" textAnchor="middle" transform={`rotate(-90, 15, ${ch / 2})`}>
          {labels.y}
        </text>

        {/* Curve */}
        <path
          d={pathData}
          fill="none"
          stroke={COLORS.yellow}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={2000}
          strokeDashoffset={2000 * (1 - curveProgress)}
        />

        {/* Fill area under curve */}
        <path
          d={`${pathData} L ${cw - padding},${ch - padding} L ${padding},${ch - padding} Z`}
          fill={COLORS.yellow}
          opacity={0.04 * curveProgress}
        />

        {/* Buy point */}
        <g opacity={buyOpacity}>
          {/* Dashed lines to axes */}
          <line x1={bx} y1={by} x2={bx} y2={ch - padding} stroke={COLORS.yellow} strokeWidth={1} strokeDasharray="4,4" opacity={0.4} />
          <line x1={padding} y1={by} x2={bx} y2={by} stroke={COLORS.yellow} strokeWidth={1} strokeDasharray="4,4" opacity={0.4} />

          {/* Dot */}
          <circle cx={bx} cy={by} r={8 * buyScale} fill={COLORS.yellow} />
          <circle cx={bx} cy={by} r={16 * buyScale} fill={COLORS.yellow} opacity={0.2} />

          {/* Label */}
          <text x={bx + 16} y={by - 16} fill={COLORS.yellow} fontSize={18} fontFamily="'JetBrains Mono'" fontWeight={600}>
            BUY HERE
          </text>
        </g>

        {/* Migration marker at ~0.85 */}
        <g opacity={curveProgress > 0.8 ? interpolate(curveProgress, [0.8, 0.9], [0, 1]) : 0}>
          <line
            x1={padding + 0.85 * (cw - padding * 2)}
            y1={padding}
            x2={padding + 0.85 * (cw - padding * 2)}
            y2={ch - padding}
            stroke={COLORS.danger}
            strokeWidth={2}
            strokeDasharray="6,4"
          />
          <text
            x={padding + 0.85 * (cw - padding * 2) + 10}
            y={padding + 30}
            fill={COLORS.danger}
            fontSize={16}
            fontFamily="'JetBrains Mono'"
            fontWeight={600}
          >
            MIGRATION
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
