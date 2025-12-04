# Component Presets by Wireframe Template

Component configurations for each ASCII wireframe template. These presets define which components are generated based on user-selected template.

---

## 1. Landing Page - Hero Focus

**Use Case**: SaaS products, app launches, product marketing

### components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  },
  "components": {
    "navigation": {
      "path": "components/navigation/navbar.tsx",
      "type": "component",
      "variants": ["default", "transparent", "sticky"],
      "features": ["mobile-menu", "dropdown", "cta-button"],
      "status": "required"
    },
    "hero": {
      "path": "components/hero/hero-section.tsx",
      "type": "section",
      "variants": ["centered", "split", "video-background"],
      "features": ["headline", "subheadline", "cta-buttons", "hero-image"],
      "status": "required"
    },
    "button": {
      "path": "components/ui/button.tsx",
      "type": "component",
      "variants": ["primary", "secondary", "ghost", "outline"],
      "sizes": ["sm", "md", "lg"],
      "features": ["icon-support", "loading-state"],
      "status": "required"
    },
    "feature-grid": {
      "path": "components/features/feature-grid.tsx",
      "type": "section",
      "variants": ["2-col", "3-col", "4-col"],
      "features": ["icon", "title", "description"],
      "status": "required"
    },
    "social-proof": {
      "path": "components/social-proof/logo-cloud.tsx",
      "type": "section",
      "variants": ["scrolling", "static", "grid"],
      "features": ["company-logos", "testimonial-quote"],
      "status": "required"
    },
    "footer": {
      "path": "components/navigation/footer.tsx",
      "type": "component",
      "variants": ["simple", "with-links", "with-newsletter"],
      "features": ["social-icons", "copyright", "links"],
      "status": "required"
    }
  },
  "pages": [
    {
      "name": "Home",
      "path": "app/page.tsx",
      "sections": ["navbar", "hero", "feature-grid", "social-proof", "footer"]
    }
  ]
}
```

---

## 2. SaaS Dashboard - Analytics

**Use Case**: Admin panels, analytics dashboards, data visualization

### components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "components": {
    "sidebar": {
      "path": "components/navigation/sidebar.tsx",
      "type": "component",
      "variants": ["collapsible", "fixed", "floating"],
      "features": ["navigation-items", "user-menu", "collapse-button"],
      "status": "required"
    },
    "dashboard-header": {
      "path": "components/dashboard/header.tsx",
      "type": "component",
      "variants": ["default", "with-search"],
      "features": ["search", "notifications", "user-avatar"],
      "status": "required"
    },
    "stat-card": {
      "path": "components/dashboard/stat-card.tsx",
      "type": "component",
      "variants": ["default", "with-trend", "with-icon"],
      "features": ["metric-value", "label", "trend-indicator", "icon"],
      "status": "required"
    },
    "chart": {
      "path": "components/dashboard/chart.tsx",
      "type": "component",
      "variants": ["line", "bar", "area", "pie"],
      "features": ["responsive", "interactive", "legend", "tooltip"],
      "libraries": ["recharts"],
      "status": "required"
    },
    "data-table": {
      "path": "components/dashboard/data-table.tsx",
      "type": "component",
      "variants": ["default", "sortable", "filterable"],
      "features": ["pagination", "sorting", "filtering", "row-selection"],
      "libraries": ["@tanstack/react-table"],
      "status": "required"
    },
    "activity-feed": {
      "path": "components/dashboard/activity-feed.tsx",
      "type": "component",
      "variants": ["default", "compact"],
      "features": ["timestamp", "user-avatar", "action-description"],
      "status": "optional"
    }
  },
  "pages": [
    {
      "name": "Dashboard",
      "path": "app/dashboard/page.tsx",
      "sections": ["sidebar", "header", "stat-cards", "charts", "activity-feed"]
    }
  ]
}
```

---

## 3. E-commerce - Product Listing

**Use Case**: Online stores, marketplaces, product catalogs

