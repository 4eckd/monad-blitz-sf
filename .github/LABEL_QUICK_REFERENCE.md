# Label Quick Reference Card

Quick guide for labeling issues and PRs in MachLabs.

## Required Labels (Every Issue)

| Category | Example | When to Use |
|----------|---------|-------------|
| **Type** | `type: feature` | What kind of work is this? |
| **Priority** | `priority: high` | How urgent is it? |
| **Area** | `area: ui-generation` | Where in the codebase? |
| **Effort** | `effort: m` | How long will it take? |

## Common Label Combinations

### 🆕 New Feature
```
type: feature
area: [location]
priority: medium
effort: [size]
quality: needs-tests
quality: needs-docs
```

### 🐛 Bug Fix
```
type: bug
area: [location]
priority: [severity]
effort: [size]
status: in-progress
```

### 🤖 AI Generation Work
```
type: ai-generation
area: ui-generation
priority: high
ai: generation-quality
compliance: wcag-aa
quality: needs-tests
```

### 🔐 Security Issue
```
type: security
area: contracts
priority: critical
web3: contract-audit
compliance: security
workflow: needs-approval
```

### ♿ Accessibility
```
type: accessibility
area: components
priority: high
skill: accessibility
compliance: wcag-aa
quality: needs-a11y-audit
```

### 📚 Documentation
```
type: docs
area: [topic]
priority: low
effort: xs
skill: good-first-issue
```

## Priority Decision Tree

```
┌─ Production down? ──────────────────────► priority: critical
│
├─ Security vulnerability? ──────────────► priority: critical
│
├─ Blocking other work? ─────────────────► priority: high
│
├─ Major feature broken? ────────────────► priority: high
│
├─ Normal feature work? ─────────────────► priority: medium
│
├─ Minor bug with workaround? ───────────► priority: medium
│
├─ Nice-to-have? ────────────────────────► priority: low
│
└─ Future idea? ─────────────────────────► priority: backlog
```

## Effort Estimation

| Label | Time | Examples |
|-------|------|----------|
| `effort: xs` | < 2h | Typo fix, config tweak |
| `effort: s` | 2-4h | Simple bug, small component |
| `effort: m` | 1-2d | Feature with tests |
| `effort: l` | 3-5d | Complex feature, integration |
| `effort: xl` | 1-2w | Major system, architectural change |
| `effort: xxl` | Multi-week | Epic (break into smaller issues) |

## Skill Labels

| Label | Who Can Work On It |
|-------|-------------------|
| `skill: frontend` | React/Next.js developers |
| `skill: backend` | Node.js/API developers |
| `skill: solidity` | Smart contract developers |
| `skill: design` | UI/UX designers |
| `skill: devops` | Infrastructure/CI/CD engineers |
| `skill: ai-prompt` | LLM prompt engineers |
| `skill: accessibility` | WCAG/a11y specialists |
| `skill: good-first-issue` | New contributors welcome |

## Special Labels

### Quality Requirements
- `quality: needs-tests` - Missing test coverage
- `quality: needs-docs` - Documentation required
- `quality: needs-a11y-audit` - Accessibility check needed
- `quality: needs-perf-test` - Performance validation
- `quality: regression-risk` - High risk of breaking changes

### AI-Specific
- `ai: prompt-engineering` - Prompt optimization
- `ai: model-testing` - LLM output validation
- `ai: generation-quality` - AI output quality issues
- `ai: token-optimization` - Reduce token usage

### Web3-Specific
- `web3: contract-audit` - Security audit needed
- `web3: gas-optimization` - Reduce gas costs
- `web3: testnet` - Testnet deployment
- `web3: mainnet` - Mainnet deployment

### Workflow
- `workflow: skip-ci` - Skip CI/CD (docs only)
- `workflow: needs-approval` - Manual approval required
- `workflow: auto-merge` - Auto-merge when passing
- `workflow: breaking-change` - Breaking API change

## CLI Commands

### Create Issue
```bash
gh issue create \
  --title "Your title" \
  --body "Description" \
  --label "type: feature" \
  --label "priority: high" \
  --label "area: ui-generation"
```

### List Issues by Label
```bash
# All bugs
gh issue list --label "type: bug"

# Critical items
gh issue list --label "priority: critical"

# Good first issues
gh issue list --label "skill: good-first-issue"
```

### Add Label to Existing Issue
```bash
gh issue edit 123 --add-label "priority: high"
```

### Search Issues
```bash
# AI generation work
gh issue list --search "label:ai:generation-quality"

# Blocked issues
gh issue list --search "label:status:blocked"
```

## When to Add Labels

| Event | Action |
|-------|--------|
| **Creating Issue** | Add type, priority, area, effort |
| **Starting Work** | Add `status: in-progress` |
| **Blocked** | Add `status: blocked`, comment why |
| **PR Created** | Auto-labeled by workflow |
| **Review Needed** | Add `status: review` |
| **Deployed** | Add `status: deployed` |

## Label Colors

| Category | Color Family |
|----------|-------------|
| Type | Purple/Blue |
| Priority | Red → Yellow → Green |
| Area | Blue tones |
| Status | Yellow/Orange |
| Effort | Green gradient |
| Skill | Teal |
| AI | Purple |
| Web3 | Orange |
| Compliance | Indigo |

## Tips

✅ **DO:**
- Apply labels immediately when creating issues
- Update status labels as work progresses
- Use multiple labels for rich context
- Add quality labels early

❌ **DON'T:**
- Use multiple type labels (pick one)
- Leave issues unlabeled
- Forget to remove `status: blocked` when unblocked
- Over-estimate effort (break into smaller issues)

## Resources

- [Full Tag Usage Guide](.github/TAG_USAGE_GUIDE.md)
- [Sync Labels to GitHub](.github/scripts/sync-labels.sh)
- [Labels YAML Config](.github/labels.yml)

---

**Last Updated:** 2025-11-30
