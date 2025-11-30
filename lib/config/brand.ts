/**
 * Kinship Landing Brand Configuration
 *
 * This file contains all approved brand constants for the Kinship Landing website.
 * DO NOT modify these values without brand approval.
 *
 * @see /BRAND_GUIDELINES.md for complete usage documentation
 */

// ================================
// BRAND COLORS - KINSHIP DIGITAL EXPERIENCE SOP
// ================================

export const KINSHIP_COLORS = {
  // Primary Brand Colors (from SOP)
  primary: '#849e74',         // Warm green (Primary CTA, links)
  mocha: '#A47864',           // Mocha Mousse - authenticity
  lavender: '#A78BFA',        // Digital Lavender - calm
  forest: '#4CAF50',          // Verdant Green - nature

  // Legacy compatibility mapping
  green: '#849e74',           // Primary CTA, links, stars
  greenDark: '#667C58',       // CTA hover/active states
  greenLight: '#697F5B',      // Focus rings, subtle accents
  slate: '#4f575c',           // Dark slate text/borders
  latte: '#efe7dd',           // Warm off-white backgrounds
  wasabi: '#aec69a',          // Light green accents
  text: '#080806',            // Primary text color
  white: '#FFFFFF',           // Cards/primary background
  grayBg: '#F3F3F3',          // Alternate sections
  divider: '#E5E7E4',         // Borders/dividers
  sage: '#EEF0EB',            // Footer/subtle panels
  topo: '#EBEBEB',            // Topographic elements

  // Functional Colors (from SOP)
  warmWhite: 'rgba(255, 253, 250, 1)',
  softBlack: 'rgba(28, 25, 23, 1)',

  // HOMA Brand Color
  homaBackground: '#D4A574', // Warm Sand/Grain
} as const;

// CSS Custom Properties for dynamic usage
export const KINSHIP_CSS_VARS = {
  '--kinship-green': KINSHIP_COLORS.green,
  '--kinship-green-dark': KINSHIP_COLORS.greenDark,
  '--kinship-green-light': KINSHIP_COLORS.greenLight,
  '--kinship-slate': KINSHIP_COLORS.slate,
  '--kinship-latte': KINSHIP_COLORS.latte,
  '--kinship-wasabi': KINSHIP_COLORS.wasabi,
  '--kinship-text': KINSHIP_COLORS.text,
  '--kinship-white': KINSHIP_COLORS.white,
  '--kinship-gray-bg': KINSHIP_COLORS.grayBg,
  '--kinship-divider': KINSHIP_COLORS.divider,
  '--kinship-sage': KINSHIP_COLORS.sage,
  '--kinship-topo': KINSHIP_COLORS.topo,
} as const;

// ================================
// TYPOGRAPHY SYSTEM
// ================================

export const KINSHIP_FONTS = {
  heading: '"utopia-std-display", "Source Serif Pro", Georgia, serif',
  body: '"europa", "Hind", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  nav: '"Montserrat", "europa", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
} as const;

export const KINSHIP_TYPE_SCALE = {
  h1: { size: '2.5rem', lineHeight: '2.75rem' },      // 40px/44px
  h2: { size: '1.75rem', lineHeight: '2.125rem' },    // 28px/34px
  h3: { size: '1.375rem', lineHeight: '1.75rem' },    // 22px/28px
  body: { size: '1rem', lineHeight: '1.625rem' },     // 16px/26px
  small: { size: '0.875rem', lineHeight: '1.375rem' }, // 14px/22px
} as const;

// ================================
// SPACING SYSTEM
// ================================

export const KINSHIP_SPACING = {
  section: {
    mobile: '40px',      // py-10
    tablet: '56px',      // md:py-14
    desktop: '80px',     // lg:py-20
  },
  sectionTight: {
    mobile: '32px',      // py-8
    tablet: '48px',      // md:py-12
    desktop: '64px',     // lg:py-16
  },
  container: {
    maxWidth: '1140px',
    padding: {
      mobile: '16px',    // px-4
      tablet: '24px',    // sm:px-6
      desktop: '32px',   // lg:px-8
    },
  },
} as const;

// ================================
// LOGO SPECIFICATIONS
// ================================

