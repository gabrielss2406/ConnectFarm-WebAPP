import InformationExpenses from "@/components/HomePage/InformationExpenses";
import { SelectFarm } from "@/components/PainelPage/SelectFarm";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from 'apexcharts';
import { FarmService } from '@/services/farm'
import { LoadingSpinner } from "@/components/shared/components/loading";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [farms, setFarms] = useState<string[]>([]);
  const [activeFarm, setActiveFarm] = useState("");

  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [chartSeries, setChartSeries] = useState<{ name: string; data: number[] }[]>([]);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        setLoading(true);
        const farmService = new FarmService();
        const farmsList = await farmService.getFarmsFromUser();
        const farmNames = farmsList.map(farm => farm.name);
        setFarms(farmNames);
        if (farmNames.length > 0) {
          setActiveFarm(farmNames[0]);
        }
      } catch (error) {
        console.error('Erro ao carregar lista de fazendas:', error);
      }
      setLoading(false)
    };

    fetchFarms();
  }, []);

  useEffect(() => {
    setChartOptions({
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    });

    setChartSeries([
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F1F1F1] sm:ml-[15%]">
      {loading ? (
				<LoadingSpinner label='Carregando dados da fazenda...' />
			) : (
        <div>
      <header className="p-5 bg-white flex w-full items-center justify-between">
        <h1 className="text-black text-[14pt] font-bold">Data Analysis</h1>
        <SelectFarm farms={farms} activeFarm={activeFarm} setActiveFarm={setActiveFarm} />
      </header>
      <main className="flex-grow flex w-full h-auto flex-wrap justify-around gap-4 pt-4 flex-row p-10">
        <InformationExpenses expenseType="Lucro" amount={45.67} invertColor={false} />
        <InformationExpenses expenseType="Lucro" amount={45.67} invertColor={true} />
        <InformationExpenses expenseType="Lucro" amount={45.67} invertColor={false} />
        <InformationExpenses expenseType="Lucro" amount={45.67} invertColor={true} />
      </main>
      <footer className="flex flex-col items-center gap-4 p-10">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          width="380"
        />
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          width="380"
        />
        <Chart
          options={{}}
          series={[44, 55, 41, 17, 15]}
          type="donut"
          width="380"
        />
      </footer>
      </div>
      )}
    </div>
  );
}
