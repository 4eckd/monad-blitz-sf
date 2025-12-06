# MACHUPS - Branching Strategy & Git Workflow

**Project:** MACHUPS - AI-Powered Brand Generation Platform
**Repository:** https://github.com/4eckd/monad-blitz-sf
**Strategy:** Phase-based Feature Branching

---

## 🌳 Branch Structure

```
main (production)
│
├── develop (integration branch)
│   │
│   ├── phase-1-foundation
│   │   ├── feature/env-setup
│   │   ├── feature/repo-structure
│   │   ├── feature/mcp-clients
│   │   └── feature/claude-integration
│   │
│   ├── phase-2-core-engine
│   │   ├── feature/brand-analyzer
│   │   ├── feature/logo-generator
│   │   ├── feature/penpot-integration
│   │   └── feature/asset-export
│   │
│   ├── phase-3-design-system
│   │   ├── feature/token-generator
│   │   ├── feature/component-generator
│   │   ├── feature/tailwind-export
│   │   └── feature/penpot-sync
│   │
│   ├── phase-4-premium-features
│   │   ├── feature/pdf-generator
│   │   ├── feature/x402-payments
│   │   ├── feature/cloudflare-cache
│   │   └── feature/pitchdeck-generator
│   │
│   ├── phase-5-blockchain
│   │   ├── feature/nft-contract
│   │   ├── feature/monad-integration
│   │   ├── feature/thirdweb-sdk
│   │   └── feature/ipfs-storage
│   │
│   └── phase-6-deployment
│       ├── feature/docusaurus-sites
│       ├── feature/vercel-deploy
│       ├── feature/github-actions
│       └── feature/subdomain-routing
```

---

## 📋 Phase Breakdown

### Phase 1: Foundation Setup

**Parent Branch:** `phase-1-foundation`
**Duration:** Hours 0-1 (from CLAUDE.md)

#### Feature Branches:

1. **feature/env-setup**
   - Environment variables setup
   - Dependencies installation
   - Configuration files
   - **Files:** `.env.example`, `package.json`, `pnpm-workspace.yaml`

2. **feature/repo-structure**
   - Folder structure creation
   - Directory organization
   - Initial file scaffolding
   - **Files:** `/app`, `/lib`, `/contracts`, `/docs` directories

3. **feature/mcp-clients**
   - Penpot MCP client
   - Cloudflare MCP client
   - Vercel MCP client
   - **Files:** `lib/mcp/penpot.ts`, `lib/mcp/cloudflare.ts`, `lib/mcp/vercel.ts`

4. **feature/claude-integration**
   - Claude AI SDK setup
   - API client configuration
   - Prompt engineering
   - **Files:** `lib/ai/claude.ts`, `prompts/brand-generation.md`

---

### Phase 2: Core Generation Engine

**Parent Branch:** `phase-2-core-engine`
**Duration:** Hours 1-3

#### Feature Branches:

1. **feature/brand-analyzer**
   - Brand strategy analysis
   - Target audience profiling
   - Competitive positioning
   - **Files:** `lib/generators/brand-analyzer.ts`

2. **feature/logo-generator**
   - HTML/CSS logo generation
   - SVG export functionality
   - PNG export functionality
   - **Files:** `lib/generators/logos.ts`

3. **feature/penpot-integration**
   - Penpot MCP integration
   - Design file creation
   - Asset synchronization
   - **Files:** `lib/mcp/penpot-generator.ts`

4. **feature/asset-export**
   - Export orchestration
   - ZIP packaging
   - File management
   - **Files:** `lib/utils/export.ts`

---

### Phase 3: Design System Generation

**Parent Branch:** `phase-3-design-system`
**Duration:** Hours 3-5

#### Feature Branches:

1. **feature/token-generator**
   - W3C DTCG token generation
   - Color palette creation
   - Typography system
   - Spacing & shadows
   - **Files:** `lib/generators/tokens.ts`

2. **feature/component-generator**
   - React component generation
   - TypeScript definitions
   - Component variants
   - **Files:** `lib/generators/components.ts`

