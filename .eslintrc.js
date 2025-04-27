module.exports = {
  root: true,
  extends: [
    '@react-native', // React Native lint rules
    'plugin:prettier/recommended', // Prettier lint rules
  ],
  plugins: ['prettier'], // Make sure prettier plugin is loaded
  rules: {
    'prettier/prettier': 'error', // <-- This shows prettier problems as ESLint errors
    'react-native/no-inline-styles': 'off', // your custom rule
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/no-unstable-nested-components': 'off',
  },
};
