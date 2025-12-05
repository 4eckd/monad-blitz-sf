# Design Tokens - Feature Plan

## Overview

Comprehensive design token system for consistent, scalable brand design systems with Tailwind CSS integration.

**Milestone**: Phase 1, Step 4
**Dependencies**: None (can develop in parallel)
**Branch**: `feature/design-tokens`
**Version**: v0.3.0-alpha.4
**Estimated Effort**: 2 days

---

## Goals

### Primary Goals
- ✅ Industry-standard design token structure
- ✅ Seamless Tailwind CSS integration
- ✅ Type-safe token definitions
- ✅ Automatic documentation generation
- ✅ Token validation and linting

### Success Criteria
- [ ] All tokens follow naming conventions
- [ ] 100% TypeScript type coverage
- [ ] Tailwind theme auto-generated from tokens
- [ ] Token documentation auto-updates
- [ ] Zero hard-coded values in components

---

## Technical Architecture

### Token Categories

```typescript
interface DesignTokenSystem {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  borderRadius: BorderRadiusTokens;
  shadows: ShadowTokens;
  animation: AnimationTokens;
  breakpoints: BreakpointTokens;
  zIndex: ZIndexTokens;
}
```

### Token Structure

#### Color Tokens
```typescript
interface ColorTokens {
  // Brand colors
  primary: ColorScale;
  secondary: ColorScale;
  accent: ColorScale;

  // Semantic colors
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;

  // Neutral colors
  neutral: ColorScale;

  // Functional colors
  background: {
    base: string;
    subtle: string;
    muted: string;
  };
  foreground: {
    base: string;
    muted: string;
    subtle: string;
  };
  border: {
    base: string;
    muted: string;
    subtle: string;
  };
}

type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;  // Base color
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};
```

#### Typography Tokens
```typescript
interface TypographyTokens {
  fontFamily: {
    heading: string;
    body: string;
    mono: string;
  };
  fontSize: {
    xs: string;    // 0.75rem (12px)
    sm: string;    // 0.875rem (14px)
    base: string;  // 1rem (16px)
    lg: string;    // 1.125rem (18px)
    xl: string;    // 1.25rem (20px)
    '2xl': string; // 1.5rem (24px)
    '3xl': string; // 1.875rem (30px)
    '4xl': string; // 2.25rem (36px)
    '5xl': string; // 3rem (48px)
  };
  fontWeight: {
    light: number;
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    snug: number;
    normal: number;
    relaxed: number;
    loose: number;
  };
  letterSpacing: {
    tight: string;
    normal: string;
    wide: string;
  };
}
```

#### Spacing Tokens
```typescript
interface SpacingTokens {
  0: string;    // 0px
  1: string;    // 0.25rem (4px)
  2: string;    // 0.5rem (8px)
  3: string;    // 0.75rem (12px)
  4: string;    // 1rem (16px)
  5: string;    // 1.25rem (20px)
  6: string;    // 1.5rem (24px)
  8: string;    // 2rem (32px)
  10: string;   // 2.5rem (40px)
  12: string;   // 3rem (48px)
  16: string;   // 4rem (64px)
  20: string;   // 5rem (80px)
  24: string;   // 6rem (96px)
  32: string;   // 8rem (128px)
}
```

---

## Implementation Plan

### Phase 1: Token Type Definitions
**File**: `lib/tokens/types.ts`

**Complete type system**:
```typescript
export interface DesignTokens {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  borderRadius: BorderRadiusTokens;
  shadows: ShadowTokens;
  animation: AnimationTokens;
  breakpoints: BreakpointTokens;
  zIndex: ZIndexTokens;
}

// Export all individual token interfaces
export type { ColorTokens, TypographyTokens, ... };
```

**Unit Tests**:
- Type definitions are valid
- All token categories included
- No circular dependencies

---

### Phase 2: Token Generator
**File**: `lib/tokens/generator.ts`

