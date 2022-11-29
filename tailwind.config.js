/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        darkpurple: {
          DEFAULT: '#7060A9',
        }, 
        medpurple: {
          DEFAULT: '#B997DD',
        },
        lightpurple: {
          DEFAULT: '#E1C4F0',
        }
      },
    },
  },
  plugins: [],
}

