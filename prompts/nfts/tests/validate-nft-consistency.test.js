/**
 * NFT Certificate Consistency Validation Test
 * ============================================
 *
 * This test ensures all NFT certificate tiers maintain structural consistency
 * while only varying in color schemes.
 *
 * Run: node prompts/nfts/tests/validate-nft-consistency.test.js
 */

const fs = require('fs');
const path = require('path');

// Color palette definitions for each tier
const TIER_COLORS = {
  common: {
    primary: '#00FFA3',
    secondary: '#00FFCC',
    accent: '#7FFFD4',
    shadow: '#004D3D',
    glow: '#B3FFE6',
    probability: '60%'
  },
  uncommon: {
    primary: '#FF00FF',
    secondary: '#FF0080',
    accent: '#FF66FF',
    shadow: '#660066',
    glow: '#FFCCFF',
    probability: '20%'
  },
  rare: {
    primary: '#FF0000',
    secondary: '#00FF00',
    tertiary: '#0000FF',
    accent: '#FFFF00',
    shadow: '#330033',
    glow: '#FFFFFF',
    probability: '10%'
  },
  legendary: {
    primary: '#9D00FF',
    secondary: '#FF0099',
    tertiary: '#00FFFF',
    accent: '#FF6600',
    shadow: '#000000',
    glow: '#FFFFFF',
    highlight: '#FFD700',
    probability: '2.5%'
  },
  ultra: {
    primary: '#00FFFF',
    secondary: '#FF00AA',
    tertiary: '#AAFF00',
    accent: '#FF6600',
    shadow: '#0D0D1A',
    glow: '#EEFFFF',
    probability: '7.5%'
  }
};

// Required SVG elements that must exist in all certificates
const REQUIRED_ELEMENTS = [
  'gradient-bg',
  'gradient-accent',
  'gradient-logo-glow',
  'glow',
  'event-badge',
  'screenshot-container',
  'screenshot-clip',
  'brand-name',
  'subdomain',
  'generation-date',
  'footer',
  'decorative-lines',
  'corner-top-left',
  'corner-top-right',
  'corner-bottom-left',
  'corner-bottom-right'
];

// Text content that must be present
const REQUIRED_TEXT = {
  event: 'MONAD BLITZ SF #18',
  title: 'BRAND CERTIFICATE',
  subtitle: 'MACHUPS.COM',
  footer: 'MACHUPS.COM • POWERED BY MONAD',
  brandPlaceholder: '[BRAND NAME]',
  subdomainPlaceholder: 'brand.machups.com'
};

// Forbidden text (removed references)
const FORBIDDEN_TEXT = [
  'FUSED GAMING',
  'CYBER.MINT.001',
  'NEON.MAG.002',
  'BY FUSED GAMING'
];

class NFTConsistencyValidator {
  constructor() {
    this.results = {
      passed: [],
      failed: [],
      warnings: []
    };
  }

  /**
   * Load SVG file
   */
  loadSVG(tier) {
    const filePath = path.join(__dirname, '..', 'images', `nft-certificate-${tier}.svg`);

    if (!fs.existsSync(filePath)) {
      throw new Error(`SVG file not found: ${filePath}`);
    }

    return fs.readFileSync(filePath, 'utf8');
  }

  /**
   * Test 1: Check if all required elements exist
   */
  testRequiredElements(tier, svg) {
    const testName = `[${tier.toUpperCase()}] Required Elements Present`;
    const missing = [];

    REQUIRED_ELEMENTS.forEach(elementId => {
      if (!svg.includes(`id="${elementId}"`)) {
        missing.push(elementId);
      }
    });

    if (missing.length === 0) {
      this.results.passed.push(testName);
      return true;
    } else {
      this.results.failed.push(`${testName}: Missing elements: ${missing.join(', ')}`);
      return false;
    }
  }

  /**
   * Test 2: Check if all required text is present
   */
  testRequiredText(tier, svg) {
    const testName = `[${tier.toUpperCase()}] Required Text Present`;
    const missing = [];

    Object.entries(REQUIRED_TEXT).forEach(([key, text]) => {
      if (!svg.includes(text)) {
        missing.push(`${key}: "${text}"`);
      }
    });

    if (missing.length === 0) {
      this.results.passed.push(testName);
      return true;
    } else {
      this.results.failed.push(`${testName}: Missing text: ${missing.join(', ')}`);
      return false;
    }
  }

  /**
   * Test 3: Check for forbidden text (old branding)
   */
  testForbiddenText(tier, svg) {
    const testName = `[${tier.toUpperCase()}] No Forbidden Text`;
    const found = [];

    FORBIDDEN_TEXT.forEach(text => {
      if (svg.includes(text)) {
        found.push(text);
      }
    });

    if (found.length === 0) {
      this.results.passed.push(testName);
      return true;
    } else {
      this.results.failed.push(`${testName}: Found forbidden text: ${found.join(', ')}`);
      return false;
    }
  }

  /**
   * Test 4: Verify color usage
   */
  testColorUsage(tier, svg) {
    const testName = `[${tier.toUpperCase()}] Correct Color Palette`;
    const colors = TIER_COLORS[tier];
    const missing = [];

    // Check primary color is used
    if (!svg.includes(colors.primary.toUpperCase()) && !svg.includes(colors.primary.toLowerCase())) {
      missing.push(`primary: ${colors.primary}`);
    }

    // Check shadow color is used
    if (!svg.includes(colors.shadow.toUpperCase()) && !svg.includes(colors.shadow.toLowerCase())) {
      missing.push(`shadow: ${colors.shadow}`);
    }

    if (missing.length === 0) {
      this.results.passed.push(testName);
      return true;
    } else {
      this.results.failed.push(`${testName}: Missing colors: ${missing.join(', ')}`);
      return false;
    }
  }

