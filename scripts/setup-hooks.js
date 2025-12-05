#!/usr/bin/env node

/**
 * Git Hooks Setup Script
 * Sets up pre-commit and pre-push hooks for the project
 */

const fs = require('fs');
const path = require('path');

const HOOKS_DIR = path.join(process.cwd(), '.git', 'hooks');

// Pre-commit hook content
const PRE_COMMIT_HOOK = `#!/bin/sh
# Pre-commit hook for monad-blitz-sf

echo "Running pre-commit checks..."

# Run linter
npm run lint --silent
if [ $? -ne 0 ]; then
  echo "❌ Linting failed. Please fix errors before committing."
  exit 1
fi

echo "✅ Pre-commit checks passed"
exit 0
`;

// Pre-push hook content
const PRE_PUSH_HOOK = `#!/bin/sh
# Pre-push hook for monad-blitz-sf

echo "Running pre-push checks..."

# Run TypeScript type checking
npx tsc --noEmit
if [ $? -ne 0 ]; then
  echo "❌ TypeScript compilation failed. Please fix type errors before pushing."
  exit 1
fi

echo "✅ Pre-push checks passed"
exit 0
`;

function setupHooks() {
  // Check if .git directory exists
  if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
    console.log('⚠️  Not a git repository. Skipping hook setup.');
    return;
  }

  // Create hooks directory if it doesn't exist
  if (!fs.existsSync(HOOKS_DIR)) {
    fs.mkdirSync(HOOKS_DIR, { recursive: true });
  }

  // Write pre-commit hook
  const preCommitPath = path.join(HOOKS_DIR, 'pre-commit');
  fs.writeFileSync(preCommitPath, PRE_COMMIT_HOOK);
  fs.chmodSync(preCommitPath, '755');
  console.log('✅ Pre-commit hook installed');

  // Write pre-push hook
  const prePushPath = path.join(HOOKS_DIR, 'pre-push');
  fs.writeFileSync(prePushPath, PRE_PUSH_HOOK);
  fs.chmodSync(prePushPath, '755');
  console.log('✅ Pre-push hook installed');

  console.log('🎉 Git hooks setup complete!');
}

// Run setup
try {
  setupHooks();
} catch (error) {
  console.error('❌ Error setting up hooks:', error.message);
  // Don't fail the install process
  process.exit(0);
}
