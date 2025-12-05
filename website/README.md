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

### Auto-Deploy (Recommended)

The site automatically deploys to Vercel on every push to `main` that modifies `website/**` files via GitHub Actions.

**Required GitHub Secrets:**
- `VERCEL_TOKEN`: API token from https://vercel.com/account/tokens
- `VERCEL_ORG_ID`: `team_htUXlE6aixhhmBuybRXvhe8S`
- `VERCEL_PROJECT_ID`: `prj_pVv7IcDUYnOUPG0TBCi268pgw6l1`

See `.github/workflows/deploy-docs.yml` for workflow configuration.

### Webhook Integration

Vercel sends deployment events to the main app:

```json
{
  "events": ["deployment.succeeded", "deployment.failed"],
  "url": "https://api.machups.com/webhooks/vercel/docs"
}
```

Set up in Vercel dashboard under Project Settings → Webhooks.

### Manual Deployment

```bash
# Build
pnpm build

# Deploy to production
VERCEL_ORG_ID=team_htUXlE6aixhhmBuybRXvhe8S \
VERCEL_PROJECT_ID=prj_pVv7IcDUYnOUPG0TBCi268pgw6l1 \
vercel --prod --token <token> --yes
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
