# Social Media Asset Generation

Comprehensive social media and branding asset generation for MACHUPS brands.

---

## User Selection Flow

### Step 1: Social Media Intent

```
┌──────────────────────────────────────────────────────────┐
│  MACHUPS Brand Generator                                 │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Do you want to add social media assets?                │
│                                                          │
│  ○ Yes - Include social media branding                  │
│  ○ No  - Skip (can add later)                          │
│                                                          │
│  [Continue →]                                            │
└──────────────────────────────────────────────────────────┘
```

### Step 2: Platform Selection

```
┌──────────────────────────────────────────────────────────┐
│  Select Social Media Platforms                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Popular:                                                │
│  ☑ X (Twitter)                                          │
│  ☑ LinkedIn                                             │
│  ☑ Discord                                              │
│  ☑ GitHub                                               │
│                                                          │
│  Community:                                              │
│  ☐ Reddit                                               │
│  ☐ Telegram                                             │
│  ☐ Medium                                               │
│                                                          │
│  General:                                                │
│  ☐ Facebook                                             │
│  ☐ Instagram                                            │
│  ☐ YouTube                                              │
│                                                          │
│  [Select All] [Deselect All]       [Continue →]         │
└──────────────────────────────────────────────────────────┘
```

### Step 3: Handle/Link Collection

```
┌──────────────────────────────────────────────────────────┐
│  Social Media Handles                                    │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  X (Twitter)                                             │
│  Handle: [@machups_ai____________] (optional)           │
│                                                          │
│  LinkedIn                                                │
│  URL: [company/machups__________] (optional)            │
│                                                          │
│  Discord                                                 │
│  Invite: [discord.gg/___________] (optional)            │
│                                                          │
│  GitHub                                                  │
│  Handle: [@machups______________] (optional)            │
│                                                          │
│  💡 Leave blank to generate placeholder assets           │
│                                                          │
│  [Back] [Skip All]                    [Generate →]       │
└──────────────────────────────────────────────────────────┘
```

---

## Logo Variant Generation Prompt

```
Generate comprehensive logo system for {brandName}.

Brand Personality: {personality}
Style: {style}
Industry: {industry}

Critical Requirements:
- SVG format (vector, scalable)
- Light and dark versions
- Multiple layout orientations
- Icon-only variants
- Monochrome versions

Logo Variants to Generate:

1. **Primary Logos**:
   - Full logo (wordmark + icon)
   - Wordmark only (text-based)
   - Icon only (standalone symbol)
   - Horizontal layout
   - Vertical stacked layout

2. **Style Variants**:
   - Full color (brand palette)
   - Monochrome dark-on-light
   - Monochrome light-on-dark
   - Outline/stroke version
   - Solid fill version
   - 1-color simplified

3. **Favicon/App Icons** (Square, centered):
   - 16×16px (browser favicon)
   - 32×32px (browser tab)
   - 64×64px (bookmark)
   - 128×128px (app tile)
   - 192×192px (Android icon)
   - 512×512px (iOS/PWA icon)

4. **Brand Elements** (Extracted components):
   - Primary icon element
   - Secondary graphic element
   - Pattern/texture element
   - Divider/separator graphic
   - Corner accent marks
   - Decorative nodes/dots

5. **Usage Guidelines**:
   - Minimum size requirements
   - Clear space/padding rules
   - Background color recommendations
   - Don'ts (stretching, effects, etc.)

Prompt Engineering Example:
"A premium technology brand logo for '{brandName}' — featuring {iconDescription}.
Style: {styleDirection}. Professional brand designer aesthetic with clean geometric
vector lines, depth through subtle gradients, precise symmetry, high-end tech
startup vibe. Crisp edges, minimalist yet iconic emblem design."

Return as:
1. AI image generation prompts for each variant
2. SVG code for vector versions (where applicable)
3. CSS for logo animations (subtle hover effects)
4. Usage documentation
```

---

## Social Media Asset Specifications

### Platform Specifications Reference

