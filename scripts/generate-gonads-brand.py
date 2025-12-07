"""
Generate GONADS Brand Demo

This script generates a complete brand package for GONADS
using Modal.com serverless functions.

Run:
  python scripts/generate-gonads-brand.py

Or with Modal:
  modal run scripts/generate-gonads-brand.py
"""

import modal
import json
import base64
from pathlib import Path
import time

# Create Modal stub
stub = modal.Stub("gonads-brand-generator")

# Image with dependencies
image = modal.Image.debian_slim().pip_install(
    "requests>=2.31.0"
)


@stub.function(
    image=image,
    timeout=1800,
    secrets=[modal.Secret.from_name("claude-api-key")]
)
def generate_gonads_brand():
    """
    Generate complete GONADS brand package

    This function orchestrates the brand generation process
    and saves all assets to the brands/gonads directory.
    """
    print("🎨 Generating GONADS Brand Package")
    print("="*60)

    # Import Modal functions
    from modal_functions.brand_generation.orchestrator import generate_brand_package

    # GONADS brand specification
    brand_spec = {
        "business_idea": """GONADS is a memecoin that embodies memecoin culture with
        colorfully and thoughtfully morbid references. It's a web3 NFT idea for gonads.io.
        The brand should be bold, humorous, slightly irreverent, and embrace cliche
        with a morbid twist. Think "balls to the wall" energy meets sophisticated
        design execution.""",

        "target_audience": """Web3 enthusiasts, memecoin investors, and NFT collectors
        aged 18-35 who appreciate humor, meme culture, and aren't afraid of edgy content.
        They value authenticity, community, and creative expression in the crypto space.""",

        "style": "bold",

        "industry": "Web3 / Cryptocurrency / NFT / Memecoin",

        "subdomain": "gonads",

        # Feature flags
        "include_ai_logos": False,  # True for Stable Diffusion logos (slower, GPU)
        "include_ai_imagery": False  # True for AI-generated brand imagery (GPU)
    }

    # Generate brand
    start_time = time.time()

    result = generate_brand_package.remote(
        business_idea=brand_spec["business_idea"],
        target_audience=brand_spec["target_audience"],
        style=brand_spec["style"],
        industry=brand_spec["industry"],
        include_ai_logos=brand_spec["include_ai_logos"],
        include_ai_imagery=brand_spec["include_ai_imagery"],
        subdomain=brand_spec["subdomain"]
    )

    generation_time = time.time() - start_time

    # Print results
    print("\n" + "="*60)
    print("🎉 GONADS BRAND GENERATION COMPLETE!")
    print("="*60)
    print(f"Brand Name: {result['brand_name']}")
    print(f"Brand ID: {result['brand_id']}")
    print(f"Subdomain: {result['subdomain']}.machups.com")
    print(f"Generation Time: {generation_time:.1f}s")
    print("")
    print("Brand Analysis:")
    print(f"  Tagline: {result['brand_analysis']['tagline']}")
    print(f"  Primary Color: {result['brand_analysis']['colors']['primary']}")
    print(f"  Secondary Color: {result['brand_analysis']['colors']['secondary']}")
    print(f"  Personality: {', '.join(result['brand_analysis']['personality'])}")
    print("")
    print("Assets Generated:")
    print(f"  ✅ Logos: {len(result['logos'])} variants")
    print(f"  ✅ Mockups: {len(result['mockups'])} templates")
    print(f"  ✅ Design Tokens: W3C DTCG format")
    print("="*60)

    return result


