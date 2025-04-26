const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

const defConfig = mergeConfig(getDefaultConfig(__dirname), config);
const nativeWindConfig = withNativeWind(defConfig, { input: './global.css', inlineRem: 16 });
const reanimatedConfig = wrapWithReanimatedMetroConfig(nativeWindConfig);

module.exports = reanimatedConfig;
