// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        calico: {
          bg: '#FFFDF9',
          secondary: '#FFF5E5',
          orange: '#FFA75B',
          hover: '#ff8904',
          active: '#E88433',
          black: '#444444',
          text: '#2B2B2B',
          soft: '#d4d4d4'
        },
        dark: {
          bg: '#1F1F1F',
          secondary: '#2C2C2C',
          orange: '#FFB877',
          hover: '#ff8904',
          active: '#DD7B2B',
          black: '#EAEAEA',
          text: '#F5F5F5',
          soft: '#a1a1a1'
        }
      }
    }
  },
  plugins: []
};

export default config;
