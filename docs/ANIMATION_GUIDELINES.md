# Animation Guidelines

**Critical Principle**: LESS = MORE

Animations should enhance user experience, not distract from it. Every animation must serve a clear purpose.

---

## Core Rules

### ✅ DO:
- Use animations for feedback (button clicks, form submissions)
- Animate state changes (loading, success, error)
- Guide user attention (new content, notifications)
- Provide context (where elements come from/go to)
- Use GPU-accelerated properties (`transform`, `opacity`)
- Respect `prefers-reduced-motion`
- Keep animations under 500ms
- Test at 60 FPS

### ❌ DON'T:
- Animate for decoration only
- Use overly long animations (>500ms)
- Animate layout properties (`width`, `height`, `top`, `left`)
- Loop animations indefinitely (unless loading)
- Animate on initial page load (unless critical)
- Use animations that cause motion sickness
- Animate too many elements simultaneously

---

## Performance Standards

### GPU Acceleration

**ONLY animate these properties**:
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (blur, brightness, etc.)

**NEVER animate**:
- `width`, `height` (causes layout thrashing)
- `top`, `left`, `right`, `bottom` (use `transform: translate()` instead)
- `margin`, `padding` (causes reflow)

### FPS Requirements

- **60 FPS**: Standard for all animations
- **16.67ms**: Maximum frame time
- **No jank**: Zero dropped frames
- **Smooth**: Consistent frame timing

### Testing

```javascript
// Performance test example
import { motion, useAnimation } from 'framer-motion';

// Monitor FPS
const checkFPS = () => {
  let lastTime = performance.now();
  let frames = 0;

  const measureFPS = () => {
    const currentTime = performance.now();
    frames++;

    if (currentTime >= lastTime + 1000) {
      const fps = Math.round((frames * 1000) / (currentTime - lastTime));
      console.log(`FPS: ${fps}`);

      if (fps < 55) {
        console.warn('⚠️ Animation dropping frames!');
      }

      frames = 0;
      lastTime = currentTime;
    }

    requestAnimationFrame(measureFPS);
  };

  measureFPS();
};
```

---

## Animation Design Tokens

### Duration Tokens

```typescript
export const duration = {
  // Micro-interactions (instant feedback)
  instant: '100ms',

  // Fast (quick transitions)
  fast: '150ms',

  // Normal (default for most animations)
  normal: '250ms',

  // Slow (complex animations)
  slow: '350ms',

  // Very slow (maximum allowed)
  verySlow: '500ms',
} as const;
```

### Easing Tokens

```typescript
export const easing = {
  // Entering elements (slow start, fast end)
  easeOut: 'cubic-bezier(0.33, 1, 0.68, 1)',

  // Exiting elements (fast start, slow end)
  easeIn: 'cubic-bezier(0.32, 0, 0.67, 0)',

  // State changes (smooth both ways)
  easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',

  // Sharp (quick attention)
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',

  // Bounce (playful, use sparingly)
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  // Spring (natural movement)
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;
```

### Motion Tokens (Framer Motion)

```typescript
export const motion = {
  // Spring physics (natural, realistic)
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },

  // Gentle spring (smooth, soft)
  springGentle: {
    type: 'spring',
    stiffness: 200,
    damping: 40,
  },

  // Bouncy spring (playful)
  springBouncy: {
    type: 'spring',
    stiffness: 400,
    damping: 20,
  },

  // Tween (controlled timing)
  tween: {
    type: 'tween',
    duration: 0.25,
    ease: 'easeInOut',
  },
} as const;
```

---

## Animation Patterns

### 1. Button Animations

#### Click Effect
```tsx
import { motion } from 'framer-motion';

export function Button({ children, onClick }: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
      onClick={onClick}
      className="px-4 py-2 bg-primary rounded-lg"
    >
      {children}
    </motion.button>
  );
}
```

#### Hover Effect (Subtle)
```tsx
<motion.button
  whileHover={{
    scale: 1.02,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  }}
  transition={{ duration: 0.15 }}
>
  Hover Me
</motion.button>
```

### 2. Card Animations

#### Hover Lift
```tsx
<motion.div
  whileHover={{
    y: -4,
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
  }}
  transition={{ duration: 0.2 }}
  className="card"
>
  Card Content
</motion.div>
```

### 3. Loading States

#### Spinner (Infinite Loop OK)
```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{
    duration: 1,
    repeat: Infinity,
    ease: 'linear',
  }}
  className="w-6 h-6 border-2 border-t-primary rounded-full"
/>
```

#### Skeleton Screen
```tsx
<motion.div
  animate={{ opacity: [0.5, 1, 0.5] }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
  className="w-full h-20 bg-gray-200 rounded"
/>
```

### 4. Modal/Dialog Animations

