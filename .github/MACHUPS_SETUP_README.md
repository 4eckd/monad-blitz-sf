# 🚀 MACHUPS Setup - Quick Start

**Event:** Monad Blitz #18
**Repository:** https://github.com/4eckd/monad-blitz-sf

---

## ⚡ Quick Setup (Automated)

```bash
# Run the automated setup script
cd machlab
chmod +x scripts/setup-machups.sh
./scripts/setup-machups.sh
```

This will:
- ✅ Create all MACHUPS-specific labels
- ✅ Guide you through milestone creation
- ✅ Guide you through project board setup
- ✅ Verify directory structure

---

## 📋 Manual Setup (If Automated Fails)

### 1. Create Labels

```bash
# Sync labels from YAML file
gh label sync --labels .github/machups-labels.yml --force
```

Or create manually using `.github/machups-labels.yml` as reference.

### 2. Create Milestones

In GitHub:
1. Go to: https://github.com/4eckd/monad-blitz-sf/milestones
2. Click "New milestone"
3. Create these 4 milestones:

| Name | Due Date | Description |
|------|----------|-------------|
| Checkpoint 1: Foundation Complete | H3:00 | Dev environment setup, Claude API working, basic logo gen |
| Checkpoint 2: Core Features Complete | H7:00 | All generators working, export functional |
| Checkpoint 3: Integration Complete | H10:00 | Deployed, x402 working, NFT minting functional |
| Final Submission | H11:00 | Submitted, demo ready, tested |

### 3. Create Project Board

1. Go to: https://github.com/orgs/Fused-Gaming/projects
2. Click "New project"
3. Name: "Monad Blitz #18 - MACHUPS"
4. Template: "Board"
5. Add columns: Backlog, Ready, In Progress, Review, Done, Blocked

See `.github/MACHUPS_PROJECT_BOARD_SETUP.md` for detailed configuration.

### 4. Create Issues

Read `.github/MACHUPS_ISSUES.md` and create each issue manually, or wait for automated issue creation (coming soon).

---

## 📚 Documentation Index

| Document | Purpose |
|----------|---------|
| `MACHUPS_PROJECT_BOARD_SETUP.md` | Complete project board configuration |
| `MACHUPS_MILESTONES.md` | Milestone definitions and checkpoints |
| `MACHUPS_ISSUES.md` | All 35+ GitHub issues to create |
| `MACHUPS_BRANCHING_STRATEGY.md` | Git workflow for rapid development |
| `MACHUPS_DEVOPS_PLAN.md` | CI/CD, deployment, monitoring |
| `MACHUPS_PITCH_REFINEMENT.md` | 5-minute demo script and pitch guide |
| `MACHUPS_CONTINUOUS_IMPROVEMENT.md` | Hourly check-ins, metrics, post-mortems |
| `MACHUPS_BRAND_ADHERENCE.md` | Multi-brand consistency guide |
| `machups-labels.yml` | Label definitions (100+ labels) |

---

## 🎯 Pre-Event Checklist

**1 Week Before:**
- [ ] Run setup script
- [ ] Create all milestones
- [ ] Set up project board
- [ ] Create first 10 issues (Phase 1)
- [ ] Review branching strategy
- [ ] Test GitHub Actions

**1 Day Before:**
- [ ] Verify all labels exist
- [ ] Assign team members to issues
- [ ] Review DevOps plan
- [ ] Practice demo script (5min)
- [ ] Test environment setup

**Day Of Event (H0:00):**
- [ ] Pull latest from main
- [ ] Create phase branches
- [ ] Start Phase 1 issues
- [ ] Begin hourly check-ins

---

## 🆘 Troubleshooting

### "gh: command not found"

Install GitHub CLI:
- Mac: `brew install gh`
- Ubuntu: `sudo apt install gh`
- Windows: Download from https://cli.github.com/

### "Permission denied"

Make script executable:
```bash
chmod +x scripts/setup-machups.sh
```

### "Not logged in to GitHub"

Authenticate:
```bash
gh auth login
```

### "Labels already exist"

Use `--force` flag to overwrite:
```bash
gh label create "P0-critical" --color "b60205" --force
```

---

## 📞 Support

Questions? Issues?
1. Check documentation in `.github/`
2. Review `MACHUPS_ISSUES.md` for examples
3. Ask in team chat (Discord/Slack)

---

**Last Updated:** 2025-12-03
**Event:** Monad Blitz #18
**Status:** Ready for setup

🚀 **Let's build MACHUPS!**
