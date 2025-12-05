---
sidebar_position: 4
---

# NFT Certificates

Every brand generated with MACHUPS receives a unique NFT certificate minted on the Monad blockchain, providing on-chain provenance and authenticity.

## Why NFTs?

### On-Chain Provenance
- Immutable record of brand creation
- Timestamped generation data
- Traceable ownership history
- Verifiable authenticity

### Collectible Value
- Genesis Edition badges for early adopters
- Rarity tiers based on generation quality
- Limited edition certificates
- Potential resale value

### Web3 Integration
- Compatible with all NFT marketplaces
- Wallet-based authentication
- Token-gated features
- Community governance (future)

## Certificate Design

MACHUPS certificates follow official Monad brand guidelines:

### Visual Elements
- **Official Monad Logomark**: Embedded from brand kit
- **Brand Colors**: #6E54FF (primary purple), #DDD7FE (light purple), #0E091C (dark navy)
- **Typography**: Britti Sans (headlines), Inter (body), Roboto Mono (labels)
- **Layout**: 1200x1200px (optimal for NFT metadata)

### Certificate Information
- **Brand Name**: Generated brand name
- **Subdomain**: Preview deployment URL
- **Generation Date**: Timestamp of creation
- **Screenshot**: Brand preview image
- **Event Badge**: "MONAD BLITZ SF #18"

## How It Works

### 1. Generation Complete

After your brand is generated:

```
✓ Brand Analysis Complete
✓ Logos Generated
✓ Design Tokens Exported
✓ Components Created
✓ Guidelines PDF Generated
→ Minting NFT Certificate...
```

### 2. Certificate Creation

System generates certificate with:
- Brand screenshot (embedded)
- Metadata (name, date, URL)
- Monad branding applied
- SVG rendered to PNG (1200x1200)

### 3. Metadata Upload

Certificate and metadata uploaded to IPFS:

```json
{
  "name": "YourBrand - MACHUPS Genesis",
  "description": "Brand generated at Monad Blitz SF #18",
  "image": "ipfs://Qm.../certificate.png",
  "attributes": [
    { "trait_type": "Event", "value": "Monad Blitz SF #18" },
    { "trait_type": "Brand Name", "value": "YourBrand" },
    { "trait_type": "Generation Date", "value": "2025-12-06" },
    { "trait_type": "Primary Color", "value": "#0066FF" },
    { "trait_type": "Style", "value": "Modern" },
    { "trait_type": "Generation Time", "value": "2.4s" }
  ]
}
```

### 4. Minting on Monad

NFT minted to your Monad wallet:

```solidity
// MACHUPSCertificate.sol
function mintBrandCertificate(
    address recipient,
    string memory tokenURI
) public returns (uint256)
```

### 5. Confirmation

Transaction confirmed on Monad blockchain:
- **Network**: Monad Mainnet
- **Gas Fees**: ~$0.01 (extremely low)
- **Speed**: 3-5 seconds confirmation
- **Explorer**: View on Monad Explorer

## Smart Contract

### Contract Details

- **Name**: MACHUPS Certificate
- **Symbol**: MACHUPS
- **Type**: ERC-721 (NFT standard)
- **Network**: Monad Mainnet
- **Contract Address**: `0x...` (deployed)

### Contract Features

```solidity
contract MACHUPSCertificate is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256[]) private _userBrands;

    event BrandMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string brandName,
        uint256 timestamp
    );

    function mintBrandCertificate(
        address recipient,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _userBrands[recipient].push(newTokenId);

        emit BrandMinted(
            newTokenId,
            recipient,
            tokenURI,
            block.timestamp
        );

        return newTokenId;
    }

    function getUserBrands(address user)
        public view returns (uint256[] memory)
    {
        return _userBrands[user];
    }
}
```

## Pricing Tiers

### Free Tier
- ❌ No NFT certificate
- Preview only

### Starter - $10
- ✅ NFT on **Monad Testnet**
- Standard certificate
- 24-hour preview

