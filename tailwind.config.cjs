const { Icons } = require('tailwindcss-plugin-icons')

const carbon = require('@iconify-json/carbon/icons.json')
const uiw = require('@iconify-json/uiw/icons.json')

/**
 * @type {import('tailwindcss-plugin-icons').Options}
 */
const options = () => ({
  carbon,
  uiw,
})

/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    Icons(options),
  ],
}
