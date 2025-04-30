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
          primary: '#2dd4bf' // match Mathematics bar color
        },
        height: {
          'bar-1': '16%',
          'bar-1_5': '24%',
          'bar-1_8': '28%',
          'bar-2': '32%',
          'bar-2_2': '36%',
          'bar-2_5': '40%',
          'bar-3_2': '64%',
          'bar-4': '100%'
        }
      },
    },
    plugins: [],
  };
  