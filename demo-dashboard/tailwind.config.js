/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5fa',
          100: '#e1ecf5',
          500: '#1B3A6B',
          600: '#142d54',
          700: '#0d1f3c'
        },
        omysha: {
          blue: '#1B3A6B',
          amber: '#E8A838',
          emerald: '#10B981',
          slate: '#0F172A'
        }
      }
    },
  },
  plugins: [],
}
