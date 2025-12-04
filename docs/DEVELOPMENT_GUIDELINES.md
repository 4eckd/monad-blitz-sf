# MACHUPS Development Guidelines

**Last Updated:** December 4, 2025
**Repository:** https://github.com/4eckd/monad-blitz-sf

---

## 🎯 Critical Rules

### Repository

**✅ ALWAYS commit to:** https://github.com/4eckd/monad-blitz-sf

**❌ NEVER commit to:**
- Wrong repositories
- Forks without permission
- Deprecated URLs

**Verify before commit:**
```bash
git remote -v
# Should show:
# origin  https://github.com/4eckd/monad-blitz-sf.git (fetch)
# origin  https://github.com/4eckd/monad-blitz-sf.git (push)
```

### Design System

**❌ NEVER use inline CSS:**
```tsx
// BAD
<div style={{ color: '#0066FF', padding: '16px' }}>
  Bad practice
</div>
```

**✅ ALWAYS use design tokens:**
```tsx
// GOOD
<div className="text-brand-primary p-md">
  Follows design system
</div>
```

**❌ NEVER use inline HTML:**
```tsx
// BAD
<div>
  <h1>Title</h1>
  <button style={{ background: 'blue' }}>Click</button>
</div>
```

**✅ ALWAYS use React components:**
```tsx
// GOOD
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';

<div>
  <Heading level={1}>Title</Heading>
  <Button variant="primary">Click</Button>
</div>
```

### Animation System

**Critical Rule: LESS = MORE**

**❌ NEVER animate:**
```tsx
// BAD - Layout properties (causes performance issues)
<div style={{ width: animatedWidth, height: animatedHeight }}>
  Jank
</div>

// BAD - Auto-play on page load
<div className="animate-spin-forever">
  Distracting
</div>
```

**✅ ALWAYS animate with Framer Motion:**
```tsx
// GOOD - GPU-accelerated properties only
import { motion } from 'framer-motion';

<motion.button
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.1 }}
>
  Smooth
</motion.button>
```

**Animation Rules:**
- Only animate `transform` and `opacity` (GPU-accelerated)
- Maximum duration: 500ms
- User-triggered only (hover, click, focus)
- Respect `prefers-reduced-motion`
- 60 FPS minimum

**See**: [Animation Guidelines](./ANIMATION_GUIDELINES.md)

### Branch Management

**Before merging:**
- [ ] All CI checks pass
- [ ] Code review approved
- [ ] No merge conflicts
- [ ] Dependent features merged first
- [ ] Tests pass locally
- [ ] Build succeeds
- [ ] Documentation updated

**Before deleting branches:**
- [ ] Merged to target branch
- [ ] CI confirms merge success
- [ ] No pending PRs depend on it
- [ ] Local branch deleted first: `git branch -d branch-name`
- [ ] Remote branch deleted last: `git push origin --delete branch-name`

**Check merge order:**
```bash
# View branch dependencies
git log --graph --oneline --all

# Check if feature branches are based on latest main
git branch -vv
```

---

## 📝 Commit Standards

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, not CSS)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Tests
- `chore`: Build/tooling

**Examples:**
```bash
feat(generator): add logo generation with HTML/CSS
fix(tokens): correct color accessibility calculation
docs(readme): update installation instructions
refactor(api): simplify brand generation logic
perf(cache): add edge caching with Cloudflare
test(nft): add minting tests
chore(deps): update dependencies
```

---

## 🏗️ Code Quality

### TypeScript

```typescript
// ✅ GOOD - Proper types
interface BrandInput {
  businessIdea: string;
  targetAudience: string;
  style: 'modern' | 'classic' | 'bold';
}

export async function generateBrand(input: BrandInput): Promise<Brand> {
  // Implementation
}

// ❌ BAD - Any types
export async function generateBrand(input: any): Promise<any> {
  // Don't do this
}
```

**Rules:**
- Use strict mode
- No `any` types
- Proper interfaces for all data
- JSDoc for complex functions

### React

