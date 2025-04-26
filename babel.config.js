module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'], // This is where the root of your project will be considered
        alias: {
          '@app': './src',
        },
      },
    ],
  ],
};
