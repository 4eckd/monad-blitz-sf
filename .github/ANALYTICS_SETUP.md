# Analytics Setup Guide

This guide explains how to set up analytics tracking for MachLabs to monitor A/B/C variant performance and user engagement.

## Overview

MachLabs uses a multi-tier analytics approach:

1. **Vercel Web Analytics** - Page performance and user engagement (automatic on Vercel)
2. **Cloudflare Web Analytics** - Web traffic and security metrics
3. **Custom Event Tracking** - A/B/C variant views and user interactions
4. **Open Graph Images** - Social media sharing metrics

## Vercel Web Analytics

### Setup (Automatic on Vercel)

Vercel Web Analytics is **automatically enabled** when you deploy to Vercel.

1. Deploy your site to Vercel
2. Visit your Vercel project dashboard
3. Navigate to **Analytics** tab
4. Enable **Web Analytics** (if not already enabled)

### What's Tracked

- Page views and route traffic
- Core Web Vitals (LCP, FID, CLS)
- Browser and device information
- Geographic data

### View Your Analytics

1. Go to your Vercel project dashboard
2. Click **Analytics** → **Web**
3. View metrics for:
   - Page routes (`/`, `/about`, `/interns`, `/design/*`)
   - Real User Monitoring (RUM)
   - Performance metrics

## Cloudflare Web Analytics

### Setup

#### 1. Get Your Beacon Token

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Analytics & Logs** → **Web Analytics**
3. Create a **Web Site** and get your token
4. Copy the token

#### 2. Add to Environment

Add to `.env.local`:

```env
NEXT_PUBLIC_CF_BEACON_TOKEN=your-token-here
```

The beacon script is already configured in `app/layout.tsx`.

#### 3. Verify Installation

1. Visit your site
2. Open browser DevTools → Network tab
3. Look for requests to `cloudflareinsights.com`
4. Wait 5-10 minutes for data to appear in Cloudflare dashboard

### What's Tracked

- Page views and sessions
- Traffic sources (direct, referral, search)
- Browser and OS information
- Performance metrics
- Country/region data

### View Your Analytics

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Analytics & Logs** → **Web Analytics**
3. View metrics for your domain

## Custom Event Tracking (A/B/C Variants)

### How It Works

The analytics module in `app/lib/analytics.ts` tracks:

- **Variant Views** - Which design variant (Neon Arena, Cyberpunk, Speed Racer) each user sees
- **Page Navigation** - Which design pages users click on
- **User Actions** - Apply button clicks, link clicks

### Implementation

Events are sent to:

1. **Vercel Web Analytics** - Via `window.va()` API
2. **Cloudflare Analytics** - Via sendBeacon to `/api/analytics`
3. **Console Logs** - For debugging

### Tracked Events

| Event | Description | Data |
|-------|-------------|------|
| `variant_view` | User sees a design variant | `variant`: neon-arena, cyberpunk-terminal, speed-racer |
| `design_click` | User clicks design page link | `variant`: destination page |
| `apply_click` | User clicks apply button | `source`: page name |
| `page_view` | Page load | `page`: route name |

### View Event Data

#### Vercel Web Analytics

1. Go to your Vercel project dashboard
2. Click **Analytics** → **Web**
3. Look for custom events in the analytics view
4. Filter by event name to see variant distribution

#### Cloudflare Analytics

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Analytics & Logs** → **Web Analytics**
3. Check network traffic and page views
4. Monitor performance metrics

## A/B Testing Variant Analytics

### Analyzing Variant Performance

#### Using Vercel Analytics

```
Variant Distribution (from analytics)
- Neon Arena: 33% of users
- Cyberpunk Terminal: 33% of users
- Speed Racer: 34% of users

Performance Metrics per Route
- /design/neon-arena - [LCP, FID, CLS]
- /design/cyberpunk - [LCP, FID, CLS]
- /design/speed-racer - [LCP, FID, CLS]
```

#### Using Cloudflare Analytics

```
Traffic Distribution
- Design pages get X% of total traffic
- Internship page gets Y% of total traffic
- About page gets Z% of total traffic

Geographic Distribution
- Top countries viewing variants
- Regional performance differences
```

### Calculating Success Metrics

To measure which variant performs best:

1. **Engagement**: Track design page clicks from each variant
2. **Conversion**: Track apply button clicks by variant
3. **Performance**: Compare Core Web Vitals by variant
4. **Bounce Rate**: Compare route exit rates

## API Analytics Endpoint

### POST /api/analytics

Receives custom analytics events with the following format:

```typescript
{
  event: 'variant_view' | 'design_click' | 'apply_click' | 'page_view',
  variant?: string,        // 'neon-arena', 'cyberpunk-terminal', 'speed-racer'
  page?: string,           // route name
  destination?: string,    // target URL
  timestamp: number        // milliseconds since epoch
}
```

### Example Usage

```typescript
import { trackVariantView } from '@/app/lib/analytics';

// Track variant view
trackVariantView('neon-arena');

// Custom event
trackEvent('design_click', { variant: 'cyberpunk-terminal' });
```

## Open Graph Image Analytics

### How It Works

Each page generates a dynamic OG image at `/api/og`:

```
/api/og?title=MachLabs&subtitle=Design%20at%20Mach%20Speed&description=...
```

### Tracking Social Shares

1. Use UTM parameters in shared links
2. Monitor Cloudflare referrer data
3. Track domain referrers in Vercel Analytics

## Best Practices

### 1. Data Privacy

- No personal data is collected
- Analytics are anonymized
- Complies with GDPR, CCPA

### 2. Performance

- Analytics scripts load asynchronously
- No blocking JavaScript
- Minimal impact on Core Web Vitals

### 3. Sampling

- Vercel uses 100% sampling by default
- Cloudflare samples high-traffic sites
- Custom events are not sampled

### 4. Retention

- Vercel: 90-day data retention
- Cloudflare: 30-90 day retention
- Custom API logs: depends on storage

## Troubleshooting

### Analytics Not Showing

1. **Vercel**: Analytics appear 5-10 minutes after first visit
2. **Cloudflare**: Wait 5-10 minutes after adding beacon token
3. **Custom Events**: Check `/api/analytics` endpoint logs

### Missing Variant Data

1. Open browser DevTools → Console
2. Look for `[Analytics]` log messages
3. Check Network tab for failed requests
4. Verify `NEXT_PUBLIC_CF_BEACON_TOKEN` is set

### Performance Issues

1. Check Core Web Vitals in Vercel Analytics
2. Compare before/after analytics integration
3. Profile with DevTools Performance tab
4. Defer non-critical analytics scripts

## Advanced Analytics

### Setting Up a Data Warehouse

To store analytics data long-term:

1. Cloudflare Workers Analytics Engine
2. Supabase/PostgreSQL
3. BigQuery
4. Mixpanel or Amplitude

### Third-Party Analytics Services

Add to `.env.example`:

```env
NEXT_PUBLIC_MIXPANEL_TOKEN=your-token
NEXT_PUBLIC_SEGMENT_WRITE_KEY=your-key
```

Then update `app/lib/analytics.ts` to send events to these services.

## Resources

- [Vercel Web Analytics Docs](https://vercel.com/docs/analytics/web)
- [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/)
- [Web Vitals Explanation](https://web.dev/vitals/)
- [Analytics best practices](https://web.dev/analytics/)

## Support

For questions about analytics setup:
- Check the [ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md) (this file)
- Review `app/lib/analytics.ts` for implementation details
- Check `/api/analytics` endpoint logs
- Contact the team at internship@machups.com
