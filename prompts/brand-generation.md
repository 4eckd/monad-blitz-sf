# Brand Generation Prompts

## Primary Brand Analysis Prompt

```
You are an expert brand strategist and designer. Analyze the following business idea and create a comprehensive brand strategy.

Business Idea: {businessIdea}
Target Audience: {targetAudience}
Industry: {industry}
Style Preference: {style}

Provide a JSON response with the following structure:

{
  "brandName": "suggested brand name",
  "tagline": "compelling tagline",
  "positioning": "unique value proposition",
  "personality": {
    "traits": ["trait1", "trait2", "trait3"],
    "voice": "description of brand voice",
    "tone": "description of tone"
  },
  "visualDirection": {
    "logoStyle": "description",
    "colorMood": "description",
    "typographyStyle": "description"
  },
  "keyMessages": ["message1", "message2", "message3"]
}
```

## Logo Generation Prompt (Multi-Variant System)

```
Generate comprehensive logo system for "{brandName}".

Industry: {industry}
Style: {style}
Personality: {personality}
Target Audience: {targetAudience}

Logo Variants to Generate:

1. **Primary Logos** (3 concepts):
   - Full logo (wordmark + icon combination)
   - Wordmark only (text-based)
   - Icon only (standalone symbol)

2. **Layout Orientations**:
   - Horizontal lockup
   - Vertical stacked
   - Square format (for avatars)

3. **Style Variations**:
   - Full color (brand palette)
   - Monochrome dark-on-light
   - Monochrome light-on-dark
   - Outline/stroke version
   - Solid fill version
   - Single-color simplified

4. **Favicon/App Icon Sizes** (Square, centered):
   - 16×16px, 32×32px, 64×64px
   - 128×128px, 192×192px, 512×512px

5. **Brand Elements** (Extracted components):
   - Primary icon element (can be used independently)
   - Secondary graphic element
   - Pattern/texture for backgrounds
   - Divider/separator graphics

For each primary logo concept, provide:
1. Concept name and type
2. Detailed visual description
3. AI image generation prompt (DALL-E/Stable Diffusion/Midjourney)
4. SVG code structure (if applicable)
5. Why this concept works for the brand
6. Usage recommendations

AI Prompt Engineering Template:
"/imagine prompt: A premium {industry} brand logo for '{brandName}' —
featuring {iconDescription}. Style: {styleDirection}. Professional brand
designer aesthetic with clean geometric vector lines, depth through subtle
gradients, precise symmetry, high-end tech startup vibe similar to {referenceStyle}.
Crisp edges, minimalist yet iconic emblem design. Keywords: {keywords}
--ar 1:1 --v 6.0 --style raw"

Format as comprehensive JSON with all variants and AI prompts.
```

## Color Palette Prompt

```
Generate a professional color palette for {brandName}, a {industry} brand.

Brand Personality: {personality}
Style: {style}
Mood: {mood}

Requirements:
- 2 primary brand colors (for identity and recognition)
- 2-3 secondary colors (for accents and variation)
- 4 neutral colors (for backgrounds, text, and UI elements)
- Semantic colors (success, error, warning, info)
- All colors must meet WCAG AA accessibility standards
- Provide hex codes, RGB values, and descriptions

Return as W3C Design Tokens format (JSON).
```

## Typography System Prompt

```
Create a typography system for {brandName}.

Brand Personality: {personality}
Target Platform: {platform}
Accessibility: {level}

Provide:
1. Heading font family (bold, attention-grabbing)
2. Body font family (readable, accessible)
3. Monospace font (if needed for code/technical content)
4. Font pairing rationale
5. Type scale (sizes from xs to 4xl)
6. Line heights
7. Font weights to use

Format as design tokens (JSON).
```

## ASCII Wireframe Prompt

```
Generate ASCII wireframes for a {businessIdea} website.

Pages to create:
{pages}

For each page, create:
1. Desktop layout (80 characters wide)
2. Mobile layout (40 characters wide)

Use ASCII box drawing characters: ┌─┐│└┘├┤┬┴┼
Label interactive elements: [Button], {Input}, (Link)
Include: header, navigation, main content areas, CTAs, footer

Make wireframes clean, professional, and representative of modern web design.
```

