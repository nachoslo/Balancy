/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(calc(-100% - 3rem))",
          },
        },
        slideMobile: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(calc(-100% - 0.5rem))",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        slide: "slide 30s linear infinite",
        slideMobile: "slideMobile 20s linear infinite",
        fadeIn: "fadeIn .5s ease-in-out"
      },
      gridTemplateColumns: {
        walletsGrid: "repeat(auto-fill, minmax(340px, 1fr))",
      },
      backgroundImage: {
        "hero-pattern":
          "radial-gradient( circle farthest-corner at 50% 200%, rgb(80 7 36) 10%, rgba(4,0,4,1) 90% );",
      },
    },
  },
  plugins: [],
};
