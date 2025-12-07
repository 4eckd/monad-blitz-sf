/**
 * Modal.com Client for MACHUPS
 *
 * This client provides a TypeScript interface to call Modal serverless functions
 * from Next.js API routes and server components.
 *
 * Usage:
 *   const client = createModalClient();
 *   const brand = await client.generateBrand({ ... });
 */

export interface BrandInput {
  businessIdea: string;
  targetAudience: string;
  style: 'modern' | 'classic' | 'bold' | 'minimal';
  industry?: string;
  subdomain?: string;
  includeAiLogos?: boolean;
  includeAiImagery?: boolean;
}

export interface BrandAnalysis {
  name: string;
  tagline: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutrals: string[];
  };
  typography: {
    heading: string;
    body: string;
  };
  personality: string[];
  target_audience: string;
  messaging: string[];
  visual_style: string;
}

export interface Logo {
  html?: string;
  css?: string;
  variations?: string[]; // base64 encoded PNGs
  method: 'html-css' | 'stable-diffusion';
}

export interface Mockups {
  business_card: string; // base64 PNG
  social_instagram: string;
  social_linkedin: string;
  social_twitter?: string;
  website_hero: string;
  ai_imagery?: string[];
}

export interface DesignTokens {
  $schema: string;
  color: Record<string, unknown>;
  typography: Record<string, unknown>;
  spacing: Record<string, unknown>;
  'border-radius': Record<string, unknown>;
  shadow?: Record<string, unknown>;
}

export interface BrandPackage {
  brand_id: string;
  brand_name: string;
  subdomain?: string;
  brand_analysis: BrandAnalysis;
  logos: Record<string, Logo>;
  mockups: Mockups;
  design_tokens: DesignTokens;
  metadata: {
    generation_time: number;
    timestamp: number;
    style: string;
    industry?: string;
    includes_ai_logos: boolean;
    includes_ai_imagery: boolean;
  };
}

export class ModalClient {
  private apiUrl: string;
  private apiKey: string;

  constructor(config: { apiUrl: string; apiKey: string }) {
    this.apiUrl = config.apiUrl;
    this.apiKey = config.apiKey;
  }

