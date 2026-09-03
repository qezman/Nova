import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body:    ['var(--font-switzer)', 'system-ui', 'sans-serif'],
      },
      colors: {
        canvas:      'var(--canvas)',
        'canvas-raised': 'var(--canvas-raised)',
        'canvas-deep':   'var(--canvas-deep)',
        ink:         'var(--ink)',
        'ink-secondary':  'var(--ink-secondary)',
        'ink-tertiary':   'var(--ink-tertiary)',
        'ink-on-dark':    'var(--ink-on-dark)',
        accent:      'var(--accent)',
        'accent-text':    'var(--accent-text)',
        'accent-hover':   'var(--accent-hover)',
        'accent-dim':     'var(--accent-dim)',
        'accent-on-dark': 'var(--accent-on-dark)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      borderColor: {
        DEFAULT: 'var(--border)',
        strong:  'var(--border-strong)',
        'on-dark': 'var(--border-on-dark)',
      },
    },
  },
  plugins: [],
}

export default config
