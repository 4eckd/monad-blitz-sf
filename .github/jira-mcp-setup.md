# Jira MCP Integration Setup

Complete setup guide for integrating Jira with Claude Code via MCP.

---

## Option 1: mcp-atlassian (Official, Recommended)

### Installation

```bash
# Install via pip
pip install mcp-atlassian
```

### Configuration

1. **Create Jira API Token:**
   - Go to: https://id.atlassian.com/manage-profile/security/api-tokens
   - Click "Create API token"
   - Name it: "MCP Claude Integration"
   - Copy the token (save it securely)

2. **Get Your Jira Details:**
   - Jira URL: `https://YOUR-DOMAIN.atlassian.net`
   - Email: Your Atlassian account email
   - API Token: From step 1

3. **Configure Claude Code:**

Edit your Claude Code config file:

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
**Mac/Linux:** `~/.config/claude/claude_desktop_config.json`

Add this configuration:

```json
{
  "mcpServers": {
    "jira": {
      "command": "python",
      "args": [
        "-m",
        "mcp_atlassian",
        "--jira-url",
        "https://YOUR-DOMAIN.atlassian.net",
        "--jira-email",
        "your-email@example.com",
        "--jira-token",
        "YOUR_API_TOKEN_HERE"
      ]
    }
  }
}
```

**Security Note:** For production, use environment variables:

```json
{
  "mcpServers": {
    "jira": {
      "command": "python",
      "args": [
        "-m",
        "mcp_atlassian"
      ],
      "env": {
        "JIRA_URL": "https://YOUR-DOMAIN.atlassian.net",
        "JIRA_EMAIL": "your-email@example.com",
        "JIRA_API_TOKEN": "${JIRA_API_TOKEN}"
      }
    }
  }
}
```

Then set environment variable:
```bash
# Windows
setx JIRA_API_TOKEN "your-token-here"

# Mac/Linux
export JIRA_API_TOKEN="your-token-here"
```

4. **Restart Claude Code**

5. **Test Integration:**

In Claude Code, try:
```
List my recent Jira issues
Create a Jira issue for implementing AI generation testing
```

---

## Option 2: cosmix/jira-mcp (Advanced)

Best if you need both Cloud and Server/Data Center support.

### Installation

```bash
npm install -g @cosmix/jira-mcp
```

### Configuration

```json
{
  "mcpServers": {
    "jira": {
      "command": "npx",
      "args": [
        "-y",
        "@cosmix/jira-mcp"
      ],
      "env": {
        "JIRA_HOST": "https://YOUR-DOMAIN.atlassian.net",
        "JIRA_EMAIL": "your-email@example.com",
        "JIRA_API_TOKEN": "${JIRA_API_TOKEN}",
        "JIRA_PROJECT_KEY": "MACH"
      }
    }
  }
}
```

### Features
- Relationship tracking (links between issues)
- Optimized data payloads for AI context
- Works with self-hosted Jira
- Advanced filtering

---

## Option 3: OrenGrinker/jira-mcp-server (Production-Ready)

Most comprehensive for production use.

### Installation

```bash
npm install -g jira-mcp-server
```

### Configuration

```json
{
  "mcpServers": {
    "jira": {
      "command": "jira-mcp-server",
      "env": {
        "JIRA_URL": "https://YOUR-DOMAIN.atlassian.net",
        "JIRA_USER_EMAIL": "your-email@example.com",
        "JIRA_API_TOKEN": "${JIRA_API_TOKEN}",
        "JIRA_DEFAULT_PROJECT": "MACH"
      }
    }
  }
}
```

### Features
- Advanced error handling
- Rate limiting
- Request retries
- Comprehensive logging
- Production-grade reliability

---

## Jira Project Setup for MachLabs

### 1. Create Project

**Project Name:** MachLabs
**Project Key:** MACH
**Project Type:** Kanban

### 2. Configure Board Columns

```
Backlog → To Do → In Progress → Blocked → Review → Testing → Done
```

### 3. Create Issue Types

