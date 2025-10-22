import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base'; 
import { RootStackParamList } from './types';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen  from "../screens/OnboardingScreen"
import { login, splash,onBoarding } from '../types/constants';
import SignupScreens from '../screens/SignupScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NativeBaseProvider>
      <StatusBar barStyle="default" translucent={true} backgroundColor="transparent" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, 
          }}
        >
          <Stack.Screen name={splash} component={SplashScreen} />
          <Stack.Screen name={onBoarding} component={OnboardingScreen} />
          <Stack.Screen name={login} component={LoginScreen} />
           <Stack.Screen name ={'signup'} component={SignupScreens}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default RootNavigator;