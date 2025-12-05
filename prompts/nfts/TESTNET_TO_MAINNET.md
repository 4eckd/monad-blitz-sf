# Testnet → Mainnet NFT Airdrop Strategy

## Summary

MACHUPS uses a **deterministic rarity system** to ensure NFTs minted on Monad Testnet can be **identically** replicated on Mainnet during the airdrop, preserving rarity and visual appearance.

## The Problem

Traditional NFT systems face challenges when migrating from testnet to mainnet:
- ❌ Random rarity means testnet ≠ mainnet
- ❌ Users might get "downgraded" rarity
- ❌ No way to prove rarity was fair
- ❌ Visual differences between chains

## Our Solution: Deterministic Rarity Seeds

### How It Works

```
1. User generates brand → "Hero Analytics"
2. System creates rarity seed:
   seed = keccak256("Hero Analytics:0x742d35...bEb:1733356800:1337")
                     ↑            ↑         ↑          ↑
                  brandName   wallet   timestamp   block

3. Seed determines rarity:
   seed = "0x...f7a2"
   → last 2 bytes = "a2" = 162 % 100 = 62
   → 62 falls in range 60-79
   → UNCOMMON tier

4. Tier determines color theme:
   UNCOMMON themes: [Neon Magenta, Ultraviolet Blue, Acid × Magenta]
   → Use next 2 bytes of seed to pick one
   → seed[...f7] = 247 % 3 = 1
   → "Ultraviolet Blue"

5. Generate NFT with Ultraviolet Blue theme
6. Store seed in metadata
```

### Key Properties

✅ **Deterministic**: Same inputs = same output (always)
✅ **Immutable**: Seed locked at mint time, can't be changed
✅ **Verifiable**: Anyone can verify rarity from seed
✅ **Fair**: Distribution matches probability (60% common, 20% uncommon, etc.)
✅ **Preservable**: Testnet seed → Mainnet NFT (identical)

## File Structure

### 1. `mathematica.yaml` - Master Rarity Definition
Defines the 5 rarity tiers and their color themes:
- COMMON (60%): 3 themes
- UNCOMMON (20%): 3 themes
- RARE (10%): 3 themes
- ULTRA RARE (5%): 3 themes
- LEGENDARY (5%): 3 themes

**Updated to use deterministic seed** instead of random selection.

### 2. `metadata.yaml` - NFT Metadata Template
Includes:
- `rarity_seed` - The cryptographic seed
- `rarity_tier` - Computed from seed
- `color_theme` - Computed from seed
- `chain` - "Monad Testnet" or "Monad Mainnet"
- `genesis_edition` - true for airdrop recipients

### 3. `dif.yaml` - Color Application Rules
How to apply the color theme to visual elements:
- Text glow intensity
- ASCII skull edges
- Terminal border
- Sponsor logos

**Updated to preserve consistency** between testnet and mainnet.

### 4. `prompt.md` - Generation Instructions
Main prompt for AI image generation, now includes:
- ASCII art reference of expected output
- Instructions to use seed for color selection

### 5. `rarity-system.md` - Complete Technical Spec
Full documentation of:
- Seed generation algorithm
- Rarity tier mapping
- Airdrop process
- Smart contract design
- Timeline and phases

## Airdrop Flow

### Phase 1: Testnet Minting (Dec 4-11, 2025)
```typescript
// User generates brand at Monad Blitz SF #18
const seed = generateRaritySeed(
  "Hero Analytics",
  "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  1733356800,
  1337
);
// → "0x9f3a8b7c2d1e0f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a2"

const tier = determineTier(seed);
// → "UNCOMMON"

const theme = selectTheme(tier, seed);
// → "Ultraviolet Blue"

// Mint on Monad Testnet with metadata
await mintTestnetNFT({
  raritySeed: seed,
  rarityTier: tier,
  colorTheme: theme,
  chain: "Monad Testnet"
});
```

### Phase 2: Snapshot (Dec 11, 2025 23:59 PST)
```typescript
// Record all testnet NFT holders
const snapshot = await getAllTestnetHolders();
// [
//   { wallet: "0x742d...", tokenId: 42, seed: "0x9f3a...", tier: "UNCOMMON" },
//   { wallet: "0x891a...", tokenId: 43, seed: "0x7b2c...", tier: "LEGENDARY" },
//   ...
// ]

// Store snapshot on IPFS
const snapshotCID = await uploadToIPFS(snapshot);
// → "QmXxxxSnapshot..."
```

