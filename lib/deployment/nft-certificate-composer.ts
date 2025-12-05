/**
 * NFT Certificate Composer
 * Combines screenshot with commemorative template for Monad Blitz SF #18
 */

import { readFile } from 'fs/promises';
import { join } from 'path';

export interface CertificateData {
  brandName: string;
  subdomain: string;
  generationDate: Date;
  screenshotBase64?: string;
}

/**
 * Load SVG template
 */
async function loadSVGTemplate(): Promise<string> {
  const templatePath = join(process.cwd(), 'public', 'nft-certificate-template.svg');
  return await readFile(templatePath, 'utf-8');
}

/**
 * Replace dynamic placeholders in SVG template
 */
function replacePlaceholders(
  svg: string,
  data: CertificateData
): string {
  const formattedDate = data.generationDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  let result = svg;

  // Replace brand name
  result = result.replace('[Brand Name]', escapeXML(data.brandName));

  // Replace subdomain
  result = result.replace('brand.machups.com', `${data.subdomain}.machups.com`);

  // Replace generation date
  result = result.replace('Generated December 4, 2025', `Generated ${formattedDate}`);

  return result;
}

/**
 * Embed screenshot as base64 image in SVG
 */
function embedScreenshot(
  svg: string,
  screenshotBase64: string
): string {
  // Find the screenshot placeholder rect and replace with image
  const screenshotImageTag = `
    <image
      href="data:image/png;base64,${screenshotBase64}"
      x="0"
      y="0"
      width="750"
      height="394"
      preserveAspectRatio="xMidYMid slice"
      style="border-radius: 12px;"
    />
  `;

  // Replace the placeholder text inside screenshot-container
  return svg.replace(
    /<rect width="750" height="394"[^>]*>[\s\S]*?<\/text>/,
    `<rect width="750" height="394" rx="12" fill="#1E293B" stroke="#475569" stroke-width="2"/>${screenshotImageTag}`
  );
}

/**
 * Escape XML special characters
 */
function escapeXML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate complete NFT certificate SVG
 */
export async function generateCertificateSVG(
  data: CertificateData
): Promise<string> {
  let svg = await loadSVGTemplate();

  // Replace dynamic text
  svg = replacePlaceholders(svg, data);

  // Embed screenshot if provided
  if (data.screenshotBase64) {
    svg = embedScreenshot(svg, data.screenshotBase64);
  }

  return svg;
}

/**
 * Convert screenshot buffer to base64
 */
export function screenshotToBase64(buffer: Buffer): string {
  return buffer.toString('base64');
}

/**
 * Generate NFT certificate with screenshot
 */
export async function createNFTCertificate(
  brandName: string,
  subdomain: string,
  screenshotBuffer: Buffer,
  generationDate: Date = new Date()
): Promise<Buffer> {
  const screenshotBase64 = screenshotToBase64(screenshotBuffer);

  const svg = await generateCertificateSVG({
    brandName,
    subdomain,
    generationDate,
    screenshotBase64
  });

  // Return SVG as buffer
  // In production, you might want to convert this to PNG using sharp or similar
  return Buffer.from(svg, 'utf-8');
}

/**
 * Generate multiple certificate sizes
 */
export async function generateCertificateSizes(
  brandName: string,
  subdomain: string,
  screenshotBuffer: Buffer
): Promise<Map<string, Buffer>> {
  const certificates = new Map<string, Buffer>();

  // Original size (1200x1200)
  const original = await createNFTCertificate(brandName, subdomain, screenshotBuffer);
  certificates.set('original', original);

  // TODO: Generate additional sizes using image processing library (sharp)
  // For now, just return the original
  /*
  import sharp from 'sharp';

  const sizes = [
    { name: 'large', width: 1200, height: 1200 },
    { name: 'medium', width: 600, height: 600 },
    { name: 'small', width: 300, height: 300 },
    { name: 'thumbnail', width: 150, height: 150 }
  ];

  for (const size of sizes) {
    const resized = await sharp(original)
      .resize(size.width, size.height, { fit: 'contain' })
      .png()
      .toBuffer();

    certificates.set(size.name, resized);
  }
  */

  return certificates;
}

/**
 * Validate certificate data
 */
export function validateCertificateData(data: CertificateData): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.brandName || data.brandName.trim().length === 0) {
    errors.push('Brand name is required');
  }

  if (data.brandName && data.brandName.length > 50) {
    errors.push('Brand name must be 50 characters or less');
  }

  if (!data.subdomain || !/^[a-z0-9-]+$/.test(data.subdomain)) {
    errors.push('Invalid subdomain format');
  }

  if (!data.generationDate || isNaN(data.generationDate.getTime())) {
    errors.push('Invalid generation date');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
