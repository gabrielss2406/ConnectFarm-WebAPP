import React, { useState, useEffect } from 'react';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { localizedTextsMap } from '@/helpers/localizedTextsMap';
import { formatCurrency } from '../../helpers/formatCurrency';
import { DataWeightAnalysisService } from '@/services/weightAnalysis';
import { WeightDataType } from '@/schemas/DataAnalysis';

interface WeightGridProps {
    farm_id: string
}

const WeightGrid: React.FC<WeightGridProps> = ({ farm_id }) => {
    const [data, setData] = useState<WeightDataType>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const dataService = new DataWeightAnalysisService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const returnData = await dataService.analysisWeightData(farm_id);
                setData(returnData);
            } catch (error) {
                console.error('Erro ao carregar os dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns: GridColDef[] = [
        { field: 'number', headerName: 'Número da Vaca', width: 150, align: 'center', headerAlign: 'center' },
        {
            field: 'first_weight',
            headerName: 'Peso Inicial',
            width: 150,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'last_weight',
            headerName: 'Último Peso',
            width: 150,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'growth_percentage',
            headerName: 'Percentual de Crescimento',
            width: 180,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'predicted_weight',
            headerName: 'Peso Previsto',
            width: 150,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'predicted_date',
            headerName: 'Data Prevista',
            width: 150,
            align: 'center',
            headerAlign: 'center'
        },
    ];

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                loading={loading}
                localeText={localizedTextsMap}
            />
        </div>
    );
};

export default WeightGrid;
