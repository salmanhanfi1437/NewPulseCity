import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  OnBoard: undefined;
  signup: undefined;
  Profile: undefined;
  ZuvyDashBoard: undefined;
};
export type ZuvyDashBoard = StackScreenProps<
  RootStackParamList,
  'ZuvyDashBoard'
>;
export type onBoarding = StackScreenProps<RootStackParamList, 'OnBoard'>;
export type SplashProps = StackScreenProps<RootStackParamList, 'Splash'>;
export type LoginProps = StackScreenProps<RootStackParamList, 'Login'>;
export type SignupProps = StackScreenProps<RootStackParamList, 'signup'>;
export type ProfileProps = StackScreenProps<RootStackParamList, 'Profile'>;
