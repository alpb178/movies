const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/containers/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'media', // or 'class'
  theme: {
    colors: {
      black: colors.black,
      blue: colors.blue,
      emerald: colors.emerald,
      gray: colors.gray,
      green: colors.green,
      primary: colors.amber,
      red: colors.red,
      secondary: colors.sky,
      slate: colors.slate,
      teal: colors.teal,
      transparent: 'transparent',
      white: colors.white,
      yellow: colors.amber
    },
    extend: {
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem'
      },
      screens: {
        xs: '480px'
      }
    }
  },
  variants: {
    margin: ['responsive', 'first', 'last']
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
};
