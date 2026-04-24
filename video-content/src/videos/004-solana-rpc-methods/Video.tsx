import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import { Background } from "../../brand/Background";
import { TopBar, BottomBar } from "../../components/primitives";
import {
  TitleSlide, ChapterSlide, TransitionSlide, CountdownSlide, OutroSlide,
  ConceptSlide, ListSlide, ProcessSlide, ChecklistSlide,
  RecapSlide, CalloutSlide,
  CodeSlide, BigCodeSlide, TerminalSlide,
  KeyValueSlide, TableSlide,
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

const S: Record<number, [number, number]> = {
  1: [0, 213], 2: [213, 744], 3: [957, 471], 4: [1428, 683],
  5: [2111, 142], 6: [2253, 235], 7: [2488, 240], 8: [2728, 310], 9: [3038, 335],
  10: [3373, 319],
  11: [3737, 104], 12: [3841, 150], 13: [3991, 540], 14: [4531, 330],
  15: [4906, 104], 16: [5010, 348], 17: [5358, 458], 18: [5816, 447], 19: [6263, 505], 20: [6768, 382], 21: [7150, 305],
  22: [7500, 105], 23: [7605, 314], 24: [7919, 417], 25: [8336, 237], 26: [8573, 313], 27: [8886, 263],
  28: [9194, 116], 29: [9310, 472], 30: [9782, 392], 31: [10174, 413], 32: [10587, 475], 33: [11062, 504], 34: [11566, 271], 35: [11837, 303],
  36: [12185, 102], 37: [12287, 447], 38: [12734, 336], 39: [13070, 305], 40: [13375, 346], 41: [13721, 270],
  42: [14036, 126], 43: [14162, 310], 44: [14472, 395], 45: [14867, 289], 46: [15156, 396],
  47: [15597, 121], 48: [15718, 306], 49: [16024, 454], 50: [16478, 414],
  51: [16937, 126], 52: [17063, 291], 53: [17354, 435], 54: [17789, 325],
  55: [18159, 111], 56: [18270, 347], 57: [18617, 240], 58: [18857, 304],
  59: [19206, 79], 60: [19285, 716], 61: [20001, 448], 62: [20449, 288], 63: [20737, 231], 64: [20968, 271],
};
const TR = [3692, 4861, 7455, 9149, 12140, 13991, 15552, 16892, 18114, 19161];
const TOTAL = 21239;

const audio = (n: number) => staticFile(`audio/004/slide_${String(n).padStart(3, '0')}.wav`);
const ss = (n: number) => ({ from: S[n][0], durationInFrames: S[n][1] });

export const Video004: React.FC = () => {
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

      <Sequence {...ss(1)}><TitleSlide topic="Solana RPC" title="40+ Methods" subtitle="in Python" pill="PYTHON REFERENCE" /></Sequence>

      <Sequence {...ss(2)}><ConceptSlide title="What is Solana RPC?" bullets={[
        { text: "JSON-RPC 2.0 over HTTP — send a request, get a response", highlight: "JSON-RPC 2.0" },
        { text: "Query blockchain state: accounts, balances, transactions, blocks" },
        { text: "Submit transactions and simulate them before sending" },
        { text: "The foundation of every Solana app, bot, and tool", highlight: "every Solana app" },
      ]} footnote="RPC = Remote Procedure Call — your gateway to the Solana blockchain" /></Sequence>

      <Sequence {...ss(3)}><DiagramSlide title="How It Works" nodes={[
        { label: "YOUR APP", sublabel: "Python script" },
        { label: "HTTP POST", sublabel: "JSON-RPC request", accent: true },
        { label: "RPC NODE", sublabel: "NoLimitNodes" },
        { label: "SOLANA", sublabel: "blockchain" },
      ]} /></Sequence>

      <Sequence {...ss(4)}><ListSlide title="What You'll Learn — 8 Categories" items={[
        { text: "Account Methods", sub: "getAccountInfo, getBalance, getMultipleAccounts, getProgramAccounts" },
        { text: "Token Methods", sub: "getTokenAccountBalance, getTokenAccountsByOwner, getTokenSupply" },
        { text: "Transaction Methods", sub: "getTransaction, sendTransaction, simulateTransaction" },
        { text: "Block Methods", sub: "getBlock, getBlockHeight, getBlocks, getBlockTime" },
        { text: "Network & Cluster", sub: "getClusterNodes, getEpochInfo, getHealth, getVersion" },
        { text: "Fees & Rent", sub: "getFeeForMessage, getRecentPrioritizationFees" },
        { text: "Slot & Blockhash", sub: "getSlot, getLatestBlockhash, isBlockhashValid" },
        { text: "Utility", sub: "requestAirdrop, getSupply, getGenesisHash" },
      ]} /></Sequence>

      {/* ═══ SECTION 2: NLN SIGNUP ═══ */}

      <Sequence {...ss(5)}><ChapterSlide number="00" title="Get Your API Key" subtitle="Sign up at nolimitnodes.com" /></Sequence>
      <Sequence {...ss(6)}><NLNHomepageSlide /></Sequence>
      <Sequence {...ss(7)}><NLNSignupSlide /></Sequence>
      <Sequence {...ss(8)}><NLNApiKeySlide /></Sequence>
      <Sequence {...ss(9)}><CalloutSlide text="You need a NoLimitNodes API key to follow along." subtext="Sign up free at nolimitnodes.com — all code is in the blog post linked in the description below." variant="yellow" /></Sequence>

      {/* ═══ SECTION 3: TOC ═══ */}

      <Sequence {...ss(10)}><TableSlide title="Table of Contents" headers={["#", "Category", "Timestamp"]} rows={[
        ["1", "Python Setup & Helper", "2:05"],
        ["2", "Account Methods (5)", "2:44"],
        ["3", "Token Methods (4)", "4:10"],
        ["4", "Transaction Methods (6)", "5:06"],
        ["5", "Block Methods (5)", "6:46"],
        ["6", "Network & Cluster (5)", "7:48"],
        ["7", "Fees & Rent (3)", "8:40"],
        ["8", "Slot & Blockhash (4)", "9:25"],
        ["9", "Utility Methods (3)", "10:05"],
      ]} /></Sequence>

      {/* ═══ SECTION 4: PYTHON SETUP ═══ */}

      <Sequence from={TR[0]} durationInFrames={45}><TransitionSlide text="SETUP" variant="wipe" /></Sequence>
      <Sequence {...ss(11)}><ChapterSlide number="01" title="Python Setup" subtitle="One dependency, one helper function" /></Sequence>
      <Sequence {...ss(12)}><TerminalSlide title="Install Dependencies" lines={[
        { text: "pip install requests", type: "command" },
        { text: "Successfully installed requests-2.32.0", type: "success" },
      ]} /></Sequence>
      <Sequence {...ss(13)}><BigCodeSlide filename="rpc_helper.py" highlightLines={[4,5,6,7,8,9,10,11,12,13]} code={[
        "import requests","import json","",
        "# Your NoLimitNodes RPC endpoint",
        'RPC_URL = "https://your-nln-rpc-endpoint"',"",
        "def rpc(method: str, params: list = []):",
        "    payload = {",'        "jsonrpc": "2.0",','        "id": 1,',
        '        "method": method,','        "params": params,',"    }",
        "    resp = requests.post(RPC_URL, json=payload)",
        '    return resp.json()["result"]',
      ]} /></Sequence>
      <Sequence {...ss(14)}><CalloutSlide text="This rpc() helper is used in every example." subtext="Replace the RPC_URL with your NoLimitNodes endpoint. Every method is just: rpc('methodName', [params])" variant="white" /></Sequence>

      {/* ═══ SECTION 5: ACCOUNT METHODS ═══ */}

      <Sequence from={TR[1]} durationInFrames={45}><TransitionSlide text="ACCOUNTS" variant="pulse" /></Sequence>
      <Sequence {...ss(15)}><ChapterSlide number="02" title="Account Methods" subtitle="Read account data and balances" /></Sequence>
      <Sequence {...ss(16)}><CodeSlide title="getBalance" filename="get_balance.py" code={[
        "# Get SOL balance for an account (in lamports)",
        "# 1 SOL = 1,000,000,000 lamports","",
        'result = rpc("getBalance", [',
        '    "83astBRguLMdt2h5U1Tpdq5tjFoJ6noeGwaY3mDLVcri",',
        '    {"commitment": "finalized"}',"])","",'lamports = result["value"]',
        "sol = lamports / 1_000_000_000",'print(f"Balance: {sol} SOL")',
      ]} /></Sequence>
      <Sequence {...ss(17)}><BigCodeSlide filename="get_account_info.py" highlightLines={[4,5,6,7,8]} code={[
        "# Get full account data: balance, owner, data, executable","",
        'result = rpc("getAccountInfo", [',
        '    "vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg",',"    {",
        '        "encoding": "jsonParsed",',
        '        "commitment": "finalized"',"    }","])","",'acct = result["value"]',
        'print(f"Lamports: {acct[\'lamports\']}")',
        'print(f"Owner: {acct[\'owner\']}")',
        'print(f"Executable: {acct[\'executable\']}")',
        'print(f"Data: {acct[\'data\']}")',
      ]} /></Sequence>
      <Sequence {...ss(18)}><CodeSlide title="getMultipleAccounts" filename="get_multiple.py" code={[
        "# Read up to 100 accounts in a single request","",
        'result = rpc("getMultipleAccounts", [',"    [",
        '        "vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg",',
        '        "4fYNw3dojWmQ4dXtSGE9epjRGy9pFSx62YypT7avPYvA"',"    ],",
        '    {"encoding": "base64", "commitment": "finalized"}',"])","",'for acct in result["value"]:',
        "    if acct:",'        print(f"Lamports: {acct[\'lamports\']}")',
      ]} /></Sequence>
      <Sequence {...ss(19)}><BigCodeSlide filename="get_program_accounts.py" highlightLines={[4,5,6,7,8,9,10]} code={[
        "# Get all accounts owned by a program (with filters)","",
        'result = rpc("getProgramAccounts", [',
        '    "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",',"    {",
        '        "encoding": "jsonParsed",','        "filters": [',
        '            {"dataSize": 165},',
        '            {"memcmp": {"offset": 0, "bytes": "MINT_PUBKEY"}}',"        ]","    }","])",""
        ,"for item in result:",'    print(f"Account: {item[\'pubkey\']}")',
        '    print(f"  Lamports: {item[\'account\'][\'lamports\']}")',
      ]} /></Sequence>
      <Sequence {...ss(20)}><CodeSlide title="getLargestAccounts" filename="get_largest.py" code={[
        "# Get the 20 largest accounts by SOL balance","",
        'result = rpc("getLargestAccounts", [','    {"commitment": "finalized"}',"])",""
        ,'for acct in result["value"][:5]:',"    sol = acct['lamports'] / 1_000_000_000",
        '    print(f"{acct[\'address\']}: {sol:,.0f} SOL")',
      ]} /></Sequence>
      <Sequence {...ss(21)}><TerminalSlide title="Account Methods Output" lines={[
        { text: "python get_balance.py", type: "command" },
        { text: "Balance: 4.2 SOL", type: "output" },
        { text: "", type: "output" },
        { text: "python get_account_info.py", type: "command" },
        { text: "Lamports: 4200000000", type: "output" },
        { text: "Owner: 11111111111111111111111111111111", type: "output" },
      ]} /></Sequence>

      {/* ═══ SECTION 6: TOKEN METHODS ═══ */}

      <Sequence from={TR[2]} durationInFrames={45}><TransitionSlide text="TOKENS" variant="flash" /></Sequence>
      <Sequence {...ss(22)}><ChapterSlide number="03" title="Token Methods" subtitle="SPL Token balances and accounts" /></Sequence>
      <Sequence {...ss(23)}><CodeSlide title="getTokenAccountBalance" filename="get_token_balance.py" code={[
        "# Get SPL token balance for a token account","",
        'result = rpc("getTokenAccountBalance", [',
        '    "48gpnn8nsmkvkgso7462Z1nFhUrprGQ71u1YLBPzizbY",',
        '    {"commitment": "finalized"}',"])","",'val = result["value"]',
        'print(f"Amount: {val[\'uiAmountString\']}")',
        'print(f"Decimals: {val[\'decimals\']}")',
      ]} /></Sequence>
      <Sequence {...ss(24)}><BigCodeSlide filename="get_token_accounts_by_owner.py" highlightLines={[3,4,5,6,7,8,9]} code={[
        "# Get all token accounts for a wallet","",
        'result = rpc("getTokenAccountsByOwner", [',
        '    "A1TMhSGzQxMr1TboBKtgixKz1sS6REASMxPo1qsyTSJd",',
        '    {"programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"},',"    {",
        '        "encoding": "jsonParsed",',
        '        "commitment": "finalized"',"    }","])",""
        ,'for item in result["value"]:',
        '    info = item["account"]["data"]["parsed"]["info"]',
        '    print(f"Mint: {info[\'mint\']}")',
        '    print(f"  Amount: {info[\'tokenAmount\'][\'uiAmountString\']}")',
      ]} /></Sequence>
      <Sequence {...ss(25)}><CodeSlide title="getTokenSupply" filename="get_token_supply.py" code={[
        "# Get total supply for an SPL token mint","",
        'result = rpc("getTokenSupply", [',
        '    "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",',
        '    {"commitment": "finalized"}',"])","",'val = result["value"]',
        'print(f"Supply: {val[\'uiAmountString\']}")',
        'print(f"Decimals: {val[\'decimals\']}")',
      ]} /></Sequence>
      <Sequence {...ss(26)}><CodeSlide title="getTokenLargestAccounts" filename="get_token_largest.py" code={[
        "# Get the 20 largest holders of a specific token","",
        'result = rpc("getTokenLargestAccounts", [',
        '    "3wyAj7Rt1TWVPZVteFJPLa26JmLvdb1CAKEFZm3NY75E",',
        '    {"commitment": "finalized"}',"])",""
        ,'for holder in result["value"][:5]:',
        '    print(f"{holder[\'address\']}: {holder[\'uiAmountString\']}")',
      ]} /></Sequence>
      <Sequence {...ss(27)}><TerminalSlide title="Token Methods Output" lines={[
        { text: "python get_token_balance.py", type: "command" },
        { text: "Amount: 1,250,000.50", type: "output" },
        { text: "Decimals: 6", type: "output" },
        { text: "", type: "output" },
        { text: "python get_token_supply.py", type: "command" },
        { text: "Supply: 1,000,000,000", type: "output" },
      ]} /></Sequence>

      {/* ═══ SECTION 7: TRANSACTION METHODS ═══ */}

      <Sequence from={TR[3]} durationInFrames={45}><TransitionSlide text="TRANSACTIONS" variant="wipe" /></Sequence>
      <Sequence {...ss(28)}><ChapterSlide number="04" title="Transaction Methods" subtitle="Fetch, send, and simulate transactions" /></Sequence>
      <Sequence {...ss(29)}><BigCodeSlide filename="get_transaction.py" highlightLines={[3,4,5,6,7,8]} code={[
        "# Fetch full details of a confirmed transaction","",
        'result = rpc("getTransaction", [',
        '    "4cdd1oX7cfVALfr26tP52BZ6cSzrgnNGtYD...",',"    {",
        '        "encoding": "jsonParsed",',
        '        "commitment": "confirmed",',
        '        "maxSupportedTransactionVersion": 0',"    }","])",""
        ,'print(f"Slot: {result[\'slot\']}")',
        'print(f"Fee: {result[\'meta\'][\'fee\']} lamports")',
        'print(f"Status: {result[\'meta\'][\'err\']}")',
        'for log in result["meta"]["logMessages"]:','    print(f"  {log}")',
      ]} /></Sequence>
      <Sequence {...ss(30)}><CodeSlide title="getSignaturesForAddress" filename="get_signatures.py" code={[
        "# Get transaction history for an address (newest first)","",
        'result = rpc("getSignaturesForAddress", [',
        '    "Vote111111111111111111111111111111111111111",',"    {",
        '        "commitment": "finalized",','        "limit": 5',"    }","])",""
        ,"for tx in result:",'    print(f"Sig: {tx[\'signature\'][:20]}...")',
        '    print(f"  Slot: {tx[\'slot\']} | Err: {tx[\'err\']}")',
      ]} /></Sequence>
      <Sequence {...ss(31)}><CodeSlide title="getSignatureStatuses" filename="get_sig_statuses.py" code={[
        "# Check confirmation status of one or more transactions","",
        'result = rpc("getSignatureStatuses", [',
        '    ["4cdd1oX7cfVALfr26tP52BZ6cSzrgnNGtYD..."],',
        '    {"searchTransactionHistory": True}',"])",""
        ,'for status in result["value"]:',"    if status:",
        '        print(f"Slot: {status[\'slot\']}")',
        '        print(f"Confirmations: {status[\'confirmations\']}")',
        '        print(f"Status: {status[\'confirmationStatus\']}")',
      ]} /></Sequence>
      <Sequence {...ss(32)}><CodeSlide title="sendTransaction" filename="send_transaction.py" code={[
        "# Submit a signed transaction to the cluster","# Returns the transaction signature","",
        'sig = rpc("sendTransaction", [','    "BASE64_ENCODED_SIGNED_TX...",',"    {",
        '        "encoding": "base64",','        "skipPreflight": False,',
        '        "preflightCommitment": "confirmed"',"    }","])",""
        ,'print(f"Submitted: {sig}")',
      ]} /></Sequence>
      <Sequence {...ss(33)}><BigCodeSlide filename="simulate_transaction.py" highlightLines={[3,4,5,6,7,8]} code={[
        "# Dry-run a transaction without broadcasting","",
        'result = rpc("simulateTransaction", [','    "BASE64_ENCODED_TX...",',"    {",
        '        "encoding": "base64",','        "commitment": "confirmed",',
        '        "replaceRecentBlockhash": True',"    }","])",""
        ,'sim = result["value"]','print(f"Error: {sim[\'err\']}")',
        'print(f"Logs: {sim[\'logs\']}")','print(f"Units consumed: {sim[\'unitsConsumed\']}")',
      ]} /></Sequence>
      <Sequence {...ss(34)}><CodeSlide title="getTransactionCount" filename="get_tx_count.py" code={[
        "# Total transactions processed by the cluster","",
        'count = rpc("getTransactionCount", [','    {"commitment": "finalized"}',"])",""
        ,'print(f"Total transactions: {count:,}")',
      ]} /></Sequence>
      <Sequence {...ss(35)}><TerminalSlide title="Transaction Methods Output" lines={[
        { text: "python get_transaction.py", type: "command" },
        { text: "Slot: 284712360 | Fee: 5000 lamports", type: "output" },
        { text: "Status: None (success)", type: "success" },
        { text: "", type: "output" },
        { text: "python get_tx_count.py", type: "command" },
        { text: "Total transactions: 312,847,291,053", type: "output" },
      ]} /></Sequence>

      {/* ═══ SECTION 8: BLOCK METHODS ═══ */}

      <Sequence from={TR[4]} durationInFrames={45}><TransitionSlide text="BLOCKS" variant="pulse" /></Sequence>
      <Sequence {...ss(36)}><ChapterSlide number="05" title="Block Methods" subtitle="Query block data and history" /></Sequence>
      <Sequence {...ss(37)}><BigCodeSlide filename="get_block.py" highlightLines={[3,4,5,6,7,8,9]} code={[
        "# Get full block data for a specific slot","",
        'result = rpc("getBlock", [',"    378967388,","    {",
        '        "encoding": "jsonParsed",','        "commitment": "finalized",',
        '        "transactionDetails": "full",',
        '        "maxSupportedTransactionVersion": 0,','        "rewards": True',"    }","])",""
        ,'print(f"Blockhash: {result[\'blockhash\']}")',
        'print(f"Height: {result[\'blockHeight\']}")',
        'print(f"Transactions: {len(result[\'transactions\'])}")',
        'print(f"Time: {result[\'blockTime\']}")',
      ]} /></Sequence>
      <Sequence {...ss(38)}><CodeSlide title="getBlockHeight & getBlockTime" filename="block_height_time.py" code={[
        "# Get current block height",
        'height = rpc("getBlockHeight", [','    {"commitment": "finalized"}',"])",
        'print(f"Block height: {height:,}")',""
        ,"# Get timestamp for a specific block",
        'timestamp = rpc("getBlockTime", [378967388])',""
        ,"from datetime import datetime","dt = datetime.fromtimestamp(timestamp)",
        'print(f"Block time: {dt}")',
      ]} /></Sequence>
      <Sequence {...ss(39)}><CodeSlide title="getBlocks" filename="get_blocks.py" code={[
        "# Get confirmed block slots in a range","",
        'result = rpc("getBlocks", [',"    377268280,","    377268285,",
        '    {"commitment": "finalized"}',"])",""
        ,'print(f"Confirmed slots: {result}")',
        "# Output: [377268280, 377268281, 377268283, 377268285]",
        "# Note: some slots may be skipped (no block produced)",
      ]} /></Sequence>
      <Sequence {...ss(40)}><CodeSlide title="getBlockProduction" filename="get_block_production.py" code={[
        "# Get block production stats by validator","",
        'result = rpc("getBlockProduction", [','    {"commitment": "finalized"}',"])",""
        ,'validators = result["value"]["byIdentity"]',
        "for pubkey, stats in list(validators.items())[:3]:",
        "    leader_slots, blocks_produced = stats",
        '    print(f"{pubkey[:20]}...")',
        '    print(f"  Slots: {leader_slots} | Produced: {blocks_produced}")',
      ]} /></Sequence>
      <Sequence {...ss(41)}><TerminalSlide title="Block Methods Output" lines={[
        { text: "python get_block.py", type: "command" },
        { text: "Blockhash: 5kJnR9mPwQ2...", type: "output" },
        { text: "Height: 265438901 | Txs: 2847", type: "output" },
        { text: "", type: "output" },
        { text: "python block_height_time.py", type: "command" },
        { text: "Block height: 265,438,901", type: "output" },
      ]} /></Sequence>

      {/* ═══ SECTION 9: NETWORK & CLUSTER ═══ */}

      <Sequence from={TR[5]} durationInFrames={45}><TransitionSlide text="NETWORK" variant="flash" /></Sequence>
      <Sequence {...ss(42)}><ChapterSlide number="06" title="Network & Cluster" subtitle="Node info, epoch data, health checks" /></Sequence>
      <Sequence {...ss(43)}><CodeSlide title="getHealth & getVersion" filename="health_version.py" code={[
        "# Check if the RPC node is healthy",
        'health = rpc("getHealth")','print(f"Health: {health}")  # "ok" or error',""
        ,"# Get node software version",'version = rpc("getVersion")',
        'print(f"Solana: {version[\'solana-core\']}")',
        'print(f"Feature set: {version[\'feature-set\']}")',
      ]} /></Sequence>
      <Sequence {...ss(44)}><CodeSlide title="getEpochInfo" filename="get_epoch_info.py" code={[
        "# Get current epoch details","",
        'result = rpc("getEpochInfo", [','    {"commitment": "finalized"}',"])",""
        ,'print(f"Epoch: {result[\'epoch\']}")',
        'print(f"Slot: {result[\'absoluteSlot\']}")',
        'print(f"Block height: {result[\'blockHeight\']}")',
        'print(f"Slot index: {result[\'slotIndex\']}/{result[\'slotsInEpoch\']}")',
        'print(f"Tx count: {result[\'transactionCount\']:,}")',
      ]} /></Sequence>
      <Sequence {...ss(45)}><CodeSlide title="getClusterNodes" filename="get_cluster_nodes.py" code={[
        "# Get all nodes in the cluster","",
        'nodes = rpc("getClusterNodes")',"",'print(f"Total nodes: {len(nodes)}")',
        "for node in nodes[:3]:",'    print(f"Pubkey: {node[\'pubkey\'][:20]}...")',
        '    print(f"  Version: {node[\'version\']}")',
        '    print(f"  RPC: {node[\'rpc\']}")',
      ]} /></Sequence>
      <Sequence {...ss(46)}><CodeSlide title="getVoteAccounts" filename="get_vote_accounts.py" code={[
        "# Get current and delinquent vote accounts","",
        'result = rpc("getVoteAccounts", [','    {"commitment": "finalized"}',"])",""
        ,'print(f"Current validators: {len(result[\'current\'])}")',
        'print(f"Delinquent: {len(result[\'delinquent\'])}")',""
        ,'for v in result["current"][:3]:',
        '    print(f"  {v[\'votePubkey\'][:20]}... stake: {v[\'activatedStake\']}")',
      ]} /></Sequence>

      {/* ═══ SECTION 10: FEES & RENT ═══ */}

      <Sequence from={TR[6]} durationInFrames={45}><TransitionSlide text="FEES" variant="wipe" /></Sequence>
      <Sequence {...ss(47)}><ChapterSlide number="07" title="Fees & Rent" subtitle="Transaction costs and rent exemption" /></Sequence>
      <Sequence {...ss(48)}><CodeSlide title="getFeeForMessage" filename="get_fee.py" code={[
        "# Estimate the fee for a transaction message","",
        'result = rpc("getFeeForMessage", [','    "BASE64_ENCODED_MESSAGE...",',
        '    {"commitment": "confirmed"}',"])","",'fee = result["value"]',
        'print(f"Estimated fee: {fee} lamports")',
        'print(f"That is {fee / 1_000_000_000} SOL")',
      ]} /></Sequence>
      <Sequence {...ss(49)}><CodeSlide title="getRecentPrioritizationFees" filename="get_priority_fees.py" code={[
        "# Get recent priority fee samples","",
        'result = rpc("getRecentPrioritizationFees", [',
        '    ["CxELquR1gPP8wHe33gZ4QxqGB3sZ9RSwsJ2KshVewkFY"]',"])",""
        ,"for sample in result[:5]:",
        '    print(f"Slot: {sample[\'slot\']} | Fee: {sample[\'prioritizationFee\']}")',
      ]} /></Sequence>
      <Sequence {...ss(50)}><CodeSlide title="getMinimumBalanceForRentExemption" filename="get_rent.py" code={[
        "# How much SOL to keep an account alive?","",
        "# For a 165-byte account (SPL Token account)",
        'lamports = rpc("getMinimumBalanceForRentExemption", [165])',""
        ,"sol = lamports / 1_000_000_000",
        'print(f"Rent exempt: {lamports} lamports ({sol} SOL)")',""
        ,"# For a 0-byte account (just SOL)",
        'lamports_0 = rpc("getMinimumBalanceForRentExemption", [0])',
        'print(f"Empty account: {lamports_0} lamports")',
      ]} /></Sequence>

      {/* ═══ SECTION 11: SLOT & BLOCKHASH ═══ */}

      <Sequence from={TR[7]} durationInFrames={45}><TransitionSlide text="SLOT" variant="pulse" /></Sequence>
      <Sequence {...ss(51)}><ChapterSlide number="08" title="Slot & Blockhash" subtitle="Chain position and transaction construction" /></Sequence>
      <Sequence {...ss(52)}><CodeSlide title="getSlot & getSlotLeader" filename="get_slot.py" code={[
        "# Get current slot number",
        'slot = rpc("getSlot", [{"commitment": "finalized"}])',
        'print(f"Current slot: {slot:,}")',""
        ,"# Get current slot leader (validator pubkey)",
        'leader = rpc("getSlotLeader", [{"commitment": "finalized"}])',
        'print(f"Slot leader: {leader}")',
      ]} /></Sequence>
      <Sequence {...ss(53)}><CodeSlide title="getLatestBlockhash" filename="get_blockhash.py" code={[
        "# Get latest blockhash — needed for every transaction","",
        'result = rpc("getLatestBlockhash", [','    {"commitment": "finalized"}',"])",""
        ,'bh = result["value"]','print(f"Blockhash: {bh[\'blockhash\']}")',
        'print(f"Valid until height: {bh[\'lastValidBlockHeight\']}")',
      ]} /></Sequence>
      <Sequence {...ss(54)}><CodeSlide title="isBlockhashValid" filename="is_blockhash_valid.py" code={[
        "# Check if a blockhash is still valid before submitting","",
        'result = rpc("isBlockhashValid", [',
        '    "J7rBdM6AecPDEZp8aPq5iPSNKVkU5Q76F3oAV4eW5wsW",',
        '    {"commitment": "confirmed"}',"])","",'valid = result["value"]',
        'print(f"Valid: {valid}")',"# If False, fetch a new blockhash before sending tx",
      ]} /></Sequence>

      {/* ═══ SECTION 12: UTILITY ═══ */}

      <Sequence from={TR[8]} durationInFrames={45}><TransitionSlide text="UTILITY" variant="flash" /></Sequence>
      <Sequence {...ss(55)}><ChapterSlide number="09" title="Utility Methods" subtitle="Airdrop, supply, and genesis" /></Sequence>
      <Sequence {...ss(56)}><CodeSlide title="requestAirdrop" filename="request_airdrop.py" code={[
        "# Get free SOL on devnet or testnet (not mainnet!)","",
        "# Switch RPC_URL to devnet first:",
        '# RPC_URL = "https://api.devnet.solana.com"',""
        ,'sig = rpc("requestAirdrop", [',
        '    "83astBRguLMdt2h5U1Tpdq5tjFoJ6noeGwaY3mDLVcri",',
        "    1_000_000_000  # 1 SOL","])","",'print(f"Airdrop tx: {sig}")',
      ]} /></Sequence>
      <Sequence {...ss(57)}><CodeSlide title="getSupply" filename="get_supply.py" code={[
        "# Get total SOL supply breakdown","",
        'result = rpc("getSupply", [','    {"commitment": "finalized"}',"])",""
        ,'val = result["value"]','total = val["total"] / 1_000_000_000',
        'circ = val["circulating"] / 1_000_000_000',
        'non_circ = val["nonCirculating"] / 1_000_000_000',
        'print(f"Total: {total:,.0f} SOL")',
        'print(f"Circulating: {circ:,.0f} SOL")',
        'print(f"Non-circulating: {non_circ:,.0f} SOL")',
      ]} /></Sequence>
      <Sequence {...ss(58)}><CodeSlide title="getGenesisHash" filename="get_genesis.py" code={[
        "# Get the genesis hash — identifies the network","",
        'genesis = rpc("getGenesisHash")','print(f"Genesis hash: {genesis}")',""
        ,"# Mainnet: 5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d",
        "# Devnet:  EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG",
        "# Testnet: 4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY",
      ]} /></Sequence>

      {/* ═══ SECTION 13: RECAP & OUTRO ═══ */}

      <Sequence from={TR[9]} durationInFrames={45}><TransitionSlide text="WRAP UP" variant="pulse" /></Sequence>
      <Sequence {...ss(59)}><ChapterSlide number="10" title="Recap & Next Steps" subtitle="What you learned today" /></Sequence>
      <Sequence {...ss(60)}><RecapSlide title="40+ RPC Methods Covered" points={[
        "Account Methods: getBalance, getAccountInfo, getMultipleAccounts, getProgramAccounts",
        "Token Methods: getTokenAccountBalance, getTokenAccountsByOwner, getTokenSupply",
        "Transaction Methods: getTransaction, sendTransaction, simulateTransaction",
        "Block Methods: getBlock, getBlockHeight, getBlocks, getBlockTime",
        "Plus: Network, Fees, Slot, Blockhash, and Utility methods",
      ]} /></Sequence>
      <Sequence {...ss(61)}><FeatureGridSlide title="NoLimitNodes RPC Features" features={[
        { title: "Unlimited Requests", description: "No rate limits on any plan", highlight: true },
        { title: "Sub-10ms Latency", description: "Bare-metal servers worldwide" },
        { title: "Free Tier", description: "Get started with no credit card" },
        { title: "All RPC Methods", description: "Full Solana RPC support" },
        { title: "99.9% Uptime", description: "Enterprise-grade reliability" },
        { title: "24/7 Support", description: "Help when you need it" },
      ]} /></Sequence>
      <Sequence {...ss(62)}><CalloutSlide text="Full Python code in the blog post." subtext="Link in the description below. Sign up free at nolimitnodes.com for your API key." variant="yellow" /></Sequence>
      <Sequence {...ss(63)}><CountdownSlide text="MORE COMING SOON" seconds={3} subtext="Subscribe for more Solana developer tutorials" /></Sequence>
      <Sequence {...ss(64)}><OutroSlide channel="NoLimitNodes" cta="Subscribe for more Solana developer tutorials" links={["nolimitnodes.com", "@NoLimitNodes", "discord.gg/nln"]} /></Sequence>

      {/* ═══ Persistent Overlays ═══ */}
      <Sequence from={0} durationInFrames={TOTAL}><TopBar channel="NoLimitNodes" episode="SOLANA RPC METHODS" /></Sequence>
      <Sequence from={0} durationInFrames={TOTAL - S[64][1]}><BottomBar text="nolimitnodes.com" /></Sequence>
      </div>
    </AbsoluteFill>
  );
};
