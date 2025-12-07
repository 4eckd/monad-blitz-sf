# Modal.com Deployment Guide for MACHUPS

Complete guide to deploying MACHUPS brand generation on Modal.com

## Overview

Modal.com provides serverless GPU/CPU compute for AI workloads. We use it for:

- **GPU-accelerated logo generation** (Stable Diffusion)
- **GPU-accelerated brand imagery** (AI-generated mockups)
- **CPU-based mockup rendering** (Playwright for screenshots)
- **Parallel brand generation** (20+ brands simultaneously)

## Prerequisites

1. **Modal.com Account**
   - Sign up at https://modal.com
   - Get $30 free credits (enough for 300+ brands)

2. **API Keys**
   - Claude API key (for brand analysis)
   - OpenAI API key (optional, for DALL-E)

3. **Python Environment**
   ```bash
   pip install modal
   ```

## Quick Start

### 1. Authenticate with Modal

```bash
# Option A: Interactive (recommended)
modal token new

# Option B: Using pre-configured token
modal token set \
  --token-id ak-qctAMMxbcgn757mLZhMKIR \
  --token-secret as-8YrukEonRhAkQ49d7nZ8MY
```

### 2. Create Modal Secrets

Go to https://modal.com/settings/secrets and create:

**Secret: `claude-api-key`**
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

**Secret: `openai-api-key`** (optional)
```
OPENAI_API_KEY=sk-your-key-here
```

### 3. Deploy Modal Functions

```bash
cd /home/user/monad-blitz-sf

# Deploy all functions
modal deploy modal_functions/brand_generation/analyzer.py
modal deploy modal_functions/brand_generation/logo_generator.py
modal deploy modal_functions/brand_generation/image_generation.py
modal deploy modal_functions/brand_generation/orchestrator.py
```

### 4. Test Brand Generation

```bash
# Generate GONADS brand
modal run modal_functions/brand_generation/orchestrator.py
```

## Running from Modal Notebook

If you're using Modal's notebook interface:

### Cell 1: Setup

```python
import modal

# Authenticate (if needed)
!modal token new
```

### Cell 2: Deploy Functions

```python
# Deploy all Modal functions
!modal deploy modal_functions/brand_generation/analyzer.py
!modal deploy modal_functions/brand_generation/logo_generator.py
!modal deploy modal_functions/brand_generation/image_generation.py
!modal deploy modal_functions/brand_generation/orchestrator.py
```

### Cell 3: Generate GONADS Brand

```python
from modal_functions.brand_generation.orchestrator import generate_brand_package

# Generate brand
result = generate_brand_package.remote(
    business_idea="""Memecoin that embodies memecoin culture with
    colorfully and thoughtfully morbid references. Web3 NFT idea.""",
    target_audience="""Web3 enthusiasts, memecoin investors,
    NFT collectors who appreciate humor""",
    style="bold",
    industry="Web3 / Cryptocurrency",
    include_ai_logos=False,
    include_ai_imagery=False,
    subdomain="gonads"
)

print(f"✅ Generated: {result['brand_name']}")
print(f"   Time: {result['metadata']['generation_time']:.1f}s")
print(f"   Subdomain: {result['subdomain']}.machups.com")
```

### Cell 4: View Results

```python
import json

# Print brand analysis
print("Brand Analysis:")
print(json.dumps(result['brand_analysis'], indent=2))

# Print design tokens
print("\nDesign Tokens:")
print(json.dumps(result['design_tokens'], indent=2))

# List generated mockups
print("\nMockups:")
for mockup in result['mockups'].keys():
    print(f"  ✅ {mockup}")
```

### Cell 5: Save Assets

```python
import base64
from pathlib import Path

# Create output directory
output_dir = Path("brands/gonads")
output_dir.mkdir(parents=True, exist_ok=True)

# Save mockups as PNG files
for mockup_name, mockup_b64 in result['mockups'].items():
    if isinstance(mockup_b64, str):
        img_data = base64.b64decode(mockup_b64)
        with open(output_dir / f"{mockup_name}.png", "wb") as f:
            f.write(img_data)
        print(f"Saved: {mockup_name}.png")

# Save design tokens
with open(output_dir / "design-tokens.json", "w") as f:
    json.dump(result['design_tokens'], f, indent=2)

print(f"\n✅ Assets saved to {output_dir}/")
```

## Using Modal Shell

Connect to Modal shell for interactive development:

```bash
# Start Modal shell
modal shell

# Or connect to specific app
modal shell <app-id>
```

Example app ID: `ta-01KBV1VXH1YX3P952FTRR05RE4`

Inside the shell:

```python
# Import functions
from modal_functions.brand_generation.orchestrator import generate_brand_package

# Generate brand
result = generate_brand_package.remote(
    business_idea="Your business idea",
    target_audience="Your target audience",
    style="modern",
    subdomain="yourbrand"
)

print(result['brand_name'])
```

