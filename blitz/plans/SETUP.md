# MACHUPS Project Setup Prompt for Claude Code

Copy and paste this entire prompt into Claude Code to automatically set up your project planning in GitHub.

---

## PROMPT FOR CLAUDE CODE

```
You are setting up the MACHUPS project for Monad Blitz #18. This is a 3-minute AI-powered brand generation platform that creates logos, design tokens, components, documentation, and NFTs.

**YOUR TASK:** Set up the complete project structure in GitHub including:
1. Repository initialization
2. GitHub Issues for all tasks
3. GitHub Project board with proper columns
4. Labels and milestones
5. Initial file structure
6. Development environment setup

**REPOSITORY:** https://github.com/4eckd/monad-blitz-sf

---

## STEP 1: CREATE GITHUB PROJECT BOARD

Create a new GitHub Project (Projects tab) named "Monad Blitz #18 - MACHUPS" with these columns:

1. **📋 Backlog** - All planned tasks
2. **🎯 Ready** - Ready to start (sorted by priority)
3. **⚡ In Progress** - Currently being worked on
4. **👀 Review** - Needs review/testing
5. **✅ Done** - Completed
6. **🔥 Blocked** - Needs attention/help

---

## STEP 2: CREATE LABELS

Create these labels in the repository:

**Priority Labels:**
- `P0-critical` (Red) - Must complete, blocks everything
- `P1-high` (Orange) - Core MVP features
- `P2-medium` (Yellow) - Important but not blocking
- `P3-low` (Green) - Nice to have

**Phase Labels:**
- `phase-1-foundation` (Purple) - Hours 0-3
- `phase-2-core` (Blue) - Hours 3-7
- `phase-3-integration` (Teal) - Hours 7-10
- `phase-4-finalization` (Pink) - Hours 10-11

**Component Labels:**
- `component-logo-gen` (Gray)
- `component-tokens` (Gray)
- `component-components` (Gray)
- `component-guidelines` (Gray)
- `component-premium` (Gray)
- `component-nft` (Gray)

**Type Labels:**
- `type-feature` (Green)
- `type-bug` (Red)
- `type-docs` (Blue)
- `type-infra` (Purple)

---

## STEP 3: CREATE MILESTONES

Create these milestones with dates:

1. **Checkpoint 1: Foundation Complete** (H3:00)
   - Due: 3 hours from start
   - Description: "Dev environment setup, Claude API working, HTML/CSS logo generator functional"

2. **Checkpoint 2: Core Features Complete** (H7:00)
   - Due: 7 hours from start
   - Description: "All generators working, component export functional, can generate complete brand"

3. **Checkpoint 3: Integration Complete** (H10:00)
   - Due: 10 hours from start
   - Description: "Deployed to production, x402 working, NFT minting functional"

4. **Final Submission** (H11:00)
   - Due: 11 hours from start
   - Description: "Project submitted, demo ready, all systems tested"

---

## STEP 4: CREATE ISSUES

Create these GitHub issues with proper labels and milestones:

### PHASE 1: FOUNDATION (H0-H3)

#### Issue #1: Project Setup & Environment Configuration
**Labels:** `P0-critical`, `phase-1-foundation`, `type-infra`
**Milestone:** Checkpoint 1
**Assignee:** DevOps Lead

**Description:**
```markdown
## Objective
Set up complete development environment for MACHUPS

## Tasks
- [ ] Clone repository and verify access
- [ ] Install Node.js v18+ and dependencies
- [ ] Set up environment variables (.env.local)
- [ ] Install required packages:
  - [ ] @anthropic-ai/sdk
  - [ ] thirdweb
  - [ ] html-to-image
  - [ ] next@latest
- [ ] Test local development server (npm run dev)
- [ ] Verify Cloudflare Pages configuration

## Environment Variables Needed
```bash
CLAUDE_API_KEY=sk-ant-xxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
THIRDWEB_SECRET_KEY=xxx
NEXT_PUBLIC_MONAD_RPC_URL=https://testnet-rpc.monad.xyz
NEXT_PUBLIC_MONAD_CHAIN_ID=10143
```

