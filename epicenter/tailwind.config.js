/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      spacing: {
        '72px': '72px',
      }
    },
  },
  plugins: [],
  safelist: [...Array(101).keys()].map((i) => `w-[${i}%]`)

  
}
