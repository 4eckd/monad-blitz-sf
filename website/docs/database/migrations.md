---
sidebar_position: 3
---

# Database Migrations

Managing database schema changes with Prisma Migrate.

## Migration Strategy

MACHUPS uses Prisma Migrate for all schema changes:

1. **Development**: `prisma migrate dev` - Creates and applies migrations
2. **Production**: `prisma migrate deploy` - Applies pending migrations
3. **Reset**: `prisma migrate reset` - Resets database (dev only)

## Creating Migrations

```bash
# 1. Update prisma/schema.prisma
# 2. Create migration
npx prisma migrate dev --name add_wallet_sessions

# 3. Review generated SQL
cat prisma/migrations/[timestamp]_add_wallet_sessions/migration.sql

# 4. Test migration
npm run test:migration
```

## Migration Workflow

### Development Environment

```bash
# Create migration from schema changes
npx prisma migrate dev --name descriptive_name

# Prisma will:
# 1. Generate SQL migration file
# 2. Apply migration to database
# 3. Regenerate Prisma Client
```

### Production Deployment

```bash
# Apply pending migrations (no client generation)
npx prisma migrate deploy

# Verify migration status
npx prisma migrate status
```

## Best Practices

### DO ✅

- Create small, focused migrations
- Test migrations on staging first
- Add descriptive migration names
- Review generated SQL before committing
- Include rollback instructions in comments

### DON'T ❌

- Skip migrations and edit schema directly
- Modify existing migration files
- Delete migration files
- Run migrations in production manually

## Common Migrations

### Adding a Column

```prisma
model User {
  // existing fields...
  phoneNumber String? // Add optional phone
}
```

```bash
npx prisma migrate dev --name add_user_phone
```

### Adding an Index

```prisma
model Brand {
  name String
  
  @@index([name]) // Add index
}
```

### Adding a Relation

```prisma
model Brand {
  userId String
  user   User   @relation(fields: [userId], references: [id])
}
```

## Rollback Strategy

Prisma doesn't support automatic rollbacks. Manual process:

1. Create reverse migration
2. Apply manually
3. Update schema.prisma  
4. Create new migration

```sql
-- Example rollback SQL
ALTER TABLE users DROP COLUMN phone_number;
```

## Migration History

View all migrations:

```bash
npx prisma migrate status
```

Output:
```
Migrations:
  20251205_init
  20251206_add_wallet_sessions
  20251207_add_nft_rarity
  ...
```

## Troubleshooting

### Migration Failed?

```bash
# Check status
npx prisma migrate status

# Fix database manually or reset (dev only)
npx prisma migrate reset

# Reapply migrations
npx prisma migrate deploy
```

### Drift Detected?

When database schema doesn't match migrations:

```bash
# Generate baseline migration
npx prisma migrate diff \
  --from-schema-datamodel prisma/schema.prisma \
  --to-schema-datasource prisma/schema.prisma \
  --script > fix.sql
```

## Next Steps

- [PostgreSQL](./postgres) - Database setup
- [Schema](./schema) - Complete schema reference
