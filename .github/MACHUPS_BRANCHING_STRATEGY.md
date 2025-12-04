# 🌿 MACHUPS Rapid Development Branching Strategy

**Event:** Monad Blitz #18
**Duration:** 11 hours
**Goal:** Maximum velocity with minimal merge conflicts

---

## 🎯 Core Philosophy

**Speed > Perfect Process**

During an 11-hour hackathon, traditional Git workflows are too slow. This strategy optimizes for:
- ✅ **Rapid commits** (every 15-30min)
- ✅ **Minimal conflicts** (feature isolation)
- ✅ **Fast merges** (auto-merge when possible)
- ✅ **No blocking** (parallel development)
- ✅ **Quick rollback** (if needed)

---

## 🌳 Branch Structure

```
main
├── develop (integration branch)
├── phase-1/foundation
│   ├── feature/env-setup
│   ├── feature/claude-api
│   └── feature/logo-generator
├── phase-2/core-features
│   ├── feature/token-generator
│   ├── feature/component-generator
│   └── feature/export-system
├── phase-3/integration
│   ├── feature/cloudflare-deploy
│   ├── feature/x402-payments
│   └── feature/nft-minting
└── phase-4/finalization
    ├── feature/polish
    └── feature/demo-prep
```

---

## 📐 Branch Naming Convention

### Format
```
<type>/<component>-<short-description>
```

### Types
- `feature/` - New functionality
- `fix/` - Bug fixes
- `hotfix/` - Critical production fixes
- `polish/` - UI/UX improvements
- `docs/` - Documentation only

### Examples
```bash
feature/claude-api-integration
feature/logo-generator-ui
fix/button-color-contrast
hotfix/api-rate-limit
polish/loading-animations
docs/setup-instructions
```

---

## 🚀 Workflow by Phase

### Phase 1: Foundation (H0-H3)

**Strategy:** Sequential then parallel

#### H0-H1: Sequential Setup (1 person)
```bash
# Create phase branch
git checkout -b phase-1/foundation

# Quick setup commits
git add .
git commit -m "feat: initialize project structure"
git push -u origin phase-1/foundation

# Environment setup
git commit -m "feat: add environment variables"
git push

# Dependencies
git commit -m "feat: install core dependencies"
git push
```

#### H1-H3: Parallel Features (2-3 people)

**Developer 1: Claude API**
```bash
git checkout phase-1/foundation
git pull
git checkout -b feature/claude-api-integration

# Work on Claude API
git add lib/claude.ts
git commit -m "feat: add Claude API wrapper"
git push -u origin feature/claude-api-integration

# Create PR to phase-1/foundation
gh pr create --base phase-1/foundation --title "Claude API Integration"
```

**Developer 2: Logo Generator**
```bash
git checkout phase-1/foundation
git pull
git checkout -b feature/logo-generator-ui

# Work on Logo Generator
git add components/LogoGenerator.tsx
git commit -m "feat: add logo generator UI"
git push -u origin feature/logo-generator-ui

# Create PR
gh pr create --base phase-1/foundation --title "Logo Generator UI"
```

**Developer 3: Testing & Integration**
```bash
# Monitor PRs
# Test integrations
# Merge to phase-1/foundation
# Merge phase-1/foundation → develop → main
```

---

### Phase 2: Core Features (H3-H7)

**Strategy:** Fully parallel (maximize throughput)

#### Feature Branches (all in parallel)

**Token Generator**
```bash
git checkout -b feature/token-generator
# Generate design tokens
git commit -m "feat: add color palette generator"
git commit -m "feat: add typography system"
git commit -m "feat: add spacing tokens"
git push
```

**Component Generator**
```bash
git checkout -b feature/component-generator
# Generate React components
git commit -m "feat: add Button component generator"
git commit -m "feat: add Card component generator"
git push
```

**Export System**
```bash
git checkout -b feature/export-system
# Build ZIP export
git commit -m "feat: add JSZip integration"
git commit -m "feat: add export file structure"
git push
```

**Documentation Generator**
```bash
git checkout -b feature/docs-generator
# Generate brand docs
git commit -m "feat: add brand guidelines generator"
git push
```

#### Rapid Integration
```bash
# Merge all features to phase-2/core-features
git checkout phase-2/core-features
git merge feature/token-generator
git merge feature/component-generator
git merge feature/export-system
git merge feature/docs-generator
git push

# Merge to main
git checkout main
git merge phase-2/core-features
git push
```

---

### Phase 3: Integration (H7-H10)

**Strategy:** Critical path first, then parallel

#### Critical Path (H7-H8)
```bash
# Deploy FIRST (so you have time to debug)
git checkout -b feature/cloudflare-deploy

# Deploy to production
git commit -m "feat: configure Cloudflare Pages"
git commit -m "feat: add production env vars"
git push

# Merge to main immediately
git checkout main
git merge feature/cloudflare-deploy
git push
```

