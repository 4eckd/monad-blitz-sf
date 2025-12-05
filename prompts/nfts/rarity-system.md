# NFT Rarity System - Testnet to Mainnet

## Overview

MACHUPS NFT certificates use a **deterministic rarity system** that ensures rarity is preserved from Monad Testnet to Mainnet during the airdrop.

## Rarity Tiers

Based on `mathematica.yaml`:

| Tier | Probability | Color Themes |
|------|-------------|--------------|
| **COMMON** | 60% | Cyber Mint Green, Circuit Cyan, Terminal Lime |
| **UNCOMMON** | 20% | Neon Magenta, Ultraviolet Blue, Acid × Magenta Dual-Tone |
| **RARE** | 10% | Prismatic RGB Sweep, Tri-Chrome Pulse, Vaporwave Sunset Neon |
| **ULTRA RARE** | 5% | Chromatic Glitch Aurora, Spectral Flux, Iridescent Opal |
| **LEGENDARY** | 5% | Blacklight Void Fire, Forbidden Spectrum, Entropy Core Radiance |

## Deterministic Seed Generation

The rarity seed is generated using a **cryptographic hash** of immutable inputs:

```typescript
function generateRaritySeed(
  brandName: string,
  walletAddress: string,
  timestamp: number,
  blockNumber: number
): string {
  const input = `${brandName}:${walletAddress}:${timestamp}:${blockNumber}`;
  return keccak256(input);
}
```

### Seed-to-Rarity Mapping

```typescript
function determineRarityTier(seed: string): RarityTier {
  // Use last 2 bytes of seed as random number (0-65535)
  const randomValue = parseInt(seed.slice(-4), 16) % 100;

  if (randomValue < 60) return 'COMMON';          // 0-59 (60%)
  if (randomValue < 80) return 'UNCOMMON';        // 60-79 (20%)
  if (randomValue < 90) return 'RARE';            // 80-89 (10%)
  if (randomValue < 95) return 'ULTRA_RARE';      // 90-94 (5%)
  return 'LEGENDARY';                              // 95-99 (5%)
}

function selectColorTheme(tier: RarityTier, seed: string): string {
  const themes = COLOR_THEMES[tier];
  const themeIndex = parseInt(seed.slice(-6, -4), 16) % themes.length;
  return themes[themeIndex];
}
```

## Testnet NFT Metadata

```json
{
  "name": "MACHUPS Certificate - {brandName}",
  "description": "Commemorative NFT for {brandName} generated at Monad Blitz SF #18",
  "image": "ipfs://QmXxx.../certificate.png",
  "external_url": "https://{subdomain}.machups.com",
  "attributes": [
    { "trait_type": "Event", "value": "Monad Blitz SF #18" },
    { "trait_type": "Brand Name", "value": "{brandName}" },
    { "trait_type": "Rarity Tier", "value": "{tier}" },
    { "trait_type": "Color Theme", "value": "{theme}" },
    { "trait_type": "Rarity Seed", "value": "{seed}" },
    { "trait_type": "Chain", "value": "Monad Testnet" },
    { "trait_type": "Edition", "value": "{tokenId}" },
    { "trait_type": "Generation Time", "value": "< 3 minutes" },
    { "trait_type": "City", "value": "San Francisco" }
  ]
}
```

## Mainnet Airdrop Process

### Phase 1: Snapshot (Event End)
1. Query all testnet NFT holders
2. Record: `{ walletAddress, tokenId, raritySeed, metadata }`
3. Store snapshot on IPFS (immutable proof)

### Phase 2: Mainnet Contract Deployment
```solidity
contract MACHUPSMainnetCertificate {
    mapping(bytes32 => bool) public claimedSeeds;
    mapping(uint256 => bytes32) public tokenRaritySeeds;

    function claimAirdrop(
        bytes32 raritySeed,
        bytes memory testnetProof
    ) external {
        require(!claimedSeeds[raritySeed], "Already claimed");
        require(verifyTestnetOwnership(msg.sender, raritySeed, testnetProof), "Invalid proof");

        uint256 newTokenId = _mintCertificate(msg.sender, raritySeed);
        claimedSeeds[raritySeed] = true;
        tokenRaritySeeds[newTokenId] = raritySeed;

        emit AirdropClaimed(msg.sender, newTokenId, raritySeed);
    }
}
```

### Phase 3: User Claims
1. User connects wallet (same address as testnet)
2. System verifies testnet NFT ownership
3. User signs claim transaction
4. **Identical NFT** minted on mainnet with:
   - Same rarity tier
   - Same color theme
   - Same visual design
   - **Additional attribute**: `"Genesis Edition": true`

