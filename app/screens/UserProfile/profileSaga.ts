import { call, put, takeLatest } from "redux-saga/effects";
import {
  ProfileFailure,ProfileRequest,ProfileSuccess
} from "./profileSlice";
import api from "../../services/api";
import { showLoader, hideLoader } from "../../redux/slices/loaderSlice";

export function* handleFetchProfile(action: ReturnType<typeof ProfileRequest>): any {
  try {
    yield put(showLoader())
  
const response = yield call(api.getProfile);

    yield put(ProfileSuccess(response.data));
  } catch (error: any) {
        yield put(hideLoader())

    yield put(ProfileFailure(error.message || "Failed to fetch "));
  }
}




export function* profileSaga(): Generator {
  yield takeLatest(ProfileRequest.type, handleFetchProfile);
}