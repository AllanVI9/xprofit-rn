const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts.push('svg');

// This is the new line you should add in, after the previous lines
config.resolver.unstable_enablePackageExports = false;

module.exports = config;

// const { getDefaultConfig } = require('metro-config');

// module.exports = (async () => {
//   const {
//     resolver: { sourceExts, assetExts },
//   } = await getDefaultConfig();
//   return {
//     transformer: {
//       babelTransformerPath: require.resolve('react-native-svg-transformer'),
//     },
//     resolver: {
//       assetExts: assetExts.filter(ext => ext !== 'svg'),
//       sourceExts: [...sourceExts, 'svg'],
//     },
//   };
// })();
