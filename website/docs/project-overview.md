---
sidebar_position: 2
title: Project Overview
---

# MACHUPS - Complete Project Overview

**Last Updated:** December 5, 2025
**Event:** Monad Blitz SF #18 - December 6, 2025
**Duration:** 11 hours (11:30 AM - 10:30 PM PST)
**Team:** Fused Gaming Development

---

## Executive Summary

**MACHUPS** is an AI-powered brand generation platform that creates complete, production-ready brand packages in under 3 minutes. Built for Monad Blitz SF #18, MACHUPS showcases the power of AI, blockchain, and modern web technologies working together.

### What We Generate

1. **Visual Identity**
   - 3 professional logo variations (wordmark, icon, combination)
   - Complete color palette (12-15 colors, WCAG AA compliant)
   - Typography system with font pairings
   - Export formats: PNG, SVG, PDF

2. **Design System**
   - W3C DTCG-compliant design tokens
   - Animation tokens (transitions, hover effects)
   - Export formats: JSON, CSS, SCSS, Tailwind
   - Semantic naming and structure

3. **Component Library**
   - 30+ production-ready React components
   - TypeScript + Tailwind CSS
   - Accessible (ARIA, keyboard navigation, WCAG AA)
   - Framer Motion animations

4. **Documentation**
   - Complete Docusaurus site
   - Component usage examples
   - Brand guidelines PDF (20 pages)
   - Interactive design system docs

5. **Blockchain Integration**
   - Commemorative NFT certificate on Monad
   - x402 micropayments for premium features
   - On-chain generation proof

---

## Architecture Overview

### Multi-Site Architecture

```
MACHUPS Ecosystem
├── app.machups.com           # Main brand generation app
├── docs.machups.com          # Project documentation
├── design.machups.com        # Design system showcase
└── wallet.machups.com        # NFT certificate manager
```

### Technology Stack

**Frontend**
- Next.js 15.1.0 (App Router)
- React 19.0.0
- TypeScript 5.9
- Tailwind CSS 3.4
- Framer Motion 12.23

**AI & Generation**
- Claude Sonnet 4.5 (Anthropic)
- Custom prompt engineering
- Streaming responses
- Parallel generation pipelines

**Blockchain**
- Monad Mainnet & Testnet
- thirdweb SDK 5.0
- ERC-721 NFT standard
- x402 payment protocol

**Documentation**
- Docusaurus 3.9
- MDX for interactive docs
- Custom React components
- Live code examples

**Deployment**
- Vercel (all sites)
- GitHub Actions (CI/CD)
- Cloudflare CDN
- IPFS (NFT metadata)

---

## Project Timeline

### Phase 0: Pre-Event Setup (Completed)
✅ Repository initialization
✅ Tech stack configuration
✅ Documentation framework
✅ Domain configuration
✅ Planning documents

### Phase 1: Foundation (H0-H3) - Event Day
- [ ] AI integration testing
- [ ] Logo generation pipeline
- [ ] Color palette generator
- [ ] Typography system
- [ ] Design token generator

### Phase 2: Core Features (H3-H7)
- [ ] React component generator
- [ ] Docusaurus site generator
- [ ] Brand guidelines PDF
- [ ] Export utilities
- [ ] ZIP packaging

### Phase 3: Blockchain (H7-H9)
- [ ] Deploy NFT contract to Monad
- [ ] NFT minting integration
- [ ] x402 payment implementation
- [ ] IPFS metadata uploads
- [ ] Wallet connection UI

### Phase 4: Polish & Deploy (H9-H11)
- [ ] UI/UX refinement
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] Production deployment
- [ ] Demo preparation

---

## Detailed Feature Breakdown

### 1. Brand Generation Pipeline

**Input:**
```typescript
{
  businessIdea: string;        // "Sustainable coffee delivery"
  targetAudience: string;      // "Urban professionals 25-40"
  style: 'modern' | 'classic' | 'bold' | 'minimal';
  techStack: 'react' | 'vue' | 'html';
  features: string[];          // Additional features
  walletAddress?: string;      // For NFT minting
}
```

**Process:**
1. **AI Analysis** (30s)
   - Claude analyzes business idea
   - Extracts brand personality
   - Determines color mood
   - Suggests typography

2. **Parallel Generation** (90s)
   - Logos (3 variations)
   - Color palette (12-15 colors)
   - Design tokens (W3C DTCG)
   - Component library (30+ components)

3. **Documentation** (30s)
   - Docusaurus site generation
   - Brand guidelines PDF
   - Usage examples

4. **Packaging** (15s)
   - ZIP file creation
   - IPFS uploads
   - NFT minting (if wallet provided)

5. **Delivery** (5s)
   - Download URL
   - Documentation URL
   - NFT transaction hash

**Total Time:** ~3 minutes

### 2. Design Token System

**W3C DTCG Compliance**

All tokens follow the W3C Design Token Community Group format:

