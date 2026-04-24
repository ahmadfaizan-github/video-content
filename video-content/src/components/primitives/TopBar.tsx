import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface TopBarProps {
  channel?: string;
  episode?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  channel = "NoLimitNodes",
  episode,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({ frame, fps, config: { damping: 18, stiffness: 100 } });
  const y = interpolate(slideIn, [0, 1], [-60, 0]);
  const opacity = interpolate(slideIn, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${SIZES.pagePadding}px`,
        transform: `translateY(${y}px)`,
        opacity,
        borderBottom: `1px solid ${COLORS.surfaceLighter}`,
        background: "rgba(0,0,0,0.6)",
      }}
    >
      {/* Channel name */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        {/* Yellow square logo mark */}
        <div
          style={{
            width: 20,
            height: 20,
            background: COLORS.yellow,
          }}
        />
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: SIZES.tiny,
            fontWeight: 700,
            color: COLORS.white,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {channel}
        </span>
      </div>

      {/* Episode label */}
      {episode && (
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: SIZES.tiny,
            color: COLORS.textDim,
            letterSpacing: 1,
          }}
        >
          {episode}
        </span>
      )}
    </div>
  );
};
