---
sidebar_position: 1
---

# API Overview

MACHUPS provides a REST API for programmatic brand generation and management.

## Base URL

```
Production: https://api.machups.com
Staging: https://staging-api.machups.com
```

## Authentication

All API requests require an API key in the header:

```bash
curl https://api.machups.com/v1/brands \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

### Getting an API Key

1. Sign up at [machups.com](https://machups.com)
2. Navigate to **Settings → API Keys**
3. Click **Generate New Key**
4. Copy and secure your API key

**Security:**
- Never commit API keys to version control
- Use environment variables
- Rotate keys regularly
- Restrict by IP if possible

## Rate Limits

| Tier | Requests/Hour | Concurrent Generations |
|------|---------------|------------------------|
| Free | 10 | 1 |
| Starter | 100 | 3 |
| Pro | 1,000 | 10 |
| Enterprise | Unlimited | 50 |

### Rate Limit Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

### Handling Rate Limits

```typescript
async function generateBrand(data: BrandInput) {
  try {
    const response = await fetch('/api/v1/brands', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After');
      throw new Error(`Rate limited. Retry after ${retryAfter}s`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
```

## API Endpoints

### Brands

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/brands` | Generate new brand |
| GET | `/v1/brands/:id` | Get brand details |
| GET | `/v1/brands` | List all brands |
| DELETE | `/v1/brands/:id` | Delete brand |

### Generation

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/brands/:id/status` | Get generation status |
| POST | `/v1/brands/:id/regenerate` | Regenerate specific assets |
| GET | `/v1/brands/:id/download` | Download brand package |

### Assets

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/brands/:id/logos` | Get logo files |
| GET | `/v1/brands/:id/tokens` | Get design tokens |
| GET | `/v1/brands/:id/components` | Get components |
| GET | `/v1/brands/:id/guidelines` | Get guidelines PDF |

### NFTs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/brands/:id/nft/mint` | Mint NFT certificate |
| GET | `/v1/brands/:id/nft` | Get NFT details |
| GET | `/v1/nfts` | List all NFTs |

## Request/Response Format

### Standard Response

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "meta": {
    "timestamp": "2025-12-06T00:00:00Z",
    "requestId": "req_abc123"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid business idea length",
    "details": {
      "field": "businessIdea",
      "constraint": "Must be between 10-500 characters"
    }
  },
  "meta": {
    "timestamp": "2025-12-06T00:00:00Z",
    "requestId": "req_abc123"
  }
}
```

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `UNAUTHORIZED` | 401 | Missing/invalid API key |
| `PAYMENT_REQUIRED` | 402 | Insufficient credits |
| `FORBIDDEN` | 403 | Access denied |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | Temporary outage |

## SDKs

### JavaScript/TypeScript

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

// Get status
const status = await machups.brands.getStatus(brand.id);

// Download assets
const assets = await machups.brands.download(brand.id);
```

### Python

```bash
pip install machups
```

```python
from machups import MACHUPS

machups = MACHUPS(api_key=os.getenv('MACHUPS_API_KEY'))

# Generate brand
brand = machups.brands.create(
    business_idea='Sustainable coffee delivery',
    target_audience='Urban millennials',
    style='modern'
)

# Get status
status = machups.brands.get_status(brand.id)

# Download assets
assets = machups.brands.download(brand.id)
```

### cURL

```bash
# Generate brand
curl -X POST https://api.machups.com/v1/brands \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "businessIdea": "Sustainable coffee delivery",
    "targetAudience": "Urban millennials",
    "style": "modern",
    "monadAddress": "0x..."
  }'

# Get status
curl https://api.machups.com/v1/brands/brand_abc123/status \
  -H "Authorization: Bearer YOUR_API_KEY"

# Download assets
curl https://api.machups.com/v1/brands/brand_abc123/download \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -o brand-package.zip
```

## Webhooks

Subscribe to events:

```json
{
  "url": "https://your-app.com/webhooks/machups",
  "events": [
    "brand.created",
    "brand.completed",
    "brand.failed",
    "nft.minted"
  ],
  "secret": "your_webhook_secret"
}
```

### Webhook Events

```json
{
  "event": "brand.completed",
  "data": {
    "brandId": "brand_abc123",
    "name": "YourBrand",
    "generationTime": 142,
    "assetsReady": true
  },
  "timestamp": "2025-12-06T00:00:00Z"
}
```

### Verifying Webhooks

```typescript
import crypto from 'crypto';

function verifyWebhook(payload: string, signature: string, secret: string) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}
```

## Pagination

For list endpoints:

```bash
GET /v1/brands?page=2&limit=20
```

**Response:**

```json
{
  "success": true,
  "data": [
    // Brand objects
  ],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 145,
    "totalPages": 8,
    "hasNext": true,
    "hasPrevious": true
  }
}
```

## Filtering & Sorting

```bash
# Filter by style
GET /v1/brands?style=modern

# Sort by creation date
GET /v1/brands?sort=-createdAt

# Combine filters
GET /v1/brands?style=modern&sort=-createdAt&limit=50
```

## Idempotency

Use idempotency keys to prevent duplicate requests:

```bash
curl -X POST https://api.machups.com/v1/brands \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Idempotency-Key: unique_key_123" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

## Versioning

API versions are specified in the URL:

- `v1`: Current stable version
- `v2`: Beta features (opt-in)

Breaking changes will be introduced in new versions. v1 will be supported for at least 12 months after v2 release.

## Status Page

Check API status: https://status.machups.com

## Support

- **Documentation**: https://docs.machups.com
- **Email**: api@machups.com
- **Discord**: https://discord.gg/machups
- **Issues**: https://github.com/4eckd/monad-blitz-sf/issues

## Next Steps

- [Authentication](./authentication) - Detailed auth guide
- [Endpoints](./endpoints) - Complete endpoint reference
- [Quick Start](../quickstart) - Get started quickly