  /**
   * Test 5: Check probability percentage
   */
  testProbability(tier, svg) {
    const testName = `[${tier.toUpperCase()}] Correct Probability`;
    const expectedProb = TIER_COLORS[tier].probability;

    if (svg.includes(expectedProb)) {
      this.results.passed.push(testName);
      return true;
    } else {
      this.results.failed.push(`${testName}: Expected "${expectedProb}" probability text`);
      return false;
    }
  }

  /**
   * Test 6: Check tier name
   */
  testTierName(tier, svg) {
    const testName = `[${tier.toUpperCase()}] Correct Tier Name`;
    const tierNames = {
      common: 'COMMON',
      uncommon: 'UNCOMMON',
      rare: 'RARE',
      legendary: 'LEGENDARY',
      ultra: 'ULTRA RARE'
    };

    const expectedTier = tierNames[tier];
    if (svg.includes(`TIER: ${expectedTier}`)) {
      this.results.passed.push(testName);
      return true;
    } else {
      this.results.failed.push(`${testName}: Expected "TIER: ${expectedTier}"`);
      return false;
    }
  }

  /**
   * Test 7: Partner logos present
   */
  testPartnerLogos(tier, svg) {
    const testName = `[${tier.toUpperCase()}] Partner Logos Present`;
    const missing = [];

    // Check for Coinbase logo (simplified check)
    if (!svg.includes('Coinbase') && !svg.includes('M222.34,54.94')) {
      missing.push('Coinbase');
    }

    // Check for Thirdweb logo (simplified check)
    if (!svg.includes('thirdweb') && !svg.includes('M69.64 2.17')) {
      missing.push('Thirdweb');
    }

    if (missing.length === 0) {
      this.results.passed.push(testName);
      return true;
    } else {
      this.results.failed.push(`${testName}: Missing logos: ${missing.join(', ')}`);
      return false;
    }
  }

  /**
   * Test 8: SVG dimensions
   */
  testDimensions(tier, svg) {
    const testName = `[${tier.toUpperCase()}] Correct Dimensions`;

    if (svg.includes('width="1200"') && svg.includes('height="1200"')) {
      this.results.passed.push(testName);
      return true;
    } else {
      this.results.failed.push(`${testName}: Expected 1200x1200 dimensions`);
      return false;
    }
  }

  /**
   * Test 9: Monad logo present
   */
  testMonadLogo(tier, svg) {
    const testName = `[${tier.toUpperCase()}] Monad Logo Present`;

    // Check for Monad logo path
    if (svg.includes('M90.5358 0C64.3911 0')) {
      this.results.passed.push(testName);
      return true;
    } else {
      this.results.failed.push(`${testName}: Monad logo path not found`);
      return false;
    }
  }

  /**
   * Run all tests for a tier
   */
  testTier(tier) {
    console.log(`\n🔍 Testing ${tier.toUpperCase()} tier...`);

    try {
      const svg = this.loadSVG(tier);

      this.testRequiredElements(tier, svg);
      this.testRequiredText(tier, svg);
      this.testForbiddenText(tier, svg);
      this.testColorUsage(tier, svg);
      this.testProbability(tier, svg);
      this.testTierName(tier, svg);
      this.testPartnerLogos(tier, svg);
      this.testDimensions(tier, svg);
      this.testMonadLogo(tier, svg);

    } catch (error) {
      this.results.failed.push(`[${tier.toUpperCase()}] Failed to load: ${error.message}`);
    }
  }

  /**
   * Run all tests
   */
  runAllTests() {
    console.log('╔══════════════════════════════════════════════════════════════╗');
    console.log('║  MACHUPS NFT Certificate Consistency Validation Test        ║');
    console.log('╚══════════════════════════════════════════════════════════════╝');

    const tiers = ['common', 'uncommon', 'rare', 'legendary', 'ultra'];

    tiers.forEach(tier => this.testTier(tier));

    this.printResults();
  }

  /**
   * Print test results
   */
  printResults() {
    console.log('\n╔══════════════════════════════════════════════════════════════╗');
    console.log('║  TEST RESULTS                                                ║');
    console.log('╚══════════════════════════════════════════════════════════════╝\n');

    const totalTests = this.results.passed.length + this.results.failed.length;
    const passRate = ((this.results.passed.length / totalTests) * 100).toFixed(1);

    console.log(`✅ PASSED: ${this.results.passed.length}/${totalTests} (${passRate}%)`);
    console.log(`❌ FAILED: ${this.results.failed.length}/${totalTests}`);

    if (this.results.failed.length > 0) {
      console.log('\n❌ FAILED TESTS:\n');
      this.results.failed.forEach(failure => {
        console.log(`   ${failure}`);
      });
    }

    if (this.results.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:\n');
      this.results.warnings.forEach(warning => {
        console.log(`   ${warning}`);
      });
    }

    if (this.results.failed.length === 0) {
      console.log('\n╔══════════════════════════════════════════════════════════════╗');
      console.log('║  ✅ ALL TESTS PASSED - CERTIFICATES ARE CONSISTENT!         ║');
      console.log('╚══════════════════════════════════════════════════════════════╝\n');
    } else {
      console.log('\n╔══════════════════════════════════════════════════════════════╗');
      console.log('║  ❌ SOME TESTS FAILED - PLEASE FIX INCONSISTENCIES          ║');
      console.log('╚══════════════════════════════════════════════════════════════╝\n');
      process.exit(1);
    }
  }
}

// Run tests
const validator = new NFTConsistencyValidator();
validator.runAllTests();
