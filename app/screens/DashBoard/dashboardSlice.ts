import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  dashboardData: any;
  loading: boolean;
  error: string | null;
  initialTab: string | null;
}

const initialState: ProfileState = {
  dashboardData: null,
  loading: false,
  error: null,
  initialTab: null, // null = default first tab
};

const dashBoardSlice = createSlice({
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

    // ✅ Set initial tab dynamically
    SetInitialTab: (state, action: PayloadAction<string>) => {
      state.initialTab = action.payload;
    },

    // ✅ Clear initial tab after use
    ClearInitialTab: (state) => {
      state.initialTab = null;
    },
  },
});

export const {
  DashboardFailure,
  DashboardRequest,
  DashboardSuccess,
  SetInitialTab,
  ClearInitialTab,
} = dashBoardSlice.actions;

export default dashBoardSlice.reducer;