# Auto-Deploy Quick Start Guide

Get your generated brand live on a custom subdomain in under 90 seconds!

## Overview

The MACHUPS Auto-Deploy system automatically deploys your generated brand package to a live, publicly accessible subdomain on `machups.com` with optional NFT minting on Monad blockchain.

**Example**: Brand named "Hero Analytics" → `hero-analytics.machups.com`

## Prerequisites

- Generated brand package (logo, design tokens, components)
- Cloudflare account with API access
- (Optional) Monad wallet for NFT minting

## Environment Setup

Add these environment variables to your `.env.local`:

```bash
# Cloudflare Configuration
CLOUDFLARE_API_TOKEN=your_api_token_here
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
CLOUDFLARE_ZONE_ID=your_zone_id_here

# IPFS Storage (for NFT metadata)
IPFS_API_KEY=your_ipfs_api_key
IPFS_API_SECRET=your_ipfs_secret

# NFT Contract (Monad Testnet)
NFT_CONTRACT_ADDRESS=0x...
THIRDWEB_SECRET_KEY=your_thirdweb_key

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Basic Usage

### 1. Simple Deployment (No NFT)

```typescript
import { autoDeploy } from '@/lib/deployment';

const result = await autoDeploy({
  subdomain: 'my-brand',
  brandId: 'brand_abc123',
  brandName: 'My Awesome Brand',
  brandPackagePath: '/path/to/brand/package',
  includeNFT: false
});

console.log(`Live at: ${result.url}`);
// Output: Live at: https://my-brand.machups.com
```

### 2. Deployment with NFT Minting

```typescript
import { autoDeploy, onDeploymentProgress } from '@/lib/deployment';

const config = {
  subdomain: 'hero-analytics',
  brandId: 'brand_xyz789',
  brandName: 'Hero Analytics',
  brandPackagePath: '/brands/hero-analytics',
  includeNFT: true,
  walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
};

// Monitor progress in real-time
const unsubscribe = onDeploymentProgress(config.subdomain, (progress) => {
  console.log(`${progress.currentStage}: ${progress.progress}%`);
});

const result = await autoDeploy(config);

if (result.status === 'live') {
  console.log('Deployment successful!');
  console.log(`URL: ${result.url}`);
  console.log(`NFT Token ID: ${result.nftTokenId}`);
} else {
  console.error('Deployment failed:', result.error);
}

unsubscribe();
```

### 3. Check Subdomain Availability First

```typescript
import { checkSubdomain } from '@/lib/deployment';

const check = await checkSubdomain('my-brand', 'My Brand', 'SaaS');

if (check.available) {
  console.log('Subdomain is available!');
  // Proceed with deployment
} else {
  console.log('Subdomain taken. Try these:');
  check.suggestions.forEach(s => console.log(`  - ${s}`));
}
```

## Real-Time Progress Tracking

```typescript
import { autoDeploy, onDeploymentProgress } from '@/lib/deployment';

const deploymentId = await startDeployment();

onDeploymentProgress(deploymentId, (progress) => {
  // Update UI with progress
  updateProgressBar(progress.progress);
  updateStatusText(progress.currentStage);

  if (progress.status === 'live') {
    showSuccessMessage(progress.url);
  } else if (progress.status === 'failed') {
    showErrorMessage(progress.error);
  }
});
```

## Deployment Stages

| Stage | Duration | Description |
|-------|----------|-------------|
| **Checking Subdomain** | 2s | Verify subdomain availability |
| **Building** | 20-30s | Build brand package |
| **Deploying** | 10-20s | Deploy to Cloudflare Pages |
| **Configuring SSL** | 5-10s | Provision SSL certificate |
| **Capturing Screenshot** | 5-10s | Take screenshot for NFT |
| **Minting NFT** | 10-30s | Mint on Monad (if enabled) |
| **Total** | **< 90s** | **Complete deployment** |

## Error Handling

```typescript
const result = await autoDeploy(config);

