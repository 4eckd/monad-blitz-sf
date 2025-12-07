import { NextRequest, NextResponse } from 'next/server';

/**
 * Brand Generation API Route
 *
 * This endpoint triggers Modal.com serverless functions to generate
 * a complete brand package including:
 * - Brand analysis (name, colors, typography, personality)
 * - HTML/CSS logos
 * - Design tokens (W3C DTCG)
 * - Mockups (business card, social media, website)
 * - Optional: AI-generated logos and imagery
 *
 * POST /api/generate/brand
 */

export const runtime = 'edge'; // Use edge runtime for faster cold starts
export const maxDuration = 300; // 5 minutes max

interface BrandGenerationRequest {
  businessIdea: string;
  targetAudience: string;
  style: 'modern' | 'classic' | 'bold' | 'minimal';
  industry?: string;
  subdomain?: string;
  includeAiLogos?: boolean;
  includeAiImagery?: boolean;
}

interface BrandGenerationResponse {
  success: boolean;
  brandId: string;
  brandName: string;
  subdomain?: string;
  data?: {
    brandAnalysis: any;
    logos: any;
    mockups: any;
    designTokens: any;
    metadata: {
      generationTime: number;
      timestamp: number;
    };
  };
  error?: string;
  progress?: {
    phase: number;
    message: string;
    percentage: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: BrandGenerationRequest = await request.json();

    // Validate required fields
    if (!body.businessIdea || !body.targetAudience) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: businessIdea and targetAudience'
        },
        { status: 400 }
      );
    }

    // Get Modal API configuration from environment
    const modalApiUrl = process.env.MODAL_API_URL;
    const modalApiKey = process.env.MODAL_API_KEY;

    if (!modalApiUrl || !modalApiKey) {
      console.error('Modal API configuration missing');
      return NextResponse.json(
        {
          success: false,
          error: 'Server configuration error. Modal API not configured.'
        },
        { status: 500 }
      );
    }

    // Call Modal function
    console.log(`Generating brand for: ${body.businessIdea}`);

    const modalResponse = await fetch(`${modalApiUrl}/generate_brand_package`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${modalApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        business_idea: body.businessIdea,
        target_audience: body.targetAudience,
        style: body.style || 'modern',
        industry: body.industry,
        include_ai_logos: body.includeAiLogos || false,
        include_ai_imagery: body.includeAiImagery || false,
        subdomain: body.subdomain
      })
    });

    if (!modalResponse.ok) {
      const errorText = await modalResponse.text();
      console.error('Modal API error:', errorText);
      return NextResponse.json(
        {
          success: false,
          error: `Modal API error: ${modalResponse.statusText}`
        },
        { status: modalResponse.status }
      );
    }

    const result = await modalResponse.json();

    // Return successful response
    return NextResponse.json({
      success: true,
      brandId: result.brand_id,
      brandName: result.brand_name,
      subdomain: result.subdomain,
      data: {
        brandAnalysis: result.brand_analysis,
        logos: result.logos,
        mockups: result.mockups,
        designTokens: result.design_tokens,
        metadata: result.metadata
      }
    } as BrandGenerationResponse);

  } catch (error) {
    console.error('Brand generation error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint for checking generation status
 *
 * GET /api/generate/brand?brandId=xxx
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const brandId = searchParams.get('brandId');

  if (!brandId) {
    return NextResponse.json(
      {
        success: false,
        error: 'Missing brandId parameter'
      },
      { status: 400 }
    );
  }

  // TODO: Implement status checking if using async generation
  // For now, return placeholder
  return NextResponse.json({
    success: true,
    brandId,
    status: 'completed',
    message: 'Brand generation status tracking not yet implemented'
  });
}
