/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class", // habilita el modo oscuro mediante una clase
  theme: {
    extend: {
      transitionDuration: {
        'DEFAULT': '250ms',
        '300': '300ms',
      },
      colors: {
        primary: "#3490dc",
        secondary: "#ffed4a",
        accent: "#e3342f",
        "primary-dark": "#0d47a1",
        "secondary-dark": "#ffca28",
        "accent-dark": "#c62828",
        "light-background": "#f7fafc",
        "dark-background": "#2d3748",
        "light-text": "#2d3748",
        "dark-text": "#f7fafc",
      },
    },
    // Añade configuración para estilos personalizados del switch
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".toggle__line": {
          // Estilos de la línea del switch
          width: "2.5rem",
          height: "1rem",
          borderRadius: "1rem",
          backgroundColor: "#718096", // Color de fondo
        },
        ".toggle__dot": {
          // Estilos del punto del switch
          width: "1rem",
          height: "1rem",
          borderRadius: "50%",
          backgroundColor: "#ffffff", // Color del punto
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", // Sombra del punto
          transform: "translateX(0.5rem)", // Posición inicial del punto
        },
        ".toggle__dot:checked": {
          // Estilos del punto cuando está activado
          transform: "translateX(100%)", // Mueve el punto hacia la derecha
        },
      });
    },
  ],
};
