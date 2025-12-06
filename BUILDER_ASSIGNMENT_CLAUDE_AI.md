# Builder Assignment: Claude AI Integration

**Assigned To:** Available / AI Integration Specialist
**Branch:** `claude/claude-ai-integration-016s6daPN3GTf1C8DFmdhmU9`
**Parent:** `claude/phase-1-coordinator-agent-016s6daPN3GTf1C8DFmdhmU9`
**Priority:** P0 (CRITICAL - Blocks all brand generation)
**Estimated Time:** 2-3 hours
**Dependencies:** None (can start immediately)

---

## 🎯 Feature Goal

Integrate Anthropic's Claude AI SDK to enable brand analysis and generation. This is the **core intelligence** of MACHUPS - it analyzes business ideas and generates comprehensive brand strategies.

---

## ✅ Acceptance Criteria

- [ ] Claude SDK properly initialized with API key from environment
- [ ] `analyzeBrand()` function working end-to-end
- [ ] Brand analysis returns valid JSON matching `BrandAnalysis` interface
- [ ] Prompt templates integrated from `prompts/brand-generation.md`
- [ ] Error handling for API failures, rate limits, invalid responses
- [ ] TypeScript types for all interfaces
- [ ] Integration test passes
- [ ] Documentation complete

---

## 🛠️ Files to Create

### 1. `lib/ai/types.ts` - TypeScript Interfaces

**Purpose:** Define all TypeScript interfaces for brand analysis

```typescript
/**
 * Input to brand analysis
 */
export interface BrandInput {
  businessIdea: string;
  targetAudience: string;
  style: 'modern' | 'classic' | 'bold' | 'minimal';
  industry?: string;
  techStack?: 'nextjs' | 'react-typescript' | 'vue' | 'html';
}

/**
 * Brand analysis output from Claude AI
 */
export interface BrandAnalysis {
  brandName: string;
  tagline: string;
  colors: {
    primary: string; // Hex code
    secondary: string;
    accent: string;
    neutralLight: string;
    neutralDark: string;
  };
  typography: {
    headingFont: string; // Font family name
    bodyFont: string;
    monoFont: string;
    headingWeight: number;
    bodyWeight: number;
  };
  personality: string[]; // 3-5 adjectives
  targetAudience: {
    demographics: string;
    psychographics: string;
    behaviors: string[];
  };
  messaging: {
    voiceTone: string;
    keyMessages: string[];
  };
  visualStyle: {
    aesthetic: string;
    iconography: string;
    patterns: string[];
  };
}

/**
 * Error types for Claude AI
 */
export class ClaudeAIError extends Error {
  constructor(
    message: string,
    public code: 'API_ERROR' | 'RATE_LIMIT' | 'INVALID_RESPONSE' | 'NETWORK_ERROR',
    public retryable: boolean = false
  ) {
    super(message);
    this.name = 'ClaudeAIError';
  }
}
```

---

### 2. `lib/ai/prompts.ts` - Prompt Template Helpers

**Purpose:** Load and render prompt templates

```typescript
import fs from 'fs';
import path from 'path';

/**
 * Load prompt template from file
 */
export function loadPromptTemplate(templateName: string): string {
  const templatePath = path.join(
    process.cwd(),
    'prompts',
    `${templateName}.md`
  );

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Prompt template not found: ${templateName}`);
  }

  return fs.readFileSync(templatePath, 'utf-8');
}

/**
 * Render prompt template with variables
 */
export function renderPrompt(
  template: string,
  variables: Record<string, string>
): string {
  let rendered = template;

  for (const [key, value] of Object.entries(variables)) {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    rendered = rendered.replace(placeholder, value);
  }

  return rendered;
}

/**
 * Get system prompt for brand analysis
 */
export function getBrandAnalysisSystemPrompt(): string {
  return loadPromptTemplate('brand-generation');
}

/**
 * Get user prompt for brand analysis
 */
