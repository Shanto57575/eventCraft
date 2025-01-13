/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["luxury", "dark", "cupcake"],
  },
  plugins: [
    require('daisyui'),
  ],
}