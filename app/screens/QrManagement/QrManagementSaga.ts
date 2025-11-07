import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchViewQRRequest,
  fetchViewQRSuccess,
  fetchViewQRError,
} from './QrmanagementSlice';
import api from '../../services/api';

// Optional static token for now
const STATIC_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNzdlN2VlYS1iZDU1LTQ2MGEtYWE0NC0xNjNmMzM1ZmE0MGUiLCJpYXQiOjE3NjI1MDIxNjIsImV4cCI6MTc2MzEwNjk2Mn0.2A1OzYcbj1_W23JyoYOi_ugYKZGXapGMkpmqDQoGlgc';


function* handleFetchViewQR(action: ReturnType<typeof fetchViewQRRequest>):any {
  try {
    const params = action.payload || { page: 1, limit: 10, search: 'Premium' };
    const response = yield call(api.viewQR, params);
    yield put(fetchViewQRSuccess(response.data));
  } catch (error: any) {
    yield put(fetchViewQRError(error.message));
  }
}

export function* qrManagementWatcher() {
  yield takeLatest(fetchViewQRRequest.type, handleFetchViewQR);
}
