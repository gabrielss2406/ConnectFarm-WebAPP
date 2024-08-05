import InformationExpenses from "@/components/HomePage/InformationExpenses";
import { SelectFarm } from "@/components/PainelPage/SelectFarm";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Home() {
  const farms = ["Farm 1", "Farm 2", "Farm 3"];
  const [activeFarm, setActiveFarm] = useState(farms[0]);

  const [chartOptions, setChartOptions] = useState<ApexOptions>({});
  const [chartSeries, setChartSeries] = useState<{ name: string; data: number[] }[]>([]);

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
    <div className="flex flex-col h-full bg-[#F1F1F1] pl-[15%]">
      <div className="p-5 bg-white flex w-full items-center justify-between">
        <h1 className="text-black text-[14pt] font-bold">Data Analysis</h1>
        <SelectFarm farms={farms} activeFarm={activeFarm} setActiveFarm={setActiveFarm} />
      </div>
      <div className="flex w-full h-auto flex-wrap justify-around gap-4 pt-4 flex-row p-10">
        <InformationExpenses expenseType="Lucro" amount={45.67} invertColor={false} />
        <InformationExpenses expenseType="Lucro" amount={45.67} invertColor={true} />
        <InformationExpenses expenseType="Lucro" amount={45.67} invertColor={false} />
        <InformationExpenses expenseType="Lucro" amount={45.67} invertColor={true} />
        <InformationExpenses expenseType="Lucro" amount={45.67} invertColor={false} />
      </div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        width="500"
      />
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        width="500"
      />
      <Chart options={{}} series={[44, 55, 41, 17, 15]} type="donut" width="380" />
    </div>
  );
}
