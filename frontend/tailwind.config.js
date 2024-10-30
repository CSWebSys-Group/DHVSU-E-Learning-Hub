/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: "#701D0B",
        "maroon-500": "#562424",
        "maroon-400": "#6D3636",
        "maroon-300": "#924444",
        "maroon-200": "#A94C4C",
        "maroon-100": "#C17171",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