Standard Types:
- ✅ Task
- ✅ Story (for features)
- ✅ Bug
- ✅ Epic (for major initiatives)

Custom Types (optional):
- AI Generation Issue
- Web3 Security Issue
- Contract Audit

### 4. Configure Workflows

**Kanban Workflow:**
```
TO DO → IN PROGRESS → BLOCKED → REVIEW → TESTING → DONE
         ↓                         ↓         ↓
         └─────────────────────────┴─────────┘
                 (Can move back)
```

### 5. Set Up Custom Fields

Create these custom fields:

| Field Name | Type | Values |
|------------|------|--------|
| **Effort** | Select | XS, S, M, L, XL, XXL |
| **Area** | Select | UI Generation, Brand Factory, Contracts, etc. |
| **AI Model** | Select | Claude Sonnet, GPT-4, etc. |
| **Contract Type** | Select | Payment, NFT, Governance |
| **WCAG Level** | Select | AA, AAA |

### 6. Create Filters (Saved Searches)

**Critical Items:**
```jql
priority = Highest AND status != Done
```

**AI Generation Work:**
```jql
labels = "ai-generation" AND status != Done
```

**Blocked Issues:**
```jql
status = Blocked
```

**My Current Work:**
```jql
assignee = currentUser() AND status = "In Progress"
```

**Ready for Review:**
```jql
status = Review ORDER BY created ASC
```

### 7. Automation Rules

**Auto-assign based on area:**
```yaml
Trigger: Issue Created
Condition: Area = "Smart Contracts"
Action: Assign to @solidity-team
```

**Alert on blocked:**
```yaml
Trigger: Issue Transitioned to Blocked
Action: Send notification to #dev-team Slack
```

**Stale issue reminder:**
```yaml
Trigger: Scheduled (daily)
Condition: Status = "In Progress" AND Updated > 7d ago
Action: Add comment "This issue hasn't been updated in 7 days"
```

---

## MCP Available Commands

Once configured, you can use Claude Code to:

### Issue Management
```
Create a Jira issue for [task]
List all bugs in MACH project
Search for issues labeled "ai-generation"
Update issue MACH-123 to "In Progress"
Add comment to MACH-456: "Testing complete"
```

### Sprint/Kanban Management
```
Show current sprint status
Get team workload
List blocked issues
Move MACH-789 to "Review" column
```

### Reporting
```
Generate standup report for today
Show velocity for last 4 weeks
List all issues I'm assigned to
Show issues due this week
```

### Advanced Queries (JQL)
```
Search Jira: priority = High AND assignee = currentUser()
Find issues: project = MACH AND created >= -7d
```

---

## GitHub ↔ Jira Integration

Link GitHub commits and PRs to Jira issues.

### 1. Install Jira GitHub App

https://github.com/apps/jira-software-github

### 2. Connect Repository

1. In Jira: Settings → Apps → GitHub
2. Click "Add GitHub organization"
3. Select `machlabs/machlab` repository

### 3. Use Smart Commits

In your commit messages:
```bash
git commit -m "MACH-123 Add color contrast checker

Implements WCAG AA validation for generated components.

#done #comment Testing complete"
```

This will:
- Link commit to issue MACH-123
- Add comment "Testing complete"
- Transition issue to Done

### 4. PR Auto-Linking

In PR titles/descriptions:
```markdown
[MACH-456] Implement x402 payment integration

Closes MACH-456
Relates to MACH-123, MACH-234
```

---

## Integration with Existing DevOps

### Link Labels to Jira

Map GitHub labels to Jira fields:

| GitHub Label | Jira Field | Jira Value |
|--------------|------------|------------|
| `type: feature` | Issue Type | Story |
| `type: bug` | Issue Type | Bug |
| `priority: critical` | Priority | Highest |
| `priority: high` | Priority | High |
| `area: contracts` | Component | Smart Contracts |
| `effort: xl` | Story Points | 13 |

### GitHub Actions → Jira Updates

Add to your CI workflow:

