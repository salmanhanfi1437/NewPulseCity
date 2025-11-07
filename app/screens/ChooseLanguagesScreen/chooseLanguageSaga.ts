import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchLanguagesRequest, fetchLanguagesSuccess, fetchLanguagesFailure } from './chooseLanguageSlice';
import api from '../../services/api';

function* handleFetchLanguages() {
  // try {
  //   const response = yield call(api.getLanguages);
  //   yield put(fetchLanguagesSuccess(response.data.languages));
  // } catch (error: any) {
  //   yield put(fetchLanguagesFailure(error.message));
  // }
}

export function* chooseLanguageSaga() {
  yield takeLatest(fetchLanguagesRequest.type, handleFetchLanguages);
}
