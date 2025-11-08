import { call, put, takeLatest } from "redux-saga/effects";
import {
  NotificationFailure,
  NotificationRequest,
  NotificationSuccess,
} from "./notificationSlice";
import api from "../../services/api";
import { showLoader, hideLoader } from "../../redux/slices/loaderSlice";

export function* handleFetchNotifications(
  action: ReturnType<typeof NotificationRequest>
): Generator<any, void, any> {
  try {
    yield put(showLoader());

    const { page, limit, type } = action.payload; // ✅ fully typed

    const response = yield call(api.notifications, page, limit, type);

    yield put(NotificationSuccess(response.data));
  } catch (error: any) {
    yield put(NotificationFailure(error.message || "Failed to fetch notifications"));
  } finally {
    yield put(hideLoader());
  }
}

export function* notificationSaga(): Generator {
  yield takeLatest(NotificationRequest.type, handleFetchNotifications);
}