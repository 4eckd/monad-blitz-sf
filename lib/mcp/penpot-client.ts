/**
 * Penpot MCP Client
 *
 * Integrates with Penpot via Model Context Protocol (MCP) to:
 * - Create design files
 * - Generate mockups from brand tokens
 * - Sync design libraries
 * - Export assets
 */

import { Client } from '@modelcontextprotocol/sdk/client';
// @ts-expect-error - StdioClientTransport is not exported in package.json but exists
import { StdioClientTransport } from '@modelcontextprotocol/sdk/dist/esm/client/stdio.js';

export interface PenpotConfig {
  serverUrl: string;
  apiKey?: string;
  workspaceId?: string;
}

export interface DesignTokens {
  colors: Record<string, any>;
  typography: Record<string, any>;
  spacing: Record<string, any>;
  borderRadius: Record<string, any>;
  shadows: Record<string, any>;
}

export interface BrandAssets {
  brandName: string;
  tagline?: string;
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
  };
}

export interface PenpotFile {
  id: string;
  name: string;
  url: string;
  pages: PenpotPage[];
}

export interface PenpotPage {
  id: string;
  name: string;
  frames: PenpotFrame[];
}

export interface PenpotFrame {
  id: string;
  name: string;
  width: number;
  height: number;
  thumbnail?: string;
}

export interface MockupExport {
  format: 'png' | 'svg' | 'pdf';
  scale: number;
  quality: number;
}

export class PenpotMCPClient {
  private client: Client | null = null;
  private config: PenpotConfig;
  private connected: boolean = false;

  constructor(config: PenpotConfig) {
    this.config = config;
  }

  /**
   * Initialize the MCP client connection
   */
  async connect(): Promise<void> {
    try {
      const transport = new StdioClientTransport({
        command: 'penpot-mcp-server',
        args: ['--url', this.config.serverUrl],
        env: {
          PENPOT_API_KEY: this.config.apiKey || '',
          PENPOT_WORKSPACE_ID: this.config.workspaceId || '',
        },
      });

      this.client = new Client(
        {
          name: 'machups-penpot-client',
          version: '1.0.0',
        },
        {
          capabilities: {},
        }
      );

      await this.client.connect(transport);
      this.connected = true;
      console.log('✅ Connected to Penpot MCP server');
    } catch (error) {
      console.error('❌ Failed to connect to Penpot MCP server:', error);
      throw error;
    }
  }

  /**
   * Disconnect from the MCP server
   */
  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.connected = false;
      console.log('🔌 Disconnected from Penpot MCP server');
    }
  }

  /**
   * Check if client is connected
   */
  isConnected(): boolean {
    return this.connected;
  }

  /**
   * Create a new Penpot design file
   */
  async createDesignFile(
    name: string,
    brandAssets: BrandAssets
  ): Promise<PenpotFile> {
    this.ensureConnected();

    try {
      const result = await this.client!.callTool({
        name: 'create_file',
        arguments: {
          name,
          workspace_id: this.config.workspaceId,
          brand_assets: brandAssets,
        },
      });

      return this.parseToolResult(result);
    } catch (error) {
      console.error('❌ Failed to create design file:', error);
      throw error;
    }
  }

  /**
   * Generate mockups from design tokens
   */
  async generateMockups(
    fileId: string,
    tokens: DesignTokens,
    templates: string[]
  ): Promise<PenpotFrame[]> {
    this.ensureConnected();

    try {
      const result = await this.client!.callTool({
        name: 'generate_mockups',
        arguments: {
          file_id: fileId,
          design_tokens: tokens,
          templates,
        },
      });

      return this.parseToolResult(result);
    } catch (error) {
      console.error('❌ Failed to generate mockups:', error);
      throw error;
    }
  }

  /**
   * Create a design library from tokens
   */
  async createLibrary(
    name: string,
    tokens: DesignTokens
  ): Promise<{ libraryId: string; componentsCreated: number }> {
    this.ensureConnected();

    try {
      const result = await this.client!.callTool({
        name: 'create_library',
        arguments: {
          name,
          workspace_id: this.config.workspaceId,
          design_tokens: tokens,
        },
      });

      return this.parseToolResult(result);
    } catch (error) {
      console.error('❌ Failed to create library:', error);
      throw error;
    }
  }

  /**
   * Sync design tokens to existing file
   */
  async syncTokens(fileId: string, tokens: DesignTokens): Promise<boolean> {
    this.ensureConnected();

    try {
      const result = await this.client!.callTool({
        name: 'sync_tokens',
        arguments: {
          file_id: fileId,
          design_tokens: tokens,
        },
      });

      return this.parseToolResult(result);
    } catch (error) {
      console.error('❌ Failed to sync tokens:', error);
      throw error;
    }
  }

  /**
   * Export frames/pages as images
   */
  async exportMockups(
    fileId: string,
    frameIds: string[],
    exportOptions: MockupExport
  ): Promise<{ [frameId: string]: string }> {
    this.ensureConnected();

    try {
      const result = await this.client!.callTool({
        name: 'export_frames',
        arguments: {
          file_id: fileId,
          frame_ids: frameIds,
          format: exportOptions.format,
          scale: exportOptions.scale,
          quality: exportOptions.quality,
        },
      });

      return this.parseToolResult(result);
    } catch (error) {
      console.error('❌ Failed to export mockups:', error);
      throw error;
    }
  }

  /**
   * Get file information
   */
  async getFile(fileId: string): Promise<PenpotFile> {
    this.ensureConnected();

    try {
      const result = await this.client!.callTool({
        name: 'get_file',
        arguments: {
          file_id: fileId,
        },
      });

      return this.parseToolResult(result);
    } catch (error) {
      console.error('❌ Failed to get file:', error);
      throw error;
    }
  }

  /**
   * List available mockup templates
   */
  async listTemplates(): Promise<string[]> {
    this.ensureConnected();

    try {
      const result = await this.client!.callTool({
        name: 'list_templates',
        arguments: {},
      });

      return this.parseToolResult(result);
    } catch (error) {
      console.error('❌ Failed to list templates:', error);
      throw error;
    }
  }

  /**
   * Create components from React component definitions
   */
  async createComponents(
    fileId: string,
    components: Array<{
      name: string;
      props: string[];
      variants: string[];
    }>
  ): Promise<string[]> {
    this.ensureConnected();

    try {
      const result = await this.client!.callTool({
        name: 'create_components',
        arguments: {
          file_id: fileId,
          components,
        },
      });

      return this.parseToolResult(result);
    } catch (error) {
      console.error('❌ Failed to create components:', error);
      throw error;
    }
  }

  /**
   * Generate logo variations in Penpot
   */
  async generateLogos(
    fileId: string,
    brandAssets: BrandAssets,
    variations: ('wordmark' | 'combination' | 'badge')[]
  ): Promise<PenpotFrame[]> {
    this.ensureConnected();

    try {
      const result = await this.client!.callTool({
        name: 'generate_logos',
        arguments: {
          file_id: fileId,
          brand_assets: brandAssets,
          variations,
        },
      });

      return this.parseToolResult(result);
    } catch (error) {
      console.error('❌ Failed to generate logos:', error);
      throw error;
    }
  }

  /**
   * Ensure the client is connected before operations
   */
  private ensureConnected(): void {
    if (!this.connected || !this.client) {
      throw new Error('Penpot MCP client is not connected. Call connect() first.');
    }
  }

  /**
   * Parse tool result from MCP response
   */
  private parseToolResult(result: any): any {
    if (result.isError) {
      throw new Error(`Penpot MCP error: ${result.content}`);
    }

    // MCP returns content as an array of text/image objects
    const content = result.content;
    if (Array.isArray(content) && content.length > 0) {
      // Assuming first item is JSON text
      const firstItem = content[0];
      if (firstItem.type === 'text') {
        try {
          return JSON.parse(firstItem.text);
        } catch {
          return firstItem.text;
        }
      }
    }

    return content;
  }
}