### Pro - $49
- ✅ NFT on **Monad Mainnet**
- **Genesis Edition** badge
- Permanent deployment
- Custom domain support

### Enterprise - $299/month
- ✅ NFTs on Monad Mainnet
- **Exclusive edition** badges
- API access
- Bulk minting

## Rarity Tiers

NFTs have different rarity levels based on generation quality:

### Common (60%)
- Standard brand generation
- Basic attributes

### Uncommon (25%)
- High WCAG compliance score (>95%)
- Premium color palette

### Rare (10%)
- Perfect WCAG AAA compliance
- Unique brand personality
- Fast generation time (under 2 minutes)

### Epic (4%)
- All Rare attributes
- Premium features used
- Event-specific badge

### Legendary (1%)
- Genesis Edition (#1-100)
- Perfect attributes
- Special commemorative badge

## Viewing Your NFT

### OpenSea

1. Visit [opensea.io](https://opensea.io)
2. Connect your Monad wallet
3. Search for "MACHUPS Certificate"
4. View your NFT in collection

### Monad Explorer

```
https://explorer.monad.xyz/token/[CONTRACT_ADDRESS]/[TOKEN_ID]
```

### In Wallet

- MetaMask: View in "NFTs" tab
- WalletConnect: Check connected app
- Coinbase Wallet: "Collectibles" section

## Secondary Market

### Resale

NFTs can be resold on:
- OpenSea
- Blur
- LooksRare
- Monad-native marketplaces

### Pricing Factors

- **Rarity**: Legendary > Epic > Rare
- **Event Badge**: Genesis Edition premium
- **Brand Quality**: WCAG compliance scores
- **Historical Value**: Early certificate numbers
- **Community Demand**: Popular brands

### Royalties

- **Creator**: 5% royalty on secondary sales
- **Platform**: 2.5% platform fee
- **Seller**: Receives 92.5% of sale price

## Token-Gated Features

NFT holders unlock:

### Current Benefits
- ✅ Verified brand ownership
- ✅ Access to brand analytics
- ✅ Priority support
- ✅ Community Discord role

### Future Benefits (Planned)
- 🔜 Governance voting rights
- 🔜 Exclusive design templates
- 🔜 Advanced customization tools
- 🔜 Revenue sharing program
- 🔜 Early access to new features

## Technical Details

### IPFS Storage

Metadata and images stored on IPFS:
- **Provider**: Thirdweb IPFS gateway
- **Redundancy**: Pinned across multiple nodes
- **Access**: Public, decentralized
- **Cost**: Included in generation fee

### Monad Integration

Why Monad blockchain:
- **Speed**: 1-second block time
- **Cost**: $0.01 average gas fee
- **Scalability**: 10,000+ TPS
- **Compatibility**: EVM-compatible
- **Future**: Monad ecosystem growth

### Smart Contract Security

- ✅ OpenZeppelin contracts
- ✅ Audited ERC-721 implementation
- ✅ No upgradeability (immutable)
- ✅ Owner controls limited to minting
- ✅ No hidden functions

## FAQ

**Q: Can I transfer my NFT?**
A: Yes, NFTs are fully transferable like any ERC-721 token.

**Q: What if I lose my wallet?**
A: NFT ownership is tied to your wallet. Keep your seed phrase secure.

**Q: Can I mint multiple certificates?**
A: Yes, each brand generation creates a new NFT.

**Q: Is the brand data on-chain?**
A: Metadata is on IPFS (referenced on-chain), not directly on-chain.

**Q: Can I update the certificate after minting?**
A: No, certificates are immutable once minted.

**Q: What happens if IPFS goes down?**
A: Multiple pinning services ensure redundancy. Metadata URL stored on-chain.

## Next Steps

- [Brand Generation](./brand-generation) - Generate your first brand
- [Database Schema](../database/schema) - NFT storage structure
- [API Reference](../api/overview) - Programmatic NFT access
