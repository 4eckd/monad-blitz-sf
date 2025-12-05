/**
 * Main Auto-Deploy Orchestrator for MACHUPS
 * Coordinates subdomain checking, deployment, screenshot capture, and NFT minting
 */

import type {
  DeploymentConfig,
  DeploymentProgress,
  NFTMintResult
} from './types';

import {
  checkSubdomain,
  reserveSubdomain,
  releaseSubdomain
} from './subdomain-checker';

import { deployBrandPackage } from './cloudflare-deployer';
import { captureDeploymentScreenshot } from './screenshot-capture';
import { mintCertificateNFT } from './nft-minter';

/**
 * Deployment event emitter for real-time updates
 */
type DeploymentEventCallback = (progress: DeploymentProgress) => void;

const deploymentCallbacks = new Map<string, DeploymentEventCallback[]>();

export function onDeploymentProgress(
  deploymentId: string,
  callback: DeploymentEventCallback
): () => void {
  if (!deploymentCallbacks.has(deploymentId)) {
    deploymentCallbacks.set(deploymentId, []);
  }

  deploymentCallbacks.get(deploymentId)!.push(callback);

  // Return unsubscribe function
  return () => {
    const callbacks = deploymentCallbacks.get(deploymentId);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  };
}

function emitDeploymentProgress(progress: DeploymentProgress): void {
  const callbacks = deploymentCallbacks.get(progress.id);
  if (callbacks) {
    callbacks.forEach(callback => callback(progress));
  }
}

/**
 * In-memory deployment tracking (replace with database in production)
 */
const activeDeployments = new Map<string, DeploymentProgress>();

export function getDeployment(deploymentId: string): DeploymentProgress | null {
  return activeDeployments.get(deploymentId) || null;
}

export function getAllDeployments(): DeploymentProgress[] {
  return Array.from(activeDeployments.values());
}

/**
 * Main auto-deploy function
 */
export async function autoDeploy(
  config: DeploymentConfig
): Promise<DeploymentProgress> {
  const deploymentId = `deploy_${Date.now()}_${Math.random().toString(36).substring(7)}`;

  const initialProgress: DeploymentProgress = {
    id: deploymentId,
    subdomain: config.subdomain,
    url: `https://${config.subdomain}.machups.com`,
    status: 'pending',
    progress: 0,
    currentStage: 'Initializing deployment',
    estimatedCompletion: new Date(Date.now() + 90000), // 90 seconds
    error: null,
    createdAt: new Date(),
    completedAt: null
  };

  activeDeployments.set(deploymentId, initialProgress);
  emitDeploymentProgress(initialProgress);

  try {
    // Stage 1: Check subdomain availability (2s)
    await updateProgress(deploymentId, {
      status: 'checking-subdomain',
      progress: 5,
      currentStage: 'Checking subdomain availability'
    });

    const subdomainCheck = await checkSubdomain(
      config.subdomain,
      config.brandName
    );

    if (!subdomainCheck.available) {
      throw new Error(
        `Subdomain "${config.subdomain}" is not available. Try: ${subdomainCheck.suggestions.slice(0, 3).join(', ')}`
      );
    }

    // Reserve subdomain to prevent race conditions
    const reserved = reserveSubdomain(config.subdomain);
    if (!reserved) {
      throw new Error('Subdomain was reserved by another user. Please try again.');
    }

    // Stage 2: Deploy to Cloudflare Pages (30-40s)
    await updateProgress(deploymentId, {
      status: 'building',
      progress: 15,
      currentStage: 'Building brand package'
    });

    const deploymentResult = await deployBrandPackage(config, (progress) => {
      updateProgress(deploymentId, {
        status: progress.status,
        progress: 15 + (progress.progress * 0.5), // Scale 0-100 to 15-65
        currentStage: progress.currentStage
      });
    });

    if (deploymentResult.status === 'failed') {
      throw new Error(deploymentResult.error?.message || 'Deployment failed');
    }

    // Stage 3: Capture screenshot (10s)
    await updateProgress(deploymentId, {
      status: 'capturing-screenshot',
      progress: 70,
      currentStage: 'Capturing deployment screenshot'
    });

    let screenshotBuffer: Buffer | null = null;
    let nftMintResult: NFTMintResult | null = null;

    try {
      const { buffer } = await captureDeploymentScreenshot(deploymentResult.url);
      screenshotBuffer = buffer;

      await updateProgress(deploymentId, {
        progress: 80,
        currentStage: 'Screenshot captured successfully'
      });
    } catch (error) {
      console.error('Screenshot capture failed:', error);
      // Continue without screenshot - non-critical
      await updateProgress(deploymentId, {
        progress: 80,
        currentStage: 'Screenshot capture failed, continuing...'
      });
    }

    // Stage 4: Mint NFT (if requested) (30s)
    if (config.includeNFT && config.walletAddress && screenshotBuffer) {
      await updateProgress(deploymentId, {
        status: 'minting-nft',
        progress: 85,
        currentStage: 'Minting commemorative NFT'
      });

      try {
        nftMintResult = await mintCertificateNFT(
          config.brandName,
          config.subdomain,
          screenshotBuffer,
          config.walletAddress,
          deploymentResult.url
        );

        if (nftMintResult.status === 'minted') {
          await updateProgress(deploymentId, {
            progress: 95,
            currentStage: `NFT minted - Token ID: ${nftMintResult.tokenId}`
          });
        } else {
          console.error('NFT minting failed:', nftMintResult.error);
          await updateProgress(deploymentId, {
            progress: 95,
            currentStage: 'NFT minting failed, deployment continues'
          });
        }
      } catch (error) {
        console.error('NFT minting error:', error);
        // Continue without NFT - non-critical
        await updateProgress(deploymentId, {
          progress: 95,
          currentStage: 'NFT minting failed, deployment continues'
        });
      }
    } else {
      await updateProgress(deploymentId, {
        progress: 95,
        currentStage: 'Skipping NFT minting'
      });
    }

    // Stage 5: Finalize (2s)
    await updateProgress(deploymentId, {
      status: 'live',
      progress: 100,
      currentStage: 'Deployment complete!',
      completedAt: new Date()
    });

    // Release subdomain reservation
    releaseSubdomain(config.subdomain);

    // Get final state
    return getDeployment(deploymentId)!;

  } catch (error) {
    // Release subdomain reservation on error
    releaseSubdomain(config.subdomain);

    const errorMessage = error instanceof Error ? error.message : 'Unknown deployment error';

    await updateProgress(deploymentId, {
      status: 'failed',
      progress: 0,
      currentStage: 'Deployment failed',
      error: {
        code: 'DEPLOYMENT_ERROR',
        message: errorMessage,
        stage: getDeployment(deploymentId)?.status || 'pending',
        retryable: true,
        userMessage: 'We encountered an issue deploying your brand. Please try again.',
        technicalDetails: error instanceof Error ? error.stack : undefined
      },
      completedAt: new Date()
    });

    return getDeployment(deploymentId)!;
  }
}

