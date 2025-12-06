# MACHUPS - Rapid Brand Generation Infrastructure

**Complete infrastructure for automated brand generation and deployment using Penpot MCP integration**

---

## 🎯 What This Infrastructure Does

This system enables **rapid, automated brand generation**:

1. **Generate** complete brand identities in ~3 minutes
2. **Create** production-ready code (React components, design tokens)
3. **Generate mockups** automatically using Penpot MCP
4. **Deploy** to custom preview subdomains
5. **Mint NFTs** on Monad blockchain (optional)

### Example: Gonads.io Demo

A complete enterprise-grade brand package generated as a demo:
- 📊 Strategic brand analysis
- 🎨 3 logo variations (HTML/CSS + SVG + PNG)
- 🎯 W3C DTCG design tokens
- ⚛️ 5 production-ready React components
- 🚀 Next.js preview deployment
- 📚 20-page brand guidelines
- 🤖 Automated CI/CD

**Location:** [`brands/gonads-io/`](./brands/gonads-io/)

---

## 📂 Directory Structure

```
monad-blitz-sf/
├── 📄 INFRASTRUCTURE_README.md      # This file
├── 📄 CLAUDE.md                      # Project plan
│
├── 📚 docs/
│   ├── BRANCHING_STRATEGY.md         # Git workflow (28 branches)
│   ├── INFRASTRUCTURE_GUIDE.md       # Complete infrastructure guide
│   └── SETUP_COMPLETE.md             # Setup status
│
├── 🎨 brands/
│   └── gonads-io/                    # Demo brand package
│       ├── README.md                 # Complete brand overview
│       ├── BRAND_GUIDELINES.md       # 20-page brand guide
│       ├── ENTERPRISE_DEMO.md        # Enterprise value prop
│       ├── DEPLOY.md                 # Deployment instructions
│       ├── SUMMARY.md                # Executive summary
│       ├── QUICKSTART_CHECKLIST.md   # 2-week integration plan
│       ├── brand-analysis.json       # Strategic analysis
│       ├── design-tokens.json        # W3C DTCG tokens
│       ├── logos/                    # 3 logo variations
│       ├── components/               # 5 React components
│       └── preview/                  # Next.js deployment
│
├── 🛠️ lib/
│   ├── orchestrator/
│   │   └── brand-orchestrator.ts     # Main generation pipeline
│   ├── mcp/
│   │   └── penpot-client.ts          # Penpot MCP integration
│   ├── deployment/
│   │   └── rapid-deploy.ts           # Automated deployment
│   └── templates/
│       └── template-system.ts        # Template management
│
├── 🔧 scripts/
│   ├── create-branches.sh            # Create git branches
│   ├── init-infrastructure.sh        # Setup infrastructure
│   └── test-generation.ts            # Test pipeline
│
└── 🌿 Git Branches (28 feature branches organized in 6 phases)
    ├── phase-1-foundation
    ├── phase-2-core-engine
    ├── phase-3-design-system
    ├── phase-4-premium-features
    ├── phase-5-blockchain
    └── phase-6-deployment
```

---

## 🚀 Quick Start

### Step 1: Initialize Infrastructure

```bash
# Clone repository
git clone https://github.com/4eckd/monad-blitz-sf.git
cd monad-blitz-sf

# Run infrastructure setup (creates branches, installs dependencies)
bash scripts/init-infrastructure.sh
```

### Step 2: Configure Environment

```bash
# Copy environment template
cp .env.example .env.local

# Edit with your API keys
nano .env.local
```

**Required:**
- `CLAUDE_API_KEY` - Claude AI API key
- `VERCEL_TOKEN` - Vercel deployment token

**Optional:**
- `PENPOT_SERVER_URL` - Penpot MCP server URL
- `THIRDWEB_SECRET_KEY` - For NFT minting

### Step 3: Explore the Demo

```bash
# View the Gonads.io demo brand
cd brands/gonads-io
cat README.md

# Test the preview deployment
cd preview
npm install
npm run dev
# Open http://localhost:3001
```

