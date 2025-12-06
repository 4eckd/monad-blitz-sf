# app.machups.com - Application Structure
## Main Brand Generation App

---

## Overview

**Purpose:** Primary user-facing application for AI-powered brand generation
**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
**Deployment:** Vercel (app.machups.com)

---

## Directory Structure

```
app.machups.com/
├── app/                                # Next.js App Router
│   ├── layout.tsx                      # Root layout (fonts, metadata)
│   ├── page.tsx                        # Landing page
│   ├── globals.css                     # Global styles + Tailwind
│   │
│   ├── generate/                       # Brand generation
│   │   ├── page.tsx                    # Generation form
│   │   ├── layout.tsx                  # Generation layout
│   │   └── [id]/                       # Dynamic route for job status
│   │       ├── page.tsx                # Real-time progress view
│   │       └── loading.tsx             # Loading state
│   │
│   ├── preview/                        # Results preview
│   │   └── [id]/                       # Dynamic route for brand ID
│   │       ├── page.tsx                # Brand preview page
│   │       ├── loading.tsx             # Loading state
│   │       └── components/             # Preview-specific components
│   │           ├── LogoShowcase.tsx
│   │           ├── ColorPalette.tsx
│   │           ├── TypographyDisplay.tsx
│   │           └── ComponentPreview.tsx
│   │
│   ├── dashboard/                      # User dashboard (optional)
│   │   ├── page.tsx                    # Dashboard overview
│   │   └── brands/                     # User's brands
│   │       └── page.tsx
│   │
│   ├── pricing/                        # Pricing page
│   │   └── page.tsx
│   │
│   ├── about/                          # About page
│   │   └── page.tsx
│   │
│   └── api/                            # API routes
│       ├── generate/                   # Brand generation
│       │   └── route.ts                # POST: Create generation job
│       │
│       ├── status/                     # Job status
│       │   └── [id]/
│       │       └── route.ts            # GET: Check job status
│       │
│       ├── download/                   # File downloads
│       │   └── [id]/
│       │       └── route.ts            # GET: Download ZIP package
│       │
│       ├── premium/                    # Premium features
│       │   ├── pitchdeck/
│       │   │   └── route.ts            # POST: Generate pitch deck (x402)
│       │   └── variants/
│       │       └── route.ts            # POST: Generate A/B variants (x402)
│       │
│       ├── nft/                        # NFT operations
│       │   ├── mint/
│       │   │   └── route.ts            # POST: Mint NFT certificate
│       │   └── claim/
│       │       └── route.ts            # POST: Claim NFT later
│       │
│       ├── analytics/                  # Analytics (internal)
│       │   └── route.ts                # POST: Track events
│       │
│       └── og/                         # Open Graph images
│           └── route.tsx               # Dynamic OG image generation
│
├── components/                         # Reusable components
│   ├── ui/                            # Base UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── progress.tsx
│   │   ├── tabs.tsx
│   │   ├── dialog.tsx
│   │   └── toast.tsx
│   │
│   ├── brand/                         # Brand-specific components
│   │   ├── LogoDisplay.tsx
│   │   ├── ColorSwatch.tsx
│   │   ├── TokenExporter.tsx
│   │   └── ComponentCodeBlock.tsx
│   │
│   ├── forms/                         # Form components
│   │   ├── GenerationForm.tsx
│   │   ├── StyleSelector.tsx
│   │   └── FeatureCheckboxes.tsx
│   │
│   ├── web3/                          # Blockchain components
│   │   ├── ConnectWallet.tsx
│   │   ├── WalletButton.tsx
│   │   ├── NetworkSwitcher.tsx
│   │   └── NFTDisplay.tsx
│   │
│   ├── layout/                        # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── Sidebar.tsx
│   │
│   └── marketing/                     # Marketing components
│       ├── Hero.tsx
│       ├── Features.tsx
│       ├── Testimonials.tsx
│       ├── Pricing.tsx
│       └── FAQ.tsx
│
├── lib/                               # Core libraries
│   ├── ai/                           # AI integration
│   │   ├── claude.ts                 # Claude API client
│   │   ├── prompts.ts                # Prompt templates
│   │   └── streaming.ts              # Streaming responses
│   │
│   ├── generators/                   # Brand generation logic
│   │   ├── logos.ts                  # Logo generation
│   │   ├── colors.ts                 # Color palette
│   │   ├── typography.ts             # Typography system
│   │   ├── tokens.ts                 # Design tokens
│   │   ├── components.ts             # Component generation
│   │   ├── wireframes.ts             # ASCII wireframes
│   │   ├── documentation.ts          # Docusaurus generation
│   │   └── guidelines.ts             # PDF guidelines
│   │
│   ├── exporters/                    # Export utilities
│   │   ├── json.ts                   # JSON export
│   │   ├── css.ts                    # CSS variables
│   │   ├── scss.ts                   # SCSS variables
│   │   ├── tailwind.ts               # Tailwind config
│   │   ├── zip.ts                    # ZIP packaging
│   │   └── pdf.ts                    # PDF generation
│   │
│   ├── blockchain/                   # Blockchain utilities
│   │   ├── client.ts                 # thirdweb client
│   │   ├── nft.ts                    # NFT minting
│   │   ├── x402.ts                   # Payment verification
│   │   └── ipfs.ts                   # IPFS uploads
│   │
│   ├── storage/                      # Storage utilities
│   │   ├── redis.ts                  # Redis client (job queue)
│   │   ├── s3.ts                     # S3/R2 uploads
│   │   └── cache.ts                  # Caching layer
│   │
│   ├── utils/                        # Utility functions
│   │   ├── validation.ts             # Input validation
│   │   ├── formatting.ts             # String formatting
│   │   ├── colors.ts                 # Color utilities
│   │   └── types.ts                  # TypeScript types
│   │
│   └── hooks/                        # React hooks
│       ├── useWallet.ts              # Wallet state
│       ├── useGeneration.ts          # Generation state
│       ├── useWebSocket.ts           # Real-time updates
│       └── useDownload.ts            # File downloads
│
├── styles/                            # Additional styles
│   ├── animations.css                # Custom animations
│   └── print.css                     # Print styles
│
├── public/                            # Static assets
│   ├── favicon.ico                   # Favicon
│   ├── logo.svg                      # Logo
│   ├── og-image.png                  # Default OG image
│   ├── robots.txt                    # SEO
│   └── sitemap.xml                   # Sitemap
│
├── types/                             # TypeScript definitions
│   ├── brand.ts                      # Brand types
│   ├── api.ts                        # API types
│   └── nft.ts                        # NFT types
│
├── config/                            # Configuration
│   ├── chains.ts                     # Blockchain networks
│   ├── wallets.ts                    # Supported wallets
│   └── features.ts                   # Feature flags
│
├── middleware.ts                      # Next.js middleware
├── next.config.ts                    # Next.js config
├── tailwind.config.ts                # Tailwind config
├── tsconfig.json                     # TypeScript config
├── package.json                      # Dependencies
└── .env.local                        # Environment variables (not committed)
```

