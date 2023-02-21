const defaultTheme = require('tailwindcss/defaultTheme')

const FONT_FAMILY = process.env.NEXT_PUBLIC_FONT_FAMILY || 'LuckiestGuy'
const PRIMARY_COLOR = process.env.NEXT_PUBLIC_PRIMARY_COLOR || 'default'

const primaryColors = require('./colors')

module.exports = {
  presetColors: primaryColors,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
        21: 'repeat(21, minmax(0, 1fr))',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1300px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
      fontFamily: {
        headings: [`"${FONT_FAMILY}"`, ...defaultTheme.fontFamily.sans],
      },
      fontWeight: {
        thin: '100',
        hairline: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
    },
      keyframes: {
        'slide-down': {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'spin-loading': 'spin 1s cubic-bezier(0.76, 0.35, 0.2, 0.7) infinite',
        'slide-down': 'slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'spin-reverse': 'spin 1s reverse linear infinite',
      },

      colors: {
        primary: primaryColors[PRIMARY_COLOR],
        'dark-backdrop': '#000000',
        backdrop: 'grey',
        hunnysdarkpurple: '#3F07B4',
        hunnyslightpurple: '#5A1CDA',
        hunnyswhite: '#FFFFFF',
        hunnysviolet: '#5642D2',
        hunnysyellow: '#fcca00',
        hunnysbutton: '#ffde59',
      },
    },
  },
  plugins: [
    require('tailwindcss-radix')(),
    require('@ramosdiego/reservoir')({
      buttons: {
        animate: true,
      },
    }),
  ],
}
