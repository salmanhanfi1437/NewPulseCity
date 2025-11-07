import { all, fork } from 'redux-saga/effects';
import { chooseLanguageSaga } from '../screens/ChooseLanguagesScreen/chooseLanguageSaga';
import { loginSaga } from '../screens/LoginScreen/loginSaga';
import {signupSaga} from '../screens/SignupScreen/signUpSaga';
import {masterQrSaga} from '../screens/YourCartScreen/yourCartSaga';
import {checkoutSaga} from '../screens/CheckoutDetails/checkOutSaga';
import stateCitySaga from '../components/atoms/State&City/StateCitySaga';
import {profileSaga} from '../screens/UserProfile/profileSaga';
import {dashboardSaga} from '../screens/DashBoard/dashboardSaga';
import { DashBoardSVG } from '../assets/svg';
import { qrManagementWatcher } from '../screens/QrManagement/QrManagementSaga';


export default function* rootSaga() {
  yield all([
    //fork(chooseLanguageSaga), 
    fork(loginSaga),
    fork(signupSaga),
    fork(masterQrSaga),
    fork(checkoutSaga),
    fork(stateCitySaga),
    fork(profileSaga),
    fork(dashboardSaga),
    fork(checkoutSaga),
    // fork(stateCitySaga),
    fork(profileSaga),
    fork(qrManagementWatcher)
  
  
  ]);
}
