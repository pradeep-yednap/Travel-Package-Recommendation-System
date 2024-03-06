/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'customColor': '#369445', // replace '#123456' with your color code
      }
    }
  },
  plugins: [],
}
