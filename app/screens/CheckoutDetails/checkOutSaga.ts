import { call, put, takeLatest } from 'redux-saga/effects';
import {
  checkOutRequest,
  checkOutSuccess,
  checkOutFailure,
  VerifyRazorPayRequest,
  VerifyRazorPaySuccess,
  VerifyRazorPayFailure,
} from './checkoutSlice';
import api from '../../services/api';
import { showLoader, hideLoader } from '../../redux/slices/loaderSlice';
import { PayloadAction } from '@reduxjs/toolkit';

// 🔹 Handle Checkout API
function* handleCheckOut(action: PayloadAction<any>): Generator {
  try {
    yield put(showLoader());

    const response: any = yield call(api.checkOutQr, action.payload);
    console.log('✅ checkOut Response:', response.data);

    yield put(checkOutSuccess(response.data));
  } catch (error: any) {
    console.error('❌ checkOut Error:', error.message);
    yield put(checkOutFailure(error.message || 'Checkout failed'));
  } finally {
    yield put(hideLoader());
  }
}

function* handleRazorPayment(action: PayloadAction<any>): Generator {
  try {
    yield put(showLoader());

    const response: any = yield call(api.VerifyRazorPayPayment, action.payload);
    console.log('✅ checkOut Response:', response.data);

    yield put(VerifyRazorPaySuccess(response.data));
  } catch (error: any) {
    console.error('❌ checkOut Error:', error.message);
    yield put(VerifyRazorPayFailure(error.message || 'Checkout failed'));
  } finally {
    yield put(hideLoader());
  }
}

// 🔹 Watcher saga
export function* checkoutSaga(): Generator {
  yield takeLatest(checkOutRequest.type, handleCheckOut);
}

export function* RazorPaymentSaga(): Generator {
  yield takeLatest(VerifyRazorPayRequest.type, handleRazorPayment);
}
