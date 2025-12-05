# MACHUPS Preset Templates

This directory contains preset template layouts for brand websites, optimized for all screen sizes.

## Template Categories

### 1. Landing Pages
- **Hero + Features** - Full-screen hero with feature grid
- **Bento Grid** - Modern card-based layout
- **Split Screen** - Side-by-side content sections
- **Minimal** - Clean, text-focused design

### 2. Portfolio Sites
- **Grid Gallery** - Masonry-style project showcase
- **Case Studies** - Detailed project pages
- **Timeline** - Chronological work display

### 3. Product Pages
- **E-commerce** - Product showcase with CTAs
- **SaaS Landing** - Feature highlights + pricing
- **App Landing** - Mobile app showcase

### 4. About/Team Pages
- **Team Grid** - Team member cards
- **Company Story** - Narrative timeline
- **Contact** - Form with map integration

---

## Responsive Breakpoints

All templates are designed for 4 standard breakpoints:

| Device | Width | Tailwind | Columns |
|--------|-------|----------|---------|
| **Mobile** | 320-639px | `default` | 1 col |
| **Tablet** | 640-1023px | `sm:` `md:` | 2 cols |
| **Desktop** | 1024-1919px | `lg:` `xl:` | 3-4 cols |
| **Widescreen** | 1920px+ | `2xl:` | 4-6 cols |

---

## Template Specifications

### Mobile (320-639px)
```typescript
interface MobileLayout {
  columns: 1;
  maxWidth: '100%';
  padding: '1rem'; // 16px
  fontSize: {
    h1: '2rem';     // 32px
    h2: '1.5rem';   // 24px
    body: '1rem';   // 16px
  };
  spacing: {
    section: '3rem';  // 48px
    component: '1.5rem'; // 24px
  };
}
```

**Key Considerations**:
- Single column layout
- Touch-friendly tap targets (min 44×44px)
- Readable text (16px minimum)
- Optimized images (max 800px wide)
- Simplified navigation (hamburger menu)

---

### Tablet (640-1023px)
```typescript
interface TabletLayout {
  columns: 2;
  maxWidth: '768px';
  padding: '2rem'; // 32px
  fontSize: {
    h1: '2.5rem';   // 40px
    h2: '2rem';     // 32px
    body: '1.125rem'; // 18px
  };
  spacing: {
    section: '4rem';  // 64px
    component: '2rem'; // 32px
  };
}
```

**Key Considerations**:
- 2-column grid for content
- Larger typography
- Side-by-side images
- Expanded navigation
- Touch + keyboard support

---

### Desktop (1024-1919px)
```typescript
interface DesktopLayout {
  columns: 3 | 4;
  maxWidth: '1280px';
  padding: '3rem'; // 48px
  fontSize: {
    h1: '3rem';     // 48px
    h2: '2.25rem';  // 36px
    body: '1.125rem'; // 18px
  };
  spacing: {
    section: '6rem';  // 96px
    component: '3rem'; // 48px
  };
}
```

**Key Considerations**:
- 3-4 column grid
- Full-width hero sections
- Hover states and animations
- Keyboard navigation
- Mouse interactions

---

### Widescreen (1920px+)
```typescript
interface WidescreenLayout {
  columns: 4 | 6;
  maxWidth: '1536px' | '1920px';
  padding: '4rem'; // 64px
  fontSize: {
    h1: '3.75rem';  // 60px
    h2: '3rem';     // 48px
    body: '1.25rem'; // 20px
  };
  spacing: {
    section: '8rem';  // 128px
    component: '4rem'; // 64px
  };
}
```

**Key Considerations**:
- 4-6 column grid
- Max-width containers (prevent overstretching)
- Large, impactful imagery
- Generous whitespace
- Multi-column text (optional)

---

## Template File Structure

```
public/templates/
├── README.md (this file)
├── landing-pages/
│   ├── hero-features/
│   │   ├── mobile.json
│   │   ├── tablet.json
│   │   ├── desktop.json
│   │   └── widescreen.json
│   ├── bento-grid/
│   └── split-screen/
├── portfolio/
│   ├── grid-gallery/
│   ├── case-studies/
│   └── timeline/
├── product/
│   ├── ecommerce/
│   ├── saas-landing/
│   └── app-landing/
└── about-team/
    ├── team-grid/
    ├── company-story/
    └── contact/
```

---

## Template JSON Format

Each template includes responsive configurations:

