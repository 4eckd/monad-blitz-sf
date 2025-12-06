# MONAD BLITZ SF - MACHUPS BUILD PLAN

Prompt:
```
Create a brand template for our project that automatically deploys to to a sub domain for preview for gonads.io who is thinking about purchasing the $300 / month package for their company team devs composed of 5 members. They need an identity and color scheme that is both attractive / appealing but also slightly catchy with a touch of humar or even cliche'. 
Gonads embodies the memecoin culture with colorfully and thoughtfully morbid references. They are a web 3 NFT idea. 
Design their brand as the demo for this project
```

## 10-Hour AI-Powered Brand Generation Platform

**Event:** Monad Blitz SF #18 - December 6, 2025
**Duration:** 10 hours (11:30 AM - 9:30 PM)
**Team:** 4 members maximum
**Demo Time:** 3 minutes
**Submission:** https://blitz.devnads.com/

---

## 🎯 MISSION

Build **MACHUPS** - An AI-powered platform that generates complete brand packages (logos, design tokens, components, guidelines, NFTs) in under 3 minutes using:

- **Claude AI** for brand analysis & generation
- **Penpot MCP** for design token integration
- **Cloudflare MCP** for edge deployment & caching
- **x402 Protocol** for micropayments (premium features)
- **Monad Blockchain** for NFT minting (commemorative certificates)
- **Docusaurus** for documentation sites

---

## 📋 PROJECT OVERVIEW

### What We're Building

**MACHUPS** generates:
1. ✅ **HTML/CSS Logos** (3 variants: wordmark, icon+text, badge) - PNG & SVG
2. ✅ **W3C DTCG Design Tokens** (colors, typography, spacing, radius)
3. ✅ **React Components** (Button, Input, Card, Header, Footer)
4. ✅ **20-Page Brand Guidelines PDF** (professional, print-ready)
5. 💎 **Pitch Deck** (10 slides - PREMIUM via x402)
6. 🎖️ **Commemorative NFT** (minted on Monad for each generation)

### Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v4
- Lucide React icons

**Backend:**
- Claude API (Sonnet 4.5)
- Penpot MCP Server (design tokens)
- Cloudflare MCP (edge functions)
- Vercel/GitHub MCP (deployment)

**Blockchain:**
- Monad Testnet → Mainnet
- Thirdweb SDK
- x402 Payment Protocol
- ERC-721 NFT Contract

**Documentation:**
- Docusaurus (docs.machups.com)
- Docusaurus (design.machups.com)

---

## 🏆 JUDGING CRITERIA (FROM MONAD BLITZ)

Participants vote based on:
1. **Novelty & Originality** - Fresh approach, new idea
2. **Innovative Mechanics** - Clever tech implementation leveraging Monad
3. **Problem-Solving** - Addresses real challenge creatively
4. **Learning & Experimentation** - Pushing boundaries, even if not polished

**Our Competitive Edge:**
- ⚡ **Speed**: 3-minute brand generation (vs hours/days traditionally)
- 💰 **Economics**: x402 micropayments showcase Monad's low fees
- 🎨 **Quality**: HTML/CSS logos = perfect rendering, no raster artifacts
- 🔗 **Integration**: 5 MCP servers working together
- 🎖️ **Engagement**: NFT certificates create on-chain proof of participation

---

## ⏱️ 10-HOUR EXECUTION TIMELINE

### HOUR 0-1: Foundation Setup (11:30 AM - 12:30 PM)

**H0:00-H0:30 | Environment Setup**
- [x] Repository: https://github.com/4eckd/monad-blitz-sf
- [x] Clone to local: `git clone https://github.com/4eckd/monad-blitz-sf.git`
- [x] Origin: https://github.com/4eckd/monad-blitz-sf.git
- [x] Upstream: https://github.com/monad-developers/monad-blitz-sf.git
- [ ] Install dependencies: `pnpm install`
- [ ] Set up `.env.local` (DO NOT COMMIT):
```bash
# AI & MCP
CLAUDE_API_KEY=sk-ant-xxx
PENPOT_MCP_URL=xxx
CLOUDFLARE_API_TOKEN=xxx
CLOUDFLARE_ACCOUNT_ID=xxx

# Blockchain
NEXT_PUBLIC_MONAD_RPC_URL=https://rpc.monad.xyz
NEXT_PUBLIC_MONAD_CHAIN_ID=10143
THIRDWEB_SECRET_KEY=xxx
PRIVATE_KEY_DEPLOYER=xxx

# Deployment
VERCEL_TOKEN=xxx
GITHUB_TOKEN=xxx

# App
NEXT_PUBLIC_APP_URL=https://machups.com
```

