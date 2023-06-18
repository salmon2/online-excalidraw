// next.config.js
const withTwin = require('./withTwin.js');

module.exports = (phase) => {
  return withTwin({
    reactStrictMode: false,
    swcMinify: true,
    images: {
      loaderFile: './image-loader.js',
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8080/api/:path*',
          basePath: false,
        },
      ];
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  });
};
