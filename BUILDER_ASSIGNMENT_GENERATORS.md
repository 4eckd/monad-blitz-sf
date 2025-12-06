# Builder Assignment: Generator Modules

**Assigned To:** Available / Generator Specialist
**Branch:** `claude/generators-016s6daPN3GTf1C8DFmdhmU9`
**Parent:** `claude/phase-1-coordinator-agent-016s6daPN3GTf1C8DFmdhmU9`
**Priority:** P0 (CRITICAL - Core feature)
**Estimated Time:** 3-4 hours
**Dependencies:** Claude AI Integration (can start logos in parallel)

---

## 🎯 Feature Goal

Implement the core generator modules that transform brand analysis into tangible assets:
1. **Logo Generator** - HTML/CSS logos → PNG/SVG exports
2. **Token Generator** - W3C DTCG compliant design tokens
3. **Component Generator** - Production-ready React components
4. **Guidelines Generator** (P1) - PDF brand guidelines

---

## ✅ Acceptance Criteria

- [ ] Logo generator creates 3 variants (wordmark, combination, badge)
- [ ] Logos export to PNG (high-res) and SVG
- [ ] Design tokens follow W3C DTCG spec
- [ ] Components are production-ready with TypeScript
- [ ] All generators integrate with orchestrator
- [ ] TypeScript types for all interfaces
- [ ] Integration tests pass
- [ ] Documentation complete

---

## 🛠️ Files to Create

### 1. `lib/generators/types.ts` - Shared Interfaces

```typescript
import type { BrandAnalysis } from '../ai/types';

/**
 * Logo variant types
 */
export type LogoType = 'wordmark' | 'combination' | 'badge';

/**
 * Logo output format
 */
export interface Logo {
  type: LogoType;
  html: string;
  svg: string;
  png: Buffer; // PNG as binary buffer
  width: number;
  height: number;
}

/**
 * W3C Design Token (DTCG format)
 */
export interface DesignToken {
  $value: string | number;
  $type: string;
  $description?: string;
}

/**
 * W3C DTCG Design Token System
 */
export interface DesignTokens {
  $schema: string;
  color: {
    brand: Record<string, DesignToken>;
    semantic: Record<string, DesignToken>;
    neutral: Record<string, DesignToken>;
  };
  typography: {
    'font-family': Record<string, DesignToken>;
    'font-size': Record<string, DesignToken>;
    'font-weight': Record<string, DesignToken>;
    'line-height': Record<string, DesignToken>;
  };
  spacing: Record<string, DesignToken>;
  'border-radius': Record<string, DesignToken>;
}

/**
 * React component output
 */
export interface ReactComponent {
  name: string;
  code: string;
  filename: string;
  props: string[]; // Prop names
}

/**
 * Export formats for design tokens
 */
export type TokenExportFormat = 'json' | 'css' | 'scss' | 'tailwind';

/**
 * Tech stack for component generation
 */
export type TechStack = 'nextjs' | 'react-typescript' | 'vue' | 'html';
```

---

### 2. `lib/generators/logos.ts` - Logo Generator

**Purpose:** Generate HTML/CSS logos and export to PNG/SVG

**Dependencies:**
```bash
pnpm add html-to-image
```