### components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "components": {
    "product-card": {
      "path": "components/ecommerce/product-card.tsx",
      "type": "component",
      "variants": ["default", "compact", "featured"],
      "features": ["image", "title", "price", "rating", "add-to-cart"],
      "status": "required"
    },
    "filter-sidebar": {
      "path": "components/ecommerce/filter-sidebar.tsx",
      "type": "component",
      "variants": ["default", "collapsible"],
      "features": ["category-filter", "price-range", "brand-filter", "rating-filter"],
      "status": "required"
    },
    "product-grid": {
      "path": "components/ecommerce/product-grid.tsx",
      "type": "section",
      "variants": ["2-col", "3-col", "4-col"],
      "features": ["responsive", "load-more", "sorting"],
      "status": "required"
    },
    "sort-dropdown": {
      "path": "components/ecommerce/sort-dropdown.tsx",
      "type": "component",
      "variants": ["default"],
      "features": ["sort-options", "dropdown-menu"],
      "status": "required"
    },
    "shopping-cart-icon": {
      "path": "components/ecommerce/cart-icon.tsx",
      "type": "component",
      "variants": ["default", "with-count"],
      "features": ["item-count-badge", "dropdown-preview"],
      "status": "required"
    },
    "breadcrumbs": {
      "path": "components/navigation/breadcrumbs.tsx",
      "type": "component",
      "variants": ["default"],
      "features": ["current-page", "separator"],
      "status": "required"
    },
    "rating-stars": {
      "path": "components/ui/rating-stars.tsx",
      "type": "component",
      "variants": ["default", "interactive"],
      "features": ["half-stars", "readonly"],
      "status": "required"
    }
  },
  "pages": [
    {
      "name": "Products",
      "path": "app/products/page.tsx",
      "sections": ["navbar", "breadcrumbs", "filter-sidebar", "product-grid"]
    }
  ]
}
```

---

## 4. Portfolio - Creative

**Use Case**: Designer portfolios, agency websites, creative showcases

### components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "components": {
    "minimal-nav": {
      "path": "components/navigation/minimal-nav.tsx",
      "type": "component",
      "variants": ["centered", "spread"],
      "features": ["logo", "menu-items", "social-links"],
      "status": "required"
    },
    "project-card": {
      "path": "components/portfolio/project-card.tsx",
      "type": "component",
      "variants": ["default", "hover-overlay", "minimal"],
      "features": ["image", "title", "category", "link"],
      "status": "required"
    },
    "project-grid": {
      "path": "components/portfolio/project-grid.tsx",
      "type": "section",
      "variants": ["masonry", "grid", "carousel"],
      "features": ["responsive", "filter-by-category", "lightbox"],
      "status": "required"
    },
    "about-section": {
      "path": "components/portfolio/about-section.tsx",
      "type": "section",
      "variants": ["default", "split"],
      "features": ["bio", "profile-image", "skills", "contact-cta"],
      "status": "optional"
    },
    "contact-form": {
      "path": "components/forms/contact-form.tsx",
      "type": "component",
      "variants": ["default", "minimal"],
      "features": ["name", "email", "message", "validation", "submit"],
      "libraries": ["react-hook-form", "zod"],
      "status": "required"
    },
    "testimonial": {
      "path": "components/portfolio/testimonial.tsx",
      "type": "component",
      "variants": ["default", "with-avatar"],
      "features": ["quote", "author", "company", "avatar"],
      "status": "optional"
    }
  },
  "pages": [
    {
      "name": "Home",
      "path": "app/page.tsx",
      "sections": ["minimal-nav", "hero", "project-grid", "about", "contact-form"]
    }
  ]
}
```

---

## 5. Blog - Article Layout

**Use Case**: Blogs, news sites, content platforms

### components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "components": {
    "article-header": {
      "path": "components/blog/article-header.tsx",
      "type": "component",
      "variants": ["default", "with-cover"],
      "features": ["title", "author", "date", "read-time", "tags"],
      "status": "required"
    },
    "article-content": {
      "path": "components/blog/article-content.tsx",
      "type": "component",
      "variants": ["default"],
      "features": ["markdown-support", "code-highlighting", "images"],
      "libraries": ["react-markdown", "rehype-highlight"],
      "status": "required"
    },
    "author-bio": {
      "path": "components/blog/author-bio.tsx",
      "type": "component",
      "variants": ["compact", "expanded"],
      "features": ["avatar", "name", "bio", "social-links"],
      "status": "required"
    },
    "related-articles": {
      "path": "components/blog/related-articles.tsx",
      "type": "section",
      "variants": ["grid", "list"],
      "features": ["article-preview", "thumbnail", "title", "excerpt"],
      "status": "required"
    },
    "table-of-contents": {
      "path": "components/blog/table-of-contents.tsx",
      "type": "component",
      "variants": ["sidebar", "inline"],
      "features": ["auto-generate", "active-section", "smooth-scroll"],
      "status": "optional"
    },
    "share-buttons": {
      "path": "components/blog/share-buttons.tsx",
      "type": "component",
      "variants": ["default", "floating"],
      "features": ["x-twitter", "linkedin", "facebook", "copy-link"],
      "status": "required"
    },
    "tag-list": {
      "path": "components/blog/tag-list.tsx",
      "type": "component",
      "variants": ["default", "pills"],
      "features": ["tag-links", "tag-count"],
      "status": "required"
    }
  },
  "pages": [
    {
      "name": "Article",
      "path": "app/blog/[slug]/page.tsx",
      "sections": ["navbar", "article-header", "table-of-contents", "article-content", "share-buttons", "author-bio", "related-articles"]
    }
  ]
}
```

---

## 6. Web3/Crypto - DApp Landing

**Use Case**: DeFi protocols, NFT marketplaces, blockchain apps

### components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "components": {
    "web3-navbar": {
      "path": "components/web3/navbar.tsx",
      "type": "component",
      "variants": ["default"],
      "features": ["wallet-connect-button", "network-selector", "account-dropdown"],
      "libraries": ["wagmi", "viem"],
      "status": "required"
    },
    "connect-wallet-button": {
      "path": "components/web3/connect-wallet-button.tsx",
      "type": "component",
      "variants": ["default", "compact"],
      "features": ["wallet-modal", "connection-status", "disconnect"],
      "libraries": ["@rainbow-me/rainbowkit"],
      "status": "required"
    },
    "metrics-card": {
      "path": "components/web3/metrics-card.tsx",
      "type": "component",
      "variants": ["default", "animated"],
      "features": ["metric-value", "label", "icon", "trend"],
      "status": "required"
    },
    "feature-card": {
      "path": "components/web3/feature-card.tsx",
      "type": "component",
      "variants": ["default", "glowing-border"],
      "features": ["icon", "title", "description", "cta-link"],
      "status": "required"
    },
    "audit-badges": {
      "path": "components/web3/audit-badges.tsx",
      "type": "component",
      "variants": ["default", "grid"],
      "features": ["audit-logos", "links"],
      "status": "required"
    },
    "network-badge": {
      "path": "components/web3/network-badge.tsx",
      "type": "component",
      "variants": ["default", "with-icon"],
      "features": ["network-name", "chain-icon"],
      "status": "required"
    },
    "wallet-address": {
      "path": "components/web3/wallet-address.tsx",
      "type": "component",
      "variants": ["default", "truncated"],
      "features": ["copy-button", "etherscan-link", "ens-name"],
      "status": "required"
    }
  },
  "pages": [
    {
      "name": "Home",
      "path": "app/page.tsx",
      "sections": ["web3-navbar", "hero", "metrics-cards", "feature-cards", "audit-badges", "footer"]
    }
  ]
}
```

