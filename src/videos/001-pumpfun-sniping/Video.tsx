import { AbsoluteFill, Sequence } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import { Background } from "../../brand/Background";
import { TopBar, BottomBar } from "../../components/primitives";
import {
  // Openers & Structure
  TitleSlide, ChapterSlide, TransitionSlide, CountdownSlide, OutroSlide,
  // Teaching
  ConceptSlide, ListSlide, ProcessSlide, DefinitionSlide, ChecklistSlide,
  RecapSlide, QuoteSlide, CalloutSlide, AccordionSlide, QuizSlide,
  // Code
  CodeSlide, BigCodeSlide, TerminalSlide, DiffSlide,
  // Data & Charts
  KeyValueSlide, StatsSlide, TableSlide, BarChartSlide, LineChartSlide,
  PieChartSlide, CandlestickSlide, MetricDashboardSlide, GaugeSlide,
  // Comparison
  ComparisonSlide, ProsConsSlide, TierListSlide, MatrixSlide,
  // Layouts
  DiagramSlide, SplitSlide, TwoColumnSlide, StackSlide, TimelineSlide,
  IconGridSlide, NumberedCardsSlide, FeatureGridSlide,
  // Alerts
  WarningSlide,
  // Solana
  BondingCurveSlide, TokenInfoSlide, WalletSlide, OrderBookSlide,
  SwapSlide, LiquidityPoolSlide, MEVSlide,
} from "../../components/slides";
import { COLORS, FONTS, SIZES } from "../../brand/theme";

const { fontFamily: inter } = loadInter("normal", {
  weights: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});