```json
{
  "$schema": "https://design-tokens.org/schema/version/1.0.0",
  "color": {
    "brand": {
      "primary": {
        "$value": "#0066FF",
        "$type": "color",
        "$description": "Primary brand color"
      }
    }
  },
  "typography": {
    "font-family": {
      "heading": {
        "$value": "Poppins, sans-serif",
        "$type": "fontFamily"
      }
    }
  }
}
```

**Export Formats:**
- JSON (W3C DTCG)
- CSS Custom Properties
- SCSS Variables
- Tailwind Config
- Style Dictionary compatible

### 3. Component Library

**30+ Production-Ready Components**

**Base Components:**
- Button (5 variants)
- Input (text, email, password, textarea)
- Card (basic, elevated, outlined)
- Badge (status, count)
- Progress (bar, circle, dots)

**Layout Components:**
- Header (fixed, sticky, transparent)
- Footer (simple, detailed)
- Navigation (horizontal, vertical, mega)
- Sidebar (collapsible, fixed)
- Grid (responsive, masonry)

**Interactive Components:**
- Modal (basic, form, confirmation)
- Dropdown (select, menu, autocomplete)
- Tabs (basic, pills, vertical)
- Accordion (single, multiple)
- Toast (success, error, warning, info)

**Advanced Components:**
- Data Table (sortable, filterable, paginated)
- Form Builder (dynamic, validation)
- Chart (line, bar, pie - via Recharts)
- Calendar (date picker, range)
- File Upload (drag-drop, preview)

**Web3 Components:**
- Wallet Connect Button
- Network Switcher
- NFT Display Card
- Transaction Status
- Balance Display

**Features:**
- TypeScript definitions
- ARIA labels and roles
- Keyboard navigation
- Responsive design
- Dark mode support
- Framer Motion animations
- Storybook-ready

### 4. NFT Certificate System

**Smart Contract: MACHUPSCertificate**

```solidity
// ERC-721 NFT on Monad
contract MACHUPSCertificate {
  // Mint certificate for brand generation
  function mintCertificate(
    address recipient,
    string memory tokenURI,
    string memory brandId
  ) public onlyOwner returns (uint256);

  // Prevent duplicate certificates
  mapping(string => uint256) private _brandIdToTokenId;

  // Track user's certificates
  mapping(address => uint256[]) private _ownedTokens;
}
```

**Metadata Structure:**

```json
{
  "name": "BrandName - MACHUPS Certificate",
  "description": "Brand generated at Monad Blitz SF #18 on Dec 6, 2025",
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

**Networks:**
- **Monad Testnet:** Development and testing
- **Monad Mainnet:** Production certificates

### 5. Premium Features (x402 Micropayments)

**Pitch Deck Generator** - 0.01 MON (~$0.20)
- 10-slide investor deck
- Branded styling
- Export: PDF + PPTX

**A/B Testing Variants** - 0.005 MON (~$0.10)
- 3 design variations
- Side-by-side comparison
- Testing setup code

**Custom Domain** - 0.02 MON (~$0.40)
- Permanent documentation hosting
- Custom subdomain
- SSL certificate

---

## API Reference

### Generation API

**POST /api/generate**

Request:
```json
{
  "businessIdea": "Sustainable coffee delivery for urban professionals",
  "targetAudience": "Urban professionals 25-40",
  "style": "modern",
  "techStack": "react",
  "features": ["dark-mode", "animations", "responsive"],
  "walletAddress": "0x..." // Optional
}
```

Response:
```json
{
  "jobId": "uuid-v4",
  "estimatedTime": 180,
  "websocketUrl": "wss://app.machups.com/api/ws/uuid-v4"
}
```

**GET /api/status/[jobId]**

Response:
```json
{
  "status": "processing",
  "progress": 45,
  "currentStep": "Generating components...",
  "estimatedTimeRemaining": 90,
  "result": null
}
```

**GET /api/download/[jobId]**

Returns: ZIP file with complete brand package

### NFT API

**POST /api/nft/mint**

Request:
```json
{
  "brandId": "uuid-v4",
  "walletAddress": "0x..."
}
```

Response:
```json
{
  "transactionHash": "0x...",
  "tokenId": "123",
  "explorerUrl": "https://explorer.monad.xyz/tx/0x...",
  "nftUrl": "https://wallet.machups.com/collection/123"
}
```

---

## Deployment Strategy

### Multi-Stage Deployment

**Development**
- Branch: `develop`
- Environment: Development
- Domain: dev.machups.com
- Network: Monad Testnet

**Staging**
- Branch: `staging`
- Environment: Staging
- Domain: staging.machups.com
- Network: Monad Testnet

**Production**
- Branch: `main`
- Environment: Production
- Domains:
  - app.machups.com
  - docs.machups.com
  - design.machups.com
  - wallet.machups.com
- Network: Monad Mainnet

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main, staging, develop]

jobs:
  build:
    - ESLint
    - TypeScript check
    - TruffleHog security scan
    - Build Next.js
    - Build Docusaurus

  deploy:
    - Deploy to Vercel
    - Update DNS records
    - Run E2E tests
    - Notify team
```

---

## Performance Targets

### Core Web Vitals

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Generation Performance

