import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface BottomBarProps {
  text?: string;
  showSubscribe?: boolean;
}

export const BottomBar: React.FC<BottomBarProps> = ({
  text,
  showSubscribe = false,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [10, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [10, 20], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${SIZES.pagePadding}px`,
        opacity,
        transform: `translateY(${y}px)`,
        borderTop: `1px solid ${COLORS.surfaceLighter}`,
        background: "rgba(0,0,0,0.6)",
      }}
    >
      {text && (
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: SIZES.tiny,
            color: COLORS.textDim,
          }}
        >
          {text}
        </span>
      )}
      {showSubscribe && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              padding: "4px 16px",
              background: COLORS.yellow,
              color: COLORS.black,
              fontFamily: FONTS.mono,
              fontSize: SIZES.tiny,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            SUBSCRIBE
          </div>
        </div>
      )}
    </div>
  );
};