**H0:30-H1:00 | Repository Structure**
- [ ] Create folder structure:
```
machups/
├── app/                          # Next.js app
│   ├── api/
│   │   ├── generate/route.ts     # Main generation endpoint
│   │   ├── premium/
│   │   │   └── pitchdeck/route.ts
│   │   ├── nft/
│   │   │   └── mint/route.ts
│   │   └── analytics/route.ts
│   ├── generate/
│   │   └── [id]/page.tsx         # Progress view
│   ├── preview/
│   │   └── [id]/page.tsx         # Results view
│   └── page.tsx                  # Landing page
│
├── lib/
│   ├── ai/
│   │   └── claude.ts             # Claude AI client
│   ├── mcp/
│   │   ├── penpot.ts             # Penpot MCP integration
│   │   ├── cloudflare.ts         # Cloudflare MCP
│   │   └── vercel.ts             # Vercel MCP
│   ├── generators/
│   │   ├── logos.ts              # HTML/CSS logo generator
│   │   ├── tokens.ts             # W3C DTCG tokens
│   │   ├── components.ts         # React component gen
│   │   ├── guidelines.ts         # PDF generator
│   │   └── pitchdeck.ts          # Premium feature
│   ├── blockchain/
│   │   ├── nft-contract.ts       # ERC-721 contract
│   │   ├── x402.ts               # Payment verification
│   │   └── thirdweb-client.ts    # Thirdweb SDK
│   └── utils/
│       ├── export.ts             # ZIP packaging
│       └── ipfs.ts               # NFT metadata upload
│
├── contracts/
│   └── MACHUPSCertificate.sol    # NFT contract
│
├── docs/                          # Docusaurus site
│   └── docusaurus.config.js
│
└── design-site/                   # Design docs
    └── docusaurus.config.js
```

---

### HOUR 1-3: Core Generation Engine (12:30 PM - 2:30 PM)

**H1:00-H1:30 | Claude AI Integration**
```typescript
// lib/ai/claude.ts
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!
});

export async function analyzeBrand(input: {
  businessIdea: string;
  targetAudience: string;
  style: 'modern' | 'classic' | 'bold' | 'minimal';
}) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 4096,
    system: `You are a professional brand strategist. Analyze the business idea and generate:

1. Brand Name (memorable, 1-2 words)
2. Tagline (compelling, under 60 chars)
3. Color Palette (primary, secondary, accent, neutrals - hex codes)
4. Typography (font families for headings, body)
5. Brand Personality (3-5 adjectives)
6. Target Audience Profile
7. Key Messaging Points
8. Visual Style Direction

Output as JSON matching BrandAnalysis interface.`,
    messages: [{
      role: 'user',
      content: `Analyze this business idea:\n\nIdea: ${input.businessIdea}\nAudience: ${input.targetAudience}\nStyle: ${input.style}`
    }]
  });

  return JSON.parse(response.content[0].text);
}
```

**H1:30-H2:30 | HTML/CSS Logo Generator**
```typescript
// lib/generators/logos.ts
import { toPng, toSvg } from 'html-to-image';

export async function generateLogos(brand: BrandAnalysis) {
  const logos = [];

  // Wordmark Logo
  const wordmark = await generateWordmarkLogo(brand);
  logos.push({
    type: 'wordmark',
    png: await toPng(wordmark.element),
    svg: await toSvg(wordmark.element)
  });

  // Icon + Text Logo
  const combination = await generateCombinationLogo(brand);
  logos.push({
    type: 'combination',
    png: await toPng(combination.element),
    svg: await toSvg(combination.element)
  });

  // Badge Logo
  const badge = await generateBadgeLogo(brand);
  logos.push({
    type: 'badge',
    png: await toPng(badge.element),
    svg: await toSvg(badge.element)
  });

  return logos;
}

function generateWordmarkLogo(brand: BrandAnalysis) {
  const html = `
    <div style="
      font-family: ${brand.typography.headingFont};
      font-size: 72px;
      font-weight: 900;
      color: ${brand.colors.primary};
      letter-spacing: -0.05em;
      background: linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      padding: 40px;
    ">
      ${brand.name}
    </div>
  `;

  const element = document.createElement('div');
  element.innerHTML = html;
  return { element, html };
}
```

