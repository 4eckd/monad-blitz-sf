# Kanban Setup Guide for MachLabs

Complete guide for setting up and optimizing your Jira Kanban board for AI-powered design automation and Web3 development.

---

## Why Kanban is Right for MachLabs

### ✅ Advantages for Your Project

**1. Continuous Delivery**
- No artificial sprint boundaries
- Ship features when ready
- Perfect for pre-launch phase

**2. Flexibility**
- Easily reprioritize as you learn
- Adapt to external dependencies (audits, testnet)
- Handle variable work sizes (XS to XXL)

**3. Work-in-Progress (WIP) Limits**
- Prevent context switching
- Focus on finishing over starting
- Critical for solo/small teams

**4. Visual Management**
- See bottlenecks instantly
- Track blocked items
- Monitor flow efficiency

**5. Less Overhead**
- No sprint planning ceremonies
- No sprint retrospectives (unless wanted)
- More coding, less meetings

### ❌ When You'd Want Scrum Instead

Consider switching to Scrum when:
- Team grows to 5+ developers
- Regular release cadence established (e.g., bi-weekly)
- Requirements become predictable
- You want structured ceremonies (planning, retros, daily standups)

---

## Board Configuration

### Column Structure (Recommended)

```
┌─────────┬──────────┬─────────────┬─────────┬────────┬─────────┬──────┐
│ Backlog │  To Do   │ In Progress │ Blocked │ Review │ Testing │ Done │
└─────────┴──────────┴─────────────┴─────────┴────────┴─────────┴──────┘
    ∞         3            1           -         1        2        ∞
  (no WIP)  (WIP: 3)   (WIP: 1)              (WIP: 1) (WIP: 2)
```

### Column Definitions

#### **Backlog**
- All ideas, future work
- Not prioritized yet
- No WIP limit

**Move to "To Do" when:**
- Clearly defined acceptance criteria
- Priority assigned
- Ready to work on soon

---

#### **To Do** (WIP: 3)
- Prioritized and ready to start
- Top 3 items are highest priority
- All information needed to begin

**Move to "In Progress" when:**
- You start active work
- Assign to yourself

**WIP Limit Rationale:**
Keep only top 3 items to force prioritization decisions.

---

#### **In Progress** (WIP: 1)
- Active development happening NOW
- Only ONE item at a time for solo dev
- If team of 2-3, set WIP to team size

**Move to "Blocked" when:**
- Waiting on external dependency
- Technical blocker you can't solve alone
- Requires security audit, design review, etc.

**Move to "Review" when:**
- PR created and ready for review
- Self-review complete
- Tests passing

**WIP Limit Rationale:**
Single-tasking maximizes throughput for solo developers.

---

#### **Blocked** (No WIP Limit)
- Cannot proceed due to external factor
- Clearly document blocker in comments
- Set due date for follow-up

**Types of Blockers:**
- ⏰ Waiting on third-party (audit, testnet)
- 🔍 Need design decision
- 🤝 Waiting on stakeholder feedback
- 🐛 Upstream bug (external library)
- 📚 Need to research/learn

**Move back to "In Progress" when:**
- Blocker resolved
- Can continue work

**Action Required:**
Add comment explaining blocker and expected resolution date.

---

#### **Review** (WIP: 1)
- PR created
- Awaiting code review
- CI/CD checks running

**Move to "Testing" when:**
- Code review approved
- CI/CD passing
- Merged to integration branch

**Move back to "In Progress" when:**
- Changes requested
- CI/CD failing

**WIP Limit Rationale:**
Don't create too many PRs at once; finish what's in review first.

---

#### **Testing** (WIP: 2)
- Merged to integration/staging
- QA/manual testing in progress
- Validation against acceptance criteria

**Testing Checklist:**
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Accessibility audit (if applicable)
- [ ] Gas optimization check (if Web3)
- [ ] Manual testing complete
- [ ] Stakeholder approval

**Move to "Done" when:**
- All tests pass
- Acceptance criteria met
- Deployed to production (or ready for production)

**WIP Limit Rationale:**
Balance between development and testing capacity.

---

#### **Done** (No WIP Limit)
- Complete and deployed
- Acceptance criteria met
- No further work needed

**Archive Policy:**
Archive issues older than 30 days automatically.

---

## WIP Limits Strategy

### Current Recommendation (Solo Developer)

```yaml
Backlog:      ∞  (unlimited)
To Do:        3  (top priorities only)
In Progress:  1  (focus on one thing)
Blocked:      -  (no limit, track all blockers)
Review:       1  (finish reviews before new PRs)
Testing:      2  (can test while developing)
Done:         ∞  (unlimited)
```

### Scaling WIP Limits (Team Growth)

**2-Person Team:**
```yaml
To Do:        5
In Progress:  2  (one per person)
Review:       2
Testing:      3
```

**3-Person Team:**
```yaml
To Do:        7
In Progress:  3  (one per person)
Review:       3
Testing:      4
```

