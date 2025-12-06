# 🔒 MACHUPS Phase 2 - Safe Merge Procedures

**CRITICAL: Read this before merging ANY branches**

Version: 1.0
Date: December 6, 2025
Status: Mandatory for all merges

---

## ⚠️ Why This Matters

**Merging in the wrong order will cause:**
- ❌ Merge conflicts
- ❌ Broken imports
- ❌ CI/CD failures
- ❌ Lost work
- ❌ Wasted hours debugging

**Following this guide ensures:**
- ✅ Clean merges
- ✅ No conflicts
- ✅ Stable codebase
- ✅ Happy team

---

## 📊 Merge Order Diagram

```
Phase 1 Remote Branches:
1. claude/phase-1-coordinator-agent-016s6daPN3GTf1C8DFmdhmU9
      ↓
2. claude/claude-ai-integration-016s6daPN3GTf1C8DFmdhmU9
      ↓
3. claude/generators-016s6daPN3GTf1C8DFmdhmU9
      ↓
   phase-1-foundation (consolidation branch)
      ↓
   main (v1.1.0)
      ↓
   phase-2-core-engine
      ↓
Feature Branches (can be parallel):
├── feature/brand-analyzer
├── feature/logo-generator (depends on brand-analyzer)
├── feature/token-generator (depends on brand-analyzer)
├── feature/component-generator (depends on token-generator)
└── feature/integration-pipeline (depends on all above)
      ↓
   phase-2-core-engine (consolidation)
      ↓
   main (v1.2.0)
```

---

## 🚀 Phase 1: Consolidation (One-Time Setup)

### Step 1: Check Current State

```bash
# Ensure you're on the correct branch
git status

# View all branches
git branch -a

# Check for uncommitted changes
git status

# If you have uncommitted changes, stash them
git stash
```

### Step 2: Create Phase 1 Foundation Branch

```bash
# Start from main
git checkout main
git pull origin main

# Create foundation branch
git checkout -b phase-1-foundation
```

### Step 3: Merge Phase 1 Branches (IN ORDER!)

**⚠️ CRITICAL: Do NOT change this order!**

```bash
# FIRST: Merge coordinator agent (base infrastructure)
git merge --no-ff origin/claude/phase-1-coordinator-agent-016s6daPN3GTf1C8DFmdhmU9 \
  -m "feat(phase-1): integrate coordinator agent infrastructure"

# Resolve conflicts if any
# git add .
# git commit

# SECOND: Merge Claude AI integration (depends on coordinator)
git merge --no-ff origin/claude/claude-ai-integration-016s6daPN3GTf1C8DFmdhmU9 \
  -m "feat(phase-1): integrate Claude AI client"

# Resolve conflicts if any
# git add .
# git commit

# THIRD: Merge generators (depends on both above)
git merge --no-ff origin/claude/generators-016s6daPN3GTf1C8DFmdhmU9 \
  -m "feat(phase-1): integrate base generator system"

# Resolve conflicts if any
# git add .
# git commit
```

### Step 4: Test Phase 1 Foundation

```bash
# Install dependencies
pnpm install

# Run type check
pnpm type-check

# Run linter
pnpm lint

# Run tests
pnpm test

# Build
pnpm build

# If ANY of these fail, DO NOT PROCEED
# Fix issues first, then continue
```

### Step 5: Push Phase 1 Foundation

```bash
# Push foundation branch
git push -u origin phase-1-foundation

# Verify push succeeded
git log --oneline -5
```

### Step 6: Merge to Main

```bash
# Switch to main
git checkout main
git pull origin main

# Merge foundation (use --no-ff for clean history)
git merge --no-ff phase-1-foundation \
  -m "feat: complete Phase 1 foundation infrastructure

- Brand orchestrator
- Claude AI integration
- Base generator system
- Penpot MCP client
- Rapid deployment system
- Complete Gonads.io demo"

# Push to main
git push origin main

# Tag release
git tag -a v1.1.0 -m "Phase 1 infrastructure complete"
git push origin v1.1.0
```

### Step 7: Verify Main Branch

```bash
# Checkout main
git checkout main
git pull origin main

# Verify everything works
pnpm install
pnpm type-check
pnpm lint
pnpm test
pnpm build

# All must pass ✅
```

### Step 8: Create Phase 2 Core Engine Branch

```bash
# From main
git checkout main
git pull origin main

# Create phase 2 branch
git checkout -b phase-2-core-engine

# Push to remote
git push -u origin phase-2-core-engine
```

**✅ Phase 1 consolidation complete! You can now start Phase 2 development.**

---

## 🔨 Phase 2: Feature Development

### Creating Feature Branches

