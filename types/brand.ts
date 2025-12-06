/**
 * MACHUPS Brand Type Definitions
 * Phase 2: Core Engine Types
 *
 * These types are used across all Phase 2 generators
 */

// ============================================================================
// INPUT TYPES
// ============================================================================

/**
 * User input for brand generation
 */
export interface BrandInput {
  /** Business idea or description */
  businessIdea: string;

  /** Target audience description */
  targetAudience: string;

  /** Visual style preference */
  style: 'modern' | 'classic' | 'bold' | 'minimal';

  /** Industry category (optional) */
  industry?: string;

  /** Tech stack for component generation (optional) */
  techStack?: 'nextjs' | 'react-typescript' | 'html' | 'vue' | 'svelte';

  /** User's Monad address for NFT (optional) */
  monadAddress?: string;
}

// ============================================================================
// BRAND ANALYSIS TYPES
// ============================================================================

/**
 * Strategic brand analysis from Claude AI
 */
export interface BrandAnalysis {
  /** Brand name (1-2 words, memorable) */
  name: string;

  /** Tagline (under 60 characters) */
  tagline: string;

  /** Color palette */
  colors: BrandColors;

  /** Typography recommendations */
  typography: BrandTypography;

  /** Brand personality traits */
  personality: string[];

  /** Key messaging points */
  messaging: string[];

  /** Timestamp of analysis */
  createdAt: Date;
}

/**
 * Brand color palette
 */
export interface BrandColors {
  /** Primary brand color (hex) */
  primary: string;

  /** Secondary brand color (hex) */
  secondary: string;

  /** Accent color for highlights (hex) */
  accent: string;

  /** Neutral color scale (50, 100, 200, ..., 900) */
  neutrals: string[];
}

/**
 * Brand typography system
 */
export interface BrandTypography {
  /** Font family for headings (Google Fonts) */
  heading: string;

  /** Font family for body text (Google Fonts) */
  body: string;

  /** Monospace font (optional, for code) */
  mono?: string;
}

// ============================================================================
// LOGO TYPES
// ============================================================================

/**
 * Complete logo set with all variations
 */
export interface LogoSet {
  /** Wordmark logo (text-only) */
  wordmark: Logo;

  /** Icon logo (graphic symbol) */
  icon: Logo;

  /** Combination logo (icon + text) */
  combination: Logo;
}

/**
 * Individual logo in multiple formats
 */
export interface Logo {
  /** SVG markup */
  svg: string;

  /** PNG at 2x resolution (retina) */
  png2x: Buffer;

  /** PNG at 3x resolution (ultra-high DPI) */
  png3x: Buffer;

  /** WebP optimized format */
  webp: Buffer;

  /** Logo dimensions */
  dimensions: {
    width: number;
    height: number;
  };
}

// ============================================================================
// DESIGN TOKEN TYPES
// ============================================================================

/**
 * W3C Design Token Community Group (DTCG) compliant tokens
 */
export interface DesignTokens {
  /** W3C DTCG schema version */
  $schema: string;

  /** Color tokens */
  color: ColorTokens;

  /** Typography tokens */
  typography: TypographyTokens;

  /** Spacing tokens */
  spacing: SpacingTokens;

  /** Border radius tokens */
  borderRadius: BorderRadiusTokens;

  /** Shadow tokens */
  shadow: ShadowTokens;

  /** Animation tokens (optional) */
  animation?: AnimationTokens;
}

/**
 * Color token structure
 */
export interface ColorTokens {
  brand: {
    primary: Token<string>;
    secondary: Token<string>;
    accent: Token<string>;
  };
  semantic: {
    success: Token<string>;
    error: Token<string>;
    warning: Token<string>;
    info: Token<string>;
  };
  neutral: Record<string, Token<string>>;
}

/**
 * Typography token structure
 */
export interface TypographyTokens {
  fontFamily: {
    heading: Token<string>;
    body: Token<string>;
    mono?: Token<string>;
  };
  fontSize: Record<string, Token<string>>;
  fontWeight?: Record<string, Token<number>>;
  lineHeight?: Record<string, Token<number>>;
}

/**
 * Spacing token structure
 */
export interface SpacingTokens {
  xs: Token<string>;
  sm: Token<string>;
  md: Token<string>;
  lg: Token<string>;
  xl: Token<string>;
  '2xl': Token<string>;
  '3xl'?: Token<string>;
  '4xl'?: Token<string>;
}

/**
 * Border radius token structure
 */
export interface BorderRadiusTokens {
  sm: Token<string>;
  md: Token<string>;
  lg: Token<string>;
  xl?: Token<string>;
  full: Token<string>;
}

/**
 * Shadow token structure
 */
export interface ShadowTokens {
  sm: Token<string>;
  md: Token<string>;
  lg: Token<string>;
  xl?: Token<string>;
}

/**
 * Animation token structure (optional)
 */
export interface AnimationTokens {
  duration: {
    fast: Token<string>;
    normal: Token<string>;
    slow: Token<string>;
  };
  easing: {
    linear: Token<string>;
    easeIn: Token<string>;
    easeOut: Token<string>;
    easeInOut: Token<string>;
  };
}

/**
 * W3C DTCG token format
 */