const { fontFamily: jetbrains } = loadJetBrainsMono("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const LOADED_FONTS = { inter, jetbrains };

const S = 90; // 3 seconds per slide at 30fps

export const NLNVideo: React.FC = () => {
  let i = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <div
        style={{
          width: 1920, height: 1080,
          transform: "scale(2)", transformOrigin: "top left",
          fontFamily: inter,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale" as any,
          textRendering: "optimizeLegibility",
          position: "relative", overflow: "hidden",
        }}
      >
      <Background />

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: INTRO — What is PumpFun?
          ═══════════════════════════════════════════════════════ */}

      <Sequence from={S * i++} durationInFrames={S}>
        <TitleSlide topic="PumpFun" title="Snipe Tokens" subtitle="in 120 seconds" pill="SOLANA DEFI" />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <ChapterSlide number="01" title="What is PumpFun?" subtitle="The bonding curve token launcher" />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <ConceptSlide
          title="How It Works"
          bullets={[
            { text: "Anyone can launch a token with zero code", highlight: "zero code" },
            { text: "Price follows a bonding curve — early buyers get best price" },
            { text: "At $69K market cap, liquidity migrates to Raydium" },
            { text: "Sniping = buying in the first seconds of launch", highlight: "Sniping" },
          ]}
          footnote="bonding curve = price increases as supply increases"
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <DefinitionSlide
          title="Key Terms"
          definitions={[
            { term: "Bonding Curve", definition: "A mathematical pricing function where token price increases with supply" },
            { term: "Slippage", definition: "The difference between expected price and actual execution price" },
            { term: "MEV", definition: "Maximal Extractable Value — profit from reordering transactions" },
            { term: "Rug Pull", definition: "When a dev drains liquidity, crashing the token to zero" },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <BondingCurveSlide title="The Bonding Curve" buyPoint={0.25} labels={{ x: "Token Supply", y: "Price (SOL)" }} />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <DiagramSlide
          title="Token Lifecycle"
          nodes={[
            { label: "CREATE", sublabel: "dev deploys" },
            { label: "BOND", sublabel: "bonding curve", accent: true },
            { label: "MIGRATE", sublabel: "$69K cap" },
            { label: "RAYDIUM", sublabel: "full DEX" },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <TimelineSlide
          title="PumpFun History"
          events={[
            { date: "JAN 2024", title: "PumpFun launches", description: "Bonding curve token launcher goes live on Solana" },
            { date: "MAR 2024", title: "1M tokens created", description: "Explosive growth in meme token launches" },
            { date: "NOV 2024", title: "$500M revenue", description: "Becomes highest-revenue Solana protocol" },
            { date: "MAR 2025", title: "PumpSwap launches", description: "Native AMM DEX for post-migration trading" },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <StatsSlide
          title="PumpFun by the Numbers"
          stats={[
            { value: 8, suffix: "M+", label: "Tokens Launched" },
            { value: 500, prefix: "$", suffix: "M", label: "Total Revenue" },
            { value: 2, suffix: "%", label: "Graduation Rate" },
          ]}
        />
      </Sequence>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: CHARTS & DATA VISUALIZATION
          ═══════════════════════════════════════════════════════ */}

      <Sequence from={S * i++} durationInFrames={S / 3}>
        <TransitionSlide text="THE DATA" variant="wipe" />
      </Sequence>
      <Sequence from={S * (i - 1) + S / 3} durationInFrames={S}>
        <ChapterSlide number="02" title="Charts & Data" subtitle="Visualizing on-chain metrics" />
      </Sequence>
      {(() => { i++; return null; })()}

      <Sequence from={S * i++} durationInFrames={S}>
        <BarChartSlide
          title="Top Protocols by Revenue"
          horizontal
          bars={[
            { label: "PumpFun", value: 500, color: COLORS.yellow },
            { label: "Raydium", value: 280 },
            { label: "Jupiter", value: 210 },
            { label: "Marinade", value: 95 },
            { label: "Orca", value: 72 },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <LineChartSlide
          title="SOL Price (30 Days)"
          data={[120, 125, 118, 130, 142, 138, 155, 148, 160, 172, 165, 178]}
          labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <PieChartSlide
          title="PumpFun Token Outcomes"
          slices={[
            { label: "Rugged", value: 60, color: COLORS.danger },
            { label: "Died Slowly", value: 30, color: "#666666" },
            { label: "Migrated", value: 8, color: COLORS.info },
            { label: "Profitable", value: 2, color: COLORS.success },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <CandlestickSlide
          title="Price Action"
          tokenName="$DOGE2"
          candles={[
            { open: 10, high: 15, low: 8, close: 14 },
            { open: 14, high: 22, low: 12, close: 20 },
            { open: 20, high: 28, low: 18, close: 25 },
            { open: 25, high: 35, low: 22, close: 32 },
            { open: 32, high: 45, low: 30, close: 42 },
            { open: 42, high: 48, low: 28, close: 30 },
            { open: 30, high: 34, low: 20, close: 22 },
            { open: 22, high: 26, low: 15, close: 18 },
            { open: 18, high: 24, low: 16, close: 23 },
            { open: 23, high: 30, low: 21, close: 28 },
            { open: 28, high: 38, low: 26, close: 35 },
            { open: 35, high: 42, low: 32, close: 40 },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <MetricDashboardSlide
          title="Live Dashboard"
          metrics={[
            { label: "Total Value", value: "$1,247", change: "12.3%", positive: true, sparkData: [10, 12, 11, 15, 18, 16, 20, 22] },
            { label: "Win Rate", value: "67%", change: "5%", positive: true, sparkData: [55, 58, 60, 62, 65, 63, 67, 67] },
            { label: "Avg Return", value: "3.2x", change: "0.4x", positive: true, sparkData: [2.1, 2.5, 2.8, 3.0, 2.9, 3.1, 3.2, 3.2] },
            { label: "Active Trades", value: "4", sparkData: [2, 3, 5, 4, 3, 6, 4, 4] },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <GaugeSlide
          title="Risk Assessment"
          gauges={[
            { value: 25, label: "Portfolio Risk" },
            { value: 72, label: "MEV Exposure" },
            { value: 90, label: "Rug Probability", color: COLORS.danger },
          ]}
        />
      </Sequence>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: TRADING MECHANICS
          ═══════════════════════════════════════════════════════ */}

      <Sequence from={S * i++} durationInFrames={S / 3}>
        <TransitionSlide text="TRADING" variant="pulse" />
      </Sequence>
      <Sequence from={S * (i - 1) + S / 3} durationInFrames={S}>
        <ChapterSlide number="03" title="Trading Mechanics" subtitle="Swaps, liquidity, and order books" />
      </Sequence>
      {(() => { i++; return null; })()}

      <Sequence from={S * i++} durationInFrames={S}>
        <SwapSlide
          title="Token Swap"
          fromToken="SOL" toToken="DOGE2" fromAmount="0.5 SOL" toAmount="1,200,000"
          rate="1 SOL = 2,400,000 DOGE2" fee="1%" route={["SOL", "PumpFun", "DOGE2"]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <LiquidityPoolSlide
          title="Raydium LP"
          tokenA="SOL" tokenB="DOGE2" reserveA="420 SOL" reserveB="1.2B"
          tvl="$126,000" apy="340%" fee="0.25%" volume24h="$890K"
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <OrderBookSlide
          title="Order Book"
          spread="0.3%"
          bids={[
            { price: "0.0000042", size: "2.1M", total: "8.82" },
            { price: "0.0000041", size: "3.5M", total: "14.35" },
            { price: "0.0000040", size: "5.0M", total: "20.00" },
            { price: "0.0000039", size: "8.2M", total: "31.98" },
            { price: "0.0000038", size: "12.0M", total: "45.60" },
          ]}
          asks={[
            { price: "0.0000043", size: "1.8M", total: "7.74" },
            { price: "0.0000044", size: "2.9M", total: "12.76" },
            { price: "0.0000045", size: "4.1M", total: "18.45" },
            { price: "0.0000046", size: "6.5M", total: "29.90" },
            { price: "0.0000047", size: "9.0M", total: "42.30" },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <MEVSlide title="Sandwich Attack" victimTx="Your buy: 0.5 SOL" attackerProfit="0.02 SOL" />
      </Sequence>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: SETUP & CODE
          ═══════════════════════════════════════════════════════ */}

      <Sequence from={S * i++} durationInFrames={S / 3}>
        <TransitionSlide text="LET'S BUILD" variant="flash" />
      </Sequence>
      <Sequence from={S * (i - 1) + S / 3} durationInFrames={S}>
        <ChapterSlide number="04" title="Setting Up Your Sniper" subtitle="RPC, wallet, and SDK configuration" />
      </Sequence>
      {(() => { i++; return null; })()}

      <Sequence from={S * i++} durationInFrames={S}>
        <ProcessSlide
          title="Setup Steps"
          steps={[
            { label: "Get RPC", description: "Sign up at nolimitnodes.com" },
            { label: "Create Wallet", description: "Generate a new Keypair" },
            { label: "Install SDK", description: "npm i pumpdotfun-sdk" },
            { label: "Configure", description: "Set slippage + fees" },
            { label: "Run Bot", description: "npx ts-node snipe.ts" },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <ChecklistSlide
          title="Pre-Flight Checklist"
          items={[
            { text: "Dedicated RPC endpoint configured", checked: true },
            { text: "Wallet funded with SOL for gas + buys", checked: true },
            { text: "Priority fee set (0.001+ SOL)", checked: true },
            { text: "Slippage tolerance configured (5-15%)", checked: true },
            { text: "Stop-loss strategy defined", checked: false },
            { text: "Profit-taking rules set", checked: false },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <KeyValueSlide
          title="Sniper Configuration"
          pairs={[
            { key: "RPC Endpoint", value: "NoLimitNodes Dedicated", highlight: true },
            { key: "Commitment", value: "processed" },
            { key: "Max Buy", value: "0.1 SOL" },
            { key: "Slippage", value: "500 bps (5%)" },
            { key: "Priority Fee", value: "0.001 SOL", highlight: true },
            { key: "Auto-Sell", value: "2x or -50% stop-loss" },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <CodeSlide
          title="The Buy Transaction"
          filename="snipe.ts"
          code={[
            'import { Connection, Keypair } from "@solana/web3.js";',
            'import { PumpFunSDK } from "pumpdotfun-sdk";',
            "",
            "const connection = new Connection(RPC_URL);",
            "const wallet = Keypair.fromSecretKey(SECRET);",
            "const sdk = new PumpFunSDK({ connection });",
            "",
            "const mint = new PublicKey(TOKEN_MINT);",
            "const tx = await sdk.buy(",
            '  wallet, mint, BigInt(0.1 * 1e9),',
            '  { slippage: 500 }',
            ");",
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <BigCodeSlide
          filename="listener.ts"
          highlightLines={[7, 8, 9]}
          code={[
            'import { Connection } from "@solana/web3.js";',
            "",
            'const PUMP_PROGRAM = "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P";',
            "",
            "const conn = new Connection(RPC_URL, {",
            '  commitment: "processed",',
            "  wsEndpoint: WS_URL,",
            "});",
            "",
            "conn.onLogs(PUMP_PROGRAM, async (logs) => {",
            '  if (logs.logs.some(l => l.includes("InitializeMint"))) {',
            "    const mint = parseMintFromLogs(logs);",
            '    console.log("New token:", mint);',
            "    await executeBuy(mint);",
            "  }",
            "});",
            "",
            'console.log("Listening for new mints...");',
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <DiffSlide
          title="Adding Priority Fees"
          filename="snipe.ts"
          lines={[
            { text: "const tx = await sdk.buy(", type: "context" },
            { text: "  wallet, mint, BigInt(0.1 * 1e9),", type: "context" },
            { text: '  { slippage: 500 }', type: "removed" },
            { text: "  {", type: "added" },
            { text: "    slippage: 500,", type: "added" },
            { text: "    priorityFee: 0.001 * 1e9,", type: "added" },
            { text: '    commitment: "processed",', type: "added" },
            { text: "  }", type: "added" },
            { text: ");", type: "context" },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <TerminalSlide
          title="Running the Sniper"
          lines={[
            { text: "npx ts-node snipe.ts", type: "command" },
            { text: "Listening for new PumpFun mints...", type: "info" },
            { text: "New token: $DOGE2 (7xKp...)", type: "output" },
            { text: "Buying 0.1 SOL worth...", type: "output" },
            { text: "TX confirmed: 4nFz...kQ2m", type: "success" },
            { text: "Entry price: 0.0000021 SOL", type: "info" },
            { text: "Watching for 2x target...", type: "output" },
          ]}
        />
      </Sequence>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5: TOKEN ANALYSIS
          ═══════════════════════════════════════════════════════ */}

      <Sequence from={S * i++} durationInFrames={S}>
        <ChapterSlide number="05" title="Token Analysis" subtitle="Evaluating what to snipe" />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <TokenInfoSlide
          name="Doge 2.0" symbol="DOGE2" mint="7xKp...3nFz" status="live"
          stats={[
            { label: "Market Cap", value: "$42,000", highlight: true },
            { label: "Price", value: "0.0000042 SOL" },
            { label: "Holders", value: "847" },
            { label: "24h Volume", value: "$180K", highlight: true },
            { label: "Created", value: "2 min ago" },
            { label: "Dev Holds", value: "3.2%" },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <WalletSlide
          title="Sniper Wallet" address="8Kag...wQ2m" totalValue="$1,247.83"
          tokens={[
            { symbol: "SOL", amount: "4.2", value: "$630.00", change: "+2.3%", changePositive: true },
            { symbol: "DOGE2", amount: "1.2M", value: "$504.00", change: "+140%", changePositive: true },
            { symbol: "PEPE3", amount: "800K", value: "$82.40", change: "-23%", changePositive: false },
            { symbol: "BONK", amount: "5M", value: "$31.43", change: "+8%", changePositive: true },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <NumberedCardsSlide
          title="Token Red Flags"
          cards={[
            { title: "High Dev Allocation", description: "Dev holds >10% of supply — can dump at any time" },
            { title: "No Social Presence", description: "No Twitter, no Telegram = likely a quick rug" },
            { title: "Copied Metadata", description: "Reused name/image from existing tokens" },
            { title: "Instant Sell Pressure", description: "Large sells within first 30 seconds" },
            { title: "Locked Liquidity?", description: "Check if LP tokens are burned or locked" },
            { title: "Sniper Dominance", description: "Top 10 wallets hold >50% of supply" },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <IconGridSlide
          title="Analysis Tools"
          columns={3}
          items={[
            { icon: "B", label: "Birdeye", description: "Token charts and analytics" },
            { icon: "D", label: "DexScreener", description: "Real-time DEX data" },
            { icon: "R", label: "RugCheck", description: "Token safety scanner" },
            { icon: "S", label: "SolScan", description: "Blockchain explorer" },
            { icon: "P", label: "Pump.fun", description: "New token feed" },
            { icon: "J", label: "Jupiter", description: "Best swap aggregator" },
          ]}
        />
      </Sequence>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6: COMPARISON & STRATEGY
          ═══════════════════════════════════════════════════════ */}

      <Sequence from={S * i++} durationInFrames={S}>
        <ChapterSlide number="06" title="Strategy & Comparison" subtitle="Choosing the right approach" />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <ComparisonSlide
          title="PumpFun vs PumpSwap"
          leftTitle="PumpFun" rightTitle="PumpSwap"
          rows={[
            { label: "Type", left: "Bonding Curve", right: "AMM DEX" },
            { label: "Fee", left: "1%", right: "0.25%" },
            { label: "Liquidity", left: "Curve-locked", right: "LP pools" },
            { label: "Best For", left: "Sniping launches", right: "Post-migration" },
            { label: "MEV Risk", left: "Very High", right: "Moderate" },
          ]}
          winner="left"
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <ProsConsSlide
          title="Token Sniping"
          pros={[
            "Massive upside potential (10-100x)",
            "First-mover advantage on new launches",
            "Automated execution beats manual traders",
            "Low capital required (0.1 SOL per trade)",
          ]}
          cons={[
            "98% of tokens go to zero",
            "MEV bots can front-run you",
            "Rug pulls are extremely common",
            "Requires fast, reliable RPC",
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <TierListSlide
          title="RPC Provider Tier List"
          tiers={[
            { tier: "S", color: COLORS.yellow, items: ["NoLimitNodes", "Triton"] },
            { tier: "A", color: COLORS.success, items: ["Helius", "GenesysGo"] },
            { tier: "B", color: COLORS.info, items: ["QuickNode", "Alchemy"] },
            { tier: "C", color: "#888888", items: ["Public RPC"] },
            { tier: "F", color: COLORS.danger, items: ["Shared free nodes"] },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <MatrixSlide
          title="Strategy Matrix"
          columns={2}
          colLabels={["Low Risk", "High Risk"]}
          rowLabels={["Passive", "Active"]}
          cells={[
            { label: "LP Farming", description: "Provide liquidity to stable pools" },
            { label: "New Token Sniping", description: "Buy at launch, high reward/risk", accent: true },
            { label: "Copy Trading", description: "Mirror successful wallets" },
            { label: "MEV Botting", description: "Extract value from tx ordering" },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <TableSlide
          title="RPC Provider Comparison"
          headers={["Provider", "Latency", "Rate Limit", "Price"]}
          highlightColumn={3}
          rows={[
            ["NoLimitNodes", "< 10ms", "Unlimited", "$49/mo"],
            ["Helius", "15-30ms", "50 RPS", "$49/mo"],
            ["QuickNode", "20-40ms", "25 RPS", "$49/mo"],
            ["Public RPC", "100ms+", "2 RPS", "Free"],
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <StackSlide
          title="The Sniping Stack"
          layers={[
            { label: "Your Trading Bot", sublabel: "TypeScript", accent: true },
            { label: "PumpFun SDK", sublabel: "pumpdotfun-sdk" },
            { label: "Solana Web3.js", sublabel: "@solana/web3.js" },
            { label: "RPC Node", sublabel: "NoLimitNodes" },
            { label: "Solana Blockchain", sublabel: "Mainnet Beta" },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <TwoColumnSlide
          title="Strategy Overview"
          leftTitle="Entry Rules" rightTitle="Exit Rules"
          leftItems={[
            { text: "New token detected on PumpFun" },
            { text: "Dev wallet holds < 5% supply" },
            { text: "Initial buy within first 10 seconds" },
            { text: "Max position: 0.1 SOL" },
          ]}
          rightItems={[
            { text: "Take profit at 2x (sell 50%)" },
            { text: "Take profit at 5x (sell 25%)" },
            { text: "Stop-loss at -50%" },
            { text: "Time-based exit after 1 hour" },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <SplitSlide
          title="Before vs After Optimization"
          leftLabel="Before" rightLabel="After"
          leftContent={
            <div style={{ fontFamily: FONTS.mono, fontSize: SIZES.bodySmall, color: COLORS.textSecondary, lineHeight: 2 }}>
              <div>Latency: <span style={{ color: COLORS.danger }}>200ms</span></div>
              <div>Success Rate: <span style={{ color: COLORS.danger }}>12%</span></div>
              <div>Avg Entry: <span style={{ color: COLORS.danger }}>Top 40%</span></div>
              <div>Monthly P&L: <span style={{ color: COLORS.danger }}>-2.4 SOL</span></div>
            </div>
          }
          rightContent={
            <div style={{ fontFamily: FONTS.mono, fontSize: SIZES.bodySmall, color: COLORS.textSecondary, lineHeight: 2 }}>
              <div>Latency: <span style={{ color: COLORS.success }}>8ms</span></div>
              <div>Success Rate: <span style={{ color: COLORS.success }}>67%</span></div>
              <div>Avg Entry: <span style={{ color: COLORS.success }}>Top 5%</span></div>
              <div>Monthly P&L: <span style={{ color: COLORS.success }}>+14.2 SOL</span></div>
            </div>
          }
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <FeatureGridSlide
          title="NoLimitNodes Features"
          features={[
            { title: "Unlimited RPS", description: "No rate limits, ever", highlight: true },
            { title: "< 10ms Latency", description: "Bare-metal servers in key regions" },
            { title: "WebSocket Support", description: "Real-time transaction streaming" },
            { title: "Geyser gRPC", description: "Low-latency account updates" },
            { title: "99.99% Uptime", description: "Enterprise-grade reliability" },
            { title: "Dedicated Nodes", description: "No shared resources" },
          ]}
        />
      </Sequence>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7: KNOWLEDGE CHECK & WRAP UP
          ═══════════════════════════════════════════════════════ */}

      <Sequence from={S * i++} durationInFrames={S}>
        <ChapterSlide number="07" title="Knowledge Check" subtitle="Test what you learned" />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <QuizSlide
          question="At what market cap does a PumpFun token migrate to Raydium?"
          options={["$10,000", "$42,069", "$69,000", "$100,000"]}
          correctIndex={2}
          revealAt={50}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <AccordionSlide
          title="FAQ"
          items={[
            { title: "How much SOL do I need to start?", content: "0.5 SOL is enough — 0.1 per snipe plus gas fees. Start small and scale up.", expandAt: 15 },
            { title: "Which RPC should I use?", content: "A dedicated RPC like NoLimitNodes. Public RPCs are too slow for sniping.", expandAt: 35 },
            { title: "Is this legal?", content: "Automated trading on Solana is legal. However, this is not financial advice.", expandAt: 55 },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <QuoteSlide
          quote="The goal is not to win every trade. The goal is to have your winners massively outweigh your losers."
          author="NoLimitNodes" source="Solana Trading Guide"
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <ListSlide
          title="Common Mistakes"
          items={[
            { text: "Using public RPCs for sniping", sub: "You'll always be last — use a dedicated node" },
            { text: "No stop-loss strategy", sub: "Define your max loss before entering any trade" },
            { text: "Overallocating to a single token", sub: "Never put more than 0.1 SOL in one snipe" },
            { text: "Ignoring dev wallet distribution", sub: "Check holder % before buying — devs can dump" },
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <CalloutSlide text="Speed is everything." subtext="The difference between 10ms and 100ms is the difference between profit and loss." variant="yellow" />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <WarningSlide
          title="Risks" severity="danger"
          warnings={[
            "98% of PumpFun tokens go to zero — never risk more than you can lose",
            "MEV bots will sandwich your transactions — use private RPCs",
            "Dev wallets can dump on you — always check holder distribution",
            "This is not financial advice — trade at your own risk",
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <RecapSlide
          title="What We Learned"
          points={[
            "PumpFun uses a bonding curve for token pricing",
            "Sniping = buying new tokens in the first seconds",
            "You need a fast RPC, proper slippage, and priority fees",
            "Always define entry rules, exit rules, and stop-losses",
            "98% of tokens fail — manage risk accordingly",
          ]}
        />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <CountdownSlide text="NEXT EPISODE IN" seconds={3} subtext="PumpSwap Deep Dive — Coming Soon" />
      </Sequence>

      <Sequence from={S * i++} durationInFrames={S}>
        <OutroSlide channel="NoLimitNodes" cta="Subscribe for more Solana trading alpha" links={["nolimitnodes.com", "@NoLimitNodes", "discord.gg/nln"]} />
      </Sequence>

      {/* ═══ Persistent Overlays ═══ */}
      <Sequence from={0} durationInFrames={S * i}>
        <TopBar channel="NoLimitNodes" episode="EP.001 — FULL SHOWCASE" />
      </Sequence>
      <Sequence from={0} durationInFrames={S * (i - 1)}>
        <BottomBar text="nolimitnodes.com" />
      </Sequence>
      </div>
    </AbsoluteFill>
  );
};
