import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QrManagementState {
  qrData: {
    data?: {
      dummyQrs?: any[];
      totalCount?: number;
      pagination?:any
    };
    [key: string]: any;
  } | null;
  loading: boolean;
  error: string | null;
  InventoryData: any;
  InventoryError: string | any;
  currentPage: number;
}

const initialState: QrManagementState = {
  qrData: null,
  loading: false,
  error: null,
  InventoryData: null,
  InventoryError: null,
  currentPage: 1,
};

const qrManagementSlice = createSlice({
  name: 'qrManagement',
  initialState,
  reducers: {
    fetchViewQRRequest: (
      state,
      action: PayloadAction<{ page: number; limit: number; search: string }>,
    ) => {
      state.loading = true;
      state.error = null;
      state.currentPage = action.payload.page;
    },
    fetchViewQRSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;

      // If page is 1, replace the data
      if (state.currentPage === 1 || !state.qrData) {
        state.qrData = action.payload;
      } else {
        // Append new data for pagination
        const prevList = state.qrData?.data?.dummyQrs || [];
        const newList = action.payload?.data?.dummyQrs || [];

        state.qrData = {
          ...action.payload,
          data: {
            ...action.payload.data,
            dummyQrs: [...prevList, ...newList],
          },
        };
      }
    },
    fetchViewQRError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchInventoryRequest: state => {
      state.loading = true;
      state.InventoryError = null;
    },
    fetchInventorySuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.InventoryData = action.payload;
    },
    fetchInventoryError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.InventoryError = action.payload;
    },
    resetViewQrData : state =>{
      state.loading = false;
      state.InventoryData = null;
    }
  },
});

export const {
  fetchViewQRRequest,
  fetchViewQRSuccess,
  fetchViewQRError,
  fetchInventoryRequest,
  fetchInventorySuccess,
  fetchInventoryError,
} = qrManagementSlice.actions;

export default qrManagementSlice.reducer;
