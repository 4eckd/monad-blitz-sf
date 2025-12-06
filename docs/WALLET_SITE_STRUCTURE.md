# wallet.machups.com - NFT Certificate Manager
## Testnet & Mainnet Contract Interface

---

## Overview

**Purpose:** Manage MACHUPS NFT certificates and interact with smart contracts
**Tech Stack:** Next.js 15, thirdweb SDK, Tailwind CSS
**Deployment:** Vercel (wallet.machups.com)
**Networks:** Monad Testnet & Mainnet

---

## Directory Structure

```
wallet.machups.com/
├── app/                               # Next.js App Router
│   ├── layout.tsx                     # Root layout
│   ├── page.tsx                       # Landing/Connect page
│   ├── globals.css                    # Global styles
│   │
│   ├── collection/                    # NFT collection view
│   │   ├── page.tsx                   # Collection overview
│   │   └── [tokenId]/                 # Individual NFT
│   │       └── page.tsx
│   │
│   ├── mint/                          # Minting interface
│   │   └── page.tsx
│   │
│   ├── claim/                         # Claim unclaimed NFTs
│   │   └── page.tsx
│   │
│   ├── admin/                         # Admin panel (protected)
│   │   ├── page.tsx                   # Admin dashboard
│   │   ├── deploy/                    # Contract deployment
│   │   │   └── page.tsx
│   │   ├── mint-bulk/                 # Bulk minting
│   │   │   └── page.tsx
│   │   └── analytics/                 # Contract analytics
│   │       └── page.tsx
│   │
│   └── api/                           # API routes
│       ├── contract/                  # Contract info
│       │   └── route.ts
│       ├── nft/                       # NFT operations
│       │   ├── metadata/[id]/
│       │   │   └── route.ts
│       │   └── claim/
│       │       └── route.ts
│       └── admin/                     # Admin operations
│           ├── deploy/
│           │   └── route.ts
│           └── mint/
│               └── route.ts
│
├── components/                        # Reusable components
│   ├── NFTCard/
│   │   └── index.tsx
│   ├── NFTGrid/
│   │   └── index.tsx
│   ├── ContractInfo/
│   │   └── index.tsx
│   ├── MintForm/
│   │   └── index.tsx
│   ├── WalletConnect/
│   │   └── index.tsx
│   ├── NetworkSwitcher/
│   │   └── index.tsx
│   └── AdminGuard/
│       └── index.tsx
│
├── lib/                               # Core libraries
│   ├── contract/
│   │   ├── abi.ts                     # Contract ABI
│   │   ├── client.ts                  # thirdweb client
│   │   ├── read.ts                    # Read functions
│   │   └── write.ts                   # Write functions
│   ├── ipfs/
│   │   ├── upload.ts                  # IPFS uploads
│   │   └── fetch.ts                   # IPFS fetching
│   └── utils/
│       ├── chains.ts                  # Network configs
│       └── types.ts                   # TypeScript types
│
├── contracts/                         # Solidity contracts
│   ├── MACHUPSCertificate.sol         # Main NFT contract
│   ├── test/
│   │   └── MACHUPSCertificate.test.sol
│   └── scripts/
│       ├── deploy.ts                  # Deployment script
│       └── verify.ts                  # Verification script
│
├── public/                            # Static assets
│   ├── nft-template.png               # NFT preview template
│   └── favicon.ico
│
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── .env.local
```

---

## Page Breakdown

### 1. Landing Page (`/`)

**Purpose:** Connect wallet and view overview
**Content:**

