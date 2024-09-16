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
                setData(returnData);
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
                enabled: false,
            },
        },
        colors: ['#28a745', '#007bff'],
        xaxis: {
            categories: data.map((item) => `${item.month}/${item.year}`),
            title: {
                text: 'Mês/Ano',
            },
        },
        yaxis: [
            {
                title: {
                    text: 'Peso Médio (kg)',
                },
                opposite: false,
            },
            {
                title: {
                    text: 'Precipitação (mm)',
                },
                opposite: true,
            },
        ],
        stroke: {
            curve: 'smooth',
        },
        title: {
            text: 'Variação de Peso e Precipitação ao Longo do Ano',
            align: 'left',
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'center',
            labels: {
                colors: '#ffffff',
                useSeriesColors: true,
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
    };

    const chartSeries = [
        {
            name: 'Peso Médio',
            data: data.map((item) => item.average_weight ?? 0),
        },
        {
            name: 'Precipitação',
            data: data.map((item) => item.precipitation ?? 0),
            type: 'line',
        },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Variação de Peso e Precipitação</CardTitle>
                <CardDescription>Análise de peso médio e precipitação ao longo de todo o tempo</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <Chart options={chartOptions} series={chartSeries} type="line" width="100%" height={350} />
                )}
            </CardContent>
        </Card>
    );
};
