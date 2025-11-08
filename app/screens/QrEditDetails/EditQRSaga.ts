import { call, put, takeLatest, Effect } from 'redux-saga/effects';
import api from '../../services/api';
import { editQrRequest, editQrSuccess, editQrError } from './EditQrSlice';
import { showLoader, hideLoader } from '../../redux/slices/loaderSlice';

// Worker saga
function* handleEditQr(
  action: ReturnType<typeof editQrRequest>
): Generator<any, void, any> { 
  try {
    yield put(showLoader());
    const response: any = yield call(api.updateQrDetails, action.payload); 
    yield put(editQrSuccess(response.data));
  } catch (error: any) {
    yield put(editQrError(error.message || 'Failed to update QR'));
  } finally {
    yield put(hideLoader());
  }
}

// Watcher saga
export function* watchEditQr(): Generator {
  yield takeLatest(editQrRequest.type, handleEditQr);
}
