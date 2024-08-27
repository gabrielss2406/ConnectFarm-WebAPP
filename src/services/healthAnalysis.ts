import api from './api';
import Cookies from 'js-cookie';
import dotenv from 'dotenv';
import { HealthHistoryType } from '@/schemas/DataAnalysis';

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


export class DataHealthAnalysisService {
  public async analysisHealth(farm_id: string) : Promise<HealthHistoryType> {
    try {
        const response = await api.get(`/data/${farm_id}/health/history`);
  
        return response.data;
      } catch (error) {
        throw new Error('Error on analysis of health history');
      }
  }
}
