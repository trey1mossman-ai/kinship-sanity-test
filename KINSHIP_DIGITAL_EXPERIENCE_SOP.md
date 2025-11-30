# Kinship Digital Experience SOP
**AI Development Team Implementation Bible**
Version 1.0 | September 2025

## Executive Summary

This SOP establishes the definitive framework for implementing custom styling and interactive effects that amplify Kinship's brand identity while leveraging our modern tech stack. Every interaction should feel human, confident, and welcoming - never forced or gimmicky. Our technical excellence serves one purpose: making guests feel loved and understood through thoughtful digital experiences.

**Core Principle:** Technology should feel invisible. Effects enhance connection, not distract from it.

## Section 1: Brand-to-Code Translation Matrix

### 1.1 Voice Attributes → Technical Implementation

| Brand Voice | Technical Expression | Implementation Pattern |
|-------------|---------------------|----------------------|
| Fun | Smooth, playful micro-interactions | spring animations, subtle bounces on interaction |
| Confident | Bold transitions, clear visual hierarchy | Strong color contrasts, decisive state changes |
| Curious | Exploratory hover states, reveal animations | Progressive disclosure, "discover more" patterns |
| Mission-Driven | Purpose-first loading sequences | Content-first paint, meaningful skeleton screens |
| Friendly | Warm color transitions, approachable spacing | Generous padding, rounded corners, soft shadows |
| Inspirational | Upward motion, expanding interactions | Scale transforms, parallax that guides eyes up |
| Professional | Consistent timing, polished edges | Uniform easing curves, pixel-perfect alignment |

### 1.2 Anti-Patterns (What to Avoid)

```css
/* ❌ NEVER: Silly, quirky animations */
.banned-bounce {
  animation: wildBounce 2s infinite; /* Too playful */
}

/* ❌ NEVER: Forceful, elite interactions */
.aggressive-popup {
  animation: slam 0.1s ease-in; /* Too harsh */
}

/* ✅ INSTEAD: Confident but welcoming */
.kinship-reveal {
  animation: gentleRise 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

## Section 2: Master AI Prompting Template for Kinship

### 2.1 The Kinship Component Prompt Structure

```markdown
Context: React.js, TypeScript, Tailwind CSS v4.0, Kinship Landing website

Create a [COMPONENT_TYPE] component that [FUNCTIONALITY] for Kinship Landing, a boutique hotel that connects locals and travelers.

Brand Requirements:
- Voice: Friendly and confident without being silly or forceful
- Feel: Human, warm, and mission-driven
- Interaction style: Inviting exploration without being pushy
- Visual tone: Professional yet approachable, never stodgy

Technical Requirements:
- TypeScript with strict typing
- Functional React components with hooks
- Tailwind CSS v4.0 with custom theme variables
- Mobile-first responsive design
- Performance: LCP < 2.5s, INP < 200ms
- Accessibility: WCAG 2.1 AA compliant

