# MACHUPS Milestone Plan - Complete Implementation Strategy

## Overview

This document defines the complete development roadmap for MACHUPS, from foundation to production launch. All features are developed in **parallel branches** and merged in a **specific order** to prevent conflicts.

---

## Base Branch Strategy

**Main Branch**: `main` (production-ready code only)
**Development Branch**: `develop` (integration branch)
**Feature Branches**: `feature/{feature-name}` (individual features)

### Branch Hierarchy
```
main (production)
  └─ develop (integration)
      ├─ feature/foundation
      ├─ feature/brand-generation
      ├─ feature/design-tokens
      ├─ feature/component-generator
      ├─ feature/nft-system
      ├─ feature/auto-deploy
      ├─ feature/preview-deployments
      └─ feature/premium-features
```

---

## Phase 0: Foundation (COMPLETED ✅)

**Status**: Merged to `main`
**Branch**: `feature/foundation` → `develop` → `main`
**Version**: v0.1.0 → v0.2.0

### Deliverables
- ✅ Next.js 15 + React 19 setup
- ✅ TypeScript configuration
- ✅ Tailwind CSS + design system
- ✅ MCP integrations (4 servers)
- ✅ GitHub workflows
- ✅ Documentation structure
- ✅ Animation system (Framer Motion)
- ✅ Icon libraries (Web3Icons, Lucide)

### Merge Order
```
feature/foundation → develop (completed)
develop → main (completed, tagged v0.2.0)
```

---

## Phase 1: Core Brand Generation (IN PROGRESS)

**Target**: v0.3.0
**Timeline**: Dec 4-11, 2025 (7 days)
**Parallel Branches**: 5 feature branches

### 1.1 Auto-Deploy System
**Branch**: `feature/auto-deploy`
**Status**: 🟡 Code Complete, Dependencies Installing
**Owner**: Primary Dev Team

**Deliverables**:
- [x] Subdomain checker with DNS validation
- [x] Cloudflare Pages deployer
- [x] Screenshot capture (Puppeteer)
- [x] NFT minting integration (thirdweb)
- [x] NFT certificate template (SVG)
- [x] Real-time progress tracking
- [ ] Install puppeteer + thirdweb (in progress)
- [ ] Integration tests
- [ ] API routes
- [ ] UI components

**Dependencies**: None (standalone)

### 1.2 Preview Deployments
**Branch**: `feature/preview-deployments`
**Status**: 🔵 Not Started
**Owner**: Deploy Team

**Deliverables**:
- [ ] Time-limited preview system
- [ ] Sequential numbering (brand.machups.com, brand1.machups.com)
- [ ] Tier-based duration (Free: 1hr, Premium: 24hr)
- [ ] Auto-expiration cron job
- [ ] Preview dashboard UI
- [ ] Subdomain cleanup system
- [ ] Usage analytics

**Dependencies**: Requires `feature/auto-deploy` (merge first)

### 1.3 Brand Generation Engine
**Branch**: `feature/brand-generation`
**Status**: 🔵 Not Started
**Owner**: AI Team

**Deliverables**:
- [ ] Claude Sonnet 4.5 integration
- [ ] Brand strategy generator
- [ ] Logo generation (DALL-E/SD)
- [ ] Color palette generator (WCAG compliant)
- [ ] Typography system generator
- [ ] Brand name validator
- [ ] Generation pipeline orchestrator

**Dependencies**: None (standalone)

### 1.4 Design Token System
**Branch**: `feature/design-tokens`
**Status**: 🔵 Not Started
**Owner**: Design Systems Team

**Deliverables**:
- [ ] W3C DTCG token generator
- [ ] Token exporters (JSON, CSS, SCSS, Tailwind)
- [ ] Semantic color system
- [ ] Animation tokens (transitions, hover, loading)
- [ ] Token validation
- [ ] Documentation generator

**Dependencies**: Requires `feature/brand-generation` (partial)

### 1.5 NFT Rarity System
**Branch**: `feature/nft-rarity`
**Status**: 🟡 Design Complete
**Owner**: Blockchain Team