## Component Generation Prompt

```
Generate a production-ready React {componentName} component.

Design Tokens: {designTokens}
Component Variants: {variants}
State Management: {stateManagement}

Requirements:
- TypeScript with full type definitions
- Accessible (ARIA labels, semantic HTML, keyboard navigation)
- Responsive (mobile-first approach)
- Uses provided design tokens
- Supports multiple variants: {variants}
- Includes hover, focus, and active states
- Tailwind CSS classes

Return ONLY the complete, working component code with imports.
```

## User Flow Diagram Prompt

```
Create a Mermaid.js flowchart for the following user journey:

Feature: {feature}
User Goal: {goal}
Key Actions: {actions}

Use flowchart TD syntax.
Include:
- Decision points (diamond shapes)
- User actions (rectangles)
- System responses (rounded rectangles)
- Error handling paths
- Success outcomes

Make the flow comprehensive but clear and easy to follow.
```

## A/B Testing Variant Prompt

```
Create 2 A/B testing variants for this design element:

Original Design: {original}
Element to Test: {element}
Goal: {goal}

For each variant, modify:
1. Headlines (different messaging angles)
2. CTA text and color (different actions/urgency levels)
3. Layout/visual hierarchy (different focal points)

Maintain brand consistency.
Keep core functionality the same.
Return as JSON with variant names, changes, and rationale.
```

## Social Media Asset Generation Prompt

```
Generate social media assets for {brandName}.

Brand Context:
- Logo Variants: {logoVariants}
- Color Palette: {colors}
- Typography: {typography}
- Industry: {industry}
- Style: {style}

User Selection:
- Platforms: {selectedPlatforms} (or empty if user selected "No")
- Handles: {socialHandles} (or empty placeholders)

Platform Specifications:
- X (Twitter): Banner 1500×500px, Profile 400×400px, OG 1200×675px
- LinkedIn: Banner 1584×396px, Profile 400×400px, OG 1200×627px
- Discord: Banner 1920×1080px, Profile 500×500px, Icon 512×512px
- GitHub: Banner 1280×640px, Profile 460×460px
- Reddit: Banner 1920×384px, Profile 500×500px
- Telegram: Banner 640×360px, Profile 500×500px
- Facebook: Banner 851×315px, Profile 170×170px, OG 1200×630px
- Instagram: Profile 320×320px, Post 1080×1080px, Story 1080×1920px
- YouTube: Banner 2560×1440px, Profile 800×800px, Thumbnail 1280×720px
- Medium: Banner 1500×750px, Profile 400×400px

For each selected platform, generate:

1. **Profile/Avatar Image**:
   - Square format (platform-specific size)
   - Centered logo/icon variant
   - Brand background (color or gradient)
   - High contrast for visibility at small sizes

2. **Banner/Header Image**:
   - Platform-specific dimensions
   - Brand name prominently featured
   - Logo placement (left, center, or right)
   - Visual brand elements (patterns, gradients, shapes)
   - Optional: Tagline or CTA text
   - Safe zones marked (areas to avoid important content)

3. **Post/Content Card Templates** (5 variants):
   - General announcement template
   - Feature highlight template
   - Quote/testimonial template
   - Update/changelog template
   - Event/launch template

Each template should include:
- Title zone (dynamic text area)
- Description zone (optional)
- Visual element (icon, illustration, screenshot)
- Brand logo (watermark)
- Color scheme consistent with brand
- Platform handle/username placement

4. **AI Image Generation Prompts**:
   Provide detailed prompts for each asset using this format:
   "/imagine prompt: {description}, brand colors {colors}, {style}, professional
   social media banner, modern design, high quality, clean layout, {platform} optimized
   --ar {ratio} --v 6.0"

5. **Design Guidelines**:
   - Logo usage (size, placement, safe zones)
   - Typography hierarchy (titles, body text, captions)
   - Color application (backgrounds, text, accents)
   - Export settings (format, resolution, compression)

If user provided handles:
- Include handle/username in banner designs
- Add QR code for easy profile finding (optional)
- Customize CTA text based on platform

If NO handles provided:
- Create placeholder designs with "[Your Handle]" text
- Provide instructions for customization
- Include Figma/Penpot template for easy editing

Return as:
1. JSON with all asset specifications
2. AI image generation prompts for each asset
3. SVG templates (where applicable)
4. Figma/Penpot design file structure
5. Export instructions per platform
6. Usage guidelines and best practices
```

