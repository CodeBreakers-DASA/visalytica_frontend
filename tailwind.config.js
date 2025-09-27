/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        azul: "#166DED",
        azul_escuro: "#2A279C",
        noturno: "#242437",
        noturno_medio: "#242437",
        noturno_claro: "#474769",
        cinza_claro: "#FFFBFB",
        cinza_medio: "#F3F3F3",
        cinza_escuro: "#9b9b9b",
        cinza: "#CFCFCF",
        vermelho: "#DD2020",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      850: "850px",
    },
  },
  plugins: [],
};
