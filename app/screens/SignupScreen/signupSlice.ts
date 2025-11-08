import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface SignupRequest {
  mobile: string;
  name:string;
  email:string;
  role:string;
  password:string;
  fcmToken:string;
  deviceType:string;
  stateId : number;
  cityId : number;
}



interface SignupState {
  singupData: any | null;
  loading: boolean;
  error: string | null;
  roleData: any;
}

const initialState: SignupState = {
  singupData: null,
  loading: false,
  error: null,
    roleData: null,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
   
    SignupRequest: (state, action: PayloadAction<{ mobile: string; name: string,email:string,role:string,password:string,fcmToken : string, deviceType: string,statId : number, cityId : number}>) => {
      state.loading = true;
      state.error = null;
      state.singupData = {
        mobile: action.payload.mobile,
        name: action.payload.name,
        email:action.payload.email,
        role:action.payload.role,
        password : action.payload.password,
        fcmToken : action.payload.fcmToken,
        deviceType : action.payload.deviceType,
        statid : action.payload.statId,
        cityId : action.payload.cityId,
      };
    },

    SignupSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false; // ✅ stop loading on success
      state.error = null;
      state.singupData = action.payload;
    },

    SignupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },


      // 🔹 Role fetching flow
    RoleRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    RoleSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.roleData = action.payload;
    },
    RoleFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetState: (state) => {
          state.singupData = null;
          state.error = null;
          state.roleData = null;
        },
  },
});

export const {
  SignupRequest,
  SignupFailure,
  SignupSuccess,
  RoleFailure,
  RoleRequest,
  RoleSuccess,
  resetState
} = signupSlice.actions;

export default signupSlice.reducer;