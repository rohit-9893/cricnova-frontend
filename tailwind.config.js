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
          primary: "#10B981",
          teal: "#0D9488",
          dark: "#0F172A",
          light: "#F8FAFC",
          muted: "#64748B",
        },
      },
    },
  },
  plugins: [],
};
