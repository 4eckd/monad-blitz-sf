# 🛠️ MACHUPS DevOps & Infrastructure Plan

**Event:** Monad Blitz #18
**Duration:** 11 hours
**Goal:** Zero-downtime deployment, rapid iteration, production-ready infrastructure

---

## 🎯 DevOps Philosophy

**Deploy Early, Deploy Often**

In an 11-hour hackathon, infrastructure can't be an afterthought. This plan ensures:
- ✅ **Deploy by Hour 3** (verify production works)
- ✅ **Automated CI/CD** (no manual deployments)
- ✅ **Preview deployments** (test before merging)
- ✅ **Monitoring setup** (catch issues fast)
- ✅ **Rollback ready** (if things break)

---

## 🏗️ Infrastructure Stack

### Hosting & Deployment
- **Cloudflare Pages** - Frontend hosting (Next.js)
- **Cloudflare Workers** - Serverless functions (optional)
- **Monad Testnet** - Smart contracts
- **IPFS** - NFT metadata (optional)

### Development Tools
- **GitHub Actions** - CI/CD pipeline
- **pnpm** - Package management (faster than npm)
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type safety

### Monitoring & Debugging
- **Console logs** - Quick debugging
- **Cloudflare Analytics** - Traffic monitoring
- **Monad Explorer** - Contract verification
- **Wallet logs** - Transaction debugging

---

## 📅 DevOps Timeline

### H0-H1: Infrastructure Setup (1 hour)

**Tasks:**
```bash
# 1. Install tools
pnpm install

# 2. Configure Cloudflare account
- Create account (if needed)
- Link GitHub repo
- Set up Pages project

# 3. Set environment variables (local)
cp .env.example .env.local
# Add API keys

# 4. Test local build
pnpm build
pnpm start

# 5. First deployment (test)
git push origin main
# Cloudflare auto-deploys
```

**Deliverable:** Working deployment pipeline

---

### H1-H3: CI/CD Pipeline (30min-1h)

**GitHub Actions Workflow:**

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop, phase-*]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm lint

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm typecheck

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm build
      - uses: actions/upload-artifact@v3
        with:
          name: build
          path: .next

  deploy-preview:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    needs: [lint, typecheck, build]
    steps:
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: machups
          directory: .next
          branch: ${{ github.head_ref }}
```

**Deliverable:** Automated testing and preview deployments

---

### H3-H7: Production Deployment & Monitoring (30min)

**Cloudflare Pages Configuration:**

```yaml
# wrangler.toml (if using Cloudflare Workers)
name = "machups"
main = "src/index.ts"
compatibility_date = "2025-12-03"

[env.production]
vars = { ENVIRONMENT = "production" }

[[env.production.r2_buckets]]
binding = "ASSETS"
bucket_name = "machups-assets"
```

**Environment Variables (Production):**
```bash
# In Cloudflare dashboard:
CLAUDE_API_KEY=sk-ant-xxx
NEXT_PUBLIC_APP_URL=https://machups.pages.dev
THIRDWEB_SECRET_KEY=xxx
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=xxx
NEXT_PUBLIC_MONAD_RPC_URL=https://testnet-rpc.monad.xyz
NEXT_PUBLIC_MONAD_CHAIN_ID=10143
```

**Deliverable:** Production site live and monitored

---

### H7-H10: Smart Contract Deployment (1-2h)

**Foundry Deployment Script:**

```bash
# scripts/deploy.sh
#!/bin/bash

# Deploy to Monad testnet
forge create --rpc-url $MONAD_RPC_URL \
  --private-key $DEPLOYER_PRIVATE_KEY \
  --verify \
  src/CreditVault.sol:CreditVault

forge create --rpc-url $MONAD_RPC_URL \
  --private-key $DEPLOYER_PRIVATE_KEY \
  --verify \
  src/EventNFT.sol:MACHUPSFoundersPass

# Save contract addresses
echo "CreditVault deployed to: $CREDIT_VAULT_ADDRESS"
echo "EventNFT deployed to: $EVENT_NFT_ADDRESS"
```

**Contract Verification:**
```bash
# Verify on Monad Explorer
forge verify-contract \
  --chain-id 10143 \
  --compiler-version v0.8.20 \
  $CONTRACT_ADDRESS \
  src/CreditVault.sol:CreditVault
```

**Deliverable:** Contracts deployed and verified

---

## 🔄 Continuous Deployment Flow

```
┌─────────────┐
│ Developer   │
│ pushes code │
└──────┬──────┘
       │
       v
┌─────────────────┐
│ GitHub Actions  │
│ • Lint          │
│ • Type check    │
│ • Build test    │
└──────┬──────────┘
       │
       v
