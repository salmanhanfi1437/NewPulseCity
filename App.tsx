import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './src/navigation/RootStack';
import { LanguageProvider } from './src/context/LanguageContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </LanguageProvider>
    </SafeAreaProvider>
  );
};

export default App;