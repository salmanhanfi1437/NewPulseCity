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
import { login, splash,onBoarding, verifyIdentity, kycompleted, yourCart, notifications } from '../types/constants';
import SignupScreens from '../screens/SignupScreen';
import SplashScreen from '../screens/SplashScreen';
import merchantTabs from './bottomtabs/merchantTabs';
import ChooseLanguagesScreen from '../screens/ChooseLanguagesScreen';
import '../localization/i18n';
import VerificationIdentityScreens from '../screens/VerificationIdentityScreens';
import VerificationCompleteScreen from '../screens/VerificationCompleteScreen';
import YourCartScreen from '../screens/YourCartScreen';
import NotificationScreen from '../screens/NotificationScreen';


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
          <Stack.Screen name="ChooseLanguage" component={ChooseLanguagesScreen}/>
          <Stack.Screen name={onBoarding} component={OnboardingScreen} />
          <Stack.Screen name={login} component={LoginScreen} />
           <Stack.Screen name ={'signup'} component={SignupScreens}/>
           <Stack.Screen name={'merchantTabs'} component={merchantTabs}/>
           <Stack.Screen name={verifyIdentity} component={VerificationIdentityScreens}/>
           <Stack.Screen name={kycompleted} component={VerificationCompleteScreen}/>
           <Stack.Screen name={yourCart} component={YourCartScreen}/>
           <Stack.Screen name={notifications} component={NotificationScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default RootNavigator;