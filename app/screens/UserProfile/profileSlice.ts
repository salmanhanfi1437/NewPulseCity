import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  profileData: any;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profileData: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // ✅ Trigger profile API request (no payload)
    ProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    // ✅ Success - store the fetched profile data
    ProfileSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.profileData = action.payload;
      state.error = null;
    },

    // ✅ Failure - store the error message
    ProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { ProfileRequest, ProfileSuccess, ProfileFailure } = profileSlice.actions;

export default profileSlice.reducer;
