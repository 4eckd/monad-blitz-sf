# Modal.com Integration Plan for MACHUPS
**Created:** December 6, 2025
**Purpose:** Accelerate brand generation using Modal's serverless GPU infrastructure

---

## 🎯 Executive Summary

**Goal:** Integrate Modal.com to parallelize and accelerate the brand generation pipeline, reducing generation time from 3 minutes to under 60 seconds.

**Key Benefits:**
- ⚡ **Parallel Processing** - Run logo generation, token creation, and component generation simultaneously
- 🖼️ **High-Quality Images** - Use GPU acceleration for logo rendering and mockup generation
- 🚀 **Infinite Scale** - Spin up as many instances as needed during hackathon
- 💰 **Cost-Effective** - Prepaid balance, pay-per-second billing
- 🐳 **Coder Containers** - Development containers for orchestrating multiple agents

---

## 📋 Modal.com Architecture

### Current Sequential Pipeline (180 seconds)
```
Brand Analysis (30s)
  → Logos (45s)
  → Tokens (15s)
  → Components (60s)
  → Mockups (30s)
  → Deploy (20s)
  → NFT (10s)
= 210 seconds total
```

### Proposed Parallel Pipeline with Modal (45 seconds)
```
Brand Analysis (30s)
  ↓
  ├─→ [Modal] Logo Generation (15s) ────┐
  ├─→ [Modal] Token Generation (5s) ────┤
  ├─→ [Modal] Component Generation (20s) ├─→ Combine → Deploy (10s) → NFT (5s)
  └─→ [Modal] Mockup Generation (15s) ───┘

= 60 seconds total (3.5x faster!)
```

---

## 🏗️ Implementation Plan

### Phase 1: Modal Setup (30 minutes)

**1.1 Install Modal SDK**
```bash
pip install modal
```

**1.2 Create Modal Configuration**
```python
# modal_config.py
import modal

# Create Modal app
app = modal.App("machups-brand-generation")

# GPU-accelerated image for logo rendering
image = modal.Image.debian_slim(python_version="3.11").pip_install(
    "anthropic",
    "pillow",
    "cairosvg",
    "html2image",
    "playwright"
)

# GPU image for high-quality rendering
gpu_image = image.apt_install("chromium").run_commands(
    "playwright install chromium"
)
```

**1.3 Authentication**
```bash
modal token new
# Set up prepaid balance in Modal dashboard
```

---

### Phase 2: Modal Functions (2 hours)

**2.1 Logo Generation Function**
```python
# lib/modal_functions/logo_generator.py
import modal
from modal_config import app, gpu_image

@app.function(
    image=gpu_image,
    gpu="T4",  # GPU acceleration for rendering
    timeout=300,
    secrets=[modal.Secret.from_name("anthropic-api-key")]
)
async def generate_logos_parallel(brand_analysis: dict) -> list:
    """
    Generate 3 logo variants in parallel using GPU acceleration

    Returns:
      [
        { type: 'wordmark', png: bytes, svg: str },
        { type: 'combination', png: bytes, svg: str },
        { type: 'badge', png: bytes, svg: str }
      ]
    """
    from playwright.async_api import async_playwright
    import asyncio

    async def generate_logo(logo_type: str):
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()

            # Generate HTML/CSS logo
            html = create_logo_html(brand_analysis, logo_type)
            await page.set_content(html)

            # High-quality screenshot
            png_bytes = await page.screenshot(
                full_page=True,
                type='png',
                omit_background=True,
                scale='device'  # Retina quality
            )

            # Export SVG
            svg_content = await page.content()

            await browser.close()

            return {
                'type': logo_type,
                'png': png_bytes,
                'svg': svg_content
            }

    # Generate all 3 logos in parallel
    logos = await asyncio.gather(
        generate_logo('wordmark'),
        generate_logo('combination'),
        generate_logo('badge')
    )

    return logos
```

**2.2 Token Generation Function**
```python
@app.function(
    image=image,
    timeout=60,
    secrets=[modal.Secret.from_name("anthropic-api-key")]
)
def generate_design_tokens(brand_analysis: dict) -> dict:
    """
    Generate W3C DTCG design tokens

    Returns: W3C DTCG compliant JSON
    """
    return {
        "$schema": "https://design-tokens.org/schema/version/1.0.0",
        "color": {
            "brand": {
                "primary": {
                    "$value": brand_analysis['colors']['primary'],
                    "$type": "color"
                },
                # ... rest of tokens
            }
        }
    }
```

**2.3 Component Generation Function**
```python
@app.function(
    image=image,
    timeout=120,
    secrets=[modal.Secret.from_name("anthropic-api-key")]
)
async def generate_components_parallel(design_tokens: dict, tech_stack: str) -> list:
    """
    Generate React components in parallel

    Returns: List of component objects with code
    """
    from anthropic import Anthropic
    import asyncio

    client = Anthropic()

    component_types = ['Button', 'Input', 'Card', 'Header', 'Footer']

    async def generate_component(component_name: str):
        prompt = f"""Generate a production-ready React {component_name} component using these design tokens:

{json.dumps(design_tokens, indent=2)}

Tech stack: {tech_stack}

Requirements:
- TypeScript
- Tailwind CSS utility classes
- Proper props interface
- Accessibility (ARIA labels)
- Responsive design
"""

        response = client.messages.create(
            model="claude-sonnet-4-5-20250929",
            max_tokens=2048,
            messages=[{"role": "user", "content": prompt}]
        )

        return {
            'name': component_name,
            'code': response.content[0].text,
            'filename': f"{component_name}.tsx"
        }

    # Generate all components in parallel
    components = await asyncio.gather(*[
        generate_component(name) for name in component_types
    ])

    return components
```

