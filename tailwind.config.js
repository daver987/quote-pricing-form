/** @type {import("tailwindcss").Config} */

module.exports = {
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F7F2EE',
          100: '#EEE5DD',
          200: '#DECCBA',
          300: '#CDB398',
          400: '#BD9975',
          DEFAULT: '#AC8053',
          600: '#8A6642',
          700: '#674D32',
          800: '#453321',
          900: '#221A11',
        },
        secondary: {
          50: '#EEF2F7',
          100: '#DDE5EE',
          200: '#BACCDE',
          300: '#98B3CD',
          400: '#7599BD',
          DEFAULT: '#537FAC',
          600: '#42668A',
          700: '#324D67',
          800: '#213345',
          900: '#111A22',
        },
        body: {
          50: '#EBEBEB',
          100: '#D6D6D6',
          200: '#ADADAD',
          300: '#858585',
          400: '#5C5C5C',
          DEFAULT: '#333333',
          600: '#292929',
          700: '#1F1F1F',
          800: '#141414',
          900: '#0A0A0A',
        },
      },
      fontFamily: {
        sans: ['Inter var'],
      },
      screens: {
        xs: '480px',
      },
    },
  },

  plugins: [require('@headlessui/tailwindcss'), require('@tailwindcss/forms')],
}
