/**
 * Claude AI Client for Brand Analysis
 * @module lib/ai/claude
 */

import Anthropic from '@anthropic-ai/sdk';
import type {
  BrandInput,
  BrandAnalysis,
  BrandColors,
  ClaudeClientConfig,
  AnalysisOptions,
} from './types';
import { ClaudeAIError } from './types';
import {
  getBrandAnalysisSystemPrompt,
  getBrandAnalysisUserPrompt,
  extractJSONFromResponse,
} from './prompts';

/**
 * Claude AI Client for Brand Analysis
 */
export class ClaudeClient {
  private client: Anthropic;
  private config: Required<ClaudeClientConfig>;

  constructor(config: ClaudeClientConfig) {
    this.config = {
      apiKey: config.apiKey,
      model: config.model || 'claude-sonnet-4-5-20250929',
      maxTokens: config.maxTokens || 4096,
      temperature: config.temperature || 0.7,
      timeout: config.timeout || 60000, // 60 seconds
    };

    this.client = new Anthropic({
      apiKey: this.config.apiKey,
      timeout: this.config.timeout,
    });
  }

  /**
   * Analyze business idea and generate comprehensive brand strategy
   * @param input - Brand input parameters
   * @param options - Additional analysis options
   * @returns Complete brand analysis
   */
  async analyzeBrand(
    input: BrandInput,
    options?: AnalysisOptions
  ): Promise<BrandAnalysis> {
    try {
      // Get prompts
      const systemPrompt =
        options?.systemPrompt || getBrandAnalysisSystemPrompt();
      const userPrompt = this.buildUserPrompt(input, options);

      // Call Claude AI
      const response = await this.client.messages.create({
        model: this.config.model,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      });

      // Extract text from response
      const content = response.content[0];
      if (content.type !== 'text') {
        throw new ClaudeAIError(
          'Unexpected response type from Claude',
          'INVALID_RESPONSE'
        );
      }

      // Parse JSON from response
      const brandAnalysis = this.parseBrandAnalysis(content.text);

      // Validate response
      this.validateBrandAnalysis(brandAnalysis);

      return brandAnalysis;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Build user prompt with optional context
   */
  private buildUserPrompt(
    input: BrandInput,
    options?: AnalysisOptions
  ): string {
    let prompt = getBrandAnalysisUserPrompt(input);

    if (options?.context) {
      prompt += `\n\n**Additional Context:**\n${options.context}`;
    }

    return prompt;
  }

  /**
   * Parse brand analysis JSON from Claude response
   */
  private parseBrandAnalysis(responseText: string): BrandAnalysis {
    try {
      // Extract JSON from potential markdown code blocks
      const jsonText = extractJSONFromResponse(responseText);

      // Parse JSON
      const parsed = JSON.parse(jsonText);

      return parsed as BrandAnalysis;
    } catch (error) {
      throw new ClaudeAIError(
        `Failed to parse brand analysis JSON: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        'PARSING_ERROR',
        false,
        error
      );
    }
  }

  /**
   * Validate brand analysis structure and content
   */
  private validateBrandAnalysis(analysis: BrandAnalysis): void {
    const required = [
      'brandName',
      'tagline',
      'colors',
      'typography',
      'personality',
      'targetAudience',
      'messaging',
      'visualStyle',
    ];

    // Check required fields
    for (const field of required) {
      if (!(field in analysis)) {
        throw new ClaudeAIError(
          `Missing required field in brand analysis: ${field}`,
          'VALIDATION_ERROR'
        );
      }
    }

    // Validate brand name
    if (!analysis.brandName || analysis.brandName.trim().length === 0) {
      throw new ClaudeAIError(
        'Brand name cannot be empty',
        'VALIDATION_ERROR'
      );
    }

    // Validate tagline
    if (!analysis.tagline || analysis.tagline.length > 60) {
      throw new ClaudeAIError(
        'Tagline must be non-empty and under 60 characters',
        'VALIDATION_ERROR'
      );
    }

    // Validate colors
    this.validateColors(analysis.colors);

    // Validate personality (3-5 items)
    if (
      !Array.isArray(analysis.personality) ||
      analysis.personality.length < 3 ||
      analysis.personality.length > 5
    ) {
      throw new ClaudeAIError(
        'Personality must be an array of 3-5 adjectives',
        'VALIDATION_ERROR'
      );
    }

    // Validate typography
    if (
      !analysis.typography.headingFont ||
      !analysis.typography.bodyFont
    ) {
      throw new ClaudeAIError(
        'Typography must include headingFont and bodyFont',
        'VALIDATION_ERROR'
      );
    }
  }

  /**
   * Validate color hex codes
   */
  private validateColors(colors: BrandColors): void {
    const hexRegex = /^#[0-9A-F]{6}$/i;
    const colorFields = [
      'primary',
      'secondary',
      'accent',
      'neutralLight',
      'neutralDark',
    ] as const;

    for (const field of colorFields) {
      const color = colors[field];
      if (!color || !hexRegex.test(color)) {
        throw new ClaudeAIError(
          `Invalid hex color for ${field}: ${color}. Must be format #RRGGBB`,
          'VALIDATION_ERROR'
        );
      }
    }
  }

  /**
   * Handle errors from Claude API
   */
  private handleError(error: unknown): never {
    // Re-throw if already a ClaudeAIError
    if (error instanceof ClaudeAIError) {
      throw error;
    }

    // Handle Anthropic API errors
    if (error instanceof Anthropic.APIError) {
      if (error.status === 429) {
        throw new ClaudeAIError(
          'Rate limit exceeded. Please try again later.',
          'RATE_LIMIT',
          true, // retryable
          error
        );
      }

      if (error.status === 401) {
        throw new ClaudeAIError(
          'Invalid API key. Please check your CLAUDE_API_KEY environment variable.',
          'API_ERROR',
          false,
          error
        );
      }

      if (error.status === 400) {
        throw new ClaudeAIError(
          `Invalid request: ${error.message}`,
          'API_ERROR',
          false,
          error
        );
      }

      throw new ClaudeAIError(
        `Claude API error: ${error.message}`,
        'API_ERROR',
        false,
        error
      );
    }

    // Handle network errors
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED') || error.message.includes('ETIMEDOUT')) {
        throw new ClaudeAIError(
          `Network error: ${error.message}`,
          'NETWORK_ERROR',
          true, // retryable
          error
        );
      }

      throw new ClaudeAIError(
        `Unexpected error: ${error.message}`,
        'NETWORK_ERROR',
        false,
        error
      );
    }

