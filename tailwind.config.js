/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        footer: "350px 170px 170px 170px 170px",
        cart: "860px 300px",
        table: "300px 150px 160px 100px 50px",
        about: "230px 650px",
        aboutmid: "180px 526px",
        userDashboard: "180px 1000px",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        sm: { max: "426px" },
        md: { min: "426px", max: "769px" },
        lg: { min: "769px" },
      },
    },
  },
  plugins: [],
};