## Docusaurus Documentation Prompt

```
Generate comprehensive documentation for the {brandName} Design System.

Sections to create:
1. Getting Started (introduction, installation, quick start)
2. Design Tokens (colors, typography, spacing, usage examples)
3. Components (for each component: description, props, examples, accessibility notes)
4. Branding Guidelines (logo usage, color palette, voice & tone)
5. Best Practices (dos and don'ts, common patterns)
6. Social Media Assets (platform guides, templates, specifications)

Write in clear, friendly, professional tone.
Include code examples and visual examples where appropriate.
Format as Markdown for Docusaurus.
```

## Design Token Export Prompt

```
Convert these design tokens to {format} format:

Tokens: {tokens}
Target Format: {format} (options: css, scss, tailwind, style-dictionary)

Requirements:
- Follow {format} conventions
- Use semantic naming
- Include comments for clarity
- Organize by category (colors, typography, spacing, etc.)
- Ensure proper syntax

Return formatted code ready to use.
```

## Animation Token Generation Prompt

```
Generate animation design tokens for {brandName}.

Brand Personality: {personality}
Style: {style}
Performance Budget: {performanceBudget}

Critical Rules:
- LESS = MORE: Animations should enhance, not distract
- Performance First: All animations must be GPU-accelerated (transform, opacity only)
- Purpose Driven: Every animation must have a clear UX purpose

Provide animation tokens for:

1. **Transitions** (state changes)
   - Duration tokens: fast (150ms), normal (250ms), slow (350ms)
   - Easing tokens: ease-in, ease-out, ease-in-out, custom cubic-bezier
   - Property-specific timings

2. **Hover Effects** (interactive elements)
   - Button hover: scale, color transition, shadow
   - Link hover: underline animation, color shift
   - Card hover: lift effect, border glow
   - Icon hover: rotate, pulse, bounce (subtle)

3. **Focus States** (accessibility)
   - Focus ring animation
   - Keyboard navigation indicators
   - Screen reader friendly

4. **Loading States**
   - Skeleton screens
   - Spinner animations
   - Progress indicators
   - Shimmer effects

5. **Micro-interactions**
   - Button press (active state)
   - Checkbox/toggle animations
   - Form validation feedback
   - Toast/notification entry/exit

6. **Page Transitions** (optional, minimal)
   - Fade in/out
   - Slide transitions
   - Scroll-triggered animations (intersection observer)

7. **Motion Tokens**
   - spring: { tension, friction, mass }
   - tween: { duration, ease, delay }
   - gesture: { drag, tap, hover }

Requirements:
- All animations must use framer-motion
- Include prefers-reduced-motion support
- Maximum animation duration: 500ms
- Use transform and opacity (never animate width/height directly)
- Include WCAG motion compliance

Return as:
1. Design tokens (JSON)
2. Tailwind config extensions
3. Framer Motion variants object
4. Usage examples for each animation type
```

## ASCII Mockup Templates Library

