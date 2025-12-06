# Modal Development Environment Setup

**Date:** December 6, 2025
**Project:** MACHUPS - Monad Blitz SF #18
**Status:** In Progress

---

## ✅ Setup Progress

### Completed Steps

1. **✅ Modal CLI Installation**
   - Installed Modal version 1.2.4
   - Command: `pip3 install modal`
   - Location: System Python 3.11.14

2. **✅ Modal Configuration Files Created**
   - Config directory: `~/.modal/`
   - Config file: `~/.modal/config.toml`
   - Contains token credentials for `fused-gaming` profile

3. **✅ Modal Functions Implemented**
   - Brand Analyzer: `modal_functions/brand_generation/analyzer.py`
   - Logo Generator: `modal_functions/brand_generation/logo_generator.py`
   - Shared Config: `modal_functions/utils/modal_config.py`
   - Examples: `modal_functions/examples/hello_modal.py`

---

## 🔧 Current Status

### Authentication Issue

The Modal CLI is experiencing network connectivity issues with Modal servers. This is likely due to:
- Environment constraints (sandbox/container)
- Network firewall restrictions
- Token verification requirements

### Workaround Options

**Option 1: Manual Token Setup (Current)**
```bash
# Modal config created at ~/.modal/config.toml
[default]
token_id = "ak-qctAMMxbcgn757mLZhMKIR"
token_secret = "as-8YrukEonRhAkQ49d7nZ8MY"
```

**Option 2: Environment Variables**
```bash
export MODAL_TOKEN_ID="ak-qctAMMxbcgn757mLZhMKIR"
export MODAL_TOKEN_SECRET="as-8YrukEonRhAkQ49d7nZ8MY"
```

**Option 3: Interactive Authentication (Requires Browser)**
```bash
# This opens a browser for authentication
modal token new
```

---

## 📋 Next Steps

### When Network Connectivity is Available

1. **Verify Authentication**
   ```bash
   modal token set --token-id ak-qctAMMxbcgn757mLZhMKIR \
     --token-secret as-8YrukEonRhAkQ49d7nZ8MY \
     --profile=fused-gaming
   ```

2. **Test Connection**
   ```bash
   modal app list
   ```

3. **Create Secrets**
   ```bash
   # Create Claude API key secret
   modal secret create claude-api-key \
     ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```

4. **Test Example Function**
   ```bash
   # Run hello world example
   modal run modal_functions/examples/hello_modal.py
   ```

5. **Deploy Brand Analyzer**
   ```bash
   # Deploy to Modal cloud
   modal deploy modal_functions/brand_generation/analyzer.py
   ```

6. **Test Brand Analyzer**
   ```bash
   # Test the deployed function
   modal run modal_functions/brand_generation/analyzer.py
   ```

---

## 🚀 Modal Functions Ready to Deploy

### 1. Brand Analyzer (CPU-based)
**File:** `modal_functions/brand_generation/analyzer.py`

**Features:**
- Claude AI integration for brand strategy
- WCAG AA color contrast validation
- Batch processing support
- CPU-optimized (2 cores, 4GB RAM)

**Usage:**
```bash
modal deploy modal_functions/brand_generation/analyzer.py
modal run modal_functions/brand_generation/analyzer.py
```

### 2. Logo Generator (GPU-based)
**File:** `modal_functions/brand_generation/logo_generator.py`

**Features:**
- HTML/CSS logo generation
- 4K rendering support (3840x2160)
- GPU acceleration (T4)
- Multiple logo variants (wordmark, combination, badge)

**Status:** Ready for deployment (needs network connectivity)

### 3. Hello World Example
**File:** `modal_functions/examples/hello_modal.py`

**Purpose:** Test Modal setup and connectivity

**Usage:**
```bash
modal run modal_functions/examples/hello_modal.py
```

---

## 🔑 Required Secrets

Before deploying Modal functions, create these secrets in Modal dashboard or CLI:

### 1. Claude API Key
```bash
modal secret create claude-api-key \
  ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### 2. OpenAI API Key (Optional - for future features)
```bash
modal secret create openai-api-key \
  OPENAI_API_KEY=sk-your-key-here
