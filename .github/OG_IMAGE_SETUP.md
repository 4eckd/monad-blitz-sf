# Open Graph Image Setup Guide

This guide explains how MachLabs generates dynamic Open Graph (OG) images for social media sharing.

## Overview

MachLabs uses **Vercel OG** to dynamically generate high-quality Open Graph images using plain HTML/CSS. This ensures consistent branding across all social shares and tracks which content gets shared the most.

## Features

✅ **Dynamic Generation** - Creates unique images for each page
✅ **Sponsor Branding** - Displays Monad, Vercel, and Cloudflare logos
✅ **Consistent Styling** - Uses MachLabs triadic color scheme
✅ **Performance** - Generated at edge with 0ms latency
✅ **Tracking** - Social media analytics via referrer tracking

## How It Works

### OG Image Endpoint

All OG images are generated via: `/api/og`

```typescript
// Example: Generate OG image for home page
/api/og?title=MachLabs&subtitle=Design%20at%20Mach%20Speed&description=...
```

### Image Specifications

- **Dimensions**: 1200x630px (standard for social media)
- **Format**: PNG generated server-side
- **Cache**: Automatically cached by CDN
- **Speed**: < 100ms generation time

## Page-Specific OG Images

### 1. Home Page

```typescript
// Auto-generated
title: "MachLabs - Design at Mach Speed"
subtitle: "Design at Mach Speed"
description: "AI-Powered UI Generation & Web3 Development"
```

### 2. Internship Page

```typescript
/api/og?title=Intern%20Build%20Day&subtitle=December%206,%202025&description=Ship%20features,%20learn%20AI%20&%20Web3
```

### 3. Design Variants

**Neon Sports Arena:**
```typescript
/api/og?title=Neon%20Arena&subtitle=Sports%20Aesthetic&description=High-Energy%20Design%20Showcase
```

**Cyberpunk Terminal:**
```typescript
/api/og?title=Cyberpunk%20Terminal&subtitle=Hacker%20Aesthetic&description=Retro-Futuristic%20Design%20Showcase
```

**Speed Racer:**
```typescript
/api/og?title=Speed%20Racer&subtitle=Performance%20Dashboard&description=Racing-Themed%20Design%20Showcase
```

## Design Elements

### Header Border
- **Style**: Triadic gradient (Blue → Red → Green)
- **Purpose**: Instant brand recognition
- **Color Scheme**:
  - Blue: #3B82F6 (primary)
  - Red: #EF4444 (secondary)
  - Green: #84CC16 (tertiary)

