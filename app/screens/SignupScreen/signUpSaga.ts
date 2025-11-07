import { call, put, takeLatest } from "redux-saga/effects";
import {
  RoleFailure,
  RoleRequest,
  RoleSuccess,
  SignupFailure,SignupRequest,SignupSuccess
} from "./signupSlice";
import api from "../../services/api";
import { showLoader, hideLoader } from "../../redux/slices/loaderSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import secureStorage from "../../utils/secureStorage";
import { const_authToken } from "../../types/constants";

export function* handleFetchRoles(action: ReturnType<typeof RoleRequest>): any {
  try {

    // ✅ Directly call apiClient method
const response = yield call(api.getRoles);

    yield put(RoleSuccess(response.data));
  } catch (error: any) {
    yield put(RoleFailure(error.message || "Failed to fetch roles"));
  }
}


function* handleSignup(action: PayloadAction<SignupRequest>): Generator {
  try {
    yield put(showLoader());

    const response: any = yield call(api.signup, action.payload);
    console.log("✅handleSignupResponse:", response.data);

     if (response.data?.data?.token) {
              console.log("OTPToken:", response.data?.data?.token);
           yield call([secureStorage, secureStorage.setItem], const_authToken, response.data.data?.token);
           }

    yield put(SignupSuccess(response.data));
  } catch (error: any) {
    console.log("❌ Verify OTP Error:", error.message);
    yield put(SignupFailure(error.message || "OTP verification failed"));
  } finally {
    yield put(hideLoader());
  }
}

export function* signupSaga(): Generator {
  yield takeLatest(SignupRequest.type, handleSignup);
  yield takeLatest(RoleRequest.type,handleFetchRoles);
}