**Deliverables**:
- [ ] Deterministic seed generator
- [ ] Rarity tier calculator
- [ ] Color theme selector
- [ ] Testnet smart contract
- [ ] Mainnet airdrop contract
- [ ] Claim verification system
- [ ] Rarity engine tests

**Dependencies**: Requires `feature/auto-deploy` (for NFT minting)

---

## Phase 1 Merge Strategy

### CRITICAL: Merge Order MUST Be Followed

```
Step 1: feature/auto-deploy → develop
  ├─ Reason: Foundation for deployments and NFTs
  ├─ Pre-merge checklist:
  │   - [ ] pnpm install completes successfully
  │   - [ ] All TypeScript compiles without errors
  │   - [ ] Unit tests pass
  │   - [ ] Integration tests pass
  │   - [ ] Documentation complete
  └─ Commands:
      git checkout develop
      git merge feature/auto-deploy --no-ff
      git tag v0.3.0-alpha.1

Step 2: feature/nft-rarity → develop
  ├─ Reason: Depends on auto-deploy NFT minting
  ├─ Pre-merge checklist:
  │   - [ ] Smart contracts deployed to testnet
  │   - [ ] Rarity tests pass (all tiers)
  │   - [ ] Integration with auto-deploy verified
  │   - [ ] Gas cost < 0.01 MON per mint
  └─ Commands:
      git checkout develop
      git merge feature/nft-rarity --no-ff
      git tag v0.3.0-alpha.2

Step 3: feature/brand-generation → develop
  ├─ Reason: Independent, can merge anytime
  ├─ Pre-merge checklist:
  │   - [ ] Claude API integration works
  │   - [ ] Logo generation < 30s
  │   - [ ] Color palette WCAG AA compliant
  │   - [ ] End-to-end brand generation < 3 min
  └─ Commands:
      git checkout develop
      git merge feature/brand-generation --no-ff
      git tag v0.3.0-alpha.3

Step 4: feature/design-tokens → develop
  ├─ Reason: Depends on brand-generation colors/typography
  ├─ Pre-merge checklist:
  │   - [ ] W3C DTCG spec compliance
  │   - [ ] All 4 export formats work
  │   - [ ] Token validation passes
  │   - [ ] Documentation generated correctly
  └─ Commands:
      git checkout develop
      git merge feature/design-tokens --no-ff
      git tag v0.3.0-alpha.4

Step 5: feature/preview-deployments → develop
  ├─ Reason: Depends on auto-deploy, final feature
  ├─ Pre-merge checklist:
  │   - [ ] Free tier: 1hr expiration works
  │   - [ ] Premium tier: 24hr expiration works
  │   - [ ] Sequential numbering correct
  │   - [ ] Cleanup cron job tested
  │   - [ ] No conflicts with auto-deploy
  └─ Commands:
      git checkout develop
      git merge feature/preview-deployments --no-ff
      git tag v0.3.0-beta.1

Step 6: Integration Testing on develop
  ├─ Tasks:
  │   - [ ] Full end-to-end test (brand gen → deploy → NFT)
  │   - [ ] Load testing (10 concurrent users)
  │   - [ ] Preview expiration edge cases
  │   - [ ] Cross-feature integration
  └─ Fix any integration bugs on develop

Step 7: develop → main (Production Release)
  ├─ Pre-merge checklist:
  │   - [ ] All alpha/beta tests passed
  │   - [ ] Security audit complete
  │   - [ ] Performance benchmarks met
  │   - [ ] Documentation up to date
  │   - [ ] CHANGELOG.md updated
  │   - [ ] Version bumped to v0.3.0
  └─ Commands:
      git checkout main
      git merge develop --no-ff
      git tag v0.3.0
      git push origin main --tags
```

---

## Phase 2: Component Generation (Future)

**Target**: v0.4.0
**Timeline**: Dec 12-18, 2025

### Features
- `feature/component-generator` - AI-powered React components
- `feature/shadcn-integration` - ShadCN UI integration
- `feature/component-playground` - Live component preview
- `feature/accessibility-audit` - WCAG validation

### Merge Order
```
1. feature/component-generator → develop
2. feature/shadcn-integration → develop (depends on #1)
3. feature/component-playground → develop (depends on #1)
4. feature/accessibility-audit → develop (independent)
5. develop → main (v0.4.0)
```

