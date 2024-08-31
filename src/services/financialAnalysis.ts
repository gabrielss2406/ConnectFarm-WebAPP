import api from './api';
import Cookies from 'js-cookie';
import dotenv from 'dotenv';
import { FinancialByCowType, FinancialCurrentType } from '@/schemas/DataAnalysis';

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


export class DataFinancialAnalysisService {
    public async analysisCowsFinancials(farm_id: string): Promise<FinancialByCowType> {
        try {
            const response = await api.get(`/data/${farm_id}/financial/cattles`);

            return response.data;
        } catch (error) {
            throw new Error('Error on analysis of cow financials');
        }
    }

    public async analysisFinancialCurrent(farm_id: string): Promise<FinancialCurrentType> {
        try {
            const response = await api.get(`/data/${farm_id}/financial/current`);

            return response.data;
        } catch (error) {
            throw new Error('Error on analysis of current financials');
        }
    }
}