```tsx
<LandingPage>
  {!connected && (
    <Hero>
      <h1>MACHUPS NFT Certificates</h1>
      <p>Manage your brand generation certificates on Monad</p>
      <ConnectWalletButton />
    </Hero>
  )}

  {connected && (
    <>
      <WalletInfo>
        <Address>{address}</Address>
        <Network>{network}</Network>
        <NFTCount>You own {nftCount} certificates</NFTCount>
      </WalletInfo>

      <QuickActions>
        <Button href="/collection">View Collection</Button>
        <Button href="/mint">Mint New</Button>
        <Button href="/claim">Claim NFT</Button>
      </QuickActions>

      <ContractInfo>
        <Tab name="Mainnet">
          <ContractAddress>0x...</ContractAddress>
          <ViewOnExplorer />
          <Stats>
            <Stat label="Total Minted" value={totalSupply} />
            <Stat label="Unique Holders" value={holderCount} />
          </Stats>
        </Tab>

        <Tab name="Testnet">
          {/* Same as mainnet */}
        </Tab>
      </ContractInfo>
    </>
  )}
</LandingPage>
```

### 2. Collection Page (`/collection`)

**Purpose:** View user's NFT collection
**Features:**
- Grid view of owned NFTs
- Filter by network
- Sort by mint date
- Search by brand name

```tsx
<CollectionPage>
  <Header>
    <h1>My Certificates</h1>
    <Filters>
      <NetworkFilter />
      <SortOptions />
      <SearchInput />
    </Filters>
  </Header>

  <NFTGrid>
    {nfts.map((nft) => (
      <NFTCard
        key={nft.tokenId}
        tokenId={nft.tokenId}
        image={nft.metadata.image}
        name={nft.metadata.name}
        brandName={nft.metadata.attributes.brandName}
        generatedAt={nft.metadata.attributes.generatedAt}
        onClick={() => router.push(`/collection/${nft.tokenId}`)}
      />
    ))}
  </NFTGrid>

  {nfts.length === 0 && (
    <EmptyState>
      <p>No certificates found</p>
      <Button href="/claim">Claim Your Certificate</Button>
    </EmptyState>
  )}
</CollectionPage>
```

### 3. NFT Detail Page (`/collection/[tokenId]`)

**Purpose:** View individual NFT details
**Content:**

```tsx
<NFTDetailPage>
  <Grid cols={2}>
    <ImageSection>
      <NFTImage src={metadata.image} alt={metadata.name} />
      <Actions>
        <ShareButton />
        <DownloadButton />
        <ViewOnOpenSea />
      </Actions>
    </ImageSection>

    <DetailsSection>
      <h1>{metadata.name}</h1>
      <Description>{metadata.description}</Description>

      <Attributes>
        {metadata.attributes.map((attr) => (
          <Attribute key={attr.trait_type}>
            <Label>{attr.trait_type}</Label>
            <Value>{attr.value}</Value>
          </Attribute>
        ))}
      </Attributes>

      <ContractDetails>
        <Detail label="Token ID" value={tokenId} />
        <Detail label="Contract" value={contractAddress} />
        <Detail label="Network" value="Monad Mainnet" />
        <Detail label="Owner" value={owner} />
        <Detail label="Mint Date" value={mintDate} />
      </ContractDetails>

      <TransactionHistory>
        <h3>History</h3>
        {transfers.map((tx) => (
          <Transaction
            key={tx.hash}
            from={tx.from}
            to={tx.to}
            date={tx.timestamp}
            txHash={tx.hash}
          />
        ))}
      </TransactionHistory>

      <RelatedBrand>
        <h3>Design System</h3>
        <Button href={`https://${brandId}.design.machups.com`}>
          View Design System →
        </Button>
      </RelatedBrand>
    </DetailsSection>
  </Grid>
