---
sidebar_position: 1
title: Event Day Plan
---

# Monad Blitz SF #18 - Event Day Plan

**Date:** December 6, 2025
**Duration:** 11 hours (11:30 AM - 10:30 PM PST)
**Goal:** Build MACHUPS from 0 to production

---

## Timeline Overview

| Phase | Time | Duration | Focus |
|-------|------|----------|-------|
| **Phase 0** | 11:30 AM - 12:00 PM | 30 min | Setup & Sync |
| **Phase 1** | 12:00 PM - 3:00 PM | 3 hours | Foundation |
| **Phase 2** | 3:00 PM - 6:30 PM | 3.5 hours | Core Features |
| **Phase 3** | 6:30 PM - 8:30 PM | 2 hours | Blockchain |
| **Phase 4** | 8:30 PM - 10:30 PM | 2 hours | Deploy & Demo |

---

## Phase 0: Setup & Sync (30 minutes)

### 11:30 AM - 12:00 PM

**Objectives:**
- ✅ Team arrives and gets settled
- ✅ Environment verification
- ✅ API key confirmation
- ✅ Final planning review

**Checklist:**

```bash
# Verify repository
git status
git pull origin main

# Verify dependencies
pnpm install
pnpm dev  # Test dev server

# Verify environment variables
cat .env.local  # Check all keys present

# Test API connections
# - Claude API key works
# - thirdweb credentials valid
# - Monad RPC accessible
```

**Team Sync:**
- Review [CLAUDE.md](../../../CLAUDE.md) master plan
- Assign responsibilities
- Set communication channels
- Agree on cut-off decisions

---

## Phase 1: Foundation (3 hours)

### 12:00 PM - 3:00 PM

### Hour 1: AI Integration (12:00 PM - 1:00 PM)

**Goal:** Get Claude AI working for brand analysis

**Tasks:**
1. Set up Claude API client (`lib/ai/claude.ts`)
2. Create brand analysis prompt
3. Test with sample inputs
4. Implement response parsing

**Deliverable:**
```typescript
const analysis = await analyzeBrand({
  businessIdea: "Sustainable coffee delivery",
  targetAudience: "Urban professionals 25-40",
  style: "modern"
});
// Returns: { name, tagline, colors, typography, personality }
```

### Hour 2: Logo Generation (1:00 PM - 2:00 PM)

**Goal:** Generate 3 logo variations using HTML/CSS

**Tasks:**
1. Create logo generator (`lib/generators/logos.ts`)
2. Generate wordmark logo
3. Generate icon logo
4. Generate combination logo
5. Export to PNG & SVG

**Deliverable:**
```typescript
const logos = await generateLogos(brandAnalysis);
// Returns: [
//   { type: 'wordmark', png: Buffer, svg: string },
//   { type: 'icon', png: Buffer, svg: string },
//   { type: 'combination', png: Buffer, svg: string }
// ]
```

### Hour 3: Design Tokens (2:00 PM - 3:00 PM)

**Goal:** Generate W3C DTCG compliant design tokens

**Tasks:**
1. Create token generator (`lib/generators/tokens.ts`)
2. Generate color tokens
3. Generate typography tokens
4. Generate spacing tokens
5. Export to JSON, CSS, SCSS, Tailwind

**Deliverable:**
```json
{
  "$schema": "https://design-tokens.org/schema/version/1.0.0",
  "color": {
    "brand": {
      "primary": { "$value": "#0066FF", "$type": "color" }
    }
  }
}
```

**Phase 1 Checkpoint (3:00 PM):**
- ✅ Claude AI integration working
- ✅ Logo generation working (3 variations)
- ✅ Design tokens exporting (4 formats)

---

## Phase 2: Core Features (3.5 hours)

### 3:00 PM - 6:30 PM

### Hour 4: Component Generator (3:00 PM - 4:00 PM)

**Goal:** Generate React components from design tokens

**Tasks:**
1. Create component generator (`lib/generators/components.ts`)
2. Generate Button component
3. Generate Input component
4. Generate Card component
5. Generate 5 more essential components

**Deliverable:**
```typescript
const components = await generateComponents(tokens);
// Returns: [
//   { name: 'Button', code: '...', props: [...] },
//   { name: 'Input', code: '...', props: [...] },
//   ...
// ]
```

### Hour 5: More Components (4:00 PM - 5:00 PM)

**Goal:** Expand component library to 30+

**Tasks:**
1. Generate layout components (Header, Footer, Navigation)
2. Generate interactive components (Modal, Dropdown, Tabs)
3. Generate form components (FormField, Checkbox, Radio)
4. Generate feedback components (Toast, Alert, Progress)

**Deliverable:**
30+ production-ready React components with TypeScript

### Hour 6: Documentation Generation (5:00 PM - 6:00 PM)

**Goal:** Generate Docusaurus site for brand

