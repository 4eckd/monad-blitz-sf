# 🛠️ MACHUPS Phase 2 Developer Guide

**For Agent Developers Building Feature Branches**

Version: 1.0
Date: December 6, 2025
Status: Active Development

---

## 🎯 Welcome, Agent Developer!

You're part of the MACHUPS Phase 2 team building the core AI generation engine. This guide will help you:

- Understand your specific feature assignment
- Set up your development environment quickly
- Follow code standards and best practices
- Avoid common pitfalls
- Successfully merge your work

---

## 📚 Quick Start Checklist

Before you start coding:

- [ ] Read this entire guide (10 minutes)
- [ ] Review [PHASE_2_TEAM_BRIEF.md](/PHASE_2_TEAM_BRIEF.md) for context
- [ ] Check which feature you're assigned to
- [ ] Verify your local environment is set up
- [ ] Create your feature branch
- [ ] Review the code template for your feature
- [ ] Run the test suite to ensure baseline passes

---

## 🌿 Feature Branch Assignments

### Feature 1: Brand Analyzer
**Branch:** `feature/brand-analyzer`
**Duration:** 1-2 hours
**Dependencies:** None (Phase 1 complete)
**Owner:** _Assign yourself_

**What You're Building:**
- Claude AI integration for strategic brand analysis
- Brand name generation
- Color palette generation (WCAG AA compliant)
- Typography recommendations
- Brand personality analysis

**Output:**
```typescript
interface BrandAnalysis {
  name: string;              // e.g., "Gonads"
  tagline: string;           // e.g., "Boldly Memetic"
  colors: {
    primary: string;         // e.g., "#FF6B00"
    secondary: string;
    accent: string;
    neutrals: string[];
  };
  typography: {
    heading: string;         // e.g., "Inter"
    body: string;
  };
  personality: string[];     // e.g., ["Bold", "Playful"]
  messaging: string[];
}
```

**Files to Create:**
- `lib/generators/brand-analyzer.ts` (main implementation)
- `lib/generators/__tests__/brand-analyzer.test.ts` (tests)
- `prompts/brand-strategy.md` (Claude AI prompt)
- `types/brand-analysis.ts` (TypeScript interfaces)

**Success Criteria:**
- ✅ Analysis completes in <30 seconds
- ✅ Colors meet WCAG AA (4.5:1 contrast minimum)
- ✅ All tests passing
- ✅ TypeScript strict mode passing

