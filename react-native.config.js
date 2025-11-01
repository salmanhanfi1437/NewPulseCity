// react-native.config.js
const path = require('path');

module.exports = {
  dependencies: {},
  project: {
    android: {
      sourceDir: path.join(__dirname, 'android'),
    },
    ios: {
      sourceDir: path.join(__dirname, 'ios'),
    },
  },
  codegenConfig: {
    name: 'ZuvyStore',
    namespace: 'ai.zuvystore.com', // Must match AndroidManifest.xml
  },
};