@stub.function(
    image=image,
    timeout=600
)
def save_brand_assets(result: dict, output_dir: str = "brands/gonads"):
    """
    Save generated brand assets to filesystem

    Args:
        result: Brand generation result
        output_dir: Directory to save assets
    """
    import os
    from pathlib import Path

    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    print(f"\n💾 Saving brand assets to {output_dir}...")

    # Save brand analysis
    analysis_file = output_path / "brand-analysis.json"
    with open(analysis_file, "w") as f:
        json.dump(result["brand_analysis"], f, indent=2)
    print(f"  ✅ Saved brand analysis: {analysis_file}")

    # Save design tokens
    tokens_file = output_path / "design-tokens.json"
    with open(tokens_file, "w") as f:
        json.dump(result["design_tokens"], f, indent=2)
    print(f"  ✅ Saved design tokens: {tokens_file}")

    # Save logos
    logos_dir = output_path / "logos"
    logos_dir.mkdir(exist_ok=True)

    for logo_type, logo_data in result["logos"].items():
        if logo_type == "html_css":
            # Save HTML/CSS logo
            html_file = logos_dir / "logo.html"
            with open(html_file, "w") as f:
                f.write(f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        {logo_data['css']}
    </style>
</head>
<body>
    {logo_data['html']}
</body>
</html>
                """)
            print(f"  ✅ Saved HTML logo: {html_file}")

            # Save CSS separately
            css_file = logos_dir / "logo.css"
            with open(css_file, "w") as f:
                f.write(logo_data['css'])
            print(f"  ✅ Saved CSS: {css_file}")

        elif logo_type == "ai" and "variations" in logo_data:
            # Save AI-generated logos
            for i, img_b64 in enumerate(logo_data["variations"]):
                img_file = logos_dir / f"ai-logo-{i+1}.png"
                img_data = base64.b64decode(img_b64)
                with open(img_file, "wb") as f:
                    f.write(img_data)
                print(f"  ✅ Saved AI logo {i+1}: {img_file}")

    # Save mockups
    mockups_dir = output_path / "mockups"
    mockups_dir.mkdir(exist_ok=True)

    for mockup_name, mockup_data in result["mockups"].items():
        if isinstance(mockup_data, str):
            # Base64 encoded image
            mockup_file = mockups_dir / f"{mockup_name}.png"
            img_data = base64.b64decode(mockup_data)
            with open(mockup_file, "wb") as f:
                f.write(img_data)
            print(f"  ✅ Saved mockup: {mockup_file}")
        elif isinstance(mockup_data, list):
            # Multiple images
            for i, img_b64 in enumerate(mockup_data):
                mockup_file = mockups_dir / f"{mockup_name}-{i+1}.png"
                img_data = base64.b64decode(img_b64)
                with open(mockup_file, "wb") as f:
                    f.write(img_data)
                print(f"  ✅ Saved mockup {i+1}: {mockup_file}")

    # Save metadata
    metadata_file = output_path / "metadata.json"
    with open(metadata_file, "w") as f:
        json.dump(result["metadata"], f, indent=2)
    print(f"  ✅ Saved metadata: {metadata_file}")

    # Create README
    readme_file = output_path / "README.md"
    with open(readme_file, "w") as f:
        f.write(f"""# {result['brand_name']} Brand Package

Generated on {time.strftime('%Y-%m-%d %H:%M:%S')}

## Brand Overview

**Brand Name:** {result['brand_name']}
**Tagline:** {result['brand_analysis']['tagline']}
**Industry:** {result['metadata'].get('industry', 'N/A')}
**Style:** {result['metadata']['style']}

## Colors

- **Primary:** {result['brand_analysis']['colors']['primary']}
- **Secondary:** {result['brand_analysis']['colors']['secondary']}
- **Accent:** {result['brand_analysis']['colors']['accent']}

## Typography

- **Heading Font:** {result['brand_analysis']['typography']['heading']}
- **Body Font:** {result['brand_analysis']['typography']['body']}

## Personality

{', '.join(result['brand_analysis']['personality'])}

## Files

- `brand-analysis.json` - Complete brand analysis
- `design-tokens.json` - W3C DTCG design tokens
- `logos/` - Logo variations
- `mockups/` - Brand mockups (business card, social, website)
- `metadata.json` - Generation metadata

## Deployment

Subdomain: {result['subdomain']}.machups.com

## Generation Stats

- **Generation Time:** {result['metadata']['generation_time']:.1f}s
- **AI Logos:** {'Yes' if result['metadata']['includes_ai_logos'] else 'No'}
- **AI Imagery:** {'Yes' if result['metadata']['includes_ai_imagery'] else 'No'}

---

Generated by MACHUPS - AI-Powered Brand Generation Platform
        """)
    print(f"  ✅ Saved README: {readme_file}")

    print(f"\n✅ All assets saved to {output_dir}/")


@stub.local_entrypoint()
def main():
    """
    Main entry point

    Run with: modal run scripts/generate-gonads-brand.py
    """
    # Generate brand
    result = generate_gonads_brand.remote()

    # Save assets
    save_brand_assets.remote(result)

    print("\n🎉 GONADS brand generation complete!")
    print(f"📂 Check brands/gonads/ for all assets")


if __name__ == "__main__":
    # If run directly (not via Modal)
    import sys
    print("⚠️  This script should be run via Modal:")
    print("   modal run scripts/generate-gonads-brand.py")
    print("")
    print("Or you can run the setup script first:")
    print("   bash scripts/modal-setup.sh")
    sys.exit(1)
