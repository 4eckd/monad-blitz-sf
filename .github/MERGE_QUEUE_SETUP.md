# GitHub Merge Queue Setup Guide

This document explains how to configure and use GitHub's merge queue for MACHUPS.

---

## 🎯 What is Merge Queue?

GitHub's merge queue is an automated system that:
- ✅ Tests PRs together before merging
- ✅ Prevents "looks good to me" failures
- ✅ Ensures main branch is always green
- ✅ Handles merge conflicts automatically
- ✅ Queues multiple PRs for sequential merging

**Without Merge Queue:**
```
PR #1 (tests pass) ────┐
                       ├─► Both merge ─► Tests fail! 💥
PR #2 (tests pass) ────┘
```

**With Merge Queue:**
```
PR #1 (tests pass) ─► Queue ─► Test #1+#2 ─► Pass ─► Merge both ✅
PR #2 (tests pass) ─► Queue ─┘
```

---

## 📋 Setup Instructions

### Step 1: Enable Merge Queue (Repository Settings)

1. Go to your repository on GitHub
2. Click **Settings** → **Branches**
3. Find **Branch protection rules** for `main`
4. Click **Edit** (or **Add rule** if none exists)

### Step 2: Configure Branch Protection

Enable these settings:

**Required:**
- ✅ **Require a pull request before merging**
  - Require approvals: **1**
  - Dismiss stale approvals: ✅

- ✅ **Require status checks to pass before merging**
  - Require branches to be up to date: ✅
  - Status checks that are required:
    - `lint`
    - `type-check`
    - `build`
    - `test`
    - `security-scan`
    - `merge-queue-status`

- ✅ **Require conversation resolution before merging**

- ✅ **Require signed commits** (optional but recommended)

- ✅ **Require linear history**

**Merge Queue Settings:**
- ✅ **Require merge queue**
  - Build concurrency: **5** (run up to 5 merges in parallel)
  - Minimum wait time: **0 minutes**
  - Maximum wait time: **5 minutes**
  - Merge method: **Squash**

**Additional:**
- ✅ **Do not allow bypassing the above settings**
- ✅ **Restrict who can push to matching branches**
- ✅ **Allow force pushes: No one**
- ✅ **Allow deletions: No**

### Step 3: Apply Same Rules to Phase Branches

Repeat for these branches:
- `develop`
- `phase-1-foundation`
- `phase-2-core-engine`
- `phase-3-*`
- `phase-4-*`
- `phase-5-*`
- `phase-6-*`

Use branch name pattern: `phase-*` for all phase branches.

---

## 🚀 How to Use Merge Queue

### For Developers

**1. Create Pull Request as usual:**

```bash
git checkout -b feature/my-feature
# Make changes
git add .
git commit -m "feat: my feature"
git push origin feature/my-feature
# Create PR on GitHub
```

**2. When PR is approved and checks pass:**

Instead of clicking "Merge", click **"Merge when ready"** button.

**3. Your PR enters the queue:**

GitHub will:
1. Add your PR to the merge queue
2. Create a temporary merge commit with other queued PRs
3. Run all CI checks on the combined changes
4. If checks pass → Auto-merge
5. If checks fail → Remove from queue, notify you

**4. Monitor queue status:**

You'll see:
```
🟡 Queued for merge - Position #2 in queue
   └─ Running checks...
```

Then:
```
✅ Merged via merge queue
```

Or:
```
❌ Removed from queue - Checks failed
```

---

## 🔍 Merge Queue Workflow

### Our CI Pipeline (`.github/workflows/merge-queue.yml`)

**Jobs that run:**

1. **Lint** (5 min timeout)
   - ESLint checks
   - Code style validation

2. **Type Check** (5 min timeout)
   - TypeScript compilation
   - Type safety verification

3. **Build** (10 min timeout)
   - Next.js production build
   - Dependency resolution

4. **Test** (5 min timeout)
   - Unit tests
   - Integration tests

5. **Security Scan** (5 min timeout)
   - TruffleHog secret scanning
   - Vulnerability detection

6. **Merge Queue Status** (always runs)
   - Aggregates all job results
   - Reports final status

**Total time:** ~10-15 minutes per PR

---

## 📊 Merge Queue Status

### Queue Dashboard

View at: `https://github.com/4eckd/monad-blitz-sf/queue/main`

Shows:
- PRs currently in queue
- Queue position
- Check status
- Estimated merge time

### PR Status Labels

```
🟢 Ready to merge      - All checks passed
🟡 In queue           - Waiting for checks
🔵 Queued for merge   - Added to queue
🔴 Failed checks      - Removed from queue
⚪ Draft              - Not ready yet
```

---

## 🎯 Best Practices

### 1. Keep PRs Small

**Good:**
```
feature/add-button (50 lines changed)
feature/add-validation (30 lines changed)
```

**Bad:**
```
feature/complete-redesign (2000 lines changed)
```

Small PRs:
- Merge faster
- Easier to review
- Less likely to conflict
- Fail faster (if they fail)