**Functions to implement**:
```typescript
export function generateColorScale(
  baseColor: string,
  options?: ColorScaleOptions
): ColorScale {
  // Generate 50-950 scale from base color
  const hsl = hexToHSL(baseColor);

  return {
    50: adjustLightness(hsl, 0.95),
    100: adjustLightness(hsl, 0.90),
    200: adjustLightness(hsl, 0.80),
    300: adjustLightness(hsl, 0.70),
    400: adjustLightness(hsl, 0.60),
    500: baseColor,
    600: adjustLightness(hsl, 0.45),
    700: adjustLightness(hsl, 0.35),
    800: adjustLightness(hsl, 0.25),
    900: adjustLightness(hsl, 0.15),
    950: adjustLightness(hsl, 0.05)
  };
}

export function generateTypographyScale(
  baseSize: number = 16,
  ratio: number = 1.25
): TypographyTokens['fontSize'] {
  return {
    xs: `${baseSize / (ratio * ratio)}px`,
    sm: `${baseSize / ratio}px`,
    base: `${baseSize}px`,
    lg: `${baseSize * ratio}px`,
    xl: `${baseSize * ratio * ratio}px`,
    '2xl': `${baseSize * Math.pow(ratio, 3)}px`,
    '3xl': `${baseSize * Math.pow(ratio, 4)}px`,
    '4xl': `${baseSize * Math.pow(ratio, 5)}px`,
    '5xl': `${baseSize * Math.pow(ratio, 6)}px`
  };
}

export function generateSpacingScale(
  baseUnit: number = 4
): SpacingTokens {
  return {
    0: '0px',
    1: `${baseUnit}px`,
    2: `${baseUnit * 2}px`,
    3: `${baseUnit * 3}px`,
    4: `${baseUnit * 4}px`,
    5: `${baseUnit * 5}px`,
    6: `${baseUnit * 6}px`,
    8: `${baseUnit * 8}px`,
    10: `${baseUnit * 10}px`,
    12: `${baseUnit * 12}px`,
    16: `${baseUnit * 16}px`,
    20: `${baseUnit * 20}px`,
    24: `${baseUnit * 24}px`,
    32: `${baseUnit * 32}px`
  };
}
```

**Unit Tests**:
- Color scale generation produces valid colors
- Typography scale follows correct ratios
- Spacing scale is consistent
- Generated values are valid CSS

---

### Phase 3: Tailwind Integration
**File**: `lib/tokens/tailwind-adapter.ts`

**Functions to implement**:
```typescript
export function tokensToTailwindTheme(
  tokens: DesignTokens
): TailwindTheme {
  return {
    extend: {
      colors: {
        primary: tokens.colors.primary,
        secondary: tokens.colors.secondary,
        accent: tokens.colors.accent,
        success: tokens.colors.success,
        warning: tokens.colors.warning,
        error: tokens.colors.error,
        info: tokens.colors.info,
        neutral: tokens.colors.neutral
      },
      fontFamily: {
        heading: [tokens.typography.fontFamily.heading, 'sans-serif'],
        body: [tokens.typography.fontFamily.body, 'sans-serif'],
        mono: [tokens.typography.fontFamily.mono, 'monospace']
      },
      fontSize: tokens.typography.fontSize,
      fontWeight: tokens.typography.fontWeight,
      lineHeight: tokens.typography.lineHeight,
      spacing: tokens.spacing,
      borderRadius: tokens.borderRadius,
      boxShadow: tokens.shadows,
      animation: tokens.animation.keyframes,
      screens: tokens.breakpoints,
      zIndex: tokens.zIndex
    }
  };
}

export function generateTailwindConfig(
  tokens: DesignTokens,
  brandName: string
): string {
  const theme = tokensToTailwindTheme(tokens);

  return `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: ${JSON.stringify(theme, null, 2)},
  plugins: [],
}
  `;
}
```

**Integration Tests**:
- Tailwind config generates correctly
- All tokens map to Tailwind theme
- Generated config is valid JavaScript
- Config works with Tailwind CLI

---

### Phase 4: Token Validation
**File**: `lib/tokens/validator.ts`

**Functions to implement**:
```typescript
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export function validateTokens(
  tokens: DesignTokens
): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Validate color contrast
  const contrastIssues = validateColorContrast(tokens.colors);
  errors.push(...contrastIssues);

  // Validate naming conventions
  const namingIssues = validateNamingConventions(tokens);
  warnings.push(...namingIssues);

  // Validate type consistency
  const typeIssues = validateTypeConsistency(tokens);
  errors.push(...typeIssues);

  // Validate accessibility
  const a11yIssues = validateAccessibility(tokens);
  warnings.push(...a11yIssues);

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

function validateColorContrast(colors: ColorTokens): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check WCAG AA compliance (4.5:1 for normal text)
  const primaryOnWhite = getContrastRatio(colors.primary[600], '#FFFFFF');
  if (primaryOnWhite < 4.5) {
    errors.push({
      code: 'CONTRAST_TOO_LOW',
      message: `Primary color contrast ratio ${primaryOnWhite.toFixed(2)}:1 is below WCAG AA (4.5:1)`,
      severity: 'error',
      token: 'colors.primary.600'
    });
  }

  return errors;
}
```

**Unit Tests**:
- Contrast validation detects issues
- Naming convention checks work
- Type consistency validation
- Accessibility checks pass

---

### Phase 5: Token Documentation Generator
**File**: `lib/tokens/documentation.ts`

