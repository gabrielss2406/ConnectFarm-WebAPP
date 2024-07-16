import axios from 'axios';
import { API_BASE_URL, API_KEY } from './config';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'x-api-key': API_KEY,
    'Content-Type': 'multipart/form-data',
  },
});

export default api;
