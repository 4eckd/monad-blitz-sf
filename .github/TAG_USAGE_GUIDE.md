# Project Management Tag Usage Guide

## Quick Start

### Sync Labels to GitHub
```bash
# Make script executable
chmod +x .github/scripts/sync-labels.sh

# Run sync (requires gh CLI)
.github/scripts/sync-labels.sh
```

### Create a Well-Tagged Issue
```bash
gh issue create \
  --title "Add color contrast checker to UI generator" \
  --body "..." \
  --label "type: feature" \
  --label "area: ui-generation" \
  --label "priority: high" \
  --label "effort: m" \
  --label "skill: frontend" \
  --label "compliance: wcag-aa"
```

---

## Tag Combination Rules

### Every Issue Should Have:
1. **One `type:*` label** - What kind of work is it?
2. **One `priority:*` label** - How urgent is it?
3. **One `area:*` label** - Where in the codebase?
4. **One `effort:*` label** - How long will it take?

### Optional but Recommended:
- `skill:*` - Who can work on it?
- `status:*` - Current state
- `quality:*` - Quality requirements
- Domain-specific (`ai:*`, `web3:*`, `compliance:*`)

---

## Common Tag Patterns

### New Feature Development
```
type: feature
area: [specific-area]
priority: medium
effort: [size]
skill: [required-skill]
quality: needs-tests
quality: needs-docs
```

**Example:**
```
type: feature
area: ui-generation
priority: high
effort: l
skill: ai-prompt
quality: needs-tests
ai: generation-quality
```

### Bug Fix
```
type: bug
area: [specific-area]
priority: [severity]
effort: [size]
status: [current-state]
```

**Example:**
```
type: bug
area: color-system
priority: critical
effort: s
status: in-progress
quality: regression-risk
```

### Web3 Work
```
type: [feature|bug|security]
area: contracts
priority: [level]
web3: [specific-tag]
skill: solidity
compliance: security
```

**Example:**
```
type: security
area: contracts
priority: critical
web3: contract-audit
skill: solidity
compliance: security
workflow: needs-approval
```

### Accessibility Work
```
type: [feature|enhancement]
area: components
priority: [level]
skill: accessibility
compliance: wcag-aa
quality: needs-a11y-audit
```

### Documentation
```
type: docs
area: [specific-area]
priority: low
effort: xs
skill: good-first-issue
community: help-wanted
```

### DevOps/Infrastructure
```
type: devops
area: ci-cd
priority: [level]
effort: [size]
skill: devops
```

---

## Priority Assignment Guidelines

### `priority: critical`
- Production is down
- Security vulnerability
- Data loss risk
- Legal/compliance issue

**Response Time:** Immediate
**Example:** "X402 payment contract has reentrancy vulnerability"

### `priority: high`
- Blocking other work
- Major feature broken
- Affecting many users
- Event deadline approaching

**Response Time:** Same day
**Example:** "AI generation failing for all users"

### `priority: medium`
- Normal feature work
- Minor bugs with workarounds
- Planned enhancements
- Most roadmap items

**Response Time:** This week
**Example:** "Add dark mode support to Brand Factory"

### `priority: low`
- Nice-to-have features
- Cosmetic issues
- Documentation improvements
- Tech debt

**Response Time:** When capacity allows
**Example:** "Update README badges"

### `priority: backlog`
- Future ideas
- Needs more planning
- Low ROI currently
- Parking lot items

**Response Time:** Revisit quarterly
**Example:** "Support for custom design systems"

---

## Effort Estimation Guidelines

### `effort: xs` (<2 hours)
- Typo fixes
- Config tweaks
- Single-line changes
- Label updates

**Examples:**
- Fix typo in README
- Update color value in theme
- Change button text

### `effort: s` (2-4 hours)
- Simple bug fixes
- Small component updates
- Minor config changes
- Basic documentation

**Examples:**
- Fix input validation bug
- Add prop to existing component
- Update API endpoint path

### `effort: m` (1-2 days)
- New component with tests
- API endpoint with validation
- Feature enhancement
- Integration work

**Examples:**
- Create ColorPicker component
- Add email notifications
- Implement cache layer

### `effort: l` (3-5 days)
- Complex feature
- Multiple components
- Database migrations
- Third-party integrations

**Examples:**
- Build brand questionnaire flow
- Implement x402 payment system
- Add export to multiple formats

### `effort: xl` (1-2 weeks)
- Major feature
- Architectural changes
- Multiple integrations
- Cross-cutting concerns

**Examples:**
- AI prompt-to-component engine
- Complete design token system
- NFT minting infrastructure

### `effort: xxl` (Multi-week)
- Epic-level work
- Platform changes
- Complete subsystems
- Break into smaller issues

**Examples:**
- Build entire Brand Factory
- Implement full Web3 integration
- Create component marketplace

---

## Automation with Labels

### Auto-Close Stale Issues
Issues with `status: on-hold` and no activity for 60 days get closed.

### Auto-Assign Reviewers
- `area: contracts` → @solidity-team
- `area: ui-generation` → @ai-team
- `compliance: wcag-aa` → @accessibility-team

### Skip CI for Docs
Add `workflow: skip-ci` to skip expensive CI jobs for documentation-only changes.

### Auto-Merge
Add `workflow: auto-merge` to auto-merge when:
- All checks pass
- Approved by required reviewers
- No `workflow: needs-approval` label

---

## Label Queries (GitHub Search)

### Find All Bugs
```
is:issue is:open label:"type: bug"
```

### Critical Items
```
is:issue is:open label:"priority: critical"
```

