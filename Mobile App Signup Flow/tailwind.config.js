/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEF1FF',
          100: '#E0E5FF',
          200: '#C7CEFF',
          300: '#A5AEFF',
          400: '#818CFB',
          500: '#6366F1',
          600: '#5254E0',
          700: '#4244B8',
          800: '#363894',
          900: '#2E2F73',
        },
        surface: {
          light: '#EEF4FF',
          dark: '#0F1226',
        },
        card: {
          light: '#FFFFFF',
          dark: '#171B34',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '30px',
        field: '16px',
      },
      spacing: {
        13: '3.25rem',
      },
      boxShadow: {
        soft: '0 20px 45px -15px rgba(99, 102, 241, 0.25)',
        'soft-dark': '0 20px 45px -15px rgba(0, 0, 0, 0.55)',
        field: '0 1px 2px rgba(15, 18, 38, 0.04)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'slide-up': 'slide-up 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [],
}
