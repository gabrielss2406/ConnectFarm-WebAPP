import { SelectFarm } from "@/components/PainelPage/SelectFarm";
import { useState, useEffect } from "react";
import { FarmService } from '@/services/farm';
import { LoadingSpinner } from "@/components/shared/components/loading";
import { ChartHealthHistory } from "@/components/AnalysisCharts/healthHistory";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

// Define the type for a chart item
interface ChartItem {
    id: string;
    component: JSX.Element;
}

export default function Home() {
    const [activeFarm, setActiveFarm] = useState<string>("");
    const [farms, setFarms] = useState<{ id: string; name: string }[]>([]);
    const [activeFarmId, setActiveFarmId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [charts, setCharts] = useState<ChartItem[]>([
        { id: 'chart1', component: <ChartHealthHistory farm_id={activeFarmId || ""} /> }
    ]);

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
            setCharts([
                { id: 'chart1', component: <ChartHealthHistory farm_id={activeFarmId} /> }
            ]);
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
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F1F1F1] sm:ml-[15%]">
            {loading ? (
                <LoadingSpinner label='Carregando dados da fazenda...' />
            ) : (
                <div>
                    <header className="p-5 bg-white flex w-full items-center justify-between">
                        <h1 className="text-black text-[14pt] font-bold">Análises sobre a saúde do gado</h1>
                        <SelectFarm farms={farms} activeFarmId={activeFarm} setActiveFarmId={setActiveFarm} />
                    </header>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <footer
                                    className="flex flex-col sm:items-start items-start gap-4 p-10 overflow-x-auto"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {charts.map((chart, index) => (
                                        <Draggable key={chart.id} draggableId={chart.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="w-full sm:w-1/2 lg:w-1/3"
                                                >
                                                    {chart.component}
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