**H2:30-H3:00 | Penpot MCP Integration for Design Tokens**
```typescript
// lib/mcp/penpot.ts
import { MCPClient } from '@anthropic/mcp-client';

export async function syncToPenpot(tokens: DesignTokens) {
  const penpot = new MCPClient({
    url: process.env.PENPOT_MCP_URL!
  });

  // Create Penpot library with design tokens
  const library = await penpot.call('create_library', {
    name: tokens.brandName,
    colors: tokens.colors,
    typography: tokens.typography,
    spacing: tokens.spacing
  });

  return library.id;
}
```

---

### HOUR 3-5: Design System Generation (2:30 PM - 4:30 PM)

**H3:00-H4:00 | W3C DTCG Token Generator**
```typescript
// lib/generators/tokens.ts

export function generateDesignTokens(brand: BrandAnalysis) {
  return {
    "$schema": "https://design-tokens.org/schema/version/1.0.0",
    "color": {
      "brand": {
        "primary": {
          "$value": brand.colors.primary,
          "$type": "color",
          "$description": "Primary brand color"
        },
        "secondary": {
          "$value": brand.colors.secondary,
          "$type": "color"
        }
      },
      "semantic": {
        "success": { "$value": "#10B981", "$type": "color" },
        "error": { "$value": "#EF4444", "$type": "color" },
        "warning": { "$value": "#F59E0B", "$type": "color" }
      },
      "neutral": {
        "50": { "$value": "#FAFAFA", "$type": "color" },
        "900": { "$value": "#171717", "$type": "color" }
      }
    },
    "typography": {
      "font-family": {
        "heading": {
          "$value": brand.typography.headingFont,
          "$type": "fontFamily"
        },
        "body": {
          "$value": brand.typography.bodyFont,
          "$type": "fontFamily"
        }
      },
      "font-size": {
        "xs": { "$value": "0.75rem", "$type": "dimension" },
        "sm": { "$value": "0.875rem", "$type": "dimension" },
        "base": { "$value": "1rem", "$type": "dimension" },
        "xl": { "$value": "1.25rem", "$type": "dimension" },
        "2xl": { "$value": "1.5rem", "$type": "dimension" }
      }
    },
    "spacing": {
      "xs": { "$value": "0.25rem", "$type": "dimension" },
      "sm": { "$value": "0.5rem", "$type": "dimension" },
      "md": { "$value": "1rem", "$type": "dimension" },
      "lg": { "$value": "1.5rem", "$type": "dimension" },
      "xl": { "$value": "2rem", "$type": "dimension" }
    },
    "border-radius": {
      "sm": { "$value": "0.25rem", "$type": "dimension" },
      "md": { "$value": "0.5rem", "$type": "dimension" },
      "lg": { "$value": "1rem", "$type": "dimension" },
      "full": { "$value": "9999px", "$type": "dimension" }
    }
  };
}

export function exportToTailwind(tokens: DesignTokens) {
  return `
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(flattenColors(tokens.color), null, 2)},
      fontFamily: {
        heading: ${JSON.stringify(tokens.typography["font-family"].heading.$value)},
        body: ${JSON.stringify(tokens.typography["font-family"].body.$value)}
      },
      spacing: ${JSON.stringify(flattenSpacing(tokens.spacing), null, 2)}
    }
  }
}
  `;
}
```

