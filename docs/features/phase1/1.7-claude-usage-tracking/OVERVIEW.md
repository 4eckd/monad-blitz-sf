# Claude Usage Tracking & Cost Optimization - Feature Plan

**Phase 1, Step 7** | `feature/claude-usage-tracking` | v0.3.0-alpha.7 | 1-2 days

## Goals
- Automatic model selection based on task complexity
- Track Claude API usage across all operations
- Generate CLAUDE_USAGE.md reports
- Auto-update CHANGELOG.md with token usage
- Cost optimization through intelligent routing

## Model Selection Strategy

### Task-Based Routing
```typescript
interface ModelRoute {
  task: string;
  model: 'claude-opus-4' | 'claude-sonnet-4' | 'claude-haiku-4';
  reason: string;
  estimatedCost: number;
}

const MODEL_ROUTING: Record<string, ModelRoute> = {
  // Haiku: Fast, cheap, simple tasks
  'token-generation': {
    task: 'Generate design tokens',
    model: 'claude-haiku-4',
    reason: 'Structured output, low complexity',
    estimatedCost: 0.002
  },
  'component-validation': {
    task: 'Validate component code',
    model: 'claude-haiku-4',
    reason: 'Pattern matching, fast validation',
    estimatedCost: 0.001
  },

  // Sonnet: Balanced, most tasks
  'brand-strategy': {
    task: 'Generate brand strategy',
    model: 'claude-sonnet-4',
    reason: 'Requires creativity and structure',
    estimatedCost: 0.015
  },
  'component-generation': {
    task: 'Generate React components',
    model: 'claude-sonnet-4',
    reason: 'Code generation with best practices',
    estimatedCost: 0.020
  },
  'nft-design': {
    task: 'Generate NFT artwork',
    model: 'claude-sonnet-4',
    reason: 'Visual design requires quality output',
    estimatedCost: 0.025
  },

  // Opus: Complex, high-value tasks
  'architecture-design': {
    task: 'Design system architecture',
    model: 'claude-opus-4',
    reason: 'Complex reasoning, critical decisions',
    estimatedCost: 0.075
  },
  'code-review': {
    task: 'Comprehensive code review',
    model: 'claude-opus-4',
    reason: 'Deep analysis, security considerations',
    estimatedCost: 0.060
  }
};
```

### Automatic Switching Logic
```typescript
export async function routeToOptimalModel(
  task: string,
  context: {
    complexity?: 'low' | 'medium' | 'high';
    budget?: number;
    priority?: 'speed' | 'quality' | 'cost';
  }
): Promise<ModelRoute> {
  // Check predefined routes
  if (MODEL_ROUTING[task]) {
    return MODEL_ROUTING[task];
  }

  // Analyze task complexity
  const complexity = context.complexity || await analyzeTaskComplexity(task);

  // Route based on priority
  if (context.priority === 'cost') {
    return complexity === 'high'
      ? MODEL_ROUTING['brand-strategy'] // Sonnet
      : MODEL_ROUTING['token-generation']; // Haiku
  }

  if (context.priority === 'speed') {
    return MODEL_ROUTING['token-generation']; // Haiku (fastest)
  }

  // Default: Quality-based routing
  const modelMap = {
    low: 'claude-haiku-4',
    medium: 'claude-sonnet-4',
    high: 'claude-opus-4'
  };

  return {
    task,
    model: modelMap[complexity],
    reason: `Task complexity: ${complexity}`,
    estimatedCost: estimateCost(modelMap[complexity], task)
  };
}
```

## Usage Tracking

