const path = require('path');

module.exports = {
  dependencies: {
    'react-native-svg': {
      root: path.join(__dirname, 'node_modules', 'react-native-svg'),
    },
  },
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
    namespace: 'ai.zuvystore.com',
  },
};
