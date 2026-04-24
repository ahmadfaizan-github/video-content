# How to Use 40+ Solana RPC Methods in Python

<!-- Embed the YouTube video here -->
<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe> -->

In this guide, you'll learn how to use 40+ Solana RPC methods in Python. We cover everything — accounts, tokens, transactions, blocks, network info, fees, slots, and utility methods. Each method includes a working Python code example you can copy and run.

**What is Solana RPC?** It's a JSON-RPC 2.0 API over HTTP. You send a JSON request, and get a JSON response. It's the foundation of every Solana app, bot, and tool.

---

## Table of Contents

1. [Setup & Helper Function](#1-setup--helper-function)
2. [Account Methods](#2-account-methods)
3. [Token Methods](#3-token-methods)
4. [Transaction Methods](#4-transaction-methods)
5. [Block Methods](#5-block-methods)
6. [Network & Cluster Methods](#6-network--cluster-methods)
7. [Fees & Rent Methods](#7-fees--rent-methods)
8. [Slot & Blockhash Methods](#8-slot--blockhash-methods)
9. [Utility Methods](#9-utility-methods)

---

## Get Your API Key

1. Go to [nolimitnodes.com](https://nolimitnodes.com)
2. Click **Sign Up** (free, no credit card required)
3. Copy your **HTTP RPC endpoint URL** from the dashboard

---

## 1. Setup & Helper Function

```bash
pip install requests
```

This helper function is used in every example:

```python
import requests
import json

# Your NoLimitNodes RPC endpoint
RPC_URL = "https://your-nln-rpc-endpoint"

def rpc(method: str, params: list = []):
    payload = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": method,
        "params": params,
    }
    resp = requests.post(RPC_URL, json=payload)
    return resp.json()["result"]
```

---

## 2. Account Methods

### getBalance

```python
# Get SOL balance for an account (in lamports)
# 1 SOL = 1,000,000,000 lamports

result = rpc("getBalance", [
    "83astBRguLMdt2h5U1Tpdq5tjFoJ6noeGwaY3mDLVcri",
    {"commitment": "finalized"}
])

lamports = result["value"]
sol = lamports / 1_000_000_000
print(f"Balance: {sol} SOL")
```

### getAccountInfo

```python
# Get full account data: balance, owner, data, executable

result = rpc("getAccountInfo", [
    "vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg",
    {
        "encoding": "jsonParsed",
        "commitment": "finalized"
    }
])

acct = result["value"]
print(f"Lamports: {acct['lamports']}")
print(f"Owner: {acct['owner']}")
print(f"Executable: {acct['executable']}")
print(f"Data: {acct['data']}")
```

### getMultipleAccounts

```python
# Read up to 100 accounts in a single request

result = rpc("getMultipleAccounts", [
    [
        "vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg",
        "4fYNw3dojWmQ4dXtSGE9epjRGy9pFSx62YypT7avPYvA"
    ],
    {"encoding": "base64", "commitment": "finalized"}
])

for acct in result["value"]:
    if acct:
        print(f"Lamports: {acct['lamports']}")
```

### getProgramAccounts

```python
# Get all accounts owned by a program (with filters)

result = rpc("getProgramAccounts", [
    "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    {
        "encoding": "jsonParsed",
        "filters": [
            {"dataSize": 165},
            {"memcmp": {"offset": 0, "bytes": "MINT_PUBKEY"}}
        ]
    }
])

for item in result:
    print(f"Account: {item['pubkey']}")
    print(f"  Lamports: {item['account']['lamports']}")
```

### getLargestAccounts

```python
# Get the 20 largest accounts by SOL balance

result = rpc("getLargestAccounts", [
    {"commitment": "finalized"}
])

for acct in result["value"][:5]:
    sol = acct['lamports'] / 1_000_000_000
    print(f"{acct['address']}: {sol:,.0f} SOL")
```

---

## 3. Token Methods

### getTokenAccountBalance

```python
# Get SPL token balance for a token account

result = rpc("getTokenAccountBalance", [
    "48gpnn8nsmkvkgso7462Z1nFhUrprGQ71u1YLBPzizbY",
    {"commitment": "finalized"}
])

val = result["value"]
print(f"Amount: {val['uiAmountString']}")
print(f"Decimals: {val['decimals']}")
```

### getTokenAccountsByOwner

```python
# Get all token accounts for a wallet

result = rpc("getTokenAccountsByOwner", [
    "A1TMhSGzQxMr1TboBKtgixKz1sS6REASMxPo1qsyTSJd",
    {"programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"},
    {
        "encoding": "jsonParsed",
        "commitment": "finalized"
    }
])

for item in result["value"]:
    info = item["account"]["data"]["parsed"]["info"]
    print(f"Mint: {info['mint']}")
    print(f"  Amount: {info['tokenAmount']['uiAmountString']}")
```

### getTokenSupply

```python
# Get total supply for an SPL token mint

result = rpc("getTokenSupply", [
    "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
    {"commitment": "finalized"}
])

val = result["value"]
print(f"Supply: {val['uiAmountString']}")
print(f"Decimals: {val['decimals']}")
```

### getTokenLargestAccounts

```python
# Get the 20 largest holders of a specific token

result = rpc("getTokenLargestAccounts", [
    "3wyAj7Rt1TWVPZVteFJPLa26JmLvdb1CAKEFZm3NY75E",
    {"commitment": "finalized"}
])

for holder in result["value"][:5]:
    print(f"{holder['address']}: {holder['uiAmountString']}")
```

---

## 4. Transaction Methods

### getTransaction

```python
# Fetch full details of a confirmed transaction

result = rpc("getTransaction", [
    "4cdd1oX7cfVALfr26tP52BZ6cSzrgnNGtYD...",
    {
        "encoding": "jsonParsed",
        "commitment": "confirmed",
        "maxSupportedTransactionVersion": 0
    }
])

print(f"Slot: {result['slot']}")
print(f"Fee: {result['meta']['fee']} lamports")
print(f"Status: {result['meta']['err']}")
for log in result["meta"]["logMessages"]:
    print(f"  {log}")
```

### getSignaturesForAddress

```python
# Get transaction history for an address (newest first)

result = rpc("getSignaturesForAddress", [
    "Vote111111111111111111111111111111111111111",
    {
        "commitment": "finalized",
        "limit": 5
    }
])

for tx in result:
    print(f"Sig: {tx['signature'][:20]}...")
    print(f"  Slot: {tx['slot']} | Err: {tx['err']}")
```

### getSignatureStatuses

```python
# Check confirmation status of one or more transactions

result = rpc("getSignatureStatuses", [
    ["4cdd1oX7cfVALfr26tP52BZ6cSzrgnNGtYD..."],
    {"searchTransactionHistory": True}
])

for status in result["value"]:
    if status:
        print(f"Slot: {status['slot']}")
        print(f"Confirmations: {status['confirmations']}")
        print(f"Status: {status['confirmationStatus']}")
```

### sendTransaction

```python
# Submit a signed transaction to the cluster

sig = rpc("sendTransaction", [
    "BASE64_ENCODED_SIGNED_TX...",
    {
        "encoding": "base64",
        "skipPreflight": False,
        "preflightCommitment": "confirmed"
    }
])

print(f"Submitted: {sig}")
```

### simulateTransaction

```python
# Dry-run a transaction without broadcasting

result = rpc("simulateTransaction", [
    "BASE64_ENCODED_TX...",
    {
        "encoding": "base64",
        "commitment": "confirmed",
        "replaceRecentBlockhash": True
    }
])

sim = result["value"]
print(f"Error: {sim['err']}")
print(f"Logs: {sim['logs']}")
print(f"Units consumed: {sim['unitsConsumed']}")
```

### getTransactionCount

```python
# Total transactions processed by the cluster

count = rpc("getTransactionCount", [
    {"commitment": "finalized"}
])

print(f"Total transactions: {count:,}")
```

---

## 5. Block Methods

### getBlock

```python
# Get full block data for a specific slot

result = rpc("getBlock", [
    378967388,
    {
        "encoding": "jsonParsed",
        "commitment": "finalized",
        "transactionDetails": "full",
        "maxSupportedTransactionVersion": 0,
        "rewards": True
    }
])

print(f"Blockhash: {result['blockhash']}")
print(f"Height: {result['blockHeight']}")
print(f"Transactions: {len(result['transactions'])}")
print(f"Time: {result['blockTime']}")
```

### getBlockHeight

```python
# Get current block height

height = rpc("getBlockHeight", [
    {"commitment": "finalized"}
])
print(f"Block height: {height:,}")
```

### getBlockTime

```python
# Get timestamp for a specific block

timestamp = rpc("getBlockTime", [378967388])

from datetime import datetime
dt = datetime.fromtimestamp(timestamp)
print(f"Block time: {dt}")
```

### getBlocks

```python
# Get confirmed block slots in a range

result = rpc("getBlocks", [
    377268280,
    377268285,
    {"commitment": "finalized"}
])

print(f"Confirmed slots: {result}")
# Output: [377268280, 377268281, 377268283, 377268285]
```

### getBlockProduction

```python
# Get block production stats by validator

result = rpc("getBlockProduction", [
    {"commitment": "finalized"}
])

validators = result["value"]["byIdentity"]
for pubkey, stats in list(validators.items())[:3]:
    leader_slots, blocks_produced = stats
    print(f"{pubkey[:20]}...")
    print(f"  Slots: {leader_slots} | Produced: {blocks_produced}")
```

---

## 6. Network & Cluster Methods

### getHealth

```python
health = rpc("getHealth")
print(f"Health: {health}")  # "ok" or error
```

### getVersion

```python
version = rpc("getVersion")
print(f"Solana: {version['solana-core']}")
print(f"Feature set: {version['feature-set']}")
```

### getEpochInfo

```python
result = rpc("getEpochInfo", [
    {"commitment": "finalized"}
])

print(f"Epoch: {result['epoch']}")
print(f"Slot: {result['absoluteSlot']}")
print(f"Block height: {result['blockHeight']}")
print(f"Slot index: {result['slotIndex']}/{result['slotsInEpoch']}")
print(f"Tx count: {result['transactionCount']:,}")
```

### getClusterNodes

```python
nodes = rpc("getClusterNodes")

print(f"Total nodes: {len(nodes)}")
for node in nodes[:3]:
    print(f"Pubkey: {node['pubkey'][:20]}...")
    print(f"  Version: {node['version']}")
    print(f"  RPC: {node['rpc']}")
```

### getVoteAccounts

```python
result = rpc("getVoteAccounts", [
    {"commitment": "finalized"}
])

print(f"Current validators: {len(result['current'])}")
print(f"Delinquent: {len(result['delinquent'])}")

for v in result["current"][:3]:
    print(f"  {v['votePubkey'][:20]}... stake: {v['activatedStake']}")
```

---

## 7. Fees & Rent Methods

### getFeeForMessage

```python
result = rpc("getFeeForMessage", [
    "BASE64_ENCODED_MESSAGE...",
    {"commitment": "confirmed"}
])

fee = result["value"]
print(f"Estimated fee: {fee} lamports")
print(f"That is {fee / 1_000_000_000} SOL")
```

### getRecentPrioritizationFees

```python
result = rpc("getRecentPrioritizationFees", [
    ["CxELquR1gPP8wHe33gZ4QxqGB3sZ9RSwsJ2KshVewkFY"]
])

for sample in result[:5]:
    print(f"Slot: {sample['slot']} | Fee: {sample['prioritizationFee']}")
```

### getMinimumBalanceForRentExemption

```python
# For a 165-byte account (SPL Token account)
lamports = rpc("getMinimumBalanceForRentExemption", [165])

sol = lamports / 1_000_000_000
print(f"Rent exempt: {lamports} lamports ({sol} SOL)")

# For a 0-byte account (just SOL)
lamports_0 = rpc("getMinimumBalanceForRentExemption", [0])
print(f"Empty account: {lamports_0} lamports")
```

---

## 8. Slot & Blockhash Methods

### getSlot & getSlotLeader

```python
slot = rpc("getSlot", [{"commitment": "finalized"}])
print(f"Current slot: {slot:,}")

leader = rpc("getSlotLeader", [{"commitment": "finalized"}])
print(f"Slot leader: {leader}")
```

### getLatestBlockhash

```python
result = rpc("getLatestBlockhash", [
    {"commitment": "finalized"}
])

bh = result["value"]
print(f"Blockhash: {bh['blockhash']}")
print(f"Valid until height: {bh['lastValidBlockHeight']}")
```

### isBlockhashValid

```python
result = rpc("isBlockhashValid", [
    "J7rBdM6AecPDEZp8aPq5iPSNKVkU5Q76F3oAV4eW5wsW",
    {"commitment": "confirmed"}
])

valid = result["value"]
print(f"Valid: {valid}")
# If False, fetch a new blockhash before sending tx
```

---

## 9. Utility Methods

### requestAirdrop

```python
# Get free SOL on devnet or testnet (not mainnet!)
# Switch RPC_URL to devnet first

sig = rpc("requestAirdrop", [
    "83astBRguLMdt2h5U1Tpdq5tjFoJ6noeGwaY3mDLVcri",
    1_000_000_000  # 1 SOL
])

print(f"Airdrop tx: {sig}")
```

### getSupply

```python
result = rpc("getSupply", [
    {"commitment": "finalized"}
])

val = result["value"]
total = val["total"] / 1_000_000_000
circ = val["circulating"] / 1_000_000_000
non_circ = val["nonCirculating"] / 1_000_000_000
print(f"Total: {total:,.0f} SOL")
print(f"Circulating: {circ:,.0f} SOL")
print(f"Non-circulating: {non_circ:,.0f} SOL")
```

### getGenesisHash

```python
genesis = rpc("getGenesisHash")
print(f"Genesis hash: {genesis}")

# Mainnet: 5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d
# Devnet:  EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG
# Testnet: 4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY
```

---

## Summary

You've now learned 40+ Solana RPC methods across 8 categories:

- **Account** — getBalance, getAccountInfo, getMultipleAccounts, getProgramAccounts, getLargestAccounts
- **Token** — getTokenAccountBalance, getTokenAccountsByOwner, getTokenSupply, getTokenLargestAccounts
- **Transaction** — getTransaction, getSignaturesForAddress, getSignatureStatuses, sendTransaction, simulateTransaction, getTransactionCount
- **Block** — getBlock, getBlockHeight, getBlocks, getBlockTime, getBlockProduction
- **Network** — getClusterNodes, getEpochInfo, getHealth, getVersion, getVoteAccounts
- **Fees** — getFeeForMessage, getRecentPrioritizationFees, getMinimumBalanceForRentExemption
- **Slot** — getSlot, getSlotLeader, getLatestBlockhash, isBlockhashValid
- **Utility** — requestAirdrop, getSupply, getGenesisHash

All powered by your **NoLimitNodes** RPC endpoint. Sign up free at [nolimitnodes.com](https://nolimitnodes.com).

---

*Subscribe to [NoLimitNodes on YouTube](https://youtube.com/@NoLimitNodes) for more Solana developer tutorials.*