#### Parallel Web3 Features (H8-H10)

**x402 Payments**
```bash
git checkout -b feature/x402-payments

git commit -m "feat: integrate Thirdweb SDK"
git commit -m "feat: add wallet connection"
git commit -m "feat: add top-off modal"
git commit -m "feat: add metered deduction"
git push
```

**Smart Contracts**
```bash
git checkout -b feature/smart-contracts

git commit -m "feat: add CreditVault contract"
git commit -m "feat: add EventNFT contract"
git commit -m "feat: deploy to Monad testnet"
git push
```

**NFT Minting**
```bash
git checkout -b feature/nft-minting

git commit -m "feat: add NFT mint integration"
git commit -m "feat: add mint UI"
git push
```

---

### Phase 4: Finalization (H10-H11)

**Strategy:** Small, rapid polish commits directly to main

```bash
# Work directly on main (or very short-lived branches)
git checkout main
git pull

# Polish commits
git commit -m "polish: add loading animations"
git push

git commit -m "polish: fix button hover states"
git push

git commit -m "fix: mobile responsive issues"
git push

git commit -m "docs: update README with demo info"
git push
```

---

## ⚡ Speed Optimizations

### 1. Pre-Merge Testing (Optional)

**Skip CI for docs:**
```bash
git commit -m "docs: update README [skip ci]"
```

**Fast-forward merges:**
```bash
git merge --ff-only feature/logo-generator
```

### 2. Auto-Merge Setup

**Enable auto-merge for PRs:**
```bash
gh pr merge --auto --squash
```

**Auto-approve trusted developers:**
```yaml
# .github/workflows/auto-approve.yml
name: Auto Approve
on: pull_request
jobs:
  auto-approve:
    runs-on: ubuntu-latest
    steps:
      - uses: hmarr/auto-approve-action@v3
        if: github.actor == 'trusted-dev'
```

### 3. Commit Templates

**Quick commit aliases:**
```bash
# .gitconfig or run once
git config alias.qc '!git add . && git commit -m'
git config alias.qp '!git add . && git commit -m "$1" && git push'

# Usage
git qc "feat: add button component"
git qp "fix: API error handling"
```

### 4. Stash & Switch

**Quick context switching:**
```bash
# Stash current work
git stash push -m "WIP: logo generator"

# Switch to urgent fix
git checkout main
git checkout -b hotfix/api-timeout
# Fix issue
git commit -m "hotfix: increase API timeout"
git push

# Return to original work
git checkout feature/logo-generator
git stash pop
```

---

## 🚨 Conflict Resolution Strategy

### Prevention
1. **Assign file ownership** - Each dev owns specific files
2. **Communicate changes** - Shout out in chat before editing shared files
3. **Pull frequently** - `git pull` every 30 minutes

### Resolution (If Conflicts Occur)
```bash
# Accept theirs (if their change is more recent)
git checkout --theirs path/to/file.tsx
git add path/to/file.tsx
git commit

# Accept ours (if your change is critical)
git checkout --ours path/to/file.tsx
git add path/to/file.tsx
git commit

# Manual merge (last resort)
# Edit file, resolve conflicts, then:
git add path/to/file.tsx
git commit
```

---

## 📊 Commit Frequency Guidelines

| Phase | Frequency | Reason |
|-------|-----------|--------|
| Phase 1 | Every 15-30min | Frequent checkpoints, easy rollback |
| Phase 2 | Every 30-45min | More complex features, test before commit |
| Phase 3 | Every 20-30min | Web3 is risky, commit working states |
| Phase 4 | Every 10-15min | Rapid polish, many small changes |

---

## 🎯 Merge Strategy by Branch Type

### Feature → Phase Branch
```bash
# Squash merge (clean history)
git merge --squash feature/logo-generator
git commit -m "feat: add logo generator"
```

### Phase → Develop
```bash
# Merge commit (preserve phase structure)
git merge --no-ff phase-1/foundation
```

### Develop → Main
```bash
# Fast-forward (clean main branch)
git merge --ff-only develop
```

### Hotfix → Main
```bash
# Direct merge (urgent fixes)
git checkout main
git merge hotfix/api-rate-limit
git push
```

---

## 🔄 Continuous Integration Flow

### Automated Testing (Fast!)

**Run on PR:**
- Linting (10s)
- Type checking (15s)
- Unit tests (30s)
- Build test (45s)

**Skip on:**
- Docs-only changes (`[skip ci]`)
- WIP PRs (`[WIP]` in title)

### Deployment Flow

