import { BASE_API_URL, API_TIMEOUT } from '@/misc/constants/api';
import axios, { AxiosInstance } from 'axios';

export default function createAuthenticatedClient(accessToken: string): AxiosInstance {
  const client = axios.create({
    baseURL: BASE_API_URL,
    timeout: API_TIMEOUT,
  });

  // Set the access token in the headers
  client.interceptors.request.use((config) => {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }, (error) => Promise.reject(error));

  return client;
}