```typescript
import { toSvg, toPng } from 'html-to-image';
import type { BrandAnalysis } from '../ai/types';
import type { Logo, LogoType } from './types';

/**
 * Logo generator configuration
 */
export interface LogoGeneratorConfig {
  width?: number;
  height?: number;
  scale?: number; // For high-DPI exports
  backgroundColor?: string;
}

/**
 * Generate all logo variants
 */
export async function generateLogos(
  brand: BrandAnalysis,
  config: LogoGeneratorConfig = {}
): Promise<Logo[]> {
  const defaultConfig = {
    width: 800,
    height: 400,
    scale: 2, // 2x for Retina
    backgroundColor: 'transparent',
    ...config,
  };

  const logos = await Promise.all([
    generateLogo(brand, 'wordmark', defaultConfig),
    generateLogo(brand, 'combination', defaultConfig),
    generateLogo(brand, 'badge', defaultConfig),
  ]);

  return logos;
}

/**
 * Generate single logo variant
 */
async function generateLogo(
  brand: BrandAnalysis,
  type: LogoType,
  config: LogoGeneratorConfig
): Promise<Logo> {
  // Create HTML element
  const element = createLogoElement(brand, type);

  // Export to SVG
  const svg = await toSvg(element, {
    width: config.width,
    height: config.height,
    backgroundColor: config.backgroundColor,
  });

  // Export to PNG
  const pngDataUrl = await toPng(element, {
    width: config.width,
    height: config.height,
    pixelRatio: config.scale,
    backgroundColor: config.backgroundColor,
  });

  // Convert PNG data URL to Buffer
  const pngBase64 = pngDataUrl.split(',')[1];
  const png = Buffer.from(pngBase64, 'base64');

  // Get HTML string
  const html = element.outerHTML;

  return {
    type,
    html,
    svg,
    png,
    width: config.width || 800,
    height: config.height || 400,
  };
}

/**
 * Create logo HTML element
 */
function createLogoElement(
  brand: BrandAnalysis,
  type: LogoType
): HTMLElement {
  const div = document.createElement('div');

  switch (type) {
    case 'wordmark':
      div.innerHTML = createWordmarkHTML(brand);
      break;
    case 'combination':
      div.innerHTML = createCombinationHTML(brand);
      break;
    case 'badge':
      div.innerHTML = createBadgeHTML(brand);
      break;
  }

  return div.firstElementChild as HTMLElement;
}

/**
 * Create wordmark logo (text only)
 */
function createWordmarkHTML(brand: BrandAnalysis): string {
  return `
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      background: linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary});
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    ">
      <div style="
        font-family: ${brand.typography.headingFont}, sans-serif;
        font-size: 72px;
        font-weight: ${brand.typography.headingWeight};
        color: white;
        letter-spacing: -0.03em;
        text-shadow: 0 4px 12px rgba(0,0,0,0.3);
      ">
        ${brand.brandName}
      </div>
    </div>
  `;
}

/**
 * Create combination logo (icon + text)
 */
function createCombinationHTML(brand: BrandAnalysis): string {
  // Extract initials for icon
  const initials = brand.brandName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return `
    <div style="
      display: flex;
      align-items: center;
      gap: 24px;
      padding: 32px 48px;
      background: ${brand.colors.neutralLight};
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    ">
      <!-- Icon -->
      <div style="
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.accent});
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: ${brand.typography.headingFont}, sans-serif;
        font-size: 40px;
        font-weight: 900;
        color: white;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      ">
        ${initials}
      </div>

      <!-- Text -->
      <div style="
        font-family: ${brand.typography.headingFont}, sans-serif;
        font-size: 56px;
        font-weight: ${brand.typography.headingWeight};
        color: ${brand.colors.neutralDark};
        letter-spacing: -0.02em;
      ">
        ${brand.brandName}
      </div>
    </div>
  `;
}

/**
 * Create badge logo (circular/emblem style)
 */
function createBadgeHTML(brand: BrandAnalysis): string {
  const initials = brand.brandName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return `
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
    ">
      <!-- Badge Container -->
      <div style="
        position: relative;
        width: 240px;
        height: 240px;
        background: linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary});
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        border: 8px solid white;
      ">
        <!-- Initials -->
        <div style="
          font-family: ${brand.typography.headingFont}, sans-serif;
          font-size: 80px;
          font-weight: 900;
          color: white;
          text-shadow: 0 4px 12px rgba(0,0,0,0.3);
          margin-bottom: 8px;
        ">
          ${initials}
        </div>

        <!-- Brand Name (Curved around bottom) -->
        <div style="
          font-family: ${brand.typography.bodyFont}, sans-serif;
          font-size: 20px;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        ">
          ${brand.brandName}
        </div>
      </div>
    </div>
  `;
}

/**
 * Save logo to file system
 */
export async function saveLogos(
  logos: Logo[],
  outputDir: string
): Promise<void> {
  const fs = await import('fs/promises');
  const path = await import('path');

  await fs.mkdir(outputDir, { recursive: true });

  for (const logo of logos) {
    // Save PNG
    await fs.writeFile(
      path.join(outputDir, `${logo.type}.png`),
      logo.png
    );

    // Save SVG
    await fs.writeFile(
      path.join(outputDir, `${logo.type}.svg`),
      logo.svg
    );

    // Save HTML
    await fs.writeFile(
      path.join(outputDir, `${logo.type}.html`),
      logo.html
    );
  }
}
```

