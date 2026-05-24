import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark': {
          '50': '#f8f9fa',
          '100': '#f1f3f5',
          '200': '#e9ecef',
          '300': '#dee2e6',
          '400': '#ced4da',
          '500': '#adb5bd',
          '600': '#868e96',
          '700': '#495057',
          '800': '#343a40',
          '900': '#212529',
        },
        'primary': '#6C63FF',
        'accent': '#00C2FF',
        'background': '#0B0F19',
      },
      backgroundColor: {
        'dark-base': '#0B0F19',
        'dark-secondary': '#1A1E2E',
        'dark-tertiary': '#252B3B',
      },
      textColor: {
        'dark-primary': '#FFFFFF',
        'dark-secondary': '#A8B2D1',
        'dark-tertiary': '#7A8194',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(108, 99, 255, 0.3)',
        'glow-accent': '0 0 20px rgba(0, 194, 255, 0.2)',
      },
      backdropBlur: {
        'sm': '4px',
        'md': '12px',
        'lg': '24px',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
        'spin': 'spin 1s linear infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        'slideUp': {
          'from': { transform: 'translateY(10px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        'slideDown': {
          'from': { transform: 'translateY(-10px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        'fadeIn': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'scaleIn': {
          'from': { transform: 'scale(0.95)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' },
        },
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
    },
  },
  plugins: [],
}
export default config