3. **feature/tailwind-export**
   - Tailwind config generation
   - CSS variable export
   - SCSS export
   - **Files:** `lib/generators/tailwind-export.ts`

4. **feature/penpot-sync**
   - Design token sync to Penpot
   - Component library creation
   - Bi-directional sync
   - **Files:** `lib/mcp/penpot-sync.ts`

---

### Phase 4: Premium Features

**Parent Branch:** `phase-4-premium-features`
**Duration:** Hours 5-7

#### Feature Branches:

1. **feature/pdf-generator**
   - Brand guidelines PDF
   - Puppeteer integration
   - Template system
   - **Files:** `lib/generators/guidelines.ts`

2. **feature/x402-payments**
   - x402 protocol integration
   - Payment verification
   - Premium feature gating
   - **Files:** `lib/blockchain/x402.ts`

3. **feature/cloudflare-cache**
   - Edge caching
   - KV storage
   - R2 asset storage
   - **Files:** `lib/mcp/cloudflare-cache.ts`

4. **feature/pitchdeck-generator**
   - Pitch deck generation
   - Slide templates
   - Export to PPTX/PDF
   - **Files:** `lib/generators/pitchdeck.ts`

---

### Phase 5: Blockchain Integration

**Parent Branch:** `phase-5-blockchain`
**Duration:** Hours 7-9

#### Feature Branches:

1. **feature/nft-contract**
   - Solidity contract
   - ERC-721 implementation
   - Certificate metadata
   - **Files:** `contracts/MACHUPSCertificate.sol`

2. **feature/monad-integration**
   - Monad RPC setup
   - Chain configuration
   - Gas optimization
   - **Files:** `lib/blockchain/monad-client.ts`

3. **feature/thirdweb-sdk**
   - Thirdweb integration
   - NFT minting
   - Wallet connection
   - **Files:** `lib/blockchain/thirdweb-client.ts`

4. **feature/ipfs-storage**
   - IPFS upload
   - Metadata storage
   - Image pinning
   - **Files:** `lib/utils/ipfs.ts`

---

### Phase 6: Deployment & Docs

**Parent Branch:** `phase-6-deployment`
**Duration:** Hours 9-10

#### Feature Branches:

1. **feature/docusaurus-sites**
   - Documentation site
   - Design system site
   - Content creation
   - **Files:** `docs/`, `design-site/`

2. **feature/vercel-deploy**
   - Vercel deployment
   - Environment configuration
   - Edge functions
   - **Files:** `vercel.json`, `.vercelignore`

3. **feature/github-actions**
   - CI/CD pipeline
   - Automated testing
   - Deployment automation
   - **Files:** `.github/workflows/`

4. **feature/subdomain-routing**
   - Dynamic subdomain generation
   - DNS configuration automation
   - Preview deployment system
   - **Files:** `lib/deployment/subdomain-router.ts`

---

## 🔄 Git Workflow

### Branch Naming Convention

```
<type>/<scope>-<description>

Types:
- feature/    New feature
- fix/        Bug fix
- refactor/   Code refactoring
- docs/       Documentation
- test/       Testing
- chore/      Build/tooling

Examples:
- feature/penpot-integration
- fix/logo-export-svg
- refactor/token-generator
- docs/api-reference
- test/component-generation
- chore/update-dependencies
```

### Workflow Steps

#### 1. Create Feature Branch

```bash
# From develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/penpot-integration

# Or create phase branch first
git checkout -b phase-2-core-engine
git checkout -b feature/penpot-integration
```

#### 2. Development

```bash
# Make changes
git add .
git commit -m "feat(penpot): add design file generation"

# Push to remote
git push origin feature/penpot-integration
```

#### 3. Create Pull Request

**PR Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update

## Phase
- Phase X: [Phase Name]

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests pass locally

## Dependencies
List any feature branches this depends on

