/**
 * Brand Template System
 *
 * Manages reusable brand templates for rapid generation
 * - Template library (industries, styles, use cases)
 * - Template instantiation
 * - Customization engine
 * - Template versioning
 */

import fs from 'fs/promises';
import path from 'path';
import Handlebars from 'handlebars';

export interface BrandTemplate {
  id: string;
  name: string;
  description: string;
  category: 'industry' | 'style' | 'use-case';
  industry?: string;
  style: 'modern' | 'classic' | 'bold' | 'minimal';
  colorPalette: {
    primary: string;
    secondary: string;
    accent?: string;
    background: string;
    text: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    monoFont?: string;
  };
  personality: string[];
  messaging: {
    voiceTone: string;
    copyExamples: Record<string, string>;
  };
  components: string[]; // Component names included
  version: string;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateCustomization {
  brandName: string;
  tagline?: string;
  colorOverrides?: Partial<BrandTemplate['colorPalette']>;
  typographyOverrides?: Partial<BrandTemplate['typography']>;
  personalityAdjustments?: string[];
  additionalComponents?: string[];
}

export interface InstantiatedBrand {
  brandId: string;
  template: BrandTemplate;
  customizations: TemplateCustomization;
  brandAnalysis: any;
  designTokens: any;
  components: any[];
  previewFiles: string[];
}

export class TemplateSystem {
  private templatesDir: string;
  private templates: Map<string, BrandTemplate> = new Map();

  constructor(templatesDir: string = path.join(process.cwd(), 'templates')) {
    this.templatesDir = templatesDir;
  }

