#!/bin/bash
# MachLabs Project Management Setup
# Sets up Jira integration, GitHub labels, and project management tools

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  MachLabs Project Management Setup${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo

# Get repository root
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
cd "$REPO_ROOT"

# Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"

# Check for GitHub CLI
if ! command -v gh &> /dev/null; then
    echo -e "${RED}✗${NC} GitHub CLI (gh) not found"
    echo -e "${YELLOW}Install from: https://cli.github.com/${NC}"
    echo
    read -p "Continue without GitHub CLI? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
    SKIP_GITHUB=true
else
    echo -e "${GREEN}✓${NC} GitHub CLI found"
    SKIP_GITHUB=false
fi

# Check for Node.js (for MCP server)
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠${NC} Node.js not found (optional for Jira MCP)"
    SKIP_MCP=true
else
    echo -e "${GREEN}✓${NC} Node.js found"
    SKIP_MCP=false
fi

# Check for Python (for mcp-atlassian)
if ! command -v python &> /dev/null && ! command -v python3 &> /dev/null; then
    echo -e "${YELLOW}⚠${NC} Python not found (optional for Jira MCP)"
    PYTHON_CMD=""
else
    if command -v python3 &> /dev/null; then
        PYTHON_CMD="python3"
    else
        PYTHON_CMD="python"
    fi
    echo -e "${GREEN}✓${NC} Python found: $PYTHON_CMD"
fi

echo

# Step 1: GitHub Labels
echo -e "${BLUE}Step 1: GitHub Labels Setup${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$SKIP_GITHUB" = false ]; then
    read -p "Sync GitHub labels? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}Syncing labels...${NC}"
        if [ -f ".github/scripts/sync-labels.sh" ]; then
            chmod +x .github/scripts/sync-labels.sh
            ./.github/scripts/sync-labels.sh
        else
            echo -e "${YELLOW}⚠ sync-labels.sh not found, skipping${NC}"
        fi
    fi
else
    echo -e "${YELLOW}Skipping GitHub labels (gh CLI not available)${NC}"
fi

echo

# Step 2: Jira Setup
echo -e "${BLUE}Step 2: Jira Configuration${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

read -p "Do you have a Jira account set up? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo
    echo -e "${BLUE}Please provide your Jira details:${NC}"
    echo

    read -p "Jira domain (e.g., your-domain.atlassian.net): " JIRA_DOMAIN
    read -p "Your Atlassian email: " JIRA_EMAIL
    read -s -p "Jira API token (will be hidden): " JIRA_TOKEN
    echo
    echo

    # Validate inputs
    if [ -z "$JIRA_DOMAIN" ] || [ -z "$JIRA_EMAIL" ] || [ -z "$JIRA_TOKEN" ]; then
        echo -e "${RED}✗ Missing required Jira configuration${NC}"
    else
        JIRA_URL="https://$JIRA_DOMAIN"

        echo -e "${GREEN}✓${NC} Jira configuration collected"
        echo
        echo -e "${YELLOW}To complete GitHub integration, add these secrets to your repository:${NC}"
        echo
        echo "  JIRA_BASE_URL=$JIRA_URL"
        echo "  JIRA_USER_EMAIL=$JIRA_EMAIL"
        echo "  JIRA_API_TOKEN=<your-token>"
        echo
        echo "Add secrets at: https://github.com/$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo 'YOUR_REPO')/settings/secrets/actions"
        echo

        # Offer to set environment variables
        read -p "Set environment variables for MCP integration? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo "export JIRA_URL=\"$JIRA_URL\"" >> ~/.bashrc
            echo "export JIRA_EMAIL=\"$JIRA_EMAIL\"" >> ~/.bashrc
            echo "export JIRA_API_TOKEN=\"$JIRA_TOKEN\"" >> ~/.bashrc

            if [ -f ~/.zshrc ]; then
                echo "export JIRA_URL=\"$JIRA_URL\"" >> ~/.zshrc
                echo "export JIRA_EMAIL=\"$JIRA_EMAIL\"" >> ~/.zshrc
                echo "export JIRA_API_TOKEN=\"$JIRA_TOKEN\"" >> ~/.zshrc
            fi

            echo -e "${GREEN}✓${NC} Environment variables added to shell config"
            echo -e "${YELLOW}Note: Restart your terminal or run 'source ~/.bashrc'${NC}"
        fi
    fi
else
    echo
    echo -e "${YELLOW}Jira setup skipped. You can configure it later using:${NC}"
    echo "  .github/jira-mcp-setup.md"
fi

echo

# Step 3: MCP Server Installation
echo -e "${BLUE}Step 3: Jira MCP Server Installation${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -n "$PYTHON_CMD" ]; then
    read -p "Install mcp-atlassian (Python MCP server)? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}Installing mcp-atlassian...${NC}"
        $PYTHON_CMD -m pip install mcp-atlassian
        echo -e "${GREEN}✓${NC} mcp-atlassian installed"
        echo
        echo -e "${YELLOW}Next steps:${NC}"
        echo "1. Configure Claude Code with your Jira credentials"
        echo "2. See: .github/jira-mcp-setup.md for configuration"
        echo
    fi
else
    echo -e "${YELLOW}Python not available, skipping MCP server installation${NC}"
    echo "You can install manually later with:"
    echo "  pip install mcp-atlassian"
fi

echo