```typescript
export const SOCIAL_MEDIA_SPECS = {
  x: {
    name: 'X (Twitter)',
    banner: { width: 1500, height: 500 },
    profile: { width: 400, height: 400 },
    post: { width: 1200, height: 675 }, // OG card
  },
  linkedin: {
    name: 'LinkedIn',
    banner: { width: 1584, height: 396 },
    profile: { width: 400, height: 400 },
    post: { width: 1200, height: 627 },
  },
  discord: {
    name: 'Discord',
    banner: { width: 1920, height: 1080 },
    profile: { width: 500, height: 500 },
    icon: { width: 512, height: 512 },
  },
  github: {
    name: 'GitHub',
    banner: { width: 1280, height: 640 },
    profile: { width: 460, height: 460 },
  },
  reddit: {
    name: 'Reddit',
    banner: { width: 1920, height: 384 }, // or 10:3 ratio
    profile: { width: 500, height: 500 },
  },
  telegram: {
    name: 'Telegram',
    banner: { width: 640, height: 360 },
    profile: { width: 500, height: 500 },
  },
  facebook: {
    name: 'Facebook',
    banner: { width: 851, height: 315 },
    profile: { width: 170, height: 170 },
    post: { width: 1200, height: 630 },
  },
  instagram: {
    name: 'Instagram',
    profile: { width: 320, height: 320 },
    post: { width: 1080, height: 1080 },
    story: { width: 1080, height: 1920 },
  },
  youtube: {
    name: 'YouTube',
    banner: { width: 2560, height: 1440 },
    profile: { width: 800, height: 800 },
    thumbnail: { width: 1280, height: 720 },
  },
  medium: {
    name: 'Medium',
    banner: { width: 1500, height: 750 },
    profile: { width: 400, height: 400 },
  },
} as const;
```

---

## Social Media Asset Generation Prompt

```
Generate social media asset templates for {brandName}.

Selected Platforms: {selectedPlatforms}
Brand Colors: {colors}
Typography: {typography}
Logo Variants: {logoVariants}
User Handles: {socialHandles}

For each selected platform, generate:

1. **Profile/Avatar Image**:
   - Square format (platform-specific size)
   - Centered logo/icon
   - Brand background color or gradient
   - High contrast for small sizes
   - SVG source + PNG export

2. **Banner/Header Image**:
   - Platform-specific dimensions
   - Brand name/tagline prominently featured
   - Logo placement (left or center)
   - Visual brand elements (patterns, gradients)
   - Call-to-action text (optional)
   - Multiple variants (A/B testing)

3. **Post/Content Templates** (5 variants):
   - Announcement template
   - Feature highlight template
   - Quote/testimonial template
   - Update/changelog template
   - Event/launch template

4. **Design Guidelines**:
   - Safe zones (text placement areas)
   - Logo placement rules
   - Typography hierarchy
   - Color usage
   - Export settings

Asset Details per Platform:

{platformSpecs.map(platform => `
### ${platform.name}
- Banner: ${platform.banner.width}×${platform.banner.height}px
- Profile: ${platform.profile.width}×${platform.profile.height}px
${platform.post ? `- Post Card: ${platform.post.width}×${platform.post.height}px` : ''}

Design Notes:
- Primary brand color: {colors.primary}
- Background: {colors.background}
- Text: {colors.text}
- Logo: {logoVariant}
- Handle: ${userHandles[platform.key] || 'Not provided'}
`)}

Return as:
1. SVG templates for each asset
2. AI image generation prompts
3. Figma/Penpot design file URLs
4. Export instructions
5. Usage guidelines per platform
```

---

## Dynamic OG (Open Graph) Generation 🔒 PREMIUM

### OG Card Templates

```
Generate dynamic Open Graph card templates for {brandName}.

Card Types:

1. **Primary OG Card** (1200×630px):
   - Default for homepage
   - Logo + tagline + visual element
   - Brand gradient background

2. **Feature Announcement**:
   - Large feature title
   - Icon/illustration
   - "New" badge
   - CTA text

3. **Mockup Generated**:
   - Preview of generated design
   - Generation stats (time, components)
   - "Powered by MACHUPS" badge

4. **Blog Post**:
   - Article title (2-3 lines max)
   - Author avatar (optional)
   - Read time + date
   - Category badge

5. **Social Proof**:
   - Client testimonial quote
   - Company logo
   - Star rating
   - Attribution

6. **Product Update**:
   - Version number (large)
   - Key features list (3-5 items)
   - Changelog preview

7. **Event/Webinar**:
   - Event title
   - Date & time
   - Speaker info (optional)
   - Register CTA

8. **Affiliate Invitation**:
   - Invitation headline
   - Benefits list
   - Partner logos
   - Join CTA

Technical Requirements:
- All cards 1200×630px (OG standard)
- File size < 200KB per card
- WebP format (fallback PNG)
- Include meta tag templates
- Dynamic text replacement zones
- Background blur-up placeholders

Dynamic Variables:
- {{title}} - Main headline
- {{description}} - Supporting text
- {{image}} - Featured image URL
- {{author}} - Author name/avatar
- {{date}} - Publication date
- {{stats}} - Metrics (views, likes, etc.)

Return as:
1. Base SVG templates with variable zones
2. CSS for responsive text sizing
3. Next.js API route for dynamic generation
4. React component for preview
5. Meta tag generation helper
```

