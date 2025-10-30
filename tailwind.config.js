/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Crete Round', 'sans-serif'],
        xo: ['Patrick Hand' ],
      },
    },
  },
  plugins: [],
}
