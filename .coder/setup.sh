#!/bin/bash
# MACHUPS Coder + Modal.com Setup Script
# Sets up hyper-speed development environment

set -e

echo "🚀 MACHUPS Hyper-Speed Development Setup"
echo "========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running in Coder workspace
if [ -n "$CODER_WORKSPACE_NAME" ]; then
    echo -e "${GREEN}✓${NC} Running in Coder workspace: $CODER_WORKSPACE_NAME"
else
    echo -e "${YELLOW}⚠${NC}  Not in Coder workspace (running locally)"
fi

# Function to check command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check dependencies
echo ""
echo "Checking dependencies..."

if command_exists node; then
    echo -e "${GREEN}✓${NC} Node.js $(node --version)"
else
    echo -e "${RED}✗${NC} Node.js not found"
    exit 1
fi

if command_exists pnpm; then
    echo -e "${GREEN}✓${NC} pnpm $(pnpm --version)"
else
    echo -e "${RED}✗${NC} pnpm not found"
    exit 1
fi

if command_exists python3; then
    echo -e "${GREEN}✓${NC} Python $(python3 --version)"
else
    echo -e "${RED}✗${NC} Python not found"
    exit 1
fi

if command_exists modal; then
    echo -e "${GREEN}✓${NC} Modal CLI installed"
else
    echo -e "${YELLOW}⚠${NC}  Modal CLI not found, installing..."
    pip3 install modal
fi

# Install project dependencies
echo ""
echo "Installing project dependencies..."
pnpm install

# Setup environment
echo ""
echo "Setting up environment..."

if [ ! -f .env ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo -e "${YELLOW}⚠${NC}  Please configure .env with your API keys"
else
    echo -e "${GREEN}✓${NC} .env already exists"
fi

# Modal authentication
echo ""
if [ -n "$MODAL_TOKEN_ID" ] && [ -n "$MODAL_TOKEN_SECRET" ]; then
    echo "Authenticating with Modal.com..."
    modal token set --token-id "$MODAL_TOKEN_ID" --token-secret "$MODAL_TOKEN_SECRET"
    echo -e "${GREEN}✓${NC} Modal.com authenticated"
else
    echo -e "${YELLOW}⚠${NC}  Modal.com credentials not found in environment"
    echo "    Run: modal token new"
fi

# Build check
echo ""
echo "Checking TypeScript compilation..."
if pnpm run type-check; then
    echo -e "${GREEN}✓${NC} TypeScript compilation successful"
else
    echo -e "${YELLOW}⚠${NC}  TypeScript errors found (may be expected)"
fi

# Display next steps
echo ""
echo "========================================="
echo -e "${GREEN}✓${NC} Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Configure .env with your API keys"
echo "  2. Run 'pnpm dev' to start Next.js dev server"
echo "  3. See COORDINATION_DASHBOARD.md for tasks"
echo ""

case "${TASK:-general}" in
    claude-ai)
        echo "Your task: Claude AI Integration"
        echo "  - See BUILDER_ASSIGNMENT_CLAUDE_AI.md"
        echo "  - Branch: claude/claude-ai-integration-016s6daPN3GTf1C8DFmdhmU9"
        echo "  - Start: Implement lib/ai/claude.ts"
        ;;
    generators)
        echo "Your task: Generator Modules"
        echo "  - See BUILDER_ASSIGNMENT_GENERATORS.md"
        echo "  - Branch: claude/generators-016s6daPN3GTf1C8DFmdhmU9"
        echo "  - Start: Implement lib/generators/logos.ts"
        ;;
    modal)
        echo "Your task: Modal.com Integration"
        echo "  - See MODAL_INTEGRATION_PLAN.md"
        echo "  - Create lib/modal_functions/"
        echo "  - Deploy: modal deploy"
        ;;
    testing)
        echo "Your task: Testing & QA"
        echo "  - Run: pnpm test"
        echo "  - Check: scripts/test-*.ts"
        ;;
    *)
        echo "Happy coding! 🚀"
        ;;
esac

echo ""
echo "Useful commands:"
echo "  pnpm dev          - Start Next.js dev server"
echo "  pnpm build        - Build for production"
echo "  pnpm lint         - Run ESLint"
echo "  pnpm type-check   - Check TypeScript"
echo "  modal deploy      - Deploy Modal functions"
echo ""
