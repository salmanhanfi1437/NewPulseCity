  import { combineReducers } from '@reduxjs/toolkit';
import loaderReducer from './slices/loaderSlice';
import sendOtpReducer from '../screens/LoginScreen/loginSlice';
import chooseLanguageReducer from '../screens/ChooseLanguagesScreen/chooseLanguageSlice';
import signupReducer from '../screens/SignupScreen/signupSlice';
import masterQrReducer from '../screens/YourCartScreen/yourCartSlice';
import orderQrReducer from '../screens/CheckoutDetails/checkoutSlice';
import stateCityReducer from '../components/atoms/State&City/StateCitySlice';
import profileReducer from '../screens/UserProfile/profileSlice';
import dashboardReducer from '../screens/DashBoard/dashboardSlice';
import notificationReducer from '../screens/NotificationScreen/notificationSlice';
import VerifyRazorPayment from '../screens/CheckoutDetails/checkoutSlice';
import qrManagementReducer from '../screens/QrManagement/QrmanagementSlice';
import editQrReducer from '../screens/QrEditDetails/EditQrSlice';

const AppReducer = combineReducers({
  loader: loaderReducer,
  sendOtp: sendOtpReducer,
  chooseLanguage: chooseLanguageReducer,
  signup: signupReducer,
  masterQr: masterQrReducer,
  orderQr: orderQrReducer,
  stateCity: stateCityReducer,
  profile: profileReducer,
  dashboard: dashboardReducer,
  notification: notificationReducer,
  verifyRazorPayment: VerifyRazorPayment,
  qrManagement: qrManagementReducer,
  fetchInventory: qrManagementReducer,
  editQr: editQrReducer,
});

// ✅ Wrap the combined reducer to handle store reset
const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_APP') {
    state = undefined; // resets the whole Redux state
  }
  return AppReducer(state, action); // call the combined reducer
};

export default rootReducer;
export type RootState = ReturnType<typeof AppReducer>;