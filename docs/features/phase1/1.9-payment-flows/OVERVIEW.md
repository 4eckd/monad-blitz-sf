# Payment Flows - Feature Plan

**Phase 1, Step 9** | `feature/payment-flows` | v0.3.0-alpha.9 | 2-3 days

## Goals
- Dual payment system: Fiat (Stripe) + Crypto (Monad native)
- Tier-based pricing enforcement
- Payment verification before NFT minting
- Subscription management (Pro/Enterprise monthly)
- Revenue tracking and analytics

## Problem Statement
Users need to:
1. **Pay for premium tiers** (Starter $10, Pro $49, Enterprise $299/mo)
2. **Choose payment method** (credit card via Stripe OR crypto on Monad)
3. **Verify payment** before accessing premium features
4. **Manage subscriptions** (upgrade, downgrade, cancel)
5. **Track spending** (payment history, invoices)

## Payment Methods

### Priority 1: Launch (Both Required)
| Method | Provider | Reason | Fee |
|--------|----------|--------|-----|
| **Credit Card** | Stripe | Mainstream, easy onboarding | 2.9% + $0.30 |
| **Crypto (MON)** | Monad Native | Web3-native, lower fees | ~$0.10 gas |

### Priority 2: Post-Launch
| Method | Provider | Reason | Fee |
|--------|----------|--------|-----|
| **USDC** | Circle | Stablecoin option | ~$0.10 gas |
| **ETH** | Ethereum L1 | Alternative crypto | ~$5-20 gas |

## Pricing Tiers (Recap)

```typescript
export const PRICING_TIERS = {
  free: {
    price: 0,
    duration: '1 hour',
    features: ['preview', 'limited-components'],
    nft: false,
  },
  starter: {
    price: 10, // $10 one-time
    duration: '24 hours',
    features: ['full-customization', 'export', 'nft-testnet'],
    nft: true,
    network: 'testnet',
  },
  pro: {
    priceOneTime: 49, // $49 one-time
    priceMonthly: 29, // $29/month
    duration: 'permanent',
    features: [
      'custom-domain',
      'nft-mainnet',
      'genesis-edition',
      'advanced-components',
      'github-integration',
    ],
    nft: true,
    network: 'mainnet',
  },
  enterprise: {
    priceMonthly: 299, // $299/month
    priceYearly: 2500, // $2,500/year (save $1,088)
    features: [
      'unlimited-brands',
      'white-label',
      'api-access',
      'custom-ai-training',
      'team-collaboration',
    ],
    nft: true,
    network: 'mainnet',
  },
} as const;
```

## Technical Architecture

### Stripe Integration (Fiat Payments)

#### Stripe Configuration
```typescript
// lib/payments/stripe-config.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});

// Product IDs (created in Stripe Dashboard)
export const STRIPE_PRODUCTS = {
  starter: {
    priceId: 'price_starter_one_time', // $10 one-time
  },
  pro: {
    oneTime: 'price_pro_one_time', // $49 one-time
    monthly: 'price_pro_monthly', // $29/month
  },
  enterprise: {
    monthly: 'price_enterprise_monthly', // $299/month
    yearly: 'price_enterprise_yearly', // $2,500/year
  },
} as const;
```

#### Checkout Session
```typescript
// lib/payments/stripe-checkout.ts
import { stripe, STRIPE_PRODUCTS } from './stripe-config';

export async function createStripeCheckoutSession(
  tier: 'starter' | 'pro' | 'enterprise',
  billingType: 'one-time' | 'monthly' | 'yearly',
  metadata: {
    brandName: string;
    walletAddress: string;
    userId: string;
  }
): Promise<{ url: string; sessionId: string }> {
  // Determine price ID
  let priceId: string;

  if (tier === 'starter') {
    priceId = STRIPE_PRODUCTS.starter.priceId;
  } else if (tier === 'pro') {
    priceId = billingType === 'one-time'
      ? STRIPE_PRODUCTS.pro.oneTime
      : STRIPE_PRODUCTS.pro.monthly;
  } else {
    priceId = billingType === 'yearly'
      ? STRIPE_PRODUCTS.enterprise.yearly
      : STRIPE_PRODUCTS.enterprise.monthly;
  }

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    mode: billingType === 'one-time' ? 'payment' : 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
    metadata: {
      tier,
      billingType,
      brandName: metadata.brandName,
      walletAddress: metadata.walletAddress,
      userId: metadata.userId,
    },
    customer_email: undefined, // Let user enter email
  });

  return {
    url: session.url!,
    sessionId: session.id,
  };
}
```

