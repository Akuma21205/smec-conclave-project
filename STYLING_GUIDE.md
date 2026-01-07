# SMEC Global Innovators Conclave 2026
## Design System & Styling Guide

**Version:** 1.0.0  
**Last Updated:** 2026  
**Maintained By:** Development Team

---

## Table of Contents

1. [Color Palette](#color-palette)
2. [CSS Variables](#css-variables)
3. [Tailwind Configuration](#tailwind-configuration)
4. [Typography](#typography)
5. [Spacing System](#spacing-system)
6. [Gradients](#gradients)
7. [Transitions & Animations](#transitions--animations)
8. [Component Styling](#component-styling)
9. [Usage Guidelines](#usage-guidelines)
10. [Code Examples](#code-examples)

---

## Color Palette

### Primary Colors

The website uses a **violet/purple theme** as the primary accent color scheme, creating a modern, premium aesthetic.

#### Accent Colors (Primary Palette)

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Primary Violet** | `#8B7BB5` | `rgb(139, 123, 181)` | Main accent color, buttons, highlights |
| **Violet Light** | `#A99BD4` | `rgb(169, 155, 212)` | Hover states, lighter accents |
| **Violet Dark** | `#6B5B95` | `rgb(107, 91, 149)` | Darker variants, shadows |
| **Lavender** | `#C4B5E0` | `rgb(196, 181, 224)` | Light accents, text highlights |

#### Background Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Background Primary** | `#0a0a0f` | `rgb(10, 10, 15)` | Main page background |
| **Background Secondary** | `#111118` | `rgb(17, 17, 24)` | Card backgrounds, elevated surfaces |
| **Background Dark** | `#000000` | `rgb(0, 0, 0)` | Deep dark areas |
| **Card Background** | `rgba(255, 255, 255, 0.03)` | - | Glass morphism cards |
| **Card Hover** | `rgba(255, 255, 255, 0.06)` | - | Card hover states |

#### Text Colors

| Color Name | Hex Code | RGB | Opacity | Usage |
|------------|----------|-----|---------|-------|
| **Text Primary** | `#EAEAEA` | `rgb(234, 234, 234)` | 100% | Main body text, headings |
| **Text Secondary** | `#EAEAEA` | `rgb(234, 234, 234)` | 75% | Secondary text, descriptions |
| **Text Muted** | `#EAEAEA` | `rgb(234, 234, 234)` | 50% | Placeholder text, labels |
| **Text Light** | `#EAEAEA` | `rgb(234, 234, 234)` | 100% | Light text variants |

### Legacy Color Mappings

For backward compatibility, the following legacy color names map to the primary palette:

- `--color-rose` → `#8B7BB5` (Primary Violet)
- `--color-rose-light` → `#A99BD4` (Violet Light)
- `--color-violet` → `#8B7BB5` (Primary Violet)
- `--color-gold` → `#8B7BB5` (Primary Violet)
- `--color-gold-light` → `#A99BD4` (Violet Light)

---

## CSS Variables

All design tokens are defined as CSS custom properties in `src/index.css` for easy theming and maintenance.

### Background Variables

```css
--color-bg-primary: #0a0a0f;
--color-bg-secondary: #111118;
--color-bg-dark: #000000;
--color-bg-card: rgba(255, 255, 255, 0.03);
--color-bg-card-hover: rgba(255, 255, 255, 0.06);
```

### Accent Variables

```css
--color-accent: #8B7BB5;
--color-accent-light: #A99BD4;
--color-accent-dark: #6B5B95;
```

### Text Variables

```css
--color-text-primary: #EAEAEA;
--color-text-secondary: rgba(234, 234, 234, 0.75);
--color-text-muted: rgba(234, 234, 234, 0.5);
--color-text-light: #EAEAEA;
```

### RGB Values (for alpha transparency)

```css
--rgb-accent: 139, 123, 181;
--rgb-dark: 10, 10, 15;
```

**Usage Example:**
```css
background: rgba(var(--rgb-accent), 0.1);
```

### Gradient Variables

```css
--gradient-primary: linear-gradient(135deg, #8B7BB5 0%, #A99BD4 100%);
--gradient-cta: #8B7BB5;
--gradient-cta-hover: #A99BD4;
```

### Spacing Variables

```css
--space-xs: 0.5rem;    /* 8px */
--space-sm: 1rem;      /* 16px */
--space-md: 2rem;      /* 32px */
--space-lg: 4rem;      /* 64px */
--space-xl: 6rem;      /* 96px */
--space-2xl: 10rem;    /* 160px */
```

### Typography Variables

```css
--font-primary: 'Inter', sans-serif;
--font-display: 'Sora', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

--text-display-xl: clamp(3rem, 8vw, 7rem);
--text-display-l: clamp(2rem, 5vw, 4rem);
--text-display-m: clamp(1.5rem, 3vw, 2.5rem);
--text-body-l: 1.25rem;
--text-body: 1rem;
--text-small: 0.875rem;
--text-xs: 0.75rem;
```

### Border Radius Variables

```css
--border-radius-sm: 0;
--border-radius-md: 4px;
--border-radius-lg: 8px;
--border-radius-full: 50%;
```

### Transition Variables

```css
--transition-fast: 0.2s ease;
--transition-medium: 0.4s ease;
--transition-slow: 0.6s ease;
```

---

## Tailwind Configuration

The Tailwind configuration extends the default theme with custom colors and utilities.

### Custom Colors (tailwind.config.js)

```javascript
colors: {
  // Primary Accent Colors
  'primary': '#8B7BB5',
  'primary-foreground': '#0a0a0f',
  
  // Legacy Mappings
  'rose': '#8B7BB5',
  'violet': '#8B7BB5',
  'gold': '#8B7BB5',
  'gold-light': '#A99BD4',
  
  // Backgrounds
  'bg-primary': '#0a0a0f',
  'bg-secondary': '#111118',
  'bg-card': 'rgba(255, 255, 255, 0.03)',
  
  // GIC Specific Colors
  'gic-dark': '#0a0a0f',
  'gic-violet': '#A99BD4',
  'gic-lavender': '#C4B5E0',
  
  // Additional Colors
  'midnight': '#0a0a0f',
  'olive': '#788008',
  'crimson': '#6E0B36',
}
```

### Custom Fonts

```javascript
fontFamily: {
  'display': ['"Playfair Display"', 'serif'],
  'sans': ['"Outfit"', 'sans-serif'],
}
```

### Usage in Tailwind Classes

```jsx
// Background colors
<div className="bg-primary">...</div>
<div className="bg-gic-dark">...</div>
<div className="bg-gic-violet/20">...</div>

// Text colors
<p className="text-primary">...</p>
<p className="text-gic-lavender">...</p>

// Borders
<div className="border-gic-violet/30">...</div>
```

---

## Typography

### Font Families

1. **Primary Font (Body Text)**
   - Font: `Inter`
   - Usage: Body text, paragraphs, UI elements
   - CSS Variable: `--font-primary`

2. **Display Font (Headings)**
   - Font: `Sora`
   - Usage: Large headings, hero titles, display text
   - CSS Variable: `--font-display`

3. **Monospace Font (Code)**
   - Font: `JetBrains Mono` / `Fira Code`
   - Usage: Code blocks, technical content
   - CSS Variable: `--font-mono`

### Type Scale

| Size | Variable | Value | Usage |
|------|----------|-------|-------|
| Display XL | `--text-display-xl` | `clamp(3rem, 8vw, 7rem)` | Hero titles |
| Display L | `--text-display-l` | `clamp(2rem, 5vw, 4rem)` | Page headings |
| Display M | `--text-display-m` | `clamp(1.5rem, 3vw, 2.5rem)` | Section headings |
| Body L | `--text-body-l` | `1.25rem` | Large body text |
| Body | `--text-body` | `1rem` | Standard body text |
| Small | `--text-small` | `0.875rem` | Small text, captions |
| XS | `--text-xs` | `0.75rem` | Labels, fine print |

### Typography Usage

```css
/* Using CSS Variables */
.heading {
  font-family: var(--font-display);
  font-size: var(--text-display-l);
  color: var(--color-text-primary);
}

.body-text {
  font-family: var(--font-primary);
  font-size: var(--text-body);
  color: var(--color-text-secondary);
}
```

---

## Spacing System

The spacing system uses a consistent scale based on rem units.

| Variable | Value | Pixels | Usage |
|----------|-------|--------|-------|
| `--space-xs` | `0.5rem` | 8px | Tight spacing, icon padding |
| `--space-sm` | `1rem` | 16px | Small gaps, compact layouts |
| `--space-md` | `2rem` | 32px | Standard spacing, section padding |
| `--space-lg` | `4rem` | 64px | Large gaps, major sections |
| `--space-xl` | `6rem` | 96px | Extra large spacing |
| `--space-2xl` | `10rem` | 160px | Maximum spacing, hero sections |

### Usage

```css
.section {
  padding: var(--space-lg) var(--space-md);
  margin-bottom: var(--space-xl);
}

.card {
  padding: var(--space-md);
  gap: var(--space-sm);
}
```

---

## Gradients

### Primary Gradient

```css
background: linear-gradient(135deg, #8B7BB5 0%, #A99BD4 100%);
/* CSS Variable: --gradient-primary */
```

**Usage:** Buttons, hero sections, accent elements

### Text Gradient

```css
background: linear-gradient(90deg, #C4B5E0 0%, #A99BD4 30%, #8B7BB5 60%, #A99BD4 100%);
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
```

**Usage:** Headings, event names, highlight text

### Custom Gradient Examples

```css
/* Violet to Lavender */
background: linear-gradient(135deg, #8B7BB5 0%, #C4B5E0 100%);

/* Multi-stop Gradient */
background: linear-gradient(135deg, 
  #C4B5E0 0%, 
  #A99BD4 30%, 
  #8B7BB5 60%, 
  #A99BD4 100%
);

/* Radial Gradient (for glows) */
background: radial-gradient(circle, 
  rgba(139, 123, 181, 0.3) 0%, 
  transparent 70%
);
```

---

## Transitions & Animations

### Transition Speeds

```css
--transition-fast: 0.2s ease;      /* Quick interactions */
--transition-medium: 0.4s ease;    /* Standard transitions */
--transition-slow: 0.6s ease;      /* Smooth, deliberate animations */
```

### Custom Easing Curves

For smooth, professional animations, use cubic-bezier curves:

```css
/* Smooth ease-in-out */
ease: [0.4, 0, 0.2, 1];

/* Linear-like smooth */
ease: [0.25, 0.1, 0.25, 1];
```

### Animation Guidelines

- **Hover Effects:** Use `--transition-fast` or `--transition-medium`
- **Page Transitions:** Use `--transition-medium` or `--transition-slow`
- **Micro-interactions:** Use `--transition-fast`
- **Complex Animations:** Use custom cubic-bezier for smooth motion

---

## Component Styling

### Buttons

#### Primary Button

```jsx
<button className="bg-primary hover:bg-gic-violet text-white px-8 py-3 rounded-full transition-all duration-300">
  Register Now
</button>
```

#### Outline Button

```jsx
<button className="border-2 border-gic-violet/50 text-gic-lavender hover:bg-gic-violet/20 rounded-full px-8 py-3 transition-all">
  Learn More
</button>
```

### Cards

```jsx
<div className="bg-bg-secondary border border-white/8 rounded-lg p-6 hover:border-gic-violet/30 transition-all">
  {/* Card content */}
</div>
```

### Glass Morphism

```css
.glass-card {
  background: var(--color-bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(169, 155, 212, 0.15);
  border-radius: var(--border-radius-lg);
}
```

---

## Usage Guidelines

### Color Usage Rules

1. **Primary Accent (`#8B7BB5`)**
   - Use for: Primary buttons, links, active states, key highlights
   - Avoid: Large background areas, body text

2. **Violet Light (`#A99BD4`)**
   - Use for: Hover states, secondary accents, lighter highlights
   - Avoid: Primary actions (use primary violet instead)

3. **Lavender (`#C4B5E0`)**
   - Use for: Text highlights, subtle accents, decorative elements
   - Avoid: High-contrast elements requiring strong visibility

4. **Background Colors**
   - Always maintain sufficient contrast (WCAG AA minimum)
   - Use `--color-bg-secondary` for elevated surfaces
   - Use `--color-bg-card` for glass morphism effects

### Text Contrast

- **Primary Text (`#EAEAEA`)** on dark backgrounds: ✅ Excellent contrast
- **Secondary Text (75% opacity)** on dark backgrounds: ✅ Good contrast
- **Muted Text (50% opacity)** on dark backgrounds: ⚠️ Use sparingly

### Spacing Guidelines

- Use consistent spacing variables throughout
- Maintain visual rhythm with the spacing scale
- Group related elements with smaller spacing
- Separate major sections with larger spacing

### Animation Best Practices

- Keep animations subtle and purposeful
- Use smooth easing curves for professional feel
- Avoid excessive motion that distracts from content
- Test animations on lower-end devices

---

## Code Examples

### React Component with Theme Colors

```jsx
import React from 'react';

const EventCard = () => {
  return (
    <div 
      className="bg-bg-secondary border border-gic-violet/20 rounded-lg p-6 
                 hover:border-gic-violet/40 transition-all duration-300"
      style={{
        background: 'var(--color-bg-secondary)',
        borderColor: 'rgba(169, 155, 212, 0.2)',
      }}
    >
      <h3 
        className="text-gic-lavender font-display text-2xl mb-2"
        style={{ color: 'var(--color-accent-light)' }}
      >
        Event Title
      </h3>
      <p 
        className="text-text-secondary"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        Event description goes here...
      </p>
      <button 
        className="mt-4 bg-primary hover:bg-gic-violet text-white px-6 py-2 rounded-full"
        style={{
          background: 'var(--color-accent)',
          transition: 'var(--transition-medium)',
        }}
      >
        Learn More
      </button>
    </div>
  );
};
```

### CSS-Only Styling

```css
.hero-section {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  padding: var(--space-xl) var(--space-lg);
  font-family: var(--font-display);
}

.hero-title {
  font-size: var(--text-display-xl);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.accent-button {
  background: var(--color-accent);
  color: var(--color-text-primary);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius-full);
  transition: var(--transition-medium);
}

.accent-button:hover {
  background: var(--color-accent-light);
  transform: translateY(-2px);
}
```

### Tailwind Utility Classes

```jsx
// Background colors
<div className="bg-primary">Primary background</div>
<div className="bg-gic-dark">Dark background</div>
<div className="bg-gic-violet/20">Violet with opacity</div>

// Text colors
<h1 className="text-gic-lavender">Lavender text</h1>
<p className="text-primary">Primary text</p>
<span className="text-gic-violet/70">Muted violet</span>

// Borders
<div className="border border-gic-violet/30">Violet border</div>
<div className="border-2 border-primary">Primary border</div>

// Gradients
<div className="bg-gradient-to-r from-gic-lavender via-gic-violet to-primary">
  Gradient background
</div>
```

---

## Maintenance Notes

### Updating Colors

1. **CSS Variables:** Update values in `src/index.css` under `:root`
2. **Tailwind Config:** Update `tailwind.config.js` color definitions
3. **Test:** Verify all components reflect changes
4. **Document:** Update this guide with any changes

### Adding New Colors

1. Add to CSS variables in `src/index.css`
2. Add to Tailwind config if needed as utility class
3. Document in this guide
4. Provide usage examples

### Version History

- **v1.0.0** (2026): Initial design system documentation
  - Violet/purple theme established
  - CSS variables system implemented
  - Tailwind configuration documented

---

## Resources

- **Design Files:** [Link to design assets]
- **Figma:** [Link to Figma design system]
- **Color Contrast Checker:** [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **Typography Scale:** [Type Scale Calculator](https://type-scale.com/)

---

## Contact

For questions or updates to this design system, contact:
- **Design Team:** [Email]
- **Development Team:** [Email]

---

**Last Updated:** 2026  
**Document Version:** 1.0.0

