#!/bin/bash
# Apply branch protection rules via GitHub CLI
# Usage: ./apply-branch-protection.sh

set -e

REPO="4eckd/monad-blitz-sf"

echo "🔐 Applying branch protection rules for MACHUPS..."
echo ""

# Function to apply protection to a branch
apply_protection() {
  local BRANCH=$1
  local APPROVALS=$2
  local STRICT=$3
  local ENFORCE_ADMINS=$4
  local MERGE_QUEUE=$5

  echo "📌 Configuring protection for branch: $BRANCH"

  # Note: GitHub CLI doesn't fully support merge queue yet
  # Use GitHub web UI for merge queue settings

  gh api \
    --method PUT \
    -H "Accept: application/vnd.github+json" \
    "/repos/$REPO/branches/$BRANCH/protection" \
    -f required_status_checks[strict]=$STRICT \
    -f required_status_checks[contexts][]=lint \
    -f required_status_checks[contexts][]=type-check \
    -f required_status_checks[contexts][]=build \
    -f required_status_checks[contexts][]=test \
    -f required_status_checks[contexts][]=security-scan \
    -f required_status_checks[contexts][]=merge-queue-status \
    -f enforce_admins=$ENFORCE_ADMINS \
    -f required_pull_request_reviews[dismissal_restrictions]={} \
    -f required_pull_request_reviews[dismiss_stale_reviews]=true \
    -f required_pull_request_reviews[require_code_owner_reviews]=false \
    -f required_pull_request_reviews[required_approving_review_count]=$APPROVALS \
    -f restrictions=null \
    -f required_linear_history=true \
    -f allow_force_pushes=false \
    -f allow_deletions=false \
    -f required_conversation_resolution=true \
    || echo "⚠️  Could not apply protection to $BRANCH (may need manual configuration)"

  echo "✅ Protection applied to $BRANCH"
  echo ""
}

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed"
    echo "Install from: https://cli.github.com/"
    exit 1
fi

# Check authentication
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI"
    echo "Run: gh auth login"
    exit 1
fi

echo "🔑 Authenticated as: $(gh api user -q .login)"
echo ""

# Apply protection rules
apply_protection "main" 1 true true true
apply_protection "develop" 1 true false true

echo "✅ Branch protection rules applied!"
echo ""
echo "⚠️  IMPORTANT: Merge queue settings must be configured manually in GitHub web UI"
echo "   Go to: https://github.com/$REPO/settings/branches"
echo "   For 'main' branch:"
echo "   - Enable 'Require merge queue'"
echo "   - Set build concurrency: 5"
echo "   - Set merge method: Squash"
echo ""
echo "📖 See .github/MERGE_QUEUE_SETUP.md for complete instructions"
