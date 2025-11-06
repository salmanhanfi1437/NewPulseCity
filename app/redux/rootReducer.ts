import { combineReducers } from '@reduxjs/toolkit';
import loaderReducer from './slices/loaderSlice';
import sendOtpReducer from '../screens/LoginScreen/loginSlice'
import chooseLanguageReducer from '../screens/ChooseLanguagesScreen/chooseLanguageSlice';
import signupReducer from '../screens/SignupScreen/signupSlice';
import masterQrReducer from '../screens/YourCartScreen/yourCartSlice';
import orderQrReducer from '../screens/CheckoutDetails/checkoutSlice';
 
const rootReducer = combineReducers({
  loader: loaderReducer,
  sendOtp : sendOtpReducer,
    chooseLanguage: chooseLanguageReducer,
    signup:signupReducer,
    masterQr : masterQrReducer,
    orderQr : orderQrReducer,

});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
