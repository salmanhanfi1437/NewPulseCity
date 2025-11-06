import { call, put, takeLatest } from "redux-saga/effects";
import {
 MasterQrFailure,MasterQrRequest,MasterQrSuccess,OrderQrFailure,OrderQrRequest,OrderQrSuccess} from "./yourCartSlice";
import api from "../../services/api";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { PayloadAction } from "@reduxjs/toolkit";


export function* handleFetchMasterQr(action: ReturnType<typeof MasterQrRequest>): any {
  try {
    yield put(showLoader());

    // ✅ Directly call apiClient method
    const response = yield call(api.getMasterQr);

    yield put(MasterQrSuccess(response.data));
  } catch (error: any) {
    yield put(MasterQrFailure(error.message || "Failed to fetch roles"));
  }
  finally{
        yield put(hideLoader());

  }
}


export function* handleOrderQr(action: PayloadAction<{ quantity: number }>): Generator {
  try {
    yield put(showLoader());

    const { quantity } = action.payload; // ✅ extract quantity

    // ✅ Call your API with quantity
    const response: any = yield call(api.orderQr, { quantity });
    console.log("✅ Create Order Response:", response.data);

    yield put(OrderQrSuccess(response.data));
  } catch (error: any) {
    console.log("❌ Order QR Error:", error.message);
    yield put(OrderQrFailure(error.message || "Failed to create order QR"));
  } finally {
    yield put(hideLoader());
  }
}


export function* masterQrSaga(): Generator {
  yield takeLatest(MasterQrRequest.type, handleFetchMasterQr);
  yield takeLatest(OrderQrRequest.type,handleOrderQr);
}