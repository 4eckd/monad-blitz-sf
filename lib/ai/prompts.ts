/**
 * Prompt template helpers for Claude AI
 * @module lib/ai/prompts
 */

import fs from 'fs';
import path from 'path';
import type { BrandInput } from './types';

/**
 * Load prompt template from file
 * @param templateName - Name of template file (without .md extension)
 * @returns Template content as string
 */
export function loadPromptTemplate(templateName: string): string {
  const templatePath = path.join(
    process.cwd(),
    'prompts',
    `${templateName}.md`
  );

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Prompt template not found: ${templateName} at ${templatePath}`);
  }

  return fs.readFileSync(templatePath, 'utf-8');
}

/**
 * Render prompt template with variables
 * @param template - Template string with {{variables}}
 * @param variables - Object with variable values
 * @returns Rendered template
 */
export function renderPrompt(
  template: string,
  variables: Record<string, string>
): string {
  let rendered = template;

  for (const [key, value] of Object.entries(variables)) {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    rendered = rendered.replace(placeholder, value);
  }

  return rendered;
}

/**
 * Get system prompt for brand analysis
 * Uses the brand-generation.md template
 */
export function getBrandAnalysisSystemPrompt(): string {
  try {
    return loadPromptTemplate('brand-generation');
  } catch (error) {
    // Fallback if template not found
    return DEFAULT_BRAND_ANALYSIS_SYSTEM_PROMPT;
  }
}

/**
 * Get user prompt for brand analysis
 * @param input - Brand input parameters
 * @returns Formatted user prompt
 */
export function getBrandAnalysisUserPrompt(input: BrandInput): string {
  const template = `
Analyze this business idea and generate a complete brand strategy:

**Business Idea:** {{businessIdea}}

**Target Audience:** {{targetAudience}}

**Style Preference:** {{style}} (modern/classic/bold/minimal)

**Industry:** {{industry}}

{{techStackInfo}}

Please provide a comprehensive brand analysis in JSON format matching the following structure:

\`\`\`json
{
  "brandName": "string (1-2 words, memorable)",
  "tagline": "string (under 60 characters, compelling)",
  "colors": {
    "primary": "#HEXCODE",
    "secondary": "#HEXCODE",
    "accent": "#HEXCODE",
    "neutralLight": "#HEXCODE",
    "neutralDark": "#HEXCODE"
  },
  "typography": {
    "headingFont": "Font Family Name",
    "bodyFont": "Font Family Name",
    "monoFont": "Font Family Name",
    "headingWeight": 700,
    "bodyWeight": 400
  },
  "personality": ["adjective1", "adjective2", "adjective3"],
  "targetAudience": {
    "demographics": "description",
    "psychographics": "description",
    "behaviors": ["behavior1", "behavior2"]
  },
  "messaging": {
    "voiceTone": "description",
    "keyMessages": ["message1", "message2", "message3"]
  },
  "visualStyle": {
    "aesthetic": "description",
    "iconography": "description",
    "patterns": ["pattern1", "pattern2"]
  }
}
\`\`\`

Important guidelines:
- Brand name should be memorable and easy to pronounce
- Tagline should be under 60 characters
- All colors must be valid hex codes (e.g., #3B82F6)
- Personality should have exactly 3-5 adjectives
- Choose fonts that are web-safe or available on Google Fonts
- Ensure the brand aligns with the {{style}} style preference
- Consider the {{industry}} industry standards and expectations
  `.trim();

  const techStackInfo = input.techStack
    ? `**Tech Stack:** ${input.techStack} (components will be generated for this framework)`
    : '';

  return renderPrompt(template, {
    businessIdea: input.businessIdea,
    targetAudience: input.targetAudience,
    style: input.style,
    industry: input.industry || 'General',
    techStackInfo,
  });
}

/**
 * Default system prompt (fallback if template not found)
 */
const DEFAULT_BRAND_ANALYSIS_SYSTEM_PROMPT = `
You are a professional brand strategist with expertise in creating comprehensive brand identities. You analyze business ideas and generate complete brand strategies including:

1. **Brand Name** - Memorable, 1-2 words that capture the essence
2. **Tagline** - Compelling, under 60 characters
3. **Color Palette** - Primary, secondary, accent, and neutral colors (hex codes)
4. **Typography** - Font families for headings, body, and code (web-safe)
5. **Brand Personality** - 3-5 adjectives that define the brand
6. **Target Audience** - Demographics, psychographics, and behaviors
7. **Messaging Strategy** - Voice, tone, and key messages
8. **Visual Style** - Aesthetic direction, iconography, patterns

Your analysis should be:
- **Professional** - Industry-standard quality
- **Cohesive** - All elements work together harmoniously
- **Practical** - Colors are accessible (WCAG AA), fonts are web-available
- **Strategic** - Aligned with business goals and target audience
- **Comprehensive** - Covers all aspects needed for brand implementation

Output your analysis as a valid JSON object matching the exact structure provided in the user prompt. Do not include any additional text outside the JSON object.
`.trim();

/**
 * Extract JSON from Claude's response
 * Handles cases where Claude wraps JSON in markdown code blocks
 * @param responseText - Raw response from Claude
 * @returns Extracted JSON string
 */
export function extractJSONFromResponse(responseText: string): string {
  // Remove leading/trailing whitespace
  let text = responseText.trim();

  // Check for markdown code block
  const codeBlockMatch = text.match(/```json\n([\s\S]*?)\n```/);
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim();
  }

  // Check for plain code block
  const plainCodeMatch = text.match(/```\n([\s\S]*?)\n```/);
  if (plainCodeMatch) {
    return plainCodeMatch[1].trim();
  }

  // If no code block, assume the whole response is JSON
  return text;
}

/**
 * Validate that all required variables are present in template
 * @param template - Template string
 * @param variables - Variables object
 * @throws Error if required variables are missing
 */
export function validateTemplateVariables(
  template: string,
  variables: Record<string, string>
): void {
  const placeholderRegex = /{{(\w+)}}/g;
  const matches = template.matchAll(placeholderRegex);

  const missingVars: string[] = [];

  for (const match of matches) {
    const varName = match[1];
    if (!(varName in variables)) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required template variables: ${missingVars.join(', ')}`
    );
  }
}