Design Specifications:
- Colors: Use warm, authentic tones (reference Mocha Mousse #A47864)
- Typography: Europa for body, Utopia Std Display for headlines
- Spacing: Generous but purposeful (min touch target 44x44px)
- Effects: Subtle glassmorphism, NO excessive blur
- Animations: Spring-based easing (cubic-bezier(0.34, 1.56, 0.64, 1))

Interaction Patterns:
- Hover: Gentle scale (1.02-1.05 max), soft shadow elevation
- Active: Subtle depress (scale 0.98)
- Transitions: 300-400ms for most interactions
- Scroll: Parallax speed ratio 0.5-0.8 (subtle, not dramatic)

Before implementing, describe how this component makes guests feel welcomed.
```

### 2.2 Iterative Refinement Commands

```markdown
Stage 1: "Make this feel more human and welcoming"
Stage 2: "Add subtle depth that guides without overwhelming"
Stage 3: "Ensure mobile users feel the same warmth as desktop"
Stage 4: "Add keyboard navigation that feels natural"
Stage 5: "Optimize for guests with slower connections"
```

## Section 3: Kinship Design System Implementation

### 3.1 Color System Configuration

```css
@theme {
  /* Primary Palette - Warm & Authentic */
  --color-kinship-primary: oklch(0.84 0.18 117.33); /* Warm green */
  --color-kinship-mocha: #A47864; /* Mocha Mousse - authenticity */
  --color-kinship-lavender: #A78BFA; /* Digital Lavender - calm */
  --color-kinship-forest: #4CAF50; /* Verdant Green - nature */

  /* Functional Colors */
  --color-warm-white: rgba(255, 253, 250, 1);
  --color-soft-black: rgba(28, 25, 23, 1);

  /* Glassmorphism Base */
  --glass-blur: 8px; /* Subtle, not overwhelming */
  --glass-opacity: 0.85;
  --glass-border: rgba(255, 255, 255, 0.18);
}
```

### 3.2 Typography Scale

```css
@theme {
  --font-display: "Utopia Std Display", serif;
  --font-body: "Europa", sans-serif;
  --font-mono: "Zeitung", monospace;

  /* Friendly, readable scale */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
  --text-3xl: clamp(2rem, 1.7rem + 1.5vw, 2.5rem);
}
```

### 3.3 Animation Curves

```css
@theme {
  /* Kinship's signature easing curves */
  --ease-welcome: cubic-bezier(0.34, 1.56, 0.64, 1); /* Friendly bounce */
  --ease-confident: cubic-bezier(0.4, 0, 0.2, 1); /* Smooth, decisive */
  --ease-explore: cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Inviting */

  /* Standard durations */
  --duration-instant: 150ms;
  --duration-fast: 300ms;
  --duration-normal: 400ms;
  --duration-slow: 600ms;
}
```

## Section 4: Component Pattern Library

### 4.1 Hero Section with Welcoming Parallax

```tsx
const KinshipHero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.6]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Subtle parallax background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        <picture>
          <source srcSet="/hero-kinship.avif" type="image/avif" />
          <source srcSet="/hero-kinship.webp" type="image/webp" />
          <img
            src="/hero-kinship.jpg"
            alt="Kinship Landing welcomes you"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
      </motion.div>

      {/* Content with gentle entrance */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1] // Welcome bounce
        }}
        className="relative z-10 flex flex-col justify-center min-h-screen px-6 md:px-12"
      >
        <h1 className="font-display text-3xl text-kinship-mocha mb-4">
          Welcome to Kinship Landing
        </h1>
        <p className="font-body text-lg text-soft-black/80 max-w-2xl">
          Where locals and travelers connect around exploration
        </p>
      </motion.div>
    </section>
  );
};
```

### 4.2 Interactive Cards with Human Touch

```tsx
const ExploreCard: React.FC<CardProps> = ({ title, description, image }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      className="relative overflow-hidden rounded-2xl bg-warm-white/90
                 backdrop-blur-[8px] border border-white/18
                 shadow-md hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }} // Subtle, not dramatic
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Image with Ken Burns effect on hover */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Friendly gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t
                        from-kinship-mocha/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl text-soft-black mb-2">
          {title}
        </h3>
        <p className="font-body text-base text-soft-black/70 mb-4">
          {description}
        </p>

        {/* Inviting CTA */}
        <motion.button
          className="text-kinship-primary font-body font-medium
                     inline-flex items-center gap-2 group"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          Explore more
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </motion.button>
      </div>
    </motion.article>
  );
};
```

### 4.3 Navigation with Confidence

```tsx
const KinshipNav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-400
                  ${scrolled
                    ? 'bg-warm-white/95 backdrop-blur-md shadow-sm'
                    : 'bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo with subtle hover */}
        <motion.a
          href="/"
          className="font-display text-2xl text-kinship-mocha"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Kinship
        </motion.a>

        {/* Navigation items */}
        <ul className="hidden md:flex items-center gap-8">
          {['Explore', 'Stay', 'Gather', 'Connect'].map((item) => (
            <motion.li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="font-body text-base text-soft-black/80
                         hover:text-kinship-primary transition-colors
                         duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5
                               bg-kinship-primary transition-all duration-300
                               group-hover:w-full" />
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};
```

## Section 5: Scroll & Hover Effects Guidelines

### 5.1 Scroll-Driven Animations

```css
/* Kinship-appropriate scroll reveals */
@keyframes gentleReveal {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scroll-reveal {
  animation: gentleReveal linear;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}

/* Progress indicator - subtle, not aggressive */
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg,
    var(--color-kinship-primary),
    var(--color-kinship-lavender)
  );
  transform-origin: left;
  animation: progressBar linear;
  animation-timeline: scroll(root);
}
```

### 5.2 Hover States Decision Tree

```typescript
interface HoverPattern {
  trigger: string;
  effect: string;
  duration: number;
  appropriateFor: string[];
}

const kinshipHoverPatterns: HoverPattern[] = [
  {
    trigger: "Card hover",
    effect: "scale(1.02) + soft shadow",
    duration: 300,
    appropriateFor: ["room cards", "experience cards", "blog posts"]
  },
  {
    trigger: "Button hover",
    effect: "translateY(-2px) + shadow-md",
    duration: 200,
    appropriateFor: ["CTAs", "form submits", "booking buttons"]
  },
  {
    trigger: "Image hover",
    effect: "scale(1.05) with overflow hidden",
    duration: 600,
    appropriateFor: ["gallery images", "hero images", "room photos"]
  },
  {
    trigger: "Text link hover",
    effect: "underline expand from left",
    duration: 300,
    appropriateFor: ["navigation", "inline links", "footer links"]
  }
];
```

## Section 6: Performance & Accessibility Standards

### 6.1 Image Optimization Protocol

```tsx
const KinshipImage: React.FC<ImageProps> = ({
  src,
  alt,
  priority = false,
  className = ""
}) => {
  // ALWAYS use next-gen formats
  const sources = [
    { srcSet: `${src}.avif`, type: "image/avif" },
    { srcSet: `${src}.webp`, type: "image/webp" }
  ];

  return (
    <picture>
      {sources.map((source) => (
        <source key={source.type} {...source} />
      ))}
      <img
        src={`${src}.jpg`}
        alt={alt} // MUST be meaningful
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={`${className} transition-opacity duration-300`}
        onLoad={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
        style={{ opacity: 0 }}
      />
    </picture>
  );
};
```

### 6.2 Accessibility Checklist

```typescript
const accessibilityRequirements = {
  colorContrast: {
    normal: "4.5:1",
    large: "3:1",
    check: "Use Chrome DevTools or Stark plugin"
  },
  focusIndicators: {
    style: "2px solid var(--color-kinship-primary)",
    offset: "2px",
    visibility: "Always visible on keyboard navigation"
  },
  animation: {
    respectPreference: "@media (prefers-reduced-motion: reduce)",
    fallback: "Static state with no animation",
    essential: "Only animate if it adds meaning"
  },
  touchTargets: {
    minimum: "44x44px",
    preferred: "48x48px",
    spacing: "8px minimum between targets"
  }
};
```

## Section 7: Component Testing Criteria

### 7.1 Brand Alignment Checklist

Before any component ships, verify:

```markdown
✅ **Feeling Test**
- [ ] Does it feel welcoming, not intimidating?
- [ ] Is it confident without being cocky?
- [ ] Does it invite exploration naturally?
- [ ] Would both locals and travelers feel comfortable?

✅ **Visual Test**
- [ ] Uses warm, authentic colors from palette?
- [ ] Typography follows Europa/Utopia hierarchy?
- [ ] Spacing feels generous but intentional?
- [ ] Effects subtle enough for professional context?

✅ **Interaction Test**
- [ ] Animations use spring-based easing?
- [ ] Hover states provide clear feedback?
- [ ] Transitions last 300-400ms?
- [ ] Mobile interactions feel natural?

✅ **Performance Test**
- [ ] LCP < 2.5 seconds?
- [ ] INP < 200ms?
- [ ] Images use next-gen formats?
- [ ] Animations use CSS transforms?

✅ **Accessibility Test**
- [ ] Keyboard navigable?
- [ ] Screen reader friendly?
- [ ] Color contrast passes WCAG AA?
- [ ] Respects prefers-reduced-motion?
```

## Section 8: Common Implementation Patterns

### 8.1 The "Kinship Welcome" Pattern

```tsx
// Use for any first-time content reveal
const WelcomeReveal: React.FC<{children: ReactNode}> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1] // Signature welcome bounce
      }}
    >
      {children}
    </motion.div>
  );
};
```

### 8.2 The "Explore More" Pattern

```tsx
// Use for progressive disclosure
const ExploreMore: React.FC<{preview: ReactNode, full: ReactNode}> = ({
  preview,
  full
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <div>{preview}</div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {full}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-kinship-primary font-body font-medium
                   hover:text-kinship-primary/80 transition-colors"
      >
        {expanded ? "Show less" : "Explore more →"}
      </button>
    </div>
  );
};
```

### 8.3 The "Local Connection" Pattern

```tsx
// Use for content that bridges locals and travelers
const LocalConnection: React.FC<{local: string, traveler: string}> = ({
  local,
  traveler
}) => {
  const [perspective, setPerspective] = useState<"local" | "traveler">("local");

  return (
    <div className="bg-warm-white/90 backdrop-blur-sm rounded-2xl p-6">
      {/* Toggle with smooth transition */}
      <div className="flex gap-2 mb-6">
        {["local", "traveler"].map((view) => (
          <button
            key={view}
            onClick={() => setPerspective(view as any)}
            className={`px-4 py-2 rounded-lg font-body transition-all ${
              perspective === view
                ? "bg-kinship-primary text-white"
                : "bg-transparent text-soft-black/60"
            }`}
          >
            {view === "local" ? "Local's View" : "Traveler's View"}
          </button>
        ))}
      </div>

      {/* Content with fade transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={perspective}
          initial={{ opacity: 0, x: perspective === "local" ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: perspective === "local" ? 20 : -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <p className="font-body text-base text-soft-black">
            {perspective === "local" ? local : traveler}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
```

## Section 9: Responsive Design Strategies

### 9.1 Mobile-First Implementation

```tsx
const ResponsiveGrid: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                      gap-4 sm:gap-6 lg:gap-8">
        {/* Mobile: Stack vertically with generous spacing */}
        {/* Tablet: 2 columns with balanced proportions */}
        {/* Desktop: 3-4 columns for exploration */}
      </div>
    </div>
  );
};
```

### 9.2 Container Query Implementation

```css
/* Modern responsive based on container, not viewport */
@container (min-width: 400px) {
  .kinship-card {
    grid-template-columns: 120px 1fr;
  }
}

