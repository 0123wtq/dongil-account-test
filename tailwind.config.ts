import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#15110c',
        navy: '#0e1424',
        paper: '#f0e3c4',
        paperEdge: '#d8c79d',
        ink: '#f1e4c7',
        inkDark: '#28190c',
        gold: { DEFAULT: '#c99a2a', soft: '#e0b53c' },
        danger: { DEFAULT: '#8b2a3a', soft: '#b8404f' },
        muted: '#9a8866',
        mutedInk: '#7d6b4d',
        line: '#2e251a',
        lineInk: '#b8a47e',
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
