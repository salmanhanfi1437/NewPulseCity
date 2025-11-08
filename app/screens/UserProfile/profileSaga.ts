import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  ProfileFailure,
  ProfileRequest,
  ProfileSuccess,
  LogoutRequest,
  LogoutSuccess,
  LogoutFailure,
} from "./profileSlice";
import api from "../../services/api";
import { showLoader, hideLoader } from "../../redux/slices/loaderSlice";
import secureStorage from "../../utils/secureStorage";

// ✅ Fetch Profile
export function* handleFetchProfile(action: ReturnType<typeof ProfileRequest>): any {
  try {
    yield put(showLoader());

    const response = yield call(api.getProfile);

    yield put(ProfileSuccess(response.data));
  } catch (error: any) {
    yield put(ProfileFailure(error.message || "Failed to fetch profile"));
  } finally {
    yield put(hideLoader());
  }
}

// ✅ Handle Logout
export function* handleLogout(): any {
  try {
    yield put(showLoader());

    const response = yield call(api.doLogout);

    if (response.status === 200) {
      // ✅ Clear local storage (token, user data, etc.)
      yield call(secureStorage.clearAll);

      // ✅ Dispatch logout success
          yield put(LogoutSuccess(response.data));

      // ✅ Navigate to login screen (optional)
      //yield call(navigation, "Login");
    } else {
      yield put(LogoutFailure("Logout failed"));
    }
  } catch (error: any) {
    yield put(LogoutFailure(error.message || "Logout failed"));
  } finally {
    yield put(hideLoader());
  }
}

// ✅ Root saga for profile-related actions
export function* profileSaga(): Generator {
  yield all([
    takeLatest(ProfileRequest.type, handleFetchProfile),
    takeLatest(LogoutRequest.type, handleLogout),
  ]);
}