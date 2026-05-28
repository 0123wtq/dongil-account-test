import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        ink: '#f5f5f5',
        gold: { DEFAULT: '#d4af37', soft: '#f0d068' },
        danger: { DEFAULT: '#e63946', soft: '#ff6b6b' },
        muted: '#9a9a9a',
        line: '#1f1f1f',
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
