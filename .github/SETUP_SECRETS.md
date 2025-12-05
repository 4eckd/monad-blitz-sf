# GitHub Secrets Setup

To enable auto-deployment, configure these secrets in your GitHub repository:

## Required Secrets

Navigate to: **Settings → Secrets and variables → Actions → New repository secret**

### 1. VERCEL_TOKEN
- **Value**: `l2JD60VqxR0uoDAXxl3hLRjS`
- **Purpose**: Authenticates with Vercel API for deployments
- **Source**: https://vercel.com/account/tokens

### 2. VERCEL_ORG_ID
- **Value**: `team_htUXlE6aixhhmBuybRXvhe8S`
- **Purpose**: Identifies your Vercel team/organization
- **Source**: `website/.vercel/project.json`

### 3. VERCEL_PROJECT_ID
- **Value**: `prj_pVv7IcDUYnOUPG0TBCi268pgw6l1`
- **Purpose**: Identifies the docs project in Vercel
- **Source**: `website/.vercel/project.json`

### 4. VERCEL_WEBHOOK_SECRET (Optional)
- **Value**: Generate a random secure string
- **Purpose**: Verifies webhook signatures from Vercel
- **Setup**: Add to both GitHub Secrets AND `.env.local`

## Setup via GitHub CLI

```bash
# Install GitHub CLI if not already installed
# macOS: brew install gh
# Windows: winget install GitHub.cli

# Authenticate
gh auth login

# Set secrets
gh secret set VERCEL_TOKEN --body "l2JD60VqxR0uoDAXxl3hLRjS" --repo 4eckd/monad-blitz-sf
gh secret set VERCEL_ORG_ID --body "team_htUXlE6aixhhmBuybRXvhe8S" --repo 4eckd/monad-blitz-sf
gh secret set VERCEL_PROJECT_ID --body "prj_pVv7IcDUYnOUPG0TBCi268pgw6l1" --repo 4eckd/monad-blitz-sf

# Generate and set webhook secret
WEBHOOK_SECRET=$(openssl rand -hex 32)
gh secret set VERCEL_WEBHOOK_SECRET --body "$WEBHOOK_SECRET" --repo 4eckd/monad-blitz-sf
echo "Save this webhook secret for Vercel dashboard: $WEBHOOK_SECRET"
```

## Verify Setup

After setting secrets, verify the workflow:

1. **Check Workflow**: Navigate to **Actions** tab in GitHub
2. **Manual Trigger**: Click on "Deploy Docs to Vercel" → "Run workflow"
3. **Check Logs**: View the workflow run logs for any errors
4. **Verify Deployment**: Visit the Vercel URL in the logs

## Webhook Setup in Vercel

1. Go to https://vercel.com/team-4eckd/machups-docs/settings/git-webhooks
2. Click **Add Webhook**
3. **URL**: `https://api.machups.com/webhooks/vercel/docs`
4. **Secret**: Use the `VERCEL_WEBHOOK_SECRET` value from above
5. **Events**: Select:
   - ✓ deployment.created
   - ✓ deployment.succeeded
   - ✓ deployment.failed
   - ✓ deployment.canceled

## Testing Auto-Deploy

1. Make a change to any file in `website/` directory
2. Commit and push to `main` branch
3. Check **Actions** tab for workflow execution
4. Verify deployment on Vercel

## Troubleshooting

### Workflow not triggering
- Check that secrets are set correctly
- Verify workflow file is in `.github/workflows/`
- Ensure changes are in `website/**` paths

### Deployment fails
- Check workflow logs in Actions tab
- Verify Vercel token is valid: `vercel whoami --token <token>`
- Ensure project IDs match `.vercel/project.json`

### Webhook not working
- Verify webhook secret matches in both GitHub and Vercel
- Check webhook logs in Vercel dashboard
- Test endpoint: `curl -X GET https://api.machups.com/webhooks/vercel/docs`