**Auto-deploy:**
- `main` → Production (Cloudflare Pages)
- `develop` → Staging (optional)
- Feature branches → Preview URLs (Cloudflare)

---

## 🎨 Branch Protection Rules

### Main Branch
- ✅ Require PR (except during H10-H11 crunch time)
- ✅ Require status checks (CI passing)
- ❌ No force push
- ❌ No delete

### Develop Branch
- ✅ Require PR
- ✅ Allow squash merge
- ❌ No force push

### Feature Branches
- ✅ Allow force push (for cleaning up)
- ✅ Auto-delete after merge
- ✅ Allow any commit style

---

## 📝 Commit Message Convention

### Format
```
<type>(<scope>): <subject>

<body> (optional)

<footer> (optional)
```

### Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Formatting, no code change
- `refactor` - Code restructuring
- `perf` - Performance improvement
- `test` - Adding tests
- `chore` - Maintenance

### Examples
```bash
feat(logo): add HTML/CSS logo generator

Implements Claude API integration for generating
logos from brand names and colors.

Closes #3

---

fix(api): increase Claude API timeout to 30s

---

docs: update README with setup instructions

---

polish(ui): add smooth loading animations

---

hotfix(payments): fix x402 balance deduction bug

Critical fix for payment deduction logic.
```

---

## 🚀 Emergency Rollback Procedure

### Undo Last Commit (Not Pushed)
```bash
git reset --soft HEAD~1
# Fix issue
git commit -m "fix: corrected implementation"
```

### Undo Last Commit (Already Pushed)
```bash
git revert HEAD
git push
```

### Rollback to Specific Commit
```bash
# Find commit hash
git log --oneline

# Create rollback commit
git revert abc123
git push
```

### Nuclear Option (Use Sparingly)
```bash
# Reset to last known good commit
git reset --hard abc123
git push --force

# ⚠️ Only use if:
# - Production is broken
# - No time for proper revert
# - Team is aware
```

---

## 👥 Team Coordination

### Developer Assignments

**Developer 1: AI/Frontend Lead**
- Claude API integration
- Logo generator
- Token generator
- Component generator
- Documentation generator

**Developer 2: Web3 Lead**
- Smart contracts
- Thirdweb integration
- x402 payments
- NFT minting
- Wallet connection

**Developer 3: DevOps/Integration Lead**
- Environment setup
- Cloudflare deployment
- CI/CD configuration
- Testing & QA
- Merge coordination

### Communication Protocol

**Use Slack/Discord for:**
- "Starting work on X" (avoid conflicts)
- "Pushed to feature/X" (ready for review)
- "Merging X to Y" (heads up)
- "Blocked on Z" (need help)

**Use GitHub for:**
- PR reviews
- Code comments
- Issue updates

---

## 🏁 Pre-Event Preparation

### 1 Week Before
```bash
# Create all phase branches
git checkout -b phase-1/foundation
git push -u origin phase-1/foundation

git checkout -b phase-2/core-features
git push -u origin phase-2/core-features

git checkout -b phase-3/integration
git push -u origin phase-3/integration

git checkout -b phase-4/finalization
git push -u origin phase-4/finalization

# Protect main branch
gh api repos/:owner/:repo/branches/main/protection -X PUT

# Set up commit templates
git config commit.template .gitmessage

# Configure aliases
git config alias.feature '!git checkout -b feature/$1'
git config alias.qp '!git add . && git commit -m "$1" && git push'
```

### Day Of Event
```bash
# Pull latest
git checkout main
git pull

# Verify remote
git remote -v

# Test push access
git commit --allow-empty -m "test: verify push access"
git push

# Clean up
git reset --hard HEAD~1
```

---

## 📈 Success Metrics

Track these during the event:

| Metric | Target | Actual |
|--------|--------|--------|
| Commits per hour | 3-5 | __ |
| Average PR time | <30min | __ |
| Merge conflicts | 0-2 | __ |
| Failed merges | 0 | __ |
| Rollbacks needed | 0 | __ |
| Main branch breaks | 0 | __ |

---

## ✅ Final Checklist

**Before Starting:**
- [ ] All phase branches created
- [ ] Branch protection configured
- [ ] Commit templates set up
- [ ] Team assignments clear
- [ ] Communication channels ready

**During Event:**
- [ ] Commit every 15-30min
- [ ] Pull before starting new feature
- [ ] Create PR when feature is 80% done
- [ ] Merge frequently to avoid drift
- [ ] Communicate before editing shared files

**Final Hour:**
- [ ] All features merged to main
- [ ] Production deployment verified
- [ ] No uncommitted changes
- [ ] README updated
- [ ] GitHub repo public

---

**Created:** 2025-12-03
**Event:** Monad Blitz #18
**Strategy:** Rapid development with minimal overhead

🌿 **Branch fast, merge faster!**
