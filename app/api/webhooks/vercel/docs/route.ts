import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Vercel Deployment Webhook Handler for Docs Site
 *
 * Receives notifications when docs.machups.com deploys
 * Events: deployment.created, deployment.succeeded, deployment.failed
 *
 * Setup: Add webhook in Vercel dashboard:
 * Project Settings → Webhooks → Add Webhook
 * URL: https://api.machups.com/webhooks/vercel/docs
 * Secret: Store in VERCEL_WEBHOOK_SECRET env var
 */

interface VercelDeploymentPayload {
  type: string;
  id: string;
  createdAt: number;
  payload: {
    deployment: {
      id: string;
      name: string;
      url: string;
      inspectorUrl: string;
      createdAt: number;
      creator: {
        username: string;
      };
      target: string | null;
      meta: Record<string, string>;
      source: string;
    };
    project: {
      id: string;
      name: string;
    };
    team: {
      id: string;
      name: string;
    };
    links?: {
      deployment: string;
      project: string;
    };
  };
}

/**
 * Verify Vercel webhook signature
 */
function verifySignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac('sha1', secret);
  const digest = 'sha1=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-vercel-signature');

    if (!signature) {
      console.error('[Webhook] Missing signature header');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 401 }
      );
    }

    const rawBody = await req.text();
    const secret = process.env.VERCEL_WEBHOOK_SECRET;

    if (!secret) {
      console.error('[Webhook] VERCEL_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    // Verify signature
    if (!verifySignature(rawBody, signature, secret)) {
      console.error('[Webhook] Invalid signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const payload: VercelDeploymentPayload = JSON.parse(rawBody);
    const { type, payload: data } = payload;

    console.log(`[Webhook] Received ${type} event for ${data.project.name}`);

    // Handle different event types
    switch (type) {
      case 'deployment.created':
        await handleDeploymentCreated(data);
        break;

      case 'deployment.succeeded':
        await handleDeploymentSucceeded(data);
        break;

      case 'deployment.failed':
        await handleDeploymentFailed(data);
        break;

      case 'deployment.canceled':
        await handleDeploymentCanceled(data);
        break;

      default:
        console.log(`[Webhook] Unhandled event type: ${type}`);
    }

    return NextResponse.json({
      success: true,
      event: type,
      deployment: data.deployment.id
    });

  } catch (error) {
    console.error('[Webhook] Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleDeploymentCreated(
  data: VercelDeploymentPayload['payload']
) {
  const { deployment, project } = data;

  console.log(`[Webhook] Deployment created:`, {
    id: deployment.id,
    url: deployment.url,
    project: project.name,
    target: deployment.target || 'preview',
    creator: deployment.creator.username
  });

  // TODO: Store deployment record in database
  // TODO: Send notification to team (Slack, Discord, etc.)
}

async function handleDeploymentSucceeded(
  data: VercelDeploymentPayload['payload']
) {
  const { deployment, project } = data;

  console.log(`[Webhook] Deployment succeeded:`, {
    id: deployment.id,
    url: `https://${deployment.url}`,
    inspectorUrl: deployment.inspectorUrl,
    project: project.name,
    target: deployment.target || 'preview'
  });

  // Update deployment status
  // TODO: Mark as successful in database
  // TODO: Update cache with new deployment URL
  // TODO: Send success notification

  // If production deployment, update DNS/aliases
  if (deployment.target === 'production') {
    console.log(`[Webhook] Production deployment live: https://${deployment.url}`);
    // TODO: Update production URL in config
    // TODO: Clear CDN cache
  }
}

async function handleDeploymentFailed(
  data: VercelDeploymentPayload['payload']
) {
  const { deployment, project } = data;

  console.error(`[Webhook] Deployment failed:`, {
    id: deployment.id,
    project: project.name,
    inspectorUrl: deployment.inspectorUrl
  });

  // TODO: Mark as failed in database
  // TODO: Send alert to team
  // TODO: Trigger rollback if production
}

async function handleDeploymentCanceled(
  data: VercelDeploymentPayload['payload']
) {
  const { deployment, project } = data;

  console.log(`[Webhook] Deployment canceled:`, {
    id: deployment.id,
    project: project.name
  });

  // TODO: Update deployment status
  // TODO: Clean up any pending resources
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    service: 'Vercel Docs Webhook',
    status: 'operational',
    configured: !!process.env.VERCEL_WEBHOOK_SECRET
  });
}