**Tasks:**
1. Create docs generator (`lib/generators/documentation.ts`)
2. Generate component documentation pages
3. Generate design token pages
4. Generate brand guidelines pages
5. Build Docusaurus site

**Deliverable:**
Complete Docusaurus site ready for deployment

### Hour 7: Export & Packaging (6:00 PM - 6:30 PM)

**Goal:** Create downloadable ZIP package

**Tasks:**
1. Create ZIP packager (`lib/exporters/zip.ts`)
2. Package all logos
3. Package design tokens
4. Package components
5. Package documentation
6. Generate README

**Deliverable:**
```
brand-package.zip (ready for download)
```

**Phase 2 Checkpoint (6:30 PM):**
- ✅ 30+ React components generated
- ✅ Docusaurus site built
- ✅ ZIP package created
- ✅ Download ready

---

## Phase 3: Blockchain Integration (2 hours)

### 6:30 PM - 8:30 PM

### Hour 8: Smart Contract Deployment (6:30 PM - 7:30 PM)

**Goal:** Deploy NFT contract to Monad

**Tasks:**
1. Test contract on Monad Testnet
2. Deploy contract to Monad Mainnet
3. Verify contract on explorer
4. Update .env with contract address
5. Test minting function

**Deliverable:**
```solidity
// MACHUPSCertificate deployed to Monad Mainnet
// Contract address: 0x...
// Verified on explorer
```

### Hour 9: NFT Minting Integration (7:30 PM - 8:30 PM)

**Goal:** Integrate NFT minting into generation flow

**Tasks:**
1. Create minting service (`lib/blockchain/nft.ts`)
2. Upload metadata to IPFS
3. Mint NFT to user wallet
4. Return transaction hash
5. Update UI with NFT link

**Deliverable:**
```typescript
const nft = await mintBrandNFT(walletAddress, brandMetadata);
// Returns: { tokenId, transactionHash, explorerUrl }
```

**Stretch Goal (if time):**
- x402 payment integration for premium features
- Premium pitch deck generator

**Phase 3 Checkpoint (8:30 PM):**
- ✅ NFT contract deployed on Monad
- ✅ NFT minting working
- ✅ Transaction visible on explorer

---

## Phase 4: Deploy & Demo (2 hours)

### 8:30 PM - 10:30 PM

### Hour 10: UI Polish & Testing (8:30 PM - 9:30 PM)

**Goal:** Polish UI and run end-to-end tests

**Tasks:**
1. Implement generation form UI
2. Add real-time progress display
3. Style preview page
4. Test complete flow (form → generation → download → NFT)
5. Fix critical bugs
6. Optimize performance

**Deliverable:**
Production-ready UI with tested user flow

### Hour 11: Deployment & Demo Prep (9:30 PM - 10:30 PM)

**Goal:** Deploy to production and prepare demo

**Tasks:**

**9:30 PM - 10:00 PM: Deployment**
```bash
# Deploy to Vercel
vercel --prod

# Deploy documentation
cd website && vercel --prod

# Update DNS records (if needed)
# Verify all sites live
```

**10:00 PM - 10:30 PM: Demo Preparation**
1. Record demo video (2-3 minutes)
2. Prepare live demo script
3. Test demo flow multiple times
4. Create backup screenshots
5. Submit project to https://blitz.devnads.com/

**Phase 4 Checkpoint (10:30 PM):**
- ✅ Deployed to app.machups.com
- ✅ Documentation live at docs.machups.com
- ✅ Demo video recorded
- ✅ Project submitted

---

## Demo Script (3 minutes)

### :00 - :15 | Hook & Problem (15s)

"Traditional branding takes weeks and costs thousands. Design agencies charge $5k-50k. Figma templates take hours. We eliminate all of that."

### :15 - :45 | Live Demo (30s)

"Watch this. I'm generating a complete brand in 3 minutes."

**Show:**
1. Enter business idea: "Sustainable coffee delivery service"
2. Select: Modern style, React + TypeScript
3. Connect Monad wallet
4. Click "Generate Brand"

### :45 - 1:45 | Real-Time Progress (60s)

**Show progress:**
- ✅ Analyzing business idea... (Claude AI)
- ✅ Generating color palette...
- ✅ Creating logo variations... (3 logos)
- ✅ Building design tokens... (W3C DTCG)
- ✅ Generating components... (30+ components)
- ✅ Creating documentation...
- ✅ Minting NFT... (Monad)

### 1:45 - 2:15 | Show Results (30s)

**Download and show:**
- Logos (PNG & SVG)
- Design tokens (JSON + Tailwind config)
- React components (production-ready)
- Documentation site (live link)

### 2:15 - 2:45 | Blockchain Integration (30s)

**Show:**
- NFT certificate on Monad
- Transaction on block explorer
- NFT in wallet

"Every brand gets an NFT certificate proving authenticity and ownership."

