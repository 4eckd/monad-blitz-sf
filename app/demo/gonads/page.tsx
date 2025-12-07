'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

/**
 * GONADS Brand Demo Page
 *
 * Demonstrates the MACHUPS brand generation system by creating
 * a complete brand package for gonads.io - a memecoin with
 * colorfully morbid humor.
 *
 * Features:
 * - Real-time progress tracking
 * - Modal.com GPU-accelerated generation
 * - Automatic subdomain deployment (gonads.machups.com)
 * - Download complete brand package
 */

interface GenerationPhase {
  phase: number;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
  message?: string;
  duration?: number;
}

interface BrandGenerationResult {
  success: boolean;
  brandName: string;
  subdomain: string;
  data: {
    brandAnalysis: {
      name: string;
      tagline: string;
      colors: {
        primary: string;
        secondary: string;
        accent: string;
      };
      personality: string[];
    };
    mockups: Record<string, string>;
    metadata: {
      generationTime: number;
    };
  };
}

export default function GonadsDemoPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [phases, setPhases] = useState<GenerationPhase[]>([
    { phase: 1, name: 'Brand Analysis', status: 'pending' },
    { phase: 2, name: 'Logo Generation', status: 'pending' },
    { phase: 3, name: 'Mockup Creation', status: 'pending' },
    { phase: 4, name: 'Finalizing Package', status: 'pending' }
  ]);
  const [result, setResult] = useState<BrandGenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updatePhase = (
    phaseNumber: number,
    status: GenerationPhase['status'],
    message?: string
  ) => {
    setPhases((prev) =>
      prev.map((p) =>
        p.phase === phaseNumber ? { ...p, status, message } : p
      )
    );
  };

  const generateBrand = async () => {
    setIsGenerating(true);
    setError(null);
    setResult(null);

    // Reset phases
    setPhases((prev) => prev.map((p) => ({ ...p, status: 'pending' })));

    try {
      const startTime = Date.now();

      // Phase 1: Brand Analysis
      updatePhase(1, 'in_progress', 'Analyzing brand with Claude AI...');

      const response = await fetch('/api/generate/brand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          businessIdea: `GONADS is a memecoin that embodies memecoin culture with
            colorfully and thoughtfully morbid references. It's a web3 NFT idea
            for gonads.io. The brand should be bold, humorous, slightly irreverent,
            and embrace cliche with a morbid twist. Think "balls to the wall"
            energy meets sophisticated design execution.`,
          targetAudience: `Web3 enthusiasts, memecoin investors, and NFT collectors
            aged 18-35 who appreciate humor, meme culture, and aren't afraid of
            edgy content. They value authenticity, community, and creative
            expression in the crypto space.`,
          style: 'bold',
          industry: 'Web3 / Cryptocurrency / NFT / Memecoin',
          subdomain: 'gonads',
          includeAiLogos: false, // Set to true for AI-generated logos (slower, GPU)
          includeAiImagery: false // Set to true for AI imagery (slower, GPU)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Generation failed');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Unknown error');
      }

      updatePhase(1, 'completed', `Brand: ${data.brandName}`);

      // Phase 2: Logos
      updatePhase(2, 'in_progress', 'Creating logo variations...');
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate
      updatePhase(2, 'completed', 'HTML/CSS logos generated');

      // Phase 3: Mockups
      updatePhase(
        3,
        'in_progress',
        'Rendering mockups (business card, social, website)...'
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      updatePhase(
        3,
        'completed',
        `${Object.keys(data.data.mockups).length} mockups created`
      );

      // Phase 4: Finalize
      updatePhase(4, 'in_progress', 'Packaging assets...');
      await new Promise((resolve) => setTimeout(resolve, 300));

      const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
      updatePhase(4, 'completed', `Completed in ${totalTime}s`);

      setResult(data);
    } catch (err) {
      console.error('Generation error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');

      // Mark current phase as error
      const currentPhase = phases.find((p) => p.status === 'in_progress');
      if (currentPhase) {
        updatePhase(currentPhase.phase, 'error', 'Failed');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAsset = (base64Data: string, filename: string) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64Data}`;
    link.download = filename;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-purple-600 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-white mb-4 tracking-tight">
            GONADS
          </h1>
          <p className="text-2xl text-white/90 font-semibold mb-2">
            Brand Generation Demo
          </p>
          <p className="text-white/80 text-lg">
            Memecoin culture meets AI-powered branding
          </p>
        </div>

        {/* Generate Button */}
        {!result && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Generate Complete Brand Package
              </h2>
              <p className="text-white/80">
                Creates logo, design tokens, mockups, and deployment in ~60-90
                seconds
              </p>
            </div>

            <button
              onClick={generateBrand}
              disabled={isGenerating}
              className="w-full bg-white hover:bg-gray-100 text-purple-600 font-bold py-4 px-8 rounded-xl text-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate GONADS Brand 🚀'
              )}
            </button>
          </div>
        )}

        {/* Progress */}
        {isGenerating && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">
              Generation Progress
            </h3>

            <div className="space-y-4">
              {phases.map((phase) => (
                <div key={phase.phase} className="flex items-start gap-4">
                  {/* Status Icon */}
                  <div className="mt-1">
                    {phase.status === 'pending' && (
                      <div className="w-6 h-6 rounded-full border-2 border-white/40" />
                    )}
                    {phase.status === 'in_progress' && (
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    )}
                    {phase.status === 'completed' && (
                      <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    {phase.status === 'error' && (
                      <div className="w-6 h-6 rounded-full bg-red-400 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Phase Info */}
                  <div className="flex-1">
                    <div className="font-semibold text-white">
                      Phase {phase.phase}: {phase.name}
                    </div>
                    {phase.message && (
                      <div className="text-sm text-white/70 mt-1">
                        {phase.message}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-red-500/30">
            <h3 className="text-xl font-bold text-white mb-2">Error</h3>
            <p className="text-white/90">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setResult(null);
              }}
              className="mt-4 bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-6 rounded-lg transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Success Header */}
            <div className="bg-green-500/20 backdrop-blur-lg rounded-2xl p-8 border border-green-500/30">
              <h2 className="text-3xl font-bold text-white mb-4">
                ✅ Brand Generated Successfully!
              </h2>
              <div className="grid grid-cols-2 gap-4 text-white">
                <div>
                  <div className="text-white/70 text-sm">Brand Name</div>
                  <div className="font-bold text-xl">
                    {result.data.brandAnalysis.name}
                  </div>
                </div>
                <div>
                  <div className="text-white/70 text-sm">Subdomain</div>
                  <div className="font-bold text-xl">
                    {result.subdomain}.machups.com
                  </div>
                </div>
                <div>
                  <div className="text-white/70 text-sm">Generation Time</div>
                  <div className="font-bold text-xl">
                    {result.data.metadata.generationTime.toFixed(1)}s
                  </div>
                </div>
                <div>
                  <div className="text-white/70 text-sm">Assets</div>
                  <div className="font-bold text-xl">
                    {Object.keys(result.data.mockups).length} mockups
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Analysis */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Brand Analysis
              </h3>
              <div className="space-y-4 text-white">
                <div>
                  <div className="text-white/70 text-sm mb-1">Tagline</div>
                  <div className="text-lg font-semibold">
                    {result.data.brandAnalysis.tagline}
                  </div>
                </div>
                <div>
                  <div className="text-white/70 text-sm mb-2">
                    Color Palette
                  </div>
                  <div className="flex gap-3">
                    {[
                      result.data.brandAnalysis.colors.primary,
                      result.data.brandAnalysis.colors.secondary,
                      result.data.brandAnalysis.colors.accent
                    ].map((color, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-white/30"
                          style={{ backgroundColor: color }}
                        />
                        <span className="font-mono text-sm">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-white/70 text-sm mb-1">Personality</div>
                  <div className="flex gap-2 flex-wrap">
                    {result.data.brandAnalysis.personality.map(
                      (trait: string, i: number) => (
                        <span
                          key={i}
                          className="bg-white/20 px-3 py-1 rounded-full text-sm"
                        >
                          {trait}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mockups */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Mockups</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(result.data.mockups).map(
                  ([name, data]: [string, string]) => (
                    <div key={name} className="space-y-2">
                      <img
                        src={`data:image/png;base64,${data}`}
                        alt={name}
                        className="w-full rounded-lg border-2 border-white/20"
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-white/90 text-sm capitalize">
                          {name.replace(/_/g, ' ')}
                        </span>
                        <button
                          onClick={() =>
                            downloadAsset(data, `gonads-${name}.png`)
                          }
                          className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded transition-all"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">
                Next Steps
              </h3>
              <div className="space-y-3">
                <a
                  href={`https://${result.subdomain}.machups.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-all"
                >
                  View Live Preview →
                </a>
                <button
                  onClick={() => {
                    setResult(null);
                    setPhases((prev) =>
                      prev.map((p) => ({ ...p, status: 'pending' }))
                    );
                  }}
                  className="block w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg text-center transition-all"
                >
                  Generate New Brand
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
