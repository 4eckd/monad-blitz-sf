# GONADS Design System - Quick Reference

**One-page reference for designers and developers**

---

## 🎨 Colors

### Brand
```css
--primary:   #9333EA  /* Ballsy Purple */
--secondary: #14B8A6  /* Testicular Teal */
--accent:    #F97316  /* Vitality Orange */
```

### Backgrounds
```css
--bg-dark:  #0F172A  /* Midnight Meme */
--bg-card:  #1E293B  /* Card background */
--bg-light: #F8FAFC  /* Moonshot White */
```

### Semantic
```css
--success: #10B981
--warning: #F59E0B
--error:   #EF4444
--info:    #3B82F6
```

### Gradients
```css
/* Primary Gradient */
background: linear-gradient(135deg, #9333EA 0%, #14B8A6 100%);

/* Accent Gradient */
background: linear-gradient(135deg, #F97316 0%, #9333EA 100%);
```

---

## 🔤 Typography

### Fonts
```css
--font-heading: 'Inter', system-ui, sans-serif;
--font-body:    'Inter', system-ui, sans-serif;
--font-mono:    'JetBrains Mono', monospace;
```

### Sizes
```css
--text-xs:  0.75rem   /* 12px */
--text-sm:  0.875rem  /* 14px */
--text-base: 1rem     /* 16px */
--text-lg:  1.125rem  /* 18px */
--text-xl:  1.25rem   /* 20px */
--text-2xl: 1.5rem    /* 24px */
--text-3xl: 1.875rem  /* 30px */
--text-4xl: 2.25rem   /* 36px */
--text-5xl: 3rem      /* 48px */
--text-6xl: 3.75rem   /* 60px */
```

### Weights
```css
--font-normal:    400
--font-medium:    500
--font-semibold:  600
--font-bold:      700
--font-extrabold: 800
--font-black:     900
```

---

## 📏 Spacing

```css
--space-xs:  0.25rem  /* 4px */
--space-sm:  0.5rem   /* 8px */
--space-md:  1rem     /* 16px ← Base */
--space-lg:  1.5rem   /* 24px */
--space-xl:  2rem     /* 32px */
--space-2xl: 3rem     /* 48px */
--space-3xl: 4rem     /* 64px */
--space-4xl: 6rem     /* 96px */
--space-5xl: 8rem     /* 128px */
```

---

## 🔲 Border Radius

```css
--radius-sm:   0.25rem  /* 4px */
--radius-md:   0.5rem   /* 8px */
--radius-lg:   1rem     /* 16px */
--radius-xl:   1.5rem   /* 24px */
--radius-2xl:  2rem     /* 32px */
--radius-full: 9999px   /* Pills, circles */
```

---

## 🌫️ Shadows

```css
/* Standard Shadows */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

/* Glow Effects */
--glow-primary:   0 0 20px rgba(147, 51, 234, 0.5);
--glow-secondary: 0 0 20px rgba(20, 184, 166, 0.5);
--glow-accent:    0 0 20px rgba(249, 115, 22, 0.5);
```

---

## ⚛️ Components

### Button
```tsx
<Button variant="primary" size="lg">
  Grab Your Gonads
</Button>

// Variants: primary | secondary | accent | ghost
// Sizes: sm | md | lg
```

**Styles:**
```css
/* Primary Button */
background: linear-gradient(135deg, #9333EA, #7C3AED);
color: white;
padding: 16px 32px;  /* lg size */
border-radius: 8px;
font-weight: 600;
transition: all 300ms;

/* Hover */
box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
transform: scale(1.05);
```

### Card
```tsx
<Card variant="glow" hoverable>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Variants: default | gradient | glow
```

**Styles:**
```css
background: #1E293B;
border: 1px solid #334155;
border-radius: 16px;
padding: 24px;

/* Glow Hover */
box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
```

### Input
```tsx
<Input
  type="email"
  placeholder="your@email.com"
  label="Email Address"
  error="Invalid email"
/>
```

**Styles:**
```css
background: #0F172A;
border: 1px solid #334155;
border-radius: 8px;
padding: 12px 16px;
font-size: 16px;

/* Focus */
border-color: #9333EA;
box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
```

---

## 🎭 Logo Usage

