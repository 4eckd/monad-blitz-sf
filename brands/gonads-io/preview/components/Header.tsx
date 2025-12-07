'use client';

import React from 'react';
import { Button } from './Button';

export interface HeaderProps {
  onConnectWallet?: () => void;
  walletAddress?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onConnectWallet,
  walletAddress,
  className = '',
}) => {
  return (
    <header className={`w-full bg-[#0F172A] border-b border-[#1E293B] ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <div className="absolute w-6 h-6 bg-gradient-to-br from-[#9333EA] to-[#7C3AED] rounded-full top-0 left-0 shadow-[0_0_15px_rgba(147,51,234,0.6)]"></div>
              <div className="absolute w-6 h-6 bg-gradient-to-br from-[#14B8A6] to-[#0D9488] rounded-full bottom-0 right-0 shadow-[0_0_15px_rgba(20,184,166,0.6)]"></div>
              <div className="absolute w-0.5 h-8 bg-gradient-to-b from-[#9333EA] to-[#14B8A6] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-[#9333EA] to-[#14B8A6] bg-clip-text text-transparent">
                GONADS
              </h1>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Balls to the Wall DeFi
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#mint" className="text-[#CBD5E1] hover:text-[#9333EA] font-semibold transition-colors">
              Mint
            </a>
            <a href="#roadmap" className="text-[#CBD5E1] hover:text-[#9333EA] font-semibold transition-colors">
              Roadmap
            </a>
            <a href="#team" className="text-[#CBD5E1] hover:text-[#9333EA] font-semibold transition-colors">
              Team
            </a>
            <a href="#docs" className="text-[#CBD5E1] hover:text-[#9333EA] font-semibold transition-colors">
              Docs
            </a>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center gap-4">
            {walletAddress ? (
              <div className="px-4 py-2 bg-[#1E293B] border border-[#9333EA] rounded-lg">
                <p className="text-sm font-mono text-[#9333EA]">
                  {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
                </p>
              </div>
            ) : (
              <Button variant="primary" size="md" onClick={onConnectWallet}>
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
