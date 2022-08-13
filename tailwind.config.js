/** @type {import("tailwindcss").Config} */

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#BB880F',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
