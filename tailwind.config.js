/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5E429B", // ReachOut Purple
        secondary: "#FFD200", // ReachOut Yellow
        accent: "#00B1C1", // ReachOut Teal
        urgent: "#E30613", // ReachOut Red
        slate: {
          900: "#1A1A1A",
          500: "#757575",
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [],
};
