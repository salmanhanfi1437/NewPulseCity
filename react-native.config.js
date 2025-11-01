const path = require('path');

// react-native.config.js
module.exports = {
  dependencies: {},
  project: {
    android: { 
      sourceDir: './android',
      packageName: 'ai.zuvystore.com', 
    },
    ios: { sourceDir: './ios' },
  },
  codegenConfig: {
    name: 'ZuvyStore',
    namespace: 'ai.zuvystore.com',
    // Exclude libraries that don't have codegen support
    excludedLibraries: [
      'react-native-vector-icons',
      'react-native-safe-area-context',
      'react-native-gesture-handler',
      'react-native-screens',
      'react-native-localize',
      'react-native-pager-view',
      '@react-native-async-storage/async-storage',
    ],
  },
};

