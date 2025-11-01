// react-native.config.js
module.exports = {
  dependencies: {},
  project: {
    android: {
      sourceDir: './android',
    },
    ios: {
      sourceDir: './ios',
    },
  },
  codegenConfig: {
    name: 'ZuvyStore',
    namespace: 'com.zuvystore', // Must match your Android appId (see AndroidManifest.xml)
  },
};