**2.4 Mockup Generation Function**
```python
@app.function(
    image=gpu_image,
    gpu="T4",
    timeout=300,
    secrets=[modal.Secret.from_name("penpot-api-key")]
)
async def generate_mockups_parallel(brand_id: str, brand_analysis: dict, tokens: dict):
    """
    Generate Penpot mockups using GPU acceleration
    """
    from lib.mcp.penpot_client import createPenpotClient

    client = await createPenpotClient({
        'serverUrl': os.environ['PENPOT_SERVER_URL'],
        'apiKey': os.environ['PENPOT_API_KEY']
    })

    # Create design file
    file = await client.createDesignFile(
        f"{brand_analysis['brandName']} - Brand System",
        brand_analysis
    )

    # Generate mockups from templates
    templates = await client.listTemplates()
    frames = await client.generateMockups(file.id, tokens, templates[:5])

    return {
        'penpotFileId': file.id,
        'penpotFileUrl': file.url,
        'frames': frames
    }
```

---

### Phase 3: Orchestrator Integration (1 hour)

**3.1 Update Brand Orchestrator**
```typescript
// lib/orchestrator/brand-orchestrator-modal.ts
import * as modal from '@modal-labs/modal-client';

export class ModalBrandOrchestrator extends BrandOrchestrator {
  private modalClient: modal.Client;

  async generateBrand(input: BrandGenerationInput): Promise<BrandGenerationOutput> {
    this.startTime = Date.now();
    const brandId = this.generateBrandId();

    try {
      // Phase 1: Brand Analysis (Claude AI) - Sequential
      this.emitProgress('analyzing', 5, 'Analyzing business idea with Claude AI...');
      const brandAnalysis = await this.analyzeBrand(input);

      // Phase 2-5: PARALLEL EXECUTION via Modal
      this.emitProgress('generating', 20, 'Generating all assets in parallel...');

      const [logos, designTokens, components, mockups] = await Promise.all([
        this.modalClient.call('generate_logos_parallel', brandAnalysis),
        this.modalClient.call('generate_design_tokens', brandAnalysis),
        this.modalClient.call('generate_components_parallel', brandAnalysis),
        this.modalClient.call('generate_mockups_parallel', brandId, brandAnalysis)
      ]);

      // Phase 6: Deploy (Sequential)
      this.emitProgress('deploying', 85, 'Deploying preview site...');
      const { previewUrl, downloadUrl } = await this.deployPreview(
        brandId,
        brandAnalysis,
        logos,
        designTokens,
        components
      );

      // Phase 7: NFT Minting (Optional)
      let nftTokenId, nftMetadataUri;
      if (this.config.enableNFTMinting && input.walletAddress) {
        this.emitProgress('minting', 95, 'Minting NFT certificate...');
        const nft = await this.mintNFTCertificate(brandId, brandAnalysis, input.walletAddress);
        nftTokenId = nft.tokenId;
        nftMetadataUri = nft.metadataUri;
      }

      const generationTime = Math.round((Date.now() - this.startTime) / 1000);
      this.emitProgress('complete', 100, `Brand generated in ${generationTime}s!`);

      return {
        brandId,
        brandAnalysis,
        designTokens,
        logos,
        components,
        mockups,
        previewUrl,
        downloadUrl,
        nftTokenId,
        nftMetadataUri,
        generationTime
      };
    } catch (error) {
      this.emit('error', error);
      throw error;
    }
  }
}
```

---

### Phase 4: Coder Container Orchestration (1.5 hours)

**4.1 Coder Development Container**
```dockerfile
# .devcontainer/Dockerfile
FROM codercom/code-server:latest

# Install dependencies
RUN sudo apt-get update && sudo apt-get install -y \
    python3.11 \
    python3-pip \
    nodejs \
    npm \
    git

# Install Modal CLI
RUN pip install modal

# Install pnpm
RUN npm install -g pnpm

# Setup workspace
WORKDIR /workspace

# Copy project
COPY . /workspace

# Install dependencies
RUN pnpm install

# Authenticate Modal (will use token from secrets)
RUN modal token set --token-id $MODAL_TOKEN_ID --token-secret $MODAL_TOKEN_SECRET
```

**4.2 Coder Configuration**
```yaml
# .devcontainer/devcontainer.json
{
  "name": "MACHUPS Development",
  "build": {
    "dockerfile": "Dockerfile"
  },
  "features": {
    "ghcr.io/devcontainers/features/node:1": {
      "version": "18"
    },
    "ghcr.io/devcontainers/features/python:1": {
      "version": "3.11"
    }
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "ms-python.python",
        "Modal.modal-vscode"
      ]
    }
  },
  "forwardPorts": [3000, 8000],
  "postCreateCommand": "pnpm install && modal token set",
  "remoteUser": "coder"
}
```