### CLAUDE_USAGE.md Format
```markdown
# Claude API Usage Report

**Generated**: 2025-12-04 18:30:00 PST
**Period**: Last 24 hours

## Summary

| Metric | Value |
|--------|-------|
| Total Requests | 1,247 |
| Total Tokens (Input) | 2,345,678 |
| Total Tokens (Output) | 567,890 |
| Total Cost | $45.67 |

## Model Breakdown

### Claude Opus 4
- Requests: 23
- Input Tokens: 234,567
- Output Tokens: 45,678
- Cost: $18.90
- Tasks: Architecture design (12), Code review (11)

### Claude Sonnet 4
- Requests: 892
- Input Tokens: 1,890,234
- Output Tokens: 456,789
- Cost: $23.45
- Tasks: Brand generation (450), Component generation (442)

### Claude Haiku 4
- Requests: 332
- Input Tokens: 220,877
- Output Tokens: 65,423
- Cost: $3.32
- Tasks: Token validation (180), Simple queries (152)

## Top Operations

1. **Brand Generation** - 450 requests, $12.34
2. **Component Generation** - 442 requests, $9.87
3. **Token Validation** - 180 requests, $1.20
4. **Architecture Design** - 12 requests, $8.90
5. **Code Review** - 11 requests, $7.89

## Cost Optimization Opportunities

- ⚠️ 45 Opus requests could be downgraded to Sonnet (Save $12.30)
- ✅ Haiku usage is optimal for simple tasks
- 💡 Consider caching for repeated brand queries (Save ~$5/day)

## Trends

- Token usage increased 15% from yesterday
- Opus usage decreased 8% (good!)
- Average cost per request: $0.037
```

### Automatic Tracking
```typescript
// lib/claude/usage-tracker.ts
export class ClaudeUsageTracker {
  private usageLog: UsageEntry[] = [];

  async trackRequest(request: {
    model: string;
    task: string;
    inputTokens: number;
    outputTokens: number;
    cost: number;
  }) {
    this.usageLog.push({
      timestamp: new Date(),
      ...request
    });

    // Write to CLAUDE_USAGE.md after each request
    await this.updateUsageReport();
  }

  async updateUsageReport() {
    const report = this.generateMarkdownReport();
    await fs.writeFile('CLAUDE_USAGE.md', report);
  }

  generateMarkdownReport(): string {
    // Generate report from usageLog
    // ... (see format above)
  }

  async generateChangelogSummary(): Promise<string> {
    const last24h = this.usageLog.filter(
      entry => entry.timestamp > new Date(Date.now() - 24 * 60 * 60 * 1000)
    );

    const totalCost = last24h.reduce((sum, e) => sum + e.cost, 0);
    const totalTokens = last24h.reduce(
      (sum, e) => sum + e.inputTokens + e.outputTokens,
      0
    );

    return `
### Claude API Usage (Last 24h)
- **Total Requests**: ${last24h.length}
- **Total Tokens**: ${totalTokens.toLocaleString()}
- **Total Cost**: $${totalCost.toFixed(2)}
- **Primary Model**: ${this.getPrimaryModel(last24h)}
    `.trim();
  }
}
```

## CLAUDE.md Prompt Configuration

### Prompt Format with Model Selection
```markdown
<!-- CLAUDE.md -->

# Brand Generation Prompt

**Model**: auto (Sonnet for quality, Haiku if under budget)
**Max Tokens**: 4000
**Temperature**: 0.7
**Budget**: $0.05 max per generation

## Task
Generate a complete brand package for {brandName} in {industry}.

## Complexity Analysis
- Brand strategy: Medium (Sonnet)
- Logo generation: High (Opus or external API)
- Token generation: Low (Haiku)
- Component generation: Medium (Sonnet)

## Routing
```yaml
tasks:
  - name: brand-strategy
    model: claude-sonnet-4
    estimated_cost: $0.015

  - name: token-generation
    model: claude-haiku-4
    estimated_cost: $0.002

  - name: component-generation
    model: claude-sonnet-4
    estimated_cost: $0.020
```

Total Estimated Cost: $0.037
```

## GitHub Workflow Integration

