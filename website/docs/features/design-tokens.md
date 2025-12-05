---
sidebar_position: 2
---

# Design Tokens

MACHUPS generates W3C Design Token Community Group (DTCG) compliant design tokens for consistent, scalable design systems.

## What Are Design Tokens?

Design tokens are design decisions (colors, spacing, typography) represented as data. They enable:
- **Consistency**: Single source of truth for design values
- **Scalability**: Easy updates across entire brand
- **Framework Agnostic**: Use with any CSS framework
- **Theme Support**: Dark mode, variants, customization

## W3C DTCG Format

MACHUPS follows the official [W3C Design Tokens Community Group specification](https://design-tokens.github.io/community-group/format/).

### Example Token File

```json
{
  "$schema": "https://design-tokens.org/schema/version/1.0.0",
  "color": {
    "brand": {
      "primary": {
        "$value": "#0066FF",
        "$type": "color",
        "$description": "Primary brand color"
      },
      "secondary": {
        "$value": "#6E54FF",
        "$type": "color",
        "$description": "Secondary brand color"
      }
    }
  }
}
```

## Token Categories

### Colors

```json
{
  "color": {
    "brand": {
      "primary": { "$value": "#0066FF", "$type": "color" },
      "secondary": { "$value": "#6E54FF", "$type": "color" }
    },
    "semantic": {
      "success": { "$value": "#10B981", "$type": "color" },
      "error": { "$value": "#EF4444", "$type": "color" },
      "warning": { "$value": "#F59E0B", "$type": "color" },
      "info": { "$value": "#3B82F6", "$type": "color" }
    },
    "neutral": {
      "50": { "$value": "#FAFAFA", "$type": "color" },
      "100": { "$value": "#F5F5F5", "$type": "color" },
      "900": { "$value": "#171717", "$type": "color" }
    }
  }
}
```

### Typography

```json
{
  "typography": {
    "font-family": {
      "heading": {
        "$value": "Inter, system-ui, sans-serif",
        "$type": "fontFamily"
      },
      "body": {
        "$value": "Inter, system-ui, sans-serif",
        "$type": "fontFamily"
      },
      "mono": {
        "$value": "JetBrains Mono, monospace",
        "$type": "fontFamily"
      }
    },
    "font-size": {
      "xs": { "$value": "0.75rem", "$type": "dimension" },
      "sm": { "$value": "0.875rem", "$type": "dimension" },
      "base": { "$value": "1rem", "$type": "dimension" },
      "lg": { "$value": "1.125rem", "$type": "dimension" },
      "xl": { "$value": "1.25rem", "$type": "dimension" },
      "2xl": { "$value": "1.5rem", "$type": "dimension" },
      "3xl": { "$value": "1.875rem", "$type": "dimension" },
      "4xl": { "$value": "2.25rem", "$type": "dimension" }
    },
    "font-weight": {
      "normal": { "$value": "400", "$type": "fontWeight" },
      "medium": { "$value": "500", "$type": "fontWeight" },
      "semibold": { "$value": "600", "$type": "fontWeight" },
      "bold": { "$value": "700", "$type": "fontWeight" }
    }
  }
}
```

### Spacing

Based on 8-point grid system:

```json
{
  "spacing": {
    "xs": { "$value": "0.25rem", "$type": "dimension" },
    "sm": { "$value": "0.5rem", "$type": "dimension" },
    "md": { "$value": "1rem", "$type": "dimension" },
    "lg": { "$value": "1.5rem", "$type": "dimension" },
    "xl": { "$value": "2rem", "$type": "dimension" },
    "2xl": { "$value": "3rem", "$type": "dimension" },
    "3xl": { "$value": "4rem", "$type": "dimension" }
  }
}
```

### Border Radius

```json
{
  "border-radius": {
    "none": { "$value": "0", "$type": "dimension" },
    "sm": { "$value": "0.25rem", "$type": "dimension" },
    "md": { "$value": "0.5rem", "$type": "dimension" },
    "lg": { "$value": "1rem", "$type": "dimension" },
    "full": { "$value": "9999px", "$type": "dimension" }
  }
}
```

## Export Formats

MACHUPS generates tokens in multiple formats:

### 1. JSON (W3C DTCG)

Standard format for tooling and documentation.

**File**: `tokens/tokens.json`

### 2. CSS Variables

For direct browser usage:

```css
/* tokens/tokens.css */
:root {
  /* Colors */
  --color-brand-primary: #0066FF;
  --color-brand-secondary: #6E54FF;

  /* Typography */
  --font-family-heading: Inter, system-ui, sans-serif;
  --font-size-base: 1rem;

  /* Spacing */
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
}
```

### 3. Tailwind Config

For Tailwind CSS projects:

```javascript
// tokens/tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0066FF',
          secondary: '#6E54FF'
        }
      },
      fontFamily: {
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem'
      }
    }
  }
}
```

### 4. SCSS Variables

For Sass/SCSS projects:

```scss
// tokens/tokens.scss
$color-brand-primary: #0066FF;
$color-brand-secondary: #6E54FF;

$font-family-heading: Inter, system-ui, sans-serif;
$font-size-base: 1rem;

$spacing-md: 1rem;
$spacing-lg: 1.5rem;
```

## Using Tokens

### In React

```tsx
import tokens from './tokens/tokens.json';

function Button() {
  return (
    <button style={{
      backgroundColor: tokens.color.brand.primary.$value,
      padding: `${tokens.spacing.sm.$value} ${tokens.spacing.md.$value}`,
      borderRadius: tokens['border-radius'].md.$value,
      fontFamily: tokens.typography['font-family'].body.$value
    }}>
      Click Me
    </button>
  );
}
```

### In Tailwind CSS

```tsx
// After importing tailwind.config.js
function Button() {
  return (
    <button className="bg-brand-primary text-white px-md py-sm rounded-md">
      Click Me
    </button>
  );
}
```

### In Plain CSS

```html
<link rel="stylesheet" href="tokens/tokens.css">

<style>
  .button {
    background-color: var(--color-brand-primary);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-md);
  }
</style>
```

## Accessibility

All generated color tokens meet WCAG AA standards:

- **Normal Text**: 4.5:1 contrast ratio minimum
- **Large Text**: 3:1 contrast ratio minimum
- **UI Components**: 3:1 contrast ratio for interactive elements

### Color Contrast Matrix

MACHUPS automatically generates:

| Combination | Contrast | WCAG Level |
|-------------|----------|------------|
| Primary on White | 4.63:1 | AA ✓ |
| Secondary on Black | 8.21:1 | AAA ✓ |
| Text on Background | 12.1:1 | AAA ✓ |

## Theme Support

### Dark Mode

```json
{
  "color": {
    "background": {
      "light": { "$value": "#FFFFFF", "$type": "color" },
      "dark": { "$value": "#0E091C", "$type": "color" }
    },
    "text": {
      "light": { "$value": "#171717", "$type": "color" },
      "dark": { "$value": "#FAFAFA", "$type": "color" }
    }
  }
}
```

### CSS Implementation

```css
:root {
  --bg: #FFFFFF;
  --text: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0E091C;
    --text: #FAFAFA;
  }
}
```

## Best Practices

### Naming Conventions

✅ **Good:**
- `color-brand-primary`
- `spacing-md`
- `font-size-base`

❌ **Bad:**
- `blue-color`
- `16px-spacing`
- `font1`

### Token Organization

Structure tokens by:
1. **Category**: color, typography, spacing
2. **Semantic Meaning**: brand, semantic, neutral
3. **Variant**: primary, secondary, tertiary

### Updating Tokens

When updating:
1. Update source JSON file
2. Regenerate CSS/Tailwind/SCSS exports
3. Test in staging environment
4. Deploy to production

## Tools & Integrations

### Figma

Use [Tokens Studio](https://tokens.studio/) plugin to sync tokens with Figma.

### Storybook

Import tokens into Storybook for component documentation:

```javascript
// .storybook/preview.js
import '../tokens/tokens.css';
```

### Style Dictionary

Convert MACHUPS tokens to other formats using [Style Dictionary](https://amzn.github.io/style-dictionary/).

## Next Steps

- [Components](./components) - See tokens in action
- [Brand Generation](./brand-generation) - How tokens are created
- [API Reference](../api/overview) - Programmatic access