/**
 * Update deployment progress
 */
async function updateProgress(
  deploymentId: string,
  updates: Partial<DeploymentProgress>
): Promise<void> {
  const current = activeDeployments.get(deploymentId);
  if (!current) return;

  const updated: DeploymentProgress = {
    ...current,
    ...updates
  };

  activeDeployments.set(deploymentId, updated);
  emitDeploymentProgress(updated);

  // Small delay to allow UI to update
  await new Promise(resolve => setTimeout(resolve, 100));
}

/**
 * Cancel a deployment
 */
export async function cancelDeployment(deploymentId: string): Promise<boolean> {
  const deployment = getDeployment(deploymentId);
  if (!deployment) return false;

  if (deployment.status === 'live' || deployment.status === 'failed') {
    return false; // Cannot cancel completed deployments
  }

  // Release subdomain reservation
  releaseSubdomain(deployment.subdomain);

  // Update status
  await updateProgress(deploymentId, {
    status: 'failed',
    error: {
      code: 'CANCELLED',
      message: 'Deployment cancelled by user',
      stage: deployment.status,
      retryable: false,
      userMessage: 'Deployment was cancelled'
    },
    completedAt: new Date()
  });

  return true;
}

/**
 * Retry a failed deployment
 */
export async function retryDeployment(deploymentId: string): Promise<DeploymentProgress> {
  const deployment = getDeployment(deploymentId);
  if (!deployment) {
    throw new Error('Deployment not found');
  }

  if (deployment.status !== 'failed') {
    throw new Error('Can only retry failed deployments');
  }

  // Create new deployment with same config
  const config: DeploymentConfig = {
    subdomain: deployment.subdomain,
    brandId: '', // Would be stored in full implementation
    brandName: deployment.subdomain, // Would be stored in full implementation
    brandPackagePath: '', // Would be stored in full implementation
    includeNFT: false,
    walletAddress: undefined
  };

  return autoDeploy(config);
}

/**
 * Get deployment metrics
 */
export function getDeploymentMetrics(): {
  total: number;
  live: number;
  failed: number;
  inProgress: number;
  successRate: number;
} {
  const deployments = getAllDeployments();

  const total = deployments.length;
  const live = deployments.filter(d => d.status === 'live').length;
  const failed = deployments.filter(d => d.status === 'failed').length;
  const inProgress = deployments.filter(d =>
    !['live', 'failed'].includes(d.status)
  ).length;

  const successRate = total > 0 ? (live / total) * 100 : 0;

  return {
    total,
    live,
    failed,
    inProgress,
    successRate: Math.round(successRate * 10) / 10
  };
}

/**
 * Clean up old deployments (called periodically)
 */
export function cleanupOldDeployments(maxAge: number = 24 * 60 * 60 * 1000): void {
  const now = Date.now();

  for (const [id, deployment] of activeDeployments.entries()) {
    const age = now - deployment.createdAt.getTime();

    if (age > maxAge && (deployment.status === 'live' || deployment.status === 'failed')) {
      activeDeployments.delete(id);
      deploymentCallbacks.delete(id);
    }
  }
}

// Cleanup old deployments every hour
if (typeof setInterval !== 'undefined') {
  setInterval(() => cleanupOldDeployments(), 60 * 60 * 1000);
}
