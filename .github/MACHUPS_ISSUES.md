# 🎫 MACHUPS - Complete GitHub Issues List

**Event:** Monad Blitz #18
**Total Issues:** 40+
**Repository:** https://github.com/4eckd/monad-blitz-sf

---

## 📋 How to Use This Document

This document contains all GitHub issues for the MACHUPS project, organized by phase.

**To create issues:**
1. Manual: Copy issue content, create new issue in GitHub, paste, add labels
2. Automated: Use the provided script `scripts/create-machups-issues.sh`
3. GitHub CLI: Use `gh issue create` with templates

**Issue Format:**
- **Title:** Short, actionable
- **Labels:** Type, Priority, Phase, Component, Effort
- **Milestone:** Checkpoint 1-4
- **Description:** Context, tasks, acceptance criteria

---

# PHASE 1: FOUNDATION (H0-H3)

**Goal:** Dev environment setup, Claude API working, basic logo generator functional

---

## Issue #1: Project Setup & Environment Configuration

**Title:** [Phase 1] Project Setup & Environment Configuration

**Labels:**
- `P0-critical`
- `phase-1-foundation`
- `type-devops`
- `component-logo-gen`
- `effort-m`
- `milestone-checkpoint-1`

**Assignee:** DevOps Lead

**Milestone:** Checkpoint 1: Foundation Complete (H3:00)

**Description:**
```markdown
## 🎯 Objective
Set up complete development environment for MACHUPS

## 📋 Tasks
- [ ] Clone repository and verify access
- [ ] Install Node.js v18+ and pnpm
- [ ] Install all dependencies (`pnpm install`)
- [ ] Set up environment variables (.env.local)
- [ ] Install required packages:
  - [ ] @anthropic-ai/sdk
  - [ ] thirdweb
  - [ ] html-to-image
  - [ ] next@latest
  - [ ] jszip (for exports)
- [ ] Test local development server (`npm run dev`)
- [ ] Verify hot reload working
- [ ] Configure Cloudflare Pages (later)

## 🔑 Environment Variables Needed
```bash
# Claude API
CLAUDE_API_KEY=sk-ant-xxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Thirdweb (for later)
THIRDWEB_SECRET_KEY=xxx
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=xxx

# Monad
NEXT_PUBLIC_MONAD_RPC_URL=https://testnet-rpc.monad.xyz
NEXT_PUBLIC_MONAD_CHAIN_ID=10143
```

## ✅ Acceptance Criteria
- [ ] `npm run dev` starts server on localhost:3000
- [ ] No console errors or warnings
- [ ] Hot reload works (edit file, see changes)
- [ ] All environment variables set
- [ ] Git repo accessible and synced

## ⏱️ Estimated Time
1-2 hours

## 📚 Resources
- Next.js docs: https://nextjs.org/docs
- Anthropic SDK: https://github.com/anthropics/anthropic-sdk-typescript
- Monad docs: https://docs.monad.xyz/
```

---

## Issue #2: Claude API Integration & Testing

**Title:** [Phase 1] Claude API Integration & Testing

**Labels:**
- `P0-critical`
- `phase-1-foundation`
- `type-ai-generation`
- `integration-claude-api`
- `effort-m`
- `milestone-checkpoint-1`

**Description:**
```markdown
## 🎯 Objective
Integrate Claude API and verify it's working correctly for AI generation

## 📋 Tasks
- [ ] Install @anthropic-ai/sdk package
- [ ] Create API utility wrapper (`lib/claude.ts`)
- [ ] Implement error handling for API calls
- [ ] Add token counting function
- [ ] Add rate limit handling
- [ ] Create test endpoint (`/api/test-claude`)
- [ ] Verify API key is valid
- [ ] Test with sample prompts
- [ ] Add loading states
- [ ] Implement retry logic

## 💻 Code Structure
```typescript
// lib/claude.ts
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function callClaude(prompt: string) {
  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    });
    return response.content[0].text;
  } catch (error) {
    // Handle rate limits, errors
    console.error('Claude API Error:', error);
    throw error;
  }
}
```

## ✅ Acceptance Criteria
- [ ] API calls succeed with valid key
- [ ] Error handling works (invalid key, rate limit)
- [ ] Token counting is accurate
- [ ] Response times are reasonable (<10s)
- [ ] Can handle concurrent requests
- [ ] Test endpoint `/api/test-claude` returns success

## 🧪 Test Cases
1. Valid prompt → Returns generated text
2. Invalid API key → Returns error message
3. Empty prompt → Returns validation error
4. Large prompt (>100k tokens) → Returns error

## ⏱️ Estimated Time
1-1.5 hours

## 📚 Resources
- Anthropic SDK docs: https://docs.anthropic.com/claude/reference/getting-started
- Rate limits: https://docs.anthropic.com/claude/reference/rate-limits
```

---

## Issue #3: Basic HTML/CSS Logo Generator

**Title:** [Phase 1] Basic HTML/CSS Logo Generator

**Labels:**
- `P0-critical`
- `phase-1-foundation`
- `type-ai-generation`
- `component-logo-gen`
- `effort-l`
- `milestone-checkpoint-1`
- `demo-must-show`

