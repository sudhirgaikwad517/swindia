/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './App.tsx',
    './index.tsx',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './services/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        swavalambi: {
          clay: '#FE8B00',
          moss: '#66AA41',
          sand: '#EBF1E6',
          stone: '#8a8a8a',
          paper: '#F9FDF9',
          dark: '#061C0D',
          accent: '#FE8B00',
          ayurvedicGreen: '#092813',
          gold: '#FE8B00',
          ivory: '#F9FDF9',
          herbalGreen: '#EBF1E6',
          forest: '#061C0D',
        },
        gray: {
          150: '#ECECEC',
          155: '#E8E8E8',
          250: '#DCDCDC',
          550: '#6B7280',
          705: '#4B5563',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Outfit', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      backgroundImage: {
        'paper-texture': "url('https://www.transparenttextures.com/patterns/natural-paper.png')",
        'green-gradient': 'linear-gradient(to right, #092813, #1A5C43)',
        'gold-gradient': 'linear-gradient(to right, #FE8B00, #F5D76E)',
      },
      borderRadius: {
        organic: '2rem 1rem 2rem 1rem',
      },
      zIndex: {
        55: '55',
        60: '60',
      },
      transitionDuration: {
        350: '350ms',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'fade-out': 'fadeOut 1s ease-in-out forwards',
        'fade-in': 'fadeIn 1s ease-in-out forwards',
        float: 'float 6s ease-in-out infinite',
        'leaf-1': 'leafFloat1 7s ease-in-out infinite',
        'leaf-2': 'leafFloat2 9s ease-in-out infinite',
        'leaf-3': 'leafFloat3 11s ease-in-out infinite',
        'leaf-4': 'leafFloat4 8s ease-in-out infinite',
        'smooth-fade': 'smoothFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeOut: {
          '0%': { opacity: '1', visibility: 'visible' },
          '100%': { opacity: '0', visibility: 'hidden' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        leafFloat1: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(12deg) scale(1)' },
          '50%': { transform: 'translate(12px, -15px) rotate(24deg) scale(1.05)' },
        },
        leafFloat2: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(-45deg) scale(1)' },
          '50%': { transform: 'translate(-15px, 12px) rotate(-35deg) scale(0.95)' },
        },
        leafFloat3: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(90deg) scale(1)' },
          '50%': { transform: 'translate(18px, -8px) rotate(100deg) scale(1.03)' },
        },
        leafFloat4: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(30deg) scale(1)' },
          '50%': { transform: 'translate(-10px, -18px) rotate(20deg) scale(0.97)' },
        },
        smoothFadeIn: {
          from: { opacity: '0.5', transform: 'scale(0.97)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
