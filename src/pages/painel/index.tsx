import { SelectFarm } from "@/components/PainelPage/SelectFarm";
import { useState, useEffect } from "react";
import { FarmService } from '@/services/farm'
import { LoadingSpinner } from "@/components/shared/components/loading";
import FinancialAnalysisGrid from "@/components/Analysis/financialsDataGrid";
import FinancialCurrent from "@/components/Analysis/financialsCards";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import Navigation from "@/components/shared/components/navigation";
import { Grip } from "lucide-react";
import FinancialPredict from "@/components/Analysis/financialPredict";
import { useFarms } from "@/hooks/useFarms";

interface ChartItem {
  id: string;
  component: JSX.Element;
}


export default function Home() {
  const [activeFarm, setActiveFarm] = useState("");
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
      const storedOrder = localStorage.getItem(`charts-order-financial-${activeFarmId}`);
      const initialCharts = [
        { id: 'Visão geral sobre finanças', component: <FinancialCurrent farm_id={activeFarmId} /> },
        { id: 'Previsão sobre finanças', component: <FinancialPredict farm_id={activeFarmId} /> },
        { id: 'Tabela das finanças de cada matriz', component: <FinancialAnalysisGrid farm_id={activeFarmId} /> },
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
      localStorage.setItem(`charts-order-financial-${activeFarmId}`, JSON.stringify(reorderedCharts.map(chart => chart.id)));
    }
  };

  const resetChartsOrder = () => {
    if (activeFarmId) {
      localStorage.removeItem(`charts-order-financial-${activeFarmId}`);
      setCharts([
        { id: 'Visão geral sobre finanças', component: <FinancialCurrent farm_id={activeFarmId} /> },
        { id: 'Previsão sobre finanças', component: <FinancialPredict farm_id={activeFarmId} /> },
        { id: 'Tabela das finanças de cada matriz', component: <FinancialAnalysisGrid farm_id={activeFarmId} /> },
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
            <h1 className="text-black text-[14pt] font-bold">Análises financeiras</h1>
            <Navigation charts={charts} />
            <SelectFarm farms={farms} activeFarmId={activeFarm} setActiveFarmId={setActiveFarm} />
          </header>

          <button onClick={resetChartsOrder} className="bg-blue-500 text-white p-2 rounded m-2">
            Resetar Ordem dos Gráficos
          </button>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                  className="flex flex-col w-full h-full p-10 pt-2 overflow-x-auto"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {charts.map((chart, index) => (
                    <Draggable key={chart.id} draggableId={chart.id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} className="w-full">
                          <div className="flex items-center">
                            <div {...provided.dragHandleProps}>
                              <Grip className="cursor-pointer" />
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
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </div>
  );
}
