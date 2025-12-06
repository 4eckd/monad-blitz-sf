"""
Shared Modal configuration for MACHUPS

This module provides shared configuration, images, and utilities
for Modal serverless functions.
"""

import modal

# App name
APP_NAME = "machups"

# Shared container images
BASE_IMAGE = modal.Image.debian_slim().pip_install(
    "anthropic>=0.40.0",
    "pillow>=10.0.0",
    "requests>=2.31.0"
)

AI_IMAGE = modal.Image.debian_slim().pip_install(
    "anthropic>=0.40.0",
    "openai>=1.0.0",
    "pillow>=10.0.0",
    "requests>=2.31.0"
)

GPU_IMAGE = (
    modal.Image.debian_slim()
    .pip_install(
        "torch>=2.0.0",
        "diffusers>=0.25.0",
        "transformers>=4.35.0",
        "accelerate>=0.24.0",
        "pillow>=10.0.0"
    )
    .run_commands("apt-get update && apt-get install -y libgl1-mesa-glx")
)

# Shared secrets
CLAUDE_SECRET = modal.Secret.from_dict({
    "ANTHROPIC_API_KEY": "placeholder"  # Set via Modal dashboard
})

OPENAI_SECRET = modal.Secret.from_dict({
    "OPENAI_API_KEY": "placeholder"  # Set via Modal dashboard
})

# Shared volumes for caching
MODEL_CACHE = modal.Volume.from_name(
    "model-cache",
    create_if_missing=True
)

BRAND_CACHE = modal.Volume.from_name(
    "brand-cache",
    create_if_missing=True
)

# Resource configurations
CPU_CONFIG = {
    "cpu": 2.0,
    "memory": 4096,  # 4GB
    "timeout": 300   # 5 minutes
}

GPU_T4_CONFIG = {
    "gpu": "T4",
    "cpu": 4.0,
    "memory": 16384,  # 16GB
    "timeout": 600    # 10 minutes
}

GPU_A10G_CONFIG = {
    "gpu": "A10G",
    "cpu": 8.0,
    "memory": 32768,  # 32GB
    "timeout": 900    # 15 minutes
}