```

### 3. Combined Secrets (Recommended)
```bash
modal secret create machups-secrets \
  ANTHROPIC_API_KEY=sk-ant-xxx \
  OPENAI_API_KEY=sk-xxx \
  THIRDWEB_SECRET_KEY=xxx \
  CLOUDFLARE_API_TOKEN=xxx
```

---

## 📊 Modal Resources Configured

### Container Images
- **BASE_IMAGE**: Debian slim with basic dependencies
- **AI_IMAGE**: Anthropic, OpenAI, Pillow, requests
- **GPU_IMAGE**: PyTorch, Diffusers, Transformers for GPU workloads

### Resource Configurations
- **CPU_CONFIG**: 2 cores, 4GB RAM, 5min timeout
- **GPU_T4_CONFIG**: T4 GPU, 4 cores, 16GB RAM, 10min timeout
- **GPU_A10G_CONFIG**: A10G GPU, 8 cores, 32GB RAM, 15min timeout

### Volumes (for caching)
- **MODEL_CACHE**: Persistent storage for ML models
- **BRAND_CACHE**: Persistent storage for generated brands

---

## 🧪 Testing Checklist

Once network connectivity is established:

- [ ] Modal authentication successful
- [ ] `modal app list` works
- [ ] Secrets created (claude-api-key minimum)
- [ ] Hello world example runs
- [ ] Brand analyzer deploys successfully
- [ ] Brand analyzer test generates brand
- [ ] Logo generator deploys (if needed)
- [ ] End-to-end brand generation works

---

## 📚 Documentation References

- **Modal CLI Docs**: https://modal.com/docs/reference/cli
- **Modal Python SDK**: https://modal.com/docs/reference/modal
- **Authentication Guide**: https://modal.com/docs/guide/secrets
- **GPU Functions**: https://modal.com/docs/guide/gpu

---

## 🎯 Integration with MACHUPS

### API Route Integration

Once Modal functions are deployed, integrate with Next.js:

```typescript
// app/api/modal/analyze/route.ts
export async function POST(request: Request) {
  const { businessIdea, targetAudience, style } = await request.json();

  // Call Modal function via HTTP endpoint
  const response = await fetch(
    'https://fused-gaming--machups-brand-analyzer-analyze-brand.modal.run',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        business_idea: businessIdea,
        target_audience: targetAudience,
        style
      })
    }
  );

  return Response.json(await response.json());
}
```

### Environment Variables

Add to `.env.local`:
```bash
# Modal (when using HTTP endpoints)
MODAL_ENDPOINT_ANALYZER=https://fused-gaming--machups-brand-analyzer-analyze-brand.modal.run
MODAL_ENDPOINT_LOGO=https://fused-gaming--machups-logo-generator-generate-logo.modal.run

# Modal API (for direct Python SDK integration)
MODAL_TOKEN_ID=ak-qctAMMxbcgn757mLZhMKIR
MODAL_TOKEN_SECRET=as-8YrukEonRhAkQ49d7nZ8MY
```

---

## ⚠️ Current Blockers

1. **Network Connectivity**: Modal CLI cannot connect to api.modal.com
   - **Workaround**: Deploy from environment with internet access
   - **Alternative**: Use Modal's web dashboard to deploy

2. **Secret Creation**: Requires Modal CLI connection
   - **Workaround**: Create secrets via Modal web dashboard at modal.com/secrets

3. **Function Testing**: Cannot run `modal run` commands
   - **Workaround**: Deploy via web dashboard, test via HTTP endpoints

---

## ✅ Ready for Next Developer

The Modal dev environment setup is **partially complete**:

✅ **Completed:**
- Modal CLI installed
- Configuration files created
- Modal functions implemented and ready
- Resource configurations defined
- Documentation complete

⏳ **Pending (requires network connectivity):**
- Modal authentication verification
- Secret creation
- Function deployment
- Live testing

**Next developer can:**
1. Run setup from environment with internet access
2. Use Modal web dashboard for deployment
3. Test functions via HTTP endpoints
4. Integrate with Next.js API routes

---

**Setup Date:** December 6, 2025
**Modal Version:** 1.2.4
**Python Version:** 3.11.14
**Status:** Ready for deployment when network available
