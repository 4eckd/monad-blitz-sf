/**
 * Screenshot capture system for MACHUPS Auto-Deploy
 * Uses Puppeteer to capture high-quality screenshots for NFT metadata and previews
 */

import puppeteer, { type Browser, type Page } from 'puppeteer';
import type { ScreenshotConfig, ScreenshotMetadata } from './types';

const DEFAULT_SCREENSHOT_CONFIG: ScreenshotConfig = {
  viewport: {
    width: 1200,
    height: 630,
    deviceScaleFactor: 2
  },
  waitForTimeout: 5000,
  waitForSelector: '[data-brand-loaded]'
};

/**
 * Screenshot Capture Class
 */
export class ScreenshotCapture {
  private browser: Browser | null = null;

  /**
   * Initialize Puppeteer browser instance
   */
  async init(): Promise<void> {
    if (this.browser) return;

    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });
  }

  /**
   * Close browser instance
   */
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  /**
   * Capture screenshot of deployed brand
   */
  async capture(
    url: string,
    config: Partial<ScreenshotConfig> = {}
  ): Promise<Buffer> {
    if (!this.browser) {
      await this.init();
    }

    const finalConfig = { ...DEFAULT_SCREENSHOT_CONFIG, ...config };
    const page = await this.browser!.newPage();

    try {
      // Set viewport
      await page.setViewport(finalConfig.viewport);

      // Navigate to URL
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Hide unwanted elements
      if (finalConfig.hideElements && finalConfig.hideElements.length > 0) {
        await page.evaluate((selectors) => {
          selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
              (el as HTMLElement).style.display = 'none';
            });
          });
        }, finalConfig.hideElements);
      }

      // Wait for specific selector if provided
      if (finalConfig.waitForSelector) {
        try {
          await page.waitForSelector(finalConfig.waitForSelector, {
            timeout: finalConfig.waitForTimeout
          });
        } catch {
          console.warn(`Selector ${finalConfig.waitForSelector} not found, continuing anyway`);
        }
      } else {
        // Just wait for timeout
        await new Promise(resolve => setTimeout(resolve, finalConfig.waitForTimeout));
      }

      // Wait for fonts to load
      await page.evaluateHandle('document.fonts.ready');

      // Wait for LCP (Largest Contentful Paint)
      await page.evaluate(() => {
        return new Promise<void>(resolve => {
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) {
              resolve();
            }
          }).observe({ entryTypes: ['largest-contentful-paint'] });

          // Fallback timeout
          setTimeout(resolve, 3000);
        });
      });

      // Capture screenshot
      const screenshot = await page.screenshot({
        type: 'png',
        clip: finalConfig.clip,
        fullPage: false
      });

      return screenshot as Buffer;

    } finally {
      await page.close();
    }
  }

  /**
   * Capture multiple viewport sizes (responsive screenshots)
   */
  async captureMultiple(
    url: string,
    viewports: Array<{ width: number; height: number; name: string }>
  ): Promise<Map<string, Buffer>> {
    const screenshots = new Map<string, Buffer>();

    for (const viewport of viewports) {
      const screenshot = await this.capture(url, {
        viewport: {
          ...viewport,
          deviceScaleFactor: 2
        }
      });

      screenshots.set(viewport.name, screenshot);
    }

    return screenshots;
  }

  /**
   * Analyze page for optimal screenshot settings
   */
  async analyzePageForOptimalCapture(url: string): Promise<ScreenshotConfig> {
    if (!this.browser) {
      await this.init();
    }

    const page = await this.browser!.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle2' });

      const analysis = await page.evaluate(() => {
        // Find hero section or main content
        const heroSelectors = [
          '[data-hero-section]',
          '[data-section="hero"]',
          'section.hero',
          'div.hero',
          'main > section:first-child',
          'main > div:first-child'
        ];

        let heroElement: Element | null = null;
        for (const selector of heroSelectors) {
          heroElement = document.querySelector(selector);
          if (heroElement) break;
        }

        // Get element to wait for (likely has largest image or main content)
        const waitForSelector = heroElement
          ? Array.from(heroElement.querySelectorAll('img, video, [data-lcp-element]'))
              .map(el => el.getAttribute('data-lcp-element') || el.tagName.toLowerCase())
              [0] || '[data-loaded]'
          : '[data-loaded]';

        // Find elements to hide
        const hideSelectors = [
          '[data-chat-widget]',
          '[data-cookie-banner]',
          '.cookie-notice',
          '#cookie-consent',
          '[data-popup]',
          '.popup-overlay'
        ];

        const hideElements = hideSelectors.filter(selector =>
          document.querySelector(selector) !== null
        );

        // Get optimal clip region (hero section bounds)
        let clip: { x: number; y: number; width: number; height: number } | undefined;
        if (heroElement) {
          const rect = heroElement.getBoundingClientRect();
          clip = {
            x: Math.max(0, rect.left),
            y: Math.max(0, rect.top),
            width: Math.min(1200, rect.width),
            height: Math.min(630, rect.height)
          };
        }

        return {
          waitForSelector,
          hideElements,
          clip
        };
      });

      return {
        viewport: DEFAULT_SCREENSHOT_CONFIG.viewport,
        waitForTimeout: 5000,
        ...analysis
      };

    } finally {
      await page.close();
    }
  }
}

