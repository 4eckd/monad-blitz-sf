# Auto Deploy User Prompts

## 1. Subdomain Suggestion Prompt

### Input Parameters
- `brandName`: The generated brand name (string)
- `industry`: Industry category (string, optional)
- `keywords`: Related keywords (array, optional)

### Prompt Template
```
Generate 5 creative subdomain suggestions for a brand called "{brandName}" in the {industry} industry.

Requirements:
- DNS-valid format: lowercase letters, numbers, hyphens only
- Length: 8-15 characters (shorter is better)
- Memorable and pronounceable
- Related to brand name or industry
- No confusing characters (avoid 0/O, 1/l/I combinations)
- Avoid common words that might be taken

Brand Context:
- Name: {brandName}
- Industry: {industry}
- Keywords: {keywords}

Return as JSON array of strings, sorted by relevance:
["suggestion1", "suggestion2", "suggestion3", "suggestion4", "suggestion5"]
```

### Example
**Input**:
```json
{
  "brandName": "Hero Analytics",
  "industry": "SaaS",
  "keywords": ["data", "insights", "metrics"]
}
```

**Output**:
```json
[
  "hero-data",
  "herolytics",
  "hero-insights",
  "analytics-hero",
  "hero-metrics"
]
```

---

## 2. Deployment Validation Prompt

### Input Parameters
- `subdomain`: Requested subdomain (string)
- `brandAssets`: Generated brand package (object)

### Prompt Template
```
Validate the deployment readiness for subdomain "{subdomain}" with the following brand package:

Brand Package:
- Design tokens: {hasDesignTokens}
- Components: {componentCount} components
- Pages: {pageCount} pages
- Assets: {assetCount} files
- Total size: {totalSize} MB

Check for:
1. All required files present (index.html, styles, scripts)
2. No broken links or missing assets
3. Valid HTML/CSS/JS syntax
4. Responsive design implementation
5. Accessibility standards (WCAG AA)
6. Performance optimization (Core Web Vitals)

Return validation result:
{
  "valid": boolean,
  "errors": [],
  "warnings": [],
  "recommendations": []
}
```

### Example
**Input**:
```json
{
  "subdomain": "hero-data",
  "brandAssets": {
    "hasDesignTokens": true,
    "componentCount": 12,
    "pageCount": 3,
    "assetCount": 45,
    "totalSize": 2.3
  }
}
```

**Output**:
```json
{
  "valid": true,
  "errors": [],
  "warnings": [
    "Total bundle size is 2.3MB, consider code splitting for optimal LCP"
  ],
  "recommendations": [
    "Enable lazy loading for below-the-fold images",
    "Consider adding service worker for offline support"
  ]
}
```

---

## 3. Screenshot Optimization Prompt

### Input Parameters
- `deploymentUrl`: Live subdomain URL (string)
- `brandColors`: Primary brand colors (array)
- `logoUrl`: Logo image URL (string, optional)

### Prompt Template
```
Analyze the deployed brand at {deploymentUrl} and recommend screenshot capture settings.

Brand Visual Identity:
- Primary colors: {brandColors}
- Logo: {logoUrl}

Consider:
1. Best viewport size for hero section capture
2. Optimal timing (wait for fonts, images, animations)
3. Element to use as LCP indicator
4. Background color if page is shorter than 630px
5. Any visual elements to exclude (e.g., chat widgets)

Return capture configuration:
{
  "viewport": {
    "width": number,
    "height": number,
    "deviceScaleFactor": number
  },
  "waitForSelector": string,
  "waitForTimeout": number,
  "clip": {
    "x": number,
    "y": number,
    "width": number,
    "height": number
  },
  "hideElements": []
}
```

### Example
**Input**:
```json
{
  "deploymentUrl": "https://hero-data.machups.com",
  "brandColors": ["#3B82F6", "#1E40AF", "#DBEAFE"],
  "logoUrl": "https://hero-data.machups.com/logo.png"
}
```

**Output**:
```json
{
  "viewport": {
    "width": 1200,
    "height": 800,
    "deviceScaleFactor": 2
  },
  "waitForSelector": "[data-hero-section]",
  "waitForTimeout": 5000,
  "clip": {
    "x": 0,
    "y": 0,
    "width": 1200,
    "height": 630
  },
  "hideElements": [
    "[data-chat-widget]",
    "[data-cookie-banner]"
  ]
}
```

---

## 4. NFT Metadata Generation Prompt

### Input Parameters
- `brandName`: Brand name (string)
- `subdomain`: Deployed subdomain (string)
- `screenshotUrl`: IPFS URL of screenshot (string)
- `generationDate`: ISO timestamp (string)
- `userWallet`: Wallet address (string, optional)

### Prompt Template
```
Generate commemorative NFT metadata for "{brandName}" deployed to {subdomain}.

Event Details:
- Event: Monad Blitz SF #18
- Date: {generationDate}
- Platform: MACHUPS AI Brand Generator
- Blockchain: Monad Testnet

Screenshot: {screenshotUrl}

Create ERC-721 compliant metadata with:
1. Compelling name and description
2. Event attribution
3. Relevant attributes (brand name, subdomain, date, event)
4. External URL to deployed site
5. IPFS image reference

Return metadata JSON following OpenSea standard:
{
  "name": string,
  "description": string,
  "image": string (IPFS URL),
  "external_url": string,
  "attributes": [
    {
      "trait_type": string,
      "value": string | number
    }
  ]
}
```

### Example
**Input**:
```json
{
  "brandName": "Hero Analytics",
  "subdomain": "hero-data.machups.com",
  "screenshotUrl": "ipfs://QmXoYp7VwAuvbMnEjJEBgRkBcKhvfK6nKz...",
  "generationDate": "2025-12-04T10:34:22Z",
  "userWallet": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
}
```

