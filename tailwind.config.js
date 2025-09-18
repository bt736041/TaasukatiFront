/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        orangeDark: '#f8523a',   // כתום כהה
        orangeMedium: '#FB9E91', // כתום בינוני
        orangeLight: '#FEEBE8',  // כתום בהיר
        blueDark: '#10222e'
      },
    },
  },
  plugins: [],
};
