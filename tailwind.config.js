/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans"],
      },
      colors: {
        darkGray: "hsl(0, 0%, 59%)",
        darkerGray: "hsl(0, 0%, 17%)",
      },
    },
  },
  plugins: [],
};
