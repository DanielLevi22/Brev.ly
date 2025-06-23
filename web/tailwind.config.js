/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-base': '#2c46b1',
        'blue-dark': '#2c4091',
        'grayscale-100': '#f9f9fb',
        'grayscale-200': '#e4e6ec',
        'grayscale-300': '#cdcfd5',
        'grayscale-400': '#74798b',
        'grayscale-500': '#4d505c',
        'grayscale-600': '#1f2025',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
} 