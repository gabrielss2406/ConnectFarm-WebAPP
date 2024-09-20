import api from './api';
import Cookies from 'js-cookie';
import dotenv from 'dotenv';
import { VaccinesCoverageType, VaccinesQuarterlyType } from '@/schemas/DataAnalysis';

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


export class DataVaccinesAnalysisService {
  public async analysisVaccinesCoverage(farm_id: string): Promise<VaccinesCoverageType> {
    try {
      const response = await api.get(`/data/${farm_id}/vaccines/coverage`);

      return response.data;
    } catch (error) {
      throw new Error('Error on analysis of vaccines coverage');
    }
  }

  public async analysisVaccinesQuaterly(farm_id: string): Promise<VaccinesQuarterlyType> {
    try {
      const response = await api.get(`/data/${farm_id}/vaccines/quarterly`);

      return response.data;
    } catch (error) {
      throw new Error('Error on analysis of vaccines quarterly');
    }
  }
}
