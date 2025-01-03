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
      backgroundColor: {
        "capx-light-bg": "#FFFFFF",
        "capx-dark-bg": "#04222F",
      },
      textColor: {
        "capx-light-text": "#053749",
        "capx-dark-text": "#FFFFFF",
      },
      // Customizing colors
      colors: {
        "capx-light-bg": "#FFFFFF",
        "capx-light-box-bg": "#EFEFEF",
        "capx-light-link": "#0070B9",
        "capx-dark-bg": "#04222F",
        "capx-dark-box-bg": "#053749",
        "capx-dark-link": "#66C3FF",
        "capx-primary-red": "#D43420",
        "capx-primary-yellow": "#f0c626",
        "capx-primary-green": "#02AE8C",
        "capx-primary-blue": "#0070b9",
        "capx-secondary-purple": "#851d6a",
        "capx-secondary-gray": "#053749",
        "capx-secondary-red": "#B11F0B",
        "capx-secondary-green": "#05a300",
        "capx-secondary-grey": "#717171",
        "capx-secondary-dark-grey": "#4c4c4c",
      },
    },
  },
  plugins: [],
};
