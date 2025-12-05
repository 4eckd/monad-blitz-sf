# Wallet Integration - Feature Plan

**Phase 1, Step 8** | `feature/wallet-integration` | v0.3.0-alpha.8 | 1-2 days

## Goals
- Multi-wallet support (MetaMask, WalletConnect, Coinbase Wallet)
- Monad network integration
- Wallet-based authentication
- NFT minting authorization
- Subdomain ownership verification

## Problem Statement
Users need to:
1. **Connect wallets** to mint NFT certificates
2. **Authenticate** wallet ownership for premium features
3. **Sign transactions** on Monad network
4. **Verify ownership** of previously generated brands
5. **Switch networks** to Monad (if on wrong chain)

## Wallet Support Matrix

### Priority 1: Essential (Launch)
| Wallet | Support | Reason |
|--------|---------|--------|
| **MetaMask** | ✅ Full | Most popular (43M+ users) |
| **WalletConnect** | ✅ Full | Mobile wallet bridge |
| **Coinbase Wallet** | ✅ Full | Major exchange wallet |

### Priority 2: Post-Launch
| Wallet | Support | Reason |
|--------|---------|--------|
| **Rainbow** | 🔄 Planned | Popular mobile wallet |
| **Trust Wallet** | 🔄 Planned | Binance ecosystem |
| **Phantom** | ❌ No | Solana-focused (not Monad) |

## Technical Architecture

### Wallet Connection Flow
```typescript
// lib/wallet/wallet-connector.ts
import { createConfig, http, WagmiProvider } from 'wagmi';
import { monad, monadTestnet } from 'wagmi/chains';
import { coinbaseWallet, walletConnect, metaMask } from 'wagmi/connectors';

// Monad Network Configuration
export const monadChainConfig = {
  id: 41454, // Monad Mainnet
  name: 'Monad',
  nativeCurrency: {
    name: 'Monad',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.monad.xyz'] },
    public: { http: ['https://rpc.monad.xyz'] },
  },
  blockExplorers: {
    default: { name: 'MonadScan', url: 'https://explorer.monad.xyz' },
  },
  testnet: false,
};

export const monadTestnetConfig = {
  id: 41455, // Monad Testnet
  name: 'Monad Testnet',
  nativeCurrency: {
    name: 'Monad',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz'] },
    public: { http: ['https://testnet-rpc.monad.xyz'] },
  },
  blockExplorers: {
    default: { name: 'MonadScan Testnet', url: 'https://testnet.explorer.monad.xyz' },
  },
  testnet: true,
};

// Wagmi Configuration
export const wagmiConfig = createConfig({
  chains: [monadChainConfig, monadTestnetConfig],
  connectors: [
    metaMask(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    }),
    coinbaseWallet({
      appName: 'MACHUPS',
      appLogoUrl: 'https://machups.com/logo.png',
    }),
  ],
  transports: {
    [monadChainConfig.id]: http(),
    [monadTestnetConfig.id]: http(),
  },
});
```

### Connection UI Component
```typescript
// components/WalletConnect.tsx
'use client';

import { useConnect, useAccount, useDisconnect, useSwitchChain } from 'wagmi';
import { monadChainConfig } from '@/lib/wallet/wallet-connector';

export function WalletConnect() {
  const { connectors, connect, isPending } = useConnect();
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  // Check if user is on Monad network
  const isMonadNetwork = chain?.id === monadChainConfig.id;

  if (isConnected) {
    return (
      <div className="wallet-connected">
        <p>Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>

        {!isMonadNetwork && (
          <button
            onClick={() => switchChain({ chainId: monadChainConfig.id })}
            className="switch-network-btn"
          >
            Switch to Monad Network
          </button>
        )}

        <button onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="wallet-options">
      <h3>Connect Wallet</h3>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          disabled={isPending}
          className="wallet-option-btn"
        >
          {connector.name}
        </button>
      ))}
    </div>
  );
}
```

### Network Switching Logic
```typescript
// lib/wallet/network-manager.ts
import { switchChain } from 'wagmi/actions';
import { monadChainConfig, monadTestnetConfig } from './wallet-connector';

export async function ensureMonadNetwork(
  tier: 'free' | 'starter' | 'pro' | 'enterprise'
): Promise<{ success: boolean; network: 'mainnet' | 'testnet' }> {
  try {
    // Free & Starter tiers use testnet
    const targetChainId = tier === 'free' || tier === 'starter'
      ? monadTestnetConfig.id
      : monadChainConfig.id;

    await switchChain({ chainId: targetChainId });

    return {
      success: true,
      network: tier === 'free' || tier === 'starter' ? 'testnet' : 'mainnet',
    };
  } catch (error) {
    console.error('Failed to switch network:', error);
    return { success: false, network: 'testnet' };
  }
}
```