  /**
   * Generate a complete brand package
   *
   * @param input Brand generation parameters
   * @returns Complete brand package with logos, mockups, and design tokens
   */
  async generateBrand(input: BrandInput): Promise<BrandPackage> {
    const response = await fetch(`${this.apiUrl}/generate_brand_package`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        business_idea: input.businessIdea,
        target_audience: input.targetAudience,
        style: input.style,
        industry: input.industry,
        include_ai_logos: input.includeAiLogos ?? false,
        include_ai_imagery: input.includeAiImagery ?? false,
        subdomain: input.subdomain
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Modal API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  /**
   * Analyze a brand idea without generating full assets
   *
   * @param input Brand analysis parameters
   * @returns Brand analysis only
   */
  async analyzeBrand(input: {
    businessIdea: string;
    targetAudience: string;
    style: string;
    industry?: string;
  }): Promise<BrandAnalysis> {
    const response = await fetch(`${this.apiUrl}/analyze_brand`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        business_idea: input.businessIdea,
        target_audience: input.targetAudience,
        style: input.style,
        industry: input.industry
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Modal API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  /**
   * Check health of Modal functions
   */
  async healthCheck(): Promise<{ status: 'ok' | 'error'; message?: string }> {
    try {
      const response = await fetch(`${this.apiUrl}/health`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (response.ok) {
        return { status: 'ok' };
      } else {
        return {
          status: 'error',
          message: `HTTP ${response.status}: ${response.statusText}`
        };
      }
    } catch (error) {
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

/**
 * Create a Modal client instance using environment variables
 */
export function createModalClient(): ModalClient {
  const apiUrl = process.env.MODAL_API_URL;
  const apiKey = process.env.MODAL_API_KEY;

  if (!apiUrl) {
    throw new Error('MODAL_API_URL environment variable is required');
  }

  if (!apiKey) {
    throw new Error('MODAL_API_KEY environment variable is required');
  }

  return new ModalClient({ apiUrl, apiKey });
}

/**
 * Utility: Save brand assets to filesystem
 *
 * @param brand Brand package
 * @param outputDir Directory to save to (e.g., 'brands/gonads')
 */
export async function saveBrandAssets(
  brand: BrandPackage,
  outputDir: string
): Promise<void> {
  const fs = await import('fs/promises');
  const path = await import('path');

  // Create output directory
  await fs.mkdir(outputDir, { recursive: true });

  // Save brand analysis
  await fs.writeFile(
    path.join(outputDir, 'brand-analysis.json'),
    JSON.stringify(brand.brand_analysis, null, 2)
  );

  // Save design tokens
  await fs.writeFile(
    path.join(outputDir, 'design-tokens.json'),
    JSON.stringify(brand.design_tokens, null, 2)
  );

  // Save logos
  const logosDir = path.join(outputDir, 'logos');
  await fs.mkdir(logosDir, { recursive: true });

  for (const [logoType, logoData] of Object.entries(brand.logos)) {
    if (logoType === 'html_css' && 'html' in logoData && 'css' in logoData) {
      await fs.writeFile(
        path.join(logosDir, 'logo.html'),
        `<!DOCTYPE html>
<html>
<head>
  <style>${logoData.css}</style>
</head>
<body>
  ${logoData.html}
</body>
</html>`
      );
    } else if ('variations' in logoData && logoData.variations) {
      for (let i = 0; i < logoData.variations.length; i++) {
        const imgBuffer = Buffer.from(logoData.variations[i], 'base64');
        await fs.writeFile(
          path.join(logosDir, `ai-logo-${i + 1}.png`),
          imgBuffer
        );
      }
    }
  }

  // Save mockups
  const mockupsDir = path.join(outputDir, 'mockups');
  await fs.mkdir(mockupsDir, { recursive: true });

  for (const [mockupName, mockupData] of Object.entries(brand.mockups)) {
    if (typeof mockupData === 'string') {
      const imgBuffer = Buffer.from(mockupData, 'base64');
      await fs.writeFile(
        path.join(mockupsDir, `${mockupName}.png`),
        imgBuffer
      );
    } else if (Array.isArray(mockupData)) {
      for (let i = 0; i < mockupData.length; i++) {
        const imgBuffer = Buffer.from(mockupData[i], 'base64');
        await fs.writeFile(
          path.join(mockupsDir, `${mockupName}-${i + 1}.png`),
          imgBuffer
        );
      }
    }
  }

  // Save metadata
  await fs.writeFile(
    path.join(outputDir, 'metadata.json'),
    JSON.stringify(brand.metadata, null, 2)
  );

  // Create README
  await fs.writeFile(
    path.join(outputDir, 'README.md'),
    `# ${brand.brand_name} Brand Package

Generated on ${new Date(brand.metadata.timestamp * 1000).toISOString()}

## Brand Overview

**Brand Name:** ${brand.brand_name}
**Tagline:** ${brand.brand_analysis.tagline}
**Style:** ${brand.metadata.style}
${brand.metadata.industry ? `**Industry:** ${brand.metadata.industry}` : ''}

## Colors

- **Primary:** ${brand.brand_analysis.colors.primary}
- **Secondary:** ${brand.brand_analysis.colors.secondary}
- **Accent:** ${brand.brand_analysis.colors.accent}

## Typography

- **Heading Font:** ${brand.brand_analysis.typography.heading}
- **Body Font:** ${brand.brand_analysis.typography.body}

## Personality

${brand.brand_analysis.personality.join(', ')}

## Files

- \`brand-analysis.json\` - Complete brand analysis
- \`design-tokens.json\` - W3C DTCG design tokens
- \`logos/\` - Logo variations
- \`mockups/\` - Brand mockups

${brand.subdomain ? `## Deployment\n\nSubdomain: ${brand.subdomain}.machups.com\n` : ''}

## Generation Stats

- **Generation Time:** ${brand.metadata.generation_time.toFixed(1)}s
- **AI Logos:** ${brand.metadata.includes_ai_logos ? 'Yes' : 'No'}
- **AI Imagery:** ${brand.metadata.includes_ai_imagery ? 'Yes' : 'No'}

---

Generated by MACHUPS - AI-Powered Brand Generation Platform
`
  );
}
