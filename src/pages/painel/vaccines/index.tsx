import { SelectFarm } from "@/components/PainelPage/SelectFarm";
import { useState, useEffect } from "react";
import { FarmService } from '@/services/farm';
import { LoadingSpinner } from "@/components/shared/components/loading";
import { ChartVaccineCoverage } from "@/components/Analysis/vaccinesCoverage";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import Navigation from "@/components/shared/components/navigation";
import { Grip } from "lucide-react";
import { useFarms } from "@/hooks/useFarms";
import VaccinationAnalysisGrid from "@/components/Analysis/vaccinesQuaterlyDataGrid";

// Define the type for a chart item
interface ChartItem {
    id: string;
    component: JSX.Element;
}

export default function VaccinesPage() {
    const [activeFarm, setActiveFarm] = useState<string>("");
    const [farms, setFarms] = useState<{ id: string; name: string }[]>([]);
    const [activeFarmId, setActiveFarmId] = useState<string | null>(null);
    const [charts, setCharts] = useState<ChartItem[]>([]);
    const { farms: farmsData, loading: loadingData, error: errorData } = useFarms();

    useEffect(() => {
        const fetchFarms = async () => {
            try {
                setFarms(farmsData);

                console.log(farmsData)

                if (farmsData.length > 0) {
                    const firstFarm = farmsData[0];
                    setActiveFarmId(firstFarm.id);
                    setActiveFarm(firstFarm.name);
                }
            } catch (error) {
                console.error('Erro ao carregar lista de fazendas:', errorData);
            }
        };

        if (farmsData)
            fetchFarms();
    }, [farmsData]);

    useEffect(() => {
        if (activeFarmId) {
            const storedOrder = localStorage.getItem(`charts-order-vaccines-${activeFarmId}`);
            const initialCharts = [
                { id: 'Cobertura das vacinas no gado', component: <ChartVaccineCoverage farm_id={activeFarmId} /> },
                { id: 'Vacinas em cada quadrimestre', component: <VaccinationAnalysisGrid farm_id={activeFarmId} /> }
            ];

            if (storedOrder) {
                const parsedOrder = JSON.parse(storedOrder);
                const orderedCharts = parsedOrder.map((id: string) => initialCharts.find(chart => chart.id === id));
                setCharts(orderedCharts.filter(Boolean) as ChartItem[]);
            } else {
                setCharts(initialCharts);
            }
        }
    }, [activeFarmId]);

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (destination.index === source.index) {
            return;
        }

        const reorderedCharts = Array.from(charts);
        const [movedChart] = reorderedCharts.splice(source.index, 1);
        reorderedCharts.splice(destination.index, 0, movedChart);

        setCharts(reorderedCharts);
        if (activeFarmId) {
            localStorage.setItem(`charts-order-vaccines-${activeFarmId}`, JSON.stringify(reorderedCharts.map(chart => chart.id)));
        }
    };

    const resetChartsOrder = () => {
        if (activeFarmId) {
            localStorage.removeItem(`charts-order-vaccines-${activeFarmId}`);
            setCharts([
                { id: 'Cobertura das vacinas no gado', component: <ChartVaccineCoverage farm_id={activeFarmId} /> },
                { id: 'Vacinas em cada quadrimestre', component: <VaccinationAnalysisGrid farm_id={activeFarmId} /> }
            ]);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F1F1F1] sm:ml-[15%]">
            {loadingData ? (
                <LoadingSpinner label='Carregando dados da fazenda...' />
            ) : (
                <div>
                    <header className="p-5 bg-white flex w-full items-center justify-between">
                        <h1 className="text-black text-[14pt] font-bold">Análises da vacinação do gado</h1>
                        <Navigation charts={charts} />
                        <SelectFarm farms={farms} activeFarmId={activeFarm} setActiveFarmId={setActiveFarm} />
                    </header>

                    <button onClick={resetChartsOrder} className="bg-blue-500 text-white p-2 rounded m-2">
                        Resetar Ordem dos Gráficos
                    </button>

                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <footer
                                    className="flex flex-col sm:items-center items-start gap-4 p-10 pt-2 overflow-x-auto"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {charts.map((chart, index) => (
                                        <Draggable key={chart.id} draggableId={chart.id} index={index}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps}>
                                                    <div className="flex items-center">
                                                        <div {...provided.dragHandleProps}>
                                                            <Grip size={30} className="cursor-pointer border border-b-0 bg-card m-0 -mb-0.5 z-50 p-0.5 mt-1" />
                                                        </div>
                                                    </div>
                                                    <div id={chart.id} className="element">
                                                        {chart.component}
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </footer>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            )}
        </div>
    );
}
