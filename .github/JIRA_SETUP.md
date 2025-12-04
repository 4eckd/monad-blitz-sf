# Jira Integration Setup Guide

## Overview

This guide will help you set up Jira integration with GitHub for automated issue tracking and synchronization.

## Prerequisites

- Jira account with API access
- GitHub repository admin access
- Jira project created (recommended: project key `MACH`)

## Step 1: Get Jira API Token

1. Go to: https://id.atlassian.com/manage-profile/security/api-tokens
2. Click **Create API token**
3. Give it a name: `GitHub Actions - MachLabs`
4. Copy the token (you won't see it again!)

## Step 2: Get Your Jira Information

You'll need:
- **JIRA_BASE_URL**: Your Jira instance URL (e.g., `https://yourcompany.atlassian.net`)
- **JIRA_USER_EMAIL**: Your Jira account email
- **JIRA_API_TOKEN**: The token you created in Step 1
- **JIRA_PROJECT_KEY**: Your project key (e.g., `MACH`)

## Step 3: Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these three secrets:

   | Name | Value | Example |
   |------|-------|---------|
   | `JIRA_BASE_URL` | Your Jira URL | `https://yourcompany.atlassian.net` |
   | `JIRA_USER_EMAIL` | Your email | `you@example.com` |
   | `JIRA_API_TOKEN` | API token | `ATB...xyz` |

## Step 4: Create Jira Integration Workflow

The Jira integration workflow has been removed from this project. If you want to re-enable it, you can:

1. Use the Jira MCP server for Claude Code (see `.claude/mcp-config-cloudflare.json`)
2. Manually link GitHub PRs to Jira issues using the format: `[MACH-123] Your PR title`
3. Create a custom workflow using the [Atlassian Jira Actions](https://github.com/marketplace?query=jira+atlassian)

## Step 5: Link PRs to Jira Issues

To link a GitHub PR to a Jira issue:

1. Include the Jira issue key in your PR title or description
2. Format: `[MACH-123] Add new feature`
3. The issue key should match your Jira project

## Alternative: Use Jira MCP with Claude Code

We've set up the Jira MCP server configuration. To use it:

1. Install the Jira MCP server:
   ```bash
   npm install -g @orenginker/jira-mcp-server
   ```

2. Configure Claude Code with your Jira credentials (see `.github/jira-mcp-setup.md`)

3. Use Claude Code to manage Jira issues directly:
   ```
   "Create a Jira issue for the authentication bug"
   "List all MACH project issues"
   "Update MACH-123 status to In Progress"
   ```

## Workflow Integration Options

If you want to restore automated Jira integration, consider:

### Option A: GitHub-Jira Sync App
- Install the official [Jira GitHub integration app](https://github.com/marketplace/jira-software-github)
- Automatic PR/issue linking
- No workflow configuration needed

### Option B: Custom Workflow
Create `.github/workflows/jira-sync.yml` with:
- Atlassian Jira login action
- Smart commit support
- Status transitions

See the [Atlassian GitHub Actions](https://github.com/atlassian/gajira) for examples.

## Smart Commits

Use smart commits in your commit messages:

```bash
git commit -m "MACH-123 #comment Fixed the login bug #done"
```

This will:
- Link commit to MACH-123
- Add a comment to the issue
- Transition the issue to Done

## Resources

- [Jira Cloud API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/)
- [Atlassian GitHub Actions](https://github.com/atlassian/gajira)
- [Jira MCP Server](https://github.com/OrenGrinker/jira-mcp-server)
- [GitHub-Jira Integration App](https://github.com/marketplace/jira-software-github)

## Need Help?

Contact your team lead or check the [PROJECT_MANAGEMENT.md](../PROJECT_MANAGEMENT.md) guide.
