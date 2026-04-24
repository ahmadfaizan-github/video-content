"""
Narration script + batch TTS generator for Video 003: WebSocket Subscriptions
Generates one .wav file per slide, named slide_001.wav, slide_002.wav, etc.

Usage:
    source /root/nln-video-content/tts-env/bin/activate
    python /root/nln-video-content/audio/003-websocket-subscriptions/narration.py
"""

import os
import time
import torch
import soundfile as sf
from qwen_tts import Qwen3TTSModel

# ─── Configuration ───────────────────────────────────────────────
OUTPUT_DIR = "/root/nln-video-content/audio/003-websocket-subscriptions/clips"
SPEAKER = "Aiden"       # Sunny American male
LANGUAGE = "English"
MAX_TOKENS = 4096

# ─── Narration Script ────────────────────────────────────────────
NARRATION = [
    # ═══ SECTION 1: INTRO ═══
    (1, "Solana WebSocket Subscriptions. How to stream real-time blockchain data using Python. Let's dive in."),

    (2, "What are WebSocket subscriptions? They let you open a persistent connection to a Solana RPC node. You subscribe to events, and the node pushes notifications directly to you in real-time. It uses JSON-RPC two point zero over WebSocket. No polling needed — you send JSON, you receive JSON back."),

    (3, "How does this compare to REST? With REST HTTP, you make a new request every time and poll for updates. With WebSocket, you have a persistent connection and the server pushes updates to you. It's lower latency, real-time, and uses the same JSON format. WebSocket is the clear winner for streaming data."),

    (4, "Here's the data flow. Your Python app connects via WebSocket to the NoLimitNodes RPC node, which is connected to the Solana blockchain. Once connected, you subscribe to events and the node streams updates back through that persistent connection."),

    (5, "In this video, you'll learn five major subscription types. accountSubscribe to watch any account for changes. programSubscribe to monitor all accounts owned by a program. logsSubscribe to stream transaction logs. signatureSubscribe to track transaction confirmations. And slotSubscribe for new slot notifications. Plus four additional subscriptions at the end."),

    # ═══ SECTION 2: NLN SIGNUP ═══
    (6, "Before we start, let's get you set up with an API key from NoLimitNodes."),

    (7, "First, go to nolimitnodes dot com. You'll see the homepage. Click the Sign Up button in the top right corner."),

    (8, "Create your account. Enter your email and click Continue. It's completely free, no credit card required."),

    (9, "Once you're logged in, you'll see the Quick Start page with your WebSocket endpoint and API key. Copy both of these — you'll need them for every example."),

    (10, "You need a NoLimitNodes API key to follow along with every example. Sign up free at nolimitnodes dot com. All the code is in the blog post linked in the description below."),

    # ═══ SECTION 3: TABLE OF CONTENTS ═══
    (11, "Here's what we'll cover. Chapter one, Python setup and connection. Chapter two, accountSubscribe. Chapter three, programSubscribe. Chapter four, logsSubscribe. Chapter five, signatureSubscribe. Chapter six, slotSubscribe. And chapter seven, additional subscriptions. Feel free to skip ahead using the timestamps."),

    # ═══ SECTION 4: PYTHON SETUP ═══
    (12, "Chapter one. Python setup and connection."),

    (13, "The prerequisites are simple. Python three point ten or higher. The websockets package for WebSocket connections. The json module which is built into Python. And your NoLimitNodes WebSocket endpoint URL."),

    (14, "Install websockets with pip. That's the only dependency. json and asyncio are already built into Python."),

    (15, "Here's the connection helper. We create an async function that connects to the WebSocket endpoint, sends a JSON-RPC subscription request, reads the subscription ID from the first response, and then yields notifications as they come in. This pattern is reused in every example."),

    (16, "This helper function handles the subscribe and listen pattern for you. Just replace the WS URL with your actual NoLimitNodes WebSocket endpoint."),

    # ═══ SECTION 5: accountSubscribe ═══
    (17, "Chapter two. accountSubscribe."),

    (18, "accountSubscribe is the most commonly used WebSocket subscription. It notifies you whenever an account's lamports or data change. It supports different encoding options like base sixty-four and jsonParsed. And you can use data slicing to receive only the specific bytes you need."),

    (19, "The parameters are: account, which is the base fifty-eight encoded public key — this is required. Commitment level, which defaults to finalized. Encoding, which defaults to base sixty-four but you can use jsonParsed for human-readable data. And dataSlice with offset and length to receive only specific bytes."),

    (20, "Here's the code. Connect to the WebSocket, send an accountSubscribe request with the account public key and your options. The first response gives you the subscription ID. Then loop over incoming messages and extract the value object, which contains lamports, owner, and data."),

    (21, "You can also use data slicing to save bandwidth. Instead of receiving the full account data, specify an offset and length. In this example, we only receive the first thirty-two bytes. This is useful for large accounts where you only need a specific field."),

    (22, "Use cases for accountSubscribe include wallet balance monitoring, token account tracking, watching program state changes, and real-time price feeds from oracle accounts like Pyth or Switchboard."),

    (23, "Here's what the output looks like. You'll see the lamports balance, the owner program, and the account data in your chosen encoding format."),

    # ═══ SECTION 6: programSubscribe ═══
    (24, "Chapter three. programSubscribe."),

    (25, "programSubscribe watches all accounts owned by a specific program. It's like accountSubscribe but for an entire program at once. It supports up to four filters using dataSize and memcmp. Notifications include both the account public key and the updated data."),

    (26, "The parameters are: program ID, which is the base fifty-eight encoded program public key — this is required. Commitment, encoding, and dataSlice work the same as accountSubscribe. The filters parameter accepts up to four filter objects. All filters must match for an account to be included, using AND logic."),

    (27, "Here's a basic example. Subscribe to the System Program and watch all its accounts. The notification includes the account's public key and its data, so you know which account changed and what it changed to."),

    (28, "You can filter by data size to narrow the results. For example, SPL Token accounts are always one hundred sixty-five bytes. Setting dataSize to one sixty-five gives you only token account updates."),

    (29, "You can also combine filters. Here we filter by data size and use memcmp to match a specific mint address at offset zero. This gives you updates only for token accounts of a specific token."),

    (30, "Use cases include token transfer monitoring, detecting new accounts created under a program, monitoring DeFi protocol vaults and pools, and tracking NFT marketplace listings."),

    # ═══ SECTION 7: logsSubscribe ═══
    (31, "Chapter four. logsSubscribe."),

    (32, "logsSubscribe streams program log messages from transactions in real-time. You can filter by all transactions, all with votes, or transactions that mention a specific address. It returns the transaction signature, error status, and the log array. This is essential for monitoring program events and triggering bot actions."),

    (33, "The filter options are: the string 'all' for all transactions except votes. The string 'allWithVotes' to include vote transactions. Or an object with mentions containing a single public key. Note that the mentions filter currently only supports one address."),

    (34, "Here's how to watch logs for a specific program. We subscribe with the mentions filter pointing to the PumpFun program ID. Each notification gives us the transaction signature, error status, and an array of log messages from the program execution."),

    (35, "To watch all transaction logs, simply pass the string 'all' instead of the mentions filter. Or use 'allWithVotes' if you also want vote transaction logs."),

    (36, "Here's the output. You'll see the transaction signature, whether it had an error, and each log message printed line by line."),

    (37, "Use cases include new token detection by watching for InitializeMint events, trade monitoring from DEX programs, error tracking for your own programs, and building event-driven bots that trigger on specific log patterns."),

    # ═══ SECTION 8: signatureSubscribe ═══
    (38, "Chapter five. signatureSubscribe."),

    (39, "signatureSubscribe tracks a specific transaction's confirmation status. The subscription auto-closes after the terminal confirmation. It tells you whether the transaction succeeded or failed. You can optionally get an early receivedSignature notification when the RPC node first sees your transaction."),

    (40, "The parameters are: signature, the base fifty-eight encoded transaction signature — this is required. Commitment level. And enableReceivedNotification, which is false by default. Set it to true to get an early notification when the node first receives your transaction."),

    (41, "Here's the code. Subscribe with the transaction signature. If enableReceivedNotification is true, you may first get a receivedSignature notification. Then the terminal notification tells you if the transaction confirmed or failed. After that, the subscription auto-closes."),

    (42, "The output shows the transaction being watched, then received by the RPC node, and finally confirmed."),

    (43, "Use cases include confirming your submitted transactions, payment verification before fulfilling orders, tracking bot execution results, and quickly detecting failed transactions."),

    # ═══ SECTION 9: slotSubscribe ═══
    (44, "Chapter six. slotSubscribe."),

    (45, "slotSubscribe is the simplest subscription. No parameters needed at all. It notifies you every time the validator processes a new slot, which is roughly every four hundred milliseconds. Each notification includes the slot number, parent slot, and root slot."),

    (46, "The code is clean and simple. Send a slotSubscribe request with no parameters. Loop over notifications and print the slot, parent, and root values."),

    (47, "The output shows a stream of slots with their parent and root values updating in real-time."),

    (48, "Use cases include chain health monitoring to detect if the chain is progressing, slot-based timing to trigger actions every N slots, updating dashboards with live slot counts, and tracking finalization progress via the root field."),

    # ═══ SECTION 10: ADDITIONAL SUBSCRIPTIONS ═══
    (49, "Chapter seven. Additional subscriptions."),

    (50, "There are four more subscription types. blockSubscribe gives you full block data but is unstable and requires special validator flags. slotsUpdatesSubscribe provides detailed slot lifecycle events but its format may change. rootSubscribe simply returns the latest root slot number. And voteSubscribe gives gossip vote notifications, also requiring special validator flags."),

    (51, "Here's blockSubscribe. You can filter by 'all' or by a specific account or program. Options include encoding, transaction details level, max supported transaction version, and whether to show rewards. Remember, this requires the validator to have the block subscription flag enabled."),

    (52, "rootSubscribe and slotsUpdatesSubscribe are simple. rootSubscribe takes no parameters and just returns the root slot number. slotsUpdatesSubscribe also takes no parameters and streams lifecycle events like firstShredReceived, completed, createdBank, frozen, dead, optimisticConfirmation, and root."),

    (53, "Keep in mind that blockSubscribe and voteSubscribe require special validator flags. slotsUpdatesSubscribe format may change in future Solana releases. And not all RPC providers support these unstable methods, so check with your provider first."),

    # ═══ SECTION 11: UNSUBSCRIBING ═══
    (54, "Chapter eight. Unsubscribing."),

    (55, "Every subscribe method has a matching unsubscribe method. Pass the subscription ID that you received when subscribing. For example, accountUnsubscribe, programUnsubscribe, logsUnsubscribe, slotUnsubscribe. The response returns true if successful."),

    # ═══ SECTION 12: RECAP & OUTRO ═══
    (56, "Let's wrap up."),

    (57, "Here's what we covered. accountSubscribe for watching any account. programSubscribe for monitoring entire programs with filters. logsSubscribe for streaming transaction logs. signatureSubscribe for confirming transactions. slotSubscribe for tracking chain progress. Plus blockSubscribe, slotsUpdatesSubscribe, rootSubscribe, and voteSubscribe."),

    (58, "NoLimitNodes gives you full WebSocket support with all subscription types. Low latency, a free tier with no credit card, up to fifty concurrent streams on Pro, ninety-nine point nine percent uptime, and twenty-four seven support."),

    (59, "The full Python code for every example is in the blog post. Link in the description below. Sign up free at nolimitnodes dot com."),

    (60, "Next up, how to use Solana RPC methods in Python. Stay tuned."),

    (61, "Thanks for watching. Subscribe to NoLimitNodes for more Solana developer tutorials. Visit nolimitnodes dot com. Follow us at NoLimitNodes. And join our Discord. See you in the next one."),
]


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("=" * 60)
    print(f"  Video 003 — WebSocket Subscriptions Narration Generator")
    print(f"  Speaker: {SPEAKER} | Clips: {len(NARRATION)}")
    print(f"  Output:  {OUTPUT_DIR}")
    print("=" * 60)

    # Load model
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

        # Skip if already generated
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
