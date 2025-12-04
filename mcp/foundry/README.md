# Foundry MCP Server

Model Context Protocol server for Foundry smart contract development.

## Overview

The Foundry MCP provides integration with Foundry tools for:
- Smart contract compilation
- Testing with Forge
- Deployment scripts
- Contract verification
- Gas optimization

## Installation

### Prerequisites

Install Foundry:
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### MCP Server

```bash
npx -y @foundry/mcp-server
```

## Configuration

Add to your `.env.local`:

```bash
# Foundry Configuration
FOUNDRY_PROFILE=default
FOUNDRY_ROOT=.
ETH_RPC_URL=https://testnet-rpc.monad.xyz
PRIVATE_KEY=your_private_key_here
```

## Project Structure

```
contracts/
├── src/           # Smart contracts
│   └── NFT.sol    # MACHUPS NFT contract
├── test/          # Contract tests
│   └── NFT.t.sol  # NFT tests
├── script/        # Deployment scripts
│   └── Deploy.s.sol
└── foundry.toml   # Foundry configuration
```

## Usage

### Compile Contracts

```bash
forge build
```

### Run Tests

```bash
forge test
forge test -vvv  # Verbose output
forge test --gas-report  # Gas usage
```

### Deploy Contracts

```bash
# Deploy to Monad testnet
forge script script/Deploy.s.sol:DeployScript --rpc-url $ETH_RPC_URL --broadcast

# Verify contract
forge verify-contract <contract_address> src/NFT.sol:MACHUPSNFT --chain monad-testnet
```

### Local Development

```bash
# Start local node
anvil

# Deploy to local node
forge script script/Deploy.s.sol:DeployScript --rpc-url http://localhost:8545 --broadcast
```

## Smart Contracts

### MACHUPS NFT Contract

ERC-721 contract for minting commemorative NFTs for generated brands.

**Features:**
- Free minting for brand generators
- On-chain metadata storage
- Event tracking
- Enumerable (for gallery)

**Contract:** `src/NFT.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MACHUPSNFT is ERC721URIStorage {
    uint256 private _tokenIdCounter;

    event BrandNFTMinted(
        address indexed owner,
        uint256 indexed tokenId,
        string brandName,
        uint256 timestamp
    );

    constructor() ERC721("MACHUPS Genesis Brand", "MACHUPS") {}

    function mintBrand(
        address to,
        string memory tokenURI,
        string memory brandName
    ) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit BrandNFTMinted(to, tokenId, brandName, block.timestamp);

        return tokenId;
    }
}
```

## Testing

### Test Structure

```solidity
// test/NFT.t.sol
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/NFT.sol";

contract NFTTest is Test {
    MACHUPSNFT public nft;
    address public user = address(0x1);

    function setUp() public {
        nft = new MACHUPSNFT();
    }

    function testMintBrand() public {
        string memory tokenURI = "ipfs://QmTest";
        string memory brandName = "TestBrand";

        uint256 tokenId = nft.mintBrand(user, tokenURI, brandName);

        assertEq(nft.ownerOf(tokenId), user);
        assertEq(nft.tokenURI(tokenId), tokenURI);
    }
}
```

## Gas Optimization

Run gas reports:

```bash
forge test --gas-report
```

Optimize contracts:
- Use `uint256` instead of smaller uints
- Pack storage variables
- Use `calldata` for function parameters
- Minimize storage writes

## Security

### Best Practices

- Run Slither: `slither .`
- Check with Mythril: `myth analyze src/NFT.sol`
- Audit before mainnet deployment
- Use OpenZeppelin contracts
- Follow Checks-Effects-Interactions pattern

### Automated Checks

```bash
# Static analysis
slither .

# Fuzzing
forge test --fuzz-runs 10000
```

## Deployment Checklist

- [ ] All tests passing
- [ ] Gas optimization complete
- [ ] Security audit done
- [ ] Verified on block explorer
- [ ] Testnet deployment tested
- [ ] Multisig setup (if needed)
- [ ] Emergency pause mechanism
- [ ] Upgrade path planned

## Resources

- [Foundry Book](https://book.getfoundry.sh/)
- [Foundry GitHub](https://github.com/foundry-rs/foundry)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Monad Docs](https://docs.monad.xyz/)

## Troubleshooting

### "forge: command not found"

Run `foundryup` to install/update Foundry.

### Compilation Errors

Check Solidity version in `foundry.toml`:

```toml
[profile.default]
solc_version = "0.8.20"
```

### RPC Connection Issues

Verify `ETH_RPC_URL` in `.env.local`.

---

For integration with MACHUPS brand generation, see [NFT Minting Guide](../../docs/nft-minting.md).