**H4:00-H5:00 | React Component Generator**
```typescript
// lib/generators/components.ts

export function generateComponents(tokens: DesignTokens, techStack: string) {
  const components = [
    generateButton(tokens),
    generateInput(tokens),
    generateCard(tokens),
    generateHeader(tokens),
    generateFooter(tokens)
  ];

  return components.map(c => formatForTechStack(c, techStack));
}

function generateButton(tokens: DesignTokens) {
  return {
    name: 'Button',
    props: ['variant', 'children', 'onClick'],
    template: `
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  children,
  onClick
}) => {
  const styles = {
    primary: {
      backgroundColor: tokens.color.brand.primary.$value,
      color: 'white'
    },
    secondary: {
      backgroundColor: tokens.color.brand.secondary.$value,
      color: 'white'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: tokens.color.brand.primary.$value,
      border: \`2px solid \${tokens.color.brand.primary.$value}\`
    }
  };

  return (
    <button
      onClick={onClick}
      style={{
        ...styles[variant],
        padding: \`\${tokens.spacing.sm.$value} \${tokens.spacing.md.$value}\`,
        borderRadius: tokens["border-radius"].md.$value,
        fontFamily: tokens.typography["font-family"].body.$value,
        fontSize: tokens.typography["font-size"].base.$value,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
    >
      {children}
    </button>
  );
};
    `
  };
}

function formatForTechStack(component: Component, techStack: string) {
  switch(techStack) {
    case 'nextjs':
      return {
        filename: `${component.name}.tsx`,
        code: `'use client';\n\n${component.template}`
      };
    case 'react-typescript':
      return {
        filename: `${component.name}.tsx`,
        code: `import React, { FC } from 'react';\n\n${component.template}`
      };
    case 'html':
      return {
        filename: `${component.name}.html`,
        code: convertToHTML(component)
      };
    default:
      return component;
  }
}
```

---

### HOUR 5-7: Premium Features & Integration (4:30 PM - 6:30 PM)

**H5:00-H5:30 | Brand Guidelines PDF Generator**
```typescript
// lib/generators/guidelines.ts
import puppeteer from 'puppeteer';

export async function generateGuidelinesPDF(brand: Brand) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    @page { size: A4; margin: 0; }
    body {
      font-family: ${brand.tokens.typography["font-family"].body.$value};
      margin: 0;
      padding: 0;
    }
    .page {
      width: 210mm;
      height: 297mm;
      padding: 20mm;
      box-sizing: border-box;
      page-break-after: always;
    }
    .cover {
      background: linear-gradient(135deg,
        ${brand.tokens.color.brand.primary.$value},
        ${brand.tokens.color.brand.secondary.$value});
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    h1 { font-size: 48px; margin: 0; }
    h2 { font-size: 32px; color: ${brand.tokens.color.brand.primary.$value}; }
    .logo-showcase { display: flex; gap: 20px; }
    .color-swatch {
      width: 100px;
      height: 100px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <!-- Page 1: Cover -->
  <div class="page cover">
    <div>
      <h1>${brand.name}</h1>
      <p style="font-size: 24px; margin-top: 20px;">Brand Guidelines</p>
    </div>
  </div>

  <!-- Page 2: Brand Overview -->
  <div class="page">
    <h2>Brand Overview</h2>
    <p>${brand.analysis.tagline}</p>
    <h3>Brand Personality</h3>
    <ul>
      ${brand.analysis.personality.map(p => `<li>${p}</li>`).join('')}
    </ul>
  </div>

  <!-- Page 3-5: Logo System -->
  <div class="page">
    <h2>Logo System</h2>
    <div class="logo-showcase">
      ${brand.logos.map(logo => `
        <div>
          <img src="${logo.png}" width="200" />
          <p>${logo.type}</p>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Page 6-7: Color Palette -->
  <div class="page">
    <h2>Color Palette</h2>
    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
      ${Object.entries(brand.tokens.color.brand).map(([name, token]) => `
        <div>
          <div class="color-swatch" style="background: ${token.$value};"></div>
          <p><strong>${name}</strong></p>
          <p>${token.$value}</p>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Pages 8-20: Typography, Components, Guidelines, Examples -->
  <!-- ... (continue for 20 pages total) -->
</body>
</html>
  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true
  });
  await browser.close();

  return pdf;
}
```

**H5:30-H6:30 | x402 Premium Feature Integration**
```typescript
// app/api/premium/pitchdeck/route.ts
import { verifyX402Payment } from '@/lib/blockchain/x402';
import { generatePitchDeck } from '@/lib/generators/pitchdeck';

export async function POST(req: Request) {
  const paymentHeader = req.headers.get('x-payment');

  if (!paymentHeader) {
    return Response.json(
      { error: 'Payment required' },
      { status: 402 }
    );
  }

  const payment = await verifyX402Payment(paymentHeader, {
    expectedAmount: '0.01', // 0.01 MON
    expectedRecipient: process.env.PAYMENT_RECIPIENT_ADDRESS!
  });

  if (!payment.verified) {
    return Response.json(
      { error: 'Invalid payment' },
      { status: 402 }
    );
  }

  const { brandId } = await req.json();
  const brand = await getBrandById(brandId);

  const pitchDeck = await generatePitchDeck(brand);

  return Response.json({
    success: true,
    pitchDeck: {
      pdf: pitchDeck.pdfBase64,
      pptx: pitchDeck.pptxBase64
    }
  });
}
```

**H6:30-H7:00 | Cloudflare MCP for Edge Caching**
```typescript
// lib/mcp/cloudflare.ts
import { MCPClient } from '@anthropic/mcp-client';

export async function cacheGenerationOnEdge(brandId: string, data: Brand) {
  const cloudflare = new MCPClient({
    url: process.env.CLOUDFLARE_MCP_URL!,
    auth: {
      token: process.env.CLOUDFLARE_API_TOKEN!
    }
  });

  // Cache brand data in KV
  await cloudflare.call('kv:set', {
    namespace: 'MACHUPS_BRANDS',
    key: brandId,
    value: JSON.stringify(data),
    expirationTtl: 86400 // 24 hours
  });

  // Cache logos in R2
  for (const logo of data.logos) {
    await cloudflare.call('r2:upload', {
      bucket: 'machups-assets',
      key: `${brandId}/${logo.type}.png`,
      data: logo.png
    });
  }
}
```

---

### HOUR 7-9: Blockchain Integration (6:30 PM - 8:30 PM)

**CODE FREEZE at 6:30 PM** (submissions open)

**H7:00-H7:30 | Deploy NFT Contract on Monad Mainnet**
```solidity
// contracts/MACHUPSCertificate.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

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

    constructor() ERC721("MACHUPS Certificate", "MACHUPS") {}

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

    function _setTokenURI(uint256 tokenId, string memory uri) internal {
        require(_exists(tokenId), "Token does not exist");
        _tokenURIs[tokenId] = uri;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId), "Token does not exist");
        return _tokenURIs[tokenId];
    }

    function getUserBrands(address user)
        public
        view
        returns (uint256[] memory)
    {
        return _userBrands[user];
    }
}
```

Deploy script:
```bash
# Using Foundry
forge create --rpc-url $MONAD_RPC_URL \
  --private-key $PRIVATE_KEY_DEPLOYER \
  --verify \
  contracts/MACHUPSCertificate.sol:MACHUPSCertificate
