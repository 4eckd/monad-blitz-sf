# MACHUPS Workflow Diagrams
## User, Admin, and Application Flows

---

## User Workflows

### 1. Brand Generation Flow (Standard)

```mermaid
flowchart TD
    Start([User visits app.machups.com]) --> FormView[View Generation Form]
    FormView --> FillForm[Fill Business Details]
    FillForm --> WalletChoice{Connect Wallet?}

    WalletChoice -->|Yes| ConnectWallet[Connect Wallet]
    WalletChoice -->|No, Skip| Submit[Submit Form]
    ConnectWallet --> CheckNetwork{Correct Network?}
    CheckNetwork -->|No| SwitchNetwork[Switch to Monad]
    CheckNetwork -->|Yes| Submit
    SwitchNetwork --> Submit

    Submit --> Processing[Processing...]
    Processing --> Analyze[AI Analysis]
    Analyze --> ParallelGen[Parallel Generation]

    ParallelGen --> GenLogos[Generate Logos]
    ParallelGen --> GenTokens[Generate Design Tokens]
    ParallelGen --> GenComponents[Generate Components]
    ParallelGen --> GenDocs[Generate Documentation]

    GenLogos --> Assemble[Assemble Package]
    GenTokens --> Assemble
    GenComponents --> Assemble
    GenDocs --> Assemble

    Assemble --> MintChoice{Wallet Connected?}
    MintChoice -->|Yes| MintNFT[Mint NFT Certificate]
    MintChoice -->|No| SkipNFT[Skip NFT]

    MintNFT --> Complete[Generation Complete]
    SkipNFT --> Complete

    Complete --> Download[Download ZIP]
    Download --> ViewDocs[View Documentation]
    ViewDocs --> PremiumChoice{Want Premium?}

    PremiumChoice -->|Yes| Premium[Buy Premium Features]
    PremiumChoice -->|No| End([End])
    Premium --> End

    style Start fill:#0066FF,color:#fff
    style Complete fill:#10B981,color:#fff
    style MintNFT fill:#8B5CF6,color:#fff
    style End fill:#0066FF,color:#fff
```

### 2. Premium Feature Purchase Flow

```mermaid
flowchart TD
    Start([User wants Pitch Deck]) --> CheckWallet{Wallet Connected?}

    CheckWallet -->|No| PromptConnect[Prompt to Connect]
    CheckWallet -->|Yes| ShowPrice[Show Price: 0.01 MON]

    PromptConnect --> Connect[Connect Wallet]
    Connect --> ShowPrice

    ShowPrice --> CheckBalance{Sufficient Balance?}
    CheckBalance -->|No| InsufficientFunds[Show Insufficient Funds]
    InsufficientFunds --> GetMON[Link to Get MON]
    GetMON --> ShowPrice

    CheckBalance -->|Yes| InitiatePayment[Initiate Payment]
    InitiatePayment --> ApproveWallet[User Approves in Wallet]

    ApproveWallet --> UserAction{User Action}
    UserAction -->|Approved| SendTx[Send Transaction]
    UserAction -->|Rejected| Cancel([Cancelled])

    SendTx --> VerifyPayment[Verify Payment]
    VerifyPayment --> PaymentValid{Valid?}

    PaymentValid -->|No| PaymentError[Show Error]
    PaymentError --> Retry{Retry?}
    Retry -->|Yes| InitiatePayment
    Retry -->|No| Cancel

    PaymentValid -->|Yes| GeneratePremium[Generate Pitch Deck]
    GeneratePremium --> DeliverContent[Deliver PDF/PPTX]
    DeliverContent --> Success([Success])

    style Start fill:#0066FF,color:#fff
    style Success fill:#10B981,color:#fff
    style Cancel fill:#EF4444,color:#fff
    style GeneratePremium fill:#8B5CF6,color:#fff
```

### 3. NFT Certificate Claiming Flow