```bash
# Always create feature branches from phase-2-core-engine
git checkout phase-2-core-engine
git pull origin phase-2-core-engine

# Create your feature branch
git checkout -b feature/brand-analyzer  # Or your assigned feature

# Push to remote
git push -u origin feature/brand-analyzer
```

### Working on Features

```bash
# Make changes, test frequently
pnpm test:watch  # Run in separate terminal

# Commit often with clear messages
git add .
git commit -m "feat(brand-analyzer): add Claude AI prompt generation"

# Push to keep remote updated
git push origin feature/brand-analyzer
```

### Merging Features to Phase 2 Branch

**⚠️ IMPORTANT: Check dependencies first!**

**Dependency Chain:**
1. `feature/brand-analyzer` - No dependencies (can merge first)
2. `feature/logo-generator` - Depends on brand-analyzer
3. `feature/token-generator` - Depends on brand-analyzer
4. `feature/component-generator` - Depends on token-generator
5. `feature/integration-pipeline` - Depends on ALL above

**Merge Process:**

```bash
# 1. Update your feature branch with latest phase branch
git checkout feature/brand-analyzer
git pull origin phase-2-core-engine
# Resolve conflicts if any
git push origin feature/brand-analyzer

# 2. Run full test suite
pnpm install
pnpm type-check
pnpm lint
pnpm test
pnpm build

# 3. Switch to phase branch
git checkout phase-2-core-engine
git pull origin phase-2-core-engine

# 4. Merge feature (use --squash for clean history)
git merge --squash feature/brand-analyzer

# 5. Commit with descriptive message
git commit -m "feat(phase-2): add brand analyzer

- Claude AI strategic analysis
- WCAG AA color validation
- Brand name and tagline generation
- Typography recommendations
- Tests: 15 passing
- Performance: <30s target met"

# 6. Push to phase branch
git push origin phase-2-core-engine

# 7. Verify merge
pnpm install
pnpm type-check
pnpm lint
pnpm test
pnpm build

# 8. Delete feature branch (only after successful merge!)
git branch -d feature/brand-analyzer
git push origin --delete feature/brand-analyzer
```

---

## 🔄 Handling Merge Conflicts

### Prevention

```bash
# Keep your branch updated with phase branch
git checkout feature/your-feature
git pull origin phase-2-core-engine  # Rebase regularly
```

### Resolution

```bash
# If conflicts occur during merge
git status  # See conflicted files

# Edit conflicted files
# Look for <<<<<<< HEAD markers
# Decide which changes to keep

# Mark conflicts as resolved
git add path/to/resolved/file

# Continue merge
git commit

# Verify everything works
pnpm type-check
pnpm test
pnpm build
```

### Conflict Resolution Strategies

**Strategy 1: Accept Incoming Changes (Theirs)**
```bash
git checkout --theirs path/to/file
git add path/to/file
```

**Strategy 2: Keep Your Changes (Ours)**
```bash
git checkout --ours path/to/file
git add path/to/file
```

**Strategy 3: Manual Merge**
```bash
# Edit file manually
# Remove conflict markers
# Combine changes appropriately
git add path/to/file
```

---

## 📋 Pre-Merge Checklist

Before merging ANY branch, verify:

### Code Quality
- [ ] `pnpm type-check` passes
- [ ] `pnpm lint` passes with no warnings
- [ ] `pnpm test` all passing
- [ ] `pnpm build` succeeds
- [ ] No `console.log` statements
- [ ] No `any` types
- [ ] No inline CSS/HTML

### Documentation
- [ ] JSDoc comments on all exports
- [ ] README updated if needed
- [ ] CHANGELOG.md updated
- [ ] Examples added if needed

### Testing
- [ ] Unit tests written
- [ ] Integration tests written (if applicable)
- [ ] Tests cover edge cases
- [ ] Performance targets met
- [ ] WCAG compliance verified (if applicable)

### Git
- [ ] Branch up to date with target
- [ ] Commit messages follow convention
- [ ] No merge conflicts
- [ ] Commits are logical units
- [ ] Sensitive data not committed

### Team
- [ ] Code reviewed (if team PR process)
- [ ] Blockers communicated
- [ ] Dependencies merged first
- [ ] Team notified of merge

---

## 🚨 Emergency Procedures

### Undo Last Commit (Not Pushed)

```bash
# Undo commit, keep changes
git reset --soft HEAD~1

# Undo commit, discard changes
git reset --hard HEAD~1
```

### Undo Last Commit (Already Pushed)

```bash
# Revert the commit (creates new commit)
git revert HEAD
git push origin your-branch
```

### Abort Merge in Progress

```bash
# If merge is going wrong
git merge --abort

# Start over
git status  # Verify clean state
```

### Recover Deleted Branch

