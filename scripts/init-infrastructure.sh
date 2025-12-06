#!/bin/bash

# MACHUPS - Infrastructure Initialization Script
# Sets up the complete rapid generation and deployment infrastructure

set -e  # Exit on error

echo "🚀 MACHUPS - Infrastructure Initialization"
echo "==========================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Step 1: Create branch structure
echo -e "${BLUE}Step 1: Creating branch structure${NC}"
echo "-----------------------------------"
bash ./scripts/create-branches.sh

# Step 2: Install dependencies
echo ""
echo -e "${BLUE}Step 2: Installing dependencies${NC}"
echo "-----------------------------------"

if [ ! -f "package.json" ]; then
    echo "Creating package.json..."
    cat > package.json <<EOF
{
  "name": "machups",
  "version": "1.0.0",
  "description": "AI-Powered Brand Generation Platform",
  "private": true,
  "workspaces": [
    "app",
    "brands/**/preview"
  ],
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write \"**/*.{ts,tsx,json,md}\"",
    "generate": "ts-node scripts/generate-brand.ts",
    "deploy": "ts-node scripts/deploy-brand.ts",
    "create-branches": "bash scripts/create-branches.sh",
    "init-infrastructure": "bash scripts/init-infrastructure.sh"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.17.1",
    "@modelcontextprotocol/sdk": "^0.5.0",
    "@thirdweb-dev/sdk": "^4.0.0",
    "handlebars": "^4.7.8",
    "next": "^14.2.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.4.20",
    "eslint": "^8",
    "eslint-config-next": "14.2.0",
    "postcss": "^8.4.49",
    "prettier": "^3.2.5",
    "tailwindcss": "^3.4.17",
    "ts-node": "^10.9.2",
    "typescript": "^5"
  },
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  }
}
EOF
fi

echo "Installing dependencies..."
npm install

echo -e "${GREEN}✓ Dependencies installed${NC}"

# Step 3: Create directory structure
echo ""
echo -e "${BLUE}Step 3: Creating directory structure${NC}"
echo "-----------------------------------"

directories=(
    "app/api/generate"
    "app/api/premium"
    "app/api/nft"
    "lib/ai"
    "lib/mcp"
    "lib/generators"
    "lib/blockchain"
    "lib/utils"
    "lib/orchestrator"
    "lib/deployment"
    "lib/templates"
    "contracts"
    "docs"
    "design-site"
    "templates"
    "scripts"
    ".github/workflows"
    "brands"
)

for dir in "${directories[@]}"; do
    mkdir -p "$dir"
    echo "✓ Created $dir"
done

echo -e "${GREEN}✓ Directory structure created${NC}"

# Step 4: Create configuration files
echo ""
echo -e "${BLUE}Step 4: Creating configuration files${NC}"
echo "-----------------------------------"

# TypeScript config
if [ ! -f "tsconfig.json" ]; then
    cat > tsconfig.json <<EOF
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"],
      "@/lib/*": ["./lib/*"],
      "@/app/*": ["./app/*"],
      "@/components/*": ["./components/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF
    echo "✓ Created tsconfig.json"
fi

# ESLint config
if [ ! -f ".eslintrc.json" ]; then
    cat > .eslintrc.json <<EOF
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
EOF
    echo "✓ Created .eslintrc.json"
fi

# Prettier config
if [ ! -f ".prettierrc" ]; then
    cat > .prettierrc <<EOF
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 90,
  "tabWidth": 2,
  "useTabs": false
}
EOF
    echo "✓ Created .prettierrc"
fi

# .gitignore
if [ ! -f ".gitignore" ]; then
    cat > .gitignore <<EOF
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Production
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDEs
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# Generated
brands/**/preview/.next
brands/**/preview/out
brands/**/preview/node_modules
EOF
    echo "✓ Created .gitignore"
fi

echo -e "${GREEN}✓ Configuration files created${NC}"

# Step 5: Create environment template
echo ""
echo -e "${BLUE}Step 5: Creating environment template${NC}"
echo "-----------------------------------"

if [ ! -f ".env.example" ]; then
    cat > .env.example <<EOF
# MACHUPS Environment Variables
# Copy to .env.local and fill in your values

# Claude AI
CLAUDE_API_KEY=sk-ant-xxx

# Penpot MCP
PENPOT_SERVER_URL=http://localhost:9001
PENPOT_API_KEY=xxx
PENPOT_WORKSPACE_ID=xxx

# Cloudflare
CLOUDFLARE_ACCOUNT_ID=xxx
CLOUDFLARE_API_TOKEN=xxx

# Vercel
VERCEL_TOKEN=xxx
VERCEL_ORG_ID=xxx
VERCEL_PROJECT_ID=xxx

