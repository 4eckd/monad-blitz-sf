/**
 * Mock Penpot MCP Server
 *
 * Simulates Penpot MCP server responses for testing the integration
 * without requiring actual Penpot account or MCP server installation.
 *
 * This allows us to:
 * - Test the sync workflow end-to-end
 * - Demonstrate Claude API integration
 * - Generate mock design files
 * - Validate integration logic
 */

import { DesignTokens, BrandAssets, PenpotFile, PenpotPage, PenpotFrame } from './penpot-client';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

export interface MockPenpotServerConfig {
  mockDataDir?: string;
  generateMockFiles?: boolean;
  verbose?: boolean;
}

export class MockPenpotServer {
  private config: MockPenpotServerConfig;
  private mockFiles: Map<string, PenpotFile> = new Map();
  private mockLibraries: Map<string, any> = new Map();

  constructor(config: MockPenpotServerConfig = {}) {
    this.config = {
      mockDataDir: config.mockDataDir || './mock-penpot-data',
      generateMockFiles: config.generateMockFiles ?? true,
      verbose: config.verbose ?? false,
    };

    this.initializeMockData();
  }

  private initializeMockData(): void {
    if (this.config.generateMockFiles && this.config.mockDataDir) {
      // Create mock data directory
      if (!fs.existsSync(this.config.mockDataDir)) {
        fs.mkdirSync(this.config.mockDataDir, { recursive: true });
      }
    }
  }

  private log(message: string): void {
    if (this.config.verbose) {
      console.log(`[MockPenpot] ${message}`);
    }
  }

  private generateId(prefix: string = 'mock'): string {
    return `${prefix}-${crypto.randomBytes(8).toString('hex')}`;
  }

  /**
   * Simulate creating a design file
   */
  async createDesignFile(name: string, brandAssets: BrandAssets): Promise<PenpotFile> {
    this.log(`Creating design file: ${name}`);

    const fileId = this.generateId('file');
    const file: PenpotFile = {
      id: fileId,
      name,
      url: `https://design.penpot.app/workspace/mock/file/${fileId}`,
      pages: [
        {
          id: this.generateId('page'),
          name: 'Colors & Typography',
          frames: this.generateColorTypographyFrames(brandAssets),
        },
        {
          id: this.generateId('page'),
          name: 'Components',
          frames: this.generateComponentFrames(brandAssets),
        },
        {
          id: this.generateId('page'),
          name: 'Logos',
          frames: this.generateLogoFrames(brandAssets),
        },
        {
          id: this.generateId('page'),
          name: 'Mockups',
          frames: this.generateMockupFrames(brandAssets),
        },
      ],
    };

    this.mockFiles.set(fileId, file);

    // Save mock file data
    if (this.config.generateMockFiles) {
      this.saveMockFile(fileId, file);
    }

    this.log(`✅ Created file: ${fileId}`);
    return file;
  }

  /**
   * Simulate creating a design library
   */
  async createLibrary(name: string, tokens: DesignTokens): Promise<{ libraryId: string; componentsCreated: number }> {
    this.log(`Creating library: ${name}`);

    const libraryId = this.generateId('lib');
    const componentsCreated = 5; // Button, Card, Input, Header, Footer

    const library = {
      id: libraryId,
      name,
      tokens,
      components: ['Button', 'Card', 'Input', 'Header', 'Footer'],
      createdAt: new Date().toISOString(),
    };

    this.mockLibraries.set(libraryId, library);

    // Save mock library data
    if (this.config.generateMockFiles) {
      this.saveMockLibrary(libraryId, library);
    }

    this.log(`✅ Created library: ${libraryId} with ${componentsCreated} components`);
    return { libraryId, componentsCreated };
  }