### `.github/workflows/claude-usage-tracking.yml`
```yaml
name: Claude Usage Tracking

on:
  push:
    branches: [main, develop]
  schedule:
    - cron: '0 */6 * * *' # Every 6 hours

jobs:
  update-usage:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Generate Usage Report
        run: |
          node scripts/generate-claude-usage-report.js

      - name: Update CHANGELOG.md
        run: |
          node scripts/update-changelog-with-usage.js

      - name: Commit Changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add CLAUDE_USAGE.md CHANGELOG.md
          git commit -m "Update Claude usage tracking [skip ci]" || echo "No changes"
          git push
```

### `scripts/generate-claude-usage-report.js`
```javascript
const fs = require('fs');
const { ClaudeUsageTracker } = require('../lib/claude/usage-tracker');

async function main() {
  const tracker = new ClaudeUsageTracker();
  await tracker.loadFromDatabase();

  const report = tracker.generateMarkdownReport();
  fs.writeFileSync('CLAUDE_USAGE.md', report);

  console.log('✅ CLAUDE_USAGE.md updated');
}

main();
```

### `scripts/update-changelog-with-usage.js`
```javascript
const fs = require('fs');
const { ClaudeUsageTracker } = require('../lib/claude/usage-tracker');

async function main() {
  const tracker = new ClaudeUsageTracker();
  await tracker.loadFromDatabase();

  const usageSummary = await tracker.generateChangelogSummary();

  // Read CHANGELOG.md
  const changelog = fs.readFileSync('CHANGELOG.md', 'utf-8');

  // Find the latest version section
  const versionRegex = /## \[v\d+\.\d+\.\d+\]/;
  const match = changelog.match(versionRegex);

  if (match) {
    const insertPoint = changelog.indexOf(match[0]) + match[0].length;
    const before = changelog.slice(0, insertPoint);
    const after = changelog.slice(insertPoint);

    // Insert usage summary
    const updated = `${before}\n\n${usageSummary}\n${after}`;
    fs.writeFileSync('CHANGELOG.md', updated);

    console.log('✅ CHANGELOG.md updated with Claude usage');
  }
}

main();
```

## Deliverables

- [ ] `lib/claude/model-router.ts` - Intelligent model selection
- [ ] `lib/claude/usage-tracker.ts` - Usage tracking and reporting
- [ ] `lib/claude/cost-optimizer.ts` - Cost analysis and suggestions
- [ ] `scripts/generate-claude-usage-report.js` - Report generator
- [ ] `scripts/update-changelog-with-usage.js` - CHANGELOG updater
- [ ] `.github/workflows/claude-usage-tracking.yml` - CI automation
- [ ] `CLAUDE_USAGE.md` - Usage report template
- [ ] Update all CLAUDE.md prompts with model hints

## Success Metrics

### Cost Optimization
- **Target**: 30% cost reduction vs. Opus-only
- **Haiku usage**: >40% of requests
- **Sonnet usage**: 50-55% of requests
- **Opus usage**: <5% of requests (critical tasks only)

### Tracking Accuracy
- **100% request coverage**: Every Claude API call tracked
- **Real-time updates**: CLAUDE_USAGE.md updates within 1 second
- **CHANGELOG integration**: Auto-update on every commit
- **Daily reports**: Automated summary emails

### Performance
- **Routing decision**: <10ms overhead
- **Report generation**: <500ms
- **Zero failed requests**: Due to incorrect model routing

## Example CHANGELOG Integration

```markdown
## [v0.3.0] - 2025-12-11

### Added
- Auto-deploy system with Cloudflare Pages
- NFT rarity system with deterministic seeds
- Preview deployments with tier-based duration

### Claude API Usage (Last 24h)
- **Total Requests**: 1,247
- **Total Tokens**: 2,913,568
- **Total Cost**: $45.67
- **Primary Model**: Claude Sonnet 4 (71% of requests)
- **Cost Savings**: $23.40 vs. Opus-only (34% reduction)

### Performance
- Average deployment time: 87s (target: <90s)
- NFT generation: 2.3s (target: <3s)
```

**Dependencies**: None (foundational infrastructure)
**Benefits**: Reduces Claude API costs by 30-40% while maintaining quality
