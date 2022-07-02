module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js', '*.json'],
        alias: {
          assets: './assets',
          config: './src/config',
          store: './src/store',
          utils: './src/utils',
          '@theme': './src/theme',
          '@screens': './src/screens',
          '@modals': './src/modals',
          '@router': './src/router',
          '@widgets': './src/widgets',
          '@components': './src/components',
        },
      },
    ],
    'react-native-reanimated/plugin',
    'jest-hoist',
  ],
};