### Phase 3: Mainnet Deployment (Dec 15, 2025)
```solidity
// Deploy mainnet contract with snapshot reference
contract MACHUPSMainnetCertificate {
    bytes32 public snapshotRoot; // Merkle root of snapshot
    mapping(bytes32 => bool) public claimedSeeds;

    constructor(bytes32 _snapshotRoot) {
        snapshotRoot = _snapshotRoot;
    }
}
```

### Phase 4: User Claims (Dec 16, 2025 - Jan 15, 2026)
```typescript
// User connects wallet
const eligibleNFTs = await checkEligibility("0x742d35...");
// → [{ tokenId: 42, seed: "0x9f3a...", tier: "UNCOMMON", theme: "Ultraviolet Blue" }]

// User claims
const proof = generateMerkleProof(snapshot, "0x742d35...");
await mainnetContract.claimAirdrop("0x9f3a...", proof);

// System mints IDENTICAL NFT on mainnet
// ✅ Same seed
// ✅ Same tier
// ✅ Same color theme
// ✅ Same visual appearance
// ➕ "Genesis Edition" badge
```

## Visual Consistency Example

### Testnet NFT Metadata
```json
{
  "name": "MACHUPS Certificate - Hero Analytics",
  "rarity_seed": "0x9f3a8b7c2d1e0f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a2",
  "rarity_tier": "UNCOMMON",
  "color_theme": "Ultraviolet Blue",
  "chain": "Monad Testnet",
  "genesis_edition": false
}
```

### Mainnet NFT Metadata (After Airdrop)
```json
{
  "name": "MACHUPS Certificate - Hero Analytics",
  "rarity_seed": "0x9f3a8b7c2d1e0f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a2",
  "rarity_tier": "UNCOMMON",
  "color_theme": "Ultraviolet Blue",
  "chain": "Monad Mainnet",
  "genesis_edition": true,
  "provenance": {
    "testnet_token_id": 42,
    "testnet_contract": "0xTestnet...",
    "claim_block": 9999
  }
}
```

**Result**: Visually identical NFTs on both chains, with mainnet having extra "Genesis Edition" badge.

## Benefits

### For Users
- ✅ **No surprises** - Testnet shows exact mainnet NFT
- ✅ **Risk-free testing** - Experiment on testnet with confidence
- ✅ **Guaranteed rarity** - Can't lose LEGENDARY by migrating
- ✅ **Provenance** - Genesis Edition proves event attendance

### For Project
- ✅ **Trust** - Verifiable fairness (seed is on-chain)
- ✅ **Marketing** - "Genesis Edition" creates scarcity
- ✅ **Engagement** - Users return to claim mainnet NFT
- ✅ **Anti-manipulation** - Can't game the system

### For Collectors
- ✅ **Rarity immutable** - Trustworthy from day one
- ✅ **Limited supply** - Only Monad Blitz SF #18 participants
- ✅ **Historical value** - Commemorates real event
- ✅ **On-chain proof** - Verifiable authenticity

## Anti-Gaming Measures

1. **Seed is deterministic** - Can't re-roll by retrying
2. **Based on immutable data** - Wallet, timestamp, block all fixed
3. **Snapshot prevents transfers** - Can't buy testnet NFT after event
4. **One claim per seed** - Can't claim twice
5. **Merkle proof required** - Must prove testnet ownership

## Implementation Checklist

- [x] Update `mathematica.yaml` with deterministic seed logic
- [x] Update `metadata.yaml` with seed field
- [x] Update `dif.yaml` with consistency constraints
- [x] Create `rarity-system.md` technical spec
- [x] Add ASCII art to `prompt.md`
- [ ] Implement `lib/nft/rarity-engine.ts`
- [ ] Implement `lib/nft/airdrop-verifier.ts`
- [ ] Deploy `contracts/MACHUPSCertificate.sol` (testnet)
- [ ] Deploy `contracts/MACHUPSMainnetCertificate.sol` (mainnet)
- [ ] Build airdrop claim UI
- [ ] Test end-to-end flow

---

**Status**: Design Complete ✅
**Next Step**: Implement rarity engine
**Timeline**: Testnet launch Dec 4, Mainnet airdrop Dec 16
**Documentation**: [rarity-system.md](./rarity-system.md)
