# Wallet Integration Plan - MACHUPS
## Monad Blitz SF #18 - December 6, 2025

---

## Overview

MACHUPS requires wallet integration for:
1. **NFT Certificate Minting** - Receive commemorative NFT on Monad
2. **Premium Features** - x402 micropayments for pitch decks, variants
3. **User Identity** - Wallet-based authentication (optional)

---

## Wallet Connection Strategy

### Supported Wallets

**Priority 1 (Must Have):**
- MetaMask (most common)
- Rainbow Wallet
- Coinbase Wallet

**Priority 2 (Nice to Have):**
- WalletConnect (universal)
- Trust Wallet
- Phantom (if time permits)

### Implementation Library

**Choice: thirdweb ConnectButton**

Reasons:
- ✅ Pre-built UI components
- ✅ Multi-wallet support out of the box
- ✅ Monad network configuration
- ✅ Handles chain switching
- ✅ Session management
- ✅ Minimal code required

---

## Technical Implementation

### 1. thirdweb Setup

**File: `lib/web3/client.ts`**

```typescript
import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

// Monad Mainnet
export const monadMainnet = defineChain({
  id: 10143,
  name: "Monad Mainnet",
  nativeCurrency: {
    name: "Monad",
    symbol: "MON",
    decimals: 18,
  },
  rpc: "https://rpc.monad.xyz",
  blockExplorerUrls: ["https://explorer.monad.xyz"],
});

// Monad Testnet
export const monadTestnet = defineChain({
  id: 41454,
  name: "Monad Testnet",
  nativeCurrency: {
    name: "Monad",
    symbol: "MON",
    decimals: 18,
  },
  rpc: "https://testnet-rpc.monad.xyz",
  blockExplorerUrls: ["https://testnet-explorer.monad.xyz"],
});
```

### 2. Connect Button Component

**File: `components/web3/ConnectWallet.tsx`**

```typescript
'use client';

import { ConnectButton } from "thirdweb/react";
import { client, monadMainnet, monadTestnet } from "@/lib/web3/client";
import { createWallet } from "thirdweb/wallets";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("walletConnect"),
];

export function ConnectWallet() {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      chains={[monadMainnet, monadTestnet]}
      connectButton={{
        label: "Connect Wallet",
        className: "btn-primary",
      }}
      detailsButton={{
        displayBalanceToken: {
          [monadMainnet.id]: monadMainnet.nativeCurrency.symbol,
          [monadTestnet.id]: monadTestnet.nativeCurrency.symbol,
        },
      }}
      theme="dark"
      connectModal={{
        size: "compact",
        title: "Connect to MACHUPS",
        showThirdwebBranding: false,
      }}
    />
  );
}
```

### 3. Wallet State Hook

**File: `hooks/useWallet.ts`**

```typescript
'use client';

import { useActiveAccount, useActiveWallet } from "thirdweb/react";

export function useWallet() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();

  return {
    address: account?.address,
    isConnected: !!account,
    wallet,
    chainId: wallet?.getChain()?.id,
  };
}
```

### 4. Brand Generation Form Integration

**File: `app/generate/page.tsx`**

```typescript
'use client';

import { useState } from 'react';
import { ConnectWallet } from '@/components/web3/ConnectWallet';
import { useWallet } from '@/hooks/useWallet';

export default function GeneratePage() {
  const { address, isConnected } = useWallet();
  const [formData, setFormData] = useState({
    businessIdea: '',
    style: 'modern',
    // ... other fields
  });

  const handleGenerate = async () => {
    if (!isConnected) {
      alert('Please connect your wallet to receive your NFT certificate');
      return;
    }

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        walletAddress: address, // Include wallet for NFT minting
      }),
    });

    // ... handle response
  };

  return (
    <div>
      <h1>Generate Your Brand</h1>

      {/* Wallet Connection Section */}
      <div className="wallet-section">
        <h3>Connect Wallet (Optional)</h3>
        <p>Connect to receive a commemorative NFT on Monad</p>
        <ConnectWallet />
        {isConnected && (
          <p className="text-success">
            ✅ Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        )}
      </div>

      {/* Brand Generation Form */}
      <form onSubmit={handleGenerate}>
        {/* ... form fields */}
        <button type="submit">Generate Brand</button>
      </form>
    </div>
  );
}
```