# Step 4: Claude Code Configuration
echo -e "${BLUE}Step 4: Claude Code Configuration${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Detect OS
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    CLAUDE_CONFIG="$APPDATA/Claude/claude_desktop_config.json"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    CLAUDE_CONFIG="$HOME/Library/Application Support/Claude/claude_desktop_config.json"
else
    CLAUDE_CONFIG="$HOME/.config/claude/claude_desktop_config.json"
fi

if [ -f "$CLAUDE_CONFIG" ]; then
    echo -e "${GREEN}✓${NC} Found Claude Code config: $CLAUDE_CONFIG"
    echo
    read -p "Generate MCP configuration snippet? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cat > mcp-config-snippet.json << EOF
{
  "mcpServers": {
    "jira": {
      "command": "$PYTHON_CMD",
      "args": [
        "-m",
        "mcp_atlassian"
      ],
      "env": {
        "JIRA_URL": "\${JIRA_URL}",
        "JIRA_EMAIL": "\${JIRA_EMAIL}",
        "JIRA_API_TOKEN": "\${JIRA_API_TOKEN}"
      }
    }
  }
}
EOF
        echo -e "${GREEN}✓${NC} Configuration snippet saved to: mcp-config-snippet.json"
        echo
        echo -e "${YELLOW}Add this to your Claude Code config file:${NC}"
        echo "  $CLAUDE_CONFIG"
        echo
    fi
else
    echo -e "${YELLOW}⚠${NC} Claude Code config not found"
    echo "Install Claude Code from: https://claude.ai/download"
fi

echo

# Step 5: Create Initial Jira Issues (Optional)
echo -e "${BLUE}Step 5: Create Initial Jira Issues${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

read -p "Create starter issues in Jira? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo
    echo -e "${BLUE}Starter issues to create:${NC}"
    cat << 'EOF'

1. [Setup] Initialize Next.js project
2. [Setup] Configure TypeScript and ESLint
3. [Setup] Set up Tailwind CSS
4. [DevOps] Configure CI/CD pipelines
5. [DevOps] Set up Docker containerization
6. [Testing] Implement test infrastructure
7. [AI] Design prompt-to-component architecture
8. [Web3] Research x402 payment integration
9. [Brand] Implement branding questionnaire
10. [Docs] Update README with setup instructions

EOF
    echo -e "${YELLOW}These can be created via Claude Code MCP once configured${NC}"
    echo "Example: 'Create Jira issues for the 10 starter tasks above'"
    echo
fi

echo

# Step 6: Verify Setup
echo -e "${BLUE}Step 6: Verification${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo -e "${BLUE}Checking setup status...${NC}"
echo

ISSUES=0

# Check GitHub labels
if [ "$SKIP_GITHUB" = false ]; then
    if gh label list &> /dev/null; then
        LABEL_COUNT=$(gh label list --json name | grep -c "type:" || echo 0)
        if [ "$LABEL_COUNT" -gt 0 ]; then
            echo -e "${GREEN}✓${NC} GitHub labels configured ($LABEL_COUNT type labels)"
        else
            echo -e "${YELLOW}⚠${NC} GitHub labels not fully configured"
            ((ISSUES++))
        fi
    else
        echo -e "${YELLOW}⚠${NC} Cannot verify GitHub labels"
        ((ISSUES++))
    fi
else
    echo -e "${YELLOW}⚠${NC} GitHub CLI not available (skipped)"
fi

# Check Jira environment variables
if [ -n "$JIRA_URL" ] && [ -n "$JIRA_EMAIL" ] && [ -n "$JIRA_TOKEN" ]; then
    echo -e "${GREEN}✓${NC} Jira credentials configured (session only)"
else
    echo -e "${YELLOW}⚠${NC} Jira credentials not configured"
    ((ISSUES++))
fi

# Check MCP server
if [ "$SKIP_MCP" = false ]; then
    if $PYTHON_CMD -c "import mcp_atlassian" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} MCP Atlassian server installed"
    else
        echo -e "${YELLOW}⚠${NC} MCP Atlassian server not installed"
        ((ISSUES++))
    fi
else
    echo -e "${YELLOW}⚠${NC} Python/Node.js not available (MCP skipped)"
fi

# Check documentation
if [ -f ".github/jira-mcp-setup.md" ] && [ -f ".github/KANBAN_SETUP_GUIDE.md" ]; then
    echo -e "${GREEN}✓${NC} Documentation files present"
else
    echo -e "${YELLOW}⚠${NC} Some documentation files missing"
    ((ISSUES++))
fi

echo

# Summary
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Setup Summary${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo

if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}✓ Setup complete with no issues!${NC}"
else
    echo -e "${YELLOW}⚠ Setup complete with $ISSUES warning(s)${NC}"
    echo -e "${YELLOW}Review the warnings above and complete manual steps as needed${NC}"
fi

echo
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Review: .github/jira-mcp-setup.md"
echo "2. Review: .github/KANBAN_SETUP_GUIDE.md"
echo "3. Configure GitHub Secrets for Jira integration"
echo "4. Test MCP integration in Claude Code"
echo "5. Create your first Jira issue!"
echo

echo -e "${BLUE}Useful Resources:${NC}"
echo "- Tag Usage Guide: .github/TAG_USAGE_GUIDE.md"
echo "- Label Quick Reference: .github/LABEL_QUICK_REFERENCE.md"
echo "- Jira MCP Setup: .github/jira-mcp-setup.md"
echo "- Kanban Guide: .github/KANBAN_SETUP_GUIDE.md"
echo

echo -e "${GREEN}Setup script completed!${NC}"
echo