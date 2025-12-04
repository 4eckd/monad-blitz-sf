# Cloudflare MCP Server Integration

Connect MachLabs to Cloudflare's suite of 16 remote MCP servers for enhanced development, security, and performance capabilities.

---

## 📋 Overview

Cloudflare provides **16 remote MCP servers** that enable AI assistants like Claude to interact with Cloudflare services through natural language. These servers are **hosted by Cloudflare** (no local installation needed) and authenticate via OAuth.

### Available MCP Servers

| Server | Purpose | Best For MachLabs |
|--------|---------|-------------------|
| **Workers Bindings** | Storage, AI, compute primitives | ⭐ AI model deployment |
| **Browser Rendering** | Web page screenshots, fetching | ⭐ UI testing, mockup generation |
| **Observability** | Logs, analytics debugging | ⭐ Performance monitoring |
| **Container** | Sandbox dev environments | ⭐ Testing isolation |
| **AI Gateway** | Prompt/response log searching | ⭐ AI generation analytics |
| **Documentation** | Cloudflare reference docs | Reference lookup |
| **Workers Builds** | Build insights, management | CI/CD optimization |
| **Radar** | Internet traffic insights | Analytics |
| **Logpush** | Job health summaries | Debugging |
| **AutoRAG** | Document search | Knowledge base |
| **Audit Logs** | Query logs, reports | Security compliance |
| **DNS Analytics** | Performance optimization | CDN performance |
| **DEX** | Digital experience monitoring | User experience |
| **CASB** | SaaS security | Security scanning |
| **GraphQL** | Analytics data retrieval | Custom dashboards |

---

## 🚀 Quick Start

### 1. Prerequisites

- **Cloudflare Account** - Free or paid plan
- **Claude Desktop** or **Cloudflare AI Playground**
- **API Token** - Create at: https://dash.cloudflare.com/profile/api-tokens

### 2. Generate API Token

1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click **"Create Token"**
3. Use template: **"Edit Cloudflare Workers"** (or create custom)
4. Set permissions based on MCP servers you'll use:
   - Workers Scripts: Read/Edit (for Workers Bindings, Builds)
   - Account Settings: Read (for most servers)
   - Logs: Read (for Observability, Logpush)
   - Analytics: Read (for Radar, DNS Analytics)
5. Copy token (save securely)

### 3. Connect to Claude Desktop

#### Option A: Via Cloudflare AI Playground (Easiest)

1. Go to: https://ai-playground.cloudflare.com/
2. Click **"Connect MCP Server"**
3. Select desired Cloudflare MCP servers
4. Authorize via OAuth
5. Done! Test with: "List my Cloudflare Workers"

#### Option B: Via Claude Desktop (Direct)

**Windows:** Edit `%APPDATA%\Claude\claude_desktop_config.json`

**Mac/Linux:** Edit `~/.config/claude/claude_desktop_config.json`

Add configuration:

```json
{
  "mcpServers": {
    "cloudflare-workers": {
      "command": "npx",
      "args": [
        "-y",
        "@cloudflare/mcp-server-cloudflare",
        "workers-bindings"
      ],
      "env": {
        "CLOUDFLARE_API_TOKEN": "${CLOUDFLARE_API_TOKEN}",
        "CLOUDFLARE_ACCOUNT_ID": "${CLOUDFLARE_ACCOUNT_ID}"
      }
    },
    "cloudflare-browser": {
      "command": "npx",
      "args": [
        "-y",
        "@cloudflare/mcp-server-cloudflare",
        "browser"
      ],
      "env": {
        "CLOUDFLARE_API_TOKEN": "${CLOUDFLARE_API_TOKEN}",
        "CLOUDFLARE_ACCOUNT_ID": "${CLOUDFLARE_ACCOUNT_ID}"
      }
    },
    "cloudflare-observability": {
      "command": "npx",
      "args": [
        "-y",
        "@cloudflare/mcp-server-cloudflare",
        "observability"
      ],
      "env": {
        "CLOUDFLARE_API_TOKEN": "${CLOUDFLARE_API_TOKEN}",
        "CLOUDFLARE_ACCOUNT_ID": "${CLOUDFLARE_ACCOUNT_ID}"
      }
    }
  }
}
```

**Set environment variables:**

```bash
# Windows
setx CLOUDFLARE_API_TOKEN "your-token-here"
setx CLOUDFLARE_ACCOUNT_ID "your-account-id"

# Mac/Linux
export CLOUDFLARE_API_TOKEN="your-token-here"
export CLOUDFLARE_ACCOUNT_ID="your-account-id"
```

**Find your Account ID:**
https://dash.cloudflare.com/ → Select account → Copy Account ID from sidebar

---

## 🎯 MachLabs Use Cases

### 1. AI Model Deployment (Workers Bindings)

**Use Case:** Deploy AI generation models to edge locations

```
# In Claude Code
Deploy my UI generation model to Cloudflare Workers
List all my Workers KV namespaces
Create a new D1 database for design tokens
```

