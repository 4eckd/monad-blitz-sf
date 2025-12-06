'use client';

import React from 'react';

export interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`w-full bg-[#0F172A] border-t border-[#1E293B] ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <div className="absolute w-6 h-6 bg-gradient-to-br from-[#9333EA] to-[#7C3AED] rounded-full top-0 left-0 shadow-[0_0_15px_rgba(147,51,234,0.6)]"></div>
                <div className="absolute w-6 h-6 bg-gradient-to-br from-[#14B8A6] to-[#0D9488] rounded-full bottom-0 right-0 shadow-[0_0_15px_rgba(20,184,166,0.6)]"></div>
                <div className="absolute w-0.5 h-8 bg-gradient-to-b from-[#9333EA] to-[#14B8A6] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
              </div>
              <h2 className="text-2xl font-black bg-gradient-to-r from-[#9333EA] to-[#14B8A6] bg-clip-text text-transparent">
                GONADS
              </h2>
            </div>
            <p className="text-[#64748B] mb-4 max-w-md">
              The most ballsy NFT project in web3. Built by degens, for degens. Where memes meet value.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com/gonads"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#1E293B] border border-[#334155] flex items-center justify-center hover:border-[#9333EA] hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all"
              >
                <span className="text-[#CBD5E1]">𝕏</span>
              </a>
              <a
                href="https://discord.gg/gonads"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#1E293B] border border-[#334155] flex items-center justify-center hover:border-[#9333EA] hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all"
              >
                <span className="text-[#CBD5E1]">D</span>
              </a>
              <a
                href="https://github.com/gonads"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#1E293B] border border-[#334155] flex items-center justify-center hover:border-[#9333EA] hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all"
              >
                <span className="text-[#CBD5E1]">G</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#mint" className="text-[#64748B] hover:text-[#9333EA] transition-colors">
                  Mint NFT
                </a>
              </li>
              <li>
                <a href="#roadmap" className="text-[#64748B] hover:text-[#9333EA] transition-colors">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="#team" className="text-[#64748B] hover:text-[#9333EA] transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="#faq" className="text-[#64748B] hover:text-[#9333EA] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/docs" className="text-[#64748B] hover:text-[#9333EA] transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/whitepaper" className="text-[#64748B] hover:text-[#9333EA] transition-colors">
                  Whitepaper
                </a>
              </li>
              <li>
                <a href="/brand" className="text-[#64748B] hover:text-[#9333EA] transition-colors">
                  Brand Kit
                </a>
              </li>
              <li>
                <a href="/press" className="text-[#64748B] hover:text-[#9333EA] transition-colors">
                  Press Kit
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#64748B] text-sm">
            © {currentYear} GONADS. All rights reserved. Built on Monad.
          </p>
          <div className="flex items-center gap-6">
            <a href="/terms" className="text-[#64748B] hover:text-[#9333EA] text-sm transition-colors">
              Terms
            </a>
            <a href="/privacy" className="text-[#64748B] hover:text-[#9333EA] text-sm transition-colors">
              Privacy
            </a>
            <a href="/cookies" className="text-[#64748B] hover:text-[#9333EA] text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
