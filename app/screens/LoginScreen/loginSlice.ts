import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SendOTPRequest {
  mobile: string;
  purpose: "LOGIN";
}

export interface VerifyOTPRequest {
  mobile: string;
  otp: string;
  purpose: "LOGIN";
}

interface LoginState {
  otpData: any;
  verifyOTPData: any;
  loading: boolean;
  error: string | null;
  otpError: string | null;
}

const initialState: LoginState = {
  otpData: null,
  verifyOTPData: null,
  loading: false,
  error: null,
  otpError:null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // 🔹 Step 1: Send OTP Request
    sendOTPRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
      state.otpData = {
        mobile: action.payload,
        purpose: "LOGIN",
      };
    },

    // 🔹 Step 2: Send OTP Success
    sendOTPSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false; // ❌ should be false after success
      state.error = null;
      state.otpData = action.payload;
    },

    // 🔹 Step 3: Send OTP Failure
    sendOTPFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // 🔹 Step 1: Verify OTP Request
    verifyOTPRequest: (state, action: PayloadAction<{ mobile: string; otp: string,fcmToken : String, deviceType: string}>) => {
      state.loading = true;
      state.otpError = null;
      state.verifyOTPData = {
        mobile: action.payload.mobile,
        otp: action.payload.otp,
        fcmToken : action.payload.fcmToken,
        deviceType : action.payload.deviceType,
        purpose: "LOGIN",
      };
    },

    // 🔹 Step 2: Verify OTP Success
    verifyOTPSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false; // ✅ stop loading on success
      state.otpError = null;
      state.verifyOTPData = action.payload;
    },

    // 🔹 Step 3: Verify OTP Failure
    verifyOTPFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.otpError = action.payload;
    },
  },
});

export const {
  sendOTPRequest,
  sendOTPSuccess,
  sendOTPFailure,
  verifyOTPRequest,
  verifyOTPSuccess,
  verifyOTPFailure,
} = loginSlice.actions;

export default loginSlice.reducer;