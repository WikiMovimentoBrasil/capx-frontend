import axios from 'axios';
import { signOut } from 'next-auth/react';

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401 && error.response.data.detail === 'Invalid token.') {
      signOut({ redirect: true, callbackUrl: '/' });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
