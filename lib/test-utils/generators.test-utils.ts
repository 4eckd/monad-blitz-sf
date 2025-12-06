/**
 * Test Utilities for Phase 2 Generators
 * Common mocks, fixtures, and helpers for testing
 */

import { BrandInput, BrandAnalysis, LogoSet, DesignTokens, ComponentLibrary } from '@/types/brand';
import { createTestBrandColors } from '@/lib/validators/wcag-validator';

// ============================================================================
// MOCK DATA
// ============================================================================

/**
 * Mock brand input for testing
 */
export const MOCK_BRAND_INPUT: BrandInput = {
  businessIdea: 'Sustainable coffee delivery service for urban professionals',
  targetAudience: 'Urban professionals aged 25-40 who value sustainability',
  style: 'modern',
  industry: 'Food & Beverage',
  techStack: 'nextjs'
};

/**
 * Mock brand analysis result
 */
export const MOCK_BRAND_ANALYSIS: BrandAnalysis = {
  name: 'EcoBrew',
  tagline: 'Sustainable Coffee, Delivered Fresh',
  colors: createTestBrandColors(true),
  typography: {
    heading: 'Inter',
    body: 'Open Sans'
  },
  personality: ['Sustainable', 'Modern', 'Reliable', 'Fresh'],
  messaging: [
    'Eco-friendly coffee sourcing',
    'Carbon-neutral delivery',
    'Supporting local roasters',
    'Freshly roasted beans'
  ],
  createdAt: new Date('2025-12-06T12:00:00Z')
};

/**
 * Alternative mock brand analysis (different style)
 */
export const MOCK_BRAND_ANALYSIS_BOLD: BrandAnalysis = {
  name: 'Gonads',
  tagline: 'Boldly Memetic',
  colors: {
    primary: '#FF6B00',
    secondary: '#9333EA',
    accent: '#EC4899',
    neutrals: ['#FAFAFA', '#F5F5F5', '#E5E5E5', '#525252', '#171717']
  },
  typography: {
    heading: 'Poppins',
    body: 'Roboto'
  },
  personality: ['Bold', 'Playful', 'Edgy', 'Memorable'],
  messaging: [
    'Embracing meme culture',
    'Colorfully morbid',
    'Web3 native identity',
    'Community-driven'
  ],
  createdAt: new Date('2025-12-06T12:00:00Z')
};

// ============================================================================
// FACTORY FUNCTIONS
// ============================================================================

/**
 * Creates a mock BrandInput with custom overrides
 * @param overrides - Partial BrandInput to override defaults
 * @returns Complete BrandInput
 */
export function createMockBrandInput(
  overrides?: Partial<BrandInput>
): BrandInput {
  return {
    ...MOCK_BRAND_INPUT,
    ...overrides
  };
}

/**
 * Creates a mock BrandAnalysis with custom overrides
 * @param overrides - Partial BrandAnalysis to override defaults
 * @returns Complete BrandAnalysis
 */
export function createMockBrandAnalysis(
  overrides?: Partial<BrandAnalysis>
): BrandAnalysis {
  return {
    ...MOCK_BRAND_ANALYSIS,
    ...overrides
  };
}

/**
 * Creates multiple mock BrandInputs for testing different scenarios
 * @returns Array of BrandInputs covering various use cases
 */
