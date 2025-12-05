# Version History

## Versioning Strategy

MACHUPS follows [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes, major feature overhauls
- **MINOR**: New features, backward-compatible
- **PATCH**: Bug fixes, minor improvements

## Releases

### v0.3.0 - Auto Deploy & NFT Minting (Target: Dec 11, 2025)
🟡 **In Development**

**Features**:
- Auto-deploy to machups.com subdomains
- Subdomain availability checking
- Commemorative NFT minting on Monad
- Screenshot capture system
- Live preview iframe
- Deployment status tracking

**Technical**:
- Cloudflare Pages integration
- Puppeteer for screenshots
- thirdweb NFT minting
- IPFS metadata storage

**Deliverables**:
- 5 API routes
- 4 UI components
- Smart contract deployment
- Feature documentation

---

### v0.2.0 - Animation System & Social Media Assets (Dec 4, 2025)
🟢 **Released**

**Features**:
- Framer Motion animation system
- Web3Icons + Lucide React integration
- Social media asset generation (10 platforms)
- Multi-variant logo system (18 variants)
- Dynamic OG card generation
- Component presets for 6 wireframe templates
- Performance testing framework

**Documentation**:
- Animation guidelines (LESS = MORE philosophy)
- 400+ item brand requirements checklist
- Comprehensive pitch document
- Social media integration guide
- Future UI library roadmap

**Infrastructure**:
- Automated documentation update script
- Performance budgets and Core Web Vitals
- ASCII mockup template library
- Feature-specific prompts

**Technical Debt**:
- None introduced

**Known Issues**:
- None

**Contributors**: Fused Gaming Dev Team

---

### v0.1.0 - Foundation & Infrastructure (Dec 3, 2025)
🟢 **Released**

**Features**:
- Next.js 15 + React 19 setup
- TypeScript strict mode
- Tailwind CSS + PostCSS
- Design token system (W3C DTCG)
- Component registry
- Brand generation prompts

**Infrastructure**:
- 4 MCP server integrations (Penpot, Cloudflare, Anthropic, Foundry)
- GitHub workflows (CI, deploy, CodeQL, docs)
- TruffleHog security scanning
- pnpm package management
- Repository badges and metadata

**Documentation**:
- README with comprehensive overview
- CLAUDE.md development guidelines
- CHANGELOG.md
- CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md
- MCP setup guides

**Initial Files**: 97 files, 32,698 insertions

**Contributors**: Fused Gaming Dev Team

---

## Upcoming Releases

### v0.4.0 - Component Generator (Target: Dec 18, 2025)
🔵 **Planned**

**Planned Features**:
- AI-powered React component generation
- ShadCN UI integration
- Component variant system
- Accessibility audit automation
- Component playground
- Storybook integration

**Technical**:
- Claude API for component generation
- AST parsing and modification
- Component testing framework
- Visual regression testing

---

### v0.5.0 - Premium Features (Target: Dec 25, 2025)
🔵 **Planned**

**Planned Features**:
- Pitch deck generator
- A/B testing variant system
- Custom domain support
- Multi-region deployments
- Advanced analytics dashboard
- Team collaboration features

**Monetization**:
- Stripe integration
- x402 micropayments
- Subscription management
- Usage metering

---

### v1.0.0 - Public Launch (Target: Jan 15, 2026)
🔵 **Planned**

**Goals**:
- Production-ready stability
- Complete feature set
- Comprehensive documentation
- Marketing materials
- Community resources
- Support infrastructure

**Success Criteria**:
- 99.9% uptime
- < 3 min generation time
- 95% user satisfaction
- 1,000+ brands generated
- 500+ active users

---

## Version Metrics

| Version | Files | Lines of Code | Test Coverage | Bundle Size | Performance Score |
|---------|-------|---------------|---------------|-------------|-------------------|
| v0.1.0  | 97    | 32,698        | N/A           | N/A         | N/A               |
| v0.2.0  | 145   | 48,234        | N/A           | N/A         | N/A               |
| v0.3.0  | TBD   | TBD           | 80% target    | < 200KB     | 95+ Lighthouse    |

## Deprecation Schedule

Currently no deprecated features.

## Breaking Changes Log

### v0.3.0
- None (backward compatible)

### v0.2.0
- None (backward compatible)

### v0.1.0
- Initial release

---

## Release Notes Archive

Detailed release notes for each version are available in [CHANGELOG.md](../../CHANGELOG.md).

## Version Support Policy

- **Current version (v0.x)**: Full support, active development
- **Previous minor (v0.x-1)**: Security fixes only, 30 days
- **Older versions**: No support, upgrade recommended

## Upgrade Guides

- [v0.1.0 → v0.2.0](./upgrades/v0.1-to-v0.2.md) - No breaking changes
- [v0.2.0 → v0.3.0](./upgrades/v0.2-to-v0.3.md) - TBD

---

**Last Updated**: December 4, 2025
**Current Version**: v0.2.0
**Next Release**: v0.3.0 (Dec 11, 2025)
