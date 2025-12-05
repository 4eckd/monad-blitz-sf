# Feature-Specific Prompts

This directory contains specialized AI prompts for each MACHUPS feature. Each feature has its own subdirectory with prompts tailored to that specific implementation.

## Structure

```
prompts/features/
├── brand-generation/       # Core brand generation prompts
├── design-tokens/          # Design token creation prompts
├── component-library/      # Component generation prompts
├── social-media-assets/    # Social media asset prompts
├── auto-deploy/            # Deployment automation prompts
├── nft-minting/            # NFT creation and minting prompts
├── performance-testing/    # Performance validation prompts
└── documentation/          # Doc generation prompts
```

## Usage

Each feature directory contains:
- `system-prompt.md` - System-level instructions for the AI
- `user-prompts.md` - Template prompts for user interactions
- `examples.md` - Example inputs and outputs
- `validation.md` - Quality validation prompts

## Prompt Engineering Guidelines

### 1. Clarity and Specificity
- Be explicit about expected output format
- Define all constraints and requirements
- Provide concrete examples

### 2. Consistency
- Use consistent terminology across prompts
- Maintain brand voice and tone
- Follow W3C and industry standards

### 3. Error Handling
- Include validation criteria
- Define fallback strategies
- Specify error message formats

### 4. Performance
- Optimize for token efficiency
- Use structured output formats (JSON, YAML)
- Minimize redundant instructions

### 5. Testing
- Test prompts with various inputs
- Validate edge cases
- Measure output quality

## Prompt Templates

### System Prompt Template
```markdown
# [Feature Name] System Prompt

## Role
You are an expert [domain] specialist for MACHUPS, an AI brand generator.

## Context
[Background information about the feature]

## Objectives
1. [Primary objective]
2. [Secondary objective]
3. [Tertiary objective]

## Constraints
- [Constraint 1]
- [Constraint 2]
- [Constraint 3]

## Output Format
[Expected format with schema]

## Quality Criteria
- [Criterion 1]
- [Criterion 2]
- [Criterion 3]
```

### User Prompt Template
```markdown
# [Feature Name] User Prompt

## Input Parameters
- `{param1}`: Description
- `{param2}`: Description

## Prompt
[Template with parameter placeholders]

## Example
Input:
```json
{
  "param1": "value1",
  "param2": "value2"
}
```

Output:
```json
{
  "result": "expected output"
}
```
```

## Integration with Generation Pipeline

```typescript
import { readPrompt } from '@/lib/prompts/loader';

// Load feature-specific prompts
const systemPrompt = await readPrompt('features/auto-deploy/system-prompt.md');
const userPrompt = await readPrompt('features/auto-deploy/user-prompts.md');

// Generate with Claude
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4.5',
  system: systemPrompt,
  messages: [{
    role: 'user',
    content: userPrompt.replace('{brandName}', brandName)
  }]
});
```

## Version Control

All prompts are versioned alongside code:
- Breaking changes require major version bump
- New prompts or parameters require minor version bump
- Wording improvements are patch updates

## Testing Framework

```typescript
// prompts/features/auto-deploy/__tests__/prompts.test.ts
import { testPrompt } from '@/lib/prompts/testing';

describe('Auto Deploy Prompts', () => {
  it('should generate valid subdomain suggestions', async () => {
    const result = await testPrompt('auto-deploy/subdomain-suggestions', {
      brandName: 'My Cool Brand'
    });

    expect(result.suggestions).toHaveLength(5);
    expect(result.suggestions[0]).toMatch(/^[a-z0-9-]+$/);
  });
});
```

---

**Last Updated**: December 4, 2025
**Prompt Version**: 1.0.0
**AI Model**: Claude Sonnet 4.5
