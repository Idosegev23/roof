import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'assistant': ['var(--font-assistant)', 'sans-serif'],
      },
      fontWeight: {
        'ultralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
      },
      // Design Framework Colors
      colors: {
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
        // Framework exact colors
        framework: {
          'primary-dark': 'var(--primary-dark)',
          'background-light': 'var(--background-light)',
          'accent-cta': 'var(--accent-cta)',
          'white': 'var(--white)',
          'gray-light': 'var(--gray-light)',
          'gray-medium': 'var(--gray-medium)',
          'success': 'var(--success)',
          'warning': 'var(--warning)',
          'error': 'var(--error)',
        },
      },
      // Exact spacing system
      spacing: {
        'xs': 'var(--space-xs)',    // 4px
        's': 'var(--space-s)',      // 8px
        'm': 'var(--space-m)',      // 16px
        'l': 'var(--space-l)',      // 24px
        'xl': 'var(--space-xl)',    // 32px
        'xxl': 'var(--space-xxl)',  // 48px
      },
      // Exact border radius
      borderRadius: {
        'button': 'var(--radius-button)',    // 12px
        'input': 'var(--radius-input)',      // 8px
        'card': 'var(--radius-card)',        // 16px
        'modal': 'var(--radius-modal)',      // 20px
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Framework shadows
      boxShadow: {
        'card': 'var(--shadow-card)',
        'modal': 'var(--shadow-modal)',
      },
      // Typography sizes
      fontSize: {
        'h1-mobile': 'var(--font-h1-mobile)',
        'h1-desktop': 'var(--font-h1-desktop)',
        'h2-mobile': 'var(--font-h2-mobile)',
        'h2-desktop': 'var(--font-h2-desktop)',
        'h3-mobile': 'var(--font-h3-mobile)',
        'h3-desktop': 'var(--font-h3-desktop)',
        'body': 'var(--font-body)',
        'body-mobile': 'var(--font-body-mobile)',
        'caption': 'var(--font-caption)',
        'caption-mobile': 'var(--font-caption-mobile)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
