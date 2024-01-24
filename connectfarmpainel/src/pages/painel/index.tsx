import InformationExpenses from "@/components/InformationExpenses";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
        <div className="{`
          p-5 bg-white
          flex w-full items-center justify-start
        `}">
          <h1 className="text-black text-[14pt] font-bold">Data Analisys</h1>
        </div>
        <div className="flex bg-[#F1F1F1] w-full h-full flex-wrap justify-around gap-4 pt-4">
          <InformationExpenses expenseType="Lucro" amount={45.67} invertColor={false}/>
          <InformationExpenses expenseType="Lucro" amount={45.67} invertColor={true}/>
          <InformationExpenses expenseType="Lucro" amount={45.67} invertColor={false}/>
          <InformationExpenses expenseType="Lucro" amount={45.67} invertColor={true}/>
        </div>
      </div>
  );
}