---

## User Flows

### Flow 1: Generate Without Wallet (Quick Path)

```
1. User lands on app.machups.com
2. Fills out brand generation form
3. Clicks "Generate Brand"
4. System generates brand WITHOUT NFT
5. User downloads ZIP package
6. [Later] User can connect wallet to claim NFT
```

### Flow 2: Generate With Wallet (Full Experience)

```
1. User lands on app.machups.com
2. Clicks "Connect Wallet"
3. Selects MetaMask
4. Approves connection
5. System switches to Monad Mainnet (if needed)
6. User fills out brand generation form
7. Clicks "Generate Brand"
8. System:
   - Generates brand assets
   - Mints NFT certificate to user's wallet
   - Shows transaction hash
9. User downloads ZIP + receives NFT
```

### Flow 3: Premium Feature Purchase (x402)

```
1. User generates brand (with/without wallet)
2. Clicks "Generate Pitch Deck" (premium)
3. System prompts to connect wallet
4. User connects wallet
5. System shows price: 0.01 MON
6. User approves transaction
7. x402 payment verified
8. Pitch deck generated
9. User downloads PDF/PPTX
```

---

## NFT Minting Integration

### Smart Contract Call

**File: `lib/blockchain/mint-nft.ts`**

```typescript
import { prepareContractCall, sendTransaction } from "thirdweb";
import { getContract } from "thirdweb";
import { client, monadMainnet } from "@/lib/web3/client";

const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!;

export async function mintBrandNFT(
  walletAddress: string,
  brandMetadata: {
    name: string;
    generatedAt: string;
    primaryColor: string;
    style: string;
  }
) {
  const contract = getContract({
    client,
    chain: monadMainnet,
    address: NFT_CONTRACT_ADDRESS,
  });

  // Upload metadata to IPFS
  const metadataUri = await uploadMetadata({
    name: `${brandMetadata.name} - MACHUPS Certificate`,
    description: `Brand generated at Monad Blitz SF #18 on ${brandMetadata.generatedAt}`,
    image: "ipfs://...", // Brand logo
    attributes: [
      { trait_type: "Event", value: "Monad Blitz SF #18" },
      { trait_type: "Brand Name", value: brandMetadata.name },
      { trait_type: "Style", value: brandMetadata.style },
      { trait_type: "Primary Color", value: brandMetadata.primaryColor },
    ],
  });

  // Mint NFT
  const transaction = prepareContractCall({
    contract,
    method: "mintBrandCertificate",
    params: [walletAddress, metadataUri],
  });

  const result = await sendTransaction({
    transaction,
    account: wallet.getAccount()!,
  });

  return {
    transactionHash: result.transactionHash,
    tokenId: result.logs[0].topics[3], // Extract from event
  };
}
```

---

## x402 Payment Integration

### Payment Verification

**File: `lib/payments/x402.ts`**

```typescript
export async function verifyX402Payment(
  paymentHeader: string,
  expectedAmount: string,
  recipientAddress: string
) {
  const payment = parseX402Header(paymentHeader);

  // Verify payment on Monad
  const receipt = await verifyTransactionOnChain({
    txHash: payment.transactionHash,
    expectedAmount,
    recipient: recipientAddress,
  });

  return {
    verified: receipt.success,
    amount: receipt.value,
    sender: receipt.from,
  };
}
```

### Premium Endpoint

**File: `app/api/premium/pitchdeck/route.ts`**

```typescript
export async function POST(req: Request) {
  const paymentHeader = req.headers.get('x-payment');

  if (!paymentHeader) {
    return Response.json(
      { error: 'Payment required', price: '0.01 MON' },
      { status: 402 }
    );
  }

  const payment = await verifyX402Payment(
    paymentHeader,
    '0.01', // 0.01 MON
    process.env.PAYMENT_RECIPIENT_ADDRESS!
  );

  if (!payment.verified) {
    return Response.json({ error: 'Invalid payment' }, { status: 402 });
  }

  // Generate pitch deck
  const { brandId } = await req.json();
  const pitchDeck = await generatePitchDeck(brandId);

  return Response.json({ pitchDeck });
}
```

---

## UI/UX Considerations

### Wallet Connection States

**Disconnected:**
```
┌─────────────────────────────┐
│  🔒 Connect Wallet          │
│  (Optional - for NFT)       │
│  [Connect]                  │
└─────────────────────────────┘
```

**Connecting:**
```
┌─────────────────────────────┐
│  ⏳ Connecting...           │
│  Please approve in wallet   │
└─────────────────────────────┘
```

**Connected:**
```
┌─────────────────────────────┐
│  ✅ 0x1234...5678           │
│  Monad Mainnet              │
│  Balance: 1.5 MON           │
│  [Disconnect]               │
└─────────────────────────────┘
```

### Wrong Network Prompt

```
┌─────────────────────────────┐
│  ⚠️ Wrong Network            │
│  Please switch to:          │
│  Monad Mainnet              │
│  [Switch Network]           │
└─────────────────────────────┘
```

---

## Error Handling

### Common Errors

1. **Wallet not installed**
   - Show link to install MetaMask
   - Suggest mobile browser with built-in wallet

2. **User rejected connection**
   - Allow retry
   - Explain benefits of connecting

3. **Insufficient balance**
   - Show required amount
   - Link to Monad faucet (testnet) or exchange (mainnet)

4. **Transaction failed**
   - Show error message
   - Provide transaction hash for debugging
   - Allow retry

---

## Environment Variables

```bash
# thirdweb
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=xxxxx
THIRDWEB_SECRET_KEY=xxxxx

