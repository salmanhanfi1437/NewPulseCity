import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  dashboardData: any;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  dashboardData: null,
  loading: false,
  error: null,
};

const  dashBoardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    // ✅ Trigger profile API request (no payload)
    DashboardRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    // ✅ Success - store the fetched profile data
    DashboardSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.dashboardData = action.payload;
      state.error = null;
    },

    // ✅ Failure - store the error message
    DashboardFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { DashboardFailure,DashboardRequest,DashboardSuccess } = dashBoardSlice.actions;

export default dashBoardSlice.reducer;
