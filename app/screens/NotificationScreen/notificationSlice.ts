import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationPayload {
  page: number;
  limit: number;
  type: string;
}

interface NotificationState {
  notificationData: any;
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notificationData: null,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    NotificationRequest: (state, _action: PayloadAction<NotificationPayload>) => {
      state.loading = true;
      state.error = null;
    },
    NotificationSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.notificationData = action.payload;
    },
    NotificationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
     NotificationReset: (state) => {
      state.loading = false;
      state.notificationData = null;
    },
  },
});

export const {
  NotificationRequest,
  NotificationSuccess,
  NotificationFailure,
  NotificationReset
} = notificationSlice.actions;

export default notificationSlice.reducer;