```mermaid
flowchart TD
    Start([Brand Generated Without Wallet]) --> ViewResults[View Results Page]
    ViewResults --> SeeNFTPrompt[See NFT Available Banner]

    SeeNFTPrompt --> ClickClaim[Click Claim NFT]
    ClickClaim --> ConnectWallet[Connect Wallet]

    ConnectWallet --> VerifyIdentity[Verify Ownership]
    VerifyIdentity --> Valid{Valid?}

    Valid -->|No| Error[Show Error]
    Error --> End([End])

    Valid -->|Yes| InitiateMint[Initiate Minting]
    InitiateMint --> MintNFT[Mint NFT to Wallet]

    MintNFT --> Confirm[Wait for Confirmation]
    Confirm --> Success{Successful?}

    Success -->|No| Retry[Show Retry Option]
    Retry --> InitiateMint

    Success -->|Yes| ShowNFT[Display NFT Details]
    ShowNFT --> ViewExplorer[Link to Block Explorer]
    ViewExplorer --> Complete([NFT Claimed])

    style Start fill:#0066FF,color:#fff
    style Complete fill:#10B981,color:#fff
    style MintNFT fill:#8B5CF6,color:#fff
```

---

## Admin Workflows

### 4. Contract Deployment Flow

```mermaid
flowchart TD
    Start([Admin Deploys Contract]) --> SelectNetwork{Network}

    SelectNetwork -->|Testnet| TestnetDeploy[Deploy to Testnet]
    SelectNetwork -->|Mainnet| MainnetDeploy[Deploy to Mainnet]

    TestnetDeploy --> CompileContract[Compile Solidity]
    MainnetDeploy --> CompileContract

    CompileContract --> CheckGas[Estimate Gas]
    CheckGas --> SufficientBalance{Sufficient Balance?}

    SufficientBalance -->|No| FundWallet[Fund Deployer Wallet]
    FundWallet --> CheckGas

    SufficientBalance -->|Yes| DeployContract[Deploy Contract]
    DeployContract --> WaitConfirm[Wait for Confirmation]

    WaitConfirm --> VerifyContract[Verify on Explorer]
    VerifyContract --> UpdateEnv[Update .env with Address]

    UpdateEnv --> TestMint[Test Mint Function]
    TestMint --> TestSuccess{Works?}

    TestSuccess -->|No| Debug[Debug & Redeploy]
    Debug --> CompileContract

    TestSuccess -->|Yes| UpdateFrontend[Update Frontend Config]
    UpdateFrontend --> DeployFrontend[Deploy Frontend]
    DeployFrontend --> Complete([Contract Live])

    style Start fill:#0066FF,color:#fff
    style Complete fill:#10B981,color:#fff
    style DeployContract fill:#8B5CF6,color:#fff
```

### 5. Monitoring & Analytics Flow

```mermaid
flowchart TD
    Start([Admin Dashboard]) --> ViewMetrics[View Real-time Metrics]

    ViewMetrics --> Metrics[/Display Metrics/]
    Metrics --> TotalGenerations[Total Generations: X]
    Metrics --> ActiveUsers[Active Users: Y]
    Metrics --> NFTsMinted[NFTs Minted: Z]
    Metrics --> Revenue[Revenue: A MON]

    TotalGenerations --> CheckAlerts{Alerts?}
    ActiveUsers --> CheckAlerts
    NFTsMinted --> CheckAlerts
    Revenue --> CheckAlerts

    CheckAlerts -->|Error Rate High| InvestigateErrors[Investigate Errors]
    CheckAlerts -->|Low Balance| RefundGas[Refund Gas Wallet]
    CheckAlerts -->|Abuse Detected| BlockUser[Block User]
    CheckAlerts -->|All Good| Continue[Continue Monitoring]

    InvestigateErrors --> FixIssue[Deploy Fix]
    RefundGas --> Continue
    BlockUser --> Continue
    FixIssue --> Continue

    Continue --> ExportData{Export Data?}
    ExportData -->|Yes| GenerateReport[Generate Report]
    ExportData -->|No| End([End])
    GenerateReport --> End

    style Start fill:#0066FF,color:#fff
    style End fill:#0066FF,color:#fff
```

---

## Application Flows

### 6. Brand Generation Pipeline (Internal)