### Dynamic OG API Implementation

```typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get('title') || 'Default Title';
  const type = searchParams.get('type') || 'primary';
  const image = searchParams.get('image');

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div style={{ fontSize: 60, color: 'white' }}>
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

---

## Product Frame Mockups

### UI Frame Assets

```
Generate UI mockup frames for {brandName}.

Frame Types:

1. **Browser Chrome Frame**:
   - Modern browser window
   - Address bar with brand URL
   - Browser controls (minimize, maximize, close)
   - Tab design
   - Transparent background
   - Light and dark versions

2. **Mobile Screen Frame**:
   - iPhone/Android device
   - Screen bezel
   - Home indicator (iOS)
   - Status bar (time, battery, signal)
   - Multiple device models (iPhone 15 Pro, Pixel 8, etc.)

3. **Tablet Frame**:
   - iPad/Android tablet
   - Landscape and portrait orientations
   - Rounded corners
   - Screen area for content insertion

4. **Desktop Application Window**:
   - MacOS/Windows title bar
   - Menu bar (optional)
   - Toolbar
   - Sidebar (optional)
   - Content area

5. **Code Editor Frame**:
   - VS Code style window
   - File tree sidebar
   - Tab bar
   - Line numbers
   - Syntax highlighting theme

Specifications:
- All frames in brand color palette
- SVG format for scalability
- Transparent backgrounds
- Organized layers (frame, shadow, screen area)
- Multiple sizes (sm, md, lg, xl)

Usage:
- Marketing screenshots
- Feature announcements
- Documentation
- Social media posts
- Landing page hero sections

Return as:
1. SVG frame templates
2. CSS for shadows/effects
3. React component for inserting content
4. Figma/Penpot design file
5. Usage examples
```

---

## Mascot/Agent Icon (Optional)

```
Generate AI agent mascot/icon for {brandName}.

Concept: Friendly, approachable AI assistant representation

Design Options:

1. **Abstract Geometric**:
   - Tri-node network symbol
   - Connected circles/nodes
   - Data flow visualization
   - Minimal, modern

2. **Anthropomorphic**:
   - Robot character
   - Friendly face (eyes only)
   - Chat bubble style
   - Wave/greeting gesture

3. **Symbolic**:
   - Brain + circuit fusion
   - Lightbulb + code
   - Sparkle/magic wand
   - Lightning + AI chip

Usage:
- Onboarding flow illustrations
- Empty states
- Loading screens
- Documentation assistant
- Chat widget avatar
- Error/success messages

Specifications:
- Multiple expressions (neutral, happy, thinking, error)
- Various sizes (16px to 512px)
- Animated versions (optional):
  - Idle breathing animation
  - Thinking (dots)
  - Success (checkmark)
  - Working (spinning/processing)

Return as:
1. SVG icons (all expressions)
2. Lottie animations (optional)
3. React component with state variants
4. Usage guidelines
```

---

## Asset Delivery Package

### File Structure

```
brand-assets/
├── logos/
│   ├── primary/
│   │   ├── full-color.svg
│   │   ├── full-color-dark.svg
│   │   ├── wordmark.svg
│   │   ├── icon.svg
│   │   ├── horizontal.svg
│   │   └── vertical.svg
│   ├── monochrome/
│   │   ├── dark-on-light.svg
│   │   ├── light-on-dark.svg
│   │   └── outline.svg
│   └── favicons/
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── apple-touch-icon.png
│       └── android-chrome-512x512.png
├── social-media/
│   ├── x/
│   │   ├── banner-1500x500.png
│   │   ├── profile-400x400.png
│   │   └── templates/
│   ├── linkedin/
│   ├── discord/
│   ├── github/
│   └── [other platforms]/
├── og-cards/
│   ├── primary-1200x630.png
│   ├── templates/
│   │   ├── announcement.svg
│   │   ├── feature.svg
│   │   ├── blog-post.svg
│   │   └── testimonial.svg
│   └── dynamic/ (API route code)
├── ui-frames/
│   ├── browser-chrome.svg
│   ├── mobile-iphone.svg
│   ├── mobile-android.svg
│   ├── tablet-ipad.svg
│   └── desktop-window.svg
├── brand-elements/
│   ├── patterns/
│   ├── dividers/
│   ├── icons/
│   └── decorative/
├── mascot/ (optional)
│   ├── neutral.svg
│   ├── happy.svg
│   ├── thinking.svg
│   └── animations/
└── guidelines/
    ├── logo-usage.md
    ├── social-media.md
    ├── og-cards.md
    └── brand-book.pdf
