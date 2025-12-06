# Penpot Design System Integration - GONADS

**Complete guide to using the GONADS design system with Penpot**

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Design System Files](#design-system-files)
4. [Penpot Setup](#penpot-setup)
5. [Syncing to Penpot](#syncing-to-penpot)
6. [Using the Design Library](#using-the-design-library)
7. [Component Library](#component-library)
8. [Mockup Templates](#mockup-templates)
9. [Export Options](#export-options)
10. [Troubleshooting](#troubleshooting)

---

## Overview

The GONADS design system is fully integrated with Penpot, providing:

- ✅ **Automated sync** from W3C DTCG tokens to Penpot
- 🎨 **Complete color palette** (brand, neutral, semantic, gradients)
- 🔤 **Typography system** (Inter + JetBrains Mono)
- ⚛️ **Component library** (Button, Card, Input, Header, Footer)
- 🎭 **Logo variations** (Wordmark, Combination, Badge)
- 🖼️ **Mockup templates** (Landing page, Dashboard, NFT Mint)
- 📤 **Export capabilities** (PNG, SVG, PDF)

### Architecture

```
W3C DTCG Tokens (design-tokens.json)
           ↓
   Penpot Design System (penpot-design-system.json)
           ↓
   MCP Client (lib/mcp/penpot-client.ts)
           ↓
   Penpot MCP Server (@penpot/mcp-server)
           ↓
   Penpot Design Platform (design.penpot.app)
```

---

## Quick Start

### 1. Install Dependencies

```bash
# Install Penpot MCP server
npm install -g @penpot/mcp-server

# Install project dependencies
cd brands/gonads-io/preview
npm install
```

### 2. Configure Environment

```bash
# Create .env file
cp .env.example .env

# Add Penpot credentials
PENPOT_SERVER_URL=https://design.penpot.app
PENPOT_API_KEY=your_api_key_here
PENPOT_WORKSPACE_ID=your_workspace_id
```

**Get your Penpot API key:**
1. Go to https://design.penpot.app
2. Log in or create account
3. Go to Settings → API Tokens
4. Create new token: "MACHUPS Integration"
5. Copy token to `.env`

### 3. Run Initial Sync

```bash
# Sync design system to Penpot (creates new file)
npm run sync-penpot

# Or use tsx directly
tsx sync-to-penpot.ts
```

### 4. View in Penpot

After sync completes, you'll see:
```
✅ Sync complete!
🔗 View your design system: https://design.penpot.app/workspace/.../file-abc123
```

Open that URL to view your complete design system in Penpot!

---

## Design System Files

### File Structure

```
brands/gonads-io/
├── penpot-design-system.json     # Penpot-specific design system
├── design-tokens.json             # W3C DTCG source tokens
├── sync-to-penpot.ts              # Sync script (TypeScript)
├── penpot-file-info.json          # Generated after sync
├── penpot-exports/                # Exported mockups (after export)
│   ├── landing-page.png
│   ├── dashboard.png
│   └── nft-mint.png
└── PENPOT_INTEGRATION.md          # This file
```

### Design System Schema

**`penpot-design-system.json`** contains:

```json
{
  "$schema": "https://penpot.app/schema/design-system/1.0.0",
  "$metadata": { /* Brand info */ },
  "colorPalette": {
    "brand": { /* Primary, secondary, accent */ },
    "neutral": { /* 50-900 gray scale */ },
    "semantic": { /* Success, warning, error, info */ },
    "gradients": { /* Primary, accent, dark */ }
  },
  "typography": {
    "fontFamilies": { /* Heading, body, mono */ },
    "typeScale": { /* xs, sm, base, lg, xl, 2xl-6xl */ },
    "fontWeights": { /* 400-900 */ }
  },
  "spacing": { /* xs to 5xl */ },
  "borderRadius": { /* none to full */ },
  "shadows": { /* sm to xl + glow effects */ },
  "animation": { /* duration + easing */ },
  "components": { /* Button, Card, Input specs */ },
  "logoVariations": [ /* Wordmark, combination, badge */ ],
  "usageGuidelines": { /* Do's and don'ts */ },
  "penpotIntegration": { /* MCP config */ }
}
```

---

## Penpot Setup

### Create Penpot Account

1. **Sign up:** https://design.penpot.app
2. **Verify email**
3. **Create workspace:** "MACHUPS Projects"
4. **Get API token:** Settings → API Tokens → Create

### Configure MCP Server

The Penpot MCP server configuration is in [`mcp/penpot/config.json`](../../mcp/penpot/config.json):

```json
{
  "mcpServers": {
    "penpot": {
      "command": "npx",
      "args": ["-y", "@penpot/mcp-server"],
      "env": {
        "PENPOT_ACCESS_TOKEN": "${PENPOT_ACCESS_TOKEN}",
        "PENPOT_API_URL": "https://design.penpot.app/api"
      }
    }
  }
}
```

### Test MCP Connection

```bash
# Test Penpot MCP server
npx @penpot/mcp-server --help

# Should show available commands:
# - create_file
# - create_library
# - sync_tokens
# - generate_mockups
# - export_frames
```

---

## Syncing to Penpot

### Full Sync (First Time)

```bash
# Create new Penpot file with complete design system
tsx sync-to-penpot.ts
```

This will:
1. ✅ Connect to Penpot MCP
2. ✅ Create new design file "GONADS - Design System"
3. ✅ Create design library with all tokens
4. ✅ Generate 3 logo variations
5. ✅ Create 5 React components
6. ✅ Generate mockup templates
7. ✅ Export mockups as PNG
8. ✅ Save file info to `penpot-file-info.json`

### Update Existing File

```bash
# Update existing file (requires PENPOT_FILE_ID in .env)
tsx sync-to-penpot.ts --update
```

### Partial Syncs

```bash
# Sync only colors (no components, no logos)
tsx sync-to-penpot.ts --update --no-components --no-logos

# Sync everything except mockup export
tsx sync-to-penpot.ts --no-export-mockups

# Sync only typography
tsx sync-to-penpot.ts --update --no-colors --no-components --no-logos
```

### Options

| Flag | Description |
|------|-------------|
| `--update` | Update existing file instead of creating new |
| `--no-colors` | Skip color palette sync |
| `--no-typography` | Skip typography sync |
| `--no-components` | Skip component generation |
| `--no-logos` | Skip logo generation |
| `--export-mockups` | Export mockups as PNG (default: false) |

---

## Using the Design Library

### Access Library in Penpot

1. Open Penpot: https://design.penpot.app
2. Navigate to your workspace
3. Find "GONADS Design System Library" in sidebar
4. **Right-click → "Add to workspace"**

### Using Colors

**From Library:**
1. Select any shape/text
2. Open color picker
3. Click "Libraries" tab
4. Select "GONADS Design System Library"
5. Choose color:
   - **Brand → primary** (#9333EA - Ballsy Purple)
   - **Brand → secondary** (#14B8A6 - Testicular Teal)
   - **Brand → accent** (#F97316 - Vitality Orange)

**Direct Input:**
- Primary: `#9333EA`
- Secondary: `#14B8A6`
- Accent: `#F97316`
- Background: `#0F172A`

### Using Typography

**Heading Font:**
- Family: Inter
- Weights: 700, 800, 900
- Sizes: 20px, 24px, 30px, 36px, 48px, 60px

**Body Font:**
- Family: Inter
- Weights: 400, 500, 600
- Sizes: 12px, 14px, 16px, 18px

**Code Font:**
- Family: JetBrains Mono
- Weights: 400, 700
- Use for: Wallet addresses, contract IDs, stats

### Using Components

1. Open "Assets" panel (A)
2. Navigate to "GONADS Design System Library"
3. Drag components to canvas:
   - **Button** (4 variants: Primary, Secondary, Accent, Ghost)
   - **Card** (3 variants: Default, Gradient, Glow)
   - **Input** (3 types: Text, Email, Password)
   - **Header** (2 variants: With/Without Wallet)
   - **Footer** (Full footer)

---

## Component Library

### Button Component

**Variants:**

| Variant | Background | Text Color | Hover Effect |
|---------|-----------|------------|--------------|
| Primary | Gradient (#9333EA → #7C3AED) | White | Glow + Scale(1.05) |
| Secondary | Gradient (#14B8A6 → #0D9488) | White | Glow + Scale(1.05) |
| Accent | Gradient (#F97316 → #EA580C) | White | Glow + Scale(1.05) |
| Ghost | Transparent | #9333EA | BG #9333EA + Text White |

**Sizes:**
- **sm:** 32px height, 16px padding
- **md:** 40px height, 24px padding
- **lg:** 48px height, 32px padding

**Usage in Penpot:**
1. Drag "Button - Primary" from library
2. Edit text: Double-click
3. Resize: Drag handles (maintains padding)
4. Change variant: Component panel → Switch variant

### Card Component

**Variants:**

| Variant | Background | Border | Hover Effect |
|---------|-----------|--------|--------------|
| Default | #1E293B | 1px #334155 | None |
| Gradient | Linear (#1E293B → #334155) | None | None |
| Glow | #1E293B | 1px #334155 | Glow shadow |

**Properties:**
- Border radius: 16px (lg)
- Padding: 24px (lg)
- Shadow: md (default)

### Input Component

**Base Styles:**
- Background: #0F172A
- Border: 1px solid #334155
- Border radius: 8px (md)
- Padding: 12px 16px
- Font: Inter 400, 16px

**Focus State:**
- Border: 2px solid #9333EA
- Shadow: 0 0 20px rgba(147, 51, 234, 0.5)

---

## Mockup Templates

### Available Templates

After sync, you'll have 3 mockup templates:

#### 1. Landing Page
- **Size:** 1440x3200px
- **Sections:** Hero, Features, Mint, Newsletter, Footer
- **Components:** Header, 3 Cards, Mint form, Footer
- **File:** `penpot-exports/landing-page.png`

#### 2. Dashboard
- **Size:** 1440x900px
- **Sections:** Sidebar, Stats, NFT Grid
- **Components:** Header, Stat cards, NFT cards
- **File:** `penpot-exports/dashboard.png`

#### 3. NFT Mint Page
- **Size:** 1440x1200px
- **Sections:** Hero, Mint form, Details
- **Components:** Header, Mint card, Footer
- **File:** `penpot-exports/nft-mint.png`

### Customizing Templates

1. Open mockup frame in Penpot
2. Edit text: Double-click any text
3. Replace images: Drag new image onto placeholder
4. Change colors: Select element → Color picker → Library
5. Swap components: Delete old → Drag new from library

### Creating New Mockups

1. **Create new frame:** F (Frame tool)
2. **Add components:** Drag from library
3. **Apply styles:** Use color/typography library
4. **Export:** Right-click frame → Export → PNG/SVG

---

## Export Options

### Export from Penpot UI

**Single Frame:**
1. Select frame
2. Right-click → Export
3. Choose format:
   - **PNG:** Raster (1x, 2x, 3x)
   - **SVG:** Vector
   - **PDF:** Print-ready

**Multiple Frames:**
1. Select frames (Shift+Click)
2. Right-click → Export selected
3. Downloads ZIP with all exports

### Export via Sync Script

```bash
# Export all mockups as PNG (2x scale, 90% quality)
tsx sync-to-penpot.ts --export-mockups
```

Exports saved to: `penpot-exports/`

### Programmatic Export

```typescript
import { createPenpotClient } from '../../lib/mcp/penpot-client';

const penpot = await createPenpotClient({ /* config */ });

const exports = await penpot.exportMockups(
  fileId,
  ['frame-id-1', 'frame-id-2'],
  {
    format: 'png',
    scale: 2,      // 2x resolution
    quality: 90    // 90% quality
  }
);

// exports is { [frameId]: base64ImageData }
```

---

## Troubleshooting

### Connection Issues

**Problem:** `Failed to connect to Penpot MCP server`

**Solutions:**
1. Check API key in `.env`:
   ```bash
   echo $PENPOT_API_KEY
   ```
2. Test MCP server:
   ```bash
   npx @penpot/mcp-server --version
   ```
3. Verify workspace ID:
   ```bash
   # Get from Penpot URL:
   # https://design.penpot.app/workspace/YOUR_WORKSPACE_ID
   ```

### Sync Failures

**Problem:** `Failed to sync tokens`

**Solutions:**
1. Check file permissions (needs write access)
2. Verify file ID exists:
   ```bash
   cat penpot-file-info.json | jq '.fileId'
   ```
3. Try creating new file:
   ```bash
   tsx sync-to-penpot.ts  # without --update
   ```

### Missing Components

**Problem:** Components not appearing in library

**Solutions:**
1. Refresh Penpot page (Ctrl+R)
2. Re-add library to workspace:
   - Libraries → GONADS → Add to workspace
3. Check sync completed:
   ```bash
   cat penpot-file-info.json | jq '.componentsCount'
   # Should show 5
   ```

### Export Errors

**Problem:** `Failed to export mockups`

**Solutions:**
1. Check frame IDs exist:
   ```bash
   cat penpot-file-info.json | jq '.pages[].framesCount'
   ```
2. Verify export directory exists:
   ```bash
   mkdir -p penpot-exports
   ```
3. Manually export from Penpot UI

---

## Best Practices

### Design Workflow

1. **Start with library:** Always use library components/colors
2. **Create frames first:** F key → Set size → Add components
3. **Use constraints:** Set component constraints for responsive behavior
4. **Group related elements:** Ctrl+G to group
5. **Name frames clearly:** "Landing-Hero", "Dashboard-Stats", etc.

### Sync Workflow

1. **Initial sync:** Create new file with all assets
2. **Iterate in Penpot:** Make design changes
3. **Update tokens if needed:** Edit `design-tokens.json`
4. **Re-sync:** `tsx sync-to-penpot.ts --update`
5. **Export:** `--export-mockups` when ready

### Collaboration

1. **Share Penpot file:** Get link from Penpot → Share
2. **Invite team:** Add team members to workspace
3. **Version control:** Use Penpot's version history
4. **Comments:** Add comments in Penpot for feedback

---

## Advanced Usage

### Custom Components

Create custom components in Penpot:

1. Design component (e.g., "NFT Card")
2. Right-click → Create component
3. Add to library: Libraries → Move to library
4. Sync will preserve custom components

### Bi-directional Sync

**Penpot → Code:**
1. Make changes in Penpot
2. Export component as SVG
3. Convert to React component
4. Add to `components/` directory

**Code → Penpot:**
1. Update `design-tokens.json`
2. Run sync: `tsx sync-to-penpot.ts --update`
3. Penpot library updates automatically

### Automated Workflows

**GitHub Actions:**
```yaml
name: Sync to Penpot
on:
  push:
    paths:
      - 'brands/gonads-io/design-tokens.json'

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: tsx brands/gonads-io/sync-to-penpot.ts --update
        env:
          PENPOT_API_KEY: ${{ secrets.PENPOT_API_KEY }}
```

---

## Resources

**Penpot:**
- Website: https://penpot.app
- Docs: https://help.penpot.app
- Community: https://community.penpot.app

**MCP:**
- Penpot MCP: https://github.com/penpot/mcp-server
- MCP Docs: https://modelcontextprotocol.io

**MACHUPS:**
- Docs: [docs.machups.com](https://docs.machups.com)
- GitHub: [4eckd/monad-blitz-sf](https://github.com/4eckd/monad-blitz-sf)

---

## Support

**Issues:**
- GitHub: Create issue with `penpot-integration` label
- Email: support@machups.com
- Discord: [MACHUPS Community](https://discord.gg/machups)

**Questions:**
- Review [PHASE_2_STRATEGY.md](../../docs/PHASE_2_STRATEGY.md)
- Check [INFRASTRUCTURE_README.md](../../INFRASTRUCTURE_README.md)
- Read [Penpot MCP client](../../lib/mcp/penpot-client.ts)

---

**Last Updated:** December 6, 2025
**Version:** 1.0.0
**Status:** Production Ready ✅
