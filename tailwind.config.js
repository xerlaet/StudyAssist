/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          gray: {
            900: '#2a2a2a',  // main dark background
            800: '#3a3a3a',  // card background
            700: '#4a4a4a',  // alternate gray for accents
          },
        },
      },
    },
    plugins: [],
  };