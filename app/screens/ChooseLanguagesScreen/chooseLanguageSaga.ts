import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchAppVersion, resetAppVersionData, setAppVersionData } from './chooseLanguageSlice';
import api from '../../services/api';

function* handleGetAppVersion() : Generator {
  try {
    const response = yield call(api.getAppVersions);

    yield put(setAppVersionData(response.data));
  } catch (error: any) {
    yield put(resetAppVersionData(error.message));
  }
}

export function* chooseLanguageSaga() {
  yield takeLatest(fetchAppVersion.type, handleGetAppVersion);
}
