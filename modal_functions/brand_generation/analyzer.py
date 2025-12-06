"""
Brand Analyzer Modal Function

This function uses Claude AI to analyze brand strategy.
Runs on CPU (no GPU needed for LLM API calls).

Deploy: modal deploy modal_functions/brand_generation/analyzer.py
Run: modal run modal_functions/brand_generation/analyzer.py::main
"""

import modal
from typing import Optional

# Create stub
stub = modal.Stub("machups-brand-analyzer")

# Container image with dependencies
image = modal.Image.debian_slim().pip_install(
    "anthropic>=0.40.0",
    "pydantic>=2.0.0"
)


@stub.function(
    image=image,
    secrets=[modal.Secret.from_name("claude-api-key")],  # Set in Modal dashboard
    cpu=2.0,
    memory=4096,
    timeout=300
)
def analyze_brand(
    business_idea: str,
    target_audience: str,
    style: str = "modern",
    industry: Optional[str] = None
) -> dict:
    """
    Analyze brand strategy using Claude AI

    Args:
        business_idea: Description of the business
        target_audience: Target customer description
        style: Design style (modern, classic, bold, minimal)
        industry: Optional industry categorization

    Returns:
        dict containing brand analysis with:
        - name: Brand name
        - tagline: Brand tagline
        - colors: Color palette
        - typography: Font recommendations
        - personality: Brand personality traits
        - messaging: Key messaging points
    """
    import os
    import json
    from anthropic import Anthropic

    # Get API key from Modal secret
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        raise ValueError("ANTHROPIC_API_KEY not found in secrets")

    client = Anthropic(api_key=api_key)

    # Build prompt
    prompt = f"""You are a professional brand strategist. Analyze the following business idea and create a comprehensive brand strategy.

Business Idea: {business_idea}
Target Audience: {target_audience}
Style Preference: {style}
{f"Industry: {industry}" if industry else ""}

Generate a strategic brand analysis with the following:

1. Brand Name (memorable, 1-2 words)
2. Tagline (compelling, under 60 characters)
3. Color Palette:
   - Primary color (hex code)
   - Secondary color (hex code)
   - Accent color (hex code)
   - 5-7 neutral colors (hex codes)
4. Typography:
   - Heading font family
   - Body font family
5. Brand Personality (5 adjectives)
6. Target Audience Profile (detailed)
7. Key Messaging Points (3-5 points)
8. Visual Style Direction

Ensure all colors meet WCAG AA contrast standards (4.5:1 minimum for text).

Output as valid JSON matching this structure:
{{
  "name": "string",
  "tagline": "string",
  "colors": {{
    "primary": "#RRGGBB",
    "secondary": "#RRGGBB",
    "accent": "#RRGGBB",
    "neutrals": ["#RRGGBB", "#RRGGBB", ...]
  }},
  "typography": {{
    "heading": "font-name",
    "body": "font-name"
  }},
  "personality": ["adj1", "adj2", ...],
  "target_audience": "detailed description",
  "messaging": ["point1", "point2", ...],
  "visual_style": "description"
}}"""

    # Call Claude API
    response = client.messages.create(
        model="claude-sonnet-4-5-20250929",
        max_tokens=4096,
        temperature=0.7,
        messages=[{
            "role": "user",
            "content": prompt
        }]
    )

    # Parse response
    content = response.content[0].text

    # Extract JSON from response (Claude might wrap it in markdown)
    if "```json" in content:
        content = content.split("```json")[1].split("```")[0].strip()
    elif "```" in content:
        content = content.split("```")[1].split("```")[0].strip()

    result = json.loads(content)

    # Validate WCAG contrast
    result["wcag_validated"] = validate_color_contrast(
        result["colors"]["primary"],
        "#FFFFFF"
    )

    return result


def validate_color_contrast(color1: str, color2: str) -> dict:
    """Validate WCAG AA color contrast"""
    def hex_to_rgb(hex_color: str):
        hex_color = hex_color.lstrip('#')
        return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

    def relative_luminance(rgb):
        r, g, b = [x / 255.0 for x in rgb]
        r = r / 12.92 if r <= 0.03928 else ((r + 0.055) / 1.055) ** 2.4
        g = g / 12.92 if g <= 0.03928 else ((g + 0.055) / 1.055) ** 2.4
        b = b / 12.92 if b <= 0.03928 else ((b + 0.055) / 1.055) ** 2.4
        return 0.2126 * r + 0.7152 * g + 0.0722 * b

    lum1 = relative_luminance(hex_to_rgb(color1))
    lum2 = relative_luminance(hex_to_rgb(color2))

    lighter = max(lum1, lum2)
    darker = min(lum1, lum2)
    contrast_ratio = (lighter + 0.05) / (darker + 0.05)

    return {
        "contrast_ratio": round(contrast_ratio, 2),
        "wcag_aa": contrast_ratio >= 4.5,
        "wcag_aaa": contrast_ratio >= 7.0
    }


@stub.function(
    image=image,
    secrets=[modal.Secret.from_name("claude-api-key")],
    cpu=2.0,
    memory=4096
)
async def analyze_brand_batch(inputs: list[dict]) -> list[dict]:
    """
    Analyze multiple brands in parallel

    Args:
        inputs: List of dicts with brand analysis inputs

    Returns:
        List of brand analysis results
    """
    # Process all inputs in parallel
    results = await analyze_brand.map(
        [i["business_idea"] for i in inputs],
        [i["target_audience"] for i in inputs],
        [i.get("style", "modern") for i in inputs],
        [i.get("industry") for i in inputs]
    )
    return list(results)


@stub.local_entrypoint()
def main():
    """Test the brand analyzer locally"""
    # Example usage
    result = analyze_brand.remote(
        business_idea="Sustainable coffee delivery service for urban professionals",
        target_audience="Busy professionals aged 25-40 who value quality and sustainability",
        style="modern",
        industry="Food & Beverage"
    )

    print("=" * 60)
    print("BRAND ANALYSIS RESULT")
    print("=" * 60)
    print(f"\nBrand Name: {result['name']}")
    print(f"Tagline: {result['tagline']}")
    print(f"\nColors:")
    print(f"  Primary: {result['colors']['primary']}")
    print(f"  Secondary: {result['colors']['secondary']}")
    print(f"  Accent: {result['colors']['accent']}")
    print(f"\nTypography:")
    print(f"  Heading: {result['typography']['heading']}")
    print(f"  Body: {result['typography']['body']}")
    print(f"\nPersonality: {', '.join(result['personality'])}")
    print(f"\nWCAG Validation:")
    print(f"  Contrast Ratio: {result['wcag_validated']['contrast_ratio']}:1")
    print(f"  WCAG AA: {'✅' if result['wcag_validated']['wcag_aa'] else '❌'}")
    print("=" * 60)


# To run locally:
# modal run modal_functions/brand_generation/analyzer.py

# To deploy as web endpoint:
# modal deploy modal_functions/brand_generation/analyzer.py
