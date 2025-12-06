/**
 * TypeScript interfaces for Claude AI brand analysis
 * @module lib/ai/types
 */

/**
 * Input to brand analysis
 */
export interface BrandInput {
  businessIdea: string;
  targetAudience: string;
  style: 'modern' | 'classic' | 'bold' | 'minimal';
  industry?: string;
  techStack?: 'nextjs' | 'react-typescript' | 'vue' | 'html';
}

/**
 * Brand color palette
 */
export interface BrandColors {
  primary: string; // Hex code
  secondary: string;
  accent: string;
  neutralLight: string;
  neutralDark: string;
}

/**
 * Brand typography system
 */
export interface BrandTypography {
  headingFont: string; // Font family name
  bodyFont: string;
  monoFont: string;
  headingWeight: number;
  bodyWeight: number;
}

/**
 * Target audience profile
 */
export interface TargetAudience {
  demographics: string;
  psychographics: string;
  behaviors: string[];
}

/**
 * Brand messaging strategy
 */
export interface BrandMessaging {
  voiceTone: string;
  keyMessages: string[];
}

/**
 * Visual style direction
 */
export interface VisualStyle {
  aesthetic: string;
  iconography: string;
  patterns: string[];
}

/**
 * Complete brand analysis output from Claude AI
 */
export interface BrandAnalysis {
  brandName: string;
  tagline: string;
  colors: BrandColors;
  typography: BrandTypography;
  personality: string[]; // 3-5 adjectives
  targetAudience: TargetAudience;
  messaging: BrandMessaging;
  visualStyle: VisualStyle;
}

/**
 * Error codes for Claude AI
 */
export type ClaudeErrorCode =
  | 'API_ERROR'
  | 'RATE_LIMIT'
  | 'INVALID_RESPONSE'
  | 'NETWORK_ERROR'
  | 'PARSING_ERROR'
  | 'VALIDATION_ERROR';

/**
 * Custom error class for Claude AI operations
 */
export class ClaudeAIError extends Error {
  public readonly code: ClaudeErrorCode;
  public readonly retryable: boolean;
  public readonly originalError?: unknown;

  constructor(
    message: string,
    code: ClaudeErrorCode,
    retryable: boolean = false,
    originalError?: unknown
  ) {
    super(message);
    this.name = 'ClaudeAIError';
    this.code = code;
    this.retryable = retryable;
    this.originalError = originalError;

    // Maintains proper stack trace for where error was thrown (V8 only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClaudeAIError);
    }
  }

  /**
   * Convert to JSON for logging
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      retryable: this.retryable,
      stack: this.stack,
    };
  }
}

/**
 * Configuration for Claude client
 */
export interface ClaudeClientConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  timeout?: number;
}

/**
 * Options for brand analysis
 */
export interface AnalysisOptions {
  /** Include extended analysis (more details) */
  extended?: boolean;
  /** Custom system prompt */
  systemPrompt?: string;
  /** Additional context to include */
  context?: string;
}