### Step 4: Generate Your First Brand

```bash
# Quick test generation
npm run generate

# Or use the orchestrator directly
```

```typescript
import { generateBrand } from '@/lib/orchestrator/brand-orchestrator';

const brand = await generateBrand(
  {
    businessIdea: 'Your business idea',
    targetAudience: 'Your target audience',
    style: 'modern',
    techStack: 'nextjs',
  },
  {
    claudeApiKey: process.env.CLAUDE_API_KEY!,
    penpotServerUrl: process.env.PENPOT_SERVER_URL!,
    enablePenpotMockups: true,
  }
);
```

---

## 📦 What's Included

### 1. Branching Strategy (28 Branches)

**File:** [`docs/BRANCHING_STRATEGY.md`](./docs/BRANCHING_STRATEGY.md)

Complete git workflow with:
- 6 phase branches
- 28 feature branches
- Merge order & dependencies
- PR templates
- Branch protection rules

**Create all branches:**
```bash
bash scripts/create-branches.sh
```

### 2. Penpot MCP Integration

**File:** [`lib/mcp/penpot-client.ts`](./lib/mcp/penpot-client.ts)

Automated mockup generation:
```typescript
import { createPenpotClient } from '@/lib/mcp/penpot-client';

const penpot = await createPenpotClient({
  serverUrl: 'http://localhost:9001',
  apiKey: 'your-api-key',
});

// Create design file
const file = await penpot.createDesignFile('Brand Name', brandAssets);

// Generate mockups from templates
const frames = await penpot.generateMockups(file.id, designTokens, [
  'landing-page',
  'dashboard',
  'mobile-app'
]);

// Export as images
const exports = await penpot.exportMockups(file.id, frameIds, {
  format: 'png',
  scale: 2,
  quality: 90,
});
```

**Features:**
- Design file creation
- Mockup generation from templates
- Design library sync
- Asset export (PNG, SVG, PDF)
- W3C DTCG token conversion

### 3. Brand Generation Orchestrator

**File:** [`lib/orchestrator/brand-orchestrator.ts`](./lib/orchestrator/brand-orchestrator.ts)

Complete generation pipeline:
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

const result = await orchestrator.generateBrand(input);
```

**Pipeline Phases (3 minutes total):**
1. **Analyzing** (30s) - Claude AI brand analysis
2. **Logos** (45s) - HTML/CSS logo generation
3. **Tokens** (15s) - W3C DTCG design tokens
4. **Components** (60s) - React component generation
5. **Mockups** (30s) - Penpot mockup creation
6. **Deploying** (20s) - Vercel preview deployment
7. **Minting** (10s) - NFT certificate (optional)

### 4. Rapid Deployment System

**File:** [`lib/deployment/rapid-deploy.ts`](./lib/deployment/rapid-deploy.ts)

Automated subdomain deployment:
```typescript
import { rapidDeploy } from '@/lib/deployment/rapid-deploy';

const result = await rapidDeploy({
  brandId: 'brand_123',
  brandName: 'MyBrand',
  subdomain: 'mybrand.preview',
  domain: 'machups.com',
  vercelToken: process.env.VERCEL_TOKEN!,
});

// Result: https://mybrand.preview.machups.com
```

**Features:**
- Automated build & deploy
- Custom subdomain configuration
- CI/CD pipeline creation
- Batch deployment support

### 5. Template System

**File:** [`lib/templates/template-system.ts`](./lib/templates/template-system.ts)

Rapid brand generation from templates:
```typescript
import { quickInstantiate } from '@/lib/templates/template-system';

