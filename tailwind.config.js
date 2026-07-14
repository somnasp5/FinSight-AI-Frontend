/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Core fintech palette — pastel green / off-white / soft gray
        cream: '#FAF9F5',
        ink: '#20261F',
        primary: {
          50: '#F1F8F3',
          100: '#DFEEE3',
          200: '#C1DDC9',
          300: '#9CC8AA',
          400: '#78B18B',
          500: '#5A9971',
          600: '#457C5A',
          700: '#396449',
          800: '#2F503C',
          900: '#284232',
        },
        sand: {
          50: '#FAF9F5',
          100: '#F3F1EA',
          200: '#E8E5DA',
          300: '#D8D4C4',
        },
        graystone: {
          50: '#F7F7F6',
          100: '#EEEEEC',
          200: '#DDDDD8',
          300: '#C2C2BB',
          400: '#9C9C93',
          500: '#75756B',
          600: '#57574F',
          700: '#40403A',
          800: '#2B2B27',
        },
        danger: '#C15B4A',
      },
      fontFamily: {
        display: ['"Manrope"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        soft: '0 2px 10px rgba(40, 66, 50, 0.06)',
        card: '0 4px 20px rgba(40, 66, 50, 0.08)',
      },
    },
  },
  plugins: [],
}
