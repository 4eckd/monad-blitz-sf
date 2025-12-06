/**
 * Rapid Deployment System
 *
 * Automates deployment of generated brands to preview subdomains
 * - Creates preview site from template
 * - Configures subdomain routing
 * - Deploys to Vercel Edge network
 * - Sets up CI/CD pipeline
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

export interface DeploymentConfig {
  brandId: string;
  brandName: string;
  subdomain: string; // e.g., "gonads.preview"
  vercelToken: string;
  vercelOrgId?: string;
  vercelProjectId?: string;
  domain: string; // e.g., "machups.com"
}

export interface DeploymentResult {
  success: boolean;
  previewUrl: string;
  deploymentId: string;
  deploymentUrl: string;
  inspectorUrl: string;
  buildTime: number; // seconds
}

export class RapidDeploymentSystem {
  private config: DeploymentConfig;
  private workDir: string;

  constructor(config: DeploymentConfig) {
    this.config = config;
    this.workDir = path.join(
      process.cwd(),
      'brands',
      config.brandId,
      'preview'
    );
  }

  /**
   * Deploy brand to preview subdomain
   */
  async deploy(): Promise<DeploymentResult> {
    const startTime = Date.now();

    try {
      console.log(`🚀 Starting deployment for ${this.config.brandName}...`);

      // Step 1: Prepare deployment directory
      await this.prepareDeploymentDirectory();

      // Step 2: Build Next.js application
      await this.buildApplication();

      // Step 3: Deploy to Vercel
      const deployment = await this.deployToVercel();

      // Step 4: Configure custom domain
      await this.configureDomain(deployment.deploymentUrl);

      // Step 5: Set up CI/CD
      await this.setupCICD();

      const buildTime = Math.round((Date.now() - startTime) / 1000);

      console.log(`✅ Deployment complete in ${buildTime}s`);

      return {
        success: true,
        previewUrl: `https://${this.config.subdomain}.${this.config.domain}`,
        deploymentId: deployment.id,
        deploymentUrl: deployment.url,
        inspectorUrl: `https://vercel.com/${this.config.vercelOrgId}/${this.config.vercelProjectId}/${deployment.id}`,
        buildTime,
      };
    } catch (error) {
      console.error('❌ Deployment failed:', error);
      throw error;
    }
  }

  /**
   * Step 1: Prepare deployment directory
   */
  private async prepareDeploymentDirectory(): Promise<void> {
    console.log('📁 Preparing deployment directory...');

    // Ensure directory exists
    await fs.mkdir(this.workDir, { recursive: true });

    // Check if package.json exists
    const packageJsonPath = path.join(this.workDir, 'package.json');
    try {
      await fs.access(packageJsonPath);
    } catch {
      throw new Error(
        `package.json not found in ${this.workDir}. Run brand generation first.`
      );
    }

    console.log('✓ Directory prepared');
  }

  /**
   * Step 2: Build Next.js application
   */
  private async buildApplication(): Promise<void> {
    console.log('🔨 Building Next.js application...');

    try {
      // Install dependencies
      const { stdout: installOutput } = await execAsync('npm install', {
        cwd: this.workDir,
      });
      console.log('✓ Dependencies installed');

      // Run build
      const { stdout: buildOutput } = await execAsync('npm run build', {
        cwd: this.workDir,
        env: {
          ...process.env,
          NEXT_PUBLIC_BRAND_NAME: this.config.brandName,
          NEXT_PUBLIC_PREVIEW_MODE: 'true',
        },
      });
      console.log('✓ Build completed');
    } catch (error: any) {
      console.error('Build failed:', error.stdout || error.message);
      throw error;
    }
  }

  /**
   * Step 3: Deploy to Vercel
   */
  private async deployToVercel(): Promise<{
    id: string;
    url: string;
  }> {
    console.log('☁️  Deploying to Vercel...');

    try {
      // Pull Vercel environment
      await execAsync(
        `vercel pull --yes --environment=production --token=${this.config.vercelToken}`,
        { cwd: this.workDir }
      );

      // Build with Vercel
      await execAsync(`vercel build --prod --token=${this.config.vercelToken}`, {
        cwd: this.workDir,
      });

      // Deploy
      const { stdout } = await execAsync(
        `vercel deploy --prebuilt --prod --token=${this.config.vercelToken}`,
        { cwd: this.workDir }
      );

      const deploymentUrl = stdout.trim();
      const deploymentId = this.extractDeploymentId(deploymentUrl);

      console.log(`✓ Deployed to ${deploymentUrl}`);

      return {
        id: deploymentId,
        url: deploymentUrl,
      };
    } catch (error: any) {
      console.error('Vercel deployment failed:', error.stdout || error.message);
      throw error;
    }
  }

  /**
   * Step 4: Configure custom domain
   */
  private async configureDomain(deploymentUrl: string): Promise<void> {
    console.log('🌐 Configuring custom domain...');

    const customDomain = `${this.config.subdomain}.${this.config.domain}`;

    try {
      // Add domain to Vercel project
      await execAsync(
        `vercel domains add ${customDomain} --token=${this.config.vercelToken}`,
        { cwd: this.workDir }
      );

      console.log(`✓ Domain ${customDomain} configured`);
      console.log(
        `  ℹ️  Configure DNS: CNAME ${this.config.subdomain} → cname.vercel-dns.com`
      );
    } catch (error: any) {
      // Domain might already exist, that's okay
      if (error.message.includes('already exists')) {
        console.log(`✓ Domain ${customDomain} already configured`);
      } else {
        console.warn('Domain configuration warning:', error.message);
      }
    }
  }

  /**
   * Step 5: Set up CI/CD pipeline
   */
  private async setupCICD(): Promise<void> {
    console.log('⚙️  Setting up CI/CD pipeline...');

    const workflowPath = path.join(
      process.cwd(),
      '.github',
      'workflows',
      `deploy-${this.config.brandId}.yml`
    );

    const workflowContent = this.generateGitHubActionsWorkflow();

    try {
      await fs.mkdir(path.dirname(workflowPath), { recursive: true });
      await fs.writeFile(workflowPath, workflowContent);
      console.log(`✓ CI/CD workflow created at ${workflowPath}`);
    } catch (error) {
      console.warn('CI/CD setup warning:', error);
    }
  }

  /**
   * Generate GitHub Actions workflow for brand
   */
  private generateGitHubActionsWorkflow(): string {
    return `name: Deploy ${this.config.brandName} Preview

on:
  push:
    branches:
      - main
    paths:
      - 'brands/${this.config.brandId}/**'
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        working-directory: ./brands/${this.config.brandId}/preview
        run: npm ci

      - name: Build
        working-directory: ./brands/${this.config.brandId}/preview
        run: npm run build

      - name: Deploy to Vercel
        working-directory: ./brands/${this.config.brandId}/preview
        env:
          VERCEL_TOKEN: \${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}
        run: |
          npx vercel --token $VERCEL_TOKEN --prod --yes
`;
  }

  /**
   * Extract deployment ID from Vercel URL
   */
  private extractDeploymentId(url: string): string {
    // Vercel URLs are like: https://project-abc123.vercel.app
    const match = url.match(/https:\/\/[^-]+-([^.]+)\.vercel\.app/);
    return match ? match[1] : 'unknown';
  }
}

/**
 * Factory function to create deployment system
 */
export function createDeploymentSystem(
  config: DeploymentConfig
): RapidDeploymentSystem {
  return new RapidDeploymentSystem(config);
}

/**
 * Quick deploy function
 */
export async function rapidDeploy(
  config: DeploymentConfig
): Promise<DeploymentResult> {
  const system = createDeploymentSystem(config);
  return await system.deploy();
}

/**
 * Batch deploy multiple brands
 */
export async function batchDeploy(
  configs: DeploymentConfig[]
): Promise<DeploymentResult[]> {
  console.log(`🚀 Deploying ${configs.length} brands...`);

  const results: DeploymentResult[] = [];

  for (const config of configs) {
    try {
      const result = await rapidDeploy(config);
      results.push(result);
      console.log(`✅ ${config.brandName}: ${result.previewUrl}`);
    } catch (error) {
      console.error(`❌ ${config.brandName} failed:`, error);
      results.push({
        success: false,
        previewUrl: '',
        deploymentId: '',
        deploymentUrl: '',
        inspectorUrl: '',
        buildTime: 0,
      });
    }
  }

  const successCount = results.filter((r) => r.success).length;
  console.log(`\n✅ ${successCount}/${configs.length} deployments successful`);

  return results;
}
