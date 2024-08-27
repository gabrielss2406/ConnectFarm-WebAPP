import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shared/ui/card';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { CalvesTimeType } from '@/schemas/DataAnalysis';
import { DataCalvesAnalysisService } from '@/services/calvesAnalysis';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartCalvesTimeProps {
    farm_id: string
}


export const ChartCalvesTime: React.FC<ChartCalvesTimeProps> = ({ farm_id }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<CalvesTimeType>();
    const dataService = new DataCalvesAnalysisService();

    useEffect(() => {
        const fetchFarms = async () => {
            try {
                setLoading(true);
                const returnData = await dataService.analysisCalvesTime(farm_id);

                setData(returnData)
            } catch (error) {
                console.error('Erro ao carregar lista de fazendas:', error);
            }
            setLoading(false);
        };

        fetchFarms();
    }, []);

    const [chartOptions, setChartOptions] = useState<ApexOptions>({
        chart: {
            type: 'bar'
        },
        xaxis: {
            categories: ['Mínimo', 'Média', 'Máximo'],
        },
        yaxis: {
            title: {
                text: 'Tempo de Desmame (Dias)'
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
            }
        },
        dataLabels: {
            enabled: true
        },
        colors: ['#00E396', '#FF4560', '#008FFB'],
        title: {
            text: 'Tempo de Desmame dos Bezerros',
            align: 'left'
        },
        tooltip: {
            y: {
                formatter: (value: number) => `Tempo de desmame: ${value} dias`
            }
        }
    });

    const [chartSeries, setChartSeries] = useState<Array<{ name: string; data: number[] }>>([]);

    useEffect(() => {
        if (data) {
            const seriesData = [
                data.min_weaning_time,
                data.average_weaning_time,
                data.max_weaning_time
            ];
            setChartSeries([{
                name: 'Tempo de Desmame',
                data: seriesData
            }]);
        }

    }, [data]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tempo de Desmame dos Bezerros</CardTitle>
                <CardDescription>Gráfico de barras do tempo de desmame</CardDescription>
            </CardHeader>
            <CardContent>
                <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type="bar"
                    width="380"
                />
            </CardContent>
        </Card>
    );
};