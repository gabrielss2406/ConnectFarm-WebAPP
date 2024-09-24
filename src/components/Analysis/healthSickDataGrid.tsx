import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { localizedTextsMap } from '@/helpers/localizedTextsMap';
import { DataHealthAnalysisService } from '@/services/healthAnalysis';
import { HealthSickType } from '@/schemas/DataAnalysis';

interface NotRecoveredCowsGridProps {
    farm_id: string;
}

const NotRecoveredCowsGrid: React.FC<NotRecoveredCowsGridProps> = ({ farm_id }) => {
    const [data, setData] = useState<HealthSickType>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const healthService = new DataHealthAnalysisService();

    useEffect(() => {
        const fetchNotRecoveredCows = async () => {
            try {
                setLoading(true);
                const response = await healthService.analysisSick(farm_id);
                console.log(response);
                setData(response);
            } catch (error) {
                console.error('Erro ao carregar vacas não recuperadas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotRecoveredCows();
    }, [farm_id]);

    const columns: GridColDef[] = [
        {
            field: 'cattle_number',
            headerName: 'Número da Vaca',
            width: 150,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'diseases',
            headerName: 'Doenças Não Recuperadas',
            width: 300,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <Box sx={{ textAlign: 'left' }}>
                    {params.value.join('; ')} {/* Exibe as doenças separadas por vírgula */}
                </Box>
            ),
        },
        {
            field: 'vaccines',
            headerName: 'Últimas vacinas de doenças não recuperadas',
            width: 600,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <Box sx={{ textAlign: 'left' }}>
                    {params.value.length > 0 ? (
                        params.value.map((vaccine: { type: string; date: string }, index: number) => {
                            return (
                                <span key={index}>
                                    {vaccine.type} - {vaccine.date}
                                    {index < params.value.length - 1 && '; '}
                                </span>
                            );
                        })
                    ) : (
                        <div>Nenhuma vacina dregistrada</div>
                    )}
                </Box>
            ),
        },
    ];

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                loading={loading}
                localeText={localizedTextsMap}
                getRowId={(row) => row.cattle_number} // Define o campo `cattle_number` como identificador
            />
        </div>
    );
};

export default NotRecoveredCowsGrid;
