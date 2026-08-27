import type {Config} from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07111F',
        surface: '#111C2E',
        surface2: '#0B1628',
        border: '#243247',
        text: '#F8FAFC',
        muted: '#94A3B8',
        amber: '#FBBF24',
        teal: '#FBBF24',
        violet: '#1E40AF',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      backgroundImage: {
        'grid-dots': 'radial-gradient(circle, rgba(36, 50, 71, 0.52) 1px, transparent 1px)',
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
