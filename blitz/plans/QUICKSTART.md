# MACHUPS Quick Reference - Tech Stack Handler

## 🎯 ONE Function For All Tech Stacks

```typescript
// src/lib/exporters/universal-exporter.ts

export function exportBrand(brand: Brand, userPreferences: UserPrefs) {
  return {
    // LOGOS (same for everyone)
    logos: brand.logos, // HTML/CSS generated, already PNG/SVG
    
    // TOKENS (format based on preference)
    tokens: exportTokens(brand.tokens, userPreferences.cssFramework),
    
    // COMPONENTS (tech stack specific)
    components: exportComponents(brand.components, userPreferences.techStack),
    
    // GUIDELINES (same for everyone)
    guidelines: brand.guidelinesPDF,
    
    // PREMIUM (if purchased)
    pitchDeck: userPreferences.premium ? brand.pitchDeck : null
  };
}

// ========================================
// TOKEN EXPORT - ONE SWITCH STATEMENT
// ========================================

function exportTokens(tokens: DesignTokens, framework: string) {
  switch(framework) {
    case 'tailwind':
      return {
        'tailwind.config.js': generateTailwindConfig(tokens),
        'tokens.json': tokens // also include raw
      };
      
    case 'css':
      return {
        'variables.css': generateCSSVariables(tokens),
        'tokens.json': tokens
      };
      
    case 'scss':
      return {
        '_variables.scss': generateSCSSVariables(tokens),
        'tokens.json': tokens
      };
      
    default: // just JSON
      return {
        'tokens.json': tokens
      };
  }
}

// ========================================
// COMPONENT EXPORT - ONE SWITCH STATEMENT
// ========================================

function exportComponents(components: Component[], techStack: string) {
  switch(techStack) {
    case 'react-typescript':
      return components.map(c => ({
        filename: `${c.name}.tsx`,
        code: generateReactTSComponent(c)
      }));
      
    case 'nextjs':
      return components.map(c => ({
        filename: `${c.name}.tsx`,
        code: generateNextComponent(c)
      }));
      
    case 'react-javascript':
      return components.map(c => ({
        filename: `${c.name}.jsx`,
        code: generateReactJSComponent(c)
      }));
      
    case 'vue':
      return components.map(c => ({
        filename: `${c.name}.vue`,
        code: generateVueComponent(c)
      }));
      
    default: // HTML + CSS
      return components.map(c => ({
        filename: `${c.name}.html`,
        code: generateHTMLComponent(c)
      }));
  }
}
```

## 📊 Decision Flow Diagram

```
User submits form
       ↓
   Extract preferences:
   ├─ Tech Stack?
   │  ├─ React + TypeScript → .tsx files
   │  ├─ Next.js → .tsx with 'use client'
   │  ├─ React + JS → .jsx files
   │  ├─ Vue → .vue files
   │  └─ None → .html + .css
   │
   └─ CSS Framework?
      ├─ Tailwind → tailwind.config.js
      ├─ CSS → variables.css
      ├─ SCSS → _variables.scss
      └─ None → tokens.json only
       ↓
   Generate brand (same for all)
       ↓
   Export in correct format
       ↓
   Package into ZIP
```

## 🎨 Component Template Examples

### React TypeScript
```typescript
// Button.tsx
import React from 'react';
import type { FC } from 'react';
import { tokens } from './tokens';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({ 
  variant = 'primary', 
  children 
}) => (
  <button 
    className={`btn btn-${variant}`}
    style={{
      backgroundColor: tokens.color.brand[variant],
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`
    }}
  >
    {children}
  </button>
);
```

### Next.js
```typescript
// Button.tsx
'use client';

export default function Button({ 
  variant = 'primary', 
  children 
}: {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}) {
  return (
    <button className={`btn btn-${variant}`}>
      {children}
    </button>
  );
}
```

### Plain HTML
```html
<!-- Button.html -->
<button class="btn btn-primary">
  Click Me
</button>

<style>
  .btn {
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    font-family: var(--font-body);
  }
  .btn-primary {
    background: var(--color-primary);
    color: white;
  }
