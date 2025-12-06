# GONADS Brand Guidelines
**Balls to the Wall DeFi**

---

## Table of Contents

1. [Brand Overview](#brand-overview)
2. [Logo System](#logo-system)
3. [Color Palette](#color-palette)
4. [Typography](#typography)
5. [Design Tokens](#design-tokens)
6. [Component Library](#component-library)
7. [Voice & Tone](#voice--tone)
8. [Usage Examples](#usage-examples)
9. [Do's and Don'ts](#dos-and-donts)

---

## Brand Overview

### Mission
To create the most ballsy, community-driven NFT project in web3, where memes meet value and testicular fortitude meets blockchain innovation.

### Brand Personality
- **Bold & Audacious** - We don't shy away from risks
- **Playfully Irreverent** - Humor is our currency
- **Community-Driven** - Built by degens, for degens
- **Meme-Savvy** - We speak internet fluently
- **Unapologetically Fun** - Serious about fun, fun about serious

### Target Audience
- **Age:** 25-40 years old
- **Profile:** Crypto-native, tech-savvy developers and NFT collectors
- **Mindset:** Early adopters, meme enthusiasts, community-oriented
- **Values:** Authenticity, humor, innovation, community ownership

### Positioning Statement
> "GONADS is where the boldest degens gather. We're not just another PFP project—we're building a testicular fortress of value, memes, and community ownership in the heart of web3."

---

## Logo System

### Wordmark Logo
**Usage:** Primary brand identifier, headers, marketing materials

**Specifications:**
- Font: Inter Black (900 weight)
- Gradient: Purple (#9333EA) to Teal (#14B8A6)
- Letter spacing: -0.05em
- Includes animated dot with glow effect

**Files:**
- `logos/wordmark.html` - Interactive HTML/CSS version
- `logos/wordmark.svg` - Vector export
- `logos/wordmark.png` - Raster export (transparent)

### Combination Logo
**Usage:** Website headers, social media, documentation

**Specifications:**
- Icon: Dual-circle design with connecting gradient
- Text: Wordmark + tagline "Balls to the Wall DeFi"
- Spacing: 24px gap between icon and text

**Files:**
- `logos/combination.html`
- `logos/combination.svg`
- `logos/combination.png`

### Badge Logo
**Usage:** App icons, social avatars, NFT metadata

**Specifications:**
- Circular design with gradient border
- Centered icon and text
- Includes "EST. 2025" badge
- Rotating animation on hover

**Files:**
- `logos/badge.html`
- `logos/badge.svg`
- `logos/badge.png`

### Logo Clearspace
Maintain minimum clearspace equal to the height of the letter "G" around all logo variations.

### Logo Don'ts
❌ Don't change the gradient colors
❌ Don't rotate or skew the logo
❌ Don't add drop shadows or effects
❌ Don't place on busy backgrounds without background treatment
❌ Don't recreate the logo in other fonts

---

## Color Palette

### Primary Colors

#### Ballsy Purple
- **Hex:** `#9333EA`
- **RGB:** `147, 51, 234`
- **Use:** Primary CTAs, headings, brand emphasis
- **Accessibility:** WCAG AA compliant on dark backgrounds

#### Testicular Teal
- **Hex:** `#14B8A6`
- **RGB:** `20, 184, 166`
- **Use:** Secondary CTAs, accents, highlights
- **Accessibility:** WCAG AA compliant on dark backgrounds

#### Vitality Orange
- **Hex:** `#F97316`
- **RGB:** `249, 115, 22`
- **Use:** Accent color, urgent CTAs, special highlights
- **Accessibility:** WCAG AAA compliant on dark backgrounds

### Background Colors

#### Midnight Meme (Primary Dark)
- **Hex:** `#0F172A`
- **RGB:** `15, 23, 42`
- **Use:** Primary background, dark mode base

#### Slate 800 (Secondary Dark)
- **Hex:** `#1E293B`
- **RGB:** `30, 41, 59`
- **Use:** Card backgrounds, elevated surfaces

#### Moonshot White (Light)
- **Hex:** `#F8FAFC`
- **RGB:** `248, 250, 252`
- **Use:** Light mode backgrounds (if applicable)

### Neutral Grays

| Name | Hex | Use |
|------|-----|-----|
| Neutral 50 | `#F8FAFC` | Lightest text, highlights |
| Neutral 100 | `#F1F5F9` | Very light backgrounds |
| Neutral 200 | `#E2E8F0` | Borders, dividers (light) |
| Neutral 300 | `#CBD5E1` | Secondary text (light) |
| Neutral 400 | `#94A3B8` | Placeholder text |
| Neutral 500 | `#64748B` | Tertiary text |
| Neutral 600 | `#475569` | Secondary text (dark) |
| Neutral 700 | `#334155` | Borders, dividers (dark) |
| Neutral 800 | `#1E293B` | Card backgrounds |
| Neutral 900 | `#0F172A` | Primary background |

### Semantic Colors

| Purpose | Hex | Use |
|---------|-----|-----|
| Success | `#10B981` | Successful actions, confirmations |
| Warning | `#F59E0B` | Warnings, cautions |
| Error | `#EF4444` | Errors, destructive actions |
| Info | `#3B82F6` | Informational messages |

### Gradients

#### Primary Gradient
```css
background: linear-gradient(135deg, #9333EA 0%, #14B8A6 100%);
```
**Use:** Primary CTAs, headings, emphasis

#### Accent Gradient
```css
background: linear-gradient(135deg, #F97316 0%, #9333EA 100%);
```
**Use:** Special CTAs, highlights, premium features

#### Dark Gradient
```css
background: linear-gradient(180deg, #0F172A 0%, #1E293B 100%);
```
**Use:** Background variations, depth

---

## Typography

### Font Families

#### Heading Font: Inter
- **Weights:** 700 (Bold), 800 (Extra Bold), 900 (Black)
- **Use:** Headlines, CTAs, logo
- **Fallback:** `system-ui, -apple-system, sans-serif`

#### Body Font: Inter
- **Weights:** 400 (Regular), 500 (Medium), 600 (Semi Bold)
- **Use:** Body text, UI elements, descriptions
- **Fallback:** `system-ui, -apple-system, sans-serif`

#### Monospace Font: JetBrains Mono
- **Weights:** 400 (Regular), 700 (Bold)
- **Use:** Code snippets, wallet addresses, stats
- **Fallback:** `Consolas, monospace`

### Type Scale

| Size | Rem | Pixels | Use |
|------|-----|--------|-----|
| xs | 0.75rem | 12px | Fine print, labels |
| sm | 0.875rem | 14px | Small UI text |
| base | 1rem | 16px | Body text |
| lg | 1.125rem | 18px | Large body text |
| xl | 1.25rem | 20px | Small headings |
| 2xl | 1.5rem | 24px | Section subheadings |
| 3xl | 1.875rem | 30px | Card titles |
| 4xl | 2.25rem | 36px | Section headings |
| 5xl | 3rem | 48px | Page headings |
| 6xl | 3.75rem | 60px | Hero headings |

### Typography Examples

```css
/* Hero Heading */
.hero-heading {
  font-family: Inter, sans-serif;
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #9333EA 0%, #14B8A6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Body Text */
.body-text {
  font-family: Inter, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
  color: #CBD5E1;
}

/* Monospace (Wallet Address) */
.wallet-address {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  font-weight: 400;
  color: #9333EA;
}
```

---

## Design Tokens

All design tokens follow W3C Design Token Community Group (DTCG) specification.

### Token File
`design-tokens.json` - Complete W3C DTCG compliant token system

### Token Categories

1. **Colors** - Brand, neutral, semantic, gradients
2. **Typography** - Font families, sizes, weights, line heights, letter spacing
3. **Spacing** - xs through 5xl (4px to 128px)
4. **Border Radius** - none, sm, md, lg, xl, 2xl, full
5. **Shadows** - sm, md, lg, xl, glow effects
6. **Animations** - Durations, easing functions
7. **Z-Index** - Layering system

### Usage with Tailwind CSS

```javascript
// tailwind.config.ts
import tokens from './design-tokens.json';

export default {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: tokens.color.brand.primary.$value,
          secondary: tokens.color.brand.secondary.$value,
        },
      },
    },
  },
};
```

---

## Component Library

### Available Components

1. **Button** - Primary, Secondary, Accent, Ghost variants
2. **Input** - Text inputs with label, error states, icons
3. **Card** - Default, Gradient, Glow variants
4. **Header** - Navigation with wallet connection
5. **Footer** - Full footer with links and social

### Component Files
Located in `components/` directory:
- `Button.tsx`
- `Input.tsx`
- `Card.tsx`
- `Header.tsx`
- `Footer.tsx`
- `index.ts` - Barrel export

### Usage Example

```tsx
import { Button, Card, CardTitle, CardContent } from '@/components';

<Card variant="glow" hoverable>
  <CardTitle>Mint Your Gonads</CardTitle>
  <CardContent>
    <p>Get your pair before they're gone!</p>
    <Button variant="primary" size="lg">
      Mint Now
    </Button>
  </CardContent>
</Card>
```

---

## Voice & Tone

### Brand Voice Principles

#### Bold & Direct
✅ **Do:** "Grab your Gonads"
❌ **Don't:** "Please consider acquiring our NFT collection"

#### Playful but Professional
✅ **Do:** "Built by degens, for degens"
❌ **Don't:** "Our team consists of inexperienced traders"

#### Community-First
✅ **Do:** "Join the Sack" (Discord/community)
❌ **Don't:** "Subscribe to our mailing list"

#### Meme-Savvy
✅ **Do:** Use web3 slang appropriately (gm, wagmi, wen moon)
❌ **Don't:** Force memes or use outdated references

### Copy Examples

#### Headlines
- "The NFT Project with Real Balls"
- "Balls to the Wall DeFi"
- "Testicular Fortitude Meets Blockchain"

#### CTAs
- "Grab Your Gonads"
- "Join the Sack"
- "Mint Your Pair"
- "Get Ballsy"

#### Community
- "The Sack" (Discord community)
- "Gonad Holders"
- "The Descent" (Roadmap)

#### Features
- "Testicular Traits" (NFT attributes)
- "Ballsy Benefits" (Holder perks)
- "Sack Stats" (Analytics)

---

## Usage Examples

### Web Page Header
```html
<header class="bg-neutral-900 border-b border-neutral-800">
  <div class="flex items-center justify-between">
    <img src="logos/combination.svg" alt="GONADS" />
    <button class="btn-primary">Connect Wallet</button>
  </div>
</header>
```

### Hero Section
```html
<section class="hero">
  <h1 class="gradient-text">The NFT Project with Real Balls</h1>
  <p class="text-neutral-300">
    Built by degens, for degens. Where memes meet value.
  </p>
  <button class="btn-accent">Grab Your Gonads</button>
</section>
```

### Social Media Profile
- **Profile Picture:** Badge logo (badge.png)
- **Cover Image:** Hero graphic with wordmark
- **Bio:** "Balls to the Wall DeFi 🎱 | 10K NFTs on Monad | Join the Sack 👇"

---

## Do's and Don'ts

### Colors
✅ **DO:** Use gradient backgrounds for CTAs
✅ **DO:** Maintain WCAG AA contrast ratios
✅ **DO:** Use semantic colors for their intended purpose
❌ **DON'T:** Use brand colors for error/warning states
❌ **DON'T:** Create new color variations
❌ **DON'T:** Use pure white (#FFFFFF) or pure black (#000000)

### Typography
✅ **DO:** Use Inter for all text
✅ **DO:** Use appropriate font weights for hierarchy
✅ **DO:** Use monospace for wallet addresses/code
❌ **DON'T:** Use Comic Sans, Papyrus, or joke fonts
❌ **DON'T:** Use more than 3 font sizes per page
❌ **DON'T:** Set body text below 16px

### Components
✅ **DO:** Use provided React components
✅ **DO:** Follow design token system
✅ **DO:** Maintain consistent spacing
❌ **DON'T:** Create custom components without tokens
❌ **DON'T:** Use inline styles
❌ **DON'T:** Override component colors arbitrarily

### Messaging
✅ **DO:** Be bold and playful
✅ **DO:** Use testicular references tastefully
✅ **DO:** Speak directly to the community
❌ **DON'T:** Be vulgar or offensive
❌ **DON'T:** Use corporate speak
❌ **DON'T:** Take yourself too seriously

---

## Contact & Support

**Brand Package Generated by:** MACHUPS
**Platform:** AI-Powered Brand Generation
**Event:** Monad Blitz SF #18
**Date:** December 6, 2025

**Questions?**
Email: brand@gonads.io
Discord: [Join the Sack](https://discord.gg/gonads)

---

**© 2025 GONADS. All rights reserved. Built on Monad.**

*These guidelines are a living document. Last updated: 2025-12-06*