  /**
   * Simulate syncing tokens
   */
  async syncTokens(fileId: string, tokens: DesignTokens): Promise<boolean> {
    this.log(`Syncing tokens to file: ${fileId}`);

    const file = this.mockFiles.get(fileId);
    if (!file) {
      throw new Error(`File not found: ${fileId}`);
    }

    // Update mock file with tokens
    (file as any).tokens = tokens;
    (file as any).lastSynced = new Date().toISOString();

    if (this.config.generateMockFiles) {
      this.saveMockFile(fileId, file);
    }

    this.log(`✅ Synced tokens to file: ${fileId}`);
    return true;
  }

  /**
   * Simulate generating logos
   */
  async generateLogos(
    fileId: string,
    brandAssets: BrandAssets,
    variations: ('wordmark' | 'combination' | 'badge')[]
  ): Promise<PenpotFrame[]> {
    this.log(`Generating ${variations.length} logo variations for file: ${fileId}`);

    const frames: PenpotFrame[] = variations.map((variation) => ({
      id: this.generateId('frame'),
      name: `Logo - ${variation.charAt(0).toUpperCase() + variation.slice(1)}`,
      width: variation === 'badge' ? 512 : variation === 'wordmark' ? 800 : 1000,
      height: variation === 'badge' ? 512 : 300,
      thumbnail: this.generateMockLogoThumbnail(brandAssets, variation),
    }));

    this.log(`✅ Generated ${frames.length} logos`);
    return frames;
  }

  /**
   * Simulate creating components
   */
  async createComponents(
    fileId: string,
    components: Array<{ name: string; props: string[]; variants: string[] }>
  ): Promise<string[]> {
    this.log(`Creating ${components.length} components for file: ${fileId}`);

    const componentIds = components.map((comp) => {
      const id = this.generateId('component');
      this.log(`  - ${comp.name} (${comp.variants.length} variants)`);
      return id;
    });

    this.log(`✅ Created ${componentIds.length} components`);
    return componentIds;
  }

  /**
   * Simulate generating mockups
   */
  async generateMockups(fileId: string, tokens: DesignTokens, templates: string[]): Promise<PenpotFrame[]> {
    this.log(`Generating ${templates.length} mockups for file: ${fileId}`);

    const frames: PenpotFrame[] = templates.map((template) => ({
      id: this.generateId('frame'),
      name: template
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
      width: 1440,
      height: template === 'dashboard' ? 900 : template === 'nft-mint' ? 1200 : 3200,
      thumbnail: this.generateMockMockupThumbnail(template),
    }));

    this.log(`✅ Generated ${frames.length} mockups`);
    return frames;
  }

  /**
   * Simulate exporting frames
   */
  async exportFrames(
    fileId: string,
    frameIds: string[],
    format: 'png' | 'svg' | 'pdf',
    scale: number = 1,
    quality: number = 90
  ): Promise<{ [frameId: string]: string }> {
    this.log(`Exporting ${frameIds.length} frames as ${format.toUpperCase()}`);

    const exports: { [frameId: string]: string } = {};

    for (const frameId of frameIds) {
      // Generate mock base64 data
      const mockData = this.generateMockExport(format);
      exports[frameId] = mockData;
    }

    this.log(`✅ Exported ${frameIds.length} frames`);
    return exports;
  }

  /**
   * Simulate getting file info
   */
  async getFile(fileId: string): Promise<PenpotFile> {
    this.log(`Getting file: ${fileId}`);

    const file = this.mockFiles.get(fileId);
    if (!file) {
      throw new Error(`File not found: ${fileId}`);
    }

    return file;
  }

  /**
   * Simulate listing templates
   */
  async listTemplates(): Promise<string[]> {
    this.log('Listing available templates');

    const templates = ['landing-page', 'dashboard', 'nft-mint', 'saas-app', 'e-commerce', 'portfolio'];

    this.log(`✅ Found ${templates.length} templates`);
    return templates;
  }

  // Helper methods

