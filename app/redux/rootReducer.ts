import { combineReducers } from '@reduxjs/toolkit';
import loaderReducer from './slices/loaderSlice';
import chooseLanguageReducer from '../screens/ChooseLanguagesScreen/chooseLanguageSlice';
// import homeReducer from './features/home/homeSlice';
// import profileReducer from './features/profile/profileSlice';

const rootReducer = combineReducers({
  loader: loaderReducer,
    chooseLanguage: chooseLanguageReducer,
//   home: homeReducer,
//   profile: profileReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
