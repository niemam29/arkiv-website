import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'tablet': '768px',
        'desktop': '1024px',
      },
      colors: {
        primary: {
          DEFAULT: '#1E40AF', // blue-800 z designu
          50: '#EFF6FF',
          100: '#DBEAFE',
          800: '#1E40AF',
        },
        accent: {
          DEFAULT: '#FB923C', // orange-400 z designu
          50: '#FFF7ED',
          100: '#FFEDD5',
          400: '#FB923C',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        // Dodamy kolory z designu Figma
        stone: {
          300: '#D6D3D1',
          900: '#1C1917',
        },
        zinc: {
          100: '#F4F4F5',
          300: '#D4D4D8',
          900: '#18181B',
        },
        gray: {
          200: '#E5E7EB',
        },
        blue: {
          800: '#1E40AF',
        },
        orange: {
          400: '#FB923C',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        brutal: ['Inter', 'system-ui', 'sans-serif'], // Zastępujemy Brutal Type przez Inter z odpowiednią wagą
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 25px -5px rgba(0, 0, 0, 0.04)',
        // Shadow style z Figma designu
        'figma-card': '0px 2px 2px 0px rgba(0,0,0,0.25), inset 0px -2px 2px 0px rgba(0,0,0,0.15), inset 0px 2px 2px 0px rgba(255,255,255,0.25)',
        'figma-button-primary': '0px 2px 2px 0px rgba(0,0,0,0.25), inset 0px -4px 2px 0px rgba(0,0,0,0.25), inset 0px 2px 2px 0px rgba(255,255,255,0.25)',
        'figma-button-secondary': '0px 2px 2px 0px rgba(0,0,0,0.25), inset 0px -4px 2px 0px rgba(0,0,0,0.15), inset 0px 2px 2px 0px rgba(255,255,255,0.25)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config