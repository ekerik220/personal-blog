const tailwindcssPluginContent = require("tailwindcss-plugin-content")

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  plugins: [tailwindcssPluginContent],
  theme: {
    letterSpacing: {
      tight: "-0.025em",
      normal: 0,
      loose: "0.025em",
    },
    textWeight: {
      regular: 400,
      semibold: 600,
      extrabold: 800,
    },
    extend: {
      colors: {
        primarytext: "#27272a",
      },
    },
  },
}
