---
sidebar_position: 2
title: Architecture & Planning
---

# MACHUPS Architecture & Planning

Complete technical planning and architecture documentation.

---

## Multi-Site Architecture

MACHUPS is built as a multi-site ecosystem:

### 🌐 app.machups.com
**Purpose:** Main brand generation application

**Stack:**
- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS + Framer Motion
- thirdweb SDK (Web3)

**Key Features:**
- Brand generation form
- Real-time progress updates
- Results preview
- ZIP download
- NFT minting

[View Complete Structure →](../../APP_STRUCTURE.md)

---

### 📚 docs.machups.com
**Purpose:** Project documentation (this site)

**Stack:**
- Docusaurus 3.9
- MDX for interactive docs
- Custom React components

**Key Features:**
- Getting started guides
- API reference
- Technical documentation
- Planning documents

**Status:** ✅ Live

---

### 🎨 design.machups.com
**Purpose:** Design system showcase

**Stack:**
- Docusaurus 3.9
- Custom components
- Live code playground

**Key Features:**
- Interactive color palette
- Component documentation
- Live code examples
- Token viewer
- Brand guidelines

**Dynamic Subdomains:**
- `[brand-id].design.machups.com` for each generated brand

[View Complete Structure →](../../DESIGN_SITE_STRUCTURE.md)

---

### 💎 wallet.machups.com
**Purpose:** NFT certificate manager

**Stack:**
- Next.js 15
- thirdweb SDK
- Monad blockchain

**Key Features:**
- NFT collection viewer
- Certificate details
- Claiming unclaimed NFTs
- Admin dashboard
- Contract analytics

[View Complete Structure →](../../WALLET_SITE_STRUCTURE.md)

---

## System Architecture

### High-Level Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     User Input Form                          │
│  (Business idea, style, tech stack, wallet address)         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  Generation Pipeline                         │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Claude AI  │───▶│   Analysis   │───▶│  Extraction  │ │
│  │  Sonnet 4.5  │    │  & Planning  │    │  & Parsing   │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Parallel Generation Tasks                    │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │  1. Logo Generation (3 variants)                       │ │
│  │  2. Color Palette (12-15 colors)                       │ │
│  │  3. Typography System                                  │ │
│  │  4. Design Tokens (W3C DTCG)                           │ │
│  │  5. Component Library (30+ components)                 │ │
│  │  6. Documentation (Docusaurus)                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Package    │───▶│  Upload to   │───▶│  Mint NFT    │ │
│  │   to ZIP     │    │   Storage    │    │  (Monad)     │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                     Deliverables                             │
│                                                              │
│  • ZIP Download URL                                         │
│  • Documentation Site URL                                   │
│  • NFT Transaction Hash                                     │
│  • Component Preview                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### 1. Design Token Flow

```
Brand Analysis
      ↓
W3C DTCG Tokens
      ↓
   ┌──┴──┬──────┬────────┐
   ↓     ↓      ↓        ↓
  JSON  CSS  SCSS  Tailwind
   ↓     ↓      ↓        ↓
      Components
           ↓
      User's App
```

### 2. NFT Metadata Flow

```
Brand Generated
      ↓
Create Metadata (JSON)
      ↓
Upload to IPFS
      ↓
Get IPFS Hash (ipfs://Qm...)
      ↓
Call Smart Contract
      ↓
Mint NFT to Wallet
      ↓
Return Token ID
```

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.1.0 | React framework with App Router |
| React | 19.0.0 | UI library |
| TypeScript | 5.9 | Type safety |
| Tailwind CSS | 3.4 | Utility-first styling |
| Framer Motion | 12.23 | Animations |

### AI & Generation

| Technology | Purpose |
|------------|---------|
| Claude Sonnet 4.5 | Primary LLM for brand analysis |
| Custom Prompts | Engineered prompts for consistent output |
| Streaming | Real-time response streaming |

### Blockchain

| Technology | Purpose |
|------------|---------|
| Monad | L1 blockchain for NFT minting |
| thirdweb SDK 5.0 | Web3 SDK for wallet & contracts |
| ERC-721 | NFT standard |
| x402 Protocol | Micropayments (optional) |

### Documentation

| Technology | Purpose |
|------------|---------|
| Docusaurus 3.9 | Documentation framework |
| MDX | Interactive documentation |
| React Components | Custom doc components |

### Deployment

| Service | Purpose |
|---------|---------|
| Vercel | Hosting (all sites) |
| GitHub Actions | CI/CD pipeline |
| Cloudflare | CDN |
| IPFS | NFT metadata storage |

---

## Database Schema

### Brands Table

```sql
CREATE TABLE brands (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  business_idea TEXT NOT NULL,
  style VARCHAR(50) NOT NULL,

  -- Brand attributes
  tagline VARCHAR(255),
  primary_color VARCHAR(7),
  secondary_color VARCHAR(7),

  -- Assets
  logos_url TEXT,
  tokens_url TEXT,
  components_url TEXT,
  docs_url TEXT,

  -- NFT
  nft_token_id INTEGER,
  nft_transaction_hash VARCHAR(66),
  wallet_address VARCHAR(42),

  -- Metadata
  generation_time INTEGER, -- seconds
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### NFT Metadata

```json
{
  "name": "Brand Name - MACHUPS Certificate",
  "description": "Brand generated at Monad Blitz SF #18",
  "image": "ipfs://Qm.../logo.png",
  "attributes": [
    { "trait_type": "Event", "value": "Monad Blitz SF #18" },
    { "trait_type": "Brand Name", "value": "..." },
    { "trait_type": "Generated Date", "value": "2025-12-06" },
    { "trait_type": "Primary Color", "value": "#0066FF" },
    { "trait_type": "Style", "value": "modern" },
    { "trait_type": "Generation Time", "value": "175s" }
  ]
}
```

---

## API Design

### Generation API

**POST /api/generate**

```typescript
// Request
{
  businessIdea: string;
  targetAudience: string;
  style: 'modern' | 'classic' | 'bold' | 'minimal';
  techStack: 'react' | 'vue' | 'html';
  features: string[];
  walletAddress?: string;
}

