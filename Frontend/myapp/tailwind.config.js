/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors : {
        purple :{
          600 : '#4e47e4',
          200 : '#e0e7ff',
          700 : '#372faa'
        },
        white : {
          200 : '#f2f6ff',
          300: '#f9fbfc'
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}

