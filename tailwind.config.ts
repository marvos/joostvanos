import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const tailwindconfig = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: ['selector', '[data-theme="light"]'],
  theme: {
    fontSize: {
      xxs: ["0.75rem", "1.125rem"], // 12px,18px
      xs: ["0.875rem", "1.375rem"], // 14px,22px
      sm: ["1rem", "1.5rem"], // 16px,24px
      base: ["1.125rem", "1.5rem"], // 18px,24px
      xl: ["1.25rem", "1.625rem"], // 20px,26px
      "2xl": ["1.5rem", "1.875rem"], // 24px,30px
      "3xl": ["1.75rem", "2.188rem"], // 28px,35px
      "4xl": ["2.25rem", "2.813rem"], // 36px,45px
      "5xl": ["2.75rem", "3.438rem"], // 44px,55px
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    colors: {
      mocha: {
        50:"#F1F0E2",
      100: "#E4C7B7",
      200: "#BBAA91",
      300: "#C39D88",
      400: "#A47864",
      500: "#A28776",
      600: "#8B645A",
      700: "#56443F",
        800: "#3C302C",
        900: "#211814",
    },

      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      blue: {
        50: "#E7E9FA",
        100: "#B0B6EF",
        200: "#7983E5",
        300: "#4251DA",
        400: "#0B1ECF",
        500: "#000DC0",
        600: "#0000AB",
        700: "#00008B",
        800: "#000064",
        900: "#00003D",
      },
      green: {
        50: "#F0FEFA",
        100: "#CEFBEE",
        200: "#ACF8E2",
        300: "#8AF6D7",
        400: "#68F3CB",
        500: "#4CD8B1",
        600: "#35B295",
        700: "#228B77",
        800: "#136458",
        900: "#083D37",
      },
      gray: {
        25: "#EEF0F3",
        50: "#F7F8F9",
        100: "#EEF0F3",
        200: "#D5DAE1",
        300: "#BBC3CF",
        400: "#8896AB",
        500: "#556987",
        600: "#4D5F7A",
        700: "#404F65",
        800: "#333F51",
        900: "#2A3342",
      },
      purple: {
        50: "#FBF7FF",
        100: "#F6EEFE",
        200: "#E9D5FD",
        300: "#DCBBFC",
        400: "#C288F9",
        500: "#A855F7",
        600: "#974DDE",
        700: "#7E40B9",
        800: "#653394",
        900: "#522A79",
      },
      red: {
        50: "#FEF7F6",
        100: "#FDEEEC",
        200: "#FBD6D0",
        300: "#F9BDB4",
        400: "#F48B7C",
        500: "#EF5944",
        600: "#D7503D",
        700: "#B34333",
        800: "#8F3529",
        900: "#752C21",
      },
      orange: {
        50: "#FFFAF3",
        100: "#FEF5E7",
        200: "#FDE7C2",
        300: "#FBD89D",
        400: "#F8BB54",
        500: "#F59E0B",
        600: "#DD8E0A",
        700: "#B87708",
        800: "#935F07",
        900: "#784D05",
      },
    },
    extend: {
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        "text-slide": "text-slide 3s cubic-bezier(0.83, 0, 0.17, 1) infinite",
      },
      keyframes: {
        "text-slide": {
          "0%": {
            transform: "translateY(0%)",
          },

          "50%": {
            transform: "translateY(-100%)",
          },

          "100%": {
            transform: "translateY(0%)",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
const daisyconfig = {
  daisyui: {
    base: true,
    styled: true,
    utils: true,
    // prefix: "",
    themes: [
      {
        light: {
          primary: tailwindconfig.theme.colors.mocha[100],
          "primary-focus": tailwindconfig.theme.colors.mocha[300],
          secondary: tailwindconfig.theme.colors.mocha[700],
          "secondary-focus": tailwindconfig.theme.colors.mocha[800],
          accent: tailwindconfig.theme.colors.mocha[400],
          neutral: tailwindconfig.theme.colors.mocha[600],
          "base-100": tailwindconfig.theme.colors.mocha[50],
          info: tailwindconfig.theme.colors.mocha[400],
          success: tailwindconfig.theme.colors.green[300],
          warning: tailwindconfig.theme.colors.orange[500],
          error: tailwindconfig.theme.colors.red[600],

        },

        dark: {
          primary: tailwindconfig.theme.colors.mocha[50],
          "primary-focus": tailwindconfig.theme.colors.mocha[600],
          secondary: tailwindconfig.theme.colors.mocha[700],
          "secondary-focus": tailwindconfig.theme.colors.mocha[600],
          accent: tailwindconfig.theme.colors.mocha[100],
          neutral: tailwindconfig.theme.colors.mocha[600],
          "base-100": tailwindconfig.theme.colors.mocha[800],
          info: tailwindconfig.theme.colors.blue[800],
          success: tailwindconfig.theme.colors.green[300],
          warning: tailwindconfig.theme.colors.orange[500],
          error: tailwindconfig.theme.colors.red[600],
        },
      },
    ],
  },

};


export default { ...tailwindconfig} satisfies Config;
