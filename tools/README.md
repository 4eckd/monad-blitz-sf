# MACHUPS Tools

Utility scripts and tools for brand generation, asset processing, and deployment.

## Available Tools

### 1. Brand Generator (`tools/brand-generator.ts`)
Complete end-to-end brand generation pipeline.

**Usage:**
```bash
pnpm run generate-brand --input="Coffee delivery service" --style="modern"
```

### 2. Token Converter (`tools/token-converter.ts`)
Convert design tokens between formats (JSON, CSS, SCSS, Tailwind).

**Usage:**
```bash
pnpm run convert-tokens --input=tokens.json --format=css
pnpm run convert-tokens --input=tokens.json --format=tailwind
```

### 3. Logo Optimizer (`tools/logo-optimizer.ts`)
Optimize generated logos (compress, resize, convert formats).

**Usage:**
```bash
pnpm run optimize-logos --input=logos/ --output=optimized/
```

### 4. Component Validator (`tools/component-validator.ts`)
Validate generated React components for accessibility and best practices.

**Usage:**
```bash
pnpm run validate-components --dir=components/
```

### 5. Docs Builder (`tools/docs-builder.ts`)
Build and deploy Docusaurus documentation site.

**Usage:**
```bash
pnpm run build-docs --brand=BrandName --deploy
```

### 6. NFT Metadata Generator (`tools/nft-metadata.ts`)
Generate NFT metadata for Monad minting.

**Usage:**
```bash
pnpm run generate-nft-metadata --brand="BrewLy" --logo=logo.png
```

### 7. Penpot Exporter (`tools/penpot-exporter.ts`)
Export Penpot design files with generated assets.

**Usage:**
```bash
pnpm run export-penpot --brand=BrandName --tokens=tokens.json
```

### 8. Analytics Reporter (`tools/analytics.ts`)
Generate reports on brand generation metrics.

**Usage:**
```bash
pnpm run analytics --start=2025-12-01 --end=2025-12-31
```

## Development Tools

### Test Suite (`tools/test-suite.ts`)
Run comprehensive tests on all generators.

```bash
pnpm run test:all
```

### Benchmark Tool (`tools/benchmark.ts`)
Measure generation speed and performance.

```bash
pnpm run benchmark
```

## Installation

Install tool dependencies:

```bash
pnpm install
```

## Adding New Tools

1. Create tool file in `tools/`
2. Add type definitions
3. Update this README
4. Add npm script to package.json
5. Write tests in `tools/__tests__/`
