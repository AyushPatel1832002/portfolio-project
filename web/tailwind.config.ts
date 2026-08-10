import type {Config} from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0C10',
        surface: '#12161F',
        surface2: '#181D28',
        border: '#232838',
        text: '#E7E9EE',
        muted: '#8A93A6',
        amber: '#FFB627',
        teal: '#35D0BA',
        violet: '#8B7FFF',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      backgroundImage: {
        'grid-dots': 'radial-gradient(circle, #1E2432 1px, transparent 1px)',
      },
      keyframes: {
        blink: {
          '0%, 49%': {opacity: '1'},
          '50%, 100%': {opacity: '0'},
        },
        floaty: {
          '0%, 100%': {transform: 'translateY(0px)'},
          '50%': {transform: 'translateY(-12px)'},
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
