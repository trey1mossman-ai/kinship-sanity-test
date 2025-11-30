import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kinship: {
          // Primary Colors
          evergreen: '#849e74',  // Main brand green
          slate: '#4f575c',      // Dark slate
          white: '#ffffff',      // Pure white
          latte: '#efe7dd',      // Warm off-white
          wasabi: '#aec69a',     // Light green
          // Legacy mapping
          green: '#849e74',      // Maps to evergreen
          greenDark: '#647B56',  // Darker green
          greenLight: '#aec69a', // Maps to wasabi
          text: '#4f575c',       // Maps to slate
          grayBg: '#c7c9c7',     // Maps to concrete
          divider: '#9ea2a2',    // Maps to steel
          sage: '#aec69a',       // Maps to wasabi
          topo: '#efe7dd'        // Maps to latte
        },
        // Mapped color tokens
        'primary-bg': '#FFFFFF',
        'primary-text': '#080806',
        'secondary-text': '#4A4A4A',
        'accent-1': '#697F5B',
        'accent-2': '#EEF0EB',
        'cta-bg': '#647B56',
        'cta-hover': '#667C58',
        'borders': '#E5E7E4',
        'section-alt': '#F3F3F3',
        // Legacy compatibility - updated to Kinship palette
        ink: '#080806',
        charcoal: '#4A4A4A',
        sand: '#F3F3F3',
        stone: '#EEF0EB',
        olive: '#647B56',
        'olive-dark': '#667C58',
        // Kinship brand scale using approved palette
        brand: {
          50: '#FFFFFF', // kinship-white
          100: '#EEF0EB', // kinship-sage
          200: '#EBEBEB', // kinship-topo  
          300: '#F3F3F3', // kinship-gray-bg
          400: '#E5E7E4', // kinship-divider
          500: '#697F5B', // kinship-green-light
          600: '#647B56', // kinship-green
          700: '#667C58', // kinship-green-dark
          800: '#4A4A4A', // charcoal (derived)
          900: '#080806', // kinship-text
          950: '#080806', // kinship-text
        },
        // Neutral palette
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        // EXACT fonts from kinshiplanding.com - DO NOT SUBSTITUTE
        heading: ['"utopia-std-display"', '"Source Serif Pro"', 'Georgia', 'serif'],
        body: ['"europa"', '"Hind"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        nav: ['"Montserrat"', '"europa"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        // Legacy mappings
        sans: ['"europa"', '"Hind"', 'system-ui', 'sans-serif'],
        serif: ['"utopia-std-display"', '"Source Serif Pro"', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'fade-down': 'fadeDown 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-out',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      borderRadius: {
        lg: "0.75rem", // 12px
        md: "0.5rem",  // 8px
        sm: "0.25rem", // 4px
        xl: "1rem",    // 16px
        card: "14px",  // Custom card radius
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'deep': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'hairline': '0 1px rgba(0, 0, 0, 0.06)',
        'card': '0 8px 24px rgba(0,0,0,0.06)',
      },
      maxWidth: {
        'container': '1140px',
        'wrap': '1200px',
      },
      textShadow: {
        'soft': '0 1px 2px rgba(0, 0, 0, 0.35)',
      },
      fontSize: {
        'clamp-h1': 'clamp(2.25rem, 3vw + 1rem, 3.5rem)',
        'clamp-subhead': 'clamp(1.125rem, 1.2vw + .5rem, 1.25rem)',
        'body': ['16px', '26px'],
      },
      letterSpacing: {
        'kinship-heading': '-0.01em',
        'kinship-body': '0',
        'kinship-nav': '0.06em',
        'kinship-button': '0.04em',
        'tight': '-0.02em',
      },
      lineHeight: {
        'kinship-heading': '1.2',
        'kinship-body': '1.6',
        'kinship-nav': '1.4',
      },
      maxWidth: {
        'container': '1140px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem', 
        '128': '32rem',
        'section-y': '6rem', // pt-24 pb-20
        'section-y-md': '7rem', // md:pt-28 md:pb-24
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;