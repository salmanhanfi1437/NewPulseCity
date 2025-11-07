import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchCitiesRequest,
  fetchCitiesSuccess,
  fetchCitiesFailure,
  CityItem,
  fetchStatesSuccess,
  fetchStatesFailure,
  StateItem,
  fetchStatesRequest,
} from "./StateCitySlice";
import api from "../../../services/api";
import { hideLoader, showLoader } from "../../../redux/slices/loaderSlice";


function* handleFetchStates() {
  try {
     yield put(showLoader());
    const response: { data: StateItem[] } = yield call(api.getStates);
    yield put(fetchStatesSuccess(response.data));
  } catch (error: any) {
     yield put(hideLoader());
    yield put(fetchStatesFailure(error.message));
  }
}


function* handleFetchCities(action: ReturnType<typeof fetchCitiesRequest>) {
  try {
         yield put(showLoader());

    const stateId = action.payload;
    const response: { data: CityItem[] } = yield call(api.getCities, stateId);
    yield put(fetchCitiesSuccess(response.data));
  } catch (error: any) {
         yield put(hideLoader());

    yield put(fetchCitiesFailure(error.message));
  }
}

export default function* stateCitySaga() {
      yield takeLatest(fetchStatesRequest.type, handleFetchStates);
  yield takeLatest(fetchCitiesRequest.type, handleFetchCities);
}
