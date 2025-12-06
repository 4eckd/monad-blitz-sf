# MACHUPS Coder + Modal.com Setup

This directory contains Coder configuration for hyper-speed MACHUPS development.

## 🎯 What This Does

Provisions development workspaces optimized for:
- **Modal.com** parallel processing (GPU-accelerated logo rendering)
- **Claude AI** integration
- **Isolated environments** for each builder/agent
- **Auto-configured** dependencies and secrets

## 🚀 Quick Start (30 minutes)

### 1. Install Coder

```bash
# Install Coder CLI
curl -fsSL https://coder.com/install.sh | sh

# Verify installation
coder version
```

### 2. Start Coder Server

**Option A: Local (for hackathon)**
```bash
# Using SQLite (simplest)
coder server --postgres-url="file://$HOME/.coder/database.db" \
  --access-url="http://localhost:7080"

# Server runs at http://localhost:7080
```

**Option B: Production (with PostgreSQL)**
```bash
# Setup PostgreSQL first
createdb coder

# Start server
coder server --postgres-url="postgres://localhost/coder?sslmode=disable" \
  --access-url="https://coder.yourdomain.com"
```

### 3. Create MACHUPS Template

```bash
cd /path/to/monad-blitz-sf

# Login to Coder
coder login http://localhost:7080

# Create template
coder templates create machups \
  --directory .coder \
  --variable modal_token_id="$(cat ~/.modal/token-id.txt)" \
  --variable modal_token_secret="$(cat ~/.modal/token-secret.txt)" \
  --variable claude_api_key="$CLAUDE_API_KEY" \
  --variable cloudflare_api_token="$CLOUDFLARE_API_TOKEN" \
  --variable cloudflare_account_id="$CLOUDFLARE_ACCOUNT_ID"
```

### 4. Create Workspaces

**For Claude AI Integration:**
```bash
coder create claude-ai \
  --template machups \
  --parameter branch=claude/claude-ai-integration-016s6daPN3GTf1C8DFmdhmU9 \
  --parameter task=claude-ai
```

**For Generator Modules:**
```bash
coder create generators \
  --template machups \
  --parameter branch=claude/generators-016s6daPN3GTf1C8DFmdhmU9 \
  --parameter task=generators
```

**For Modal.com Integration:**
```bash
coder create modal-integration \
  --template machups \
  --parameter branch=claude/modal-integration \
  --parameter task=modal \
  --parameter enable_gpu=true
```

### 5. Connect to Workspace

**Option A: VS Code**
```bash
# Install Coder VS Code extension
code --install-extension coder.coder-remote

# Configure SSH
coder config-ssh

# Open workspace
code --folder-uri vscode-remote://coder/claude-ai/workspace
```

**Option B: Browser**
```bash
# Open in browser
coder open claude-ai
```

**Option C: SSH**
```bash
# SSH directly
coder ssh claude-ai
```

## 📋 Workspace Parameters

When creating workspaces, you can customize:

| Parameter | Options | Default | Description |
|-----------|---------|---------|-------------|
| `branch` | Any git branch | `main` | Which branch to checkout |
| `task` | `claude-ai`, `generators`, `modal`, `testing`, `general` | `general` | Task assignment |
| `enable_gpu` | `true`, `false` | `false` | Enable GPU for Modal.com |

## 🔧 Template Variables

These are set once when creating the template:

| Variable | Required | Description |
|----------|----------|-------------|
| `modal_token_id` | ✅ Yes | Modal.com Token ID |
| `modal_token_secret` | ✅ Yes | Modal.com Token Secret |
| `claude_api_key` | ✅ Yes | Anthropic Claude API Key |
| `cloudflare_api_token` | ✅ Yes | Cloudflare API Token |
| `cloudflare_account_id` | ✅ Yes | Cloudflare Account ID |
| `cloudflare_zone_id` | ❌ No | Cloudflare Zone ID (optional) |
| `penpot_server_url` | ❌ No | Penpot MCP Server URL |
| `penpot_api_key` | ❌ No | Penpot API Key |
| `vercel_token` | ❌ No | Vercel API Token |
| `thirdweb_secret_key` | ❌ No | Thirdweb Secret Key |

## 🎯 Use Cases

### Solo Developer
```bash
# Create single workspace
coder create my-workspace --template machups

# Connect and code
coder ssh my-workspace
```

### Team Development (3-5 people)
```bash
# Create workspace per developer
for dev in alice bob charlie; do
  coder create ${dev}-workspace --template machups
done

# Each developer connects to their workspace
coder ssh alice-workspace  # Alice
coder ssh bob-workspace    # Bob
coder ssh charlie-workspace # Charlie
```

### AI Agent Orchestration (5+ parallel agents)
```bash
# Create workspace per agent
for agent in agent1 agent2 agent3 agent4 agent5; do
  coder create $agent \
    --template machups \
    --parameter task=generators \
    --parameter branch=claude/generators-016s6daPN3GTf1C8DFmdhmU9
done

# Agents work in parallel
# Monitor: coder list
```

## 📊 Workspace Management

### List all workspaces
```bash
coder list
```

### Stop workspace (save costs)
```bash
coder stop claude-ai
```

### Start workspace
```bash
coder start claude-ai
```

### Delete workspace
```bash
coder delete claude-ai
```

### Update template
```bash
# After modifying .coder/main.tf or .coder/Dockerfile
coder templates push machups --directory .coder
```

## 🔍 Troubleshooting

### Workspace won't start
```bash
# Check logs
coder logs claude-ai

# Rebuild from scratch
coder delete claude-ai
coder create claude-ai --template machups
```

### Missing environment variables
```bash
# Check workspace env
coder ssh claude-ai
env | grep CLAUDE_API_KEY

# Update template variables
coder templates push machups --directory .coder \
  --variable claude_api_key="$NEW_API_KEY"
```

### Port conflicts
```bash
# Coder auto-assigns ports based on workspace ID
# Check port mapping
coder port-forward claude-ai 3000:3000
```

## 🚀 Advanced: Modal.com Integration

### Deploy Modal functions from workspace
```bash
coder ssh claude-ai

# Inside workspace
cd /workspace
modal deploy lib/modal_functions/logo_generator.py

# Test
modal run lib/modal_functions/logo_generator.py
```

### GPU-enabled workspace
```bash
coder create gpu-workspace \
  --template machups \
  --parameter enable_gpu=true \
  --parameter task=modal

# Inside workspace, GPU is available
nvidia-smi  # Check GPU
```

## 📚 Files in This Directory

- `Dockerfile` - Development environment image
- `main.tf` - Terraform template for workspaces
- `setup.sh` - Workspace setup script
- `README.md` - This file

## 🎯 Next Steps

1. **Start Coder server** - See step 2 above
2. **Create template** - See step 3 above
3. **Provision workspaces** - See step 4 above
4. **Start coding!** 🚀

## 📞 Support

**Questions?**
- Coder Docs: https://coder.com/docs
- MACHUPS Docs: See root README.md
- Coordination: See COORDINATION_DASHBOARD.md

**Issues?**
- Check `coder logs <workspace-name>`
- Rebuild workspace
- Check template variables

---

**Ready to hyper-speed develop?** 🚀

Run: `coder templates create machups --directory .coder`
