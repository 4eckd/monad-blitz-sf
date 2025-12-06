/**
 * WCAG Accessibility Validator
 * Ensures colors meet WCAG 2.1 Level AA standards
 *
 * WCAG AA Requirements:
 * - Normal text: 4.5:1 contrast ratio minimum
 * - Large text (18pt+): 3:1 contrast ratio minimum
 * - UI components: 3:1 contrast ratio minimum
 */

import { BrandColors, WCAGValidation, ContrastCheck } from '@/types/brand';

// ============================================================================
// COLOR CONVERSION UTILITIES
// ============================================================================

/**
 * Converts hex color to RGB
 * @param hex - Hex color string (#RRGGBB or #RGB)
 * @returns RGB object
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Handle shorthand hex (#RGB)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
}

/**
 * Converts RGB to hex
 * @param r - Red (0-255)
 * @param g - Green (0-255)
 * @param b - Blue (0-255)
 * @returns Hex color string (#RRGGBB)
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Converts RGB to relative luminance
 * Used in contrast ratio calculation
 * @param rgb - RGB color
 * @returns Relative luminance (0-1)
 */
export function getLuminance(rgb: { r: number; g: number; b: number }): number {
  const { r, g, b } = rgb;

  // Convert to 0-1 range
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  // Calculate relative luminance
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// ============================================================================
// CONTRAST CALCULATION
// ============================================================================

/**
 * Calculates contrast ratio between two colors
 * WCAG 2.1 formula: (L1 + 0.05) / (L2 + 0.05)
 * where L1 is lighter color luminance, L2 is darker
 *
 * @param color1 - First color (hex)
 * @param color2 - Second color (hex)
 * @returns Contrast ratio (1-21)
 */
export function calculateContrast(color1: string, color2: string): number {
  const lum1 = getLuminance(hexToRgb(color1));
  const lum2 = getLuminance(hexToRgb(color2));

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Checks if contrast meets WCAG standards
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @param level - WCAG level ('AA' or 'AAA')
 * @param largeText - Whether text is large (18pt+ or 14pt+ bold)
 * @returns Contrast check result
 */
export function checkContrast(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  largeText: boolean = false
): ContrastCheck {
  const ratio = calculateContrast(foreground, background);

  // WCAG requirements
  const requirements = {
    AA: {
      normal: 4.5,
      large: 3.0
    },
    AAA: {
      normal: 7.0,
      large: 4.5
    }
  };

  const requiredRatioAA = largeText
    ? requirements.AA.large
    : requirements.AA.normal;

  const requiredRatioAAA = largeText
    ? requirements.AAA.large
    : requirements.AAA.normal;

  return {
    foreground,
    background,
    ratio,
    meetsAA: ratio >= requiredRatioAA,
    meetsAAA: ratio >= requiredRatioAAA
  };
}

// ============================================================================
// COLOR ADJUSTMENT
// ============================================================================

/**
 * Adjusts color lightness to meet contrast requirements
 * @param color - Color to adjust (hex)
 * @param targetBg - Background color to contrast against (hex)
 * @param targetRatio - Target contrast ratio (default: 4.5 for AA)
 * @param maxIterations - Maximum adjustment attempts
 * @returns Adjusted color (hex)
 */
export function adjustColorForContrast(
  color: string,
  targetBg: string,
  targetRatio: number = 4.5,
  maxIterations: number = 100
): string {
  let currentColor = color;
  let currentRatio = calculateContrast(currentColor, targetBg);

  let rgb = hexToRgb(currentColor);
  const bgLum = getLuminance(hexToRgb(targetBg));
  const colorLum = getLuminance(rgb);

  // Determine if we need to lighten or darken
  const shouldLighten = colorLum < bgLum;

  let iteration = 0;
  while (currentRatio < targetRatio && iteration < maxIterations) {
    // Adjust RGB values
    if (shouldLighten) {
      rgb.r = Math.min(255, rgb.r + 5);
      rgb.g = Math.min(255, rgb.g + 5);
      rgb.b = Math.min(255, rgb.b + 5);
    } else {
      rgb.r = Math.max(0, rgb.r - 5);
      rgb.g = Math.max(0, rgb.g - 5);
      rgb.b = Math.max(0, rgb.b - 5);
    }

    currentColor = rgbToHex(rgb.r, rgb.g, rgb.b);
    currentRatio = calculateContrast(currentColor, targetBg);
    iteration++;
  }

  return currentColor;
}

/**
 * Generates accessible color variations
 * @param baseColor - Base color (hex)
 * @returns Object with lighter and darker variations
 */
export function generateColorVariations(baseColor: string): {
  lighter: string;
  light: string;
  base: string;
  dark: string;
  darker: string;
} {
  const rgb = hexToRgb(baseColor);

  const lighten = (amount: number) => ({
    r: Math.min(255, rgb.r + amount),
    g: Math.min(255, rgb.g + amount),
    b: Math.min(255, rgb.b + amount)
  });

  const darken = (amount: number) => ({
    r: Math.max(0, rgb.r - amount),
    g: Math.max(0, rgb.g - amount),
    b: Math.max(0, rgb.b - amount)
  });

  return {
    lighter: rgbToHex(...Object.values(lighten(60))),
    light: rgbToHex(...Object.values(lighten(30))),
    base: baseColor,
    dark: rgbToHex(...Object.values(darken(30))),
    darker: rgbToHex(...Object.values(darken(60)))
  };
}

// ============================================================================
// BRAND COLOR VALIDATION
// ============================================================================

/**
 * Validates brand colors meet WCAG AA standards
 * Adjusts colors if necessary
 *
 * @param colors - Brand colors to validate
 * @param level - WCAG level ('AA' or 'AAA')
 * @returns Validated (and possibly adjusted) colors
 */
export async function validateWCAGColors(
  colors: BrandColors,
  level: 'AA' | 'AAA' = 'AA'
): Promise<BrandColors> {
  const targetRatio = level === 'AA' ? 4.5 : 7.0;

  // Validate primary color against white background
  const primaryCheck = checkContrast(colors.primary, '#FFFFFF', level);
  if (!primaryCheck.meetsAA && level === 'AA') {
    console.warn(
      `Primary color ${colors.primary} does not meet WCAG ${level}. Adjusting...`
    );
    colors.primary = adjustColorForContrast(colors.primary, '#FFFFFF', targetRatio);
  }

  // Validate secondary color
  const secondaryCheck = checkContrast(colors.secondary, '#FFFFFF', level);
  if (!secondaryCheck.meetsAA && level === 'AA') {
    console.warn(
      `Secondary color ${colors.secondary} does not meet WCAG ${level}. Adjusting...`
    );
    colors.secondary = adjustColorForContrast(
      colors.secondary,
      '#FFFFFF',
      targetRatio
    );
  }

  // Validate accent color
  const accentCheck = checkContrast(colors.accent, '#FFFFFF', level);
  if (!accentCheck.meetsAA && level === 'AA') {
    console.warn(
      `Accent color ${colors.accent} does not meet WCAG ${level}. Adjusting...`
    );
    colors.accent = adjustColorForContrast(colors.accent, '#FFFFFF', targetRatio);
  }

  return colors;
}

/**
 * Comprehensive WCAG validation with detailed report
 * @param colors - Brand colors
 * @param level - WCAG level
 * @returns Validation result with issues
 */
export function validateBrandColors(
  colors: BrandColors,
  level: 'AA' | 'AAA' = 'AA'
): WCAGValidation {
  const issues: string[] = [];
  const targetRatio = level === 'AA' ? 4.5 : 7.0;

  // Check primary vs white
  const primaryVsWhite = calculateContrast(colors.primary, '#FFFFFF');
  if (primaryVsWhite < targetRatio) {
    issues.push(
      `Primary color ${colors.primary} has insufficient contrast with white (${primaryVsWhite.toFixed(2)}:1, needs ${targetRatio}:1)`
    );
  }

  // Check secondary vs white
  const secondaryVsWhite = calculateContrast(colors.secondary, '#FFFFFF');
  if (secondaryVsWhite < targetRatio) {
    issues.push(
      `Secondary color ${colors.secondary} has insufficient contrast with white (${secondaryVsWhite.toFixed(2)}:1, needs ${targetRatio}:1)`
    );
  }

  // Check accent vs white
  const accentVsWhite = calculateContrast(colors.accent, '#FFFFFF');
  if (accentVsWhite < targetRatio) {
    issues.push(
      `Accent color ${colors.accent} has insufficient contrast with white (${accentVsWhite.toFixed(2)}:1, needs ${targetRatio}:1)`
    );
  }

  const minRatio = Math.min(primaryVsWhite, secondaryVsWhite, accentVsWhite);

  return {
    isCompliant: issues.length === 0,
    contrastRatio: minRatio,
    requiredRatio: targetRatio,
    level,
    issues: issues.length > 0 ? issues : undefined
  };
}

// ============================================================================
// TESTING UTILITIES
// ============================================================================

/**
 * Mock color values for testing
 */
export const MOCK_COLORS = {
  // Accessible colors (meet WCAG AA)
  accessible: {
    blue: '#0066FF',
    red: '#DC2626',
    green: '#059669',
    purple: '#7C3AED'
  },

  // Inaccessible colors (fail WCAG AA on white)
  inaccessible: {
    lightBlue: '#60A5FA',
    lightRed: '#FCA5A5',
    lightGreen: '#6EE7B7',
    yellow: '#FDE047'
  },

  // Neutral colors
  neutrals: {
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717'
    }
  }
};

/**
 * Test helper: Generate test brand colors
 * @param accessible - Whether colors should meet WCAG AA
 * @returns Brand colors for testing
 */
export function createTestBrandColors(accessible: boolean = true): BrandColors {
  if (accessible) {
    return {
      primary: MOCK_COLORS.accessible.blue,
      secondary: MOCK_COLORS.accessible.purple,
      accent: MOCK_COLORS.accessible.green,
      neutrals: Object.values(MOCK_COLORS.neutrals.gray)
    };
  } else {
    return {
      primary: MOCK_COLORS.inaccessible.lightBlue,
      secondary: MOCK_COLORS.inaccessible.lightRed,
      accent: MOCK_COLORS.inaccessible.yellow,
      neutrals: Object.values(MOCK_COLORS.neutrals.gray)
    };
  }
}
