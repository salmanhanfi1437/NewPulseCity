import axios from 'axios';
import { showLoader, hideLoader } from '../redux/slices/loaderSlice';
import secureStorage from '../utils/secureStorage';
import { BASE_URL, const_authToken } from '../types/constants';

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

apiClient.interceptors.request.use(
  async (config) => {
    try {
      if (store) store.dispatch(showLoader());

      console.log('➡️ FULL URL:', `${config.baseURL}${config.url}`);
      console.log('➡️ BODY:', config.data);

      const token = await secureStorage.getItem<string>(const_authToken);
      console.log('Token' + token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      console.log('➡️ [API Request]', config.method?.toUpperCase(), config.url, config.data || '');
    } catch (error) {
      console.log('Request Interceptor Error:', error);
    }

    return config;
  },
  (error) => {
    if (store) store.dispatch(hideLoader());
    console.log('❌ [Request Error]', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    if (store) store.dispatch(hideLoader());
    console.log('✅ [API Response]', response.status, response.data);
    return response; // ✅ keep full response
  },
  (error) => {
    if (store) store.dispatch(hideLoader());

    console.log(
      '❌ [API Error]',
      error.response?.status,
      error.response?.data || error.message
    );

    // ✅ return full formatted error object instead of raw Axios error
    const formattedError = {
      status: error.response?.status || 500,
      data: error.response?.data || null,
      message: error.response?.data || 'Unknown error occurred',
      requestId: error.response?.data?.requestId || null,
    };

    return Promise.reject(formattedError);
  }
);

export default {
  getLanguages: () => apiClient.get('/languages'),
  sendOTP: (data: { mobile: string; purpose: string }) =>
    apiClient.post('auth/send-otp', data),
  verifyOTP: (data: any) => apiClient.post('auth/verify-otp', data),
  signup: (data: any) => apiClient.post('auth/signup', data),

  getRoles: () =>
  apiClient.get(`/roles`, {
    params: {
      page: 1,
      limit: 10,
      search: "", // or remove if not needed
    },
  }),
  
}
