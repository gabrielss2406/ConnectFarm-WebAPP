import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shared/ui/card';
import { WeightVariationType } from '@/schemas/DataAnalysis';
import { DataWeightAnalysisService } from '@/services/weightAnalysis';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartWeightVariationProps {
    farm_id: string
}

export const ChartWeightVariation: React.FC<ChartWeightVariationProps> = ({ farm_id }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<WeightVariationType>([]);
    const dataService = new DataWeightAnalysisService();

    useEffect(() => {
        const fetchFarms = async () => {
            try {
                setLoading(true);
                const returnData = await dataService.analysisWeightVariation(farm_id);

                setData(returnData)
            } catch (error) {
                console.error('Erro ao carregar análise das pesagens:', error);
            }
            setLoading(false);
        };

        fetchFarms();
    }, [farm_id]);

    const chartOptions: ApexOptions = {
        chart: {
            type: 'line',
            height: 350,
            zoom: {
                enabled: false
            }
        },
        xaxis: {
            categories: data.map(item => `${item.month}/${item.year}`),
            title: {
                text: 'Mês/Ano'
            }
        },
        yaxis: {
            title: {
                text: 'Peso Médio (kg)'
            }
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Variação de Peso ao Longo do Ano',
            align: 'left'
        }
    };

    const chartSeries = [
        {
            name: 'Peso Médio',
            data: data.map(item => item.average_weight ?? 0)
        }
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Variação de Peso</CardTitle>
                <CardDescription>Análise de peso médio ao longo de todo o tempo</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <Chart options={chartOptions} series={chartSeries} type="line" width="170%" height={350} />
                )}
            </CardContent>
        </Card>
    );
};