```

**H7:30-H8:30 | NFT Minting Integration**
```typescript
// lib/blockchain/nft-contract.ts
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_KEY!
});

export async function mintBrandNFT(
  recipientAddress: string,
  brand: Brand
) {
  // Upload metadata to IPFS
  const metadata = {
    name: `${brand.name} - MACHUPS Genesis`,
    description: `Brand generated at Monad Blitz SF #18 on ${new Date().toISOString()}`,
    image: await uploadToIPFS(brand.logos[0].png),
    attributes: [
      { trait_type: "Event", value: "Monad Blitz SF #18" },
      { trait_type: "Brand Name", value: brand.name },
      { trait_type: "Generated Date", value: new Date().toISOString() },
      { trait_type: "Primary Color", value: brand.tokens.color.brand.primary.$value },
      { trait_type: "Style", value: brand.analysis.style },
      { trait_type: "Generation Time", value: `${brand.metadata.generationTime}s` }
    ]
  };

  const metadataURI = await uploadToIPFS(JSON.stringify(metadata));

  // Mint NFT
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.PRIVATE_KEY_MINTER!,
    "monad",
    { clientId: process.env.THIRDWEB_CLIENT_ID! }
  );

  const contract = await sdk.getContract(
    process.env.NFT_CONTRACT_ADDRESS!
  );

  const tx = await contract.call(
    "mintBrandCertificate",
    [recipientAddress, metadataURI]
  );

  return {
    tokenId: tx.receipt.events.find(e => e.event === 'BrandMinted')?.args.tokenId,
    transactionHash: tx.receipt.transactionHash,
    metadataURI
  };
}