# Monad Blockchain
NEXT_PUBLIC_MONAD_RPC_URL=https://rpc.monad.xyz
NEXT_PUBLIC_MONAD_CHAIN_ID=10143
PRIVATE_KEY_DEPLOYER=xxx
PRIVATE_KEY_MINTER=xxx

# Thirdweb
THIRDWEB_SECRET_KEY=xxx
THIRDWEB_CLIENT_ID=xxx
NFT_CONTRACT_ADDRESS=0x...

# App
NEXT_PUBLIC_APP_URL=https://machups.com
DATABASE_URL=postgresql://xxx

# Features
ENABLE_PENPOT_MOCKUPS=true
ENABLE_NFT_MINTING=true
ENABLE_PREMIUM_FEATURES=true
EOF
    echo "✓ Created .env.example"
fi

echo -e "${GREEN}✓ Environment template created${NC}"

# Step 6: Create Penpot templates directory
echo ""
echo -e "${BLUE}Step 6: Creating Penpot templates${NC}"
echo "-----------------------------------"

mkdir -p templates/penpot
cat > templates/README.md <<EOF
# MACHUPS Templates

This directory contains reusable brand templates.

## Directory Structure

\`\`\`
templates/
├── web3-nft-bold.json       # Web3/NFT bold template
├── saas-modern.json          # SaaS modern template
├── ecommerce-classic.json    # E-commerce classic template
└── penpot/                   # Penpot mockup templates
    ├── landing-page.json
    ├── dashboard.json
    └── mobile-app.json
\`\`\`

## Using Templates

\`\`\`typescript
import { createTemplateSystem } from '@/lib/templates/template-system';

const system = createTemplateSystem();
const brand = await system.instantiateTemplate('web3-nft-bold', {
  brandName: 'MyBrand',
  tagline: 'Empowering the Future',
});
\`\`\`
EOF

echo "✓ Created templates directory"
echo -e "${GREEN}✓ Penpot templates ready${NC}"

# Step 7: Create initial test script
echo ""
echo -e "${BLUE}Step 7: Creating test script${NC}"
echo "-----------------------------------"

cat > scripts/test-generation.ts <<EOF
/**
 * Test Brand Generation Script
 *
 * Quick test of the brand generation pipeline
 */

import { createBrandOrchestrator } from '../lib/orchestrator/brand-orchestrator';

async function test() {
  console.log('🧪 Testing brand generation pipeline...\n');

  const orchestrator = createBrandOrchestrator({
    claudeApiKey: process.env.CLAUDE_API_KEY || '',
    penpotServerUrl: process.env.PENPOT_SERVER_URL || 'http://localhost:9001',
    enablePenpotMockups: false, // Disable for quick test
    enableNFTMinting: false,
    enablePremiumFeatures: false,
  });

  orchestrator.on('progress', (progress) => {
    console.log(\`[\${progress.percentage}%] \${progress.message}\`);
  });

  try {
    const result = await orchestrator.generateBrand({
      businessIdea: 'AI-powered task management for developers',
      targetAudience: 'Software developers and engineering teams',
      style: 'modern',
      techStack: 'nextjs',
    });

    console.log('\n✅ Test completed!');
    console.log('Brand ID:', result.brandId);
    console.log('Preview URL:', result.previewUrl);
    console.log('Generation time:', result.generationTime, 'seconds');
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  }
}

test();
EOF

echo "✓ Created test-generation.ts"
echo -e "${GREEN}✓ Test script created${NC}"

# Step 8: Summary
echo ""
echo "========================================="
echo -e "${GREEN}✅ Infrastructure Setup Complete!${NC}"
echo "========================================="
echo ""
echo "What was created:"
echo "  ✓ Git branch structure (28 feature branches)"
echo "  ✓ Project dependencies installed"
echo "  ✓ Directory structure"
echo "  ✓ Configuration files (TypeScript, ESLint, Prettier)"
echo "  ✓ Environment template (.env.example)"
echo "  ✓ Template system"
echo "  ✓ Test scripts"
echo ""
echo "Next steps:"
echo ""
echo "  1. Configure environment variables:"
echo "     cp .env.example .env.local"
echo "     # Edit .env.local with your API keys"
echo ""
echo "  2. Test the generation pipeline:"
echo "     npm run generate"
echo ""
echo "  3. Start development on a feature:"
echo "     git checkout feature/penpot-integration"
echo ""
echo "  4. Review the documentation:"
echo "     - docs/BRANCHING_STRATEGY.md"
echo "     - CLAUDE.md"
echo "     - brands/gonads-io/README.md"
echo ""
echo "  5. Deploy Gonads.io demo:"
echo "     cd brands/gonads-io/preview"
echo "     npm install"
echo "     npm run deploy"
echo ""
echo "For questions or issues:"
echo "  📖 See docs/BRANCHING_STRATEGY.md"
echo "  🐛 Create an issue on GitHub"
echo ""
