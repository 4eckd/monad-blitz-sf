---
sidebar_position: 3
---

# React Components

MACHUPS generates 30+ production-ready React components styled with your brand's design tokens.

## Component Library

### Form Components

- **Button**: Primary, secondary, ghost variants
- **Input**: Text, email, password, search
- **Textarea**: Multi-line text input
- **Select**: Dropdown selection
- **Checkbox**: Boolean selection
- **Radio**: Single selection from multiple options
- **Switch**: Toggle control

### Layout Components

- **Container**: Max-width content wrapper
- **Grid**: Responsive grid system
- **Stack**: Vertical/horizontal spacing
- **Divider**: Visual separator
- **Spacer**: Flexible spacing

### Content Components

- **Card**: Content container with optional header/footer
- **Badge**: Status indicator
- **Avatar**: User profile image
- **Alert**: Notification message
- **Toast**: Temporary notification
- **Modal**: Overlay dialog
- **Tooltip**: Hover information

### Navigation Components

- **Header**: Site header with logo and navigation
- **Footer**: Site footer with links
- **Breadcrumbs**: Page hierarchy navigation
- **Tabs**: Tabbed content interface
- **Pagination**: Page navigation controls
- **Sidebar**: Side navigation panel

### Data Display

- **Table**: Tabular data display
- **List**: Ordered/unordered lists
- **Stat**: Metric display
- **Progress**: Progress indicator
- **Skeleton**: Loading placeholder

## Example Components

### Button

```tsx
import { Button } from '@/components/ui/button';

export function Example() {
  return (
    <>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </>
  );
}
```

**Generated Code:**

```tsx
import React, { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}) => {
  const baseStyles = {
    fontFamily: 'var(--font-family-body)',
    fontWeight: 600,
    borderRadius: 'var(--border-radius-md)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none'
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--color-brand-primary)',
      color: 'white'
    },
    secondary: {
      backgroundColor: 'var(--color-brand-secondary)',
      color: 'white'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-brand-primary)',
      border: '2px solid var(--color-brand-primary)'
    }
  };

  const sizeStyles = {
    sm: {
      padding: 'var(--spacing-xs) var(--spacing-sm)',
      fontSize: 'var(--font-size-sm)'
    },
    md: {
      padding: 'var(--spacing-sm) var(--spacing-md)',
      fontSize: 'var(--font-size-base)'
    },
    lg: {
      padding: 'var(--spacing-md) var(--spacing-lg)',
      fontSize: 'var(--font-size-lg)'
    }
  };

  return (
    <button
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...sizeStyles[size]
      }}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Card

```tsx
import { Card } from '@/components/ui/card';

export function Example() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
      </Card.Header>
      <Card.Body>
        <p>Card content goes here.</p>
      </Card.Body>
      <Card.Footer>
        <Button>Action</Button>
      </Card.Footer>
    </Card>
  );
}
```

### Input

```tsx
import { Input } from '@/components/ui/input';

export function Example() {
  return (
    <Input
      type="email"
      placeholder="Enter your email"
      label="Email Address"
      required
    />
  );
}
```

## Framework Support

MACHUPS generates components for multiple frameworks:

### Next.js (Default)

```tsx
'use client';

import { FC } from 'react';
// Component code...
```

### React + TypeScript

```tsx
import React, { FC } from 'react';
// Component code...
```

### HTML + CSS

```html
<button class="button button--primary button--md">
  Click Me
</button>

<style>
.button {
  font-family: var(--font-family-body);
  font-weight: 600;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.button--primary {
  background-color: var(--color-brand-primary);
  color: white;
}

.button--md {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-base);
}
</style>
```

## Component Features

### Type Safety

All components include full TypeScript types:

```tsx
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
}
```

### Accessibility

Components follow WCAG 2.1 AA standards:

- Semantic HTML elements
- ARIA attributes where appropriate
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators
- Sufficient color contrast

```tsx
<button
  role="button"
  aria-label="Submit form"
  aria-disabled={disabled}
  tabIndex={0}
>
  Submit
</button>
```

### Responsive Design

Mobile-first approach:

```tsx
const responsiveStyles = {
  fontSize: 'var(--font-size-sm)',
  padding: 'var(--spacing-xs) var(--spacing-sm)',
  '@media (min-width: 768px)': {
    fontSize: 'var(--font-size-base)',
    padding: 'var(--spacing-sm) var(--spacing-md)'
  }
};
```

### Dark Mode Support

Automatic theme switching:

```tsx
const styles = {
  backgroundColor: 'var(--bg-primary)',
  color: 'var(--text-primary)',
  borderColor: 'var(--border-primary)'
};
```

## Customization

### Extending Components

```tsx
import { Button } from '@/components/ui/button';

export function CustomButton(props) {
  return (
    <Button
      {...props}
      className="custom-button"
      style={{
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        ...props.style
      }}
    />
  );
}
```

### Overriding Styles

```tsx
<Button
  variant="primary"
  style={{
    backgroundColor: '#FF0000',
    borderRadius: '999px'
  }}
>
  Custom Styled Button
</Button>
```

### Theme Customization

Update design tokens:

```css
:root {
  --color-brand-primary: #YOUR_COLOR;
  --border-radius-md: 12px;
  --spacing-md: 1.5rem;
}
```

## Component Documentation

Each component includes:

### Props Table

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'ghost' | 'primary' | Visual style |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Component size |
| disabled | boolean | false | Disabled state |
| loading | boolean | false | Loading state |

### Usage Examples

Multiple examples showing:
- Basic usage
- All variants
- Different sizes
- States (hover, focus, disabled)
- Composition patterns

### Code Snippets

Ready-to-copy code for:
- React/TSX
- HTML/CSS
- Tailwind CSS

## Testing

Components include test coverage:

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from './button';

test('renders button with text', () => {
  render(<Button>Click Me</Button>);
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  screen.getByText('Click').click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## Performance

### Code Splitting

```tsx
// Lazy load heavy components
const Modal = lazy(() => import('@/components/ui/modal'));

function App() {
  return (
    <Suspense fallback={<Skeleton />}>
      <Modal />
    </Suspense>
  );
}
```

### Memoization

```tsx
import { memo } from 'react';

export const Button = memo(({ children, ...props }) => {
  // Component code
});
```

## Integration

### Storybook

```tsx
// Button.stories.tsx
import { Button } from './button';

export default {
  title: 'Components/Button',
  component: Button
};

export const Primary = () => <Button variant="primary">Button</Button>;
export const Secondary = () => <Button variant="secondary">Button</Button>;
```

### Styled Components

```tsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: var(--color-brand-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
`;
```

### Tailwind CSS

```tsx
<button className="bg-brand-primary text-white px-md py-sm rounded-md hover:bg-brand-primary-dark transition-colors">
  Click Me
</button>
```

## Next Steps

- [Design Tokens](./design-tokens) - Understand underlying token system
- [Brand Generation](./brand-generation) - How components are created
- [API Reference](../api/overview) - Programmatic component generation