export const KINSHIP_LOGOS = {
  header: {
    kinship: {
      src: '/brand/Kinship Header Logo.webp',
      alt: 'Kinship Landing',
      dimensions: { width: 140, height: 35 },
      responsive: 'h-8 sm:h-9 lg:h-10',
    },
    homa: {
      src: '/brand/Homa Logo.webp',
      alt: 'Homa Café + Bar',
      dimensions: { width: 28, height: 14 },
      responsive: 'h-2.5 sm:h-3.5 lg:h-4.5',
      positioning: '-ml-2 sm:-ml-3',
    },
    divider: {
      responsive: 'h-4 sm:h-5 lg:h-6',
      positioning: '-ml-9 mr-8',
    },
  },
} as const;

// ================================
// LOGO COLOR FILTERS
// ================================

export const KINSHIP_LOGO_FILTERS = {
  white: 'brightness(0) invert(1)',
  green: 'brightness(0) saturate(100%) invert(45%) sepia(30%) saturate(364%) hue-rotate(75deg) brightness(94%) contrast(89%)',
} as const;

// ================================
// ANIMATION STANDARDS - FROM SOP
// ================================

export const KINSHIP_ANIMATIONS = {
  duration: {
    instant: '150ms',
    fast: '300ms',
    normal: '400ms',
    slow: '600ms',
  },
  easing: {
    welcome: 'cubic-bezier(0.34, 1.56, 0.64, 1)',     // Friendly bounce
    confident: 'cubic-bezier(0.4, 0, 0.2, 1)',        // Smooth, decisive
    explore: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',  // Inviting
    default: 'ease-out',
    inOut: 'ease-in-out',
  },
  transitions: {
    colors: 'transition-colors duration-300',
    all: 'transition-all duration-300',
    transform: 'transition-transform duration-300',
    shadow: 'transition-shadow duration-300',
  },
  hover: {
    scale: '1.02',           // Subtle card hover
    buttonScale: '1.05',     // Button hover
    imageScale: '1.05',      // Image zoom
  },
} as const;

// ================================
// COMPONENT VARIANTS
// ================================

export const KINSHIP_BUTTON_VARIANTS = {
  primary: {
    base: 'inline-flex items-center justify-center text-white rounded-full px-6 py-3 text-base font-semibold transition-all transform',
    background: KINSHIP_COLORS.green,
    border: `2px solid ${KINSHIP_COLORS.green}`,
    hover: {
      background: KINSHIP_COLORS.greenDark,
      borderColor: KINSHIP_COLORS.greenDark,
      transform: 'scale(1.05)',
      boxShadow: `0 4px 12px rgba(132, 158, 116, 0.3)`,
    },
    focus: {
      outline: 'none',
      boxShadow: `0 0 0 3px rgba(132, 158, 116, 0.5)`,
    },
  },
  ghost: {
    base: 'inline-flex items-center justify-center border rounded-lg px-6 py-3 text-sm sm:text-base font-semibold transition-all shadow-sm hover:shadow-md',
    borderColor: KINSHIP_COLORS.divider,
    color: '#4A4A4A',
    background: KINSHIP_COLORS.white,
    hover: {
      background: KINSHIP_COLORS.greenLight,
      color: 'white',
      transform: 'translateY(-1px)',
    },
  },
} as const;

// ================================
// SHADOW SYSTEM
// ================================

export const KINSHIP_SHADOWS = {
  hairline: '0 1px rgba(0, 0, 0, 0.06)',
  soft: '0 2px 8px rgba(0, 0, 0, 0.08)',
  deep: '0 8px 24px rgba(0, 0, 0, 0.12)',
  text: '0 1px 2px rgba(0, 0, 0, 0.35)',
} as const;

// ================================
// RESPONSIVE BREAKPOINTS
// ================================

export const KINSHIP_BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  container: '1140px',
} as const;

// ================================
// VOICE & TONE SYSTEM
// ================================

export const KINSHIP_PERSONALITY = {
  traits: ['Friendly', 'Fun', 'Confident'],
  mission: 'Making guests feel loved, understood, and well cared for',
  approach: 'Guide people to the best experiences that will inspire them',
} as const;

export const KINSHIP_VOICE = {
  characteristics: [
    'Warm & authentic',
    'Adventure-ready',
    'Community-focused',
    'Locally connected',
    'Hospitality-driven'
  ],
  principle: 'Distinctly human communication',
} as const;

export const KINSHIP_TONE_CONTEXTS = {
  funLighthearted: {
    when: ['Greetings', 'Social media', 'Celebrating experiences', 'Inviting exploration'],
    characteristics: ['Playful and engaging', 'Enthusiasm for adventures', 'Celebratory', 'Inviting'],
  },
  professionalStraightforward: {
    when: ['Booking confirmations', 'Policy information', 'Business communications'],
    characteristics: ['Clear and informative', 'Confident and assured', 'Helpful', 'Professional yet warm'],
  },
  empatheticSupportive: {
    when: ['Handling issues', 'Addressing concerns', 'Difficult situations'],
    characteristics: ['Understanding and caring', 'Solution-focused', 'Reassuring', 'Personally invested'],
  },
} as const;