---

## Page Breakdown

### 1. Landing Page (`/`)

**Purpose:** Marketing homepage to attract users
**Components:**
- Hero section with demo video
- Feature highlights
- Pricing tiers
- Social proof / testimonials
- CTA to start generating

**Key Sections:**
```tsx
<Hero>
  "From Idea to Brand in 3 Minutes"
  [Generate Now] [View Demo]
</Hero>

<Features>
  - AI-Powered Generation
  - Complete Design System
  - Production-Ready Code
  - NFT Certificate on Monad
</Features>

<HowItWorks>
  1. Enter business idea
  2. Select style preferences
  3. Connect wallet (optional)
  4. Generate brand
  5. Download complete package
</HowItWorks>

<Pricing>
  Free Tier, Starter ($10), Pro ($49)
</Pricing>

<CTA>
  [Start Generating] → /generate
</CTA>
```

### 2. Generation Page (`/generate`)

**Purpose:** Brand generation form
**Features:**
- Multi-step form
- Real-time validation
- Wallet connection
- Style preferences
- Feature selection

**Form Fields:**
```tsx
<GenerationForm>
  <Step1>
    - Business Idea (textarea)
    - Target Audience (text)
    - Industry (select)
  </Step1>

  <Step2>
    - Style Preference (modern, classic, bold, minimal)
    - Color Mood (professional, playful, elegant, energetic)
    - Logo Type (wordmark, icon, combination)
  </Step2>

  <Step3>
    - Tech Stack (React, Vue, HTML/CSS)
    - Export Formats (JSON, CSS, Tailwind)
    - Additional Features (checkboxes)
  </Step3>

  <Step4>
    - Connect Wallet (optional)
    - Review & Submit
  </Step4>
</GenerationForm>
```

### 3. Progress Page (`/generate/[id]`)

**Purpose:** Real-time generation progress
**Features:**
- WebSocket connection
- Progress bar
- Step-by-step updates
- Estimated time remaining
- Preview thumbnails

**Progress Steps:**
```tsx
<ProgressView>
  ✓ Analyzing business idea... (10%)
  ✓ Generating color palette... (20%)
  ⏳ Creating logo variations... (40%)
  ⏳ Building design tokens... (60%)
  ⏳ Generating components... (80%)
  ⏳ Creating documentation... (90%)
  ⏳ Packaging files... (95%)
  ⏳ Minting NFT... (100%)
</ProgressView>

<PreviewThumbnails>
  [Logo Preview] [Color Preview] [Components Preview]
</PreviewThumbnails>
```

### 4. Preview Page (`/preview/[id]`)

**Purpose:** View generated brand package
**Features:**
- Logo variations
- Color palette
- Typography system
- Component previews
- Download options
- NFT certificate

