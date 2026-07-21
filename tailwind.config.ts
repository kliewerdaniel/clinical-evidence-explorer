import type { Config } from 'tailwindcss';
const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: {
      border: 'hsl(214 32% 91%)', input: 'hsl(214 32% 91%)', ring: 'hsl(222 47% 50%)',
      background: 'hsl(0 0% 100%)', foreground: 'hsl(222 47% 11%)',
      muted: 'hsl(210 40% 96%)', 'muted-foreground': 'hsl(215 16% 47%)',
      primary: 'hsl(222 47% 41%)', 'primary-foreground': 'hsl(0 0% 100%)',
      card: 'hsl(0 0% 100%)', 'card-foreground': 'hsl(222 47% 11%)',
      accent: 'hsl(199 89% 48%)', destructive: 'hsl(0 72% 51%)',
    },
    borderRadius: { lg: '0.75rem', md: '0.5rem', sm: '0.375rem' },
  } },
  plugins: [],
};
export default config;