```tsx
// ✅ GOOD - Functional component with TypeScript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = 'primary', children, onClick }: ButtonProps) {
  return (
    <button className={`btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

// ❌ BAD - Class component
class Button extends React.Component {
  // Don't use class components
}
```

**Rules:**
- Functional components only
- Use hooks appropriately
- Keep components small (<200 lines)
- Extract reusable logic to hooks

### Styling

```tsx
// ✅ GOOD - Tailwind utilities
<div className="flex items-center gap-md p-lg bg-brand-primary rounded-lg">
  <h1 className="text-2xl font-heading text-white">Title</h1>
</div>

// ❌ BAD - Inline styles
<div style={{
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '24px',
  background: '#0066FF',
  borderRadius: '8px'
}}>
  <h1 style={{ fontSize: '24px', color: 'white' }}>Title</h1>
</div>
```

**Rules:**
- Tailwind utility classes ONLY
- No inline styles
- Follow design token system
- Mobile-first responsive design

---

## 🔒 Security

### Environment Variables

```bash
# ✅ GOOD - Use environment variables
const API_KEY = process.env.ANTHROPIC_API_KEY!

// ❌ BAD - Hardcoded secrets
const API_KEY = 'sk-ant-1234567890'
```

### Checklist

- [ ] No API keys in code
- [ ] No private keys committed
- [ ] Input validation on all forms
- [ ] Sanitize user input
- [ ] HTTPS only
- [ ] Rate limiting on API routes
- [ ] CORS properly configured

---

## 🧪 Testing

### Before Commit

```bash
# Type checking
pnpm tsc --noEmit

# Linting
pnpm lint

# Build
pnpm build

# Tests (when available)
pnpm test
```

### Pre-Commit Checklist

- [ ] Code follows design system
- [ ] No inline CSS/HTML
- [ ] TypeScript compiles
- [ ] ESLint passes
- [ ] Tests pass
- [ ] No console.logs
- [ ] No commented code
- [ ] Documentation updated

---

## 📦 Automated Documentation

### Workflow

The repository includes an automated documentation workflow that:

1. **Extracts design tokens** from `tailwind.config.ts`
2. **Generates component docs** from `components.json`
3. **Updates design standards** automatically
4. **Creates pull requests** when changes detected

**Triggered by:**
- Code changes in `lib/`, `components/`, `app/`
- Changes to `tailwind.config.ts`
- Changes to `components.json`
- Manual trigger via GitHub Actions

**Files Auto-Generated:**
- `docs/design-tokens.json` - Extracted tokens
- `docs/components.md` - Component documentation
- `docs/design-standards.md` - Design system rules

---

## 🚨 Emergency Procedures

### Rollback Failed Merge

```bash
# 1. Revert the merge
git revert -m 1 <merge-commit-hash>

# 2. Push revert
git push origin main

# 3. Create hotfix branch
git checkout -b hotfix/description

# 4. Fix, test, commit
git add .
git commit -m "hotfix: description of fix"

# 5. Push and create PR
git push origin hotfix/description
```

### Build Failures

1. Check CI logs in GitHub Actions
2. Review diagnostic comments on PR/commit
3. Fix issues locally
4. Verify with `pnpm build`
5. Push fix
6. Monitor CI results

---

## 📚 Resources

### Documentation
- [CLAUDE.md](../CLAUDE.md) - Complete development guide
- [README.md](../README.md) - Project overview
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
- [SECURITY.md](../SECURITY.md) - Security policies

### Design System
- [components.json](../components.json) - Component registry
- [tailwind.config.ts](../tailwind.config.ts) - Design tokens
- [docs/design-standards.md](./design-standards.md) - Standards

### Planning
- [blitz/plans/DETAILED_PLAN.md](../blitz/plans/DETAILED_PLAN.md) - Full plan
- [blitz/plans/QUICKSTART.md](../blitz/plans/QUICKSTART.md) - Quick ref

---

**Last Updated:** December 4, 2025
**Maintained By:** Development Team @ Monad Blitz SF #18
