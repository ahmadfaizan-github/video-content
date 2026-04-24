# How to Use Major Yellowstone gRPC Subscription Types for Solana in Python

<!-- Embed the YouTube video here -->
<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe> -->

In this guide, you'll learn how to use Yellowstone gRPC to stream real-time Solana blockchain data in Python. We'll cover all major subscription types — Slots, Accounts, Transactions, Transaction Status, Blocks, Blocks Meta, and Entries — plus unary methods like GetSlot and GetLatestBlockhash.

**What is Yellowstone gRPC?** It's a high-performance gRPC streaming interface for Solana, built on the Geyser plugin system by Triton One. It delivers sub-50ms latency by streaming data directly from validator memory — up to 400ms faster than traditional REST polling.

---

## Table of Contents

1. [Prerequisites & Setup](#1-prerequisites--setup)
2. [Connecting to NoLimitNodes gRPC](#2-connecting-to-nolimitnodes-grpc)
3. [Slots Subscription](#3-slots-subscription)
4. [Accounts Subscription](#4-accounts-subscription)
5. [Transactions Subscription](#5-transactions-subscription)
6. [Transaction Status Subscription](#6-transaction-status-subscription)
7. [Blocks Subscription](#7-blocks-subscription)
8. [Blocks Meta Subscription](#8-blocks-meta-subscription)
9. [Entries Subscription](#9-entries-subscription)
10. [Unary Methods](#10-unary-methods)

---

## Get Your API Key

Before you start, you'll need a gRPC endpoint and API token from **NoLimitNodes**:

1. Go to [nolimitnodes.com](https://nolimitnodes.com)
2. Click **Sign Up** (free, no credit card required)
3. Open your dashboard at [app.nolimitnodes.com](https://app.nolimitnodes.com)
4. Copy your **gRPC endpoint** and **API token**

---

## 1. Prerequisites & Setup

### Install dependencies

```bash
pip install grpcio grpcio-tools protobuf base58
```

### Clone the Yellowstone gRPC repo (for proto files)

```bash
git clone https://github.com/rpcpool/yellowstone-grpc
```

### Generate Python proto stubs

```bash
python -m grpc_tools.protoc \
  -I./yellowstone-grpc/yellowstone-grpc-proto/proto/ \
  --python_out=. \
  --pyi_out=. \
  --grpc_python_out=. \
  ./yellowstone-grpc/yellowstone-grpc-proto/proto/geyser.proto \
  ./yellowstone-grpc/yellowstone-grpc-proto/proto/solana-storage.proto
```

This generates:
- `geyser_pb2.py` — Message classes (SubscribeRequest, SubscribeUpdate, filters)
- `geyser_pb2_grpc.py` — gRPC stub (GeyserStub)
- `geyser_pb2.pyi` — Type hints for IDE autocompletion
- `solana_storage_pb2.py` — Solana-specific types (ConfirmedBlock, Rewards)

---

## 2. Connecting to NoLimitNodes gRPC

This connection code is reused in every example below. Replace `YOUR_NLN_TOKEN` with your actual API key and `your-nln-grpc-endpoint` with your endpoint from the NoLimitNodes dashboard.

```python
import asyncio
import grpc
import base58
import geyser_pb2
import geyser_pb2_grpc

# Authenticate with your NLN x-token
auth_creds = grpc.metadata_call_credentials(
    lambda ctx, cb: cb([("x-token", "YOUR_NLN_TOKEN")], None)
)
channel_creds = grpc.composite_channel_credentials(
    grpc.ssl_channel_credentials(), auth_creds
)

# Connect to NoLimitNodes gRPC endpoint
channel = grpc.aio.secure_channel("your-nln-grpc-endpoint:10000", channel_creds)
stub = geyser_pb2_grpc.GeyserStub(channel)
```

> **Note:** Port 10000 is the standard Yellowstone gRPC port. The connection uses TLS encryption with x-token authentication.

---

## 3. Slots Subscription

**What is a Slot?** A time window (~400ms) where a validator can produce a block. Each slot progresses through statuses: Processed, Confirmed, Finalized.

**Use cases:** Chain health monitoring, block timing, validator performance tracking, sync confirmation.

**Filter options:**
- `filter_by_commitment` — Only receive updates matching your commitment level
- `interslot_updates` — Get intermediate status changes within a slot

```python
async def subscribe_slots():
    stream = stub.Subscribe()
    req = geyser_pb2.SubscribeRequest(
        slots={"client": geyser_pb2.SubscribeRequestFilterSlots(
            filter_by_commitment=True
        )},
        commitment=geyser_pb2.CommitmentLevel.CONFIRMED
    )
    await stream.write(req)

    async for update in stream:
        if update.HasField("slot"):
            s = update.slot
            print(f"Slot: {s.slot} | Status: {s.status}")

asyncio.run(subscribe_slots())
```

**Example output:**
```
Slot: 284712340 | Status: CONFIRMED
Slot: 284712341 | Status: CONFIRMED
Slot: 284712342 | Status: CONFIRMED
```

---

## 4. Accounts Subscription

The most powerful subscription — monitor real-time account state changes with rich server-side filtering.

**Filter fields:**
- `account[]` — Array of account pubkeys (OR logic)
- `owner[]` — Array of owner program pubkeys (OR logic)
- `filters[]` — Additional conditions: datasize, memcmp, lamports, token_account_state (AND logic)
- `nonempty_txn_signature` — Only updates with a transaction signature

**Filter logic:** Between fields = AND. Within arrays = OR. Within filters[] = AND.

### Basic: Watch a Specific Account

```python
async def subscribe_account():
    stream = stub.Subscribe()
    req = geyser_pb2.SubscribeRequest(
        accounts={"client": geyser_pb2.SubscribeRequestFilterAccounts(
            account=["So11111111111111111111111111111111"],
        )},
        commitment=geyser_pb2.CommitmentLevel.CONFIRMED
    )
    await stream.write(req)

    async for update in stream:
        if update.HasField("account"):
            acct = update.account
            print(f"Slot: {acct.slot} | Lamports: {acct.account.lamports}")

asyncio.run(subscribe_account())
```

### Advanced: Watch Token Accounts for a Wallet

```python
async def subscribe_token_accounts(wallet_pubkey: str):
    filters = [
        geyser_pb2.SubscribeRequestFilterAccountsFilter(
            datasize=165  # SPL Token account size
        ),
        geyser_pb2.SubscribeRequestFilterAccountsFilter(
            memcmp=geyser_pb2.SubscribeRequestFilterAccountsFilterMemcmp(
                offset=32,  # Owner field offset in token account
                base58=wallet_pubkey
            )
        ),
    ]
    req = geyser_pb2.SubscribeRequest(
        accounts={"client": geyser_pb2.SubscribeRequestFilterAccounts(
            owner=["TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"],
            filters=filters,
        )}
    )
    stream = stub.Subscribe()
    await stream.write(req)
    async for update in stream:
        if update.HasField("account"):
            print(f"Token account updated: {update.account.account.lamports}")

asyncio.run(subscribe_token_accounts("YourWalletPubkeyHere"))
```

### Data Slicing — Get Only What You Need

```python
# Only receive first 40 bytes of account data — saves bandwidth
req = geyser_pb2.SubscribeRequest(
    accounts={"client": geyser_pb2.SubscribeRequestFilterAccounts(
        account=["YourTargetAccountPubkey..."],
    )},
    accounts_data_slice=[
        geyser_pb2.SubscribeRequestAccountsDataSlice(
            offset=0, length=40
        )
    ],
    commitment=geyser_pb2.CommitmentLevel.CONFIRMED
)
```

### Lamports Filter — Watch Balance Changes

```python
# Only notify when account has more than 1 SOL
filters = [
    geyser_pb2.SubscribeRequestFilterAccountsFilter(
        lamports=geyser_pb2.SubscribeRequestFilterAccountsFilterLamports(
            gt=1_000_000_000  # 1 SOL in lamports
        )
    )
]
req = geyser_pb2.SubscribeRequest(
    accounts={"client": geyser_pb2.SubscribeRequestFilterAccounts(
        owner=["11111111111111111111111111111111"],
        filters=filters
    )}
)
```

---

## 5. Transactions Subscription

Stream all transaction activity with powerful filtering.

**Filter fields:**
- `vote` — Include/exclude vote transactions (most bots exclude)
- `failed` — Include/exclude failed transactions
- `signature` — Match a single specific transaction signature
- `account_include` — TX must involve ANY of these accounts (OR)
- `account_exclude` — TX must NOT involve ANY of these accounts
- `account_required` — TX must involve ALL of these accounts (AND)

### Monitor a Specific Program (PumpFun)

```python
PUMPFUN = '6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P'

req = geyser_pb2.SubscribeRequest(
    transactions={"client": geyser_pb2.SubscribeRequestFilterTransactions(
        vote=False,
        failed=False,
        account_include=[PUMPFUN],
    )},
    commitment=geyser_pb2.CommitmentLevel.CONFIRMED
)

async def subscribe_transactions():
    stream = stub.Subscribe()
    await stream.write(req)

    async for update in stream:
        if update.HasField("transaction"):
            tx = update.transaction
            sig = base58.b58encode(
                tx.transaction.signature
            ).decode()
            print(f"Slot: {tx.slot} | Sig: {sig}")

asyncio.run(subscribe_transactions())
```

### Watch a Specific Wallet

```python
WALLET = "YourWalletPubkeyHere..."

req = geyser_pb2.SubscribeRequest(
    transactions={"client": geyser_pb2.SubscribeRequestFilterTransactions(
        vote=False,
        failed=False,
        account_include=[WALLET],
    )},
    commitment=geyser_pb2.CommitmentLevel.CONFIRMED
)
```

### Require Multiple Accounts (AND logic)

```python
# Only match transactions involving BOTH accounts
req = geyser_pb2.SubscribeRequest(
    transactions={"client": geyser_pb2.SubscribeRequestFilterTransactions(
        vote=False,
        failed=False,
        account_required=[
            "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",  # PumpFun
            "YourWalletPubkey..."  # Your wallet
        ],
    )}
)
```

> **Warning:** Unfiltered transaction streams produce massive data volumes. Always set `vote=False` and use `account_include` or `account_required` to narrow the stream.

---

## 6. Transaction Status Subscription

A lightweight alternative to the full Transactions subscription — only returns slot, signature, index, and error status.

**Use cases:** Confirm your own transactions, monitor success/failure rates, low-bandwidth alerting, wallet activity tracking.

```python
async def subscribe_tx_status():
    stream = stub.Subscribe()
    req = geyser_pb2.SubscribeRequest(
        transactions_status={
            "client": geyser_pb2.SubscribeRequestFilterTransactions(
                vote=False,
                failed=True,  # Include failures to detect errors
                account_include=["6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P"]
            )
        },
        commitment=geyser_pb2.CommitmentLevel.CONFIRMED
    )
    await stream.write(req)

    async for update in stream:
        if update.HasField("transaction_status"):
            ts = update.transaction_status
            sig = base58.b58encode(ts.signature).decode()
            status = "FAILED" if ts.err else "SUCCESS"
            print(f"Slot: {ts.slot} | {status} | {sig[:20]}...")

asyncio.run(subscribe_tx_status())
```

---

## 7. Blocks Subscription

Receive complete block data as blocks are produced.

**Filter options:**
- `account_include` — Filter transactions/accounts involving these pubkeys
- `include_transactions` — Include all transaction data
- `include_accounts` — Include all account updates
- `include_entries` — Include all entries

```python
async def subscribe_blocks():
    stream = stub.Subscribe()
    req = geyser_pb2.SubscribeRequest(
        blocks={"client": geyser_pb2.SubscribeRequestFilterBlocks(
            account_include=[],
            include_transactions=True,
            include_accounts=False,
            include_entries=False,
        )},
        commitment=geyser_pb2.CommitmentLevel.CONFIRMED
    )
    await stream.write(req)

    async for update in stream:
        if update.HasField("block"):
            b = update.block
            print(f"Slot: {b.slot} | Hash: {b.blockhash}")
            print(f"  Txs: {b.executed_transaction_count}")
            print(f"  Parent: {b.parent_slot}")

asyncio.run(subscribe_blocks())
```

---

## 8. Blocks Meta Subscription

Lightweight alternative to full Blocks — metadata only (slot, blockhash, time, height, parent). No filter options.

```python
async def subscribe_blocks_meta():
    stream = stub.Subscribe()
    req = geyser_pb2.SubscribeRequest(
        blocks_meta={
            "client": geyser_pb2.SubscribeRequestFilterBlocksMeta()
        },
        commitment=geyser_pb2.CommitmentLevel.FINALIZED
    )
    await stream.write(req)

    async for update in stream:
        if update.HasField("block_meta"):
            m = update.block_meta
            print(f"Slot: {m.slot} | Hash: {m.blockhash}")
            print(f"  Height: {m.block_height} | Parent: {m.parent_slot}")

asyncio.run(subscribe_blocks_meta())
```

---

## 9. Entries Subscription

The lowest-level subscription — raw validator execution batches. No filter options. For deep research and validator-level analysis only.

```python
async def subscribe_entries():
    stream = stub.Subscribe()
    req = geyser_pb2.SubscribeRequest(
        entry={"client": geyser_pb2.SubscribeRequestFilterEntry()},
        commitment=geyser_pb2.CommitmentLevel.CONFIRMED
    )
    await stream.write(req)

    async for update in stream:
        if update.HasField("entry"):
            e = update.entry
            print(f"Slot: {e.slot} | Index: {e.index}")
            print(f"  Hashes: {e.num_hashes} | Txs: {e.executed_transaction_count}")

asyncio.run(subscribe_entries())
```

> **Note:** Most developers won't need this subscription. Use Blocks or Transactions instead for typical use cases.

---

## 10. Unary Methods

Simple request-response calls — no streaming needed.

| Method | Returns | Use Case |
|--------|---------|----------|
| Ping | PongResponse | Health check / keepalive |
| GetSlot | Current slot number | Quick chain position check |
| GetBlockHeight | Current block height | Block height lookup |
| GetLatestBlockhash | Recent blockhash | Transaction construction |
| IsBlockhashValid | Boolean validity | Blockhash expiry check |
| GetVersion | Server version string | Compatibility check |

```python
async def unary_methods():
    # GetSlot
    slot_resp = await stub.GetSlot(
        geyser_pb2.GetSlotRequest(
            commitment=geyser_pb2.CommitmentLevel.CONFIRMED
        )
    )
    print(f"Current slot: {slot_resp.slot}")

    # GetLatestBlockhash
    bh_resp = await stub.GetLatestBlockhash(
        geyser_pb2.GetLatestBlockhashRequest(
            commitment=geyser_pb2.CommitmentLevel.FINALIZED
        )
    )
    print(f"Blockhash: {bh_resp.blockhash}")
    print(f"Last valid block height: {bh_resp.last_valid_block_height}")

    # IsBlockhashValid
    valid_resp = await stub.IsBlockhashValid(
        geyser_pb2.IsBlockhashValidRequest(
            blockhash="YourBlockhashHere...",
            commitment=geyser_pb2.CommitmentLevel.CONFIRMED
        )
    )
    print(f"Valid: {valid_resp.valid}")

    # GetBlockHeight
    height_resp = await stub.GetBlockHeight(
        geyser_pb2.GetBlockHeightRequest(
            commitment=geyser_pb2.CommitmentLevel.CONFIRMED
        )
    )
    print(f"Block height: {height_resp.block_height}")

    # Ping
    pong = await stub.Ping(geyser_pb2.PingRequest(count=1))
    print(f"Pong received: count={pong.count}")

    # GetVersion
    ver = await stub.GetVersion(geyser_pb2.GetVersionRequest())
    print(f"Server version: {ver.version}")

asyncio.run(unary_methods())
```

---

## Summary

You've now learned how to use all 7 Yellowstone gRPC subscription types and 6 unary methods with Python:

- **Slots** — Real-time chain progress
- **Accounts** — Rich filtered account monitoring
- **Transactions** — Full transaction streaming
- **Transaction Status** — Lightweight confirmation tracking
- **Blocks** — Complete block content
- **Blocks Meta** — Lightweight block metadata
- **Entries** — Raw validator execution units
- **Unary Methods** — GetSlot, GetBlockHeight, GetLatestBlockhash, IsBlockhashValid, Ping, GetVersion

All of this is powered by your **NoLimitNodes** gRPC endpoint. Sign up free at [nolimitnodes.com](https://nolimitnodes.com) to get your API key and start streaming.

---

*Subscribe to [NoLimitNodes on YouTube](https://youtube.com/@NoLimitNodes) for more Solana developer tutorials.*
