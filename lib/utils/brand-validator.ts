/**
 * Kinship Brand Validation Utilities
 *
 * Use these functions to validate brand compliance in development
 */

import { KINSHIP_COLORS, KINSHIP_FONTS, KINSHIP_SPACING } from '@/lib/config/brand';

export class BrandValidator {
  private static violations: string[] = [];

  /**
   * Validate color usage against approved palette
   */
  static validateColor(color: string, context: string): boolean {
    const approvedColors = Object.values(KINSHIP_COLORS);
    const isApproved = approvedColors.includes(color as any);

    if (!isApproved) {
      this.violations.push(`❌ Unapproved color "${color}" used in ${context}`);
      console.warn(`🎨 Brand Violation: Color "${color}" not in approved palette`);
      return false;
    }

    return true;
  }

  /**
   * Validate font family against approved fonts
   */
  static validateFont(fontFamily: string, context: string): boolean {
    const approvedFonts = Object.values(KINSHIP_FONTS);
    const isApproved = approvedFonts.some(approved =>
      fontFamily.includes(approved.split(',')[0].replace(/"/g, ''))
    );

    if (!isApproved) {
      this.violations.push(`❌ Unapproved font "${fontFamily}" used in ${context}`);
      console.warn(`🔤 Brand Violation: Font "${fontFamily}" not in approved list`);
      return false;
    }

    return true;
  }

  /**
   * Validate logo implementation
   */
  static validateLogo(logoProps: {
    src: string;
    width: number;
    height: number;
    className: string;
    alt: string;
  }, context: string): boolean {
    let isValid = true;

    // Check approved logo sources
    const approvedLogos = [
      '/brand/Kinship Header Logo.webp',
      '/brand/Homa Logo.webp'
    ];

    if (!approvedLogos.includes(logoProps.src)) {
      this.violations.push(`❌ Unapproved logo source "${logoProps.src}" in ${context}`);
      isValid = false;
    }

    // Check for proper alt text
    if (!logoProps.alt || logoProps.alt.length < 3) {
      this.violations.push(`❌ Missing or insufficient alt text for logo in ${context}`);
      isValid = false;
    }

    return isValid;
  }

  /**
   * Validate button implementation
   */
  static validateButton(buttonClasses: string, context: string): boolean {
    let isValid = true;

    // Check for approved button patterns
    const hasApprovedColors =
      buttonClasses.includes('#849e74') || // Primary green
      buttonClasses.includes('#667C58') || // Green dark
      buttonClasses.includes('bg-kinship-green');

    const hasApprovedShape =
      buttonClasses.includes('rounded-full') ||
      buttonClasses.includes('rounded-lg');

    if (!hasApprovedColors) {
      this.violations.push(`❌ Button missing approved brand colors in ${context}`);
      isValid = false;
    }

    if (!hasApprovedShape) {
      this.violations.push(`❌ Button missing approved border radius in ${context}`);
      isValid = false;
    }

    return isValid;
  }

  /**
   * Validate responsive spacing
   */
  static validateSpacing(classes: string, context: string): boolean {
    let isValid = true;

    // Check for mobile-first responsive patterns
    const hasMobileFirst = /py-\d+/.test(classes) && /md:py-\d+/.test(classes);

    if (!hasMobileFirst && classes.includes('py-')) {
      this.violations.push(`❌ Non-responsive spacing detected in ${context}. Use mobile-first approach.`);
      isValid = false;
    }

    return isValid;
  }

  /**
   * Get all current violations
   */
  static getViolations(): string[] {
    return [...this.violations];
  }

  /**
   * Clear violations list
   */
  static clearViolations(): void {
    this.violations = [];
  }

  /**
   * Generate brand compliance report
   */
  static generateReport(): {
    isCompliant: boolean;
    violations: string[];
    recommendations: string[];
  } {
    const violations = this.getViolations();
    const isCompliant = violations.length === 0;

    const recommendations = [
      '✅ Use KINSHIP_COLORS from @/lib/config/brand',
      '✅ Import brand utilities for consistent styling',
      '✅ Test on multiple screen sizes',
      '✅ Validate accessibility with brand focus colors',
      '✅ Follow mobile-first responsive design',
    ];

    return {
      isCompliant,
      violations,
      recommendations,
    };
  }
}

/**
 * Development helper: Log brand compliance warnings
 */
export function logBrandCompliance() {
  if (process.env.NODE_ENV === 'development') {
    const report = BrandValidator.generateReport();

    if (!report.isCompliant) {
      console.group('🎨 Kinship Brand Compliance Report');
      console.warn('Brand violations detected:');
      report.violations.forEach(violation => console.warn(violation));
      console.groupEnd();
    } else {
      console.log('✅ Brand compliance validated');
    }
  }
}

/**
 * React hook for brand validation in development
 */
export function useBrandValidation(componentName: string) {
  if (process.env.NODE_ENV === 'development') {
    const violations = BrandValidator.getViolations();

    if (violations.length > 0) {
      console.warn(`🎨 Brand violations in ${componentName}:`, violations);
    }
  }
}

/**
 * Utility: Get approved color from palette
 */
export function getApprovedColor(colorKey: keyof typeof KINSHIP_COLORS): string {
  return KINSHIP_COLORS[colorKey];
}

/**
 * Utility: Check if color is in approved palette
 */
export function isApprovedColor(color: string): boolean {
  return Object.values(KINSHIP_COLORS).includes(color as any);
}

/**
 * Utility: Get contrast-safe text color for background
 */
export function getContrastSafeTextColor(backgroundColor: string): string {
  // Light backgrounds use dark text
  const lightBackgrounds = [
    KINSHIP_COLORS.white,
    KINSHIP_COLORS.latte,
    KINSHIP_COLORS.sage,
    KINSHIP_COLORS.grayBg,
  ];

  if (lightBackgrounds.includes(backgroundColor as any)) {
    return KINSHIP_COLORS.text;
  }

  // Dark backgrounds use white text
  return KINSHIP_COLORS.white;
}

/**
 * Utility: Generate approved button classes
 */
export function getApprovedButtonClasses(variant: 'primary' | 'secondary' = 'primary'): string {
  if (variant === 'primary') {
    return `bg-[${KINSHIP_COLORS.green}] hover:bg-[${KINSHIP_COLORS.greenDark}] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105`;
  }

  return `border border-[${KINSHIP_COLORS.divider}] hover:bg-[${KINSHIP_COLORS.greenLight}] hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300`;
}

/**
 * Utility: Generate approved section spacing classes
 */
export function getApprovedSectionClasses(): string {
  return 'py-10 md:py-14 lg:py-20'; // Mobile: 40px, Tablet: 56px, Desktop: 80px
}

/**
 * Development-only brand checker component
 */
export function BrandChecker({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === 'development') {
    // Run validation checks
    logBrandCompliance();
  }

  return <>{children}</>;
}