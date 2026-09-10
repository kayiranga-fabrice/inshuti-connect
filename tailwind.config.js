/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F382B",
        secondary: "#B2D8C6",
        accent: "#2E7D32",
        urgent: "#E30613",
        violet: "#7C3AED",
        "bg-beige": "#F9F6F0",
        modern: {
          dark: "#0F382B",
          beige: "#F9F6F0",
          sage: "#D2E7D6",
          mint: "#B2D8C6",
          accent: "#2E7D32",
        }
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