async function uploadToIPFS(data: string | Buffer) {
  // Use Thirdweb's IPFS gateway
  const response = await fetch('https://storage.thirdweb.com/ipfs/upload', {
    method: 'POST',
    headers: {
      'X-Client-Id': process.env.THIRDWEB_CLIENT_ID!
    },
    body: data
  });

  const { IpfsHash } = await response.json();
  return `ipfs://${IpfsHash}`;
}
```

**H8:30-H9:00 | UI for Monad Address Collection**
```typescript
// app/page.tsx - Add address input
<div className="mb-lg">
  <label className="form-label">
    Your Monad Mainnet Address (for NFT airdrop)
  </label>
  <input
    type="text"
    placeholder="0x..."
    pattern="^0x[a-fA-F0-9]{40}$"
    required
    className="form-input"
    value={monadAddress}
    onChange={(e) => setMonadAddress(e.target.value)}
  />
  <p className="text-sm text-muted mt-sm">
    You'll receive a commemorative NFT on Monad Mainnet after generation
  </p>
</div>
```

---

### HOUR 9-10: Documentation & Deployment (8:30 PM - 9:30 PM)

**H9:00-H9:30 | Docusaurus Sites**

Create `docs.machups.com`:
```bash
cd docs
npx create-docusaurus@latest docs classic
```

```markdown
// docs/docs/intro.md
# MACHUPS Documentation

## What is MACHUPS?

MACHUPS is an AI-powered brand generation platform that creates complete brand packages in under 3 minutes.

## What You Get

- 3 logo variations (PNG & SVG)
- W3C DTCG design tokens
- Production-ready React components
- 20-page brand guidelines PDF
- Commemorative NFT on Monad

## Quick Start

