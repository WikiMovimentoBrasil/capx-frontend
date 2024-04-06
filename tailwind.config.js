/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Customizing fonts
      fontFamily: {
        chunkfive: ["ChunkFive Ex", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      // Customizing colors
      colors: {
        "capx-light-bg": "#FFFFFF",
        "capx-light-box-bg": "#F5F5F5",
        "capx-dark-bg": "#04222F",
        "capx-dark-box-bg": "#053749",
        "capx-primary-red": "#d43831",
        "capx-primary-yellow": "#f0c626",
        "capx-primary-green": "#02ae8c",
        "capx-primary-blue": "#0070b9",
        "capx-secondary-purple": "#851d6a",
        "capx-secondary-gray": "#053749",
        "capx-secondary-red": "#f53800",
        "capx-secondary-green": "#05a300",
      },
    },
  },
  plugins: [],
};