@container (min-width: 700px) {
  .kinship-card {
    grid-template-columns: 200px 1fr;
    gap: 2rem;
  }
}
```

## Section 10: Error States & Loading Patterns

### 10.1 Friendly Error Messages

```tsx
const KinshipError: React.FC<{retry?: () => void}> = ({ retry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12 px-6"
    >
      <h3 className="font-display text-xl text-kinship-mocha mb-2">
        Oops, let's try that again
      </h3>
      <p className="font-body text-soft-black/70 mb-6">
        Something unexpected happened, but we're here to help.
      </p>
      {retry && (
        <button
          onClick={retry}
          className="px-6 py-3 bg-kinship-primary text-white
                     rounded-lg hover:bg-kinship-primary/90
                     transition-colors duration-300"
        >
          Try again
        </button>
      )}
    </motion.div>
  );
};
```

### 10.2 Skeleton Screens

```tsx
const ContentSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-kinship-mocha/10 rounded-lg mb-4" />
      <div className="h-4 bg-kinship-mocha/10 rounded w-3/4 mb-2" />
      <div className="h-4 bg-kinship-mocha/10 rounded w-1/2" />
    </div>
  );
};
```

## Section 11: Implementation Workflow

### 11.1 Development Process

1. **Understand Intent**
   - What feeling should this create?
   - How does it serve our mission of connection?
   - Would a local AND a traveler both appreciate this?

2. **Start Simple**
   - Build functional component first
   - Add Kinship styling layer
   - Introduce animations last

3. **Test Against Brand**
   - Run through Section 7.1 checklist
   - Get feedback from design team
   - Test with real users (locals AND travelers)

4. **Optimize & Polish**
   - Performance audit with Lighthouse
   - Accessibility audit with axe DevTools
   - Cross-device testing

5. **Document & Share**
   - Add to component library
   - Document any new patterns
   - Share learnings with team

### 11.2 Code Review Criteria

```markdown
## Kinship Code Review Checklist

