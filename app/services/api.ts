import axios from 'axios';
import { showLoader, hideLoader } from '../redux/slices/loaderSlice';
import { BASE_URL, const_authToken } from '../types/constants';
import secureStorage from '../utils/secureStorage';

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

//It runs before every API call is sent.
// const STATIC_TOKEN =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiNzdlN2VlYS1iZDU1LTQ2MGEtYWE0NC0xNjNmMzM1ZmE0MGUiLCJpYXQiOjE3NjI1MDIxNjIsImV4cCI6MTc2MzEwNjk2Mn0.2A1OzYcbj1_W23JyoYOi_ugYKZGXapGMkpmqDQoGlgc';

apiClient.interceptors.request.use(
  async config => {
    try {
      if (store) store.dispatch(showLoader());

      console.log('➡️ FULL URL:', `${config.baseURL}${config.url}`);
      console.log('➡️ BODY:', config.data);

      const token = await secureStorage.getItem<string>(const_authToken);
      console.log('TOKEN',token)
      console.log('Token' + token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      console.log(
        '➡️ [API Request]',
        config.method?.toUpperCase(),
        config.url,
        config.data || '',
      );
    } catch (error) {
      console.log('Request Interceptor Error:', error);
    }

    return config;
  },
  error => {
    if (store) store.dispatch(hideLoader());
    console.log('❌ [Request Error]', error);
    return Promise.reject(error);
  },
);

//It runs after a response is received from the server.
apiClient.interceptors.response.use(
  response => {
    if (store) store.dispatch(hideLoader());
    console.log('✅ [API Response]', response.status, response.data);
    return response; // ✅ keep full response
  },
  error => {
    if (store) store.dispatch(hideLoader());

    console.log(
      '❌ [API Error]',
      error.response?.status,
      error.response?.data || error.message,
    );

    // ✅ return full formatted error object instead of raw Axios error
    const formattedError = {
      status: error.response?.status || 500,
      data: error.response?.data || null,
      message: error.response?.data || 'Unknown error occurred',
      requestId: error.response?.data?.requestId || null,
    };

    return Promise.reject(formattedError);
  },
);

export default {
  getLanguages: () => apiClient.get('/languages'),
  sendOTP: (data: { mobile: string; purpose: string }) =>
    apiClient.post('auth/send-otp', data),
  verifyOTP: (data: any) => apiClient.post('auth/verify-otp', data),
  signup: (data: any) => apiClient.post('auth/signup', data),
  getRoles: () => apiClient.get(`roles/get-user-roles`),
  getMasterQr: () => apiClient.get('qr-management/distributor/master-qr'),
  orderQr: (data: any) =>
    apiClient.post('qr-management/distributor/create-order-for-qr', data),
  checkOutQr: (data: any) =>
    apiClient.post('qr-management/distributor/checkout', data),
  getStates: () => apiClient.get('location/states'),
  getCities: (stateId: string) => apiClient.get(`location/cities/${stateId}`),
  getProfile:() => apiClient.get('user/profile'),
  getDashboard : () => apiClient.get("qr-management/distributor/inventory"),
  viewQR: (params?: { page?: number; limit?: number; search?: string }) =>
    apiClient.get('qr-management/distributor/view', { params }),
notifications: (page: number, limit: number, type: string) =>
  apiClient.get(
    `notification/my-notifications?page=${page}&limit=${limit}&type=${type}`),
  doLogout : () => apiClient.post('auth/logout'),
  VerifyRazorPayPayment: (data:any)=> apiClient.post('qr-management/distributor/verify-payment-for-dummy-qr',data),
  updateQrDetails : (id : any,data : any) => apiClient.patch(`qr-management/distributor/update/${id}`,data),   

};
