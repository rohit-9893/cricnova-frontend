/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#D32F2F",
          teal: "#0D9488",
          dark: "#0F172A",
          light: "#F8FAFC",
        },
      },
    },
  },
  plugins: [],
};