```yaml
# .github/workflows/update-jira.yml
name: Update Jira on PR

on:
  pull_request:
    types: [opened, closed]

jobs:
  update-jira:
    runs-on: ubuntu-latest
    steps:
      - name: Extract Jira Issue Key
        id: jira
        run: |
          ISSUE_KEY=$(echo "${{ github.event.pull_request.title }}" | grep -oP 'MACH-\d+' || echo "")
          echo "key=$ISSUE_KEY" >> $GITHUB_OUTPUT

      - name: Transition to Review
        if: steps.jira.outputs.key != ''
        uses: atlassian/gajira-transition@v3
        with:
          issue: ${{ steps.jira.outputs.key }}
          transition: "Review"
        env:
          JIRA_BASE_URL: ${{ secrets.JIRA_BASE_URL }}
          JIRA_USER_EMAIL: ${{ secrets.JIRA_USER_EMAIL }}
          JIRA_API_TOKEN: ${{ secrets.JIRA_API_TOKEN }}

      - name: Add Comment
        if: steps.jira.outputs.key != ''
        uses: atlassian/gajira-comment@v3
        with:
          issue: ${{ steps.jira.outputs.key }}
          comment: |
            PR created: ${{ github.event.pull_request.html_url }}
            Status: Ready for review
```

---

## Best Practices

### Issue Naming Convention
```
[Area] Short description

Examples:
MACH-1: [UI Gen] Implement prompt-to-component engine
MACH-2: [Contracts] Add x402 payment validation
MACH-3: [Brand] Update questionnaire flow
```

### Use Epics for Major Features
```
Epic: AI Generation System (MACH-100)
  ├─ Story: Prompt parser (MACH-101)
  ├─ Story: Token validator (MACH-102)
  ├─ Story: Component generator (MACH-103)
  └─ Bug: Fix color token mapping (MACH-104)
```

### Label Hierarchy
```
Primary: type:feature
Secondary: area:ui-generation
Tertiary: ai:generation-quality
```

### Time Tracking
Enable time tracking to monitor:
- AI generation optimization efforts
- Contract audit time
- Testing time vs implementation time

---

## Troubleshooting

### MCP Server Not Connecting
```bash
# Check if server is running
ps aux | grep mcp

# Check logs
tail -f ~/.config/claude/logs/mcp-server.log

# Restart Claude Code
```

### API Token Issues
```bash
# Test token manually
curl -u your-email@example.com:YOUR_TOKEN \
  https://YOUR-DOMAIN.atlassian.net/rest/api/3/myself
```

### Rate Limiting
Jira Cloud: 10 requests/second per user
Solution: Use batch operations in MCP

---

## Security Checklist

- [ ] API token stored in environment variables (not config file)
- [ ] Token has minimum required permissions
- [ ] 2FA enabled on Atlassian account
- [ ] API token rotated every 90 days
- [ ] Access logs monitored
- [ ] IP allowlist configured (if possible)

---

## Resources

### Official Documentation
- [Atlassian MCP Server](https://www.atlassian.com/blog/announcements/remote-mcp-server)
- [Jira REST API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/)
- [MCP Protocol Spec](https://model-context-protocol.com/)

### MCP Servers
- [mcp-atlassian (PyPI)](https://pypi.org/project/mcp-atlassian/)
- [cosmix/jira-mcp](https://github.com/cosmix/jira-mcp)
- [OrenGrinker/jira-mcp-server](https://github.com/OrenGrinker/jira-mcp-server)
- [Warzuponus/mcp-jira](https://github.com/Warzuponus/mcp-jira)

### Guides
- [Jira MCP Server Setup Guide](https://apidog.com/blog/jira-mcp-server/)
- [Building AI-Powered Jira Integration](https://medium.com/@reddyfull/building-ai-powered-jira-integration-with-mcp-streamlining-project-management-through-natural-c172cd831065)

---

**Last Updated:** 2025-11-30
**Project:** MachLabs
**Integration:** Jira Cloud + Claude Code MCP
