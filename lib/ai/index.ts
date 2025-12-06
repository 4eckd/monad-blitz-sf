/**
 * Claude AI Integration for Brand Analysis
 * @module lib/ai
 */

// Export types
export type {
  BrandInput,
  BrandAnalysis,
  BrandColors,
  BrandTypography,
  TargetAudience,
  BrandMessaging,
  VisualStyle,
  ClaudeClientConfig,
  ClaudeErrorCode,
  AnalysisOptions,
} from './types';

export { ClaudeAIError } from './types';

// Export main client
export { ClaudeClient, createClaudeClient, analyzeBrand, analyzeBrandWithRetry } from './claude';

// Export prompt helpers
export {
  loadPromptTemplate,
  renderPrompt,
  getBrandAnalysisSystemPrompt,
  getBrandAnalysisUserPrompt,
  extractJSONFromResponse,
} from './prompts';
