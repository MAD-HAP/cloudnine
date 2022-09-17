/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    screens : {
      '2xbiggy': {'max': '1535px'},

      'xbiggy': {'max': '1279px'},

      'biggy': {'max': '1023px'},

      'mid': {'max': '767px'},

      'smol': {'max': '639px'},

      'berysmol' : {'max' : '540px'}
    }
  },
  plugins: [],
}
