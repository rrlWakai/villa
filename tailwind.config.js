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
          50: '#eef4ed',
          100: '#d8e7d5',
          200: '#b4d0ae',
          300: '#8eb885',
          400: '#5f8c56',
          500: '#3f6e38',
          600: '#2D5A27',
          700: '#24491f',
          800: '#1f3d1b',
          900: '#1d3719',
          950: '#1A3317',
        },
        gold: {
          50: '#f8f1e5',
          100: '#f1e1c2',
          200: '#e8ce9a',
          300: '#dfb86e',
          400: '#C8963E',
          500: '#b78534',
          600: '#996f2e',
          700: '#7b5825',
          800: '#5f441d',
          900: '#493415',
          950: '#2d1f0d',
        },
        sand: {
          50: '#F5F0E8',
          100: '#E8E4DC',
          200: '#d7d2c9',
          300: '#c4beb2',
          400: '#b0a99c',
          500: '#9c9486',
          600: '#837b6f',
          700: '#696256',
          800: '#50493f',
          900: '#3f3931',
          950: '#2f2a23',
        },
        charcoal: {
          DEFAULT: '#3A3A3A',
          50: '#f3f3f3',
          100: '#e5e5e5',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#8c8c8c',
          500: '#666666',
          600: '#4d4d4d',
          700: '#3A3A3A',
          800: '#2f2f2f',
          900: '#242424',
        },
      },
      fontFamily: {
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        accent: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
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
