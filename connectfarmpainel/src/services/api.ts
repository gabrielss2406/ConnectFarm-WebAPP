import axios from 'axios';
import { API_BASE_URL, API_KEY } from './config';

const api = axios.create({
  baseURL: 'https://connect-farm-api.vercel.app',
  headers: {
    'x-api-key': '79a4586e-89d2-470d-ae76-c7b69846c7a6',
    'Content-Type': 'multipart/form-data',
  },
});

export default api;
