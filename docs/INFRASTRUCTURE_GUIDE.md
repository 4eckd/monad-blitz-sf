## 🏗️ MACHUPS - Infrastructure Guide

**Complete Guide to Rapid Brand Generation & Deployment**

---

## 📖 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Quick Start](#quick-start)
4. [Component Reference](#component-reference)
5. [Workflows](#workflows)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## Overview

The MACHUPS infrastructure enables **rapid, automated brand generation and deployment**:

- ⚡ **3-minute generation** from idea to complete brand
- 🎨 **Penpot MCP integration** for automated mockup creation
- 🚀 **Automated deployment** to custom subdomains
- 🎯 **Template system** for instant brand variations
- ⛓️ **Blockchain integration** for NFT certificates

### What Makes This Unique

**Traditional Branding:**
```
Input → Designer (2-6 weeks) → Developer (3-8 weeks) → Launch
Cost: $15,000 - $50,000
```

**MACHUPS:**
```
Input → AI Generation (3 minutes) → Deploy (automated) → Launch
Cost: $300/month
```

---

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                   MACHUPS Platform                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐  │
│  │   Claude AI  │   │  Penpot MCP  │   │ Cloudflare   │  │
│  │  (Analysis)  │──>│  (Mockups)   │──>│  (Cache)     │  │
│  └──────────────┘   └──────────────┘   └──────────────┘  │
│         │                    │                   │          │
│         ▼                    ▼                   ▼          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Brand Generation Orchestrator                 │  │
│  │  - Brand Analysis                                     │  │
│  │  - Logo Generation                                    │  │
│  │  - Design Tokens                                      │  │
│  │  - Component Generation                               │  │
│  │  - Mockup Creation                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│         │                                                    │
│         ▼                                                    │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐  │
│  │   Vercel     │   │    Monad     │   │  Template    │  │
│  │  (Deploy)    │   │  (NFT Mint)  │   │   System     │  │
│  └──────────────┘   └──────────────┘   └──────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### File Structure

```
machups/
├── lib/                                # Core libraries
│   ├── orchestrator/
│   │   └── brand-orchestrator.ts       # Main generation pipeline
│   ├── mcp/
│   │   ├── penpot-client.ts            # Penpot MCP integration
│   │   ├── cloudflare.ts               # Cloudflare MCP
│   │   └── vercel.ts                   # Vercel MCP
│   ├── generators/
│   │   ├── logos.ts                    # Logo generation
│   │   ├── tokens.ts                   # Design tokens
│   │   ├── components.ts               # React components
│   │   └── guidelines.ts               # PDF generation
│   ├── deployment/
│   │   └── rapid-deploy.ts             # Automated deployment
│   ├── templates/
│   │   └── template-system.ts          # Template management
│   └── blockchain/
│       ├── nft-contract.ts             # NFT minting
│       └── monad-client.ts             # Monad integration
│
├── scripts/
│   ├── create-branches.sh              # Git branch creation
│   ├── init-infrastructure.sh          # Setup script
│   └── test-generation.ts              # Test pipeline
│
├── templates/                          # Brand templates
│   ├── web3-nft-bold.json
│   ├── saas-modern.json
│   └── ecommerce-classic.json
│
├── brands/                             # Generated brands
│   └── {brandId}/
│       ├── brand-analysis.json
│       ├── design-tokens.json
│       ├── logos/
│       ├── components/
│       └── preview/                    # Next.js deployment
│
└── docs/
    ├── BRANCHING_STRATEGY.md           # Git workflow
    ├── INFRASTRUCTURE_GUIDE.md         # This file
    └── API_REFERENCE.md                # API documentation
```

---

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+
- Git
- Vercel account (for deployment)
- Claude API key

### Installation

```bash
# 1. Clone repository
git clone https://github.com/4eckd/monad-blitz-sf.git
cd monad-blitz-sf

# 2. Run infrastructure setup
bash scripts/init-infrastructure.sh

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your API keys

# 4. Install dependencies
npm install

# 5. Test the system
npm run generate
```

### First Brand Generation

```typescript
import { generateBrand } from '@/lib/orchestrator/brand-orchestrator';

const brand = await generateBrand(
  {
    businessIdea: 'AI-powered task management',
    targetAudience: 'Software developers',
    style: 'modern',
    techStack: 'nextjs',
  },
  {
    claudeApiKey: process.env.CLAUDE_API_KEY!,
    penpotServerUrl: process.env.PENPOT_SERVER_URL!,
    enablePenpotMockups: true,
    enableNFTMinting: false,
  }
);

console.log('Brand generated:', brand.previewUrl);
```

---

## Component Reference

### 1. Brand Orchestrator

**File:** `lib/orchestrator/brand-orchestrator.ts`

**Purpose:** Coordinates the entire brand generation pipeline

**Usage:**
```typescript
import { createBrandOrchestrator } from '@/lib/orchestrator/brand-orchestrator';

const orchestrator = createBrandOrchestrator({
  claudeApiKey: 'sk-ant-xxx',
  penpotServerUrl: 'http://localhost:9001',
  enablePenpotMockups: true,
  enableNFTMinting: true,
});

// Listen to progress
orchestrator.on('progress', (progress) => {
  console.log(`${progress.percentage}%: ${progress.message}`);
});

// Generate brand
const result = await orchestrator.generateBrand({
  businessIdea: 'Your idea',
  targetAudience: 'Your audience',
  style: 'modern',
});
```

**Phases:**
1. **Analyzing** (30s) - Claude AI brand analysis
2. **Logos** (45s) - HTML/CSS logo generation
3. **Tokens** (15s) - W3C DTCG design tokens
4. **Components** (60s) - React component generation
5. **Mockups** (30s) - Penpot mockup creation
6. **Deploying** (20s) - Vercel preview deployment
7. **Minting** (10s) - NFT certificate (optional)

---

### 2. Penpot MCP Client

**File:** `lib/mcp/penpot-client.ts`

**Purpose:** Integrates with Penpot for automated mockup generation

**Usage:**
```typescript
import { createPenpotClient } from '@/lib/mcp/penpot-client';

const penpot = await createPenpotClient({
  serverUrl: 'http://localhost:9001',
  apiKey: 'your-api-key',
});

// Create design file
const file = await penpot.createDesignFile('Brand Name', {
  brandName: 'Brand',
  colors: { primary: '#3B82F6', secondary: '#10B981' },
  typography: { headingFont: 'Inter', bodyFont: 'Inter' },
});

// Generate mockups
const frames = await penpot.generateMockups(
  file.id,
  designTokens,
  ['landing-page', 'dashboard']
);

// Export mockups
const exports = await penpot.exportMockups(file.id, frameIds, {
  format: 'png',
  scale: 2,
  quality: 90,
});
```

**Available Methods:**
- `createDesignFile()` - Create Penpot file
- `generateMockups()` - Generate from templates
- `createLibrary()` - Create component library
- `syncTokens()` - Sync design tokens
- `exportMockups()` - Export as images
- `generateLogos()` - Generate logo variations

---

### 3. Rapid Deployment System

**File:** `lib/deployment/rapid-deploy.ts`

**Purpose:** Automates deployment to preview subdomains

**Usage:**
```typescript
import { rapidDeploy } from '@/lib/deployment/rapid-deploy';

const result = await rapidDeploy({
  brandId: 'brand_123',
  brandName: 'MyBrand',
  subdomain: 'mybrand.preview',
  domain: 'machups.com',
  vercelToken: 'xxx',
});

console.log('Deployed to:', result.previewUrl);
// => https://mybrand.preview.machups.com
```

**Deployment Steps:**
1. Prepare deployment directory
2. Build Next.js application
3. Deploy to Vercel
4. Configure custom domain
5. Set up CI/CD pipeline

**Batch Deployment:**
```typescript
import { batchDeploy } from '@/lib/deployment/rapid-deploy';

const results = await batchDeploy([
  { brandId: 'brand_1', brandName: 'Brand1', ... },
  { brandId: 'brand_2', brandName: 'Brand2', ... },
]);

console.log(`${results.filter(r => r.success).length} deployed`);
```

---

### 4. Template System

**File:** `lib/templates/template-system.ts`

**Purpose:** Manages reusable brand templates

**Usage:**
```typescript
import { createTemplateSystem } from '@/lib/templates/template-system';

const system = createTemplateSystem();
await system.loadTemplates();

// List available templates
const templates = await system.getTemplates({
  industry: 'Web3',
  style: 'bold',
});

// Instantiate template
const brand = await system.instantiateTemplate('web3-nft-bold', {
  brandName: 'MyNFT',
  tagline: 'The Future of Web3',
  colorOverrides: {
    primary: '#FF0000',
  },
});

// Save to disk
await system.saveBrand(brand, './brands');
```

**Built-in Templates:**
- `web3-nft-bold` - Web3/NFT projects
- `saas-modern` - SaaS products
- `ecommerce-classic` - Online stores

**Creating Custom Templates:**
```typescript
const template = await system.createTemplate(brandAnalysis, {
  name: 'My Template',
  description: 'Custom template for X industry',
  category: 'industry',
  industry: 'FinTech',
});
```

---

## Workflows

### Workflow 1: Generate Brand from Scratch

```bash
# 1. Generate brand
npm run generate

# 2. Review output
ls brands/brand_xxx/
# - brand-analysis.json
# - design-tokens.json
# - logos/
# - components/
# - preview/

# 3. Deploy to preview
cd brands/brand_xxx/preview
npm install
npm run deploy

# 4. Configure DNS
# Add CNAME: brandname.preview → cname.vercel-dns.com
```

### Workflow 2: Use Template for Rapid Generation

```typescript
// Quick generation from template
import { quickInstantiate } from '@/lib/templates/template-system';

const brand = await quickInstantiate('web3-nft-bold', 'MyBrand', {
  tagline: 'Your tagline here',
  colorOverrides: { primary: '#9333EA' },
});

// Brand ready in seconds, no AI generation needed
```

### Workflow 3: Batch Generate Multiple Brands

```typescript
import { batchDeploy } from '@/lib/deployment/rapid-deploy';

const brands = [
  { name: 'Brand1', template: 'web3-nft-bold' },
  { name: 'Brand2', template: 'saas-modern' },
  { name: 'Brand3', template: 'ecommerce-classic' },
];

for (const { name, template } of brands) {
  const brand = await quickInstantiate(template, name);
  await system.saveBrand(brand, './brands');
}

// Deploy all at once
await batchDeploy(brands.map(b => ({
  brandId: b.brandId,
  brandName: b.name,
  subdomain: `${b.name.toLowerCase()}.preview`,
  domain: 'machups.com',
  vercelToken: process.env.VERCEL_TOKEN!,
})));
```

---

## Deployment

### Local Development

```bash
# Start development server
cd brands/gonads-io/preview
npm run dev

# Open http://localhost:3001
```

### Preview Deployment (Vercel)

```bash
# One-time setup
npm install -g vercel
vercel login

# Deploy
cd brands/gonads-io/preview
vercel --prod

# Configure custom domain
vercel domains add gonads.preview.machups.com
```

### DNS Configuration

**Cloudflare:**
```
Type: CNAME
Name: gonads.preview
Target: cname.vercel-dns.com
Proxy: Enabled
TTL: Auto
```

**Other DNS providers:**
```
Type: CNAME
Name: gonads.preview
Target: cname.vercel-dns.com
TTL: 3600
```

### Automated Deployment (GitHub Actions)

Workflow automatically created at:
`.github/workflows/deploy-{brandId}.yml`

**Triggers:**
- Push to `main` branch
- Changes in `brands/{brandId}/**`
- Manual workflow dispatch

**Required Secrets:**
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

---

## Troubleshooting

### Issue: Penpot MCP Connection Fails

**Error:** `Failed to connect to Penpot MCP server`

**Solution:**
```bash
# 1. Check Penpot is running
curl http://localhost:9001/health

# 2. Verify environment variables
echo $PENPOT_SERVER_URL
echo $PENPOT_API_KEY

# 3. Test connection
npm run test:penpot
```

### Issue: Deployment Fails

**Error:** `Vercel deployment failed`

**Solution:**
```bash
# 1. Check Vercel token
vercel whoami

# 2. Verify build locally
cd brands/brand_xxx/preview
npm run build

# 3. Check logs
vercel logs

# 4. Redeploy
vercel --prod --force
```

### Issue: DNS Not Resolving

**Error:** `Domain not found`

**Solution:**
```bash
# 1. Check DNS propagation
dig gonads.preview.machups.com

# 2. Wait for propagation (up to 24 hours)

# 3. Verify Vercel domain config
vercel domains ls

# 4. Remove and re-add domain
vercel domains rm gonads.preview.machups.com
vercel domains add gonads.preview.machups.com
```

### Issue: Template Not Found

**Error:** `Template web3-nft-bold not found`

**Solution:**
```typescript
// 1. Load templates first
await system.loadTemplates();

// 2. List available templates
const templates = await system.getTemplates();
console.log(templates.map(t => t.id));

// 3. Use correct template ID
const brand = await system.instantiateTemplate('web3-nft-bold', ...);
```

---

## Performance Optimization

### Generation Speed

**Target:** 3 minutes total

**Optimizations:**
- Parallel generation (logos + tokens + components)
- Caching with Cloudflare KV
- Template reuse
- Pre-built component libraries

### Deployment Speed

**Target:** 2 minutes

**Optimizations:**
- Pre-built Next.js bundles
- Edge deployment with Vercel
- Static generation where possible
- Incremental Static Regeneration (ISR)

### Cost Optimization

**Claude AI:** ~$0.50 per generation
**Vercel:** $20/month (Pro plan)
**Cloudflare:** Free tier sufficient
**Penpot:** Self-hosted (free)

**Total:** ~$20-30/month for unlimited generations

---

## Next Steps

1. **Explore the Gonads.io Demo:**
   ```bash
   cd brands/gonads-io
   cat README.md
   ```

2. **Read the Branching Strategy:**
   ```bash
   cat docs/BRANCHING_STRATEGY.md
   ```

3. **Start Development:**
   ```bash
   git checkout feature/penpot-integration
   # Start coding!
   ```

4. **Deploy Your First Brand:**
   ```bash
   npm run generate
   npm run deploy
   ```

---

## Resources

- **Documentation:** `docs/`
- **Examples:** `brands/gonads-io/`
- **Templates:** `templates/`
- **Scripts:** `scripts/`

**Support:**
- GitHub Issues: https://github.com/4eckd/monad-blitz-sf/issues
- Email: support@machups.com

---

**Generated by MACHUPS**
*AI-Powered Brand Generation Platform*
*Built for Monad Blitz SF #18*