## Curl Command for Modal API

Once deployed, you can call Modal functions via REST API:

```bash
# Get your Modal app URL from dashboard
MODAL_URL="https://your-app.modal.run"

# Generate brand via curl
curl -X POST $MODAL_URL/generate_brand_package \
  -H "Content-Type: application/json" \
  -d '{
    "business_idea": "Memecoin with morbid humor",
    "target_audience": "Web3 enthusiasts",
    "style": "bold",
    "industry": "Cryptocurrency",
    "subdomain": "gonads"
  }'
```

## Performance & Cost

### Generation Times

**CPU-only (HTML/CSS logos):**
- Brand analysis: 30-45s
- Logo generation: 5-10s
- Mockup generation: 30-45s
- **Total: ~60-90s**

**With AI logos (GPU):**
- Brand analysis: 30-45s
- AI logo generation: 45-60s (T4 GPU)
- Mockup generation: 30-45s
- **Total: ~120-150s**

**With AI imagery (GPU):**
- Brand analysis: 30-45s
- AI logos: 45-60s
- AI imagery: 60-90s (T4 GPU)
- Mockup generation: 30-45s
- **Total: ~180-240s**

### Cost Estimates

**CPU-only (recommended):**
- CPU compute: $0.00004/s × 90s = $0.0036
- Storage: ~$0.0001
- **Total: ~$0.004 per brand**

**With GPU (T4):**
- CPU compute: $0.00004/s × 60s = $0.0024
- GPU compute: $0.00015/s × 120s = $0.018
- Storage: ~$0.0001
- **Total: ~$0.02 per brand**

**Modal Free Tier: $30 credits**
- CPU-only: ~7,500 brands
- With GPU: ~1,500 brands

## Monitoring

### View Logs

```bash
# Real-time logs
modal logs --follow machups-orchestrator

# Historical logs
modal logs machups-orchestrator --since 1h
```

### Dashboard

Monitor at: https://modal.com/apps

- View function calls
- Check GPU usage
- Monitor costs
- View errors/logs

## Troubleshooting

### Issue: Authentication Failed

```bash
# Re-authenticate
modal token new

# Or use environment variable
export MODAL_TOKEN_ID=your-token-id
export MODAL_TOKEN_SECRET=your-token-secret
modal token set --token-id $MODAL_TOKEN_ID --token-secret $MODAL_TOKEN_SECRET
```

### Issue: Secret Not Found

1. Go to https://modal.com/settings/secrets
2. Create `claude-api-key` secret
3. Add `ANTHROPIC_API_KEY` environment variable
4. Redeploy functions

### Issue: GPU Out of Memory

Reduce image resolution or batch size:

```python
# In image_generation.py, reduce:
width=512,  # Instead of 1024
height=512  # Instead of 1024
```

### Issue: Function Timeout

Increase timeout in function decorator:

```python
@stub.function(
    timeout=1800  # 30 minutes instead of default 10
)
```

## Advanced Usage

### Parallel Brand Generation

Generate 10 brands in parallel:

```python
import asyncio
from modal_functions.brand_generation.orchestrator import generate_brand_package

brands = [
    {"idea": f"Brand {i}", "audience": "Target", "style": "modern"}
    for i in range(10)
]

async def generate_all():
    results = await asyncio.gather(*[
        generate_brand_package.remote.aio(
            business_idea=b["idea"],
            target_audience=b["audience"],
            style=b["style"]
        )
        for b in brands
    ])
    return results

results = asyncio.run(generate_all())
print(f"Generated {len(results)} brands in parallel!")
```

### Custom GPU Configuration

Use different GPUs for different workloads:

```python
# T4 - Cheapest, good for inference
@stub.function(gpu="T4")

# A10G - Faster, more memory
@stub.function(gpu="A10G")

# A100 - Fastest, most expensive
@stub.function(gpu="A100")
```

### Volume Caching

Cache models for faster cold starts:

```python
model_cache = modal.Volume.from_name("models", create_if_missing=True)

@stub.function(
    volumes={"/cache": model_cache}
)
def cached_function():
    # Models downloaded to /cache persist between runs
    pass
```

## Next Steps

1. **Deploy to production:**
   ```bash
   modal deploy modal_functions/brand_generation/
   ```

2. **Integrate with Next.js:**
   - Get Modal app URL from dashboard
   - Call from `/app/api/generate/route.ts`

3. **Set up webhooks:**
   - Configure Modal webhook endpoints
   - Handle callbacks in your app

4. **Monitor costs:**
   - Check dashboard daily
   - Set up billing alerts
   - Optimize expensive operations

---

**Need Help?**
- Modal Docs: https://modal.com/docs
- Modal Discord: https://discord.gg/modal
- MACHUPS Issues: https://github.com/4eckd/monad-blitz-sf/issues