```mermaid
flowchart TD
    Start([API Request Received]) --> ValidateInput[Validate Input]

    ValidateInput --> Valid{Valid?}
    Valid -->|No| Error400[Return 400 Error]
    Valid -->|Yes| CreateJob[Create Generation Job]

    Error400 --> End([End])

    CreateJob --> InitRedis[Store in Redis]
    InitRedis --> ReturnJobID[Return Job ID to Client]

    ReturnJobID --> AsyncProcess[Background Processing]

    AsyncProcess --> ClaudeAnalysis[Claude: Analyze Business]
    ClaudeAnalysis --> ExtractBranding[Extract Brand Attributes]

    ExtractBranding --> ParallelTasks[Parallel Generation Tasks]

    ParallelTasks --> Task1[Task 1: Logo Generation]
    ParallelTasks --> Task2[Task 2: Color Palette]
    ParallelTasks --> Task3[Task 3: Typography]
    ParallelTasks --> Task4[Task 4: Design Tokens]
    ParallelTasks --> Task5[Task 5: Components]

    Task1 --> WaitAll[Wait for All Tasks]
    Task2 --> WaitAll
    Task3 --> WaitAll
    Task4 --> WaitAll
    Task5 --> WaitAll

    WaitAll --> GenerateDocs[Generate Documentation]
    GenerateDocs --> CreatePDF[Create Brand Guidelines PDF]
    CreatePDF --> PackageFiles[Package into ZIP]

    PackageFiles --> UploadS3[Upload to S3/R2]
    UploadS3 --> CheckWallet{Wallet Provided?}

    CheckWallet -->|Yes| MintNFT[Mint NFT Certificate]
    CheckWallet -->|No| SkipMint[Skip Minting]

    MintNFT --> UpdateJob[Update Job Status: Complete]
    SkipMint --> UpdateJob

    UpdateJob --> NotifyClient[Notify Client via WebSocket]
    NotifyClient --> Complete([Generation Complete])

    style Start fill:#0066FF,color:#fff
    style Complete fill:#10B981,color:#fff
    style ClaudeAnalysis fill:#8B5CF6,color:#fff
    style MintNFT fill:#8B5CF6,color:#fff
```

### 7. Real-time Progress Updates (WebSocket)

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Redis
    participant Worker
    participant Claude
    participant Blockchain

    Client->>API: POST /api/generate
    API->>Redis: Create job
    API->>Client: Return jobId

    Client->>API: WebSocket connect
    API->>Client: Connection established

    Worker->>Redis: Get next job
    Worker->>Claude: Analyze business
    Worker->>Redis: Update: "Analyzing..."
    Redis->>API: Job updated
    API->>Client: Progress: 10%

    Claude->>Worker: Brand analysis
    Worker->>Claude: Generate logos
    Worker->>Redis: Update: "Generating logos..."
    Redis->>API: Job updated
    API->>Client: Progress: 30%

    Claude->>Worker: Logos generated
    Worker->>Claude: Generate tokens
    Worker->>Redis: Update: "Creating design system..."
    Redis->>API: Job updated
    API->>Client: Progress: 50%

    Claude->>Worker: Tokens generated
    Worker->>Claude: Generate components
    Worker->>Redis: Update: "Building components..."
    Redis->>API: Job updated
    API->>Client: Progress: 70%

    Claude->>Worker: Components generated
    Worker->>Worker: Package files
    Worker->>Redis: Update: "Packaging..."
    Redis->>API: Job updated
    API->>Client: Progress: 90%

    Worker->>Blockchain: Mint NFT
    Blockchain->>Worker: Transaction hash
    Worker->>Redis: Update: "Complete"
    Redis->>API: Job updated
    API->>Client: Progress: 100%, downloadUrl

    Client->>API: Disconnect WebSocket
```

### 8. Error Handling & Retry Logic

```mermaid
flowchart TD
    Start([Operation Starts]) --> Execute[Execute Task]

    Execute --> Check{Success?}
    Check -->|Yes| Success([Success])

    Check -->|No| ErrorType{Error Type}

    ErrorType -->|Network Error| Retry1{Retry Count < 3?}
    ErrorType -->|Rate Limit| Wait[Wait 60s]
    ErrorType -->|Invalid Input| UserError[Return 400]
    ErrorType -->|Server Error| Retry2{Retry Count < 3?}

    Retry1 -->|Yes| Increment1[Increment Retry]
    Retry1 -->|No| Fail[Log & Fail]

    Retry2 -->|Yes| Increment2[Increment Retry]
    Retry2 -->|No| Fail

    Increment1 --> Backoff1[Exponential Backoff]
    Increment2 --> Backoff2[Exponential Backoff]

    Backoff1 --> Execute
    Backoff2 --> Execute

    Wait --> Execute

    UserError --> End([End])
    Fail --> Alert[Alert Admin]
    Alert --> End

    style Success fill:#10B981,color:#fff
    style Fail fill:#EF4444,color:#fff
