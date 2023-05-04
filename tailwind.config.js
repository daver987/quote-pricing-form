/** @type {import("tailwindcss").Config} */

module.exports = {
  darkMode: 'class',
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `compatibles/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
  ],

  theme: {
    extend: {
      fontSize: {
        xxs: '0.675rem',
      },
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
      },
    },
  },

  plugins: [
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
  ],
}
