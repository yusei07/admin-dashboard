/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './script.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E2C2B',
        secondary: '#abaab1',
        tertiary: '#677FE5',
        colorScheme1: '#E6FAFA',
        colorScheme2: '#EBEEFD',
      },
      fontFamily: {
        inter: ['Inter']
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}

