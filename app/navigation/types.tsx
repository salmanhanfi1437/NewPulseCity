import { StackScreenProps } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  ChooseLanguage: undefined;
  Login: undefined;
  OnBoard: undefined;
    signup: { mobile: string }; // ✅ Add expected param type here
    merchantTabs: NavigatorScreenParams<MerchantTabParamList>; // ✅ fix here
  verifyIdentity: undefined;
  kycompleted: undefined;
  yourCart: undefined;
  Profile: undefined;
  EditQRDetails: undefined;
  QRManageMent: undefined;
  notifications: undefined;
  CheckOutDetail: { data: any };
  PromoScreen:undefined;
  StateCitySelector: {
    type: 'state' | 'city';
    stateId?: string;
    onSelect: (selected: any) => void;
  };};

// ✅ Define Bottom Tab Param List separately
export type MerchantTabParamList = {
  merchantHomeScreen: {data: any};
  QRScreen: undefined;
  AnalyticsScreen: undefined;
  NetworkScreen: undefined;
  SettingsScreen: undefined;
    ZuvyDashBoard: {data: any};
};

// Stack screens props
export type QRManageMent = StackScreenProps<RootStackParamList, 'QRManageMent'>;
export type EditQRDetails = StackScreenProps<
  RootStackParamList,
  'EditQRDetails'
>;
// export type ZuvyDashBoard = StackScreenProps<
//   RootStackParamList,
//   'ZuvyDashBoard'
// >;
export type ProfileProps = StackScreenProps<RootStackParamList, 'Profile'>;
export type onBoarding = StackScreenProps<RootStackParamList, 'OnBoard'>
export type SplashProps = StackScreenProps<RootStackParamList, 'Splash'>
export type ChooseLanguagesProps = StackScreenProps<RootStackParamList,'ChooseLanguage'>
export type LoginProps = StackScreenProps<RootStackParamList, 'Login'>
export type SignupProps = StackScreenProps<RootStackParamList, 'signup'>
export type verifyIdentityProps = StackScreenProps<RootStackParamList, 'verifyIdentity'>
export type kycompletedProps = StackScreenProps<RootStackParamList,'kycompleted'>
export type yourCartProps = StackScreenProps<RootStackParamList,'yourCart'>
export type NotificationsProps = StackScreenProps<RootStackParamList,'notifications'>
export type CheckOutDetailProps = StackScreenProps<RootStackParamList,'CheckOutDetail'>
export type PromoScreenProps = StackScreenProps<RootStackParamList,'PromoScreen'>
export type  StateCitySelectorProps = StackScreenProps<RootStackParamList,'StateCitySelector'>

// ✅ Tab screens props (IMPORTANT FIX)
export type MerchantHomeScreenProps = BottomTabScreenProps<
  MerchantTabParamList,
  'merchantHomeScreen'
>;
