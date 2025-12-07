"""
Brand Generation Orchestrator

Coordinates all Modal functions to generate complete brand packages.
This is the main entry point for brand generation.

Deploy: modal deploy modal_functions/brand_generation/orchestrator.py
Run: modal run modal_functions/brand_generation/orchestrator.py::generate_brand
"""

import modal
from typing import Optional, Literal
import time
import base64

# Import other Modal functions
from .analyzer import analyze_brand
from .logo_generator import create_html_css_logo, generate_logo_sd
from .image_generation import (
    generate_mockup_businesscard,
    generate_mockup_socialmedia,
    generate_mockup_website_hero,
    generate_brand_imagery_ai
)

# Create stub
stub = modal.Stub("machups-orchestrator")

# Lightweight image for orchestration
image = modal.Image.debian_slim().pip_install(
    "anthropic>=0.40.0",
    "pydantic>=2.0.0"
)


@stub.function(
    image=image,
    cpu=2.0,
    memory=4096,
    timeout=1800,  # 30 minutes max
    secrets=[modal.Secret.from_name("claude-api-key")]
)
async def generate_brand_package(
    business_idea: str,
    target_audience: str,
    style: Literal["modern", "classic", "bold", "minimal"] = "modern",
    industry: Optional[str] = None,
    include_ai_logos: bool = False,
    include_ai_imagery: bool = False,
    subdomain: Optional[str] = None
) -> dict:
    """
    Generate complete brand package

    Args:
        business_idea: Description of the business
        target_audience: Target audience description
        style: Design style preference
        industry: Optional industry categorization
        include_ai_logos: Generate AI logos (GPU intensive, slower)
        include_ai_imagery: Generate AI brand imagery (GPU intensive)
        subdomain: Optional subdomain for deployment (e.g., "gonads" -> gonads.machups.com)

    Returns:
        Complete brand package with:
        - brand_analysis: Full brand strategy
        - logos: HTML/CSS logos (and AI if requested)
        - mockups: Business card, social media, website
        - design_tokens: W3C DTCG tokens
        - metadata: Generation stats

    Example:
        result = await generate_brand_package.remote.aio(
            business_idea="Memecoin with colorfully morbid references",
            target_audience="Web3 NFT enthusiasts who appreciate humor",
            style="bold",
            industry="Web3 / Cryptocurrency",
            subdomain="gonads"
        )
    """
    import asyncio

    start_time = time.time()
    print("🎨 MACHUPS Brand Generation Started")
    print("="*60)

    # PHASE 1: Brand Analysis (30-45s)
    print("\n[1/4] 🤖 Analyzing brand with Claude AI...")
    phase1_start = time.time()

    brand_analysis = analyze_brand.remote(
        business_idea=business_idea,
        target_audience=target_audience,
        style=style,
        industry=industry
    )

    brand_name = brand_analysis["name"]
    print(f"✅ Brand analyzed: {brand_name}")
    print(f"   Tagline: {brand_analysis['tagline']}")
    print(f"   Colors: {brand_analysis['colors']['primary']}, {brand_analysis['colors']['secondary']}")
    print(f"   ⏱️  Phase 1 time: {time.time() - phase1_start:.1f}s")

    # PHASE 2: Logo Generation (10-15s CPU, 60s+ GPU)
    print(f"\n[2/4] 🎨 Generating logos...")
    phase2_start = time.time()

    # Always generate HTML/CSS logos (fast)
    html_css_logo = create_html_css_logo.remote(
        brand_name=brand_name,
        primary_color=brand_analysis["colors"]["primary"],
        secondary_color=brand_analysis["colors"]["secondary"],
        font_family=brand_analysis["typography"]["heading"]
    )

    logos = {
        "html_css": {
            "html": html_css_logo["html"],
            "css": html_css_logo["css"],
            "method": "html-css"
        }
    }

    # Optionally generate AI logos (GPU)
    if include_ai_logos:
        print("   Generating AI logos (GPU)...")
        ai_logo_images = generate_logo_sd.remote(
            prompt=f"{brand_name} {business_idea}",
            style=style,
            color_scheme=f"{brand_analysis['colors']['primary']} {brand_analysis['colors']['secondary']}",
            num_variations=3
        )
        logos["ai"] = {
            "variations": [base64.b64encode(img).decode() for img in ai_logo_images],
            "method": "stable-diffusion"
        }

    print(f"✅ Logos generated")
    print(f"   ⏱️  Phase 2 time: {time.time() - phase2_start:.1f}s")

    # PHASE 3: Mockup Generation (45-60s)
    print(f"\n[3/4] 📸 Generating mockups...")
    phase3_start = time.time()

    # Generate all mockups in parallel
    business_card_future = generate_mockup_businesscard.remote.aio(
        brand_name=brand_name,
        tagline=brand_analysis["tagline"],
        logo_html=html_css_logo["html"],
        logo_css=html_css_logo["css"],
        primary_color=brand_analysis["colors"]["primary"],
        secondary_color=brand_analysis["colors"]["secondary"],
        font_heading=brand_analysis["typography"]["heading"],
        font_body=brand_analysis["typography"]["body"]
    )

    instagram_future = generate_mockup_socialmedia.remote.aio(
        brand_name=brand_name,
        tagline=brand_analysis["tagline"],
        logo_html=html_css_logo["html"],
        logo_css=html_css_logo["css"],
        primary_color=brand_analysis["colors"]["primary"],
        secondary_color=brand_analysis["colors"]["secondary"],
        accent_color=brand_analysis["colors"]["accent"],
        post_type="instagram",
        headline=f"Introducing {brand_name}",
        subheadline=brand_analysis["tagline"]
    )

    linkedin_future = generate_mockup_socialmedia.remote.aio(
        brand_name=brand_name,
        tagline=brand_analysis["tagline"],
        logo_html=html_css_logo["html"],
        logo_css=html_css_logo["css"],
        primary_color=brand_analysis["colors"]["primary"],
        secondary_color=brand_analysis["colors"]["secondary"],
        accent_color=brand_analysis["colors"]["accent"],
        post_type="linkedin",
        headline=f"Welcome to {brand_name}",
        subheadline=brand_analysis["tagline"]
    )

    website_future = generate_mockup_website_hero.remote.aio(
        brand_name=brand_name,
        tagline=brand_analysis["tagline"],
        logo_html=html_css_logo["html"],
        logo_css=html_css_logo["css"],
        primary_color=brand_analysis["colors"]["primary"],
        secondary_color=brand_analysis["colors"]["secondary"],
        hero_headline=f"Welcome to {brand_name}",
        hero_description=brand_analysis["tagline"]
    )

    # Wait for all mockups to complete
    business_card, instagram, linkedin, website = await asyncio.gather(
        business_card_future,
        instagram_future,
        linkedin_future,
        website_future
    )

    mockups = {
        "business_card": base64.b64encode(business_card).decode(),
        "social_instagram": base64.b64encode(instagram).decode(),
        "social_linkedin": base64.b64encode(linkedin).decode(),
        "website_hero": base64.b64encode(website).decode()
    }

    print(f"✅ Mockups generated: Business card, Instagram, LinkedIn, Website")
    print(f"   ⏱️  Phase 3 time: {time.time() - phase3_start:.1f}s")

    # PHASE 4: Optional AI Imagery (60s+ GPU)
    if include_ai_imagery:
        print(f"\n[4/4] 🎨 Generating AI brand imagery (GPU)...")
        phase4_start = time.time()

        ai_images = generate_brand_imagery_ai.remote(
            brand_name=brand_name,
            brand_description=brand_analysis["tagline"],
            visual_style=brand_analysis.get("visual_style", "modern minimalist"),
            image_type="hero",
            color_palette=[
                brand_analysis["colors"]["primary"],
                brand_analysis["colors"]["secondary"]
            ],
            num_variations=2
        )

        mockups["ai_imagery"] = [base64.b64encode(img).decode() for img in ai_images]
        print(f"✅ AI imagery generated")
        print(f"   ⏱️  Phase 4 time: {time.time() - phase4_start:.1f}s")

    # Generate design tokens
    design_tokens = generate_design_tokens(brand_analysis)

    # Calculate stats
    total_time = time.time() - start_time

    print("\n" + "="*60)
    print("🎉 BRAND GENERATION COMPLETE!")
    print("="*60)
    print(f"Brand: {brand_name}")
    print(f"Total Time: {total_time:.1f}s")
    print(f"Subdomain: {subdomain}.machups.com" if subdomain else "No subdomain specified")
    print("="*60)

    return {
        "brand_id": f"{brand_name.lower().replace(' ', '-')}-{int(start_time)}",
        "brand_name": brand_name,
        "subdomain": subdomain,
        "brand_analysis": brand_analysis,
        "logos": logos,
        "mockups": mockups,
        "design_tokens": design_tokens,
        "metadata": {
            "generation_time": total_time,
            "timestamp": start_time,
            "style": style,
            "industry": industry,
            "includes_ai_logos": include_ai_logos,
            "includes_ai_imagery": include_ai_imagery
        }
    }


