import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DataVaccinesAnalysisService } from '@/services/vaccinesAnalysis';
import { VaccinesQuarterlyType } from '@/schemas/DataAnalysis';

interface VaccinationGridProps {
    farm_id: string
}

const localizedTextsMap = {
    columnMenuUnsort: 'não classificado',
    columnMenuSortAsc: 'Classificar por ordem crescente',
    columnMenuSortDesc: 'Classificar por ordem decrescente',
    columnMenuFilter: 'Filtro',
    columnMenuHideColumn: 'Ocultar',
    columnMenuShowColumns: 'Mostrar colunas',
    columnMenuManageColumns: 'Organizar colunas',
    noRowsLabel: 'Nenhuma linha',
    noResultsOverlayLabel: 'Nenhum resultado encontrado',
    errorOverlayDefaultLabel: 'Ocorreu um erro',
    footerRowSelected: (count: number) => `${count} linha(s) selecionada(s)`,
    footerTotalRows: 'Total de linhas: {{count}}',
    rowsPerPage: 'Linhas por página:',
    MuiTablePagination: {
        labelDisplayedRows: ({ from, to, count }) => `${from}–${to} de ${count}`,
        labelRowsPerPage: "Linhas por página"
    },
};

const VaccinationAnalysisGrid: React.FC<VaccinationGridProps> = ({ farm_id }) => {
    const [data, setData] = useState<VaccinesQuarterlyType>({ vaccination_data: [], vaccine_types: [] });
    const [loading, setLoading] = useState<boolean>(true);
    const dataService = new DataVaccinesAnalysisService();

    useEffect(() => {
        const fetchVaccinationData = async () => {
            try {
                setLoading(true);
                const returnData = await dataService.analysisVaccinesQuaterly(farm_id);
                setData(returnData);
            } catch (error) {
                console.error('Erro ao carregar análises de vacinação:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVaccinationData();
    }, [farm_id]);

    const getRowId = (row: any) => `${row.quadrimester}-${Math.random()}`;

    const columns: GridColDef[] = [
        { field: 'quadrimester', headerName: 'Quadrimestre', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'total_vaccines', headerName: 'Total de Vacinas', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'Virose', headerName: 'Virose', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'Brucelose', headerName: 'Brucelose', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'Leucose Bovina', headerName: 'Leucose Bovina', width: 200, align: 'center', headerAlign: 'center' },
        { field: 'Pneumonia Bovina', headerName: 'Pneumonia Bovina', width: 200, align: 'center', headerAlign: 'center' },
    ];

    const formattedData = data.vaccination_data.map((item) => ({
        ...item,
        Virose: item.vaccine_types.Virose || 0,
        Brucelose: item.vaccine_types.Brucelose || 0,
        "Leucose Bovina": item.vaccine_types["Leucose Bovina"] || 0,
        "Pneumonia Bovina": item.vaccine_types["Pneumonia Bovina"] || 0,
    }));

    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={formattedData}
                columns={columns}
                loading={loading}
                localeText={localizedTextsMap}
                getRowId={getRowId}
            />
        </div>
    );
};

export default VaccinationAnalysisGrid;