**Output**:
```json
{
  "name": "MACHUPS Certificate - Hero Analytics",
  "description": "Commemorative NFT for Hero Analytics brand, generated with MACHUPS AI Brand Generator at Monad Blitz SF #18 on December 4, 2025. This certificate represents a complete brand package deployed to hero-data.machups.com.",
  "image": "ipfs://QmXoYp7VwAuvbMnEjJEBgRkBcKhvfK6nKz...",
  "external_url": "https://hero-data.machups.com",
  "attributes": [
    {
      "trait_type": "Event",
      "value": "Monad Blitz SF #18"
    },
    {
      "trait_type": "Brand Name",
      "value": "Hero Analytics"
    },
    {
      "trait_type": "Subdomain",
      "value": "hero-data.machups.com"
    },
    {
      "trait_type": "Generated Date",
      "value": "December 4, 2025"
    },
    {
      "trait_type": "Platform",
      "value": "MACHUPS"
    },
    {
      "trait_type": "Blockchain",
      "value": "Monad"
    },
    {
      "trait_type": "Generation Time",
      "value": "< 3 minutes"
    }
  ]
}
```

---

## 5. Deployment Error Analysis Prompt

### Input Parameters
- `error`: Error object from deployment (object)
- `deploymentConfig`: Configuration used (object)
- `logs`: Build/deploy logs (string)

### Prompt Template
```
Analyze the deployment failure and provide actionable recommendations.

Error Details:
- Type: {error.type}
- Message: {error.message}
- Stage: {error.stage}
- Timestamp: {error.timestamp}

Deployment Configuration:
{deploymentConfig}

Build Logs (last 100 lines):
{logs}

Analyze and return:
{
  "rootCause": string (concise explanation),
  "userMessage": string (friendly, non-technical),
  "technicalDetails": string (for debugging),
  "suggestedFixes": [
    {
      "action": string,
      "automatic": boolean,
      "requiresUserInput": boolean
    }
  ],
  "retryable": boolean,
  "estimatedResolutionTime": string
}
```

### Example
**Input**:
```json
{
  "error": {
    "type": "BuildError",
    "message": "Module not found: Can't resolve 'framer-motion'",
    "stage": "build",
    "timestamp": "2025-12-04T10:35:12Z"
  },
  "deploymentConfig": {
    "buildCommand": "npm run build",
    "outputDirectory": "out"
  },
  "logs": "npm ERR! Missing dependency framer-motion..."
}
```

**Output**:
```json
{
  "rootCause": "Missing dependency 'framer-motion' in package.json",
  "userMessage": "We encountered an issue building your brand. We're automatically fixing the missing animation library and will retry deployment in a moment.",
  "technicalDetails": "The generated package.json is missing the framer-motion dependency required by the animation components. This suggests the dependency injection step failed during brand generation.",
  "suggestedFixes": [
    {
      "action": "Add framer-motion@^12.23.25 to package.json",
      "automatic": true,
      "requiresUserInput": false
    },
    {
      "action": "Retry deployment with updated dependencies",
      "automatic": true,
      "requiresUserInput": false
    }
  ],
  "retryable": true,
  "estimatedResolutionTime": "30 seconds"
}
```

---

## 6. Custom Domain Configuration Prompt (Premium Feature)

### Input Parameters
- `customDomain`: User's domain (string)
- `subdomain`: Current machups.com subdomain (string)
- `dnsProvider`: User's DNS provider (string, optional)

### Prompt Template
```
Generate DNS configuration instructions for mapping custom domain "{customDomain}" to the deployed brand at "{subdomain}".

Current Setup:
- Deployed at: https://{subdomain}
- Target domain: {customDomain}
- DNS provider: {dnsProvider}

Provide:
1. DNS records to add (CNAME, A, TXT for verification)
2. SSL certificate configuration
3. Step-by-step instructions for common DNS providers
4. Verification method
5. Estimated propagation time

Return configuration guide:
{
  "dnsRecords": [
    {
      "type": string,
      "name": string,
      "value": string,
      "ttl": number
    }
  ],
  "instructions": {
    "cloudflare": [],
    "namecheap": [],
    "godaddy": [],
    "generic": []
  },
  "verification": {
    "method": string,
    "endpoint": string
  },
  "estimatedTime": string
}
```

### Example
**Input**:
```json
{
  "customDomain": "www.heroanalytics.com",
  "subdomain": "hero-data.machups.com",
  "dnsProvider": "Cloudflare"
}
```

**Output**:
```json
{
  "dnsRecords": [
    {
      "type": "CNAME",
      "name": "www",
      "value": "hero-data.machups.com",
      "ttl": 300
    },
    {
      "type": "TXT",
      "name": "_machups-verification",
      "value": "machups-verify-abc123xyz",
      "ttl": 300
    }
  ],
  "instructions": {
    "cloudflare": [
      "1. Log in to Cloudflare dashboard",
      "2. Select your domain (heroanalytics.com)",
      "3. Go to DNS settings",
      "4. Click 'Add record'",
      "5. Add CNAME record: www → hero-data.machups.com",
      "6. Add TXT record for verification",
      "7. Save changes"
    ]
  },
  "verification": {
    "method": "DNS TXT record",
    "endpoint": "https://api.machups.com/verify-domain/abc123"
  },
  "estimatedTime": "5-10 minutes for DNS propagation"
}
```

---

**Version**: 1.0.0
**Last Updated**: December 4, 2025
**Usage**: These prompts are used by the auto-deploy system to generate dynamic content and handle deployment workflows.
