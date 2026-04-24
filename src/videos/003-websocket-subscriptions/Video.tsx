import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import { Background } from "../../brand/Background";
import { TopBar, BottomBar } from "../../components/primitives";
import {
  TitleSlide, ChapterSlide, TransitionSlide, CountdownSlide, OutroSlide,
  ConceptSlide, ListSlide, ProcessSlide, ChecklistSlide,
  RecapSlide, CalloutSlide, DefinitionSlide,
  CodeSlide, BigCodeSlide, TerminalSlide,
  KeyValueSlide, TableSlide,
  ComparisonSlide,
  DiagramSlide, FeatureGridSlide,
  WarningSlide,
  NLNHomepageSlide, NLNSignupSlide, NLNApiKeySlide,
} from "../../components/slides";
import { COLORS } from "../../brand/theme";

const { fontFamily: inter } = loadInter("normal", {
  weights: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});
const { fontFamily: jetbrains } = loadJetBrainsMono("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

// Hardcoded timings: S[slideNum] = [from, durationInFrames]
const S: Record<number, [number, number]> = {
  1: [0, 243], 2: [243, 665], 3: [908, 631], 4: [1539, 511], 5: [2050, 731],
  6: [2781, 181], 7: [2962, 235], 8: [3197, 240], 9: [3437, 310], 10: [3747, 391],
  11: [4138, 642],
  12: [4825, 126], 13: [4951, 460], 14: [5411, 264], 15: [5675, 578], 16: [6253, 345],
  17: [6643, 108], 18: [6751, 577], 19: [7328, 638], 20: [7966, 564], 21: [8530, 518], 22: [9048, 405], 23: [9453, 279],
  24: [9777, 109], 25: [9886, 553], 26: [10439, 650], 27: [11089, 410], 28: [11499, 441], 29: [11940, 414], 30: [12354, 214], 31: [12568, 384],
  32: [12997, 106], 33: [13103, 675], 34: [13778, 527], 35: [14305, 519], 36: [14824, 320], 37: [15144, 265], 38: [15409, 447],
  39: [15901, 116], 40: [16017, 621], 41: [16638, 558], 42: [17196, 571], 43: [17767, 240], 44: [18007, 389],
  45: [18441, 108], 46: [18549, 546], 47: [19095, 337], 48: [19432, 207], 49: [19639, 492],
  50: [20176, 123], 51: [20299, 770], 52: [21069, 443], 53: [21512, 581], 54: [22093, 486],
  55: [22579, 101], 56: [22680, 557],
  57: [23282, 79], 58: [23361, 706], 59: [24067, 491], 60: [24558, 288], 61: [24846, 175], 62: [25021, 407],
};
const TR = [4780, 6598, 9732, 12952, 15856, 18396, 20131, 23237];
const TOTAL = 25428;

const audio = (n: number) => staticFile(`audio/003/slide_${String(n).padStart(3, '0')}.wav`);
const ss = (n: number) => ({ from: S[n][0], durationInFrames: S[n][1] });

export const Video003: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>

      {/* ═══ AUDIO TRACK ═══ */}
      {Object.entries(S).map(([num, [from, dur]]) => (
        <Sequence key={`a${num}`} from={from + 15} durationInFrames={dur - 15}>
          <Audio src={audio(Number(num))} />
        </Sequence>
      ))}

      {/* ═══ VISUAL TRACK ═══ */}
      <div style={{
        width: 1920, height: 1080,
        transform: "scale(2)", transformOrigin: "top left",
        fontFamily: inter,
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale" as any,
        textRendering: "optimizeLegibility",
        position: "relative", overflow: "hidden",
      }}>
      <Background />

      {/* ═══ SECTION 1: INTRO ═══ */}

      <Sequence {...ss(1)}><TitleSlide topic="Solana WebSocket" title="Real-Time Subscriptions" subtitle="in Python" pill="PYTHON TUTORIAL" /></Sequence>

      <Sequence {...ss(2)}><ConceptSlide title="What are WebSocket Subscriptions?" bullets={[
        { text: "Persistent connection to a Solana RPC node over WebSocket", highlight: "persistent connection" },
        { text: "Subscribe to events — get notified in real-time when things change" },
        { text: "JSON-RPC 2.0 protocol — send JSON, receive JSON notifications", highlight: "JSON-RPC 2.0" },
        { text: "No polling needed — the node pushes updates directly to you" },
      ]} footnote="WebSocket endpoint: wss://your-endpoint/ (TLS encrypted)" /></Sequence>

      <Sequence {...ss(3)}><ComparisonSlide title="REST vs WebSocket" leftTitle="REST (HTTP)" rightTitle="WebSocket" rows={[
        { label: "Connection", left: "New request each time", right: "Persistent connection" },
        { label: "Data Flow", left: "You poll for updates", right: "Server pushes to you" },
        { label: "Format", left: "JSON over HTTP", right: "JSON over WebSocket" },
        { label: "Latency", left: "Higher (per-request overhead)", right: "Lower (persistent)" },
        { label: "Use Case", left: "One-off queries", right: "Real-time streaming" },
      ]} winner="right" /></Sequence>

      <Sequence {...ss(4)}><DiagramSlide title="How It Works" nodes={[
        { label: "YOUR APP", sublabel: "Python client" },
        { label: "WEBSOCKET", sublabel: "persistent conn", accent: true },
        { label: "RPC NODE", sublabel: "NoLimitNodes" },
        { label: "SOLANA", sublabel: "blockchain" },
      ]} /></Sequence>

      <Sequence {...ss(5)}><ListSlide title="What You'll Learn" items={[
        { text: "accountSubscribe", sub: "Watch any account for balance or data changes" },
        { text: "programSubscribe", sub: "Monitor all accounts owned by a program" },
        { text: "logsSubscribe", sub: "Stream transaction logs filtered by program" },
        { text: "signatureSubscribe", sub: "Track a specific transaction's confirmation" },
        { text: "slotSubscribe", sub: "Get notified on every new slot" },
        { text: "Plus 4 additional subscriptions", sub: "blockSubscribe, slotUpdatesSubscribe, rootSubscribe, voteSubscribe" },
      ]} /></Sequence>

      {/* ═══ SECTION 2: NLN SIGNUP ═══ */}

      <Sequence {...ss(6)}><ChapterSlide number="00" title="Get Your API Key" subtitle="Sign up at nolimitnodes.com" /></Sequence>
      <Sequence {...ss(7)}><NLNHomepageSlide /></Sequence>
      <Sequence {...ss(8)}><NLNSignupSlide /></Sequence>
      <Sequence {...ss(9)}><NLNApiKeySlide /></Sequence>
      <Sequence {...ss(10)}><CalloutSlide text="You need a NoLimitNodes API key to follow along." subtext="Sign up free at nolimitnodes.com — all code is in the blog post linked in the description below." variant="yellow" /></Sequence>

      {/* ═══ SECTION 3: TOC ═══ */}

      <Sequence {...ss(11)}><TableSlide title="Table of Contents" headers={["#", "Topic", "Timestamp"]} rows={[
        ["1", "Python Setup & Connection", "2:41"],
        ["2", "accountSubscribe", "3:41"],
        ["3", "programSubscribe", "5:26"],
        ["4", "logsSubscribe", "7:13"],
        ["5", "signatureSubscribe", "8:50"],
        ["6", "slotSubscribe", "10:15"],
        ["7", "Additional Subscriptions", "11:13"],
      ]} /></Sequence>

      {/* ═══ SECTION 4: PYTHON SETUP ═══ */}

      <Sequence from={TR[0]} durationInFrames={45}><TransitionSlide text="SETUP" variant="wipe" /></Sequence>
      <Sequence {...ss(12)}><ChapterSlide number="01" title="Python Setup & Connection" subtitle="Install dependencies and connect" /></Sequence>
      <Sequence {...ss(13)}><ChecklistSlide title="Prerequisites" items={[
        { text: "Python 3.10 or higher installed", checked: true },
        { text: "websockets package for WebSocket connections", checked: true },
        { text: "json module (built-in) for JSON-RPC messages", checked: true },
        { text: "NoLimitNodes WebSocket endpoint URL", checked: true },
      ]} /></Sequence>
      <Sequence {...ss(14)}><TerminalSlide title="Install Dependencies" lines={[
        { text: "pip install websockets", type: "command" },
        { text: "Collecting websockets...", type: "output" },
        { text: "Successfully installed websockets-13.1", type: "success" },
      ]} /></Sequence>
      <Sequence {...ss(15)}><BigCodeSlide filename="connect.py" highlightLines={[5,6,7,8,9,10,11,12,13]} code={[
        "import asyncio","import json","import websockets","",
        '# Your NoLimitNodes WebSocket endpoint','WS_URL = "wss://your-nln-ws-endpoint"',"",
        "async def subscribe(method: str, params: list = []):",
        "    async with websockets.connect(WS_URL) as ws:",
        "        # Send subscription request","        request = {",
        '            "jsonrpc": "2.0",','            "id": 1,',
        '            "method": method,','            "params": params,',"        }",
        "        await ws.send(json.dumps(request))","",
        "        # First response = subscription ID",
        "        response = json.loads(await ws.recv())",
        '        sub_id = response[\"result\"]',
        '        print(f"Subscribed: {method} (id={sub_id})")',"",
        "        # Listen for notifications","        async for msg in ws:",
        "            data = json.loads(msg)","            yield data",
      ]} /></Sequence>
      <Sequence {...ss(16)}><CalloutSlide text="This helper function is reused in every example." subtext="Replace the WS_URL with your NoLimitNodes WebSocket endpoint. It handles subscribing and yields notifications." variant="white" /></Sequence>

      {/* ═══ SECTION 5: accountSubscribe ═══ */}

      <Sequence from={TR[1]} durationInFrames={45}><TransitionSlide text="ACCOUNT" variant="pulse" /></Sequence>
      <Sequence {...ss(17)}><ChapterSlide number="02" title="accountSubscribe" subtitle="Watch any account for changes" /></Sequence>
      <Sequence {...ss(18)}><ConceptSlide title="accountSubscribe" bullets={[
        { text: "Get notified when an account's lamports or data change", highlight: "lamports or data" },
        { text: "The most commonly used WebSocket subscription" },
        { text: "Supports encoding options: base64, jsonParsed, base58" },
        { text: "Optional data slicing to receive only specific bytes", highlight: "data slicing" },
      ]} footnote="Receives the same data structure as getAccountInfo" /></Sequence>
      <Sequence {...ss(19)}><DefinitionSlide title="accountSubscribe Parameters" definitions={[
        { term: "account (required)", definition: "Base-58 encoded public key of the account to watch" },
        { term: "commitment", definition: "processed | confirmed | finalized (default: finalized)" },
        { term: "encoding", definition: "base58 | base64 | base64+zstd | jsonParsed (default: base64)" },
        { term: "dataSlice", definition: "{ offset, length } — receive only specific bytes of account data" },
      ]} /></Sequence>
      <Sequence {...ss(20)}><BigCodeSlide filename="account_subscribe.py" highlightLines={[4,5,6,7,8,9,10,11]} code={[
        "import asyncio, json, websockets","","async def watch_account(pubkey: str):",
        "    async with websockets.connect(WS_URL) as ws:","        request = {",
        '            "jsonrpc": "2.0", "id": 1,',
        '            "method": "accountSubscribe",','            "params": [',"                pubkey,",
        '                {"encoding": "jsonParsed", "commitment": "confirmed"}',"            ]","        }",
        "        await ws.send(json.dumps(request))",
        "        response = json.loads(await ws.recv())",
        '        print(f"Subscribed (id={response[\'result\']})")',"",
        "        async for msg in ws:","            data = json.loads(msg)",
        '            value = data["params"]["result"]["value"]',
        '            print(f"Lamports: {value[\'lamports\']}")',
        '            print(f"Owner: {value[\'owner\']}")',
        '            print(f"Data: {value[\'data\']}")',
      ]} /></Sequence>
      <Sequence {...ss(21)}><CodeSlide title="accountSubscribe with Data Slicing" filename="account_slice.py" code={[
        "# Only receive first 32 bytes of account data","request = {",
        '    "jsonrpc": "2.0", "id": 1,',
        '    "method": "accountSubscribe",','    "params": [',
        '        "YourAccountPubkey...",',"        {",
        '            "encoding": "base64",',
        '            "commitment": "confirmed",',
        '            "dataSlice": {"offset": 0, "length": 32}',"        }","    ]","}",
      ]} /></Sequence>
      <Sequence {...ss(22)}><ListSlide title="accountSubscribe — Use Cases" items={[
        { text: "Wallet Balance Monitoring", sub: "Get notified when SOL balance changes" },
        { text: "Token Account Tracking", sub: "Watch for token transfers to/from an account" },
        { text: "Program State Changes", sub: "Monitor when a program's data account is updated" },
        { text: "Real-Time Price Feeds", sub: "Watch oracle accounts like Pyth or Switchboard" },
      ]} /></Sequence>
      <Sequence {...ss(23)}><TerminalSlide title="accountSubscribe Output" lines={[
        { text: "python account_subscribe.py", type: "command" },
        { text: "Subscribed (id=23784)", type: "success" },
        { text: "Lamports: 1169280", type: "output" },
        { text: 'Owner: Sysvar1111111111111111111111111111111111111', type: "output" },
        { text: 'Data: {"program": "sysvar", "parsed": {...}}', type: "output" },
      ]} /></Sequence>

      {/* ═══ SECTION 6: programSubscribe ═══ */}

      <Sequence from={TR[2]} durationInFrames={45}><TransitionSlide text="PROGRAM" variant="flash" /></Sequence>
      <Sequence {...ss(24)}><ChapterSlide number="03" title="programSubscribe" subtitle="Monitor all accounts owned by a program" /></Sequence>
      <Sequence {...ss(25)}><ConceptSlide title="programSubscribe" bullets={[
        { text: "Watch ALL accounts owned by a specific program", highlight: "ALL accounts" },
        { text: "Like accountSubscribe but for an entire program at once" },
        { text: "Supports up to 4 filters: dataSize, memcmp, and more" },
        { text: "Notifications include the account pubkey and updated data", highlight: "account pubkey" },
      ]} footnote="Great for watching Token Program, System Program, or your own programs" /></Sequence>
      <Sequence {...ss(26)}><DefinitionSlide title="programSubscribe Parameters" definitions={[
        { term: "program_id (required)", definition: "Base-58 encoded program public key to monitor" },
        { term: "commitment", definition: "processed | confirmed | finalized (default: finalized)" },
        { term: "encoding", definition: "base58 | base64 | base64+zstd | jsonParsed (default: base64)" },
        { term: "filters", definition: "Up to 4 filter objects: dataSize, memcmp — all must match (AND logic)" },
        { term: "dataSlice", definition: "{ offset, length } — receive only specific bytes" },
      ]} /></Sequence>
      <Sequence {...ss(27)}><BigCodeSlide filename="program_subscribe.py" highlightLines={[4,5,6,7,8,9,10]} code={[
        "# Watch all accounts owned by the System Program",
        "async def watch_program(program_id: str):",
        "    async with websockets.connect(WS_URL) as ws:","        request = {",
        '            "jsonrpc": "2.0", "id": 1,',
        '            "method": "programSubscribe",','            "params": [',"                program_id,",
        '                {"encoding": "base64", "commitment": "confirmed"}',"            ]","        }",
        "        await ws.send(json.dumps(request))",
        "        response = json.loads(await ws.recv())",
        '        print(f"Subscribed (id={response[\'result\']})")',"",
        "        async for msg in ws:","            data = json.loads(msg)",
        '            value = data["params"]["result"]["value"]',
        '            print(f"Account: {value[\'pubkey\']}")',
        '            print(f"Lamports: {value[\'account\'][\'lamports\']}")',
      ]} /></Sequence>
      <Sequence {...ss(28)}><CodeSlide title="programSubscribe with Filters" filename="program_filtered.py" code={[
        "# Watch Token Program — filter by data size (165 = token account)","request = {",
        '    "jsonrpc": "2.0", "id": 1,',
        '    "method": "programSubscribe",','    "params": [',
        '        "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",',"        {",
        '            "encoding": "base64",',
        '            "commitment": "confirmed",',
        '            "filters": [','                {"dataSize": 165}',"            ]","        }","    ]","}",
      ]} /></Sequence>
      <Sequence {...ss(29)}><CodeSlide title="programSubscribe — memcmp Filter" filename="program_memcmp.py" code={[
        "# Watch token accounts for a specific mint",
        '# memcmp at offset 0 = mint address in token account layout',"request = {",
        '    "jsonrpc": "2.0", "id": 1,',
        '    "method": "programSubscribe",','    "params": [',
        '        "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",',"        {",
        '            "encoding": "base64",',
        '            "filters": [','                {"dataSize": 165},',
        '                {"memcmp": {"offset": 0, "bytes": "MINT_PUBKEY_HERE"}}',"            ]","        }","    ]","}",
      ]} /></Sequence>
      <Sequence {...ss(30)}><TerminalSlide title="programSubscribe Output" lines={[
        { text: "python program_subscribe.py", type: "command" },
        { text: "Subscribed (id=24040)", type: "success" },
        { text: "Account: BpdYYo2Vw1NVbzE2DqJx...", type: "output" },
        { text: "  Lamports: 499997095000", type: "output" },
      ]} /></Sequence>
      <Sequence {...ss(31)}><ListSlide title="programSubscribe — Use Cases" items={[
        { text: "Token Transfer Monitoring", sub: "Watch all token account changes for a specific mint" },
        { text: "New Account Detection", sub: "Detect when new accounts are created under a program" },
        { text: "DeFi Protocol Monitoring", sub: "Watch all vaults, pools, or positions in a protocol" },
        { text: "NFT Marketplace Tracking", sub: "Monitor listing/delisting across a marketplace program" },
      ]} /></Sequence>

      {/* ═══ SECTION 7: logsSubscribe ═══ */}

      <Sequence from={TR[3]} durationInFrames={45}><TransitionSlide text="LOGS" variant="wipe" /></Sequence>
      <Sequence {...ss(32)}><ChapterSlide number="04" title="logsSubscribe" subtitle="Stream transaction log messages" /></Sequence>
      <Sequence {...ss(33)}><ConceptSlide title="logsSubscribe" bullets={[
        { text: "Stream program log messages from transactions in real-time", highlight: "log messages" },
        { text: "Filter by: all transactions, allWithVotes, or mentions a specific address" },
        { text: "Returns transaction signature, error status, and log array" },
        { text: "Essential for monitoring program events and bot triggers", highlight: "bot triggers" },
      ]} footnote="The 'mentions' filter currently supports only ONE address" /></Sequence>
      <Sequence {...ss(34)}><DefinitionSlide title="logsSubscribe Filter Options" definitions={[
        { term: '"all"', definition: "Subscribe to all transactions except simple vote transactions" },
        { term: '"allWithVotes"', definition: "Subscribe to all transactions including vote transactions" },
        { term: '{mentions: [pubkey]}', definition: "Only transactions mentioning this specific address (1 address max)" },
        { term: "commitment", definition: "processed | confirmed | finalized (default: finalized)" },
      ]} /></Sequence>
      <Sequence {...ss(35)}><BigCodeSlide filename="logs_subscribe.py" highlightLines={[4,5,6,7,8,9,10,11]} code={[
        "# Watch logs for a specific program (e.g., PumpFun)",
        "async def watch_logs(program_id: str):",
        "    async with websockets.connect(WS_URL) as ws:","        request = {",
        '            "jsonrpc": "2.0", "id": 1,',
        '            "method": "logsSubscribe",','            "params": [',
        '                {"mentions": [program_id]},',
        '                {"commitment": "confirmed"}',"            ]","        }",
        "        await ws.send(json.dumps(request))",
        "        response = json.loads(await ws.recv())",
        '        print(f"Subscribed (id={response[\'result\']})")',"",
        "        async for msg in ws:","            data = json.loads(msg)",
        '            value = data["params"]["result"]["value"]',
        '            print(f"Sig: {value[\'signature\'][:20]}...")',
        '            print(f"Error: {value[\'err\']}")',
        '            for log in value["logs"]:',
        '                print(f"  {log}")',
      ]} /></Sequence>
      <Sequence {...ss(36)}><CodeSlide title="logsSubscribe — Watch All Transactions" filename="logs_all.py" code={[
        "# Subscribe to ALL transaction logs (excluding votes)","request = {",
        '    "jsonrpc": "2.0", "id": 1,',
        '    "method": "logsSubscribe",','    "params": [',
        '        "all",','        {"commitment": "confirmed"}',"    ]","}","",
        "# Or include vote transactions too:",
        '# \"params\": [\"allWithVotes\", {\"commitment\": \"confirmed\"}]',
      ]} /></Sequence>
      <Sequence {...ss(37)}><TerminalSlide title="logsSubscribe Output" lines={[
        { text: "python logs_subscribe.py", type: "command" },
        { text: "Subscribed (id=24040)", type: "success" },
        { text: "Sig: 67Viive4HpLJRPuYg...", type: "output" },
        { text: "Error: None", type: "output" },
        { text: "  Program 11111111111111111111111111111111 invoke [1]", type: "info" },
        { text: "  Program 11111111111111111111111111111111 success", type: "success" },
      ]} /></Sequence>
      <Sequence {...ss(38)}><ListSlide title="logsSubscribe — Use Cases" items={[
        { text: "New Token Detection", sub: "Watch PumpFun logs for InitializeMint events" },
        { text: "Trade Monitoring", sub: "Detect swap/buy/sell events from DEX programs" },
        { text: "Error Tracking", sub: "Monitor failed transactions for your program" },
        { text: "Event-Driven Bots", sub: "Trigger actions based on specific log patterns" },
      ]} /></Sequence>

      {/* ═══ SECTION 8: signatureSubscribe ═══ */}

      <Sequence from={TR[4]} durationInFrames={45}><TransitionSlide text="SIGNATURE" variant="pulse" /></Sequence>
      <Sequence {...ss(39)}><ChapterSlide number="05" title="signatureSubscribe" subtitle="Track transaction confirmation" /></Sequence>
      <Sequence {...ss(40)}><ConceptSlide title="signatureSubscribe" bullets={[
        { text: "Track a specific transaction's confirmation status", highlight: "specific transaction" },
        { text: "Subscription auto-closes after the terminal confirmation" },
        { text: "Returns success or error — tells you if the tx landed" },
        { text: "Optional: get an early 'receivedSignature' notification", highlight: "receivedSignature" },
      ]} footnote="Every app that sends transactions should use this to confirm them" /></Sequence>
      <Sequence {...ss(41)}><DefinitionSlide title="signatureSubscribe Parameters" definitions={[
        { term: "signature (required)", definition: "Base-58 encoded transaction signature (first signature)" },
        { term: "commitment", definition: "processed | confirmed | finalized (default: finalized)" },
        { term: "enableReceivedNotification", definition: "Get early notification when RPC first sees the signature (default: false)" },
      ]} /></Sequence>
      <Sequence {...ss(42)}><BigCodeSlide filename="signature_subscribe.py" highlightLines={[3,4,5,6,7,8,9,10,11,12]} code={[
        "async def confirm_transaction(signature: str):",
        "    async with websockets.connect(WS_URL) as ws:","        request = {",
        '            "jsonrpc": "2.0", "id": 1,',
        '            "method": "signatureSubscribe",','            "params": [',"                signature,","                {",
        '                    "commitment": "confirmed",',
        '                    "enableReceivedNotification": True',"                }","            ]","        }",
        "        await ws.send(json.dumps(request))",
        "        response = json.loads(await ws.recv())",
        '        print(f"Watching: {signature[:20]}...")',"",
        "        async for msg in ws:","            data = json.loads(msg)",
        '            value = data["params"]["result"]["value"]',
        '            if value == "receivedSignature":',
        '                print("TX received by RPC node!")',"            else:",
        '                err = value.get("err")',
        '                status = "FAILED" if err else "CONFIRMED"',
        '                print(f"Status: {status}")',
        "                break  # subscription auto-closes",
      ]} /></Sequence>
      <Sequence {...ss(43)}><TerminalSlide title="signatureSubscribe Output" lines={[
        { text: "python signature_subscribe.py", type: "command" },
        { text: "Watching: 2EBVM6cB8vAAD93K...", type: "output" },
        { text: "TX received by RPC node!", type: "info" },
        { text: "Status: CONFIRMED", type: "success" },
      ]} /></Sequence>
      <Sequence {...ss(44)}><ListSlide title="signatureSubscribe — Use Cases" items={[
        { text: "Transaction Confirmation", sub: "Wait for your submitted transaction to land" },
        { text: "Payment Verification", sub: "Confirm a payment was received before fulfilling" },
        { text: "Bot Execution Tracking", sub: "Verify your trading bot's transactions succeeded" },
        { text: "Error Detection", sub: "Quickly know if a transaction failed and why" },
      ]} /></Sequence>

      {/* ═══ SECTION 9: slotSubscribe ═══ */}

      <Sequence from={TR[5]} durationInFrames={45}><TransitionSlide text="SLOTS" variant="flash" /></Sequence>
      <Sequence {...ss(45)}><ChapterSlide number="06" title="slotSubscribe" subtitle="Track new slots in real-time" /></Sequence>
      <Sequence {...ss(46)}><ConceptSlide title="slotSubscribe" bullets={[
        { text: "Simplest subscription — no parameters needed", highlight: "no parameters" },
        { text: "Notifies when the validator processes a new slot" },
        { text: "Returns: slot number, parent slot, and root slot" },
        { text: "Each slot is roughly 400 milliseconds", highlight: "400 milliseconds" },
      ]} footnote="Use this for basic chain progress monitoring" /></Sequence>
      <Sequence {...ss(47)}><CodeSlide title="slotSubscribe — Simple & Clean" filename="slot_subscribe.py" code={[
        "async def watch_slots():","    async with websockets.connect(WS_URL) as ws:","        request = {",
        '            "jsonrpc": "2.0", "id": 1,',
        '            "method": "slotSubscribe"',"        }",
        "        await ws.send(json.dumps(request))",
        "        response = json.loads(await ws.recv())",
        '        print(f"Subscribed (id={response[\'result\']})")',"",
        "        async for msg in ws:","            data = json.loads(msg)",
        '            result = data["params"]["result"]',
        '            print(f"Slot: {result[\'slot\']} | Parent: {result[\'parent\']} | Root: {result[\'root\']}")',"",
        "asyncio.run(watch_slots())",
      ]} /></Sequence>
      <Sequence {...ss(48)}><TerminalSlide title="slotSubscribe Output" lines={[
        { text: "python slot_subscribe.py", type: "command" },
        { text: "Subscribed (id=0)", type: "success" },
        { text: "Slot: 284712340 | Parent: 284712339 | Root: 284712308", type: "output" },
        { text: "Slot: 284712341 | Parent: 284712340 | Root: 284712309", type: "output" },
        { text: "Slot: 284712342 | Parent: 284712341 | Root: 284712310", type: "output" },
      ]} /></Sequence>
      <Sequence {...ss(49)}><ListSlide title="slotSubscribe — Use Cases" items={[
        { text: "Chain Health Monitoring", sub: "Detect if the chain is progressing normally" },
        { text: "Slot-Based Timing", sub: "Trigger actions every N slots" },
        { text: "Dashboard Updates", sub: "Show live slot count in a monitoring UI" },
        { text: "Root Tracking", sub: "Monitor finalization progress via the root field" },
      ]} /></Sequence>

      {/* ═══ SECTION 10: ADDITIONAL ═══ */}

      <Sequence from={TR[6]} durationInFrames={45}><TransitionSlide text="MORE" variant="wipe" /></Sequence>
      <Sequence {...ss(50)}><ChapterSlide number="07" title="Additional Subscriptions" subtitle="blockSubscribe, slotUpdates, root, vote" /></Sequence>
      <Sequence {...ss(51)}><TableSlide title="Additional Subscription Types" headers={["Method", "What It Does", "Note"]} rows={[
        ["blockSubscribe", "Full block data on confirmed/finalized", "Unstable — requires validator flags"],
        ["slotsUpdatesSubscribe", "Detailed slot lifecycle events", "Unstable — may change in future"],
        ["rootSubscribe", "New root slot notifications", "Simple — returns just slot number"],
        ["voteSubscribe", "Gossip vote notifications", "Unstable — requires validator flags"],
      ]} /></Sequence>
      <Sequence {...ss(52)}><CodeSlide title="blockSubscribe" filename="block_subscribe.py" code={[
        "# Requires --rpc-pubsub-enable-block-subscription flag","request = {",
        '    "jsonrpc": "2.0", "id": 1,',
        '    "method": "blockSubscribe",','    "params": [',
        '        "all",  # or {"mentionsAccountOrProgram": "PUBKEY"}',"        {",
        '            "commitment": "confirmed",',
        '            "encoding": "base64",',
        '            "transactionDetails": "full",',
        '            "maxSupportedTransactionVersion": 0,',
        '            "showRewards": True',"        }","    ]","}",
      ]} /></Sequence>
      <Sequence {...ss(53)}><CodeSlide title="rootSubscribe & slotsUpdatesSubscribe" filename="root_and_updates.py" code={[
        "# rootSubscribe — no params, returns just the root slot number","root_request = {",
        '    "jsonrpc": "2.0", "id": 1,',
        '    "method": "rootSubscribe"',"}",
        '# Notification: {"result": 324, "subscription": 3}',"",
        "# slotsUpdatesSubscribe — detailed slot lifecycle","updates_request = {",
        '    "jsonrpc": "2.0", "id": 2,',
        '    "method": "slotsUpdatesSubscribe"',"}",
        "# Types: firstShredReceived, completed, createdBank,",
        "# frozen, dead, optimisticConfirmation, root",
      ]} /></Sequence>
      <Sequence {...ss(54)}><WarningSlide title="Unstable Methods" warnings={[
        "blockSubscribe requires --rpc-pubsub-enable-block-subscription on the validator",
        "voteSubscribe requires --rpc-pubsub-enable-vote-subscription on the validator",
        "slotsUpdatesSubscribe format may change in future Solana releases",
        "Not all RPC providers support these methods — check with your provider",
      ]} severity="caution" /></Sequence>

      {/* ═══ SECTION 11: UNSUBSCRIBING ═══ */}

      <Sequence {...ss(55)}><ChapterSlide number="08" title="Unsubscribing" subtitle="Clean up your subscriptions" /></Sequence>
      <Sequence {...ss(56)}><BigCodeSlide filename="unsubscribe.py" highlightLines={[2,3,4,5,6,7]} code={[
        "# Every subscribe method has a matching unsubscribe method",
        "async def unsubscribe(ws, method: str, sub_id: int):","    request = {",
        '        "jsonrpc": "2.0", "id": 1,',
        '        "method": method,','        "params": [sub_id]',"    }",
        "    await ws.send(json.dumps(request))",
        "    response = json.loads(await ws.recv())",
        '    print(f"Unsubscribed: {response[\'result\']}")',"",
        "# Usage examples:",
        '# await unsubscribe(ws, "accountUnsubscribe", 23784)',
        '# await unsubscribe(ws, "programUnsubscribe", 24040)',
        '# await unsubscribe(ws, "logsUnsubscribe", 24041)',
        '# await unsubscribe(ws, "slotUnsubscribe", 0)',
      ]} /></Sequence>

      {/* ═══ SECTION 12: RECAP & OUTRO ═══ */}

      <Sequence from={TR[7]} durationInFrames={45}><TransitionSlide text="WRAP UP" variant="pulse" /></Sequence>
      <Sequence {...ss(57)}><ChapterSlide number="09" title="Recap & Next Steps" subtitle="What you learned today" /></Sequence>
      <Sequence {...ss(58)}><RecapSlide title="What We Covered" points={[
        "accountSubscribe — watch any account for changes",
        "programSubscribe — monitor all accounts under a program with filters",
        "logsSubscribe — stream transaction logs for event detection",
        "signatureSubscribe — confirm transaction success or failure",
        "slotSubscribe — track chain progress in real-time",
        "Plus blockSubscribe, slotsUpdatesSubscribe, rootSubscribe, voteSubscribe",
      ]} /></Sequence>
      <Sequence {...ss(59)}><FeatureGridSlide title="NoLimitNodes WebSocket Features" features={[
        { title: "Full WebSocket Support", description: "All subscription types available", highlight: true },
        { title: "Low Latency", description: "Sub-50ms response times" },
        { title: "Free Tier", description: "Get started with no credit card" },
        { title: "Pro: 50 Streams", description: "50 concurrent WebSocket connections" },
        { title: "99.9% Uptime", description: "Enterprise-grade reliability" },
        { title: "24/7 Support", description: "Help when you need it" },
      ]} /></Sequence>
      <Sequence {...ss(60)}><CalloutSlide text="Full Python code in the blog post." subtext="Link in the description below. Sign up free at nolimitnodes.com for your API key." variant="yellow" /></Sequence>
      <Sequence {...ss(61)}><CountdownSlide text="NEXT VIDEO" seconds={3} subtext="How to Use Solana RPC Methods in Python" /></Sequence>
      <Sequence {...ss(62)}><OutroSlide channel="NoLimitNodes" cta="Subscribe for more Solana developer tutorials" links={["nolimitnodes.com", "@NoLimitNodes", "discord.gg/nln"]} /></Sequence>

      {/* ═══ Persistent Overlays ═══ */}
      <Sequence from={0} durationInFrames={TOTAL}><TopBar channel="NoLimitNodes" episode="WEBSOCKET SUBSCRIPTIONS" /></Sequence>
      <Sequence from={0} durationInFrames={TOTAL - S[62][1]}><BottomBar text="nolimitnodes.com" /></Sequence>
      </div>
    </AbsoluteFill>
  );
};
