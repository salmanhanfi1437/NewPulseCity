import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QrManagementState {
  qrData: any;
  loading: boolean;
  error: string | null;
}

const initialState: QrManagementState = {
  qrData: null,
  loading: false,
  error: null,
};

const qrManagementSlice = createSlice({
  name: 'qrManagement',
  initialState,
  reducers: {
    fetchViewQRRequest: state => {
      state.loading = true;
      state.error = null;
    },
    fetchViewQRSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.qrData = action.payload;
    },
    fetchViewQRError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchViewQRRequest,
  fetchViewQRSuccess,
  fetchViewQRError,
} = qrManagementSlice.actions;

export default qrManagementSlice.reducer;

