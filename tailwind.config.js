module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants:{
extend:{},
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/forms'),
],
}