---

### 3. `lib/generators/tokens.ts` - Design Token Generator

**Purpose:** Generate W3C DTCG compliant design tokens

```typescript
import type { BrandAnalysis } from '../ai/types';
import type { DesignTokens, TokenExportFormat } from './types';

/**
 * Generate W3C DTCG design token system
 */
export function generateDesignTokens(brand: BrandAnalysis): DesignTokens {
  return {
    $schema: 'https://design-tokens.org/schema/version/1.0.0',
    color: {
      brand: {
        primary: {
          $value: brand.colors.primary,
          $type: 'color',
          $description: 'Primary brand color',
        },
        secondary: {
          $value: brand.colors.secondary,
          $type: 'color',
          $description: 'Secondary brand color',
        },
        accent: {
          $value: brand.colors.accent,
          $type: 'color',
          $description: 'Accent color for highlights',
        },
      },
      semantic: {
        success: { $value: '#10B981', $type: 'color' },
        error: { $value: '#EF4444', $type: 'color' },
        warning: { $value: '#F59E0B', $type: 'color' },
        info: { $value: '#3B82F6', $type: 'color' },
      },
      neutral: {
        50: { $value: '#FAFAFA', $type: 'color' },
        100: { $value: '#F5F5F5', $type: 'color' },
        200: { $value: '#E5E5E5', $type: 'color' },
        300: { $value: '#D4D4D4', $type: 'color' },
        400: { $value: '#A3A3A3', $type: 'color' },
        500: { $value: '#737373', $type: 'color' },
        600: { $value: '#525252', $type: 'color' },
        700: { $value: '#404040', $type: 'color' },
        800: { $value: '#262626', $type: 'color' },
        900: { $value: '#171717', $type: 'color' },
      },
    },
    typography: {
      'font-family': {
        heading: {
          $value: brand.typography.headingFont,
          $type: 'fontFamily',
        },
        body: {
          $value: brand.typography.bodyFont,
          $type: 'fontFamily',
        },
        mono: {
          $value: brand.typography.monoFont || 'monospace',
          $type: 'fontFamily',
        },
      },
      'font-size': {
        xs: { $value: '0.75rem', $type: 'dimension' },
        sm: { $value: '0.875rem', $type: 'dimension' },
        base: { $value: '1rem', $type: 'dimension' },
        lg: { $value: '1.125rem', $type: 'dimension' },
        xl: { $value: '1.25rem', $type: 'dimension' },
        '2xl': { $value: '1.5rem', $type: 'dimension' },
        '3xl': { $value: '1.875rem', $type: 'dimension' },
        '4xl': { $value: '2.25rem', $type: 'dimension' },
      },
      'font-weight': {
        normal: { $value: brand.typography.bodyWeight || 400, $type: 'number' },
        medium: { $value: 500, $type: 'number' },
        semibold: { $value: 600, $type: 'number' },
        bold: { $value: brand.typography.headingWeight || 700, $type: 'number' },
      },
      'line-height': {
        tight: { $value: '1.25', $type: 'number' },
        normal: { $value: '1.5', $type: 'number' },
        relaxed: { $value: '1.75', $type: 'number' },
      },
    },
    spacing: {
      xs: { $value: '0.25rem', $type: 'dimension' },
      sm: { $value: '0.5rem', $type: 'dimension' },
      md: { $value: '1rem', $type: 'dimension' },
      lg: { $value: '1.5rem', $type: 'dimension' },
      xl: { $value: '2rem', $type: 'dimension' },
      '2xl': { $value: '3rem', $type: 'dimension' },
      '3xl': { $value: '4rem', $type: 'dimension' },
    },
    'border-radius': {
      none: { $value: '0', $type: 'dimension' },
      sm: { $value: '0.125rem', $type: 'dimension' },
      md: { $value: '0.375rem', $type: 'dimension' },
      lg: { $value: '0.5rem', $type: 'dimension' },
      xl: { $value: '0.75rem', $type: 'dimension' },
      '2xl': { $value: '1rem', $type: 'dimension' },
      full: { $value: '9999px', $type: 'dimension' },
    },
  };
}

/**
 * Export tokens to different formats
 */
export function exportTokens(
  tokens: DesignTokens,
  format: TokenExportFormat
): string {
  switch (format) {
    case 'json':
      return JSON.stringify(tokens, null, 2);

    case 'css':
      return exportToCSS(tokens);

    case 'scss':
      return exportToSCSS(tokens);

    case 'tailwind':
      return exportToTailwind(tokens);

    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
}

/**
 * Export to CSS custom properties
 */
function exportToCSS(tokens: DesignTokens): string {
  const lines = [':root {'];

  // Colors
  for (const [category, colors] of Object.entries(tokens.color)) {
    for (const [name, token] of Object.entries(colors)) {
      lines.push(`  --color-${category}-${name}: ${token.$value};`);
    }
  }

  // Typography
  for (const [category, values] of Object.entries(tokens.typography)) {
    for (const [name, token] of Object.entries(values)) {
      lines.push(`  --${category}-${name}: ${token.$value};`);
    }
  }

  // Spacing
  for (const [name, token] of Object.entries(tokens.spacing)) {
    lines.push(`  --spacing-${name}: ${token.$value};`);
  }

  // Border radius
  for (const [name, token] of Object.entries(tokens['border-radius'])) {
    lines.push(`  --radius-${name}: ${token.$value};`);
  }

  lines.push('}');

  return lines.join('\n');
}

/**
 * Export to SCSS variables
 */
function exportToSCSS(tokens: DesignTokens): string {
  const lines: string[] = [];

  // Colors
  for (const [category, colors] of Object.entries(tokens.color)) {
    for (const [name, token] of Object.entries(colors)) {
      lines.push(`$color-${category}-${name}: ${token.$value};`);
    }
  }

  // Typography, spacing, etc.
  // (Similar pattern as CSS)

  return lines.join('\n');
}

/**
 * Export to Tailwind config
 */
function exportToTailwind(tokens: DesignTokens): string {
  const config = {
    theme: {
      extend: {
        colors: flattenColors(tokens.color),
        fontFamily: flattenFontFamily(tokens.typography['font-family']),
        spacing: flattenSpacing(tokens.spacing),
        borderRadius: flattenBorderRadius(tokens['border-radius']),
      },
    },
  };

  return `module.exports = ${JSON.stringify(config, null, 2)}`;
}

// Helper functions for flattening
function flattenColors(colors: any): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [category, values] of Object.entries(colors)) {
    result[category] = {};
    for (const [name, token] of Object.entries(values as any)) {
      result[category][name] = token.$value;
    }
  }
  return result;
}

function flattenFontFamily(fonts: any): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const [name, token] of Object.entries(fonts)) {
    result[name] = [(token as any).$value];
  }
  return result;
}

function flattenSpacing(spacing: any): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [name, token] of Object.entries(spacing)) {
    result[name] = (token as any).$value;
  }
  return result;
}

function flattenBorderRadius(radius: any): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [name, token] of Object.entries(radius)) {
    result[name] = (token as any).$value;
  }
  return result;
}
```