### Background
- **Gradient**: Dark charcoal (#0A0A0A) to darker (#1A1A1A)
- **Blur Accents**: Three overlapping radial gradients
- **Effect**: Depth and dimension

### Content
- **Title**: 120px bold gradient text
- **Subtitle**: 48px uppercase cyan accent
- **Description**: 32px regular gray text
- **Spacing**: Professional 80px padding

### Sponsor Section

Bottom of image includes:

```
Tech Stack: React, TypeScript, Web3, x402, Foundry

Sponsors:
🚀 Monad | ▲ Vercel | ☁️ Cloudflare
```

## Customization

### Adding New Sponsor

Edit `/app/api/og/route.tsx`:

```typescript
<div style={{ display: 'flex' }}>🎯 Your Sponsor</div>
```

### Changing Colors

Update the gradient values:

```typescript
background: 'linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%)',
```

### Adjusting Tech Stack

Modify the tech array:

```typescript
{['React', 'TypeScript', 'Web3', 'x402', 'Foundry', 'YourTech'].map(...)}
```

## Social Media Previews

### Twitter

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="MachLabs" />
<meta name="twitter:image" content="https://machlab.vercel.app/api/og?..." />
```

### LinkedIn

```html
<meta property="og:title" content="MachLabs" />
<meta property="og:image" content="https://machlab.vercel.app/api/og?..." />
```

### Facebook

```html
<meta property="og:type" content="website" />
<meta property="og:image" content="https://machlab.vercel.app/api/og?..." />
```

## Testing OG Images

### Before Sharing

1. Visit a page on your site
2. Use [Card Validator](https://cards-dev.twitter.com/validator) (Twitter)
3. Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
4. Use [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### In Development

```bash
# Start dev server
npm run dev

# Visit a page
http://localhost:3000/

# View OG image
http://localhost:3000/api/og?title=Test&subtitle=Dev
```

## Metadata Setup

### Layout Configuration

All metadata is configured in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'MachLabs - AI-Powered UI Generation',
  openGraph: {
    images: [
      {
        url: `${baseUrl}/api/og?title=MachLabs&...`,
        width: 1200,
        height: 630,
      },
    ],
  },
};
```

### Page-Specific Metadata

Each page sets its own metadata:

```typescript
// app/interns/page.tsx
export const metadata: Metadata = {
  title: 'Intern Build Day',
  openGraph: {
    images: [{
      url: `/api/og?title=Intern%20Build%20Day&...`,
      width: 1200,
      height: 630,
    }],
  },
};
```

## Analytics & Tracking

### Share Tracking

When users share your OG image, analytics are tracked via:

1. **Referrer Data**: See traffic from Twitter, LinkedIn, Facebook
2. **UTM Parameters**: Add to shared links for campaign tracking
3. **Social Media Metrics**: Monitor impressions and clicks

### Adding UTM Parameters

```
https://machlab.vercel.app?utm_source=twitter&utm_medium=social&utm_campaign=launch
```

### View Social Traffic

1. Go to Vercel Analytics
2. Look for referrer sources
3. Filter by domain: twitter.com, linkedin.com, facebook.com
4. Monitor OG image performance

## Advanced Customization

### Dynamic OG Images Per Variant

```typescript
// Generate different images for each design variant
/api/og?title=Neon%20Arena&theme=neon
/api/og?title=Cyberpunk&theme=cyberpunk
/api/og?title=Speed%20Racer&theme=racer
```

Then add theme-specific styling:

```typescript
const themeColors = {
  neon: { primary: '#3B82F6', secondary: '#EF4444' },
  cyberpunk: { primary: '#FF006E', secondary: '#8338EC' },
  racer: { primary: '#FFBE0B', secondary: '#FB5607' },
};
```

### Adding Sponsor Logos

For better visual impact, add actual logo images (if Vercel OG supports):

```typescript
// Future: Add sponsor brand images
<img src="https://monad.xyz/logo.png" alt="Monad" style={{height: '40px'}} />
```

## Production Checklist

- [ ] Test OG images on Twitter, LinkedIn, Facebook
- [ ] Verify all pages have metadata
- [ ] Confirm sponsor names display correctly
- [ ] Check image cache is working
- [ ] Monitor social media referrer traffic
- [ ] Set up Google Analytics for social campaigns
- [ ] Add UTM parameters to shared links
- [ ] Monitor Core Web Vitals impact

## Troubleshooting

### Image Not Showing in Preview

1. **Cache Issue**: Add `?v=` version query param
2. **Metadata Issue**: Verify `openGraph.images` in metadata
3. **URL Issue**: Use full absolute URL, not relative
4. **Format Issue**: Ensure image is PNG/JPG

### Text Not Rendering

1. Check font family support in Vercel OG
2. Verify text encoding (UTF-8)
3. Check color contrast (ensure readability)

### Sponsor Logos Not Displaying

1. Use emoji instead of image files
2. Verify color codes are valid hex
3. Test in browser DevTools first

## Resources

- [Vercel OG Documentation](https://vercel.com/docs/concepts/functions/og-image-generation)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

## Support

For OG image questions:
- Check `app/api/og/route.tsx` for implementation
- Review metadata in individual page files
- Test with official preview tools
- Contact the team at internship@machups.com
