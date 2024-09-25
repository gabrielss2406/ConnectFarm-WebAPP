import React, { useState, useEffect } from 'react';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { FinancialByCowType } from '@/schemas/DataAnalysis';
import { DataFinancialAnalysisService } from '@/services/financialAnalysis';
import { Box, Tooltip } from '@mui/material';
import { formatCurrency } from '../../helpers/formatCurrency'
import { localizedTextsMap } from '@/helpers/localizedTextsMap';

interface FinancialGridProps {
    farm_id: string
}

const FinancialAnalysisGrid: React.FC<FinancialGridProps> = ({ farm_id }) => {
    const [data, setData] = useState<FinancialByCowType>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const dataService = new DataFinancialAnalysisService();

    useEffect(() => {
        const fetchFarms = async () => {
            try {
                setLoading(true);
                const returnData = await dataService.analysisCowsFinancials(farm_id);
                setData(returnData);
            } catch (error) {
                console.error('Erro ao carregar análises financeiras:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFarms();
    }, [farm_id]);

    const getColorByCategory = (category: string) => {
        switch (category) {
            case 'Alimentação':
                return '#4caf50'; // Verde para alimentação
            case 'Saúde animal':
                return '#ff9800'; // Laranja para saúde animal
            case 'Vacinação':
                return '#f44336'; // Vermelho para vacinação
            case 'Reprodução':
                return '#9c27b0'; // Roxo para reprodução
            case 'Manutenção das pastagens':
                return '#8bc34a'; // Verde claro para manutenção das pastagens
            case 'Custos de mão-de-obra':
                return '#ffeb3b'; // Amarelo para custos de mão-de-obra
            case 'Transporte do gado':
                return '#00bcd4'; // Azul claro para transporte do gado
            case 'Suplementação':
                return '#3f51b5'; // Azul escuro para suplementação
            case 'Lucro com produção':
                return '#ff5722'; // Laranja escuro para lucro com produção
            case 'Lucro com venda de gado':
                return '#673ab7'; // Roxo escuro para lucro com venda de gado
            default:
                return '#2196f3'; // Azul padrão para outras categorias
        }
    };

    // Definindo as colunas para o DataGrid
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Número da matriz', width: 100, align: 'center', headerAlign: 'center' },
        { field: 'total_spent', headerName: 'Total gasto', width: 120, align: 'center', headerAlign: 'center', type: 'number', valueFormatter: (params: GridCellParams) => formatCurrency(Number(params)) },
        { field: 'total_received', headerName: 'Total gerado', width: 120, align: 'center', headerAlign: 'center', type: 'number', valueFormatter: (params: GridCellParams) => formatCurrency(Number(params)) },
        { field: 'profit', headerName: 'Lucro', width: 120, align: 'center', headerAlign: 'center', type: 'number', valueFormatter: (params: GridCellParams) => formatCurrency(Number(params)) },
        {
            field: 'percentage_spent_by_category',
            headerName: 'Percetagem de gasto por categoria',
            width: 350,
            headerAlign: 'center',
            renderCell: (params) => (
                <div className='flex py-4'>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            backgroundColor: '#e0e0e0',
                            borderRadius: 2,
                            overflow: 'hidden'
                        }}
                    >
                        {params.value.map((item: { category: string, percentual: number }, index: number) => (
                            item.percentual > 0 && (
                                <Tooltip
                                    key={index}
                                    title={`${item.category}: ${item.percentual.toFixed(1)}%`}
                                    placement="top"
                                    arrow
                                >
                                    <Box
                                        key={index}
                                        sx={{
                                            width: `${item.percentual}%`,
                                            backgroundColor: getColorByCategory(item.category),
                                            height: 20,
                                            color: 'white',
                                            textAlign: 'center',
                                            lineHeight: '20px',
                                            fontSize: 12,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {`${item.percentual.toFixed(1)}%`}
                                    </Box>
                                </Tooltip>
                            )
                        ))}
                    </Box>
                </div>
            ),
        },
        {
            field: 'percentage_gains_by_category',
            headerName: 'Percetagem de ganhos por categoria',
            width: 350,
            headerAlign: 'center',
            renderCell: (params) => (
                <div className='flex py-4'>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            backgroundColor: '#e0e0e0',
                            borderRadius: 2,
                            overflow: 'hidden'
                        }}
                    >
                        {params.value.map((item: { category: string, percentual: number }, index: number) => (
                            item.percentual > 0 && (
                                <Tooltip
                                    key={index}
                                    title={`${item.category}: ${item.percentual.toFixed(1)}%`}
                                    placement="top"
                                    arrow
                                >
                                    <Box
                                        key={index}
                                        sx={{
                                            width: `${item.percentual}%`,
                                            backgroundColor: getColorByCategory(item.category),
                                            height: 20,
                                            color: 'white',
                                            textAlign: 'center',
                                            lineHeight: '20px',
                                            fontSize: 12,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {`${item.percentual.toFixed(1)}%`}
                                    </Box>
                                </Tooltip>
                            )
                        ))}
                    </Box>
                </div>
            ),
        }
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

export default FinancialAnalysisGrid;
