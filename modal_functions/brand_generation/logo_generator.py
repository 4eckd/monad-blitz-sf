"""
Logo Generator Modal Function (GPU Accelerated)

Generates professional logos using Stable Diffusion on GPU.
This is a premium feature showcasing Modal's GPU capabilities.

Deploy: modal deploy modal_functions/brand_generation/logo_generator.py
Run: modal run modal_functions/brand_generation/logo_generator.py::main
"""

import modal
from typing import Literal

# Create stub
stub = modal.Stub("machups-logo-generator")

# GPU-optimized container image
image = (
    modal.Image.debian_slim()
    .pip_install(
        "torch>=2.0.0",
        "diffusers>=0.25.0",
        "transformers>=4.35.0",
        "accelerate>=0.24.0",
        "pillow>=10.0.0",
        "safetensors>=0.4.0"
    )
    .run_commands("apt-get update && apt-get install -y libgl1-mesa-glx")
)

# Volume for model caching
model_cache = modal.Volume.from_name("logo-models", create_if_missing=True)


@stub.function(
    image=image,
    gpu="T4",  # NVIDIA T4 - good for inference
    cpu=4.0,
    memory=16384,  # 16GB
    volumes={"/cache": model_cache},
    timeout=600
)
def generate_logo_sd(
    prompt: str,
    style: Literal["modern", "classic", "bold", "minimal"] = "modern",
    color_scheme: str = "vibrant",
    num_variations: int = 3
) -> list[bytes]:
    """
    Generate logo using Stable Diffusion

    Args:
        prompt: Brand name or description
        style: Visual style
        color_scheme: Color preference
        num_variations: Number of logo variations to generate

    Returns:
        List of PNG image bytes
    """
    from diffusers import StableDiffusionPipeline
    import torch
    from io import BytesIO

    # Load model (cached in volume)
    pipe = StableDiffusionPipeline.from_pretrained(
        "runwayml/stable-diffusion-v1-5",
        torch_dtype=torch.float16,
        cache_dir="/cache"
    )
    pipe = pipe.to("cuda")
    pipe.enable_attention_slicing()  # Memory optimization

    # Style-specific prompts
    style_modifiers = {
        "modern": "clean, minimalist, geometric, sleek, contemporary",
        "classic": "elegant, timeless, serif, traditional, refined",
        "bold": "strong, impactful, dynamic, vibrant, powerful",
        "minimal": "simple, clean lines, monochrome, understated, zen"
    }

    # Build enhanced prompt
    full_prompt = f"""professional logo design, {prompt}, {style_modifiers[style]},
    {color_scheme} colors, vector art style, flat design, clean background,
    high quality, award-winning, corporate identity, brand mark"""

    negative_prompt = """blurry, low quality, pixelated, text, words, letters,
    watermark, signature, photo-realistic, 3d render, cluttered, busy,
    gradient mesh, photographic"""

    # Generate variations
    images = []
    for i in range(num_variations):
        image = pipe(
            prompt=full_prompt,
            negative_prompt=negative_prompt,
            num_inference_steps=30,
            guidance_scale=7.5,
            width=512,
            height=512,
            generator=torch.Generator(device="cuda").manual_seed(42 + i)
        ).images[0]

        # Convert to bytes
        buffer = BytesIO()
        image.save(buffer, format="PNG")
        images.append(buffer.getvalue())

    return images


@stub.function(
    image=image,
    cpu=2.0,
    memory=4096
)
def create_html_css_logo(
    brand_name: str,
    primary_color: str,
    secondary_color: str,
    font_family: str = "Inter"
) -> dict:
    """
    Generate HTML/CSS-based logo (no GPU needed)

    Args:
        brand_name: Brand name text
        primary_color: Primary color (hex)
        secondary_color: Secondary color (hex)
        font_family: Font to use

    Returns:
        dict with HTML and CSS
    """
    html = f"""
    <div class="logo-container">
        <div class="logo-text">{brand_name}</div>
    </div>
    """

    css = f"""
    .logo-container {{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 20px 40px;
        background: linear-gradient(135deg, {primary_color}, {secondary_color});
        border-radius: 12px;
    }}

    .logo-text {{
        font-family: '{font_family}', sans-serif;
        font-size: 48px;
        font-weight: 900;
        color: white;
        letter-spacing: -0.05em;
        text-transform: uppercase;
    }}
    """

    return {
        "html": html,
        "css": css,
        "brand_name": brand_name
    }


