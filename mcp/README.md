# MCP Servers for MACHUPS

This directory contains Model Context Protocol (MCP) server configurations for various integrations used in the MACHUPS project.

## Available MCPs

### 1. Penpot MCP (`mcp/penpot/`)
**Purpose:** Design file creation and manipulation

**Capabilities:**
- Create new Penpot design files
- Import design tokens
- Create component libraries
- Build pages and artboards
- Export designs

**Setup:**
```bash
# Install Penpot MCP
npx -y @penpot/mcp-server

# Set environment variable
export PENPOT_ACCESS_TOKEN=your_token_here
```

**Usage:**
```typescript
import { PenpotMCP } from './mcp/penpot';

const penpot = new PenpotMCP();
const file = await penpot.createFile('Brand System');
await penpot.importTokens(file.id, designTokens);
```

### 2. Cloudflare MCP (`mcp/cloudflare/`)
**Purpose:** Deployment and edge computing

**Capabilities:**
- Deploy to Cloudflare Pages
- Manage DNS records
- Configure Workers
- Analytics integration

**Setup:**
```bash
# Install Cloudflare MCP
npx -y @cloudflare/mcp-server-cloudflare

# Set environment variables
export CLOUDFLARE_API_TOKEN=your_token_here
export CLOUDFLARE_ACCOUNT_ID=your_account_id
```

**Usage:**
```typescript
import { CloudflareMCP } from './mcp/cloudflare';

const cf = new CloudflareMCP();
await cf.deployPages('app.machups.com', './dist');
```

### 3. Anthropic MCP (`mcp/anthropic/`)
**Purpose:** Claude AI integration

**Capabilities:**
- Generate brand concepts
- Create wireframes
- Generate code
- Design token suggestions

**Setup:**
```bash
export ANTHROPIC_API_KEY=your_api_key_here
```

**Usage:**
```typescript
import { AnthropicMCP } from './mcp/anthropic';

const claude = new AnthropicMCP();
const brand = await claude.generateBrand(userInput);
```

## Configuration

All MCP servers are configured in their respective `config.json` files. Environment variables should be set in `.env.local`:

```bash
# .env.local
PENPOT_ACCESS_TOKEN=your_penpot_token
CLOUDFLARE_API_TOKEN=your_cloudflare_token
CLOUDFLARE_ACCOUNT_ID=your_account_id
ANTHROPIC_API_KEY=your_anthropic_key
```

## Testing MCPs

Run the test script to verify all MCPs are working:

```bash
pnpm test:mcp
```

## Adding New MCPs

1. Create a new directory under `mcp/`
2. Add `config.json` with server configuration
3. Document capabilities in this README
4. Add environment variables to `.env.example`
5. Create usage examples

## Resources

- [MCP Specification](https://modelcontextprotocol.io)
- [Penpot API Docs](https://help.penpot.app/technical-guide/developer/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Claude API Docs](https://docs.anthropic.com/)