┌─────────────────┐
│ Cloudflare      │
│ • Auto deploy   │
│ • Generate URL  │
│ • Cache purge   │
└──────┬──────────┘
       │
       v
┌─────────────────┐
│ Production Live │
│ machups.pages.dev│
└─────────────────┘
```

---

## 🚨 Monitoring & Alerting

### Application Monitoring

**Console Logging:**
```typescript
// lib/logger.ts
export const log = {
  info: (msg: string, data?: any) => {
    console.log(`[INFO] ${msg}`, data);
  },
  error: (msg: string, error?: any) => {
    console.error(`[ERROR] ${msg}`, error);
    // Send to monitoring service (optional)
  },
  perf: (label: string, duration: number) => {
    console.log(`[PERF] ${label}: ${duration}ms`);
  }
};

// Usage
log.info('Logo generated', { brandName: 'TechFlow' });
log.perf('API call', Date.now() - startTime);
```

**Performance Tracking:**
```typescript
// Track API response times
const start = performance.now();
await callClaude(prompt);
const duration = performance.now() - start;

if (duration > 10000) {
  log.error('Slow API response', { duration });
}
```

### Infrastructure Monitoring

**Cloudflare Analytics Dashboard:**
- Requests per minute
- Error rate
- Bandwidth usage
- Cache hit ratio

**Monad Explorer:**
- Transaction status
- Gas usage
- Contract events
- Block confirmation

---

## ⚡ Performance Optimization

### Build Optimization

**Next.js Config:**
```javascript
// next.config.mjs
export default {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: ['ipfs.io'],
  },
};
```

**Bundle Analysis:**
```bash
# Analyze bundle size
pnpm add -D @next/bundle-analyzer

# Run analysis
ANALYZE=true pnpm build
```

### Runtime Optimization

**Code Splitting:**
```typescript
// components/LogoGenerator.tsx
import dynamic from 'next/dynamic';

const LogoPreview = dynamic(() => import('./LogoPreview'), {
  loading: () => <p>Loading preview...</p>,
  ssr: false,
});
```

**Caching:**
```typescript
// Cache Claude responses (optional)
const cache = new Map();

export async function callClaudeWithCache(prompt: string) {
  if (cache.has(prompt)) {
    return cache.get(prompt);
  }

  const response = await callClaude(prompt);
  cache.set(prompt, response);
  return response;
}
```

---

## 🔐 Security Hardening

### API Key Protection

**Never commit secrets:**
```bash
# .gitignore
.env.local
.env.production
*.key
*.pem
```

**Environment variable validation:**
```typescript
// lib/config.ts
const requiredEnvVars = [
  'CLAUDE_API_KEY',
  'NEXT_PUBLIC_MONAD_RPC_URL',
];

requiredEnvVars.forEach(key => {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});
```

### Rate Limiting

**Client-side:**
```typescript
// lib/rate-limiter.ts
const RATE_LIMIT = 10; // requests per minute
const requests: number[] = [];

export function checkRateLimit(): boolean {
  const now = Date.now();
  const oneMinuteAgo = now - 60000;

  // Remove old requests
  requests.filter(time => time > oneMinuteAgo);

  if (requests.length >= RATE_LIMIT) {
    return false; // Rate limit exceeded
  }

  requests.push(now);
  return true;
}
```

### Input Sanitization

```typescript
// lib/sanitize.ts
export function sanitizeBrandName(input: string): string {
  // Remove special characters, XSS attempts
  return input
    .replace(/<script>/gi, '')
    .replace(/[^\w\s-]/gi, '')
    .slice(0, 50); // Max 50 chars
}
```

---

## 🔥 Incident Response

### Common Issues & Fixes

#### Issue 1: API Rate Limit Hit

**Symptoms:** Claude API returns 429 error

**Fix:**
```typescript
// Implement exponential backoff
async function callClaudeWithRetry(prompt: string, retries = 3) {
  try {
    return await callClaude(prompt);
  } catch (error) {
    if (error.status === 429 && retries > 0) {
      await sleep(2000 * (4 - retries)); // 2s, 4s, 6s
      return callClaudeWithRetry(prompt, retries - 1);
    }
    throw error;
  }
}
```

#### Issue 2: Deployment Failure

**Symptoms:** Build fails on Cloudflare

**Fix:**
```bash
# Check build locally
pnpm build

