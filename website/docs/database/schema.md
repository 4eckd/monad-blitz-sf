---
sidebar_position: 1
---

# Database Schema

Complete database schema for MACHUPS platform.

## Entity Relationship Diagram

```
users (1) ──< (M) brands
users (1) ──< (M) nft_certificates  
users (1) ──< (M) payments
users (1) ──< (M) preview_deployments
brands (1) ── (1) nft_certificates
brands (1) ──< (M) preview_deployments
```

## Schema Design Principles

1. **Normalization**: 3NF for data integrity
2. **Denormalization**: JSONB for flexible brand data
3. **Indexing**: Optimized for common query patterns
4. **Soft Deletes**: Maintain audit trail
5. **UUID Primary Keys**: Distributed system friendly

## Complete Table Definitions

See [PostgreSQL Documentation](./postgres) for detailed SQL schemas and Prisma models.

## Key Relationships

### User → Brands
One user can create multiple brands. Cascade delete ensures cleanup.

### Brand → NFT Certificate  
One-to-one relationship. Each brand gets one NFT (if paid tier).

### User → Payments
Tracks all payment history for analytics and support.

### Brand → Preview Deployments
One brand can have multiple sequential deployments (brand1, brand2, etc.).

## Data Types

| Type | Usage | Example |
|------|-------|---------|
| UUID | Primary keys | `550e8400-e29b-41d4-a716-446655440000` |
| VARCHAR | Short strings | Brand names, email addresses |
| TEXT | Long strings | URLs, descriptions |
| JSONB | Flexible data | Design tokens, brand configs |
| TIMESTAMP | Dates/times | Created at, expires at |
| DECIMAL | Money | Payment amounts, rarity scores |

## Indexes

All foreign keys are indexed. Additional indexes on:
- Timestamp fields (for sorting)
- Status fields (for filtering)
- Wallet addresses (for lookups)
- Brand names (for search)

## Next Steps

- [PostgreSQL Setup](./postgres) - Database configuration
- [Migrations](./migrations) - Schema evolution
