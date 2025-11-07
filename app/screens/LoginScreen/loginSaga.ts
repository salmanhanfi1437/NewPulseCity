import { call, put, takeLatest } from "redux-saga/effects";
import {
  sendOTPRequest,
  sendOTPSuccess,
  sendOTPFailure,
  verifyOTPRequest,
  verifyOTPSuccess,
  verifyOTPFailure,
} from "./loginSlice";
import api from "../../services/api";
import { showLoader, hideLoader } from "../../redux/slices/loaderSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import secureStorage from "../../utils/secureStorage";
import { const_authToken } from "../../types/constants";
import { MasterQrRequest } from "../YourCartScreen/yourCartSlice";
import { handleFetchMasterQr } from "../YourCartScreen/yourCartSaga";

interface VerifyOTPPayload {
  mobile: string;
  otp: string;
  fcmToken : string,
  deviceType:string,
  purpose: "LOGIN";
}

interface SendOTPPayload {
  mobile: string;
  purpose: "LOGIN";
}

/* 🔹 Saga 1 — Send OTP */
function* handleSendOTP(action: PayloadAction<string>): Generator {
  try {
    yield put(showLoader());

    const payload: SendOTPPayload = {
      mobile: action.payload,
      purpose: "LOGIN",
    };

    const response: any = yield call(api.sendOTP, payload);
    console.log("✅ Send OTP Response:", response.data);

    yield put(sendOTPSuccess(response.data));
  } catch (error: any) {
    console.log("❌ Send OTP Error:", error.message);
    yield put(sendOTPFailure(error.message || "Failed to send OTP"));
  } finally {
    yield put(hideLoader());
  }
}

/* 🔹 Saga 2 — Verify OTP */
function* handleVerifyOTP(action: PayloadAction<VerifyOTPPayload>): Generator {
  try {
    yield put(showLoader());

    const payload = {
      mobile: action.payload.mobile,
      otp: action.payload.otp,
      fcmToken : action.payload.fcmToken,
      deviceType : action.payload.deviceType.toUpperCase(),
      purpose: action.payload.purpose,
    };

    const response: any = yield call(api.verifyOTP, payload);
    console.log("✅VerifyOTPResponse:", response.data);

    if (response.data?.data?.token) {
          console.log("OTPToken:", response.data?.data?.token);
       yield call([secureStorage, secureStorage.setItem], const_authToken, response.data.data?.token);
       }

    yield put(verifyOTPSuccess(response.data));
  } catch (error: any) {
    console.log("❌ Verify OTP Error:", error.message);
    yield put(verifyOTPFailure(error.message || "OTP verification failed"));
  } finally {
    yield put(hideLoader());
  }
}

/* 🔹 Root saga for login */
export function* loginSaga(): Generator {
  yield takeLatest(sendOTPRequest.type, handleSendOTP);
  yield takeLatest(verifyOTPRequest.type, handleVerifyOTP);
}