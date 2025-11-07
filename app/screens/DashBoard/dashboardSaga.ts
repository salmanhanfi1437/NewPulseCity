import { call, put, takeLatest } from "redux-saga/effects";
import {
  DashboardFailure,DashboardRequest,DashboardSuccess
} from "./dashboardSlice";
import api from "../../services/api";
import { showLoader, hideLoader } from "../../redux/slices/loaderSlice";

export function* handleFetchDashboardData(action: ReturnType<typeof DashboardRequest>): any {
  try {
    yield put(showLoader())
  
const response = yield call(api.getProfile);

    yield put(DashboardSuccess(response.data));
  } catch (error: any) {
        yield put(hideLoader())

    yield put(DashboardFailure(error.message || "Failed to fetch "));
  }
}




export function* dashboardSaga(): Generator {
  yield takeLatest(DashboardRequest.type, handleFetchDashboardData);
}