---

## Phase 3: Premium Features (Future)

**Target**: v0.5.0
**Timeline**: Dec 19-25, 2025

### Features
- `feature/pitch-deck-generator` - Branded investor decks
- `feature/ab-testing-variants` - Design variation system
- `feature/custom-domains` - BYOD support
- `feature/team-collaboration` - Multi-user workspaces
- `feature/stripe-integration` - Payment processing

### Merge Order
```
1. feature/stripe-integration → develop (first, required for payments)
2. feature/pitch-deck-generator → develop (independent)
3. feature/ab-testing-variants → develop (independent)
4. feature/custom-domains → develop (depends on auto-deploy)
5. feature/team-collaboration → develop (independent)
6. develop → main (v0.5.0)
```

---

## Phase 4: Production Launch (Future)

**Target**: v1.0.0
**Timeline**: Dec 26, 2025 - Jan 15, 2026

### Features
- `feature/analytics-dashboard` - Usage metrics
- `feature/admin-panel` - Management interface
- `feature/marketing-site` - Landing page
- `feature/docs-site` - Docusaurus documentation
- `feature/api-v1` - Public API

### Merge Order
```
1. feature/api-v1 → develop (foundation for others)
2. feature/analytics-dashboard → develop (depends on API)
3. feature/admin-panel → develop (depends on API)
4. feature/marketing-site → develop (independent)
5. feature/docs-site → develop (independent)
6. develop → main (v1.0.0) 🚀
```

---

## Preview Deployments Feature Specification

### Overview
Time-limited preview deployments with tier-based duration and sequential numbering.

### User Flows

#### Free Tier (1 Hour Preview)
```
1. User generates brand "Hero Analytics"
2. System deploys to hero-analytics.machups.com
3. Preview URL active for 1 hour
4. At 55 minutes: Warning notification
5. At 60 minutes: Automatic cleanup

If user regenerates:
1. New deployment → hero-analytics1.machups.com
2. Previous URL (hero-analytics.machups.com) expires
3. Sequential numbering continues (hero-analytics2, hero-analytics3, etc.)
```

#### Premium Tier (24 Hour Preview)
```
1. User generates brand "Hero Analytics"
2. System deploys to hero-analytics.machups.com
3. Preview URL active for 24 hours
4. At 23 hours: Warning notification
5. At 24 hours: Automatic cleanup (unless extended)

Extension options:
- Add another 24 hours: $5
- Upgrade to permanent: $10/month
```

### Technical Implementation

#### Database Schema
```typescript
interface PreviewDeployment {
  id: string;
  brandId: string;
  userId: string;
  subdomain: string;           // "hero-analytics"
  sequenceNumber: number;      // 0, 1, 2, 3...
  fullSubdomain: string;       // "hero-analytics.machups.com" or "hero-analytics1.machups.com"
  tier: 'free' | 'premium';
  expiresAt: Date;
  createdAt: Date;
  status: 'active' | 'expiring' | 'expired' | 'extended';
  warningsSent: number;        // 0, 1 (at 55 min or 23 hr)
}
```

#### Subdomain Generation Logic
```typescript
async function generatePreviewSubdomain(
  brandName: string,
  userId: string
): Promise<{ subdomain: string; sequenceNumber: number }> {
  const baseSubdomain = normalizeBrandName(brandName);

  // Find all previous deployments for this brand by this user
  const existingDeployments = await db.previewDeployments.findMany({
    where: {
      userId,
      subdomain: baseSubdomain
    },
    orderBy: { sequenceNumber: 'desc' }
  });

  if (existingDeployments.length === 0) {
    // First deployment: brand.machups.com
    return { subdomain: baseSubdomain, sequenceNumber: 0 };
  }

  // Subsequent deployments: brand1.machups.com, brand2.machups.com, etc.
  const nextSequence = existingDeployments[0].sequenceNumber + 1;
  const numberedSubdomain = `${baseSubdomain}${nextSequence}`;

  return { subdomain: numberedSubdomain, sequenceNumber: nextSequence };
}
```