---

## Usage in Brand Generator

### Component Selection Flow

```typescript
// lib/generators/component-selector.ts
interface TemplatePreset {
  name: string;
  category: 'landing' | 'dashboard' | 'ecommerce' | 'portfolio' | 'blog' | 'web3';
  componentsConfig: ComponentsConfig;
  pages: PageConfig[];
}

export function selectComponentsForTemplate(
  template: string
): TemplatePreset {
  const presets: Record<string, TemplatePreset> = {
    'landing-hero-focus': {
      name: 'Landing Page - Hero Focus',
      category: 'landing',
      componentsConfig: LANDING_HERO_FOCUS_CONFIG,
      pages: ['home'],
    },
    'saas-dashboard-analytics': {
      name: 'SaaS Dashboard - Analytics',
      category: 'dashboard',
      componentsConfig: DASHBOARD_ANALYTICS_CONFIG,
      pages: ['dashboard'],
    },
    // ... other presets
  };

  return presets[template];
}

export async function generateComponentsForPreset(
  preset: TemplatePreset,
  brandTokens: DesignTokens
): Promise<GeneratedComponents> {
  const components: GeneratedComponents = {};

  for (const [name, config] of Object.entries(preset.componentsConfig.components)) {
    if (config.status === 'required' || userOptedIn(name)) {
      components[name] = await generateComponent({
        name,
        config,
        tokens: brandTokens,
      });
    }
  }

  return components;
}
```

### Integration with ASCII Templates

When user selects ASCII wireframe template:
1. System loads corresponding components.json preset
2. Generates all "required" components
3. Asks user about "optional" components
4. Customizes components with brand design tokens
5. Generates page files with proper component imports

---

## Component Generation Priority

### Required (Always Generated)
- Navigation
- Hero/Header section
- Primary CTA buttons
- Footer
- Core content components

### Optional (User Choice)
- Advanced features
- Additional sections
- Complex interactions
- Third-party integrations

### Generated on Demand
- Forms (contact, newsletter, etc.)
- Modals/Dialogs
- Toast notifications
- Loading states

---

## Library Dependencies by Preset

### Landing Page
```json
{
  "dependencies": {
    "framer-motion": "^12.23.25",
    "lucide-react": "^0.555.0"
  }
}
```

### SaaS Dashboard
```json
{
  "dependencies": {
    "@tanstack/react-table": "^8.10.0",
    "recharts": "^2.10.0",
    "date-fns": "^2.30.0"
  }
}
```

### E-commerce
```json
{
  "dependencies": {
    "@stripe/stripe-js": "^2.0.0",
    "zustand": "^4.4.0"
  }
}
```

### Portfolio
```json
{
  "dependencies": {
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "yet-another-react-lightbox": "^3.0.0"
  }
}
```

### Blog
```json
{
  "dependencies": {
    "react-markdown": "^9.0.0",
    "rehype-highlight": "^7.0.0",
    "gray-matter": "^4.0.3"
  }
}
```

### Web3/Crypto
```json
{
  "dependencies": {
    "wagmi": "^2.0.0",
    "viem": "^2.0.0",
    "@rainbow-me/rainbowkit": "^2.0.0",
    "thirdweb": "^5.0.0"
  }
}
```

---

**Last Updated**: December 4, 2025
**Integration**: Automatically loaded based on ASCII template selection
**Customization**: All components use generated design tokens