export function createBrandInputTestCases(): BrandInput[] {
  return [
    // Modern tech startup
    {
      businessIdea: 'AI-powered task management for remote teams',
      targetAudience: 'Remote workers and distributed teams',
      style: 'modern',
      industry: 'Technology',
      techStack: 'nextjs'
    },

    // Classic luxury brand
    {
      businessIdea: 'Handcrafted leather goods',
      targetAudience: 'Affluent professionals seeking quality',
      style: 'classic',
      industry: 'Fashion',
      techStack: 'react-typescript'
    },

    // Bold fitness brand
    {
      businessIdea: 'High-intensity workout studio',
      targetAudience: 'Fitness enthusiasts aged 20-35',
      style: 'bold',
      industry: 'Fitness',
      techStack: 'nextjs'
    },

    // Minimal design agency
    {
      businessIdea: 'Minimalist web design studio',
      targetAudience: 'Startups and small businesses',
      style: 'minimal',
      industry: 'Design',
      techStack: 'react-typescript'
    }
  ];
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validates BrandAnalysis structure
 * @param analysis - Brand analysis to validate
 * @returns Validation result
 */
export function validateBrandAnalysisStructure(
  analysis: BrandAnalysis
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check required fields
  if (!analysis.name || analysis.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!analysis.tagline || analysis.tagline.trim().length === 0) {
    errors.push('Tagline is required');
  }

  if (!analysis.colors) {
    errors.push('Colors are required');
  } else {
    if (!analysis.colors.primary?.match(/^#[0-9A-F]{6}$/i)) {
      errors.push('Primary color must be valid hex');
    }
    if (!analysis.colors.secondary?.match(/^#[0-9A-F]{6}$/i)) {
      errors.push('Secondary color must be valid hex');
    }
    if (!analysis.colors.accent?.match(/^#[0-9A-F]{6}$/i)) {
      errors.push('Accent color must be valid hex');
    }
    if (!Array.isArray(analysis.colors.neutrals) || analysis.colors.neutrals.length < 3) {
      errors.push('Neutrals must be array with at least 3 colors');
    }
  }

  if (!analysis.typography) {
    errors.push('Typography is required');
  } else {
    if (!analysis.typography.heading) {
      errors.push('Heading font is required');
    }
    if (!analysis.typography.body) {
      errors.push('Body font is required');
    }
  }

  if (!Array.isArray(analysis.personality) || analysis.personality.length < 3) {
    errors.push('Personality must have at least 3 traits');
  }

  if (!Array.isArray(analysis.messaging) || analysis.messaging.length < 3) {
    errors.push('Messaging must have at least 3 points');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validates LogoSet structure
 * @param logos - Logo set to validate
 * @returns Validation result
 */
export function validateLogoSetStructure(
  logos: LogoSet
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check all three logo types exist
  if (!logos.wordmark) {
    errors.push('Wordmark logo is missing');
  }
  if (!logos.icon) {
    errors.push('Icon logo is missing');
  }
  if (!logos.combination) {
    errors.push('Combination logo is missing');
  }

  // Validate each logo has required formats
  const validateLogo = (logo: any, name: string) => {
    if (!logo) return;

    if (!logo.svg || typeof logo.svg !== 'string') {
      errors.push(`${name}: SVG format missing or invalid`);
    }
    if (!Buffer.isBuffer(logo.png2x)) {
      errors.push(`${name}: PNG 2x format missing or invalid`);
    }
    if (!Buffer.isBuffer(logo.png3x)) {
      errors.push(`${name}: PNG 3x format missing or invalid`);
    }
    if (!Buffer.isBuffer(logo.webp)) {
      errors.push(`${name}: WebP format missing or invalid`);
    }
  };

  validateLogo(logos.wordmark, 'Wordmark');
  validateLogo(logos.icon, 'Icon');
  validateLogo(logos.combination, 'Combination');

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validates DesignTokens structure and W3C DTCG compliance
 * @param tokens - Design tokens to validate
 * @returns Validation result
 */
export function validateDesignTokensStructure(
  tokens: DesignTokens
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check schema
  if (tokens.$schema !== 'https://design-tokens.org/schema/version/1.0.0') {
    errors.push('Invalid or missing $schema');
  }

  // Check color tokens
  if (!tokens.color?.brand?.primary) {
    errors.push('Brand primary color missing');
  }
  if (!tokens.color?.brand?.secondary) {
    errors.push('Brand secondary color missing');
  }

  // Check typography tokens
  if (!tokens.typography?.fontFamily?.heading) {
    errors.push('Heading font family missing');
  }
  if (!tokens.typography?.fontFamily?.body) {
    errors.push('Body font family missing');
  }

  // Check spacing tokens
  if (!tokens.spacing?.md) {
    errors.push('Base spacing token (md) missing');
  }

  // Validate token format (must have $value and $type)
  const validateToken = (token: any, path: string) => {
    if (!token) return;

    if (typeof token === 'object' && '$value' in token) {
      if (!('$type' in token)) {
        errors.push(`${path}: $type is required`);
      }
    }
  };

  validateToken(tokens.color?.brand?.primary, 'color.brand.primary');
  validateToken(tokens.typography?.fontFamily?.heading, 'typography.fontFamily.heading');
  validateToken(tokens.spacing?.md, 'spacing.md');

  return {
    valid: errors.length === 0,
    errors
  };
}

// ============================================================================
// PERFORMANCE TESTING HELPERS
// ============================================================================

/**
 * Measures async function execution time
 * @param fn - Async function to measure
 * @param args - Arguments to pass to function
 * @returns Execution time in milliseconds
 */
export async function measureExecutionTime<T>(
  fn: (...args: any[]) => Promise<T>,
  ...args: any[]
): Promise<{ result: T; duration: number }> {
  const start = Date.now();
  const result = await fn(...args);
  const duration = Date.now() - start;

  return { result, duration };
}

/**
 * Asserts function completes within time limit
 * @param fn - Async function to test
 * @param maxDuration - Maximum allowed duration in milliseconds
 * @param args - Arguments to pass to function
 * @throws Error if function exceeds time limit
 */
export async function assertPerformance<T>(
  fn: (...args: any[]) => Promise<T>,
  maxDuration: number,
  ...args: any[]
): Promise<T> {
  const { result, duration } = await measureExecutionTime(fn, ...args);

  if (duration > maxDuration) {
    throw new Error(
      `Performance test failed: ${duration}ms exceeds limit of ${maxDuration}ms`
    );
  }

  return result;
}

// ============================================================================
// MOCK API RESPONSES
// ============================================================================

/**
 * Mock Claude API response
 */
export const MOCK_CLAUDE_RESPONSE = {
  id: 'msg_test123',
  type: 'message',
  role: 'assistant',
  content: [
    {
      type: 'text',
      text: JSON.stringify(MOCK_BRAND_ANALYSIS)
    }
  ],
  model: 'claude-sonnet-4-5-20250929',
  stop_reason: 'end_turn',
  usage: {
    input_tokens: 150,
    output_tokens: 300
  }
};

/**
 * Mock error response from Claude API
 */
export const MOCK_CLAUDE_ERROR = {
  type: 'error',
  error: {
    type: 'rate_limit_error',
    message: 'Rate limit exceeded'
  }
};

// ============================================================================
// TEST MATCHERS
// ============================================================================

/**
 * Custom Jest matcher to check if color is valid hex
 */
export const toBeValidHexColor = (received: string): { pass: boolean; message: () => string } => {
  const pass = /^#[0-9A-F]{6}$/i.test(received);

  return {
    pass,
    message: () =>
      pass
        ? `Expected ${received} not to be a valid hex color`
        : `Expected ${received} to be a valid hex color (format: #RRGGBB)`
  };
};

/**
 * Custom Jest matcher to check WCAG compliance
 */
export const toMeetWCAG = (
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
): { pass: boolean; message: () => string } => {
  const { calculateContrast } = require('@/lib/validators/wcag-validator');

  const ratio = calculateContrast(foreground, background);
  const requiredRatio = level === 'AA' ? 4.5 : 7.0;
  const pass = ratio >= requiredRatio;

  return {
    pass,
    message: () =>
      pass
        ? `Expected contrast ${ratio.toFixed(2)}:1 not to meet WCAG ${level}`
        : `Expected contrast ${ratio.toFixed(2)}:1 to meet WCAG ${level} (required: ${requiredRatio}:1)`
  };
};

// ============================================================================
// SNAPSHOT HELPERS
// ============================================================================

/**
 * Serializes BrandAnalysis for snapshot testing
 * Removes dynamic fields like createdAt
 */
export function serializeBrandAnalysisForSnapshot(analysis: BrandAnalysis) {
  const { createdAt, ...rest } = analysis;
  return {
    ...rest,
    createdAt: '[TIMESTAMP]'
  };
}

/**
 * Serializes LogoSet for snapshot testing
 * Replaces buffers with size info
 */
export function serializeLogoSetForSnapshot(logos: LogoSet) {
  const serializeLogo = (logo: any) => ({
    svg: logo.svg.substring(0, 100) + '... [TRUNCATED]',
    png2x: `[Buffer: ${logo.png2x.length} bytes]`,
    png3x: `[Buffer: ${logo.png3x.length} bytes]`,
    webp: `[Buffer: ${logo.webp.length} bytes]`,
    dimensions: logo.dimensions
  });

  return {
    wordmark: serializeLogo(logos.wordmark),
    icon: serializeLogo(logos.icon),
    combination: serializeLogo(logos.combination)
  };
}

// ============================================================================
// CLEANUP HELPERS
// ============================================================================

/**
 * Cleans up test artifacts
 */
export async function cleanupTestArtifacts(testId: string): Promise<void> {
  // TODO: Implement cleanup logic
  // - Delete test files
  // - Clear test cache
  // - Remove test database entries
}

/**
 * Sets up test environment
 */
export function setupTestEnvironment(): void {
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.CLAUDE_API_KEY = 'test-key-xxx';

  // Mock console methods to reduce noise in tests
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn()
    // Keep error for debugging
  };
}

/**
 * Tears down test environment
 */
export function teardownTestEnvironment(): void {
  // Restore console
  jest.restoreAllMocks();
}