**5+ Person Team:**
Consider switching to Scrum at this point.

---

## Swimlanes Configuration

Organize your board into swimlanes for better visibility.

### Option A: By Priority

```
┌────────────────────────────────────────────────────┐
│ 🔴 CRITICAL (Priority: Highest)                    │
├────────────────────────────────────────────────────┤
│ 🟠 HIGH (Priority: High)                           │
├────────────────────────────────────────────────────┤
│ 🟡 MEDIUM (Priority: Medium)                       │
├────────────────────────────────────────────────────┤
│ 🟢 LOW (Priority: Low/Lowest)                      │
└────────────────────────────────────────────────────┘
```

### Option B: By Work Type (Recommended)

```
┌────────────────────────────────────────────────────┐
│ 🤖 AI Generation                                   │
├────────────────────────────────────────────────────┤
│ 🔗 Web3/Contracts                                  │
├────────────────────────────────────────────────────┤
│ 🎨 Brand Factory                                   │
├────────────────────────────────────────────────────┤
│ ⚙️ DevOps/Infrastructure                          │
├────────────────────────────────────────────────────┤
│ 🐛 Bugs                                            │
└────────────────────────────────────────────────────┘
```

### Option C: By Area (Most Granular)

```
JQL Queries for Swimlanes:
- UI Generation: area = "ui-generation"
- Color System: area = "color-system"
- Brand Factory: area = "brand-factory"
- Smart Contracts: area = "contracts"
- Payments: area = "payments"
- Everything Else: (none of the above)
```

---

## Quick Filters

Create these quick filters for fast board views:

### 1. My Work
```jql
assignee = currentUser()
```

### 2. Blocked Items
```jql
status = Blocked
```

### 3. High Priority
```jql
priority in (Highest, High)
```

### 4. AI Work
```jql
labels = "ai-generation" OR area = "ui-generation"
```

### 5. Web3 Work
```jql
labels in ("web3", "contracts") OR area in ("contracts", "payments", "nft-minting")
```

### 6. Ready for Review
```jql
status = Review ORDER BY created ASC
```

### 7. Needs Tests
```jql
labels = "quality:needs-tests" AND status != Done
```

### 8. This Week
```jql
created >= startOfWeek() OR updated >= startOfWeek()
```

### 9. Overdue
```jql
due < now() AND status != Done
```

### 10. No Assignee
```jql
assignee is EMPTY AND status not in (Backlog, Done)
```

---

## Automation Rules

### 1. Auto-Move to Blocked (When PR Has Conflicts)

**Trigger:** GitHub webhook (merge conflict)
**Action:** Move to "Blocked" column + add comment

### 2. Stale Issue Alert

**Trigger:** Scheduled (daily)
**Condition:** Status = "In Progress" AND updated < -7d
**Action:** Add comment "⏰ This issue hasn't been updated in 7 days. Is it blocked?"

### 3. Auto-Assign Based on Area

**Trigger:** Issue created
**Condition:** Area = "Smart Contracts"
**Action:** Assign to @solidity-dev

### 4. Label Sync

**Trigger:** Status changed
**Action:**
- To Do → Add label "status:ready"
- In Progress → Add label "status:in-progress"
- Blocked → Add label "status:blocked"
- Done → Add label "status:completed"

### 5. Blocked Alert

**Trigger:** Issue moved to "Blocked"
**Action:** Send Slack notification to #dev-team

### 6. High Priority Alert

**Trigger:** Priority changed to "Highest"
**Action:** Send Slack DM to project lead

---

## Metrics to Track

### Cycle Time
**Definition:** Time from "In Progress" to "Done"
**Target:**
- XS/S: < 1 day
- M: 2-3 days
- L: 5-7 days
- XL: 10-14 days

**How to Measure:**
Jira Reports → Control Chart

### Lead Time
**Definition:** Time from "To Do" to "Done"
**Target:** Cycle Time + 20%

### Throughput
**Definition:** Issues completed per week
**Target:** Start with baseline, improve over time

**How to Measure:**
Jira Reports → Velocity Chart (even for Kanban)

### Blocked Time
**Definition:** Average time issues spend blocked
**Target:** < 10% of total cycle time

### WIP Violations
**Definition:** How often WIP limits are exceeded
**Target:** 0 (enforce limits strictly)

---

## Kanban Cadence (Light Ceremonies)

Even without Scrum sprints, maintain regular rhythms:

### Daily (Solo Dev)
**Morning:**
- Review board
- Check blocked items
- Prioritize top 3 in "To Do"

**Evening:**
- Update issue status
- Add comments on progress
- Flag blockers

### Weekly

**Monday (Planning - 30 min):**
- Review backlog
- Move top priorities to "To Do"
- Refine acceptance criteria
- Set WIP limits for the week

**Friday (Review - 30 min):**
- Review what moved to "Done"
- Analyze metrics (cycle time, throughput)
- Identify process improvements
- Clean up board (archive old items)