**Benefits:**
- Global edge deployment
- Low latency AI generation
- Access to Workers AI

### 2. UI Testing & Screenshots (Browser Rendering)

**Use Case:** Automated screenshot generation for generated components

```
# In Claude Code
Take a screenshot of the generated button component
Fetch the rendered HTML from my staging URL
Generate mockups for all UI variations
```

**Benefits:**
- Visual regression testing
- Automated mockup generation
- Cross-browser testing

### 3. Performance Monitoring (Observability)

**Use Case:** Track AI generation performance and errors

```
# In Claude Code
Show me the logs for the UI generator Worker
What errors occurred in the last hour?
Analyze response times for component generation
```

**Benefits:**
- Real-time debugging
- Performance optimization
- Error tracking

### 4. Sandbox Testing (Container)

**Use Case:** Isolated testing environments for generated code

```
# In Claude Code
Create a sandbox container for testing the generated component
Deploy the React component to a test environment
Spin up an isolated environment for contract testing
```

**Benefits:**
- Safe testing
- Rapid prototyping
- Disposable environments

### 5. AI Analytics (AI Gateway)

**Use Case:** Track prompt performance and token usage

```
# In Claude Code
How many tokens did we use for UI generation today?
Show me the most common prompts this week
Which generation requests failed?
```

**Benefits:**
- Cost optimization
- Prompt engineering insights
- Usage analytics

---

## 🔧 Configuration for MachLabs

### Recommended MCP Servers

**Priority 1 (Essential):**
1. **Workers Bindings** - Deploy AI models to edge
2. **Browser Rendering** - Screenshot generation, UI testing
3. **Observability** - Performance monitoring

**Priority 2 (Highly Useful):**
4. **Container** - Sandbox testing environments
5. **AI Gateway** - AI usage analytics

**Priority 3 (Optional):**
6. **Documentation** - Cloudflare reference
7. **Workers Builds** - Build optimization
8. **Radar** - Internet insights

### Complete Claude Config

```json
{
  "mcpServers": {
    "cloudflare-workers": {
      "command": "npx",
      "args": ["-y", "@cloudflare/mcp-server-cloudflare", "workers-bindings"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "${CLOUDFLARE_API_TOKEN}",
        "CLOUDFLARE_ACCOUNT_ID": "${CLOUDFLARE_ACCOUNT_ID}"
      }
    },
    "cloudflare-browser": {
      "command": "npx",
      "args": ["-y", "@cloudflare/mcp-server-cloudflare", "browser"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "${CLOUDFLARE_API_TOKEN}",
        "CLOUDFLARE_ACCOUNT_ID": "${CLOUDFLARE_ACCOUNT_ID}"
      }
    },
    "cloudflare-observability": {
      "command": "npx",
      "args": ["-y", "@cloudflare/mcp-server-cloudflare", "observability"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "${CLOUDFLARE_API_TOKEN}",
        "CLOUDFLARE_ACCOUNT_ID": "${CLOUDFLARE_ACCOUNT_ID}"
      }
    },
    "cloudflare-container": {
      "command": "npx",
      "args": ["-y", "@cloudflare/mcp-server-cloudflare", "container"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "${CLOUDFLARE_API_TOKEN}",
        "CLOUDFLARE_ACCOUNT_ID": "${CLOUDFLARE_ACCOUNT_ID}"
      }
    },
    "cloudflare-ai-gateway": {
      "command": "npx",
      "args": ["-y", "@cloudflare/mcp-server-cloudflare", "ai-gateway"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "${CLOUDFLARE_API_TOKEN}",
        "CLOUDFLARE_ACCOUNT_ID": "${CLOUDFLARE_ACCOUNT_ID}"
      }
    }
  }
}
```

---

## 📖 Example Commands

### Workers Bindings

```
List all my Workers scripts
Show details for the 'ui-generator' Worker
Create a new KV namespace called 'design-tokens'
Read value from KV namespace 'brand-configs' with key 'primary-colors'
Deploy a Worker script for component generation
```

### Browser Rendering

```
Take a screenshot of https://machlabs.com
Fetch the HTML from my staging environment
Generate a PDF of the generated component
Take screenshots at mobile, tablet, and desktop sizes
```

### Observability

```
Show logs for Worker 'ui-generator' in the last hour
What errors occurred in the payment Worker?
Analyze response times for the API
Show me the top 10 slowest requests
```

### Container

```
Create a new development container
Deploy my code to a sandbox environment
List all running containers
Stop the test container
```

### AI Gateway

```
Show AI usage for the last 7 days
What's the average token count per request?
List all prompts that failed
Show the most expensive AI operations
```

---

## 🔐 Security Best Practices

### API Token Scopes

Create **separate tokens** for different environments:

**Production Token:**
- Workers Scripts: Read only
- Logs: Read only
- Analytics: Read only

**Development Token:**
- Workers Scripts: Read/Edit
- KV: Read/Write
- D1: Read/Write

