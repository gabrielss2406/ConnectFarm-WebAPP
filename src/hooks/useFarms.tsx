import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { FarmService } from '@/services/farm';

interface FarmType {
    id: string;
    name: string;
}

const farmCache: Record<string, FarmType[]> = {};

export const useFarms = () => {
    const [farms, setFarms] = useState<FarmType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchFarms = useCallback(async () => {
        setLoading(true);
        const token = Cookies.get('_cnctfarm_token');

        try {
            if (!token) {
                throw new Error('User not authenticated');
            }

            if (farmCache[token]) {
                setFarms(farmCache[token]);
                setLoading(false);
                return;
            }

            const farmService = new FarmService();
            const farmsList = await farmService.getFarmsFromUser();

            const farmData = farmsList.map(farm => ({
                id: farm.farm_id,
                name: farm.name
            }));

            farmCache[token] = farmData;
            setFarms(farmData);
        } catch (error) {
            console.error('Erro ao carregar lista de fazendas:', error);
            setError(error.message || 'Error');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFarms();
    }, [fetchFarms]);

    return { farms, loading, error };
};
