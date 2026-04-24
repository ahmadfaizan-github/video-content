# How to Use Major WebSocket Subscription Types for Solana in Python

<!-- Embed the YouTube video here -->
<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe> -->

In this guide, you'll learn how to use Solana's WebSocket subscriptions to stream real-time blockchain data in Python. We'll cover the 5 major subscription types — accountSubscribe, programSubscribe, logsSubscribe, signatureSubscribe, and slotSubscribe — plus a brief overview of additional methods.

**What are WebSocket Subscriptions?** They let you open a persistent connection to a Solana RPC node and subscribe to events. When something changes on-chain, the node pushes a JSON notification directly to you — no polling needed.

---

## Table of Contents

1. [Prerequisites & Setup](#1-prerequisites--setup)
2. [Connecting to NoLimitNodes WebSocket](#2-connecting-to-nolimitnodes-websocket)
3. [accountSubscribe](#3-accountsubscribe)
4. [programSubscribe](#4-programsubscribe)
5. [logsSubscribe](#5-logssubscribe)
6. [signatureSubscribe](#6-signaturesubscribe)
7. [slotSubscribe](#7-slotsubscribe)
8. [Additional Subscriptions](#8-additional-subscriptions)
9. [Unsubscribing](#9-unsubscribing)

---

## Get Your API Key

Before you start, you'll need a WebSocket endpoint from **NoLimitNodes**:

1. Go to [nolimitnodes.com](https://nolimitnodes.com)
2. Click **Sign Up** (free, no credit card required)
3. Open your dashboard at [app.nolimitnodes.com](https://app.nolimitnodes.com)
4. Copy your **WebSocket endpoint URL**

---

## 1. Prerequisites & Setup

### Install dependencies

```bash
pip install websockets
```

That's it — `json` and `asyncio` are built into Python.

---

## 2. Connecting to NoLimitNodes WebSocket

This helper function handles subscribing and yielding notifications. It's reused in every example below.

```python
import asyncio
import json
import websockets

# Your NoLimitNodes WebSocket endpoint
WS_URL = "wss://your-nln-ws-endpoint"

async def subscribe(method: str, params: list = []):
    async with websockets.connect(WS_URL) as ws:
        # Send subscription request
        request = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": method,
            "params": params,
        }
        await ws.send(json.dumps(request))

        # First response = subscription ID
        response = json.loads(await ws.recv())
        sub_id = response["result"]
        print(f"Subscribed: {method} (id={sub_id})")

        # Listen for notifications
        async for msg in ws:
            data = json.loads(msg)
            yield data
```

> **Note:** Replace `WS_URL` with your actual NoLimitNodes WebSocket endpoint.

---

## 3. accountSubscribe

**What it does:** Notifies you when an account's lamports (balance) or data change.

**Parameters:**
- `account` (required) — Base-58 encoded public key
- `commitment` — processed | confirmed | finalized (default: finalized)
- `encoding` — base58 | base64 | base64+zstd | jsonParsed (default: base64)
- `dataSlice` — `{ offset, length }` to receive only specific bytes

**Use cases:** Wallet balance monitoring, token account tracking, program state changes, real-time price feeds.

### Basic Example

```python
async def watch_account(pubkey: str):
    async with websockets.connect(WS_URL) as ws:
        request = {
            "jsonrpc": "2.0", "id": 1,
            "method": "accountSubscribe",
            "params": [
                pubkey,
                {"encoding": "jsonParsed", "commitment": "confirmed"}
            ]
        }
        await ws.send(json.dumps(request))
        response = json.loads(await ws.recv())
        print(f"Subscribed (id={response['result']})")

        async for msg in ws:
            data = json.loads(msg)
            value = data["params"]["result"]["value"]
            print(f"Lamports: {value['lamports']}")
            print(f"Owner: {value['owner']}")
            print(f"Data: {value['data']}")

asyncio.run(watch_account("CM78CPUeXjn8o3yroDHxUtKsZZgoy4GPkPPXfouKNH12"))
```

### With Data Slicing

```python
# Only receive first 32 bytes of account data
request = {
    "jsonrpc": "2.0", "id": 1,
    "method": "accountSubscribe",
    "params": [
        "YourAccountPubkey...",
        {
            "encoding": "base64",
            "commitment": "confirmed",
            "dataSlice": {"offset": 0, "length": 32}
        }
    ]
}
```

---

## 4. programSubscribe

**What it does:** Notifies you when any account owned by a specific program changes. Like accountSubscribe but for an entire program at once.

**Parameters:**
- `program_id` (required) — Base-58 encoded program public key
- `commitment` — processed | confirmed | finalized (default: finalized)
- `encoding` — base58 | base64 | base64+zstd | jsonParsed (default: base64)
- `filters` — Up to 4 filter objects (dataSize, memcmp) — all must match (AND logic)
- `dataSlice` — `{ offset, length }` to receive only specific bytes

**Use cases:** Token transfer monitoring, new account detection, DeFi protocol monitoring, NFT marketplace tracking.

### Basic Example

```python
async def watch_program(program_id: str):
    async with websockets.connect(WS_URL) as ws:
        request = {
            "jsonrpc": "2.0", "id": 1,
            "method": "programSubscribe",
            "params": [
                program_id,
                {"encoding": "base64", "commitment": "confirmed"}
            ]
        }
        await ws.send(json.dumps(request))
        response = json.loads(await ws.recv())
        print(f"Subscribed (id={response['result']})")

        async for msg in ws:
            data = json.loads(msg)
            value = data["params"]["result"]["value"]
            print(f"Account: {value['pubkey']}")
            print(f"Lamports: {value['account']['lamports']}")

asyncio.run(watch_program("11111111111111111111111111111111"))
```

### With dataSize Filter

```python
# Watch Token Program — filter by data size (165 = token account)
request = {
    "jsonrpc": "2.0", "id": 1,
    "method": "programSubscribe",
    "params": [
        "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        {
            "encoding": "base64",
            "commitment": "confirmed",
            "filters": [
                {"dataSize": 165}
            ]
        }
    ]
}
```

### With memcmp Filter

```python
# Watch token accounts for a specific mint
request = {
    "jsonrpc": "2.0", "id": 1,
    "method": "programSubscribe",
    "params": [
        "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        {
            "encoding": "base64",
            "filters": [
                {"dataSize": 165},
                {"memcmp": {"offset": 0, "bytes": "MINT_PUBKEY_HERE"}}
            ]
        }
    ]
}
```

---

## 5. logsSubscribe

**What it does:** Streams transaction log messages from the program execution. Returns the transaction signature, error status, and an array of log strings.

**Filter options:**
- `"all"` — All transactions except simple vote transactions
- `"allWithVotes"` — All transactions including vote transactions
- `{"mentions": ["pubkey"]}` — Only transactions mentioning this address (1 address max)

**Parameters:**
- `commitment` — processed | confirmed | finalized (default: finalized)

**Use cases:** New token detection, trade monitoring, error tracking, event-driven bots.

### Watch Logs for a Specific Program

```python
async def watch_logs(program_id: str):
    async with websockets.connect(WS_URL) as ws:
        request = {
            "jsonrpc": "2.0", "id": 1,
            "method": "logsSubscribe",
            "params": [
                {"mentions": [program_id]},
                {"commitment": "confirmed"}
            ]
        }
        await ws.send(json.dumps(request))
        response = json.loads(await ws.recv())
        print(f"Subscribed (id={response['result']})")

        async for msg in ws:
            data = json.loads(msg)
            value = data["params"]["result"]["value"]
            print(f"Sig: {value['signature'][:20]}...")
            print(f"Error: {value['err']}")
            for log in value["logs"]:
                print(f"  {log}")

asyncio.run(watch_logs("6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"))
```

### Watch All Transaction Logs

```python
# Subscribe to ALL transaction logs (excluding votes)
request = {
    "jsonrpc": "2.0", "id": 1,
    "method": "logsSubscribe",
    "params": [
        "all",
        {"commitment": "confirmed"}
    ]
}

# Or include vote transactions too:
# "params": ["allWithVotes", {"commitment": "confirmed"}]
```

---

## 6. signatureSubscribe

**What it does:** Tracks a specific transaction's confirmation status. The subscription auto-closes after terminal confirmation. Optionally get an early "receivedSignature" notification.

**Parameters:**
- `signature` (required) — Base-58 encoded transaction signature
- `commitment` — processed | confirmed | finalized (default: finalized)
- `enableReceivedNotification` — Get early notification when RPC first sees the signature (default: false)

**Use cases:** Transaction confirmation, payment verification, bot execution tracking, error detection.

```python
async def confirm_transaction(signature: str):
    async with websockets.connect(WS_URL) as ws:
        request = {
            "jsonrpc": "2.0", "id": 1,
            "method": "signatureSubscribe",
            "params": [
                signature,
                {
                    "commitment": "confirmed",
                    "enableReceivedNotification": True
                }
            ]
        }
        await ws.send(json.dumps(request))
        response = json.loads(await ws.recv())
        print(f"Watching: {signature[:20]}...")

        async for msg in ws:
            data = json.loads(msg)
            value = data["params"]["result"]["value"]
            if value == "receivedSignature":
                print("TX received by RPC node!")
            else:
                err = value.get("err")
                status = "FAILED" if err else "CONFIRMED"
                print(f"Status: {status}")
                break  # subscription auto-closes

asyncio.run(confirm_transaction("2EBVM6cB8vAAD93Ktr6Vd8p67XPbQzCJX47MpReuiCXJAtcjaxpvWpcg9Ege1Nr5Tk3a2GFrByT7WPBjdsTycY9b"))
```

---

## 7. slotSubscribe

**What it does:** Notifies you when the validator processes a new slot. No parameters needed — the simplest subscription.

**Returns:** slot number, parent slot, and root slot.

**Use cases:** Chain health monitoring, slot-based timing, dashboard updates, root tracking.

```python
async def watch_slots():
    async with websockets.connect(WS_URL) as ws:
        request = {
            "jsonrpc": "2.0", "id": 1,
            "method": "slotSubscribe"
        }
        await ws.send(json.dumps(request))
        response = json.loads(await ws.recv())
        print(f"Subscribed (id={response['result']})")

        async for msg in ws:
            data = json.loads(msg)
            result = data["params"]["result"]
            print(f"Slot: {result['slot']} | Parent: {result['parent']} | Root: {result['root']}")

asyncio.run(watch_slots())
```

**Example output:**
```
Subscribed (id=0)
Slot: 284712340 | Parent: 284712339 | Root: 284712308
Slot: 284712341 | Parent: 284712340 | Root: 284712309
Slot: 284712342 | Parent: 284712341 | Root: 284712310
```

---

## 8. Additional Subscriptions

These are less commonly used or require special validator configuration:

| Method | What It Does | Note |
|--------|-------------|------|
| blockSubscribe | Full block data on confirmed/finalized | Requires `--rpc-pubsub-enable-block-subscription` |
| slotsUpdatesSubscribe | Detailed slot lifecycle events | Unstable — format may change |
| rootSubscribe | New root slot notifications | Simple — returns just slot number |
| voteSubscribe | Gossip vote notifications | Requires `--rpc-pubsub-enable-vote-subscription` |

### blockSubscribe

```python
# Requires --rpc-pubsub-enable-block-subscription flag
request = {
    "jsonrpc": "2.0", "id": 1,
    "method": "blockSubscribe",
    "params": [
        "all",  # or {"mentionsAccountOrProgram": "PUBKEY"}
        {
            "commitment": "confirmed",
            "encoding": "base64",
            "transactionDetails": "full",
            "maxSupportedTransactionVersion": 0,
            "showRewards": True
        }
    ]
}
```

### rootSubscribe & slotsUpdatesSubscribe

```python
# rootSubscribe — no params, returns just the root slot number
root_request = {
    "jsonrpc": "2.0", "id": 1,
    "method": "rootSubscribe"
}
# Notification: {"result": 324, "subscription": 3}

# slotsUpdatesSubscribe — detailed slot lifecycle
updates_request = {
    "jsonrpc": "2.0", "id": 2,
    "method": "slotsUpdatesSubscribe"
}
# Types: firstShredReceived, completed, createdBank,
# frozen, dead, optimisticConfirmation, root
```

> **Warning:** Not all RPC providers support unstable methods. Check with your provider.

---

## 9. Unsubscribing

Every subscribe method has a matching unsubscribe method. Pass the subscription ID you received when subscribing.

```python
async def unsubscribe(ws, method: str, sub_id: int):
    request = {
        "jsonrpc": "2.0", "id": 1,
        "method": method,
        "params": [sub_id]
    }
    await ws.send(json.dumps(request))
    response = json.loads(await ws.recv())
    print(f"Unsubscribed: {response['result']}")

# Usage examples:
# await unsubscribe(ws, "accountUnsubscribe", 23784)
# await unsubscribe(ws, "programUnsubscribe", 24040)
# await unsubscribe(ws, "logsUnsubscribe", 24041)
# await unsubscribe(ws, "slotUnsubscribe", 0)
```

---

## Summary

You've learned how to use all major Solana WebSocket subscription types in Python:

- **accountSubscribe** — Watch any account for balance or data changes
- **programSubscribe** — Monitor all accounts under a program with filters
- **logsSubscribe** — Stream transaction logs for event detection
- **signatureSubscribe** — Confirm transaction success or failure
- **slotSubscribe** — Track chain progress in real-time
- Plus **blockSubscribe**, **slotsUpdatesSubscribe**, **rootSubscribe**, and **voteSubscribe**

All powered by your **NoLimitNodes** WebSocket endpoint. Sign up free at [nolimitnodes.com](https://nolimitnodes.com) to get your API key and start streaming.

---

*Subscribe to [NoLimitNodes on YouTube](https://youtube.com/@NoLimitNodes) for more Solana developer tutorials.*
