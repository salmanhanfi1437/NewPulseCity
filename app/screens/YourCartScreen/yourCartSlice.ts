import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Combined State
export interface MasterQrState {
  mastertQrData: any;
  orderQrData: any;
  loading: boolean;
  quantity: number;
  error: string | null;
  qrCodeError: string | null;
}

const initialState: MasterQrState = {
  mastertQrData: null,
  orderQrData: null,
  loading: false,
  quantity: 1,
  error: null,
  qrCodeError:null
};

const masterQrSlice = createSlice({
  name: "masterQr",
  initialState,
  reducers: {
    // ✅ Master QR actions
    MasterQrRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    MasterQrSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.mastertQrData = action.payload;
    },
    MasterQrFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ Order QR actions
    OrderQrRequest: (state, action: PayloadAction<{ quantity: number }>) => {
      state.loading = true;
      state.qrCodeError = null;
      state.quantity = action.payload.quantity;
    },
    OrderQrSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.orderQrData = action.payload;
    },
    OrderQrFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.qrCodeError = action.payload;
    },
    ResetOrderData: (state) => {
      state.orderQrData = null;
    }
  },
});

export const {
  MasterQrFailure,
  MasterQrRequest,
  MasterQrSuccess,
  OrderQrFailure,
  OrderQrRequest,
  OrderQrSuccess,
  ResetOrderData,
} = masterQrSlice.actions;

export default masterQrSlice.reducer;