- **Brand Analysis:** < 30s
- **Logo Generation:** < 60s
- **Component Generation:** < 45s
- **Documentation Build:** < 30s
- **Total Generation:** < 3 minutes

### Application Performance

- **Bundle Size:** < 300KB (gzipped)
- **Time to Interactive:** < 3s
- **API Response Time:** < 200ms
- **WebSocket Latency:** < 50ms

---

## Security Measures

### Code Security

✅ **TruffleHog** - Secret scanning
✅ **ESLint** - Code quality
✅ **TypeScript** - Type safety
✅ **Dependabot** - Dependency updates

### Blockchain Security

✅ **Smart contract auditing** (internal)
✅ **Testnet testing before mainnet**
✅ **Private key management** (env vars)
✅ **Rate limiting on minting**

### Application Security

✅ **Input validation**
✅ **CORS policies**
✅ **Rate limiting**
✅ **HTTPS only**
✅ **CSP headers**

---

## Success Metrics

### Event Success Criteria

**Must-Have (P0):**
- ✅ Brand generation works end-to-end
- ✅ Logos export in PNG & SVG
- ✅ Design tokens export in 4 formats
- ✅ Components export as React code
- ✅ NFT mints on Monad
- ✅ Deployed to production

**Nice-to-Have (P1):**
- ⏳ x402 payment integration
- ⏳ Pitch deck generator
- ⏳ Brand guidelines PDF
- ⏳ Multiple tech stack support
- ⏳ Docusaurus site generation

**Stretch Goals (P2):**
- ⏳ A/B variant generator
- ⏳ Component preview playground
- ⏳ GitHub repo export
- ⏳ Penpot file generation

### Demo Metrics

- **Generation Time:** < 3 minutes ✅
- **Components Generated:** 30+ ✅
- **Documentation Pages:** 20+ ✅
- **Export Formats:** 4+ ✅
- **NFT Mint Time:** < 30 seconds ✅

---

## Team Roles & Responsibilities

### Development Team
- **Lead Developer:** Full-stack implementation
- **AI Engineer:** Prompt engineering, Claude integration
- **Blockchain Developer:** Smart contracts, NFT minting
- **UI/UX Designer:** Component design, brand guidelines

### Event Day Schedule

**11:30 AM - 12:00 PM:** Team sync, environment setup
**12:00 PM - 3:00 PM:** Core generation pipeline
**3:00 PM - 6:00 PM:** Component library & docs
**6:00 PM - 8:00 PM:** Blockchain integration
**8:00 PM - 9:30 PM:** Testing, polish, deployment
**9:30 PM - 10:00 PM:** Demo prep & submission
**10:00 PM - 10:30 PM:** Final demo & presentations

---

## Resources & Links

### Documentation
- [README.md](https://github.com/4eckd/monad-blitz-sf/blob/main/README.md)
- [Quick Start Guide](./quickstart)
- [Installation Guide](./installation)
- [API Reference](./api/overview)

### Planning
- [Detailed Plan (CLAUDE.md)](https://github.com/4eckd/monad-blitz-sf/blob/main/CLAUDE.md)
- [Wallet Integration Plan](https://github.com/4eckd/monad-blitz-sf/blob/main/docs/WALLET_INTEGRATION_PLAN.md)
- [App Structure](https://github.com/4eckd/monad-blitz-sf/blob/main/docs/APP_STRUCTURE.md)
- [Workflow Diagrams](https://github.com/4eckd/monad-blitz-sf/blob/main/docs/workflows/MERMAID_DIAGRAMS.md)

### External Resources
- [Monad Documentation](https://docs.monad.xyz/)
- [thirdweb Documentation](https://portal.thirdweb.com/)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Docusaurus](https://docusaurus.io/)
- [W3C DTCG](https://design-tokens.github.io/community-group/)

### Live Sites
- [Main App](https://app.machups.com) (TBD)
- [Documentation](https://docs.machups.com) ✅
- [Design System](https://design.machups.com) (TBD)
- [Wallet Manager](https://wallet.machups.com) (TBD)

---

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/4eckd/monad-blitz-sf/blob/main/CONTRIBUTING.md) for details.

### Quick Links
- [Code of Conduct](https://github.com/4eckd/monad-blitz-sf/blob/main/CODE_OF_CONDUCT.md)
- [Security Policy](https://github.com/4eckd/monad-blitz-sf/blob/main/SECURITY.md)
- [Changelog](https://github.com/4eckd/monad-blitz-sf/blob/main/CHANGELOG.md)

---

## License

MIT License - see [LICENSE](https://github.com/4eckd/monad-blitz-sf/blob/main/LICENSE) for details.

---

## Acknowledgments

**Built for:** Monad Blitz SF #18 - December 6, 2025
**Team:** Fused Gaming Development Team

**Special Thanks:**
- Anthropic (Claude AI)
- Monad Labs
- thirdweb
- Vercel
- Open Source Community

---

---

**⚡ Powered by Monad | 🎨 Designed with AI | 🚀 Built for Innovation**

*From Idea to Brand in 3 Minutes*

[Generate Your Brand →](https://app.machups.com)
