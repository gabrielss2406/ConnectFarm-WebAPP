import React, { useState, useEffect } from 'react';
import { FinancialPredictType } from '@/schemas/DataAnalysis';
import { DataFinancialAnalysisService } from '@/services/financialAnalysis';
import InformationExpenses from '../HomePage/InformationExpenses';
import { LoadingSpinner } from '../shared/components/loading';

interface FinancialPredictProps {
    farm_id: string
}

const FinancialPredict: React.FC<FinancialPredictProps> = ({ farm_id }) => {
    const [data, setData] = useState<FinancialPredictType>();
    const [loading, setLoading] = useState<boolean>(true);
    const dataService = new DataFinancialAnalysisService();

    useEffect(() => {
        const fetchFinancialData = async () => {
            try {
                setLoading(true);
                const returnData = await dataService.analysisFinancialPredict(farm_id);
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
                <LoadingSpinner label='Carregando cards...' />
            ) : (
                <div className="flex-grow flex w-full h-auto flex-wrap justify-around gap-4 pt-4 flex-row sm:p-44">
                    <InformationExpenses expenseType={`Previsão de gastos de ${data.month_name}`} amount={data.exit_prediction} invertColor={false} change={data.exit_variation_percent} />
                    <InformationExpenses expenseType={`Previsão de ganhos de ${data.month_name}`} amount={data.entry_prediction} invertColor={true} change={data.entry_variation_percent} />
                </div>
            )}
        </>
    );
};

export default FinancialPredict;