  private generateColorTypographyFrames(brandAssets: BrandAssets): PenpotFrame[] {
    return [
      {
        id: this.generateId('frame'),
        name: 'Color Palette',
        width: 1200,
        height: 800,
      },
      {
        id: this.generateId('frame'),
        name: 'Typography Scale',
        width: 1200,
        height: 1000,
      },
    ];
  }

  private generateComponentFrames(brandAssets: BrandAssets): PenpotFrame[] {
    return [
      {
        id: this.generateId('frame'),
        name: 'Buttons',
        width: 1000,
        height: 600,
      },
      {
        id: this.generateId('frame'),
        name: 'Cards',
        width: 1000,
        height: 800,
      },
      {
        id: this.generateId('frame'),
        name: 'Inputs',
        width: 1000,
        height: 600,
      },
      {
        id: this.generateId('frame'),
        name: 'Navigation',
        width: 1440,
        height: 400,
      },
    ];
  }

  private generateLogoFrames(brandAssets: BrandAssets): PenpotFrame[] {
    return [
      {
        id: this.generateId('frame'),
        name: 'Logo - Wordmark',
        width: 800,
        height: 300,
      },
      {
        id: this.generateId('frame'),
        name: 'Logo - Combination',
        width: 1000,
        height: 300,
      },
      {
        id: this.generateId('frame'),
        name: 'Logo - Badge',
        width: 512,
        height: 512,
      },
    ];
  }

  private generateMockupFrames(brandAssets: BrandAssets): PenpotFrame[] {
    return [
      {
        id: this.generateId('frame'),
        name: 'Landing Page',
        width: 1440,
        height: 3200,
      },
      {
        id: this.generateId('frame'),
        name: 'Dashboard',
        width: 1440,
        height: 900,
      },
      {
        id: this.generateId('frame'),
        name: 'NFT Mint Page',
        width: 1440,
        height: 1200,
      },
    ];
  }

  private generateMockLogoThumbnail(brandAssets: BrandAssets, variation: string): string {
    // In a real implementation, this would generate an actual thumbnail
    // For now, return a data URL placeholder
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"><text x="50%" y="50%" text-anchor="middle" fill="${brandAssets.colors.primary}">${brandAssets.brandName}</text></svg>`;
  }

  private generateMockMockupThumbnail(template: string): string {
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150"><rect width="200" height="150" fill="%23f0f0f0"/><text x="50%" y="50%" text-anchor="middle">${template}</text></svg>`;
  }

  private generateMockExport(format: string): string {
    // Generate tiny mock data (1x1 pixel)
    if (format === 'png') {
      // Tiny 1x1 transparent PNG
      return 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    } else if (format === 'svg') {
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"></svg>';
      return Buffer.from(svg).toString('base64');
    } else {
      // PDF placeholder
      return Buffer.from('Mock PDF data').toString('base64');
    }
  }

  private saveMockFile(fileId: string, file: PenpotFile): void {
    const filePath = path.join(this.config.mockDataDir!, `file-${fileId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(file, null, 2));
    this.log(`Saved mock file to: ${filePath}`);
  }

  private saveMockLibrary(libraryId: string, library: any): void {
    const filePath = path.join(this.config.mockDataDir!, `library-${libraryId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(library, null, 2));
    this.log(`Saved mock library to: ${filePath}`);
  }

  /**
   * Get all mock files for inspection
   */
  getAllMockFiles(): PenpotFile[] {
    return Array.from(this.mockFiles.values());
  }

  /**
   * Get all mock libraries for inspection
   */
  getAllMockLibraries(): any[] {
    return Array.from(this.mockLibraries.values());
  }

  /**
   * Clear all mock data
   */
  clearMockData(): void {
    this.mockFiles.clear();
    this.mockLibraries.clear();
    this.log('Cleared all mock data');
  }
}

/**
 * Create a mock Penpot server instance
 */
export function createMockPenpotServer(config?: MockPenpotServerConfig): MockPenpotServer {
  return new MockPenpotServer(config);
}
