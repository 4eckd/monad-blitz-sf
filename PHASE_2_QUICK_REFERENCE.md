# 🚀 MACHUPS Phase 2 - Quick Reference

**For Agent Developers - Print this out or keep it handy!**

---

## ⚡ One-Page Cheat Sheet

### Your Feature Assignment

```bash
# Check which feature you're assigned
# See PHASE_2_DEVELOPER_GUIDE.md section "Feature Branch Assignments"

Feature 1: Brand Analyzer      → feature/brand-analyzer
Feature 2: Logo Generator       → feature/logo-generator
Feature 3: Token Generator      → feature/token-generator
Feature 4: Component Generator  → feature/component-generator
Feature 5: Integration Pipeline → feature/integration-pipeline
```

---

## 🌿 Git Commands

### Setup (Once)

```bash
# Clone repo (if needed)
git clone https://github.com/4eckd/monad-blitz-sf.git
cd monad-blitz-sf

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
# Edit .env.local and add your CLAUDE_API_KEY
```

### Daily Workflow

```bash
# 1. Create/switch to your feature branch
git checkout -b feature/brand-analyzer  # First time
git checkout feature/brand-analyzer      # Thereafter

# 2. Pull latest changes
git pull origin phase-2-core-engine

# 3. Make changes...

# 4. Test before committing
pnpm type-check && pnpm lint && pnpm test && pnpm build

# 5. Commit
git add .
git commit -m "feat(brand-analyzer): add Claude AI integration"

# 6. Push
git push origin feature/brand-analyzer
```

### Merge to Phase Branch

```bash
# Switch to phase branch
git checkout phase-2-core-engine
git pull origin phase-2-core-engine

# Merge your feature (squash for clean history)
git merge --squash feature/brand-analyzer
git commit -m "feat(phase-2): add brand analyzer"

# Push
git push origin phase-2-core-engine

# Delete feature branch
git branch -d feature/brand-analyzer
git push origin --delete feature/brand-analyzer
```

---

## 🧪 Testing Commands

```bash
# Run all tests
pnpm test

# Run specific test
pnpm test brand-analyzer

# Watch mode (runs tests on file change)
pnpm test:watch

# Coverage report
pnpm test:coverage

# Type checking
pnpm type-check

# Linting
pnpm lint

# Auto-fix linting issues
pnpm lint:fix

# Build (ensure no build errors)
pnpm build

# Run dev server
pnpm dev
```

---

## 📝 Commit Message Format

```bash
# Format: type(scope): subject

feat(brand-analyzer): add Claude AI integration
fix(logo-generator): correct SVG export dimensions
docs(readme): update installation instructions
test(token-generator): add WCAG validation tests
refactor(components): extract common hooks
perf(pipeline): parallelize logo generation
chore(deps): update dependencies
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

---

## 🎨 Code Standards

### ✅ DO THIS

```typescript
// TypeScript with strict types
import { BrandInput, BrandAnalysis } from '@/types/brand';

/**
 * Analyzes brand strategy
 * @param input - Brand parameters
 * @returns Brand analysis
 */
export async function analyzeBrand(
  input: BrandInput
): Promise<BrandAnalysis> {
  // Implementation
}
```

```tsx
// React with design system
import { Button } from '@/components/ui/button';

export function MyForm() {
  return (
    <form className="space-y-md">
      <Button variant="primary">Submit</Button>
    </form>
  );
}
```

### ❌ DON'T DO THIS

```typescript
// No any types!
export async function analyzeBrand(input: any): Promise<any> {
  // BAD
}
```

```tsx
// No inline styles!
export function MyForm() {
  return (
    <form style={{ padding: '20px' }}>
      <button style={{ background: 'blue' }}>Submit</button>
    </form>
  );
}
```

---

## 📁 File Locations

### Your Feature Files

```
lib/
├── generators/
│   ├── brand-analyzer.ts          ← Feature 1
│   ├── logo-generator.ts           ← Feature 2
│   ├── token-generator.ts          ← Feature 3
│   ├── component-generator.ts      ← Feature 4
│   └── __tests__/
│       ├── brand-analyzer.test.ts
│       ├── logo-generator.test.ts
│       ├── token-generator.test.ts
│       └── component-generator.test.ts
│
├── orchestrator/
│   └── brand-orchestrator.ts       ← Feature 5 (update)
│
├── validators/
│   └── wcag-validator.ts           ← Shared utility
│
└── exporters/
    └── token-exporters.ts          ← Token export formats

types/
└── brand.ts                         ← All TypeScript types

app/
├── api/
│   └── generate/route.ts            ← Feature 5 (update)
└── generate/[id]/page.tsx           ← Feature 5 (update)
```

---

## 🎯 Performance Targets

| Feature | Target Time |
|---------|-------------|
| Brand Analyzer | <30 seconds |
| Logo Generator | <45 seconds |
| Token Generator | <15 seconds |
| Component Generator | <60 seconds |
| **Total Pipeline** | **<3 minutes** |

---

## ✅ Pre-Commit Checklist

Before every commit:

- [ ] `pnpm type-check` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm test` passes
- [ ] `pnpm build` succeeds
- [ ] No `console.log` statements
- [ ] No `any` types
- [ ] No inline CSS/HTML
- [ ] JSDoc comments on exports
- [ ] Tests added for new code

