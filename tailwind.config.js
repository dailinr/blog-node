/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",// Ajusta esta ruta según la estructura de tu proyecto
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