@stub.function(
    image=image,
    cpu=2.0,
    memory=4096
)
def convert_to_svg(html: str, css: str, width: int = 800, height: int = 400) -> str:
    """
    Convert HTML/CSS logo to SVG

    Args:
        html: HTML markup
        css: CSS styles
        width: SVG width
        height: SVG height

    Returns:
        SVG string
    """
    # Simple SVG wrapper (in production, use proper HTML to SVG conversion)
    svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">
    <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
            <style>{css}</style>
            {html}
        </div>
    </foreignObject>
</svg>"""

    return svg


@stub.function(
    image=image,
    gpu="T4",
    cpu=4.0,
    memory=16384,
    volumes={"/cache": model_cache},
    timeout=900
)
async def generate_complete_logo_set(
    brand_name: str,
    brand_analysis: dict,
    use_ai: bool = True
) -> dict:
    """
    Generate complete logo set (3 variations)

    Args:
        brand_name: Brand name
        brand_analysis: Full brand analysis dict
        use_ai: Whether to use AI generation (GPU) or HTML/CSS

    Returns:
        dict with wordmark, icon, and combination logos
    """
    if use_ai:
        # Generate AI logos
        wordmark_images = generate_logo_sd.remote(
            prompt=f"{brand_name} wordmark logo",
            style=brand_analysis.get("style", "modern"),
            num_variations=1
        )

        icon_images = generate_logo_sd.remote(
            prompt=f"{brand_name} icon symbol logo mark",
            style=brand_analysis.get("style", "modern"),
            num_variations=1
        )

        combination_images = generate_logo_sd.remote(
            prompt=f"{brand_name} combination logo with icon and text",
            style=brand_analysis.get("style", "modern"),
            num_variations=1
        )

        return {
            "wordmark": wordmark_images[0],
            "icon": icon_images[0],
            "combination": combination_images[0],
            "format": "png",
            "method": "ai-generated"
        }
    else:
        # Generate HTML/CSS logos
        colors = brand_analysis.get("colors", {})
        typography = brand_analysis.get("typography", {})

        wordmark = create_html_css_logo.remote(
            brand_name=brand_name,
            primary_color=colors.get("primary", "#0066FF"),
            secondary_color=colors.get("secondary", "#9333EA"),
            font_family=typography.get("heading", "Inter")
        )

        return {
            "wordmark": wordmark,
            "format": "html-css",
            "method": "html-css"
        }


@stub.local_entrypoint()
def main():
    """Test logo generation locally"""
    print("Generating HTML/CSS logo...")

    result = create_html_css_logo.remote(
        brand_name="MACHUPS",
        primary_color="#0066FF",
        secondary_color="#9333EA",
        font_family="Inter"
    )

    print("=" * 60)
    print("LOGO GENERATION RESULT")
    print("=" * 60)
    print(f"\nBrand: {result['brand_name']}")
    print(f"\nHTML:\n{result['html']}")
    print(f"\nCSS:\n{result['css']}")
    print("=" * 60)

    # Uncomment to test AI generation (requires GPU)
    # print("\nGenerating AI logos (this will take ~30s on GPU)...")
    # ai_logos = generate_logo_sd.remote(
    #     prompt="MACHUPS tech startup",
    #     style="modern",
    #     num_variations=3
    # )
    # print(f"Generated {len(ai_logos)} AI logo variations")


# To run: modal run modal_functions/brand_generation/logo_generator.py
# To deploy: modal deploy modal_functions/brand_generation/logo_generator.py
