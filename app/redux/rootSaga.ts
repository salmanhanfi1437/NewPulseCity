import { all, fork } from 'redux-saga/effects';
import { chooseLanguageSaga } from '../screens/ChooseLanguagesScreen/chooseLanguageSaga';
import { loginSaga } from '../screens/LoginScreen/loginSaga';
import {signupSaga} from '../screens/SignupScreen/signUpSaga';
import {masterQrSaga} from '../screens/YourCartScreen/yourCartSaga';
import {checkoutSaga, RazorPaymentSaga} from '../screens/CheckoutDetails/checkOutSaga';
import stateCitySaga from '../components/atoms/State&City/StateCitySaga';
import {profileSaga} from '../screens/UserProfile/profileSaga';
import {dashboardSaga} from '../screens/DashBoard/dashboardSaga';
import {notificationSaga} from '../screens/NotificationScreen/notificationSaga';
import { DashBoardSVG } from '../assets/svg';
import { qrManagementWatcher,InventoryWatcher } from '../screens/QrManagement/QrManagementSaga';
import {watchEditQr} from '../screens/QrEditDetails/EditQRSaga'


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
    fork(profileSaga),
    fork(qrManagementWatcher),
    fork(notificationSaga),  
    fork(RazorPaymentSaga),
    fork(InventoryWatcher),
    fork(watchEditQr)

  ]);
}