export function getBrandAnalysisUserPrompt(input: BrandInput): string {
  const template = `
Analyze this business idea and generate a complete brand strategy:

**Business Idea:** {{businessIdea}}

**Target Audience:** {{targetAudience}}

**Style Preference:** {{style}} (modern/classic/bold/minimal)

**Industry:** {{industry}}

Please provide a comprehensive brand analysis in JSON format matching the BrandAnalysis interface.
  `.trim();

  return renderPrompt(template, {
    businessIdea: input.businessIdea,
    targetAudience: input.targetAudience,
    style: input.style,
    industry: input.industry || 'General',
  });
}
```

---

### 3. `lib/ai/claude.ts` - Main Claude Client

**Purpose:** Claude SDK wrapper with brand analysis function

```typescript
import Anthropic from '@anthropic-ai/sdk';
import type { BrandInput, BrandAnalysis } from './types';
import { ClaudeAIError } from './types';
import {
  getBrandAnalysisSystemPrompt,
  getBrandAnalysisUserPrompt,
} from './prompts';

/**
 * Claude AI Client Configuration
 */
export interface ClaudeClientConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

/**
 * Claude AI Client for Brand Analysis
 */
export class ClaudeClient {
  private client: Anthropic;
  private config: Required<ClaudeClientConfig>;

  constructor(config: ClaudeClientConfig) {
    this.config = {
      apiKey: config.apiKey,
      model: config.model || 'claude-sonnet-4-5-20250929',
      maxTokens: config.maxTokens || 4096,
      temperature: config.temperature || 0.7,
    };

    this.client = new Anthropic({
      apiKey: this.config.apiKey,
    });
  }