```
Generate predefined ASCII mockup templates for common website types.

Template Categories:
1. Landing Pages
2. SaaS Dashboards
3. E-commerce
4. Portfolio/Agency
5. Blog/Content
6. Web3/Crypto

For each template, provide:
- Desktop layout (80 chars wide)
- Tablet layout (60 chars wide)
- Mobile layout (40 chars wide)
- Component breakdown
- CTA placement suggestions
- Accessibility notes

Example template structure:

### Landing Page - Hero Focus
```
┌────────────────────────────────────────────────────────────────────────────┐
│ [Logo]                                    [Home] [Features] [Pricing] [CTA]│
├────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                        ╔══════════════════════════════╗                     │
│                        ║   HERO HEADLINE HERE         ║                     │
│                        ║   Compelling subheadline     ║                     │
│                        ╠══════════════════════════════╣                     │
│                        ║  [Primary CTA] [Secondary]   ║                     │
│                        ╚══════════════════════════════╝                     │
│                                                                              │
│                            [Hero Image Area]                                │
│                                                                              │
├────────────────────────────────────────────────────────────────────────────┤
│  ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐   │
│  │  Feature 1 │    │  Feature 2 │    │  Feature 3 │    │  Feature 4 │   │
│  │  [Icon]    │    │  [Icon]    │    │  [Icon]    │    │  [Icon]    │   │
│  │  Short desc│    │  Short desc│    │  Short desc│    │  Short desc│   │
│  └────────────┘    └────────────┘    └────────────┘    └────────────┘   │
└────────────────────────────────────────────────────────────────────────────┘
```

Return complete ASCII library with all templates and annotations.
```

## Performance Testing Standards

```
Generate comprehensive performance testing suite for {brandName}.

Test Categories:

1. **Core Web Vitals**
   - LCP (Largest Contentful Paint): < 2.5s
   - FID (First Input Delay): < 100ms
   - CLS (Cumulative Layout Shift): < 0.1
   - INP (Interaction to Next Paint): < 200ms

2. **Animation Performance**
   - 60 FPS requirement (16.67ms per frame)
   - GPU acceleration validation
   - No layout thrashing
   - Composite layer optimization
   - Will-change property usage audit

3. **Bundle Size Metrics**
   - Initial bundle: < 200KB (gzipped)
   - Total JavaScript: < 500KB (gzipped)
   - CSS: < 50KB (gzipped)
   - Images: WebP/AVIF optimized
   - Fonts: Subset and preloaded

4. **Loading Performance**
   - Time to Interactive (TTI): < 3.8s
   - Speed Index: < 3.4s
   - Total Blocking Time: < 200ms
   - First Contentful Paint: < 1.8s

5. **Runtime Performance**
   - React component render time
   - State update performance
   - Memory leak detection
   - Event listener cleanup
   - Debounce/throttle verification

6. **Accessibility Performance**
   - Keyboard navigation speed
   - Screen reader compatibility
   - Focus management
   - Color contrast ratios (WCAG AAA)
   - Touch target sizes (48x48px minimum)

7. **Network Performance**
   - Resource loading waterfall
   - Critical path optimization
   - Code splitting effectiveness
   - Lazy loading implementation
   - Service worker caching

8. **Device Testing Matrix**
   - Mobile (4G connection)
   - Tablet (WiFi)
   - Desktop (Fast WiFi)
   - Low-end devices (CPU throttling)

Testing Tools:
- Lighthouse CI (automated testing)
- WebPageTest (real device testing)
- Chrome DevTools Performance
- React DevTools Profiler
- Bundle Analyzer
- Coverage reporting

Return as:
1. Performance budget JSON
2. Lighthouse config
3. CI/CD integration script
4. Performance monitoring dashboard config
5. Automated testing checklist
```

## Brand Performance Report Generator

```
Generate performance report for generated brand {brandName}.

Analyze:
1. Design token file size
2. Component bundle sizes
3. Animation efficiency
4. Color contrast compliance
5. Typography legibility scores
6. Accessibility audit results
7. Load time estimates
8. Mobile performance score

Return comprehensive report with:
- Overall Performance Score (0-100)
- Category breakdowns
- Specific recommendations
- Comparison to industry standards
- Optimization opportunities
- Estimated real-world metrics

Format as:
- Executive summary
- Detailed metrics table
- Visual charts (ASCII/Markdown)
- Action items prioritized by impact
```
