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
  1: [0, 257], 2: [257, 655], 3: [912, 846], 4: [1758, 538], 5: [2296, 819],
  6: [3115, 198], 7: [3313, 235], 8: [3548, 240], 9: [3788, 343], 10: [4131, 409],
  11: [4540, 729],
  12: [5314, 126], 13: [5440, 598], 14: [6038, 446], 15: [6484, 490], 16: [6974, 687], 17: [7661, 741], 18: [8402, 468],
  19: [8915, 111], 20: [9026, 719], 21: [9745, 602], 22: [10347, 537], 23: [10884, 591], 24: [11475, 279], 25: [11754, 307],
  26: [12106, 110], 27: [12216, 771], 28: [12987, 739], 29: [13726, 810], 30: [14536, 426], 31: [14962, 749], 32: [15711, 549], 33: [16260, 432], 34: [16692, 245], 35: [16937, 364],
  36: [17346, 122], 37: [17468, 641], 38: [18109, 819], 39: [18928, 409], 40: [19337, 386], 41: [19723, 376], 42: [20099, 561], 43: [20660, 216], 44: [20876, 470], 45: [21346, 519],
  46: [21910, 135], 47: [22045, 698], 48: [22743, 694], 49: [23437, 266], 50: [23703, 525],
  51: [24273, 111], 52: [24384, 559], 53: [24943, 490], 54: [25433, 468], 55: [25901, 254], 56: [26155, 339],
  57: [26494, 123], 58: [26617, 588], 59: [27205, 423], 60: [27628, 176],
  61: [27804, 109], 62: [27913, 732], 63: [28645, 421], 64: [29066, 147], 65: [29213, 329],
  66: [29587, 105], 67: [29692, 682], 68: [30374, 510], 69: [30884, 552], 70: [31436, 195], 71: [31631, 311],
  72: [31987, 79], 73: [32066, 739], 74: [32805, 576], 75: [33381, 390], 76: [33771, 195], 77: [33966, 407],
};
const TR = [5269, 8870, 12061, 17301, 21865, 24228, 29542, 31942];
const TOTAL = 34373;

// Helper: audio file path
const audio = (n: number) => staticFile(`audio/002/slide_${String(n).padStart(3, '0')}.wav`);

// Helper: slide sequence props
const ss = (n: number) => ({ from: S[n][0], durationInFrames: S[n][1] });