**Description:**
```markdown
## 🎯 Objective
Create functional HTML/CSS logo generator using Claude AI

## 📋 Tasks
- [ ] Create `/api/generate-logo` endpoint
- [ ] Design prompt template for logo generation
- [ ] Implement HTML/CSS to SVG conversion
- [ ] Add color customization
- [ ] Create logo preview component
- [ ] Add download functionality
- [ ] Implement error handling
- [ ] Add loading states
- [ ] Test with multiple brand names

## 💡 Prompt Template
```
You are a professional logo designer. Create a modern, minimal HTML/CSS logo for a brand called "{BRAND_NAME}".

Requirements:
- Use only HTML and CSS (no images)
- Primary color: {COLOR}
- Style: {STYLE} (modern, playful, corporate, etc.)
- Include brand name in the design
- Make it responsive (SVG viewBox)
- Maximum size: 400x400px
- Use geometric shapes, gradients, or text styling

Return only the HTML/CSS code, no explanations.
```

## 🎨 Features
1. **Input:**
   - Brand name (required)
   - Primary color (color picker)
   - Style selector (modern, playful, corporate, minimal)

2. **Output:**
   - Live preview
   - HTML/CSS code
   - Download as SVG
   - Download as PNG (optional)

## ✅ Acceptance Criteria
- [ ] User can enter brand name
- [ ] User can select primary color
- [ ] "Generate Logo" button triggers API call
- [ ] Loading spinner shows during generation
- [ ] Generated logo displays in preview
- [ ] User can download logo as SVG
- [ ] Logo is usable and professional-looking
- [ ] Total generation time <30 seconds

## 🧪 Test Cases
1. Generate logo for "TechCorp" with blue color → Success
2. Generate logo with emoji in name → Handles gracefully
3. Generate logo with very long name → Truncates or wraps
4. Download SVG → File downloads correctly

## 💻 UI Components
```tsx
// components/LogoGenerator.tsx
export function LogoGenerator() {
  const [brandName, setBrandName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [style, setStyle] = useState('modern');
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generate Logo() {
    setLoading(true);
    const response = await fetch('/api/generate-logo', {
      method: 'POST',
      body: JSON.stringify({ brandName, primaryColor, style }),
    });
    const data = await response.json();
    setLogo(data.html);
    setLoading(false);
  }

  return (/* UI */)
}
```

## ⏱️ Estimated Time
2-3 hours

## 📚 Resources
- HTML to SVG: https://github.com/bubkoo/html-to-image
- CSS logo examples: https://css-tricks.com/logo-designs-done-with-css/
```

---

## Issue #4: Logo SVG Export & Download

**Title:** [Phase 1] Logo SVG Export & Download Functionality

**Labels:**
- `P1-high`
- `phase-1-foundation`
- `type-feature`
- `component-logo-gen`
- `effort-s`
- `milestone-checkpoint-1`

**Description:**
```markdown
## 🎯 Objective
Implement SVG export and download for generated logos

## 📋 Tasks
- [ ] Install `html-to-image` library
- [ ] Convert HTML/CSS to SVG
- [ ] Create download function
- [ ] Add "Download SVG" button
- [ ] Add "Download PNG" button (optional)
- [ ] Implement file naming (brand-name-logo.svg)
- [ ] Add success toast notification

## 💻 Implementation
```typescript
import { toSvg, toPng } from 'html-to-image';

async function downloadSVG(elementId: string, fileName: string) {
  const node = document.getElementById(elementId);
  const dataUrl = await toSvg(node);

  const link = document.createElement('a');
  link.download = `${fileName}.svg`;
  link.href = dataUrl;
  link.click();
}
```

## ✅ Acceptance Criteria
- [ ] "Download SVG" button appears when logo generated
- [ ] Clicking downloads SVG file
- [ ] File name is `{brand-name}-logo.svg`
- [ ] SVG opens correctly in browsers
- [ ] SVG is scalable (vector format)

## ⏱️ Estimated Time
30min - 1 hour
```

---

## Issue #5: Basic UI/UX for Logo Generator

**Title:** [Phase 1] Basic UI/UX for Logo Generator

**Labels:**
- `P1-high`
- `phase-1-foundation`
- `type-feature`
- `area-ui-generation`
- `effort-m`
- `milestone-checkpoint-1`

**Description:**
```markdown
## 🎯 Objective
Create a clean, usable UI for the logo generator

## 📋 Tasks
- [ ] Design input form layout
- [ ] Add color picker component
- [ ] Add style selector (dropdown or buttons)
- [ ] Create logo preview area
- [ ] Add loading spinner
- [ ] Implement error states
- [ ] Add success states
- [ ] Make responsive (mobile-friendly)

## 🎨 UI Structure
1. **Hero Section**
   - Headline: "Generate Your Brand Logo in Seconds"
   - Subheading: "AI-powered logo generation"

2. **Input Section**
   - Brand Name (text input)
   - Primary Color (color picker)
   - Style (buttons: Modern | Playful | Corporate | Minimal)

3. **Action Section**
   - "Generate Logo" button (primary CTA)
   - Loading state with spinner

4. **Preview Section**
   - Empty state: "Your logo will appear here"
   - Generated logo display
   - Download buttons

## ✅ Acceptance Criteria
- [ ] UI is clean and professional
- [ ] Form inputs are accessible (labels, focus states)
- [ ] Color picker works correctly
- [ ] Loading states are clear
- [ ] Error messages are helpful
- [ ] Mobile responsive (works on phone)

## ⏱️ Estimated Time
1-2 hours
```

---

## Issue #6: Error Handling & Edge Cases

**Title:** [Phase 1] Error Handling & Edge Cases for Logo Generator

**Labels:**
- `P2-medium`
- `phase-1-foundation`
- `type-bug`
- `component-logo-gen`
- `effort-s`
- `milestone-checkpoint-1`

**Description:**
```markdown
## 🎯 Objective
Handle errors and edge cases gracefully

## 📋 Edge Cases to Handle
- [ ] Empty brand name → Show validation error
- [ ] Brand name with special characters → Sanitize
- [ ] Very long brand name (>50 chars) → Truncate or warn
- [ ] Invalid color code → Default to primary color
- [ ] API rate limit hit → Show friendly error + retry
- [ ] API error → Show error message
- [ ] Network timeout → Show timeout message
- [ ] Slow generation → Show progress indicator

## 💻 Error Messages
- Empty input: "Please enter a brand name"
- API error: "Oops! Something went wrong. Please try again."
- Rate limit: "Too many requests. Please wait 30 seconds."
- Timeout: "Generation is taking longer than expected. Hang tight!"

## ✅ Acceptance Criteria
- [ ] All error states have clear messages
- [ ] User can recover from errors (retry button)
- [ ] No app crashes on edge cases
- [ ] Loading states time out after 60s

## ⏱️ Estimated Time
30min - 1 hour
```

---

# PHASE 2: CORE FEATURES (H3-H7)

**Goal:** All generators working, component export functional, can generate complete brand

---

## Issue #7: Design Token Generator - Color Palette

**Title:** [Phase 2] Design Token Generator - Color Palette System

**Labels:**
- `P0-critical`
- `phase-2-core`
- `type-ai-generation`
- `component-tokens`
- `effort-l`
- `milestone-checkpoint-2`
- `demo-must-show`

**Description:**
```markdown
## 🎯 Objective
Generate complete color palettes with WCAG AA compliance

## 📋 Tasks
- [ ] Create `/api/generate-tokens` endpoint
- [ ] Design prompt for color palette generation
- [ ] Implement WCAG contrast validation
- [ ] Generate primary, accent, neutral colors
- [ ] Generate semantic colors (success, warning, error, info)
- [ ] Create color shades (50-900 scale)
- [ ] Export as CSS custom properties
- [ ] Export as Tailwind config (optional)

## 🎨 Color System Structure
```css
/* Primary Colors */
--color-primary-50: #EFF6FF;
--color-primary-100: #DBEAFE;
...
--color-primary-900: #1E3A8A;

/* Accent Colors */
--color-accent-50: #FAF5FF;
...

/* Neutral Colors */
--color-neutral-50: #F9FAFB;
...

/* Semantic Colors */
--color-success: #10B981;
--color-warning: #F59E0B;
--color-error: #EF4444;
--color-info: #3B82F6;
```

## ✅ Acceptance Criteria
- [ ] Generates 3-5 primary shades
- [ ] Generates 3-5 accent shades
- [ ] Generates neutral scale (50-900)
- [ ] All colors pass WCAG AA contrast (4.5:1)
- [ ] Exports as CSS file
- [ ] Preview shows all colors
- [ ] Can regenerate with different base color

## ⏱️ Estimated Time
2-3 hours
```

---

## Issue #8: Design Token Generator - Typography System

**Title:** [Phase 2] Design Token Generator - Typography System

**Labels:**
- `P1-high`
- `phase-2-core`
- `type-ai-generation`
- `component-tokens`
- `effort-m`
- `milestone-checkpoint-2`

**Description:**
```markdown
## 🎯 Objective
Generate complete typography scale and font pairings

## 📋 Tasks
- [ ] Add typography generation to `/api/generate-tokens`
- [ ] Select font pairings (heading + body)
- [ ] Generate type scale (xs, sm, base, lg, xl, 2xl, 3xl, 4xl)
- [ ] Generate font weights (light, normal, medium, semibold, bold)
- [ ] Generate line heights
- [ ] Generate letter spacing
- [ ] Export as CSS custom properties

## 📝 Typography Structure
```css
/* Font Families */
--font-primary: 'Inter', system-ui, sans-serif;
--font-secondary: 'JetBrains Mono', monospace;

/* Font Sizes */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

## ✅ Acceptance Criteria
- [ ] Generates appropriate font pairing
- [ ] Type scale is consistent (modular scale)
- [ ] Font weights are available
- [ ] Exports as CSS custom properties
- [ ] Preview shows typography samples

## ⏱️ Estimated Time
1-2 hours
```

---

## Issue #9: Design Token Generator - Spacing & Layout

**Title:** [Phase 2] Design Token Generator - Spacing & Layout Tokens

**Labels:**
- `P1-high`
- `phase-2-core`
- `type-ai-generation`
- `component-tokens`
- `effort-m`
- `milestone-checkpoint-2`

**Description:**
```markdown
## 🎯 Objective
Generate spacing scale, border radius, shadows

## 📋 Tasks
- [ ] Generate spacing scale (4px base)
- [ ] Generate border radius values
- [ ] Generate shadow system
- [ ] Generate breakpoints (responsive)
- [ ] Export as CSS custom properties

## 📐 Layout Tokens
```css
/* Spacing Scale (4px base) */
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */

/* Border Radius */
--radius-sm: 0.125rem;   /* 2px */
--radius-base: 0.25rem;  /* 4px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 0.75rem;    /* 12px */
--radius-2xl: 1rem;      /* 16px */
--radius-full: 9999px;

/* Shadows */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

## ✅ Acceptance Criteria
- [ ] Spacing uses consistent scale
- [ ] Border radius values are appropriate
- [ ] Shadows are subtle and professional
- [ ] Exports as CSS custom properties

## ⏱️ Estimated Time
1-1.5 hours
```

---

## Issue #10: React Component Generator - Button Component

**Title:** [Phase 2] React Component Generator - Button Component

**Labels:**
- `P0-critical`
- `phase-2-core`
- `type-ai-generation`
- `component-components`
- `effort-l`
- `milestone-checkpoint-2`
- `demo-must-show`

**Description:**
```markdown
## 🎯 Objective
Generate production-ready React Button component with variants

## 📋 Tasks
- [ ] Create `/api/generate-components` endpoint
- [ ] Design prompt for component generation
- [ ] Generate Button component with TypeScript
- [ ] Include variants (primary, secondary, outline, ghost)
- [ ] Include sizes (sm, base, lg)
- [ ] Include states (default, hover, active, disabled)
- [ ] Use generated design tokens
- [ ] Add accessibility (ARIA labels)

## ⚛️ Component Structure
```tsx
// Button.tsx
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'base' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  variant = 'primary',
  size = 'base',
  disabled = false,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}
