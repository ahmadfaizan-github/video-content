"""
Narration script + batch TTS generator for Video 004: Solana RPC Methods
Generates one .wav file per slide, named slide_001.wav, slide_002.wav, etc.

Usage:
    source /root/nln-video-content/tts-env/bin/activate
    python /root/nln-video-content/audio/004-solana-rpc-methods/narration.py
"""

import os
import time
import torch
import soundfile as sf
from qwen_tts import Qwen3TTSModel

OUTPUT_DIR = "/root/nln-video-content/audio/004-solana-rpc-methods/clips"
SPEAKER = "Aiden"
LANGUAGE = "English"
MAX_TOKENS = 4096

NARRATION = [
    # ═══ SECTION 1: INTRO ═══
    (1, "Forty plus Solana RPC methods in Python. Your complete reference guide. Let's go."),

    (2, "What is Solana RPC? It stands for Remote Procedure Call. It's a JSON-RPC two point zero API over HTTP. You send a JSON request, you get a JSON response. You can query accounts, balances, transactions, blocks, and more. You can also submit and simulate transactions. This is the foundation of every Solana app, bot, and tool."),

    (3, "Here's how it works. Your Python script sends an HTTP POST request with a JSON body to the NoLimitNodes RPC node. The node queries the Solana blockchain and returns the result as JSON."),

    (4, "We'll cover eight categories. Account methods for reading account data. Token methods for SPL token balances and accounts. Transaction methods for fetching, sending, and simulating. Block methods for querying blocks. Network and cluster info. Fees and rent. Slot and blockhash. And utility methods. Let's get started."),

    # ═══ SECTION 2: NLN SIGNUP ═══
    (5, "Before we start, get your API key from NoLimitNodes."),

    (6, "First, go to nolimitnodes dot com. You'll see the homepage. Click the Sign Up button in the top right corner."),

    (7, "Create your account. Enter your email and click Continue. It's completely free, no credit card required."),

    (8, "Once you're logged in, you'll see the Quick Start page with your RPC endpoint and API key. Copy both of these — you'll need them for every example."),

    (9, "You need a NoLimitNodes API key for every example. Sign up free at nolimitnodes dot com. All code is in the blog post linked in the description."),

    # ═══ SECTION 3: TABLE OF CONTENTS ═══
    (10, "Here's the table of contents. Nine chapters covering all eight categories plus setup. Feel free to skip ahead to whatever you need using the timestamps."),

    # ═══ SECTION 4: SETUP ═══
    (11, "Chapter one. Python setup."),

    (12, "Install requests with pip. That's the only dependency."),

    (13, "Here's the helper function. It takes a method name and parameters, wraps them in a JSON-RPC payload, sends a POST request to your NoLimitNodes endpoint, and returns the result. This one function is used in every single example throughout the video."),

    (14, "Replace the RPC URL with your NoLimitNodes endpoint. Every method call is simply: rpc, method name, parameters. Clean and simple."),

    # ═══ SECTION 5: ACCOUNT METHODS ═══
    (15, "Chapter two. Account methods."),

    (16, "getBalance. Pass an account's public key and get back the balance in lamports. One SOL equals one billion lamports. Simple division gives you the SOL amount."),

    (17, "getAccountInfo. This returns everything about an account: lamports, owner, data, whether it's executable, and rent epoch. Use jsonParsed encoding for human-readable data, or base sixty-four for raw bytes."),

    (18, "getMultipleAccounts. Read up to one hundred accounts in a single request. Pass an array of public keys and get back an array of account objects. Much more efficient than calling getAccountInfo one hundred times."),

    (19, "getProgramAccounts. Get all accounts owned by a specific program. This is powerful — you can filter by data size and use memcmp to match specific bytes at specific offsets. For example, filter Token Program accounts by mint address."),

    (20, "getLargestAccounts. Returns the twenty largest accounts by SOL balance. You can filter by circulating or non-circulating supply. Useful for analytics and whale watching."),

    # ═══ SECTION 6: TOKEN METHODS ═══
    (21, "Chapter three. Token methods."),

    (22, "getTokenAccountBalance. Pass a token account's public key and get the balance with the amount, decimals, and human-readable UI amount string."),

    (23, "getTokenAccountsByOwner. Get all token accounts for a specific wallet. Pass the owner's public key and either a mint address or the Token Program ID. This returns every token the wallet holds."),

    (24, "getTokenSupply. Pass a mint's public key and get the total supply, decimals, and UI amount string."),

    (25, "getTokenLargestAccounts. Get the twenty largest holders of a specific token. Great for analyzing token distribution and finding whales."),

    # ═══ SECTION 7: TRANSACTION METHODS ═══
    (26, "Chapter four. Transaction methods."),

    (27, "getTransaction. Fetch full details of a confirmed transaction by its signature. You get the slot, fee, error status, log messages, and all the instruction data. Use jsonParsed encoding for readable output."),

    (28, "getSignaturesForAddress. Get the transaction history for any address, newest first. You can set a limit from one to one thousand, and paginate using the before and until parameters."),

    (29, "getSignatureStatuses. Check the confirmation status of one or more transactions in a single call. Returns the slot, number of confirmations, and confirmation status for each signature."),

    (30, "sendTransaction. Submit a fully signed transaction to the cluster. Pass the base sixty-four encoded signed transaction. You can skip preflight checks for speed, but it's safer to keep them on. Returns the transaction signature."),

    (31, "simulateTransaction. Dry-run a transaction without actually broadcasting it. This tells you if it would succeed or fail, what the logs would be, and how many compute units it would consume. Essential for testing before sending real transactions."),

    (32, "getTransactionCount. Returns the total number of transactions the cluster has processed. A simple but useful metric."),

    # ═══ SECTION 8: BLOCK METHODS ═══
    (33, "Chapter five. Block methods."),

    (34, "getBlock. Get full block data for a specific slot. You get the blockhash, block height, all transactions, rewards, and timestamp. Use maxSupportedTransactionVersion zero to include versioned transactions."),

    (35, "getBlockHeight returns the current block height. getBlockTime returns the Unix timestamp for a specific slot. Both are simple single-value responses."),

    (36, "getBlocks returns an array of confirmed block slots within a range. Note that some slots may be skipped if no block was produced in that slot."),

    (37, "getBlockProduction gives you block production statistics by validator. You can see how many leader slots each validator had and how many blocks they actually produced."),

    # ═══ SECTION 9: NETWORK & CLUSTER ═══
    (38, "Chapter six. Network and cluster methods."),

    (39, "getHealth returns whether the node is healthy. getVersion returns the Solana software version and feature set. Both are quick health check calls."),

    (40, "getEpochInfo returns current epoch details including the epoch number, absolute slot, block height, slot index within the epoch, total slots in the epoch, and total transaction count."),

    (41, "getClusterNodes returns all nodes in the cluster with their public keys, versions, RPC endpoints, and other network addresses."),

    (42, "getVoteAccounts returns vote accounts partitioned into current and delinquent. Current validators are actively participating in consensus. Delinquent validators have fallen behind."),

    # ═══ SECTION 10: FEES & RENT ═══
    (43, "Chapter seven. Fees and rent methods."),

    (44, "getFeeForMessage estimates the fee for a transaction message. Pass the base sixty-four encoded message and get back the fee in lamports."),

    (45, "getRecentPrioritizationFees returns recent priority fee samples. You can filter by specific accounts to see what fees others are paying for similar transactions. Essential for competitive transaction landing."),

    (46, "getMinimumBalanceForRentExemption tells you how many lamports you need to keep an account alive. For example, an SPL Token account needs rent exemption for one hundred sixty-five bytes of data."),

    # ═══ SECTION 11: SLOT & BLOCKHASH ═══
    (47, "Chapter eight. Slot and blockhash methods."),

    (48, "getSlot returns the current slot number. getSlotLeader returns the public key of the validator scheduled to produce the current slot."),

    (49, "getLatestBlockhash is critical. Every transaction needs a recent blockhash. This returns the latest one along with the last valid block height. If you submit after that height, the transaction expires."),

    (50, "isBlockhashValid checks whether a blockhash is still valid. Always check before submitting a transaction. If it returns false, fetch a new blockhash."),

    # ═══ SECTION 12: UTILITY ═══
    (51, "Chapter nine. Utility methods."),

    (52, "requestAirdrop gets you free SOL on devnet or testnet. This only works on test networks, not mainnet. Pass the recipient public key and amount in lamports."),

    (53, "getSupply returns the total SOL supply breakdown: total, circulating, and non-circulating amounts."),

    (54, "getGenesisHash returns the genesis hash that identifies the network. Mainnet, devnet, and testnet each have a unique genesis hash."),

    # ═══ SECTION 13: RECAP & OUTRO ═══
    (55, "Let's wrap up."),

    (56, "We covered over forty RPC methods across eight categories. Account methods for reading data. Token methods for SPL tokens. Transaction methods for fetching, sending, and simulating. Block methods for chain data. Network and cluster info. Fees and rent. Slot and blockhash. And utility methods. All with working Python code."),

    (57, "NoLimitNodes gives you unlimited RPC requests, sub-ten millisecond latency, a free tier, full support for all RPC methods, ninety-nine point nine percent uptime, and twenty-four seven support."),

    (58, "The full Python code for every example is in the blog post. Link in the description below. Sign up free at nolimitnodes dot com."),

    (59, "More tutorials coming soon. Subscribe to NoLimitNodes for the latest Solana developer content."),

    (60, "Thanks for watching. Visit nolimitnodes dot com. Follow us at NoLimitNodes. Join our Discord. See you in the next one."),
]


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("=" * 60)
    print(f"  Video 004 — Solana RPC Methods Narration Generator")
    print(f"  Speaker: {SPEAKER} | Clips: {len(NARRATION)}")
    print(f"  Output:  {OUTPUT_DIR}")
    print("=" * 60)

    # Auto-detect: Mac GPU (MPS) > NVIDIA GPU (CUDA) > CPU
    if torch.backends.mps.is_available():
        device, dtype, attn = "mps", torch.bfloat16, "sdpa"
        print("\nUsing Apple Silicon GPU (MPS)")
    elif torch.cuda.is_available():
        device, dtype, attn = "cuda:0", torch.bfloat16, "sdpa"
        print("\nUsing NVIDIA GPU (CUDA)")
    else:
        device, dtype, attn = "cpu", torch.float32, "eager"
        print("\nUsing CPU (slow — GPU recommended)")

    print("Loading Qwen3-TTS model...")
    t0 = time.time()
    model = Qwen3TTSModel.from_pretrained(
        "Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice",
        device_map=device,
        dtype=dtype,
        attn_implementation=attn,
    )
    print(f"Model loaded in {time.time() - t0:.1f}s\n")

    total_audio = 0.0
    total_time = 0.0

    for idx, (slide_num, text) in enumerate(NARRATION):
        filename = f"slide_{slide_num:03d}.wav"
        filepath = os.path.join(OUTPUT_DIR, filename)

        if os.path.exists(filepath):
            print(f"[{idx+1}/{len(NARRATION)}] SKIP slide_{slide_num:03d}.wav (already exists)")
            continue

        print(f"[{idx+1}/{len(NARRATION)}] Generating slide_{slide_num:03d}.wav ...")
        print(f"    Text: {text[:80]}...")

        t1 = time.time()
        wavs, sr = model.generate_custom_voice(
            text=text,
            language=LANGUAGE,
            speaker=SPEAKER,
            max_new_tokens=MAX_TOKENS,
        )
        elapsed = time.time() - t1
        duration = len(wavs[0]) / sr

        sf.write(filepath, wavs[0], sr)

        total_audio += duration
        total_time += elapsed
        print(f"    Done: {duration:.1f}s audio in {elapsed:.1f}s ({elapsed/duration:.1f}x realtime)")
        print()

    print("=" * 60)
    print(f"  COMPLETE!")
    print(f"  Total audio:    {total_audio:.1f}s ({total_audio/60:.1f} min)")
    print(f"  Total time:     {total_time:.1f}s ({total_time/60:.1f} min)")
    print(f"  Clips saved to: {OUTPUT_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    main()
