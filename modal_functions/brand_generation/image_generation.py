"""
Brand Image & Mockup Generator (GPU Accelerated)

Generates professional brand mockups and template-based images using:
- Stable Diffusion for AI-generated brand imagery
- Template-based rendering for mockups (business cards, social media, etc.)

Deploy: modal deploy modal_functions/brand_generation/image_generation.py
Run: modal run modal_functions/brand_generation/image_generation.py::main
"""

import modal
from typing import Literal, Optional
import base64
from io import BytesIO

# Create stub
stub = modal.Stub("machups-image-generator")

# GPU-optimized container image with image processing libraries
image = (
    modal.Image.debian_slim()
    .apt_install(
        "chromium",
        "chromium-driver",
        "fonts-liberation",
        "fonts-noto-color-emoji",
        "libgl1-mesa-glx",
        "libglib2.0-0"
    )
    .pip_install(
        "playwright==1.40.0",
        "pillow>=10.0.0",
        "cairosvg>=2.7.1",
        "torch>=2.0.0",
        "diffusers>=0.25.0",
        "transformers>=4.35.0",
        "accelerate>=0.24.0",
        "safetensors>=0.4.0"
    )
    .run_commands(
        "playwright install chromium",
        "playwright install-deps chromium"
    )
)

# Volume for model caching
model_cache = modal.Volume.from_name("brand-models", create_if_missing=True)


@stub.function(
    image=image,
    gpu="T4",  # NVIDIA T4 for GPU acceleration
    cpu=4.0,
    memory=16384,  # 16GB RAM
    volumes={"/cache": model_cache},
    timeout=900
)
def generate_brand_imagery_ai(
    brand_name: str,
    brand_description: str,
    visual_style: str = "modern minimalist",
    image_type: Literal["hero", "product", "abstract", "pattern"] = "hero",
    color_palette: Optional[list[str]] = None,
    num_variations: int = 3
) -> list[bytes]:
    """
    Generate AI-powered brand imagery using Stable Diffusion

    Args:
        brand_name: Name of the brand
        brand_description: Description of the brand's essence
        visual_style: Visual style direction (e.g., "modern minimalist", "bold vibrant")
        image_type: Type of image to generate
        color_palette: Optional list of hex colors to guide generation
        num_variations: Number of image variations

    Returns:
        List of PNG image bytes (1024x1024)
    """
    from diffusers import StableDiffusionPipeline
    import torch

    # Load model (cached in volume)
    pipe = StableDiffusionPipeline.from_pretrained(
        "runwayml/stable-diffusion-v1-5",
        torch_dtype=torch.float16,
        cache_dir="/cache"
    )
    pipe = pipe.to("cuda")
    pipe.enable_attention_slicing()

    # Build prompts based on image type
    type_prompts = {
        "hero": f"professional hero image for {brand_name}, {brand_description}, {visual_style}, website banner, high-end corporate",
        "product": f"product photography style image for {brand_name}, {brand_description}, {visual_style}, clean studio lighting",
        "abstract": f"abstract geometric brand pattern for {brand_name}, {visual_style}, minimalist design, brand identity",
        "pattern": f"repeating pattern design for {brand_name}, {visual_style}, seamless tile, brand elements"
    }

    base_prompt = type_prompts.get(image_type, type_prompts["hero"])

    # Add color guidance if provided
    if color_palette:
        color_desc = ", ".join(color_palette)
        base_prompt += f", using colors: {color_desc}"

    # Enhanced quality modifiers
    full_prompt = f"""{base_prompt}, high quality, professional,
    award-winning design, clean composition, balanced, elegant"""

    negative_prompt = """blurry, low quality, pixelated, grainy, noisy,
    text, words, letters, watermark, signature, cluttered, messy,
    amateur, cheap, ugly, distorted"""

    # Generate variations
    images = []
    for i in range(num_variations):
        image = pipe(
            prompt=full_prompt,
            negative_prompt=negative_prompt,
            num_inference_steps=50,  # Higher quality
            guidance_scale=7.5,
            width=1024,
            height=1024,
            generator=torch.Generator(device="cuda").manual_seed(42 + i * 100)
        ).images[0]

        # Convert to bytes
        buffer = BytesIO()
        image.save(buffer, format="PNG", quality=95)
        images.append(buffer.getvalue())

    return images


