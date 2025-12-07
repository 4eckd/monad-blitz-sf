'use client';

import React, { useState } from 'react';
import { Header, Footer, Card, CardHeader, CardTitle, CardContent, Button, Input } from '@/components';

export default function GonadsPreview() {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setWalletAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header onConnectWallet={handleConnectWallet} walletAddress={walletAddress} />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9333EA]/20 via-transparent to-[#14B8A6]/20"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#9333EA]/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#14B8A6]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-[#1E293B] border border-[#9333EA] rounded-full">
              <p className="text-sm font-bold text-[#9333EA]">MONAD MAINNET • EST. 2025</p>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#9333EA] via-[#14B8A6] to-[#F97316] bg-clip-text text-transparent">
                The NFT Project
              </span>
              <br />
              <span className="text-white">with Real Balls</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#CBD5E1] mb-8 max-w-3xl mx-auto">
              Built by degens, for degens. Where memes meet value and testicular fortitude meets blockchain innovation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg">
                Grab Your Gonads
              </Button>
              <Button variant="ghost" size="lg">
                Join the Sack
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              <div className="text-center">
                <p className="text-4xl font-black bg-gradient-to-r from-[#9333EA] to-[#14B8A6] bg-clip-text text-transparent">
                  10K
                </p>
                <p className="text-sm text-[#64748B] font-semibold mt-2">Total Supply</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black bg-gradient-to-r from-[#9333EA] to-[#14B8A6] bg-clip-text text-transparent">
                  2.5K
                </p>
                <p className="text-sm text-[#64748B] font-semibold mt-2">Holders</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black bg-gradient-to-r from-[#9333EA] to-[#14B8A6] bg-clip-text text-transparent">
                  0.05Ξ
                </p>
                <p className="text-sm text-[#64748B] font-semibold mt-2">Floor Price</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black bg-gradient-to-r from-[#9333EA] to-[#14B8A6] bg-clip-text text-transparent">
                  420Ξ
                </p>
                <p className="text-sm text-[#64748B] font-semibold mt-2">Volume</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-[#1E293B]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Why We&apos;re <span className="bg-gradient-to-r from-[#9333EA] to-[#14B8A6] bg-clip-text text-transparent">Different</span>
            </h2>
            <p className="text-xl text-[#CBD5E1] max-w-2xl mx-auto">
              Not just another pfp project. We&apos;re building the boldest community in web3.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="glow" hoverable>
              <CardHeader>
                <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-[#9333EA] to-[#7C3AED] flex items-center justify-center text-3xl">
                  🎨
                </div>
                <CardTitle>Unique Art</CardTitle>
              </CardHeader>
              <CardContent>
                <p>10,000 programmatically generated Gonads with over 150 traits. Each one as bold and unique as the last.</p>
              </CardContent>
            </Card>

            <Card variant="glow" hoverable>
              <CardHeader>
                <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#0D9488] flex items-center justify-center text-3xl">
                  🤝
                </div>
                <CardTitle>Community Owned</CardTitle>
              </CardHeader>
              <CardContent>
                <p>True DAO governance. Holders vote on everything from roadmap to treasury allocation. Your voice matters.</p>
              </CardContent>
            </Card>

            <Card variant="glow" hoverable>
              <CardHeader>
                <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center text-3xl">
                  💎
                </div>
                <CardTitle>Real Utility</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Access to exclusive drops, IRL events, collaborative tools for dev teams, and revenue sharing from ecosystem projects.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mint Section */}
      <section id="mint" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Card variant="gradient">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-4xl font-black text-white mb-4">
                  Mint Your <span className="bg-gradient-to-r from-[#9333EA] to-[#14B8A6] bg-clip-text text-transparent">Pair</span>
                </h2>
                <p className="text-[#CBD5E1] mb-6">
                  Public mint is now live! Get your Gonads before they&apos;re gone.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 bg-[#0F172A] rounded-lg border border-[#334155]">
                    <span className="text-[#CBD5E1] font-semibold">Mint Price</span>
                    <span className="text-[#9333EA] font-bold">0.05 ETH</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#0F172A] rounded-lg border border-[#334155]">
                    <span className="text-[#CBD5E1] font-semibold">Remaining</span>
                    <span className="text-[#14B8A6] font-bold">7,234 / 10,000</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#0F172A] rounded-lg border border-[#334155]">
                    <span className="text-[#CBD5E1] font-semibold">Max per wallet</span>
                    <span className="text-white font-bold">5</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <Button variant="ghost" size="sm">-</Button>
                  <div className="flex-1 text-center">
                    <p className="text-4xl font-black text-white">1</p>
                  </div>
                  <Button variant="ghost" size="sm">+</Button>
                </div>

                <Button variant="accent" size="lg" fullWidth>
                  Mint Now (0.05 ETH)
                </Button>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative w-64 h-64 rounded-2xl bg-gradient-to-br from-[#9333EA] to-[#14B8A6] p-1">
                  <div className="w-full h-full bg-[#0F172A] rounded-2xl flex items-center justify-center text-8xl">
                    🎱
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#F97316] rounded-full flex items-center justify-center text-white font-black text-xl border-4 border-[#0F172A]">
                    #420
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-[#1E293B]/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Stay in the <span className="bg-gradient-to-r from-[#9333EA] to-[#14B8A6] bg-clip-text text-transparent">Loop</span>
          </h2>
          <p className="text-xl text-[#CBD5E1] mb-8">
            Get exclusive updates, early access to drops, and degen alpha straight to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <Button variant="primary" size="md" className="sm:w-auto whitespace-nowrap">
              Join the Sack
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