### Monthly (Retrospective - 1 hour)

**Questions:**
1. What slowed us down this month?
2. What blockers can we prevent?
3. Are WIP limits working?
4. Should we adjust column structure?
5. What process improvements to try?

**Outcomes:**
- 1-3 actionable improvements
- Update board configuration if needed
- Adjust automation rules

---

## MachLabs-Specific Tips

### AI Generation Work
**Challenge:** Unpredictable iteration time
**Solution:**
- Break into smaller experiments
- Use "Spike" issue type for R&D
- Time-box prompt engineering to 1-2 hours max

### Smart Contract Development
**Challenge:** Audit dependencies
**Solution:**
- Create separate "Audit Queue" column
- Set "Blocked" when sent for audit
- Estimate 2-4 weeks for external audits

### Web3 Testnet/Mainnet
**Challenge:** Deployment windows
**Solution:**
- Add "Deployment" label
- Create deployment checklist
- Track gas costs in issue comments

### Accessibility Work
**Challenge:** Validation time-consuming
**Solution:**
- Add "A11y Testing" sub-column in "Testing"
- Use automated tools (axe, pa11y) in CI
- Manual audit for WCAG AAA only

---

## Board Health Indicators

### 🟢 Healthy Board
- WIP limits respected
- Items moving right consistently
- Blocked column < 20% of active work
- "In Progress" has exactly 1 item (solo dev)
- "To Do" has clear priorities

### 🟡 Needs Attention
- WIP limits exceeded occasionally
- Some items stale (>7 days in same column)
- Blocked column > 20% of active work
- "To Do" has >5 items

### 🔴 Action Required
- WIP limits constantly violated
- Multiple items stale (>14 days)
- Blocked column > 50% of active work
- "In Progress" has >2 items (solo dev)
- "To Do" has >10 items

**Fix:** Stop starting new work, finish what's in progress.

---

## Transitioning to Scrum Later

When you're ready to add more structure:

### Scrumban (Hybrid Approach)

**Keep from Kanban:**
- Visual board
- WIP limits
- Continuous flow

**Add from Scrum:**
- 2-week iterations
- Sprint planning meeting
- Sprint retrospective
- Velocity tracking

**Don't Add:**
- Daily standups (unnecessary for small teams)
- Sprint burndown (use cumulative flow instead)
- Story points (use effort labels)

### When to Switch

Switch to full Scrum when:
- Team size: 5+ people
- Predictable velocity established
- Regular release cadence (every 2 weeks)
- Need stakeholder demos
- Multiple teams coordinating

---

## Jira Kanban vs Scrum Board Comparison

| Feature | Kanban | Scrum |
|---------|--------|-------|
| **Iterations** | Continuous | Fixed sprints |
| **Commitment** | None | Sprint backlog |
| **Changes** | Anytime | Only between sprints |
| **WIP Limits** | Enforced | Optional |
| **Metrics** | Cycle time, lead time | Velocity, burndown |
| **Roles** | Flexible | Product Owner, Scrum Master |
| **Ceremonies** | Optional | Required |
| **Best For** | Continuous delivery, maintenance | Predictable releases, large teams |

---

## Common Pitfalls to Avoid

### ❌ Ignoring WIP Limits
**Problem:** Too many items "In Progress"
**Impact:** Nothing gets finished
**Fix:** Enforce limits strictly, finish before starting

### ❌ Vague Acceptance Criteria
**Problem:** Don't know when "Done"
**Impact:** Items linger in "Testing"
**Fix:** Write clear checklist before moving to "To Do"

### ❌ Not Managing Blockers
**Problem:** Items stuck in "Blocked" for weeks
**Impact:** Low throughput
**Fix:** Daily blocker review, escalate quickly

### ❌ Skipping Retrospectives
**Problem:** Same problems repeat
**Impact:** No process improvement
**Fix:** Monthly retro minimum (even solo)

### ❌ Over-Engineering the Board
**Problem:** Too many columns/swimlanes
**Impact:** Analysis paralysis
**Fix:** Start simple, add complexity only when needed

---

## Resources

### Kanban Books
- "Kanban" by David J. Anderson
- "Personal Kanban" by Jim Benson (great for solo devs)

### Atlassian Guides
- [Kanban vs Scrum](https://www.atlassian.com/agile/kanban/kanban-vs-scrum)
- [Kanban Board Examples](https://www.atlassian.com/agile/kanban/boards)

### Web3 Agile Resources
- [Blockchain Applications for Agile](https://www.researchgate.net/publication/325644177_Blockchain_applications_for_Agile_methodologies)
- [Agile for Blockchain Development](https://agileasia.com/how-agile-can-be-used-to-develop-blockchain-applications/)

---

**Last Updated:** 2025-11-30
**Project:** MachLabs
**Methodology:** Kanban (with optional Scrumban transition)
