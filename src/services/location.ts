import api from './api';
import Cookies from 'js-cookie';
import dotenv from 'dotenv';
import { LocationDataType } from '@/schemas/DataAnalysis';

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


export class DataLocationService {
    public async locationData(farm_id: string): Promise<LocationDataType> {
        try {
            const response = await api.get(`/data/${farm_id}/location`);

            return response.data;
        } catch (error) {
            throw new Error('Error on get locations in farm');
        }
    }
}
