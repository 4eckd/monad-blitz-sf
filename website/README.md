# MACHUPS Documentation Site

This is the Docusaurus-powered documentation site for MACHUPS, deployed at [docs.machups.com](https://docs.machups.com).

## Development

```bash
# Install dependencies
cd website
pnpm install

# Start development server
pnpm start

# Build for production
pnpm build

# Serve production build locally
pnpm serve
```

## Deployment

The site is automatically deployed to docs.machups.com via Vercel using the DOCS_VERCEL_TOKEN.

### Manual Deployment

```bash
# Build
pnpm build

# Deploy to Vercel
vercel --prod
```

## Structure

```
website/
├── docs/              # Documentation pages (Markdown)
├── blog/              # Blog posts
├── src/
│   ├── css/          # Custom styles
│   └── pages/        # React pages
├── static/           # Static assets (images, etc.)
├── docusaurus.config.ts
└── sidebars.ts
```

## Adding Documentation

1. Create a new `.md` file in `docs/`
2. Add frontmatter with `sidebar_position`
3. Update `sidebars.ts` if needed
4. Build and test locally

## Branding

- Logo: `/static/img/logo.svg`
- Social Card: `/static/img/machups-social-card.png`
- Colors: Defined in `/src/css/custom.css`

All Docusaurus branding has been removed and replaced with MACHUPS branding.

## License

Built for Monad Blitz SF #18 (December 6, 2025)
