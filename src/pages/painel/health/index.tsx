import { SelectFarm } from "@/components/PainelPage/SelectFarm";
import { useState, useEffect } from "react";
import { FarmService } from '@/services/farm';
import { LoadingSpinner } from "@/components/shared/components/loading";
import { ChartHealthHistory } from "@/components/Analysis/healthHistory";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import Navigation from "@/components/shared/components/navigation";
import { Grip } from "lucide-react";

// Define the type for a chart item
interface ChartItem {
    id: string;
    component: JSX.Element;
}

export default function HealthPage() {
    const [activeFarm, setActiveFarm] = useState<string>("");
    const [farms, setFarms] = useState<{ id: string; name: string }[]>([]);
    const [activeFarmId, setActiveFarmId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [charts, setCharts] = useState<ChartItem[]>([]);

    useEffect(() => {
        const fetchFarms = async () => {
            try {
                setLoading(true);
                const farmService = new FarmService();
                const farmsList = await farmService.getFarmsFromUser();

                const farmData = farmsList.map(farm => ({
                    id: farm.farm_id,
                    name: farm.name
                }));

                setFarms(farmData);

                if (farmData.length > 0) {
                    const firstFarm = farmData[0];
                    setActiveFarmId(firstFarm.id);
                    setActiveFarm(firstFarm.name);
                }
            } catch (error) {
                console.error('Erro ao carregar lista de fazendas:', error);
            }
            setLoading(false);
        };

        fetchFarms();
    }, []);

    useEffect(() => {
        if (activeFarmId) {
            const storedOrder = localStorage.getItem(`charts-order-health-${activeFarmId}`);
            const initialCharts = [
                { id: 'Incidência de doenças e taxas de recuperação', component: <ChartHealthHistory farm_id={activeFarmId} /> }
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
            localStorage.setItem(`charts-order-health-${activeFarmId}`, JSON.stringify(reorderedCharts.map(chart => chart.id)));
        }
    };

    const resetChartsOrder = () => {
        if (activeFarmId) {
            localStorage.removeItem(`charts-order-health-${activeFarmId}`);
            setCharts([
                { id: 'Incidência de doenças e taxas de recuperação', component: <ChartHealthHistory farm_id={activeFarmId} /> }
            ]);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F1F1F1] sm:ml-[15%]">
            {loading ? (
                <LoadingSpinner label='Carregando dados da fazenda...' />
            ) : (
                <div>
                    <header className="p-5 bg-white flex w-full items-center justify-between">
                        <h1 className="text-black text-[14pt] font-bold">Análises sobre a saúde do gado</h1>
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
                                    className="flex flex-col sm:items-start items-start gap-4 p-10 pt-2 overflow-x-auto"
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
