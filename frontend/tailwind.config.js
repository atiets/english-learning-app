/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        appBg: "#F3EEE1",
        cardBg: "#E8DFC9",

        primaryRed: "#7C1918",
        primaryGreen: "#4F6F52",

        beige: "#F6E7C1",

        darkBorder: "#2B2B2B",

        textPrimary: "#1C1C1C",
        textSoft: "#5F5F5F",

        accentOrange: "#EE7842",
        accentYellow: "#F9D949",
      },
    },
  },
  plugins: [],
};
