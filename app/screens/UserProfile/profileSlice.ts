import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface LogoutResponse {
  message: string; // 👈 adjust this to match your actual API response
  status?: boolean;
}

interface ProfileState {
  profileData: Profile | null;
  loading: boolean;
  error: string | null;
  logoutLoading: boolean;
  logoutData: LogoutResponse | null;
}

const initialState: ProfileState = {
  profileData: null,
  loading: false,
  error: null,
  logoutLoading: false,
  logoutData: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // ✅ Profile API
    ProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    ProfileSuccess: (state, action: PayloadAction<Profile>) => {
      state.loading = false;
      state.profileData = action.payload;
      state.error = null;
    },
    ProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ Logout flow
    LogoutRequest: (state) => {
      state.logoutLoading = true;
      state.error = null;
    },
    LogoutSuccess: (state, action: PayloadAction<LogoutResponse>) => {
      state.logoutLoading = false;
      state.logoutData = action.payload; // 👈 store API logout response
      state.error = null;
    },
    LogoutFailure: (state, action: PayloadAction<string>) => {
      state.logoutLoading = false;
      state.error = action.payload;
    },

    // ✅ Optional reset
    ResetProfile: (state) => {
      state.profileData = null;
      state.loading = false;
      state.error = null;
      state.logoutData = null;
    },
  },
});

export const {
  ProfileRequest,
  ProfileSuccess,
  ProfileFailure,
  LogoutRequest,
  LogoutSuccess,
  LogoutFailure,
  ResetProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
