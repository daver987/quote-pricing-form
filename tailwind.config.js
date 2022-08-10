/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#BB880F',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
