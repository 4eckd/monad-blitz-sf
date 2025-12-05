# ShadCN UI Integration - Feature Plan

## Overview

Integration with ShadCN UI component library for enhanced component generation.

**Milestone**: Phase 2, Step 2
**Dependencies**: component-generator (Phase 2, Step 1)
**Branch**: `feature/shadcn-integration`
**Version**: v0.4.0-alpha.2
**Estimated Effort**: 2 days

---

## Goals

- ✅ Integrate ShadCN UI primitives
- ✅ Allow users to choose ShadCN or custom components
- ✅ Apply brand tokens to ShadCN components
- ✅ Maintain full customization capability

---

## Deliverables

- [ ] `lib/components/shadcn-adapter.ts` - ShadCN integration layer
- [ ] `lib/components/shadcn-templates/` - ShadCN component templates
- [ ] Theme conversion from brand tokens → ShadCN theme
- [ ] CLI command: `machups add <component>` (like `npx shadcn-ui add`)

---

**Merge Order Position**: Step 2 of 5 (Phase 2)
**Version Tag**: `v0.4.0-alpha.2`
**Previous Step**: feature/component-generator (v0.4.0-alpha.1)
**Next Step**: feature/component-playground (v0.4.0-alpha.3)
