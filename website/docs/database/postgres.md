---
sidebar_position: 2
---

# PostgreSQL Database

MACHUPS uses PostgreSQL as the primary database for storing user data, brand assets, payments, and analytics.

## Database Architecture

### Technology Stack
- **Database**: PostgreSQL 16+
- **ORM**: Prisma 5.x
- **Hosting**: Vercel Postgres (development) / Neon (production)
- **Migrations**: Prisma Migrate

### Why PostgreSQL?

- ACID Compliance for payment integrity
- Native JSONB support for brand configurations
- Full-text search capabilities
- Excellent scalability
- Seamless Vercel integration

## Core Tables

### users
Stores user accounts and authentication data including wallet addresses, tier information, and subscription status.

### brands  
Stores generated brand data including colors, typography, design tokens (in JSONB), and asset URLs for logos and guidelines.

### nft_certificates
Tracks NFT minting on Monad blockchain with token IDs, contract addresses, rarity tiers, and metadata URIs.

### payments
Records all payment transactions from both Stripe (fiat) and crypto payments with complete transaction details.

### preview_deployments
Manages time-limited preview deployments with subdomain configuration and expiration tracking.

### analytics_events
Tracks user events for analytics with flexible JSONB event properties.

## Prisma Setup

```bash
# Install Prisma
pnpm add -D prisma
pnpm add @prisma/client

# Initialize
npx prisma init

# Create migration
npx prisma migrate dev --name init

# Generate client
npx prisma generate
```

## Connection Pooling

Using Prisma's built-in connection pooling for optimal performance in serverless environments.

## Security

- Always use Prisma ORM (parameterized queries)
- Row-level security for multi-tenant isolation
- Encrypted backups with 30-day retention

## Next Steps

- [Database Schema](./schema) - Complete schema documentation
- [Migrations](./migrations) - Migration management guide
