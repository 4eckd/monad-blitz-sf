/**
 * Sync Gonads.io Design System to Penpot
 *
 * This script:
 * 1. Loads the design system from penpot-design-system.json
 * 2. Converts to Penpot-compatible format
 * 3. Creates/updates Penpot design library
 * 4. Generates mockups and components
 * 5. Exports design files
 */

import { createPenpotClient, convertTokensToPenpot } from '../../lib/mcp/penpot-client';
import * as fs from 'fs';
import * as path from 'path';

// Load design system
const designSystemPath = path.join(__dirname, 'penpot-design-system.json');
const designSystem = JSON.parse(fs.readFileSync(designSystemPath, 'utf-8'));

// Load W3C DTCG tokens
const tokensPath = path.join(__dirname, 'design-tokens.json');
const dtcgTokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));

// Load brand analysis
const analysisPath = path.join(__dirname, 'brand-analysis.json');
const brandAnalysis = JSON.parse(fs.readFileSync(analysisPath, 'utf-8'));

interface SyncOptions {
  createNew?: boolean;
  syncColors?: boolean;
  syncTypography?: boolean;
  syncComponents?: boolean;
  exportMockups?: boolean;
  generateLogos?: boolean;
}

async function syncToPenpot(options: SyncOptions = {}) {
  const {
    createNew = true,
    syncColors = true,
    syncTypography = true,
    syncComponents = true,
    exportMockups = true,
    generateLogos = true,
  } = options;

  console.log('🎨 Starting Penpot sync for GONADS design system...\n');

  try {
    // 1. Connect to Penpot MCP
    console.log('📡 Connecting to Penpot MCP server...');
    const penpot = await createPenpotClient({
      serverUrl: process.env.PENPOT_SERVER_URL || 'https://design.penpot.app',
      apiKey: process.env.PENPOT_API_KEY,
      workspaceId: process.env.PENPOT_WORKSPACE_ID,
    });
    console.log('✅ Connected to Penpot\n');

    // 2. Create or get design file
    let fileId: string;

    if (createNew) {
      console.log('📄 Creating new Penpot design file...');
      const file = await penpot.createDesignFile('GONADS - Design System', {
        brandName: brandAnalysis.brandName,
        tagline: brandAnalysis.tagline,
        colors: {
          primary: brandAnalysis.colorPalette.primary.hex,
          secondary: brandAnalysis.colorPalette.secondary.hex,
          accent: brandAnalysis.colorPalette.accent.hex,
        },
        typography: {
          headingFont: brandAnalysis.typography.headingFont.family,
          bodyFont: brandAnalysis.typography.bodyFont.family,
        },
      });
      fileId = file.id;
      console.log(`✅ Created file: ${file.name} (${fileId})\n`);
    } else {
      // Use existing file ID from environment
      fileId = process.env.PENPOT_FILE_ID!;
      console.log(`📄 Using existing file: ${fileId}\n`);
    }

    // 3. Create design library
    console.log('📚 Creating design library...');
    const penpotTokens = convertTokensToPenpot(dtcgTokens);
    const library = await penpot.createLibrary(
      'GONADS Design System Library',
      penpotTokens
    );
    console.log(`✅ Library created: ${library.libraryId}`);
    console.log(`   Components: ${library.componentsCreated}\n`);

    // 4. Sync design tokens
    if (syncColors || syncTypography) {
      console.log('🎨 Syncing design tokens...');
      await penpot.syncTokens(fileId, penpotTokens);
      console.log('✅ Design tokens synced\n');
    }

    // 5. Generate logos
    if (generateLogos) {
      console.log('🎭 Generating logo variations...');
      const logos = await penpot.generateLogos(
        fileId,
        {
          brandName: brandAnalysis.brandName,
          tagline: brandAnalysis.tagline,
          colors: {
            primary: brandAnalysis.colorPalette.primary.hex,
            secondary: brandAnalysis.colorPalette.secondary.hex,
            accent: brandAnalysis.colorPalette.accent.hex,
          },
          typography: {
            headingFont: brandAnalysis.typography.headingFont.family,
            bodyFont: brandAnalysis.typography.bodyFont.family,
          },
        },
        ['wordmark', 'combination', 'badge']
      );
      console.log(`✅ Generated ${logos.length} logo variations\n`);
    }

    // 6. Create components
    if (syncComponents) {
      console.log('⚛️ Creating React components in Penpot...');
      const componentIds = await penpot.createComponents(fileId, [
        {
          name: 'Button',
          props: ['variant', 'size', 'children'],
          variants: ['primary', 'secondary', 'accent', 'ghost'],
        },
        {
          name: 'Card',
          props: ['variant', 'hoverable', 'children'],
          variants: ['default', 'gradient', 'glow'],
        },
        {
          name: 'Input',
          props: ['type', 'placeholder', 'label', 'error'],
          variants: ['text', 'email', 'password'],
        },
        {
          name: 'Header',
          props: ['walletAddress', 'onConnectWallet'],
          variants: ['with-wallet', 'without-wallet'],
        },
        {
          name: 'Footer',
          props: [],
          variants: ['full'],
        },
      ]);
      console.log(`✅ Created ${componentIds.length} components\n`);
    }

    // 7. Generate mockups
    if (exportMockups) {
      console.log('🖼️ Generating mockups...');

      // Get available templates
      const templates = await penpot.listTemplates();
      console.log(`   Available templates: ${templates.join(', ')}`);

      // Generate mockups using templates
      const mockups = await penpot.generateMockups(
        fileId,
        penpotTokens,
        ['landing-page', 'dashboard', 'nft-mint']
      );
      console.log(`✅ Generated ${mockups.length} mockup frames\n`);

      // Export mockups as PNG
      console.log('💾 Exporting mockups...');
      const frameIds = mockups.map((m) => m.id);
      const exports = await penpot.exportMockups(fileId, frameIds, {
        format: 'png',
        scale: 2,
        quality: 90,
      });

      // Save exports locally
      const exportsDir = path.join(__dirname, 'penpot-exports');
      if (!fs.existsSync(exportsDir)) {
        fs.mkdirSync(exportsDir, { recursive: true });
      }

      let exportCount = 0;
      for (const [frameId, imageData] of Object.entries(exports)) {
        const frame = mockups.find((m) => m.id === frameId);
        if (frame) {
          const filename = `${frame.name.replace(/\s+/g, '-').toLowerCase()}.png`;
          const filepath = path.join(exportsDir, filename);

          // Assuming imageData is base64
          const buffer = Buffer.from(imageData, 'base64');
          fs.writeFileSync(filepath, buffer);
          exportCount++;
        }
      }
      console.log(`✅ Exported ${exportCount} mockups to penpot-exports/\n`);
    }

    // 8. Get final file info
    const finalFile = await penpot.getFile(fileId);
    console.log('📊 Final Penpot File Summary:');
    console.log(`   Name: ${finalFile.name}`);
    console.log(`   URL: ${finalFile.url}`);
    console.log(`   Pages: ${finalFile.pages.length}`);
    console.log(`   Total Frames: ${finalFile.pages.reduce((acc, p) => acc + p.frames.length, 0)}`);

    // Save file info
    const fileInfoPath = path.join(__dirname, 'penpot-file-info.json');
    fs.writeFileSync(
      fileInfoPath,
      JSON.stringify(
        {
          fileId: finalFile.id,
          url: finalFile.url,
          syncedAt: new Date().toISOString(),
          libraryId: library.libraryId,
          componentsCount: library.componentsCreated,
          pages: finalFile.pages.map((p) => ({
            id: p.id,
            name: p.name,
            framesCount: p.frames.length,
          })),
        },
        null,
        2
      )
    );
    console.log(`\n✅ File info saved to penpot-file-info.json`);

    // 9. Disconnect
    await penpot.disconnect();
    console.log('\n🎉 Sync complete!');
    console.log(`\n🔗 View your design system: ${finalFile.url}`);

    return {
      success: true,
      fileId: finalFile.id,
      url: finalFile.url,
      libraryId: library.libraryId,
    };
  } catch (error) {
    console.error('\n❌ Sync failed:', error);
    throw error;
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const options: SyncOptions = {
    createNew: !args.includes('--update'),
    syncColors: !args.includes('--no-colors'),
    syncTypography: !args.includes('--no-typography'),
    syncComponents: !args.includes('--no-components'),
    exportMockups: args.includes('--export-mockups'),
    generateLogos: !args.includes('--no-logos'),
  };

  syncToPenpot(options)
    .then((result) => {
      console.log('\n✨ Success! Design system synced to Penpot');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Error:', error.message);
      process.exit(1);
    });
}

export { syncToPenpot };