export const KINSHIP_BRAND_PHRASES = {
  approved: [
    'Experience like a local',
    'Sleep well. Meet locals. Launch adventures.',
    'Your Colorado Springs basecamp',
    'Outrageous hospitality',
    'Crafted by locals',
    'Adventure starts here',
    'Local connections',
    'Insider guide',
  ],
  avoid: [
    'Luxury accommodations',
    'World-class service',
    'Premier destination',
    'Unparalleled experience',
    'Five-star amenities',
  ],
} as const;

export const KINSHIP_SIGNATURE_SIGNOFFS = [
  'Adventure awaits, [Name]',
  'See you soon in Colorado Springs!',
  'Here to help, [Name]',
  'Your local guide, [Team/Name]',
  'Making memories, [Name]',
] as const;

// ================================
// SEO & META STANDARDS
// ================================

export const KINSHIP_SEO = {
  siteName: 'Kinship Landing',
  description: 'Stay, Gather, Explore Colorado Springs. Boutique adventure hotel in downtown Colorado Springs.',
  keywords: 'Colorado Springs hotel, boutique hotel, downtown hotel, local experiences, Kinship Landing, Pikes Peak, Garden of the Gods',
  url: 'https://kinshiplanding.com',
  ogImage: '/images/og-image.jpg',
  twitterHandle: '@kinshiphotel',
} as const;

// ================================
// ACCESSIBILITY STANDARDS
// ================================

export const KINSHIP_A11Y = {
  focusRing: {
    color: KINSHIP_COLORS.greenLight,
    style: 'outline-none ring-2 ring-offset-2 ring-offset-white',
    boxShadow: 'rgba(62, 95, 58, 0.3)',
  },
  contrastRatios: {
    normal: '4.5:1',      // WCAG AA
    large: '3:1',         // WCAG AA for large text
    enhanced: '7:1',      // WCAG AAA
  },
  minTouchTarget: '44px', // Minimum touch target size
} as const;

// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Get Kinship color with fallback
 */
export function getKinshipColor(colorKey: keyof typeof KINSHIP_COLORS, fallback = '#849e74') {
  return KINSHIP_COLORS[colorKey] || fallback;
}

/**
 * Generate CSS custom properties object
 */
export function getKinshipCSSVars() {
  return KINSHIP_CSS_VARS;
}

/**
 * Get responsive class string for logo sizing
 */
export function getLogoResponsiveClass(logoType: 'kinship' | 'homa' | 'divider') {
  const specs = KINSHIP_LOGOS.header[logoType];
  return specs.responsive || '';
}

/**
 * Get logo positioning classes
 */
export function getLogoPositioning(logoType: 'homa' | 'divider') {
  const specs = KINSHIP_LOGOS.header[logoType];
  return 'positioning' in specs ? specs.positioning : '';
}

/**
 * Generate button classes for variant
 */
export function getButtonClasses(variant: keyof typeof KINSHIP_BUTTON_VARIANTS) {
  const config = KINSHIP_BUTTON_VARIANTS[variant];
  return config.base;
}

/**
 * Validate color contrast ratio
 */
export function validateContrast(foreground: string, background: string): boolean {
  // Implementation would include actual contrast calculation
  // For now, return true - implement with a contrast checking library
  return true;
}

// ================================
// TYPE DEFINITIONS
// ================================

export type KinshipColor = keyof typeof KINSHIP_COLORS;
export type KinshipFont = keyof typeof KINSHIP_FONTS;
export type KinshipSpacing = keyof typeof KINSHIP_SPACING;
export type KinshipButton = keyof typeof KINSHIP_BUTTON_VARIANTS;
export type KinshipBreakpoint = keyof typeof KINSHIP_BREAKPOINTS;

// ================================
// EXPORTS
// ================================

export default {
  colors: KINSHIP_COLORS,
  fonts: KINSHIP_FONTS,
  spacing: KINSHIP_SPACING,
  animations: KINSHIP_ANIMATIONS,
  shadows: KINSHIP_SHADOWS,
  logos: KINSHIP_LOGOS,
  seo: KINSHIP_SEO,
  a11y: KINSHIP_A11Y,
} as const;