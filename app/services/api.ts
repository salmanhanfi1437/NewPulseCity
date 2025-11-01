import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://yourapi.com',
  timeout: 10000,
});

export default {
 
   getLanguages: () => apiClient.get('/languages'),

  verify_mobile_number: (data: { mobile: string; otp: string }) =>
    apiClient.post('/login', data),
};