</style>
```

## 💰 Premium Feature Flow

```
User completes FREE generation
       ↓
   Show results + premium options:
   
   ┌─────────────────────────────┐
   │ 💎 UPGRADE YOUR PACKAGE     │
   ├─────────────────────────────┤
   │ ✓ Pitch Deck (10 slides)    │
   │   Price: 0.01 MON (~$0.20)  │
   │   [Purchase with x402]      │
   │                             │
   │ ✓ A/B Testing Variants      │
   │   Price: 0.005 MON (~$0.10) │
   │   [Purchase with x402]      │
   └─────────────────────────────┘
       ↓
   User clicks [Purchase]
       ↓
   x402 payment modal appears
       ↓
   User signs transaction
       ↓
   Backend verifies payment:
   - Check x-payment header
   - Verify amount
   - Verify destination
       ↓
   If valid:
     → Generate premium content
     → Add to download package
     → Send confirmation
   
   If invalid:
     → Show error
     → Request payment again
```

## 🔧 Implementation Priority

### Week 1 (If you have prep time)
```bash
# Build and test core generators
1. Logo generator (HTML/CSS) ✓
2. Color palette generator ✓
3. Token generator ✓
4. Test with ONE tech stack (React TS) ✓
```

### Event Day - Hour 0-4
```bash
# Core functionality
1. Input form
2. Claude integration
3. All generators connected
4. Component export (React TS only)
5. Package into ZIP
```

### Event Day - Hour 4-8
```bash
# Multiple tech stacks
1. Add Next.js support
2. Add plain HTML support
3. Add Tailwind export
4. Test all combinations
```

### Event Day - Hour 8-11
```bash
# Premium features + Polish
1. x402 integration
2. Pitch deck generator
3. NFT minting
4. UI polish
5. Deploy + demo prep
```

## 🎯 Testing Checklist

Before demo:
- [ ] Generate brand with React + TypeScript
- [ ] Generate brand with Next.js
- [ ] Generate brand with Tailwind
- [ ] Generate brand with plain CSS
- [ ] Purchase pitch deck with x402
- [ ] Mint NFT
- [ ] Download ZIP and verify contents
- [ ] Test on mobile device

## 🚨 If Running Behind

Cut in this order:
1. ❌ Vue support
2. ❌ SCSS export
3. ❌ A/B testing variants
4. ❌ Multiple logo styles (keep just 3)
5. ❌ Docusaurus docs
6. ❌ Penpot export

Keep:
- ✅ React TypeScript (primary)
- ✅ Tailwind export (most popular)
- ✅ HTML/CSS logos (core feature)
- ✅ Branding guidelines PDF (using your script)
- ✅ Pitch deck (shows x402)
- ✅ NFT (Monad integration)

## 📦 File Package Structure

```
brand-package.zip
├── logos/
│   ├── logo-wordmark.png
│   ├── logo-wordmark.svg
│   ├── logo-icon.png
│   ├── logo-icon.svg
│   ├── logo-combination.png
│   └── logo-combination.svg
│
├── tokens/
│   ├── tokens.json              (W3C DTCG)
│   ├── variables.css            (if CSS selected)
│   ├── tailwind.config.js       (if Tailwind selected)
│   └── _variables.scss          (if SCSS selected)
│
├── components/
│   ├── Button.tsx               (tech stack specific)
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Header.tsx
│   └── Footer.tsx
│
├── guidelines/
│   └── BrandingGuidelines.pdf   (20 pages)
│
├── premium/                      (if purchased)
│   ├── PitchDeck.pdf
│   ├── PitchDeck.pptx
│   └── ab-variants.json
│
├── nft/
│   └── certificate.json          (NFT metadata)
│
└── README.md                     (How to use everything)
```

## 🎬 Demo Script (30 seconds)

"Watch this. I'm going to generate a complete brand in 3 minutes."

[Types: "Sustainable coffee delivery"]
[Selects: React + TypeScript, Tailwind]
[Clicks: Generate]

"30 seconds - logos appearing..."
"1 minute - components generated..."
"2 minutes - complete guidelines PDF..."
"2:45 - NFT minted on Monad..."

"Done. Full brand package with logos, design system, React components, PDF guidelines, and an NFT certificate. All in under 3 minutes."

"Want a pitch deck? Click here, pay 0.01 MON via x402, get 10 slides instantly."

---

**KEEP IT SIMPLE. MAKE IT WORK. SHIP IT.** 🚀