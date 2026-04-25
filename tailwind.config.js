/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Matchanらしい「あったかい色」を定義しておくと便利です
        warm: {
          50: "#fffaf0",
          100: "#feebc8",
          500: "#ed8936",
        },
      },
    },
  },
  plugins: [],
};
