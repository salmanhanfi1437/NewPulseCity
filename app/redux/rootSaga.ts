import { all, fork } from 'redux-saga/effects';
import { chooseLanguageSaga } from '../screens/ChooseLanguagesScreen/chooseLanguageSaga';
import { loginSaga } from '../screens/LoginScreen/loginSaga';
import {signupSaga} from '../screens/SignupScreen/signUpSaga';
import {masterQrSaga} from '../screens/YourCartScreen/yourCartSaga';
import {checkoutSaga} from '../screens/CheckoutDetails/checkOutSaga';
//here we will define all sagas
// import stateCitySaga from '../components/atoms/State&City/StateCitySaga';
import {profileSaga} from '../screens/UserProfile/profileSaga'
 //here we will define all sagas

export default function* rootSaga() {
  yield all([
    //fork(chooseLanguageSaga), 
    fork(loginSaga),
    fork(signupSaga),
    fork(masterQrSaga),
    fork(checkoutSaga),
    fork(checkoutSaga),
    // fork(stateCitySaga),
    fork(profileSaga)
  
  
  ]);
}