```bash
# Find the commit hash
git reflog

# Recreate branch
git checkout -b recovered-branch <commit-hash>
```

### Force Sync with Remote (DANGEROUS!)

```bash
# ⚠️ WARNING: This discards ALL local changes
git fetch origin
git reset --hard origin/your-branch

# Only use if you're sure!
```

---

## 📊 Merge Status Tracking

### Check Merge Status

```bash
# View merged branches
git branch --merged

# View unmerged branches
git branch --no-merged

# View all branches with last commit
git branch -vv
```

### Track Feature Progress

Create `MERGE_STATUS.md` to track progress:

```markdown
# Phase 2 Merge Status

## Phase 1 (Complete ✅)
- [x] coordinator-agent → phase-1-foundation
- [x] claude-ai-integration → phase-1-foundation
- [x] generators → phase-1-foundation
- [x] phase-1-foundation → main (v1.1.0)

## Phase 2 (In Progress 🔨)
- [ ] feature/brand-analyzer → phase-2-core-engine
- [ ] feature/logo-generator → phase-2-core-engine
- [ ] feature/token-generator → phase-2-core-engine
- [ ] feature/component-generator → phase-2-core-engine
- [ ] feature/integration-pipeline → phase-2-core-engine
- [ ] phase-2-core-engine → main (v1.2.0)
```

---

## ✅ Verification Steps

After each merge, verify:

```bash
# 1. Clean install
rm -rf node_modules .next
pnpm install

# 2. Type checking
pnpm type-check
# Must show: No errors ✅

# 3. Linting
pnpm lint
# Must show: No problems ✅

# 4. Tests
pnpm test
# Must show: All tests passing ✅

# 5. Build
pnpm build
# Must show: Build completed ✅

# 6. Check git status
git status
# Must show: Clean working directory ✅
```

---

## 📞 Getting Help

### Before Asking for Help

1. Read this document completely
2. Check git status: `git status`
3. Check recent commits: `git log --oneline -10`
4. Try `git merge --abort` and start over
5. Check GitHub Issues for similar problems

### When to Ask for Help

- Merge conflicts you can't resolve
- Test failures after merge
- Build errors after merge
- Lost commits
- Accidentally merged wrong branch

### How to Ask for Help

**Good Request:**
```markdown
Title: Merge conflict in lib/generators/brand-analyzer.ts

**What I'm trying to do:**
Merge feature/brand-analyzer into phase-2-core-engine

**What happened:**
Conflict in brand-analyzer.ts lines 45-67

**What I've tried:**
- Checked git status
- Reviewed both versions
- Not sure which changes to keep

**Files:**
- Paste conflicted section
- Show both versions

**Environment:**
- Branch: feature/brand-analyzer
- Last commit: abc123
```

**Bad Request:**
```
help git broken
```

---

## 🎯 Success Criteria

Phase 2 merge is COMPLETE when:

- [ ] All 5 feature branches merged to phase-2-core-engine
- [ ] phase-2-core-engine merged to main
- [ ] All tests passing
- [ ] All builds successful
- [ ] No console errors
- [ ] Performance targets met
- [ ] WCAG compliance verified
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Tagged as v1.2.0
- [ ] Team can generate brands successfully

---

## 🚀 Final Merge to Main

When ALL Phase 2 features are complete:

```bash
# 1. Ensure phase-2-core-engine is stable
git checkout phase-2-core-engine
git pull origin phase-2-core-engine

pnpm install
pnpm type-check && pnpm lint && pnpm test && pnpm build
# ALL must pass ✅

# 2. Update CHANGELOG.md
# Add all Phase 2 changes

# 3. Update VERSION file
echo "1.2.0" > VERSION
git add VERSION CHANGELOG.md
git commit -m "chore(release): bump version to 1.2.0"
git push origin phase-2-core-engine

# 4. Merge to main
git checkout main
git pull origin main

git merge --no-ff phase-2-core-engine \
  -m "feat: Phase 2 complete - AI-powered brand generation

Features:
- Brand analyzer with Claude AI
- Logo generator (HTML/CSS → SVG/PNG)
- W3C DTCG token generator
- Component generator (30+ components)
- Integration pipeline

Performance:
- Total generation time: <3 minutes
- WCAG AA compliance: 100%
- Test coverage: >80%

Co-authored-by: [Team members]"

# 5. Push to main
git push origin main

# 6. Tag release
git tag -a v1.2.0 -m "Phase 2: AI-powered brand generation"
git push origin v1.2.0

# 7. Celebrate! 🎉
```

---

**Remember: When in doubt, ask for help BEFORE merging!**

**Version:** 1.0
**Last Updated:** December 6, 2025
**Status:** Mandatory Reading