## Screenshots
If applicable
```

#### 4. Code Review

**Reviewers check:**
- [ ] Code quality
- [ ] Test coverage
- [ ] Documentation
- [ ] Performance
- [ ] Security
- [ ] Brand consistency (for UI changes)

#### 5. Merge Strategy

**Feature → Phase Branch:**
```bash
# Squash merge feature into phase branch
git checkout phase-2-core-engine
git merge --squash feature/penpot-integration
git commit -m "feat(phase-2): add Penpot integration"
```

**Phase → Develop:**
```bash
# Merge commit (preserve phase history)
git checkout develop
git merge --no-ff phase-2-core-engine
```

**Develop → Main:**
```bash
# Only for releases
git checkout main
git merge --no-ff develop
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main --tags
```

---

## 🚦 Branch Protection Rules

### Main Branch
- ✅ Require pull request reviews (2 approvals)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ No direct pushes
- ✅ No force pushes
- ✅ No deletions

### Develop Branch
- ✅ Require pull request reviews (1 approval)
- ✅ Require status checks to pass
- ✅ No direct pushes (except phase merges)
- ✅ No force pushes

### Phase Branches
- ✅ Require status checks to pass
- ⚠️ Allow force pushes (for rebasing)
- ⚠️ Allow deletions (after merge)

### Feature Branches
- ⚠️ No protection (developer freedom)
- ✅ Delete after merge

---

## 📊 Merge Order & Dependencies

### Phase 1 Dependencies
```
feature/env-setup (no dependencies)
  ↓
feature/repo-structure (depends on env-setup)
  ↓
feature/mcp-clients (depends on repo-structure)
  ↓
feature/claude-integration (depends on mcp-clients)
```

### Phase 2 Dependencies
```
feature/brand-analyzer (depends on Phase 1)
  ↓
feature/logo-generator (depends on brand-analyzer)
  ↓
feature/penpot-integration (depends on logo-generator)
  ↓
feature/asset-export (depends on all Phase 2)
```

### Cross-Phase Dependencies
```
Phase 1 (Foundation)
  ↓
Phase 2 (Core Engine) → Depends on Phase 1
  ↓
Phase 3 (Design System) → Depends on Phase 2
  ↓
Phase 4 (Premium) → Depends on Phase 2, 3
  ↓
Phase 5 (Blockchain) → Independent (parallel with 4)
  ↓
Phase 6 (Deployment) → Depends on all phases
```

---

## 🔍 Branch Lifecycle

### Feature Branch Lifecycle

1. **Creation**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Development**
   - Regular commits
   - Push to remote frequently
   - Keep branch up to date with parent

3. **Ready for Review**
   ```bash
   git rebase phase-2-core-engine  # Rebase on parent
   git push origin feature/my-feature
   # Create PR
   ```

4. **After Merge**
   ```bash
   git branch -d feature/my-feature           # Delete local
   git push origin --delete feature/my-feature  # Delete remote
   ```

### Phase Branch Lifecycle

1. **Creation**
   ```bash
   git checkout develop
   git checkout -b phase-2-core-engine
   ```

2. **Feature Integration**
   - Merge features as they complete
   - Keep synchronized with develop

3. **Phase Complete**
   ```bash
   git checkout develop
   git merge --no-ff phase-2-core-engine
   git branch -d phase-2-core-engine  # Keep or delete
   ```

---

## 🎯 Current Branch Creation Script

Create all branches at once:

```bash
#!/bin/bash
# create-branches.sh

# Ensure we're on main
git checkout main

# Create develop if it doesn't exist
git checkout -b develop || git checkout develop

# Phase 1: Foundation
git checkout -b phase-1-foundation develop
git checkout -b feature/env-setup phase-1-foundation
git checkout -b feature/repo-structure phase-1-foundation
git checkout -b feature/mcp-clients phase-1-foundation
git checkout -b feature/claude-integration phase-1-foundation

# Phase 2: Core Engine
git checkout -b phase-2-core-engine develop
git checkout -b feature/brand-analyzer phase-2-core-engine
git checkout -b feature/logo-generator phase-2-core-engine
git checkout -b feature/penpot-integration phase-2-core-engine
git checkout -b feature/asset-export phase-2-core-engine

# Phase 3: Design System
git checkout -b phase-3-design-system develop
git checkout -b feature/token-generator phase-3-design-system
git checkout -b feature/component-generator phase-3-design-system
git checkout -b feature/tailwind-export phase-3-design-system
git checkout -b feature/penpot-sync phase-3-design-system

