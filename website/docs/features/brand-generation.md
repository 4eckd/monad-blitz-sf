---
sidebar_position: 1
---

# Brand Generation

MACHUPS uses Claude AI to generate complete brand packages in under 3 minutes.

## How It Works

### 1. Input Analysis

Claude AI analyzes your business idea:
- Business description
- Target audience
- Industry sector
- Style preferences (modern, classic, bold, minimal)

### 2. Brand Strategy

AI generates:
- **Brand Name**: Memorable, 1-2 words
- **Tagline**: Compelling, under 60 characters
- **Color Palette**: Primary, secondary, accent colors (WCAG AA compliant)
- **Typography**: Font families for headings and body text
- **Brand Personality**: 3-5 adjectives defining brand voice
- **Visual Style**: Design direction and aesthetic

### 3. Asset Generation

Automated creation of:
- 3 logo variants (wordmark, combination, badge)
- W3C DTCG design tokens
- 30+ React components
- 20-page brand guidelines PDF
- NFT certificate on Monad

## Generation Process

```typescript
// Example API call
const brand = await fetch('/api/generate', {
  method: 'POST',
  body: JSON.stringify({
    businessIdea: 'Sustainable coffee delivery service',
    targetAudience: 'Urban millennials aged 25-40',
    style: 'modern',
    monadAddress: '0x...'
  })
});

// Returns generation ID
const { generationId } = await brand.json();

// Poll for progress
const status = await fetch(`/api/generate/${generationId}/status`);
```

## Generation Timeline

| Step | Duration | Description |
|------|----------|-------------|
| Brand Analysis | ~10s | Claude AI analyzes input |
| Color Generation | ~15s | Creates accessible color palette |
| Logo Creation | ~30s | Generates 3 logo variants (HTML/CSS) |
| Token Export | ~15s | W3C DTCG format generation |
| Component Generation | ~45s | Creates 30+ React components |
| Guidelines PDF | ~60s | Professional 20-page document |
| NFT Minting | ~15s | Monad blockchain certificate |
| **Total** | **Under 3 min** | Complete brand package |

## Output Quality

### Logos
- **Format**: PNG (transparent) + SVG (scalable)
- **Variants**: 3 styles for different use cases
- **Technology**: HTML/CSS rendered (perfect quality)
- **Sizes**: Multiple resolutions (favicon to billboard)

### Design Tokens
- **Standard**: W3C Design Token Community Group (DTCG)
- **Format**: JSON + CSS Variables + Tailwind Config
- **Categories**: Colors, typography, spacing, radius
- **Compatibility**: All major frameworks

### Components
- **Framework**: React + TypeScript
- **Variants**: Next.js, React, HTML/CSS
- **Count**: 30+ production-ready components
- **Features**: Accessible, responsive, themeable

### Brand Guidelines
- **Format**: Professional PDF
- **Pages**: 20+ pages
- **Sections**:
  - Brand overview
  - Logo system
  - Color palette
  - Typography
  - Components
  - Usage examples
- **Quality**: Print-ready (300 DPI)

## AI Model

MACHUPS uses **Claude Sonnet 4.5** for:
- Brand strategy
- Color palette generation
- Component code generation
- Guidelines content

### Why Claude?

- **Context**: 200k token context window
- **Quality**: State-of-the-art reasoning
- **Speed**: Fast generation (2-3 min total)
- **Accuracy**: 95%+ WCAG AA compliance
- **Consistency**: Coherent brand identity

## Best Practices

### Input Quality

**Good Input:**
```
Business: "Eco-friendly coffee delivery service delivering
specialty coffee from local roasters directly to offices
and homes within 30 minutes"

Audience: "Urban millennials and Gen Z professionals
aged 25-40 who value sustainability and convenience"

Style: Modern
```

**Poor Input:**
```
Business: "Coffee app"
Audience: "Everyone"
Style: Modern
```

### Style Selection

- **Modern**: Clean, minimal, sans-serif fonts
- **Classic**: Traditional, serif fonts, timeless
- **Bold**: High contrast, vibrant colors, strong typography
- **Minimal**: Restrained palette, lots of whitespace

### Iteration

If first generation doesn't match your vision:
1. Provide more specific input
2. Try different style option
3. Adjust target audience description
4. Use premium A/B variant feature

## Limitations

- **English Only**: Currently supports English language only
- **Web Focus**: Optimized for digital/web brands
- **Style Constraints**: Limited to 4 predefined styles
- **Logo Complexity**: Text-based logos only (no complex illustrations)

## Next Steps

- [Design Tokens](./design-tokens) - Understand token system
- [Components](./components) - Explore component library
- [NFT Certificates](./nft-certificates) - Learn about blockchain provenance
