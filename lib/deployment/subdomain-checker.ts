/**
 * Subdomain availability checker for MACHUPS Auto-Deploy
 * Validates DNS compliance and checks availability on machups.com
 */

import { promises as dns } from 'dns';
import type { SubdomainCheckResult, SubdomainSuggestion } from './types';

const SUBDOMAIN_REGEX = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;
const MAX_SUBDOMAIN_LENGTH = 63;
const MIN_SUBDOMAIN_LENGTH = 3;
const RESERVED_SUBDOMAINS = [
  'www', 'api', 'app', 'admin', 'dashboard', 'cdn', 'static',
  'blog', 'docs', 'help', 'support', 'status', 'mail', 'ftp',
  'test', 'staging', 'dev', 'demo', 'beta', 'alpha'
];

const PROFANITY_LIST = [
  // Minimal list - should be expanded with comprehensive list in production
  'offensive', 'inappropriate', 'blocked'
];

/**
 * Normalize brand name to valid subdomain format
 */
export function normalizeBrandName(brandName: string): string {
  return brandName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-\s]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove consecutive hyphens
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .substring(0, MAX_SUBDOMAIN_LENGTH);
}

/**
 * Validate subdomain format and content
 */
export function validateSubdomain(subdomain: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check format
  if (!SUBDOMAIN_REGEX.test(subdomain)) {
    errors.push('Subdomain must contain only lowercase letters, numbers, and hyphens');
  }

  // Check length
  if (subdomain.length < MIN_SUBDOMAIN_LENGTH) {
    errors.push(`Subdomain must be at least ${MIN_SUBDOMAIN_LENGTH} characters`);
  }

  if (subdomain.length > MAX_SUBDOMAIN_LENGTH) {
    errors.push(`Subdomain must be at most ${MAX_SUBDOMAIN_LENGTH} characters`);
  }

  // Check for reserved names
  if (RESERVED_SUBDOMAINS.includes(subdomain)) {
    errors.push('This subdomain is reserved for system use');
  }

  // Check for profanity
  if (PROFANITY_LIST.some(word => subdomain.includes(word))) {
    errors.push('Subdomain contains inappropriate content');
  }

  // Check for consecutive hyphens
  if (subdomain.includes('--')) {
    errors.push('Subdomain cannot contain consecutive hyphens');
  }

  // Check for numeric-only
  if (/^\d+$/.test(subdomain)) {
    errors.push('Subdomain cannot be numeric only');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Check if subdomain is available via DNS query
 */
export async function checkSubdomainAvailability(
  subdomain: string
): Promise<boolean> {
  const fullDomain = `${subdomain}.machups.com`;

  try {
    // Try to resolve the domain
    await dns.resolve(fullDomain);
    // If resolution succeeds, subdomain is taken
    return false;
  } catch (error) {
    // If resolution fails with ENOTFOUND, subdomain is available
    if ((error as NodeJS.ErrnoException).code === 'ENOTFOUND') {
      return true;
    }
    // Other DNS errors should be logged but treated as unavailable for safety
    console.error(`DNS check error for ${fullDomain}:`, error);
    return false;
  }
}

/**
 * Generate AI-powered subdomain suggestions
 */
export async function generateSubdomainSuggestions(
  brandName: string,
  industry?: string,
  keywords?: string[]
): Promise<SubdomainSuggestion[]> {
  const suggestions: SubdomainSuggestion[] = [];
  const normalized = normalizeBrandName(brandName);

  // Strategy 1: Direct brand name
  suggestions.push({
    subdomain: normalized,
    relevanceScore: 1.0,
    available: false, // Will be checked later
    source: 'template-based'
  });

  // Strategy 2: Brand name + common suffixes
  const suffixes = ['app', 'hq', 'io', 'co', 'studio', 'lab', 'works'];
  suffixes.forEach(suffix => {
    const suggestion = `${normalized}-${suffix}`;
    if (suggestion.length <= MAX_SUBDOMAIN_LENGTH) {
      suggestions.push({
        subdomain: suggestion,
        relevanceScore: 0.8,
        available: false,
        source: 'template-based'
      });
    }
  });

  // Strategy 3: Industry-specific
  if (industry) {
    const industryNormalized = normalizeBrandName(industry);
    suggestions.push({
      subdomain: `${normalized}-${industryNormalized}`,
      relevanceScore: 0.7,
      available: false,
      source: 'template-based'
    });
  }

  // Strategy 4: Keyword combinations
  if (keywords && keywords.length > 0) {
    keywords.slice(0, 2).forEach(keyword => {
      const keywordNormalized = normalizeBrandName(keyword);
      suggestions.push({
        subdomain: `${normalized}-${keywordNormalized}`,
        relevanceScore: 0.6,
        available: false,
        source: 'template-based'
      });
    });
  }

  // Strategy 5: Abbreviated brand name
  if (brandName.split(' ').length > 1) {
    const initials = brandName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toLowerCase();

    if (initials.length >= MIN_SUBDOMAIN_LENGTH) {
      suggestions.push({
        subdomain: initials,
        relevanceScore: 0.5,
        available: false,
        source: 'template-based'
      });
    }
  }

  // Strategy 6: Add numbers (last resort)
  [2, 3, 99].forEach(num => {
    suggestions.push({
      subdomain: `${normalized}${num}`,
      relevanceScore: 0.3,
      available: false,
      source: 'template-based'
    });
  });

  // Remove duplicates and invalid suggestions
  const uniqueSuggestions = Array.from(
    new Map(suggestions.map(s => [s.subdomain, s])).values()
  ).filter(s => validateSubdomain(s.subdomain).valid);

  // Sort by relevance score
  return uniqueSuggestions.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Main function to check subdomain and provide alternatives
 */
export async function checkSubdomain(
  requestedSubdomain: string,
  brandName?: string,
  industry?: string,
  keywords?: string[]
): Promise<SubdomainCheckResult> {
  // Validate format
  const validation = validateSubdomain(requestedSubdomain);
  if (!validation.valid) {
    return {
      requested: requestedSubdomain,
      available: false,
      suggestions: [],
      reserved: false,
      expiresAt: null,
      validationErrors: validation.errors
    };
  }

  // Check availability
  const available = await checkSubdomainAvailability(requestedSubdomain);

  if (available) {
    return {
      requested: requestedSubdomain,
      available: true,
      suggestions: [],
      reserved: false,
      expiresAt: null
    };
  }

  // Generate alternative suggestions
  const allSuggestions = await generateSubdomainSuggestions(
    brandName || requestedSubdomain,
    industry,
    keywords
  );

  // Check availability for each suggestion
  const availableSuggestions: string[] = [];
  for (const suggestion of allSuggestions) {
    if (availableSuggestions.length >= 5) break;

    const isAvailable = await checkSubdomainAvailability(suggestion.subdomain);
    if (isAvailable) {
      availableSuggestions.push(suggestion.subdomain);
    }
  }

  return {
    requested: requestedSubdomain,
    available: false,
    suggestions: availableSuggestions,
    reserved: RESERVED_SUBDOMAINS.includes(requestedSubdomain),
    expiresAt: null
  };
}

/**
 * Reserve a subdomain temporarily (5 minutes) to prevent race conditions
 * In production, this would use a distributed cache (Redis)
 */
const subdomainReservations = new Map<string, Date>();

export function reserveSubdomain(subdomain: string): boolean {
  const existing = subdomainReservations.get(subdomain);
  if (existing && existing > new Date()) {
    return false; // Already reserved
  }

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
  subdomainReservations.set(subdomain, expiresAt);
  return true;
}

export function releaseSubdomain(subdomain: string): void {
  subdomainReservations.delete(subdomain);
}

export function isSubdomainReserved(subdomain: string): boolean {
  const expiresAt = subdomainReservations.get(subdomain);
  if (!expiresAt) return false;

  if (expiresAt < new Date()) {
    subdomainReservations.delete(subdomain);
    return false;
  }

  return true;
}

/**
 * Clean up expired reservations (should be called periodically)
 */
export function cleanupExpiredReservations(): void {
  const now = new Date();
  for (const [subdomain, expiresAt] of subdomainReservations.entries()) {
    if (expiresAt < now) {
      subdomainReservations.delete(subdomain);
    }
  }
}

// Cleanup every minute
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredReservations, 60 * 1000);
}
