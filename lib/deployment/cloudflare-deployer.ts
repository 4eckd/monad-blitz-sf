/**
 * Cloudflare Pages deployment integration for MACHUPS Auto-Deploy
 * Handles automated deployment to custom subdomains
 */

import type {
  DeploymentConfig,
  DeploymentProgress,
  DeploymentError,
  CloudflareDeploymentResult
} from './types';

const CLOUDFLARE_API_BASE = 'https://api.cloudflare.com/client/v4';

interface CloudflareAPIOptions {
  apiToken: string;
  accountId: string;
  zoneId?: string;
}

interface CloudflareAPIDeploymentResponse {
  id: string;
  url: string;
  latest_stage: {
    status: string;
    error_message?: string;
  };
  build_log?: string;
  created_on: string;
}

interface CloudflareAPIResponse<T> {
  result: T;
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  messages: string[];
}

/**
 * Cloudflare Pages Deployer Class
 */
export class CloudflareDeployer {
  private apiToken: string;
  private accountId: string;
  private zoneId?: string;

  constructor(options: CloudflareAPIOptions) {
    this.apiToken = options.apiToken;
    this.accountId = options.accountId;
    this.zoneId = options.zoneId;
  }

  /**
   * Make authenticated request to Cloudflare API
   */
  private async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: unknown
  ): Promise<T> {
    const url = `${CLOUDFLARE_API_BASE}${endpoint}`;

    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Cloudflare API error: ${error.errors?.[0]?.message || response.statusText}`
      );
    }

    const data = await response.json();
    return data.result as T;
  }

  /**
   * Create a new Cloudflare Pages project
   */
  async createPagesProject(projectName: string): Promise<{ id: string }> {
    return this.makeRequest(
      `/accounts/${this.accountId}/pages/projects`,
      'POST',
      {
        name: projectName,
        production_branch: 'main',
        build_config: {
          build_command: 'npm run build',
          destination_dir: 'out',
          root_dir: '/'
        }
      }
    );
  }

  /**
   * Deploy static files to Cloudflare Pages
   */
  async deployToPages(
    projectName: string,
    files: Map<string, Buffer | string>
  ): Promise<CloudflareDeploymentResult> {
    const formData = new FormData();

    // Add manifest
    const manifest: Record<string, string> = {};
    files.forEach((_, path) => {
      manifest[path] = path;
    });
    formData.append('manifest', JSON.stringify(manifest));

    // Add files
    files.forEach((content, path) => {
      const blob = content instanceof Buffer
        ? new Blob([content])
        : new Blob([content], { type: 'text/plain' });
      formData.append(path, blob, path);
    });

    const url = `${CLOUDFLARE_API_BASE}/accounts/${this.accountId}/pages/projects/${projectName}/deployments`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiToken}`
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Deployment failed: ${error.errors?.[0]?.message || response.statusText}`
      );
    }

    const data = await response.json();
    const result = data.result;

    return {
      id: result.id,
      projectName,
      deploymentUrl: result.url,
      status: result.latest_stage.status,
      createdAt: new Date(result.created_on)
    };
  }

  /**
   * Configure custom domain for Pages project
   */
  async configureCustomDomain(
    projectName: string,
    subdomain: string,
    baseDomain: string = 'machups.com'
  ): Promise<void> {
    const fullDomain = `${subdomain}.${baseDomain}`;

    await this.makeRequest(
      `/accounts/${this.accountId}/pages/projects/${projectName}/domains`,
      'POST',
      { name: fullDomain }
    );
  }

  /**
   * Get deployment status
   */
  async getDeploymentStatus(
    projectName: string,
    deploymentId: string
  ): Promise<CloudflareDeploymentResult> {
    const result = await this.makeRequest<CloudflareAPIDeploymentResponse>(
      `/accounts/${this.accountId}/pages/projects/${projectName}/deployments/${deploymentId}`
    );

    return {
      id: result.id,
      projectName,
      deploymentUrl: result.url,
      status: result.latest_stage.status,
      buildLog: result.build_log,
      errorMessage: result.latest_stage.error_message,
      createdAt: new Date(result.created_on)
    };
  }

  /**
   * Configure DNS record for subdomain
   */
  async configureDNS(
    subdomain: string,
    targetDomain: string
  ): Promise<void> {
    if (!this.zoneId) {
      throw new Error('Zone ID required for DNS configuration');
    }

    await this.makeRequest(
      `/zones/${this.zoneId}/dns_records`,
      'POST',
      {
        type: 'CNAME',
        name: subdomain,
        content: targetDomain,
        ttl: 1, // Auto
        proxied: true // Enable Cloudflare proxy
      }
    );
  }

  /**
   * Check SSL certificate status
   */
  async checkSSLStatus(hostname: string): Promise<'pending' | 'active' | 'failed'> {
    if (!this.zoneId) {
      throw new Error('Zone ID required for SSL status check');
    }

    try {
      const result = await this.makeRequest<any>(
        `/zones/${this.zoneId}/ssl/certificate_packs`
      );

      const cert = result.find((c: any) =>
        c.hosts.includes(hostname)
      );

      if (!cert) return 'pending';
      return cert.status === 'active' ? 'active' : 'pending';
    } catch {
      return 'failed';
    }
  }

  /**
   * Wait for SSL certificate to be active
   */
  async waitForSSL(
    hostname: string,
    maxWaitTime: number = 60000
  ): Promise<boolean> {
    const startTime = Date.now();
    const checkInterval = 5000; // Check every 5 seconds

    while (Date.now() - startTime < maxWaitTime) {
      const status = await this.checkSSLStatus(hostname);

      if (status === 'active') {
        return true;
      }

      if (status === 'failed') {
        return false;
      }

      await new Promise(resolve => setTimeout(resolve, checkInterval));
    }

    return false; // Timeout
  }

  /**
   * Delete a Pages project (cleanup)
   */
  async deleteProject(projectName: string): Promise<void> {
    await this.makeRequest(
      `/accounts/${this.accountId}/pages/projects/${projectName}`,
      'DELETE'
    );
  }
}

/**
 * Initialize Cloudflare deployer from environment variables
 */
export function createCloudflareDeployer(): CloudflareDeployer {
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;

  if (!apiToken || !accountId) {
    throw new Error(
      'Missing required Cloudflare credentials: CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID'
    );
  }

  return new CloudflareDeployer({ apiToken, accountId, zoneId });
}

/**
 * Deploy brand package to Cloudflare Pages with custom subdomain
 */
export async function deployBrandPackage(
  config: DeploymentConfig,
  onProgress?: (progress: Partial<DeploymentProgress>) => void
): Promise<DeploymentProgress> {
  const deployer = createCloudflareDeployer();
  const deploymentId = `deploy_${Date.now()}_${Math.random().toString(36).substring(7)}`;

  const progress: DeploymentProgress = {
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

  try {
    // Stage 1: Create Pages project
    onProgress?.({ ...progress, status: 'building', progress: 10, currentStage: 'Creating Pages project' });

    await deployer.createPagesProject(config.subdomain);

    // Stage 2: Read brand package files
    onProgress?.({ ...progress, progress: 20, currentStage: 'Preparing files' });

    // TODO: Read files from config.brandPackagePath
    const files = new Map<string, string | Buffer>();
    // This would be implemented to read the actual brand package
    files.set('index.html', '<html><body>Brand Package</body></html>');

    // Stage 3: Deploy to Pages
    onProgress?.({ ...progress, status: 'deploying', progress: 40, currentStage: 'Deploying to Cloudflare Pages' });

    const deploymentResult = await deployer.deployToPages(config.subdomain, files);

    // Stage 4: Configure custom domain
    onProgress?.({ ...progress, progress: 60, currentStage: 'Configuring custom domain' });

    await deployer.configureCustomDomain(config.subdomain, config.subdomain);

    // Stage 5: Configure DNS
    onProgress?.({ ...progress, progress: 70, currentStage: 'Configuring DNS' });

    await deployer.configureDNS(config.subdomain, deploymentResult.deploymentUrl);

    // Stage 6: Wait for SSL
    onProgress?.({ ...progress, status: 'configuring-ssl', progress: 80, currentStage: 'Provisioning SSL certificate' });

    const sslSuccess = await deployer.waitForSSL(`${config.subdomain}.machups.com`);

    if (!sslSuccess) {
      console.warn('SSL provisioning timed out, but deployment may still succeed');
    }

    // Deployment complete
    const completedProgress: DeploymentProgress = {
      ...progress,
      status: 'live',
      progress: 100,
      currentStage: 'Deployment complete',
      completedAt: new Date()
    };

    onProgress?.(completedProgress);
    return completedProgress;

  } catch (error) {
    const deploymentError: DeploymentError = {
      code: 'DEPLOYMENT_FAILED',
      message: error instanceof Error ? error.message : 'Unknown deployment error',
      stage: progress.status,
      retryable: true,
      userMessage: 'We encountered an issue deploying your brand. Please try again.',
      technicalDetails: error instanceof Error ? error.stack : undefined
    };

    const failedProgress: DeploymentProgress = {
      ...progress,
      status: 'failed',
      error: deploymentError,
      completedAt: new Date()
    };

    onProgress?.(failedProgress);
    return failedProgress;
  }
}
