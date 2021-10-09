const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const nextTranslate = require('next-translate');
const path = require('path');

module.exports = nextTranslate(
  withPWA({
    pwa: {
      dest: 'public',
      runtimeCaching,
      disable: process.env.NODE_ENV === 'development'
    },
    poweredByHeader: false,
    eslint: {
      ignoreDuringBuilds: true
    },
    webpack: (config) => {
      config.resolve.modules.push(path.resolve('./src'));
      return config;
    }
  })
);