    // Unknown error
    throw new ClaudeAIError(
      'Unknown error occurred during brand analysis',
      'API_ERROR',
      false,
      error
    );
  }

  /**
   * Get current configuration
   */
  getConfig(): Readonly<Required<ClaudeClientConfig>> {
    return { ...this.config };
  }
}

/**
 * Factory function to create Claude client from environment
 * @param config - Optional configuration overrides
 * @returns Configured ClaudeClient instance
 */
export function createClaudeClient(
  config?: Partial<ClaudeClientConfig>
): ClaudeClient {
  const apiKey =
    config?.apiKey ||
    process.env.CLAUDE_API_KEY ||
    process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error(
      'Claude API key not found. Set CLAUDE_API_KEY or ANTHROPIC_API_KEY environment variable.'
    );
  }

  return new ClaudeClient({
    apiKey,
    ...config,
  });
}

/**
 * Convenience function for one-off brand analysis
 * @param input - Brand input parameters
 * @param options - Additional analysis options
 * @returns Complete brand analysis
 */
export async function analyzeBrand(
  input: BrandInput,
  options?: AnalysisOptions
): Promise<BrandAnalysis> {
  const client = createClaudeClient();
  return client.analyzeBrand(input, options);
}

/**
 * Analyze brand with retry logic
 * @param input - Brand input parameters
 * @param maxRetries - Maximum number of retries (default: 3)
 * @returns Complete brand analysis
 */
export async function analyzeBrandWithRetry(
  input: BrandInput,
  maxRetries: number = 3
): Promise<BrandAnalysis> {
  const client = createClaudeClient();
  let lastError: ClaudeAIError | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await client.analyzeBrand(input);
    } catch (error) {
      if (error instanceof ClaudeAIError) {
        lastError = error;

        // Only retry if error is retryable
        if (!error.retryable) {
          throw error;
        }

        // Exponential backoff: 2^attempt seconds
        const delayMs = Math.pow(2, attempt) * 1000;
        console.warn(
          `Attempt ${attempt}/${maxRetries} failed: ${error.message}. Retrying in ${delayMs}ms...`
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } else {
        throw error;
      }
    }
  }

  // All retries failed
  throw lastError || new Error('All retry attempts failed');
}
