# MACHUPS Quick Start Guide

Get up and running with MACHUPS in 5 minutes.

## Prerequisites

- Node.js 18+
- pnpm (run `npm install -g pnpm` if you don't have it)
- Git

## 1. Clone & Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/4eckd/monad-blitz-sf.git
cd machlab

# Install dependencies
pnpm install
```

## 2. Set Up Environment Variables (2 minutes)

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your API keys
```

**Required for basic functionality:**
```bash
ANTHROPIC_API_KEY=sk-ant-xxxxx    # Get from console.anthropic.com
```

**Optional (but recommended):**
```bash
OPENAI_API_KEY=sk-xxxxx           # For DALL-E logo generation
PENPOT_ACCESS_TOKEN=xxxxx         # For design file export
THIRDWEB_SECRET_KEY=xxxxx         # For NFT minting
```

## 3. Run the Development Server (1 minute)

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 4. Generate Your First Brand

1. Fill in the form:
   - **Business Idea:** "Sustainable coffee delivery"
   - **Target Audience:** "Urban professionals"
   - **Style:** "Modern, eco-friendly"

2. Click **"Generate Brand"**

3. Wait 2-3 minutes

4. Download your brand package!

## What You'll Get

After generation completes, you'll receive:

- ✅ **3 Logo Variations** (PNG + SVG)
- ✅ **Color Palette** (12-15 colors)
- ✅ **Typography System** (font pairings)
- ✅ **Design Tokens** (JSON, CSS, Tailwind)
- ✅ **React Components** (7+ components)
- ✅ **Documentation Site** (live URL)
- ✅ **Brand Guidelines** (PDF)
- ✅ **NFT Certificate** (Monad testnet)

## Next Steps

### Customize Your Experience

Edit the generation prompts in `prompts/brand-generation.md` to adjust outputs.

### Add More Features

```bash
# Generate a specific component
pnpm generate-component Button

# Convert tokens to different format
pnpm convert-tokens --format=scss

# Optimize generated logos
pnpm optimize-logos
```

### Deploy to Production

```bash
# Build for production
pnpm build

# Deploy to Cloudflare Pages
pnpm deploy
```

## Troubleshooting

### "API Key Invalid" Error

Double-check your `.env.local` file. Make sure:
- No spaces around the `=` sign
- API key is wrapped in quotes if it contains special characters
- File is named `.env.local` (not `.env.local.txt`)

### Generation Takes Too Long

- Check your internet connection
- Verify API rate limits aren't exceeded
- Try with a simpler business idea first

### Logos Not Generating

If you don't have DALL-E/SD API keys, the system will:
- Use SVG text-based logos as fallback
- Still generate all other brand assets

### Need Help?

- [Full Documentation](README.md)
- [GitHub Issues](https://github.com/4eckd/monad-blitz-sf/issues)
- [Security Policy](SECURITY.md)

## Tips for Best Results

**Good Inputs:**
- ✅ "Sustainable coffee delivery for busy professionals"
- ✅ "AI-powered fitness app for seniors"
- ✅ "Eco-friendly fashion marketplace"

**Avoid:**
- ❌ Just "coffee" (too vague)
- ❌ "The best app ever" (not specific)
- ❌ Extremely long descriptions (>100 words)

**Style Preferences:**
- Modern, Minimalist, Bold, Playful, Professional
- Combine with industry terms: "Modern healthcare", "Playful education"

---

**Ready to build your brand? Let's go! 🚀**

Run `pnpm dev` and visit [http://localhost:3000](http://localhost:3000)
