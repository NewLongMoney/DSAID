import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: '#ffffff',
          100: '#ffffcc',
          200: '#ffff99',
          300: '#ffff66',
          400: '#ffff33',
          500: '#ffff00',
          600: '#e6e600',
          700: '#cccc00',
          800: '#b3b300',
          900: '#999900',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: '#e6f3ff',
          100: '#cce7ff',
          200: '#99d1ff',
          300: '#66baff',
          400: '#33a3ff',
          500: '#0087ff',
          600: '#0073c0',
          700: '#0062a6',
          800: '#00528c',
          900: '#004172',
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        dsaidYellow: {
          50: '#ffffff',
          100: '#ffffcc',
          200: '#ffff99',
          300: '#ffff66',
          400: '#ffff33',
          500: '#ffff00',
          600: '#e6e600',
          700: '#cccc00',
          800: '#b3b300',
          900: '#999900',
        },
        dsaidBlue: {
          50: '#e6f3ff',
          100: '#cce7ff',
          200: '#99d1ff',
          300: '#66baff',
          400: '#33a3ff',
          500: '#0087ff',
          600: '#0073c0',
          700: '#0062a6',
          800: '#00528c',
          900: '#004172',
        },
        emerald: {
          DEFAULT: "hsl(var(--emerald))",
        },
        neutral: {
          950: '#000000',
          900: '#000000',
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(16, 185, 129, 0.85), rgba(16, 185, 129, 0.65))',
      },
      backdropBlur: {
        xl: '24px',
      },
    },
  },
  plugins: [],
}
export default config
