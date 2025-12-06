# MACHUPS NFT Certificate Tier Specifications

## Overview

All NFT certificates follow a **uniformed template design** with identical layouts, structure, and elements. The **only variation** between tiers is the color palette applied.

## Validation Status

✅ **All 45 tests passed (100% consistency)**

Run validation: `node prompts/nfts/tests/validate-nft-consistency.test.js`

---

## Tier Color Palettes

### COMMON (60% probability)
**Theme:** Cyber Mint Green / Circuit Cyan / Terminal Lime

```
Primary:   #00FFA3  (Cyber Mint)
Secondary: #00FFCC  (Electric Aqua)
Accent:    #7FFFD4  (Digital Seafoam)
Shadow:    #004D3D  (Deep Circuit)
Glow:      #B3FFE6  (Mint Haze)
```

**File:** `prompts/nfts/images/nft-certificate-common.svg`

---

### UNCOMMON (20% probability)
**Theme:** Neon Magenta / Ultraviolet Blue / Acid × Magenta Dual-Tone

```
Primary:   #FF00FF  (Pure Magenta)
Secondary: #FF0080  (Hot Pink Pulse)
Accent:    #FF66FF  (Soft Neon)
Shadow:    #660066  (Deep Violet)
Glow:      #FFCCFF  (Magenta Bloom)
```

**File:** `prompts/nfts/images/nft-certificate-uncommon.svg`

---

### RARE (10% probability)
**Theme:** Prismatic RGB Sweep / Tri-Chrome Pulse / Vaporwave Sunset Neon

```
Primary:   #FF0000  (Pure Red)
Secondary: #00FF00  (Pure Green)
Tertiary:  #0000FF  (Pure Blue)
Accent:    #FFFF00  (Yellow Blend)
Shadow:    #330033  (Void Purple)
Glow:      #FFFFFF  (White Prismatic)
```

**File:** `prompts/nfts/images/nft-certificate-rare.svg`

---

### LEGENDARY (2.5% probability)
**Theme:** Blacklight Void Fire / Forbidden Spectrum / Entropy Core Radiance

```
Primary:   #9D00FF  (Blacklight Purple)
Secondary: #FF0099  (Hot Pink)
Tertiary:  #00FFFF  (Cyan)
Accent:    #FF6600  (Orange Fire)
Shadow:    #000000  (Void Black)
Glow:      #FFFFFF  (White Radiance)
Highlight: #FFD700  (Gold)
```

**File:** `prompts/nfts/images/nft-certificate-legendary.svg`

---

### ULTRA RARE (7.5% probability)
**Theme:** Chromatic Glitch Aurora / Spectral Flux / Iridescent Opal

```
Primary:   #00FFFF  (Cyan Glitch)
Secondary: #FF00AA  (Magenta Corruption)
Tertiary:  #AAFF00  (Lime Artifact)
Accent:    #FF6600  (Orange Distortion)
Shadow:    #0D0D1A  (Digital Void)
Glow:      #EEFFFF  (Aurora Shimmer)
```

**File:** `prompts/nfts/images/nft-certificate-ultra.svg`

---

## Probability Distribution

| Tier       | Probability | Relative Rarity |
|-----------|-------------|-----------------|
| COMMON    | 60.0%       | 6 in 10         |
| UNCOMMON  | 20.0%       | 2 in 10         |
| RARE      | 10.0%       | 1 in 10         |
| ULTRA RARE| 7.5%        | 3 in 40         |
| LEGENDARY | 2.5%        | 1 in 40         |
| **TOTAL** | **100.0%**  |                 |

---

## Uniformed Template Structure

All tiers share the **identical layout**:

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                          ┌─────────────────┐                                ║
║                          │   MONAD LOGO    │  (centered, glowing circle)    ║
║                          └─────────────────┘                                ║
║                                                                              ║
║                          MONAD BLITZ SF #18                                 ║
║                                                                              ║
║                        BRAND CERTIFICATE                                    ║
║                                                                              ║
║                       WITH FOUNDERS.INC                                     ║
║                                                                              ║
║           ┌────────────────────────────────────────────────┐                ║
║           │         BRAND SCREENSHOT PREVIEW               │                ║
║           │            (750 x 394 px)                      │                ║
║           └────────────────────────────────────────────────┘                ║
║                                                                              ║
║                      [DYNAMIC BRAND NAME]                                   ║
║                                                                              ║
║                     brand.machups.com                                       ║
║                                                                              ║
║                  Generated December 6, 2025                                 ║
║                                                                              ║
║  ┌─────────┐    TIER: [RARITY] • [X%] PROBABILITY    ┌─────────┐           ║
║  │COINBASE │                                          │THIRDWEB │           ║
║  └─────────┘    MACHUPS.COM • POWERED BY MONAD       └─────────┘           ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## Design Elements