#### Webhook Handler
```typescript
// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/payments/stripe-config';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle events
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
      break;

    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
      break;

    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
      break;

    case 'invoice.payment_failed':
      await handlePaymentFailed(event.data.object as Stripe.Invoice);
      break;
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { tier, brandName, walletAddress, userId } = session.metadata!;

  // Store payment record
  await db.payments.create({
    data: {
      userId,
      tier,
      amount: session.amount_total! / 100, // Convert cents to dollars
      currency: session.currency!,
      paymentMethod: 'stripe',
      stripeSessionId: session.id,
      brandName,
      walletAddress,
      status: 'completed',
      paidAt: new Date(),
    },
  });

  // Trigger NFT minting (if applicable)
  if (tier === 'starter' || tier === 'pro') {
    await triggerNFTMint({
      brandName,
      walletAddress,
      tier,
    });
  }

  // Activate premium features
  await activatePremiumFeatures(userId, tier);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  // Update user's subscription status
  const userId = subscription.metadata.userId;

  await db.users.update({
    where: { id: userId },
    data: {
      subscriptionStatus: subscription.status,
      subscriptionId: subscription.id,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  // Downgrade user to free tier
  const userId = subscription.metadata.userId;

  await db.users.update({
    where: { id: userId },
    data: {
      tier: 'free',
      subscriptionStatus: 'canceled',
      subscriptionId: null,
    },
  });
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  // Notify user of failed payment
  const userId = invoice.metadata?.userId;

  if (userId) {
    await sendPaymentFailedEmail(userId, {
      amount: invoice.amount_due / 100,
      dueDate: new Date(invoice.due_date! * 1000),
    });
  }
}
```

### Crypto Payments (Monad Native)

#### Payment Contract (Solidity)
```solidity
// contracts/MACHUPSPayment.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MACHUPSPayment is Ownable, ReentrancyGuard {
    // Pricing in wei (MON has 18 decimals)
    uint256 public constant STARTER_PRICE = 10 ether; // ~$10 in MON
    uint256 public constant PRO_ONE_TIME_PRICE = 49 ether; // ~$49 in MON
    uint256 public constant PRO_MONTHLY_PRICE = 29 ether; // ~$29 in MON
    uint256 public constant ENTERPRISE_MONTHLY_PRICE = 299 ether; // ~$299 in MON

    // Events
    event PaymentReceived(
        address indexed payer,
        string tier,
        uint256 amount,
        string brandName,
        uint256 timestamp
    );

    // Payment records
    mapping(address => Payment[]) public payments;

    struct Payment {
        string tier;
        uint256 amount;
        string brandName;
        uint256 timestamp;
    }

    // Receive payment for Starter tier
    function payStarter(string memory brandName) external payable nonReentrant {
        require(msg.value == STARTER_PRICE, "Incorrect payment amount");

        payments[msg.sender].push(Payment({
            tier: "starter",
            amount: msg.value,
            brandName: brandName,
            timestamp: block.timestamp
        }));

        emit PaymentReceived(msg.sender, "starter", msg.value, brandName, block.timestamp);
    }

    // Receive payment for Pro (one-time)
    function payProOneTime(string memory brandName) external payable nonReentrant {
        require(msg.value == PRO_ONE_TIME_PRICE, "Incorrect payment amount");

        payments[msg.sender].push(Payment({
            tier: "pro-one-time",
            amount: msg.value,
            brandName: brandName,
            timestamp: block.timestamp
        }));

        emit PaymentReceived(msg.sender, "pro-one-time", msg.value, brandName, block.timestamp);
    }

    // Receive payment for Pro (monthly)
    function payProMonthly(string memory brandName) external payable nonReentrant {
        require(msg.value == PRO_MONTHLY_PRICE, "Incorrect payment amount");

        payments[msg.sender].push(Payment({
            tier: "pro-monthly",
            amount: msg.value,
            brandName: brandName,
            timestamp: block.timestamp
        }));

        emit PaymentReceived(msg.sender, "pro-monthly", msg.value, brandName, block.timestamp);
    }

    // Receive payment for Enterprise (monthly)
    function payEnterpriseMonthly(string memory brandName) external payable nonReentrant {
        require(msg.value == ENTERPRISE_MONTHLY_PRICE, "Incorrect payment amount");

        payments[msg.sender].push(Payment({
            tier: "enterprise-monthly",
            amount: msg.value,
            brandName: brandName,
            timestamp: block.timestamp
        }));

        emit PaymentReceived(msg.sender, "enterprise-monthly", msg.value, brandName, block.timestamp);
    }

    // Get payment history for address
    function getPayments(address payer) external view returns (Payment[] memory) {
        return payments[payer];
    }

    // Withdraw funds (owner only)
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
```

