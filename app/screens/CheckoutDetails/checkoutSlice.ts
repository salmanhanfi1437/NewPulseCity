import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export interface VerifyRazorPay {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// ✅ Define the slice state
export interface CheckOutState {
  checkOutData: any | null; // You can strongly type this if you have a model
  roleData: any | null;
  loading: boolean;
  error: string | null;
  verifyRazaorPay_data: any | null;
  verifyRazaorPay_error: string | null
}

// ✅ Initial state
const initialState: CheckOutState = {
  checkOutData: null,
  loading: false,
  error: null,
  roleData: null,
  verifyRazaorPay_data : null,
  verifyRazaorPay_error:null
};

// ✅ Create slice
const checkOutSlice = createSlice({
  name: 'checkOut',
  initialState,
  reducers: {
    checkOutRequest: (state, action: PayloadAction<CheckOutRequest>) => {
      state.loading = true;
      state.error = null;
      state.checkOutData = { ...action.payload };
    },
    checkOutSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = null;
      state.checkOutData = action.payload;
    },
    checkOutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
      VerifyRazorPayRequest: (state, action: PayloadAction<VerifyRazorPay>) => {
      state.loading = true;
      state.verifyRazaorPay_error = null;
      state.verifyRazaorPay_data = { ...action.payload };
    },
    VerifyRazorPaySuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.verifyRazaorPay_error = null;
      state.verifyRazaorPay_data = action.payload;
    },
    VerifyRazorPayFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.verifyRazaorPay_error = action.payload;
    },
  },
});


// ✅ Export actions
export const {
  checkOutRequest,
  checkOutSuccess,
  checkOutFailure,
  VerifyRazorPayRequest,
  VerifyRazorPaySuccess,
  VerifyRazorPayFailure,
} = checkOutSlice.actions;

// ✅ Export reducer
export default checkOutSlice.reducer;