def generate_design_tokens(brand_analysis: dict) -> dict:
    """
    Generate W3C DTCG compliant design tokens

    Args:
        brand_analysis: Brand analysis from Claude

    Returns:
        W3C DTCG format design tokens
    """
    colors = brand_analysis.get("colors", {})
    typography = brand_analysis.get("typography", {})

    return {
        "$schema": "https://design-tokens.org/schema/version/1.0.0",
        "color": {
            "brand": {
                "primary": {
                    "$value": colors.get("primary", "#0066FF"),
                    "$type": "color",
                    "$description": "Primary brand color"
                },
                "secondary": {
                    "$value": colors.get("secondary", "#9333EA"),
                    "$type": "color",
                    "$description": "Secondary brand color"
                },
                "accent": {
                    "$value": colors.get("accent", "#F97316"),
                    "$type": "color",
                    "$description": "Accent color"
                }
            },
            "semantic": {
                "success": {"$value": "#10B981", "$type": "color"},
                "error": {"$value": "#EF4444", "$type": "color"},
                "warning": {"$value": "#F59E0B", "$type": "color"},
                "info": {"$value": "#3B82F6", "$type": "color"}
            },
            "neutral": {
                "50": {"$value": "#FAFAFA", "$type": "color"},
                "100": {"$value": "#F5F5F5", "$type": "color"},
                "200": {"$value": "#E5E5E5", "$type": "color"},
                "300": {"$value": "#D4D4D4", "$type": "color"},
                "400": {"$value": "#A3A3A3", "$type": "color"},
                "500": {"$value": "#737373", "$type": "color"},
                "600": {"$value": "#525252", "$type": "color"},
                "700": {"$value": "#404040", "$type": "color"},
                "800": {"$value": "#262626", "$type": "color"},
                "900": {"$value": "#171717", "$type": "color"}
            }
        },
        "typography": {
            "font-family": {
                "heading": {
                    "$value": typography.get("heading", "Inter"),
                    "$type": "fontFamily"
                },
                "body": {
                    "$value": typography.get("body", "Inter"),
                    "$type": "fontFamily"
                }
            },
            "font-size": {
                "xs": {"$value": "0.75rem", "$type": "dimension"},
                "sm": {"$value": "0.875rem", "$type": "dimension"},
                "base": {"$value": "1rem", "$type": "dimension"},
                "lg": {"$value": "1.125rem", "$type": "dimension"},
                "xl": {"$value": "1.25rem", "$type": "dimension"},
                "2xl": {"$value": "1.5rem", "$type": "dimension"},
                "3xl": {"$value": "1.875rem", "$type": "dimension"},
                "4xl": {"$value": "2.25rem", "$type": "dimension"},
                "5xl": {"$value": "3rem", "$type": "dimension"}
            },
            "font-weight": {
                "normal": {"$value": "400", "$type": "fontWeight"},
                "medium": {"$value": "500", "$type": "fontWeight"},
                "semibold": {"$value": "600", "$type": "fontWeight"},
                "bold": {"$value": "700", "$type": "fontWeight"},
                "black": {"$value": "900", "$type": "fontWeight"}
            }
        },
        "spacing": {
            "xs": {"$value": "0.25rem", "$type": "dimension"},
            "sm": {"$value": "0.5rem", "$type": "dimension"},
            "md": {"$value": "1rem", "$type": "dimension"},
            "lg": {"$value": "1.5rem", "$type": "dimension"},
            "xl": {"$value": "2rem", "$type": "dimension"},
            "2xl": {"$value": "2.5rem", "$type": "dimension"},
            "3xl": {"$value": "3rem", "$type": "dimension"}
        },
        "border-radius": {
            "none": {"$value": "0", "$type": "dimension"},
            "sm": {"$value": "0.25rem", "$type": "dimension"},
            "md": {"$value": "0.5rem", "$type": "dimension"},
            "lg": {"$value": "1rem", "$type": "dimension"},
            "xl": {"$value": "1.5rem", "$type": "dimension"},
            "full": {"$value": "9999px", "$type": "dimension"}
        },
        "shadow": {
            "sm": {"$value": "0 1px 2px 0 rgba(0, 0, 0, 0.05)", "$type": "shadow"},
            "md": {"$value": "0 4px 6px -1px rgba(0, 0, 0, 0.1)", "$type": "shadow"},
            "lg": {"$value": "0 10px 15px -3px rgba(0, 0, 0, 0.1)", "$type": "shadow"},
            "xl": {"$value": "0 20px 25px -5px rgba(0, 0, 0, 0.1)", "$type": "shadow"}
        }
    }