# Phase 4: Premium Features
git checkout -b phase-4-premium-features develop
git checkout -b feature/pdf-generator phase-4-premium-features
git checkout -b feature/x402-payments phase-4-premium-features
git checkout -b feature/cloudflare-cache phase-4-premium-features
git checkout -b feature/pitchdeck-generator phase-4-premium-features

# Phase 5: Blockchain
git checkout -b phase-5-blockchain develop
git checkout -b feature/nft-contract phase-5-blockchain
git checkout -b feature/monad-integration phase-5-blockchain
git checkout -b feature/thirdweb-sdk phase-5-blockchain
git checkout -b feature/ipfs-storage phase-5-blockchain

# Phase 6: Deployment
git checkout -b phase-6-deployment develop
git checkout -b feature/docusaurus-sites phase-6-deployment
git checkout -b feature/vercel-deploy phase-6-deployment
git checkout -b feature/github-actions phase-6-deployment
git checkout -b feature/subdomain-routing phase-6-deployment

# Return to develop
git checkout develop

echo "✅ All branches created!"
```

---

## 📝 Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (no code change)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Build/tooling

### Examples

```bash
feat(penpot): add design file generation from brand tokens

- Integrate Penpot MCP client
- Generate color palettes
- Create typography styles
- Export design library

Closes #123

---

fix(logo): correct SVG export dimensions

Logo was exporting at incorrect size

Fixes #456

---

docs(api): add Penpot integration documentation

Added examples and API reference

---

chore(deps): update dependencies

- Update Next.js to 14.2.0
- Update Tailwind to 3.4.17
```

---

## 🔐 Security & Best Practices

### Never Commit
- ❌ API keys
- ❌ Private keys
- ❌ `.env` files
- ❌ Secrets
- ❌ Personal data

### Always
- ✅ Use `.gitignore`
- ✅ Use `.env.example`
- ✅ Review before committing
- ✅ Sign commits (optional)
- ✅ Use descriptive messages

### Branch Hygiene
- 🧹 Delete merged branches
- 🧹 Keep branches up to date
- 🧹 Rebase before PR
- 🧹 Squash unnecessary commits
- 🧹 Clean commit history

---

## 📊 Branch Status Tracking

### Phase 1: Foundation Setup
- [ ] feature/env-setup
- [ ] feature/repo-structure
- [ ] feature/mcp-clients
- [ ] feature/claude-integration
- [ ] **Phase 1 Complete**

### Phase 2: Core Engine
- [ ] feature/brand-analyzer
- [ ] feature/logo-generator
- [ ] feature/penpot-integration
- [ ] feature/asset-export
- [ ] **Phase 2 Complete**

### Phase 3: Design System
- [ ] feature/token-generator
- [ ] feature/component-generator
- [ ] feature/tailwind-export
- [ ] feature/penpot-sync
- [ ] **Phase 3 Complete**

### Phase 4: Premium Features
- [ ] feature/pdf-generator
- [ ] feature/x402-payments
- [ ] feature/cloudflare-cache
- [ ] feature/pitchdeck-generator
- [ ] **Phase 4 Complete**

### Phase 5: Blockchain
- [ ] feature/nft-contract
- [ ] feature/monad-integration
- [ ] feature/thirdweb-sdk
- [ ] feature/ipfs-storage
- [ ] **Phase 5 Complete**

### Phase 6: Deployment
- [ ] feature/docusaurus-sites
- [ ] feature/vercel-deploy
- [ ] feature/github-actions
- [ ] feature/subdomain-routing
- [ ] **Phase 6 Complete**

---

## 🎯 Quick Reference

```bash
# Start new feature
git checkout develop
git pull
git checkout -b feature/my-feature

# Daily workflow
git add .
git commit -m "feat(scope): description"
git push origin feature/my-feature

# Update from parent
git fetch origin
git rebase origin/develop

# Finish feature
# Create PR → Get Review → Merge
git checkout develop
git branch -d feature/my-feature
```

---

**Last Updated:** December 6, 2025
**Version:** 1.0.0
**Maintained by:** MACHUPS Team
