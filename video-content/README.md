# NLN Video Content

Remotion-based video production system for **NoLimitNodes** YouTube. Programmatic Fireship-style videos teaching developers how to trade on Solana.

**4K UHD** (3840x2160) | **30fps** | **H.264 BT.709** | **Yellow #FBDE00 + Black**

## Project Structure

```
nln-video-content/
├── src/
│   ├── index.ts                    # Remotion entry
│   ├── Root.tsx                    # All video compositions registered here
│   ├── brand/
│   │   ├── theme.ts                # Colors, fonts, sizes — single source of truth
│   │   └── Background.tsx          # Shared animated background
│   ├── components/
│   │   ├── primitives/             # 38 reusable building blocks
│   │   │   ├── index.ts
│   │   │   ├── BarChart.tsx
│   │   │   ├── Candlestick.tsx
│   │   │   └── ...
│   │   └── slides/                 # 48 slide types
│   │       ├── index.ts
│   │       ├── TitleSlide.tsx
│   │       ├── CandlestickSlide.tsx
│   │       └── ...
│   └── videos/                     # Each video is a folder
│       ├── 001-pumpfun-sniping/
│       │   └── Video.tsx           # Landscape 16:9
│       ├── shorts-001-what-is-pumpfun/
│       │   └── Video.tsx           # Vertical 9:16 (YouTube Shorts)
│       └── ...
├── out/                            # Rendered MP4s (gitignored)
├── package.json
└── tsconfig.json
```

## Quick Start

```bash
npm install
npm run preview                     # Browse all videos in browser
npm run render:001                  # Render landscape video 001
```

Render any composition directly:

```bash
npx remotion render src/index.ts shorts-001-what-is-pumpfun out/shorts-001.mp4 --codec h264 --crf 18 --color-space bt709
```

## Formats

| Format | Resolution | Aspect | Use |
|---|---|---|---|
| Landscape | 3840x2160 | 16:9 | YouTube videos |
| Shorts | 2160x3840 | 9:16 | YouTube Shorts, TikTok, Reels |

Both use the same `scale(2)` approach — design at half resolution (1920x1080 or 1080x1920), browser renders natively at 4K.

## Making a New Video

1. Create a folder: `src/videos/002-your-topic/Video.tsx`
2. Import slides and compose your video:

```tsx
import { AbsoluteFill, Sequence } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import { Background } from "../../brand/Background";
import { TopBar, BottomBar } from "../../components/primitives";
import { TitleSlide, CodeSlide, OutroSlide } from "../../components/slides";

const { fontFamily: inter } = loadInter("normal", {
  weights: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});
loadJetBrainsMono("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin"] });

const S = 90; // 3 seconds per slide

export const Video002: React.FC = () => {
  let i = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <div style={{
        width: 1920, height: 1080,
        transform: "scale(2)", transformOrigin: "top left",
        fontFamily: inter, WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
        position: "relative", overflow: "hidden",
      }}>
        <Background />
        <Sequence from={S * i++} durationInFrames={S}>
          <TitleSlide topic="PumpSwap" title="LP Sniping" subtitle="in 60 seconds" pill="DEFI" />
        </Sequence>
        <Sequence from={S * i++} durationInFrames={S}>
          <OutroSlide />
        </Sequence>
        <Sequence from={0} durationInFrames={S * i}>
          <TopBar channel="NoLimitNodes" />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
```

3. Register in `src/Root.tsx`:

```tsx
import { Video002 } from "./videos/002-your-topic/Video";

// Inside RemotionRoot, add:
<Composition
  id="002-your-topic"
  component={Video002}
  durationInFrames={180}  // adjust to your video length
  fps={30}
  width={3840}
  height={2160}
/>
```

4. Add a render script in `package.json`:

```json
"render:002": "remotion render src/index.ts 002-your-topic out/002-your-topic.mp4 --codec h264 --crf 18 --color-space bt709"
```

5. Preview and render:

```bash
npm run preview         # Select your video from the dropdown
npm run render:002      # Render to MP4
```

## Available Slides (48)

### Openers & Structure
`TitleSlide` `ChapterSlide` `TransitionSlide` (wipe/pulse/flash) `CountdownSlide` `OutroSlide`

### Teaching & Content
`ConceptSlide` `ListSlide` `ProcessSlide` `DefinitionSlide` `ChecklistSlide` `RecapSlide` `QuoteSlide` `CalloutSlide` `AccordionSlide` `QuizSlide`

### Code & Terminal
`CodeSlide` `BigCodeSlide` `TerminalSlide` `DiffSlide`

### Charts & Data
`StatsSlide` `KeyValueSlide` `TableSlide` `BarChartSlide` `LineChartSlide` `PieChartSlide` `CandlestickSlide` `MetricDashboardSlide` `GaugeSlide`

### Comparison & Analysis
`ComparisonSlide` `ProsConsSlide` `TierListSlide` `MatrixSlide`

### Layouts & Grids
`DiagramSlide` `SplitSlide` `TwoColumnSlide` `StackSlide` `TimelineSlide` `IconGridSlide` `NumberedCardsSlide` `FeatureGridSlide`

### Alerts
`WarningSlide`

### Solana-Specific
`BondingCurveSlide` `TokenInfoSlide` `WalletSlide` `OrderBookSlide` `SwapSlide` `LiquidityPoolSlide` `MEVSlide`

## Available Primitives (38)

**Charts:** `BarChart` `LineChart` `PieChart` `Gauge` `Candlestick` `Sparkline`

**Text Effects:** `TypewriterText` `FadeInWords` `GlitchText` `CodeInline` `YellowHighlight`

**Data:** `AnimatedCounter` `ProgressBar` `PriceTag` `MiniTable` `Timer`

**Badges:** `Pill` `Tag` `Badge` `NumberCircle` `IconBadge` `Avatar`

**Indicators:** `Checkmark` `CrossMark` `FlowArrow` `Tooltip` `Pulse` `StatusDot`

**Trading:** `TokenPair` `SwapIcon`

**Layout:** `TopBar` `BottomBar` `Divider` `StepIndicator` `Reveal` `BracketGroup` `BoxCard` `WaveformBar`

## Render Settings

| Setting | Value |
|---|---|
| Resolution | 3840x2160 (4K UHD) |
| FPS | 30 |
| Codec | H.264 |
| CRF | 18 |
| Color Space | BT.709 |

All components designed at 1920x1080, wrapped with `transform: scale(2)` — browser renders text natively at 4K, no upscaling.

## Brand

| Token | Value |
|---|---|
| Yellow | `#FBDE00` |
| Black | `#000000` |
| Heading | Inter |
| Mono | JetBrains Mono |

No gradients. Flat design only. See `src/brand/theme.ts`.

## License

MIT