```json
{
  "name": "Hero + Features",
  "category": "landing-page",
  "device": "desktop",
  "breakpoint": {
    "min": 1024,
    "max": 1919
  },
  "layout": {
    "type": "grid",
    "columns": 3,
    "gap": "2rem",
    "maxWidth": "1280px",
    "padding": "3rem"
  },
  "sections": [
    {
      "type": "hero",
      "height": "100vh",
      "alignment": "center",
      "components": [
        {
          "type": "heading",
          "text": "{brandName}",
          "fontSize": "3rem",
          "fontWeight": "bold"
        },
        {
          "type": "subheading",
          "text": "{tagline}",
          "fontSize": "1.5rem"
        },
        {
          "type": "cta",
          "text": "Get Started",
          "variant": "primary"
        }
      ]
    },
    {
      "type": "features",
      "columns": 3,
      "gap": "2rem",
      "components": [
        {
          "type": "feature-card",
          "icon": "{icon}",
          "title": "{featureTitle}",
          "description": "{featureDescription}"
        }
      ]
    }
  ],
  "navigation": {
    "type": "horizontal",
    "position": "top",
    "sticky": true
  },
  "footer": {
    "columns": 3,
    "links": true,
    "social": true
  }
}
```

---

## Responsive Images

### Image Specifications by Device

| Device | Max Width | Format | Quality |
|--------|-----------|--------|---------|
| Mobile | 800px | WebP | 80% |
| Tablet | 1200px | WebP | 85% |
| Desktop | 1920px | WebP | 90% |
| Widescreen | 2560px | WebP | 90% |

### Responsive Image Syntax
```html
<picture>
  <source
    media="(min-width: 1920px)"
    srcset="/images/hero-2560.webp"
  />
  <source
    media="(min-width: 1024px)"
    srcset="/images/hero-1920.webp"
  />
  <source
    media="(min-width: 640px)"
    srcset="/images/hero-1200.webp"
  />
  <img
    src="/images/hero-800.webp"
    alt="{brandName} Hero"
    loading="lazy"
  />
</picture>
```

---

## Component Sizing Guide

### Typography Scale
```css
/* Mobile */
h1: 2rem (32px)
h2: 1.5rem (24px)
h3: 1.25rem (20px)
body: 1rem (16px)
small: 0.875rem (14px)

/* Tablet */
h1: 2.5rem (40px)
h2: 2rem (32px)
h3: 1.5rem (24px)
body: 1.125rem (18px)
small: 1rem (16px)

/* Desktop */
h1: 3rem (48px)
h2: 2.25rem (36px)
h3: 1.875rem (30px)
body: 1.125rem (18px)
small: 1rem (16px)

/* Widescreen */
h1: 3.75rem (60px)
h2: 3rem (48px)
h3: 2.25rem (36px)
body: 1.25rem (20px)
small: 1.125rem (18px)
```

### Spacing Scale
```css
/* Mobile */
section-gap: 3rem (48px)
component-gap: 1.5rem (24px)
padding: 1rem (16px)

/* Tablet */
section-gap: 4rem (64px)
component-gap: 2rem (32px)
padding: 2rem (32px)

/* Desktop */
section-gap: 6rem (96px)
component-gap: 3rem (48px)
padding: 3rem (48px)

/* Widescreen */
section-gap: 8rem (128px)
component-gap: 4rem (64px)
padding: 4rem (64px)
```

---

## Performance Targets

| Device | FCP | LCP | CLS | TTI |
|--------|-----|-----|-----|-----|
| Mobile | <1.8s | <2.5s | <0.1 | <3.5s |
| Tablet | <1.5s | <2.0s | <0.1 | <3.0s |
| Desktop | <1.0s | <1.5s | <0.1 | <2.5s |
| Widescreen | <1.0s | <1.5s | <0.1 | <2.5s |

---

## Usage in Brand Generation

Templates are automatically applied based on:
1. **Brand industry** (SaaS → Product template)
2. **User selection** (if specified)
3. **Content type** (Portfolio, Landing, etc.)

### API Integration
```typescript
import { selectTemplate } from '@/lib/templates';

const template = await selectTemplate({
  industry: 'SaaS',
  type: 'landing-page',
  device: 'desktop'
});

// Returns responsive template configuration
```

---

**Last Updated**: December 4, 2025
**Total Templates**: 12 (4 devices × 3 categories)
**Maintained By**: MACHUPS Design Team
