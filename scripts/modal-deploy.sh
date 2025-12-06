#!/bin/bash
# Modal Deployment Script for MACHUPS
# Run this script when network connectivity is available

set -e

echo "🚀 MACHUPS Modal Deployment Script"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Modal CLI is installed
if ! command -v modal &> /dev/null; then
    echo -e "${RED}❌ Modal CLI not found. Installing...${NC}"
    pip3 install modal
else
    echo -e "${GREEN}✅ Modal CLI found: $(modal --version)${NC}"
fi

echo ""
echo "=========================================="
echo "Step 1: Modal Authentication"
echo "=========================================="
echo ""

# Check if authenticated
if modal app list &> /dev/null; then
    echo -e "${GREEN}✅ Already authenticated with Modal${NC}"
else
    echo -e "${YELLOW}⚠️  Not authenticated. Setting up authentication...${NC}"
    echo ""
    echo "Choose authentication method:"
    echo "  1. Use existing token (from modal.toml)"
    echo "  2. Interactive authentication (opens browser)"
    read -p "Enter choice (1 or 2): " auth_choice

    if [ "$auth_choice" == "1" ]; then
        echo "Setting token from modal.toml..."
        modal token set --token-id ak-qctAMMxbcgn757mLZhMKIR \
          --token-secret as-8YrukEonRhAkQ49d7nZ8MY \
          --profile=fused-gaming
    else
        echo "Opening browser for authentication..."
        modal token new
    fi
fi

echo ""
echo "=========================================="
echo "Step 2: Verify Modal Connection"
echo "=========================================="
echo ""

if modal app list &> /dev/null; then
    echo -e "${GREEN}✅ Modal connection verified${NC}"
    echo ""
    echo "Deployed apps:"
    modal app list
else
    echo -e "${RED}❌ Cannot connect to Modal. Check network connectivity.${NC}"
    exit 1
fi

echo ""
echo "=========================================="
echo "Step 3: Create Modal Secrets"
echo "=========================================="
echo ""

# Check for Claude API key
if [ -z "$CLAUDE_API_KEY" ]; then
    read -p "Enter your Claude API key (or press Enter to skip): " CLAUDE_API_KEY
fi

if [ -n "$CLAUDE_API_KEY" ]; then
    echo "Creating claude-api-key secret..."
    modal secret create claude-api-key ANTHROPIC_API_KEY="$CLAUDE_API_KEY" || \
      echo -e "${YELLOW}⚠️  Secret might already exist${NC}"
    echo -e "${GREEN}✅ Claude API key secret configured${NC}"
else
    echo -e "${YELLOW}⚠️  Skipping Claude API key setup. Set manually at modal.com/secrets${NC}"
fi

# Optional: Create other secrets
read -p "Do you want to create additional secrets? (y/n): " create_more

if [ "$create_more" == "y" ]; then
    read -p "OpenAI API key (optional): " OPENAI_KEY
    if [ -n "$OPENAI_KEY" ]; then
        modal secret create openai-api-key OPENAI_API_KEY="$OPENAI_KEY" || \
          echo -e "${YELLOW}⚠️  Secret might already exist${NC}"
    fi
fi

echo ""
echo "=========================================="
echo "Step 4: Test Hello World Example"
echo "=========================================="
echo ""

echo "Testing Modal setup with hello world example..."
if modal run modal_functions/examples/hello_modal.py; then
    echo -e "${GREEN}✅ Hello world test passed!${NC}"
else
    echo -e "${RED}❌ Hello world test failed${NC}"
    exit 1
fi

echo ""
echo "=========================================="
echo "Step 5: Deploy Brand Analyzer"
echo "=========================================="
echo ""

read -p "Deploy brand analyzer function? (y/n): " deploy_analyzer

if [ "$deploy_analyzer" == "y" ]; then
    echo "Deploying brand analyzer..."
    if modal deploy modal_functions/brand_generation/analyzer.py; then
        echo -e "${GREEN}✅ Brand analyzer deployed successfully!${NC}"
        echo ""
        echo "Test with:"
        echo "  modal run modal_functions/brand_generation/analyzer.py"
    else
        echo -e "${RED}❌ Brand analyzer deployment failed${NC}"
    fi
fi

echo ""
echo "=========================================="
echo "Step 6: Deploy Logo Generator (Optional)"
echo "=========================================="
echo ""

read -p "Deploy logo generator? (requires GPU, costs ~$0.20/run) (y/n): " deploy_logo

if [ "$deploy_logo" == "y" ]; then
    if [ -f "modal_functions/brand_generation/logo_generator.py" ]; then
        echo "Deploying logo generator..."
        if modal deploy modal_functions/brand_generation/logo_generator.py; then
            echo -e "${GREEN}✅ Logo generator deployed successfully!${NC}"
        else
            echo -e "${RED}❌ Logo generator deployment failed${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  Logo generator not found${NC}"
    fi
fi

echo ""
echo "=========================================="
echo "🎉 Modal Deployment Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "  1. Test brand analyzer:"
echo "     ${BLUE}modal run modal_functions/brand_generation/analyzer.py${NC}"
echo ""
echo "  2. View deployed apps:"
echo "     ${BLUE}modal app list${NC}"
echo ""
echo "  3. View function logs:"
echo "     ${BLUE}modal app logs machups-brand-analyzer${NC}"
echo ""
echo "  4. Integrate with Next.js API routes"
echo "     See: MODAL_DEV_SETUP.md for integration guide"
echo ""
echo "  5. Monitor usage:"
echo "     ${BLUE}modal stats${NC}"
echo ""
echo "=========================================="