/**
 * Factory function to create and connect a Penpot MCP client
 */
export async function createPenpotClient(
  config: PenpotConfig
): Promise<PenpotMCPClient> {
  const client = new PenpotMCPClient(config);
  await client.connect();
  return client;
}

/**
 * Helper to convert W3C DTCG tokens to Penpot-compatible format
 */
export function convertTokensToPenpot(tokens: any): DesignTokens {
  return {
    colors: extractColors(tokens.color),
    typography: extractTypography(tokens.typography),
    spacing: extractSpacing(tokens.spacing),
    borderRadius: extractBorderRadius(tokens['border-radius']),
    shadows: extractShadows(tokens.shadow),
  };
}

function extractColors(colorTokens: any): Record<string, any> {
  const colors: Record<string, any> = {};

  function flatten(obj: any, prefix: string = '') {
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (value && typeof value === 'object' && '$value' in value) {
        colors[newKey] = value.$value;
      } else if (value && typeof value === 'object') {
        flatten(value, newKey);
      }
    }
  }

  flatten(colorTokens);
  return colors;
}

function extractTypography(typographyTokens: any): Record<string, any> {
  const typography: Record<string, any> = {};

  function flatten(obj: any, prefix: string = '') {
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (value && typeof value === 'object' && '$value' in value) {
        typography[newKey] = value.$value;
      } else if (value && typeof value === 'object') {
        flatten(value, newKey);
      }
    }
  }

  flatten(typographyTokens);
  return typography;
}

function extractSpacing(spacingTokens: any): Record<string, any> {
  const spacing: Record<string, any> = {};

  for (const [key, value] of Object.entries(spacingTokens)) {
    if (value && typeof value === 'object' && '$value' in value) {
      spacing[key] = (value as any).$value;
    }
  }

  return spacing;
}

function extractBorderRadius(radiusTokens: any): Record<string, any> {
  const borderRadius: Record<string, any> = {};

  for (const [key, value] of Object.entries(radiusTokens)) {
    if (value && typeof value === 'object' && '$value' in value) {
      borderRadius[key] = (value as any).$value;
    }
  }

  return borderRadius;
}

function extractShadows(shadowTokens: any): Record<string, any> {
  const shadows: Record<string, any> = {};

  for (const [key, value] of Object.entries(shadowTokens)) {
    if (value && typeof value === 'object' && '$value' in value) {
      shadows[key] = (value as any).$value;
    }
  }

  return shadows;
}