# NFT Contract
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...
NFT_MINTER_PRIVATE_KEY=xxxxx

# x402 Payments
PAYMENT_RECIPIENT_ADDRESS=0x...

# Monad RPC
NEXT_PUBLIC_MONAD_RPC_URL=https://rpc.monad.xyz
NEXT_PUBLIC_MONAD_CHAIN_ID=10143
```

---

## Testing Checklist

### Pre-Event Testing

- [ ] Connect MetaMask on Monad Testnet
- [ ] Switch networks correctly
- [ ] Mint test NFT
- [ ] Verify NFT in wallet
- [ ] Test x402 payment flow
- [ ] Handle wallet disconnection
- [ ] Test without wallet connection
- [ ] Mobile wallet testing

### Day-Of Testing

- [ ] Monad Mainnet connection
- [ ] Real NFT minting
- [ ] Production x402 payments
- [ ] Load testing with multiple users

---

## Deployment Considerations

### Mainnet vs Testnet

**Development:**
- Use Monad Testnet
- Free MON from faucet
- Safe for testing

**Production (Hackathon):**
- Switch to Monad Mainnet
- Real MON required
- Update contract addresses
- Update environment variables

### Contract Deployment

```bash
# Deploy NFT contract to Monad Mainnet
forge create --rpc-url $MONAD_RPC_URL \
  --private-key $DEPLOYER_PRIVATE_KEY \
  --verify \
  contracts/MACHUPSCertificate.sol:MACHUPSCertificate

# Update .env with deployed address
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...
```

---

## Success Criteria

- ✅ Users can connect wallet in <10 seconds
- ✅ Network switching is automatic
- ✅ NFTs mint within 30 seconds
- ✅ x402 payments work reliably
- ✅ Graceful degradation without wallet
- ✅ Clear error messages
- ✅ Mobile wallet support

---

**Last Updated:** December 5, 2025
**Event Date:** December 6, 2025
**Status:** Ready for Implementation
