import axios, { AxiosHeaders, type AxiosInstance, type AxiosRequestHeaders, type InternalAxiosRequestConfig } from 'axios';
import { handleApiError } from '../utils/handleApiError';
import { BASE_URL } from '../config/vars/variables';

// Create axiost instence
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios request config
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers = new AxiosHeaders({ ...(config.headers as AxiosRequestHeaders), Authorization: `Bearer ${token}` });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Axios response config
api.interceptors.response.use(
  (response) => response,
  (error) => {
    handleApiError(error);
    return Promise.reject(error);
  },
);

export default api;
