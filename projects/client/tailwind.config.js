import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "../../node_modules/daisyui/dist/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/react-daisyui/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../node_modules/sweetalert2/dist/**/*.js"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [daisyui],
}