const path = require('path');

module.exports = {
  dependencies: {
    '@react-native-async-storage/async-storage': {
      root: path.resolve(__dirname, 'node_modules/@react-native-async-storage/async-storage'),
    },
    'react-native-gesture-handler': {
      root: path.resolve(__dirname, 'node_modules/react-native-gesture-handler'),
    },
    'react-native-localize': {
      root: path.resolve(__dirname, 'node_modules/react-native-localize'),
    },
    'react-native-pager-view': {
      root: path.resolve(__dirname, 'node_modules/react-native-pager-view'),
    },
    'react-native-safe-area-context': {
      root: path.resolve(__dirname, 'node_modules/react-native-safe-area-context'),
    },
    'react-native-screens': {
      root: path.resolve(__dirname, 'node_modules/react-native-screens'),
    },
    'react-native-svg': {
      root: path.resolve(__dirname, 'node_modules/react-native-svg'),
    },
    'react-native-vector-icons': {
      root: path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
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
