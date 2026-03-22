/** @type {import('tailwindcss').Config} */
export default {
  // darkMode is handled via @custom-variant in index.css (Tailwind v4)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {}
  },
  plugins: [require("tailwindcss-animate")],
}