### Required Elements (All Tiers)
- ✅ Monad logomark (centered at top)
- ✅ Event title: "MONAD BLITZ SF #18"
- ✅ Certificate title: "BRAND CERTIFICATE"
- ✅ Subtitle: "WITH FOUNDERS.INC"
- ✅ Screenshot container (750x394px)
- ✅ Brand name placeholder: "[BRAND NAME]"
- ✅ Subdomain: "brand.machups.com"
- ✅ Generation date (dynamic)
- ✅ Tier and probability label
- ✅ Coinbase logo (left)
- ✅ Thirdweb logo (right)
- ✅ Footer: "MACHUPS.COM • POWERED BY MONAD"
- ✅ Decorative borders and corner accents
- ✅ Gradient backgrounds

### Removed Elements
- ❌ "FUSED GAMING" references (all removed)
- ❌ Old subdomain examples (e.g., "CYBER.MINT.001")
- ❌ "BY FUSED GAMING" subtitle

---

## Dynamic Placeholders

The following elements are replaced at runtime:

1. **`#brand-name`** - Brand name text
2. **`#subdomain`** - Deployment subdomain (e.g., "gonads.machups.com")
3. **`#generation-date`** - Generation timestamp
4. **`<image href="image.png">`** - Brand screenshot preview

---

## Partner Logos

### Coinbase
- **Position:** Bottom left (footer)
- **Dimensions:** 80x14px
- **Source:** `prompts/nfts/images/brand-sponsors/Coinbase_Wordmark_White.svg`
- **Color:** White (#FFFFFF)

### Thirdweb
- **Position:** Bottom right (footer)
- **Dimensions:** 80x14px
- **Source:** `prompts/nfts/images/brand-sponsors/thirdweb.svg`
- **Color:** White (#FFFFFF)

### Monad
- **Position:** Top center (event badge)
- **Dimensions:** ~90x92px (scaled)
- **Source:** `prompts/nfts/images/brand-sponsors/Monad-Logo.svg`
- **Color:** White (#FFFFFF)

---

## SVG Specifications

- **Dimensions:** 1200 x 1200 px
- **Format:** SVG (vector)
- **Color Mode:** RGB
- **Namespace:** `xmlns="http://www.w3.org/2000/svg"`
- **Background:** Linear gradient (tier-specific shadow colors)
- **Effects:** Glow filters, radial gradients

---

## Usage in NFT Minting

### Metadata Structure

```json
{
  "name": "{BRAND_NAME} - MACHUPS Certificate",
  "description": "Brand generated at Monad Blitz SF #18",
  "image": "ipfs://{CERTIFICATE_HASH}",
  "attributes": [
    { "trait_type": "Tier", "value": "COMMON" },
    { "trait_type": "Probability", "value": "60%" },
    { "trait_type": "Brand Name", "value": "{BRAND_NAME}" },
    { "trait_type": "Generated Date", "value": "2025-12-06" },
    { "trait_type": "Event", "value": "Monad Blitz SF #18" }
  ]
}
```

### Rarity Distribution Logic

```javascript
function selectTier() {
  const random = Math.random() * 100;

  if (random < 2.5) return 'legendary';   // 2.5%
  if (random < 10.0) return 'ultra';      // 7.5%
  if (random < 20.0) return 'rare';       // 10%
  if (random < 40.0) return 'uncommon';   // 20%
  return 'common';                         // 60%
}
```

---

## Testing

### Run Consistency Validation

```bash
node prompts/nfts/tests/validate-nft-consistency.test.js
```

### Test Coverage

The validation test checks:

1. ✅ Required SVG elements present
2. ✅ Required text content present
3. ✅ Forbidden text removed (FUSED GAMING)
4. ✅ Correct color palette applied
5. ✅ Probability percentage matches tier
6. ✅ Tier name correct
7. ✅ Partner logos embedded
8. ✅ SVG dimensions (1200x1200)
9. ✅ Monad logo present

---

## File Manifest

```
prompts/nfts/
├── images/
│   ├── nft-certificate-common.svg      (60%)
│   ├── nft-certificate-uncommon.svg    (20%)
│   ├── nft-certificate-rare.svg        (10%)
│   ├── nft-certificate-ultra.svg       (7.5%)
│   ├── nft-certificate-legendary.svg   (2.5%)
│   └── brand-sponsors/
│       ├── Coinbase_Wordmark_White.svg
│       ├── thirdweb.svg
│       └── Monad-Logo.svg
├── tests/
│   └── validate-nft-consistency.test.js
└── NFT_TIER_SPECIFICATIONS.md          (this file)
```

---

## Version History

- **v1.0.0** (2025-12-06) - Initial uniformed template design
  - Removed FUSED GAMING branding
  - Added partner logos (Coinbase, Thirdweb, Monad)
  - Implemented 5-tier rarity system
  - Created consistency validation tests
  - All 45 tests passing ✅

---

**Built for Monad Blitz SF #18**
**MACHUPS.COM • Powered by Monad**