```

## ✅ Acceptance Criteria
- [ ] Button component generated correctly
- [ ] Uses design tokens from previous step
- [ ] Includes all variants and sizes
- [ ] TypeScript types are correct
- [ ] Accessible (keyboard nav, ARIA)
- [ ] Exports as .tsx file
- [ ] Can be imported and used

## ⏱️ Estimated Time
2-3 hours
```

---

## Issue #11-15: Additional Component Generators

**Issues:**
- #11: Card Component Generator
- #12: Input Component Generator
- #13: Select Component Generator
- #14: Modal Component Generator
- #15: Toast Notification Component Generator

**Labels:** Same as Issue #10, `P1-high` or `P2-medium`

**Estimated Time:** 1-2 hours each

---

## Issue #16: Component Export System

**Title:** [Phase 2] Component Export System - ZIP Download

**Labels:**
- `P0-critical`
- `phase-2-core`
- `type-feature`
- `component-components`
- `effort-l`
- `milestone-checkpoint-2`
- `demo-must-show`

**Description:**
```markdown
## 🎯 Objective
Create export system to download all generated files as ZIP

## 📋 Tasks
- [ ] Install JSZip library
- [ ] Create ZIP generation function
- [ ] Include logo files (SVG, PNG)
- [ ] Include design tokens (CSS file)
- [ ] Include all React components (.tsx files)
- [ ] Include documentation (README.md)
- [ ] Add proper folder structure
- [ ] Implement download trigger
- [ ] Add progress indicator

## 📁 ZIP Structure
```
brand-name-export.zip
├── README.md
├── logos/
│   ├── logo.svg
│   ├── logo.png
│   └── logo-horizontal.svg
├── design-tokens/
│   ├── tokens.css
│   └── tailwind.config.js (optional)
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── ...
└── docs/
    ├── brand-guidelines.md
    ├── color-palette.md
    └── component-usage.md