/**
 * Create a singleton instance of ScreenshotCapture
 */
let screenshotCaptureInstance: ScreenshotCapture | null = null;

export function getScreenshotCapture(): ScreenshotCapture {
  if (!screenshotCaptureInstance) {
    screenshotCaptureInstance = new ScreenshotCapture();
  }
  return screenshotCaptureInstance;
}

/**
 * Capture screenshot and return metadata
 */
export async function captureDeploymentScreenshot(
  deploymentUrl: string,
  config?: Partial<ScreenshotConfig>
): Promise<{ buffer: Buffer; metadata: Omit<ScreenshotMetadata, 'url' | 'localPath'> }> {
  const capture = getScreenshotCapture();

  try {
    await capture.init();

    // Analyze page for optimal settings if no config provided
    const finalConfig = config || await capture.analyzePageForOptimalCapture(deploymentUrl);

    // Capture screenshot
    const buffer = await capture.capture(deploymentUrl, finalConfig);

    const metadata: Omit<ScreenshotMetadata, 'url' | 'localPath'> = {
      width: finalConfig.viewport.width,
      height: finalConfig.viewport.height,
      format: 'png',
      size: buffer.length,
      capturedAt: new Date(),
      viewport: finalConfig.viewport
    };

    return { buffer, metadata };

  } catch (error) {
    console.error('Screenshot capture failed:', error);
    throw new Error(`Failed to capture screenshot: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Capture multiple screenshots for different use cases
 */
export async function captureAllScreenshots(
  deploymentUrl: string
): Promise<Map<string, { buffer: Buffer; metadata: Omit<ScreenshotMetadata, 'url' | 'localPath'> }>> {
  const capture = getScreenshotCapture();
  await capture.init();

  const viewports = [
    { width: 1200, height: 630, name: 'og-card' }, // Open Graph
    { width: 1200, height: 630, name: 'nft-image' }, // NFT metadata
    { width: 1920, height: 1080, name: 'desktop' }, // Desktop preview
    { width: 768, height: 1024, name: 'tablet' }, // Tablet preview
    { width: 375, height: 667, name: 'mobile' } // Mobile preview
  ];

  const screenshots = await capture.captureMultiple(deploymentUrl, viewports);
  const results = new Map<string, { buffer: Buffer; metadata: Omit<ScreenshotMetadata, 'url' | 'localPath'> }>();

  screenshots.forEach((buffer, name) => {
    const viewport = viewports.find(v => v.name === name)!;
    results.set(name, {
      buffer,
      metadata: {
        width: viewport.width,
        height: viewport.height,
        format: 'png',
        size: buffer.length,
        capturedAt: new Date(),
        viewport: {
          ...viewport,
          deviceScaleFactor: 2
        }
      }
    });
  });

  return results;
}

/**
 * Cleanup function to close browser on process exit
 */
if (typeof process !== 'undefined') {
  process.on('beforeExit', async () => {
    if (screenshotCaptureInstance) {
      await screenshotCaptureInstance.close();
    }
  });
}
