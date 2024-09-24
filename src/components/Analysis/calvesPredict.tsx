import React, { useState, useEffect } from 'react';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { DataCalvesAnalysisService } from '@/services/calvesAnalysis';
import { formatPredictedWeight } from '@/helpers/formatPredictedWeight';
import { formatDateReturn } from '@/helpers/formatDateReturn';
import { localizedTextsMap } from '@/helpers/localizedTextsMap';

interface CalvesPredictGridProps {
    farm_id: string;
    unit: string
}

const CalvesPredictGrid: React.FC<CalvesPredictGridProps> = ({ farm_id, unit }) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const calfGrowthService = new DataCalvesAnalysisService();

    useEffect(() => {
        const fetchCalvesGrowth = async () => {
            try {
                setLoading(true);
                const returnData = await calfGrowthService.analysisCalvesPredict(farm_id);
                setData(returnData);
            } catch (error) {
                console.error('Erro ao carregar projeções de crescimento dos bezerros:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCalvesGrowth();
    }, [farm_id]);

    const columns: GridColDef[] = [
        { field: 'number', headerName: 'Número do Bezerro', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'mother_number', headerName: 'Número da Mãe', width: 150, align: 'center', headerAlign: 'center' },
        {
            field: 'predicted_weight',
            headerName: 'Peso Projetado',
            width: 300,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (params: GridCellParams) => formatPredictedWeight(params, unit)
        },
        {
            field: 'future_date',
            headerName: 'Data Futura',
            width: 300,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (params: GridCellParams) => formatDateReturn(String(params))
        },
    ];

    const rows = data.map((item, index) => ({
        id: index,
        number: item.number,
        mother_number: item.data.mother_number,
        predicted_weight: item.data.predicted_weight,
        future_date: item.data.future_date,
        message: item.data.message,
    }));

    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                localeText={localizedTextsMap}
            />
        </div>
    );
};

export default CalvesPredictGrid;
