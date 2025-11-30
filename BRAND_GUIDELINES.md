# Kinship Landing Brand Guidelines & Developer SOPs

## Overview
This document establishes the brand standards and development procedures for Kinship Landing boutique hotel website. **All developers must follow these guidelines to maintain brand consistency.**

---

## 🎨 Brand Identity

### Primary Brand Colors
```css
/* KINSHIP BRAND COLORS - DO NOT DEVIATE */
--kinship-green: #849e74;        /* Primary CTA, links, accents */
--kinship-green-dark: #667C58;   /* CTA hover/active states */
--kinship-green-light: #697F5B;  /* Focus rings, subtle accents */
--kinship-slate: #4f575c;        /* Dark slate text/borders */
--kinship-latte: #efe7dd;        /* Warm off-white backgrounds */
--kinship-wasabi: #aec69a;       /* Light green accents */
--kinship-text: #080806;         /* Primary text color */
--kinship-white: #FFFFFF;        /* Cards/primary background */
--kinship-gray-bg: #F3F3F3;      /* Alternate sections */
--kinship-divider: #E5E7E4;      /* Borders/dividers */
--kinship-sage: #EEF0EB;         /* Footer/subtle panels */
--kinship-topo: #EBEBEB;         /* Topographic elements */
```

### Typography Hierarchy
```css
/* EXACT KINSHIP FONTS - DO NOT SUBSTITUTE */
font-heading: "utopia-std-display", "Source Serif Pro", Georgia, serif;
font-body: "europa", "Hind", system-ui, sans-serif;
font-nav: "Montserrat", "europa", system-ui, sans-serif;

/* Type Scale - Exact specifications */
--h1-size: 2.5rem;   /* 40px */
--h1-line: 2.75rem;  /* 44px */
--h2-size: 1.75rem;  /* 28px */
--h2-line: 2.125rem; /* 34px */
--h3-size: 1.375rem; /* 22px */
--h3-line: 1.75rem;  /* 28px */
--body-size: 1rem;   /* 16px */
--body-line: 1.625rem; /* 26px */
```

---

## 🏗️ Logo Usage Standards

### Header Logo Implementation
The header uses a dual-logo lockup with specific positioning requirements:

```tsx
// APPROVED HEADER LOGO IMPLEMENTATION
<Link href="/" className="flex items-center gap-0 sm:gap-0.5">
  {/* Kinship Logo */}
  <Image
    src="/brand/Kinship Header Logo.webp"
    alt="Kinship Landing"
    width={140}
    height={35}
    className="h-8 sm:h-9 lg:h-10 w-auto transition-all duration-300"
    style={{
      filter: isScrolled
        ? 'brightness(0) saturate(100%) invert(45%) sepia(30%) saturate(364%) hue-rotate(75deg) brightness(94%) contrast(89%)'
        : 'brightness(0) invert(1)'
    }}
  />

  {/* Brand Divider */}
  <div className="h-4 sm:h-5 lg:h-6 w-px -ml-9 mr-8 transition-colors duration-300 bg-white/40" />

  {/* Homa Logo */}
  <Image
    src="/brand/Homa Logo.webp"
    alt="Homa Café + Bar"
    width={28}
    height={14}
    className="h-2.5 sm:h-3.5 lg:h-4.5 w-auto -ml-2 sm:-ml-3 transition-all duration-300"
    style={{
      filter: isScrolled
        ? 'brightness(0) saturate(100%) invert(45%) sepia(30%) saturate(364%) hue-rotate(75deg) brightness(94%) contrast(89%)'
        : 'brightness(0) invert(1)'
    }}
  />
</Link>
```

### Logo Color Transitions
- **Not Scrolled**: White logos (`brightness(0) invert(1)`)
- **Scrolled**: Kinship green (`brightness(0) saturate(100%) invert(45%) sepia(30%) saturate(364%) hue-rotate(75deg) brightness(94%) contrast(89%)`)

### Logo Sizing Rules
- **Kinship Logo**: Primary brand, larger size (h-8/9/10)
- **Homa Logo**: Secondary brand, smaller size (h-2.5/3.5/4.5)
- **Divider**: Matches Homa height, positioned with negative margins

---

## 📁 Asset Organization

### Required Brand Assets
```
/public/brand/
├── Kinship Header Logo.webp     (Primary header logo)
├── Homa Logo.webp              (Café/bar logo)
├── kinship-logo-dark.webp      (Dark version)
├── kinship-logo-light.webp     (Light version)
└── favicon/                    (Favicon variants)
```

### Image Optimization Standards
- **Format**: WebP preferred, PNG/JPG fallbacks
- **Compression**: 80% quality for hero images, 90% for logos
- **Responsive**: Multiple sizes for different breakpoints
- **Alt Text**: Always descriptive and brand-appropriate

---

## 🎯 Component Standards

### Button Styling
```css
/* PRIMARY CTA BUTTON */
.btn-primary {
  background: #849e74;
  border: 2px solid #849e74;
  color: white;
  padding: 12px 24px;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 300ms;
}

.btn-primary:hover {
  background: #647B56;
  border-color: #647B56;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(132, 158, 116, 0.3);
}
```