# Check logs in Cloudflare dashboard
# Fix errors, push again
git commit -m "fix: build errors"
git push
```

#### Issue 3: Smart Contract Transaction Failing

**Symptoms:** MetaMask transaction reverts

**Fix:**
```bash
# Check contract on Monad Explorer
# Verify function parameters
# Check gas limits
# Try manual transaction with higher gas
```

#### Issue 4: Site Down/504 Error

**Symptoms:** Site unreachable

**Fix:**
1. Check Cloudflare status page
2. Verify DNS settings
3. Check environment variables
4. Rollback to last working version:
   ```bash
   git revert HEAD
   git push
   ```

---

## 📊 Health Checks

### Pre-Deploy Checklist

```bash
# Run all checks before deploying
./scripts/pre-deploy-check.sh
```

**Script:**
```bash
#!/bin/bash

echo "🔍 Running pre-deploy checks..."

# 1. Lint
pnpm lint || { echo "❌ Lint failed"; exit 1; }

# 2. Type check
pnpm typecheck || { echo "❌ Type check failed"; exit 1; }

# 3. Build test
pnpm build || { echo "❌ Build failed"; exit 1; }

# 4. Environment variables
if [ -z "$CLAUDE_API_KEY" ]; then
  echo "❌ CLAUDE_API_KEY not set"
  exit 1
fi

# 5. Test API connection
curl -s https://api.anthropic.com/v1/messages \
  -H "x-api-key: $CLAUDE_API_KEY" \
  || { echo "❌ Claude API unreachable"; exit 1; }

echo "✅ All checks passed! Ready to deploy."
```

### Post-Deploy Verification

```bash
# Run after deployment
./scripts/post-deploy-verify.sh
```

**Script:**
```bash
#!/bin/bash

PROD_URL="https://machups.pages.dev"

echo "🔍 Verifying production deployment..."

# 1. Site is reachable
curl -s -o /dev/null -w "%{http_code}" $PROD_URL | grep -q "200" \
  || { echo "❌ Site unreachable"; exit 1; }

# 2. No console errors (manual check)
echo "👀 Check browser console for errors"

# 3. API endpoint works
curl -s "$PROD_URL/api/health" | grep -q "ok" \
  || { echo "❌ API health check failed"; exit 1; }

# 4. Contract deployed (manual check)
echo "👀 Verify contract on Monad Explorer"

echo "✅ Production deployment verified!"
```

---

## 📈 Capacity Planning

### Expected Load

| Metric | Expected | Capacity |
|--------|----------|----------|
| Users | 50-100 | 1000+ |
| Requests/min | 10-20 | 100+ |
| Claude API calls | 50-100 | 1000/day |
| Storage | <1GB | 100GB |
| Bandwidth | <10GB | 100GB/mo |

### Scaling Strategy

**If traffic spikes:**
1. Cloudflare auto-scales (no action needed)
2. Claude API has rate limits (handle gracefully)
3. Smart contracts are on-chain (no scaling needed)

---

## 🎯 Demo Day Preparation

### H10:30 - Final Infrastructure Check

```bash
# 1. Production deployment verified
curl https://machups.pages.dev

# 2. All features working
# - Logo generation ✓
# - Token generation ✓
# - Component generation ✓
# - Export ZIP ✓
# - x402 payments ✓
# - NFT minting ✓

# 3. Demo data prepared
# - Test wallets funded
# - Sample brands pre-generated
# - Backup screenshots ready

# 4. Monitoring active
# - Cloudflare dashboard open
# - Browser console clear
# - Network tab open

# 5. Rollback plan ready
# - Last commit hash saved
# - git revert command ready
# - Backup video ready
```

---

## 🔧 Quick Reference

### Useful Commands

```bash
# Local development
pnpm dev                  # Start dev server
pnpm build               # Test production build
pnpm lint                # Run linter
pnpm typecheck           # Check TypeScript

# Deployment
git push origin main     # Deploy to production
git push origin develop  # Deploy to staging

# Cloudflare CLI
wrangler pages deploy .next  # Manual deploy
wrangler tail            # View logs

# Smart contracts
forge build              # Compile contracts
forge test               # Run tests
forge script scripts/Deploy.s.sol --broadcast  # Deploy
```

### Important URLs

- **Production:** https://machups.pages.dev
- **Cloudflare Dashboard:** https://dash.cloudflare.com
- **Monad Explorer:** https://explorer.testnet.monad.xyz
- **GitHub Actions:** https://github.com/4eckd/monad-blitz-sf/actions
- **Anthropic Console:** https://console.anthropic.com

---

## ✅ DevOps Success Metrics

Track these throughout the event:

| Metric | Target | Actual |
|--------|--------|--------|
| Uptime | 100% | __ |
| Deploy time | <5min | __ |
| Failed deployments | 0 | __ |
| API errors | <1% | __ |
| Page load time | <3s | __ |
| Build time | <2min | __ |

---

**Created:** 2025-12-03
**Event:** Monad Blitz #18
**Strategy:** Deploy early, monitor actively, iterate rapidly

🛠️ **Infrastructure is code. Code is infrastructure.**
