#!/bin/bash
# Sync GitHub labels from .github/labels.yml
# Requires GitHub CLI (gh) to be installed and authenticated

set -e

REPO_ROOT=$(git rev-parse --show-toplevel)
LABELS_FILE="$REPO_ROOT/.github/labels.yml"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  GitHub Labels Sync Utility${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${YELLOW}⚠ GitHub CLI (gh) is not installed${NC}"
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}⚠ Not authenticated with GitHub CLI${NC}"
    echo "Run: gh auth login"
    exit 1
fi

# Check if labels file exists
if [ ! -f "$LABELS_FILE" ]; then
    echo -e "${YELLOW}⚠ Labels file not found: $LABELS_FILE${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Found labels file: $LABELS_FILE"
echo -e "${GREEN}✓${NC} GitHub CLI authenticated"
echo

# Get repository info
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
echo -e "${BLUE}Repository:${NC} $REPO"
echo

# Ask for confirmation
read -p "Sync labels to $REPO? This will update/create labels. (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

echo
echo -e "${BLUE}Syncing labels...${NC}"

# Parse YAML and create/update labels
while IFS= read -r line; do
    if [[ $line =~ ^-[[:space:]]name:[[:space:]]\"(.+)\" ]]; then
        NAME="${BASH_REMATCH[1]}"
    elif [[ $line =~ ^[[:space:]]+color:[[:space:]]\"(.+)\" ]]; then
        COLOR="${BASH_REMATCH[1]}"
    elif [[ $line =~ ^[[:space:]]+description:[[:space:]]\"(.+)\" ]]; then
        DESCRIPTION="${BASH_REMATCH[1]}"

        # Create or update label
        if gh label list --json name -q ".[] | select(.name==\"$NAME\") | .name" | grep -q "^$NAME$"; then
            echo -e "  ${YELLOW}↻${NC} Updating: $NAME"
            gh label edit "$NAME" --color "$COLOR" --description "$DESCRIPTION" 2>/dev/null || true
        else
            echo -e "  ${GREEN}+${NC} Creating: $NAME"
            gh label create "$NAME" --color "$COLOR" --description "$DESCRIPTION" 2>/dev/null || true
        fi
    fi
done < "$LABELS_FILE"

echo
echo -e "${GREEN}✓ Labels synced successfully!${NC}"
echo
echo -e "${BLUE}View labels at:${NC} https://github.com/$REPO/labels"
echo
