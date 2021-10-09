const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  corePlugins: { outline: false },
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/containers/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem'
      },
      backgroundSize: {
        full: '100$'
      },
      textColor: {
        primary: colors.indigo,
        secondary: colors.blue
      },
      backgroundColor: {
        primary: colors.indigo,
        secondary: colors.blue
      },
      borderColor: {
        primary: colors.indigo,
        secondary: colors.blue
      }
    }
  },
  variants: {
    margin: ['responsive', 'first', 'last']
  },
  plugins: [require('@tailwindcss/forms')]
};
