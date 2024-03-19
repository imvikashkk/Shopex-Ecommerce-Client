/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 0 8px rgba(0, 0, 0, 0.2)',
        'product': '0 0 8px rgba(0, 0, 0, 0.2)',
        'filter': '0 0 4px rgba(0, 0, 0, 0.1)',
        'sort': '0 0 4px rgba(0, 0, 0, 0.1)',
        'photo': '0 0 10px rgba(0, 0, 0, 0.3)',
        'button':'0 0 10px rgba(0, 0, 0, 0.4)'
      }
    },
  },
  plugins: [],
}