## Acceptance Criteria
- ✅ Local dev server running on http://localhost:3000
- ✅ All dependencies installed
- ✅ Environment variables configured
- ✅ Team can access repository

## Time Budget
1 hour (H0:00-H1:00)
```

---

#### Issue #2: Claude API Integration & Testing
**Labels:** `P0-critical`, `phase-1-foundation`, `type-feature`
**Milestone:** Checkpoint 1
**Assignee:** Backend Lead

**Description:**
```markdown
## Objective
Integrate Claude API and create core analysis function

## Tasks
- [ ] Create `src/lib/utils/claude.ts` client wrapper
- [ ] Implement `analyzeBusinessIdea()` function
- [ ] Test API connection with sample request
- [ ] Implement error handling and retry logic
- [ ] Add rate limiting protection

## Code Structure
```typescript
// src/lib/utils/claude.ts
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function analyzeBusinessIdea(input: {
  businessIdea: string;
  targetAudience: string;
  style: string;
}) {
  // Implementation here
}
```

## Acceptance Criteria
- ✅ Can make successful API calls
- ✅ Error handling works
- ✅ Returns structured analysis
- ✅ Response time < 10 seconds

## Time Budget
1 hour (H1:00-H2:00)
```

---

#### Issue #3: HTML/CSS Logo Generator (Core Feature)
**Labels:** `P0-critical`, `phase-1-foundation`, `component-logo-gen`, `type-feature`
**Milestone:** Checkpoint 1
**Assignee:** Frontend Lead

**Description:**
```markdown
## Objective
Build HTML/CSS-based logo generator that creates instant, high-quality logos

## Tasks
- [ ] Create `src/lib/generators/logos.ts`
- [ ] Build 3 logo templates:
  - [ ] Wordmark (text-based)
  - [ ] Icon + Text combination
  - [ ] Badge/emblem style
- [ ] Implement `html-to-image` conversion
- [ ] Export as PNG (multiple sizes) and SVG
- [ ] Add brand color integration

## Templates to Build
1. **Wordmark:** Bold text with brand colors
2. **Combination:** Icon + brand name
3. **Badge:** Circular badge with initial/icon

## Acceptance Criteria
- ✅ Generates 3 logo variations instantly (<1 second)
- ✅ Exports PNG (400x400, 800x800, 1200x1200)
- ✅ Exports SVG (vector format)
- ✅ Uses brand colors from tokens
- ✅ Transparent backgrounds

## Time Budget
1 hour (H2:00-H3:00)
```

---

### PHASE 2: CORE FEATURES (H3-H7)

#### Issue #4: Design Token Generator
**Labels:** `P0-critical`, `phase-2-core`, `component-tokens`, `type-feature`
**Milestone:** Checkpoint 2
**Assignee:** Backend Lead

**Description:**
```markdown
## Objective
Generate W3C DTCG-compliant design tokens from brand analysis

## Tasks
- [ ] Create `src/lib/generators/tokens.ts`
- [ ] Generate color tokens (primary, secondary, semantic, neutral)
- [ ] Generate typography tokens (fonts, sizes, weights, line-heights)
- [ ] Generate spacing tokens (8-point grid system)
- [ ] Generate border radius tokens
- [ ] Implement W3C DTCG validation
- [ ] Create exporters for multiple formats:
  - [ ] JSON (W3C DTCG)
  - [ ] CSS Variables
  - [ ] Tailwind Config
  - [ ] SCSS Variables

## Token Structure
```json
{
  "color": {
    "brand": {
      "primary": {
        "$value": "#0066FF",
        "$type": "color",
        "$description": "Primary brand color"
      }
    }
  }
}
```

## Acceptance Criteria
- ✅ Generates complete token set
- ✅ W3C DTCG compliant
- ✅ Exports to 3+ formats
- ✅ Semantically named tokens

