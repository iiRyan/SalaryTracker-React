/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
  theme: {
    extend: {
        colors: {
            customBlack: '#18191A',
            customGray: '#3A3B3C',
            darkerGray: '#242526',
           primaryText:'#FFFFFF',
          },
    },
  },
  plugins: [],
}

