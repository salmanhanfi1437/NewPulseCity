import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppVersionState {
  appVersionData: any | null;
  error: string | null;
}

const initialState: AppVersionState = {
  appVersionData: null,
  error: null,
};

const appVersionSlice = createSlice({
  name: 'appVersion',
  initialState,
  reducers: {
    fetchAppVersion: (state) => {},
    setAppVersionData: (state, action: PayloadAction<any>) => {
      state.appVersionData = action.payload;
      state.error = null; // clear old errors
    },
    resetAppVersionData: (state, action: PayloadAction<string>) => {
      state.appVersionData = null;
      state.error = action.payload; // set error
    },
  },
});

export const { setAppVersionData, resetAppVersionData,fetchAppVersion } = appVersionSlice.actions;
export default appVersionSlice.reducer;