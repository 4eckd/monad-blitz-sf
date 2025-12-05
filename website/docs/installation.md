---
sidebar_position: 3
---

# Installation

MACHUPS can be accessed as a web application or integrated via API.

## Web Application

No installation required! Simply visit:

**Production**: [machups.com](https://machups.com)  
**Documentation**: [docs.machups.com](https://docs.machups.com)  
**Design System**: [design.machups.com](https://design.machups.com)

## Self-Hosting (Enterprise)

For Enterprise customers who want to self-host MACHUPS:

### Prerequisites

- Node.js 18+
- PostgreSQL 16+
- Monad RPC access
- Claude API key
- Stripe account (for payments)
- Vercel/Cloudflare account (for deployments)

### Setup

```bash
# Clone repository
git clone https://github.com/4eckd/monad-blitz-sf.git
cd monad-blitz-sf

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your keys

# Setup database
npx prisma migrate deploy
npx prisma generate

# Build and start
pnpm build
pnpm start
```

### Environment Variables

Required environment variables:

```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/machups

# Claude AI
CLAUDE_API_KEY=sk-ant-xxx

# Blockchain
NEXT_PUBLIC_MONAD_RPC_URL=https://rpc.monad.xyz
THIRDWEB_SECRET_KEY=xxx
PRIVATE_KEY_DEPLOYER=xxx

# Payments
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Deployment
CLOUDFLARE_API_TOKEN=xxx
CLOUDFLARE_ACCOUNT_ID=xxx
VERCEL_TOKEN=xxx
```

## API Integration

For developers integrating MACHUPS into their applications:

```bash
npm install @machups/sdk
```

```typescript
import { MACHUPS } from '@machups/sdk';

const machups = new MACHUPS({
  apiKey: process.env.MACHUPS_API_KEY
});

// Generate brand
const brand = await machups.brands.create({
  businessIdea: 'Sustainable coffee delivery',
  targetAudience: 'Urban millennials',
  style: 'modern'
});

// Download assets
const assets = await machups.brands.download(brand.id);
```

See [API Reference](./api/overview) for complete documentation.

## Docker Deployment

```bash
# Build image
docker build -t machups .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL=xxx \
  -e CLAUDE_API_KEY=xxx \
  machups
```

## Next Steps

- [Quick Start](./quickstart) - Generate your first brand
- [API Reference](./api/overview) - API documentation
- [Database](./database/postgres) - Database setup
