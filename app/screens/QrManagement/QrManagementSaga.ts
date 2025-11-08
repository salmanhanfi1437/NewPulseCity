import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchViewQRRequest,
  fetchViewQRSuccess,
  fetchViewQRError,
    fetchInventoryRequest,
  fetchInventorySuccess,
  fetchInventoryError
} from './QrmanagementSlice';
import api from '../../services/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { hideLoader, showLoader } from '../../redux/slices/loaderSlice';

// Optional static token for now

export function* handleFetchViewQR(
  action: PayloadAction<{ quantity: number }>,
): Generator {
  try {
    yield put(showLoader());

    const params = action.payload;
    const response: any = yield call(api.viewQR,params);
    
    console.log('✅ Create Order Response:', response.data);
    yield put(fetchViewQRSuccess(response.data));
  } catch (error: any) {
    console.log('❌ Order QR Error:', error.message);
    yield put(fetchViewQRError(error.message || 'Failed to create order QR'));
  } finally {
    yield put(hideLoader());
  }
}

export function* handleinventory(
  action: PayloadAction<{ quantity: number }>,
): Generator {
  try {
    yield put(showLoader());

    const response: any = yield call(api.getDashboard);
    
    console.log('✅ Create Order Response:', response.data);
    yield put(fetchInventorySuccess(response.data));
  } catch (error: any) {
    console.log('❌ Order QR Error:', error.message);
    yield put(fetchInventoryError(error.message || 'Failed to create order QR'));
  } finally {
    yield put(hideLoader());
  }
}


export function* qrManagementWatcher() {
  yield takeLatest(fetchViewQRRequest.type, handleFetchViewQR);
}

export function* InventoryWatcher() {
  yield takeLatest(fetchInventoryRequest.type, handleinventory);
}
