/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#f0f5f3',
          100: '#dce8e2',
          200: '#bcd2c8',
          300: '#94b5a8',
          400: '#689282',
          500: '#487565',
          600: '#355c4f',
          700: '#2c4b41',
          800: '#253e37',
          900: '#0D2B1F', // Brand primary deep emerald
          950: '#061a12',
        },
        gold: {
          50: '#faf7ef',
          100: '#f2eada',
          200: '#e5d1b3',
          300: '#d7b385',
          400: '#c8a96b', // Brand secondary luxury gold
          500: '#b88a42',
          600: '#a37135',
          700: '#83552d',
          800: '#6d452a',
          900: '#5a3824',
          950: '#341d11',
        },
        sand: {
          50: '#fcfbf9',
          100: '#f6f3eb',
          200: '#ebe1ce',
          300: '#decca8',
          400: '#d1b483',
          500: '#c39d62',
          600: '#b48551',
          700: '#956942',
          800: '#7a5739',
          900: '#634731',
          950: '#362518',
        },
        ivory: {
          DEFAULT: '#FEFDFC',
          muted: '#F5F2EC'
        }
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
        accent: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'ken-burns': 'kenBurns 20s ease-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        }
      },
      boxShadow: {
        'luxury': '0 30px 60px -12px rgba(13, 43, 31, 0.25)',
        'card': '0 10px 40px rgba(0,0,0,0.06)',
        'card-hover': '0 20px 60px rgba(13, 43, 31, 0.15)',
        'glow': '0 0 40px rgba(200, 169, 107, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}