#### Crypto Payment Flow
```typescript
// lib/payments/crypto-payments.ts
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

const PAYMENT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS as `0x${string}`;

export function useCryptoPayment() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  async function payWithCrypto(
    tier: 'starter' | 'pro-one-time' | 'pro-monthly' | 'enterprise-monthly',
    brandName: string
  ) {
    const prices = {
      'starter': parseEther('10'),
      'pro-one-time': parseEther('49'),
      'pro-monthly': parseEther('29'),
      'enterprise-monthly': parseEther('299'),
    };

    const functionNames = {
      'starter': 'payStarter',
      'pro-one-time': 'payProOneTime',
      'pro-monthly': 'payProMonthly',
      'enterprise-monthly': 'payEnterpriseMonthly',
    };

    await writeContract({
      address: PAYMENT_CONTRACT_ADDRESS,
      abi: PAYMENT_ABI,
      functionName: functionNames[tier],
      args: [brandName],
      value: prices[tier],
    });
  }

  return {
    payWithCrypto,
    isPending,
    isConfirming,
    isSuccess,
    transactionHash: hash,
  };
}

const PAYMENT_ABI = [
  {
    name: 'payStarter',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: 'brandName', type: 'string' }],
    outputs: [],
  },
  {
    name: 'payProOneTime',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: 'brandName', type: 'string' }],
    outputs: [],
  },
  {
    name: 'payProMonthly',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: 'brandName', type: 'string' }],
    outputs: [],
  },
  {
    name: 'payEnterpriseMonthly',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: 'brandName', type: 'string' }],
    outputs: [],
  },
] as const;
```

#### Payment Verification
```typescript
// lib/payments/payment-verifier.ts
import { createPublicClient, http } from 'viem';
import { monadChainConfig } from '@/lib/wallet/wallet-connector';

export async function verifyCryptoPayment(
  walletAddress: string,
  brandName: string,
  tier: string
): Promise<{ verified: boolean; txHash?: string }> {
  const client = createPublicClient({
    chain: monadChainConfig,
    transport: http(),
  });

  try {
    // Get payment events
    const logs = await client.getLogs({
      address: PAYMENT_CONTRACT_ADDRESS,
      event: {
        type: 'event',
        name: 'PaymentReceived',
        inputs: [
          { indexed: true, name: 'payer', type: 'address' },
          { indexed: false, name: 'tier', type: 'string' },
          { indexed: false, name: 'amount', type: 'uint256' },
          { indexed: false, name: 'brandName', type: 'string' },
          { indexed: false, name: 'timestamp', type: 'uint256' },
        ],
      },
      args: {
        payer: walletAddress,
      },
      fromBlock: 'earliest',
    });

    // Find matching payment
    for (const log of logs) {
      const { tier: logTier, brandName: logBrandName } = log.args;

      if (logTier === tier && logBrandName === brandName) {
        return {
          verified: true,
          txHash: log.transactionHash,
        };
      }
    }

    return { verified: false };
  } catch (error) {
    console.error('Payment verification failed:', error);
    return { verified: false };
  }
}
```

## Payment UI Components