**Functions to implement**:
```typescript
export function generateTokenDocumentation(
  tokens: DesignTokens,
  brandName: string
): string {
  return `
# ${brandName} Design Tokens

## Color System

### Primary Colors
${generateColorTable(tokens.colors.primary, 'primary')}

### Secondary Colors
${generateColorTable(tokens.colors.secondary, 'secondary')}

## Typography

### Font Families
- **Heading**: ${tokens.typography.fontFamily.heading}
- **Body**: ${tokens.typography.fontFamily.body}
- **Mono**: ${tokens.typography.fontFamily.mono}

### Font Sizes
${generateTypographyTable(tokens.typography.fontSize)}

## Spacing Scale
${generateSpacingTable(tokens.spacing)}

## Usage Examples

\`\`\`tsx
// Using color tokens
<div className="bg-primary-600 text-white">
  Primary Button
</div>

// Using typography tokens
<h1 className="font-heading text-4xl font-bold">
  Heading
</h1>

// Using spacing tokens
<div className="p-4 m-2">
  Spaced content
</div>
\`\`\`
  `;
}

function generateColorTable(
  scale: ColorScale,
  name: string
): string {
  return Object.entries(scale)
    .map(([key, value]) => `| ${name}-${key} | ${value} | <div style="background: ${value}; width: 100px; height: 30px;"></div> |`)
    .join('\n');
}
```

**Unit Tests**:
- Documentation generates for all token types
- Markdown is valid
- Color swatches render correctly
- Usage examples are syntactically correct

---

## Deliverables

### Code
- [ ] `lib/tokens/types.ts` - Type definitions
- [ ] `lib/tokens/generator.ts` - Token generation functions
- [ ] `lib/tokens/tailwind-adapter.ts` - Tailwind integration
- [ ] `lib/tokens/validator.ts` - Token validation
- [ ] `lib/tokens/documentation.ts` - Auto-documentation
- [ ] `lib/tokens/index.ts` - Barrel exports
- [ ] `app/api/tokens/generate/route.ts` - Token generation API
- [ ] `app/api/tokens/validate/route.ts` - Token validation API

### Tests
- [ ] `lib/tokens/generator.test.ts` - Generation tests
- [ ] `lib/tokens/tailwind-adapter.test.ts` - Tailwind integration tests
- [ ] `lib/tokens/validator.test.ts` - Validation tests
- [ ] `tests/integration/token-system.test.ts` - E2E token tests

### Documentation
- [ ] `docs/guides/DESIGN_TOKENS_GUIDE.md` - User guide
- [ ] `docs/api/TOKENS_API.md` - API documentation
- [ ] Generated token documentation (part of brand package)

---

## Success Metrics

### Quality Metrics
- **Type coverage**: 100%
- **Naming convention compliance**: 100%
- **WCAG contrast compliance**: 100% AA
- **Token documentation coverage**: 100%

### Performance Metrics
- **Token generation**: <20ms
- **Tailwind config generation**: <50ms
- **Validation**: <100ms

### Developer Experience
- **IntelliSense accuracy**: 100% (all tokens auto-complete)
- **Type errors caught**: >95% before runtime
- **Documentation clarity**: >4.5/5 developer rating

---

## Dependencies

### External Libraries
- **tailwindcss** - CSS framework
- **chroma-js** - Color manipulation
- **wcag-contrast** - Contrast ratio calculation

### Internal Dependencies
- None (can develop in parallel)

---

## Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **Phase 1**: Type Definitions | 0.25 day | types.ts |
| **Phase 2**: Token Generator | 0.5 day | generator.ts + tests |
| **Phase 3**: Tailwind Integration | 0.5 day | tailwind-adapter.ts + tests |
| **Phase 4**: Validation | 0.5 day | validator.ts + tests |
| **Phase 5**: Documentation | 0.25 day | documentation.ts |
| **Integration & Testing** | 0.25 day | E2E tests, bug fixes |

**Total**: 2 days

---

## Merge Checklist

Before merging `feature/design-tokens` → `develop`:

- [ ] All unit tests pass
- [ ] Integration tests pass
- [ ] TypeScript compiles without errors
- [ ] 100% type coverage
- [ ] Tailwind config generates correctly
- [ ] WCAG validation passes
- [ ] Documentation generates
- [ ] No merge conflicts with develop
- [ ] Code review approved

**Merge Order Position**: Step 4 of 7 (Phase 1)
**Version Tag**: `v0.3.0-alpha.4`
**Previous Step**: feature/brand-generation (v0.3.0-alpha.3)
**Next Step**: feature/preview-deployments (v0.3.0-alpha.5)

---

**Status**: Design Complete ✅
**Implementation**: Not Started
**Documentation**: In Progress
**Testing**: Not Started