#### Entry Animation
```tsx
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
};

<motion.div
  variants={modalVariants}
  initial="hidden"
  animate="visible"
  exit="exit"
>
  Modal Content
</motion.div>
```

### 5. List Animations (Stagger)

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

<motion.ul variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.li key={item.id} variants={itemVariants}>
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

### 6. Page Transitions

```tsx
const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2 },
  },
};

<motion.div
  variants={pageVariants}
  initial="initial"
  animate="animate"
  exit="exit"
>
  Page Content
</motion.div>
```

### 7. Notification Toast

```tsx
const toastVariants = {
  hidden: {
    opacity: 0,
    y: -50,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: { duration: 0.2 },
  },
};
```

### 8. Form Validation Feedback

```tsx
// Error shake
const errorVariants = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  },
};

<motion.input
  animate={hasError ? 'shake' : ''}
  variants={errorVariants}
  className={hasError ? 'border-red-500' : 'border-gray-300'}
/>
```

---

## Accessibility: prefers-reduced-motion

**Always respect user preferences**:

```tsx
import { useReducedMotion } from 'framer-motion';

export function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3,
      },
    },
  };

  return (
    <motion.div variants={variants}>
      Content
    </motion.div>
  );
}
```

### CSS Alternative

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Animation Triggers

### Good Triggers (User-Initiated)

✅ **Hover**: User places cursor over element
✅ **Click/Tap**: User interacts with element
✅ **Focus**: Element receives keyboard focus
✅ **Scroll**: User scrolls element into view
✅ **State Change**: Data updates (loading → success)

### Bad Triggers (Automatic)

❌ **Page Load**: Animating everything on mount
❌ **Infinite Loops**: Non-loading animations that never stop
❌ **Auto-Play**: Animations starting without user input
❌ **Background**: Decorative animations that constantly move

---

## Performance Monitoring

### Lighthouse CI Integration

```yaml
# .lighthouserc.yml
ci:
  collect:
    numberOfRuns: 3
  assert:
    preset: 'lighthouse:recommended'
    assertions:
      first-contentful-paint: ['warn', { maxNumericValue: 1800 }]
      interactive: ['warn', { maxNumericValue: 3800 }]
      cumulative-layout-shift: ['warn', { maxNumericValue: 0.1 }]
      # Animation-specific
      no-unload-listeners: 'error'
      uses-passive-event-listeners: 'error'
      efficient-animated-content: 'error'
```

### Chrome DevTools Performance

1. Open DevTools → Performance
2. Start recording
3. Interact with animated elements
4. Stop recording
5. Look for:
   - Green bars (painting)
   - Purple bars (layout)
   - Yellow bars (scripting)
6. **Goal**: < 16.67ms per frame

### React DevTools Profiler

```tsx
import { Profiler } from 'react';

<Profiler
  id="AnimatedComponent"
  onRender={(id, phase, actualDuration) => {
    if (actualDuration > 16) {
      console.warn(`${id} took ${actualDuration}ms to render`);
    }
  }}
>
  <AnimatedComponent />
</Profiler>
```

---

## Examples of Good vs Bad

### ❌ BAD: Animate Everything

```tsx
// DON'T DO THIS
<div className="page">
  {/* Everything animates on mount = overwhelming */}
  <motion.header animate={{ y: [100, 0] }} />
  <motion.nav animate={{ x: [-100, 0] }} />
  <motion.main animate={{ scale: [0, 1] }} />
  <motion.aside animate={{ rotate: [180, 0] }} />
  <motion.footer animate={{ opacity: [0, 1] }} />
</div>
```

### ✅ GOOD: Animate Intentionally

```tsx
// Only animate user interactions
<div className="page">
  <header>Logo and Nav</header>

  <main>
    {/* Animate new content when it appears */}
    <AnimatePresence>
      {items.map(item => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {item.content}
        </motion.div>
      ))}
    </AnimatePresence>

    {/* Animate button interactions */}
    <motion.button whileTap={{ scale: 0.95 }}>
      Click Me
    </motion.button>
  </main>
</div>
```

---

## Checklist for Every Animation

Before implementing an animation, ask:

- [ ] **Purpose**: Why does this need to animate?
- [ ] **Trigger**: What user action causes it?
- [ ] **Duration**: Is it under 500ms?
- [ ] **Properties**: Am I only animating `transform`/`opacity`?
- [ ] **Performance**: Will this run at 60 FPS?
- [ ] **Accessibility**: Does it respect `prefers-reduced-motion`?
- [ ] **Value**: Does it enhance UX or just look cool?

If you can't justify the animation, **don't add it**.

---

## Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Web Animation Performance](https://web.dev/animations/)
- [WCAG Motion Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [CSS Triggers](https://csstriggers.com/)
- [High Performance Animations](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)

---

**Remember**: The best animation is often no animation at all. Use motion to enhance, not to impress.
