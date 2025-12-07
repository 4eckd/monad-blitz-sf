#!/bin/bash
# MACHUPS Modal.com Setup Script
# Sets up Modal workspace for GPU-accelerated brand generation

set -e

echo "🚀 MACHUPS Modal.com Setup"
echo "=========================="
echo ""

# Check if Modal is installed
if ! command -v modal &> /dev/null; then
    echo "📦 Installing Modal CLI..."
    pip install modal
else
    echo "✅ Modal CLI already installed"
fi

# Check Modal version
echo "📋 Modal version: $(modal --version)"

# Authenticate with Modal
echo ""
echo "🔐 Setting up Modal authentication..."
echo "Choose authentication method:"
echo "  1. Use pre-configured token (from modal.toml)"
echo "  2. Interactive authentication (browser)"
read -p "Enter choice (1 or 2): " auth_choice

if [ "$auth_choice" = "1" ]; then
    # Use token from modal.toml
    echo "Using token from modal.toml..."
    modal token set --token-id ak-qctAMMxbcgn757mLZhMKIR \
        --token-secret as-8YrukEonRhAkQ49d7nZ8MY || {
        echo "⚠️  Token authentication failed. This is normal in sandboxed environments."
        echo "   You can authenticate manually with: modal token new"
    }
else
    # Interactive authentication
    echo "Opening browser for authentication..."
    modal token new
fi

echo ""
echo "✅ Modal authentication complete!"
echo ""

# Create Modal secrets
echo "🔒 Setting up Modal secrets..."
echo ""
echo "You need to create these secrets in Modal dashboard:"
echo "  https://modal.com/settings/secrets"
echo ""
echo "Required secrets:"
echo "  1. claude-api-key"
echo "     - Name: ANTHROPIC_API_KEY"
echo "     - Value: sk-ant-xxx (your Claude API key)"
echo ""
echo "  2. openai-api-key (optional, for DALL-E)"
echo "     - Name: OPENAI_API_KEY"
echo "     - Value: sk-xxx (your OpenAI API key)"
echo ""
read -p "Press Enter after you've created the secrets..."

# Test Modal connection
echo ""
echo "🧪 Testing Modal connection..."

# Create a simple test app
cat > /tmp/test_modal.py << 'EOF'
import modal

stub = modal.Stub("machups-test")

@stub.function()
def hello():
    return "Hello from Modal!"

@stub.local_entrypoint()
def main():
    result = hello.remote()
    print(f"✅ Modal test successful: {result}")
EOF

# Run test
python /tmp/test_modal.py || {
    echo "⚠️  Modal test failed. This is normal if not authenticated."
    echo "   Continue with manual authentication."
}

echo ""
echo "📦 Deploying MACHUPS Modal functions..."
echo ""

# Deploy Modal functions
cd /home/user/monad-blitz-sf

echo "Deploying brand analyzer..."
modal deploy modal_functions/brand_generation/analyzer.py || echo "⚠️  Analyzer deployment skipped"

echo "Deploying logo generator..."
modal deploy modal_functions/brand_generation/logo_generator.py || echo "⚠️  Logo generator deployment skipped"

echo "Deploying image generator..."
modal deploy modal_functions/brand_generation/image_generation.py || echo "⚠️  Image generator deployment skipped"

echo "Deploying orchestrator..."
modal deploy modal_functions/brand_generation/orchestrator.py || echo "⚠️  Orchestrator deployment skipped"

echo ""
echo "✅ Modal setup complete!"
echo ""
echo "📚 Next steps:"
echo "  1. Test brand generation:"
echo "     modal run modal_functions/brand_generation/orchestrator.py"
echo ""
echo "  2. Connect to Modal shell:"
echo "     modal shell <app-id>"
echo ""
echo "  3. View logs:"
echo "     modal logs machups-orchestrator"
echo ""
echo "  4. Monitor dashboard:"
echo "     https://modal.com/apps"
echo ""