### Brand Alignment
- [ ] Feels human and welcoming?
- [ ] Matches our voice (friendly, confident, not silly)?
- [ ] Invites without pushing?

### Technical Excellence
- [ ] TypeScript properly typed?
- [ ] Tailwind classes organized?
- [ ] React patterns modern and clean?
- [ ] Performance metrics met?

### Accessibility
- [ ] Keyboard navigable?
- [ ] Screen reader tested?
- [ ] Color contrast verified?
- [ ] Touch targets adequate?

### Maintainability
- [ ] Code self-documenting?
- [ ] Patterns reusable?
- [ ] Dependencies minimal?
```

## Section 12: Troubleshooting Guide

### 12.1 Common Issues & Solutions

| Problem | Solution | Example |
|---------|----------|---------|
| Animation feels too playful | Reduce spring bounce, use confident easing | Change [0.34, 1.56, 0.64, 1] to [0.4, 0, 0.2, 1] |
| Glassmorphism too heavy | Reduce blur, increase opacity | blur(8px) + 0.85 opacity instead of blur(20px) |
| Mobile performance lag | Disable parallax on mobile, use CSS only | @media (max-width: 768px) { parallax: none } |
| Accessibility contrast fails | Use Mocha Mousse for text, not lavender | Text: #A47864 on white, not #A78BFA |

## Section 13: Version Control & Updates

### 13.1 Component Versioning

```typescript
// Every component includes version metadata
export const CardComponent = {
  version: "1.2.0",
  lastUpdated: "2025-09-24",
  brandCompliance: "verified",
  a11yCompliance: "WCAG 2.1 AA",
  component: KinshipCard
};
```

### 13.2 Design Token Updates

When brand guidelines evolve:
1. Update theme variables in central config
2. Run visual regression tests
3. Document changes in changelog
4. Communicate to all developers
5. Update this SOP accordingly

## Appendix A: Quick Reference

### Essential Brand Rules
- **Never:** Silly, forceful, abstract, stodgy
- **Always:** Human, confident, welcoming, professional
- **Effects:** Subtle > dramatic
- **Timing:** 300-400ms standard
- **Easing:** Spring-based for personality
- **Colors:** Warm, authentic, earthy

### Go-To Tailwind Classes
```css
/* Kinship Glassmorphism */
.kinship-glass: backdrop-blur-[8px] bg-warm-white/90 border border-white/18

