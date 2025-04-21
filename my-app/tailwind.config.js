import { withMT } from "@material-tailwind/react/utils/withMT"
/** @type {import('tailwindcss').Config} */

module.exports = withMT ( {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00df9a",
      },
      boxShadow: {
        custom: "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
      },
    },
  },
  plugins: [],
})

