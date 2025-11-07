import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StateItem {
  id: string;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

export interface CityItem {
  id: string;
  name: string;
  stateId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CheckOutState {
  stateList: StateItem[];
  cityList: CityItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CheckOutState = {
  stateList: [],
  cityList: [],
  loading: false,
  error: null,
};

const stateCitySlice = createSlice({
  name: "statecity",
  initialState,
  reducers: {
    fetchStatesRequest: (state) => { state.loading = true; state.error = null; },
    fetchStatesSuccess: (state, action: PayloadAction<StateItem[]>) => {
      state.stateList = action.payload;
      state.loading = false;
    },
    fetchStatesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    fetchCitiesRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchCitiesSuccess: (state, action: PayloadAction<CityItem[]>) => {
      state.cityList = action.payload;
      state.loading = false;
    },
    fetchCitiesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchStatesRequest,
  fetchStatesSuccess,
  fetchStatesFailure,
  fetchCitiesRequest,
  fetchCitiesSuccess,
  fetchCitiesFailure,
} = stateCitySlice.actions;

export default stateCitySlice.reducer;