#### Expiration System
```typescript
// Cron job: runs every 5 minutes
async function checkExpiringPreviews() {
  const now = new Date();
  const warningThreshold = new Date(now.getTime() + 5 * 60 * 1000); // 5 min warning

  // Find previews expiring soon
  const expiringSoon = await db.previewDeployments.findMany({
    where: {
      status: 'active',
      expiresAt: { lte: warningThreshold, gt: now },
      warningsSent: 0
    }
  });

  // Send warnings
  for (const preview of expiringSoon) {
    await sendExpirationWarning(preview);
    await db.previewDeployments.update({
      where: { id: preview.id },
      data: { warningsSent: 1, status: 'expiring' }
    });
  }

  // Find expired previews
  const expired = await db.previewDeployments.findMany({
    where: {
      status: { in: ['active', 'expiring'] },
      expiresAt: { lte: now }
    }
  });

  // Cleanup expired previews
  for (const preview of expired) {
    await cleanupPreviewDeployment(preview);
    await db.previewDeployments.update({
      where: { id: preview.id },
      data: { status: 'expired' }
    });
  }
}

async function cleanupPreviewDeployment(preview: PreviewDeployment) {
  // Remove from Cloudflare Pages
  await cloudflareDeployer.deleteProject(preview.fullSubdomain);

  // Remove DNS record
  await cloudflareDeployer.deleteDNSRecord(preview.fullSubdomain);

  // Log cleanup
  console.log(`Cleaned up preview: ${preview.fullSubdomain}`);
}
```

#### Tier-Based Duration
```typescript
function getPreviewDuration(tier: 'free' | 'premium'): number {
  const DURATIONS = {
    free: 60 * 60 * 1000,        // 1 hour
    premium: 24 * 60 * 60 * 1000 // 24 hours
  };

  return DURATIONS[tier];
}

async function createPreviewDeployment(
  brandId: string,
  userId: string,
  brandName: string,
  tier: 'free' | 'premium'
): Promise<PreviewDeployment> {
  const { subdomain, sequenceNumber } = await generatePreviewSubdomain(brandName, userId);
  const fullSubdomain = sequenceNumber === 0 ? subdomain : `${subdomain}${sequenceNumber}`;
  const duration = getPreviewDuration(tier);
  const expiresAt = new Date(Date.now() + duration);

  const preview = await db.previewDeployments.create({
    data: {
      brandId,
      userId,
      subdomain,
      sequenceNumber,
      fullSubdomain,
      tier,
      expiresAt,
      status: 'active',
      warningsSent: 0
    }
  });

  // Deploy to Cloudflare
  await autoDeploy({
    subdomain: fullSubdomain,
    brandId,
    brandName,
    brandPackagePath: `/brands/${brandId}`,
    includeNFT: false
  });

  return preview;
}
```

### UI Components

#### Preview Timer
```tsx
function PreviewTimer({ expiresAt }: { expiresAt: Date }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expiresAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(expiresAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const isExpiringSoon = timeLeft.minutes < 10;

  return (
    <div className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-lg",
      isExpiringSoon ? "bg-orange-500/10 border border-orange-500" : "bg-blue-500/10 border border-blue-500"
    )}>
      <Clock className="w-4 h-4" />
      <span className="text-sm font-medium">
        {isExpiringSoon ? "⚠️ " : ""}
        Preview expires in: {formatTime(timeLeft)}
      </span>
      {isExpiringSoon && (
        <Button size="sm" variant="outline">
          Extend Preview
        </Button>
      )}
    </div>
  );
}
```