## Time Budget
1.5 hours (H3:00-H4:30)
```

---

#### Issue #5: Component Code Generator
**Labels:** `P1-high`, `phase-2-core`, `component-components`, `type-feature`
**Milestone:** Checkpoint 2
**Assignee:** Frontend Lead

**Description:**
```markdown
## Objective
Generate production-ready React components in user's chosen tech stack

## Tasks
- [ ] Create `src/lib/generators/components.ts`
- [ ] Build component templates for:
  - [ ] Button (primary, secondary, ghost variants)
  - [ ] Input (text, email, password)
  - [ ] Card (basic card component)
  - [ ] Header (navigation bar)
  - [ ] Footer (site footer)
- [ ] Implement tech stack adapters:
  - [ ] React + TypeScript (.tsx)
  - [ ] Next.js (.tsx with 'use client')
  - [ ] Plain HTML + CSS
- [ ] Integrate design tokens into components
- [ ] Add TypeScript types and props

## Component Template Example
```typescript
// Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({ variant, children }) => {
  // Implementation using tokens
};
```

## Acceptance Criteria
- ✅ Generates 5 core components
- ✅ Supports React TS, Next.js, HTML
- ✅ Uses design tokens
- ✅ Fully typed (TypeScript)
- ✅ Accessible (ARIA labels)

## Time Budget
2 hours (H4:30-H6:30)
```

---

#### Issue #6: Branding Guidelines Generator
**Labels:** `P1-high`, `phase-2-core`, `component-guidelines`, `type-feature`
**Milestone:** Checkpoint 2
**Assignee:** Full Stack Dev

**Description:**
```markdown
## Objective
Generate professional branding guidelines PDF using existing repository scripts

## Tasks
- [ ] Locate existing `scripts/generate-guidelines.ts` (if exists)
- [ ] Create `src/lib/generators/guidelines.ts` wrapper
- [ ] Generate PDF content:
  - [ ] Cover page with logo
  - [ ] Brand overview
  - [ ] Logo usage guidelines
  - [ ] Color palette with hex/RGB values
  - [ ] Typography system
  - [ ] Component examples
  - [ ] Do's and Don'ts
  - [ ] Usage examples
- [ ] Use `puppeteer` or `html-pdf` for PDF generation
- [ ] Apply brand styling to PDF

## PDF Structure (20 pages)
1. Cover
2. Brand Overview (1 page)
3. Logo System (3 pages)
4. Color Palette (2 pages)
5. Typography (2 pages)
6. Design Tokens (2 pages)
7. Components (4 pages)
8. Guidelines (3 pages)
9. Examples (3 pages)

## Acceptance Criteria
- ✅ Generates professional 20-page PDF
- ✅ All brand elements included
- ✅ Styled with brand colors/fonts
- ✅ Ready for download
- ✅ Generation time < 30 seconds

## Time Budget
1.5 hours (H6:30-H8:00)
```

---

### PHASE 3: INTEGRATION (H7-H10)

#### Issue #7: User Interface & Form
**Labels:** `P1-high`, `phase-3-integration`, `type-feature`
**Milestone:** Checkpoint 3
**Assignee:** Frontend Lead

**Description:**
```markdown
## Objective
Build user-facing UI for brand generation

## Tasks
- [ ] Create homepage with input form (`src/app/page.tsx`)
- [ ] Build generation progress page (`src/app/generate/page.tsx`)
- [ ] Create results/preview page (`src/app/preview/[id]/page.tsx`)
- [ ] Add form validation
- [ ] Implement progress bar with real-time updates
- [ ] Add tech stack selection dropdown
- [ ] Add CSS framework selection
- [ ] Design premium upsell section

## Form Fields
```typescript
interface GenerationInput {
  businessIdea: string;        // Required
  targetAudience: string;      // Required
  style: 'modern' | 'classic' | 'bold';
  techStack: 'react-ts' | 'nextjs' | 'html';
  cssFramework: 'tailwind' | 'css' | 'scss';
}
```