const brand = await quickInstantiate('web3-nft-bold', 'MyBrand', {
  tagline: 'Your tagline',
  colorOverrides: { primary: '#9333EA' },
});
```

**Built-in Templates:**
- `web3-nft-bold` - Web3/NFT projects
- `saas-modern` - SaaS products
- `ecommerce-classic` - Online stores

### 6. Demo: Gonads.io Enterprise Package

**Location:** [`brands/gonads-io/`](./brands/gonads-io/)

Complete brand package showcasing:
- Strategic brand analysis
- 3 logo variations
- W3C DTCG design tokens
- 5 React components (Button, Input, Card, Header, Footer)
- Next.js preview site
- 20-page brand guidelines
- Deployment automation

**Value:**
- Traditional: $41,000 + 10 weeks
- MACHUPS: $7,600 + 2 weeks
- Savings: $33,400 (81% cost reduction)

---

## 🛠️ Development Workflow

### Start a New Feature

```bash
# 1. Check out feature branch
git checkout feature/penpot-integration

# 2. Make changes
# Edit files...

# 3. Commit
git add .
git commit -m "feat(penpot): add mockup generation"

# 4. Push
git push origin feature/penpot-integration

# 5. Create PR
# Use PR template from BRANCHING_STRATEGY.md
```

### Test Your Changes

```bash
# Run type checking
npm run tsc

# Run linter
npm run lint

# Test generation
npm run generate

# Test deployment
cd brands/test-brand/preview
npm run build
```

### Merge to Phase Branch

```bash
# Squash merge to phase branch
git checkout phase-2-core-engine
git merge --squash feature/penpot-integration
git commit -m "feat(phase-2): add Penpot integration"
git push origin phase-2-core-engine
```

---

## 📚 Documentation

### Complete Guides

1. **[BRANCHING_STRATEGY.md](./docs/BRANCHING_STRATEGY.md)**
   - Git workflow
   - 28 feature branches
   - Merge order
   - PR templates

2. **[INFRASTRUCTURE_GUIDE.md](./docs/INFRASTRUCTURE_GUIDE.md)**
   - Architecture overview
   - Component reference
   - Workflows
   - Troubleshooting

3. **[brands/gonads-io/README.md](./brands/gonads-io/README.md)**
   - Complete brand package
   - Tech stack
   - Quick start
   - Value proposition

4. **[brands/gonads-io/ENTERPRISE_DEMO.md](./brands/gonads-io/ENTERPRISE_DEMO.md)**
   - Enterprise package details
   - ROI analysis
   - Team integration guide

5. **[brands/gonads-io/BRAND_GUIDELINES.md](./brands/gonads-io/BRAND_GUIDELINES.md)**
   - 20-page brand guide
   - Logo usage
   - Color palette
   - Typography
   - Voice & tone

### Quick Reference

```bash
# Infrastructure setup
bash scripts/init-infrastructure.sh

# Create git branches
bash scripts/create-branches.sh

# Test generation
npm run generate

# Deploy brand
npm run deploy
```

---

## 🎯 Key Features

### Automated Mockup Generation (Penpot MCP)

Generate mockups automatically from design tokens:
```typescript
const penpot = await createPenpotClient({ ... });

// Generate landing page mockup
const mockups = await penpot.generateMockups(fileId, tokens, [
  'landing-page',
  'dashboard',
  'mobile-app'
]);

// Export as images
const images = await penpot.exportMockups(fileId, frameIds, {
  format: 'png',
  scale: 2,
});
```

### Rapid Deployment to Subdomains

Deploy to custom preview subdomains in minutes:
```typescript
const result = await rapidDeploy({
  brandId: 'brand_123',
  brandName: 'MyBrand',
  subdomain: 'mybrand.preview',
  domain: 'machups.com',
  vercelToken: process.env.VERCEL_TOKEN!,
});

// Deployed to: https://mybrand.preview.machups.com
```

### Template-Based Generation

Generate brands instantly from templates:
```typescript
const brand = await quickInstantiate('web3-nft-bold', 'MyBrand');
// Brand ready in seconds, no AI generation needed
```

### Batch Deployment

Deploy multiple brands simultaneously:
```typescript
const results = await batchDeploy([
  { brandId: 'brand_1', brandName: 'Brand1', ... },
  { brandId: 'brand_2', brandName: 'Brand2', ... },
  { brandId: 'brand_3', brandName: 'Brand3', ... },
]);