@stub.function(
    image=image,
    cpu=2.0,
    memory=8192,
    timeout=300
)
async def generate_mockup_businesscard(
    brand_name: str,
    tagline: str,
    logo_html: str,
    logo_css: str,
    primary_color: str,
    secondary_color: str,
    font_heading: str = "Inter",
    font_body: str = "Inter"
) -> bytes:
    """
    Generate business card mockup using Playwright

    Args:
        brand_name: Brand name
        tagline: Brand tagline
        logo_html: HTML for logo
        logo_css: CSS for logo
        primary_color: Primary brand color (hex)
        secondary_color: Secondary brand color (hex)
        font_heading: Heading font family
        font_body: Body font family

    Returns:
        PNG image bytes (3.5" x 2" @ 300 DPI = 1050x600px)
    """
    from playwright.async_api import async_playwright

    # Business card dimensions (3.5" x 2" @ 300 DPI)
    width = 1050
    height = 600

    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <link href="https://fonts.googleapis.com/css2?family={font_heading.replace(' ', '+')}:wght@400;700;900&family={font_body.replace(' ', '+')}:wght@400;600&display=swap" rel="stylesheet">
        <style>
            * {{ margin: 0; padding: 0; box-sizing: border-box; }}
            body {{
                width: {width}px;
                height: {height}px;
                background: linear-gradient(135deg, {primary_color} 0%, {secondary_color} 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: '{font_body}', sans-serif;
            }}
            .card {{
                width: 100%;
                height: 100%;
                background: white;
                padding: 60px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                position: relative;
                overflow: hidden;
            }}
            .card::before {{
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 40%;
                height: 100%;
                background: linear-gradient(135deg, {primary_color}20, {secondary_color}20);
                clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
            }}
            .logo-area {{
                position: relative;
                z-index: 2;
            }}
            {logo_css}
            .info {{
                position: relative;
                z-index: 2;
            }}
            .brand-name {{
                font-family: '{font_heading}', sans-serif;
                font-size: 48px;
                font-weight: 900;
                color: {primary_color};
                margin-bottom: 12px;
                letter-spacing: -0.02em;
            }}
            .tagline {{
                font-size: 20px;
                color: #64748B;
                font-weight: 400;
                line-height: 1.4;
            }}
            .contact {{
                position: relative;
                z-index: 2;
                font-size: 16px;
                color: #475569;
                line-height: 1.8;
            }}
        </style>
    </head>
    <body>
        <div class="card">
            <div class="logo-area">
                {logo_html}
            </div>
            <div class="info">
                <div class="brand-name">{brand_name}</div>
                <div class="tagline">{tagline}</div>
            </div>
            <div class="contact">
                www.{brand_name.lower().replace(' ', '')}.com<br>
                contact@{brand_name.lower().replace(' ', '')}.com
            </div>
        </div>
    </body>
    </html>
    """

    async with async_playwright() as p:
        browser = await p.chromium.launch(args=['--no-sandbox', '--disable-dev-shm-usage'])
        page = await browser.new_page(
            viewport={'width': width, 'height': height},
            device_scale_factor=2  # 2x for print quality
        )

        await page.set_content(html, wait_until='networkidle')

        # Capture as PNG
        screenshot = await page.screenshot(
            type='png',
            full_page=False
        )

        await browser.close()

        return screenshot


@stub.function(
    image=image,
    cpu=2.0,
    memory=8192,
    timeout=300
)
async def generate_mockup_socialmedia(
    brand_name: str,
    tagline: str,
    logo_html: str,
    logo_css: str,
    primary_color: str,
    secondary_color: str,
    accent_color: str,
    post_type: Literal["instagram", "linkedin", "twitter", "facebook"] = "instagram",
    headline: str = "Introducing Our Brand",
    subheadline: str = "Elevating your experience"
) -> bytes:
    """
    Generate social media post mockup

    Args:
        brand_name: Brand name
        tagline: Brand tagline
        logo_html: HTML for logo
        logo_css: CSS for logo
        primary_color: Primary color
        secondary_color: Secondary color
        accent_color: Accent color
        post_type: Social media platform
        headline: Post headline
        subheadline: Post subheadline

    Returns:
        PNG image bytes (1080x1080 for Instagram, 1200x628 for others)
    """
    from playwright.async_api import async_playwright

    # Platform dimensions
    dimensions = {
        "instagram": (1080, 1080),
        "linkedin": (1200, 628),
        "twitter": (1200, 675),
        "facebook": (1200, 630)
    }

    width, height = dimensions.get(post_type, (1080, 1080))

    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">
        <style>
            * {{ margin: 0; padding: 0; box-sizing: border-box; }}
            body {{
                width: {width}px;
                height: {height}px;
                background: linear-gradient(135deg, {primary_color} 0%, {secondary_color} 50%, {accent_color} 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Inter', sans-serif;
                position: relative;
                overflow: hidden;
            }}
            .background-pattern {{
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0.1;
                background-image:
                    repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 20px);
            }}
            .content {{
                position: relative;
                z-index: 2;
                text-align: center;
                padding: 80px;
                max-width: 900px;
            }}
            .logo {{
                margin-bottom: 60px;
                transform: scale(1.2);
            }}
            {logo_css}
            .headline {{
                font-size: 72px;
                font-weight: 900;
                color: white;
                margin-bottom: 24px;
                line-height: 1.1;
                text-shadow: 0 4px 20px rgba(0,0,0,0.3);
            }}
            .subheadline {{
                font-size: 36px;
                font-weight: 400;
                color: rgba(255,255,255,0.95);
                line-height: 1.4;
                text-shadow: 0 2px 10px rgba(0,0,0,0.2);
            }}
            .tagline {{
                margin-top: 40px;
                font-size: 24px;
                color: rgba(255,255,255,0.9);
                font-weight: 600;
            }}
        </style>
    </head>
    <body>
        <div class="background-pattern"></div>
        <div class="content">
            <div class="logo">
                {logo_html}
            </div>
            <div class="headline">{headline}</div>
            <div class="subheadline">{subheadline}</div>
            <div class="tagline">{tagline}</div>
        </div>
    </body>
    </html>
    """

    async with async_playwright() as p:
        browser = await p.chromium.launch(args=['--no-sandbox', '--disable-dev-shm-usage'])
        page = await browser.new_page(
            viewport={'width': width, 'height': height},
            device_scale_factor=2
        )

        await page.set_content(html, wait_until='networkidle')

        screenshot = await page.screenshot(type='png', full_page=False)

        await browser.close()

        return screenshot


@stub.function(
    image=image,
    cpu=2.0,
    memory=8192,
    timeout=300
)
async def generate_mockup_website_hero(
    brand_name: str,
    tagline: str,
    logo_html: str,
    logo_css: str,
    primary_color: str,
    secondary_color: str,
    hero_headline: str = "Welcome to the Future",
    hero_description: str = "Experience excellence in every detail"
) -> bytes:
    """
    Generate website hero section mockup

    Returns:
        PNG image bytes (1920x1080 - desktop hero)
    """
    from playwright.async_api import async_playwright

    width = 1920
    height = 1080

    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet">
        <style>
            * {{ margin: 0; padding: 0; box-sizing: border-box; }}
            body {{
                width: {width}px;
                height: {height}px;
                background: linear-gradient(135deg, {primary_color} 0%, {secondary_color} 100%);
                font-family: 'Inter', sans-serif;
                position: relative;
                overflow: hidden;
            }}
            .hero {{
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                position: relative;
            }}
            .nav {{
                padding: 40px 80px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: relative;
                z-index: 10;
            }}
            {logo_css}
            .nav-links {{
                display: flex;
                gap: 48px;
                font-size: 18px;
                color: rgba(255,255,255,0.9);
                font-weight: 500;
            }}
            .hero-content {{
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 80px;
                text-align: center;
                position: relative;
                z-index: 5;
            }}
            .hero-inner {{
                max-width: 1200px;
            }}
            .hero-headline {{
                font-size: 96px;
                font-weight: 900;
                color: white;
                margin-bottom: 32px;
                line-height: 1.1;
                letter-spacing: -0.02em;
                text-shadow: 0 4px 30px rgba(0,0,0,0.3);
            }}
            .hero-description {{
                font-size: 32px;
                color: rgba(255,255,255,0.9);
                margin-bottom: 48px;
                line-height: 1.5;
            }}
            .cta-button {{
                display: inline-block;
                padding: 24px 56px;
                background: white;
                color: {primary_color};
                font-size: 20px;
                font-weight: 700;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            }}
            .background-shapes {{
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                opacity: 0.1;
            }}
            .shape {{
                position: absolute;
                border-radius: 50%;
                background: white;
            }}
            .shape1 {{ width: 300px; height: 300px; top: 10%; left: 10%; }}
            .shape2 {{ width: 200px; height: 200px; bottom: 20%; right: 15%; }}
            .shape3 {{ width: 150px; height: 150px; top: 50%; right: 30%; }}
        </style>
    </head>
    <body>
        <div class="hero">
            <div class="background-shapes">
                <div class="shape shape1"></div>
                <div class="shape shape2"></div>
                <div class="shape shape3"></div>
            </div>
            <div class="nav">
                <div class="logo-area">
                    {logo_html}
                </div>
                <div class="nav-links">
                    <span>Features</span>
                    <span>About</span>
                    <span>Contact</span>
                </div>
            </div>
            <div class="hero-content">
                <div class="hero-inner">
                    <div class="hero-headline">{hero_headline}</div>
                    <div class="hero-description">{hero_description}</div>
                    <div class="cta-button">Get Started</div>
                </div>
            </div>
        </div>
    </body>
    </html>
    """

    async with async_playwright() as p:
        browser = await p.chromium.launch(args=['--no-sandbox', '--disable-dev-shm-usage'])
        page = await browser.new_page(
            viewport={'width': width, 'height': height},
            device_scale_factor=1
        )

        await page.set_content(html, wait_until='networkidle')

        screenshot = await page.screenshot(type='png', full_page=False)

        await browser.close()

        return screenshot


@stub.function(
    image=image,
    cpu=4.0,
    memory=16384,
    timeout=900
)
async def generate_complete_mockup_set(
    brand_name: str,
    brand_analysis: dict,
    logo_html: str,
    logo_css: str,
    include_ai_imagery: bool = False
) -> dict:
    """
    Generate complete set of brand mockups

    Args:
        brand_name: Brand name
        brand_analysis: Full brand analysis dict
        logo_html: HTML for logo
        logo_css: CSS for logo
        include_ai_imagery: Whether to generate AI imagery (GPU intensive)

    Returns:
        dict with all mockup images (base64 encoded)
    """
    colors = brand_analysis.get("colors", {})
    typography = brand_analysis.get("typography", {})
    tagline = brand_analysis.get("tagline", "Your brand tagline")

    # Generate all mockups in parallel
    import asyncio

    mockups = {}

    # Template-based mockups (fast, CPU only)
    business_card = await generate_mockup_businesscard.remote.aio(
        brand_name=brand_name,
        tagline=tagline,
        logo_html=logo_html,
        logo_css=logo_css,
        primary_color=colors.get("primary", "#0066FF"),
        secondary_color=colors.get("secondary", "#9333EA"),
        font_heading=typography.get("heading", "Inter"),
        font_body=typography.get("body", "Inter")
    )
    mockups["business_card"] = base64.b64encode(business_card).decode()

    # Social media posts
    social_platforms = ["instagram", "linkedin", "twitter"]
    for platform in social_platforms:
        social = await generate_mockup_socialmedia.remote.aio(
            brand_name=brand_name,
            tagline=tagline,
            logo_html=logo_html,
            logo_css=logo_css,
            primary_color=colors.get("primary", "#0066FF"),
            secondary_color=colors.get("secondary", "#9333EA"),
            accent_color=colors.get("accent", "#F97316"),
            post_type=platform,
            headline=f"Welcome to {brand_name}",
            subheadline=tagline
        )
        mockups[f"social_{platform}"] = base64.b64encode(social).decode()

    # Website hero
    website = await generate_mockup_website_hero.remote.aio(
        brand_name=brand_name,
        tagline=tagline,
        logo_html=logo_html,
        logo_css=logo_css,
        primary_color=colors.get("primary", "#0066FF"),
        secondary_color=colors.get("secondary", "#9333EA"),
        hero_headline=f"Welcome to {brand_name}",
        hero_description=tagline
    )
    mockups["website_hero"] = base64.b64encode(website).decode()

    # Optional: AI-generated brand imagery
    if include_ai_imagery:
        visual_style = brand_analysis.get("visual_style", "modern minimalist")
        ai_images = generate_brand_imagery_ai.remote(
            brand_name=brand_name,
            brand_description=tagline,
            visual_style=visual_style,
            image_type="hero",
            color_palette=[colors.get("primary"), colors.get("secondary")],
            num_variations=2
        )
        mockups["ai_hero_1"] = base64.b64encode(ai_images[0]).decode()
        mockups["ai_hero_2"] = base64.b64encode(ai_images[1]).decode()

    return mockups


@stub.local_entrypoint()
async def main():
    """Test mockup generation"""
    print("Generating brand mockups...")

    # Test data
    brand_analysis = {
        "name": "GONADS",
        "tagline": "Balls to the wall memecoin culture",
        "colors": {
            "primary": "#FF6B00",
            "secondary": "#9333EA",
            "accent": "#10B981"
        },
        "typography": {
            "heading": "Inter",
            "body": "Inter"
        }
    }

    logo_html = '<div class="logo-text">GONADS</div>'
    logo_css = '.logo-text { font-size: 48px; font-weight: 900; color: #FF6B00; }'

    # Generate business card
    card = await generate_mockup_businesscard.remote.aio(
        brand_name="GONADS",
        tagline=brand_analysis["tagline"],
        logo_html=logo_html,
        logo_css=logo_css,
        primary_color="#FF6B00",
        secondary_color="#9333EA"
    )

    print(f"✅ Generated business card mockup ({len(card)} bytes)")

    # Generate social media post
    social = await generate_mockup_socialmedia.remote.aio(
        brand_name="GONADS",
        tagline=brand_analysis["tagline"],
        logo_html=logo_html,
        logo_css=logo_css,
        primary_color="#FF6B00",
        secondary_color="#9333EA",
        accent_color="#10B981",
        post_type="instagram"
    )

    print(f"✅ Generated Instagram post mockup ({len(social)} bytes)")

    print("\n" + "="*60)
    print("MOCKUP GENERATION COMPLETE")
    print("="*60)


# To run: modal run modal_functions/brand_generation/image_generation.py
# To deploy: modal deploy modal_functions/brand_generation/image_generation.py