### 2:45 - 3:00 | Closing (15s)

"Complete brand in 3 minutes. From idea to production-ready assets. Built on Monad."

**CTA:** [app.machups.com](https://app.machups.com)

---

## Success Criteria

### Must-Have (P0) - Required for Demo

- [ ] Brand generation works end-to-end
- [ ] Logos export in PNG & SVG (3 variations)
- [ ] Design tokens export (at least JSON + CSS)
- [ ] React components export (at least 10 components)
- [ ] NFT mints on Monad Mainnet
- [ ] Deployed to app.machups.com
- [ ] Demo video recorded

### Nice-to-Have (P1) - Bonus Features

- [ ] 30+ React components
- [ ] 4 token export formats (JSON, CSS, SCSS, Tailwind)
- [ ] Docusaurus site generation
- [ ] Brand guidelines PDF
- [ ] Real-time progress updates (WebSocket)

### Stretch Goals (P2) - If Time Permits

- [ ] x402 payment integration
- [ ] Premium pitch deck generator
- [ ] A/B variant generator
- [ ] Component playground
- [ ] Multiple tech stack support

---

## Risk Mitigation

### If Running Behind Schedule

**Cut in this order:**
1. ❌ A/B variant generator
2. ❌ Pitch deck generator (premium)
3. ❌ Component playground
4. ❌ Multiple export formats (keep JSON + CSS only)
5. ❌ Docusaurus site (focus on README)

**Always Keep:**
- ✅ Core generation (logos, tokens, components)
- ✅ NFT minting (Monad integration)
- ✅ Clean UI with good UX
- ✅ Working demo

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Claude API rate limits | Cache responses, use smaller prompts, retry logic |
| Logo generation slow | Pre-generate templates, reduce customization |
| Monad RPC issues | Have backup RPC URLs, test on testnet first |
| Build errors | Keep dependencies minimal, test builds early |
| NFT minting fails | Extensive error handling, clear user feedback |
| Time running out | Cut P2 features, focus on working P0 demo |

---

## Hourly Check-ins

### Every Hour:
1. **Status Update:** What's done, what's blocked
2. **Demo Test:** Can we demo what we have?
3. **Time Check:** Are we on schedule?
4. **Adjust Plan:** Cut or keep features?
5. **Next Hour:** Clear goals for next 60 minutes

### Communication Protocol:
- 🟢 On track
- 🟡 Minor issues
- 🔴 Blocked / Need help

---

## Environment Variables Checklist

Before starting, verify all keys are set:

```bash
# Required for Phase 1-2
✅ ANTHROPIC_API_KEY=sk-ant-xxxxx

# Required for Phase 3
✅ NEXT_PUBLIC_THIRDWEB_CLIENT_ID=xxxxx
✅ THIRDWEB_SECRET_KEY=xxxxx
✅ NEXT_PUBLIC_MONAD_RPC_URL=https://rpc.monad.xyz
✅ NEXT_PUBLIC_MONAD_CHAIN_ID=10143

# Optional (for caching/storage)
⚪ REDIS_URL=redis://...
⚪ R2_BUCKET_NAME=machups-brands
⚪ R2_ACCESS_KEY_ID=xxxxx
⚪ R2_SECRET_ACCESS_KEY=xxxxx

# Deployment
✅ VERCEL_TOKEN=xxxxx
```

---

## Resources

### Documentation
- [Master Plan (CLAUDE.md)](../../../CLAUDE.md)
- [Wallet Integration](../../WALLET_INTEGRATION_PLAN.md)
- [App Structure](../../APP_STRUCTURE.md)
- [Workflow Diagrams](../../workflows/MERMAID_DIAGRAMS.md)

### External Resources
- [Claude API Docs](https://docs.anthropic.com/)
- [thirdweb Docs](https://portal.thirdweb.com/)
- [Monad Docs](https://docs.monad.xyz/)
- [W3C DTCG Spec](https://design-tokens.github.io/community-group/)

### Quick Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm lint             # Run linting

# Documentation
cd website && pnpm start    # Dev docs site
cd website && pnpm build    # Build docs

# Deployment
vercel --prod               # Deploy main app
```

---

## Post-Event

### Submission Checklist

- [ ] Live demo URL: app.machups.com
- [ ] Demo video uploaded (2-3 minutes)
- [ ] GitHub repository: https://github.com/4eckd/monad-blitz-sf
- [ ] README with setup instructions
- [ ] Smart contract verified on Monad Explorer
- [ ] Submit at: https://blitz.devnads.com/

### Documentation

- [ ] Update README with results
- [ ] Document any changes from plan
- [ ] Take screenshots of live app
- [ ] Record metrics (generation time, components count, etc.)

---

**LET'S BUILD! 🚀**

*From Idea to Brand in 3 Minutes - Built in 11 Hours*