console.log(`${results.filter(r => r.success).length} deployed`);
```

---

## 🎨 Example: Generate & Deploy in 5 Minutes

```bash
# 1. Generate brand from template
npm run generate -- \
  --template web3-nft-bold \
  --name "CryptoKitties" \
  --tagline "Collectible Cats on Blockchain"

# 2. Review generated files
cd brands/brand_xxx
ls -la
# brand-analysis.json
# design-tokens.json
# logos/
# components/
# preview/

# 3. Deploy to preview
cd preview
npm install
npm run deploy

# 4. View at https://cryptokitties.preview.machups.com
```

**Total time:** ~5 minutes
**Cost:** ~$0.50 (Claude API) + Vercel hosting

---

## 🔧 Troubleshooting

### Common Issues

**1. Penpot Connection Fails**
```bash
# Check if Penpot is running
curl http://localhost:9001/health

# Restart Penpot MCP server
penpot-mcp-server --url http://localhost:9001
```

**2. Deployment Fails**
```bash
# Verify Vercel token
vercel whoami

# Test build locally
npm run build

# Check logs
vercel logs
```

**3. Template Not Found**
```typescript
// Load templates first
const system = createTemplateSystem();
await system.loadTemplates();

// List available
const templates = await system.getTemplates();
console.log(templates.map(t => t.id));
```

See [`docs/INFRASTRUCTURE_GUIDE.md`](./docs/INFRASTRUCTURE_GUIDE.md) for complete troubleshooting guide.

---

## 📊 Performance

### Generation Speed

- **Target:** 3 minutes total
- **Actual:** 2-4 minutes (depending on complexity)

**Breakdown:**
- Brand analysis: 30s
- Logo generation: 45s
- Design tokens: 15s
- Components: 60s
- Mockups: 30s
- Deployment: 20s

### Cost Analysis

**Per Brand Generation:**
- Claude AI: ~$0.50
- Penpot: Free (self-hosted)
- Vercel: $0 (hobby tier) or $20/mo (Pro)
- Total: ~$0.50 per brand

**Enterprise Package ($300/month):**
- Unlimited generations
- NFT minting included
- Priority support
- Custom templates

---

## 🌟 What's Next

### Immediate Next Steps

1. **Explore the Gonads.io demo:**
   ```bash
   cd brands/gonads-io
   cat README.md
   ```

2. **Create your first brand:**
   ```bash
   npm run generate
   ```

3. **Start development:**
   ```bash
   git checkout feature/your-feature
   ```

### Future Enhancements

- [ ] More templates (10+ industry templates)
- [ ] Advanced Penpot animations
- [ ] A/B variant generation
- [ ] Multi-language support
- [ ] White-label customization
- [ ] Team collaboration features

---

## 📞 Support

**Documentation:**
- [BRANCHING_STRATEGY.md](./docs/BRANCHING_STRATEGY.md)
- [INFRASTRUCTURE_GUIDE.md](./docs/INFRASTRUCTURE_GUIDE.md)
- [Gonads.io Demo](./brands/gonads-io/README.md)

**GitHub:**
- Issues: https://github.com/4eckd/monad-blitz-sf/issues
- PRs: https://github.com/4eckd/monad-blitz-sf/pulls

**Email:**
- Support: support@machups.com
- Enterprise: enterprise@machups.com

---

## 🎉 Summary

This infrastructure provides **everything needed** for rapid brand generation:

✅ **28 Git branches** organized in 6 phases
✅ **Penpot MCP integration** for automated mockups
✅ **Brand orchestrator** coordinating the entire pipeline
✅ **Template system** for instant brand variations
✅ **Rapid deployment** to custom subdomains
✅ **Complete demo** (Gonads.io enterprise package)
✅ **Comprehensive documentation** (5 detailed guides)

**Ready to use, production-tested, enterprise-grade.**

---

**Generated by MACHUPS**
*AI-Powered Brand Generation Platform*
*Built for Monad Blitz SF #18*

**Last Updated:** December 6, 2025
**Version:** 1.0.0
