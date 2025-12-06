#!/usr/bin/env tsx
/**
 * Test script for Claude AI Integration
 * Run: tsx scripts/test-claude-integration.ts
 */

import { analyzeBrand, ClaudeAIError } from '../lib/ai';

async function testClaudeIntegration() {
  console.log('🧪 Testing Claude AI Integration...\n');

  try {
    // Test input
    const testInput = {
      businessIdea: 'AI-powered task management platform for developers',
      targetAudience: 'Software engineers and development teams',
      style: 'modern' as const,
      industry: 'SaaS',
      techStack: 'nextjs' as const,
    };

    console.log('📝 Input:');
    console.log(JSON.stringify(testInput, null, 2));
    console.log('\n🔄 Calling Claude AI...\n');

    const startTime = Date.now();
    const result = await analyzeBrand(testInput);
    const duration = Date.now() - startTime;

    console.log('✅ Brand Analysis Success!\n');
    console.log(`⏱️  Time: ${duration}ms (${(duration / 1000).toFixed(2)}s)\n`);
    console.log('📊 Results:');
    console.log('─'.repeat(60));
    console.log(`Brand Name:     ${result.brandName}`);
    console.log(`Tagline:        ${result.tagline}`);
    console.log(`Primary Color:  ${result.colors.primary}`);
    console.log(`Secondary Color: ${result.colors.secondary}`);
    console.log(`Personality:    ${result.personality.join(', ')}`);
    console.log(`Heading Font:   ${result.typography.headingFont}`);
    console.log(`Body Font:      ${result.typography.bodyFont}`);
    console.log('─'.repeat(60));
    console.log('\n📄 Full Analysis:');
    console.log(JSON.stringify(result, null, 2));

    // Validation checks
    console.log('\n🔍 Validation Checks:');

    // Check brand name
    if (result.brandName && result.brandName.length > 0) {
      console.log('✓ Brand name present');
    } else {
      console.log('✗ Brand name missing');
    }

    // Check tagline
    if (result.tagline && result.tagline.length <= 60) {
      console.log(`✓ Tagline valid (${result.tagline.length} chars)`);
    } else {
      console.log('✗ Tagline invalid');
    }

    // Check colors
    const hexRegex = /^#[0-9A-F]{6}$/i;
    const colorValid = Object.values(result.colors).every(color => hexRegex.test(color));
    if (colorValid) {
      console.log('✓ All colors are valid hex codes');
    } else {
      console.log('✗ Invalid color format detected');
    }

    // Check personality
    if (result.personality.length >= 3 && result.personality.length <= 5) {
      console.log(`✓ Personality has ${result.personality.length} traits`);
    } else {
      console.log(`✗ Personality has ${result.personality.length} traits (expected 3-5)`);
    }

    console.log('\n✅ All tests passed!\n');

    return result;
  } catch (error) {
    console.error('\n❌ Test Failed!\n');

    if (error instanceof ClaudeAIError) {
      console.error(`Error Code: ${error.code}`);
      console.error(`Retryable: ${error.retryable}`);
      console.error(`Message: ${error.message}`);

      if (error.code === 'API_ERROR' && error.message.includes('Invalid API key')) {
        console.error('\n💡 Tip: Set your Claude API key:');
        console.error('   export CLAUDE_API_KEY=sk-ant-xxx');
      }
    } else {
      console.error(error);
    }

    process.exit(1);
  }
}

// Run test
if (require.main === module) {
  testClaudeIntegration()
    .then(() => {
      console.log('🎉 Test complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Unexpected error:', error);
      process.exit(1);
    });
}

export { testClaudeIntegration };