### 2. Run Checks Locally First

Before creating PR:

```bash
# Run all checks locally
pnpm lint
pnpm type-check
pnpm build
pnpm test

# If all pass, create PR
git push origin feature/my-feature
```

### 3. Resolve Conflicts Quickly

If queue removes your PR:
1. Check why it failed
2. Fix the issue
3. Push fix
4. Re-add to queue

### 4. Don't Bypass the Queue

Even if you're admin, use the queue. It protects everyone.

---

## 🚨 Troubleshooting

### Issue: PR Stuck in Queue

**Symptoms:** PR shows "Queued" for >10 minutes

**Solutions:**
1. Check if CI is running: Go to **Actions** tab
2. Check queue status: `repo/queue/main`
3. Check for resource limits (GitHub Actions quota)
4. Remove from queue and re-add

### Issue: Checks Fail in Queue but Pass in PR

**Symptoms:** PR checks pass, but fail when queued with other PRs

**Cause:** Conflict with another PR in queue

**Solutions:**
1. Pull latest main: `git pull origin main`
2. Rebase your branch: `git rebase main`
3. Fix conflicts
4. Force push: `git push -f origin feature/my-feature`
5. Re-add to queue

### Issue: Merge Queue Disabled

**Symptoms:** Can't add PR to queue

**Solutions:**
1. Check branch protection rules
2. Ensure "Require merge queue" is enabled
3. Contact admin to enable

---

## ⚙️ Configuration Reference

### Merge Queue Settings

**Build Concurrency:** `5`
- How many merge attempts run in parallel
- Higher = faster, but more resource usage
- Recommended: 3-5 for most projects

**Minimum Wait Time:** `0 minutes`
- How long to wait before starting merge
- Allows batching multiple PRs
- Set to 0 for immediate merging

**Maximum Wait Time:** `5 minutes`
- Max time to wait for batching
- After this, queue processes PRs immediately
- Recommended: 5-10 minutes

**Merge Method:** `Squash`
- Squash: Combine all commits into one
- Merge: Keep all commits
- Rebase: Replay commits on main

---

## 📈 Metrics to Track

Monitor these in GitHub Insights:

- **Queue time:** How long PRs wait in queue
- **Success rate:** % of PRs that merge successfully
- **Retry rate:** % of PRs removed and re-queued
- **Time to merge:** Total time from PR to main

**Targets:**
- Queue time: <10 minutes
- Success rate: >90%
- Retry rate: <10%
- Time to merge: <30 minutes

---

## 🔐 Security Considerations

### Secret Scanning

Our queue runs TruffleHog on every merge:
- Scans for API keys, tokens, passwords
- Blocks merge if secrets found
- Alerts security team

### Required Checks

All these must pass:
- ✅ No secrets committed
- ✅ Code compiles
- ✅ Tests pass
- ✅ No linting errors
- ✅ Security vulnerabilities addressed

---

## 📝 Merge Queue Commands

### Via GitHub UI

- **Add to queue:** Click "Merge when ready"
- **Remove from queue:** Click "Remove from queue"
- **View queue:** Go to `/queue/main`

### Via GitHub CLI

```bash
# Add PR to queue
gh pr merge 123 --merge --auto

# Check queue status
gh queue view

# Remove from queue
gh pr ready 123 --undo
```

### Via API

```bash
# Add to queue
curl -X PUT \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/4eckd/monad-blitz-sf/pulls/123/merge-queue

# Remove from queue
curl -X DELETE \
  -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/repos/4eckd/monad-blitz-sf/pulls/123/merge-queue
```

---

## 🎓 Training Checklist

For new team members:

- [ ] Read this guide
- [ ] Understand merge queue concept
- [ ] Know how to add PR to queue
- [ ] Know how to check queue status
- [ ] Understand what happens when checks fail
- [ ] Practice with a test PR
- [ ] Run checks locally before pushing

---

## 📚 Additional Resources

- **GitHub Docs:** https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue
- **Best Practices:** https://github.blog/2023-02-08-github-merge-queue-is-generally-available/
- **Troubleshooting:** https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/troubleshooting-merge-queue

---

## ✅ Setup Checklist

- [ ] `.github/workflows/merge-queue.yml` created
- [ ] Branch protection rules configured for `main`
- [ ] Branch protection rules configured for `develop`
- [ ] Branch protection rules configured for `phase-*` branches
- [ ] Merge queue enabled
- [ ] Required status checks added
- [ ] Build concurrency set to 5
- [ ] Merge method set to Squash
- [ ] Team trained on merge queue usage
- [ ] Test PR successfully merged via queue

---

**Merge Queue Setup Complete! 🎉**

Your repository now has enterprise-grade merge protection.

**Next Steps:**
1. Apply branch protection rules (see Step 2)
2. Test with a sample PR
3. Train team on usage
4. Monitor queue metrics

---

Generated: December 6, 2025
Version: 1.0.0
