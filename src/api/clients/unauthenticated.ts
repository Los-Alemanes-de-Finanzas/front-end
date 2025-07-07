import { API_TIMEOUT, BASE_API_URL, HEADERS } from '@/misc/constants/api';
import axios from 'axios';

// Create an unauthenticated Axios client for non-authenticated requests (e.g., login)
const unauthenticatedClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    [HEADERS.CONTENT_TYPE]: HEADERS.APPLICATION_JSON,
  },
  timeout: API_TIMEOUT,
});

export default unauthenticatedClient;