[Jump to Brand Analyzer Template →](#brand-analyzer-template)

---

### Feature 2: Logo Generator
**Branch:** `feature/logo-generator`
**Duration:** 1-2 hours
**Dependencies:** `feature/brand-analyzer`
**Owner:** _Assign yourself_

**What You're Building:**
- HTML/CSS logo generation
- SVG export
- PNG export (2x, 3x retina)
- 3 variations: wordmark, icon, combination

**Output:**
```typescript
interface LogoSet {
  wordmark: Logo;      // Text-only
  icon: Logo;          // Graphic symbol
  combination: Logo;   // Icon + text
}

interface Logo {
  svg: string;         // SVG markup
  png2x: Buffer;       // PNG at 2x
  png3x: Buffer;       // PNG at 3x
  webp: Buffer;        // WebP optimized
}
```

**Files to Create:**
- `lib/generators/logo-generator.ts`
- `lib/generators/logo-templates.ts`
- `lib/generators/__tests__/logo-generator.test.ts`
- `lib/utils/html-to-image.ts`

**Success Criteria:**
- ✅ Generates 3 logos in <45 seconds
- ✅ SVG exports are valid XML
- ✅ PNGs are crisp at all resolutions
- ✅ Uses brand colors from analyzer

[Jump to Logo Generator Template →](#logo-generator-template)

---

### Feature 3: Token Generator
**Branch:** `feature/token-generator`
**Duration:** 1 hour
**Dependencies:** `feature/brand-analyzer`
**Owner:** _Assign yourself_

**What You're Building:**
- W3C DTCG compliant design tokens
- Multi-format export (JSON, CSS, SCSS, Tailwind)
- WCAG validation
- Color system generation

**Output:**
```typescript
interface DesignTokens {
  $schema: string;
  color: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  borderRadius: BorderRadiusTokens;
  shadow: ShadowTokens;
}
```

**Files to Create:**
- `lib/generators/token-generator.ts`
- `lib/exporters/token-exporters.ts`
- `lib/validators/wcag-validator.ts`
- `lib/generators/__tests__/token-generator.test.ts`

**Success Criteria:**
- ✅ Generates tokens in <15 seconds
- ✅ W3C DTCG schema compliant
- ✅ All 4 export formats working
- ✅ 100% WCAG AA compliance

[Jump to Token Generator Template →](#token-generator-template)

---

### Feature 4: Component Generator
**Branch:** `feature/component-generator`
**Duration:** 2 hours
**Dependencies:** `feature/token-generator`
**Owner:** _Assign yourself_

**What You're Building:**
- 30+ production-ready React components
- TypeScript definitions
- Accessibility features (ARIA, keyboard nav)
- Responsive design
- Dark mode support

**Output:**
```typescript
interface ComponentLibrary {
  atoms: Component[];      // 10 components
  molecules: Component[];  // 10 components
  organisms: Component[];  // 10 components
}

interface Component {
  name: string;
  code: string;           // React TSX
  types: string;          // TypeScript definitions
  tests: string;          // Jest tests
}
```

**Files to Create:**
- `lib/generators/component-generator.ts`
- `lib/templates/component-templates.ts`
- `lib/generators/__tests__/component-generator.test.ts`
- `lib/utils/tsx-builder.ts`

**Success Criteria:**
- ✅ Generates 30+ components in <60 seconds
- ✅ All components have TypeScript types
- ✅ ARIA labels and keyboard navigation
- ✅ Responsive and accessible

[Jump to Component Generator Template →](#component-generator-template)

---

### Feature 5: Integration Pipeline
**Branch:** `feature/integration-pipeline`
**Duration:** 1 hour
**Dependencies:** ALL features above
**Owner:** _Assign yourself_

**What You're Building:**
- Orchestrate all generators
- Real-time progress tracking
- Error handling and retries
- Parallel execution optimization

**Files to Update:**
- `lib/orchestrator/brand-orchestrator.ts` (enhance existing)
- `app/api/generate/route.ts` (complete implementation)
- `app/generate/[id]/page.tsx` (progress UI)

**Success Criteria:**
- ✅ Complete pipeline <3 minutes
- ✅ Real-time progress updates
- ✅ Graceful error handling
- ✅ All generators integrated

[Jump to Integration Template →](#integration-pipeline-template)

---

## 🔧 Environment Setup

### Prerequisites

```bash
# Verify Node.js version
node --version  # Should be v18+

# Verify pnpm
pnpm --version  # Should be v8+

# Verify git
git --version
```

### Local Development Setup

```bash
# 1. Ensure you're on the correct branch
git checkout claude/machups-feature-branch-support-018TQxLKAQXTXTGR386MveqZ

# 2. Install dependencies
pnpm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Add required API keys to .env.local
# CLAUDE_API_KEY=sk-ant-xxx
# (See .env.example for full list)

# 5. Run tests to verify setup
pnpm test

# 6. Build to verify everything compiles
pnpm build
```

### Environment Variables Required

```bash
# AI & MCP
CLAUDE_API_KEY=sk-ant-xxx           # Required for brand analyzer
PENPOT_MCP_URL=xxx                  # Required for mockups

# App (these may already be set)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📋 Development Workflow

### Step 1: Create Your Feature Branch

```bash
# Ensure you're up to date
git checkout main
git pull origin main

# Create phase-2-core-engine if it doesn't exist
git checkout -b phase-2-core-engine

# Create your feature branch
git checkout -b feature/brand-analyzer  # Or your assigned feature
git push -u origin feature/brand-analyzer
```

### Step 2: Implement Your Feature

1. **Review the code template** for your feature (see templates below)
2. **Copy the template** to the correct file location
3. **Implement the logic** following the template structure
4. **Write tests** as you go (TDD preferred)
5. **Test locally** frequently

### Step 3: Testing Checklist

Before committing, run these commands:

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Fix linting issues automatically
pnpm lint:fix

# Run tests
pnpm test

# Run tests in watch mode while developing
pnpm test:watch

# Build to ensure no build errors
pnpm build
```

### Step 4: Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with conventional commit message
git commit -m "feat(brand-analyzer): implement Claude AI strategic analysis"

# Push to your feature branch
git push origin feature/brand-analyzer
```

### Step 5: Create Pull Request

Use this PR template:

```markdown
## Phase 2: Brand Analyzer

### Description
Implements strategic brand analysis using Claude AI

### Type
- [x] New feature
- [ ] Bug fix
- [ ] Enhancement

### Implementation
- Created `lib/generators/brand-analyzer.ts` with Claude AI integration
- Implemented WCAG AA color validation
- Added comprehensive test suite
- Documented all public APIs with JSDoc

### Testing
- [x] Unit tests pass (10/10)
- [x] Integration tests pass
- [x] Performance <30s validated
- [x] WCAG AA compliance verified

### Dependencies
- Depends on: Phase 1 infrastructure
- Blocks: feature/logo-generator

### Checklist
- [x] TypeScript strict mode passing
- [x] No inline CSS/HTML
- [x] JSDoc comments on all exports
- [x] Tests pass
- [x] Build succeeds
- [x] Documentation updated
```

### Step 6: Merge to Phase Branch

After PR approval:

```bash
# Switch to phase-2-core-engine
git checkout phase-2-core-engine
git pull origin phase-2-core-engine

# Merge your feature (squash for clean history)
git merge --squash feature/brand-analyzer
git commit -m "feat(phase-2): add brand analyzer

- Claude AI strategic analysis
- WCAG AA color validation
- Comprehensive test coverage
- <30s performance target met"

# Push to phase branch
git push origin phase-2-core-engine

# Delete feature branch
git branch -d feature/brand-analyzer
git push origin --delete feature/brand-analyzer
```

---

## 🎨 Code Standards

### Design System Compliance

**✅ DO THIS:**

```typescript
// Use design system components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function BrandForm() {
  return (
    <form className="space-y-md">
      <Input
        label="Business Idea"
        placeholder="Enter your business idea"
      />
      <Button variant="primary" type="submit">
        Generate Brand
      </Button>
    </form>
  );
}
```

**❌ DON'T DO THIS:**

```typescript
// Inline styles are forbidden
export function BrandForm() {
  return (
    <form style={{ padding: '20px', gap: '16px' }}>
      <input
        style={{ border: '1px solid #ccc', padding: '8px' }}
        placeholder="Enter your business idea"
      />
      <button style={{ background: 'blue', color: 'white' }}>
        Generate
      </button>
    </form>
  );
}
```

### TypeScript Best Practices

**✅ DO THIS:**

```typescript
/**
 * Analyzes brand strategy using Claude AI
 * @param input - Brand input parameters
 * @returns Comprehensive brand analysis
 * @throws {Error} If Claude API fails
 */
export async function analyzeBrand(
  input: BrandInput
): Promise<BrandAnalysis> {
  // Validate input
  if (!input.businessIdea?.trim()) {
    throw new Error('Business idea is required');
  }

  // Implementation with proper error handling
  try {
    const result = await claudeClient.analyze(input);
    return result;
  } catch (error) {
    console.error('Brand analysis failed:', error);
    throw new Error('Failed to analyze brand');
  }
}
```

**❌ DON'T DO THIS:**

```typescript
// No types, no docs, poor error handling
export async function analyzeBrand(input: any): Promise<any> {
  const result = await claudeClient.analyze(input);
  return result;
}
```

### Testing Best Practices

**✅ DO THIS:**

```typescript
// lib/generators/__tests__/brand-analyzer.test.ts
import { analyzeBrand } from '../brand-analyzer';

describe('analyzeBrand', () => {
  it('should generate valid brand name', async () => {
    const result = await analyzeBrand({
      businessIdea: 'Sustainable coffee delivery',
      targetAudience: 'Urban professionals',
      style: 'modern'
    });

    expect(result.name).toBeDefined();
    expect(result.name.length).toBeGreaterThan(0);
    expect(result.name.length).toBeLessThan(30);
  });

  it('should ensure WCAG AA color contrast', async () => {
    const result = await analyzeBrand({
      businessIdea: 'Test business',
      targetAudience: 'Test audience',
      style: 'modern'
    });

    const contrast = calculateContrast(
      result.colors.primary,
      '#FFFFFF'
    );

    expect(contrast).toBeGreaterThan(4.5); // WCAG AA
  });

  it('should handle invalid input gracefully', async () => {
    await expect(
      analyzeBrand({ businessIdea: '', targetAudience: '', style: 'modern' })
    ).rejects.toThrow('Business idea is required');
  });
});
```

---

## 📝 Code Templates

### Brand Analyzer Template

Create: `lib/generators/brand-analyzer.ts`

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { BrandInput, BrandAnalysis } from '@/types/brand';
import { validateWCAGColors } from '@/lib/validators/wcag-validator';

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!
});

/**
 * Analyzes brand strategy using Claude AI
 * Generates brand name, colors, typography, and personality
 *
 * @param input - Brand input parameters
 * @returns Strategic brand analysis
 * @throws {Error} If analysis fails or input is invalid
 */
export async function analyzeBrand(
  input: BrandInput
): Promise<BrandAnalysis> {
  // Validate input
  if (!input.businessIdea?.trim()) {
    throw new Error('Business idea is required');
  }

  if (!input.targetAudience?.trim()) {
    throw new Error('Target audience is required');
  }

  // Build prompt from template
  const prompt = buildBrandStrategyPrompt(input);

  try {
    // Call Claude API
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      temperature: 0.7,
      system: BRAND_STRATEGY_SYSTEM_PROMPT,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    // Parse response
    const analysis = parseClaudeResponse(response);

    // Validate WCAG AA compliance
    const validatedColors = await validateWCAGColors(analysis.colors);
    analysis.colors = validatedColors;

    return analysis;
  } catch (error) {
    console.error('Brand analysis failed:', error);
    throw new Error('Failed to analyze brand. Please try again.');
  }
}

/**
 * Builds the Claude AI prompt from input parameters
 */
function buildBrandStrategyPrompt(input: BrandInput): string {
  return `
Analyze this business idea and generate a comprehensive brand strategy:

Business Idea: ${input.businessIdea}
Target Audience: ${input.targetAudience}
Style Preference: ${input.style}
${input.industry ? `Industry: ${input.industry}` : ''}

Generate:
1. Brand Name (memorable, 1-2 words, related to the business)
2. Tagline (compelling, under 60 characters)
3. Color Palette:
   - Primary color (hex code)
   - Secondary color (hex code)
   - Accent color (hex code)
   - 5 neutral shades (hex codes)
4. Typography:
   - Heading font (Google Fonts)
   - Body font (Google Fonts)
5. Brand Personality (3-5 adjectives)
6. Key Messaging Points (3-5 points)

Ensure colors are vibrant, accessible (WCAG AA), and appropriate for the ${input.style} style.

Return as JSON matching this structure:
{
  "name": "string",
  "tagline": "string",
  "colors": {
    "primary": "#HEX",
    "secondary": "#HEX",
    "accent": "#HEX",
    "neutrals": ["#HEX", "#HEX", "#HEX", "#HEX", "#HEX"]
  },
  "typography": {
    "heading": "Font Name",
    "body": "Font Name"
  },
  "personality": ["adjective", "adjective", "adjective"],
  "messaging": ["point", "point", "point"]
}
  `.trim();
}

/**
 * System prompt for Claude AI
 */
const BRAND_STRATEGY_SYSTEM_PROMPT = `
You are an expert brand strategist with 20 years of experience.
You create memorable, distinctive brands that resonate with target audiences.
You ensure all color choices meet WCAG AA accessibility standards (4.5:1 contrast).
You recommend modern, readable fonts available on Google Fonts.
You output ONLY valid JSON - no markdown, no explanations, just pure JSON.
`.trim();

/**
 * Parses Claude's response into BrandAnalysis object
 */
function parseClaudeResponse(response: Anthropic.Message): BrandAnalysis {
  const content = response.content[0];

  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude');
  }

  try {
    const json = JSON.parse(content.text);
    return json as BrandAnalysis;
  } catch (error) {
    console.error('Failed to parse Claude response:', content.text);
    throw new Error('Invalid response format from Claude');
  }
}
```

Create: `lib/generators/__tests__/brand-analyzer.test.ts`

```typescript
import { analyzeBrand } from '../brand-analyzer';
import { calculateContrast } from '@/lib/validators/wcag-validator';

describe('analyzeBrand', () => {
  it('should generate valid brand analysis', async () => {
    const result = await analyzeBrand({
      businessIdea: 'Sustainable coffee delivery service',
      targetAudience: 'Urban professionals aged 25-40',
      style: 'modern'
    });

    expect(result.name).toBeDefined();
    expect(result.tagline).toBeDefined();
    expect(result.colors.primary).toMatch(/^#[0-9A-F]{6}$/i);
    expect(result.typography.heading).toBeDefined();
    expect(result.personality).toHaveLength(3);
  }, 60000); // 60s timeout for API call

  it('should ensure WCAG AA compliance', async () => {
    const result = await analyzeBrand({
      businessIdea: 'Test business',
      targetAudience: 'Test audience',
      style: 'modern'
    });

    const contrast = calculateContrast(result.colors.primary, '#FFFFFF');
    expect(contrast).toBeGreaterThan(4.5);
  }, 60000);

  it('should throw on invalid input', async () => {
    await expect(
      analyzeBrand({ businessIdea: '', targetAudience: '', style: 'modern' })
    ).rejects.toThrow('Business idea is required');
  });
});
```

---

### Logo Generator Template

Create: `lib/generators/logo-generator.ts`

```typescript
import { BrandAnalysis, LogoSet, Logo } from '@/types/brand';
import { toPng, toSvg } from 'html-to-image';
import sharp from 'sharp';

/**
 * Generates logo variations from brand analysis
 * Creates: wordmark, icon, and combination logos
 * Exports: SVG, PNG (2x, 3x), WebP
 *
 * @param brand - Brand analysis from analyzeBrand()
 * @returns Complete logo set in multiple formats
 */
export async function generateLogos(
  brand: BrandAnalysis
): Promise<LogoSet> {
  const [wordmark, icon, combination] = await Promise.all([
    generateWordmarkLogo(brand),
    generateIconLogo(brand),
    generateCombinationLogo(brand)
  ]);

  return {
    wordmark,
    icon,
    combination
  };
}

/**
 * Generates wordmark logo (text-only)
 */
async function generateWordmarkLogo(brand: BrandAnalysis): Promise<Logo> {
  const html = createWordmarkHTML(brand);
  const element = createDOMElement(html);

  const svg = await toSvg(element);
  const png2x = await toPng(element, { pixelRatio: 2 });
  const png3x = await toPng(element, { pixelRatio: 3 });

  const webp = await sharp(Buffer.from(png2x.split(',')[1], 'base64'))
    .webp({ quality: 90 })
    .toBuffer();

  return {
    svg,
    png2x: Buffer.from(png2x.split(',')[1], 'base64'),
    png3x: Buffer.from(png3x.split(',')[1], 'base64'),
    webp
  };
}

/**
 * Creates HTML for wordmark logo
 */
function createWordmarkHTML(brand: BrandAnalysis): string {
  return `
    <div style="
      font-family: '${brand.typography.heading}', sans-serif;
      font-size: 72px;
      font-weight: 900;
      color: ${brand.colors.primary};
      letter-spacing: -0.05em;
      background: linear-gradient(135deg,
        ${brand.colors.primary},
        ${brand.colors.secondary});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      padding: 40px;
      display: inline-block;
    ">
      ${brand.name}
    </div>
  `;
}

/**
 * Generates icon logo (graphic symbol)
 */
async function generateIconLogo(brand: BrandAnalysis): Promise<Logo> {
  // TODO: Implement icon generation logic
  // Consider using SVG patterns, geometric shapes, or letters
  throw new Error('Not implemented');
}

/**
 * Generates combination logo (icon + text)
 */
async function generateCombinationLogo(brand: BrandAnalysis): Promise<Logo> {
  // TODO: Implement combination logic
  throw new Error('Not implemented');
}

/**
 * Creates DOM element from HTML string (for html-to-image)
 */
function createDOMElement(html: string): HTMLElement {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container.firstElementChild as HTMLElement;
}
```

---

### Token Generator Template

Create: `lib/generators/token-generator.ts`

```typescript
import { BrandAnalysis, DesignTokens } from '@/types/brand';
import { validateWCAGColors } from '@/lib/validators/wcag-validator';

/**
 * Generates W3C DTCG compliant design tokens from brand analysis
 *
 * @param brand - Brand analysis
 * @returns Design tokens in W3C DTCG format
 */
export async function generateTokens(
  brand: BrandAnalysis
): Promise<DesignTokens> {
  // Validate colors meet WCAG AA
  const validatedColors = await validateWCAGColors(brand.colors);

  return {
    "$schema": "https://design-tokens.org/schema/version/1.0.0",
    "color": generateColorTokens(validatedColors),
    "typography": generateTypographyTokens(brand.typography),
    "spacing": generateSpacingTokens(),
    "borderRadius": generateBorderRadiusTokens(),
    "shadow": generateShadowTokens()
  };
}

/**
 * Generates color tokens
 */
function generateColorTokens(colors: BrandAnalysis['colors']) {
  return {
    "brand": {
      "primary": {
        "$value": colors.primary,
        "$type": "color",
        "$description": "Primary brand color"
      },
      "secondary": {
        "$value": colors.secondary,
        "$type": "color",
        "$description": "Secondary brand color"
      },
      "accent": {
        "$value": colors.accent,
        "$type": "color",
        "$description": "Accent color for highlights"
      }
    },
    "semantic": {
      "success": { "$value": "#10B981", "$type": "color" },
      "error": { "$value": "#EF4444", "$type": "color" },
      "warning": { "$value": "#F59E0B", "$type": "color" },
      "info": { "$value": "#3B82F6", "$type": "color" }
    },
    "neutral": generateNeutralScale(colors.neutrals)
  };
}

/**
 * Generates typography tokens
 */
function generateTypographyTokens(typography: BrandAnalysis['typography']) {
  return {
    "fontFamily": {
      "heading": {
        "$value": `"${typography.heading}", sans-serif`,
        "$type": "fontFamily"
      },
      "body": {
        "$value": `"${typography.body}", sans-serif`,
        "$type": "fontFamily"
      }
    },
    "fontSize": {
      "xs": { "$value": "0.75rem", "$type": "dimension" },
      "sm": { "$value": "0.875rem", "$type": "dimension" },
      "base": { "$value": "1rem", "$type": "dimension" },
      "lg": { "$value": "1.125rem", "$type": "dimension" },
      "xl": { "$value": "1.25rem", "$type": "dimension" },
      "2xl": { "$value": "1.5rem", "$type": "dimension" }
    }
  };
}

// ... Additional helper functions
```

---

### Component Generator Template

Create: `lib/generators/component-generator.ts`

```typescript
import { DesignTokens, ComponentLibrary, Component } from '@/types/brand';

/**
 * Generates production-ready React components
 * Creates 30+ components across atoms, molecules, organisms
 *
 * @param tokens - Design tokens
 * @returns Component library with TypeScript definitions
 */
export async function generateComponents(
  tokens: DesignTokens
): Promise<ComponentLibrary> {
  const atoms = await generateAtoms(tokens);
  const molecules = await generateMolecules(tokens);
  const organisms = await generateOrganisms(tokens);

  return {
    atoms,
    molecules,
    organisms
  };
}

/**
 * Generates atomic components (Button, Input, etc.)
 */
async function generateAtoms(tokens: DesignTokens): Promise<Component[]> {
  return [
    generateButtonComponent(tokens),
    generateInputComponent(tokens),
    // ... 8 more atoms
  ];
}

/**
 * Generates Button component
 */
function generateButtonComponent(tokens: DesignTokens): Component {
  const code = `
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  type = 'button'
}) => {
  const baseStyles = {
    fontFamily: ${tokens.typography.fontFamily.body.$value},
    borderRadius: ${tokens.borderRadius.md.$value},
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s ease'
  };

  const variantStyles = {
    primary: {
      backgroundColor: ${tokens.color.brand.primary.$value},
      color: '#FFFFFF'
    },
    secondary: {
      backgroundColor: ${tokens.color.brand.secondary.$value},
      color: '#FFFFFF'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: ${tokens.color.brand.primary.$value},
      border: \`2px solid \${${tokens.color.brand.primary.$value}}\`
    }
  };

  const sizeStyles = {
    sm: {
      padding: \`\${${tokens.spacing.sm.$value}} \${${tokens.spacing.md.$value}}\`,
      fontSize: ${tokens.typography.fontSize.sm.$value}
    },
    md: {
      padding: \`\${${tokens.spacing.md.$value}} \${${tokens.spacing.lg.$value}}\`,
      fontSize: ${tokens.typography.fontSize.base.$value}
    },
    lg: {
      padding: \`\${${tokens.spacing.lg.$value}} \${${tokens.spacing.xl.$value}}\`,
      fontSize: ${tokens.typography.fontSize.lg.$value}
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...sizeStyles[size]
      }}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};
  `;

  return {
    name: 'Button',
    code,
    types: '// TypeScript types included above',
    tests: '// TODO: Generate test file'
  };
}
```

---

### Integration Pipeline Template

Update: `lib/orchestrator/brand-orchestrator.ts`

```typescript
import { analyzeBrand } from '@/lib/generators/brand-analyzer';
import { generateLogos } from '@/lib/generators/logo-generator';
import { generateTokens } from '@/lib/generators/token-generator';
import { generateComponents } from '@/lib/generators/component-generator';
import { BrandInput, BrandPackage } from '@/types/brand';

/**
 * Main orchestrator for brand generation pipeline
 * Coordinates all generators and tracks progress
 *
 * @param input - Brand input from user
 * @param onProgress - Progress callback
 * @returns Complete brand package
 */
export async function generateBrand(
  input: BrandInput,
  onProgress?: (step: string, progress: number) => void
): Promise<BrandPackage> {
  const startTime = Date.now();

  try {
    // Step 1: Analyze brand (30s)
    onProgress?.('Analyzing brand strategy...', 10);
    const analysis = await analyzeBrand(input);
    onProgress?.('Brand analysis complete', 25);

    // Step 2: Generate logos, tokens in parallel (60s)
    onProgress?.('Generating logos and design tokens...', 30);
    const [logos, tokens] = await Promise.all([
      generateLogos(analysis),
      generateTokens(analysis)
    ]);
    onProgress?.('Logos and tokens complete', 50);

    // Step 3: Generate components (60s)
    onProgress?.('Generating component library...', 55);
    const components = await generateComponents(tokens);
    onProgress?.('Components complete', 75);

    // Step 4: Package everything (10s)
    onProgress?.('Packaging brand assets...', 80);
    const brandPackage = await packageBrand({
      analysis,
      logos,
      tokens,
      components
    });
    onProgress?.('Complete!', 100);

    const duration = (Date.now() - startTime) / 1000;
    console.log(`Brand generated in ${duration}s`);

    return brandPackage;
  } catch (error) {
    console.error('Brand generation failed:', error);
    throw error;
  }
}

/**
 * Packages all brand assets into deliverable format
 */
async function packageBrand(data: {
  analysis: BrandAnalysis;
  logos: LogoSet;
  tokens: DesignTokens;
  components: ComponentLibrary;
}): Promise<BrandPackage> {
  // TODO: Create ZIP file with all assets
  // TODO: Generate preview deployment
  // TODO: Upload to storage
  return data as BrandPackage;
}
```

---

## ⚠️ Common Pitfalls to Avoid

### 1. Inline CSS/HTML
**Problem:** Using inline styles instead of design system
**Solution:** Always use Tailwind classes or components from `@/components/ui`

### 2. Using `any` Types
**Problem:** Bypassing TypeScript safety with `any`
**Solution:** Define proper interfaces in `types/` directory

### 3. Missing Error Handling
**Problem:** Not handling API failures gracefully
**Solution:** Wrap API calls in try/catch, provide user-friendly errors

### 4. Skipping Tests
**Problem:** Merging code without tests
**Solution:** Write tests FIRST (TDD), aim for >80% coverage

### 5. Long-Running Branches
**Problem:** Feature branches that live for days
**Solution:** Merge daily, keep branches small and focused

### 6. Merge Conflicts
**Problem:** Merging out of order or not rebasing
**Solution:** Follow exact merge order, rebase frequently

### 7. Console.logs in Production
**Problem:** Leaving debug logs in code
**Solution:** Use proper logging library, remove before commit

### 8. Missing JSDoc
**Problem:** Undocumented functions
**Solution:** Add JSDoc comments to ALL exported functions

---

## 🧪 Testing Guidelines

### Test Structure

```typescript
// __tests__/feature.test.ts
import { yourFunction } from '../your-module';

describe('yourFunction', () => {
  describe('happy path', () => {
    it('should work with valid input', async () => {
      // Arrange
      const input = { /* valid input */ };

      // Act
      const result = await yourFunction(input);

      // Assert
      expect(result).toBeDefined();
      expect(result).toMatchObject({ /* expected shape */ });
    });
  });

  describe('edge cases', () => {
    it('should handle empty input', async () => {
      await expect(yourFunction({})).rejects.toThrow();
    });

    it('should handle API errors gracefully', async () => {
      // Mock API failure
      // Test error handling
    });
  });

  describe('performance', () => {
    it('should complete within time limit', async () => {
      const start = Date.now();
      await yourFunction({ /* input */ });
      const duration = Date.now() - start;

      expect(duration).toBeLessThan(30000); // 30s
    });
  });
});
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test brand-analyzer

# Run in watch mode
pnpm test:watch

# Run with coverage
pnpm test:coverage

# View coverage report
open coverage/lcov-report/index.html
```

---

## 📞 Getting Help

### Before Asking for Help

1. **Read the docs** - Check this guide, PHASE_2_TEAM_BRIEF.md, PHASE_2_STRATEGY.md
2. **Search GitHub Issues** - Someone may have had the same problem
3. **Check the demo** - Look at `brands/gonads-io/` for working examples
4. **Review Phase 1 code** - See how similar features were implemented

### How to Ask for Help

**Good Issue:**
```markdown
Title: [brand-analyzer] WCAG validation failing for dark colors

**Description:**
When generating brands with dark primary colors, the WCAG validator
rejects them even though they have >4.5:1 contrast with white.

**Steps to Reproduce:**
1. Run `analyzeBrand({ businessIdea: 'Test', style: 'bold' })`
2. Check contrast ratio for returned primary color
3. Validation fails despite meeting standard

**Expected:** Should pass WCAG AA
**Actual:** Throws error

**Code:**
```ts
const result = await analyzeBrand({ /* ... */ });
const contrast = calculateContrast(result.colors.primary, '#FFFFFF');
// contrast = 4.6 (should pass, but validator rejects)
```

**Environment:**
- Node: v18.17.0
- Branch: feature/brand-analyzer
- Commit: abc123
```

**Bad Issue:**
```markdown
Title: It doesn't work

help plz, colors broken
```

### Response Time Expectations

- **Critical blockers:** 30 minutes
- **Bug reports:** 2 hours
- **Feature questions:** 4 hours
- **General questions:** Next day

---

## ✅ Pre-Merge Checklist

Before creating a PR, verify:

- [ ] All tests pass locally (`pnpm test`)
- [ ] TypeScript compiles (`pnpm type-check`)
- [ ] ESLint passes (`pnpm lint`)
- [ ] Build succeeds (`pnpm build`)
- [ ] No console.logs or debug code
- [ ] All functions have JSDoc comments
- [ ] No inline CSS or HTML
- [ ] No `any` types
- [ ] Performance targets met
- [ ] WCAG AA compliance verified (if applicable)
- [ ] Documentation updated
- [ ] CHANGELOG.md updated

---

## 🎯 Success Criteria Summary

Your feature is DONE when:

### Brand Analyzer
- ✅ Generates analysis in <30s
- ✅ Colors meet WCAG AA (4.5:1)
- ✅ Returns valid BrandAnalysis object
- ✅ All tests passing

### Logo Generator
- ✅ Generates 3 logos in <45s
- ✅ SVG exports are valid XML
- ✅ PNG exports are crisp (2x, 3x)
- ✅ All tests passing

### Token Generator
- ✅ Generates tokens in <15s
- ✅ W3C DTCG compliant
- ✅ 4 export formats working
- ✅ All tests passing

### Component Generator
- ✅ Generates 30+ components in <60s
- ✅ TypeScript types included
- ✅ ARIA labels and keyboard nav
- ✅ All tests passing

### Integration Pipeline
- ✅ Complete pipeline in <3min
- ✅ Real-time progress updates
- ✅ Error handling robust
- ✅ All tests passing

---

## 📚 Additional Resources

### Documentation
- [PHASE_2_TEAM_BRIEF.md](/PHASE_2_TEAM_BRIEF.md) - Quick team guide
- [PHASE_2_STRATEGY.md](/docs/PHASE_2_STRATEGY.md) - Full implementation plan
- [INFRASTRUCTURE_README.md](/INFRASTRUCTURE_README.md) - Phase 1 infrastructure
- [BRANCHING_STRATEGY.md](/docs/BRANCHING_STRATEGY.md) - Git workflow

### Examples
- `brands/gonads-io/` - Complete demo brand
- Phase 1 code - Working infrastructure examples

### External Docs
- [Claude API Docs](https://docs.anthropic.com/)
- [W3C DTCG Spec](https://design-tokens.github.io/community-group/format/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React TypeScript](https://react-typescript-cheatsheet.netlify.app/)

---

## 💪 Motivation

**What You're Building:**
The core engine that generates professional brands in <3 minutes

**Why It Matters:**
- Traditional branding: $5k-$50k, 2-4 weeks
- MACHUPS: $10-$49, <3 minutes
- **You're democratizing professional design**

**The Impact:**
Every founder, startup, and small business can now afford a professional brand.
You're removing a major barrier to entrepreneurship.

---

## 🚀 Let's Build!

You have everything you need:
- ✅ Clear feature assignment
- ✅ Code templates
- ✅ Testing examples
- ✅ Standards and guidelines
- ✅ Support structure

**Remember:**
1. Follow the templates
2. Test as you go
3. Document everything
4. Ask for help when stuck
5. Ship early, ship often

**You've got this! 🔥**

---

**Questions?** → Post in GitHub Discussions
**Blockers?** → Create GitHub Issue (tag @team)
**Ready?** → Create your feature branch and start coding!

---

**Version:** 1.0
**Last Updated:** December 6, 2025
**Status:** Active Development
**Team:** MACHUPS Phase 2 Developers
