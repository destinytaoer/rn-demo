module.exports = {
  presets: ['module:metro-react-native-babel-preset', '@babel/preset-flow'],
  plugins: [
    '@babel/transform-flow-strip-types',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    ['@babel/plugin-transform-runtime', {}],
    [
      'module-resolver',
      {
        root: './src', // 绝对路径的根目录
        alias: {
          // 配置别名即可
          '@/utils': './src/utils',
          '@/components': './src/components',
          '@/assets': './src/assets',
          '@/pages': './src/pages',
          '@/navigator': './src/navigator',
        },
      },
    ],
  ],
};
