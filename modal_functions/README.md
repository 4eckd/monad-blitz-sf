# Modal Serverless Functions

This directory contains Modal serverless functions for MACHUPS brand generation.

## What is Modal?

[Modal](https://modal.com) is a serverless compute platform optimized for AI/ML workloads. It provides:

- **On-demand GPU/CPU**: Spin up compute only when needed
- **Automatic scaling**: From 0 to 1000s of containers
- **Fast cold starts**: Sub-second container initialization
- **Simple Python API**: Deploy functions with a decorator

## Directory Structure

```
modal_functions/
├── __init__.py
├── README.md
├── brand_generation/
│   ├── __init__.py
│   ├── analyzer.py          # Claude AI brand analysis
│   ├── logo_generator.py    # Logo generation (GPU)
│   ├── image_generation.py  # DALL-E/Stable Diffusion (GPU)
│   └── component_generator.py
├── utils/
│   ├── __init__.py
│   ├── modal_config.py      # Shared Modal configuration
│   └── secrets.py           # Secret management
└── examples/
    ├── hello_modal.py       # Simple example
    └── gpu_example.py       # GPU acceleration example
```

## Setup

### 1. Install Modal

```bash
# Using venv (recommended)
.venv/Scripts/python -m pip install modal

# Or globally
pip install modal
```

### 2. Authenticate

```bash
# Using the token from modal.toml
modal token set --token-id ak-qctAMMxbcgn757mLZhMKIR \
  --token-secret as-8YrukEonRhAkQ49d7nZ8MY \
  --profile=fused-gaming

# Or authenticate interactively
modal token new
```

### 3. Verify Setup

```bash
modal --version
# modal client version: 1.2.4
```

## Usage

### Deploy a Function

```bash
# Deploy brand analyzer
modal deploy modal_functions/brand_generation/analyzer.py

# Deploy all functions
modal deploy modal_functions
```

### Run Functions Locally

```bash
# Run function locally (for development)
modal run modal_functions/brand_generation/analyzer.py::analyze_brand --input "Coffee delivery app"
```

### Call from Next.js

```typescript
// app/api/modal/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { businessIdea } = await request.json();

  // Call Modal function via webhook
  const response = await fetch('https://your-modal-app.modal.run/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ businessIdea })
  });

  const result = await response.json();
  return NextResponse.json(result);
}
```

## Configuration

### Environment Variables

Modal functions access secrets via Modal's secret management:

```python
import modal

stub = modal.Stub("machups")

@stub.function(
    secrets=[
        modal.Secret.from_name("claude-api-key"),
        modal.Secret.from_name("openai-api-key")
    ]
)
def generate_brand(input_data):
    import os
    claude_key = os.environ["ANTHROPIC_API_KEY"]
    # Use key
```

### Create Secrets in Modal

```bash
# Create secrets in Modal dashboard or CLI
modal secret create claude-api-key ANTHROPIC_API_KEY=sk-ant-xxx
modal secret create openai-api-key OPENAI_API_KEY=sk-xxx
```

## Example Functions

### Simple Function

```python
import modal

stub = modal.Stub("hello-machups")

@stub.function()
def greet(name: str) -> str:
    return f"Hello {name} from Modal!"

@stub.local_entrypoint()
def main():
    result = greet.remote("MACHUPS")
    print(result)
```

Run: `modal run modal_functions/examples/hello_modal.py`

### GPU Accelerated Function

```python
import modal

stub = modal.Stub("machups-gpu")

# Define image with dependencies
image = modal.Image.debian_slim().pip_install(
    "torch",
    "diffusers",
    "transformers"
)

@stub.function(
    image=image,
    gpu="A10G",  # GPU type
    timeout=300
)
def generate_logo_gpu(prompt: str):
    from diffusers import StableDiffusionPipeline
    import torch

    pipe = StableDiffusionPipeline.from_pretrained(
        "runwayml/stable-diffusion-v1-5",
        torch_dtype=torch.float16
    )
    pipe = pipe.to("cuda")

    image = pipe(prompt).images[0]
    return image
```

## Best Practices

### 1. Use Containers for Dependencies

```python
# Define custom container image
image = (
    modal.Image.debian_slim()
    .pip_install("anthropic", "openai", "pillow")
    .run_commands("apt-get update && apt-get install -y ffmpeg")
)

@stub.function(image=image)
def my_function():
    # Dependencies are available
    pass
```

### 2. Manage Secrets Securely

```python
# ❌ Don't hardcode secrets
API_KEY = "sk-ant-xxx"

# ✅ Use Modal secrets
@stub.function(secrets=[modal.Secret.from_name("api-keys")])
def secure_function():
    import os
    key = os.environ["API_KEY"]
```

### 3. Optimize for Cold Starts

```python
# ❌ Heavy imports in function body
@stub.function()
def slow_function():
    import torch  # Slow on every call
    # ...

# ✅ Import at module level
import torch

@stub.function()
def fast_function():
    # torch already imported
    # ...
```

### 4. Use Volumes for Caching

```python
# Create persistent volume
volume = modal.Volume.from_name("model-cache", create_if_missing=True)

@stub.function(
    volumes={"/cache": volume},
    image=image
)
def cached_function():
    # Models cached in /cache persist between runs
    pass
```

## Performance

### Cold Start Times

- **CPU functions**: <1 second
- **GPU functions**: 3-10 seconds (model loading)
- **With volumes**: Faster (cached models)

### Cost Optimization

- **Use CPU for simple tasks**: Cheaper than GPU
- **Batch requests**: Process multiple items together
- **Use volumes**: Cache models to avoid re-downloading
- **Set timeouts**: Prevent runaway costs

## Integration with MACHUPS

### Brand Analyzer (CPU)

```python
# modal_functions/brand_generation/analyzer.py
import modal
import anthropic

stub = modal.Stub("machups-analyzer")

@stub.function(
    secrets=[modal.Secret.from_name("claude-api-key")],
    cpu=2.0,
    memory=4096
)
def analyze_brand(business_idea: str, target_audience: str, style: str):
    import os
    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    response = client.messages.create(
        model="claude-sonnet-4-5-20250929",
        max_tokens=4096,
        messages=[{
            "role": "user",
            "content": f"Analyze this brand: {business_idea}"
        }]
    )

    return response.content[0].text
```

### Logo Generator (GPU)

```python
# modal_functions/brand_generation/logo_generator.py
import modal

stub = modal.Stub("machups-logos")

image = modal.Image.debian_slim().pip_install(
    "diffusers",
    "torch",
    "pillow"
)

@stub.function(
    image=image,
    gpu="T4",  # Cheaper GPU for logo generation
    timeout=180
)
def generate_logo_ai(prompt: str, style: str):
    from diffusers import StableDiffusionPipeline
    import torch

    pipe = StableDiffusionPipeline.from_pretrained(
        "runwayml/stable-diffusion-v1-5",
        torch_dtype=torch.float16
    )
    pipe = pipe.to("cuda")

    full_prompt = f"professional logo design, {prompt}, {style} style, vector art, clean, minimalist"

    image = pipe(full_prompt, num_inference_steps=30).images[0]
    return image
```

## Monitoring

### View Logs

```bash
# View function logs
modal logs machups-analyzer

# Tail logs in real-time
modal logs --follow machups-analyzer
```

### Check Status

```bash
# List deployed apps
modal app list

# Check app details
modal app describe machups-analyzer
```

## Troubleshooting

### Issue: Function Times Out

```python
# Increase timeout
@stub.function(timeout=600)  # 10 minutes
def long_running_function():
    pass
```

### Issue: Out of Memory

```python
# Increase memory
@stub.function(memory=8192)  # 8GB
def memory_intensive_function():
    pass
```

### Issue: Cold Starts Too Slow

```python
# Keep functions warm
@stub.function(keep_warm=1)  # Keep 1 container always running
def frequently_called_function():
    pass
```

## Resources

- **Documentation**: https://modal.com/docs
- **Examples**: https://modal.com/docs/examples
- **Pricing**: https://modal.com/pricing
- **Community**: https://discord.gg/modal

---

**Ready to deploy serverless AI functions! 🚀**