```

---

## Deployment Workflows

### 9. CI/CD Pipeline

```mermaid
flowchart TD
    Start([Push to GitHub]) --> TriggerCI[Trigger GitHub Actions]

    TriggerCI --> Lint[ESLint]
    TriggerCI --> TypeCheck[TypeScript Check]
    TriggerCI --> SecurityScan[TruffleHog Scan]

    Lint --> AllPassed{All Checks Pass?}
    TypeCheck --> AllPassed
    SecurityScan --> AllPassed

    AllPassed -->|No| NotifyDev[Notify Developer]
    NotifyDev --> End([End])

    AllPassed -->|Yes| BuildApp[Build Next.js App]
    BuildApp --> BuildDocs[Build Docusaurus]

    BuildDocs --> DeployBranch{Branch?}

    DeployBranch -->|main| DeployProd[Deploy to Production]
    DeployBranch -->|develop| DeployStaging[Deploy to Staging]
    DeployBranch -->|feature/*| DeployPreview[Deploy Preview]

    DeployProd --> UpdateVercel[Update Vercel]
    DeployStaging --> UpdateVercel
    DeployPreview --> UpdateVercel

    UpdateVercel --> RunE2E[Run E2E Tests]
    RunE2E --> E2EPass{Tests Pass?}

    E2EPass -->|No| Rollback[Rollback Deploy]
    E2EPass -->|Yes| UpdateDNS[Update DNS]

    Rollback --> NotifyDev

    UpdateDNS --> Complete([Deployment Complete])

    style Start fill:#0066FF,color:#fff
    style Complete fill:#10B981,color:#fff
    style Rollback fill:#EF4444,color:#fff
```

### 10. Multi-Site Deployment

```mermaid
flowchart LR
    Source([GitHub Repo]) --> Build[Build Process]

    Build --> App[app.machups.com]
    Build --> Docs[docs.machups.com]
    Build --> Wallet[wallet.machups.com]
    Build --> Design[design.machups.com]

    App --> VercelApp[Vercel]
    Docs --> VercelDocs[Vercel]
    Wallet --> VercelWallet[Vercel]
    Design --> VercelDesign[Vercel]

    VercelApp --> CloudflareCDN[Cloudflare CDN]
    VercelDocs --> CloudflareCDN
    VercelWallet --> CloudflareCDN
    VercelDesign --> CloudflareCDN

    CloudflareCDN --> Users([End Users])

    style Source fill:#0066FF,color:#fff
    style CloudflareCDN fill:#F38020,color:#fff
    style Users fill:#10B981,color:#fff
```

---

## Data Flow Diagrams

### 11. Design Token Flow

```mermaid
flowchart LR
    Analysis([Brand Analysis]) --> Tokens[Design Tokens]

    Tokens --> JSON[W3C DTCG JSON]
    Tokens --> CSS[CSS Variables]
    Tokens --> SCSS[SCSS Variables]
    Tokens --> Tailwind[Tailwind Config]
    Tokens --> Penpot[Penpot Library]

    JSON --> Components[React Components]
    CSS --> Components
    Tailwind --> Components

    Components --> App[User's App]
    Penpot --> Designer([Designer])

    style Analysis fill:#8B5CF6,color:#fff
    style App fill:#10B981,color:#fff
```

### 12. NFT Metadata Flow

```mermaid
flowchart TD
    Brand([Brand Generated]) --> Metadata[Create Metadata]

    Metadata --> MetadataJSON{
        name: Brand Name
        description: ...
        image: ipfs://...
        attributes: [...]
    }

    MetadataJSON --> UploadIPFS[Upload to IPFS]
    UploadIPFS --> IPFSHash[IPFS Hash]

    IPFSHash --> SmartContract[NFT Contract]
    SmartContract --> MintFunction[mintBrandCertificate]

    MintFunction --> Blockchain[Monad Blockchain]
    Blockchain --> TokenID[Token ID]

    TokenID --> UserWallet[User's Wallet]
    TokenID --> Explorer[Block Explorer]

    style Brand fill:#8B5CF6,color:#fff
    style Blockchain fill:#0066FF,color:#fff
    style UserWallet fill:#10B981,color:#fff
```

---

**Total Diagrams:** 12
**Coverage:**
- User Flows: 3
- Admin Flows: 2
- Application Flows: 4
- Deployment Flows: 2
- Data Flows: 2

**Last Updated:** December 5, 2025
**Event:** Monad Blitz SF #18