// Response
{
  jobId: string;
  estimatedTime: number;
  websocketUrl: string;
}
```

**GET /api/status/[jobId]**

```typescript
// Response
{
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number; // 0-100
  currentStep: string;
  estimatedTimeRemaining: number;
  result?: {
    downloadUrl: string;
    docsUrl: string;
    nftTokenId?: string;
  };
}
```

[View Complete API Reference →](/docs/api/overview)

---

## Smart Contract

### MACHUPSCertificate (ERC-721)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MACHUPSCertificate is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => string) private _brandIds;
    mapping(string => uint256) private _brandIdToTokenId;

    function mintCertificate(
        address recipient,
        string memory tokenURI,
        string memory brandId
    ) public onlyOwner returns (uint256);

    function getBrandId(uint256 tokenId)
        public view returns (string memory);

    function totalSupply()
        public view returns (uint256);
}
```

**Networks:**
- Monad Testnet: For development & testing
- Monad Mainnet: For production certificates

---

## Workflow Diagrams

We've created 12 comprehensive Mermaid diagrams covering:

### User Workflows (3)
1. Brand Generation Flow (standard path)
2. Premium Feature Purchase Flow
3. NFT Certificate Claiming Flow

### Admin Workflows (2)
4. Contract Deployment Flow
5. Monitoring & Analytics Flow

### Application Flows (4)
6. Brand Generation Pipeline (internal)
7. Real-time Progress Updates (WebSocket)
8. Error Handling & Retry Logic
9. CI/CD Pipeline

### Deployment Flows (2)
10. Multi-Site Deployment
11. Emergency Rollback

### Data Flows (2)
12. Design Token Flow
13. NFT Metadata Flow

[View All Diagrams →](../../workflows/MERMAID_DIAGRAMS.md)

---

## Performance Targets

### Generation Performance

| Metric | Target | Notes |
|--------|--------|-------|
| Total Generation Time | < 3 minutes | End-to-end |
| Brand Analysis | < 30 seconds | Claude AI |
| Logo Generation | < 60 seconds | 3 variations |
| Component Generation | < 45 seconds | 30+ components |
| Documentation Build | < 30 seconds | Docusaurus |

### Core Web Vitals

| Metric | Target | Category |
|--------|--------|----------|
| LCP (Largest Contentful Paint) | < 2.5s | Good |
| FID (First Input Delay) | < 100ms | Good |
| CLS (Cumulative Layout Shift) | < 0.1 | Good |

### Application Performance

| Metric | Target |
|--------|--------|
| Bundle Size | < 300KB (gzipped) |
| Time to Interactive | < 3s |
| API Response Time | < 200ms |
| WebSocket Latency | < 50ms |

---

## Security Measures

### Code Security
- ✅ TruffleHog secret scanning
- ✅ ESLint code quality
- ✅ TypeScript type safety
- ✅ Dependabot updates

### Blockchain Security
- ✅ Smart contract testing
- ✅ Testnet before mainnet
- ✅ Private key management
- ✅ Rate limiting on minting

### Application Security
- ✅ Input validation
- ✅ CORS policies
- ✅ Rate limiting
- ✅ HTTPS only
- ✅ CSP headers

---

## Deployment Strategy

### Environments

| Environment | Branch | Domain | Network |
|-------------|--------|--------|---------|
| Development | `develop` | dev.machups.com | Testnet |
| Staging | `staging` | staging.machups.com | Testnet |
| Production | `main` | app.machups.com | Mainnet |

### CI/CD Pipeline

```yaml
on: [push]

jobs:
  build:
    - ESLint
    - TypeScript check
    - TruffleHog scan
    - Build Next.js
    - Build Docusaurus

  deploy:
    - Deploy to Vercel
    - Update DNS
    - Run E2E tests
    - Notify team
```

---

## Planning Documents

All comprehensive planning documentation:

| Document | Description | Word Count |
|----------|-------------|------------|
| [Wallet Integration](../../WALLET_INTEGRATION_PLAN.md) | Complete wallet & NFT setup | 3,500+ |
| [Workflow Diagrams](../../workflows/MERMAID_DIAGRAMS.md) | 12 Mermaid diagrams | - |
| [App Structure](../../APP_STRUCTURE.md) | app.machups.com structure | 4,000+ |
| [Design Site](../../DESIGN_SITE_STRUCTURE.md) | design.machups.com structure | 3,800+ |
| [Wallet Site](../../WALLET_SITE_STRUCTURE.md) | wallet.machups.com structure | 3,500+ |
| [Pre-Event Status](../../PRE_EVENT_STATUS.md) | Readiness report | 2,500+ |

**Total:** ~20,000 words of planning documentation

---

## Resources

### Internal Documentation
- [Master Build Plan (CLAUDE.md)](../../../CLAUDE.md)
- [README](../../../README.md)
- [Quick Start Guide](../quickstart)
- [Installation Guide](../installation)

### External Resources
- [Monad Documentation](https://docs.monad.xyz/)
- [thirdweb Portal](https://portal.thirdweb.com/)
- [Claude API Docs](https://docs.anthropic.com/)
- [W3C DTCG Spec](https://design-tokens.github.io/community-group/)
- [Docusaurus](https://docusaurus.io/)

---

**Ready to build? Check out the [Event Day Plan](./event-plan) →**
