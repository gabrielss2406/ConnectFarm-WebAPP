import React, { useState, useEffect } from 'react';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { DataCalvesAnalysisService } from '@/services/calvesAnalysis';
import { formatPredictedWeight } from '@/helpers/formatPredictedWeight';

interface CalvesPredictGridProps {
    farm_id: string;
}

const localizedTextsMap = {
    columnMenuUnsort: 'não classificado',
    columnMenuSortAsc: 'Classificar por ordem crescente',
    columnMenuSortDesc: 'Classificar por ordem decrescente',
    columnMenuFilter: 'Filtro',
    columnMenuHideColumn: 'Ocultar',
    columnMenuShowColumns: 'Mostrar colunas',
    columnMenuManageColumns: 'Organizar colunas',
};

const CalvesPredictGrid: React.FC<CalvesPredictGridProps> = ({ farm_id }) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const calfGrowthService = new DataCalvesAnalysisService(); // Instância do serviço para buscar os dados

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

    // Definindo as colunas para o DataGrid
    const columns: GridColDef[] = [
        { field: 'number', headerName: 'Número do Bezerro', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'mother_number', headerName: 'Número da Mãe', width: 150, align: 'center', headerAlign: 'center' },
        {
            field: 'predicted_weight',
            headerName: 'Peso Projetado',
            width: 300,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (params: GridCellParams) => formatPredictedWeight(params)
        },
        {
            field: 'future_date',
            headerName: 'Data Futura',
            width: 300,
            align: 'center',
            headerAlign: 'center',
        },
    ];

    // Transformar os dados no formato necessário para o DataGrid
    const rows = data.map((item, index) => ({
        id: index, // Define um ID único para cada linha
        number: item.number,
        mother_number: item.data.mother_number,
        predicted_weight: item.data.predicted_weight,
        future_date: item.data.future_date, // Adicione o campo `future_date`
        message: item.data.message, // Manter `message` para o valorGetter
    }));

    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} loading={loading} localeText={localizedTextsMap} />
        </div>
    );
};

export default CalvesPredictGrid;