## Rarity Provenance

Each NFT includes **on-chain provenance**:

```json
{
  "provenance": {
    "testnet_contract": "0xTestnetAddress",
    "testnet_token_id": 42,
    "testnet_mint_block": 1337,
    "testnet_mint_timestamp": 1733356800,
    "mainnet_claim_block": 9999,
    "mainnet_claim_timestamp": 1735948800,
    "rarity_seed": "0xabc123...",
    "genesis_edition": true
  }
}
```

## Metadata Consistency

**Critical**: The `rarity_seed` ensures:
- ✅ Same rarity tier on both chains
- ✅ Same color theme on both chains
- ✅ Same visual output (skull glow, terminal colors, etc.)
- ✅ No re-rolls or changes

## Anti-Gaming Measures

1. **Immutable Seeds**: Generated at testnet mint, cannot be changed
2. **Snapshot-Based**: Airdrop uses final testnet state, no transfers during claim period
3. **Single Claim**: Each seed can only be claimed once
4. **Proof Required**: Must prove testnet ownership via signature/merkle proof

## Claiming Interface

### Check Eligibility
```typescript
async function checkAirdropEligibility(
  walletAddress: string
): Promise<AirdropEligibility> {
  const testnetNFTs = await getTestnetNFTs(walletAddress);

  return testnetNFTs.map(nft => ({
    tokenId: nft.tokenId,
    raritySeed: nft.raritySeed,
    rarityTier: nft.metadata.rarity_tier,
    colorTheme: nft.metadata.color_theme,
    claimable: !nft.alreadyClaimed,
    claimDeadline: AIRDROP_END_DATE
  }));
}
```

### Claim Flow
```typescript
async function claimMainnetAirdrop(
  testnetTokenId: number,
  raritySeed: string
): Promise<Transaction> {
  // 1. Verify testnet ownership
  const proof = await generateOwnershipProof(testnetTokenId);

  // 2. Submit claim transaction
  const tx = await mainnetContract.claimAirdrop(raritySeed, proof);

  // 3. Wait for confirmation
  const receipt = await tx.wait();

  // 4. Fetch new mainnet token
  const mainnetTokenId = receipt.events.find(e => e.event === 'AirdropClaimed').args.tokenId;

  return { mainnetTokenId, txHash: tx.hash };
}
```

## Airdrop Timeline

| Phase | Duration | Action |
|-------|----------|--------|
| **Testnet Minting** | Dec 4-11, 2025 | Users generate brands, mint testnet NFTs |
| **Snapshot** | Dec 11, 2025 23:59 PST | Final testnet state recorded |
| **Mainnet Deployment** | Dec 15, 2025 | Mainnet contract deployed |
| **Claim Window Opens** | Dec 16, 2025 | Users can claim mainnet NFTs |
| **Claim Deadline** | Jan 15, 2026 (30 days) | Final day to claim |
| **Unclaimed Redistribution** | Jan 16, 2026+ | Unclaimed NFTs → community treasury |

## Benefits of This Approach

### For Users
- ✅ **Testnet = Safe playground** to experiment
- ✅ **Guaranteed rarity** - no re-rolls
- ✅ **Free mainnet airdrop** - gas only
- ✅ **Genesis Edition badge** for early adopters
- ✅ **Provenance** - verifiable event participation

### For Protocol
- ✅ **No rarity manipulation** - deterministic system
- ✅ **Fair distribution** - based on participation
- ✅ **Marketing value** - "Genesis Edition" creates scarcity
- ✅ **Engagement** - users return to claim
- ✅ **On-chain proof** - event participation verified

### For Collectors
- ✅ **Rarity is immutable** - trustworthy
- ✅ **Limited supply** - only event participants
- ✅ **Historical value** - Monad Blitz SF #18 commemorative
- ✅ **Verifiable** - on-chain provenance

## Implementation Files

Required files for this system:
- `lib/nft/rarity-engine.ts` - Seed generation and tier determination
- `lib/nft/airdrop-verifier.ts` - Testnet ownership proof system
- `contracts/MACHUPSCertificate.sol` - Mainnet ERC-721 with airdrop
- `app/api/nft/check-eligibility/route.ts` - Eligibility API
- `app/api/nft/claim/route.ts` - Claim transaction builder
- `components/nft/AirdropClaimModal.tsx` - UI for claiming

---

**Version**: 1.0.0
**Last Updated**: December 4, 2025
**Status**: Design Complete, Awaiting Implementation