### Section Spacing
```css
/* STANDARD SECTION SPACING */
.section-spacing {
  padding: 40px 0;    /* Mobile */
  padding: 56px 0;    /* Tablet (md:) */
  padding: 80px 0;    /* Desktop (lg:) */
}
```

### Container System
```css
.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 16px;    /* Mobile */
  padding: 0 24px;    /* sm: */
  padding: 0 32px;    /* lg: */
}
```

---

## 🚫 Brand Violations - DO NOT DO

### ❌ Typography Violations
- Never use system fonts instead of brand fonts
- Never modify letter-spacing beyond specified values
- Never use Comic Sans, Arial, or generic fonts

### ❌ Color Violations
- Never use colors outside the approved palette
- Never modify the green (#849e74) without approval
- Never use pure black (#000000) - use kinship-text instead

### ❌ Logo Violations
- Never stretch or distort logos
- Never use outdated logo versions
- Never separate the dual-logo lockup in header
- Never use logos smaller than minimum size requirements

### ❌ Layout Violations
- Never break the responsive grid system
- Never use fixed pixel widths for responsive elements
- Never ignore mobile-first design principles

---

## ✅ Development SOPs

### 1. Before Starting Development
- [ ] Review this brand guide completely
- [ ] Verify all brand assets are available in `/public/brand/`
- [ ] Check that fonts are properly loaded
- [ ] Confirm color variables are imported

### 2. Component Development Process
- [ ] Use existing components from `/components/ui/` first
- [ ] Follow mobile-first responsive design
- [ ] Implement proper accessibility (WCAG 2.1 AA)
- [ ] Test color contrast ratios
- [ ] Verify focus states work with brand colors

### 3. Code Quality Standards
- [ ] Use TypeScript for all new components
- [ ] Follow existing naming conventions
- [ ] Add proper JSDoc comments
- [ ] Include accessibility attributes
- [ ] Test on mobile, tablet, and desktop

### 4. Brand Consistency Checklist
- [ ] Colors match exact hex values
- [ ] Typography uses correct font families
- [ ] Spacing follows the standard scale
- [ ] Animations use consistent timing (300ms default)
- [ ] Focus states use kinship-green-light
- [ ] Error states maintain brand voice

### 5. Testing Requirements
- [ ] Visual regression testing
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness (320px - 1920px)
- [ ] Accessibility testing with screen readers
- [ ] Performance testing (Core Web Vitals)

---

## 📞 Brand Approval Process

### Minor Changes (No approval needed)
- Color adjustments within approved palette
- Typography weight/size within scale
- Spacing adjustments using standard scale
- Component state variations

### Major Changes (Requires approval)
- New color introductions
- Font family changes
- Logo modifications
- Layout structure changes
- New component patterns

### Brand Guardian Contacts
- **Primary**: Brand Manager
- **Secondary**: Creative Director
- **Development**: Lead Frontend Developer

---

## 🔧 Technical Implementation

### CSS Custom Properties Setup
```css
:root {
  /* Import exact brand colors */
  --kinship-green: #849e74;
  --kinship-green-dark: #667C58;
  --kinship-green-light: #697F5B;
  /* ... rest of palette */
}
```

### Tailwind Configuration
```js
// tailwind.config.ts - Brand color mapping
colors: {
  kinship: {
    green: '#849e74',
    greenDark: '#667C58',
    greenLight: '#697F5B',
    // ... rest of palette
  }
}
```

### Font Loading Optimization
```html
<!-- Required font preloads -->
<link rel="preconnect" href="https://use.typekit.net">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://use.typekit.net/srr5ava.css">
```

---

## 📊 Performance Standards

### Core Web Vitals Targets
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

### Image Optimization
- WebP format with fallbacks
- Responsive images with `sizes` attribute
- Lazy loading for below-fold content
- Proper `alt` attributes for accessibility

### Bundle Size Limits
- Main JS bundle: < 150KB gzipped
- CSS bundle: < 50KB gzipped
- Font loading: < 100KB total

---

## 🎯 Personality, Voice & Tone Guidelines

### Understanding the Difference
- **Personality**: Core traits that define who Kinship is
- **Voice**: How Kinship consistently communicates (never changes)
- **Tone**: How the voice adapts to different contexts and emotions

---

## 🎭 The Kinship Personality

### Core Traits
**Kinship is:**
- **Friendly** - Welcoming, approachable, genuinely caring
- **Fun** - Playful, engaging, memorable experiences
- **Confident** - Knowledgeable, assured, inspiring trust

### Personality in Action
Our priority is making guests feel **loved, understood, and well cared for** by anticipating and meeting their needs in every interaction. We guide people to the best experiences that will inspire them, inviting exploration without being pushy.

---

## 🗣️ The Kinship Voice

### Voice Characteristics
**Kinship speaks in a voice that is distinctly human:**
- Warm & authentic
- Adventure-ready
- Community-focused
- Locally connected
- Hospitality-driven

### Voice Examples
- "Experience Colorado Springs like a local"
- "Sleep well. Meet locals. Launch adventures."
- "Outrageous hospitality, crafted by locals"

### Voice Standards
- Use active voice
- Keep sentences concise and clear
- Avoid jargon and corporate speak
- Emphasize local connections and experiences
- Speak as a knowledgeable local friend

---

## 🎵 The Kinship Tone

### Guiding Principle
**"How would we want to be communicated with in this situation?"**

Lead with empathy and adapt tone to match the emotional context of each interaction.

### Tone Spectrum

#### 🎉 Fun & Lighthearted
**When to use:** Greetings, social media, celebrating experiences, inviting exploration

**Characteristics:**
- Playful and engaging
- Enthusiasm for adventures
- Celebratory of local experiences
- Inviting and encouraging

**Examples:**
- "Ready to explore like a local? We've got the inside scoop!"
- "Your Colorado Springs adventure starts here 🏔️"
- "Coffee, cocktails, and community vibes await!"

#### 💼 Professional & Straightforward
**When to use:** Booking confirmations, policy information, business communications

**Characteristics:**
- Clear and informative
- Confident and assured
- Helpful and anticipatory
- Professional yet warm

**Examples:**
- "Your reservation is confirmed. Here's everything you need to know..."
- "We've taken care of the details so you can focus on exploring."
- "Our team is here to ensure your stay exceeds expectations."

#### 🤝 Empathetic & Supportive
**When to use:** Handling issues, addressing concerns, difficult situations

**Characteristics:**
- Understanding and caring
- Solution-focused
- Reassuring and supportive
- Personally invested

**Examples:**
- "We understand this isn't the experience you expected. Let's make it right."
- "Your comfort is our priority. Here's how we'll resolve this..."
- "We're here to help and want to ensure you love your stay with us."

### Tone Adaptation Guidelines

#### Context-Based Tone Selection
1. **Guest Onboarding**: Professional + Fun
2. **Problem Resolution**: Empathetic + Professional
3. **Experience Recommendations**: Fun + Confident
4. **Social Media**: Fun + Lighthearted
5. **Email Marketing**: Friendly + Professional
6. **Website Copy**: Confident + Inviting

#### Emotional Context Considerations
- **Excited guests**: Match their energy with enthusiasm
- **Concerned guests**: Lead with empathy and reassurance
- **First-time visitors**: Be welcoming and informative
- **Returning guests**: Show appreciation and personal connection

---

## ✍️ Writing Standards by Content Type

### Website Copy
- **Tone**: Confident + Inviting
- **Voice**: Adventure-ready and locally connected
- **Style**: Clear headlines, benefit-focused, action-oriented

### Guest Communications
- **Tone**: Professional + Warm
- **Voice**: Caring and anticipatory
- **Style**: Personal, helpful, detail-oriented

### Social Media
- **Tone**: Fun + Lighthearted
- **Voice**: Community-focused and engaging
- **Style**: Conversational, visual, shareable

### Marketing Materials
- **Tone**: Confident + Fun
- **Voice**: Experience-focused and inspiring
- **Style**: Compelling, locally authentic, adventure-driven

### Customer Service
- **Tone**: Empathetic + Professional (adapt based on situation)
- **Voice**: Solution-focused and caring
- **Style**: Clear, helpful, personally invested

---

## 🚫 Voice & Tone Violations

### ❌ Don't Sound Like This
- Cold or corporate: "The establishment provides accommodations..."
- Pushy or salesy: "You MUST try our exclusive..."
- Generic hotel speak: "We hope you enjoy your stay"
- Overly formal: "We would be honored to assist you in..."
- Fake enthusiasm: "AMAZING deal just for you!!!"

### ✅ Do Sound Like This
- Warm and human: "We're excited to welcome you home"
- Helpful and knowledgeable: "Here's a local secret worth exploring..."
- Genuinely caring: "Your comfort matters to us"
- Confidently local: "As locals, we know the best spots..."
- Authentically friendly: "Can't wait to share our favorite places with you"

---

## 🎯 Voice & Tone in Practice

### Brand Phrases We Use
- "Experience like a local"
- "Sleep well. Meet locals. Launch adventures."
- "Your Colorado Springs basecamp"
- "Outrageous hospitality"
- "Crafted by locals"
- "Adventure starts here"
- "Local connections"
- "Insider guide"

### Brand Phrases We Avoid
- "Luxury accommodations"
- "World-class service"
- "Premier destination"
- "Unparalleled experience"
- "Five-star amenities"
- "Exceeds expectations" (unless genuine)

### Signature Sign-offs
- "Adventure awaits, [Name]"
- "See you soon in Colorado Springs!"
- "Here to help, [Name]"
- "Your local guide, [Team/Name]"
- "Making memories, [Name]"

---

## 📝 Changelog & Updates

### Version 1.0 (Current)
- Initial brand guidelines established
- Header logo lockup standardized
- Color palette finalized
- Typography scale defined
- Component standards documented

---

**Remember: When in doubt, maintain brand consistency over personal preference. This ensures Kinship Landing presents a cohesive, professional image that builds trust with guests and reflects our commitment to quality.**