```

---

## Prompt Engineering Template

### Example: MACHUPS Brand

```markdown
/imagine prompt:

A premium technology brand logo for "MACHUPS" — featuring a bold, angular
letter M integrated with a lightning-bolt cut on one side to symbolize
ultra-fast design-to-code. Surround the M with an elegant, modern
React-style atomic halo made of three smooth intersecting ellipses.
The composition should feel balanced, futuristic, and powerful.

Style direction:
• Professional brand designer aesthetic
• Clean geometric vector lines
• Depth through subtle neon gradients (cyan → aqua → electric blue)
• Dark navy / near-black background for contrast
• Precise symmetry in halo, but M should have aggressive asymmetric angles
• High-end tech startup vibe, similar to Vercel, Linear, or Raycast branding
• Crisp edges, no blur, no glow overload
• Minimalist yet iconic emblem design
• Logomark + logotype lockup optional in variations
• Ultra-sharp vector look
• 8k detail but clean, no clutter
• Modern sans-serif typography for MACHUPS (white or cool-tone neutral)
• Deliver multiple angles: centered emblem, wide brand lockup, standalone icon

Keywords:
vector art, logo mark, atomic halo, geometric lightning, tech branding,
modern UI/UX brand, futuristic identity, gradient neon cyan, crisp lines

--ar 1:1 --v 6.0 --style 4c
```

---

## Premium Feature: Dynamic OG Generation

### Pricing Tier

```
Free Tier:
- Static OG card (primary only)
- Basic social media assets (1 platform)
- Standard logo variants

Pro Tier ($19/mo):
- 5 dynamic OG card types
- All social media platforms
- Complete logo system
- UI frame mockups

Enterprise Tier ($99/mo):
- Unlimited dynamic OG cards
- Custom card templates
- Mascot/agent icon
- White-label branding
- API access for OG generation
- Priority support
```

### OG Card Generation Flow

```
1. User generates brand (Free or Pro)
2. System creates static OG card (all users)
3. Pro users get access to:
   - OG card template builder
   - Dynamic variable insertion
   - A/B testing variants
   - Analytics (click-through rates)
4. API endpoint: /api/og?type=feature&title=New+Feature
5. Automatic meta tag generation for all pages
```

---

## Usage in Brand Generator

### Integration Points

```typescript
// lib/generators/brand-generator.ts
interface BrandGeneratorOptions {
  // ... existing options

  // Social media
  includeSocialMedia?: boolean;
  socialPlatforms?: Array<keyof typeof SOCIAL_MEDIA_SPECS>;
  socialHandles?: Record<string, string>;

  // Premium features
  tier?: 'free' | 'pro' | 'enterprise';
  includeDynamicOG?: boolean;
  includeMascot?: boolean;
  includeUIFrames?: boolean;
}

export async function generateBrand(options: BrandGeneratorOptions) {
  const assets: BrandAssets = {
    logos: await generateLogoVariants(options),
    socialMedia: options.includeSocialMedia
      ? await generateSocialAssets(options)
      : undefined,
    ogCards: await generateOGCards(options),
    uiFrames: options.includeUIFrames
      ? await generateUIFrames(options)
      : undefined,
    mascot: options.includeMascot
      ? await generateMascot(options)
      : undefined,
  };

  return assets;
}
```

---

**Last Updated**: December 4, 2025
**Premium Features**: Dynamic OG, Mascot, UI Frames
**Free Features**: Basic logos, 1 social platform, static OG