## Authentication Flow

### Session-Based Wallet Auth
```typescript
// lib/auth/wallet-auth.ts
import { SiweMessage } from 'siwe';
import { createPublicClient, http } from 'viem';
import { monadChainConfig } from '@/lib/wallet/wallet-connector';

export async function generateSiweMessage(address: string): Promise<string> {
  const message = new SiweMessage({
    domain: 'machups.com',
    address,
    statement: 'Sign in to MACHUPS to mint NFT certificates and manage your brands.',
    uri: `https://machups.com`,
    version: '1',
    chainId: monadChainConfig.id,
    nonce: generateNonce(), // Random nonce for security
    issuedAt: new Date().toISOString(),
  });

  return message.prepareMessage();
}

export async function verifySiweSignature(
  message: string,
  signature: string
): Promise<{ valid: boolean; address?: string }> {
  try {
    const siweMessage = new SiweMessage(message);
    const { data } = await siweMessage.verify({ signature });

    return {
      valid: true,
      address: data.address,
    };
  } catch (error) {
    return { valid: false };
  }
}

function generateNonce(): string {
  return Math.random().toString(36).substring(2, 15);
}
```

### Session Storage
```typescript
// lib/auth/session-manager.ts
import { cookies } from 'next/headers';

export interface WalletSession {
  address: string;
  chainId: number;
  tier: 'free' | 'starter' | 'pro' | 'enterprise';
  expiresAt: number;
  signature: string;
}

export async function createWalletSession(
  address: string,
  signature: string,
  tier: 'free' | 'starter' | 'pro' | 'enterprise'
): Promise<WalletSession> {
  const session: WalletSession = {
    address,
    chainId: monadChainConfig.id,
    tier,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    signature,
  };

  // Store in HTTP-only cookie
  cookies().set('wallet_session', JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60, // 24 hours
  });

  return session;
}

