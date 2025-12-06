#!/bin/bash

# MACHUPS - Branch Creation Script
# Creates all phase and feature branches for the project
# Usage: ./scripts/create-branches.sh

set -e  # Exit on error

echo "🌳 MACHUPS - Creating Branch Structure"
echo "======================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to create branch if it doesn't exist
create_branch() {
    local branch_name=$1
    local parent_branch=$2

    if git show-ref --verify --quiet refs/heads/$branch_name; then
        echo -e "${YELLOW}⚠️  Branch ${branch_name} already exists, skipping${NC}"
    else
        git checkout -b $branch_name $parent_branch
        echo -e "${GREEN}✅ Created ${branch_name}${NC}"
    fi
}

# Ensure we're in the repository root
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Fetch latest changes
echo "📡 Fetching latest changes..."
git fetch origin

# Ensure main exists and is up to date
echo ""
echo "🔄 Checking out main branch..."
git checkout main
git pull origin main || echo "⚠️  Could not pull main (might not exist on remote yet)"

# Create develop branch if it doesn't exist
echo ""
echo -e "${BLUE}📦 Creating develop branch...${NC}"
create_branch "develop" "main"

# Push develop to remote
git push -u origin develop || echo "⚠️  Develop already on remote"

echo ""
echo "========================================="
echo "Phase 1: Foundation Setup"
echo "========================================="

create_branch "phase-1-foundation" "develop"
create_branch "feature/env-setup" "phase-1-foundation"
create_branch "feature/repo-structure" "phase-1-foundation"
create_branch "feature/mcp-clients" "phase-1-foundation"
create_branch "feature/claude-integration" "phase-1-foundation"

echo ""
echo "========================================="
echo "Phase 2: Core Generation Engine"
echo "========================================="

create_branch "phase-2-core-engine" "develop"
create_branch "feature/brand-analyzer" "phase-2-core-engine"
create_branch "feature/logo-generator" "phase-2-core-engine"
create_branch "feature/penpot-integration" "phase-2-core-engine"
create_branch "feature/asset-export" "phase-2-core-engine"

echo ""
echo "========================================="
echo "Phase 3: Design System Generation"
echo "========================================="

create_branch "phase-3-design-system" "develop"
create_branch "feature/token-generator" "phase-3-design-system"
create_branch "feature/component-generator" "phase-3-design-system"
create_branch "feature/tailwind-export" "phase-3-design-system"
create_branch "feature/penpot-sync" "phase-3-design-system"

echo ""
echo "========================================="
echo "Phase 4: Premium Features & Integration"
echo "========================================="

create_branch "phase-4-premium-features" "develop"
create_branch "feature/pdf-generator" "phase-4-premium-features"
create_branch "feature/x402-payments" "phase-4-premium-features"
create_branch "feature/cloudflare-cache" "phase-4-premium-features"
create_branch "feature/pitchdeck-generator" "phase-4-premium-features"

echo ""
echo "========================================="
echo "Phase 5: Blockchain Integration"
echo "========================================="

create_branch "phase-5-blockchain" "develop"
create_branch "feature/nft-contract" "phase-5-blockchain"
create_branch "feature/monad-integration" "phase-5-blockchain"
create_branch "feature/thirdweb-sdk" "phase-5-blockchain"
create_branch "feature/ipfs-storage" "phase-5-blockchain"

echo ""
echo "========================================="
echo "Phase 6: Deployment & Documentation"
echo "========================================="

create_branch "phase-6-deployment" "develop"
create_branch "feature/docusaurus-sites" "phase-6-deployment"
create_branch "feature/vercel-deploy" "phase-6-deployment"
create_branch "feature/github-actions" "phase-6-deployment"
create_branch "feature/subdomain-routing" "phase-6-deployment"

echo ""
echo "========================================="
echo "Rapid Generation Infrastructure"
echo "========================================="

create_branch "feature/brand-orchestrator" "develop"
create_branch "feature/template-system" "develop"
create_branch "feature/penpot-mockup-generator" "develop"
create_branch "feature/deployment-automation" "develop"

# Return to develop
git checkout develop

echo ""
echo "========================================="
echo "✅ Branch Structure Created Successfully!"
echo "========================================="
echo ""
echo "Branch Summary:"
echo "  - Main branch: main"
echo "  - Development branch: develop"
echo "  - Phase branches: 6"
echo "  - Feature branches: 28"
echo ""
echo "Next Steps:"
echo "  1. Push all branches to remote:"
echo "     git push --all origin"
echo ""
echo "  2. Set up branch protection rules on GitHub"
echo ""
echo "  3. Start development on feature branches:"
echo "     git checkout feature/your-feature"
echo ""
echo "  4. See docs/BRANCHING_STRATEGY.md for workflow details"
echo ""