---

## 🎯 Success Criteria

Your feature is DONE when:

- [ ] Performance target met
- [ ] All tests passing (>80% coverage)
- [ ] TypeScript strict mode passing
- [ ] No linting errors
- [ ] JSDoc comments complete
- [ ] WCAG AA compliant (if applicable)
- [ ] PR approved
- [ ] Merged to phase-2-core-engine

---

## 🐛 Common Issues & Solutions

### Issue: TypeScript errors after pulling

```bash
# Solution: Clean and reinstall
rm -rf node_modules .next
pnpm install
```

### Issue: Tests failing

```bash
# Solution: Update test snapshots
pnpm test -u

# Or run specific test
pnpm test brand-analyzer --watch
```

### Issue: Lint errors

```bash
# Solution: Auto-fix
pnpm lint:fix
```

### Issue: Build fails

```bash
# Solution: Check for:
# 1. Missing environment variables
# 2. TypeScript errors (pnpm type-check)
# 3. Syntax errors
```

### Issue: Merge conflicts

```bash
# Solution: Rebase on phase-2-core-engine
git checkout feature/your-feature
git rebase phase-2-core-engine
# Resolve conflicts
git rebase --continue
```

---

## 📞 Getting Help

### Quick Links

- **Full Developer Guide:** [PHASE_2_DEVELOPER_GUIDE.md](PHASE_2_DEVELOPER_GUIDE.md)
- **Team Brief:** [PHASE_2_TEAM_BRIEF.md](PHASE_2_TEAM_BRIEF.md)
- **Strategy Doc:** [docs/PHASE_2_STRATEGY.md](docs/PHASE_2_STRATEGY.md)
- **Gonads Demo:** [brands/gonads-io/](brands/gonads-io/)

### Communication

- **Blockers:** GitHub Issues (tag @team)
- **Questions:** GitHub Discussions
- **PR Reviews:** Required within 2 hours
- **Daily Updates:** Post in Discussions

---

## 🔥 Emergency Commands

### Undo last commit (not pushed)

```bash
git reset --soft HEAD~1
```

### Undo last commit (already pushed)

```bash
git revert HEAD
git push origin feature/your-feature
```

### Discard all local changes

```bash
git reset --hard HEAD
git clean -fd
```

### Fix merge conflicts

```bash
# 1. Accept theirs
git checkout --theirs path/to/file

# 2. Accept yours
git checkout --ours path/to/file

# 3. Manual edit, then:
git add path/to/file
git commit
```

---

## 💡 Pro Tips

1. **Test as you code** - Run `pnpm test:watch` in a terminal
2. **Commit often** - Small, focused commits are easier to review
3. **Read the types** - Check `types/brand.ts` for all interfaces
4. **Check the demo** - `brands/gonads-io/` has working examples
5. **Use JSDoc** - Write documentation as you code, not after
6. **Parallel work** - Use `Promise.all()` to speed up generation
7. **Error handling** - Always wrap async code in try/catch
8. **WCAG first** - Validate colors during generation, not after

---

## 📊 Your Impact

**Traditional Branding:**
- Cost: $5,000 - $50,000
- Time: 2-4 weeks
- Accessible to: Large companies only

**MACHUPS (What You're Building):**
- Cost: $10 - $49
- Time: <3 minutes
- Accessible to: Everyone

**You're democratizing professional design! 🎨**

---

## ✨ Code Snippets

### Import Types

```typescript
import {
  BrandInput,
  BrandAnalysis,
  LogoSet,
  DesignTokens,
  ComponentLibrary,
  BrandPackage
} from '@/types/brand';
```

### Basic Test Template

```typescript
import { yourFunction } from '../your-module';

describe('yourFunction', () => {
  it('should work correctly', async () => {
    const result = await yourFunction({ /* input */ });
    expect(result).toBeDefined();
  });
});
```

### Error Handling Pattern

```typescript
export async function myFunction(input: Input): Promise<Output> {
  try {
    // Do work
    const result = await someAsyncOperation(input);
    return result;
  } catch (error) {
    console.error('Operation failed:', error);
    throw new Error(`Failed to complete operation: ${error.message}`);
  }
}
```

### Progress Tracking Pattern

```typescript
export async function generate(
  input: Input,
  onProgress?: (step: string, percent: number) => void
): Promise<Output> {
  onProgress?.('Starting...', 0);

  const step1 = await doStep1();
  onProgress?.('Step 1 complete', 25);

  const step2 = await doStep2();
  onProgress?.('Step 2 complete', 50);

  // ... etc

  onProgress?.('Complete!', 100);
  return result;
}
```

---

**Print this page and keep it handy! 📄**

**Version:** 1.0
**Last Updated:** December 6, 2025
**For:** MACHUPS Phase 2 Development Team
