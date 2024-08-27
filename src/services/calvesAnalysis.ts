import api from './api';
import Cookies from 'js-cookie';
import dotenv from 'dotenv';
import { CalvesRatioType, CalvesTimeType } from '@/schemas/DataAnalysis';

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


export class DataCalvesAnalysisService {
  public async analysisCalvesRatio(farm_id: string) : Promise<CalvesRatioType> {
    try {
        const response = await api.get(`/data/${farm_id}/calves/ratio`);
  
        return response.data;
      } catch (error) {
        throw new Error('Error on analysis of calves ratio');
      }
  }

  public async analysisCalvesTime(farm_id: string) : Promise<CalvesTimeType> {
    try {
        const response = await api.get(`/data/${farm_id}/calves/time`);
  
        return response.data;
      } catch (error) {
        throw new Error('Error on analysis of calves time');
      }
  }
}