### Pricing Selection
```typescript
// components/PricingSelector.tsx
'use client';

import { useState } from 'react';
import { useCryptoPayment } from '@/lib/payments/crypto-payments';
import { createStripeCheckoutSession } from '@/lib/payments/stripe-checkout';

export function PricingSelector({ brandName }: { brandName: string }) {
  const [selectedTier, setSelectedTier] = useState<'starter' | 'pro' | 'enterprise'>('starter');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'crypto'>('stripe');
  const { payWithCrypto, isPending } = useCryptoPayment();

  async function handlePayment() {
    if (paymentMethod === 'crypto') {
      await payWithCrypto(`${selectedTier}-one-time`, brandName);
    } else {
      const { url } = await createStripeCheckoutSession(
        selectedTier,
        'one-time',
        {
          brandName,
          walletAddress: '0x...', // Get from wallet connection
          userId: 'user_id', // Get from session
        }
      );

      window.location.href = url;
    }
  }

  return (
    <div className="pricing-selector">
      <h2>Upgrade Your Brand</h2>

      {/* Tier Selection */}
      <div className="tier-options">
        <button
          className={selectedTier === 'starter' ? 'active' : ''}
          onClick={() => setSelectedTier('starter')}
        >
          Starter - $10
        </button>
        <button
          className={selectedTier === 'pro' ? 'active' : ''}
          onClick={() => setSelectedTier('pro')}
        >
          Pro - $49
        </button>
        <button
          className={selectedTier === 'enterprise' ? 'active' : ''}
          onClick={() => setSelectedTier('enterprise')}
        >
          Enterprise - $299/mo
        </button>
      </div>

      {/* Payment Method */}
      <div className="payment-method">
        <button
          className={paymentMethod === 'stripe' ? 'active' : ''}
          onClick={() => setPaymentMethod('stripe')}
        >
          Credit Card (Stripe)
        </button>
        <button
          className={paymentMethod === 'crypto' ? 'active' : ''}
          onClick={() => setPaymentMethod('crypto')}
        >
          Crypto (MON)
        </button>
      </div>

      <button
        onClick={handlePayment}
        disabled={isPending}
        className="pay-button"
      >
        {isPending ? 'Processing...' : `Pay with ${paymentMethod === 'stripe' ? 'Card' : 'Crypto'}`}
      </button>
    </div>
  );
}
```

## Revenue Tracking

### Analytics Dashboard
```typescript
// app/api/admin/revenue/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const [stripeRevenue, cryptoRevenue, subscriptions] = await Promise.all([
    // Stripe revenue (one-time)
    db.payments.aggregate({
      where: { paymentMethod: 'stripe', type: 'one-time' },
      _sum: { amount: true },
    }),

    // Crypto revenue
    db.payments.aggregate({
      where: { paymentMethod: 'crypto' },
      _sum: { amount: true },
    }),

    // Active subscriptions
    db.users.count({
      where: {
        subscriptionStatus: 'active',
      },
    }),
  ]);

  return NextResponse.json({
    stripeRevenue: stripeRevenue._sum.amount || 0,
    cryptoRevenue: cryptoRevenue._sum.amount || 0,
    activeSubscriptions: subscriptions,
    totalRevenue: (stripeRevenue._sum.amount || 0) + (cryptoRevenue._sum.amount || 0),
  });
}
```

## Environment Variables

```bash
# .env.local

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Payment Contract (Monad)
NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS=0x...
PAYMENT_CONTRACT_PRIVATE_KEY=0x... # For deployment only

# App
NEXT_PUBLIC_BASE_URL=https://machups.com
```

## Deliverables

- [ ] `lib/payments/stripe-config.ts` - Stripe configuration
- [ ] `lib/payments/stripe-checkout.ts` - Checkout session creation
- [ ] `lib/payments/crypto-payments.ts` - Crypto payment hooks
- [ ] `lib/payments/payment-verifier.ts` - Payment verification
- [ ] `app/api/webhooks/stripe/route.ts` - Stripe webhook handler
- [ ] `app/api/admin/revenue/route.ts` - Revenue analytics
- [ ] `contracts/MACHUPSPayment.sol` - Payment smart contract
- [ ] `components/PricingSelector.tsx` - Pricing UI
- [ ] `app/payment/success/page.tsx` - Success page
- [ ] `app/payment/cancel/page.tsx` - Cancel page

## Success Metrics

### Payment Success Rates
- **Stripe**: >95% successful payments
- **Crypto**: >90% successful payments (accounting for gas fee rejections)
- **Conversion Rate**: 40% free → Starter, 15% Starter → Pro

### Performance
- **Stripe Checkout**: <2 seconds to redirect
- **Crypto Transaction**: <30 seconds confirmation
- **Webhook Processing**: <5 seconds

### Revenue
- **Month 1**: $5,000 (500 free users → 150 paid)
- **Month 6**: $50,000 (break-even)
- **Year 1**: $907,900 (per business plan)

## Dependencies

- **Stripe SDK** (v17.x) - Fiat payments
- **wagmi** (v2.x) - Crypto payments
- **OpenZeppelin Contracts** (v5.x) - Payment contract security

**Requires**: Wallet integration (1.8)
**Blocks**: All premium features (NFT minting, custom domains, etc.)

---

**Version**: 1.0
**Last Updated**: December 5, 2025
**Status**: Planning (implementation starts Dec 7, 2025)
