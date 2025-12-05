# Penpot MCP Integration - Feature Plan

**Phase 2, Step 5** | `feature/penpot-integration` | v0.4.0-alpha.5 | 2-3 days

## Goals
- Direct export to Penpot design files
- Sync design tokens bidirectionally
- Component library export
- Auto-update Penpot when brand regenerates
- Collaboration features (share Penpot links)

## Deliverables
- [ ] `lib/integrations/penpot/client.ts` - Penpot API client
- [ ] `lib/integrations/penpot/exporter.ts` - Design file exporter
- [ ] `lib/integrations/penpot/token-sync.ts` - Bidirectional token sync
- [ ] MCP server for Penpot integration
- [ ] Auto-sync on brand updates
- [ ] Component library export to Penpot

**Dependencies**: component-generator (2.1), design-tokens (1.4)
**Completes**: Phase 2 (v0.4.0) with design tool integration
