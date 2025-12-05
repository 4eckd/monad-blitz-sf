/**
 * MACHUPS Auto-Deploy System
 * Complete deployment orchestration for generated brands
 */

// Main orchestrator
export {
  autoDeploy,
  getDeployment,
  getAllDeployments,
  cancelDeployment,
  retryDeployment,
  getDeploymentMetrics,
  cleanupOldDeployments,
  onDeploymentProgress
} from './auto-deploy';

// Subdomain management
export {
  checkSubdomain,
  validateSubdomain,
  normalizeBrandName,
  checkSubdomainAvailability,
  generateSubdomainSuggestions,
  reserveSubdomain,
  releaseSubdomain,
  isSubdomainReserved,
  cleanupExpiredReservations
} from './subdomain-checker';

// Cloudflare deployment
export {
  CloudflareDeployer,
  createCloudflareDeployer,
  deployBrandPackage
} from './cloudflare-deployer';

// Screenshot capture
export {
  ScreenshotCapture,
  getScreenshotCapture,
  captureDeploymentScreenshot,
  captureAllScreenshots
} from './screenshot-capture';

// NFT minting
export {
  uploadToIPFS,
  generateNFTMetadata,
  uploadNFTMetadata,
  mintCertificateNFT,
  checkMintingStatus,
  getNFTMetadata,
  generateNFTClaimLink,
  estimateMintingCost
} from './nft-minter';

// NFT certificate composition
export {
  generateCertificateSVG,
  screenshotToBase64,
  createNFTCertificate,
  generateCertificateSizes,
  validateCertificateData
} from './nft-certificate-composer';

// Types
export type {
  DeploymentStatus,
  NFTMintStatus,
  SubdomainCheckResult,
  DeploymentConfig,
  DeploymentProgress,
  DeploymentError,
  DeploymentFix,
  ScreenshotConfig,
  ScreenshotMetadata,
  NFTMetadata,
  NFTAttribute,
  NFTMintResult,
  CloudflareDeploymentResult,
  CustomDomainConfig,
  DNSRecord,
  DeploymentMetrics,
  SubdomainSuggestion,
  RateLimitConfig,
  UserTierConfig
} from './types';
