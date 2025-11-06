import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Define your checkout request data shape
export interface CheckOutRequest {
  fullName: string;
  pancard: string;
  gstNumber: string;
  legalCompanyName: string;
  state: string;
  city: string;
  pincode: string;
  address: string;
}

// ✅ Define the slice state
export interface CheckOutState {
  checkOutData: any | null;  // You can strongly type this if you have a model
  roleData: any | null;
  loading: boolean;
  error: string | null;
}

// ✅ Initial state
const initialState: CheckOutState = {
  checkOutData: null,
  loading: false,
  error: null,
  roleData: null,
};

// ✅ Create slice
const checkOutSlice = createSlice({
  name: "checkOut",
  initialState,
  reducers: {
    // 🔹 Checkout request action
    checkOutRequest: (
      state,
      action: PayloadAction<{
        mobile: string;
        name: string;
        email: string;
        role: string;
        password: string;
        fcmToken: string;
        deviceType: string;
      }>
    ) => {
      state.loading = true;
      state.error = null;
      state.checkOutData = { ...action.payload };
    },

    // 🔹 On success
    checkOutSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = null;
      state.checkOutData = action.payload;
    },

    // 🔹 On failure
    checkOutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },   
  },
});

// ✅ Export actions
export const {
  checkOutRequest,
  checkOutSuccess,
  checkOutFailure,
} = checkOutSlice.actions;

// ✅ Export reducer
export default checkOutSlice.reducer;
