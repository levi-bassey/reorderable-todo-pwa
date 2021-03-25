const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    content: ["./src/**/*.svelte", "./src/**/*.html"],
    defaultExtractor: (content) => [
      ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
      ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Josefin\\ Sans", ...defaultTheme.fontFamily.sans],
    },
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      transparent: "transparent",
      primary: "#3a7bfd",
      light: {
        100: "#fafafa",
        200: "#e4e5f1",
        300: "#d2d3db",
        400: "#9394a5",
        500: "#484b6a",
      },
      dark: {
        100: "#161722",
        200: "#25273c",
        300: "#cacde8",
        400: "#e4e5f1",
        500: "#777a92",
        600: "#4d5066",
        700: "#393a4c",
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["checked"],
    },
  },
  plugins: [],
};
