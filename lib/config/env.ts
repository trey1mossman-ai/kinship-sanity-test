import { z } from 'zod';

const envSchema = z.object({
  // Site Configuration
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_SITE_NAME: z.string().default('Kinship Landing'),
  NEXT_PUBLIC_SITE_DESCRIPTION: z.string().default('Stay, Gather, Explore Colorado Springs'),
  
  // Feature Flags
  NEXT_PUBLIC_ENABLE_VIDEO_HERO: z.string().transform(val => val === 'true').default('true'),
  NEXT_PUBLIC_ENABLE_DARK_MODE: z.string().transform(val => val === 'true').default('true'),
  NEXT_PUBLIC_ENABLE_BOOKING_MODULE: z.string().transform(val => val === 'true').default('true'),
  
  // Contact Information
  NEXT_PUBLIC_CONTACT_EMAIL: z.string().email().default('hello@kinshiphotel.com'),
  NEXT_PUBLIC_CONTACT_PHONE: z.string().default('+1 (555) 123-4567'),
  NEXT_PUBLIC_CONTACT_ADDRESS: z.string().default('123 Luxury Lane, San Francisco, CA 94102'),
  
  // Social Media
  NEXT_PUBLIC_INSTAGRAM_URL: z.string().url().optional(),
  NEXT_PUBLIC_FACEBOOK_URL: z.string().url().optional(),
  NEXT_PUBLIC_TWITTER_URL: z.string().url().optional(),
});

export const env = envSchema.parse(process.env);

export default env;
