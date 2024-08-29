import api from './api';
import Cookies from 'js-cookie';
import dotenv from 'dotenv';
import { WeightVariationMonthType, WeightVariationType } from '@/schemas/DataAnalysis';

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


export class DataWeightAnalysisService {
    public async analysisWeightVariation(farm_id: string): Promise<WeightVariationType> {
        try {
            const response = await api.get(`/data/${farm_id}/weight/variation`);

            return response.data;
        } catch (error) {
            throw new Error('Error on analysis of weight variation');
        }
    }

    public async analysisWeightVariationMonth(farm_id: string): Promise<WeightVariationMonthType> {
        try {
            const response = await api.get(`/data/${farm_id}/weight/variation/month`);

            return response.data;
        } catch (error) {
            throw new Error('Error on analysis of weight variation per month');
        }
    }
}
