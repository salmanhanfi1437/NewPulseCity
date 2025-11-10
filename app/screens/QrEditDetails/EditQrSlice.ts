import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditQrState {
  editQrData: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: EditQrState = {
  editQrData: null,
  loading: false,
  error: null,
};

const editQrSlice = createSlice({
  name: 'editQr',
  initialState,
  reducers: {
    editQrRequest: (state, _action: PayloadAction<any>) => {
      state.loading = true;
      state.error = null;
    },
    editQrSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.editQrData = action.payload;
    },
    editQrError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetEditQr: (state) => {
      state.editQrData = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { editQrRequest, editQrSuccess, editQrError,resetEditQr } = editQrSlice.actions;
export default editQrSlice.reducer;