**Sections:**
```tsx
<PreviewPage>
  <Header>
    <BrandName />
    <DownloadButton />
    <ShareButton />
  </Header>

  <Tabs>
    <Tab name="Overview">
      <LogoShowcase />
      <ColorPalette />
      <TypographyDisplay />
    </Tab>

    <Tab name="Design Tokens">
      <TokenViewer format="JSON|CSS|SCSS|Tailwind" />
      <ExportButton />
    </Tab>

    <Tab name="Components">
      <ComponentPreview />
      <CodeViewer />
      <CopyButton />
    </Tab>

    <Tab name="Documentation">
      <DocsLink url="https://[brand-id].docs.machups.com" />
      <PDFDownload />
    </Tab>

    <Tab name="NFT">
      <NFTDisplay tokenId={...} />
      <ViewOnExplorer />
    </Tab>
  </Tabs>

  <PremiumFeatures>
    <PitchDeckUpsell price="0.01 MON" />
    <VariantsUpsell price="0.005 MON" />
  </PremiumFeatures>
</PreviewPage>
```

### 5. Dashboard (`/dashboard`) - Optional

**Purpose:** Manage user's generated brands
**Features:**
- List of brands
- Re-download packages
- Claim NFTs
- Purchase premium features

### 6. Pricing Page (`/pricing`)

**Purpose:** Explain pricing tiers
**Tiers:**
- Free: 1-hour preview, limited exports
- Starter ($10): 24-hour preview, full exports, testnet NFT
- Pro ($49): Permanent, custom domain, mainnet NFT

### 7. About Page (`/about`)

**Purpose:** Project information
**Content:**
- Built for Monad Blitz SF #18
- Tech stack details
- Team information
- How it works

---

## API Routes

### Generation API

**POST `/api/generate`**
```typescript
Request:
{
  businessIdea: string;
  targetAudience: string;
  style: 'modern' | 'classic' | 'bold' | 'minimal';
  techStack: 'react' | 'vue' | 'html';
  walletAddress?: string;
}

Response:
{
  jobId: string;
  estimatedTime: number; // seconds
  websocketUrl: string;
}
```

**GET `/api/status/[id]`**
```typescript
Response:
{
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number; // 0-100
  currentStep: string;
  estimatedTimeRemaining: number;
  result?: {
    downloadUrl: string;
    nftTokenId?: string;
    docsUrl: string;
  };
}
```

**GET `/api/download/[id]`**
```typescript
Response: Binary ZIP file
Headers:
  Content-Type: application/zip
  Content-Disposition: attachment; filename="[brand-name].zip"
```

### Premium API

**POST `/api/premium/pitchdeck`**
```typescript
Headers:
  x-payment: [x402 payment proof]

Request:
{
  brandId: string;
}

Response:
{
  pdfUrl: string;
  pptxUrl: string;
}
```

### NFT API

**POST `/api/nft/mint`**
```typescript
Request:
{
  brandId: string;
  walletAddress: string;
}

Response:
{
  transactionHash: string;
  tokenId: string;
  explorerUrl: string;
}
```

---

## Environment Variables

```bash
# AI Services
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Blockchain
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=xxxxx
THIRDWEB_SECRET_KEY=xxxxx
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_MONAD_RPC_URL=https://rpc.monad.xyz
NEXT_PUBLIC_MONAD_CHAIN_ID=10143

# Storage
REDIS_URL=redis://...
R2_BUCKET_NAME=machups-brands
R2_ACCESS_KEY_ID=xxxxx
R2_SECRET_ACCESS_KEY=xxxxx

# Deployment
NEXT_PUBLIC_APP_URL=https://app.machups.com
VERCEL_URL=xxxxx

# Analytics (optional)
NEXT_PUBLIC_ANALYTICS_ID=xxxxx
```

---

## Key Features

### Real-time Updates

Uses WebSockets for live progress:
```typescript
// Client
const ws = new WebSocket(`wss://app.machups.com/api/ws/${jobId}`);

ws.onmessage = (event) => {
  const { progress, step, preview } = JSON.parse(event.data);
  updateUI(progress, step, preview);
};
```

### Responsive Design

- Mobile-first
- Tailwind breakpoints: `sm:` `md:` `lg:` `xl:`
- Touch-friendly inputs
- Optimized for all devices

### Performance

- Static generation where possible
- Dynamic imports for code splitting
- Image optimization (Next.js Image)
- Edge caching (Cloudflare)

### SEO

- Dynamic meta tags
- Open Graph images
- Structured data
- Sitemap generation

---

## Deployment

**Platform:** Vercel
**Domain:** app.machups.com
**Branch:** `main` → Production

**Build Command:** `pnpm build`
**Install Command:** `pnpm install`
**Output Directory:** `.next`

---

**Last Updated:** December 5, 2025
**Event:** Monad Blitz SF #18
**Status:** Ready for Development
