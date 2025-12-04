# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reporting a Vulnerability

We take the security of MACHUPS seriously. If you discover a security vulnerability, please follow these steps:

### 1. DO NOT Create a Public Issue

Please **do not** create a public GitHub issue for security vulnerabilities. This helps prevent malicious actors from exploiting the vulnerability before it's fixed.

### 2. Report Privately

Send vulnerability reports to: **security@fusedgaming.com**

Include in your report:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### 3. Response Timeline

- **Initial Response:** Within 48 hours
- **Status Update:** Within 7 days
- **Fix Timeline:** Varies by severity (critical: 24-48 hours, high: 7 days, medium: 30 days)

## Security Measures

### API Key Protection

**Environment Variables:**
- All API keys stored in `.env.local` (never committed)
- `.env.example` provides template without real values
- `.gitignore` prevents accidental commits

**Best Practices:**
```bash
# Never do this
const API_KEY = "sk-ant-123456789"

# Always use environment variables
const API_KEY = process.env.ANTHROPIC_API_KEY
```

### Authentication & Authorization

**Wallet Security:**
- Private keys never stored in code
- User wallets managed via thirdweb
- Transaction signing handled client-side

**API Security:**
- Rate limiting on all endpoints
- Input validation and sanitization
- CORS policies enforced

### Data Protection

**User Data:**
- No personal information stored unnecessarily
- Generated brands stored temporarily (24 hours)
- NFT metadata on-chain only

**API Security:**
- Request validation
- Response sanitization
- No sensitive data in logs

### Third-Party Integrations

**Trusted Services:**
- Anthropic (Claude API)
- OpenAI (DALL-E)
- Penpot (Design tool)
- Cloudflare (CDN & hosting)
- thirdweb (Blockchain abstraction)

**Security Measures:**
- Regular dependency updates
- Vulnerability scanning
- Secure token storage

## Known Security Considerations

### During Hackathon (Testnet Only)

**Acceptable for Demo:**
- Using Monad testnet (not mainnet)
- Simplified wallet connection
- Basic rate limiting

**NOT Acceptable:**
- Exposed API keys in code
- Unvalidated user input
- Missing CORS protection

### Production Considerations

**Before Production Deployment:**
- [ ] Comprehensive security audit
- [ ] Rate limiting per user
- [ ] DDoS protection
- [ ] Advanced input validation
- [ ] Error handling (no sensitive info in errors)
- [ ] Logging without sensitive data
- [ ] HTTPS everywhere
- [ ] Content Security Policy
- [ ] Secure headers (HSTS, X-Frame-Options, etc.)

## Common Vulnerabilities

### Prevented

✅ **SQL Injection** - No direct SQL queries, using ORMs
✅ **XSS** - React's built-in XSS protection, sanitized inputs
✅ **CSRF** - Token-based authentication
✅ **API Key Exposure** - Environment variables only
✅ **Dependency Vulnerabilities** - Regular `pnpm audit`

### Monitoring

🔍 **What We Check:**
- Dependency vulnerabilities (weekly)
- API rate limit breaches (real-time)
- Unusual wallet activity (manual review)
- Failed authentication attempts (logged)

## Secure Development Practices

### Code Review Checklist

- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] Output sanitization
- [ ] Error messages don't leak info
- [ ] Rate limiting implemented
- [ ] CORS configured correctly
- [ ] Authentication checked
- [ ] Authorization verified

### Pre-Commit Checks

Run before every commit:

```bash
# Check for secrets
pnpm run check:secrets

# Run security audit
pnpm audit

# Lint for security issues
pnpm run lint:security
```

## Dependencies

### Updating Dependencies

```bash
# Check for updates
pnpm outdated

# Update with caution
pnpm update

# Audit for vulnerabilities
pnpm audit

# Fix vulnerabilities
pnpm audit fix
```

### Vulnerability Scanning

Automated via GitHub Dependabot.

Manual scan:
```bash
pnpm audit
```

## Incident Response

### If a Vulnerability is Discovered

1. **Immediate:** Disable affected functionality if critical
2. **Within 1 hour:** Assess impact and scope
3. **Within 24 hours:** Develop and test fix
4. **Within 48 hours:** Deploy fix and notify users
5. **Within 7 days:** Post-mortem and preventive measures

### Communication

- Private disclosure to reporters
- Public disclosure after fix deployed
- Security advisory on GitHub
- Update CHANGELOG.md

## Contact

**Security Team:** security@fusedgaming.com
**General Issues:** https://github.com/4eckd/monad-blitz-sf/issues

---

**Last Updated:** December 4, 2025
**Version:** 1.0
