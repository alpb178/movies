const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const nextTranslate = require('next-translate');
const { version } = require('./package.json');

module.exports = nextTranslate(
  withPWA({
    pwa: {
      dest: 'public',
      runtimeCaching,
      disable: process.env.NODE_ENV === 'development'
    },
    poweredByHeader: false,
    reactStrictMode: true,
    eslint: {
      ignoreDuringBuilds: true
    },
    publicRuntimeConfig: {
      version
    }
  })
);
