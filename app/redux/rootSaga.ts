import { all, fork } from 'redux-saga/effects';
import { chooseLanguageSaga } from '../screens/ChooseLanguagesScreen/chooseLanguageSaga';

//here we will define all sagas

export default function* rootSaga() {
  yield all([
    fork(chooseLanguageSaga), 
    //fork(profileSaga)
  
  
  ]);
}