/* Kinship Shadow */
.kinship-shadow: shadow-md hover:shadow-xl transition-shadow duration-300

/* Kinship Spacing */
.kinship-container: px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto

/* Kinship Text */
.kinship-heading: font-display text-kinship-mocha
.kinship-body: font-body text-soft-black/80
```

### Performance Targets
- **LCP:** < 2.5s (ideally < 1.8s)
- **INP:** < 200ms (ideally < 100ms)
- **CLS:** < 0.1 (ideally 0)
- **Bundle Size:** < 150KB gzipped for initial load

## Appendix B: AI Prompt Library

### Hero Section
```
Create a hero section for Kinship Landing that welcomes both locals and travelers.
Use subtle parallax, warm colors, and Europa/Utopia typography. The feeling should
be "you belong here" without being overly sentimental. Include a gentle Ken Burns
effect on the background image.
```

### Room Card
```
Design a room card component that makes guests excited to stay at Kinship.
Show the room image with a soft zoom on hover, include the room name in
Utopia Display font, and add a "See details" link that invites exploration
without being pushy. Use glassmorphism sparingly.
```

### Navigation
```
Build a navigation header that feels confident but approachable. It should
transition from transparent to white/blur on scroll, use the Kinship color
palette, and include subtle underline animations on hover. Make sure it's
fully accessible and works perfectly on mobile.
```

---

## Final Notes

This SOP is a living document. As we discover new patterns that embody Kinship's spirit while leveraging modern technology, we'll update these guidelines. Remember: every line of code should make someone feel more connected - to the place, to each other, and to the experience of exploration.

**When in doubt, ask:** "Does this feel human?" If yes, you're on the right track.

---

**Document maintained by:** AI Development Team
**Last updated:** September 2025
**Version:** 1.0.0