---

### 4. `lib/generators/components.ts` - Component Generator

**Purpose:** Generate production-ready React components

```typescript
import type { DesignTokens, ReactComponent, TechStack } from './types';

/**
 * Generate all core React components
 */
export function generateComponents(
  tokens: DesignTokens,
  techStack: TechStack = 'nextjs'
): ReactComponent[] {
  const components = [
    generateButton(tokens),
    generateInput(tokens),
    generateCard(tokens),
    generateHeader(tokens),
    generateFooter(tokens),
  ];

  return components.map((component) =>
    formatForTechStack(component, techStack)
  );
}

/**
 * Generate Button component
 */
function generateButton(tokens: DesignTokens): ReactComponent {
  const code = `
import { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-md transition-colors';

  const variantStyles = {
    primary: 'bg-brand-primary text-white hover:bg-brand-primary/90',
    secondary: 'bg-brand-secondary text-white hover:bg-brand-secondary/90',
    ghost: 'bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={\`\${baseStyles} \${variantStyles[variant]} \${sizeStyles[size]} \${className}\`}
      {...props}
    >
      {children}
    </button>
  );
};
  `.trim();

  return {
    name: 'Button',
    code,
    filename: 'Button.tsx',
    props: ['variant', 'size', 'className', 'children'],
  };
}

/**
 * Generate Input component
 */
function generateInput(tokens: DesignTokens): ReactComponent {
  const code = `
import { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <input
        className={\`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary \${
          error ? 'border-semantic-error' : 'border-neutral-300'
        } \${className}\`}
        {...props}
      />
      {error && (
        <p className="text-sm text-semantic-error">{error}</p>
      )}
    </div>
  );
};
  `.trim();

  return {
    name: 'Input',
    code,
    filename: 'Input.tsx',
    props: ['label', 'error', 'className'],
  };
}

/**
 * Generate Card component
 */
function generateCard(tokens: DesignTokens): ReactComponent {
  const code = `
import { FC, ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({
  title,
  children,
  className = ''
}) => {
  return (
    <div className={\`bg-white rounded-lg shadow-md p-6 \${className}\`}>
      {title && (
        <h3 className="text-xl font-bold text-neutral-900 mb-4">
          {title}
        </h3>
      )}
      <div>{children}</div>
    </div>
  );
};
  `.trim();

  return {
    name: 'Card',
    code,
    filename: 'Card.tsx',
    props: ['title', 'children', 'className'],
  };
}

/**
 * Generate Header component
 */
function generateHeader(tokens: DesignTokens): ReactComponent {
  const code = `
import { FC } from 'react';

interface HeaderProps {
  brandName: string;
  navigation?: Array<{ label: string; href: string }>;
}

export const Header: FC<HeaderProps> = ({
  brandName,
  navigation = []
}) => {
  return (
    <header className="bg-brand-primary text-white py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">{brandName}</h1>
        {navigation.length > 0 && (
          <nav className="flex gap-6">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:underline"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
  `.trim();

  return {
    name: 'Header',
    code,
    filename: 'Header.tsx',
    props: ['brandName', 'navigation'],
  };
}

/**
 * Generate Footer component
 */
function generateFooter(tokens: DesignTokens): ReactComponent {
  const code = `
import { FC } from 'react';

interface FooterProps {
  brandName: string;
  year?: number;
}

export const Footer: FC<FooterProps> = ({
  brandName,
  year = new Date().getFullYear()
}) => {
  return (
    <footer className="bg-neutral-900 text-white py-8 px-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {year} {brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
  `.trim();

  return {
    name: 'Footer',
    code,
    filename: 'Footer.tsx',
    props: ['brandName', 'year'],
  };
}

/**
 * Format component for specific tech stack
 */
function formatForTechStack(
  component: ReactComponent,
  techStack: TechStack
): ReactComponent {
  switch (techStack) {
    case 'nextjs':
      return {
        ...component,
        code: `'use client';\n\n${component.code}`,
      };

    case 'react-typescript':
      return component; // Already in TS format

    case 'vue':
      return convertToVue(component);

    case 'html':
      return convertToHTML(component);

    default:
      return component;
  }
}

// Placeholder for Vue conversion
function convertToVue(component: ReactComponent): ReactComponent {
  // TODO: Implement Vue component conversion
  return component;
}

// Placeholder for HTML conversion
function convertToHTML(component: ReactComponent): ReactComponent {
  // TODO: Implement HTML component conversion
  return component;
}
```

---

### 5. `lib/generators/index.ts` - Barrel Exports

```typescript
export * from './types';
export * from './logos';
export * from './tokens';
export * from './components';
```

---

## 📝 Implementation Steps

### Step 1: Create Directory
```bash
mkdir -p lib/generators
```

### Step 2: Install Dependencies
```bash
pnpm add html-to-image
```

### Step 3: Create Files
1. `lib/generators/types.ts`
2. `lib/generators/logos.ts`
3. `lib/generators/tokens.ts`
4. `lib/generators/components.ts`
5. `lib/generators/index.ts`

### Step 4: Update Orchestrator
Replace TODOs in `lib/orchestrator/brand-orchestrator.ts`:

```typescript
import { generateLogos } from '../generators/logos';
import { generateDesignTokens } from '../generators/tokens';
import { generateComponents } from '../generators/components';

// In generateLogos method (line 234):
return await generateLogos(brandAnalysis);

// In generateDesignTokens method (line 245):
return generateDesignTokens(brandAnalysis);

// In generateComponents method (line 267):
return generateComponents(designTokens, techStack);
```

---

## 🧪 Testing

Create `scripts/test-generators.ts`:

```typescript
import { analyzeBrand } from '../lib/ai';
import { generateLogos, generateDesignTokens, generateComponents } from '../lib/generators';

async function testGenerators() {
  console.log('Testing Generator Modules...\n');

  // 1. Get brand analysis
  const brand = await analyzeBrand({
    businessIdea: 'Sustainable coffee delivery',
    targetAudience: 'Eco-conscious urbanites',
    style: 'modern'
  });

  // 2. Generate logos
  console.log('Generating logos...');
  const logos = await generateLogos(brand);
  console.log(`✅ Generated ${logos.length} logo variants`);

  // 3. Generate tokens
  console.log('Generating design tokens...');
  const tokens = generateDesignTokens(brand);
  console.log(`✅ Generated ${Object.keys(tokens.color.brand).length} brand colors`);

  // 4. Generate components
  console.log('Generating components...');
  const components = generateComponents(tokens, 'nextjs');
  console.log(`✅ Generated ${components.length} React components`);

  console.log('\n✅ All generators working!');
}

testGenerators().catch(console.error);
```

---

## 🔀 Merge Instructions

```bash
git add lib/generators/
git add lib/orchestrator/brand-orchestrator.ts
git add scripts/test-generators.ts
git commit -m "feat(generators): add logo, token, and component generators

- Add logo generator with HTML/CSS to PNG/SVG export
- Add W3C DTCG design token generator
- Add React component generator (Button, Input, Card, Header, Footer)
- Support multiple export formats (JSON, CSS, SCSS, Tailwind)
- Update orchestrator to use generators"

git push origin claude/generators-016s6daPN3GTf1C8DFmdhmU9
```

---

**Priority:** P0 (CRITICAL)
**Time:** 3-4 hours
**Status:** Ready to Start

Good luck! 🎨
