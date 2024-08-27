import { SelectFarm } from "@/components/PainelPage/SelectFarm";
import { useState, useEffect } from "react";
import { FarmService } from '@/services/farm'
import { LoadingSpinner } from "@/components/shared/components/loading";
import { ChartCalvesRatio } from "@/components/AnalysisCharts/calvesRatio";
import { ChartCalvesTime } from "@/components/AnalysisCharts/calvesTime";


export default function Home() {
    const [activeFarm, setActiveFarm] = useState("");
    const [farms, setFarms] = useState<{ id: string; name: string }[]>([]);
    const [activeFarmId, setActiveFarmId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

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
                    setActiveFarmId(farmData[0].id);
                    setActiveFarm(farmData[0].name);
                }
            } catch (error) {
                console.error('Erro ao carregar lista de fazendas:', error);
            }
            setLoading(false);
        };

        fetchFarms();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-[#F1F1F1] sm:ml-[15%]">
            {loading ? (
                <LoadingSpinner label='Carregando dados da fazenda...' />
            ) : (
                <div>
                    <header className="p-5 bg-white flex w-full items-center justify-between">
                        <h1 className="text-black text-[14pt] font-bold">Data Analysis</h1>
                        <SelectFarm farms={farms} activeFarmId={activeFarm} setActiveFarmId={setActiveFarm} />
                    </header>
                    <footer className="flex flex-wrap gap-4 p-10">
                        <div className="w-full sm:w-1/2 lg:w-1/3">
                            <ChartCalvesRatio farm_id={activeFarmId || ""} />
                        </div>
                        <div className="w-full sm:w-1/2 lg:w-1/3">
                            <ChartCalvesTime farm_id={activeFarmId || ""} />
                        </div>
                    </footer>
                </div>
            )}
        </div>
    );
}
