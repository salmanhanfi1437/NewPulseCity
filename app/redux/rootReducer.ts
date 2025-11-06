import { combineReducers } from '@reduxjs/toolkit';
import loaderReducer from './slices/loaderSlice';
import sendOtpReducer from '../screens/LoginScreen/loginSlice'
import chooseLanguageReducer from '../screens/ChooseLanguagesScreen/chooseLanguageSlice';
import signupReducer from '../screens/SignupScreen/signupSlice';

const rootReducer = combineReducers({
  loader: loaderReducer,
  sendOtp : sendOtpReducer,
    chooseLanguage: chooseLanguageReducer,
    signup:signupReducer,

});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