1. Visit [machups.com](https://machups.com)
2. Enter your business idea
3. Select style preferences
4. Provide Monad address for NFT
5. Click "Generate Brand"
6. Wait 2-3 minutes
7. Download complete package

## Premium Features

- **Pitch Deck**: 10-slide investor deck (0.01 MON via x402)
- **A/B Variants**: 3 design variations for testing (0.005 MON)
```

Create `design.machups.com`:
```bash
cd design-site
npx create-docusaurus@latest design-site classic
```

```markdown
// design-site/docs/tokens.md
# Design Token System

MACHUPS uses W3C Design Token Community Group (DTCG) format.

## Token Categories

### Colors
- Brand colors (primary, secondary)
- Semantic colors (success, error, warning)
- Neutral grays (50-900)

### Typography
- Font families (heading, body)
- Font sizes (xs, sm, base, lg, xl, 2xl)
- Font weights (normal, medium, semibold, bold)

### Spacing
- Based on 8-point grid
- Sizes: xs, sm, md, lg, xl, 2xl

### Border Radius
- sm, md, lg, full

## Export Formats

- JSON (W3C DTCG)
- CSS Variables
- Tailwind Config
- SCSS Variables
```

**H9:30-H10:00 | Final Deployment**
```bash
# Deploy to Vercel
vercel --prod

# Deploy docs sites
cd docs && vercel --prod
cd design-site && vercel --prod

# Configure DNS
# machups.com → Vercel
# docs.machups.com → Vercel
# design.machups.com → Vercel
```

---

## HOUR 10: DEMO PREP & SUBMISSION (9:00 PM - 9:30 PM)

### Demo Script (3 minutes)

**:00-:15 | Hook & Problem**
"Traditional branding takes weeks and costs thousands. Design agencies charge $5k-50k. Figma templates take hours to customize. We eliminate all of that."

**:15-:45 | Live Demo**
"Watch this. I'm generating a complete brand in 3 minutes."

[Types: "Sustainable coffee delivery service"]
[Selects: Modern style, React + TypeScript]
[Enters: Monad address]
[Clicks: Generate]

**:45 | Show Real-Time Progress**
- ✅ Analyzing business idea... (Claude AI)
- ✅ Generating color palette...
- ✅ Creating HTML/CSS logos... (3 variants)
- ✅ Exporting design tokens... (W3C DTCG)
- ✅ Generating React components... (5 components)
- ✅ Creating brand guidelines... (20-page PDF)
- ✅ Minting NFT certificate... (Monad)

**1:45-2:15 | Show Results**
[Download ZIP, extract, show]:
- Logos (PNG & SVG)
- Design tokens (JSON + Tailwind config)
- React components (production-ready)
- Brand guidelines PDF (professional)

**2:15-2:45 | Premium Features**
"Want a pitch deck? Click here, pay 0.01 MON via x402..."
[Show x402 payment flow]
[Generate 10-slide deck instantly]

**2:45-3:00 | Monad Integration**
"Every brand gets an NFT certificate on Monad Mainnet."
[Show NFT on block explorer]
[Show OpenSea listing]

"Complete brand in 3 minutes. From idea to production-ready assets. Built on Monad."

---

### Submission Checklist

- [ ] **Repository**: https://github.com/4eckd/monad-blitz-sf forked
- [ ] **README.md** updated with:
  - Project description
  - Tech stack
  - Live demo link
  - Setup instructions
  - Team members
- [ ] **Deployed** to machups.com
- [ ] **Smart contract** deployed on Monad Mainnet
- [ ] **Contract verified** on Monad Explorer
- [ ] **Demo video** recorded (2-3 minutes)
- [ ] **Screenshots** captured for backup
- [ ] **Environment variables** documented (without secrets)
- [ ] **Submit** at https://blitz.devnads.com/

---

## 🎯 SUCCESS METRICS

### Must-Have (P0)
- ✅ Brand generation works end-to-end
- ✅ Logos export (PNG & SVG)
- ✅ Design tokens export
- ✅ Components export
- ✅ NFT mints on Monad
- ✅ Deployed to production

### Nice-to-Have (P1)
- ✅ x402 payment for premium
- ✅ Pitch deck generator
- ✅ Brand guidelines PDF
- ✅ Multiple tech stack support
- ✅ Docusaurus documentation

### Stretch Goals (P2)
- Penpot MCP sync
- A/B variant generator
- Component preview
- Export to GitHub repo
- Jira integration for tracking

---

## 🚨 RISK MITIGATION

### If Running Behind

**Cut in this order:**
1. ❌ A/B variant generator
2. ❌ Penpot MCP integration
3. ❌ Jira MCP tracking
4. ❌ GitHub repo export
5. ❌ Multiple CSS framework exports (keep Tailwind only)

**Always Keep:**
- ✅ Core generation (logos, tokens, components)
- ✅ NFT minting (Monad integration)
- ✅ x402 premium feature (showcase payments)
- ✅ Clean UI with good UX

### Common Issues

**Claude API Rate Limits:**
- Cache responses locally
- Use smaller prompts
- Implement retry logic

**Blockchain Issues:**
- Test extensively on testnet first
- Have faucet MON ready
- Keep private keys secure in .env (NOT committed)

**Deployment Issues:**
- Use Vercel for simplicity
- Test build locally first: `pnpm build`
- Check environment variables

---

## 📦 FINAL DELIVERABLES

1. **Live App**: https://machups.com
2. **Documentation**: https://docs.machups.com
3. **Design System**: https://design.machups.com
4. **GitHub Repo**: https://github.com/4eckd/monad-blitz-sf
5. **Demo Video**: 3-minute walkthrough
6. **Smart Contract**: Verified on Monad Explorer
7. **Submission**: Completed at https://blitz.devnads.com/

---

## 🏁 EXECUTION PHILOSOPHY

**Ship fast. Cut scope, not quality.**

- Focus on core value: 3-minute brand generation
- Logos must be perfect (they're the hero feature)
- NFT must work (Monad integration proof)
- x402 must work (payment showcase)
- UI must be clean (first impressions matter)

**Everything else is negotiable.**

---

## 🎯 CRITICAL DEVELOPMENT GUIDELINES

### Repository Rules (MUST FOLLOW)

**✅ ALWAYS:**
- Commit ONLY to https://github.com/4eckd/monad-blitz-sf
- Follow the design system (NO inline CSS/HTML)
- Check branch safety before merging
- Verify merge order is correct
- Delete branches ONLY after safe merge

**❌ NEVER:**
- Commit to wrong repository
- Use inline styles (use Tailwind utility classes)
- Use inline HTML (use React components)
- Delete branches before merge verification
- Open PRs without checking dependencies

### Git Workflow

```bash
# Always verify remote before committing
git remote -v
# Should show:
# origin  https://github.com/4eckd/monad-blitz-sf.git

# Create feature branch
git checkout -b feature/your-feature

# Make changes, commit
git add .
git commit -m "type(scope): description"

# Push to YOUR repository
git push origin feature/your-feature

# Create PR (check dependencies first!)
# Merge only when:
# 1. All checks pass
# 2. Code reviewed
# 3. No merge conflicts
# 4. Dependent PRs merged first

# After merge, delete branch
git branch -d feature/your-feature
git push origin --delete feature/your-feature
```

### Design System Compliance

**❌ WRONG - Inline CSS:**
```tsx
<div style={{ color: '#0066FF', padding: '16px' }}>
  Bad practice
</div>
```

**✅ CORRECT - Design System:**
```tsx
<div className="text-brand-primary p-md">
  Uses design tokens
</div>
```

**❌ WRONG - Inline HTML:**
```tsx
return (
  <div>
    <h1>Title</h1>
    <button style={{ background: 'blue' }}>Click</button>
  </div>
);
```

**✅ CORRECT - React Components:**
```tsx
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';

return (
  <div>
    <Heading level={1}>Title</Heading>
    <Button variant="primary">Click</Button>
  </div>
);
```

### Branch Merge Safety Checklist

Before merging ANY branch:

- [ ] All CI checks pass
- [ ] Code review approved
- [ ] No merge conflicts
- [ ] Dependent features merged first
- [ ] Tests pass locally
- [ ] Build succeeds
- [ ] Documentation updated

Before deleting ANY branch:

- [ ] Merged to target branch
- [ ] CI confirms merge success
- [ ] No pending PRs depend on it
- [ ] Local branch deleted first
- [ ] Remote branch deleted last

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Tests
- `chore`: Build/tooling

**Examples:**
```
feat(generator): add logo generation with HTML/CSS
fix(tokens): correct color accessibility calculation
docs(readme): update installation instructions
style(components): format button component
refactor(api): simplify brand generation logic
perf(cache): add edge caching with Cloudflare
test(nft): add minting tests
chore(deps): update dependencies
```

### Code Quality Standards

**TypeScript:**
- Use strict mode
- No `any` types
- Proper interfaces for all data structures
- Document complex functions with JSDoc

**React:**
- Functional components only
- Use hooks appropriately
- Keep components small (<200 lines)
- Extract reusable logic to hooks

**Styling:**
- Tailwind utility classes ONLY
- No inline styles
- Follow design token system
- Responsive mobile-first

**Performance:**
- Lazy load components when possible
- Optimize images (WebP, proper sizing)
- Use React.memo for expensive components
- Implement proper loading states

### Security Checklist

- [ ] No API keys in code (use env vars)
- [ ] No private keys committed
- [ ] Input validation on all forms
- [ ] Sanitize user input
- [ ] HTTPS only
- [ ] Rate limiting on API routes
- [ ] CORS properly configured

### Pre-Commit Checklist

Before EVERY commit:

- [ ] Code follows design system
- [ ] No inline CSS/HTML
- [ ] TypeScript compiles
- [ ] ESLint passes
- [ ] Tests pass (if applicable)
- [ ] No console.logs
- [ ] No commented code
- [ ] Documentation updated

### Pre-Merge Checklist

Before EVERY merge:

- [ ] Branch is up to date with target
- [ ] All conflicts resolved
- [ ] CI/CD passes
- [ ] Code reviewed
- [ ] Testing complete
- [ ] Documentation updated
- [ ] CHANGELOG.md updated

### Emergency Rollback

If something breaks after merge:

```bash
# Revert the merge
git revert -m 1 <merge-commit-hash>

# Push revert
git push origin main

# Create hotfix branch
git checkout -b hotfix/issue-description

# Fix, test, commit
git add .
git commit -m "hotfix: description of fix"

# Push and create PR
git push origin hotfix/issue-description
```

---

## 📚 REFERENCE LINKS

**Repository:**
- Main: https://github.com/4eckd/monad-blitz-sf
- Upstream: https://github.com/monad-developers/monad-blitz-sf

**Documentation:**
- [README.md](README.md) - Project overview
- [QUICKSTART.md](QUICKSTART.md) - Quick setup guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [SECURITY.md](SECURITY.md) - Security policies
- [CHANGELOG.md](CHANGELOG.md) - Version history

**Design System:**
- [components.json](components.json) - Component registry
- [tailwind.config.ts](tailwind.config.ts) - Design tokens
- [prompts/brand-generation.md](prompts/brand-generation.md) - AI prompts

**Planning:**
- [blitz/plans/DETAILED_PLAN.md](blitz/plans/DETAILED_PLAN.md) - Complete plan
- [blitz/plans/QUICKSTART.md](blitz/plans/QUICKSTART.md) - Quick reference
- [docs/SETUP_COMPLETE.md](docs/SETUP_COMPLETE.md) - Setup status

---

Good luck! 🚀
