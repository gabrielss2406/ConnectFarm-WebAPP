import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shared/ui/card';
import { HealthHistoryType } from '@/schemas/DataAnalysis';
import { DataHealthAnalysisService } from '@/services/healthAnalysis';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartHealthHistoryProps {
    farm_id: string
}

export const ChartHealthHistory: React.FC<ChartHealthHistoryProps> = ({ farm_id }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<HealthHistoryType>();
    const dataService = new DataHealthAnalysisService();

    useEffect(() => {
        const fetchFarms = async () => {
            try {
                setLoading(true);
                const returnData = await dataService.analysisHealth(farm_id);

                setData(returnData)
            } catch (error) {
                console.error('Erro ao carregar análises da saúde:', error);
            }
            setLoading(false);
        };

        fetchFarms();
    }, [farm_id]);

    const [diseaseChartOptions, setDiseaseChartOptions] = useState<ApexOptions>({
        xaxis: {
            categories: [],
        },
        yaxis: {
            title: {
                text: 'Número de Ocorrências'
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '70%',
            },
        },
        colors: ['#00E396'],
        chart: {
            type: 'bar',
            height: 350,
        },
    });

    const [diseaseChartSeries, setDiseaseChartSeries] = useState<{ name: string; data: number[] }[]>([]);

    const [recoveryChartOptions, setRecoveryChartOptions] = useState<ApexOptions>({
        xaxis: {
            categories: [],
        },
        yaxis: {
            max: 100,
            title: {
                text: 'Taxa de Recuperação (%)'
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '70%',
            },
        },
        colors: ['#FF4560'],
        chart: {
            type: 'bar',
            height: 350,
        },
    });

    const [recoveryChartSeries, setRecoveryChartSeries] = useState<{ name: string; data: number[] }[]>([]);

    useEffect(() => {
        if (data) {
            const diseaseLabels = Object.keys(data.total_diseases);
            const diseaseValues = diseaseLabels.map(disease => data.total_diseases[disease]);
            const recoveryValues = diseaseLabels.map(disease => data.recovery_rate[disease]);

            // Atualizar gráfico de total de doenças
            setDiseaseChartOptions(prevOptions => ({
                ...prevOptions,
                xaxis: {
                    categories: diseaseLabels,
                }
            }));
            setDiseaseChartSeries([{ name: 'Total de Doenças', data: diseaseValues }]);

            // Atualizar gráfico de taxa de recuperação
            setRecoveryChartOptions(prevOptions => ({
                ...prevOptions,
                xaxis: {
                    categories: diseaseLabels,
                }
            }));
            setRecoveryChartSeries([{ name: 'Taxa de Recuperação (%)', data: recoveryValues }]);
        }
    }, [data]);

    return (
        <div className='flex flex-wrap gap-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Total de Doenças</CardTitle>
                    <CardDescription>Distribuição total de doenças</CardDescription>
                </CardHeader>
                <CardContent>
                    <Chart
                        options={diseaseChartOptions}
                        series={diseaseChartSeries}
                        type="bar"
                        width="100%"
                    />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Taxa de Recuperação</CardTitle>
                    <CardDescription>Distribuição percentual de recuperação</CardDescription>
                </CardHeader>
                <CardContent>
                    <Chart
                        options={recoveryChartOptions}
                        series={recoveryChartSeries}
                        type="bar"
                        width="100%"
                    />
                </CardContent>
            </Card>
        </div>
    );
};