@stub.local_entrypoint()
async def main():
    """Test brand generation with GONADS example"""
    print("Testing with GONADS brand...")

    result = await generate_brand_package.remote.aio(
        business_idea="""Memecoin that embodies the memecoin culture with colorfully
        and thoughtfully morbid references. A web3 NFT idea for gonads.io""",
        target_audience="""Web3 enthusiasts, memecoin investors, NFT collectors who
        appreciate humor and cliche references with a morbid twist""",
        style="bold",
        industry="Web3 / Cryptocurrency / NFT",
        include_ai_logos=False,  # Set to True to generate AI logos (slower)
        include_ai_imagery=False,  # Set to True to generate AI imagery (slower)
        subdomain="gonads"
    )

    print("\n" + "="*60)
    print("GENERATION RESULT")
    print("="*60)
    print(f"Brand ID: {result['brand_id']}")
    print(f"Brand Name: {result['brand_name']}")
    print(f"Subdomain: {result['subdomain']}.machups.com")
    print(f"Generation Time: {result['metadata']['generation_time']:.1f}s")
    print(f"\nMockups generated:")
    for mockup_name in result['mockups'].keys():
        print(f"  ✅ {mockup_name}")
    print("="*60)

    return result


# To run locally (test):
# modal run modal_functions/brand_generation/orchestrator.py

# To deploy as webhook:
# modal deploy modal_functions/brand_generation/orchestrator.py

# To call from Next.js API:
# POST https://your-modal-app.modal.run/generate_brand_package
