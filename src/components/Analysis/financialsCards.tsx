import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FinancialCurrentType } from '@/schemas/DataAnalysis';
import { DataFinancialAnalysisService } from '@/services/financialAnalysis';
import InformationExpenses from '../HomePage/InformationExpenses';

interface FinancialCurrentProps {
    farm_id: string
}

const FinancialCurrent: React.FC<FinancialCurrentProps> = ({ farm_id }) => {
    const [data, setData] = useState<FinancialCurrentType>();
    const [loading, setLoading] = useState<boolean>(true);
    const dataService = new DataFinancialAnalysisService();

    useEffect(() => {
        const fetchFinancialData = async () => {
            try {
                setLoading(true);
                const returnData = await dataService.analysisFinancialCurrent(farm_id);
                setData(returnData);
            } catch (error) {
                console.error('Erro ao carregar análises financeiras:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFinancialData();
    }, [farm_id]);

    return (
        <>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <>
                    <InformationExpenses expenseType={`Gastos de ${data.month}`} amount={data.monthly.total_spent} invertColor={false} change={data.monthly.spent_change} />
                    <InformationExpenses expenseType={`Ganhos de ${data.month}`} amount={data.monthly.total_received} invertColor={true} change={data.monthly.received_change} />
                    <InformationExpenses expenseType={`Gastos de ${data.year}`} amount={data.yearly.total_spent} invertColor={false} />
                    <InformationExpenses expenseType={`Ganhos de ${data.year}`} amount={data.yearly.total_received} invertColor={true} />
                </>
            )}
        </>
    );
};

export default FinancialCurrent;
