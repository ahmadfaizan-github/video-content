import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

interface OutroSlideProps {
  channel?: string;
  cta?: string;
  links?: string[];
}

export const OutroSlide: React.FC<OutroSlideProps> = ({
  channel = "NoLimitNodes",
  cta = "Subscribe for more Solana alpha",
  links = [],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo punches in
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 100, overshootClamping: false },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // CTA fades in
  const ctaOpacity = interpolate(frame, [15, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaY = interpolate(frame, [15, 25], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subscribe button pulses
  const buttonSpring = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 8, stiffness: 100, overshootClamping: false },
  });
  const buttonScale = interpolate(buttonSpring, [0, 1], [0.5, 1]);
  const buttonOpacity = interpolate(buttonSpring, [0, 1], [0, 1]);

  // Links stagger in
  const linksOpacity = interpolate(frame, [30, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Large yellow square logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          width: 100,
          height: 100,
          background: COLORS.yellow,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 30,
        }}
      >
        <span
          style={{
            fontSize: 48,
            fontWeight: 900,
            fontFamily: FONTS.heading,
            color: COLORS.black,
          }}
        >
          NLN
        </span>
      </div>

      {/* Channel name */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          fontSize: SIZES.slideTitle,
          fontWeight: 900,
          fontFamily: FONTS.heading,
          color: COLORS.white,
          letterSpacing: -1,
          marginBottom: 12,
        }}
      >
        {channel}
      </div>

      {/* CTA text */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
          fontSize: SIZES.body,
          fontFamily: FONTS.mono,
          color: COLORS.textDim,
          marginBottom: 40,
        }}
      >
        {cta}
      </div>

      {/* Subscribe button */}
      <div
        style={{
          transform: `scale(${buttonScale})`,
          opacity: buttonOpacity,
          padding: "16px 48px",
          background: COLORS.yellow,
          color: COLORS.black,
          fontSize: SIZES.bodySmall,
          fontWeight: 800,
          fontFamily: FONTS.heading,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        SUBSCRIBE
      </div>

      {/* Links */}
      {links.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 40,
            opacity: linksOpacity,
          }}
        >
          {links.map((link, i) => (
            <div
              key={i}
              style={{
                fontSize: SIZES.caption,
                fontFamily: FONTS.mono,
                color: COLORS.textSecondary,
              }}
            >
              {link}
            </div>
          ))}
        </div>
      )}

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: interpolate(frame, [10, 40], [0, 300], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 3,
          background: COLORS.yellow,
          opacity: 0.4,
        }}
      />
    </AbsoluteFill>
  );
};