</NFTDetailPage>
```

### 4. Mint Page (`/mint`)

**Purpose:** Mint new NFT (admin only for event)
**Access:** Protected during event, public after
**Content:**

```tsx
<MintPage>
  <AdminGuard>
    <MintForm>
      <h1>Mint MACHUPS Certificate</h1>

      <FormField>
        <Label>Recipient Address</Label>
        <Input
          type="text"
          placeholder="0x..."
          pattern="^0x[a-fA-F0-9]{40}$"
          required
        />
      </FormField>

      <FormField>
        <Label>Brand Name</Label>
        <Input type="text" required />
      </FormField>

      <FormField>
        <Label>Brand ID</Label>
        <Input type="text" required />
      </FormField>

      <FormField>
        <Label>Primary Color</Label>
        <ColorPicker />
      </FormField>

      <FormField>
        <Label>Style</Label>
        <Select options={['modern', 'classic', 'bold', 'minimal']} />
      </FormField>

      <FormField>
        <Label>Generation Date</Label>
        <DatePicker />
      </FormField>

      <PreviewSection>
        <h3>NFT Preview</h3>
        <NFTPreview metadata={formData} />
      </PreviewSection>

      <NetworkSelector>
        <Radio name="network" value="mainnet">Mainnet</Radio>
        <Radio name="network" value="testnet">Testnet</Radio>
      </NetworkSelector>

      <SubmitButton>
        Mint Certificate
      </SubmitButton>

      {txHash && (
        <SuccessMessage>
          <p>✅ NFT Minted Successfully!</p>
          <Link href={explorerUrl}>View on Explorer →</Link>
        </SuccessMessage>
      )}
    </MintForm>
  </AdminGuard>
</MintPage>
```

### 5. Claim Page (`/claim`)

**Purpose:** Claim NFT for brands generated without wallet
**Content:**

```tsx
<ClaimPage>
  <h1>Claim Your Certificate</h1>
  <p>Generated a brand without connecting your wallet? Claim your NFT here.</p>

  <ClaimForm>
    <FormField>
      <Label>Brand ID or Download Link</Label>
      <Input
        type="text"
        placeholder="Enter your brand ID or paste download URL"
      />
    </FormField>

    <FormField>
      <Label>Email (used during generation)</Label>
      <Input type="email" required />
    </FormField>

    <VerifyButton onClick={verifyOwnership}>
      Verify Ownership
    </VerifyButton>

    {verified && (
      <>
        <BrandPreview>
          <h3>{brandName}</h3>
          <p>Generated: {generatedAt}</p>
        </BrandPreview>

        <ConnectWalletPrompt>
          <p>Connect your wallet to claim this NFT</p>
          <ConnectWalletButton />
        </ConnectWalletPrompt>

        {walletConnected && (
          <ClaimButton onClick={claimNFT}>
            Claim NFT to {address}
          </ClaimButton>
        )}
      </>
    )}
  </ClaimForm>
