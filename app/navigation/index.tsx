import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base'; // is a context provider that wraps your entire app to enable the NativeBase UI library — giving you access to its:
import { RootStackParamList } from './types';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen  from "../screens/OnboardingScreen"
import { login, splash,onBoarding } from '../types/constants';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NativeBaseProvider>
      <StatusBar barStyle="default" translucent={true} backgroundColor="transparent" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, //controls how the transistion animation looks when navigating between screens
          }}
        >
          <Stack.Screen name={splash} component={SplashScreen} />
          <Stack.Screen name={onBoarding} component={OnboardingScreen} />
          <Stack.Screen name={login} component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default RootNavigator;
