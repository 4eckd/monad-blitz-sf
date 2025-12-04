# MACHUPS - AI Brand Generator

<div align="center">

![MACHUPS Banner](https://img.shields.io/badge/MACHUPS-AI%20Brand%20Generator-blue?style=for-the-badge)

**From Idea to Brand in 3 Minutes**

📄 **[Read the Full Pitch](docs/PITCH.md)** | 📋 **[Complete Requirements (400+ items)](docs/BRAND_REQUIREMENTS_COMPLETE.md)**

<!-- Status Badges -->
[![CI](https://github.com/4eckd/monad-blitz-sf/actions/workflows/ci.yml/badge.svg)](https://github.com/4eckd/monad-blitz-sf/actions/workflows/ci.yml)
[![Deploy](https://github.com/4eckd/monad-blitz-sf/actions/workflows/deploy.yml/badge.svg)](https://github.com/4eckd/monad-blitz-sf/actions/workflows/deploy.yml)
[![CodeQL](https://github.com/4eckd/monad-blitz-sf/actions/workflows/codeql.yml/badge.svg)](https://github.com/4eckd/monad-blitz-sf/security/code-scanning)
[![License](https://img.shields.io/github/license/4eckd/monad-blitz-sf)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.1.0-blue)](VERSION)

<!-- Tech Stack Badges -->
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.23-FF0055?logo=framer)](https://www.framer.com/motion/)
[![pnpm](https://img.shields.io/badge/pnpm-9.0-yellow?logo=pnpm)](https://pnpm.io/)

<!-- Blockchain Badges -->
[![Monad](https://img.shields.io/badge/Monad-Testnet-purple)](https://monad.xyz/)
[![thirdweb](https://img.shields.io/badge/thirdweb-Web3%20SDK-purple?logo=ethereum)](https://thirdweb.com/)

<!-- Quality Badges -->
[![Security: TruffleHog](https://img.shields.io/badge/Security-TruffleHog-green)](https://github.com/trufflesecurity/trufflehog)
[![MCP](https://img.shields.io/badge/MCP-3%20Servers-orange)](mcp/)

Built for **Monad Blitz SF #18** | Deployed at [app.machups.com](https://app.machups.com)

</div>

---

## Overview

**MACHUPS** is an AI-powered platform that generates complete, professional brand packages in under 3 minutes. Perfect for startups, founders, and designers who need instant branding without weeks of work or thousands in costs.

### What You Get

🎨 **Visual Identity**
- 3 professional logo variations (wordmark, icon, combination)
- Complete color palette (12-15 colors, WCAG AA compliant)
- Typography system with font pairings

💻 **Design System**
- W3C DTCG-compliant design tokens
- Animation tokens (transitions, hover effects, loading states)
- Export formats: JSON, CSS, SCSS, Tailwind
- Semantic naming and structure
- Performance-optimized (GPU-accelerated animations)

🧩 **Component Library**
- Production-ready React components (TypeScript)
- Accessible (ARIA labels, keyboard navigation, WCAG AA)
- Responsive and mobile-first
- Framer Motion animations (with prefers-reduced-motion support)
- Web3Icons + Lucide React icons included

📱 **Wireframes & Flows**
- ASCII wireframe templates (6 categories: Landing, SaaS, E-commerce, Portfolio, Blog, Web3)
- Predefined mockups to guide design decisions
- Mermaid user flow diagrams
- A/B testing variants

⚡ **Performance**
- Core Web Vitals testing (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- 60 FPS animation validation
- Bundle size optimization
- Lighthouse CI integration

📄 **Documentation**
- Complete Docusaurus site
- Component usage examples
- Brand guidelines PDF

🎫 **Blockchain Extras**
- Commemorative NFT on Monad
- x402 micropayments for premium features
- On-chain generation certificate

---

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 9.x
- API keys (Claude, DALL-E/SD, Penpot, Monad wallet)

### Installation

```bash
# Clone the repository
git clone https://github.com/4eckd/monad-blitz-sf.git
cd machlab

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

Create a `.env.local` file with:

```bash
# AI Services
ANTHROPIC_API_KEY=sk-ant-xxxxx
OPENAI_API_KEY=sk-xxxxx (optional, for DALL-E)
STABILITY_API_KEY=sk-xxxxx (optional, for Stable Diffusion)

# Design Tools
PENPOT_ACCESS_TOKEN=xxxxx

# Deployment
CLOUDFLARE_API_TOKEN=xxxxx
CLOUDFLARE_ACCOUNT_ID=xxxxx

# Blockchain (Monad)
NEXT_PUBLIC_MONAD_RPC_URL=https://testnet-rpc.monad.xyz
NEXT_PUBLIC_MONAD_CHAIN_ID=10143
THIRDWEB_SECRET_KEY=xxxxx

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## Features

### 1. Brand Generation Pipeline

```
User Input → AI Analysis → Parallel Generation → Complete Brand Package
   ↓              ↓                ↓                      ↓
  Form        Claude AI      Logos, Colors,        ZIP Download
               Sonnet        Tokens, Docs,           + Live URLs
                             NFT Minting
```

**Generation Time:** < 3 minutes
**Components:** 7+ React components
**Documentation:** Full Docusaurus site
**Deliverables:** 15+ files

### 2. MCP Integrations

**Penpot MCP** - Design file creation
**Cloudflare MCP** - Deployment automation
**Anthropic MCP** - AI generation pipeline

See [mcp/README.md](mcp/README.md) for details.

### 3. Monad Blockchain

**NFT Minting** - ERC-721 certificates
**x402 Payments** - Premium feature purchases
**Testnet** - Safe testing environment

---

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling

### AI & Generation
- **Claude Sonnet 4.5** - Primary LLM
- **DALL-E 3** - Logo generation
- **Stable Diffusion** - Alternative image generation

### Design Tools
- **Penpot** - Design file creation
- **Mermaid.js** - Flow diagrams
- **Docusaurus** - Documentation sites

### Blockchain
- **Monad Testnet** - L1 blockchain
- **thirdweb** - Web3 SDK
- **x402 Protocol** - Micropayments

### Deployment
- **Cloudflare Pages** - Hosting
- **Vercel** - Alternative deployment
- **IPFS** - NFT metadata storage

---

## Project Structure

```
machlab/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── generate/          # Generation UI
│   └── preview/           # Results preview
├── lib/                   # Core libraries
│   ├── generators/        # Brand generation logic
│   ├── exporters/         # Token exporters
│   └── utils/             # Utilities
├── mcp/                   # MCP server configs
│   ├── penpot/           # Penpot integration
│   ├── cloudflare/       # Cloudflare integration
│   └── anthropic/        # Claude integration
├── tools/                 # CLI tools
├── prompts/              # AI prompts
├── components/           # React components
├── public/               # Static assets
└── docs/                 # Additional documentation
```

---

## Usage

### Generate a Brand

1. **Navigate to the app:**
   ```
   http://localhost:3000
   ```

2. **Fill in the form:**
   - Business idea
   - Target audience
   - Style preference
   - Features

3. **Click "Generate Brand"**

4. **Wait 2-3 minutes** as the system:
   - Analyzes your idea
   - Generates logos
   - Creates design tokens
   - Builds components
   - Generates documentation
   - Mints NFT

5. **Download your brand package:**
   - ZIP file with all assets
   - Penpot file URL
   - Documentation site URL
   - NFT certificate

### Premium Features

**Pitch Deck** - 0.01 MON (~$0.20)
- 10-slide investor deck
- Branded styling
- PDF + PPTX formats

**A/B Variants** - 0.005 MON (~$0.10)
- 3 design variations
- Testing setup code

---

## Development

### Scripts

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Testing
pnpm test             # Run tests
pnpm test:watch       # Watch mode
pnpm test:coverage    # Coverage report

# Tools
pnpm generate-brand   # CLI brand generator
pnpm convert-tokens   # Token converter
pnpm optimize-logos   # Logo optimizer
```

### Adding New Generators

1. Create generator file in `lib/generators/`
2. Implement the generator interface
3. Add prompts to `prompts/`
4. Write tests
5. Update documentation

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Links
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)
- [Changelog](CHANGELOG.md)

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

## Acknowledgments

**Built for:** Monad Blitz SF #18
**Team:** Fused Gaming Development Team
**Special Thanks:**
- Anthropic (Claude AI)
- Monad Labs
- Penpot Team
- Cloudflare
- thirdweb

---

## Contact

- **Website:** [machups.com](https://machups.com)
- **Demo:** [app.machups.com](https://app.machups.com)
- **GitHub:** [4eckd/monad-blitz-sf](https://github.com/4eckd/monad-blitz-sf)
- **Issues:** [Report a bug](https://github.com/4eckd/monad-blitz-sf/issues)

---

<div align="center">

**⚡ Powered by Monad | 🎨 Designed with AI | 🚀 Built in 11 Hours**

Made with 💜 at Monad Blitz SF #18

</div>