## Pages to Build
1. `/` - Input form
2. `/generate` - Progress + real-time updates
3. `/preview/[id]` - Results + download

## Acceptance Criteria
- ✅ Clean, professional UI
- ✅ Form validation working
- ✅ Progress bar shows real-time status
- ✅ Results page shows all deliverables
- ✅ Mobile responsive

## Time Budget
2 hours (H7:00-H9:00)
```

---

#### Issue #8: x402 Payment Integration (Premium Features)
**Labels:** `P2-medium`, `phase-3-integration`, `component-premium`, `type-feature`
**Milestone:** Checkpoint 3
**Assignee:** Blockchain Dev

**Description:**
```markdown
## Objective
Integrate x402 micropayments for premium features (pitch deck, A/B variants)

## Tasks
- [ ] Install thirdweb SDK
- [ ] Set up Monad testnet connection
- [ ] Create payment verification endpoint (`/api/premium/verify`)
- [ ] Implement pitch deck generator (premium)
- [ ] Add x402 payment UI component
- [ ] Test payment flow end-to-end

## Premium Features
1. **Pitch Deck** - 0.01 MON (~$0.20)
   - 10-slide investor deck
   - Branded styling
   - PDF + PPTX formats

2. **A/B Variants** - 0.005 MON (~$0.10)
   - 3 design variations
   - Different headlines/CTAs
   - Testing setup code

## x402 Implementation
```typescript
// API endpoint: /api/premium/pitchdeck
export async function POST(req: Request) {
  const payment = await verifyX402Payment(req.headers.get('x-payment'));
  
  if (!payment.verified) {
    return Response.json({ error: 'Payment required' }, { status: 402 });
  }
  
  const pitchDeck = await generatePitchDeck(req.body);
  return Response.json({ pitchDeck });
}
```

## Acceptance Criteria
- ✅ x402 payment verification working
- ✅ Pitch deck generation functional
- ✅ Payment UI clear and simple
- ✅ User can purchase and download
- ✅ Tested on Monad testnet

## Time Budget
1.5 hours (H8:00-H9:30)
```

---

#### Issue #9: NFT Minting (Monad Integration)
**Labels:** `P1-high`, `phase-3-integration`, `component-nft`, `type-feature`
**Milestone:** Checkpoint 3
**Assignee:** Blockchain Dev

**Description:**
```markdown
## Objective
Mint commemorative NFT for each brand generated at Monad Blitz #18

## Tasks
- [ ] Deploy ERC-721 contract on Monad testnet
- [ ] Create NFT metadata structure
- [ ] Implement minting function
- [ ] Upload logo to IPFS for NFT image
- [ ] Add minting to generation pipeline
- [ ] Create NFT gallery view
- [ ] Add OpenSea link

## NFT Metadata
```json
{
  "name": "MACHUPS Genesis Brand #001",
  "description": "Generated at Monad Blitz SF #18",
  "image": "ipfs://...",
  "attributes": [
    { "trait_type": "Event", "value": "Monad Blitz #18" },
    { "trait_type": "Brand Name", "value": "BrewLy" },
    { "trait_type": "Generated", "value": "2025-12-07" },
    { "trait_type": "Generation Time", "value": "2m 47s" }
  ]
}
```

## Acceptance Criteria
- ✅ Contract deployed on Monad testnet
- ✅ NFT mints successfully
- ✅ Metadata stored on IPFS
- ✅ User receives NFT
- ✅ Viewable on OpenSea/explorer

## Time Budget
1 hour (H9:00-H10:00)
```

---

### PHASE 4: FINALIZATION (H10-H11)

#### Issue #10: Deployment & Testing
**Labels:** `P0-critical`, `phase-4-finalization`, `type-infra`
**Milestone:** Final Submission
**Assignee:** DevOps Lead

**Description:**
```markdown
## Objective
Deploy to production and ensure all systems operational

