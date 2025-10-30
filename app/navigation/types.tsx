// navigation/types.ts

import { StackScreenProps } from '@react-navigation/stack'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

export type RootStackParamList = {
  Splash: undefined;
  ChooseLanguage : undefined;
  Login: undefined;
  OnBoard: undefined;
  signup: undefined;
  merchantTabs: undefined; // contains bottom tabs
  verifyIdentity:undefined;
  kycompleted:undefined;
  yourCart : undefined;
  notifications: undefined;
}

// ✅ Define Bottom Tab Param List separately
export type MerchantTabParamList = {
  merchantHomeScreen: undefined;
  QRScreen: undefined;
  AnalyticsScreen: undefined;
  NetworkScreen: undefined;
  SettingsScreen: undefined;
}

// Stack screens props
export type onBoarding = StackScreenProps<RootStackParamList, 'OnBoard'>
export type SplashProps = StackScreenProps<RootStackParamList, 'Splash'>
export type ChooseLanguagesProps = StackScreenProps<RootStackParamList,'ChooseLanguage'>
export type LoginProps = StackScreenProps<RootStackParamList, 'Login'>
export type SignupProps = StackScreenProps<RootStackParamList, 'signup'>
export type verifyIdentityProps = StackScreenProps<RootStackParamList, 'verifyIdentity'>
export type kycompletedProps = StackScreenProps<RootStackParamList,'kycompleted'>
export type yourCartProps = StackScreenProps<RootStackParamList,'yourCart'>
export type NotificationsProps = StackScreenProps<RootStackParamList,'notifications'>

// ✅ Tab screens props (IMPORTANT FIX)
export type MerchantHomeScreenProps = BottomTabScreenProps<
  MerchantTabParamList,
  'merchantHomeScreen'
>