</ClaimPage>
```

### 6. Admin Dashboard (`/admin`)

**Purpose:** Contract management and analytics
**Access:** Admin wallet addresses only
**Content:**

```tsx
<AdminDashboard>
  <AdminGuard allowedAddresses={ADMIN_ADDRESSES}>
    <StatsGrid>
      <StatCard title="Total Minted" value={totalSupply} />
      <StatCard title="Mainnet NFTs" value={mainnetCount} />
      <StatCard title="Testnet NFTs" value={testnetCount} />
      <StatCard title="Unique Holders" value={holderCount} />
    </StatsGrid>

    <QuickActions>
      <Button href="/admin/deploy">Deploy Contract</Button>
      <Button href="/admin/mint-bulk">Bulk Mint</Button>
      <Button href="/admin/analytics">View Analytics</Button>
    </QuickActions>

    <RecentMints>
      <h2>Recent Mints</h2>
      <Table>
        <thead>
          <tr>
            <th>Token ID</th>
            <th>Brand Name</th>
            <th>Recipient</th>
            <th>Network</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {recentMints.map((mint) => (
            <tr key={mint.tokenId}>
              <td>{mint.tokenId}</td>
              <td>{mint.brandName}</td>
              <td>{mint.recipient.slice(0, 6)}...</td>
              <td>{mint.network}</td>
              <td>{mint.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </RecentMints>
  </AdminGuard>
</AdminDashboard>
```

---

## Smart Contract (Solidity)

```solidity
// contracts/MACHUPSCertificate.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title MACHUPSCertificate
 * @dev NFT certificate for MACHUPS brand generations
 * Monad Blitz SF #18 - December 6, 2025
 */
contract MACHUPSCertificate is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Mapping from token ID to brand ID
    mapping(uint256 => string) private _brandIds;

    // Mapping from brand ID to token ID (prevents duplicates)
    mapping(string => uint256) private _brandIdToTokenId;

    // Mapping from wallet to their token IDs
    mapping(address => uint256[]) private _ownedTokens;

    event BrandCertificateMinted(
        uint256 indexed tokenId,
        address indexed recipient,
        string brandId,
        string brandName,
        uint256 timestamp
    );

    constructor() ERC721("MACHUPS Certificate", "MACHUPS") {}

    /**
     * @dev Mint a new brand certificate
     * @param recipient Address to receive the NFT
     * @param tokenURI IPFS URI with metadata
     * @param brandId Unique brand ID
     * @return tokenId of the minted NFT
     */
    function mintCertificate(
        address recipient,
        string memory tokenURI,
        string memory brandId
    ) public onlyOwner returns (uint256) {
        require(
            _brandIdToTokenId[brandId] == 0,
            "Certificate already minted for this brand"
        );

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        _brandIds[newTokenId] = brandId;
        _brandIdToTokenId[brandId] = newTokenId;
        _ownedTokens[recipient].push(newTokenId);

        emit BrandCertificateMinted(
            newTokenId,
            recipient,
            brandId,
            "", // Extract from metadata
            block.timestamp
        );

        return newTokenId;
    }

    /**
     * @dev Get brand ID for a token
     */
    function getBrandId(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _brandIds[tokenId];
    }

    /**
     * @dev Get token ID for a brand
     */
    function getTokenIdByBrandId(string memory brandId)
        public
        view
        returns (uint256)
    {
        return _brandIdToTokenId[brandId];
    }

    /**
     * @dev Get all tokens owned by an address
     */
    function tokensOfOwner(address owner)
        public
        view
        returns (uint256[] memory)
    {
        return _ownedTokens[owner];
    }

    /**
     * @dev Get total supply
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    // Override required functions
    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
```

---

## Deployment Scripts

### Deploy Script

```typescript
// contracts/scripts/deploy.ts
import { ethers } from "hardhat";

async function main() {
  const network = await ethers.provider.getNetwork();
  console.log(`Deploying to ${network.name} (${network.chainId})`);

  const MACHUPSCertificate = await ethers.getContractFactory("MACHUPSCertificate");
  const contract = await MACHUPSCertificate.deploy();

  await contract.deployed();

  console.log(`✅ Contract deployed to: ${contract.address}`);
  console.log(`📝 Update .env with:`);
  console.log(`NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=${contract.address}`);

  // Wait for block confirmations
  console.log("⏳ Waiting for block confirmations...");
  await contract.deployTransaction.wait(5);

  console.log("✅ Ready to verify");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

---

## Environment Variables

```bash
# Blockchain
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=xxxxx
THIRDWEB_SECRET_KEY=xxxxx
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS_MAINNET=0x...
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS_TESTNET=0x...

# Admin
ADMIN_ADDRESSES=0x...,0x...  # Comma-separated
DEPLOYER_PRIVATE_KEY=xxxxx

# IPFS
THIRDWEB_STORAGE_SECRET_KEY=xxxxx

# App
NEXT_PUBLIC_APP_URL=https://wallet.machups.com
```

---

## Key Features

### 1. Multi-Network Support
- Mainnet for production
- Testnet for development
- Easy network switching

### 2. Admin Controls
- Protected admin routes
- Bulk minting capability
- Contract deployment interface

### 3. NFT Claiming
- Claim NFTs for past generations
- Ownership verification
- Email-based verification

### 4. Analytics
- Mint statistics
- Holder distribution
- Transfer history

---

## Deployment

**Platform:** Vercel
**Domain:** wallet.machups.com
**Contracts:**
- Monad Mainnet: TBD (deploy on event day)
- Monad Testnet: TBD (deploy pre-event)

---

**Last Updated:** December 5, 2025
**Event:** Monad Blitz SF #18
**Status:** Ready for Development