## Tasks
- [ ] Build production bundle (`npm run build`)
- [ ] Deploy to MACHUPS.com via Cloudflare Pages
- [ ] Set up environment variables in production
- [ ] Configure custom domain DNS
- [ ] Test all features in production:
  - [ ] Brand generation end-to-end
  - [ ] Logo download
  - [ ] PDF download
  - [ ] x402 payment
  - [ ] NFT minting
- [ ] Set up error monitoring (Sentry)
- [ ] Verify performance (<3 min generation time)

## Deployment Checklist
- [ ] Production build successful
- [ ] All env vars configured
- [ ] DNS pointing correctly
- [ ] SSL certificate active
- [ ] API endpoints responding
- [ ] Payments working
- [ ] NFT minting working

## Acceptance Criteria
- ✅ Live at MACHUPS.com
- ✅ All features functional
- ✅ Generation time < 3 minutes
- ✅ No critical bugs
- ✅ Mobile responsive

## Time Budget
45 minutes (H10:00-H10:45)
```

---

#### Issue #11: Demo Preparation
**Labels:** `P0-critical`, `phase-4-finalization`, `type-docs`
**Milestone:** Final Submission
**Assignee:** Demo Lead

**Description:**
```markdown
## Objective
Prepare compelling 3-5 minute demo for judging

## Tasks
- [ ] Create demo brand (prepare input)
- [ ] Record demo video (2-3 minutes)
- [ ] Prepare live demo backup plan
- [ ] Test demo flow 3+ times
- [ ] Prepare presentation talking points
- [ ] Create demo account with test funds
- [ ] Print QR code for easy access
- [ ] Prepare FAQ responses

## Demo Script (3 minutes)
**0:00-0:30** - Introduction & problem statement
**0:30-1:30** - Live generation (timer on screen)
**1:30-2:30** - Show deliverables (logos, PDF, components)
**2:30-3:00** - Premium features + NFT + wrap-up

## Demo Talking Points
- "From idea to brand in 3 minutes"
- "HTML/CSS logos = instant + perfect quality"
- "W3C compliant design tokens"
- "Production-ready code in your tech stack"
- "x402 micropayments for premium features"
- "NFT certificate on Monad"

## Acceptance Criteria
- ✅ Demo video recorded and uploaded
- ✅ Live demo tested successfully
- ✅ Backup plan ready
- ✅ Team confident in presentation
- ✅ Demo materials prepared

## Time Budget
45 minutes (H10:15-H11:00)
```

---

## STEP 5: CREATE PROJECT STRUCTURE

Create this initial file structure in the repository:

```
machlab/
├── .github/
│   ├── workflows/
│   │   └── deploy.yml          # CI/CD pipeline
│   └── ISSUE_TEMPLATE/
│       └── bug_report.md
├── src/
│   ├── app/
│   │   ├── page.tsx            # Homepage
│   │   ├── generate/
│   │   │   └── page.tsx
│   │   ├── preview/
│   │   │   └── [id]/page.tsx
│   │   └── api/
│   │       ├── generate/
│   │       │   └── route.ts
│   │       └── premium/
│   │           └── route.ts
│   ├── lib/
│   │   ├── generators/
│   │   │   ├── index.ts
│   │   │   ├── logos.ts
│   │   │   ├── tokens.ts
│   │   │   ├── components.ts
│   │   │   ├── guidelines.ts
│   │   │   └── pitchdeck.ts
│   │   ├── exporters/
│   │   │   ├── css.ts
│   │   │   ├── tailwind.ts
│   │   │   └── react.ts
│   │   ├── templates/
│   │   │   └── logo-templates.ts
│   │   └── utils/
│   │       ├── claude.ts
│   │       ├── html-to-image.ts
│   │       └── nft-minter.ts
│   └── components/
│       ├── InputForm.tsx
│       ├── ProgressBar.tsx
│       └── BrandPreview.tsx
├── scripts/
│   └── generate-guidelines.ts  # Existing script
├── public/
│   └── templates/
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