**4.3 Multi-Agent Orchestration**
```python
# scripts/orchestrate_agents.py
"""
Orchestrate multiple agents using Coder containers and Modal
"""
import modal
from modal_config import app

@app.function(
    image=image,
    cpu=4,
    memory=8192,
    timeout=3600
)
def orchestrate_speedrun(
    brand_count: int = 10,
    parallel_instances: int = 5
):
    """
    Orchestrate multiple brand generations in parallel

    Args:
      brand_count: Total number of brands to generate
      parallel_instances: Number of parallel generations

    Returns:
      List of generation results
    """
    import asyncio
    from itertools import islice

    async def generate_batch(brands):
        tasks = [
            generate_brand_modal.remote(brand)
            for brand in brands
        ]
        return await asyncio.gather(*tasks)

    # Split into batches
    def batched(iterable, n):
        it = iter(iterable)
        while batch := list(islice(it, n)):
            yield batch

    # Mock brand inputs (replace with actual data)
    brand_inputs = [
        {
            'businessIdea': f'Brand {i}',
            'targetAudience': 'developers',
            'style': 'modern'
        }
        for i in range(brand_count)
    ]

    results = []
    for batch in batched(brand_inputs, parallel_instances):
        batch_results = asyncio.run(generate_batch(batch))
        results.extend(batch_results)
        print(f"Completed batch: {len(results)}/{brand_count}")

    return results

@app.function(image=gpu_image, gpu="T4")
async def generate_brand_modal(brand_input: dict):
    """Single brand generation via Modal"""
    from lib.orchestrator.brand_orchestrator_modal import ModalBrandOrchestrator

    orchestrator = ModalBrandOrchestrator({
        'claudeApiKey': os.environ['CLAUDE_API_KEY'],
        'penpotServerUrl': os.environ['PENPOT_SERVER_URL'],
        'enablePenpotMockups': True,
        'enableNFTMinting': False  # Disable for speedrun
    })

    return await orchestrator.generateBrand(brand_input)

# CLI entry point
if __name__ == "__main__":
    import sys
    brand_count = int(sys.argv[1]) if len(sys.argv) > 1 else 10
    parallel = int(sys.argv[2]) if len(sys.argv) > 2 else 5

    with app.run():
        results = orchestrate_speedrun.remote(brand_count, parallel)
        print(f"Generated {len(results)} brands!")
```

---

## 💰 Cost Analysis

### Modal Pricing (Prepaid Balance)
- **CPU Functions:** $0.000040/second
- **GPU Functions (T4):** $0.000150/second
- **Storage:** $0.15/GB-month

### Estimated Costs for Hackathon
- **Single Brand Generation:** ~$0.05
- **100 Brands:** ~$5
- **1000 Brands (speedrun):** ~$50

**Recommendation:** Prepaid balance of **$100** for safety margin

---

## 🚀 Deployment Strategy

### Option 1: Hybrid (Recommended for Hackathon)
- **Development:** Local + Coder containers
- **Production:** Modal for heavy lifting (logos, mockups)
- **Simple ops:** Keep on Next.js/Vercel

### Option 2: Full Modal
- **All functions** run on Modal
- Next.js becomes thin API layer
- Maximum speed, higher complexity

---

## 📝 Implementation Timeline

| Phase | Task | Duration | Priority |
|-------|------|----------|----------|
| 1 | Modal setup & auth | 30 min | P0 |
| 2 | Logo generation function | 1 hour | P0 |
| 3 | Token generation function | 30 min | P0 |
| 4 | Component generation function | 1 hour | P0 |
| 5 | Mockup generation function | 1 hour | P1 |
| 6 | Orchestrator integration | 1 hour | P0 |
| 7 | Coder container setup | 1 hour | P1 |
| 8 | Multi-agent orchestration | 1 hour | P1 |
| 9 | Testing & optimization | 1 hour | P0 |

**Total Time:** 6-8 hours
**Can run parallel with Phase 2 development**

---

## ✅ Success Criteria

- [ ] Modal functions deployed and accessible
- [ ] Parallel brand generation working
- [ ] Generation time reduced to <60 seconds
- [ ] High-quality logo images (Retina/4K)
- [ ] Coder containers can spawn agents
- [ ] Cost per generation <$0.10
- [ ] Can handle 10+ parallel generations
- [ ] Error handling and retries working

---

## 🎯 Next Steps

1. **Immediate:** Set up Modal account and prepaid balance ($100)
2. **Quick Win:** Implement logo generation function (biggest bottleneck)
3. **Parallel:** Work on orchestrator integration while building other functions
4. **Test:** Run speedrun with 10 brands to validate performance
5. **Optimize:** Profile and optimize expensive functions

---

**Generated for:** MACHUPS - Monad Blitz SF #18
**Integration Type:** Performance Optimization Layer
**Expected Impact:** 3.5x speed improvement (180s → 50s)
