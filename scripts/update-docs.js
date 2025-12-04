#!/usr/bin/env node

/**
 * Automated Documentation Update Script
 *
 * Triggered by git pre-commit hook to automatically update documentation
 * based on commit messages and changed files.
 *
 * Usage: node scripts/update-docs.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const DOCS_DIR = path.join(__dirname, '..', 'docs');
const CHANGELOG_PATH = path.join(__dirname, '..', 'CHANGELOG.md');
const README_PATH = path.join(__dirname, '..', 'README.md');

// Get git status
function getGitStatus() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    return status.split('\n').filter(Boolean).map(line => {
      const [status, ...fileParts] = line.trim().split(/\s+/);
      return {
        status: status.trim(),
        file: fileParts.join(' ')
      };
    });
  } catch (error) {
    console.error('Error getting git status:', error.message);
    return [];
  }
}

// Get last commit message (if amending)
function getLastCommitMessage() {
  try {
    return execSync('git log -1 --pretty=%B', { encoding: 'utf8' }).trim();
  } catch (error) {
    return '';
  }
}

// Parse commit message for type and scope
function parseCommitMessage(message) {
  const commitPattern = /^(feat|fix|docs|style|refactor|perf|test|chore)(\(([^)]+)\))?: (.+)$/;
  const match = message.match(commitPattern);

  if (match) {
    return {
      type: match[1],
      scope: match[3] || 'general',
      description: match[4],
      valid: true
    };
  }

  return { valid: false };
}

// Categorize changed files
function categorizeChanges(files) {
  const categories = {
    components: [],
    docs: [],
    prompts: [],
    lib: [],
    config: [],
    workflows: [],
    other: []
  };

  files.forEach(({ file, status }) => {
    if (file.startsWith('components/')) categories.components.push(file);
    else if (file.startsWith('docs/')) categories.docs.push(file);
    else if (file.startsWith('prompts/')) categories.prompts.push(file);
    else if (file.startsWith('lib/')) categories.lib.push(file);
    else if (file.startsWith('.github/')) categories.workflows.push(file);
    else if (file.endsWith('.json') || file.endsWith('.ts') || file.endsWith('.config.js')) {
      categories.config.push(file);
    }
    else categories.other.push(file);
  });

  return categories;
}

// Update CHANGELOG.md
function updateChangelog(commitInfo, categories) {
  if (!commitInfo.valid) return;

  const changelog = fs.readFileSync(CHANGELOG_PATH, 'utf8');
  const lines = changelog.split('\n');

  // Find "## [Unreleased]" section
  const unreleasedIndex = lines.findIndex(line => line.includes('## [Unreleased]'));
  if (unreleasedIndex === -1) return;

  // Find or create section for commit type
  const typeHeaders = {
    feat: '### Added (v0.2.0 - In Development)',
    fix: '### Fixed',
    docs: '### Documentation',
    style: '### Style',
    refactor: '### Refactor',
    perf: '### Performance',
    test: '### Tests',
    chore: '### Chore'
  };

  const headerText = typeHeaders[commitInfo.type];
  if (!headerText) return;

  // Find existing section or insert new one
  let sectionIndex = lines.findIndex((line, idx) =>
    idx > unreleasedIndex && line.trim() === headerText
  );

  if (sectionIndex === -1) {
    // Insert new section after [Unreleased]
    sectionIndex = unreleasedIndex + 2;
    lines.splice(sectionIndex, 0, headerText, '');
  }

  // Add commit entry
  const entry = `- **${commitInfo.scope}**: ${commitInfo.description}`;
  const entryExists = lines.slice(sectionIndex).some(line => line.includes(entry));

  if (!entryExists) {
    // Find next section or end
    let insertIndex = sectionIndex + 1;
    while (insertIndex < lines.length &&
           !lines[insertIndex].startsWith('###') &&
           !lines[insertIndex].startsWith('##')) {
      insertIndex++;
    }

    lines.splice(insertIndex, 0, entry);
  }

  // Write updated changelog
  fs.writeFileSync(CHANGELOG_PATH, lines.join('\n'));
  console.log('✅ Updated CHANGELOG.md');
}

// Update README.md with latest stats
function updateReadmeStats() {
  const readme = fs.readFileSync(README_PATH, 'utf8');
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

  // Count components
  const componentsFile = path.join(__dirname, '..', 'components.json');
  let componentCount = 0;
  if (fs.existsSync(componentsFile)) {
    const componentsConfig = JSON.parse(fs.readFileSync(componentsFile, 'utf8'));
    componentCount = Object.keys(componentsConfig.components || {}).length;
  }

  // Count documentation files
  const docFiles = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.md'));

  // Update stats in README (if section exists)
  let updatedReadme = readme;

  // Update version badge
  const versionBadge = `[![Version](https://img.shields.io/badge/version-${packageJson.version}-blue)](VERSION)`;
  updatedReadme = updatedReadme.replace(/\[!\[Version\]\(https:\/\/img\.shields\.io\/badge\/version-[^\]]+\]\([^)]+\)/, versionBadge);

  fs.writeFileSync(README_PATH, updatedReadme);
  console.log('✅ Updated README.md');
}

// Update component documentation
function updateComponentDocs(categories) {
  if (categories.components.length === 0) return;

  const componentsFile = path.join(__dirname, '..', 'components.json');
  if (!fs.existsSync(componentsFile)) return;

  const componentsConfig = JSON.parse(fs.readFileSync(componentsFile, 'utf8'));
  const components = componentsConfig.components || {};

  // Generate component list markdown
  let markdown = '# Component Documentation\n\n';
  markdown += `Last Updated: ${new Date().toISOString()}\n\n`;
  markdown += '## Available Components\n\n';

  for (const [name, config] of Object.entries(components)) {
    markdown += `### ${name}\n\n`;
    markdown += `- **Path**: \`${config.path}\`\n`;
    markdown += `- **Status**: ${config.status}\n`;

    if (config.variants) {
      markdown += `- **Variants**: ${config.variants.join(', ')}\n`;
    }

    if (config.sizes) {
      markdown += `- **Sizes**: ${config.sizes.join(', ')}\n`;
    }

    if (config.features) {
      markdown += `- **Features**: ${config.features.join(', ')}\n`;
    }

    markdown += '\n';
  }

  const componentDocsPath = path.join(DOCS_DIR, 'components.md');
  fs.writeFileSync(componentDocsPath, markdown);
  console.log('✅ Updated component documentation');
}

// Update design tokens documentation
function updateDesignTokensDocs() {
  const tailwindConfigPath = path.join(__dirname, '..', 'tailwind.config.ts');
  if (!fs.existsSync(tailwindConfigPath)) return;

  // Note: In a real implementation, this would parse the Tailwind config
  // For now, we'll create a placeholder
  const tokens = {
    colors: {},
    spacing: {},
    typography: {}
  };

  const tokensPath = path.join(DOCS_DIR, 'design-tokens.json');
  fs.writeFileSync(tokensPath, JSON.stringify(tokens, null, 2));
  console.log('✅ Updated design tokens');
}

// Update cross-references in documentation
function updateCrossReferences() {
  const docFiles = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.md'));

  // Map of document titles to filenames
  const docMap = {};
  docFiles.forEach(file => {
    const content = fs.readFileSync(path.join(DOCS_DIR, file), 'utf8');
    const titleMatch = content.match(/^# (.+)$/m);
    if (titleMatch) {
      docMap[titleMatch[1]] = file;
    }
  });

  // Update each doc with correct links
  docFiles.forEach(file => {
    const filePath = path.join(DOCS_DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Find broken or relative links and fix them
    Object.entries(docMap).forEach(([title, filename]) => {
      // Replace [Document Title](./wrong-path.md) with correct path
      const wrongPattern = new RegExp(`\\[${title}\\]\\([^)]+\\)`, 'g');
      content = content.replace(wrongPattern, `[${title}](./${filename})`);
    });

    fs.writeFileSync(filePath, content);
  });

  console.log('✅ Updated cross-references');
}

// Main execution
function main() {
  console.log('🔄 Running automated documentation update...\n');

  // Get changed files
  const changedFiles = getGitStatus();
  if (changedFiles.length === 0) {
    console.log('ℹ️  No changes detected');
    return;
  }

  console.log(`📝 Found ${changedFiles.length} changed files\n`);

  // Categorize changes
  const categories = categorizeChanges(changedFiles);

  // Get commit info
  const lastCommit = getLastCommitMessage();
  const commitInfo = parseCommitMessage(lastCommit);

  // Update documentation
  updateChangelog(commitInfo, categories);
  updateReadmeStats();
  updateComponentDocs(categories);
  updateDesignTokensDocs();
  updateCrossReferences();

  console.log('\n✨ Documentation update complete!\n');

  // List updated files
  const updatedFiles = [
    'CHANGELOG.md',
    'README.md',
    'docs/components.md',
    'docs/design-tokens.json'
  ].filter(file => fs.existsSync(path.join(__dirname, '..', file)));

  if (updatedFiles.length > 0) {
    console.log('📄 Updated files:');
    updatedFiles.forEach(file => console.log(`   - ${file}`));
    console.log('\n💡 Remember to stage these files: git add ' + updatedFiles.join(' '));
  }
}

// Run script
if (require.main === module) {
  main();
}

module.exports = {
  getGitStatus,
  parseCommitMessage,
  categorizeChanges,
  updateChangelog,
  updateReadmeStats
};