---

## STEP 6: CREATE README.md

Create a comprehensive README.md with:

```markdown
# MACHUPS - 3-Minute AI Brand Generator

Generate a complete professional brand in under 3 minutes using AI.

## Features

🎨 **Instant Logo Generation** - HTML/CSS-based logos (no waiting for AI image generation)
🎯 **Design Tokens** - W3C DTCG compliant tokens
💻 **Component Library** - Production-ready React/Next.js components  
📄 **Branding Guidelines** - Professional 20-page PDF
💎 **Premium Features** - Pitch decks via x402 micropayments
🎫 **NFT Certificate** - Commemorative token on Monad

## Quick Start

\`\`\`bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Add your API keys to .env.local

# Run development server
npm run dev

# Open http://localhost:3000
\`\`\`

## Environment Variables

\`\`\`
CLAUDE_API_KEY=sk-ant-xxx
THIRDWEB_SECRET_KEY=xxx
NEXT_PUBLIC_MONAD_RPC_URL=https://testnet-rpc.monad.xyz
\`\`\`

## Project Structure

See `/docs/ARCHITECTURE.md` for detailed architecture.

## Contributing

See `/docs/CONTRIBUTING.md` for contribution guidelines.

## License

MIT License - Built for Monad Blitz #18
```

---

## EXECUTION INSTRUCTIONS

Execute these commands in the repository:

1. **Set up the project board:**
```bash
# Claude Code: Use GitHub CLI to create project
gh project create --owner Fused-Gaming --title "Monad Blitz #18 - MACHUPS"
```

2. **Create all labels:**
```bash
# Claude Code: Create labels using GitHub CLI
gh label create "P0-critical" --color "d73a4a" --description "Must complete"
gh label create "P1-high" --color "ff9800" --description "Core MVP"
# ... (continue for all labels)
```

3. **Create milestones:**
```bash
# Claude Code: Create milestones
gh milestone create "Checkpoint 1: Foundation Complete"
# ... (continue for all milestones)
```

4. **Create all issues:**
```bash
# Claude Code: Create each issue with proper labels and milestone
gh issue create --title "Project Setup & Environment" --body "..." --label "P0-critical,phase-1-foundation"
# ... (continue for all issues)
```

5. **Set up file structure:**
```bash
# Claude Code: Create directory structure
mkdir -p src/{app,lib,components}
mkdir -p src/lib/{generators,exporters,templates,utils}
# ... (continue for all directories)
```

6. **Create initial files:**
```bash
# Claude Code: Create README, .env.example, etc.
touch README.md .env.example .gitignore
# ... (populate with content)
```

---

## PRIORITY SEQUENCE

Execute in this order:

1. ✅ Create labels (5 min)
2. ✅ Create milestones (2 min)
3. ✅ Create project board (3 min)
4. ✅ Create all issues (15 min)
5. ✅ Link issues to project board (5 min)
6. ✅ Create file structure (5 min)
7. ✅ Create README and docs (10 min)
8. ✅ Commit and push everything (5 min)

**Total Time: ~50 minutes**

---

## SUCCESS CRITERIA

After running this prompt, you should have:

✅ GitHub Project board with 6 columns
✅ 11 detailed issues created
✅ 4 milestones set up
✅ All labels created
✅ Complete file structure
✅ README.md with instructions
✅ Ready to start coding

---

**NOTE:** Claude Code should execute all GitHub CLI commands, create files, and commit everything automatically. Review the output and make any necessary adjustments.
```

---

## ADDITIONAL NOTES FOR CLAUDE CODE

- Use GitHub CLI (`gh`) for all GitHub operations
- Create issues in dependency order (foundation → core → integration → finalization)
- Set proper labels on each issue
- Assign issues to milestones
- Link issues to project board automatically
- Commit all file structure changes
- Verify all commands executed successfully

**This prompt should be pasted directly into Claude Code and will automatically set up your entire project planning infrastructure.** 🚀