### Wordmark (Primary)
- **Use:** Headers, navigation, primary brand identifier
- **Min width:** 120px
- **Background:** Dark (#0F172A) or light (#F8FAFC)
- **File:** `logos/wordmark.html` / `.svg` / `.png`

### Combination
- **Use:** Social media, app headers, marketing
- **Min width:** 200px
- **Includes:** Icon + text + tagline
- **File:** `logos/combination.html` / `.svg` / `.png`

### Badge
- **Use:** App icons, avatars, profile pictures
- **Size:** 512x512px (recommended)
- **Shape:** Circular
- **File:** `logos/badge.html` / `.svg` / `.png`

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
/* Default: < 640px (mobile) */

@media (min-width: 640px)  { /* sm - tablet */ }
@media (min-width: 768px)  { /* md - tablet */ }
@media (min-width: 1024px) { /* lg - laptop */ }
@media (min-width: 1280px) { /* xl - desktop */ }
@media (min-width: 1536px) { /* 2xl - large desktop */ }
```

---

## ✅ Accessibility

### WCAG AA Requirements
- **Text contrast:** 4.5:1 minimum
- **Large text (24px+):** 3:1 minimum
- **Focus indicators:** Visible on all interactive elements
- **Touch targets:** 44x44px minimum

### Compliant Color Combinations

**On Dark Background (#0F172A):**
- ✅ White text (#FFFFFF) - 17.5:1
- ✅ Primary (#9333EA) - 4.8:1
- ✅ Secondary (#14B8A6) - 3.2:1 (large text only)
- ✅ Neutral 50 (#F8FAFC) - 17.1:1

**On Light Background (#F8FAFC):**
- ✅ Black text (#0F172A) - 17.1:1
- ✅ Neutral 900 (#0F172A) - 17.1:1
- ✅ Primary (#9333EA) - 3.6:1 (large text)

---

## 🎯 Common Patterns

### Hero Section
```tsx
<section className="py-24 px-6 bg-[#0F172A]">
  <div className="max-w-7xl mx-auto text-center">
    <h1 className="text-6xl font-black text-white mb-6">
      <span className="bg-gradient-to-r from-[#9333EA] to-[#14B8A6] bg-clip-text text-transparent">
        Gradient Heading
      </span>
    </h1>
    <p className="text-xl text-[#CBD5E1] mb-8">
      Subtitle text
    </p>
    <Button variant="primary" size="lg">CTA</Button>
  </div>
</section>
```

### Feature Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {features.map(feature => (
    <Card variant="glow" hoverable key={feature.id}>
      <CardHeader>
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9333EA] to-[#7C3AED] mb-4" />
        <CardTitle>{feature.title}</CardTitle>
      </CardHeader>
      <CardContent>{feature.description}</CardContent>
    </Card>
  ))}
</div>
```

### Stat Display
```tsx
<div className="grid grid-cols-4 gap-6">
  <div className="text-center">
    <p className="text-4xl font-black bg-gradient-to-r from-[#9333EA] to-[#14B8A6] bg-clip-text text-transparent">
      10K
    </p>
    <p className="text-sm text-[#64748B] font-semibold mt-2">
      Total Supply
    </p>
  </div>
  {/* Repeat for other stats */}
</div>
```

---

## 🔧 Penpot Integration

### Quick Sync
```bash
# First time
npm run sync-penpot

# Update existing
npm run sync-penpot:update

# Export mockups
npm run sync-penpot:export
```

### Environment Setup
```bash
# .env
PENPOT_SERVER_URL=https://design.penpot.app
PENPOT_API_KEY=your_api_key
PENPOT_WORKSPACE_ID=your_workspace_id
```

### Access Library in Penpot
1. Open Penpot workspace
2. Libraries panel → GONADS Design System
3. Add to workspace
4. Drag components to canvas

---

## 📦 Files Reference

```
gonads-io/
├── design-tokens.json              # W3C DTCG tokens (source)
├── penpot-design-system.json       # Penpot format
├── sync-to-penpot.ts               # Sync script
├── PENPOT_INTEGRATION.md           # Full guide (1,500+ lines)
├── PENPOT_SUMMARY.md               # Implementation summary
├── DESIGN_SYSTEM_QUICK_REF.md      # This file
└── preview/
    └── package.json                # npm scripts
```

---

## 🚀 npm Scripts

```bash
# Development
npm run dev              # Start preview site (port 3001)
npm run build            # Build for production
npm run deploy           # Deploy to Vercel

# Penpot
npm run sync-penpot              # Initial sync (creates new file)
npm run sync-penpot:update       # Update existing file
npm run sync-penpot:export       # Export mockups as PNG
```

---

## 💡 Pro Tips

### For Designers
- Use library colors exclusively (no custom hex)
- Stick to spacing scale (no arbitrary values)
- Apply component variants instead of modifying
- Test contrast ratios (Penpot has built-in checker)

### For Developers
- Always use design tokens, never hardcode values
- Apply Tailwind utility classes from config
- Validate WCAG compliance on new components
- Sync to Penpot after token changes

### For Teams
- Penpot is single source of truth for visual design
- Design tokens are single source of truth for code
- Sync regularly (at least weekly)
- Comment in Penpot for design feedback

---

## 📞 Quick Links

- **Full Integration Guide:** [PENPOT_INTEGRATION.md](./PENPOT_INTEGRATION.md)
- **Brand Guidelines:** [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md)
- **Component Code:** [components/](./components/)
- **Penpot:** https://design.penpot.app
- **Support:** support@machups.com

---

**Print this page for quick reference** 📄
**Bookmark in browser for instant access** 🔖

**Last Updated:** December 6, 2025
**Version:** 1.0.0
