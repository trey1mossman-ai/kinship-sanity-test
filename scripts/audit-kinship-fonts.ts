#!/usr/bin/env ts-node

/**
 * Typography Validation Script for Kinship Landing
 * Verifies that computed styles match production tokens
 */

import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
import chalk from 'chalk';

// Expected typography values from production site
const EXPECTED_TYPOGRAPHY = {
  fonts: {
    heading: {
      family: ['utopia-std-display', 'Source Serif Pro', 'Georgia', 'serif'],
      weights: ['400', '600', '700'],
      letterSpacing: '-0.01em',
      lineHeight: '1.2'
    },
    body: {
      family: ['europa', 'Hind', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      weights: ['300', '400', '700'],
      letterSpacing: '0',
      lineHeight: '1.6'
    },
    nav: {
      family: ['Montserrat', 'europa', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      weights: ['400', '600', '700'],
      letterSpacing: '0.06em',
      lineHeight: '1.4'
    }
  },
  elements: {
    h1: { font: 'heading', weight: '700', size: ['2.5rem', '3.75rem'] },
    h2: { font: 'heading', weight: '600', size: ['1.75rem', '3rem'] },
    h3: { font: 'heading', weight: '600', size: ['1.5rem', '2.25rem'] },
    p: { font: 'body', weight: '400', size: ['1rem', '1.125rem'] },
    button: { font: 'nav', weight: '600', textTransform: 'uppercase' },
    nav: { font: 'nav', weight: '600', textTransform: 'uppercase' }
  }
};

interface ValidationResult {
  element: string;
  property: string;
  expected: string;
  actual: string;
  passed: boolean;
}

class TypographyValidator {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private results: ValidationResult[] = [];
  private localUrl = 'http://localhost:3000';
  private productionUrl = 'https://www.kinshiplanding.com';

  async init() {
    console.log(chalk.blue.bold('\n🔍 Kinship Landing Typography Validator\n'));
    console.log(chalk.gray('Launching browser...'));
    
    this.browser = await chromium.launch({ headless: true });
    this.page = await this.browser.newPage();
  }

  async validateLocalSite() {
    if (!this.page) throw new Error('Page not initialized');
    
    console.log(chalk.yellow(`\n📋 Validating local site: ${this.localUrl}\n`));
    
    try {
      await this.page.goto(this.localUrl, { waitUntil: 'networkidle' });
    } catch (error) {
      console.error(chalk.red('❌ Failed to load local site. Is the dev server running?'));
      console.log(chalk.gray('Run "npm run dev" in another terminal and try again.'));
      process.exit(1);
    }

    // Validate heading elements
    await this.validateElement('h1', EXPECTED_TYPOGRAPHY.elements.h1);
    await this.validateElement('h2', EXPECTED_TYPOGRAPHY.elements.h2);
    await this.validateElement('h3', EXPECTED_TYPOGRAPHY.elements.h3);
    
    // Validate body text
    await this.validateElement('p', EXPECTED_TYPOGRAPHY.elements.p);
    
    // Validate navigation
    await this.validateElement('nav a', EXPECTED_TYPOGRAPHY.elements.nav);
    
    // Validate buttons
    await this.validateElement('button', EXPECTED_TYPOGRAPHY.elements.button);
    await this.validateElement('.btn-primary', EXPECTED_TYPOGRAPHY.elements.button);
    await this.validateElement('.btn-ghost', EXPECTED_TYPOGRAPHY.elements.button);
  }

  async validateElement(selector: string, expected: any) {
    if (!this.page) return;
    
    const elements = await this.page.$$(selector);
    if (elements.length === 0) {
      console.log(chalk.gray(`No ${selector} elements found`));
      return;
    }

    const element = elements[0];
    const styles = await element.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        fontFamily: computed.fontFamily,
        fontWeight: computed.fontWeight,
        fontSize: computed.fontSize,
        letterSpacing: computed.letterSpacing,
        lineHeight: computed.lineHeight,
        textTransform: computed.textTransform
      };
    });

    // Validate font family
    const expectedFont = EXPECTED_TYPOGRAPHY.fonts[expected.font as keyof typeof EXPECTED_TYPOGRAPHY.fonts];
    const actualFamily = this.normalizeFontFamily(styles.fontFamily);
    const expectedFamily = expectedFont.family[0].toLowerCase();
    
    this.results.push({
      element: selector,
      property: 'font-family',
      expected: expectedFamily,
      actual: actualFamily,
      passed: actualFamily.includes(expectedFamily)
    });

    // Validate font weight
    if (expected.weight) {
      this.results.push({
        element: selector,
        property: 'font-weight',
        expected: expected.weight,
        actual: styles.fontWeight,
        passed: styles.fontWeight === expected.weight
      });
    }

    // Validate letter spacing
    if (expectedFont.letterSpacing) {
      const actualSpacing = this.normalizeSpacing(styles.letterSpacing);
      this.results.push({
        element: selector,
        property: 'letter-spacing',
        expected: expectedFont.letterSpacing,
        actual: actualSpacing,
        passed: actualSpacing === expectedFont.letterSpacing || actualSpacing === 'normal' && expectedFont.letterSpacing === '0'
      });
    }

    // Validate text transform
    if (expected.textTransform) {
      this.results.push({
        element: selector,
        property: 'text-transform',
        expected: expected.textTransform,
        actual: styles.textTransform,
        passed: styles.textTransform === expected.textTransform
      });
    }
  }

  async compareWithProduction() {
    if (!this.page) return;
    
    console.log(chalk.yellow(`\n🌐 Comparing with production: ${this.productionUrl}\n`));
    
    await this.page.goto(this.productionUrl, { waitUntil: 'networkidle' });
    
    // Get production font usage
    const productionFonts = await this.page.evaluate(() => {
      const fonts = new Set<string>();
      document.querySelectorAll('*').forEach(el => {
        const computed = window.getComputedStyle(el);
        if (computed.fontFamily) {
          fonts.add(computed.fontFamily);
        }
      });
      return Array.from(fonts);
    });

    console.log(chalk.cyan('Production fonts detected:'));
    productionFonts.forEach(font => {
      console.log(chalk.gray(`  • ${this.normalizeFontFamily(font)}`));
    });
  }

  private normalizeFontFamily(fontFamily: string): string {
    return fontFamily
      .toLowerCase()
      .replace(/['"]/g, '')
      .split(',')[0]
      .trim();
  }

  private normalizeSpacing(spacing: string): string {
    if (spacing === 'normal' || spacing === '0px') return '0';
    return spacing;
  }

  printResults() {
    console.log(chalk.blue.bold('\n📊 Validation Results\n'));
    
    const passed = this.results.filter(r => r.passed);
    const failed = this.results.filter(r => !r.passed);
    
    if (failed.length > 0) {
      console.log(chalk.red.bold(`❌ Failed: ${failed.length} checks\n`));
      failed.forEach(result => {
        console.log(chalk.red(`  ${result.element} - ${result.property}:`));
        console.log(chalk.gray(`    Expected: ${result.expected}`));
        console.log(chalk.gray(`    Actual: ${result.actual}`));
      });
    }
    
    if (passed.length > 0) {
      console.log(chalk.green.bold(`\n✅ Passed: ${passed.length} checks\n`));
      const summary = new Map<string, number>();
      passed.forEach(result => {
        const key = `${result.element} - ${result.property}`;
        summary.set(key, (summary.get(key) || 0) + 1);
      });
      
      summary.forEach((count, key) => {
        console.log(chalk.green(`  ${key}`));
      });
    }
    
    const score = Math.round((passed.length / this.results.length) * 100);
    const scoreColor = score >= 90 ? chalk.green : score >= 70 ? chalk.yellow : chalk.red;
    
    console.log(chalk.bold(`\n📈 Overall Score: ${scoreColor(`${score}%`)}\n`));
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async run() {
    try {
      await this.init();
      await this.validateLocalSite();
      await this.compareWithProduction();
      this.printResults();
    } catch (error) {
      console.error(chalk.red('Error during validation:'), error);
    } finally {
      await this.cleanup();
    }
  }
}

// Run the validator
const validator = new TypographyValidator();
validator.run().catch(console.error);