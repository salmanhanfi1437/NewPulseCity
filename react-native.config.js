// react-native.config.js
const path = require('path');

module.exports = {
  dependencies: {
    // Example: if you have custom native modules, define them like this:
    // 'react-native-your-module': {
    //   root: path.join(__dirname, 'node_modules/react-native-your-module'),
    // },
  },
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
    namespace: 'ai.zuvystore.com', // Must match your AndroidManifest.xml
  },
};