export interface Token<T> {
  /** Token value */
  $value: T;

  /** Token type */
  $type: 'color' | 'dimension' | 'fontFamily' | 'fontWeight' | 'duration' | 'cubicBezier' | string;

  /** Token description (optional) */
  $description?: string;
}

// ============================================================================
// COMPONENT TYPES
// ============================================================================

/**
 * Complete component library
 */
export interface ComponentLibrary {
  /** Atomic components (Button, Input, etc.) */
  atoms: Component[];

  /** Molecular components (Form groups, Cards, etc.) */
  molecules: Component[];

  /** Organism components (Header, Footer, etc.) */
  organisms: Component[];

  /** Total component count */
  totalCount: number;
}

/**
 * Individual component
 */
export interface Component {
  /** Component name (e.g., "Button") */
  name: string;

  /** Component category */
  category: 'atom' | 'molecule' | 'organism';

  /** React/TSX code */
  code: string;

  /** TypeScript type definitions */
  types: string;

  /** Component tests (optional) */
  tests?: string;

  /** Component documentation (optional) */
  docs?: string;

  /** Props interface name */
  propsInterface: string;
}

// ============================================================================
// EXPORT TYPES
// ============================================================================

/**
 * Token export formats
 */
export interface TokenExports {
  /** W3C DTCG JSON */
  json: string;

  /** CSS Variables */
  css: string;

  /** SCSS Variables */
  scss: string;

  /** Tailwind Config */
  tailwind: string;

  /** Figma Tokens (future) */
  figma?: string;
}

// ============================================================================
// VALIDATION TYPES
// ============================================================================

/**
 * WCAG compliance validation result
 */
export interface WCAGValidation {
  /** Whether colors meet WCAG AA standard */
  isCompliant: boolean;

  /** Contrast ratio */
  contrastRatio: number;

  /** Minimum required ratio */
  requiredRatio: number;

  /** Validation level (AA or AAA) */
  level: 'AA' | 'AAA';

  /** Issues found (if any) */
  issues?: string[];
}

/**
 * Color contrast calculation
 */
export interface ContrastCheck {
  /** Foreground color */
  foreground: string;

  /** Background color */
  background: string;

  /** Calculated contrast ratio */
  ratio: number;

  /** Meets WCAG AA? */
  meetsAA: boolean;

  /** Meets WCAG AAA? */
  meetsAAA: boolean;
}

// ============================================================================
// PACKAGE TYPES
// ============================================================================

/**
 * Complete brand package (final deliverable)
 */
export interface BrandPackage {
  /** Unique package ID */
  id: string;

  /** Brand analysis */
  analysis: BrandAnalysis;

  /** Logo set */
  logos: LogoSet;

  /** Design tokens */
  tokens: DesignTokens;

  /** Token exports in multiple formats */
  tokenExports: TokenExports;

  /** Component library */
  components: ComponentLibrary;

  /** Preview deployment URL (optional) */
  previewUrl?: string;

  /** Download URL for ZIP package */
  downloadUrl?: string;

  /** Generation metadata */
  metadata: PackageMetadata;
}

/**
 * Package metadata
 */
export interface PackageMetadata {
  /** Generation timestamp */
  generatedAt: Date;

  /** Generation duration (seconds) */
  generationTime: number;

  /** MACHUPS version */
  version: string;

  /** Input parameters */
  input: BrandInput;

  /** Performance metrics */
  performance: {
    analysisTime: number;
    logoTime: number;
    tokenTime: number;
    componentTime: number;
    totalTime: number;
  };
}

// ============================================================================
// PROGRESS TRACKING TYPES
// ============================================================================

/**
 * Generation progress update
 */
export interface GenerationProgress {
  /** Current step description */
  step: string;

  /** Progress percentage (0-100) */
  progress: number;

  /** Current stage */
  stage: 'analyzing' | 'generating-logos' | 'generating-tokens' | 'generating-components' | 'packaging' | 'complete' | 'error';

  /** Estimated time remaining (seconds) */
  estimatedTimeRemaining?: number;

  /** Error (if stage is 'error') */
  error?: Error;
}

/**
 * Progress callback function
 */
export type ProgressCallback = (progress: GenerationProgress) => void;

// ============================================================================
// ERROR TYPES
// ============================================================================

/**
 * Brand generation error
 */
export class BrandGenerationError extends Error {
  constructor(
    message: string,
    public stage: GenerationProgress['stage'],
    public originalError?: Error
  ) {
    super(message);
    this.name = 'BrandGenerationError';
  }
}

/**
 * WCAG validation error
 */
export class WCAGValidationError extends Error {
  constructor(
    message: string,
    public validation: WCAGValidation
  ) {
    super(message);
    this.name = 'WCAGValidationError';
  }
}

/**
 * Claude API error
 */
export class ClaudeAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'ClaudeAPIError';
  }
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Promisify a type
 */
export type Awaitable<T> = T | Promise<T>;

/**
 * Make all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Extract function return type
 */
export type ReturnTypeAsync<T extends (...args: any) => any> = T extends (...args: any) => Promise<infer R>
  ? R
  : T extends (...args: any) => infer R
  ? R
  : never;
