# MACHUPS Features

This directory tracks all features organized by development phase, with deliverables and success metrics.

## Phase-Based Structure

Features are organized by the 4-phase development roadmap:

### Phase 1: Core Brand Generation (v0.3.0)
**Timeline**: Dec 4-11, 2025

| Feature | Status | Version |
|---------|--------|---------|
| [1.1 Auto-Deploy](./phase1/1.1-auto-deploy/) | 🔵 Planning | v0.3.0-alpha.1 |
| [1.2 NFT Rarity](./phase1/1.2-nft-rarity/) | 🔵 Planning | v0.3.0-alpha.2 |
| [1.3 Brand Generation](./phase1/1.3-brand-generation/) | 🔵 Planning | v0.3.0-alpha.3 |
| [1.4 Design Tokens](./phase1/1.4-design-tokens/) | 🔵 Planning | v0.3.0-alpha.4 |
| [1.5 Preview Deployments](./phase1/1.5-preview-deployments/) | 🔵 Planning | v0.3.0-alpha.5 |
| [1.6 Design Site](./phase1/1.6-design-site/) | 🔵 Planning | v0.3.0-alpha.6 |

### Phase 2: Component Generation (v0.4.0)
**Timeline**: Dec 12-18, 2025

| Feature | Status | Version |
|---------|--------|---------|
| [2.1 Component Generator](./phase2/2.1-component-generator/) | 🔵 Planning | v0.4.0-alpha.1 |
| [2.2 ShadCN Integration](./phase2/2.2-shadcn-integration/) | 🔵 Planning | v0.4.0-alpha.2 |
| [2.3 Component Playground](./phase2/2.3-component-playground/) | 🔵 Planning | v0.4.0-alpha.3 |
| [2.4 Accessibility Audit](./phase2/2.4-accessibility-audit/) | 🔵 Planning | v0.4.0-alpha.4 |
| [2.5 Penpot Integration](./phase2/2.5-penpot-integration/) | 🔵 Planning | v0.4.0-alpha.5 |

### Phase 3: Premium Features (v0.5.0)
**Timeline**: Dec 19-25, 2025

| Feature | Status | Version |
|---------|--------|---------|
| [3.1 Pitch Deck Generator](./phase3/3.1-pitch-deck-generator/) | 🔵 Planning | v0.5.0-alpha.1 |
| [3.2 A/B Testing Variants](./phase3/3.2-ab-testing-variants/) | 🔵 Planning | v0.5.0-alpha.2 |
| [3.3 Custom Domains](./phase3/3.3-custom-domains/) | 🔵 Planning | v0.5.0-alpha.3 |
| [3.4 Figma MCP](./phase3/3.4-figma-mcp/) | 🔵 Planning | v0.5.0-alpha.4 |
| [3.5 GitHub MCP](./phase3/3.5-github-mcp/) | 🔵 Planning | v0.5.0-alpha.5 |

### Phase 4: Production Launch (v1.0.0)
**Timeline**: Dec 26, 2025 - Jan 15, 2026

| Feature | Status | Version |
|---------|--------|---------|
| [4.1 Public API v1](./phase4/4.1-api-v1/) | 🔵 Planning | v1.0.0-alpha.1 |
| [4.2 Analytics Dashboard](./phase4/4.2-analytics-dashboard/) | 🔵 Planning | v1.0.0-alpha.2 |
| [4.3 Admin Panel](./phase4/4.3-admin-panel/) | 🔵 Planning | v1.0.0-alpha.3 |
| [4.4 Marketing Site](./phase4/4.4-marketing-site/) | 🔵 Planning | v1.0.0-alpha.4 |
| [4.5 Documentation Site](./phase4/4.5-docs-site/) | 🔵 Planning | v1.0.0-alpha.5 |

---

## Feature Plan Structure

Each feature directory contains:
- `OVERVIEW.md` - Goals, architecture, implementation plan, deliverables, success metrics

## Status Legend

- 🟢 **Implemented** - Feature is live and tested
- 🟡 **In Progress** - Currently under development
- 🔵 **Planning** - Design complete, implementation scheduled
- 🔴 **Blocked** - Waiting on dependencies or decisions

## Adding a New Feature

1. Determine the phase (1-4)
2. Create directory: `phase{N}/{N}.{M}-feature-name/`
3. Add `OVERVIEW.md` with complete feature plan
4. Update this README's feature table
5. Update [`docs/project/MILESTONE_PLAN.md`](../project/MILESTONE_PLAN.md) if needed

---

**Last Updated**: December 4, 2025
**Total Features**: 21 across 4 phases
- **Phase 1**: 6 features (Core Brand Generation)
- **Phase 2**: 5 features (Component Generation + Design Tools)
- **Phase 3**: 5 features (Premium + MCP Integrations)
- **Phase 4**: 5 features (Production Infrastructure)
