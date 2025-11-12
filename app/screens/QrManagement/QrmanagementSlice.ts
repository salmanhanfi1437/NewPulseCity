import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QrManagementState {
  qrData: any;
  loading: boolean;
  error: string | null;
  InventoryData:any;
  InventoryError:string | any;
}

interface QrManagementPayload {
  page: number;
  limit: number;
  type: string;
}

const initialState: QrManagementState = {
  qrData: null,
  loading: false,
  error: null,
  InventoryData:null,
  InventoryError:null
};

const qrManagementSlice = createSlice({
  name: 'qrManagement',
  initialState,
  reducers: {
    fetchViewQRRequest: (state,_action:PayloadAction<QrManagementPayload>)=> {
      state.loading = true;
      state.error = null;
    },
    fetchViewQRSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.qrData = action.payload;
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
  resetViewQrData
} = qrManagementSlice.actions;

export default qrManagementSlice.reducer;

