import React, { useState, useEffect } from 'react';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { localizedTextsMap } from '@/helpers/localizedTextsMap';
import { formatCurrency } from '../../helpers/formatCurrency';
import { DataWeightAnalysisService } from '@/services/weightAnalysis';
import { WeightDataType } from '@/schemas/DataAnalysis';
import { formatDateReturn } from '@/helpers/formatDateReturn';
import { Equal, MoveDown, MoveUp } from 'lucide-react';

interface WeightGridProps {
    farm_id: string
    unit: string
}

const WeightGrid: React.FC<WeightGridProps> = ({ farm_id, unit }) => {
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
            field: 'fist_weight',
            headerName: 'Peso Inicial',
            width: 150,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (params: GridCellParams) => {
                if (params) {
                    if (unit == "arroba")
                        return `${(Number(params) / 15).toFixed(2)} ${unit == "arroba" ? unit + "s" : unit}`
                    else return `${Number(params).toFixed(2)} ${unit == "arroba" ? unit + "s" : unit}`
                }
                return "--"
            }
        },
        {
            field: 'last_weight',
            headerName: 'Último Peso',
            width: 150,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (params: GridCellParams) => {
                if (params) {
                    if (unit == "arroba")
                        return `${(Number(params) / 15).toFixed(2)} ${unit == "arroba" ? unit + "s" : unit}`
                    else return `${Number(params).toFixed(2)} ${unit == "arroba" ? unit + "s" : unit}`
                }
                return "--"
            }
        },
        {
            field: 'growth_percentage',
            headerName: 'Percentual de Crescimento',
            width: 180,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params: GridCellParams) => {
                const value = Number(params.value);
                return (
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <span>{`${value.toFixed(2)}%`}</span>
                        {value > 0 && <MoveUp style={{ marginLeft: 5 }} color="green" />}
                        {value < 0 && <MoveDown style={{ marginLeft: 5 }} color="red" />}
                        {value === 0 && <Equal style={{ marginLeft: 5 }} color="gray" />}
                    </Box>
                );
            }
        },
        {
            field: 'predicted_weight',
            headerName: 'Peso Previsto',
            width: 150,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (params: GridCellParams) => {
                if (params) {
                    if (unit == "arroba")
                        return `${(Number(params) / 15).toFixed(2)} ${unit == "arroba" ? unit + "s" : unit}`
                    else return `${Number(params).toFixed(2)} ${unit == "arroba" ? unit + "s" : unit}`
                }
                return "--"
            }
        },
        {
            field: 'predicted_date',
            headerName: 'Data Prevista',
            width: 150,
            align: 'center',
            headerAlign: 'center',
            valueFormatter: (params: GridCellParams) => formatDateReturn(String(params))
        },
    ];

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                loading={loading}
                localeText={localizedTextsMap}
                getRowId={(row) => row.number}
            />
        </div>
    );
};

export default WeightGrid;
