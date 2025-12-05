/**
 * Type definitions for the MACHUPS Auto-Deploy system
 */

export type DeploymentStatus =
  | 'pending'
  | 'checking-subdomain'
  | 'building'
  | 'deploying'
  | 'configuring-ssl'
  | 'capturing-screenshot'
  | 'minting-nft'
  | 'live'
  | 'failed';

export type NFTMintStatus =
  | 'pending'
  | 'preparing-metadata'
  | 'uploading-to-ipfs'
  | 'minting'
  | 'minted'
  | 'failed';

export interface SubdomainCheckResult {
  requested: string;
  available: boolean;
  suggestions: string[];
  reserved: boolean;
  expiresAt: Date | null;
  validationErrors?: string[];
}

export interface DeploymentConfig {
  subdomain: string;
  brandId: string;
  brandName: string;
  brandPackagePath: string;
  includeNFT: boolean;
  walletAddress?: string;
  customDomain?: string;
}

export interface DeploymentProgress {
  id: string;
  subdomain: string;
  url: string;
  status: DeploymentStatus;
  progress: number; // 0-100
  currentStage: string;
  estimatedCompletion: Date;
  error: DeploymentError | null;
  createdAt: Date;
  completedAt: Date | null;
}

export interface DeploymentError {
  code: string;
  message: string;
  stage: DeploymentStatus;
  retryable: boolean;
  technicalDetails?: string;
  userMessage: string;
  suggestedFixes?: DeploymentFix[];
}

export interface DeploymentFix {
  action: string;
  automatic: boolean;
  requiresUserInput: boolean;
  estimatedTime?: string;
}

export interface ScreenshotConfig {
  viewport: {
    width: number;
    height: number;
    deviceScaleFactor: number;
  };
  waitForSelector?: string;
  waitForTimeout: number;
  clip?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  hideElements?: string[];
}

export interface ScreenshotMetadata {
  url: string; // IPFS URL
  localPath?: string;
  width: number;
  height: number;
  format: 'png' | 'jpg' | 'webp';
  size: number; // bytes
  capturedAt: Date;
  viewport: ScreenshotConfig['viewport'];
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string; // IPFS URL
  external_url: string;
  attributes: NFTAttribute[];
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
  display_type?: 'number' | 'date' | 'boost_number' | 'boost_percentage';
}

export interface NFTMintResult {
  tokenId: string;
  contractAddress: string;
  txHash: string;
  recipient: string;
  metadata: NFTMetadata;
  status: NFTMintStatus;
  error?: string;
  mintedAt?: Date;
}

export interface CloudflareDeploymentResult {
  id: string;
  projectName: string;
  deploymentUrl: string;
  status: 'queued' | 'building' | 'deploying' | 'success' | 'failure';
  buildLog?: string;
  errorMessage?: string;
  createdAt: Date;
}

export interface CustomDomainConfig {
  domain: string;
  subdomain: string;
  dnsRecords: DNSRecord[];
  sslStatus: 'pending' | 'active' | 'failed';
  verificationToken: string;
  verified: boolean;
}

export interface DNSRecord {
  type: 'A' | 'AAAA' | 'CNAME' | 'TXT' | 'MX';
  name: string;
  value: string;
  ttl: number;
  priority?: number;
}

export interface DeploymentMetrics {
  totalDeployments: number;
  successRate: number;
  averageDeploymentTime: number; // seconds
  subdomainConflictRate: number;
  nftMintingSuccessRate: number;
  screenshotCaptureSuccessRate: number;
  costPerDeployment: number; // USD
}

export interface SubdomainSuggestion {
  subdomain: string;
  relevanceScore: number;
  available: boolean;
  source: 'ai-generated' | 'template-based' | 'user-provided';
}

/**
 * Configuration for deployment rate limiting
 */
export interface RateLimitConfig {
  maxDeploymentsPerMinute: number;
  maxDeploymentsPerHour: number;
  maxDeploymentsPerDay: number;
  maxConcurrentDeployments: number;
}

/**
 * User tier configuration for deployments
 */
export interface UserTierConfig {
  tier: 'free' | 'pro' | 'enterprise';
  deploymentsPerMonth: number;
  customDomainsAllowed: boolean;
  nftMintsIncluded: number;
  priorityQueue: boolean;
  support: 'community' | 'email' | 'dedicated';
}