  /**
   * Analyze business idea and generate brand strategy
   */
  async analyzeBrand(input: BrandInput): Promise<BrandAnalysis> {
    try {
      const systemPrompt = getBrandAnalysisSystemPrompt();
      const userPrompt = getBrandAnalysisUserPrompt(input);

      const response = await this.client.messages.create({
        model: this.config.model,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      });

      // Extract text from response
      const content = response.content[0];
      if (content.type !== 'text') {
        throw new ClaudeAIError(
          'Unexpected response type from Claude',
          'INVALID_RESPONSE'
        );
      }

      // Parse JSON from response
      const brandAnalysis = this.parseBrandAnalysis(content.text);

      // Validate response
      this.validateBrandAnalysis(brandAnalysis);

      return brandAnalysis;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Parse brand analysis JSON from Claude response
   */
  private parseBrandAnalysis(responseText: string): BrandAnalysis {
    try {
      // Claude might wrap JSON in markdown code blocks
      let jsonText = responseText;

      // Remove markdown code blocks if present
      const codeBlockMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
      if (codeBlockMatch) {
        jsonText = codeBlockMatch[1];
      }

      return JSON.parse(jsonText) as BrandAnalysis;
    } catch (error) {
      throw new ClaudeAIError(
        `Failed to parse brand analysis JSON: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'INVALID_RESPONSE'
      );
    }
  }

  /**
   * Validate brand analysis structure
   */
  private validateBrandAnalysis(analysis: BrandAnalysis): void {
    const required = [
      'brandName',
      'tagline',
      'colors',
      'typography',
      'personality',
      'targetAudience',
      'messaging',
      'visualStyle',
    ];

    for (const field of required) {
      if (!(field in analysis)) {
        throw new ClaudeAIError(
          `Missing required field in brand analysis: ${field}`,
          'INVALID_RESPONSE'
        );
      }
    }

    // Validate color format (hex codes)
    const hexRegex = /^#[0-9A-F]{6}$/i;
    const colors = analysis.colors;
    for (const [colorName, colorValue] of Object.entries(colors)) {
      if (!hexRegex.test(colorValue)) {
        throw new ClaudeAIError(
          `Invalid hex color for ${colorName}: ${colorValue}`,
          'INVALID_RESPONSE'
        );
      }
    }

    // Validate personality has 3-5 items
    if (analysis.personality.length < 3 || analysis.personality.length > 5) {
      throw new ClaudeAIError(
        'Personality must have 3-5 adjectives',
        'INVALID_RESPONSE'
      );
    }
  }

  /**
   * Handle errors from Claude API
   */
  private handleError(error: unknown): never {
    if (error instanceof ClaudeAIError) {
      throw error;
    }

    if (error instanceof Anthropic.APIError) {
      if (error.status === 429) {
        throw new ClaudeAIError(
          'Rate limit exceeded. Please try again later.',
          'RATE_LIMIT',
          true // retryable
        );
      }

      throw new ClaudeAIError(
        `Claude API error: ${error.message}`,
        'API_ERROR',
        false
      );
    }

    if (error instanceof Error) {
      throw new ClaudeAIError(
        `Unexpected error: ${error.message}`,
        'NETWORK_ERROR',
        true
      );
    }

    throw new ClaudeAIError(
      'Unknown error occurred',
      'NETWORK_ERROR',
      false
    );
  }
}

/**
 * Factory function to create Claude client from environment
 */
export function createClaudeClient(
  config?: Partial<ClaudeClientConfig>
): ClaudeClient {
  const apiKey = process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error(
      'Claude API key not found. Set CLAUDE_API_KEY or ANTHROPIC_API_KEY environment variable.'
    );
  }

  return new ClaudeClient({
    apiKey,
    ...config,
  });
}

/**
 * Convenience function for one-off brand analysis
 */
export async function analyzeBrand(
  input: BrandInput
): Promise<BrandAnalysis> {
  const client = createClaudeClient();
  return client.analyzeBrand(input);
}
```

---

### 4. `lib/ai/index.ts` - Barrel Exports

**Purpose:** Export all AI-related modules

```typescript
export * from './types';
export * from './prompts';
export * from './claude';
```

---

## 📝 Implementation Steps

### Step 1: Create Directory Structure
```bash
mkdir -p lib/ai
cd lib/ai
```

### Step 2: Install Dependencies
```bash
# Claude SDK should already be in package.json
# If not:
pnpm add @anthropic-ai/sdk
```

### Step 3: Create TypeScript Files
Follow the file templates above to create:
1. `lib/ai/types.ts`
2. `lib/ai/prompts.ts`
3. `lib/ai/claude.ts`
4. `lib/ai/index.ts`

### Step 4: Update Environment Variables
Ensure `.env.example` has:
```bash
CLAUDE_API_KEY=sk-ant-xxx
# OR
ANTHROPIC_API_KEY=sk-ant-xxx
```

### Step 5: Update Orchestrator
Replace TODO at line 206 in `lib/orchestrator/brand-orchestrator.ts`:

**Before:**
```typescript
// TODO: Implement actual Claude AI integration
// const claude = new ClaudeClient(this.config.claudeApiKey);
// const analysis = await claude.analyzeBrand(input);
```

**After:**
```typescript
import { createClaudeClient } from '../ai/claude';

// In analyzeBrand method:
const claude = createClaudeClient({ apiKey: this.config.claudeApiKey });
const analysis = await claude.analyzeBrand(input);
return analysis;
```

---

## 🧪 Testing Requirements

### Manual Test Script

Create `scripts/test-claude-integration.ts`:

```typescript
import { analyzeBrand } from '../lib/ai/claude';

async function testClaudeIntegration() {
  console.log('Testing Claude AI Integration...\n');

  try {
    const result = await analyzeBrand({
      businessIdea: 'AI-powered task management for developers',
      targetAudience: 'Software engineers and dev teams',
      style: 'modern',
      industry: 'SaaS',
    });

    console.log('✅ Brand Analysis Success!\n');
    console.log('Brand Name:', result.brandName);
    console.log('Tagline:', result.tagline);
    console.log('Primary Color:', result.colors.primary);
    console.log('Personality:', result.personality.join(', '));
    console.log('\nFull Analysis:');
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('❌ Test Failed:', error);
    process.exit(1);
  }
}

testClaudeIntegration();
```

Run test:
```bash
tsx scripts/test-claude-integration.ts
```

**Expected Output:**
```
Testing Claude AI Integration...

✅ Brand Analysis Success!

Brand Name: DevFlow
Tagline: Streamline your development workflow
Primary Color: #3B82F6
Personality: Innovative, Efficient, Developer-friendly

Full Analysis:
{
  "brandName": "DevFlow",
  "tagline": "Streamline your development workflow",
  "colors": { ... },
  ...
}
```

---

## 🐛 Error Handling Test Cases

Test these scenarios:

1. **Missing API Key**
```typescript
// Should throw: "Claude API key not found"
delete process.env.CLAUDE_API_KEY;
await analyzeBrand(input);
```

2. **Rate Limit**
```typescript
// Mock 429 response
// Should throw: ClaudeAIError with RATE_LIMIT code
```

3. **Invalid JSON Response**
```typescript
// Mock malformed JSON
// Should throw: ClaudeAIError with INVALID_RESPONSE code
```

4. **Network Error**
```typescript
// Disconnect network
// Should throw: ClaudeAIError with NETWORK_ERROR code
```

---

## 📚 Documentation

Update `docs/API_REFERENCE.md`:

```markdown
## Claude AI Integration

### `analyzeBrand(input: BrandInput): Promise<BrandAnalysis>`

Analyzes a business idea and generates a comprehensive brand strategy using Claude AI.

**Parameters:**
- `input.businessIdea` - Description of the business (required)
- `input.targetAudience` - Target audience description (required)
- `input.style` - Visual style preference: 'modern', 'classic', 'bold', or 'minimal' (required)
- `input.industry` - Industry category (optional)

**Returns:**
`BrandAnalysis` object containing:
- Brand name and tagline
- Color palette (primary, secondary, accent, neutrals)
- Typography recommendations
- Brand personality traits
- Target audience profile
- Messaging strategy
- Visual style direction

**Example:**
\`\`\`typescript
import { analyzeBrand } from '@/lib/ai';

const brand = await analyzeBrand({
  businessIdea: 'Sustainable coffee delivery service',
  targetAudience: 'Eco-conscious urban professionals',
  style: 'modern',
  industry: 'Food & Beverage'
});

console.log(brand.brandName); // "EcoBrew"
console.log(brand.colors.primary); // "#10B981"
\`\`\`

**Errors:**
- `ClaudeAIError` with code 'API_ERROR' - API request failed
- `ClaudeAIError` with code 'RATE_LIMIT' - Rate limit exceeded (retryable)
- `ClaudeAIError` with code 'INVALID_RESPONSE' - Response parsing failed
- `ClaudeAIError` with code 'NETWORK_ERROR' - Network issue (retryable)
```

---

## 🔀 Merge Instructions

### Before Merging

- [ ] All files created (`lib/ai/*.ts`)
- [ ] Test script passes
- [ ] Orchestrator updated (TODO removed)
- [ ] Environment variables documented
- [ ] API documentation added
- [ ] No TypeScript errors
- [ ] No ESLint errors

### Create Pull Request

```bash
git add lib/ai/
git add lib/orchestrator/brand-orchestrator.ts
git add scripts/test-claude-integration.ts
git add docs/API_REFERENCE.md
git commit -m "feat(ai): integrate Claude SDK for brand analysis

- Add Claude AI client with brand analysis function
- Add TypeScript interfaces for BrandInput and BrandAnalysis
- Add prompt template helpers
- Update brand orchestrator to use Claude AI
- Add integration test script
- Add comprehensive error handling"

git push origin claude/claude-ai-integration-016s6daPN3GTf1C8DFmdhmU9
```

Create PR with title:
**"feat(phase-1): Claude AI Integration Complete"**

---

## 📞 Support

**Questions?** Comment on this issue or ask in #phase-1 channel

**Blocked?** Tag @coordinator or @tech-lead

**Need API Key?** Check team shared credentials or create new one at https://console.anthropic.com

---

## ✨ Success Looks Like

When this task is complete:

✅ Can call `analyzeBrand()` with business idea
✅ Returns valid brand strategy in <30 seconds
✅ Colors are valid hex codes
✅ Personality has 3-5 adjectives
✅ Error handling catches all failure modes
✅ Integration test passes
✅ Orchestrator can generate brands end-to-end

---

**Estimated Time:** 2-3 hours
**Priority:** P0 (CRITICAL - Blocks all brand generation)
**Status:** Ready to Start
**Builder:** [Your Name Here]

Good luck! 🚀
