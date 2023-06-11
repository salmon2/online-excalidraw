// next.config.js
const withTwin = require('./withTwin.js');

module.exports = (phase) => {
  return withTwin({
    reactStrictMode: false,
    swcMinify: true,
    images: {
      loaderFile: './image-loader.js',
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  });
};
