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
import OnboardingScreen from '../screens/OnboardingScreen';
import {
  login,
  splash,
  onBoarding,
  verifyIdentity,
  kycompleted,
  yourCart,
  notifications,
} from '../types/constants';
import SignupScreens from '../screens/SignupScreen';
import SplashScreen from '../screens/SplashScreen';
import UserProfile from '../screens/UserProfile';
import ZuvyDashBoard from '../screens/DashBoard';
import merchantTabs from './bottomtabs/merchantTabs';
import ChooseLanguagesScreen from '../screens/ChooseLanguagesScreen';
import '../localization/i18n';
import VerificationIdentityScreens from '../screens/VerificationIdentityScreens';
import VerificationCompleteScreen from '../screens/VerificationCompleteScreen';
import YourCartScreen from '../screens/YourCartScreen';
import EditQR from '../screens/QrEditDetails';
import QRManageMent from '../screens/QrManagement';
import { LogBox, DevSettings } from 'react-native';
import NotificationScreen from '../screens/NotificationScreen';
import { navigationRef } from './NavigationService';


if (__DEV__) {
  const DevSettingsAny = DevSettings as any;

  if (DevSettingsAny?.openDevMenu) {
    DevSettingsAny.openDevMenu = () => {};
  }
  if (DevSettingsAny?.reload) {
    DevSettingsAny.reload = () => {};
  }

  LogBox.ignoreAllLogs(true);
}

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle="default"
        translucent={true}
        backgroundColor="transparent"
      />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <Stack.Screen name={splash} component={SplashScreen} />
          <Stack.Screen
            name="ChooseLanguage"
            component={ChooseLanguagesScreen}
          />
          <Stack.Screen name={onBoarding} component={OnboardingScreen} />
          <Stack.Screen name={login} component={LoginScreen} />
          <Stack.Screen name={'signup'} component={SignupScreens} />
          <Stack.Screen name={'merchantTabs'} component={merchantTabs} />
          <Stack.Screen name={'QRManageMent'} component={QRManageMent} />
          <Stack.Screen name={'EditQRDetails'} component={EditQR} />
          <Stack.Screen name={'Profile'} component={UserProfile} />
          <Stack.Screen name={'ZuvyDashBoard'} component={ZuvyDashBoard} />
          <Stack.Screen name={notifications} component={NotificationScreen} />
          <Stack.Screen
            name={verifyIdentity}
            component={VerificationIdentityScreens}
          />
          <Stack.Screen
            name={kycompleted}
            component={VerificationCompleteScreen}
          />
          <Stack.Screen name={yourCart} component={YourCartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default RootNavigator;

//LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  'Warning: Each child in a list should have a unique "key" prop',
  'Require cycle:',
]);
