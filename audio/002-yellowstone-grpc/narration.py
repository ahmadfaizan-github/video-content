"""
Narration script + Kokoro TTS generator for Video 002: Yellowstone gRPC
Generates one .wav file per slide.

Usage:
    source /root/nln-video-content/tts-env/bin/activate
    python /root/nln-video-content/audio/002-yellowstone-grpc/narration.py
"""

import os
import time
import soundfile as sf
from kokoro import KPipeline

# ─── Configuration ───────────────────────────────────────────────
OUTPUT_DIR = "/root/nln-video-content/audio/002-yellowstone-grpc/clips"
VOICE = "af_heart"  # American English voice
LANG = "a"          # 'a' = American English

# ─── Narration Script ────────────────────────────────────────────
# Each entry = (slide_number, narration_text)

NARRATION = [
    # ═══ SECTION 1: INTRO ═══
    (1, "Yellowstone gRPC. How to stream Solana blockchain data in real-time using Python. Let's get started."),

    (2, "So what is Yellowstone gRPC? It's a high-performance streaming interface for Solana, built on the Geyser plugin system by Triton One. Data comes straight from validator memory with sub-fifty millisecond latency. That's up to four hundred milliseconds faster than traditional REST polling. It's also known as Dragon's Mouth."),

    (3, "Why use gRPC over REST or WebSocket? REST uses JSON over HTTP one point one. You have to poll for updates. WebSocket gives you push, but it's still verbose JSON with limited filtering. Yellowstone gRPC uses Protocol Buffers over HTTP two. It gives you bidirectional streaming, granular server-side filtering, lower latency, and much less bandwidth. gRPC wins on every metric."),

    (4, "Here's how it works. Data flows from the Solana validator through the Geyser plugin layer, into the Yellowstone gRPC server, and then directly to your Python client. The Geyser plugin intercepts data right from the validator's memory, which is why it's so fast."),

    (5, "In this video, you'll learn all seven subscription types. Slots for tracking chain progress. Accounts for monitoring state changes with rich filters. Transactions for streaming filtered transaction data. Transaction Status for lightweight confirmations. Blocks and Blocks Meta for full or lightweight block data. Entries for raw validator execution units. Plus all the unary methods like GetSlot and GetLatestBlockhash."),

    # ═══ SECTION 2: NLN SIGNUP ═══
    (6, "Before we dive in, you'll need an API key. Let's get you set up with NoLimitNodes."),

    (7, "First, go to nolimitnodes dot com. You'll see the homepage. Click the Sign Up button in the top right corner."),

    (8, "Create your account. Enter your email and click Continue. It's completely free, no credit card required."),

    (9, "Once you're logged in, you'll see the Quick Start page with your RPC endpoint and API key. Copy both of these. You'll need them for every example in this tutorial."),

    (10, "You need a NoLimitNodes API key to follow along with every example in this video. Sign up free at nolimitnodes dot com. All the code is in the blog post linked in the description below."),

    # ═══ SECTION 3: TABLE OF CONTENTS ═══
    (11, "Here's what we'll cover. Chapter one, Python setup and connection. Chapter two, Slots subscription. Chapter three, Accounts subscription. Chapter four, Transactions. Chapter five, Transaction Status. Chapter six, Blocks and Blocks Meta. Chapter seven, Entries. And chapter eight, Unary Methods. Feel free to skip ahead to whatever you need using the timestamps."),

    # ═══ SECTION 4: PYTHON SETUP ═══
    (12, "Chapter one. Python setup and connection."),

    (13, "Here are the prerequisites. You'll need Python three point ten or higher. The grpcio and grpcio-tools packages. Protobuf for serialization. Base fifty-eight for Solana address encoding. And of course, your NoLimitNodes API key with the gRPC endpoint and x-token."),

    (14, "Let's install the dependencies. Run pip install grpcio, grpcio-tools, protobuf, and base fifty-eight. Then clone the Yellowstone gRPC repository from GitHub to get the proto files."),

    (15, "Next, generate the Python proto stubs. Run the grpc tools protoc command, pointing it at the proto files in the yellowstone repository. This generates the Python classes you'll use to build requests and parse responses."),

    (16, "This generates four files. geyser pb2 dot py has the message classes like SubscribeRequest and SubscribeUpdate. geyser pb2 grpc dot py has the GeyserStub for making RPC calls. The pyi file gives you type hints for IDE autocompletion. And solana storage pb2 has Solana-specific types."),

    (17, "Here's the connection code. Import grpc, geyser pb2, and geyser pb2 grpc. Create authentication credentials using your NoLimitNodes x-token. Combine it with SSL credentials. Then create a secure channel to your gRPC endpoint on port ten thousand, and create a GeyserStub. This is the stub you'll use for every subscription."),

    (18, "This connection code is reused in every example throughout this video. Just replace YOUR NLN TOKEN with your actual API key from nolimitnodes dot com. Port ten thousand is the standard gRPC port."),

    # ═══ SECTION 5: SLOTS ═══
    (19, "Chapter two. Slots subscription."),

    (20, "What is a slot? A slot is a time window of roughly four hundred milliseconds where a validator can produce a block. Each slot has a status. Processed means it's the fastest but may revert. Confirmed means the cluster has confirmed it. Finalized means it's fully confirmed and permanent. Slots can also be FirstShredReceived, Completed, CreatedBank, or Dead."),

    (21, "What are the use cases for slot subscriptions? Chain health monitoring, so you can detect dead or skipped slots instantly. Block timing, to react to slot boundaries for time-based logic. Validator performance tracking. And sync confirmation, to wait for a specific commitment level before acting."),

    (22, "The slot filter has two options. filter by commitment, which only sends you updates matching your commitment level. And interslot updates, which gives you intermediate status changes within a slot. The commitment level is a global setting that applies to all subscriptions."),

    (23, "Here's the code. Create a Subscribe stream, build a SubscribeRequest with a slots filter. Set filter by commitment to True and commitment to CONFIRMED. Write the request to the stream, then loop over the updates. Check if the update has a slot field, and print the slot number and status. That's it."),

    (24, "And here's what the output looks like. You'll see a stream of confirmed slots printing in real-time, each with its slot number and status."),

    (25, "Slots are the simplest subscription. They're a great starting point to verify your connection is working before moving to more complex subscriptions."),

    # ═══ SECTION 6: ACCOUNTS ═══
    (26, "Chapter three. Accounts subscription."),

    (27, "The accounts subscription is the most powerful one. It lets you monitor real-time changes to any Solana account. It has rich server-side filtering so you only get the data you care about. You get notified when balance, data, or owner changes. And it supports data slicing, so you can receive only the specific bytes you need. Unlike WebSocket, you get multiple updates per slot, not just one at the end."),

    (28, "Let's look at the filter fields. Account is an array of account public keys to watch, using OR logic. Owner is an array of owner program public keys, also OR logic. Filters is an array of additional conditions like data size, memcmp, lamports, and token account state. And nonempty txn signature only gives you updates that have a transaction signature."),

    (29, "Understanding the filter logic is important. Between different fields, it's AND logic. Within the same array, like multiple accounts or multiple owners, it's OR logic. Within the filters array, each condition is AND logic. So for example, you could filter by owner equals Token Program AND data size equals one sixty-five AND memcmp at offset thirty-two. You can have up to five filters of the same type per connection."),

    (30, "Here's a basic example. Watch a specific account by passing its public key in the account array. Set commitment to confirmed. Then loop over updates and print the slot and lamport balance whenever it changes."),

    (31, "Now an advanced example. Watch all token accounts for a specific wallet. Create two filters. First, data size equals one sixty-five, which is the SPL token account size. Second, a memcmp filter at offset thirty-two with the wallet's public key. Set the owner to the Token Program. This gives you real-time updates whenever any token balance changes for that wallet."),

    (32, "Data slicing is a great way to save bandwidth. Instead of receiving the full account data, you can specify an offset and length. In this example, we only receive the first forty bytes. This is especially useful for large accounts where you only need a specific field."),

    (33, "You can also filter by lamport balance. This example only notifies you when an account has more than one SOL. The lamports filter supports equals, not equals, less than, and greater than comparisons."),

    (34, "And here's what the output looks like. You'll see the slot number and lamport balance for each account update as they come in."),

    (35, "Use cases for accounts subscription include wallet balance monitoring, token account tracking, oracle price feeds from Pyth or Switchboard, and watching program state changes."),

    # ═══ SECTION 7: TRANSACTIONS ═══
    (36, "Chapter four. Transactions subscription."),

    (37, "The transactions subscription streams every transaction hitting the Solana network. You can filter by vote, failed, signature, or account involvement. This is the most popular subscription for trading bots and monitoring tools. You get the full transaction data including signature, accounts, instructions, and logs."),

    (38, "Here are the filter fields. Vote controls whether to include or exclude vote transactions. Most bots exclude them. Failed controls whether to include failed transactions. Signature lets you match a single specific transaction. Account include means the transaction must involve any of the listed accounts. Account exclude means it must not involve any of them. And account required means it must involve all of them."),

    (39, "Here's how to monitor a specific program. We're watching all PumpFun transactions, excluding votes and failures. Pass the PumpFun program ID in account include. Set commitment to confirmed."),

    (40, "To process the stream, loop over updates and check for the transaction field. Extract the signature using base fifty-eight encoding, and print the slot and signature. It's straightforward."),

    (41, "You can also watch a specific wallet. Just pass the wallet's public key in account include instead of a program ID. This gives you every transaction that wallet is involved in."),

    (42, "If you need transactions that involve multiple specific accounts, use account required instead of account include. Account include uses OR logic, meaning any of the accounts. Account required uses AND logic, meaning all of the accounts must be present in the transaction."),

    (43, "And here's the output. You'll see each transaction's slot and signature as they stream in real-time."),

    (44, "Use cases include trading bots reacting to trades on PumpFun, Raydium, or Jupiter. Wallet monitoring. Copy trading by mirroring a successful trader. And real-time analytics counting transactions per program."),

    (45, "A word of caution. Unfiltered transaction streams produce massive data volumes. Always set vote to false unless you specifically need vote transactions. Use account include or account required to narrow the stream. And monitor your bandwidth."),

    # ═══ SECTION 8: TX STATUS ═══
    (46, "Chapter five. Transaction status subscription."),

    (47, "How does transaction status differ from the full transactions subscription? The full subscription gives you everything: signature, accounts, instructions, and logs. It's heavy on bandwidth. Transaction status is lightweight. It only returns the slot, signature, index, and error status. Use it when you just need to know if a transaction succeeded or failed."),

    (48, "Here's the code. It uses the same filter structure as transactions, but you pass it to the transactions status field instead. In this example we include failed transactions so we can detect errors. Loop over updates and check the transaction status field. Extract the signature and check if there's an error to determine success or failure."),

    (49, "Here's the output. You can clearly see which transactions succeeded and which failed, along with their slot numbers and signatures."),

    (50, "Use cases for transaction status include confirming your own transactions landed on-chain, monitoring success and failure rates for a program, low-bandwidth alerting, and tracking specific wallet activity without downloading full transaction data."),

    # ═══ SECTION 9: BLOCKS ═══
    (51, "Chapter six. Blocks subscription."),

    (52, "The blocks subscription gives you complete block data as blocks are produced. You can choose what to include: transactions, accounts, or entries. You can filter by account involvement to narrow the data. Keep in mind this is a heavy stream, so only use it when you need full block content."),

    (53, "The filter options are account include, to filter transactions and accounts by specific public keys. Include transactions, include accounts, and include entries are boolean flags that control what data is included in the block message."),

    (54, "Here's the code. Create a blocks filter with include transactions set to true and the others set to false. Loop over updates and check for the block field. You get the slot, block hash, executed transaction count, and parent slot."),

    (55, "Here's the output showing block data streaming in real-time, with slot numbers, block hashes, and transaction counts."),

    (56, "Use cases include powering a custom block explorer, chain indexing, MEV analysis by studying transaction ordering, and validator monitoring."),

    # ═══ SECTION 10: BLOCKS META ═══
    (57, "Chapter seven. Blocks meta subscription."),

    (58, "Blocks meta is the lightweight alternative. The full blocks subscription gives you everything, which is very heavy on bandwidth. Blocks meta only gives you the metadata: slot, block hash, time, height, and parent slot. There are no filter options. It's perfect for chain monitoring and indexing."),

    (59, "The code is simple. Create a blocks meta filter with an empty message. Set commitment to finalized. Loop over updates and check for the block meta field. Print the slot, block hash, height, and parent slot."),

    (60, "Here's what the output looks like. Clean metadata for each finalized block."),

    # ═══ SECTION 11: ENTRIES ═══
    (61, "Chapter eight. Entries subscription."),

    (62, "Entries is the lowest-level subscription. It gives you raw validator execution batches. Each entry contains the slot, index, number of hashes, hash, and executed transaction count. There are no filter options. This is for deep research and validator-level analysis only. Most developers won't need this. Use blocks or transactions instead."),

    (63, "The code is straightforward. Create an entry filter with an empty message. Set commitment to confirmed. Loop over updates and print the slot, index, number of hashes, and executed transaction count."),

    (64, "And the output shows raw execution entries within each slot."),

    (65, "Most developers won't need entries. Use blocks or transactions instead. Entries are for deep validator research and low-level chain analysis."),

    # ═══ SECTION 12: UNARY METHODS ═══
    (66, "Chapter nine. Unary methods."),

    (67, "Unary methods are simple request-response calls, no streaming needed. You have six methods available. Ping for health checks. GetSlot for the current slot number. GetBlockHeight for the current block height. GetLatestBlockhash for transaction construction. IsBlockhashValid to check if a blockhash has expired. And GetVersion for the server version."),

    (68, "Here's GetSlot and GetLatestBlockhash. GetSlot returns the current slot number at your chosen commitment level. GetLatestBlockhash returns the most recent blockhash and the last valid block height. You'll use this when constructing transactions."),

    (69, "And here are the remaining methods. IsBlockhashValid checks whether a blockhash is still valid before you submit a transaction. GetBlockHeight returns the current block height. Ping sends a keepalive and gets a pong response. And GetVersion returns the server version string."),

    (70, "Here's the output for all unary methods. Clean, simple request-response calls."),

    (71, "These unary methods are simple request-response calls. No streaming needed. They're great for quick lookups, health checks, and transaction construction."),

    # ═══ SECTION 13: RECAP & OUTRO ═══
    (72, "Let's wrap up."),

    (73, "Here's what we covered today. Yellowstone gRPC, the high-performance way to stream Solana data. Seven subscription types: Slots, Accounts, Transactions, Transaction Status, Blocks, Blocks Meta, and Entries. Six unary methods for quick lookups. Rich server-side filtering for accounts and transactions. All powered by your NoLimitNodes gRPC endpoint."),

    (74, "NoLimitNodes gives you everything you need for gRPC streaming. Sub-fifty millisecond latency, full Yellowstone gRPC support, a free tier with no credit card required, ninety-nine point nine percent uptime, Python support, and twenty-four seven support when you need it."),

    (75, "The full Python code for every example in this video is in the blog post. Link in the description below. Sign up free at nolimitnodes dot com to get your API key and start streaming."),

    (76, "Next up, how to use WebSocket subscriptions for Solana in Python. Stay tuned."),

    (77, "Thanks for watching. Subscribe to NoLimitNodes for more Solana developer tutorials. Visit nolimitnodes dot com. Follow us at NoLimitNodes. And join our Discord. See you in the next one."),
]


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Delete old clips from previous version
    old_clips = [f for f in os.listdir(OUTPUT_DIR) if f.endswith('.wav')]
    if old_clips:
        print(f"Removing {len(old_clips)} old clips...")
        for f in old_clips:
            os.remove(os.path.join(OUTPUT_DIR, f))

    print("=" * 60)
    print(f"  Video 002 — Yellowstone gRPC Narration (Kokoro TTS)")
    print(f"  Voice: {VOICE} | Clips: {len(NARRATION)}")
    print(f"  Output: {OUTPUT_DIR}")
    print("=" * 60)

    print("\nLoading Kokoro TTS...")
    t0 = time.time()
    pipe = KPipeline(lang_code=LANG)
    print(f"Loaded in {time.time() - t0:.1f}s\n")

    total_audio = 0.0
    total_time = 0.0

    for idx, (slide_num, text) in enumerate(NARRATION):
        filename = f"slide_{slide_num:03d}.wav"
        filepath = os.path.join(OUTPUT_DIR, filename)

        if os.path.exists(filepath):
            print(f"[{idx+1}/{len(NARRATION)}] SKIP {filename} (already exists)")
            continue

        print(f"[{idx+1}/{len(NARRATION)}] Generating {filename} ...")
        print(f"    Text: {text[:80]}...")

        t1 = time.time()
        # Kokoro generates audio in segments, concatenate them
        audio_segments = []
        for _, _, audio in pipe(text, voice=VOICE):
            audio_segments.append(audio)

        import numpy as np
        full_audio = np.concatenate(audio_segments) if len(audio_segments) > 1 else audio_segments[0]

        elapsed = time.time() - t1
        duration = len(full_audio) / 24000

        sf.write(filepath, full_audio, 24000)

        total_audio += duration
        total_time += elapsed
        print(f"    Done: {duration:.1f}s audio in {elapsed:.1f}s")
        print()

    print("=" * 60)
    print(f"  COMPLETE!")
    print(f"  Total audio:    {total_audio:.1f}s ({total_audio/60:.1f} min)")
    print(f"  Total time:     {total_time:.1f}s ({total_time/60:.1f} min)")
    print(f"  Clips saved to: {OUTPUT_DIR}")
    print("=" * 60)


if __name__ == "__main__":
    main()