export async function getWalletSession(): Promise<WalletSession | null> {
  const sessionCookie = cookies().get('wallet_session');

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    const session: WalletSession = JSON.parse(sessionCookie.value);

    // Check expiration
    if (session.expiresAt < Date.now()) {
      cookies().delete('wallet_session');
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function destroyWalletSession(): Promise<void> {
  cookies().delete('wallet_session');
}
```

## NFT Minting Authorization

### Signature-Based Minting
```typescript
// lib/wallet/nft-authorization.ts
import { useSignMessage } from 'wagmi';

export function useNFTMintAuthorization() {
  const { signMessage, data: signature, isPending } = useSignMessage();

  async function authorizeNFTMint(
    brandName: string,
    tier: 'starter' | 'pro'
  ): Promise<{ signature: string } | null> {
    const message = `
Authorize NFT minting for brand: ${brandName}
Tier: ${tier}
Timestamp: ${Date.now()}
    `.trim();

    try {
      await signMessage({ message });

      if (!signature) {
        throw new Error('No signature returned');
      }

      return { signature };
    } catch (error) {
      console.error('Failed to authorize NFT mint:', error);
      return null;
    }
  }

  return { authorizeNFTMint, isPending };
}
```

## Brand Ownership Verification

### On-Chain Verification
```typescript
// lib/wallet/ownership-verifier.ts
import { createPublicClient, http } from 'viem';
import { monadChainConfig } from './wallet-connector';

export async function verifyBrandOwnership(
  walletAddress: string,
  brandName: string
): Promise<{ owns: boolean; nftTokenId?: string }> {
  const client = createPublicClient({
    chain: monadChainConfig,
    transport: http(),
  });

  try {
    // Query NFT contract for ownership
    const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`;

    // Get NFT balance for this wallet
    const balance = await client.readContract({
      address: contractAddress,
      abi: NFT_ABI,
      functionName: 'balanceOf',
      args: [walletAddress],
    });

    if (balance === 0n) {
      return { owns: false };
    }

    // Get all token IDs owned by this wallet
    const tokenIds = await client.readContract({
      address: contractAddress,
      abi: NFT_ABI,
      functionName: 'tokensOfOwner',
      args: [walletAddress],
    });

    // Check if any token matches this brand name
    for (const tokenId of tokenIds as bigint[]) {
      const metadata = await client.readContract({
        address: contractAddress,
        abi: NFT_ABI,
        functionName: 'tokenURI',
        args: [tokenId],
      });

      // Parse metadata to check brand name
      const metadataJson = await fetch(metadata as string).then(r => r.json());

      if (metadataJson.name === brandName) {
        return {
          owns: true,
          nftTokenId: tokenId.toString(),
        };
      }
    }

    return { owns: false };
  } catch (error) {
    console.error('Ownership verification failed:', error);
    return { owns: false };
  }
}

const NFT_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }],
  },
  {
    name: 'tokensOfOwner',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: 'tokenIds', type: 'uint256[]' }],
  },
  {
    name: 'tokenURI',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ name: 'uri', type: 'string' }],
  },
] as const;
```

## User Experience Flows

### Flow 1: Free Tier (No Wallet Required)
```
1. User visits machups.com
2. Generates brand (no wallet connection)
3. Views 1-hour preview deployment
4. Limited to 5 components
5. No NFT minting option shown
```

### Flow 2: Starter Tier ($10)
```
1. User completes free generation
2. Clicks "Upgrade to Starter ($10)"
3. Prompted to connect wallet (MetaMask/WC/CB)
4. Wallet connects → Auto-switch to Monad Testnet
5. User pays $10 (Stripe or crypto)
6. Signs message to authorize NFT mint
7. NFT minted on Monad Testnet
8. 24-hour preview deployment activated
```

### Flow 3: Pro Tier ($49)
```
1. User clicks "Upgrade to Pro"
2. Connects wallet
3. Auto-switch to Monad Mainnet
4. Pays $49 (Stripe or crypto)
5. Signs message for NFT mint
6. NFT minted on Monad Mainnet (Genesis Edition)
7. Permanent deployment activated
8. Custom domain setup available
```

### Flow 4: Brand Ownership Verification
```
1. User visits machups.com/my-brands
2. Prompted to connect wallet
3. System queries Monad for NFTs owned by address
4. Displays all brands user owns
5. User can re-deploy, update, or transfer ownership
```

## Error Handling

### Common Wallet Errors
```typescript
// lib/wallet/error-handler.ts
export enum WalletError {
  USER_REJECTED = 'User rejected the connection request',
  WRONG_NETWORK = 'Please switch to Monad network',
  NO_WALLET = 'No wallet detected. Please install MetaMask.',
  INSUFFICIENT_FUNDS = 'Insufficient MON balance for gas fees',
  TRANSACTION_FAILED = 'Transaction failed. Please try again.',
}

export function handleWalletError(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('User rejected')) {
      return WalletError.USER_REJECTED;
    }
    if (error.message.includes('chain')) {
      return WalletError.WRONG_NETWORK;
    }
    if (error.message.includes('funds')) {
      return WalletError.INSUFFICIENT_FUNDS;
    }
  }

  return WalletError.TRANSACTION_FAILED;
}
```

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x... # Monad NFT contract
NEXT_PUBLIC_MONAD_RPC_URL=https://rpc.monad.xyz
NEXT_PUBLIC_MONAD_TESTNET_RPC_URL=https://testnet-rpc.monad.xyz
```

## Deliverables

- [ ] `lib/wallet/wallet-connector.ts` - Wagmi config with Monad chains
- [ ] `lib/wallet/network-manager.ts` - Auto network switching
- [ ] `lib/auth/wallet-auth.ts` - SIWE authentication
- [ ] `lib/auth/session-manager.ts` - Session storage
- [ ] `lib/wallet/nft-authorization.ts` - NFT mint signatures
- [ ] `lib/wallet/ownership-verifier.ts` - On-chain verification
- [ ] `lib/wallet/error-handler.ts` - Error handling
- [ ] `components/WalletConnect.tsx` - Connection UI
- [ ] `components/NetworkSwitcher.tsx` - Network switcher UI
- [ ] `app/my-brands/page.tsx` - Brand ownership dashboard

## Success Metrics

### Connection Rates
- **Target**: >85% successful wallet connections
- **Benchmark**: <5% user-rejected connections
- **Network Switch**: <3 seconds to switch to Monad

### Authentication
- **SIWE Signature**: <2 seconds
- **Session Duration**: 24 hours (no re-auth needed)
- **Security**: HTTP-only cookies, no XSS vulnerabilities

### NFT Minting
- **Authorization Time**: <5 seconds (signature)
- **Minting Success Rate**: >95%
- **Gas Fee Display**: Show estimate before transaction

## Dependencies

- **wagmi** (v2.x) - React Hooks for Ethereum
- **viem** (v2.x) - TypeScript Ethereum library
- **siwe** (v2.x) - Sign-In with Ethereum
- **@wagmi/connectors** - Wallet connectors

**Blocks**: NFT rarity (1.2), payment flows (1.9)
**Required for**: All premium features, brand ownership verification

---

**Version**: 1.0
**Last Updated**: December 5, 2025
**Status**: Planning (implementation starts Dec 7, 2025)
