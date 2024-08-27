import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shared/ui/card';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { CalvesRatioType } from '@/schemas/DataAnalysis';
import { LoadingSpinner } from '../shared/components/loading';
import { DataCalvesAnalysisService } from '@/services/calvesAnalysis';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


interface ChartCalvesRatioProps {
    farm_id: string
}

export const ChartCalvesRatio: React.FC<ChartCalvesRatioProps> = ({ farm_id }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<CalvesRatioType>();
    const dataService = new DataCalvesAnalysisService();

    useEffect(() => {
        const fetchFarms = async () => {
            try {
                setLoading(true);
                const returnData = await dataService.analysisCalvesRatio(farm_id);

                setData(returnData)
            } catch (error) {
                console.error('Erro ao carregar lista de fazendas:', error);
            }
            setLoading(false);
        };

        fetchFarms();
    }, []);

    console.log(farm_id)
    const [chartOptions, setChartOptions] = useState<ApexOptions>({
        labels: ['Bezerros Desmamados', 'Bezerros Não Desmamados'],
        colors: ['#00E396', '#FF4560'],
        legend: {
            position: 'bottom',
            labels: {
                colors: ['#333'],
            },
        },
        chart: {
            type: 'donut'
        }
    });

    const [chartSeries, setChartSeries] = useState<number[]>([]);

    useEffect(() => {
        if (data) {
            const totalCalves = data.total_cows;
            const weanedCalves = data.weaned_calves;
            const notWeanedCalves = totalCalves - weanedCalves;

            setChartSeries([weanedCalves, notWeanedCalves]);
        }
    }, [data]);

    return (
        <>
            {loading ? (
                <LoadingSpinner label='Carregando gráficos...' />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Razão de Bezerros Desmamados</CardTitle>
                        <CardDescription>Gráfico de desmame de bezerros</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Chart
                            options={chartOptions}
                            series={chartSeries.length ? chartSeries : [0, 0]}
                            type="donut"
                            width="380"
                        />
                    </CardContent>
                </Card>
            )}
        </>
    );
};
