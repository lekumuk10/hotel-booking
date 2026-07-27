/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        blu: {
          50: '#eef5fb',
          100: '#d6e8f4',
          200: '#b0d3e9',
          300: '#7fb5d8',
          400: '#4d92c4',
          500: '#2e76ad',
          600: '#1f5c8c',
          700: '#194970',
          800: '#143a57',
          900: '#0f2d44',
          950: '#0a1d30',
        },
        gold: {
          50: '#fbf7ed',
          100: '#f5ebcf',
          200: '#ebd59c',
          300: '#e0bd6a',
          400: '#d9a94a',
          500: '#c8912f',
          600: '#a97225',
          700: '#875520',
          800: '#6e441f',
          900: '#5c391e',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