### Extension & Upgrade Options
```typescript
interface PreviewExtension {
  type: 'extend' | 'upgrade_permanent';
  price: number;
  duration?: number;
}

const EXTENSION_OPTIONS: Record<string, PreviewExtension> = {
  extend_24h: {
    type: 'extend',
    price: 500, // $5.00 in cents
    duration: 24 * 60 * 60 * 1000
  },
  upgrade_permanent: {
    type: 'upgrade_permanent',
    price: 1000 // $10.00/month in cents
  }
};

async function extendPreview(
  previewId: string,
  extensionType: keyof typeof EXTENSION_OPTIONS
): Promise<PreviewDeployment> {
  const preview = await db.previewDeployments.findUnique({ where: { id: previewId } });
  const extension = EXTENSION_OPTIONS[extensionType];

  // Process payment
  await processPayment(preview.userId, extension.price);

  if (extension.type === 'extend') {
    // Add duration to expiration
    const newExpiresAt = new Date(preview.expiresAt.getTime() + extension.duration!);
    return db.previewDeployments.update({
      where: { id: previewId },
      data: {
        expiresAt: newExpiresAt,
        status: 'active',
        warningsSent: 0
      }
    });
  } else {
    // Upgrade to permanent (no expiration)
    return db.previewDeployments.update({
      where: { id: previewId },
      data: {
        expiresAt: null,
        status: 'active',
        tier: 'permanent'
      }
    });
  }
}
```

---

## Development Rules

### NEVER Deviate From This Plan

**Rule 1**: All features MUST be developed in separate branches
**Rule 2**: Merge order MUST be followed exactly as specified
**Rule 3**: All pre-merge checklists MUST be completed
**Rule 4**: Version tags MUST be applied after each merge
**Rule 5**: Integration testing MUST occur on `develop` before merging to `main`

### Before Creating Any PR

**ALWAYS ask the user**: "Ready to merge `feature/X` to `develop`? This is Step N in Phase M merge order."

**ALWAYS show the checklist**:
```
Pre-merge Checklist for feature/X:
- [ ] All tests pass
- [ ] Documentation complete
- [ ] No TypeScript errors
- [ ] Dependencies installed
- [ ] Integration tests pass
- [ ] Performance benchmarks met

Merge Order Position: Step N of M
Dependencies: [List any required prior merges]
Version Tag: vX.Y.Z-alpha.N

Proceed? (yes/no)
```

### If User Requests Out-of-Order Merge

**REJECT** and explain:
```
❌ Cannot merge feature/Y before feature/X.

Reason: feature/Y depends on feature/X.

Current merge order (Phase N):
1. feature/X → develop ⬅ MUST MERGE FIRST
2. feature/Y → develop ⬅ YOU ARE HERE (blocked)
3. feature/Z → develop

Please complete Step 1 first, then return to Step 2.
```

---

## Version Strategy

### Semantic Versioning
- **MAJOR** (1.0.0): Breaking changes, major milestones
- **MINOR** (0.3.0): New features, backward compatible
- **PATCH** (0.3.1): Bug fixes, minor improvements

### Pre-Release Tags
- **alpha**: Individual features merged to `develop`
- **beta**: All features integrated, testing in progress
- **rc**: Release candidate, final testing

### Version Timeline
```
v0.1.0 - Initial setup (Dec 3, 2025)
v0.2.0 - Foundation complete (Dec 4, 2025)
v0.3.0-alpha.1 - Auto-deploy merged
v0.3.0-alpha.2 - NFT rarity merged
v0.3.0-alpha.3 - Brand generation merged
v0.3.0-alpha.4 - Design tokens merged
v0.3.0-alpha.5 - Preview deployments merged
v0.3.0-beta.1 - Integration testing
v0.3.0 - Phase 1 complete (Dec 11, 2025)
v0.4.0 - Component generation (Dec 18, 2025)
v0.5.0 - Premium features (Dec 25, 2025)
v1.0.0 - Public launch (Jan 15, 2026) 🚀
```

---

## Current Status

**Active Phase**: Phase 1 (Core Brand Generation)
**Current Step**: Step 1 - Installing dependencies for `feature/auto-deploy`
**Next Step**: Complete installation → Run tests → Merge to `develop`

**Branches Status**:
- ✅ `feature/foundation` - Merged to main (v0.2.0)
- 🟡 `feature/auto-deploy` - Code complete, installing deps
- 🔵 `feature/preview-deployments` - Not started (waiting for auto-deploy)
- 🔵 `feature/brand-generation` - Not started
- 🔵 `feature/design-tokens` - Not started
- 🔵 `feature/nft-rarity` - Design complete, code not started

---

**Last Updated**: December 4, 2025
**Document Version**: 1.0.0
**Status**: Active Development Plan

**⚠️ WARNING**: This plan is the single source of truth for development. Deviation requires team approval and document update.