**Testing Token:**
- Container: Read/Write
- Workers Scripts: Read only

### Environment Variables

**Never commit tokens to git:**

```bash
# Add to .gitignore
.env
.env.*
*_TOKEN
```

**Use environment variables:**

```bash
# .env.example (safe to commit)
CLOUDFLARE_API_TOKEN=your-token-here
CLOUDFLARE_ACCOUNT_ID=your-account-id

# .env (never commit)
CLOUDFLARE_API_TOKEN=actual-secret-token
CLOUDFLARE_ACCOUNT_ID=abc123def456
```

### Rotate Tokens

- Rotate tokens every 90 days
- Revoke immediately if compromised
- Use different tokens per developer

---

## 🚀 Advanced Integration

### Deploy AI Models to Workers

```javascript
// wrangler.toml
name = "ui-generator"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[ai]
binding = "AI"

[[kv_namespaces]]
binding = "DESIGN_TOKENS"
id = "your-namespace-id"
```

```typescript
// src/index.ts
export default {
  async fetch(request: Request, env: Env) {
    const { AI, DESIGN_TOKENS } = env;

    // Generate UI component using Workers AI
    const response = await AI.run('@cf/meta/llama-2-7b-chat-int8', {
      prompt: "Generate a React button component"
    });

    // Store in KV
    await DESIGN_TOKENS.put('button-component', JSON.stringify(response));

    return new Response(JSON.stringify(response));
  }
};
```

### Browser Rendering for Testing

```typescript
// Visual regression testing
async function captureScreenshot(url: string) {
  const screenshot = await env.BROWSER.fetch(url, {
    cf: {
      screenshot: true,
      viewport: { width: 1920, height: 1080 }
    }
  });

  return screenshot;
}
```

### Observability Integration

```typescript
// Add structured logging
console.log(JSON.stringify({
  timestamp: new Date().toISOString(),
  event: 'component_generated',
  prompt: promptText,
  tokens: tokenCount,
  duration_ms: duration
}));
```

---

## 🐛 Troubleshooting

### "Authentication Failed"

**Problem:** API token invalid or expired

**Solution:**
1. Verify token at: https://dash.cloudflare.com/profile/api-tokens
2. Check token has correct permissions
3. Ensure environment variables are set correctly

### "Account ID Not Found"

**Problem:** CLOUDFLARE_ACCOUNT_ID not set

**Solution:**
1. Go to: https://dash.cloudflare.com/
2. Select your account
3. Copy Account ID from sidebar
4. Set environment variable

### "Rate Limited"

**Problem:** Too many API requests

**Solution:**
- Reduce request frequency
- Upgrade to paid Cloudflare plan
- Implement caching

### "Context Length Exceeded"

**Problem:** Response too large for Claude

**Solution:**
- Break requests into smaller queries
- Request specific data only
- Use pagination if available

---

## 📊 Pricing Considerations

### Free Tier Limits

- **Workers:** 100,000 requests/day
- **KV:** 100,000 reads/day, 1,000 writes/day
- **D1:** 5 million rows read/day
- **Browser Rendering:** Limited requests

### Paid Plans

- **Workers Paid:** $5/month + usage
- **Workers Unbound:** Usage-based pricing
- **Enterprise:** Custom pricing

**Recommendation for MachLabs:**
Start with free tier, upgrade when hitting limits.

---

## 🎯 Next Steps

1. **Create Cloudflare Account** (if not already)
2. **Generate API Token** with appropriate scopes
3. **Configure Claude Desktop** with MCP servers
4. **Test Connection** with simple commands
5. **Deploy First Worker** for AI generation
6. **Set Up Monitoring** with Observability

---

## 📚 Resources

### Official Documentation
- [Cloudflare MCP Announcement](https://blog.cloudflare.com/remote-model-context-protocol-servers-mcp/)
- [13 New MCP Servers](https://blog.cloudflare.com/thirteen-new-mcp-servers-from-cloudflare/)
- [MCP Developer Docs](https://developers.cloudflare.com/agents/model-context-protocol/)
- [GitHub Repository](https://github.com/cloudflare/mcp-server-cloudflare)

### Guides
- [Build MCP on Workers](https://blog.cloudflare.com/model-context-protocol/)
- [Python Support for MCP](https://blog.cloudflare.com/streamable-http-mcp-servers-python/)
- [What is MCP?](https://www.cloudflare.com/learning/ai/what-is-model-context-protocol-mcp/)

### Cloudflare Services
- [Workers Documentation](https://developers.cloudflare.com/workers/)
- [Workers AI](https://developers.cloudflare.com/workers-ai/)
- [KV Storage](https://developers.cloudflare.com/kv/)
- [D1 Database](https://developers.cloudflare.com/d1/)

---

**Last Updated:** 2025-11-30
**MCP Servers:** 16 available
**Repository:** [cloudflare/mcp-server-cloudflare](https://github.com/cloudflare/mcp-server-cloudflare)
**Stars:** 3.2k+
**License:** Apache-2.0