export const Video002: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>

      {/* ═══ AUDIO TRACK (outside scaled div) ═══ */}
      {Object.entries(S).map(([num, [from, dur]]) => (
        <Sequence key={`a${num}`} from={from + 15} durationInFrames={dur - 15}>
          <Audio src={audio(Number(num))} />
        </Sequence>
      ))}

      {/* ═══ VISUAL TRACK (inside scaled div) ═══ */}
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

      <Sequence {...ss(1)}><TitleSlide topic="Yellowstone gRPC" title="Stream Solana Data" subtitle="in real-time with Python" pill="PYTHON TUTORIAL" /></Sequence>

      <Sequence {...ss(2)}><ConceptSlide title="What is Yellowstone gRPC?" bullets={[
        { text: "A high-performance gRPC streaming interface for Solana", highlight: "gRPC streaming" },
        { text: "Built on Solana's Geyser plugin — data straight from validator memory" },
        { text: "Sub-50ms latency — up to 400ms faster than REST polling", highlight: "Sub-50ms" },
        { text: "Also known as Dragon's Mouth, built by Triton One" },
      ]} footnote="gRPC = Google Remote Procedure Call — binary protocol over HTTP/2" /></Sequence>

      <Sequence {...ss(3)}><ComparisonSlide title="Why gRPC over REST & WebSocket?" leftTitle="REST / WebSocket" rightTitle="Yellowstone gRPC" rows={[
        { label: "Protocol", left: "JSON over HTTP/1.1", right: "Protobuf over HTTP/2" },
        { label: "Data Flow", left: "Poll or push (JSON)", right: "Bidirectional stream" },
        { label: "Filtering", left: "Limited / client-side", right: "Server-side granular" },
        { label: "Latency", left: "50-200ms", right: "< 50ms" },
        { label: "Bandwidth", left: "High (verbose JSON)", right: "Low (binary protobuf)" },
      ]} winner="right" /></Sequence>

      <Sequence {...ss(4)}><DiagramSlide title="How It Works" nodes={[
        { label: "VALIDATOR", sublabel: "Solana node" },
        { label: "GEYSER", sublabel: "plugin layer", accent: true },
        { label: "gRPC SERVER", sublabel: "Yellowstone" },
        { label: "YOUR CLIENT", sublabel: "Python app" },
      ]} /></Sequence>

      <Sequence {...ss(5)}><ListSlide title="What You'll Learn" items={[
        { text: "Slots Subscription", sub: "Track chain progress in real-time" },
        { text: "Accounts Subscription", sub: "Monitor account state changes with rich filters" },
        { text: "Transactions Subscription", sub: "Stream transactions filtered by program or account" },
        { text: "Transaction Status Subscription", sub: "Lightweight confirmation tracking" },
        { text: "Blocks & Blocks Meta Subscriptions", sub: "Full block content or metadata only" },
        { text: "Entries Subscription", sub: "Raw validator execution units" },
        { text: "Unary Methods", sub: "GetSlot, GetBlockHeight, GetLatestBlockhash, and more" },
      ]} /></Sequence>

      {/* ═══ SECTION 2: NLN SIGNUP ═══ */}

      <Sequence {...ss(6)}><ChapterSlide number="00" title="Get Your API Key" subtitle="Sign up at nolimitnodes.com" /></Sequence>
      <Sequence {...ss(7)}><NLNHomepageSlide /></Sequence>
      <Sequence {...ss(8)}><NLNSignupSlide /></Sequence>
      <Sequence {...ss(9)}><NLNApiKeySlide /></Sequence>
      <Sequence {...ss(10)}><CalloutSlide text="You need a NoLimitNodes API key to follow along." subtext="Sign up free at nolimitnodes.com — all code is in the blog post linked in the description below." variant="yellow" /></Sequence>

      {/* ═══ SECTION 3: TOC ═══ */}

      <Sequence {...ss(11)}><TableSlide title="Table of Contents" headers={["#", "Topic", "Timestamp"]} rows={[
        ["1", "Python Setup & Connection", "2:57"],
        ["2", "Slots Subscription", "4:57"],
        ["3", "Accounts Subscription", "6:44"],
        ["4", "Transactions Subscription", "9:38"],
        ["5", "Transaction Status Subscription", "12:10"],
        ["6", "Blocks & Blocks Meta", "13:29"],
        ["7", "Entries Subscription", "15:27"],
        ["8", "Unary Methods", "16:26"],
      ]} /></Sequence>

      {/* ═══ SECTION 4: PYTHON SETUP ═══ */}

      <Sequence from={TR[0]} durationInFrames={45}><TransitionSlide text="SETUP" variant="wipe" /></Sequence>
      <Sequence {...ss(12)}><ChapterSlide number="01" title="Python Setup & Connection" subtitle="Install dependencies and connect" /></Sequence>
      <Sequence {...ss(13)}><ChecklistSlide title="Prerequisites" items={[
        { text: "Python 3.10 or higher installed", checked: true },
        { text: "grpcio and grpcio-tools packages", checked: true },
        { text: "protobuf package for serialization", checked: true },
        { text: "base58 package for Solana address encoding", checked: true },
        { text: "NoLimitNodes API key (gRPC endpoint + x-token)", checked: true },
      ]} /></Sequence>
      <Sequence {...ss(14)}><TerminalSlide title="Install Dependencies" lines={[
        { text: "pip install grpcio grpcio-tools protobuf base58", type: "command" },
        { text: "Collecting grpcio...", type: "output" },
        { text: "Successfully installed grpcio-1.62.0 grpcio-tools-1.62.0", type: "success" },
        { text: "", type: "output" },
        { text: "git clone https://github.com/rpcpool/yellowstone-grpc", type: "command" },
        { text: "Cloning into 'yellowstone-grpc'...", type: "output" },
        { text: "done.", type: "success" },
      ]} /></Sequence>
      <Sequence {...ss(15)}><CodeSlide title="Generate Python Proto Stubs" filename="terminal" code={["python -m grpc_tools.protoc \\","  -I./yellowstone-grpc/yellowstone-grpc-proto/proto/ \\","  --python_out=. \\","  --pyi_out=. \\","  --grpc_python_out=. \\","  ./yellowstone-grpc/yellowstone-grpc-proto/proto/geyser.proto \\","  ./yellowstone-grpc/yellowstone-grpc-proto/proto/solana-storage.proto"]} /></Sequence>
      <Sequence {...ss(16)}><ListSlide title="Generated Files" items={[
        { text: "geyser_pb2.py", sub: "Message classes — SubscribeRequest, SubscribeUpdate, filters" },
        { text: "geyser_pb2_grpc.py", sub: "gRPC stub — GeyserStub for making RPC calls" },
        { text: "geyser_pb2.pyi", sub: "Type hints for IDE autocompletion" },
        { text: "solana_storage_pb2.py", sub: "Solana-specific types — ConfirmedBlock, Rewards, etc." },
      ]} /></Sequence>
      <Sequence {...ss(17)}><BigCodeSlide filename="connect.py" highlightLines={[4,5,6,7,8,9,10,11,12]} code={["import grpc","import geyser_pb2","import geyser_pb2_grpc","","# Authenticate with your NLN x-token","auth_creds = grpc.metadata_call_credentials(",'    lambda ctx, cb: cb([("x-token", "YOUR_NLN_TOKEN")], None)',")",'channel_creds = grpc.composite_channel_credentials(','    grpc.ssl_channel_credentials(), auth_creds',")","",'# Connect to NoLimitNodes gRPC endpoint','channel = grpc.aio.secure_channel("your-nln-grpc-endpoint:10000", channel_creds)',"stub = geyser_pb2_grpc.GeyserStub(channel)"]} /></Sequence>
      <Sequence {...ss(18)}><CalloutSlide text="This connection code is reused in every example." subtext="Replace YOUR_NLN_TOKEN with your actual API key from nolimitnodes.com. Port 10000 is the standard gRPC port." variant="white" /></Sequence>

      {/* ═══ SECTION 5: SLOTS ═══ */}

      <Sequence from={TR[1]} durationInFrames={45}><TransitionSlide text="SLOTS" variant="pulse" /></Sequence>
      <Sequence {...ss(19)}><ChapterSlide number="02" title="Slots Subscription" subtitle="Track chain progress in real-time" /></Sequence>
      <Sequence {...ss(20)}><ConceptSlide title="What is a Slot?" bullets={[
        { text: "A time window (~400ms) where a validator can produce a block", highlight: "~400ms" },
        { text: "Each slot has a status: Processed, Confirmed, or Finalized" },
        { text: "Slots can also be: FirstShredReceived, Completed, CreatedBank, or Dead" },
        { text: "Subscribing to slots gives you real-time chain progress updates" },
      ]} footnote="Processed = fastest but may revert | Finalized = fully confirmed by cluster" /></Sequence>
      <Sequence {...ss(21)}><ListSlide title="Slot Subscription — Use Cases" items={[
        { text: "Chain Health Monitoring", sub: "Detect dead or skipped slots instantly" },
        { text: "Block Timing", sub: "React to slot boundaries for time-based logic" },
        { text: "Validator Performance", sub: "Track slot production rates and leader schedules" },
        { text: "Sync Confirmation", sub: "Wait for a specific commitment level before acting" },
      ]} /></Sequence>
      <Sequence {...ss(22)}><KeyValueSlide title="Slot Filter Options" pairs={[
        { key: "filter_by_commitment", value: "Only receive updates matching your commitment level", highlight: true },
        { key: "interslot_updates", value: "Get intermediate status changes within a slot" },
        { key: "commitment", value: "PROCESSED | CONFIRMED | FINALIZED (global setting)" },
      ]} /></Sequence>
      <Sequence {...ss(23)}><BigCodeSlide filename="subscribe_slots.py" highlightLines={[5,6,7,8,9]} code={["import asyncio","# ... connection setup from above ...","","async def subscribe_slots():","    stream = stub.Subscribe()","    req = geyser_pb2.SubscribeRequest(",'        slots={"client": geyser_pb2.SubscribeRequestFilterSlots(',"            filter_by_commitment=True","        )},","        commitment=geyser_pb2.CommitmentLevel.CONFIRMED","    )","    await stream.write(req)","","    async for update in stream:",'        if update.HasField("slot"):',"            s = update.slot",'            print(f"Slot: {s.slot} | Status: {s.status}")',"","asyncio.run(subscribe_slots())"]} /></Sequence>
      <Sequence {...ss(24)}><TerminalSlide title="Slots Output" lines={[
        { text: "python subscribe_slots.py", type: "command" },
        { text: "Slot: 284712340 | Status: CONFIRMED", type: "output" },
        { text: "Slot: 284712341 | Status: CONFIRMED", type: "output" },
        { text: "Slot: 284712342 | Status: CONFIRMED", type: "output" },
        { text: "Slot: 284712343 | Status: CONFIRMED", type: "success" },
      ]} /></Sequence>
      <Sequence {...ss(25)}><CalloutSlide text="Slots are the simplest subscription." subtext="A great starting point to verify your connection is working before moving to more complex subscriptions." variant="white" /></Sequence>

      {/* ═══ SECTION 6: ACCOUNTS ═══ */}

      <Sequence from={TR[2]} durationInFrames={45}><TransitionSlide text="ACCOUNTS" variant="flash" /></Sequence>
      <Sequence {...ss(26)}><ChapterSlide number="03" title="Accounts Subscription" subtitle="Monitor account state changes" /></Sequence>
      <Sequence {...ss(27)}><ConceptSlide title="Accounts Subscription" bullets={[
        { text: "Monitor real-time changes to any Solana account", highlight: "real-time" },
        { text: "The most powerful subscription — rich server-side filtering" },
        { text: "Get notified when balance, data, or owner changes" },
        { text: "Supports data slicing — receive only the bytes you need", highlight: "data slicing" },
      ]} footnote="Multiple updates per slot — not just end-of-slot like WebSocket" /></Sequence>
      <Sequence {...ss(28)}><DefinitionSlide title="Account Filter Fields" definitions={[
        { term: "account[]", definition: "Array of account pubkeys to watch — values use OR logic" },
        { term: "owner[]", definition: "Array of owner program pubkeys — values use OR logic" },
        { term: "filters[]", definition: "Additional conditions: datasize, memcmp, lamports, token_account_state" },
        { term: "nonempty_txn_signature", definition: "Only receive updates that have a transaction signature" },
      ]} /></Sequence>
      <Sequence {...ss(29)}><ConceptSlide title="Filter Logic" bullets={[
        { text: "Between different fields: AND logic", highlight: "AND" },
        { text: "Within the same array (account[], owner[]): OR logic", highlight: "OR" },
        { text: "Within filters[] array: AND logic", highlight: "AND" },
        { text: "Example: owner=TokenProgram AND datasize=165 AND memcmp at offset 32" },
      ]} footnote="Up to 5 filters of the same type per connection" /></Sequence>
      <Sequence {...ss(30)}><CodeSlide title="Basic: Watch a Specific Account" filename="subscribe_account.py" code={["async def subscribe_account():","    stream = stub.Subscribe()","    req = geyser_pb2.SubscribeRequest(",'        accounts={"client": geyser_pb2.SubscribeRequestFilterAccounts(','            account=["So11111111111111111111111111111111"],',"        )},","        commitment=geyser_pb2.CommitmentLevel.CONFIRMED","    )","    await stream.write(req)","","    async for update in stream:",'        if update.HasField("account"):',"            acct = update.account",'            print(f"Slot: {acct.slot} | Lamports: {acct.account.lamports}")']} /></Sequence>
      <Sequence {...ss(31)}><BigCodeSlide filename="subscribe_token_accounts.py" highlightLines={[3,4,5,6,7,8,9,10,11,12]} code={["# Advanced: Watch all token accounts for a specific wallet","async def subscribe_token_accounts(wallet_pubkey: str):","    filters = [","        geyser_pb2.SubscribeRequestFilterAccountsFilter(","            datasize=165  # SPL Token account size","        ),","        geyser_pb2.SubscribeRequestFilterAccountsFilter(","            memcmp=geyser_pb2.SubscribeRequestFilterAccountsFilterMemcmp(","                offset=32,  # Owner field offset in token account","                base58=wallet_pubkey","            )","        ),","    ]","    req = geyser_pb2.SubscribeRequest(",'        accounts={"client": geyser_pb2.SubscribeRequestFilterAccounts(','            owner=["TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"],',"            filters=filters,","        )}","    )","    stream = stub.Subscribe()","    await stream.write(req)","    async for update in stream:",'        if update.HasField("account"):','            print(f"Token account updated: {update.account.account.lamports}")']} /></Sequence>
      <Sequence {...ss(32)}><CodeSlide title="Data Slicing — Get Only What You Need" filename="subscribe_slice.py" code={["# Only receive first 40 bytes of account data","# Saves bandwidth for large accounts","req = geyser_pb2.SubscribeRequest(",'    accounts={"client": geyser_pb2.SubscribeRequestFilterAccounts(','        account=["YourTargetAccountPubkey..."],',"    )},","    accounts_data_slice=[","        geyser_pb2.SubscribeRequestAccountsDataSlice(","            offset=0, length=40","        )","    ],","    commitment=geyser_pb2.CommitmentLevel.CONFIRMED",")"]} /></Sequence>
      <Sequence {...ss(33)}><CodeSlide title="Lamports Filter — Watch Balance Changes" filename="subscribe_lamports.py" code={["# Only notify when account has more than 1 SOL","filters = [","    geyser_pb2.SubscribeRequestFilterAccountsFilter(","        lamports=geyser_pb2.SubscribeRequestFilterAccountsFilterLamports(","            gt=1_000_000_000  # 1 SOL in lamports","        )","    )","]","req = geyser_pb2.SubscribeRequest(",'    accounts={"client": geyser_pb2.SubscribeRequestFilterAccounts(','        owner=["11111111111111111111111111111111"],',"        filters=filters","    )}",")"]} /></Sequence>
      <Sequence {...ss(34)}><TerminalSlide title="Account Subscription Output" lines={[
        { text: "python subscribe_account.py", type: "command" },
        { text: "Slot: 284712350 | Lamports: 1500000000", type: "output" },
        { text: "Slot: 284712351 | Lamports: 1499995000", type: "output" },
        { text: "Slot: 284712355 | Lamports: 2000000000", type: "success" },
      ]} /></Sequence>
      <Sequence {...ss(35)}><ListSlide title="Accounts — Use Cases" items={[
        { text: "Wallet Balance Monitoring", sub: "Get notified when SOL balance changes" },
        { text: "Token Account Tracking", sub: "Watch for token transfers in real-time" },
        { text: "Oracle Price Feeds", sub: "Monitor Pyth or Switchboard price accounts" },
        { text: "Program State Changes", sub: "Watch when a program's data account is updated" },
      ]} /></Sequence>

      {/* ═══ SECTION 7: TRANSACTIONS ═══ */}

      <Sequence from={TR[3]} durationInFrames={45}><TransitionSlide text="TRANSACTIONS" variant="wipe" /></Sequence>
      <Sequence {...ss(36)}><ChapterSlide number="04" title="Transactions Subscription" subtitle="Stream transaction activity in real-time" /></Sequence>
      <Sequence {...ss(37)}><ConceptSlide title="Transactions Subscription" bullets={[
        { text: "Stream every transaction hitting the Solana network", highlight: "every transaction" },
        { text: "Filter by vote, failed, signature, or account involvement" },
        { text: "Most popular subscription for trading bots and monitoring", highlight: "trading bots" },
        { text: "Full transaction data: signature, accounts, instructions, logs" },
      ]} /></Sequence>
      <Sequence {...ss(38)}><DefinitionSlide title="Transaction Filter Fields" definitions={[
        { term: "vote", definition: "true = include vote txs, false = exclude them (most bots exclude)" },
        { term: "failed", definition: "true = include failed txs, false = exclude them" },
        { term: "signature", definition: "Match a single specific transaction signature" },
        { term: "account_include", definition: "TX must involve ANY of these accounts (OR logic)" },
        { term: "account_exclude", definition: "TX must NOT involve ANY of these accounts" },
        { term: "account_required", definition: "TX must involve ALL of these accounts (AND logic)" },
      ]} /></Sequence>
      <Sequence {...ss(39)}><CodeSlide title="Monitor a Specific Program" filename="subscribe_transactions.py" code={["# Watch all PumpFun transactions (exclude votes and failures)","PUMPFUN = '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P'","","req = geyser_pb2.SubscribeRequest(",'    transactions={"client": geyser_pb2.SubscribeRequestFilterTransactions(',"        vote=False,","        failed=False,","        account_include=[PUMPFUN],","    )},","    commitment=geyser_pb2.CommitmentLevel.CONFIRMED",")"]} /></Sequence>
      <Sequence {...ss(40)}><BigCodeSlide filename="subscribe_transactions.py" highlightLines={[7,8,9,10,11]} code={["import base58","","async def subscribe_transactions():","    stream = stub.Subscribe()","    await stream.write(req)","","    async for update in stream:",'        if update.HasField("transaction"):',"            tx = update.transaction","            sig = base58.b58encode(","                tx.transaction.signature","            ).decode()",'            print(f"Slot: {tx.slot} | Sig: {sig}")',"","asyncio.run(subscribe_transactions())"]} /></Sequence>
      <Sequence {...ss(41)}><CodeSlide title="Watch a Specific Wallet" filename="subscribe_wallet_txs.py" code={["# Stream all transactions involving a specific wallet",'WALLET = "YourWalletPubkeyHere..."',"","req = geyser_pb2.SubscribeRequest(",'    transactions={"client": geyser_pb2.SubscribeRequestFilterTransactions(',"        vote=False,","        failed=False,","        account_include=[WALLET],","    )},","    commitment=geyser_pb2.CommitmentLevel.CONFIRMED",")"]} /></Sequence>
      <Sequence {...ss(42)}><CodeSlide title="Require Multiple Accounts" filename="subscribe_required.py" code={["# Only match transactions involving BOTH accounts","# account_include = ANY (OR), account_required = ALL (AND)","","req = geyser_pb2.SubscribeRequest(",'    transactions={"client": geyser_pb2.SubscribeRequestFilterTransactions(',"        vote=False,","        failed=False,","        account_required=[",'            "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",  # PumpFun','            "YourWalletPubkey..."  # Your wallet',"        ],","    )}",")"]} /></Sequence>
      <Sequence {...ss(43)}><TerminalSlide title="Transactions Output" lines={[
        { text: "python subscribe_transactions.py", type: "command" },
        { text: "Slot: 284712360 | Sig: 4nFzKpR8mQv2...", type: "output" },
        { text: "Slot: 284712361 | Sig: 7xBpMn3sWuY1...", type: "output" },
        { text: "Slot: 284712362 | Sig: 2kLmPqR9xZw5...", type: "success" },
      ]} /></Sequence>
      <Sequence {...ss(44)}><ListSlide title="Transactions — Use Cases" items={[
        { text: "Trading Bots", sub: "React to trades on PumpFun, Raydium, Jupiter" },
        { text: "Wallet Monitoring", sub: "Track when specific wallets transact" },
        { text: "Copy Trading", sub: "Mirror a successful trader's transactions" },
        { text: "Analytics", sub: "Count transactions per program in real-time" },
      ]} /></Sequence>
      <Sequence {...ss(45)}><WarningSlide title="Watch Out" warnings={["Unfiltered transaction streams produce massive data volumes","Always set vote=False unless you specifically need vote transactions","Use account_include or account_required to narrow the stream","Monitor your bandwidth — consider data slicing for account subscriptions"]} severity="caution" /></Sequence>

      {/* ═══ SECTION 8: TX STATUS ═══ */}

      <Sequence from={TR[4]} durationInFrames={45}><TransitionSlide text="TX STATUS" variant="pulse" /></Sequence>
      <Sequence {...ss(46)}><ChapterSlide number="05" title="Transaction Status" subtitle="Lightweight confirmation tracking" /></Sequence>
      <Sequence {...ss(47)}><ComparisonSlide title="Transactions vs Transaction Status" leftTitle="Transactions" rightTitle="Transaction Status" rows={[
        { label: "Data", left: "Full tx (sig, accounts, instructions, logs)", right: "Only sig, slot, index, error" },
        { label: "Bandwidth", left: "Heavy", right: "Very light" },
        { label: "Use Case", left: "Full analysis & parsing", right: "Confirmation tracking" },
        { label: "Best For", left: "Trading bots, analytics", right: "Alerting, monitoring" },
      ]} /></Sequence>
      <Sequence {...ss(48)}><BigCodeSlide filename="subscribe_tx_status.py" highlightLines={[3,4,5,6,7,8]} code={["async def subscribe_tx_status():","    stream = stub.Subscribe()","    req = geyser_pb2.SubscribeRequest(","        transactions_status={",'            "client": geyser_pb2.SubscribeRequestFilterTransactions(',"                vote=False,","                failed=True,  # Include failures to detect errors",'                account_include=["6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"]',"            )","        },","        commitment=geyser_pb2.CommitmentLevel.CONFIRMED","    )","    await stream.write(req)","","    async for update in stream:",'        if update.HasField("transaction_status"):',"            ts = update.transaction_status","            sig = base58.b58encode(ts.signature).decode()",'            status = "FAILED" if ts.err else "SUCCESS"','            print(f"Slot: {ts.slot} | {status} | {sig[:20]}...")']} /></Sequence>
      <Sequence {...ss(49)}><TerminalSlide title="Transaction Status Output" lines={[
        { text: "python subscribe_tx_status.py", type: "command" },
        { text: "Slot: 284712370 | SUCCESS | 4nFzKpR8mQv2...", type: "success" },
        { text: "Slot: 284712371 | SUCCESS | 7xBpMn3sWuY1...", type: "success" },
        { text: "Slot: 284712372 | FAILED  | 2kLmPqR9xZw5...", type: "error" },
      ]} /></Sequence>
      <Sequence {...ss(50)}><ListSlide title="Transaction Status — Use Cases" items={[
        { text: "Confirm Your Own Transactions", sub: "Watch for your tx signature to land on-chain" },
        { text: "Success/Failure Monitoring", sub: "Track error rates for a program in real-time" },
        { text: "Low-Bandwidth Alerting", sub: "Get notified without downloading full tx data" },
        { text: "Wallet Activity Tracking", sub: "Know when a specific wallet transacts" },
      ]} /></Sequence>

      {/* ═══ SECTION 9: BLOCKS ═══ */}

      <Sequence from={TR[5]} durationInFrames={45}><TransitionSlide text="BLOCKS" variant="flash" /></Sequence>
      <Sequence {...ss(51)}><ChapterSlide number="06" title="Blocks Subscription" subtitle="Full block content streaming" /></Sequence>
      <Sequence {...ss(52)}><ConceptSlide title="Blocks Subscription" bullets={[
        { text: "Receive complete block data as blocks are produced", highlight: "complete block data" },
        { text: "Choose what to include: transactions, accounts, entries" },
        { text: "Filter by account involvement to narrow the data" },
        { text: "Heavy stream — use only when you need full block content" },
      ]} /></Sequence>
      <Sequence {...ss(53)}><KeyValueSlide title="Block Filter Options" pairs={[
        { key: "account_include", value: "Filter transactions/accounts involving these pubkeys", highlight: true },
        { key: "include_transactions", value: "Include all transaction data in the block message" },
        { key: "include_accounts", value: "Include all account updates in the block message" },
        { key: "include_entries", value: "Include all entries in the block message" },
      ]} /></Sequence>
      <Sequence {...ss(54)}><BigCodeSlide filename="subscribe_blocks.py" highlightLines={[3,4,5,6,7,8,9]} code={["async def subscribe_blocks():","    stream = stub.Subscribe()","    req = geyser_pb2.SubscribeRequest(",'        blocks={"client": geyser_pb2.SubscribeRequestFilterBlocks(',"            account_include=[],","            include_transactions=True,","            include_accounts=False,","            include_entries=False,","        )},","        commitment=geyser_pb2.CommitmentLevel.CONFIRMED","    )","    await stream.write(req)","","    async for update in stream:",'        if update.HasField("block"):',"            b = update.block",'            print(f"Slot: {b.slot} | Hash: {b.blockhash}")','            print(f"  Txs: {b.executed_transaction_count}")','            print(f"  Parent: {b.parent_slot}")']} /></Sequence>
      <Sequence {...ss(55)}><TerminalSlide title="Blocks Output" lines={[
        { text: "python subscribe_blocks.py", type: "command" },
        { text: "Slot: 284712380 | Hash: 5kJnR9...", type: "output" },
        { text: "  Txs: 2847 | Parent: 284712379", type: "info" },
        { text: "Slot: 284712381 | Hash: 8mPwQ2...", type: "output" },
      ]} /></Sequence>
      <Sequence {...ss(56)}><ListSlide title="Blocks — Use Cases" items={[
        { text: "Block Explorer Backend", sub: "Power a custom block explorer with real-time data" },
        { text: "Chain Indexing", sub: "Index all transactions from every block" },
        { text: "MEV Analysis", sub: "Analyze transaction ordering within blocks" },
        { text: "Validator Monitoring", sub: "Track block production and rewards" },
      ]} /></Sequence>

      {/* ═══ SECTION 10: BLOCKS META ═══ */}

      <Sequence {...ss(57)}><ChapterSlide number="07" title="Blocks Meta" subtitle="Lightweight block metadata" /></Sequence>
      <Sequence {...ss(58)}><ComparisonSlide title="Blocks vs Blocks Meta" leftTitle="Blocks" rightTitle="Blocks Meta" rows={[
        { label: "Data", left: "Full content (txs, accounts, entries)", right: "Metadata only (slot, hash, time)" },
        { label: "Bandwidth", left: "Very heavy", right: "Very light" },
        { label: "Filters", left: "account_include, include flags", right: "None — all block metadata" },
        { label: "Use Case", left: "Full block analysis", right: "Chain monitoring, indexing" },
      ]} winner="right" /></Sequence>
      <Sequence {...ss(59)}><CodeSlide title="Subscribe to Block Metadata" filename="subscribe_blocks_meta.py" code={["async def subscribe_blocks_meta():","    stream = stub.Subscribe()","    req = geyser_pb2.SubscribeRequest(","        blocks_meta={",'            "client": geyser_pb2.SubscribeRequestFilterBlocksMeta()',"        },","        commitment=geyser_pb2.CommitmentLevel.FINALIZED","    )","    await stream.write(req)","","    async for update in stream:",'        if update.HasField("block_meta"):',"            m = update.block_meta",'            print(f"Slot: {m.slot} | Hash: {m.blockhash}")','            print(f"  Height: {m.block_height} | Parent: {m.parent_slot}")']} /></Sequence>
      <Sequence {...ss(60)}><TerminalSlide title="Blocks Meta Output" lines={[
        { text: "python subscribe_blocks_meta.py", type: "command" },
        { text: "Slot: 284712390 | Hash: 3rYkW7...", type: "output" },
        { text: "  Height: 265438901 | Parent: 284712389", type: "info" },
      ]} /></Sequence>

      {/* ═══ SECTION 11: ENTRIES ═══ */}

      <Sequence {...ss(61)}><ChapterSlide number="08" title="Entries Subscription" subtitle="Raw validator execution units" /></Sequence>
      <Sequence {...ss(62)}><ConceptSlide title="Entries Subscription" bullets={[
        { text: "The lowest-level subscription — raw execution batches", highlight: "lowest-level" },
        { text: "Each entry: slot, index, num_hashes, hash, executed tx count" },
        { text: "No filters available — you receive all entries" },
        { text: "For deep research and validator-level analysis only" },
      ]} footnote="Most developers won't need this — use Blocks or Transactions instead" /></Sequence>
      <Sequence {...ss(63)}><CodeSlide title="Subscribe to Entries" filename="subscribe_entries.py" code={["async def subscribe_entries():","    stream = stub.Subscribe()","    req = geyser_pb2.SubscribeRequest(",'        entry={"client": geyser_pb2.SubscribeRequestFilterEntry()},',"        commitment=geyser_pb2.CommitmentLevel.CONFIRMED","    )","    await stream.write(req)","","    async for update in stream:",'        if update.HasField("entry"):',"            e = update.entry",'            print(f"Slot: {e.slot} | Index: {e.index}")','            print(f"  Hashes: {e.num_hashes} | Txs: {e.executed_transaction_count}")']} /></Sequence>
      <Sequence {...ss(64)}><TerminalSlide title="Entries Output" lines={[
        { text: "python subscribe_entries.py", type: "command" },
        { text: "Slot: 284712400 | Index: 0", type: "output" },
        { text: "  Hashes: 12500 | Txs: 48", type: "info" },
      ]} /></Sequence>
      <Sequence {...ss(65)}><CalloutSlide text="Most developers won't need Entries." subtext="Use Blocks or Transactions instead. Entries are for deep validator research and low-level chain analysis." variant="white" /></Sequence>

      {/* ═══ SECTION 12: UNARY METHODS ═══ */}

      <Sequence from={TR[6]} durationInFrames={45}><TransitionSlide text="UNARY METHODS" variant="wipe" /></Sequence>
      <Sequence {...ss(66)}><ChapterSlide number="09" title="Unary Methods" subtitle="Simple request-response calls" /></Sequence>
      <Sequence {...ss(67)}><TableSlide title="Available Unary Methods" headers={["Method", "Returns", "Use Case"]} rows={[
        ["Ping", "PongResponse", "Health check / keepalive"],
        ["GetSlot", "Current slot number", "Quick chain position check"],
        ["GetBlockHeight", "Current block height", "Block height lookup"],
        ["GetLatestBlockhash", "Recent blockhash", "Transaction construction"],
        ["IsBlockhashValid", "Boolean validity", "Blockhash expiry check"],
        ["GetVersion", "Server version string", "Compatibility check"],
      ]} /></Sequence>
      <Sequence {...ss(68)}><BigCodeSlide filename="unary_methods.py" highlightLines={[2,3,4,5,8,9,10,11,12]} code={["# GetSlot — current slot number","slot_resp = await stub.GetSlot(","    geyser_pb2.GetSlotRequest(","        commitment=geyser_pb2.CommitmentLevel.CONFIRMED","    )",")",'print(f"Current slot: {slot_resp.slot}")',"","# GetLatestBlockhash — for building transactions","bh_resp = await stub.GetLatestBlockhash(","    geyser_pb2.GetLatestBlockhashRequest(","        commitment=geyser_pb2.CommitmentLevel.FINALIZED","    )",")",'print(f"Blockhash: {bh_resp.blockhash}")','print(f"Last valid block height: {bh_resp.last_valid_block_height}")']} /></Sequence>
      <Sequence {...ss(69)}><BigCodeSlide filename="unary_methods_2.py" highlightLines={[2,3,4,5,6,9,10,11]} code={["# IsBlockhashValid — check before submitting a transaction","valid_resp = await stub.IsBlockhashValid(","    geyser_pb2.IsBlockhashValidRequest(",'        blockhash="YourBlockhashHere...",',"        commitment=geyser_pb2.CommitmentLevel.CONFIRMED","    )",")",'print(f"Valid: {valid_resp.valid}")',"","# GetBlockHeight","height_resp = await stub.GetBlockHeight(","    geyser_pb2.GetBlockHeightRequest(","        commitment=geyser_pb2.CommitmentLevel.CONFIRMED","    )",")",'print(f"Block height: {height_resp.block_height}")',"","# Ping — keepalive / health check","pong = await stub.Ping(geyser_pb2.PingRequest(count=1))",'print(f"Pong received: count={pong.count}")',"","# GetVersion","ver = await stub.GetVersion(geyser_pb2.GetVersionRequest())",'print(f"Server version: {ver.version}")']} /></Sequence>
      <Sequence {...ss(70)}><TerminalSlide title="Unary Methods Output" lines={[
        { text: "python unary_methods.py", type: "command" },
        { text: "Current slot: 284,712,450", type: "output" },
        { text: "Blockhash: 5kJnR9mPwQ2xLm...", type: "output" },
        { text: "Valid: True", type: "success" },
        { text: "Block height: 265,438,901", type: "output" },
        { text: "Pong received: count=1", type: "success" },
      ]} /></Sequence>
      <Sequence {...ss(71)}><CalloutSlide text="Unary methods are simple request-response calls." subtext="No streaming needed — great for quick lookups, health checks, and transaction construction." variant="white" /></Sequence>

      {/* ═══ SECTION 13: RECAP & OUTRO ═══ */}

      <Sequence from={TR[7]} durationInFrames={45}><TransitionSlide text="WRAP UP" variant="pulse" /></Sequence>
      <Sequence {...ss(72)}><ChapterSlide number="10" title="Recap & Next Steps" subtitle="What you learned today" /></Sequence>
      <Sequence {...ss(73)}><RecapSlide title="What We Covered" points={[
        "Yellowstone gRPC — high-performance Solana data streaming",
        "7 subscription types: Slots, Accounts, Transactions, TX Status, Blocks, Blocks Meta, Entries",
        "6 unary methods: Ping, GetSlot, GetBlockHeight, GetLatestBlockhash, IsBlockhashValid, GetVersion",
        "Rich server-side filtering for accounts and transactions",
        "All powered by your NoLimitNodes gRPC endpoint",
      ]} /></Sequence>
      <Sequence {...ss(74)}><FeatureGridSlide title="NoLimitNodes gRPC Features" features={[
        { title: "Sub-50ms Latency", description: "Data straight from validator memory", highlight: true },
        { title: "Yellowstone gRPC", description: "Full support for all subscription types" },
        { title: "Free Tier", description: "Get started with no credit card required" },
        { title: "99.9% Uptime", description: "Enterprise-grade reliability" },
        { title: "Python Support", description: "Works with grpcio and protobuf" },
        { title: "24/7 Support", description: "Help when you need it" },
      ]} /></Sequence>
      <Sequence {...ss(75)}><CalloutSlide text="Full Python code in the blog post." subtext="Link in the description below. Sign up free at nolimitnodes.com for your API key." variant="yellow" /></Sequence>
      <Sequence {...ss(76)}><CountdownSlide text="NEXT VIDEO" seconds={3} subtext="How to Use WebSocket Subscriptions for Solana" /></Sequence>
      <Sequence {...ss(77)}><OutroSlide channel="NoLimitNodes" cta="Subscribe for more Solana developer tutorials" links={["nolimitnodes.com", "@NoLimitNodes", "discord.gg/nln"]} /></Sequence>

      {/* ═══ Persistent Overlays ═══ */}
      <Sequence from={0} durationInFrames={TOTAL}><TopBar channel="NoLimitNodes" episode="YELLOWSTONE gRPC" /></Sequence>
      <Sequence from={0} durationInFrames={TOTAL - S[77][1]}><BottomBar text="nolimitnodes.com" /></Sequence>
      </div>
    </AbsoluteFill>
  );
};
