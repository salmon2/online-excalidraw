const path = require('path');

/* twin.macro를 사용하는 파일이 있는 폴더들 */
const includedDirs = [
  path.resolve(__dirname, 'components'),
  path.resolve(__dirname, 'pages'),
  path.resolve(__dirname, 'styles'),
  path.resolve(__dirname, '.storybook'),
];

module.exports = function withTwin(nextConfig) {
  return {
    ...nextConfig /** 기존의 Next.js 구성을 유지하면서 */,
    webpack(config, options) {
      /** 웹팩 구성을 변경하는 함수 */
      const { dev, isServer } = options;

      /** 모듈 규칙을 추가합니다. */
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];

      config.module.rules.push({
        test: /\.(tsx|ts|js)$/ /** .tsx, .ts, .js 확장자를 가진 파일들을 대상으로 */,
        include:
          includedDirs /** includedDirs에 정의된 폴더들에서만 적용합니다. */,
        use: options?.defaultLoaders?.babel
          ? [
              options?.defaultLoaders?.babel,
              {
                loader: 'babel-loader' /** babel-loader 사용 */,
                options: {
                  sourceMaps: dev /** 개발 모드에서 소스맵 생성 */,
                  presets: [
                    [
                      '@babel/preset-react',
                      { runtime: 'automatic', importSource: '@emotion/react' },
                    ],
                  ],
                  plugins: [
                    require.resolve(
                      'babel-plugin-macros',
                    ) /** babel-plugin-macros 활성화 */,
                    require.resolve(
                      '@emotion/babel-plugin',
                    ) /** @emotion/babel-plugin 활성화 */,
                    [
                      require.resolve('@babel/plugin-syntax-typescript'),
                      { isTSX: true },
                    ],
                  ],
                },
              },
            ]
          : [
              {
                loader: 'babel-loader' /** babel-loader 사용 */,
                options: {
                  sourceMaps: dev /** 개발 모드에서 소스맵 생성 */,
                  presets: [
                    [
                      '@babel/preset-react',
                      { runtime: 'automatic', importSource: '@emotion/react' },
                    ],
                  ],
                  plugins: [
                    require.resolve(
                      'babel-plugin-macros',
                    ) /** babel-plugin-macros 활성화 */,
                    require.resolve(
                      '@emotion/babel-plugin',
                    ) /** @emotion/babel-plugin 활성화 */,
                    [
                      require.resolve('@babel/plugin-syntax-typescript'),
                      { isTSX: true },
                    ],
                  ],
                },
              },
            ],
      });

      if (!isServer) {
        /** 클라이언트 사이드 번들링일 때에만 적용되는 구성 변경 */
        config.resolve.fallback = {
          ...(config.resolve.fallback || {}),
          fs: false,
          module: false,
          path: false,
          os: false,
          crypto: false,
        };
      }

      /** nextConfig.webpack 함수가 정의되어 있으면 해당 함수를 실행하고 그렇지 않으면 변경된 구성을 반환합니다. */
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      } else {
        return config;
      }
    },
  };
};
