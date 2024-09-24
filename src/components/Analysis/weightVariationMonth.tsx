import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shared/ui/card';
import { WeightVariationMonthType } from '@/schemas/DataAnalysis';
import { DataWeightAnalysisService } from '@/services/weightAnalysis';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartWeightVariationMonthProps {
    farm_id: string
    unit: string
}

export const ChartWeightVariationMonth: React.FC<ChartWeightVariationMonthProps> = ({ farm_id, unit }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<WeightVariationMonthType>([]);
    const dataService = new DataWeightAnalysisService();

    useEffect(() => {
        const fetchFarms = async () => {
            try {
                setLoading(true);
                const returnData = await dataService.analysisWeightVariationMonth(farm_id);

                const filledData: WeightVariationMonthType = Array.from({ length: 12 }, (_, i) => ({
                    month: i + 1,
                    average_weight: 0,
                }));

                returnData.forEach((item: any) => {
                    filledData[item.month - 1].average_weight = item.average_weight;
                });

                setData(filledData);
            } catch (error) {
                console.error('Erro ao carregar análise das pesagens por mês:', error);
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
            categories: [
                'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ],
            title: {
                text: 'Mês'
            }
        },
        yaxis: {
            title: {
                text: `Peso Médio (${unit})`
            }
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Variação de Peso por Mês',
            align: 'left'
        },
        tooltip: {
            y: {
                formatter: function (value) {
                    return value === 0 ? 'Sem registros' : `${value} ${unit == "arroba" ? unit + "s" : unit}`;
                }
            }
        }
    };

    const chartSeries = [
        {
            name: 'Peso Médio',
            data: data.map((item) => {
                if (item.average_weight) {
                    if (unit == "arroba")
                        return Number((item.average_weight / 15).toFixed(2))
                    else return Number(item.average_weight.toFixed(2))
                }
                return 0
            }),
        }
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Variação de Peso por Mês</CardTitle>
                <CardDescription>Análise do peso médio dos bovinos por mês, independentemente do ano</CardDescription>
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