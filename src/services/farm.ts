import api from './api';
import Cookies from 'js-cookie';
import dotenv from 'dotenv';
import { FarmType } from '@/schemas/Farm';

dotenv.config();

api.interceptors.request.use((config) => {
  const token = Cookies.get('_cnctfarm_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export class FarmService {
  public async getFarmsFromUser() : Promise<FarmType[]> {
    try {
      const response = await api.get('/farms');

      return response.data;
    } catch (error) {
      throw new Error('Search for farms failed');
    }
  }
}
