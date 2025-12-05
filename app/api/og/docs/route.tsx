import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

/**
 * Dynamic Open Graph Image Generator for Docs
 *
 * Uses Monad brand styling from NFT certificate template
 *
 * Query params:
 * - title: Page title
 * - description: Page description (optional)
 * - section: Documentation section (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get('title') || 'MACHUPS Documentation';
    const description = searchParams.get('description') || 'AI-Powered Brand Generation in Under 3 Minutes';
    const section = searchParams.get('section') || 'Docs';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0E091C 0%, #1a1228 50%, #0E091C 100%)',
            fontFamily: 'Inter, system-ui, sans-serif',
            position: 'relative'
          }}
        >
          {/* Decorative Border */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 40,
              right: 40,
              bottom: 40,
              border: '4px solid transparent',
              backgroundImage: 'linear-gradient(90deg, #6E54FF 0%, #DDD7FE 50%, #6E54FF 100%)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'border-box',
              borderRadius: 20,
              WebkitMask:
                'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              display: 'flex'
            }}
          />

          {/* Inner Border */}
          <div
            style={{
              position: 'absolute',
              top: 60,
              left: 60,
              right: 60,
              bottom: 60,
              border: '2px solid rgba(71, 85, 105, 0.5)',
              borderRadius: 10,
              display: 'flex'
            }}
          />

          {/* Corner Decorations */}
          <svg
            width="40"
            height="40"
            style={{ position: 'absolute', top: 80, left: 80 }}
          >
            <path
              d="M 0 20 L 0 0 L 20 0"
              stroke="#6E54FF"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <svg
            width="40"
            height="40"
            style={{ position: 'absolute', top: 80, right: 80, transform: 'scaleX(-1)' }}
          >
            <path
              d="M 0 20 L 0 0 L 20 0"
              stroke="#6E54FF"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Monad Logomark */}
          <div
            style={{
              position: 'absolute',
              top: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(110, 84, 255, 0.3) 0%, transparent 70%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="50" height="50" viewBox="0 0 182 184" fill="none">
                <path
                  d="M90.5358 0C64.3911 0 0 65.2598 0 91.7593C0 118.259 64.3911 183.52 90.5358 183.52C116.681 183.52 181.073 118.258 181.073 91.7593C181.073 65.2609 116.682 0 90.5358 0ZM76.4273 144.23C65.4024 141.185 35.7608 88.634 38.7655 77.4599C41.7703 66.2854 93.62 36.2439 104.645 39.2892C115.67 42.3341 145.312 94.8846 142.307 106.059C139.302 117.234 87.4522 147.276 76.4273 144.23Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          {/* Event Badge */}
          <div
            style={{
              position: 'absolute',
              top: 200,
              fontSize: 24,
              fontWeight: 700,
              background: 'linear-gradient(90deg, #6E54FF, #DDD7FE)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '0.05em',
              display: 'flex'
            }}
          >
            MONAD BLITZ SF #18
          </div>

          {/* Section Badge */}
          <div
            style={{
              marginTop: 80,
              padding: '8px 24px',
              background: 'rgba(110, 84, 255, 0.2)',
              border: '2px solid #6E54FF',
              borderRadius: 999,
              fontSize: 18,
              fontWeight: 600,
              color: '#DDD7FE',
              letterSpacing: '0.1em',
              display: 'flex'
            }}
          >
            {section.toUpperCase()}
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 120px',
              maxWidth: 1000,
              marginTop: 40
            }}
          >
            {/* Title */}
            <div
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: 'white',
                textAlign: 'center',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: 30,
                display: 'flex'
              }}
            >
              {title}
            </div>

            {/* Description */}
            {description && (
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 400,
                  color: '#DDD7FE',
                  textAlign: 'center',
                  lineHeight: 1.4,
                  opacity: 0.9,
                  display: 'flex'
                }}
              >
                {description}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: 80,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#6E54FF',
                letterSpacing: '0.15em',
                display: 'flex'
              }}
            >
              DOCS.MACHUPS.COM
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: '#DDD7FE',
                letterSpacing: '0.1em',
                opacity: 0.7,
                display: 'flex'
              }}
            >
              POWERED BY MONAD
            </div>
          </div>

          {/* Decorative Lines */}
          <svg
            width="200"
            height="2"
            style={{ position: 'absolute', top: 280, left: 300 }}
          >
            <line
              x1="0"
              y1="1"
              x2="200"
              y2="1"
              stroke="url(#line-gradient)"
              strokeWidth="2"
              opacity="0.5"
            />
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6E54FF" />
                <stop offset="100%" stopColor="#DDD7FE" />
              </linearGradient>
            </defs>
          </svg>

          <svg
            width="200"
            height="2"
            style={{ position: 'absolute', top: 280, right: 300 }}
          >
            <line
              x1="0"
              y1="1"
              x2="200"
              y2="1"
              stroke="url(#line-gradient-2)"
              strokeWidth="2"
              opacity="0.5"
            />
            <defs>
              <linearGradient id="line-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#DDD7FE" />
                <stop offset="100%" stopColor="#6E54FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('[OG Image] Error generating image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