  /**
   * Load all templates from disk
   */
  async loadTemplates(): Promise<void> {
    console.log('📚 Loading brand templates...');

    try {
      const files = await fs.readdir(this.templatesDir);
      const jsonFiles = files.filter((f) => f.endsWith('.json'));

      for (const file of jsonFiles) {
        const filePath = path.join(this.templatesDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const template: BrandTemplate = JSON.parse(content);
        this.templates.set(template.id, template);
      }

      console.log(`✅ Loaded ${this.templates.size} templates`);
    } catch (error) {
      console.warn('⚠️  No templates directory found, using defaults');
      this.loadDefaultTemplates();
    }
  }

  /**
   * Load default templates (built-in)
   */
  private loadDefaultTemplates(): void {
    const defaults: BrandTemplate[] = [
      // Web3/NFT Template (like Gonads.io)
      {
        id: 'web3-nft-bold',
        name: 'Web3 NFT - Bold',
        description: 'Bold, playful template for web3/NFT projects',
        category: 'industry',
        industry: 'Web3/NFT',
        style: 'bold',
        colorPalette: {
          primary: '#9333EA',
          secondary: '#14B8A6',
          accent: '#F97316',
          background: '#0F172A',
          text: '#F8FAFC',
        },
        typography: {
          headingFont: 'Inter',
          bodyFont: 'Inter',
          monoFont: 'JetBrains Mono',
        },
        personality: ['Bold', 'Playful', 'Community-Driven', 'Innovative'],
        messaging: {
          voiceTone: 'Bold and direct, playful yet professional',
          copyExamples: {
            hero: 'The [Product] with Real [Value]',
            cta: 'Get Started',
            community: 'Join the Community',
          },
        },
        components: ['Button', 'Card', 'Input', 'Header', 'Footer'],
        version: '1.0.0',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      // SaaS Modern Template
      {
        id: 'saas-modern',
        name: 'SaaS - Modern',
        description: 'Clean, modern template for SaaS products',
        category: 'industry',
        industry: 'SaaS',
        style: 'modern',
        colorPalette: {
          primary: '#3B82F6',
          secondary: '#10B981',
          accent: '#F59E0B',
          background: '#FFFFFF',
          text: '#1F2937',
        },
        typography: {
          headingFont: 'Inter',
          bodyFont: 'Inter',
          monoFont: 'Fira Code',
        },
        personality: ['Innovative', 'Reliable', 'User-Friendly', 'Scalable'],
        messaging: {
          voiceTone: 'Professional and clear, helpful and approachable',
          copyExamples: {
            hero: 'Streamline Your [Process]',
            cta: 'Start Free Trial',
            community: 'Join Our Community',
          },
        },
        components: ['Button', 'Card', 'Input', 'Header', 'Footer', 'Pricing'],
        version: '1.0.0',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      // E-commerce Classic Template
      {
        id: 'ecommerce-classic',
        name: 'E-commerce - Classic',
        description: 'Timeless template for online stores',
        category: 'industry',
        industry: 'E-commerce',
        style: 'classic',
        colorPalette: {
          primary: '#000000',
          secondary: '#FFFFFF',
          accent: '#DC2626',
          background: '#F9FAFB',
          text: '#111827',
        },
        typography: {
          headingFont: 'Playfair Display',
          bodyFont: 'Inter',
          monoFont: 'Courier New',
        },
        personality: ['Elegant', 'Trustworthy', 'Sophisticated', 'Timeless'],
        messaging: {
          voiceTone: 'Elegant and refined, trustworthy and professional',
          copyExamples: {
            hero: 'Discover Exceptional [Products]',
            cta: 'Shop Now',
            community: 'Join Our VIP List',
          },
        },
        components: [
          'Button',
          'Card',
          'Input',
          'Header',
          'Footer',
          'ProductCard',
          'Cart',
        ],
        version: '1.0.0',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    defaults.forEach((template) => {
      this.templates.set(template.id, template);
    });

    console.log(`✅ Loaded ${defaults.length} default templates`);
  }

  /**
   * Get all available templates
   */
  async getTemplates(
    filter?: {
      category?: string;
      industry?: string;
      style?: string;
    }
  ): Promise<BrandTemplate[]> {
    if (this.templates.size === 0) {
      await this.loadTemplates();
    }

    let templates = Array.from(this.templates.values());

    if (filter) {
      if (filter.category) {
        templates = templates.filter((t) => t.category === filter.category);
      }
      if (filter.industry) {
        templates = templates.filter((t) => t.industry === filter.industry);
      }
      if (filter.style) {
        templates = templates.filter((t) => t.style === filter.style);
      }
    }

    return templates;
  }

  /**
   * Get template by ID
   */
  async getTemplate(id: string): Promise<BrandTemplate | null> {
    if (this.templates.size === 0) {
      await this.loadTemplates();
    }

    return this.templates.get(id) || null;
  }

  /**
   * Instantiate a template with customizations
   */
  async instantiateTemplate(
    templateId: string,
    customizations: TemplateCustomization
  ): Promise<InstantiatedBrand> {
    const template = await this.getTemplate(templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    console.log(`🎨 Instantiating template: ${template.name}`);

    // Merge template with customizations
    const brandAnalysis = this.mergeBrandAnalysis(template, customizations);
    const designTokens = this.generateDesignTokens(brandAnalysis);
    const components = await this.generateComponents(
      template,
      customizations.additionalComponents
    );
    const previewFiles = await this.generatePreviewFiles(brandAnalysis);

    const brandId = this.generateBrandId();

    return {
      brandId,
      template,
      customizations,
      brandAnalysis,
      designTokens,
      components,
      previewFiles,
    };
  }

  /**
   * Merge template with customizations
   */
  private mergeBrandAnalysis(
    template: BrandTemplate,
    customizations: TemplateCustomization
  ): any {
    return {
      brandName: customizations.brandName,
      tagline: customizations.tagline || `Empowering ${customizations.brandName}`,
      colors: {
        ...template.colorPalette,
        ...customizations.colorOverrides,
      },
      typography: {
        ...template.typography,
        ...customizations.typographyOverrides,
      },
      personality: [
        ...template.personality,
        ...(customizations.personalityAdjustments || []),
      ],
      messaging: template.messaging,
      style: template.style,
      industry: template.industry,
    };
  }

  /**
   * Generate design tokens from brand analysis
   */
  private generateDesignTokens(brandAnalysis: any): any {
    return {
      $schema: 'https://design-tokens.org/schema/version/1.0.0',
      color: {
        brand: {
          primary: { $value: brandAnalysis.colors.primary, $type: 'color' },
          secondary: { $value: brandAnalysis.colors.secondary, $type: 'color' },
          accent: { $value: brandAnalysis.colors.accent, $type: 'color' },
        },
        background: {
          primary: { $value: brandAnalysis.colors.background, $type: 'color' },
        },
        text: {
          primary: { $value: brandAnalysis.colors.text, $type: 'color' },
        },
      },
      typography: {
        'font-family': {
          heading: {
            $value: brandAnalysis.typography.headingFont,
            $type: 'fontFamily',
          },
          body: {
            $value: brandAnalysis.typography.bodyFont,
            $type: 'fontFamily',
          },
        },
      },
    };
  }

  /**
   * Generate components from template
   */
  private async generateComponents(
    template: BrandTemplate,
    additionalComponents?: string[]
  ): Promise<any[]> {
    const componentNames = [
      ...template.components,
      ...(additionalComponents || []),
    ];

    // TODO: Implement actual component generation
    return componentNames.map((name) => ({
      name,
      code: `// ${name} component`,
      filename: `${name}.tsx`,
    }));
  }

  /**
   * Generate preview files (HTML pages)
   */
  private async generatePreviewFiles(brandAnalysis: any): Promise<string[]> {
    const files = ['index.html', 'about.html', 'contact.html'];

    // TODO: Implement actual HTML generation using Handlebars
    return files;
  }

  /**
   * Save instantiated brand to disk
   */
  async saveBrand(brand: InstantiatedBrand, outputDir: string): Promise<void> {
    console.log(`💾 Saving brand to ${outputDir}...`);

    const brandDir = path.join(outputDir, brand.brandId);
    await fs.mkdir(brandDir, { recursive: true });

    // Save brand analysis
    await fs.writeFile(
      path.join(brandDir, 'brand-analysis.json'),
      JSON.stringify(brand.brandAnalysis, null, 2)
    );

    // Save design tokens
    await fs.writeFile(
      path.join(brandDir, 'design-tokens.json'),
      JSON.stringify(brand.designTokens, null, 2)
    );

    // Save components
    const componentsDir = path.join(brandDir, 'components');
    await fs.mkdir(componentsDir, { recursive: true });

    for (const component of brand.components) {
      await fs.writeFile(
        path.join(componentsDir, component.filename),
        component.code
      );
    }

    console.log(`✅ Brand saved to ${brandDir}`);
  }

  /**
   * Create a new template from a brand
   */
  async createTemplate(
    brandAnalysis: any,
    metadata: {
      name: string;
      description: string;
      category: string;
      industry?: string;
    }
  ): Promise<BrandTemplate> {
    const template: BrandTemplate = {
      id: this.generateTemplateId(),
      name: metadata.name,
      description: metadata.description,
      category: metadata.category as any,
      industry: metadata.industry,
      style: brandAnalysis.style,
      colorPalette: brandAnalysis.colors,
      typography: brandAnalysis.typography,
      personality: brandAnalysis.personality,
      messaging: brandAnalysis.messaging,
      components: ['Button', 'Card', 'Input', 'Header', 'Footer'],
      version: '1.0.0',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save template
    const templatePath = path.join(this.templatesDir, `${template.id}.json`);
    await fs.mkdir(this.templatesDir, { recursive: true });
    await fs.writeFile(templatePath, JSON.stringify(template, null, 2));

    // Add to cache
    this.templates.set(template.id, template);

    console.log(`✅ Template created: ${template.name}`);

    return template;
  }

  /**
   * Generate unique brand ID
   */
  private generateBrandId(): string {
    return `brand_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }

  /**
   * Generate unique template ID
   */
  private generateTemplateId(): string {
    return `template_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }
}

/**
 * Factory function to create template system
 */
export function createTemplateSystem(templatesDir?: string): TemplateSystem {
  return new TemplateSystem(templatesDir);
}

/**
 * Quick instantiation function
 */
export async function quickInstantiate(
  templateId: string,
  brandName: string,
  customizations?: Partial<TemplateCustomization>
): Promise<InstantiatedBrand> {
  const system = createTemplateSystem();
  await system.loadTemplates();

  return await system.instantiateTemplate(templateId, {
    brandName,
    ...customizations,
  });
}
