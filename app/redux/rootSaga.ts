import { all, fork } from 'redux-saga/effects';
import { chooseLanguageSaga } from '../screens/ChooseLanguagesScreen/chooseLanguageSaga';
import { loginSaga } from '../screens/LoginScreen/loginSaga';
import {signupSaga} from '../screens/SignupScreen/signUpSaga';
//here we will define all sagas

export default function* rootSaga() {
  yield all([
    //fork(chooseLanguageSaga), 
    fork(loginSaga),
    fork(signupSaga)
  
  
  ]);
}
