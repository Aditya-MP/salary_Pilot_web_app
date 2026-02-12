/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#050816',
        primary: '#7C3AED',
        secondary: '#EC4899',
        success: '#22C55E',
        warning: '#F97316',
        info: '#0EA5E9',
      },
      fontFamily: {
        sans: ['System'],
      },
    },
  },
  plugins: [],
}
