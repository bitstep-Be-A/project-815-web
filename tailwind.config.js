/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],
  theme: {
    extend: {
      colors: {
        'primary': '#386AE9',
        'deep-gray': '#B7B7B7',
        'shallow-gray': '#D9D9D9',
        'gb-blue': '#2F289F',
        'gb-red': '#F12E2E',
        'gb-purple': '#6159E4'
      }
    },
  },
  plugins: [],
}
