import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          '100': '#F2F2F2',
          '200': '#D9D9D9',
          '300': '#808080',
          '400': '#333333',
          '500': '#262626',
          '600': '#1A1A1A',
          '700': '#0D0D0D',
        },
      },
    },
  },
  plugins: [],
}
export default config
