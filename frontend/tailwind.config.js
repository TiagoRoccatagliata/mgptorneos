/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'green-500': '#729C68',
        'gray-900': '#2D2D2D',
        'gray-800': '#3D3D3D',
      },
    },
  },
  plugins: [],
};