### Good First Issues
```
is:issue is:open label:"skill: good-first-issue" no:assignee
```

### Ready to Work (Not Blocked)
```
is:issue is:open -label:"status: blocked" -label:"status: on-hold"
```

### AI Generation Work
```
is:issue is:open label:"area: ui-generation" label:"ai: generation-quality"
```

### Web3 Security
```
is:issue label:"web3: contract-audit" label:"compliance: security"
```

### Needs Testing
```
is:issue is:open label:"quality: needs-tests"
```

### Sprint Planning (Medium Effort)
```
is:issue is:open label:"effort: m" label:"priority: high" no:assignee
```

### Accessibility Backlog
```
is:issue is:open label:"compliance: wcag-aa" -label:"status: in-progress"
```

---

## Project Board Automation

### Kanban Column Mappings

**Backlog**
- `priority: backlog`
- No `status:*` label

**To Do**
- `priority: [low|medium|high|critical]`
- No `status:*` label

**In Progress**
- `status: in-progress`

**Blocked**
- `status: blocked`
- Automatically posts comment asking for blocker details

**Review**
- `status: review`
- PR linked to issue

**Testing**
- `status: testing`
- `quality:*` labels present

**Done**
- `status: deployed` OR
- Issue closed

---

## Label Maintenance

### Weekly Review
```bash
# Find unlabeled issues
gh issue list --label "!type: *" --limit 100

# Find issues missing priority
gh issue list --label "!priority: *" --limit 100

# Find issues missing effort estimate
gh issue list --label "!effort: *" --limit 100
```

### Monthly Cleanup
```bash
# Find stale in-progress issues
gh issue list --label "status: in-progress" --state all --search "updated:<$(date -d '30 days ago' +%Y-%m-%d)"

# Find blocked issues without comments
gh issue list --label "status: blocked" --json number,title,comments
```

---

## Integration with CI/CD

### Auto-Label PRs
```yaml
# .github/workflows/auto-label.yml
name: Auto Label PRs

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/labeler@v4
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

### Auto-Label Based on Files Changed
```yaml
# .github/labeler.yml
"area: ui-generation":
  - src/lib/ai-generator/**/*

"area: contracts":
  - contracts/**/*

"type: docs":
  - "*.md"
  - docs/**/*

"area: ci-cd":
  - .github/workflows/**/*
```

---

## Best Practices

### DO ✅
- Apply labels immediately when creating issues
- Update `status:*` labels as work progresses
- Use multiple labels for rich filtering
- Add `quality:*` labels to track requirements
- Use `community:*` labels to encourage contributions

### DON'T ❌
- Use more than one `type:*` label (choose primary type)
- Leave issues unlabeled
- Forget to remove `status: blocked` when unblocked
- Over-estimate `effort:*` (break into smaller issues instead)
- Use labels as comments (use actual comments)

---

## MachLabs-Specific Workflows

### AI Generation Issue Template
```markdown
**Prompt:** [What should be generated]
**Expected Output:** [Description]
**Brand Context:** [Brand parameters]
**Acceptance Criteria:**
- [ ] Generates valid React/TypeScript
- [ ] Uses design tokens correctly
- [ ] Passes WCAG AA
- [ ] Generation time <5s

**Labels:**
type: ai-generation
area: ui-generation
priority: high
ai: generation-quality
compliance: wcag-aa
quality: needs-tests
```

### Web3 Security Issue Template
```markdown
**Contract:** [Contract name]
**Vulnerability:** [Description]
**Severity:** [Critical/High/Medium/Low]
**Mitigation:** [Proposed fix]

**Labels:**
type: security
area: contracts
priority: critical
web3: contract-audit
compliance: security
workflow: needs-approval
```

### Brand Factory Feature Template
```markdown
**Feature:** [Name]
**User Story:** As a [user], I want [goal] so that [benefit]
**Design Tokens Affected:** [List]
**Output Format:** [SVG/PNG/JSON/etc.]

**Labels:**
type: branding
area: brand-factory
priority: medium
effort: l
skill: design
quality: needs-docs
```

---

## Metrics & Reporting

### Velocity Tracking
```bash
# Issues completed this sprint by effort
gh issue list --state closed --search "closed:>=$(date -d '2 weeks ago' +%Y-%m-%d)" --json labels | \
  jq '[.[] | .labels[] | select(.name | startswith("effort:")) | .name] | group_by(.) | map({effort: .[0], count: length})'
```

### Quality Metrics
```bash
# Percentage of issues with tests
TOTAL=$(gh issue list --state all --json number | jq length)
WITH_TESTS=$(gh issue list --state all --label "quality: needs-tests" --json number | jq length)
echo "Scale: $((100 - (WITH_TESTS * 100 / TOTAL)))% of issues have tests"
```

### Area Distribution
```bash
# Issues per area
gh issue list --json labels | \
  jq '[.[] | .labels[] | select(.name | startswith("area:")) | .name] | group_by(.) | map({area: .[0], count: length})'
```

---

## Questions?

- **How many labels should an issue have?** 3-6 labels is ideal (type, priority, area, effort, + optional specialized labels)
- **Can I create custom labels?** Yes, but follow the naming convention: `category: value`
- **What if work spans multiple areas?** Choose the primary area, mention others in the description
- **How do I handle breaking changes?** Use `workflow: breaking-change` and ensure it's called out in the PR description

---

## Resources

- [GitHub Labels Documentation](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work)
- [GitHub CLI Labels Reference](https://cli.github.com/manual/gh_label)
- [Project Automation](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project)