if (result.status === 'failed') {
  const error = result.error!;

  console.error(`Deployment failed at ${error.stage}: ${error.message}`);
  console.log('User-friendly message:', error.userMessage);

  if (error.retryable) {
    console.log('This error is retryable. Suggested fixes:');
    error.suggestedFixes?.forEach(fix => {
      console.log(`  - ${fix.action}`);
      if (fix.automatic) {
        console.log('    (Will be applied automatically on retry)');
      }
    });

    // Retry deployment
    const retryResult = await retryDeployment(result.id);
  }
}
```

## Common Issues

### Issue: Subdomain Already Taken

**Solution**: Use the suggested alternatives or provide a custom subdomain

```typescript
const check = await checkSubdomain('brand');

if (!check.available) {
  // Use first suggestion
  config.subdomain = check.suggestions[0];
  // Or let user choose
  const userChoice = await promptUserToChoose(check.suggestions);
  config.subdomain = userChoice;
}
```

### Issue: Deployment Times Out

**Solution**: Check network connectivity and Cloudflare API status

```typescript
const result = await autoDeploy(config);

if (result.error?.code === 'TIMEOUT') {
  // Wait a moment and retry
  await sleep(5000);
  const retryResult = await retryDeployment(result.id);
}
```

### Issue: NFT Minting Fails

**Solution**: NFT minting is non-critical; deployment still succeeds

```typescript
const result = await autoDeploy(config);

if (result.status === 'live' && !result.nftTokenId) {
  // Deployment succeeded but NFT failed
  console.log('Brand is live, but NFT minting failed');

  // Generate claim link for later
  const claimLink = generateNFTClaimLink(result.id, config.walletAddress);
  console.log('Claim NFT later:', claimLink);
}
```

## Advanced Usage

### Custom Screenshot Configuration

```typescript
import { autoDeploy, captureDeploymentScreenshot } from '@/lib/deployment';

// Deploy first
const result = await autoDeploy(config);

// Then capture custom screenshot
const { buffer, metadata } = await captureDeploymentScreenshot(
  result.url,
  {
    viewport: { width: 1920, height: 1080, deviceScaleFactor: 2 },
    waitForSelector: '[data-hero-loaded]',
    waitForTimeout: 10000,
    hideElements: ['[data-chat-widget]', '[data-cookie-banner]']
  }
);

// Use custom screenshot for social media
await uploadToSocialMedia(buffer);
```

### Deployment Metrics

```typescript
import { getDeploymentMetrics } from '@/lib/deployment';

const metrics = getDeploymentMetrics();

console.log(`Total deployments: ${metrics.total}`);
console.log(`Success rate: ${metrics.successRate}%`);
console.log(`Currently deploying: ${metrics.inProgress}`);
```

### Custom Domain Configuration (Premium)

```typescript
import { configureCustomDomain } from '@/lib/deployment';

const result = await autoDeploy(config);

// After deployment, configure custom domain
await configureCustomDomain(
  config.subdomain,
  'www.mybrand.com'
);

console.log('Brand now available at:');
console.log(`  - ${result.url} (MACHUPS subdomain)`);
console.log(`  - https://www.mybrand.com (custom domain)`);
```

## API Reference

See [API Documentation](../api/DEPLOY_API.md) for complete API reference.

## Best Practices

1. **Always check subdomain availability first** before starting deployment
2. **Monitor progress** using `onDeploymentProgress` for better UX
3. **Handle errors gracefully** and provide clear feedback to users
4. **Don't block on NFT minting** - it's optional and can be retried later
5. **Use deployment metrics** to monitor system health

## Next Steps

- [Deployment API Reference](../api/DEPLOY_API.md)
- [NFT Minting Guide](./NFT_MINTING.md)
- [Custom Domain Setup](./CUSTOM_DOMAINS.md)
- [Troubleshooting](./DEPLOYMENT_TROUBLESHOOTING.md)

---

**Need Help?** Join our [Discord](https://discord.gg/machups) or check [GitHub Discussions](https://github.com/4eckd/monad-blitz-sf/discussions)
