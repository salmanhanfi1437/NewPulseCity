import { combineReducers } from '@reduxjs/toolkit';
import loaderReducer from './slices/loaderSlice';
import sendOtpReducer from '../screens/LoginScreen/loginSlice'
import chooseLanguageReducer from '../screens/ChooseLanguagesScreen/chooseLanguageSlice';
import signupReducer from '../screens/SignupScreen/signupSlice';
import masterQrReducer from '../screens/YourCartScreen/yourCartSlice';
import orderQrReducer from '../screens/CheckoutDetails/checkoutSlice';
import stateCityReducer from '../components/atoms/State&City/StateCitySlice';
import profileReducer from '../screens/UserProfile/profileSlice';
import dashboardReducer from '../screens/DashBoard/dashboardSlice';
import notificationReducer from '../screens/NotificationScreen/notificationSlice'

 
const appReducer = combineReducers({
  loader: loaderReducer,
  sendOtp : sendOtpReducer,
    chooseLanguage: chooseLanguageReducer,
    signup:signupReducer,
    masterQr : masterQrReducer,
    orderQr : orderQrReducer,
    stateCity : stateCityReducer,
    profile : profileReducer,
    dashboard : dashboardReducer,
    notification : notificationReducer
});

// ✅ Wrap the combined reducer to handle store reset
const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_APP') {
    state = undefined; // 🔥 This resets the whole Redux state
  }
  return appReducer(state, action);
};


export default rootReducer;
export type RootState = ReturnType<typeof appReducer>;
