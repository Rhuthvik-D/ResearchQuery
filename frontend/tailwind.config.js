/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode : "class",
  theme: {
    extend: {
      colors: {
        'light-gray': '#f7fafc',
        'dark-gray': '#2d3748',
        'gray-800': '#1a202c',
        'gray-900': '#171923',
        'indigo-600': '#5a67d8',
        'indigo-700': '#434190',
        'indigo-800': '#3b4b6b',
        'indigo-900': '#2c3a56',
        'text-dark-gray': '#2d3748',
        'text-light-gray': '#edf2f7',
        'text-gray-200': '#e2e8f0',
        'text-gray-100': '#f7fafc'
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
      borderColor: ['dark'],
      ringColor: ['dark'],
      ringOffsetColor: ['dark'],
    },
  },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

