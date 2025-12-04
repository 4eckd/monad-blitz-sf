# Contributing to MACHUPS

Thank you for your interest in contributing to MACHUPS! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to uphold our Code of Conduct. Please be respectful and constructive in all interactions.

## How to Contribute

### Reporting Bugs

**Before submitting a bug report:**
- Check existing issues to avoid duplicates
- Gather information about your environment
- Try to reproduce the issue

**When submitting a bug report, include:**
- Clear, descriptive title
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots (if applicable)
- Environment details (OS, Node version, browser)

### Suggesting Features

**Feature requests should include:**
- Clear description of the feature
- Use case and benefits
- Potential implementation approach
- Examples from similar tools (if applicable)

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the coding standards
   - Write clear commit messages
   - Add tests for new features
   - Update documentation

4. **Test thoroughly**
   ```bash
   pnpm test
   pnpm lint
   pnpm build
   ```

5. **Submit PR**
   - Reference related issues
   - Describe your changes
   - Include screenshots/demos if UI-related

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/machlab.git
cd machlab

# Add upstream remote
git remote add upstream https://github.com/4eckd/monad-blitz-sf.git

# Install dependencies
pnpm install

# Create .env.local
cp .env.example .env.local
# Add your API keys

# Run development server
pnpm dev
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Provide type definitions for all functions
- Avoid `any` types
- Use interfaces for object shapes

**Example:**
```typescript
interface BrandInput {
  businessIdea: string;
  targetAudience: string;
  style: string;
}

export async function generateBrand(input: BrandInput): Promise<Brand> {
  // Implementation
}
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use TypeScript props interface
- Add JSDoc comments

**Example:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

/**
 * Button component with multiple variants and sizes
 */
export function Button({ variant = 'primary', size = 'md', children, onClick }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Naming Conventions

- **Files:** kebab-case (`brand-generator.ts`)
- **Components:** PascalCase (`BrandGenerator.tsx`)
- **Functions:** camelCase (`generateBrand()`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_RETRIES`)
- **Types/Interfaces:** PascalCase (`BrandInput`)

### Code Style

- Use Prettier for formatting (config included)
- Run ESLint before committing
- Max line length: 100 characters
- Use 2 spaces for indentation
- Add trailing commas in multiline structures

### Commit Messages

Follow conventional commits:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build process or tooling changes

**Examples:**
```
feat(generator): add A/B testing variant generation

fix(tokens): correct color accessibility calculation

docs(readme): update installation instructions
```

## Project Structure

### Adding New Generators

1. Create file in `lib/generators/`
2. Implement the generator interface
3. Add prompts to `prompts/`
4. Write tests
5. Update documentation

**Example:**
```typescript
// lib/generators/my-generator.ts
export interface MyGeneratorInput {
  // Define input
}

export interface MyGeneratorOutput {
  // Define output
}

export async function generateMyThing(input: MyGeneratorInput): Promise<MyGeneratorOutput> {
  // Implementation
}
```

### Adding New Tools

1. Create file in `tools/`
2. Add CLI interface
3. Update `tools/README.md`
4. Add npm script to `package.json`

### Adding MCP Servers

1. Create directory in `mcp/`
2. Add `config.json`
3. Document in `mcp/README.md`
4. Update `.env.example`

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage
```

### Writing Tests

Place tests next to the code they test:

```
lib/
  generators/
    brand-generator.ts
    brand-generator.test.ts
```

Use descriptive test names:

```typescript
describe('generateBrand', () => {
  it('should generate valid brand name from business idea', async () => {
    // Test implementation
  });

  it('should throw error when input is invalid', async () => {
    // Test implementation
  });
});
```

## Documentation

### Code Documentation

- Add JSDoc comments to all public functions
- Include parameter descriptions
- Provide usage examples
- Document return types

```typescript
/**
 * Generates a complete brand package from user input
 *
 * @param input - The brand generation parameters
 * @param input.businessIdea - Description of the business
 * @param input.targetAudience - Target customer segment
 * @param input.style - Desired visual style
 * @returns Complete brand package with logos, tokens, and documentation
 *
 * @example
 * const brand = await generateBrand({
 *   businessIdea: 'Coffee delivery service',
 *   targetAudience: 'Urban professionals',
 *   style: 'Modern, minimalist'
 * });
 */
export async function generateBrand(input: BrandInput): Promise<Brand> {
  // Implementation
}
```

### README Updates

When adding features, update:
- Main README.md
- Relevant section-specific READMEs
- CHANGELOG.md
- QUICKSTART.md (if applicable)

## Review Process

1. **Automated Checks**
   - Tests must pass
   - Linting must pass
   - Build must succeed

2. **Code Review**
   - At least one approving review required
   - Address all comments
   - Maintain constructive dialogue

3. **Merge**
   - Squash and merge for clean history
   - Delete branch after merge

## Release Process

1. Update VERSION file
2. Update CHANGELOG.md
3. Create git tag
4. Build and deploy

## Getting Help

**Questions?**
- Check existing documentation
- Search closed issues
- Ask in GitHub Discussions

**Stuck?**
- Ping maintainers in your PR
- Join our Discord (link in README)
- Email: dev@fusedgaming.com

## Recognition

Contributors will be:
- Listed in CHANGELOG.md
- Mentioned in release notes
- Added to contributors list

Thank you for making MACHUPS better! 🙌