```

## 💻 Implementation
```typescript
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

async function exportBrand(data: BrandData) {
  const zip = new JSZip();

  // Add README
  zip.file('README.md', generateReadme(data));

  // Add logos
  const logoFolder = zip.folder('logos');
  logoFolder.file('logo.svg', data.logoSVG);
  logoFolder.file('logo.png', data.logoPNG);

  // Add design tokens
  const tokensFolder = zip.folder('design-tokens');
  tokensFolder.file('tokens.css', data.tokensCSS);

  // Add components
  const componentsFolder = zip.folder('components');
  data.components.forEach(c => {
    componentsFolder.file(`${c.name}.tsx`, c.code);
  });

  // Generate and download
  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${data.brandName}-export.zip`);
}
```

## ✅ Acceptance Criteria
- [ ] ZIP contains all generated files
- [ ] Folder structure is logical
- [ ] README includes setup instructions
- [ ] Files are properly formatted
- [ ] Download works in all browsers
- [ ] Progress indicator shows during generation

## ⏱️ Estimated Time
2-3 hours
```

---

## Issue #17: Brand Documentation Generator

**Title:** [Phase 2] Brand Documentation Generator

**Labels:**
- `P1-high`
- `phase-2-core`
- `type-ai-generation`
- `component-guidelines`
- `effort-m`
- `milestone-checkpoint-2`

**Description:**
```markdown
## 🎯 Objective
Generate comprehensive brand documentation in Markdown

## 📋 Tasks
- [ ] Create `/api/generate-docs` endpoint
- [ ] Generate brand guidelines (BRANDING.md)
- [ ] Generate color palette documentation
- [ ] Generate typography documentation
- [ ] Generate component usage documentation
- [ ] Include code examples
- [ ] Include accessibility notes
- [ ] Export as Markdown files

## 📚 Documentation Structure
1. **BRANDING.md**
   - Brand name & tagline
   - Color palette with hex codes
   - Typography system
   - Logo usage guidelines
   - Dos and don'ts

2. **COMPONENTS.md**
   - Component overview
   - Usage examples
   - Props documentation
   - Accessibility notes

3. **DESIGN-TOKENS.md**
   - All design tokens
   - How to use in projects
   - Framework integration

## ✅ Acceptance Criteria
- [ ] Documentation is comprehensive
- [ ] Code examples are correct
- [ ] Markdown formatting is clean
- [ ] Includes visual examples (color swatches)
- [ ] Professional and usable

## ⏱️ Estimated Time
1-2 hours
```

---

## Issue #18: Multi-Step Generation Flow UI

**Title:** [Phase 2] Multi-Step Brand Generation Flow UI

**Labels:**
- `P0-critical`
- `phase-2-core`
- `type-feature`
- `area-ui-generation`
- `effort-l`
- `milestone-checkpoint-2`
- `demo-must-show`

**Description:**
```markdown
## 🎯 Objective
Create step-by-step UI for complete brand generation

## 📋 Steps
1. **Step 1: Brand Info**
   - Brand name
   - Tagline
   - Industry
   - Primary color

2. **Step 2: Generate Logo**
   - Style selection
   - Generate button
   - Preview
   - Approve/regenerate

3. **Step 3: Generate Design Tokens**
   - Auto-generate from Step 1 color
   - Preview color palette
   - Preview typography
   - Approve/regenerate

4. **Step 4: Generate Components**
   - Select components to generate
   - Generate all button
   - Preview components
   - Approve/regenerate

5. **Step 5: Generate Documentation**
   - Auto-generate
   - Preview docs
   - Approve

6. **Step 6: Export**
   - Review all assets
   - Download ZIP
   - Success message

## 🎨 UI Features
- Progress indicator (1/6, 2/6, etc.)
- Back/Next buttons
- Loading states for each step
- Error handling
- Preview for each generated asset

## ✅ Acceptance Criteria
- [ ] All 6 steps work correctly
- [ ] User can navigate back/forward
- [ ] Progress is saved (don't lose work)
- [ ] Each step has clear instructions
- [ ] Complete flow takes <3 minutes

## ⏱️ Estimated Time
2-3 hours
```

---

# PHASE 3: INTEGRATION (H7-H10)

**Goal:** Deployed to production, x402 working, NFT minting functional

---

## Issue #19: Cloudflare Pages Deployment

**Title:** [Phase 3] Deploy to Cloudflare Pages

**Labels:**
- `P0-critical`
- `phase-3-integration`
- `type-devops`
- `integration-cloudflare`
- `deploy-cloudflare`
- `effort-m`
- `milestone-checkpoint-3`

**Description:**
```markdown
## 🎯 Objective
Deploy MACHUPS to production on Cloudflare Pages

## 📋 Tasks
- [ ] Create Cloudflare Pages project
- [ ] Connect GitHub repository
- [ ] Configure build settings
- [ ] Set environment variables
- [ ] Deploy production build
- [ ] Verify deployment successful
- [ ] Configure custom domain (optional)
- [ ] Set up SSL certificate
- [ ] Test production site

## ⚙️ Build Configuration
```
Build command: npm run build
Output directory: .next
Node version: 18
```

## 🔑 Environment Variables (Production)
- CLAUDE_API_KEY
- NEXT_PUBLIC_APP_URL
- THIRDWEB_SECRET_KEY
- NEXT_PUBLIC_THIRDWEB_CLIENT_ID
- NEXT_PUBLIC_MONAD_RPC_URL
- NEXT_PUBLIC_MONAD_CHAIN_ID

## ✅ Acceptance Criteria
- [ ] Site is live and accessible
- [ ] No console errors in production
- [ ] All features work in production
- [ ] Environment variables are set
- [ ] SSL is active (HTTPS)

## ⏱️ Estimated Time
1-1.5 hours
```

---

## Issue #20: Thirdweb SDK Integration

**Title:** [Phase 3] Thirdweb SDK Integration for x402 Payments

**Labels:**
- `P0-critical`
- `phase-3-integration`
- `type-web3`
- `integration-thirdweb`
- `integration-x402`
- `effort-l`
- `milestone-checkpoint-3`
- `demo-must-show`

**Description:**
```markdown
## 🎯 Objective
Integrate Thirdweb SDK for wallet connection and x402 payments

## 📋 Tasks
- [ ] Install Thirdweb SDK packages
- [ ] Configure Thirdweb provider
- [ ] Add wallet connection UI
- [ ] Integrate x402 payment facilitator
- [ ] Implement free tier (3 generations)
- [ ] Implement paid tier (unlimited with top-off)
- [ ] Add balance display
- [ ] Add top-off modal
- [ ] Test with Monad testnet

## 💻 Implementation
```tsx
// app/layout.tsx
import { ThirdwebProvider } from '@thirdweb-dev/react';

export default function RootLayout({ children }) {
  return (
    <ThirdwebProvider
      activeChain="monad-testnet"
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
    >
      {children}
    </ThirdwebProvider>
  );
}

// components/WalletConnect.tsx
import { ConnectWallet } from '@thirdweb-dev/react';

export function WalletConnect() {
  return <ConnectWallet />;
}
```

## ✅ Acceptance Criteria
- [ ] Wallet connection works (MetaMask, etc.)
- [ ] Monad testnet is selected
- [ ] x402 balance displays correctly
- [ ] Top-off modal works
- [ ] Free tier limit enforced (3 generations)
- [ ] Paid tier works (deduct per generation)

## ⏱️ Estimated Time
2-3 hours
```

---

## Issue #21: Smart Contract - CreditVault.sol

**Title:** [Phase 3] Smart Contract - CreditVault for x402 Management

**Labels:**
- `P0-critical`
- `phase-3-integration`
- `type-web3`
- `area-contracts`
- `effort-l`
- `milestone-checkpoint-3`

**Description:**
```markdown
## 🎯 Objective
Create smart contract to manage x402 credits for MACHUPS

## 📋 Tasks
- [ ] Set up Foundry project
- [ ] Write CreditVault.sol contract
- [ ] Implement deposit function
- [ ] Implement deduct function
- [ ] Implement balance query
- [ ] Add events (CreditAdded, CreditUsed)
- [ ] Write tests
- [ ] Deploy to Monad testnet
- [ ] Verify contract (optional)

## 💻 Contract Structure
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CreditVault {
    mapping(address => uint256) public credits;

    event CreditAdded(address indexed user, uint256 amount);
    event CreditUsed(address indexed user, uint256 amount);

    function deposit() external payable {
        credits[msg.sender] += msg.value;
        emit CreditAdded(msg.sender, msg.value);
    }

    function deduct(address user, uint256 amount) external {
        require(credits[user] >= amount, "Insufficient credits");
        credits[user] -= amount;
        emit CreditUsed(user, amount);
    }

    function getBalance(address user) external view returns (uint256) {
        return credits[user];
    }
}
```

## ✅ Acceptance Criteria
- [ ] Contract compiles without errors
- [ ] Tests pass (deposit, deduct, balance)
- [ ] Deployed to Monad testnet
- [ ] Contract address documented
- [ ] Events emit correctly

## ⏱️ Estimated Time
1.5-2 hours
```

---

## Issue #22: Smart Contract - EventNFT.sol

**Title:** [Phase 3] Smart Contract - Event NFT Rewards

**Labels:**
- `P1-high`
- `phase-3-integration`
- `type-web3`
- `area-nft-minting`
- `effort-m`
- `milestone-checkpoint-3`
- `demo-must-show`

**Description:**
```markdown
## 🎯 Objective
Create ERC721 NFT contract for MACHUPS event rewards

## 📋 Tasks
- [ ] Write EventNFT.sol (ERC721)
- [ ] Implement minting function
- [ ] Add metadata (name, description, image)
- [ ] Set minting conditions (first top-off ≥ threshold)
- [ ] Add events (NFTMinted)
- [ ] Write tests
- [ ] Deploy to Monad testnet
- [ ] Upload NFT metadata (IPFS optional)

## 💻 Contract Structure
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MACHUPSFoundersPass is ERC721 {
    uint256 public nextTokenId;
    mapping(address => bool) public hasMinted;

    constructor() ERC721("MACHUPS Founders Pass", "MACHUPS") {}

    function mint() external {
        require(!hasMinted[msg.sender], "Already minted");

        uint256 tokenId = nextTokenId++;
        _safeMint(msg.sender, tokenId);
        hasMinted[msg.sender] = true;
    }
}
```

## ✅ Acceptance Criteria
- [ ] NFT contract deployed
- [ ] Users can mint once
- [ ] NFT appears in wallet (MetaMask)
- [ ] Metadata is correct
- [ ] Events emit correctly

## ⏱️ Estimated Time
1-2 hours
```

---

## Issue #23: x402 Payment Integration - Free Tier

**Title:** [Phase 3] x402 Free Tier Implementation

**Labels:**
- `P1-high`
- `phase-3-integration`
- `type-feature`
- `component-premium`
- `effort-m`
- `milestone-checkpoint-3`

**Description:**
```markdown
## 🎯 Objective
Implement free tier (3 generations per session)

## 📋 Tasks
- [ ] Track generation count per user
- [ ] Show remaining generations
- [ ] Block after 3 generations
- [ ] Show "Top Off" CTA
- [ ] Add upsell messaging

## 💻 Implementation
```typescript
// lib/usage-tracker.ts
export function trackUsage(userAddress: string) {
  const key = `usage_${userAddress}`;
  const count = parseInt(localStorage.getItem(key) || '0');
  const newCount = count + 1;
  localStorage.setItem(key, newCount.toString());
  return newCount;
}

export function getRemainingFree(userAddress: string): number {
  const key = `usage_${userAddress}`;
  const count = parseInt(localStorage.getItem(key) || '0');
  return Math.max(0, 3 - count);
}
```

## ✅ Acceptance Criteria
- [ ] Free tier limit enforced
- [ ] Remaining count displays correctly
- [ ] "Top Off" CTA appears after 3
- [ ] Can't generate more without payment

## ⏱️ Estimated Time
1-1.5 hours
```

---

## Issue #24: x402 Payment Integration - Paid Tier

**Title:** [Phase 3] x402 Paid Tier & Metered Payments

**Labels:**
- `P0-critical`
- `phase-3-integration`
- `type-web3`
- `component-premium`
- `integration-x402`
- `effort-l`
- `milestone-checkpoint-3`
- `demo-must-show`

**Description:**
```markdown
## 🎯 Objective
Implement paid tier with per-generation metered payments

## 📋 Tasks
- [ ] Create top-off modal
- [ ] Implement deposit flow
- [ ] Deduct credits per generation
- [ ] Show balance after each generation
- [ ] Handle insufficient balance
- [ ] Add refill CTA

## 💻 Top-Off Flow
1. User clicks "Top Off"
2. Modal shows: "Add x402 Credits"
3. Input amount (min: 0.01 ETH)
4. "Deposit" button
5. MetaMask prompts transaction
6. Transaction confirms
7. Credits update
8. NFT mints (if first top-off ≥ threshold)

## 💰 Pricing
- Free tier: 3 generations
- Per generation cost: 0.002 ETH (~$5)
- NFT mint threshold: ≥ 0.01 ETH top-off

## ✅ Acceptance Criteria
- [ ] Top-off modal works
- [ ] Deposit updates balance
- [ ] Per-generation deduction works
- [ ] Balance displays in real-time
- [ ] Insufficient balance handled

## ⏱️ Estimated Time
2-3 hours
```

---

## Issue #25: NFT Minting Integration - Frontend

**Title:** [Phase 3] NFT Minting Frontend Integration

**Labels:**
- `P1-high`
- `phase-3-integration`
- `type-web3`
- `component-nft`
- `effort-m`
- `milestone-checkpoint-3`
- `demo-must-show`

**Description:**
```markdown
## 🎯 Objective
Integrate NFT minting on frontend when user tops off

## 📋 Tasks
- [ ] Check if user has NFT
- [ ] Trigger mint on first top-off ≥ threshold
- [ ] Show minting transaction
- [ ] Display success message
- [ ] Show NFT in UI
- [ ] Link to view in wallet/explorer

## 💻 Implementation
```typescript
async function checkAndMintNFT(userAddress: string, amount: number) {
  const hasMinted = await nftContract.hasMinted(userAddress);

  if (!hasMinted && amount >= 0.01) {
    const tx = await nftContract.mint();
    await tx.wait();

    toast.success('🎉 MACHUPS Founders Pass NFT minted!');
  }
}
```

## ✅ Acceptance Criteria
- [ ] NFT mints on first top-off ≥ 0.01 ETH
- [ ] User sees minting transaction
- [ ] Success message displays
- [ ] NFT appears in wallet
- [ ] Can view on block explorer

## ⏱️ Estimated Time
1-2 hours
```

---

## Issue #26-30: Additional Phase 3 Issues

**Issues:**
- #26: Production Testing & QA
- #27: Error Monitoring Setup (Sentry optional)
- #28: Performance Optimization
- #29: Mobile Responsiveness Testing
- #30: Cross-Browser Testing

**Estimated Time:** 30min - 1.5h each

---

# PHASE 4: FINALIZATION (H10-H11)

**Goal:** Polish, testing, demo prep, submission

---

## Issue #31: UI Polish & Animations

**Title:** [Phase 4] UI Polish & Smooth Animations

**Labels:**
- `P1-high`
- `phase-4-finalization`
- `type-enhancement`
- `area-ui-generation`
- `effort-m`
- `milestone-final-submission`
- `demo-must-show`

**Description:**
```markdown
## 🎯 Objective
Add polish, animations, and professional touches to UI

## 📋 Tasks
- [ ] Add smooth transitions
- [ ] Add loading animations
- [ ] Add success animations
- [ ] Polish button states
- [ ] Add hover effects
- [ ] Add skeleton loaders
- [ ] Polish color scheme
- [ ] Fix any UI bugs

## ✅ Acceptance Criteria
- [ ] Animations are smooth (60fps)
- [ ] Loading states are clear
- [ ] Hover effects feel responsive
- [ ] Overall feel is polished

## ⏱️ Estimated Time
1-1.5 hours
```

---

## Issue #32: Demo Script Preparation

**Title:** [Phase 4] Create 5-Minute Demo Script

**Labels:**
- `P0-critical`
- `phase-4-finalization`
- `type-docs`
- `docs-demo-script`
- `event-demo-script`
- `effort-m`
- `milestone-final-submission`

**Description:**
```markdown
## 🎯 Objective
Create and practice 5-minute live demo script

## 📋 Demo Script

### Minute 0-1: Problem & Solution
"Traditional branding takes weeks. Designers, revisions, approvals... We eliminate that. MACHUPS generates your complete brand—logo, tokens, components, docs—in 3 minutes."

### Minute 1-2: Live Demo (Free Tier)
1. Enter "TechFlow" as brand name
2. Select blue primary color
3. Click "Generate Brand"
4. Show: Logo generated
5. Show: Design tokens generated
6. Show: React components generated
7. Download ZIP
8. Show contents

### Minute 2-3: x402 Integration
"Hit the free tier limit. Watch this..."
1. Click "Top Off"
2. Connect MetaMask
3. Deposit 0.02 ETH
4. Balance updates
5. Generate unlimited

### Minute 3-4: NFT Mint
"First top-off ≥ 0.01 ETH?"
1. NFT auto-mints
2. Show in MetaMask
3. "MACHUPS Founders Pass - Monad Edition"

### Minute 4-5: Business Model & Tech
"Built for Monad's speed + x402's metered payments.
Pay per generation. No subscriptions. Instant results.
This is design at the speed of thought."

## ✅ Acceptance Criteria
- [ ] Script is 5 minutes
- [ ] Practiced 5+ times
- [ ] Timing is perfect
- [ ] Backup plan ready
- [ ] Demo data pre-loaded

## ⏱️ Estimated Time
1-2 hours (including practice)
```

---

## Issue #33: End-to-End Testing

**Title:** [Phase 4] Complete End-to-End Testing

**Labels:**
- `P0-critical`
- `phase-4-finalization`
- `type-test`
- `area-testing`
- `effort-m`
- `milestone-final-submission`

**Description:**
```markdown
## 🎯 Objective
Test complete user flow 5+ times

## 📋 Test Scenarios

### Test 1: Free Tier Flow
1. Visit site
2. Generate brand (no wallet)
3. Generate 3 times
4. Hit free tier limit
5. See "Top Off" CTA

### Test 2: Paid Tier Flow
1. Connect wallet
2. Top off with 0.02 ETH
3. Generate brand
4. Verify balance deduction
5. Generate again
6. Download ZIP

### Test 3: NFT Mint Flow
1. New wallet (no NFT)
2. Top off with 0.01 ETH
3. Verify NFT mints
4. Check in MetaMask
5. Verify can't mint again

### Test 4: Error Cases
1. Invalid inputs
2. API errors
3. Network errors
4. Insufficient balance
5. Transaction rejection

### Test 5: Mobile
1. Test on phone
2. All flows work
3. Responsive layout
4. Touch interactions

## ✅ Acceptance Criteria
- [ ] All flows tested 5+ times
- [ ] No critical bugs
- [ ] Mobile works
- [ ] Error handling works

## ⏱️ Estimated Time
1-2 hours
```

---

## Issue #34: Documentation & README

**Title:** [Phase 4] Complete Project Documentation & README

**Labels:**
- `P1-high`
- `phase-4-finalization`
- `type-docs`
- `docs-setup`
- `effort-s`
- `milestone-final-submission`

**Description:**
```markdown
## 🎯 Objective
Create comprehensive README and documentation

## 📋 README Structure

### 1. Header
```markdown
# 🎨 MACHUPS

**AI-Powered Brand Generation in 3 Minutes**

Generate logos, design tokens, React components, and documentation using Claude AI and Monad x402 payments.

🚀 **[Live Demo](https://machups.pages.dev)**
```

### 2. Features
- ✅ HTML/CSS Logo Generation
- ✅ Design Token System (colors, typography, spacing)
- ✅ React Component Generation
- ✅ Brand Documentation
- ✅ x402 Metered Payments
- ✅ NFT Rewards (Monad Blitz #18 Edition)

### 3. Tech Stack
- Next.js 14
- Claude AI (Anthropic)
- Thirdweb SDK
- Monad Testnet
- Cloudflare Pages

### 4. Quick Start
- Installation
- Environment variables
- Running locally
- Deployment

### 5. Demo Credentials
- Testnet RPC
- Test wallet
- Faucet links

## ✅ Acceptance Criteria
- [ ] README is comprehensive
- [ ] Setup instructions are clear
- [ ] Tech stack documented
- [ ] Demo credentials included
- [ ] Screenshots added

## ⏱️ Estimated Time
30min - 1 hour
```

---

## Issue #35: Final Submission Package

**Title:** [Phase 4] Prepare Final Submission Package

**Labels:**
- `P0-critical`
- `phase-4-finalization`
- `event-monad-blitz-18`
- `event-judging-criteria`
- `effort-s`
- `milestone-final-submission`

**Description:**
```markdown
## 🎯 Objective
Prepare and submit complete project package

## 📋 Submission Checklist

### Required Files
- [ ] Live URL (production deployment)
- [ ] GitHub repository (public)
- [ ] README.md (complete)
- [ ] Demo video (2-3min, optional)
- [ ] Screenshots (5-10)

### Submission Form Fields
- [ ] Project name: "MACHUPS"
- [ ] Tagline: "AI-Powered Brand Generation in 3 Minutes"
- [ ] Team name
- [ ] Team members
- [ ] Live URL
- [ ] GitHub URL
- [ ] Demo video URL
- [ ] Description (250 words)
- [ ] Tech stack
- [ ] Monad integration details
- [ ] x402 integration details

### Judging Criteria Addressed
- [ ] Innovation: AI-powered brand generation
- [ ] Monad Integration: x402 metered payments
- [ ] User Experience: 3-minute flow
- [ ] Technical Excellence: Production-ready code
- [ ] Business Viability: Clear monetization

## ✅ Acceptance Criteria
- [ ] All fields completed
- [ ] Links work
- [ ] Video uploaded
- [ ] Screenshots clear
- [ ] Submitted before deadline

## ⏱️ Estimated Time
30min - 1 hour
```

---

## 🔧 Setup Scripts

Create these automation scripts to speed up setup:

**scripts/create-machups-issues.sh** - Auto-create all issues
**scripts/setup-machups-labels.sh** - Auto-create labels
**scripts/setup-machups-milestones.sh** - Auto-create milestones
**scripts/machups-deploy.sh** - Quick deployment script

---

**Total Issues:** 35 (Phase 1: 6, Phase 2: 12, Phase 3: 12, Phase 4: 5)
**Total Estimated Time:** ~40-55 hours (with parallel work: 11 hours)
**Event Duration:** 11 hours
**Strategy:** Rapid development, parallel tasks, AI-assisted coding

🚀 **Let's build MACHUPS!**
