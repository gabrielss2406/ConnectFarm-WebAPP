import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shared/ui/card';
import { DataVaccinesAnalysisService } from '@/services/vaccinesAnalysis';
import { VaccinesCoverageType } from '@/schemas/DataAnalysis';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartVaccineCoverageProps {
    farm_id: string
}

export const ChartVaccineCoverage: React.FC<ChartVaccineCoverageProps> = ({ farm_id }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<VaccinesCoverageType>();
    const dataService = new DataVaccinesAnalysisService();

    useEffect(() => {
        const fetchFarms = async () => {
            try {
                setLoading(true);
                const returnData = await dataService.analysisVaccinesCoverage(farm_id);

                setData(returnData)
            } catch (error) {
                console.error('Erro ao carregar análise das vacinas:', error);
            }
            setLoading(false);
        };

        fetchFarms();
    }, [farm_id]);

    const [chartOptions, setChartOptions] = useState<ApexOptions>({
        xaxis: {
            categories: [],
        },
        yaxis: {
            max: 100,
            title: {
                text: 'Cobertura (%)'
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '70%'
            },
        },
        colors: ['#00E396', '#FF4560', '#FF9800', '#00BFFF'],
        legend: {
            position: 'bottom',
            labels: {
                colors: ['#333'],
            },
        },
        chart: {
            type: 'bar',
            height: 350,
        },
    });

    const [chartSeries, setChartSeries] = useState<{ name: string; data: number[] }[]>([]);

    useEffect(() => {
        if (data) {
            const vaccineCoverage = data.vaccine_coverage;
            const labels = Object.keys(vaccineCoverage);
            const series = [{
                name: 'Cobertura de Vacinas',
                data: Object.values(vaccineCoverage),
            }];

            setChartOptions(prevOptions => ({
                ...prevOptions,
                xaxis: {
                    categories: labels
                }
            }));

            setChartSeries(series);
        }
    }, [data]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cobertura de Vacinas</CardTitle>
                <CardDescription>Distribuição percentual da cobertura de vacinas</CardDescription>
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
