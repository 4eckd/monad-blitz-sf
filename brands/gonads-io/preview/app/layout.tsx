import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'GONADS - Balls to the Wall DeFi',
  description: 'The most ballsy NFT project in web3. Built by degens, for degens. Where memes meet value.',
  keywords: ['NFT', 'Web3', 'DeFi', 'Monad', 'Memecoin', 'DAO', 'Community'],
  authors: [{ name: 'GONADS Team' }],
  openGraph: {
    title: 'GONADS - Balls to the Wall DeFi',
    description: 'The most ballsy NFT project in web3. Built by degens, for degens.',
    url: 'https://gonads.io',
    siteName: 'GONADS',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GONADS - The NFT Project with Real Balls',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GONADS - Balls to the Wall DeFi',
    description: 'The most ballsy NFT project in web3. Built by degens, for degens.',
    images: ['/og-image.png'],
    creator: '@gonads',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
