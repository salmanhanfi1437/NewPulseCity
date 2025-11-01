const path = require('path');

module.exports = {
  dependencies: {
    'react-native-svg': {
      root: path.resolve(__dirname, 'node_modules/react-native-svg'),
      sourceDir: path.resolve(__dirname, 'node_modules/react-native-svg', 'android'),
    },
  },
  project: {
    android: {
      sourceDir: path.resolve(__dirname, 'android'),
    },
    ios: {
      sourceDir: path.resolve(__dirname, 'ios'),
    },
  },
  codegenConfig: {
    name: 'ZuvyStore',
    namespace: 'ai.zuvystore.com',
  },
};
